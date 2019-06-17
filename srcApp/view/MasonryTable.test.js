import React from 'react';
import renderer from 'react-test-renderer';
import Table from './MasonryTable';

const mockRenderItem = (itemIndex) => {
    return <div>{itemIndex}</div>
};

const mockColumnWidth = 20;
const mockColumnNo = 4;
const mockMatrix = [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11]];

// snapshot test with react-test-renderer
test("App changes the class when hovered", () => {
    const component = renderer.create(
        <Table renderItem={mockRenderItem}
               matrix={mockMatrix}
               columnWidth={mockColumnWidth}
               columnNo={mockColumnNo}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});



