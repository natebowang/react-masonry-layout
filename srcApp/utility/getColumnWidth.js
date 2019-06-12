import {HALF_GAP} from '../config';
import {MIN_COLUMN_NO} from '../config';

// 当宽度小到一定程度，判断为手机用户，尽量占满屏幕
export default (fs, wiw) => {
    const defaultColumnWidth = 20;
    // 58rem大概是900px。小于这个值，列数不变，但是把空白位置占满。
    if (wiw < 900) {
        const completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
            / (defaultColumnWidth * fs));
        const defaultColumnNo = Math.max(MIN_COLUMN_NO, completeColumnNo);
        return (wiw / fs - 2 * HALF_GAP) / defaultColumnNo;
    } else {
        return defaultColumnWidth; // rem
    }
};
