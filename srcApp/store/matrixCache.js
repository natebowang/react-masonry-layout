import binarySearch from "../utility/binarySearch";
import '../utility/tail';
import getEstimatedItemHeight from "../itemApiAdaptor/getEstimatedCellHeight";

// Usage:
// Service worker concat estimated cellHeights.
// ms.getCwCache(cw).concatCellHeights([20, 30, 40]);
// Update itemIndexMatrix and offsetBottomMatrix according to estimated cellHeights.
// ms.getCwCache(cw).getCnCache(cn).followCellHeights(ms.getCwCache(cw).cellHeights);
// MasonryLayout update real columnHeights
// ms.getCwCache(cw).getCnCache(cn).setColumnHeights([60, 30]);
//
// This is a data structure caches matrices.
// 1. itemIndexMatrix tells masonry layout arrangement
//     to display which item in which cell. This is the most important
//     property in this data structure.
// 2. cellHeight and offsetBottomMatrix is for positioning new cubes.
// let matrixCache = {
//     20: {                  // ColumnWidthCache(CwC)
//         cellHeights: [],
//         2: {                   // ColumnNoCache(CnC)
//             itemIndexMatrix: [[], []],
//             offsetBottomMatrix: [[], []],
//         },
//         3: {},                 // ColumnNoCache(CnC)
//         getCnCache: (columnNo)=>{},
//     },
//     30 : {},
//
//     getCwCache: (columnWidth)=>{},
// };
export class MatrixCache {
    // Factory method plus singleton
    getCwCache = (columnWidth) => {
        if (this[columnWidth] === undefined) {
            this[columnWidth] = new ColumnWidthCache();
        }
        return this[columnWidth];
    };
    // Keep cwC and cnC, but reinitialize cellHeights, itemIndexMatrix, offsetBottomMatrix
    // When user search another keyword, cellHeights, itemIndexMatrix, offsetBottomMatrix
    // are related to items, so they need to be clear.
    // But cwC and cnC are related to window, so they could leave.
    clearCache = () => {
        for (let cw in this) {
            if (this[cw].hasOwnProperty('cellHeights')) {
                this[cw].cellHeights = [];
                for (let cn in this[cw]) {
                    if (this[cw][cn].hasOwnProperty('itemIndexMatrix')) {
                        this[cw][cn].itemIndexMatrix = [...Array(parseInt(cn))].map(() => []);
                        this[cw][cn].offsetBottomMatrix = [...Array(parseInt(cn))].map(() => []);
                    }
                }
            }
        }
    };
}

export default new MatrixCache();

class ColumnWidthCache {
    constructor() {
        this.cellHeights = [];
    }

    // Factory method plus singleton
    getCnCache = (columnNo) => {
        if (this[columnNo] === undefined) {
            this[columnNo] = new ColumnNoCache(columnNo);
        }
        return this[columnNo];
    };

    concatCellHeights = (cellHeights) => { // Immutable, cellHeights is an Array
        this.cellHeights = this.cellHeights.concat(cellHeights);
    };

    followItems = (items, columnWidth, fs) => {
        let lchi = this.cellHeights.length - 1; // last cell heights index
        let il = items.length; // array items length
        while (++lchi < il) {
            this.concatCellHeights(getEstimatedItemHeight(items[lchi], columnWidth, fs));
        }
    };
}

class ColumnNoCache {
    constructor(columnNo) {
        // 二维数组，存的是每列包含的那部分xs的indexInAllXs，所有操作必须immutable
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []);
        // 二维数组，存的是每列包含的那部分xs的offsetBottom，这块存bottom而不是top的原因是，上一个的bottom就是下一个的top，
        // 如果存的是top，只能从cwS里取cellHeight再相加，太麻烦。
        // 这两个二维数组分开存放，而不是一个数组，每个元素是一个object的原因是，
        // 只有itemIndexMatrix传给children了，而offsetBottomMatrix不需要传下去。
        this.offsetBottomMatrix = [...Array(columnNo)].map(() => []);
    }

    getColumnHeights = () => {
        let columnNo = this.offsetBottomMatrix.length;
        return Array(columnNo).fill().map((el, idx) => {
            let tmp = this.offsetBottomMatrix[idx].tail();
            return tmp === undefined ? 0 : tmp;
        }); // 空数组返回0
    };

    getShortestColumnHeight = () => {
        return Math.min(...this.getColumnHeights());
    };

    getShortestColumnIndex = () => {
        return this.getColumnHeights().indexOf(
            this.getShortestColumnHeight()); // 空矩阵返回0
    };

    getLastItemIndexFromMatrix = () => {
        let columnNo = this.itemIndexMatrix.length;
        let lastCellsItemIndices = Array(columnNo).fill().map((el, idx) => {
            let tmp = this.itemIndexMatrix[idx].tail();
            return tmp === undefined ? -1 : tmp;
        }); // 空数组返回-1
        return Math.max(...lastCellsItemIndices); // 空矩阵返回-1
    };

    concatItemIndex = (itemIndex) => { // Immutable
        this.itemIndexMatrix = [...this.itemIndexMatrix];
        this.itemIndexMatrix[this.getShortestColumnIndex()] =
            this.itemIndexMatrix[this.getShortestColumnIndex()].concat(itemIndex);
    };

    concatOffsetBottom = (offsetBottom) => {
        this.offsetBottomMatrix = [...this.offsetBottomMatrix];
        this.offsetBottomMatrix[this.getShortestColumnIndex()]
            = this.offsetBottomMatrix[this.getShortestColumnIndex()].concat(offsetBottom);
    };

    setColumnHeight = (columnIndex, columnHeight) => { // immutable
        if (this.offsetBottomMatrix[columnIndex].tail() !== undefined) {
            this.offsetBottomMatrix = [...this.offsetBottomMatrix];
            this.offsetBottomMatrix[columnIndex]
                = [...this.offsetBottomMatrix[columnIndex]];
            let col = this.offsetBottomMatrix[columnIndex];
            col[col.length - 1] = columnHeight;
        }
    };

    followCellHeights = (cellHeights) => {
        let lcii = this.getLastItemIndexFromMatrix(); // last cell's item index
        let chl = cellHeights.length; // cell heights length
        while (++lcii < chl) {
            this.concatItemIndex(lcii);
            this.concatOffsetBottom(this.getShortestColumnHeight() + cellHeights[lcii]);
        }
    };

    // todo: 重新render之后自动滚动到之前的位置。
    getSmallestItemIndexInViewport = (scrollHeight) => {
        const binarySearchSpecial = (arr, target) => { // binary search default larger变种
            let left = 0;
            let right = arr.length - 1;
            while (left <= right) {
                const mid = left + Math.floor((right - left) / 2);
                if (arr[mid] === target) {
                    return mid + 1; // return mid+1 rather than mid
                }
                if (arr[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return left;
        };

        let topItemIndicesInViewport = this.offsetBottomMatrix
            .map((offsetBottomArray) => binarySearchSpecial(offsetBottomArray, scrollHeight))
            .map((el, idx) => {
                let tmp = this.itemIndexMatrix[idx][el];
                return tmp === undefined ? this.getLastItemIndexFromMatrix() : tmp;
            }); // 空数组返回-1

        // console.debug(topItemIndicesInViewport);
        return Math.min(...topItemIndicesInViewport); // 矩阵只要含有空数组就返回-1
    };
    // todo: 重新render之后自动滚动到之前的位置。
    getCellsOffsetTop = (itemIndex) => {
        let [[x, y]] = this.itemIndexMatrix
            .map(itemIndexArray => binarySearch(itemIndexArray, itemIndex))
            .map((el, idx) => {
                if (el !== -1) {
                    return [idx, el]
                }
                return undefined;
            })
            .filter(el => el !== undefined);
        if (y === undefined) {
            throw(new Error('Can not find this item by the given index'));
        } else if (y === 0) {
            return 0;
        } else {
            return this.offsetBottomMatrix[x][y - 1];
        }
    };
}

