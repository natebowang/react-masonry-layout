import React from 'react';
import renderer from 'react-test-renderer';
import Table from './MasonryTable';

const mockRenderItem = (item) => {
    return <div>{item}</div>
};

const mockColumnWidth = 20;
const mockColumnNo = 4;
const mockMatrix = [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11]];
const mockItems = [...Array(15).keys()]; // [0,1, ... ,15]

// snapshot test with react-test-renderer
test("App changes the class when hovered", () => {
    const component = renderer.create(
        <Table renderItem={mockRenderItem}
               matrix={mockMatrix}
               columnWidth={mockColumnWidth}
               columnNo={mockColumnNo}
               items={mockItems}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});



