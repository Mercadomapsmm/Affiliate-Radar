'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  allProducts, 
  filterAndSortProducts, 
  platformMeta, 
  categoriesList 
} from '@/data/all-products';
import { AffiliateProduct, FilterState, Platform } from '@/types/affiliate';
import { Header } from '@/components/Header';
import { PlatformTabs } from '@/components/PlatformTabs';
import { StatsBanner } from '@/components/StatsBanner';
import { FilterBar } from '@/components/FilterBar';
import { ProductCard } from '@/components/ProductCard';
import { ProductTable } from '@/components/ProductTable';
import { ProductModal } from '@/components/ProductModal';
import { ComparisonDrawer } from '@/components/ComparisonDrawer';
import { MarketInsights } from '@/components/MarketInsights';
import { 
  ChevronDown, 
  Sparkles, 
  Layers, 
  Search, 
  ArrowUp,
  Bookmark,
  TrendingUp,
  ShieldCheck,
  Check
} from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedPlatform: 'Todas',
  selectedCategory: 'Todos',
  selectedCountry: 'Todos',
  selectedFunnel: 'Todos',
  selectedTrend: 'Todos',
  onlyActive: true,
  minPayout: 0,
  sortBy: 'searches',
  sortOrder: 'asc', // Ordem crescente dos números de buscas conforme solicitado
};

const ITEMS_PER_PAGE = 30;

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [activeView, setActiveView] = useState<'grid' | 'table'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<AffiliateProduct | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Saved / Bookmarks state initialized lazily from localStorage
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('affiliate_radar_saved');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Comparison state (up to 4 products)
  const [comparisonProducts, setComparisonProducts] = useState<AffiliateProduct[]>([]);

  // Save bookmarks to localStorage
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem('affiliate_radar_saved', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return updated;
    });
  };

  // Toggle Compare
  const handleToggleCompare = (product: AffiliateProduct) => {
    setComparisonProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Você pode comparar no máximo 4 produtos ao mesmo tempo.');
        return prev;
      }
      const updated = [...prev, product];
      setShowComparison(true);
      return updated;
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparisonProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearCompare = () => {
    setComparisonProducts([]);
    setShowComparison(false);
  };

  // Counts by platform
  const countsByPlatform = useMemo(() => {
    return {
      total: allProducts.length,
      ClickBank: allProducts.filter((p) => p.platform === 'ClickBank').length,
      Digistore24: allProducts.filter((p) => p.platform === 'Digistore24').length,
      MediaScalers: allProducts.filter((p) => p.platform === 'MediaScalers').length,
      SmartADV: allProducts.filter((p) => p.platform === 'SmartADV').length,
    };
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = allProducts;
    if (showSavedOnly) {
      list = list.filter((p) => savedIds.includes(p.id));
    }
    return filterAndSortProducts(list, filters);
  }, [filters, showSavedOnly, savedIds]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredProducts.length);
  };

  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setShowSavedOnly(false);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleToggleSavedOnly = () => {
    setShowSavedOnly((prev) => !prev);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        filteredCount={filteredProducts.length}
        totalCount={allProducts.length}
        productsToExport={filteredProducts}
        savedCount={savedIds.length}
        showSavedOnly={showSavedOnly}
        onToggleSavedOnly={handleToggleSavedOnly}
        showComparison={showComparison}
        comparisonCount={comparisonProducts.length}
        onOpenComparison={() => setShowComparison(true)}
        activeView={activeView}
        onChangeView={setActiveView}
        showInsightsModal={showInsights}
        onToggleInsights={() => setShowInsights(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero & Context Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Catálogo 100% Ativo & Verificado — Setembro & Outubro 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Top 100 Produtos com Mais Buscas por Plataforma
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Base de dados consolidada com os <strong className="text-emerald-400 font-semibold">100 produtos de maior volume de buscas no Google</strong> em cada uma das redes: <strong className="text-slate-200">ClickBank</strong> (100), <strong className="text-slate-200">Digistore24</strong> (100), <strong className="text-slate-200">MediaScalers</strong> (100) e <strong className="text-slate-200">SmartADV</strong> (100) em Setembro e Outubro de 2026. Todos estritamente ativos e ordenados por demanda real.
            </p>
          </div>

          <div className="flex items-center gap-2 relative z-10 shrink-0">
            <button
              onClick={() => setShowInsights(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>Relatório de Tendências 2026</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Platform Tabs Switcher (ClickBank, Digistore24, MediaScalers, SmartADV, All) */}
        <PlatformTabs
          selectedPlatform={filters.selectedPlatform}
          onSelectPlatform={(platform) => handleUpdateFilters({ selectedPlatform: platform })}
          countsByPlatform={countsByPlatform}
        />

        {/* Macro Stats Banner */}
        <StatsBanner products={filteredProducts} />

        {/* Filter & Search Bar */}
        <FilterBar
          filters={filters}
          onUpdateFilters={handleUpdateFilters}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredProducts.length}
        />

        {/* Saved Filter Notice */}
        {showSavedOnly && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 fill-rose-400 text-rose-400" />
              Exibindo apenas suas ofertas salvas ({filteredProducts.length})
            </span>
            <button
              onClick={() => setShowSavedOnly(false)}
              className="font-bold underline text-rose-300 hover:text-white"
            >
              Mostrar todo o catálogo
            </button>
          </div>
        )}

        {/* Product Listing (Grid vs Table) */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Nenhum produto encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Nenhuma oferta correspondeu aos filtros aplicados. Tente diminuir as restrições ou limpar a busca.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-semibold transition-colors"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        ) : activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setSelectedProduct}
                isSaved={savedIds.includes(product.id)}
                onToggleSave={handleToggleSave}
                isComparing={comparisonProducts.some((p) => p.id === product.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={displayedProducts}
            onOpenDetails={setSelectedProduct}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            comparisonIds={comparisonProducts.map((p) => p.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {/* Load More & Pagination Bar */}
        {hasMore && (
          <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>Carregar mais {Math.min(ITEMS_PER_PAGE, filteredProducts.length - visibleCount)} ofertas</span>
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={handleShowAll}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
            >
              Exibir todas ({filteredProducts.length})
            </button>
          </div>
        )}

        {/* Summary Footer Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-200">AffiliateRadar 2026</span> — Dados compilados de monitoramento de tráfego, buscas orgânicas e marketplaces oficiais.
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>400 Produtos Indexados</span>
            <span>·</span>
            <span>Atualizado: Outubro 2026</span>
          </div>
        </div>

      </main>

      {/* Floating Compare Notification Bar if items in compare */}
      {comparisonProducts.length > 0 && !showComparison && (
        <div className="fixed bottom-5 right-5 z-40 bg-slate-900 border border-amber-500/40 rounded-2xl p-3 shadow-2xl flex items-center gap-3 animate-bounce">
          <Layers className="w-5 h-5 text-amber-400" />
          <div className="text-xs">
            <strong className="text-white">{comparisonProducts.length} ofertas</strong> selecionadas
          </div>
          <button
            onClick={() => setShowComparison(true)}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
          >
            Comparar
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isSaved={selectedProduct ? savedIds.includes(selectedProduct.id) : false}
        onToggleSave={handleToggleSave}
        isComparing={selectedProduct ? comparisonProducts.some((p) => p.id === selectedProduct.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      <ComparisonDrawer
        products={comparisonProducts}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onRemoveProduct={handleRemoveFromCompare}
        onClearAll={handleClearCompare}
        onOpenDetails={(p) => {
          setShowComparison(false);
          setSelectedProduct(p);
        }}
      />

      <MarketInsights
        products={allProducts}
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
        onOpenDetails={(p) => setSelectedProduct(p)}
      />

    </div>
  );
}
