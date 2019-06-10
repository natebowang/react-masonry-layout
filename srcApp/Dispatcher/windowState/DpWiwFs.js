import React, {useState, useEffect} from 'react';

export const CtxWiw = React.createContext(window.innerWidth); // px. window inner width context
export const CtxFs = React.createContext(
    parseFloat(window.getComputedStyle(document.body).fontSize) // px. font size context
);

// Handle event after this timer, that is set state, and trigger rerender
export const DEBOUNDING_TIMEOUT = 500;
// Debouncing timer id
let debouncingTimer = -1;

const DpWiwFs = ({children}) => {
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
        <CtxWiw.Provider value={wiw}>
            <CtxFs.Provider value={fs}>
                {children}
            </CtxFs.Provider>
        </CtxWiw.Provider>
    )
};

export default DpWiwFs;