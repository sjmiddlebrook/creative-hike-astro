import { clamp } from './general';

export function sanitizeRGB(rgb: string) {
  const rgbArray = rgb.split(',');
  let r = parseInt(rgbArray[0].split('(')[1]);
  let g = parseInt(rgbArray[1]);
  let b = parseInt(rgbArray[2].split(')')[0]);
  const min = 0;
  const max = 255;
  r = clamp({ num: r, min, max });
  g = clamp({ num: g, min, max });
  b = clamp({ num: b, min, max });
  return { r, g, b };
}

export function formatRGB({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${r},${g},${b})`;
}

export function sanitizeHex(hex: string) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  const min = 0;
  const max = 255;
  r = clamp({ num: r, min, max });
  g = clamp({ num: g, min, max });
  b = clamp({ num: b, min, max });
  const adjustedHex = RGBToHex({ r, g, b });
  return adjustedHex;
}

export function isValidHexColor(code: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(code);
}

export function isValidRgbColor(color: string): boolean {
  const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return false;

  const [_, r, g, b] = match.map(Number);
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

export function RGBToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const min = 0;
  const max = 255;
  let rHex = clamp({ num: r, min, max }).toString(16);
  let gHex = clamp({ num: g, min, max }).toString(16);
  let bHex = clamp({ num: b, min, max }).toString(16);

  if (rHex.length == 1) {
    rHex = '0' + rHex;
  }
  if (gHex.length == 1) {
    gHex = '0' + gHex;
  }
  if (bHex.length == 1) {
    bHex = '0' + bHex;
  }

  return '#' + rHex + gHex + bHex;
}

export function hexToRGB(h: string) {
  let r = '0';
  let g = '0';
  let b = '0';
  if (h.length === 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }
  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
}
