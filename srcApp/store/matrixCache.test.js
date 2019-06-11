import {MatrixCache} from './matrixCache';

test('new cwS', () => {
    const ms = new MatrixCache();
    const cw = 20;
    ms.getCwCache(cw);
    expect(ms[cw].cellHeights).toEqual([]);
});

test('push estimated cell height', () => {
    const ms = new MatrixCache();
    const cw = 20;
    const ch = [20, 30, 40];
    ms.getCwCache(cw).concatCellHeights(ch);
    expect(ms[cw].cellHeights)
        .toEqual(ch);
});

test('new cnS', () => {
    const ms = new MatrixCache();
    const cw = 20;
    const cn = 2;
    ms.getCwCache(cw).getCnCache(cn);
    expect(ms[cw][cn].itemIndexMatrix)
        .toEqual([...Array(cn)].map(() => []));
    expect(ms[cw][cn].getLastCellsItemIndex())
        .toEqual(-1);
});

test('concat item and push estimated offset bottom', () => {
    const ms = new MatrixCache();
    const cw = 20;
    const cn = 2;
    ms.getCwCache(cw).getCnCache(cn).concatItemIndex(0);
    ms.getCwCache(cw).getCnCache(cn).concatOffsetBottom(20);
    ms.getCwCache(cw).getCnCache(cn).concatItemIndex(1);
    ms.getCwCache(cw).getCnCache(cn).concatOffsetBottom(30);
    ms.getCwCache(cw).getCnCache(cn).concatItemIndex(2);
    ms.getCwCache(cw).getCnCache(cn).concatOffsetBottom(40);
    expect(ms[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 40], [30]]);
    expect(ms[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
    expect(ms[cw][cn].getColumnHeights())
        .toEqual([40, 30]);
    expect(ms[cw][cn].getShortestColumnHeight())
        .toEqual(30);
    expect(ms[cw][cn].getShortestColumnIndex())
        .toEqual(1);
    expect(ms[cw][cn].getLastCellsItemIndex())
        .toEqual(2);
    expect(ms[cw][cn].getSmallestItemIndexInViewport(10))
        .toEqual(0);
    expect(ms[cw][cn].getSmallestItemIndexInViewport(20))
        .toEqual(1);
    expect(ms[cw][cn].getSmallestItemIndexInViewport(30))
        .toEqual(2);
    expect(ms[cw][cn].getCellsOffsetTop(0))
        .toEqual(0);
    expect(ms[cw][cn].getCellsOffsetTop(1))
        .toEqual(0);
    expect(ms[cw][cn].getCellsOffsetTop(2))
        .toEqual(20);
});

test('follow cell height', () => {
    const ms = new MatrixCache();
    const cw = 20;
    const cn = 2;
    const chnew = [20, 30, 40];
    ms.getCwCache(cw).concatCellHeights(chnew);
    ms.getCwCache(cw).getCnCache(cn).followCellHeights(ms.getCwCache(cw).cellHeights);
    expect(ms[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 60], [30]]);
    expect(ms[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
});

test('set real column height', () => {
    const ms = new MatrixCache();
    const cw = 20;
    const cn = 2;
    const chnew = [20, 30, 40];
    ms.getCwCache(cw).concatCellHeights(chnew);
    ms.getCwCache(cw).getCnCache(cn).followCellHeights(ms.getCwCache(cw).cellHeights);
    ms.getCwCache(cw).getCnCache(cn).setColumnHeights([70, 30]);
    expect(ms[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 70], [30]]);
    expect(ms[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
});
