export default (prev, action) => {
    let cw = prev.columnWidth;
    let cn = prev.columnNo;
    prev.matrixCache
        .getCwCache(cw)
        .getCnCache(cn)
        .setColumnHeight(action.columnIndex, action.columnHeight);
    console.debug(prev.matrixCache
        .getCwCache(cw)
        .getCnCache(cn)
        .offsetBottomMatrix
    );
    return {...prev};
};