export const Side = {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left',
} as const;
export type Side = (typeof Side)[keyof typeof Side];

export const AlignedPlacement = {
  TopStart: 'top-start',
  TopEnd: 'top-end',
  RightStart: 'right-start',
  RightEnd: 'right-end',
  BottomStart: 'bottom-start',
  BottomEnd: 'bottom-end',
  LeftStart: 'left-start',
  LeftEnd: 'left-end',
} as const;
export type AlignedPlacement =
  (typeof AlignedPlacement)[keyof typeof AlignedPlacement];
