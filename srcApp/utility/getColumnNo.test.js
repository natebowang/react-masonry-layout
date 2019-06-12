import getColumnNo from './getColumnNo';

test('Calculate column number from different font size and window inner width', () => {
    expect(getColumnNo(16, 500)).toBe(1);
    expect(getColumnNo(18, 500)).toBe(1);
    expect(getColumnNo(16, 700)).toBe(2);
    expect(getColumnNo(16, 1024)).toBe(3);
});
