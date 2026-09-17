/**
 * Core Canvas Renderer Module
 * Orchestrates template layer composition, realistic oil tinting,
 * logo overlay, and neck label typography.
 */

import { ProductTemplate, RenderOptions } from './types';
import { applyOilColor } from './oil';
import { renderLabelText } from './text';

const imageCache: Map<string, HTMLImageElement> = new Map();

/**
 * Loads an image from a URL or returns the cached HTMLImageElement.
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Canvas rendering must run client-side in the browser'));
  }

  const cached = imageCache.get(url);
  if (cached && cached.complete && cached.naturalWidth > 0) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = (err) => {
      reject(new Error(`Failed to load asset at ${url}: ${err}`));
    };
    img.src = url;
  });
}

/**
 * Preloads all assets for a given template.
 */
export async function preloadTemplateAssets(template: ProductTemplate): Promise<{
  bottle: HTMLImageElement;
  oilMask: HTMLImageElement;
  logo: HTMLImageElement;
}> {
  const [bottle, oilMask, logo] = await Promise.all([
    loadImage(template.assets.bottle),
    loadImage(template.assets.oilMask),
    loadImage(template.assets.logo),
  ]);

  return { bottle, oilMask, logo };
}

/**
 * Renders the product image directly onto an existing HTMLCanvasElement.
 */
export async function renderProductImageToCanvas(
  canvas: HTMLCanvasElement,
  options: RenderOptions
): Promise<void> {
  const { template, productName, oilColor } = options;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Could not obtain 2D canvas context');
  }

  const { width, height } = template.canvas;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  // 1. Load template assets
  const { bottle, oilMask, logo } = await preloadTemplateAssets(template);

  // Ensure custom typography fonts are loaded and ready
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore font readiness errors
    }
  }

  // 2. Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 3. Draw bottle (cap, blank label, neutral liquid cavity, reflections)
  ctx.drawImage(bottle, 0, 0, width, height);

  // 4. Apply selected oil color
  applyOilColor(ctx, oilMask, oilColor, template.oil);

  // 5. Draw pristine gold logo overlay
  ctx.drawImage(logo, 0, 0, width, height);

  // 6. Render product name on the neck label
  if (productName && productName.trim()) {
    renderLabelText(ctx, template.label, productName);
  }
}

/**
 * Renders the product image and returns the result as a PNG Blob.
 */
export async function renderProductImage(options: RenderOptions): Promise<Blob> {
  if (typeof document === 'undefined') {
    throw new Error('Canvas rendering is only available in browser environments');
  }

  const canvas = document.createElement('canvas');
  await renderProductImageToCanvas(canvas, options);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to convert canvas to PNG Blob'));
      }
    }, 'image/png');
  });
}
