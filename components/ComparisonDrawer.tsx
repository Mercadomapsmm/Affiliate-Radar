'use client';

import React from 'react';
import { X, Layers, Trash2, Globe2, ArrowRight } from 'lucide-react';
import { AffiliateProduct } from '@/types/affiliate';
import { formatNumber, formatCurrency } from '@/lib/export-utils';
import { countryFlagMap, platformMeta } from '@/data/all-products';

interface ComparisonDrawerProps {
  products: AffiliateProduct[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
  onOpenDetails: (product: AffiliateProduct) => void;
}

export function ComparisonDrawer({
  products,
  isOpen,
  onClose,
  onRemoveProduct,
  onClearAll,
  onOpenDetails,
}: ComparisonDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div 
        className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Comparativo Direto de Ofertas
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                  {products.length} selecionadas
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Compare métricas financeiras, buscas, tráfego e ângulos de marketing lado a lado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Comparison Grid */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto">
          {products.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Nenhuma oferta selecionada para comparação. Clique no ícone de camadas nos cards para adicionar.
            </div>
          ) : (
            <div className={`grid grid-cols-${products.length} gap-4 min-w-[600px]`}>
              {products.map((product) => {
                const meta = platformMeta[product.platform];
                return (
                  <div 
                    key={product.id} 
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top Action */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${meta.badgeBg}`}>
                          {product.platform}
                        </span>
                        <button
                          onClick={() => onRemoveProduct(product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Remover"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="font-bold text-white text-base leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                        {product.tagline}
                      </p>

                      {/* Stat Rows */}
                      <div className="mt-4 space-y-2.5 text-xs divide-y divide-slate-800/60">
                        
                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-slate-500">Status:</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {product.activeStatus}
                          </span>
                        </div>

                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-slate-500">ID da Oferta:</span>
                          <span className="font-mono text-emerald-400 font-bold text-[11px]">{product.networkOfferId}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Segmento:</span>
                          <span className="text-white font-medium">{product.category}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Rank na Rede:</span>
                          <span className="text-emerald-400 font-bold">#{product.rank}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Comissão Média:</span>
                          <span className="text-emerald-400 font-bold">{formatCurrency(product.avgPayout)}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Modelo:</span>
                          <span className="text-white font-medium">{product.commissionRate}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Buscas Google:</span>
                          <span className="text-slate-200 font-bold">{formatNumber(product.monthlySearches)}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Acessos Funil:</span>
                          <span className="text-cyan-300 font-bold">{formatNumber(product.monthlyWebVisits)}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Gravidade:</span>
                          <span className="text-purple-300 font-bold">{product.gravityScore.toFixed(1)}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Funil:</span>
                          <span className="text-white font-medium">{product.funnelType}</span>
                        </div>

                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Compliance:</span>
                          <span className="text-emerald-400 font-medium text-[11px]">{product.adCompliance}</span>
                        </div>

                        <div className="pt-2 space-y-1">
                          <span className="text-slate-500 block">Top Países:</span>
                          <div className="flex flex-wrap gap-1">
                            {product.topCountries.slice(0, 3).map((g) => (
                              <span key={g.countryCode} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                                {countryFlagMap[g.countryCode]?.flag} {g.countryCode} ({g.sharePercent}%)
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 space-y-1">
                          <span className="text-slate-500 block">Gancho de Conversão:</span>
                          <p className="text-[11px] text-slate-300 italic bg-slate-900 p-2 rounded-lg border border-slate-800/80">
                            &ldquo;{product.primaryAngle}&rdquo;
                          </p>
                        </div>

                      </div>
                    </div>

                    <button
                      onClick={() => onOpenDetails(product)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Ver Dossiê Completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
