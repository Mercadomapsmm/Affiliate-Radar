'use client';

import React from 'react';
import { Search, Eye, DollarSign, TrendingUp, Globe2, Award, Zap } from 'lucide-react';
import { AffiliateProduct } from '@/types/affiliate';
import { formatNumber, formatCurrency } from '@/lib/export-utils';

interface StatsBannerProps {
  products: AffiliateProduct[];
}

export function StatsBanner({ products }: StatsBannerProps) {
  // Calculate summary metrics
  const totalSearches = products.reduce((acc, p) => acc + p.monthlySearches, 0);
  const totalVisits = products.reduce((acc, p) => acc + p.monthlyWebVisits, 0);
  const avgPayout = products.length > 0
    ? products.reduce((acc, p) => acc + p.avgPayout, 0) / products.length
    : 0;
  const risingOffers = products.filter((p) => p.trendStatus === 'Em Alta ↗' || p.trendStatus === 'Nova Explosão').length;
  const topProduct = products[0] || null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      
      {/* Metric 1: Monthly Searches */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">Buscas Mensais (Google)</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white tracking-tight">
            {formatNumber(totalSearches)}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">
            +14.2% em Out/26
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
          Demanda orgânica de compradores
        </p>
      </div>

      {/* Metric 2: Funnel Visits */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">Acessos aos Funis / Mês</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Eye className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white tracking-tight">
            {formatNumber(totalVisits)}
          </span>
          <span className="text-[11px] text-cyan-400 font-semibold">
            Tráfego Global
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
          Meta, Native, Google & TikTok Ads
        </p>
      </div>

      {/* Metric 3: Avg Payout / Commission */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">Payout / Comissão Média</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white tracking-tight">
            {formatCurrency(avgPayout)}
          </span>
          <span className="text-[10px] text-slate-400">
            por venda/pedido
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
          Até $153.20 em Nutra & VSLs
        </p>
      </div>

      {/* Metric 4: Trending and Top Offer */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">Ofertas em Alta (Out/26)</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Zap className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white tracking-tight">
            {risingOffers}
          </span>
          <span className="text-[11px] text-purple-400 font-semibold">
            {Math.round((risingOffers / (products.length || 1)) * 100)}% do catálogo
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
          {topProduct ? `#1: ${topProduct.name}` : 'Aceleração contínua'}
        </p>
      </div>

    </div>
  );
}
