import getColumnWidth from '../utility/getColumnWidth';
import getColumnNo from '../utility/getColumnNo';


export default (prev, action) => {
    let columnWidth = getColumnWidth(action.fs, action.wiw);
    let columnNo = getColumnNo(action.fs, action.wiw);
    let cwC = prev.matrixCache.getCwCache(columnWidth);
    cwC.followItems(prev.items, columnWidth);
    let cnC = cwC.getCnCache(columnNo);
    cnC.followCellHeights(cwC.cellHeights);
    return {...prev,
        fs: action.fs,
        wiw: action.wiw,
        columnWidth: columnWidth,
        columnNo: columnNo,
        matrix: cnC.itemIndexMatrix,
    };
};
