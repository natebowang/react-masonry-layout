import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import InitStore from './store/Store';
import rootReducer from './reducer/rootReducer';
import MockNextPage from "./view/MockNextPage";
import WindowResizeHandler from "./view/WindowResizeHandler";
import Table from "./view/MasonryTable";
import renderItem from './item-api-adaptor/renderItem';
// 2st option for service worker
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// Main component also integrated connect function.
// I have to transfer context to props to use React.memo.
const Main = () => {
    const [{matrix, columnWidth, columnNo, items}, dispatch]
        = useReducer(rootReducer, new InitStore());
    return (
        <>
            <WindowResizeHandler dispatch={dispatch}/>
            <Table dispatch={dispatch}
                   renderItem={renderItem}
                   matrix={matrix}
                   columnWidth={columnWidth}
                   columnNo={columnNo}
                   items={items}
            />
            <MockNextPage dispatch={dispatch}/>
        </>
    );
};

ReactDOM.render((
    <Main/>
), document.getElementById('root'));

// 1st option for service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    // the max scope is the location of the worker, so I choose to put it under root
        .register('./sw.js', {scope: '/'})
        .then(reg => {
            console.debug('SW registration succeeded. Scope is ' + reg.scope)
        })
        .catch(err => {
            console.debug('SW registration failed with ' + err)
        });
}
// 2st option for service worker
// if ('serviceWorker' in navigator) {
//     const registration = runtime.register();
// }

// Hot Module Replacement
// [Problems with event listener](https://webpack.js.org/guides/hot-module-replacement#gotchas)
if (module.hot) {
    module.hot.accept();
}
