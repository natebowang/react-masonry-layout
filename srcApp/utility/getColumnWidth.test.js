import getColumnWidth from './getColumnWidth';
import {round2} from "./math";

test('Calculate column width from different font size and window inner width', () => {
    expect(round2(getColumnWidth(16, 500))).toBe(29.25);
    expect(round2(getColumnWidth(18, 500))).toBe(25.78);
    expect(round2(getColumnWidth(16, 1000))).toBe(22);
    expect(round2(getColumnWidth(16, 1024))).toBe(22);
});