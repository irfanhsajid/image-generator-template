/**
 * Label Typography Engine
 * Handles font sizing, centering, auto-scaling, and multi-line wrapping to fit the label sticker.
 */

import { ProductTemplate } from './types';

export function renderLabelText(
  ctx: CanvasRenderingContext2D,
  labelConfig: ProductTemplate['label'],
  text: string
): void {
  const cleanText = text.trim();
  if (!cleanText) return;

  const { x, y, width, height } = labelConfig;
  const initialFontSize = labelConfig.fontSize || 25;
  const fontFamily =
    labelConfig.fontFamily || 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const fontWeight = labelConfig.fontWeight || '700';
  const fontColor = labelConfig.fontColor || '#000000';

  const maxLabelWidth = width - 20; // 10px padding each side
  const centerX = Math.round(x + width / 2);
  const centerY = Math.round(y + height / 2);

  ctx.save();
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Try single line with initial font size
  let currentFontSize = initialFontSize;
  ctx.font = `${fontWeight} ${currentFontSize}px ${fontFamily}`;
  let textWidth = ctx.measureText(cleanText).width;

  // If it fits as a single line:
  if (textWidth <= maxLabelWidth) {
    ctx.fillText(cleanText, centerX, centerY);
    ctx.restore();
    return;
  }

  // 2. If it is slightly too long, scale font size down gradually to 16px
  while (currentFontSize > 16 && textWidth > maxLabelWidth) {
    currentFontSize -= 0.5;
    ctx.font = `${fontWeight} ${currentFontSize}px ${fontFamily}`;
    textWidth = ctx.measureText(cleanText).width;
  }

  if (textWidth <= maxLabelWidth) {
    ctx.fillText(cleanText, centerX, centerY);
    ctx.restore();
    return;
  }

  // 3. For longer names with multiple words, wrap into two lines
  const words = cleanText.split(/\s+/);
  if (words.length > 1) {
    // Find optimal split point
    let bestLine1 = '';
    let bestLine2 = '';
    let minDiff = Infinity;

    for (let i = 1; i < words.length; i++) {
      const l1 = words.slice(0, i).join(' ');
      const l2 = words.slice(i).join(' ');
      const diff = Math.abs(l1.length - l2.length);
      if (diff < minDiff) {
        minDiff = diff;
        bestLine1 = l1;
        bestLine2 = l2;
      }
    }

    let wrapFontSize = 15;
    ctx.font = `${fontWeight} ${wrapFontSize}px ${fontFamily}`;
    let l1Width = ctx.measureText(bestLine1).width;
    let l2Width = ctx.measureText(bestLine2).width;

    while ((l1Width > maxLabelWidth || l2Width > maxLabelWidth) && wrapFontSize > 10) {
      wrapFontSize -= 0.5;
      ctx.font = `${fontWeight} ${wrapFontSize}px ${fontFamily}`;
      l1Width = ctx.measureText(bestLine1).width;
      l2Width = ctx.measureText(bestLine2).width;
    }

    const lineHeight = wrapFontSize * 1.25;
    const y1 = Math.round(centerY - lineHeight * 0.52);
    const y2 = Math.round(centerY + lineHeight * 0.52);

    ctx.fillText(bestLine1, centerX, y1);
    ctx.fillText(bestLine2, centerX, y2);
  } else {
    // Single extremely long word
    while (textWidth > maxLabelWidth && currentFontSize > 10) {
      currentFontSize -= 0.5;
      ctx.font = `${fontWeight} ${currentFontSize}px ${fontFamily}`;
      textWidth = ctx.measureText(cleanText).width;
    }
    ctx.fillText(cleanText, centerX, centerY);
  }

  ctx.restore();
}
