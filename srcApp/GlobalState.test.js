import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import GlobalState, {DEBOUNDING_TIMEOUT, ContextFs, ContextWiw} from './GlobalState';

// getFirstLabelByInnerHTML will get this element if the pattern is /Window Inner Width: */
// <label>
//    {'Window Inner Width: '}
//    <span>{wiw.toString()}</span>
// </label>
const getFirstLabelByInnerHTMLPattern = pattern => {
    return Array.from(document.querySelectorAll('label')).find(el => pattern.test(el.innerHTML));
};

const MockChildren = () => {
    const wiw = React.useContext(ContextWiw); // Window inner width
    const fs = React.useContext(ContextFs); // Font size

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
                <GlobalState><MockChildren/></GlobalState>
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
