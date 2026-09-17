'use client';

import React, { useState } from 'react';
import { ProductForm } from '@/components/ProductForm';
import { ProductPreview } from '@/components/ProductPreview';
import { getTemplateById, DEFAULT_TEMPLATE_ID } from '@/lib/canvas/templates';
import { Droplet, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [productName, setProductName] = useState('Mask Rizali');
  const [oilColor, setOilColor] = useState('#C58B42');
  const [selectedTemplateId, setSelectedTemplateId] = useState(DEFAULT_TEMPLATE_ID);

  const currentTemplate = getTemplateById(selectedTemplateId);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo emblem */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-serif text-zinc-950 font-bold text-lg shadow-md shadow-amber-950/40">
              Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-tight text-white">QIMAH</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Image Generator
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Client-side automated template rendering engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>All 4 Templates Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800/80">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                    Product Configuration
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Customize the label text and oil color
                  </p>
                </div>
                <div
                  className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: oilColor }}
                />
              </div>

              <ProductForm
                productName={productName}
                onProductNameChange={setProductName}
                oilColor={oilColor}
                onOilColorChange={setOilColor}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplateId={setSelectedTemplateId}
                template={currentTemplate}
              />
            </div>

            {/* Workflow Guide Card */}
            <div className="bg-gradient-to-r from-zinc-900/60 to-zinc-900/30 border border-zinc-800/60 rounded-xl p-4 text-xs text-zinc-400 space-y-2">
              <div className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                How It Works
              </div>
              <ul className="space-y-1 pl-4 list-disc text-zinc-400">
                <li>
                  <strong className="text-zinc-300">Product Name:</strong> Centered with dynamic auto-scaling to prevent overflowing the neck label.
                </li>
                <li>
                  <strong className="text-zinc-300">Oil Tint:</strong> Preserves original glass highlights, reflections, and internal refractive depth.
                </li>
                <li>
                  <strong className="text-zinc-300">QIMAH Logo:</strong> Metallic gold foil is drawn untinted on top of the liquid.
                </li>
                <li>
                  <strong className="text-zinc-300">Export:</strong> Generates crisp 1024×1024 PNG ready for e-commerce catalog or social media.
                </li>
              </ul>
            </div>
          </div>

          {/* Preview Panel (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden sticky top-24">
              <ProductPreview
                template={currentTemplate}
                productName={productName}
                oilColor={oilColor}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-4 bg-zinc-950 text-center text-xs text-zinc-400">
        <p>Qimah Fragrances • Product Mockup Generator • Client-Side HTML Canvas Engine</p>
      </footer>
    </div>
  );
}
