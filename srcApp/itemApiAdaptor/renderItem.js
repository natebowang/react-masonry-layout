import React from 'react';

export const titlePaddingRem = 0.4;
export const titleFontSizeRem = 1.2;
export const titleLineHeight = 1.15;
const titleStyle = {
    padding: titlePaddingRem + 'rem',
    fontSize: titleFontSizeRem + 'rem',
    lineHeight: titleLineHeight,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto',
    overflow: 'hidden',
};
export const contentPaddingRem = 0.4;
export const contentFontSizeRem = 1;
export const contentLineHeight = 1.15;
const contentStyle = {
    padding: contentPaddingRem + 'rem',
    fontSize: contentFontSizeRem + 'rem',
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