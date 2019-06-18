import React, {useRef, useEffect, memo, useContext} from 'react';
import {HALF_GAP} from '../config'; // rem
// import PropTypes from "prop-types";

const MasonryTable = memo(({renderItem, matrix, columnWidth, columnNo, items}) => {
    // table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
    // cell之间的孔隙，在renderItem里设置padding。
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
                            items={items}
                    />
                )
            })}
        </div>
    )
}, (prev, next) => {
    return prev.matrix === next.matrix
        && prev.columnWidth === next.columnWidth
        && prev.columnNo === next.columnNo
});
export default MasonryTable;

const Column = memo(({renderItem, column, columnWidth, items}) => {
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
                          items={items}
                    />
                )
            })}
        </div>
    )
}, (prev, next) => {
    return prev.column === next.column
        && prev.columnWidth === next.columnWidth
});

// render props
const Cell = memo(({renderItem, itemIndex, items}) => {
    const cellStyle = {
        padding: HALF_GAP + 'rem',
        margin: '0',
        border: '0',
    };

    return (
        <div style={cellStyle}>
            {renderItem(items[itemIndex])}
        </div>
    );
}, (prev, next) => {
    return prev.itemIndex === next.itemIndex
});
