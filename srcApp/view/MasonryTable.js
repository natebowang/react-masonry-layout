import React, {useRef, useEffect, memo, useContext} from 'react';
import {HALF_GAP} from '../config'; // rem
// import PropTypes from "prop-types";

const MasonryTable = memo(({renderItem, matrix, columnWidth, columnNo}) => {

    // table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
    const tableStyle = {
        display: 'flex',
        justifyContent: 'center',
        padding: HALF_GAP + 'rem',
        minWidth: (columnWidth * columnNo) + 'rem',
    };

    return (
        <div style={tableStyle}>
            {matrix.map((column, columnIndex) => {
                return (
                    <Column key={columnIndex}
                            renderItem={renderItem}
                            column={column}
                            columnWidth={columnWidth}
                    />
                )
            })}
        </div>
    )
}, (prev, next) => {
    return prev.matrix === next.matrix && prev.columnWidth === next.columnWidth
});
export default MasonryTable;

const Column = memo(({renderItem, column, columnWidth}) => {
    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: columnWidth + 'rem',
    };

    return (
        <div style={columnStyle}>
            {column.map(itemIndex => {
                return (
                    <Cell key={itemIndex}
                          renderItem={renderItem}
                          itemIndex={itemIndex}
                    />
                )
            })}
        </div>
    )
}, (prev, next) => {
    return prev.column === next.column && prev.columnWidth === next.columnWidth
});

// render props
const Cell = memo(({renderItem, itemIndex}) => {
    const cellStyle = {
        padding: HALF_GAP + 'rem',
        margin: '0',
        border: '0',
    };

    return (
        <div style={cellStyle}>
            {renderItem(itemIndex)}
        </div>
    );
}, (prev, next) => {
    return prev.itemIndex === next.itemIndex
});
