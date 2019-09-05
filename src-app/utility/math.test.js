import {round2} from "./math";

test('Misc test for math.js', ()=>{
    expect(round2(1)).toBe(1);
    expect(round2(1.1)).toBe(1.1);
    expect(round2(1.11)).toBe(1.11);
    expect(round2(1.111)).toBe(1.11);
    expect(round2(1.115)).toBe(1.12);
});
