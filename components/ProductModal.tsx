'use client';

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Globe2, 
  ShieldCheck, 
  Target, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  Bookmark, 
  Share2, 
  Calendar,
  AlertTriangle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { AffiliateProduct } from '@/types/affiliate';
import { formatNumber, formatCurrency } from '@/lib/export-utils';
import { countryFlagMap, platformMeta } from '@/data/all-products';

interface ProductModalProps {
  product: AffiliateProduct | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isComparing: boolean;
  onToggleCompare: (product: AffiliateProduct) => void;
}

export function ProductModal({
  product,
  onClose,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
}: ProductModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedAllKeywords, setCopiedAllKeywords] = useState(false);

  if (!product) return null;

  const meta = platformMeta[product.platform];

  const handleCopySingleKeyword = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const handleCopyAllKeywords = () => {
    if (!product.bofuKeywords) return;
    const allKw = product.bofuKeywords.map(k => k.keyword).join('\n');
    navigator.clipboard.writeText(allKw);
    setCopiedAllKeywords(true);
    setTimeout(() => setCopiedAllKeywords(false), 2000);
  };

  const handleCopyData = () => {
    const text = `
Produto: ${product.name}
Plataforma: ${product.platform} (Rank #${product.rank})
Segmento: ${product.category} - ${product.subCategory}
Payout Médio: $${product.avgPayout} (${product.commissionRate})
AOV: $${product.avgOrderValue} | Taxa de Conversão: ${product.conversionRate}%
Buscas Google/mês: ${product.monthlySearches.toLocaleString()} (${product.searchGrowthPct >= 0 ? '+' : ''}${product.searchGrowthPct}% em Out/2026)
Acessos Funil/mês: ${product.monthlyWebVisits.toLocaleString()} (${product.funnelType})
Top Países: ${product.topCountries.map(c => `${c.countryName} (${c.sharePercent}%)`).join(', ')}
Gancho Principal: ${product.primaryAngle}
Público Alvo: ${product.targetDemographics}
Compliance: ${product.adCompliance}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-950/40 relative">
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
              product.launchYear === 2026
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
            }`}>
              🚀 Lançamento {product.launchDate}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {product.registeredDateText || product.activeStatus}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/40">
              📦 {product.productType}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 font-mono text-emerald-400 font-bold text-xs border border-slate-800">
              {product.networkOfferId}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700">
              Rank #{product.rank} em {product.platform}
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${meta.badgeBg}`}>
              {product.platform}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-950/60 text-sky-300 font-bold text-xs border border-sky-800/80">
              🇺🇸 {product.topCountries[0]?.sharePercent || 75}% EUA
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              {product.category} · {product.subCategory}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                {product.tagline}
              </p>
            </div>

            {product.affiliatePageUrl && (
              <a
                href={product.affiliatePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 font-bold text-xs transition-all shrink-0 self-start sm:self-center"
              >
                <span>Página de Afiliados (JV)</span>
                <Sparkles className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                Buscas Google / Mês
              </span>
              <div className="mt-1">
                <span className="text-xl font-black text-white">
                  {formatNumber(product.monthlySearches)}
                </span>
                <div className="text-[10px] font-bold text-emerald-400 mt-0.5">
                  {product.searchGrowthPct >= 0 ? `+${product.searchGrowthPct}%` : `${product.searchGrowthPct}%`} vs Setembro
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Acessos Funil / Mês
              </span>
              <div className="mt-1">
                <span className="text-xl font-black text-white">
                  {formatNumber(product.monthlyWebVisits)}
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Funil: <strong className="text-slate-300">{product.funnelType}</strong>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                Comissão Média
              </span>
              <div className="mt-1">
                <span className="text-xl font-black text-emerald-400">
                  {formatCurrency(product.avgPayout)}
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {product.commissionRate}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Gravidade / CR
              </span>
              <div className="mt-1">
                <span className="text-xl font-black text-purple-300">
                  {product.gravityScore.toFixed(1)}
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Conv. Média: <strong className="text-white">{product.conversionRate}%</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Winning Hook & Target Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Target className="w-4 h-4" />
                <span>Ângulo de Marketing Campeão</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                &ldquo;{product.primaryAngle}&rdquo;
              </p>
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-300">Avatar Alvo:</strong> {product.targetDemographics}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Diretrizes de Tráfego & Compliance</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Classificação de Anúncio:</span>
                  <span className="font-semibold text-emerald-400">{product.adCompliance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ticket Médio (AOV):</span>
                  <span className="font-semibold text-white">{formatCurrency(product.avgOrderValue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Modelo de Cobrança:</span>
                  <span className="font-semibold text-white">{product.payoutType}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Bottom-of-Funnel (BOFU) Keywords (MELHORES PALAVRAS-CHAVE PARA FUNDO DO FUNIL) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950/60 to-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
                    <span>Melhores Palavras-Chave para Fundo de Funil (BOFU)</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Alta Intenção de Compra
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Termos com maior taxa de conversão para campanhas na Rede de Pesquisa do Google e Bing Ads.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCopyAllKeywords}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all cursor-pointer"
                title="Copiar todas as palavras-chave para o Google Ads"
              >
                {copiedAllKeywords ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAllKeywords ? 'Todas Copiadas!' : 'Copiar Lista Completa'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {product.bofuKeywords?.map((kwItem, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-slate-950 text-slate-400 text-[10px] font-mono font-bold flex items-center justify-center border border-slate-800 shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-300 truncate">
                      {kwItem.keyword}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {kwItem.intent}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-white mono-num">
                        {formatNumber(kwItem.monthlySearches)}
                      </span>
                      <span className="text-[10px] text-slate-500 block">buscas/mês</span>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-amber-300">
                        {kwItem.cpcEstimate}
                      </span>
                      <span className="text-[10px] text-slate-500 block">CPC Médio</span>
                    </div>

                    <button
                      onClick={() => handleCopySingleKeyword(kwItem.keyword)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        copiedKeyword === kwItem.keyword
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Copiar palavra-chave"
                    >
                      {copiedKeyword === kwItem.keyword ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Top Buyer Geos Distribution */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Distribuição Geográfica de Compradores (Setembro e Outubro 2026)</span>
              </div>
              <span className="text-[11px] text-slate-400">Base em pedidos reais</span>
            </div>

            <div className="space-y-2">
              {product.topCountries.map((geo) => {
                const info = countryFlagMap[geo.countryCode];
                return (
                  <div key={geo.countryCode} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{info?.flag || '🌐'}</span>
                        <span className="font-medium text-slate-200">{info?.name || geo.countryName}</span>
                        <span className="text-[10px] text-slate-500">({geo.countryCode})</span>
                      </div>
                      <span className="font-bold text-white">{geo.sharePercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" 
                        style={{ width: `${geo.sharePercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Traffic Sources Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Origem do Tráfego dos Top Afiliados</span>
              </div>
              <span className="text-[11px] text-slate-400">Canais de mídia paga e orgânica</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.trafficSources.map((source) => (
                <div key={source.channel} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 truncate">{source.channel}</div>
                  <div className="text-sm font-bold text-white mt-1">{source.percentage}%</div>
                  <div className="w-full h-1 rounded-full bg-slate-800 mt-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Key Benefits */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Diferenciais Competitivos para Afiliados
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {product.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(product)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                isComparing
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{isComparing ? 'Na Comparação' : 'Adicionar à Comparação'}</span>
            </button>

            <button
              onClick={() => onToggleSave(product.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                isSaved
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
              <span>{isSaved ? 'Salvo' : 'Salvar Oferta'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span>{copied ? 'Copiado!' : 'Copiar Dossiê da Oferta'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
