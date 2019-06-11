export default (fs, wiw) => {
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
        / (getColumnWidth(fs, wiw) * fs));
    // 最小也得是1列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};
