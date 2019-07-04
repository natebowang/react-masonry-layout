// half half between cells in masonry layout
export const HALF_GAP = 0.6; // rem

// Column number can not less than this value
export const MIN_COLUMN_NO = 1;

// If window inner width less than this, column width will
// larger than DEFAULT_COLUMN_WIDTH to extend to the maximum use of the window.
export const WIW_THRESHOLD = 915; // px,
// One column: full wiw<=692,
// Two columns: full 692<wiw<=915, not full 915<wiw<=1364
// Three columns: not full 1364<wiw<=1811
// Four columns: not full 1811<wiw<=1920

export const DEFAULT_COLUMN_WIDTH = 28; // rem

export const SCROLL_BAR_WIDTH = 0; // rem
