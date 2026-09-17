'use client';

import React, { useState } from 'react';
import { Download, Archive, Loader2, Check } from 'lucide-react';
import JSZip from 'jszip';
import { renderProductImage } from '@/lib/canvas/renderer';
import { ProductTemplate } from '@/lib/canvas/types';
import { TEMPLATES } from '@/lib/canvas/templates';

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
  const [isDownloadingSingle, setIsDownloadingSingle] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [zipStatusText, setZipStatusText] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<'single' | 'zip' | null>(null);

  const cleanName = (productName.trim() || 'Qimah-Perfume').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

  const handleDownloadSingle = async () => {
    try {
      setIsDownloadingSingle(true);
      setDownloadSuccess(null);

      const blob = await renderProductImage({
        template,
        productName: productName.trim() || 'Qimah Perfume',
        oilColor,
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const templateSuffix = template.id
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('-');

      link.download = `${cleanName}-${templateSuffix}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1500);

      setDownloadSuccess('single');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Single download failed:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloadingSingle(false);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      setDownloadSuccess(null);

      const zip = new JSZip();
      const allTemplates = Object.values(TEMPLATES);
      const folderName = `${cleanName}-Images`;
      const imgFolder = zip.folder(folderName) || zip;

      for (let i = 0; i < allTemplates.length; i++) {
        const tpl = allTemplates[i];
        setZipStatusText(`Rendering ${i + 1}/${allTemplates.length} (${tpl.name})...`);

        const blob = await renderProductImage({
          template: tpl,
          productName: productName.trim() || 'Qimah Perfume',
          oilColor,
        });

        const templateSuffix = tpl.id
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join('-');

        const fileName = `${cleanName}-${templateSuffix}.png`;
        imgFolder.file(fileName, blob);
      }

      setZipStatusText('Creating ZIP archive...');
      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.download = `${cleanName}-All-4-Bottles.zip`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      setDownloadSuccess('zip');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('ZIP generation failed:', err);
      alert('Failed to generate ZIP archive. Please try again.');
    } finally {
      setIsDownloadingZip(false);
      setZipStatusText('');
    }
  };

  const anyBusy = isDownloadingSingle || isDownloadingZip;

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      {/* Primary: Download Current Template PNG */}
      <button
        type="button"
        onClick={handleDownloadSingle}
        disabled={anyBusy}
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold text-sm shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isDownloadingSingle ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
            <span>Rendering PNG...</span>
          </>
        ) : downloadSuccess === 'single' ? (
          <>
            <Check className="w-4 h-4 text-zinc-950 stroke-[3]" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-zinc-950" />
            <span>Download PNG</span>
          </>
        )}
      </button>

      {/* Secondary: Generate & Download All 4 in a ZIP */}
      <button
        type="button"
        onClick={handleDownloadZip}
        disabled={anyBusy}
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-800/80 hover:from-zinc-700 hover:to-zinc-750 border border-zinc-750 hover:border-amber-500/50 text-zinc-100 font-semibold text-sm shadow-md hover:shadow-zinc-900/40 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        title="Render all 4 bottle editions in parallel and download a packaged ZIP archive"
      >
        {isDownloadingZip ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span className="text-xs">{zipStatusText || 'Packaging ZIP...'}</span>
          </>
        ) : downloadSuccess === 'zip' ? (
          <>
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span className="text-emerald-300">ZIP Downloaded!</span>
          </>
        ) : (
          <>
            <Archive className="w-4 h-4 text-amber-400" />
            <span>Download All 4 (ZIP)</span>
          </>
        )}
      </button>
    </div>
  );
};
