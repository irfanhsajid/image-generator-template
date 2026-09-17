'use client';

import React from 'react';
import { Type, Sparkles, X } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { TemplateSelector } from './TemplateSelector';
import { DownloadButtons } from './DownloadButtons';
import { ProductTemplate } from '@/lib/canvas/types';

interface ProductFormProps {
  productName: string;
  onProductNameChange: (name: string) => void;
  oilColor: string;
  onOilColorChange: (color: string) => void;
  selectedTemplateId: string;
  onSelectTemplateId: (id: string) => void;
  template: ProductTemplate;
}

const SAMPLE_NAMES = ['Mask Rizali', 'Royal Oudh', 'Red African', 'Eden Juicy Apple', 'Chocolate Musk'];

export const ProductForm: React.FC<ProductFormProps> = ({
  productName,
  onProductNameChange,
  oilColor,
  onOilColorChange,
  selectedTemplateId,
  onSelectTemplateId,
  template,
}) => {
  return (
    <div className="space-y-6">
      {/* Product Name Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="product-name"
            className="text-xs font-semibold uppercase tracking-wider text-amber-200/80 flex items-center gap-1.5"
          >
            <Type className="w-3.5 h-3.5 text-amber-400" />
            Product Name (Neck Label)
          </label>
          <span className="text-[11px] text-zinc-400">Centered on neck sticker</span>
        </div>

        <div className="relative">
          <input
            id="product-name"
            type="text"
            value={productName}
            onChange={(e) => onProductNameChange(e.target.value)}
            placeholder="e.g. Mask Rizali"
            className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium pr-10"
          />
          {productName && (
            <button
              type="button"
              onClick={() => onProductNameChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-1"
              title="Clear product name"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick sample pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-400/80" />
            Quick:
          </span>
          {SAMPLE_NAMES.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => onProductNameChange(sample)}
              className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800/80" />

      {/* Oil Color Picker */}
      <ColorPicker value={oilColor} onChange={onOilColorChange} />

      <div className="h-px bg-zinc-800/80" />

      {/* Template Selector */}
      <TemplateSelector selectedId={selectedTemplateId} onSelect={onSelectTemplateId} />

      <div className="h-px bg-zinc-800/80" />

      {/* Download Action Buttons */}
      <DownloadButtons template={template} productName={productName} oilColor={oilColor} />
    </div>
  );
};
