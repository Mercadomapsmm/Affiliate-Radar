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
  | 'Ativo / Lançamento Recente';

export interface GeoDistribution {
  countryCode: string; // ISO 2-letter: US, BR, DE, etc.
  countryName: string;
  sharePercent: number;
}

export interface TrafficSourceShare {
  channel: string;
  percentage: number;
}

export interface AffiliateProduct {
  id: string;
  rank: number; // 1 to 100 in platform
  overallRank: number; // 1 to 400
  name: string;
  platform: Platform;
  category: Category;
  subCategory: string;
  tagline: string;
  isActive: boolean; // Confirmação de produto ativo no marketplace
  activeStatus: ActiveStatus; // Status detalhado de ativação
  networkOfferId: string; // ID oficial no marketplace (Vendor ID / Offer ID)
  lastVerified: string; // Data de verificação de atividade (Outubro/2026)
  affiliatePageUrl: string; // Link para a página de afiliados/JV
  avgPayout: number; // Em USD ($)
  payoutType: 'CPA Fixo' | 'RevShare' | 'CPA / COD' | 'Trial + Upsell';
  commissionRate: string; // Ex: "75%", "$140 / venda", "$35 COD"
  avgOrderValue: number; // AOV médio
  conversionRate: number; // Ex: 3.8%
  gravityScore: number; // Score de gravidade / índice de performance
  monthlySearches: number; // Buscas mensais estimadas no Google
  monthlyWebVisits: number; // Acessos mensais estimados ao funil
  searchGrowthPct: number; // Variação Setembro -> Outubro 2026 (%)
  septemberRank: number; // Posição em Set/2026
  octoberRank: number; // Posição em Out/2026
  trendStatus: TrendStatus;
  funnelType: FunnelType;
  primaryAngle: string; // Ângulo de marketing vencedor
  targetDemographics: string; // Público-alvo ideal
  topCountries: GeoDistribution[];
  trafficSources: TrafficSourceShare[];
  adCompliance: 'Whitehat Amigável' | 'Requer Pre-lander' | 'Black/Greyhat Requer Cloaker' | 'COD Localizado';
  keyBenefits: string[];
}

export interface FilterState {
  searchQuery: string;
  selectedPlatform: Platform | 'Todas';
  selectedCategory: Category | 'Todos';
  selectedCountry: string; // 'Todos' or ISO code like 'US', 'BR', 'DE'
  selectedFunnel: FunnelType | 'Todos';
  selectedTrend: TrendStatus | 'Todos';
  onlyActive: boolean; // Filtro para somente ofertas ativas
  minPayout: number;
  sortBy: 'rank' | 'searches' | 'visits' | 'payout' | 'gravity' | 'growth';
  sortOrder: 'asc' | 'desc';
}
