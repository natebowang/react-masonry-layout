import '../utility/tail';

// This is a data structure stores masonry layout information.
// 1. itemIndexMatrix tells masonry layout arrangement
//     to display which post in each cube. This is the most important
//     property in this data structure.
// 2. columnHeights is for positioning new cubes.
// let masonryDS = {
//     20: {                  // ColumnWidthDS(Cwds)
//         2: {                   // ColumnNoDS(Cnds)
//             itemIndexMatrix: [[], []],
//             columnHeights: [],
//         },
//         3: {},                 // ColumnNoDS(Cnds)
//         getCnds: (columnNo)=>{},
//     },
//     30 : {},
//
//     getCwds: (columnWidth)=>{},
// };

class MasonryDS {
    getCwds = (columnWidth) => {
        if (this[columnWidth] === undefined) {
            this[columnWidth] = new ColumnWidthDS();
        }
        return this[columnWidth];
    };
}

class ColumnWidthDS {
    // constructor() {
    //     this.cellHeights = [];
    // }
    //
    getCnds = (columnNo) => {
        if (this[columnNo] === undefined) {
            this[columnNo] = new ColumnNoDS(columnNo);
        }
        return this[columnNo];
    };
    //
    // concatCellHeight = (cellHeight) => { // Immutable
    //     this.cellHeights = this.cellHeights.concat(cellHeight);
    // };
}

class ColumnNoDS {
    constructor(columnNo) {
        // 二维数组，存的是每列包含的那部分xs的indexInAllXs，所有操作必须immutable
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []);
        // 一维数组，存的是每列当前的offsetBottom，
        this.columnHeights = Array(columnNo).fill(0);
    }

    getShortestColumnHeight = () => {
        return Math.min(...this.columnHeights());
    };

    getShortestColumnIndex = () => {
        return this.columnHeights().indexOf(
            this.getShortestColumnHeight());
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
        this.columnHeights = [...this.columnHeights];
        this.columnHeights[this.getShortestColumnIndex()] =
            this.columnHeights[this.getShortestColumnIndex()].concat(offsetBottom);
    };
}

export default MasonryDS;