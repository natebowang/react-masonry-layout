import React, {memo} from 'react';

const MockNextPage = memo(({dispatch}) => {
    const nextPageHandler = (event) => {
        event.preventDefault();
        dispatch({
            type: 'nextPage',
        });
    };
    return <button onClick={nextPageHandler}>Next Page</button>
});
export default MockNextPage;
