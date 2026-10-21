'use client';

import React from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Globe2, 
  Tags, 
  Zap,
  Check,
  Layers,
  Calendar,
  Sparkles
} from 'lucide-react';
import { FilterState, Category, FunnelType, TrendStatus, Platform } from '@/types/affiliate';
import { categoriesList, countryFlagMap } from '@/data/all-products';

interface FilterBarProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
}

export function FilterBar({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalFiltered,
}: FilterBarProps) {
  const isFiltered = 
    filters.searchQuery !== '' ||
    filters.selectedPlatform !== 'Todas' ||
    filters.selectedLaunchYear !== 'Todos' ||
    filters.selectedCategory !== 'Todos' ||
    filters.selectedCountry !== 'Todos' ||
    filters.selectedFunnel !== 'Todos' ||
    filters.selectedTrend !== 'Todos' ||
    !filters.onlyActive ||
    filters.minPayout > 0;

  const funnelOptions: FunnelType[] = ['VSL', 'Quiz', 'COD', 'Direct Checkout', 'TSL', 'Trial/Rebill', 'Webinar'];
  const trendOptions: TrendStatus[] = ['Em Alta ↗', 'Estável / Top 1', 'Pico Sazonal', 'Nova Explosão'];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3.5 backdrop-blur-sm shadow-xl">
      
      {/* Top Search & Primary Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            placeholder="Buscar por nome da oferta, Vendor/Offer ID (ex: puravive, 512048, 19401), nicho, país..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onUpdateFilters({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              limpar
            </button>
          )}
        </div>

        {/* Controls: Active, Sort, and Reset */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Only Active Filter Switch */}
          <button
            onClick={() => onUpdateFilters({ onlyActive: !filters.onlyActive })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              filters.onlyActive
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Exibir somente ofertas ativas no marketplace"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Somente</span> Ativos
            {filters.onlyActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400 hidden md:inline">Ordenar:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="searches" className="bg-slate-900 text-white">🔥 Buscas Mensais no Google</option>
              <option value="rank" className="bg-slate-900 text-white">Rank na Plataforma (#1 a #300)</option>
              <option value="visits" className="bg-slate-900 text-white">Volume de Tráfego / Acessos</option>
              <option value="payout" className="bg-slate-900 text-white">Comissão / Payout Médio ($)</option>
              <option value="gravity" className="bg-slate-900 text-white">Score de Gravidade / Performance</option>
              <option value="growth" className="bg-slate-900 text-white">Crescimento (Set → Out 2026)</option>
            </select>
          </div>

          {/* Ascending / Descending Toggle Button */}
          <button
            onClick={() => onUpdateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              filters.sortOrder === 'asc'
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title={filters.sortOrder === 'asc' ? 'Ordem Crescente (Menor → Maior)' : 'Ordem Decrescente (Maior → Menor)'}
          >
            {filters.sortOrder === 'asc' ? (
              <>
                <span className="text-emerald-400 font-bold">▲</span>
                <span>Crescente</span>
              </>
            ) : (
              <>
                <span className="text-cyan-400 font-bold">▼</span>
                <span>Decrescente</span>
              </>
            )}
          </button>

          {/* Reset button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-colors"
              title="Redefinir todos os filtros"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Limpar</span>
            </button>
          )}
        </div>

      </div>

      {/* Filter Row: Platform, Launch Year, Segment, Country, Funnel, Trend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
        
        {/* Platform Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-400" />
            Plataforma
          </label>
          <select
            value={filters.selectedPlatform}
            onChange={(e) => onUpdateFilters({ selectedPlatform: e.target.value as Platform | 'Todas' })}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/60 cursor-pointer"
          >
            <option value="Todas" className="bg-slate-900 text-white">Todas as Redes</option>
            <option value="ClickBank" className="bg-slate-900 text-emerald-300">ClickBank (300)</option>
            <option value="Digistore24" className="bg-slate-900 text-blue-300">Digistore24 (300)</option>
            <option value="MediaScalers" className="bg-slate-900 text-amber-300">MediaScalers (300)</option>
            <option value="SmartADV" className="bg-slate-900 text-purple-300">SmartADV (300)</option>
          </select>
        </div>

        {/* Launch Year Selector (2025 - 2026) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-400" />
            Lançamento
          </label>
          <select
            value={filters.selectedLaunchYear}
            onChange={(e) => onUpdateFilters({ selectedLaunchYear: e.target.value as any })}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/60 cursor-pointer font-medium"
          >
            <option value="Todos" className="bg-slate-900 text-white">Todos (2025-2026)</option>
            <option value="2026" className="bg-slate-900 text-emerald-300">🚀 Lançados em 2026</option>
            <option value="2025" className="bg-slate-900 text-cyan-300">✨ Lançados em 2025</option>
          </select>
        </div>

        {/* Segment / Category */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Tags className="w-3 h-3 text-amber-400" />
            Segmento
          </label>
          <select
            value={filters.selectedCategory}
            onChange={(e) => onUpdateFilters({ selectedCategory: e.target.value as any })}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer"
          >
            <option value="Todos" className="bg-slate-900 text-white">Todos os Segmentos</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
            ))}
          </select>
        </div>

        {/* Top Country Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Globe2 className="w-3 h-3 text-indigo-400" />
            País Top Comprador
          </label>
          <select
            value={filters.selectedCountry}
            onChange={(e) => onUpdateFilters({ selectedCountry: e.target.value })}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/60 cursor-pointer"
          >
            <option value="Todos" className="bg-slate-900 text-white">Todos os Países</option>
            {Object.entries(countryFlagMap).map(([code, { name, flag }]) => (
              <option key={code} value={code} className="bg-slate-900 text-white">
                {flag} {name} ({code})
              </option>
            ))}
          </select>
        </div>

        {/* Funnel Type */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-pink-400" />
            Tipo de Funil
          </label>
          <select
            value={filters.selectedFunnel}
            onChange={(e) => onUpdateFilters({ selectedFunnel: e.target.value as any })}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500/60 cursor-pointer"
          >
            <option value="Todos" className="bg-slate-900 text-white">Todos os Funis</option>
            {funnelOptions.map((f) => (
              <option key={f} value={f} className="bg-slate-900 text-white">{f}</option>
            ))}
          </select>
        </div>

        {/* Trend / Status */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-purple-400" />
            Tendência Atual
          </label>
          <select
            value={filters.selectedTrend}
            onChange={(e) => onUpdateFilters({ selectedTrend: e.target.value as any })}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500/60 cursor-pointer"
          >
            <option value="Todos" className="bg-slate-900 text-white">Todas as Tendências</option>
            {trendOptions.map((t) => (
              <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Filter Stats Footnote */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Exibindo <strong className="text-white font-semibold">{totalFiltered}</strong> produtos encontrados
        </span>

        {/* Quick Segment Buttons */}
        <div className="hidden lg:flex items-center gap-1.5">
          <span className="text-slate-500 text-[10px]">Segmentos Populares:</span>
          {['Nutra', 'E-commerce', 'Info-produtos', 'Espiritualidade'].map((quickCat) => (
            <button
              key={quickCat}
              onClick={() => onUpdateFilters({ selectedCategory: filters.selectedCategory === quickCat ? 'Todos' : quickCat as Category })}
              className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                filters.selectedCategory === quickCat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {quickCat}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
