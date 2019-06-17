import React from 'react';

const MockReachBottom = ({children, dispatch}) => {
    const reachBottomHandler = (event) => {
        event.preventDefault();
        dispatch({
            type: 'reachBottom',
        });
    };
    return (
        <>
            {children}
            <button onClick={reachBottomHandler}>Next</button>
        </>
    )
};
export default MockReachBottom;
