import { AffiliateProduct } from '@/types/affiliate';

export function exportProductsToCSV(products: AffiliateProduct[], filename = 'produtos-afiliados-300-por-plataforma-2026.csv') {
  const headers = [
    'Rank Geral',
    'Rank Plataforma',
    'Nome do Produto',
    'Tipo de Produto',
    'Data de Registro',
    'Status Ativo',
    'ID na Rede (Vendor/Offer)',
    'Plataforma',
    'Segmento',
    'Subcategoria',
    'Link JV/Afiliados',
    'Payout Médio (USD)',
    'Tipo de Payout',
    'Comissão',
    'AOV (Ticket Médio)',
    'Taxa Conv (%)',
    'Score Gravidade',
    'Buscas Google Mensais',
    'Acessos Funil Mensais',
    'Crescimento Set-Out (%)',
    'Rank Setembro 2026',
    'Rank Outubro 2026',
    'Tendência',
    'Tipo de Funil',
    'Palavras-Chave BOFU (Fundo de Funil)',
    'Ângulo de Marketing',
    'Público Alvo',
    'Principais Países',
    'Compliance de Anúncios'
  ];

  const rows = products.map(p => [
    p.overallRank,
    p.rank,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.productType || ''}"`,
    `"${p.registeredDateText || p.launchDate}"`,
    `"${p.activeStatus}"`,
    `"${p.networkOfferId}"`,
    p.platform,
    p.category,
    `"${p.subCategory.replace(/"/g, '""')}"`,
    `"${p.affiliatePageUrl}"`,
    p.avgPayout,
    p.payoutType,
    `"${p.commissionRate}"`,
    p.avgOrderValue,
    p.conversionRate,
    p.gravityScore,
    p.monthlySearches,
    p.monthlyWebVisits,
    p.searchGrowthPct,
    p.septemberRank,
    p.octoberRank,
    p.trendStatus,
    p.funnelType,
    `"${(p.bofuKeywords || []).map(k => `${k.keyword} (${k.intent} | ${k.cpcEstimate})`).join('; ')}"`,
    `"${p.primaryAngle.replace(/"/g, '""')}"`,
    `"${p.targetDemographics.replace(/"/g, '""')}"`,
    `"${p.topCountries.map(c => `${c.countryCode} (${c.sharePercent}%)`).join(', ')}"`,
    p.adCompliance
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportProductsToJSON(products: AffiliateProduct[], filename = 'top-400-produtos-afiliados-2026.json') {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
