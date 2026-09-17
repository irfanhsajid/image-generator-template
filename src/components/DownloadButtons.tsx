'use client';

import React, { useState } from 'react';
import { Download, PackageCheck, Loader2, Sparkles } from 'lucide-react';
import { renderProductImage } from '@/lib/canvas/renderer';
import { ProductTemplate } from '@/lib/canvas/types';

interface DownloadButtonsProps {
  template: ProductTemplate;
  productName: string;
  oilColor: string;
}

export const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  template,
  productName,
  oilColor,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadSingle = async () => {
    try {
      setIsDownloading(true);

      const blob = await renderProductImage({
        template,
        productName: productName.trim() || 'Qimah Perfume',
        oilColor,
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const cleanName = (productName.trim() || 'Qimah-Perfume').replace(/\s+/g, '-');
      const templateSuffix = template.id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('-');
      link.download = `${cleanName}-${templateSuffix}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to generate image. Please check the console.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      {/* Primary: Download PNG */}
      <button
        type="button"
        onClick={handleDownloadSingle}
        disabled={isDownloading}
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold text-sm shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
            <span>Rendering 1024×1024 PNG...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-zinc-950" />
            <span>Download PNG</span>
          </>
        )}
      </button>

      {/* Secondary: Generate All 4 (Disabled for Phase 1) */}
      <button
        type="button"
        disabled
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 font-medium text-sm cursor-not-allowed opacity-60"
        title="Phase 2 Feature: Generate all 4 bottle variations into a single ZIP archive"
      >
        <PackageCheck className="w-4 h-4 text-zinc-400" />
        <span>Generate All 4 (ZIP)</span>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-300/80 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
          Phase 2
        </span>
      </button>
    </div>
  );
};
