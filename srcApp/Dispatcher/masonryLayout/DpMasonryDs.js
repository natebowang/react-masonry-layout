import React, {useReducer, useEffect} from 'react';
import MasonryDs from './MasonryDs';
import {CtxFs, CtxWiw} from '../windowState/DpWiwFs';

let ds = new MasonryDs();
export const CtxItemIndexMatrix = React.createContext();

export const HALF_GAP = 1; // rem
const MIN_COLUMN_NO = 1; // 最少这么多列

// 当宽度小到一定程度，判断为手机用户，尽量占满屏幕
const getColumnWidth = (fs, wiw) => {
    const defaultColumnWidth = 20;
    // 58rem大概是900px。小于这个值，列数不变，但是把空白位置占满。
    if (wiw / fs < 58) {
        const completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
            / (defaultColumnWidth * fs));
        const defaultColumnNo = Math.max(MIN_COLUMN_NO, completeColumnNo);
        return (wiw / fs - 2 * HALF_GAP) / defaultColumnNo;
    } else {
        return defaultColumnWidth; // rem
    }
};

const getColumnNo = (fs, wiw) => {
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
        / (getColumnWidth(fs, wiw) * fs));
    // 最小也得是1列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};

const DpMasonryDs = ({children}) => {
    const fs = React.useContext(CtxFs);
    const wiw = React.useContext(CtxWiw);
    // matrix是最主要的输出值，layout矩阵，MasonryLayout就是根据这个布局的
    const [matrix, dispatch] = useReducer(
        (matrix, action) => {
            let cwds = ds.getCwds(action.columnWidth);
            let cnds = cwds.getCnds(action.columnNo);
            cnds.followCellHeights(cwds.cellHeights);
            return cnds.itemIndexMatrix;
        },
        ds.getCwds(getColumnWidth(fs, wiw))
            .getCnds(getColumnNo(fs, wiw))
            .itemIndexMatrix
    );

    useEffect(() => {
        dispatch(
            {
                columnWidth: getColumnWidth(fs, wiw),
                columnNo: getColumnNo(fs, wiw),
            });
    }, [fs, wiw]);

    return (
        <CtxItemIndexMatrix.Provider value={matrix}>
            {children}
        </CtxItemIndexMatrix.Provider>
    )
};
export default DpMasonryDs;