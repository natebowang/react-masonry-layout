import React, {useState, useEffect} from 'react';

export const ContextWiw = React.createContext(window.innerWidth); // px. window inner width context
export const ContextFs = React.createContext(
    parseFloat(window.getComputedStyle(document.body).fontSize) // px. font size context
);

// Handle event after this timer, that is set state, and trigger rerender
export const DEBOUNDING_TIMEOUT = 500;
// Debouncing timer id
let debouncingTimer = -1;

const GlobalState = ({children}) => {
    // window inner width state
    const [wiw, setWiw] = useState(window.innerWidth);
    // font size state
    const [fs, setFs] = useState(parseFloat(window.getComputedStyle(document.body).fontSize));

    const handleEventDone = () => {
        console.debug('setWiw and setFs');
        setWiw(window.innerWidth);
        setFs(parseFloat(window.getComputedStyle(document.body).fontSize));
    };
    const windowEventHandler = (e) => {
        e.preventDefault();
        switch (e.type) {
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
        return () => {
            ['resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
        };
    }, []);

    return (
        <ContextWiw.Provider value={wiw}>
            <ContextFs.Provider value={fs}>
                {children}
            </ContextFs.Provider>
        </ContextWiw.Provider>
    )
};

export default GlobalState;