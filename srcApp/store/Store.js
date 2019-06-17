import React, {createContext, useReducer} from 'react';
import matrixCache from './matrixCache';

export const Ctx = createContext();

const Store = ({children, reducer}) => {
    const [store, dispatch] = useReducer(reducer, new InitStore());

    return (
        <Ctx.Provider value={{store, dispatch}}>
            {children}
        </Ctx.Provider>
    )
};
export default Store;

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
