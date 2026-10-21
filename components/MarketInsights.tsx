'use client';

import React from 'react';
import { X, BarChart3, TrendingUp, Globe2, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { AffiliateProduct } from '@/types/affiliate';
import { formatNumber, formatCurrency } from '@/lib/export-utils';
import { countryFlagMap } from '@/data/all-products';

interface MarketInsightsProps {
  products: AffiliateProduct[];
  isOpen: boolean;
  onClose: () => void;
  onOpenDetails: (product: AffiliateProduct) => void;
}

export function MarketInsights({
  products,
  isOpen,
  onClose,
  onOpenDetails,
}: MarketInsightsProps) {
  if (!isOpen) return null;

  // Compute category share
  const categoryCounts: Record<string, { count: number; searches: number; avgPayout: number }> = {};
  products.forEach((p) => {
    if (!categoryCounts[p.category]) {
      categoryCounts[p.category] = { count: 0, searches: 0, avgPayout: 0 };
    }
    categoryCounts[p.category].count += 1;
    categoryCounts[p.category].searches += p.monthlySearches;
    categoryCounts[p.category].avgPayout += p.avgPayout;
  });

  const categoryArray = Object.entries(categoryCounts).map(([cat, val]) => ({
    category: cat,
    count: val.count,
    searches: val.searches,
    avgPayout: Math.round(val.avgPayout / val.count),
    percentOfTotal: Math.round((val.count / products.length) * 100),
  })).sort((a, b) => b.count - a.count);

  // Compute country presence
  const countryCounts: Record<string, number> = {};
  products.forEach((p) => {
    p.topCountries.forEach((c) => {
      countryCounts[c.countryCode] = (countryCounts[c.countryCode] || 0) + c.sharePercent;
    });
  });

  const topCountriesRank = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([code, score]) => ({
      code,
      name: countryFlagMap[code]?.name || code,
      flag: countryFlagMap[code]?.flag || '🌐',
      score: Math.round(score),
    }));

  // Top 5 Fastest Growing in Oct/2026
  const topGrowing = [...products]
    .sort((a, b) => b.searchGrowthPct - a.searchGrowthPct)
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div 
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Relatório de Inteligência de Mercado
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold">
                  Setembro & Outubro 2026
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Consolidação de 1.200 produtos analisados em ClickBank, Digistore24, MediaScalers e SmartADV (300 por plataforma)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* Executive Overview */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Destaques Macroeconômicos dos Afiliados em 2026</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              O terceiro e quarto trimestres de 2026 revelam uma demanda massiva por <strong>produtos Nutra focados em saúde preventiva e suplementação natural</strong> (glicose, audição, perda de peso com ativação térmica e microbioma). Em paralelo, no segmento de <strong>E-commerce</strong>, o modelo de pagamento na entrega (<strong>COD - Cash on Delivery</strong> da SmartADV) bateu recordes históricos de conversão na Itália, Espanha, Romênia e Brasil, contornando a aversão a cartões de crédito. Na Digistore24, áudios e reprogramações cerebrais (The Genius Wave) dominam o faturamento de info-produtos.
            </p>
          </div>

          {/* Grid: Category Dominance vs Top Geos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Category breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Divisão por Segmentos
                </span>
                <span className="text-[10px] text-slate-400">Total 400 Ofertas</span>
              </div>

              <div className="space-y-2.5">
                {categoryArray.slice(0, 6).map((cat) => (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{cat.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">{cat.count} ofertas ({cat.percentOfTotal}%)</span>
                        <span className="font-bold text-emerald-400 text-[11px]">Payout Médio: ${cat.avgPayout}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${cat.percentOfTotal}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  Países que Mais Compram
                </span>
                <span className="text-[10px] text-slate-400">Share Ponderado</span>
              </div>

              <div className="space-y-2">
                {topCountriesRank.map((c, idx) => (
                  <div key={c.code} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-500 w-4">#{idx + 1}</span>
                      <span className="text-base">{c.flag}</span>
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({c.code})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-cyan-400">{c.score} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Top 5 Fastest Growing Offers */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Top 5 Produtos em Maior Explosão de Buscas (Outubro/2026 vs Setembro)
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Tendências Quentes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {topGrowing.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => {
                    onClose();
                    onOpenDetails(prod);
                  }}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{prod.platform}</span>
                      <span className="text-emerald-400 font-bold">+{prod.searchGrowthPct}%</span>
                    </div>
                    <h4 className="font-bold text-white text-xs group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {prod.name}
                    </h4>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="text-slate-300 font-semibold">{formatNumber(prod.monthlySearches)} buscas</div>
                    <div className="text-emerald-400 font-bold">{formatCurrency(prod.avgPayout)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
          >
            Fechar Relatório
          </button>
        </div>

      </div>
    </div>
  );
}
