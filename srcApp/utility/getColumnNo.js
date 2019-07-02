import {HALF_GAP, MIN_COLUMN_NO, SCROLL_BAR_WIDTH} from '../config';
import getColumnWidth from './getColumnWidth';

export default (fs, wiw) => {
    const completeColumnNo = Math.round((wiw / fs - 2 * HALF_GAP - SCROLL_BAR_WIDTH)
        / (getColumnWidth(fs, wiw)));
    // 最小也得是1列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};
