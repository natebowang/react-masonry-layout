import getColumnWidth from '../utility/getColumnWidth';
import getColumnNo from '../utility/getColumnNo';

export default (prev, action) => {
    let columnWidth = getColumnWidth(action.fs, action.wiw);
    let columnNo = getColumnNo(action.fs, action.wiw);
    let cwS = prev.ms.getCwCache(columnWidth);
    let cnS = cwS.getCnCache(columnNo);
    cnS.followCellHeights(cwS.cellHeights);
    return {...prev,
        fs: action.fs,
        wiw: action.wiw,
        columnWidth: columnWidth,
        columnNo: columnNo,
        matrix: cnS.itemIndexMatrix,
    };
};
