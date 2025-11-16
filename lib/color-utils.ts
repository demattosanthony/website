export interface ColorData {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  oklch: { l: number; c: number; h: number };
  x: number;
  y: number;
}

export const rgbToHex = (r: number, g: number, b: number): string =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h =
      (max === r
        ? (g - b) / d + (g < b ? 6 : 0)
        : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const rgbToOklch = (r: number, g: number, b: number) => {
  const toLinear = (c: number) => {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rL = toLinear(r);
  const gL = toLinear(g);
  const bL = toLinear(b);

  // RGB to OKLab
  const l = 0.4122214708 * rL + 0.5363325363 * gL + 0.0514459929 * bL;
  const m = 0.2119034982 * rL + 0.6806995451 * gL + 0.1073969566 * bL;
  const s = 0.0883024619 * rL + 0.2817188376 * gL + 0.6299787005 * bL;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + b_ * b_);
  let H = (Math.atan2(b_, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return {
    l: Math.round(L * 100) / 100,
    c: Math.round(C * 1000) / 1000,
    h: Math.round(H * 10) / 10,
  };
};

export const formatColorValue = (format: string, color: ColorData): string => {
  switch (format) {
    case "hex":
      return color.hex;
    case "rgb":
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    case "hsl":
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    case "oklch":
      return `oklch(${color.oklch.l} ${color.oklch.c} ${color.oklch.h})`;
    default:
      return "";
  }
};

export const drawMagnifiedLoupe = (
  loupeCanvas: HTMLCanvasElement,
  sourceCanvas: HTMLCanvasElement,
  x: number,
  y: number,
  size = 15,
  displaySize = 120
) => {
  const ctx = loupeCanvas.getContext("2d");
  const sourceCtx = sourceCanvas.getContext("2d");
  if (!ctx || !sourceCtx) return;

  loupeCanvas.width = displaySize;
  loupeCanvas.height = displaySize;

  // Get and scale pixels
  const sourceData = sourceCtx.getImageData(
    Math.max(0, x - size / 2),
    Math.max(0, y - size / 2),
    size,
    size
  );

  ctx.imageSmoothingEnabled = false;
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = size;
  tempCanvas.height = size;
  const tempCtx = tempCanvas.getContext("2d");

  if (tempCtx) {
    tempCtx.putImageData(sourceData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0, size, size, 0, 0, displaySize, displaySize);
  }

  // Draw grid
  const pixelSize = displaySize / size;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
  ctx.lineWidth = 0.5;

  for (let i = 0; i <= size; i++) {
    const pos = i * pixelSize;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, displaySize);
    ctx.moveTo(0, pos);
    ctx.lineTo(displaySize, pos);
    ctx.stroke();
  }

  // Highlight center pixel
  const center = Math.floor(size / 2) * pixelSize;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 2;
  ctx.strokeRect(center, center, pixelSize, pixelSize);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(center + 1, center + 1, pixelSize - 2, pixelSize - 2);
};
