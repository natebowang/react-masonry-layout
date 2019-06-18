import {HALF_GAP} from "../config";
import {
    titleFontSizeRem, titlePaddingRem, titleLineHeight,
    contentFontSizeRem, contentPaddingRem, contentLineHeight
} from "./renderItem";

// const item = {
//     "id": 1,
//     "title": "HTTP headers for the responsible developer",
//     "content": "A hidden Cupid in Vermeer’s Girl Reading a Letter at an Open Window, one of the world’s most famous paintings, is set to resurface on the canvas after two and a half centuries behind a layer of paint. During restoration work, conservators discovered, to their surprise, that the naked figure—which dominates the upper right section of the picture—was overpainted long after the artist’s death."
// };
const titleCharWidthPx = 9.21; // This is a experimental value
const contentCharWidthPx = 6.55; // This is a experimental value
export default (item, columnWidthRem, fs) => {
    const gapPx = HALF_GAP * fs * 2;
    const columnWidthPx = columnWidthRem * fs;

    const titlePaddingPx = titlePaddingRem * fs * 2;
    const titleWidthPx = columnWidthPx - titlePaddingPx - gapPx;
    const titleLineNo = Math.ceil(item.title.length * titleCharWidthPx / titleWidthPx);
    const titleLineHeightPx = Math.floor(titleFontSizeRem * fs * titleLineHeight);
    const titleHeightPx = titleLineNo * titleLineHeightPx + titlePaddingPx;

    const contentPaddingPx = contentPaddingRem * fs * 2;
    const contentWidthPx = columnWidthPx - contentPaddingPx - gapPx;
    const contentLineNo = Math.ceil(item.content.length * contentCharWidthPx / contentWidthPx);
    const contentLineHeightPx = Math.floor(contentFontSizeRem * fs * contentLineHeight);
    const contentHeightPx = contentLineNo * contentLineHeightPx + contentPaddingPx;

    // console.debug(`${item.id}: ${titleHeightPx + contentHeightPx}`);
    return titleHeightPx + contentHeightPx + gapPx;
}
