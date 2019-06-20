import React, {useEffect} from 'react';

const ItemsUpdateHandler = ({children, dispatch, items}) => {

    useEffect(() => {
        dispatch({
            type: 'updateMatrix',
            wiw: window.innerWidth,
            fs: parseFloat(window.getComputedStyle(document.body).fontSize),
        });
    }, [items]);

    return (
        <>
            {children}
        </>
    );
};

export default ItemsUpdateHandler;
