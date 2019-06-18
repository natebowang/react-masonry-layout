import {HALF_GAP} from "../config";
import {titleFontSize, titlePadding, titleLineHeight,
    contentFontSize, contentPadding, contentLineHeight}
    from "./renderItem";

// const item = {
//     "id": 1,
//     "title": "HTTP headers for the responsible developer",
//     "content": "A hidden Cupid in Vermeer’s Girl Reading a Letter at an Open Window, one of the world’s most famous paintings, is set to resurface on the canvas after two and a half centuries behind a layer of paint. During restoration work, conservators discovered, to their surprise, that the naked figure—which dominates the upper right section of the picture—was overpainted long after the artist’s death."
// };
const titleCharPerLine = 31; // This is a experimental value
const contentCharPerLine = 40; // This is a experimental value
export default (item, columnWidth, fs) => {
    const titleLineNo = Math.ceil(item.title.length / titleCharPerLine);
    const titleLineHeightPx = Math.floor(titleFontSize * fs * titleLineHeight);
    const titlePaddingPx = titlePadding * fs * 2;
    const titleHeightPx = titleLineNo * titleLineHeightPx + titlePaddingPx;

    const contentLineNo = Math.ceil(item.content.length / contentCharPerLine);
    const contentLineHeightPx = Math.floor(contentFontSize * fs * titleLineHeight);
    const contentPaddingPx = contentPadding * fs * 2;
    const contentHeightPx = contentLineNo * contentLineHeightPx + contentPaddingPx;

    // console.debug(`${item.id}: ${titleHeightPx + contentHeightPx}`);
    return titleHeightPx + contentHeightPx + fs * HALF_GAP * 2;
}
