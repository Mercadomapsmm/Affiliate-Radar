'use client';

import React from 'react';
import { 
  Search, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Bookmark, 
  Layers, 
  ExternalLink, 
  Check, 
  Activity, 
  Sparkles,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { AffiliateProduct } from '@/types/affiliate';
import { formatNumber, formatCurrency } from '@/lib/export-utils';
import { countryFlagMap, platformMeta } from '@/data/all-products';

interface ProductCardProps {
  product: AffiliateProduct;
  onOpenDetails: (product: AffiliateProduct) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isComparing: boolean;
  onToggleCompare: (product: AffiliateProduct) => void;
}

export function ProductCard({
  product,
  onOpenDetails,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
}: ProductCardProps) {
  const meta = platformMeta[product.platform];

  return (
    <div className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/5 group relative overflow-hidden">
      
      {/* Top Banner: Rank, Platform, Category, Favorite, Compare */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          
          {/* Rank & Platform Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold text-white flex items-center justify-center shadow-inner">
              #{product.rank}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${meta.badgeBg}`}>
              {product.platform}
            </span>
            <span className="text-[10px] font-medium text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded-md border border-slate-800/60">
              {product.category}
            </span>
          </div>

          {/* Quick Actions: Compare & Save */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleCompare(product)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isComparing
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-950/50 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={isComparing ? 'Remover da comparação' : 'Comparar oferta'}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleSave(product.id)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isSaved
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-slate-950/50 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-rose-400'
              }`}
              title={isSaved ? 'Remover dos favoritos' : 'Salvar oferta'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`} />
            </button>
          </div>

        </div>

        {/* Product Title & Subtitle */}
        <h3 
          onClick={() => onOpenDetails(product)}
          className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>
        
        {/* Active Status, Launch Date & Offer ID */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            product.launchYear === 2026 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
          }`}>
            <Sparkles className="w-2.5 h-2.5" />
            <span>Lançamento {product.launchDate}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ativo
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-300 bg-sky-500/10 border border-sky-500/30 px-1.5 py-0.5 rounded-md" title="Forte aceitação e demanda comprovada nos Estados Unidos">
            <span>🇺🇸</span>
            <span>{product.topCountries[0]?.sharePercent || 75}% EUA</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
            {product.networkOfferId}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 my-3.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
          
          {/* Monthly Searches */}
          <div>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Search className="w-3 h-3 text-emerald-400" />
              Buscas Google/mês
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-slate-200">
                {formatNumber(product.monthlySearches)}
              </span>
              <span className={`text-[10px] font-semibold ${product.searchGrowthPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {product.searchGrowthPct >= 0 ? `+${product.searchGrowthPct}%` : `${product.searchGrowthPct}%`}
              </span>
            </div>
          </div>

          {/* Monthly Funnel Visits */}
          <div>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Eye className="w-3 h-3 text-cyan-400" />
              Acessos Funil/mês
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-slate-200">
                {formatNumber(product.monthlyWebVisits)}
              </span>
              <span className="text-[9px] text-slate-500 font-medium">
                {product.funnelType}
              </span>
            </div>
          </div>

          {/* Average Payout */}
          <div>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-amber-400" />
              Comissão Média
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-emerald-400">
                {formatCurrency(product.avgPayout)}
              </span>
              <span className="text-[9px] text-slate-500">
                {product.payoutType === 'RevShare' ? product.commissionRate : 'CPA'}
              </span>
            </div>
          </div>

          {/* Gravity / Score */}
          <div>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Activity className="w-3 h-3 text-purple-400" />
              Gravidade / Score
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-purple-300">
                {product.gravityScore.toFixed(1)}
              </span>
              <span className="text-[9px] text-slate-500">
                CR {product.conversionRate}%
              </span>
            </div>
          </div>

        </div>

        {/* Top Buyer Geos */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span>Países Mais Compradores:</span>
            <span className="text-slate-400">{product.topCountries[0]?.countryName} ({product.topCountries[0]?.sharePercent}%)</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {product.topCountries.slice(0, 4).map((geo) => {
              const countryInfo = countryFlagMap[geo.countryCode];
              return (
                <span
                  key={geo.countryCode}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-300 border border-slate-800"
                  title={`${countryInfo?.name || geo.countryName}: ${geo.sharePercent}% das vendas`}
                >
                  <span>{countryInfo?.flag || '🌐'}</span>
                  <span>{geo.countryCode}</span>
                  <span className="text-slate-500 font-medium">{geo.sharePercent}%</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Winning Marketing Hook / Angle */}
        <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/40 text-[11px] text-slate-400 mb-3 line-clamp-2">
          <span className="text-emerald-400 font-semibold mr-1">Gancho:</span>
          {product.primaryAngle}
        </div>
      </div>

      {/* Card Footer: Detail Button */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium text-slate-500">
          Rank Set/26: #{product.septemberRank} → Out/26: #{product.octoberRank}
        </span>
        <button
          onClick={() => onOpenDetails(product)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 transition-all duration-150 flex items-center gap-1"
        >
          <span>Raio-X Oferta</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}
