import React from 'react';
import renderer from 'react-test-renderer';
import renderItem from './renderItem';

const item = {
    "id": 1,
    "title": "HTTP headers for the responsible developer",
    "content": "A hidden Cupid in Vermeer’s Girl Reading a Letter at an Open Window, one of the world’s most famous paintings, is set to resurface on the canvas after two and a half centuries behind a layer of paint. During restoration work, conservators discovered, to their surprise, that the naked figure—which dominates the upper right section of the picture—was overpainted long after the artist’s death."
};

const MockContainer = ({renderItem, item}) => {
    return (
        <>
            {renderItem(item)}
        </>
    )
};

// snapshot test with react-test-renderer
test("App changes the class when hovered", () => {
    const component = renderer.create(
        <MockContainer renderItem={renderItem}
                       item={item}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
