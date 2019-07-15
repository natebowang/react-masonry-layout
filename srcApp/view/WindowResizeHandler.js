import React, {useEffect} from 'react';

// Handle event after this timer, that is set state, and trigger rerender
export const DEBOUNDING_TIMEOUT = 500;
// Debouncing timer id
let debouncingTimer = -1;

const WindowResizeHandler = ({dispatch}) => {

    const handleEventDone = () => {
        dispatch({
            type: 'updateMatrix',
            wiw: window.innerWidth,
            fs: parseFloat(window.getComputedStyle(document.body).fontSize),
        });
    };
    const windowResizeHandler = (event) => {
        event.preventDefault();
        switch (event.type) {
            case 'resize':
                clearTimeout(debouncingTimer);
                // Handle event after this timer, that is set state, and trigger rerender
                debouncingTimer = setTimeout(handleEventDone, DEBOUNDING_TIMEOUT);
                break;
            default:
                throw(new Error('No such event.'));
        }
    };

    useEffect(() => {
        dispatch({
            type: 'updateMatrix',
            wiw: window.innerWidth,
            fs: parseFloat(window.getComputedStyle(document.body).fontSize),
        });
        ['resize'].forEach(event => window.addEventListener(event, windowResizeHandler));
        return () => {
            ['resize'].forEach(event => window.removeEventListener(event, windowResizeHandler));
        };
    }, []);

    return <></>;
};

export default WindowResizeHandler;
