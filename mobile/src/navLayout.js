export const TOP_TAB_HEIGHT = 60;
export const EXTRA_SCREEN_TOP_GAP = 12;

export function getTopReservedSpace(insetsTop) {
  return TOP_TAB_HEIGHT + insetsTop;
}

export function getScreenTopPadding(insetsTop) {
  return getTopReservedSpace(insetsTop) + EXTRA_SCREEN_TOP_GAP;
}
