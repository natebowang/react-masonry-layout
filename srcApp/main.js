import 'normalize.css';
import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import Store, {Ctx} from './store/Store';
import rootReducer from './reducer/rootReducer';
import MockNextPage from "./view/MockNextPage";
import UpdateMatrix from "./view/UpdateMatrix";
import Table from "./view/MasonryTable";
import renderItem from './itemApiAdaptor/renderItem';
// 2st option for service worker
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// Main component also integrated connect function.
// I have to transfer context to props to use React.memo.
const Main = () => {
    const {store: {matrix, columnWidth, columnNo, items}, dispatch}
        = useContext(Ctx);
    return (
        <MockNextPage dispatch={dispatch}>
            <UpdateMatrix dispatch={dispatch} items={items}>
                <Table dispatch={dispatch}
                       renderItem={renderItem}
                       matrix={matrix}
                       columnWidth={columnWidth}
                       columnNo={columnNo}
                       items={items}
                />
            </UpdateMatrix>
        </MockNextPage>
    );
};

ReactDOM.render((
    <Store reducer={rootReducer}>
        <Main/>
    </Store>
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
