import './tail';
test('Get the last element from an array', ()=>{
    expect([1, 2, 3].tail()).toBe(3);
    expect([].tail()).toBe(undefined);
});