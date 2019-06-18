import React from 'react';

const MockNextPage = ({children, dispatch}) => {
    const reachBottomHandler = (event) => {
        event.preventDefault();
        dispatch({
            type: 'nextPage',
        });
    };
    return (
        <>
            {children}
            <button onClick={reachBottomHandler}>Next Page</button>
        </>
    )
};
export default MockNextPage;
