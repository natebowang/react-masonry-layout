import React, {useContext} from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import getFirstLabelByInnerHTMLPattern from '../utility/getFirstLabelByInnerHTMLPattern'
import rootReducer from "../reducer/rootReducer";
import Store, {Ctx} from '../store/Store';
import WindowResize, {DEBOUNDING_TIMEOUT} from './WindowResize';

let container = document.createElement('div');
document.body.appendChild(container);

export const MockChildren = () => {
    const {store} = useContext(Ctx);

    return (
        <>
            <label>
                {'Window Inner Width: '}
                <span>{store.wiw}</span>
            </label>
            <br/>
            <label>
                {'Font Size: '}
                <span>{store.fs}</span>
            </label>
        </>
    )
};

const MockMain = () => {
    const {dispatch} = useContext(Ctx);
    return (
        <WindowResize dispatch={dispatch}>
            <MockChildren/>
        </WindowResize>
    )
};

describe('GlobalState Component', () => {
        window.getComputedStyle = () => ({fontSize: '16px'});
        window.innerWidth = 500;
        act(() => {
            ReactDom.render((
                <Store reducer={rootReducer}>
                    <MockMain/>
                </Store>
            ), container);
        });
        let elementFs = getFirstLabelByInnerHTMLPattern(/font size/i).lastChild;
        let elementWiw = getFirstLabelByInnerHTMLPattern(/window inner width/i).lastChild;

        test('Initial state', (done) => {
            setTimeout(() => {
                expect(elementFs.innerHTML).toBe('16');
                expect(elementWiw.innerHTML).toBe('500');
                done();
            }, 0);
        });

        test('Window resize', (done) => {
            window.getComputedStyle = () => ({fontSize: '18px'});
            window.innerWidth = 800;
            act(() => {
                window.dispatchEvent(new Event('resize'));
            });
            setTimeout(() => {
                expect(elementFs.innerHTML).toBe('18');
                expect(elementWiw.innerHTML).toBe('800');
                done();
            }, DEBOUNDING_TIMEOUT);
        });
    }
);

test('Remove eventListener when unmount', (done) => {
    // eventListener有没有被remove就没法测，因为js就没提供getEventListener功能
    act(() => {
        ReactDom.unmountComponentAtNode(container);
    });
    setTimeout(() => {
        done();
    }, 0);
});
