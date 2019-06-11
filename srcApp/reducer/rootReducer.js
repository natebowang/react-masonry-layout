import windowResizeReducer from './windowResizeReducer';

export default (prev, action) => {
    switch (action.type) {
        case 'windowResize' :
            return windowResizeReducer(prev, action);
        default:
            return prev;
    }
};
