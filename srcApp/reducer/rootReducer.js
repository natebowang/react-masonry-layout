import updateMatrixReducer from './updateMatrixReducer';
import mockReachBottomReducer from "./mockReachBottomReducer";

export default (prev, action) => {
    switch (action.type) {
        case 'reachBottom':
            return mockReachBottomReducer(prev);
        case 'updateMatrix' :
            return updateMatrixReducer(prev, action);
        default:
            return prev;
    }
};
