import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import WindowResize, {DEBOUNDING_TIMEOUT, CtxFs, CtxWiw} from './WindowResize';
import getFirstLabelByInnerHTMLPattern from '../utility/getFirstLabelByInnerHTMLPattern'

const MockChildren = () => {
    const wiw = React.useContext(CtxWiw); // Window inner width
    const fs = React.useContext(CtxFs); // Font size

    return (
        <>
            <label>
                {'Window Inner Width: '}
                <span>{wiw.toString()}</span>
            </label>
            <br/>
            <label>
                {'Font Size: '}
                <span>{fs.toString()}</span>
            </label>
        </>
    )
};

let container = document.createElement('div');
document.body.appendChild(container);

describe('GlobalState Component', () => {
        window.getComputedStyle = () => ({fontSize: '16px'});
        window.innerWidth = 500;
        act(() => {
            ReactDom.render(
                <WindowResize><MockChildren/></WindowResize>
                , container);
        });
        let elementFs = getFirstLabelByInnerHTMLPattern(/font size/i).lastChild;
        let elementWiw = getFirstLabelByInnerHTMLPattern(/window inner width/i).lastChild;

        test('initial state', (done) => {
            setTimeout(() => {
                expect(elementFs.innerHTML).toBe('16');
                expect(elementWiw.innerHTML).toBe('500');
                done();
            }, 0);
        });

        test('resize', (done) => {
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

test('remove eventListener when unmount', (done) => {
    // eventListener有没有被remove就没法测，因为js就没提供getEventListener功能
    act(() => {
        ReactDom.unmountComponentAtNode(container);
    });
    setTimeout(() => {
        done();
    }, 0);
});
