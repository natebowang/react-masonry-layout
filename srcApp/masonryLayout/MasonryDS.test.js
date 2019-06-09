import DS from './MasonryDS';

test('new cwds', () => {
    const ds = new DS();
    const cw = 20;
    ds.getCwds(cw);
    expect(ds[cw].cellHeights).toEqual([]);
});

test('push cell height', () => {
    const ds = new DS();
    const cw = 20;
    const ch = [20, 30, 40];
    ds.getCwds(cw).concatCellHeights(ch);
    expect(ds[cw].cellHeights)
        .toEqual(ch);
});

test('new cnds', () => {
    const ds = new DS();
    const cw = 20;
    const cn = 2;
    ds.getCwds(cw).getCnds(cn);
    expect(ds[cw][cn].itemIndexMatrix)
        .toEqual([...Array(cn)].map(() => []));
    expect(ds[cw][cn].getLastCellsItemIndex())
        .toEqual(-1);
});

test('concat item and push offset bottom', () => {
    const ds = new DS();
    const cw = 20;
    const cn = 2;
    ds.getCwds(cw).getCnds(cn).concatItemIndex(0);
    ds.getCwds(cw).getCnds(cn).concatOffsetBottom(20);
    ds.getCwds(cw).getCnds(cn).concatItemIndex(1);
    ds.getCwds(cw).getCnds(cn).concatOffsetBottom(30);
    ds.getCwds(cw).getCnds(cn).concatItemIndex(2);
    ds.getCwds(cw).getCnds(cn).concatOffsetBottom(40);
    expect(ds[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 40], [30]]);
    expect(ds[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
    expect(ds[cw][cn].getColumnHeights())
        .toEqual([40, 30]);
    expect(ds[cw][cn].getShortestColumnHeight())
        .toEqual(30);
    expect(ds[cw][cn].getShortestColumnIndex())
        .toEqual(1);
    expect(ds[cw][cn].getLastCellsItemIndex())
        .toEqual(2);
    expect(ds[cw][cn].getSmallestItemIndexInViewport(10))
        .toEqual(0);
    expect(ds[cw][cn].getSmallestItemIndexInViewport(20))
        .toEqual(1);
    expect(ds[cw][cn].getSmallestItemIndexInViewport(30))
        .toEqual(2);
    expect(ds[cw][cn].getCellsOffsetTop(0))
        .toEqual(0);
    expect(ds[cw][cn].getCellsOffsetTop(1))
        .toEqual(0);
    expect(ds[cw][cn].getCellsOffsetTop(2))
        .toEqual(20);
});

test('follow cell height', () => {
    const ds = new DS();
    const cw = 20;
    const cn = 2;
    const chnew = [20, 30, 40];
    ds.getCwds(cw).concatCellHeights(chnew);
    ds.getCwds(cw).getCnds(cn).followCellHeights(ds.getCwds(cw).cellHeights);
    expect(ds[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 40], [30]]);
    expect(ds[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
});

// This is a data structure stores masonry layout information.
// 1. itemIndexMatrix tells masonry layout arrangement
//     to display which item in which cell. This is the most important
//     property in this data structure.
// 2. cellHeight and offsetBottomMatrix is for positioning new cubes.
// let masonryDS = {
//     20: {                  // ColumnWidthDS(Cwds)
//         cellHeights: [],
//         2: {                   // ColumnNoDS(Cnds)
//             itemIndexMatrix: [[], []],
//             offsetBottomMatrix: [[], []],
//         },
//         3: {},                 // ColumnNoDS(Cnds)
//         getCnds: (columnNo)=>{},
//     },
//     30 : {},
//
//     getCwds: (columnWidth)=>{},
// };
