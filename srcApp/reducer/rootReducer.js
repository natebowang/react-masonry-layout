import windowResizeReducer from './windowResizeReducer';
import mockReachBottomReducer from "./mockReachBottomReducer";


export default (prev, action) => {
    switch (action.type) {
        case 'windowResize' :
            return windowResizeReducer(prev, action);
        case 'reachBottom':
            return mockReachBottomReducer(prev);
        default:
            return prev;
    }
};
