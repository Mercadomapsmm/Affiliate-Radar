'use client';

import React from 'react';
import { AffiliateProduct } from '@/types/affiliate';
import { formatNumber, formatCurrency } from '@/lib/export-utils';
import { countryFlagMap, platformMeta } from '@/data/all-products';
import { ExternalLink, Bookmark, Layers, Search, Eye, DollarSign } from 'lucide-react';

interface ProductTableProps {
  products: AffiliateProduct[];
  onOpenDetails: (product: AffiliateProduct) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  comparisonIds: string[];
  onToggleCompare: (product: AffiliateProduct) => void;
}

export function ProductTable({
  products,
  onOpenDetails,
  savedIds,
  onToggleSave,
  comparisonIds,
  onToggleCompare,
}: ProductTableProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3 w-14 text-center">Rank</th>
              <th className="py-3 px-3">Produto & Plataforma</th>
              <th className="py-3 px-3">Segmento</th>
              <th className="py-3 px-3">Comissão Média</th>
              <th className="py-3 px-3">Buscas Google (Mês)</th>
              <th className="py-3 px-3">Acessos Funil</th>
              <th className="py-3 px-3">Top Países</th>
              <th className="py-3 px-3">Score / CR</th>
              <th className="py-3 px-3">Funil</th>
              <th className="py-3 px-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {products.map((product) => {
              const meta = platformMeta[product.platform];
              const isSaved = savedIds.includes(product.id);
              const isComparing = comparisonIds.includes(product.id);

              return (
                <tr 
                  key={product.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Rank */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-white text-xs bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                      #{product.rank}
                    </span>
                  </td>

                  {/* Product & Platform */}
                  <td className="py-3 px-3 max-w-xs">
                    <div className="flex flex-col">
                      <span 
                        onClick={() => onOpenDetails(product)}
                        className="font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer truncate"
                        title={product.name}
                      >
                        {product.name}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border ${meta.badgeBg}`}>
                          {product.platform}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          Ativo
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 truncate">
                          {product.networkOfferId}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Segment */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-slate-300 font-medium bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                      {product.category}
                    </span>
                  </td>

                  {/* Average Payout */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-emerald-400 text-xs">
                        {formatCurrency(product.avgPayout)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {product.commissionRate}
                      </span>
                    </div>
                  </td>

                  {/* Monthly Google Searches */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-baseline gap-1">
                      <span className="font-semibold text-slate-200">
                        {formatNumber(product.monthlySearches)}
                      </span>
                      <span className={`text-[10px] font-bold ${product.searchGrowthPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {product.searchGrowthPct >= 0 ? `+${product.searchGrowthPct}%` : `${product.searchGrowthPct}%`}
                      </span>
                    </div>
                  </td>

                  {/* Funnel Visits */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-semibold text-cyan-300">
                      {formatNumber(product.monthlyWebVisits)}/mês
                    </span>
                  </td>

                  {/* Top Countries */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {product.topCountries.slice(0, 3).map((geo) => {
                        const countryInfo = countryFlagMap[geo.countryCode];
                        return (
                          <span
                            key={geo.countryCode}
                            className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-slate-950 text-[10px] border border-slate-800"
                            title={`${countryInfo?.name || geo.countryName}: ${geo.sharePercent}%`}
                          >
                            <span>{countryInfo?.flag || '🌐'}</span>
                            <span className="text-slate-400 font-medium">{geo.countryCode}</span>
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* Gravity / CR */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-purple-300">
                        {product.gravityScore.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        CR {product.conversionRate}%
                      </span>
                    </div>
                  </td>

                  {/* Funnel Type */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {product.funnelType}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onToggleCompare(product)}
                        className={`p-1.5 rounded-lg border text-xs transition-colors ${
                          isComparing
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
                        }`}
                        title="Comparar"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onToggleSave(product.id)}
                        className={`p-1.5 rounded-lg border text-xs transition-colors ${
                          isSaved
                            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                            : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
                        }`}
                        title="Salvar"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => onOpenDetails(product)}
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 transition-all font-semibold"
                        title="Ver Raio-X Detalhado"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
