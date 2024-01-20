// https://dev.to/youssefzidan/javascript-functions-that-will-make-your-life-much-easier-1imh#remtopx
export function remToPx(rem: number) {
  if (typeof window === 'undefined') return rem * 16;
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
