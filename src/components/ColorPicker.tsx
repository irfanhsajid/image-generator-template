'use client';

import React from 'react';
import { COLOR_PRESETS } from '@/lib/canvas/templates';
import { Pipette } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) {
      val = '#' + val;
    }
    onChange(val);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-amber-200/80 flex items-center gap-1.5">
          <Pipette className="w-3.5 h-3.5 text-amber-400" />
          Oil Color
        </label>
        <span className="text-xs font-mono text-zinc-400">{value.toUpperCase()}</span>
      </div>

      {/* Input row: color swatch + native picker + hex input */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-amber-500/30 shadow-inner group cursor-pointer">
          <div
            className="w-full h-full transition-transform group-hover:scale-110"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            title="Pick a custom color"
          />
        </div>

        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">#</span>
          <input
            type="text"
            value={value.replace('#', '')}
            onChange={handleHexChange}
            maxLength={6}
            placeholder="C58B42"
            className="w-full pl-7 pr-3 py-2.5 bg-zinc-900/90 border border-zinc-700/60 rounded-xl font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 transition-all uppercase"
          />
        </div>
      </div>

      {/* Preset Swatches */}
      <div>
        <div className="text-[11px] font-medium text-zinc-400 mb-2">Luxury Oil Presets:</div>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = value.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => onChange(preset.hex)}
                title={`${preset.name} (${preset.description})`}
                className={`group flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/15 shadow-sm ring-1 ring-amber-400/50'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/60'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0 border border-white/20 shadow-sm"
                  style={{ backgroundColor: preset.hex }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-zinc-200 truncate leading-tight group-hover:text-white">
                    {preset.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
