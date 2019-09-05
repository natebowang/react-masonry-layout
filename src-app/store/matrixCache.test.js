import {MatrixCache} from './matrixCache';
import {itemsTemplate} from "../reducer/mockNextPageReducer";
import dep from "../item-api-adaptor/getEstimatedCellHeight";

jest.mock('../item-api-adaptor/getEstimatedCellHeight', () => (()=>3));

test('New cwC', () => {
    const mc = new MatrixCache();
    const cw = 20;
    mc.getCwCache(cw);
    expect(mc[cw].cellHeights).toEqual([]);
});

test('Push estimated cell height', () => {
    const mc = new MatrixCache();
    const cw = 20;
    const ch = [20, 30, 40];
    mc.getCwCache(cw).concatCellHeights(ch);
    expect(mc[cw].cellHeights)
        .toEqual(ch);
});

test('New cnC', () => {
    const mc = new MatrixCache();
    const cw = 20;
    const cn = 2;
    mc.getCwCache(cw).getCnCache(cn);
    expect(mc[cw][cn].itemIndexMatrix)
        .toEqual([...Array(cn)].map(() => []));
    expect(mc[cw][cn].getLastItemIndexFromMatrix())
        .toEqual(-1);
});

test('Concat item and push estimated offset bottom', () => {
    const mc = new MatrixCache();
    const cw = 20;
    const cn = 2;
    mc.getCwCache(cw).getCnCache(cn).concatItemIndex(0);
    mc.getCwCache(cw).getCnCache(cn).concatOffsetBottom(20);
    mc.getCwCache(cw).getCnCache(cn).concatItemIndex(1);
    mc.getCwCache(cw).getCnCache(cn).concatOffsetBottom(30);
    mc.getCwCache(cw).getCnCache(cn).concatItemIndex(2);
    mc.getCwCache(cw).getCnCache(cn).concatOffsetBottom(40);
    expect(mc[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 40], [30]]);
    expect(mc[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
    expect(mc[cw][cn].getColumnHeights())
        .toEqual([40, 30]);
    expect(mc[cw][cn].getShortestColumnHeight())
        .toEqual(30);
    expect(mc[cw][cn].getShortestColumnIndex())
        .toEqual(1);
    expect(mc[cw][cn].getLastItemIndexFromMatrix())
        .toEqual(2);
    expect(mc[cw][cn].getSmallestItemIndexInViewport(10))
        .toEqual(0);
    expect(mc[cw][cn].getSmallestItemIndexInViewport(20))
        .toEqual(1);
    expect(mc[cw][cn].getSmallestItemIndexInViewport(30))
        .toEqual(2);
    expect(mc[cw][cn].getCellsOffsetTop(0))
        .toEqual(0);
    expect(mc[cw][cn].getCellsOffsetTop(1))
        .toEqual(0);
    expect(mc[cw][cn].getCellsOffsetTop(2))
        .toEqual(20);
});

test('itemIndexMatrix and offsetBottomMatrix follows cellHeights', () => {
    const mc = new MatrixCache();
    const cw = 20;
    const cn = 2;
    const chnew = [20, 30, 40];
    mc.getCwCache(cw).concatCellHeights(chnew);
    mc.getCwCache(cw).getCnCache(cn).followCellHeights(mc.getCwCache(cw).cellHeights);
    expect(mc[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 60], [30]]);
    expect(mc[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
});

test('Set real column height', () => {
    const mc = new MatrixCache();
    const cw = 20;
    const cn = 2;
    const chnew = [20, 30, 40];
    mc.getCwCache(cw).concatCellHeights(chnew);
    mc.getCwCache(cw).getCnCache(cn).followCellHeights(mc.getCwCache(cw).cellHeights);
    mc.getCwCache(cw).getCnCache(cn).setColumnHeight(0, 70);
    mc.getCwCache(cw).getCnCache(cn).setColumnHeight(1, 30);
    expect(mc[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 70], [30]]);
    expect(mc[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
});

test('Clear cache', () => {
    const mc = new MatrixCache();
    const cw = 20;
    const cn = 2;
    const chnew = [20, 30, 40];
    mc.getCwCache(cw).concatCellHeights(chnew);
    mc.getCwCache(cw).getCnCache(cn).followCellHeights(mc.getCwCache(cw).cellHeights);
    mc.resetCache();
    expect(mc[cw][cn].offsetBottomMatrix)
        .toEqual([[], []]);
    expect(mc[cw][cn].itemIndexMatrix)
        .toEqual([[], []]);
});

test('cellHeights follows items', () => {
    const mc = new MatrixCache();
    const cw = 21;
    const fs = 16;
    mc.getCwCache(cw).followItems(itemsTemplate, cw, fs);
    expect(mc[cw].cellHeights)
        .toEqual(Array(20).fill(3));
});
