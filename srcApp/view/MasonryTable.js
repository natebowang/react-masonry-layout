import React, {useRef, useEffect, memo} from 'react';
import {HALF_GAP, SCROLL_BAR_WIDTH} from '../config'; // rem
import PropTypes from "prop-types";

const Table = ({dispatch, renderItem, matrix, columnWidth, columnNo, items}) => {
    // table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
    // cell之间的孔隙，在renderItem里设置padding。
    const tableStyle = {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: HALF_GAP + 'rem',
        minWidth: (columnWidth * columnNo - SCROLL_BAR_WIDTH) + 'rem',
    };

    return (
        <div style={tableStyle}>
            {matrix.map((column, columnIndex) => {
                return (
                    <ColumnMemo key={columnIndex}
                                dispatch={dispatch}
                                columnIndex={columnIndex}
                                renderItem={renderItem}
                                column={column}
                                columnWidth={columnWidth}
                                items={items}
                    />
                )
            })}
        </div>
    )
};
Table.propTypes = {
    dispatch: PropTypes.func,
    renderItem: PropTypes.func,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    columnWidth: PropTypes.number,
    columnNo: PropTypes.number,
    items: PropTypes.array,
};
const TableMemo = memo(Table, (prev, next) => {
    return prev.matrix === next.matrix
        && prev.columnWidth === next.columnWidth
        && prev.columnNo === next.columnNo
});
export default TableMemo;

const Column = ({dispatch, columnIndex, renderItem, column, columnWidth, items}) => {
    const columnStyle = {
        display: 'flex',
        // Very important, default will stretch to the height of the container table
        // and adjust column height will wrong.
        alignSelf: 'flex-start',
        flexDirection: 'column',
        width: columnWidth + 'rem',
    };

    const ref = useRef(null);
    useEffect(() => {
        dispatch({
            type: 'adjustColumnHeight',
            columnIndex: columnIndex,
            columnHeight: ref.current.clientHeight,
        });
    });

    return (
        <div ref={ref} style={columnStyle}>
            {column.map(itemIndex => {
                return (
                    <CellMemo key={itemIndex}
                              renderItem={renderItem}
                              itemIndex={itemIndex}
                              items={items}
                    />
                )
            })}
        </div>
    )
};
Column.propTypes = {
    dispatch: PropTypes.func,
    columnIndex: PropTypes.number,
    renderItem: PropTypes.func,
    column: PropTypes.arrayOf(PropTypes.number),
    columnWidth: PropTypes.number,
    items: PropTypes.array,
};
const ColumnMemo = memo(Column, (prev, next) => {
    return prev.column === next.column
        && prev.columnWidth === next.columnWidth
});

// Render props pattern
const Cell = ({renderItem, itemIndex, items}) => {
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
};
Cell.propTypes = {
    renderItem: PropTypes.func,
    itemIndex: PropTypes.number,
    items: PropTypes.array,
};
// CellMemo use items[itemIndex] to calculate ifEqual instead of just
// itemIndex. So if item immutably changed, CellMemo will rerender.
const CellMemo = memo(Cell, (prev, next) => {
    return prev.items[prev.itemIndex] === next.items[next.itemIndex]
});
