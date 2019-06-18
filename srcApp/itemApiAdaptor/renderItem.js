import React from 'react';

export const titlePadding = 0.4;
export const titleFontSize = 1.2;
export const titleLineHeight = 1.15;
const titleStyle = {
    padding: titlePadding + 'rem',
    fontSize: titleFontSize + 'rem',
    lineHeight: titleLineHeight,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto',
    overflow: 'hidden',
};
export const contentPadding = 0.4;
export const contentFontSize = 1;
export const contentLineHeight = 1.15;
const contentStyle = {
    padding: contentPadding + 'rem',
    fontSize: contentFontSize + 'rem',
    lineHeight: contentLineHeight,
    borderRadius: '0.2rem',
    background: '#e0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-word',
    overflow: 'hidden',
};

const renderItem = (item) => {
    return (
        <>
            <div style={titleStyle}>
                {item.id} {item.title}
            </div>
            <div style={contentStyle}>
                {item.content}
            </div>
        </>
    )
};
export default renderItem;