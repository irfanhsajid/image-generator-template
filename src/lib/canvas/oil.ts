/**
 * Realistic Oil Color Blending for Perfume Glass Bottles
 * Preserves glass transmission, internal shadows, and white specular highlights.
 */

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RgbColor {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) {
    return { r: 197, g: 139, b: 66 }; // Default to Mask Rizali amber
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

let cachedMaskCanvas: HTMLCanvasElement | null = null;
let cachedMaskCtx: CanvasRenderingContext2D | null = null;

/**
 * Applies realistic perfume oil tint to the bottle canvas.
 */
export function applyOilColor(
  ctx: CanvasRenderingContext2D,
  maskImg: CanvasImageSource,
  oilColor: string,
  oilBounds: { x: number; y: number; width: number; height: number }
): void {
  const { r: targetR, g: targetG, b: targetB } = hexToRgb(oilColor);
  const { x, y, width, height } = oilBounds;

  // Offscreen canvas to sample the oil mask
  if (!cachedMaskCanvas) {
    cachedMaskCanvas = document.createElement('canvas');
    cachedMaskCtx = cachedMaskCanvas.getContext('2d', { willReadFrequently: true });
  }

  if (!cachedMaskCtx) return;

  if (cachedMaskCanvas.width !== width || cachedMaskCanvas.height !== height) {
    cachedMaskCanvas.width = width;
    cachedMaskCanvas.height = height;
  }

  cachedMaskCtx.clearRect(0, 0, width, height);
  // Draw the corresponding slice of the mask
  cachedMaskCtx.drawImage(maskImg, x, y, width, height, 0, 0, width, height);

  const maskData = cachedMaskCtx.getImageData(0, 0, width, height);
  const canvasData = ctx.getImageData(x, y, width, height);

  const maskPixels = maskData.data;
  const canvasPixels = canvasData.data;
  const total = canvasPixels.length;

  for (let i = 0; i < total; i += 4) {
    const maskAlpha = maskPixels[i + 3];
    if (maskAlpha === 0) continue;

    const m = maskAlpha / 255.0;
    const br = canvasPixels[i];
    const bg = canvasPixels[i + 1];
    const bb = canvasPixels[i + 2];

    // Normalized luminance of the glass/liquid cavity
    const lum = (0.299 * br + 0.587 * bg + 0.114 * bb) / 255.0;

    let cr: number;
    let cg: number;
    let cb: number;

    if (lum < 0.72) {
      // Absorption & Shadow range: deeper saturated tone towards shadows
      const t = lum / 0.72;
      const factor = 0.35 + 0.65 * t;
      cr = targetR * factor;
      cg = targetG * factor;
      cb = targetB * factor;
    } else {
      // Highlight range: smoothly transition towards pure white softbox reflections
      const t = (lum - 0.72) / 0.28;
      const h = Math.pow(t, 1.4);
      cr = targetR + (255 - targetR) * h;
      cg = targetG + (255 - targetG) * h;
      cb = targetB + (255 - targetB) * h;
    }

    // Blend into canvas with mask edge anti-aliasing
    canvasPixels[i] = Math.round(br * (1 - m) + cr * m);
    canvasPixels[i + 1] = Math.round(bg * (1 - m) + cg * m);
    canvasPixels[i + 2] = Math.round(bb * (1 - m) + cb * m);
  }

  ctx.putImageData(canvasData, x, y);
}
