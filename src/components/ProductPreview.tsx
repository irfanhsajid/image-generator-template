'use client';

import React, { useEffect, useRef, useState } from 'react';
import { renderProductImageToCanvas } from '@/lib/canvas/renderer';
import { ProductTemplate } from '@/lib/canvas/types';
import { Loader2, Maximize2, Minimize2, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ProductPreviewProps {
  template: ProductTemplate;
  productName: string;
  oilColor: string;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  template,
  productName,
  oilColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActualSize, setIsActualSize] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      setIsRendering(true);
      setError(null);

      try {
        await renderProductImageToCanvas(canvas, {
          template,
          productName,
          oilColor,
        });
      } catch (err: unknown) {
        if (!isCancelled) {
          console.error('Canvas render error:', err);
          setError(err instanceof Error ? err.message : 'Failed to render image');
        }
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [template, productName, oilColor]);

  return (
    <div className="flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-zinc-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            Live Bottle Preview
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
            1024 × 1024 px
          </span>
          <button
            type="button"
            onClick={() => setIsActualSize(!isActualSize)}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/80 hover:bg-zinc-700/80 px-2 py-1 rounded-lg border border-zinc-700/50 transition-colors cursor-pointer"
            title={isActualSize ? 'Fit to window' : 'View full 100% scale'}
          >
            {isActualSize ? (
              <>
                <Minimize2 className="w-3 h-3" />
                <span className="text-[11px]">Fit</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3" />
                <span className="text-[11px]">Zoom</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview canvas viewport */}
      <div
        className={`relative flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-auto rounded-b-2xl border-x border-b border-zinc-800/80 min-h-[460px] ${
          isActualSize ? 'block' : ''
        }`}
      >
        {/* Subtle studio glow in center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="w-72 h-72 rounded-full blur-3xl opacity-20 transition-all duration-700"
            style={{ backgroundColor: oilColor }}
          />
        </div>

        {/* Loading overlay */}
        {isRendering && (
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] flex items-center justify-center z-10 transition-opacity">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700 px-3.5 py-2 rounded-xl shadow-xl">
              <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs font-medium text-zinc-200">Updating canvas...</span>
            </div>
          </div>
        )}

        {/* Error notification */}
        {error && (
          <div className="absolute inset-x-6 top-6 bg-red-950/80 border border-red-800 text-red-200 p-3 rounded-xl text-xs z-20">
            {error}
          </div>
        )}

        {/* The HTML Canvas */}
        <div
          className={`relative shadow-2xl shadow-black/80 rounded-xl overflow-hidden transition-transform duration-200 ${
            isActualSize
              ? 'w-[1024px] h-[1024px]'
              : 'w-full max-w-[440px] aspect-square flex items-center justify-center'
          }`}
        >
          <canvas
            ref={canvasRef}
            width={1024}
            height={1024}
            className="w-full h-full object-contain block bg-white"
          />
        </div>
      </div>

      {/* Footer metadata */}
      <div className="flex items-center justify-between px-4 py-2.5 text-[11px] text-zinc-400 border-t border-zinc-850">
        <div className="flex items-center gap-2">
          <span>Active:</span>
          <span className="text-zinc-300 font-medium">{template.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: oilColor }} />
          <span className="font-mono">{oilColor.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
