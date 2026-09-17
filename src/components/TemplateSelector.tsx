'use client';

import React from 'react';
import { TEMPLATES } from '@/lib/canvas/templates';
import { Layers, CheckCircle2, Lock } from 'lucide-react';

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedId, onSelect }) => {
  const templateList = Object.values(TEMPLATES);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-amber-200/80 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          Bottle Template
        </label>
        <span className="text-[11px] text-amber-300/90 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30 font-medium">
          All 4 Templates Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {templateList.map((tpl) => {
          const isSelected = selectedId === tpl.id;
          const isDisabled = tpl.disabled;

          return (
            <button
              key={tpl.id}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(tpl.id)}
              className={`relative flex flex-col p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-amber-400/90 bg-gradient-to-b from-amber-500/20 to-amber-500/5 ring-1 ring-amber-400/40 shadow-lg shadow-amber-950/20'
                  : isDisabled
                  ? 'border-zinc-800/60 bg-zinc-900/30 opacity-60 cursor-not-allowed'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/60 cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-zinc-100">{tpl.name}</span>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                ) : isDisabled ? (
                  <span className="flex items-center gap-1 text-[10px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/40 flex-shrink-0">
                    <Lock className="w-2.5 h-2.5" />
                    Phase 2
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="text-amber-300/80 font-medium">{tpl.edition}</span>
                <span>•</span>
                <span>{tpl.volume}</span>
                <span>•</span>
                <span className="font-mono text-[10px] text-zinc-400">1024×1024</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
