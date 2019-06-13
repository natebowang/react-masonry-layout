import reducer from './windowResizeReducer';
import matrixCache from '../store/matrixCache';

test('Dispatch window resize event.', () => {
    let prev = {
        fs: undefined,
        wiw: undefined,
        columnWidth: undefined,
        columnNo: undefined,
        matrixCache: matrixCache,
        matrix: undefined,
        items: [],
    };
    let latter = {
        fs: 16,
        wiw: 1024,
        columnWidth: 20,
        columnNo: 3,
        matrixCache: matrixCache,
        matrix: [[],[],[]],
        items: [],
    };
    let action = {
        type: 'windowResize',
        fs: 16,
        wiw: 1024,
    };
    expect(reducer(prev, action)).toEqual(latter);
});