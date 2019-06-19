import React, {useContext, useEffect} from 'react';

// Handle event after this timer, that is set state, and trigger rerender
export const DEBOUNDING_TIMEOUT = 500;
// Debouncing timer id
let debouncingTimer = -1;

const UpdateMatrix = ({children, dispatch, items}) => {

    const handleEventDone = () => {
        dispatch({
            type: 'updateMatrix',
            wiw: window.innerWidth,
            fs: parseFloat(window.getComputedStyle(document.body).fontSize),
        });
    };
    const windowEventHandler = (event) => {
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
        ['resize'].forEach(event => window.addEventListener(event, windowEventHandler));
        dispatch({
            type: 'updateMatrix',
            wiw: window.innerWidth,
            fs: parseFloat(window.getComputedStyle(document.body).fontSize),
        });
        return () => {
            ['resize'].forEach(event => window.removeEventListener(event, windowEventHandler));
        };
    }, [items]);

    return (
        <>
            {children}
        </>
    );
};

export default UpdateMatrix;
