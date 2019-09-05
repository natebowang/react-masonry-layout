import binarySearch, {binarySearchDefaultSmaller, binarySearchDefaultLarger} from './binarySearch';

let a = [1, 3, 67, 126, 345, 673, 1002];

test('Binary search for 126', ()=>{
    expect(binarySearch(a, 126)).toBe(3);
    expect(binarySearchDefaultSmaller(a, 126)).toBe(3);
    expect(binarySearchDefaultLarger(a, 126)).toBe(3);
});

test('Binary search for 127', ()=>{
    expect(binarySearch(a, 127)).toBe(-1);
    expect(binarySearchDefaultSmaller(a, 127)).toBe(3);
    expect(binarySearchDefaultLarger(a, 127)).toBe(4);
});
