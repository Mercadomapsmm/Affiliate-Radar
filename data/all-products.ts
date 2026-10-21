import { AffiliateProduct, FilterState, Platform, Category } from '@/types/affiliate';
import { clickbankProducts } from './clickbank';
import { digistore24Products } from './digistore24';
import { mediaScalersProducts } from './mediascalers';
import { smartAdvProducts } from './smartadv';

const combinedRaw: AffiliateProduct[] = [
  ...clickbankProducts,
  ...digistore24Products,
  ...mediaScalersProducts,
  ...smartAdvProducts,
];

// Sort overall products by Google monthly search volume in strictly ASCENDING order (ordem crescente: menor para maior)
export const allProducts: AffiliateProduct[] = [...combinedRaw]
  .sort((a, b) => a.monthlySearches - b.monthlySearches)
  .map((p, idx) => ({
    ...p,
    overallRank: idx + 1,
  }));

export const platformMeta: Record<Platform, {
  name: Platform;
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  primaryNiches: string[];
  payoutModel: string;
  topGeos: string[];
}> = {
  ClickBank: {
    name: 'ClickBank',
    color: 'emerald',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    badgeText: 'text-emerald-400',
    description: 'Pioneira global em info-produtos e suplementos nutricionais com foco em VSLs de alta conversão.',
    primaryNiches: ['Nutra', 'Info-produtos', 'Espiritualidade', 'Relacionamentos'],
    payoutModel: 'RevShare (75%-85%) & Upsell Cart',
    topGeos: ['EUA (US)', 'Canadá (CA)', 'Reino Unido (UK)', 'Austrália (AU)', 'Brasil (BR)'],
  },
  Digistore24: {
    name: 'Digistore24',
    color: 'blue',
    badgeBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    badgeText: 'text-blue-400',
    description: 'Líder europeia e forte expansão nos EUA, destaque para produtos físicos ergonômicos e programas de áudio/mindset.',
    primaryNiches: ['Info-produtos', 'Nutra', 'E-commerce', 'Gadgets & Tech'],
    payoutModel: 'RevShare & CPA Híbrido (USD & EUR)',
    topGeos: ['Alemanha (DE)', 'EUA (US)', 'Reino Unido (UK)', 'Áustria (AT)', 'Brasil (BR)'],
  },
  MediaScalers: {
    name: 'MediaScalers',
    color: 'amber',
    badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    badgeText: 'text-amber-400',
    description: 'Rede de performance de elite para media buyers em Native & Meta Ads, com pagamentos CPA garantidos e testes A/B avançados.',
    primaryNiches: ['Nutra Direta', 'CBD & Saúde', 'E-commerce Dropship', 'Beleza'],
    payoutModel: 'CPA Fixo Semanal ($95 - $150)',
    topGeos: ['EUA (US)', 'Canadá (CA)', 'Reino Unido (UK)', 'Austrália (AU)'],
  },
  SmartADV: {
    name: 'SmartADV',
    color: 'purple',
    badgeBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    badgeText: 'text-purple-400',
    description: 'Referência internacional no modelo COD (Cash-on-Delivery), dominante na Europa Mediterrânea e América Latina.',
    primaryNiches: ['Nutra COD', 'E-commerce Físico COD', 'Beleza', 'Gadgets'],
    payoutModel: 'CPA / COD na Entrega ($25 - $45)',
    topGeos: ['Itália (IT)', 'Espanha (ES)', 'Brasil (BR)', 'Romênia (RO)', 'México (MX)'],
  },
};

export const countryFlagMap: Record<string, { name: string; flag: string }> = {
  US: { name: 'Estados Unidos', flag: '🇺🇸' },
  BR: { name: 'Brasil', flag: '🇧🇷' },
  DE: { name: 'Alemanha', flag: '🇩🇪' },
  IT: { name: 'Itália', flag: '🇮🇹' },
  ES: { name: 'Espanha', flag: '🇪🇸' },
  UK: { name: 'Reino Unido', flag: '🇬🇧' },
  CA: { name: 'Canadá', flag: '🇨🇦' },
  AU: { name: 'Austrália', flag: '🇦🇺' },
  RO: { name: 'Romênia', flag: '🇷🇴' },
  MX: { name: 'México', flag: '🇲🇽' },
  CO: { name: 'Colômbia', flag: '🇨🇴' },
  FR: { name: 'França', flag: '🇫🇷' },
  PL: { name: 'Polônia', flag: '🇵🇱' },
  AT: { name: 'Áustria', flag: '🇦🇹' },
  CH: { name: 'Suíça', flag: '🇨🇭' },
};

export const categoriesList: Category[] = [
  'Nutra',
  'E-commerce',
  'Info-produtos',
  'Finanças & BizOp',
  'Espiritualidade',
  'Relacionamentos',
  'Gadgets & Tech',
  'Beleza & Cuidados',
  'Pets',
  'Software & Ferramentas',
];

export function filterAndSortProducts(
  products: AffiliateProduct[],
  filters: FilterState
): AffiliateProduct[] {
  return products
    .filter((product) => {
      // Platform filter
      if (filters.selectedPlatform !== 'Todas' && product.platform !== filters.selectedPlatform) {
        return false;
      }

      // Launch Year filter (2025 to 2026)
      if (filters.selectedLaunchYear && filters.selectedLaunchYear !== 'Todos') {
        if (String(product.launchYear) !== filters.selectedLaunchYear) {
          return false;
        }
      }

      // Category filter
      if (filters.selectedCategory !== 'Todos' && product.category !== filters.selectedCategory) {
        return false;
      }

      // Country filter
      if (filters.selectedCountry !== 'Todos') {
        const hasCountry = product.topCountries.some(
          (c) => c.countryCode.toUpperCase() === filters.selectedCountry.toUpperCase()
        );
        if (!hasCountry) return false;
      }

      // Funnel filter
      if (filters.selectedFunnel !== 'Todos' && product.funnelType !== filters.selectedFunnel) {
        return false;
      }

      // Trend filter
      if (filters.selectedTrend !== 'Todos' && product.trendStatus !== filters.selectedTrend) {
        return false;
      }

      // Only Active filter
      if (filters.onlyActive && !product.isActive) {
        return false;
      }

      // Min Payout filter
      if (filters.minPayout > 0 && product.avgPayout < filters.minPayout) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subCategory.toLowerCase().includes(query);
        const matchesTag = product.tagline.toLowerCase().includes(query);
        const matchesAngle = product.primaryAngle.toLowerCase().includes(query);
        const matchesPlatform = product.platform.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesOfferId = product.networkOfferId.toLowerCase().includes(query);
        const matchesCountry = product.topCountries.some(
          (c) => c.countryName.toLowerCase().includes(query) || c.countryCode.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesSub && !matchesTag && !matchesAngle && !matchesPlatform && !matchesCategory && !matchesOfferId && !matchesCountry) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const isAsc = filters.sortOrder === 'asc';
      switch (filters.sortBy) {
        case 'searches': {
          const diff = a.monthlySearches - b.monthlySearches;
          return isAsc ? diff : -diff;
        }
        case 'rank': {
          const diff = a.rank - b.rank;
          return isAsc ? diff : -diff;
        }
        case 'visits': {
          const diff = a.monthlyWebVisits - b.monthlyWebVisits;
          return isAsc ? diff : -diff;
        }
        case 'payout': {
          const diff = a.avgPayout - b.avgPayout;
          return isAsc ? diff : -diff;
        }
        case 'gravity': {
          const diff = a.gravityScore - b.gravityScore;
          return isAsc ? diff : -diff;
        }
        case 'growth': {
          const diff = a.searchGrowthPct - b.searchGrowthPct;
          return isAsc ? diff : -diff;
        }
        default: {
          const diff = a.monthlySearches - b.monthlySearches;
          return isAsc ? diff : -diff;
        }
      }
    });
}
