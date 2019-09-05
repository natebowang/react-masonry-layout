import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import getFirstLabelByInnerHTMLPattern from './getFirstLabelByInnerHTMLPattern';

const MockComponent = () => {
    return (
        <>
            <label>
                {'Window Inner Width: '}
                <span>1024</span>
            </label>
            <br/>
            <label>
                {'Font Size: '}
                <span>16</span>
            </label>
        </>
    )
};

let container = document.createElement('div');
document.body.appendChild(container);
act(() => {
    ReactDom.render(
        <MockComponent/>
        , container);
});

test('Get element', ()=>{
    let elementFs = getFirstLabelByInnerHTMLPattern(/font size/i).lastChild;
    let elementWiw = getFirstLabelByInnerHTMLPattern(/window inner width/i).lastChild;
    expect(elementFs.innerHTML).toBe('16');
    expect(elementWiw.innerHTML).toBe('1024');
});
