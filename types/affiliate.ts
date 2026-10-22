export type Platform = 'ClickBank' | 'Digistore24' | 'MediaScalers' | 'SmartADV';

export type Category = 
  | 'Nutra' 
  | 'E-commerce' 
  | 'Info-produtos' 
  | 'Finanças & BizOp' 
  | 'Espiritualidade' 
  | 'Relacionamentos' 
  | 'Gadgets & Tech' 
  | 'Beleza & Cuidados' 
  | 'Pets' 
  | 'Software & Ferramentas';

export type ProductType = 
  | 'Suplemento / Cápsulas & Gotas'
  | 'Dispositivo & Gadget Físico'
  | 'Utilidade Doméstica & Saúde'
  | 'Áudio & Mindset Digital'
  | 'Guia & Livro Digital'
  | 'Software & Ferramenta';

export type FunnelType = 
  | 'VSL' 
  | 'Quiz' 
  | 'TSL' 
  | 'COD' 
  | 'Trial/Rebill' 
  | 'Direct Checkout' 
  | 'Webinar';

export type TrendStatus = 
  | 'Em Alta ↗' 
  | 'Estável / Top 1' 
  | 'Pico Sazonal' 
  | 'Nova Explosão';

export type ActiveStatus = 
  | 'Ativo & Em Escala' 
  | 'Ativo & Rodando' 
  | 'Ativo / Lançamento Recente'
  | 'Lançamento 2026 & Em Escala'
  | 'Lançamento 2025 & Consolidado'
  | 'Registrado nos Últimos 6 Meses (2026)';

export interface GeoDistribution {
  countryCode: string; // ISO 2-letter: US, CA, UK, etc.
  countryName: string;
  sharePercent: number;
}

export interface TrafficSourceShare {
  channel: string;
  percentage: number;
}

export interface BofuKeyword {
  keyword: string;
  monthlySearches: number;
  cpcEstimate: string; // Ex: "$2.45"
  intent: 'Compra Direta' | 'Transacional' | 'Desconto / Cupom' | 'Avaliação Pré-Compra' | 'Preço Oficial';
}

export interface AffiliateProduct {
  id: string;
  rank: number; // 1 to 300 in platform
  overallRank: number; // 1 to 1200
  name: string;
  platform: Platform;
  category: Category;
  subCategory: string;
  productType: ProductType; // Filtro por tipo de produto
  registeredMonthsAgo: number; // 0 a 6 meses
  registeredDateText: string; // Ex: "Há 1 mês (Set/2026)", "Há 3 meses (Jul/2026)"
  tagline: string;
  launchYear: 2025 | 2026;
  launchDate: string; // Ex: "Setembro/2026"
  isActive: boolean;
  activeStatus: ActiveStatus;
  networkOfferId: string;
  lastVerified: string;
  affiliatePageUrl: string;
  avgPayout: number;
  payoutType: 'CPA Fixo' | 'RevShare' | 'CPA / COD' | 'Trial + Upsell';
  commissionRate: string;
  avgOrderValue: number;
  conversionRate: number;
  gravityScore: number;
  monthlySearches: number;
  monthlyWebVisits: number;
  searchGrowthPct: number;
  septemberRank: number;
  octoberRank: number;
  trendStatus: TrendStatus;
  funnelType: FunnelType;
  primaryAngle: string;
  targetDemographics: string;
  topCountries: GeoDistribution[];
  trafficSources: TrafficSourceShare[];
  adCompliance: 'Whitehat Amigável' | 'Requer Pre-lander' | 'Black/Greyhat Requer Cloaker' | 'COD Localizado';
  keyBenefits: string[];
  bofuKeywords: BofuKeyword[]; // Melhores palavras-chave para fundo de funil
}

export interface FilterState {
  searchQuery: string;
  selectedPlatform: Platform | 'Todas';
  selectedLaunchYear: 'Todos' | '2025' | '2026';
  selectedProductType: ProductType | 'Todos'; // Filtro solicitado por tipo do produto
  selectedCategory: Category | 'Todos';
  selectedCountry: string;
  selectedFunnel: FunnelType | 'Todos';
  selectedTrend: TrendStatus | 'Todos';
  onlyActive: boolean;
  minPayout: number;
  sortBy: 'rank' | 'searches' | 'visits' | 'payout' | 'gravity' | 'growth';
  sortOrder: 'asc' | 'desc';
}
