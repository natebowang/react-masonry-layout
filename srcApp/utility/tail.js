// Utility function return last item form an array.
// [1,2,3].tail() === 3;
// [].tail() === undefined;
if (!Array.prototype.tail) {
    Array.prototype.tail = function (i = 0) { // eslint-disable-line
        return this[this.length - 1 - i];
    };
}