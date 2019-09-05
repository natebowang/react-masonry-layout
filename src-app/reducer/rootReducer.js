import updateMatrixReducer from './updateMatrixReducer';
import mockNextPageReducer from "./mockNextPageReducer";
import adjustColumnHeightReducer from "./adjustColumnHeightReducer";

export default (prev, action) => {
    switch (action.type) {
        case 'nextPage':
            return mockNextPageReducer(prev);
        case 'updateMatrix' :
            return updateMatrixReducer(prev, action);
        case 'adjustColumnHeight' :
            return adjustColumnHeightReducer(prev, action);
        default:
            return prev;
    }
};
