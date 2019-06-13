import React, {createContext, useReducer} from 'react';
import matrixCache from './matrixCache';
import mockItemsFactory from "./mockItemsFactory";

export const Ctx = createContext();

export default ({children, reducer}) => {
    const [store, dispatch] = useReducer(reducer, new InitStore());

    return (
        <Ctx.Provider value={{store, dispatch}}>
            {children}
        </Ctx.Provider>
    )
};

class InitStore {
    constructor() {
        this.fs = undefined;
        this.wiw = undefined;
        this.columnWidth = undefined;
        this.columnNo = undefined;
        this.matrixCache = matrixCache;
        this.matrix = undefined;
        this.items = mockItemsFactory(10); // mock
    }
}
