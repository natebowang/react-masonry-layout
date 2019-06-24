import {
    HALF_GAP, MIN_COLUMN_NO, DEFAULT_COLUMN_WIDTH, WIW_THRESHOLD, SCROLL_BAR_WIDTH
} from '../config';

// 当宽度小到一定程度，判断为手机用户，尽量占满屏幕
export default (fs, wiw) => {
    // 小于这个门限值，列数不变，但是把空白位置占满。
    if (wiw <= WIW_THRESHOLD) {
        const completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs - SCROLL_BAR_WIDTH)
            / (DEFAULT_COLUMN_WIDTH * fs));
        const defaultColumnNo = Math.max(MIN_COLUMN_NO, completeColumnNo);
        return ((wiw - SCROLL_BAR_WIDTH) / fs - 2 * HALF_GAP) / defaultColumnNo;
    } else {
        return DEFAULT_COLUMN_WIDTH; // rem
    }
};
