import matrixCache from './matrixCache';

class InitStore {
    constructor() {
        this.fs = undefined;
        this.wiw = undefined;
        this.columnWidth = undefined;
        this.columnNo = undefined;
        this.matrixCache = matrixCache;
        this.matrix = [];
        this.items = [];
        this.pageNo = 0;
    }
}
export default InitStore;
