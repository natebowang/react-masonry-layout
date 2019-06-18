import updateMatrixReducer from './updateMatrixReducer';
import mockNextPageReducer from "./mockNextPageReducer";

export default (prev, action) => {
    switch (action.type) {
        case 'nextPage':
            return mockNextPageReducer(prev);
        case 'updateMatrix' :
            return updateMatrixReducer(prev, action);
        default:
            return prev;
    }
};
