import binarySearch from "../../utility/binarySearch";
import '../../utility/tail';

// Usage:
// Service worker concat estimated cellHeights.
// ds.getCwds(cw).concatCellHeights([20, 30, 40]);
// Global state update itemIndexMatrix and offsetBottomMatrix according to estimated cellHeights.
// ds.getCwds(cw).getCnds(cn).followCellHeights(ds.getCwds(cw).cellHeights);
// MasonryLayout update real columnHeights
// ds.getCwds(cw).getCnds(cn).setColumnHeights([60, 30]);
//
// This is a data structure stores masonry layout information.
// 1. itemIndexMatrix tells masonry layout arrangement
//     to display which item in which cell. This is the most important
//     property in this data structure.
// 2. cellHeight and offsetBottomMatrix is for positioning new cubes.
// let masonryDs = {
//     20: {                  // ColumnWidthDs(Cwds)
//         cellHeights: [],
//         2: {                   // ColumnNoDs(Cnds)
//             itemIndexMatrix: [[], []],
//             offsetBottomMatrix: [[], []],
//         },
//         3: {},                 // ColumnNoDs(Cnds)
//         getCnds: (columnNo)=>{},
//     },
//     30 : {},
//
//     getCwds: (columnWidth)=>{},
// };

class MasonryDs {
    getCwds = (columnWidth) => {
        if (this[columnWidth] === undefined) {
            this[columnWidth] = new ColumnWidthDs();
        }
        return this[columnWidth];
    };
}
export default MasonryDs;

class ColumnWidthDs {
    constructor() {
        this.cellHeights = [];
    }

    getCnds = (columnNo) => {
        if (this[columnNo] === undefined) {
            this[columnNo] = new ColumnNoDs(columnNo);
        }
        return this[columnNo];
    };

    concatCellHeights = (cellHeights) => { // Immutable, cellHeights is an Array
        this.cellHeights = this.cellHeights.concat(cellHeights);
    };
}

class ColumnNoDs {
    constructor(columnNo) {
        // 二维数组，存的是每列包含的那部分xs的indexInAllXs，所有操作必须immutable
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []);
        // 二维数组，存的是每列包含的那部分xs的offsetBottom，这块存bottom而不是top的原因是，上一个的bottom就是下一个的top，
        // 如果存的是top，只能从cwds里取cellHeight再相加，太麻烦。
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

    setColumnHeights = (columnHeights) => {
        this.offsetBottomMatrix.map((arr, idx) => {
            if (arr.tail() !== undefined) {
                arr[arr.length - 1] = columnHeights[idx];
            }
        })
    };

    getShortestColumnHeight = () => {
        return Math.min(...this.getColumnHeights());
    };

    getShortestColumnIndex = () => {
        return this.getColumnHeights().indexOf(
            this.getShortestColumnHeight()); // 空矩阵返回0
    };

    getLastCellsItemIndex = () => {
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
        this.offsetBottomMatrix[this.getShortestColumnIndex()] =
            this.offsetBottomMatrix[this.getShortestColumnIndex()].concat(offsetBottom);
    };

    followCellHeights = (cellHeights) => {
        let lcii = this.getLastCellsItemIndex(); // last cell's item index
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
                return tmp === undefined ? this.getLastCellsItemIndex() : tmp;
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

