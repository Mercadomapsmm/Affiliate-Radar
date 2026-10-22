'use client';

import React from 'react';
import { 
  TrendingUp, 
  Download, 
  Bookmark, 
  Layers, 
  BarChart3, 
  Flame, 
  FileSpreadsheet,
  Globe2,
  Calendar
} from 'lucide-react';
import { exportProductsToCSV, exportProductsToJSON } from '@/lib/export-utils';
import { AffiliateProduct } from '@/types/affiliate';

interface HeaderProps {
  filteredCount: number;
  totalCount: number;
  productsToExport: AffiliateProduct[];
  savedCount: number;
  showSavedOnly: boolean;
  onToggleSavedOnly: () => void;
  showComparison: boolean;
  comparisonCount: number;
  onOpenComparison: () => void;
  activeView: 'grid' | 'table';
  onChangeView: (view: 'grid' | 'table') => void;
  showInsightsModal: boolean;
  onToggleInsights: () => void;
}

export function Header({
  filteredCount,
  totalCount,
  productsToExport,
  savedCount,
  showSavedOnly,
  onToggleSavedOnly,
  comparisonCount,
  onOpenComparison,
  activeView,
  onChangeView,
  showInsightsModal,
  onToggleInsights,
}: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <TrendingUp className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  AffiliateRadar <span className="text-emerald-400 text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-semibold">2026 Q3/Q4</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  Lançamentos 2025-2026
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-sky-300 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded-full">
                  <span>🇺🇸</span>
                  Forte Aceitação nos EUA (70%+ US)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                1.200 Produtos com Nomes Simples e Comerciais em Ordem Crescente de Buscas (300 por Plataforma: ClickBank · Digistore24 · MediaScalers · SmartADV)
              </p>
            </div>
          </div>

          {/* Quick Actions & Export */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* View Switcher: Grid vs Dense Table */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => onChangeView('grid')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  activeView === 'grid'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visualização em Cards"
              >
                Cards
              </button>
              <button
                onClick={() => onChangeView('table')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  activeView === 'table'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tabela de Densidade de Dados"
              >
                Tabela
              </button>
            </div>

            {/* Market Insights button */}
            <button
              onClick={onToggleInsights}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                showInsightsModal
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Insights & Métricas</span>
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={onToggleSavedOnly}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                showSavedOnly
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
              <span>Salvos</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500/30 text-rose-300 text-[10px] flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Compare Trigger */}
            {comparisonCount > 0 && (
              <button
                onClick={onOpenComparison}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 animate-pulse"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Comparar ({comparisonCount})</span>
              </button>
            )}

            {/* Export Dropdown / Buttons */}
            <div className="flex items-center gap-1">
              <a
                href="/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-colors"
                title="Abrir versão autônoma index.html"
              >
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">index.html</span>
              </a>
              <button
                onClick={() => exportProductsToCSV(productsToExport)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title={`Exportar ${filteredCount} ofertas para CSV`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => exportProductsToJSON(productsToExport)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Exportar em formato JSON estruturado"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>JSON</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
