import React, {useContext, useEffect} from 'react';

// Handle event after this timer, that is set state, and trigger rerender
export const DEBOUNDING_TIMEOUT = 500;
// Debouncing timer id
let debouncingTimer = -1;

const UpdateMatrix = ({children, dispatch, items}) => {

    const handleEventDone = () => {
        console.debug('Update Matrix');
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
        ['resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        dispatch({
            type: 'updateMatrix',
            wiw: window.innerWidth,
            fs: parseFloat(window.getComputedStyle(document.body).fontSize),
        });
        return () => {
            ['resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
        };
    }, [items]);

    return (
        <>
            {children}
        </>
    );
};

export default UpdateMatrix;
