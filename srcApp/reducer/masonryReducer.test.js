import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import MasonryReducer, {CtxItemIndexMatrix} from './masonryReducer';
import getFirstLabelByInnerHTMLPattern from '../utility/getFirstLabelByInnerHTMLPattern'

const MockChildren = () => {
    const itemIndexMatrix = React.useContext(CtxItemIndexMatrix);
    return (
        <>
            <label>
                {'Item index matrix: '}
                <span>{itemIndexMatrix.toString()}</span>
            </label>
        </>
    )
};

let container = document.createElement('div');
document.body.appendChild(container);

xdescribe('GlobalState Component', () => {
        window.getComputedStyle = () => ({fontSize: '16px'});
        window.innerWidth = 500;
        act(() => {
            ReactDom.render(
                <GsWiwFs><MockChildren/></GsWiwFs>
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
