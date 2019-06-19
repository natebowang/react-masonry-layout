import React from 'react';

const MockNextPage = ({children, dispatch}) => {
    const nextPageHandler = (event) => {
        event.preventDefault();
        dispatch({
            type: 'nextPage',
        });
    };
    return (
        <>
            {children}
            <button onClick={nextPageHandler}>Next Page</button>
        </>
    )
};
export default MockNextPage;
