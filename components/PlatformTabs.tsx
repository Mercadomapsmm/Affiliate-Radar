'use client';

import React from 'react';
import { Platform } from '@/types/affiliate';
import { platformMeta } from '@/data/all-products';
import { Globe, DollarSign, Target, ShieldCheck, Sparkles } from 'lucide-react';

interface PlatformTabsProps {
  selectedPlatform: Platform | 'Todas';
  onSelectPlatform: (platform: Platform | 'Todas') => void;
  countsByPlatform: {
    total: number;
    ClickBank: number;
    Digistore24: number;
    MediaScalers: number;
    SmartADV: number;
  };
}

export function PlatformTabs({
  selectedPlatform,
  onSelectPlatform,
  countsByPlatform,
}: PlatformTabsProps) {
  const tabs: Array<{ id: Platform | 'Todas'; label: string; count: number; sub: string }> = [
    { id: 'Todas', label: 'Todas as Plataformas', count: countsByPlatform.total, sub: '1.200 Mais Buscados (Crescente)' },
    { id: 'ClickBank', label: 'ClickBank', count: countsByPlatform.ClickBank, sub: 'Top 300 Mais Buscados' },
    { id: 'Digistore24', label: 'Digistore24', count: countsByPlatform.Digistore24, sub: 'Top 300 Mais Buscados' },
    { id: 'MediaScalers', label: 'MediaScalers', count: countsByPlatform.MediaScalers, sub: 'Top 300 Mais Buscados' },
    { id: 'SmartADV', label: 'SmartADV', count: countsByPlatform.SmartADV, sub: 'Top 300 Mais Buscados' },
  ];

  const currentMeta = selectedPlatform !== 'Todas' ? platformMeta[selectedPlatform] : null;

  return (
    <div className="space-y-3">
      {/* Platform Buttons Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {tabs.map((tab) => {
          const isActive = selectedPlatform === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectPlatform(tab.id)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 hover:bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />
              )}
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {tab.label}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {tab.count}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 truncate w-full">
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Platform Highlight Contextual Box */}
      {currentMeta && (
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {currentMeta.name} — Inteligência de Mercado
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${currentMeta.badgeBg}`}>
                100 Produtos Verificados
              </span>
            </div>
            <p className="text-slate-400 text-xs">{currentMeta.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Modelo:</span>
              <span className="font-semibold text-white">{currentMeta.payoutModel}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Top Geos:</span>
              <span className="font-medium text-slate-200">{currentMeta.topGeos.slice(0, 3).join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
