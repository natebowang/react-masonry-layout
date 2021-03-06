import getColumnWidth from './getColumnWidth';
import {round2} from "./math";

test('Calculate column width from different font size and window inner width', () => {
    expect(round2(getColumnWidth(16, 500))).toBe(30.05);
    expect(round2(getColumnWidth(18, 500))).toBe(26.58);
    expect(round2(getColumnWidth(16, 1000))).toBe(28);
    expect(round2(getColumnWidth(16, 1024))).toBe(28);
});