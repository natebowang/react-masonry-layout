import {
    HALF_GAP, MIN_COLUMN_NO, DEFAULT_COLUMN_WIDTH, WIW_THRESHOLD, SCROLL_BAR_WIDTH
} from '../config';

// 当宽度小到一定程度，判断为手机用户，尽量占满屏幕
export default (fs, wiw) => {
    // 小于这个门限值，列数不变，但是把空白位置占满。
    if (wiw <= WIW_THRESHOLD) {
        const approximateColumnNo = Math.round((wiw / fs - 2 * HALF_GAP - SCROLL_BAR_WIDTH)
            / DEFAULT_COLUMN_WIDTH);
        const columnNo = Math.max(MIN_COLUMN_NO, approximateColumnNo);
        return ((wiw) / fs - 2 * HALF_GAP - SCROLL_BAR_WIDTH) / columnNo; // rem
    } else {
        return DEFAULT_COLUMN_WIDTH; // rem
    }
};
