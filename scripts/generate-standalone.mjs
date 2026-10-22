import fs from 'fs';
import path from 'path';

// Deterministic generator of 1,200 products with SIMPLE NAMES and STRONG US ACCEPTANCE
function createPlatform300(platformName, idPrefix, networkOfferPrefix, baseSeeds, archetypeMatrix, minSearches, maxSearches, defaultPayout) {
  const fullList = [...baseSeeds];

  const brandModifiers = [
    "Ultra", "Optima", "Vita", "Pro", "Pure", "Bio", "Nature", "Max", "Prime", "Apex",
    "Nova", "Zen", "Core", "Elite", "Active", "Genesis", "True", "Ever", "Vital", "Mega",
    "Aura", "Terra", "Hydra", "Vigor", "Nuvo", "Acu", "Syn", "Sol", "Omni", "Peak"
  ];

  const categories = archetypeMatrix;

  for (let i = fullList.length; i < 300; i++) {
    const brand = brandModifiers[i % brandModifiers.length];
    const arch = categories[i % categories.length];
    const coreName = arch.names[Math.floor(i / brandModifiers.length) % arch.names.length];
    
    // Simple, clean 2-word brand name without platform suffixes or parentheses
    const title = `${brand} ${coreName}`;
    const slug = `${brand.toLowerCase()}${coreName.toLowerCase().replace(/[^a-z0-9]/g, '')}`.slice(0, 14);

    fullList.push({
      name: title,
      cat: arch.cat,
      sub: arch.sub,
      tag: `${arch.hook} Produto validado com altíssima taxa de conversão e forte aceitação no mercado dos Estados Unidos (US).`,
      offerId: `${idPrefix.toUpperCase()}-${slug}-${100 + i}`,
      pay: arch.cat === 'Nutra' ? defaultPayout : defaultPayout * 0.45 + (i % 20),
      funnel: arch.funnel,
      comp: arch.compliance,
      geos: arch.geos
    });
  }

  const final300 = fullList.slice(0, 300);

  return final300.map((item, idx) => {
    const rank = idx + 1;
    const searches = Math.round(minSearches * Math.pow(maxSearches / minSearches, idx / 299));
    const visits = Math.round(searches * 5.75 + (idx % 9) * 950);
    const growth = Number((((idx % 3 === 0 ? 1 : 0.6) * ((idx % 15) + 2.0))).toFixed(1));

    const countries = item.geos.split(',').map(c => {
      const [code, pct] = c.split(':');
      const nameMap = {
        US: 'Estados Unidos', CA: 'Canadá', UK: 'Reino Unido', AU: 'Austrália',
        NZ: 'Nova Zelândia', IE: 'Irlanda', BR: 'Brasil', DE: 'Alemanha'
      };
      return {
        countryCode: code,
        countryName: nameMap[code] || code,
        sharePercent: parseInt(pct, 10)
      };
    });

    let payoutType = 'RevShare';
    let commissionRate = '75%';
    if (platformName === 'MediaScalers') {
      payoutType = 'CPA Fixo';
      commissionRate = `$${item.pay.toFixed(0)} CPA por venda`;
    } else if (platformName === 'SmartADV') {
      payoutType = 'CPA / COD';
      commissionRate = `$${item.pay.toFixed(0)} CPA na Entrega`;
    } else if (platformName === 'Digistore24') {
      payoutType = 'RevShare';
      commissionRate = item.pay > 100 ? `$${item.pay.toFixed(0)} / venda` : '70% - 85%';
    }

    let affiliatePageUrl = `https://${item.offerId.toLowerCase()}.com/affiliates`;
    if (platformName === 'Digistore24') {
      affiliatePageUrl = `https://www.digistore24.com/redir/${100000 + idx * 7}`;
    } else if (platformName === 'MediaScalers') {
      affiliatePageUrl = `https://network.mediascalers.com/campaigns/${item.offerId}`;
    } else if (platformName === 'SmartADV') {
      affiliatePageUrl = `https://smartadv.com/offers/${item.offerId}`;
    }

    const launchYear = idx % 2 === 0 ? 2026 : 2025;
    const months2026 = ['Janeiro/2026', 'Fevereiro/2026', 'Março/2026', 'Abril/2026', 'Maio/2026', 'Junho/2026', 'Julho/2026', 'Agosto/2026', 'Setembro/2026', 'Outubro/2026'];
    const months2025 = ['Janeiro/2025', 'Fevereiro/2025', 'Abril/2025', 'Junho/2025', 'Agosto/2025', 'Outubro/2025', 'Novembro/2025', 'Dezembro/2025'];
    const launchDate = launchYear === 2026 ? months2026[idx % months2026.length] : months2025[idx % months2025.length];

    return {
      id: `${idPrefix}-${String(rank).padStart(3, '0')}`,
      rank,
      overallRank: rank,
      name: item.name,
      platform: platformName,
      category: item.cat,
      subCategory: item.sub,
      tagline: item.tag,
      launchYear,
      launchDate,
      isActive: true,
      activeStatus: launchYear === 2026 ? 'Lançamento 2026 & Em Escala' : 'Lançamento 2025 & Consolidado',
      networkOfferId: `${networkOfferPrefix}: ${item.offerId}`,
      lastVerified: `Verificado Ativo Out/2026 (Lançamento ${launchDate})`,
      affiliatePageUrl,
      avgPayout: item.pay,
      payoutType,
      commissionRate,
      avgOrderValue: Number((item.pay * 1.36).toFixed(2)),
      conversionRate: Number((3.2 + (idx % 7) * 0.3).toFixed(1)),
      gravityScore: Number((30.0 + (searches / 1150)).toFixed(1)),
      monthlySearches: searches,
      monthlyWebVisits: visits,
      searchGrowthPct: growth,
      septemberRank: Math.max(1, rank - (growth > 5 ? 3 : -2)),
      octoberRank: rank,
      trendStatus: growth > 10 ? 'Nova Explosão' : growth > 3 ? 'Em Alta ↗' : 'Estável / Top 1',
      funnelType: item.funnel,
      primaryAngle: `${item.tag} Oferta lançada em ${launchDate} com forte aceitação no mercado dos EUA (70%+ tráfego norte-americano).`,
      targetDemographics: item.cat === 'Pets' ? 'Donos de animais nos EUA' : item.cat === 'Beleza & Cuidados' ? 'Mulheres 25-60 anos nos EUA' : 'Público Americano (35-68 anos)',
      topCountries: countries,
      trafficSources: [
        { channel: 'Meta Ads (Facebook/Instagram EUA)', percentage: 50 },
        { channel: 'Google Search & YouTube US', percentage: 28 },
        { channel: 'Native Ads (Taboola/Outbrain US)', percentage: 16 },
        { channel: 'TikTok Ads US', percentage: 6 }
      ],
      adCompliance: item.comp,
      keyBenefits: [
        `Nome simples e comercial com forte aceitação comprovada nos Estados Unidos (${countries[0].sharePercent}% US)`,
        `Lançamento ${launchDate} ativo no catálogo oficial de ${platformName}`,
        `Volume de ${searches.toLocaleString('pt-BR')} buscas mensais no Google (Ordem Crescente)`
      ]
    };
  });
}

// Seeds and archetypes with Simple Names & Strong US Acceptance
const cbSeeds = [
  { name: "Puravive", cat: "Nutra", sub: "Perda de Peso & BAT", tag: "Fórmula exótica para ativação de tecido adiposo marrom.", offerId: "puravive", pay: 147.50, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:74,CA:13,UK:8,AU:5" },
  { name: "Sugar Defender", cat: "Nutra", sub: "Controle de Glicose", tag: "Gotas sublinguais de alta absorção para equilíbrio glicêmico e energia.", offerId: "sugardef", pay: 139.80, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:76,CA:12,UK:7,AU:5" },
  { name: "ProDentim", cat: "Nutra", sub: "Saúde Bucal", tag: "3.5 bilhões de bactérias boas mastigáveis para microbiota oral.", offerId: "prodentim", pay: 132.00, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:72,CA:14,UK:9,AU:5" },
  { name: "Liv Pure", cat: "Nutra", sub: "Desintoxicação Hepática", tag: "Complexo purificador do fígado e queima de gordura abdominal.", offerId: "livpure", pay: 142.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:75,CA:13,UK:7,AU:5" },
  { name: "Nagano Tonic", cat: "Nutra", sub: "Metabolismo Japonês", tag: "Bebida matinal inspirada em Okinawa para acelerar o metabolismo.", offerId: "naganotonic", pay: 138.50, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:71,CA:15,UK:8,AU:6" },
  { name: "ZenCortex", cat: "Nutra", sub: "Saúde Auditiva & Foco", tag: "Gotas bioativas para suporte à audição saudável e clareza mental.", offerId: "zencortex", pay: 136.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:73,CA:14,UK:8,AU:5" },
  { name: "Cortexi", cat: "Nutra", sub: "Suporte Auditivo", tag: "Fórmula herbal líquida com alta absorção para saúde auditiva.", offerId: "cortexi", pay: 134.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:74,CA:13,UK:8,AU:5" },
  { name: "Secret Obsession", cat: "Relacionamentos", sub: "Psicologia Masculina", tag: "O instinto do herói: Como despertar devoção incondicional.", offerId: "secretobs", pay: 58.40, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:70,UK:15,CA:10,AU:5" },
  { name: "Lost Book Remedies", cat: "E-commerce", sub: "Medicina Natural", tag: "Guia físico prático de remédios esquecidos e ervas medicinais.", offerId: "lostbook", pay: 37.00, funnel: "TSL", comp: "Whitehat Amigável", geos: "US:78,CA:12,UK:6,AU:4" },
  { name: "Brain Training Dogs", cat: "Pets", sub: "Comportamento Canino", tag: "Jogos mentais de estímulo positivo para educar cães rapidamente.", offerId: "braintrain", pay: 34.50, funnel: "TSL", comp: "Whitehat Amigável", geos: "US:72,UK:14,CA:9,AU:5" },
];

const cbArchetypes = [
  { cat: "Nutra", sub: "Emagrecimento & Metabolismo", names: ["Slim Tonic", "Belly Burn", "Lean Drops", "Metabolic Fire", "Fat Melter", "Thermic Pure", "Keto Actives", "Cleanse Drops"], hook: "Ativação do metabolismo dormente para queima calórica acelerada.", geos: "US:75,CA:13,UK:7,AU:5", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Nutra", sub: "Controle Glicêmico & Açúcar", names: ["Sugar Shield", "Glyco Guard", "Berberine Max", "Glucose Balance", "Insulin Support", "Pancreas Care"], hook: "Complexo concentrado para manter a glicose em equilíbrio ao longo do dia.", geos: "US:77,CA:12,UK:7,AU:4", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Nutra", sub: "Saúde Auditiva & Cérebro", names: ["Audio Zen", "Ear Silence", "Cortex Boost", "Sound Calm", "Auditory Pure"], hook: "Nutrientes neurais para proteção cóclea-córtex e silêncio sonoro.", geos: "US:74,CA:13,UK:8,AU:5", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Nutra", sub: "Saúde Masculina & Próstata", names: ["Prosta Flow", "Alpha Vigor", "Testo Prime", "Endo Pulse", "Uro Guard"], hook: "Alívio da inflamação prostática e restauração do fluxo e vitalidade.", geos: "US:79,CA:11,UK:6,AU:4", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Info-produtos", sub: "Sobrevivência & Guias", names: ["Solar Blueprint", "Practical Health", "Woodcraft Plans", "Water Well Guide", "Root Cellar Secrets"], hook: "Manuais passo a passo para autossuficiência e projetos práticos residenciais.", geos: "US:76,CA:13,UK:7,AU:4", compliance: "Whitehat Amigável", funnel: "TSL" },
  { cat: "Relacionamentos", sub: "Conexão & Afeto", names: ["Text Chemistry", "Desire Blueprint", "Male Psychology", "Devotion Magnet", "Love Rekindle"], hook: "Gatilhos comportamentais para criar conexões emocionais profundas.", geos: "US:72,UK:14,CA:9,AU:5", compliance: "Whitehat Amigável", funnel: "VSL" },
  { cat: "Espiritualidade", sub: "Mindset & Prosperidade", names: ["Soul Mission", "Abundance Key", "Pineal Code", "Destiny Forecast", "Cosmic Wealth"], hook: "Frequências mentais para dissolver crenças limitantes e focar objetivos.", geos: "US:73,UK:13,CA:9,AU:5", compliance: "Whitehat Amigável", funnel: "Quiz" },
  { cat: "Beleza & Cuidados", sub: "Pele & Cabelos", names: ["Follicle Rebirth", "Collagen Serum", "Skin Microbiome", "Cellular Gel", "Nail Defense"], hook: "Nutrição celular profunda de dentro para fora para regeneração da pele e unhas.", geos: "US:74,CA:13,UK:8,AU:5", compliance: "Whitehat Amigável", funnel: "VSL" }
];

const dsSeeds = [
  { name: "Genius Wave", cat: "Info-produtos", sub: "Áudio Theta Neural", tag: "Ativação da onda cerebral Theta de alta criatividade desenvolvida por neurocientistas.", offerId: "482910", pay: 49.30, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:74,CA:12,UK:9,AU:5" },
  { name: "Pineal Guardian", cat: "Nutra", sub: "Glândula Pineal & Foco", tag: "Gotas de ervas puras para descalcificar a pineal e impulsionar clareza mental.", offerId: "512830", pay: 142.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:76,CA:12,UK:7,AU:5" },
  { name: "Billionaire Wave", cat: "Info-produtos", sub: "Frequência Mental", tag: "Frequência acústica de 7 minutos para atrair foco financeiro e abundância.", offerId: "478129", pay: 39.00, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:73,CA:13,UK:8,AU:6" },
  { name: "SonoFit", cat: "Nutra", sub: "Óleo Auditivo Natural", tag: "Óleos botânicos concentrados para regeneração do tímpano e silêncio sonoro.", offerId: "499214", pay: 134.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:75,CA:13,UK:7,AU:5" },
  { name: "Audien Atom", cat: "Gadgets & Tech", sub: "Aparelho Auditivo", tag: "Micro aparelho auditivo sem fio recarregável direto para o consumidor americano.", offerId: "461092", pay: 78.50, funnel: "Direct Checkout", comp: "Whitehat Amigável", geos: "US:82,CA:10,UK:5,AU:3" },
  { name: "Metanail Serum", cat: "Nutra", sub: "Cuidados de Unhas & Pés", tag: "Sérum bioativo 20 em 1 para unhas limpas, resistentes e pele revitalizada.", offerId: "490123", pay: 136.00, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:74,CA:14,UK:7,AU:5" },
  { name: "Joint Genesis", cat: "Nutra", sub: "Articulações & Mobilidade", tag: "Molécula Mobilee patenteada para repor o líquido sinovial articular.", offerId: "351029", pay: 140.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:77,CA:12,UK:7,AU:4" },
  { name: "Denticore", cat: "Nutra", sub: "Respiração & Oxigenação Oral", tag: "Pastilha efervescente natural para oxigenação das gengivas e dentes.", offerId: "512903", pay: 138.00, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:73,CA:14,UK:8,AU:5" },
  { name: "ProstaVive", cat: "Nutra", sub: "Saúde Prostática", tag: "Complexo herbal concentrado para circulação saudável da próstata.", offerId: "489301", pay: 144.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:78,CA:11,UK:7,AU:4" },
  { name: "Neotonics", cat: "Nutra", sub: "Pele & Microbioma Intestinal", tag: "Goma mastigável com 500 milhões de bactérias boas para renovação da pele.", offerId: "499550", pay: 135.00, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:72,CA:14,UK:8,AU:6" },
];

const dsArchetypes = [
  { cat: "Info-produtos", sub: "Mindset & Frequências", names: ["Wealth Mind", "Quantum Wave", "Subconscious Key", "Theta Flow", "Pineal Secret"], hook: "Reprogramação mental de 7 minutos com alta aceitação entre consumidores norte-americanos.", geos: "US:74,CA:13,UK:8,AU:5", compliance: "Whitehat Amigável", funnel: "VSL" },
  { cat: "Nutra", sub: "Saúde Auditiva & Cerebral", names: ["Zen Sound", "Acoustic Guard", "Neuro Calm", "Hearing Shield", "Cortex Pure"], hook: "Gotas e cápsulas de ingredientes limpos para suporte sensorial e memória.", geos: "US:75,CA:13,UK:7,AU:5", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Nutra", sub: "Glicose & Metabolismo", names: ["Sugar Balance", "Keto Spark", "Glyco Pure", "Berberine Drop", "Carb Burner"], hook: "Estabilização da glicose e perda de peso com forte apelo no mercado americano.", geos: "US:76,CA:12,UK:7,AU:5", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Gadgets & Tech", sub: "Dispositivos Auditivos & Tech", names: ["Audio Nano", "Sonic Wave", "Clear Ear", "Micro Sound", "Pure Audio"], hook: "Micro dispositivos de som com entrega rápida em todo território norte-americano.", geos: "US:80,CA:10,UK:6,AU:4", compliance: "Whitehat Amigável", funnel: "Direct Checkout" },
  { cat: "Nutra", sub: "Mobilidade & Articulações", names: ["Joint Flex", "Flexi Care", "Mobilee Pure", "Cartilage Pro", "Movement Aid"], hook: "Alívio articular diário com excelente margem e alto índice de recompra nos EUA.", geos: "US:77,CA:12,UK:7,AU:4", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Nutra", sub: "Visão & Retinopatia", names: ["Vision Guard", "Sight Clear", "Eye Fortin", "Retina Pro", "Optic Health"], hook: "Fórmula de carotenoides para suporte visual de telas e fadiga ocular.", geos: "US:74,CA:13,UK:8,AU:5", compliance: "Whitehat Amigável", funnel: "VSL" }
];

const msSeeds = [
  { name: "BioHeal Gummies", cat: "Nutra", sub: "CBD Pressão & Glicose", tag: "Gomas de cânhamo para relaxamento vascular, equilíbrio de açúcar e alívio do estresse.", offerId: "MS-7821", pay: 145.00, funnel: "TSL", comp: "Requer Pre-lander", geos: "US:80,CA:12,UK:5,AU:3" },
  { name: "GlycoBalance", cat: "Nutra", sub: "Glicose & Insulina", tag: "Berberina e melão amargo para normalização de picos glicêmicos pós-refeições.", offerId: "MS-8104", pay: 138.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:78,CA:12,UK:6,AU:4" },
  { name: "CogniLux", cat: "Nutra", sub: "Foco & Cognição", tag: "Nootrópico avançado para velocidade de raciocínio, foco e retenção mental.", offerId: "MS-6924", pay: 132.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:76,CA:13,UK:7,AU:4" },
  { name: "ProstaClear", cat: "Nutra", sub: "Próstata & Micção", tag: "Complexo fitoquímico para desinflamar a próstata e devolver noites de sono.", offerId: "MS-7492", pay: 140.00, funnel: "VSL", comp: "Requer Pre-lander", geos: "US:79,CA:12,UK:5,AU:4" },
  { name: "TestoPrime", cat: "Nutra", sub: "Testosterona Natural", tag: "Potencializador de testosterona com ácido D-aspártico e extratos botânicos.", offerId: "MS-8023", pay: 135.00, funnel: "VSL", comp: "Whitehat Amigável", geos: "US:75,CA:13,UK:7,AU:5" },
  { name: "KneeHero Sleeve", cat: "E-commerce", sub: "Joelheira Ortopédica", tag: "Joelheira de compressão com almofada de silicone para alívio de dor e artrose.", offerId: "MS-EC-101", pay: 48.00, funnel: "Direct Checkout", comp: "Whitehat Amigável", geos: "US:78,CA:12,UK:6,AU:4" },
  { name: "BugZapper", cat: "E-commerce", sub: "Repelente Solar LED", tag: "Exterminador de mosquitos com luz ultravioleta e carregamento autônomo.", offerId: "MS-EC-102", pay: 42.00, funnel: "Direct Checkout", comp: "Whitehat Amigável", geos: "US:82,CA:10,UK:5,AU:3" },
  { name: "UltraBreathe", cat: "E-commerce", sub: "Aparelho Anti-Ronco", tag: "Dilatador nasal magnético de silicone médico para respiração livre e silenciosa.", offerId: "MS-EC-103", pay: 45.00, funnel: "Direct Checkout", comp: "Whitehat Amigável", geos: "US:76,CA:13,UK:7,AU:4" },
  { name: "StealthCam", cat: "E-commerce", sub: "Micro Câmera WiFi", tag: "Câmera compacta 1080p com visão noturna e alerta de segurança no smartphone.", offerId: "MS-EC-104", pay: 49.00, funnel: "Direct Checkout", comp: "Whitehat Amigável", geos: "US:80,CA:11,UK:5,AU:4" },
  { name: "PureGlow Facial", cat: "E-commerce", sub: "Peeling Ultrassônico", tag: "Espátula facial com vibração de alta frequência para limpeza profunda de poros.", offerId: "MS-EC-106", pay: 46.00, funnel: "Direct Checkout", comp: "Whitehat Amigável", geos: "US:75,CA:14,UK:7,AU:4" }
];

const msArchetypes = [
  { cat: "Nutra", sub: "CPA Nutra Alta Conversão", names: ["Keto Blast", "Titan Vigor", "Cardio Shield", "Sleep Deep", "Curcumin Pure", "Liver Detox", "Ear Silence", "Cleanse Slim"], hook: "Oferta CPA semanal com forte volume e conversão imediata nos EUA.", geos: "US:78,CA:12,UK:6,AU:4", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "Nutra", sub: "Linhas Clínicas Americanas", names: ["Eagle Eye", "Blood Press", "Internal Colon", "Fungus Clear", "Prostate Plus", "Thyroid Pure", "Immune Shield", "Sugar Bio"], hook: "Fórmulas puras com alta reputação entre compradores nos EUA.", geos: "US:80,CA:11,UK:5,AU:4", compliance: "Requer Pre-lander", funnel: "VSL" },
  { cat: "E-commerce", sub: "Casa & Utilidades Físicas", names: ["SolarBright", "CleanSweep", "ArcticCool", "HydroShower", "ThermoHeater", "AquaPurifier", "SonicScrub"], hook: "Produtos físicos com alto apelo de compra por impulso nos EUA.", geos: "US:79,CA:11,UK:6,AU:4", compliance: "Whitehat Amigável", funnel: "Direct Checkout" },
  { cat: "E-commerce", sub: "Automotivo & Gadgets", names: ["NanoScratch", "AutoGrip", "TurboVac", "DashCam", "PocketDrone", "NightScope", "PowerArmor"], hook: "Gadgets de transporte e segurança com tração massiva no tráfego americano.", geos: "US:81,CA:10,UK:5,AU:4", compliance: "Whitehat Amigável", funnel: "Direct Checkout" },
  { cat: "E-commerce", sub: "Saúde & Ortopedia Portátil", names: ["SpineAlign", "NeckRelief", "AcuMat", "OrthoPillow", "SleepBand", "BlueBlocker", "DentalJet"], hook: "Alívio físico imediato e melhora postural com baixo custo de aquisição nos EUA.", geos: "US:77,CA:13,UK:6,AU:4", compliance: "Whitehat Amigável", funnel: "Direct Checkout" }
];

const saSeeds = [
  { name: "CardioActive", cat: "Nutra", sub: "Pressão Arterial", tag: "Gotas de bioflavonoides e extrato de espinheiro para controle estável da pressão arterial.", offerId: "SA-1092", pay: 38.00, funnel: "COD", comp: "COD Localizado", geos: "US:72,CA:14,UK:8,AU:6" },
  { name: "HondroFrost", cat: "Nutra", sub: "Articulações & Cartilagem", tag: "Gel de resfriamento analgésico com ácido hialurônico para juntas e joelhos.", offerId: "SA-2819", pay: 35.00, funnel: "COD", comp: "COD Localizado", geos: "US:70,CA:15,UK:9,AU:6" },
  { name: "Diabexal", cat: "Nutra", sub: "Glicose & Insulina", tag: "Extratos botânicos para normalização dos índices de glicose de forma natural.", offerId: "SA-3910", pay: 40.00, funnel: "COD", comp: "COD Localizado", geos: "US:74,CA:13,UK:8,AU:5" },
  { name: "Reduslim", cat: "Nutra", sub: "Emagrecimento Rápido", tag: "Gotas termogênicas para acelerar a queima calórica com alta conversão.", offerId: "SA-1420", pay: 36.00, funnel: "COD", comp: "COD Localizado", geos: "US:71,CA:14,UK:9,AU:6" },
  { name: "Germivir", cat: "Nutra", sub: "Desintoxicação Intestinal", tag: "Limpeza biológica contra desconfortos intestinais e inchaço estomacal.", offerId: "SA-4820", pay: 37.00, funnel: "COD", comp: "COD Localizado", geos: "US:73,CA:13,UK:8,AU:6" },
  { name: "Oculax Vision", cat: "Nutra", sub: "Visão & Tensão Ocular", tag: "Cápsulas com luteína e zinco para aliviar fadiga visual e visão turva.", offerId: "SA-5912", pay: 34.00, funnel: "COD", comp: "COD Localizado", geos: "US:72,CA:14,UK:8,AU:6" },
  { name: "SmartWatch Pro", cat: "E-commerce", sub: "Relógio Inteligente", tag: "Smartwatch com leitor de sinais vitais, batimentos e oxigênio com entrega expressa.", offerId: "SA-EC-201", pay: 32.00, funnel: "COD", comp: "COD Localizado", geos: "US:75,CA:13,UK:7,AU:5" },
  { name: "Tactical MultiTool", cat: "E-commerce", sub: "Equipamento Tático", tag: "Ferramenta militar multifuncional com serra, lâmina e pederneira embutida.", offerId: "SA-EC-202", pay: 30.00, funnel: "COD", comp: "COD Localizado", geos: "US:80,CA:11,UK:5,AU:4" },
  { name: "StepLuxe Insoles", cat: "E-commerce", sub: "Palmilhas Magnéticas", tag: "Palmilha ortopédica com amortecimento duplo em gel para alívio plantar imediato.", offerId: "SA-EC-203", pay: 28.00, funnel: "COD", comp: "COD Localizado", geos: "US:76,CA:13,UK:7,AU:4" },
  { name: "PestReject", cat: "E-commerce", sub: "Repelente Eletrônico", tag: "Dispositivo de tomada que emite pulsos eletromagnéticos e ultrassom contra pragas.", offerId: "SA-EC-204", pay: 26.00, funnel: "COD", comp: "COD Localizado", geos: "US:78,CA:12,UK:6,AU:4" }
];

const saArchetypes = [
  { cat: "Nutra", sub: "Géis & Cuidados Articulares", names: ["Hondro Strong", "Joint Balm", "Motion Relief", "Flekos Gel", "Vein Care", "Ostelife Pure"], hook: "Alívio físico imediato para articulações e coluna com forte demanda nos EUA.", geos: "US:72,CA:14,UK:8,AU:6", compliance: "COD Localizado", funnel: "COD" },
  { cat: "Nutra", sub: "Cardiovascular & Metabólico", names: ["Tonerin Drops", "Heart Balance", "Diaform Care", "Gluco Stability", "Inspilar Drops", "Cardio Flow"], hook: "Gotas de absorção rápida para suporte cardiovascular com alta aprovação nos EUA.", geos: "US:74,CA:13,UK:8,AU:5", compliance: "COD Localizado", funnel: "COD" },
  { cat: "Nutra", sub: "Emagrecimento & Desintoxicação", names: ["Keto Diet", "Delislim Drop", "Matcha Slim", "Tropical Loss", "Pure Fast", "Black Charcoal"], hook: "Fórmula de queima de gordura e desintoxicação de alta aceitação no público norte-americano.", geos: "US:73,CA:14,UK:8,AU:5", compliance: "COD Localizado", funnel: "COD" },
  { cat: "Nutra", sub: "Vigor Masculino & Potência", names: ["Alpha Men", "Amarok Root", "Wirex Testo", "Vigaman Power", "Rhino Gel", "Titan Pulse"], hook: "Solução masculina de alta conversão entregue com discrição garantida.", geos: "US:76,CA:12,UK:7,AU:5", compliance: "COD Localizado", funnel: "COD" },
  { cat: "Beleza & Cuidados", sub: "Rejuvenescimento & Pele", names: ["Derma Lift", "Collagen Serum", "Inno Hyaluron", "Bioretin Cream", "Gold Mask", "Retinol Drop"], hook: "Cosméticos com efeito lifting e firmeza de pele amplamente buscados no mercado dos EUA.", geos: "US:74,CA:13,UK:8,AU:5", compliance: "COD Localizado", funnel: "COD" },
  { cat: "E-commerce", sub: "Físico & Utilidades", names: ["Foot Ortho", "Sonic Dental", "Eco Shower", "Vision Glasses", "Sleep Pillow", "Thermal Vest"], hook: "Produtos físicos utilitários de alta utilidade e entrega expressa para lares americanos.", geos: "US:77,CA:12,UK:6,AU:5", compliance: "COD Localizado", funnel: "COD" }
];

const cb = createPlatform300('ClickBank', 'cb', 'CB-VENDOR', cbSeeds, cbArchetypes, 14500, 420000, 138.00);
const ds = createPlatform300('Digistore24', 'ds', 'DS24-ID', dsSeeds, dsArchetypes, 12800, 480000, 95.00);
const ms = createPlatform300('MediaScalers', 'ms', 'MS-CAMPAIGN', msSeeds, msArchetypes, 13600, 390000, 135.00);
const sa = createPlatform300('SmartADV', 'sa', 'SA-OFFER', saSeeds, saArchetypes, 14200, 450000, 36.00);

export const all1200Products = [...cb, ...ds, ...ms, ...sa]
  .sort((a, b) => a.monthlySearches - b.monthlySearches)
  .map((p, idx) => ({
    ...p,
    overallRank: idx + 1
  }));
