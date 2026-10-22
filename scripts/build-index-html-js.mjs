import fs from 'fs';
import path from 'path';
import { all1200Products } from './generate-standalone.mjs';

// 1. Create index.html template with 2025-2026 launches and platform filter
const indexHtmlContent = `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AffiliateRadar 2026 - 1.200 Produtos Registrados nos Últimos 6 Meses com Nomes Simples, Aceitação nos EUA & Palavras-Chave BOFU</title>
  <meta name="description" content="1.200 produtos registrados nos últimos 6 meses (Maio a Outubro/2026) com nomes simples e forte aceitação nos Estados Unidos (300 por plataforma: ClickBank, Digistore24, MediaScalers, SmartADV) organizados em ordem crescente de buscas no Google, com filtro por tipo de produto e melhores palavras-chave para fundo de funil (BOFU).">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0fdf4',
              100: '#dcfce7',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
            },
            darkBg: '#090D16',
            darkCard: '#111726',
            darkBorder: '#1F293D',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #080C15;
      color: #E2E8F0;
    }
    .mono-num {
      font-family: 'JetBrains Mono', monospace;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0B0F19;
    }
    ::-webkit-scrollbar-thumb {
      background: #1F293D;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #334155;
    }
    .glass-panel {
      background: rgba(17, 23, 38, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
  </style>
</head>
<body class="min-h-screen bg-[#080C15] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">

  <!-- TOP HEADER -->
  <header class="sticky top-0 z-30 border-b border-slate-800/80 bg-[#080C15]/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo & Branding -->
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
            <i data-lucide="radar" class="w-6 h-6 text-slate-950 stroke-[2.5]"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                AffiliateRadar
              </span>
              <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ÚLTIMOS 6 MESES
              </span>
            </div>
            <p class="text-xs text-slate-400 font-medium hidden sm:block">
              1.200 Produtos Registrados nos Últimos 6 Meses com Filtro por Tipo & Palavras BOFU
            </p>
          </div>
        </div>

        <!-- Global Counts & Exports -->
        <div class="flex items-center gap-2.5 sm:gap-4">
          <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-slate-300 font-medium">1.200 Registros Recentes (0-5 Meses)</span>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-export-csv" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30 transition-all cursor-pointer">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Exportar CSV</span>
            </button>
            <button id="btn-export-json" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer">
              <i data-lucide="file-code" class="w-3.5 h-3.5"></i>
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- ASCENDING ORDER HERO BANNER -->
  <section class="border-b border-slate-800/60 bg-gradient-to-r from-emerald-950/20 via-slate-900/40 to-blue-950/20 py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
      <div class="flex items-center gap-2.5 text-emerald-400 font-medium">
        <i data-lucide="sparkles" class="w-5 h-5 flex-shrink-0 text-emerald-400"></i>
        <span>
          <strong class="font-bold text-white">Registrados nos Últimos 6 Meses (Maio a Outubro/2026):</strong>
          100% dos produtos cadastrados recentemente nas plataformas, com nomes simples (1 a 3 palavras), forte aceitação nos EUA (70%+ share), filtro dedicado por tipo de produto e as melhores palavras-chave para fundo de funil (BOFU) prontas para campanhas.
        </span>
      </div>
      <div class="flex items-center gap-2 text-slate-400 text-xs">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          <i data-lucide="check-circle" class="w-3 h-3 text-emerald-400"></i> ClickBank (300)
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          <i data-lucide="check-circle" class="w-3 h-3 text-blue-400"></i> Digistore24 (300)
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          <i data-lucide="check-circle" class="w-3 h-3 text-amber-400"></i> MediaScalers (300)
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          <i data-lucide="check-circle" class="w-3 h-3 text-purple-400"></i> SmartADV (300)
        </span>
      </div>
    </div>
  </section>

  <!-- MAIN CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

    <!-- PLATFORM TABS (FILTRO RÁPIDO POR PLATAFORMA) -->
    <div class="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
      <button class="platform-tab px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 bg-emerald-500 text-slate-950 shadow-md" data-platform="All">
        <i data-lucide="layers" class="w-4 h-4"></i>
        <span>Todas as Redes (1.200)</span>
      </button>
      <button class="platform-tab px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all cursor-pointer flex items-center gap-2" data-platform="ClickBank">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>ClickBank (300)</span>
      </button>
      <button class="platform-tab px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all cursor-pointer flex items-center gap-2" data-platform="Digistore24">
        <span class="w-2 h-2 rounded-full bg-blue-400"></span>
        <span>Digistore24 (300)</span>
      </button>
      <button class="platform-tab px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all cursor-pointer flex items-center gap-2" data-platform="MediaScalers">
        <span class="w-2 h-2 rounded-full bg-amber-400"></span>
        <span>MediaScalers (300)</span>
      </button>
      <button class="platform-tab px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all cursor-pointer flex items-center gap-2" data-platform="SmartADV">
        <span class="w-2 h-2 rounded-full bg-purple-400"></span>
        <span>SmartADV (300)</span>
      </button>
    </div>

    <!-- STATS OVERVIEW CARDS -->
    <div id="stats-banner" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
      <div class="glass-panel p-4 rounded-xl border border-slate-800/80">
        <div class="text-xs text-slate-400 mb-1 flex items-center justify-between">
          <span>Produtos no Filtro</span>
          <i data-lucide="package" class="w-4 h-4 text-emerald-400"></i>
        </div>
        <div id="stat-count" class="text-xl sm:text-2xl font-black text-white mono-num">1.200</div>
        <div class="text-[11px] text-emerald-400 mt-0.5">Lançamentos 2025/2026</div>
      </div>

      <div class="glass-panel p-4 rounded-xl border border-slate-800/80">
        <div class="text-xs text-slate-400 mb-1 flex items-center justify-between">
          <span>Buscas Google/Mês</span>
          <i data-lucide="search" class="w-4 h-4 text-cyan-400"></i>
        </div>
        <div id="stat-searches" class="text-xl sm:text-2xl font-black text-white mono-num">0</div>
        <div class="text-[11px] text-slate-400 mt-0.5">Volume mensal somado</div>
      </div>

      <div class="glass-panel p-4 rounded-xl border border-slate-800/80">
        <div class="text-xs text-slate-400 mb-1 flex items-center justify-between">
          <span>Visitas Web Est.</span>
          <i data-lucide="users" class="w-4 h-4 text-indigo-400"></i>
        </div>
        <div id="stat-visits" class="text-xl sm:text-2xl font-black text-white mono-num">0</div>
        <div class="text-[11px] text-slate-400 mt-0.5">Tráfego total gerado</div>
      </div>

      <div class="glass-panel p-4 rounded-xl border border-slate-800/80">
        <div class="text-xs text-slate-400 mb-1 flex items-center justify-between">
          <span>Payout Médio</span>
          <i data-lucide="dollar-sign" class="w-4 h-4 text-amber-400"></i>
        </div>
        <div id="stat-payout" class="text-xl sm:text-2xl font-black text-white mono-num">$0.00</div>
        <div class="text-[11px] text-amber-400 mt-0.5">Comissão por venda</div>
      </div>

      <div class="glass-panel p-4 rounded-xl border border-slate-800/80 col-span-2 md:col-span-4 lg:col-span-1">
        <div class="text-xs text-slate-400 mb-1 flex items-center justify-between">
          <span>Conversão Média</span>
          <i data-lucide="trending-up" class="w-4 h-4 text-purple-400"></i>
        </div>
        <div id="stat-cr" class="text-xl sm:text-2xl font-black text-white mono-num">0.0%</div>
        <div class="text-[11px] text-purple-400 mt-0.5">Taxa de conversão média</div>
      </div>
    </div>

    <!-- FILTER & SEARCH CONTROL BAR -->
    <div class="glass-panel p-4 rounded-xl border border-slate-800/90 space-y-3.5">
      <!-- Search Input & Quick Controls -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <!-- Search bar -->
        <div class="relative flex-1">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
          <input 
            type="text" 
            id="search-input"
            placeholder="Pesquisar por nome de produto, 2025, 2026, nicho, gancho ou ID..."
            class="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
          <button id="search-clear" class="hidden absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- View mode switcher -->
        <div class="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800 self-end md:self-auto">
          <button id="view-grid-btn" class="px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-pointer">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span>Cards</span>
          </button>
          <button id="view-table-btn" class="px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white cursor-pointer flex items-center gap-1.5">
            <i data-lucide="table" class="w-3.5 h-3.5"></i>
            <span>Tabela</span>
          </button>
        </div>
      </div>

      <!-- Dropdown Selectors Grid (INCLUINDO FILTRO POR PLATAFORMA E ANO DE LANÇAMENTO) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-1">
        
        <!-- 1. FILTRO POR PLATAFORMA (Solicitado) -->
        <div>
          <label class="block text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
            <i data-lucide="layers" class="w-3 h-3 text-emerald-400"></i>
            <span>Plataforma</span>
          </label>
          <select id="select-platform" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:outline-none focus:border-emerald-500">
            <option value="All" selected>Todas as Plataformas (1.200)</option>
            <option value="ClickBank">ClickBank (300)</option>
            <option value="Digistore24">Digistore24 (300)</option>
            <option value="MediaScalers">MediaScalers (300)</option>
            <option value="SmartADV">SmartADV (300)</option>
          </select>
        </div>

        <!-- 2. FILTRO POR TIPO DO PRODUTO (Solicitado pelo usuário) -->
        <div>
          <label class="block text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
            <i data-lucide="package" class="w-3 h-3 text-emerald-400"></i>
            <span>Tipo de Produto</span>
          </label>
          <select id="select-product-type" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-emerald-500/50 text-white font-medium focus:outline-none focus:border-emerald-500">
            <option value="All" selected>Todos os Tipos</option>
            <option value="Suplemento / Cápsulas & Gotas">💊 Suplementos / Cápsulas & Gotas</option>
            <option value="Dispositivo & Gadget Físico">⚡ Dispositivos & Gadgets Físicos</option>
            <option value="Utilidade Doméstica & Saúde">🏡 Utilidades Domésticas & Saúde</option>
            <option value="Áudio & Mindset Digital">🎧 Áudios & Mindset Digital</option>
            <option value="Guia & Livro Digital">📚 Guias & Livros Digitais</option>
            <option value="Software & Ferramenta">💻 Softwares & Ferramentas</option>
          </select>
        </div>

        <!-- 3. FILTRO POR REGISTRO (Últimos 6 Meses) -->
        <div>
          <label class="block text-[11px] font-semibold text-cyan-400 mb-1 flex items-center gap-1">
            <i data-lucide="calendar" class="w-3 h-3 text-cyan-400"></i>
            <span>Registro / Lançamento</span>
          </label>
          <select id="select-launch-year" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:outline-none focus:border-cyan-500">
            <option value="All" selected>Últimos 6 Meses (Mai-Out/2026)</option>
            <option value="2026">🚀 Registrados em 2026</option>
          </select>
        </div>

        <!-- 3. Nicho / Categoria -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Nicho / Categoria</label>
          <select id="select-category" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-emerald-500">
            <option value="All">Todas as Categorias</option>
            <option value="Nutra">Nutra (Saúde & Suplementos)</option>
            <option value="E-commerce">E-commerce & Físicos</option>
            <option value="Info-produtos">Info-produtos & Cursos</option>
            <option value="Finanças & BizOp">Finanças & BizOp</option>
            <option value="Espiritualidade">Espiritualidade & Astrologia</option>
            <option value="Relacionamentos">Relacionamentos & Amor</option>
            <option value="Gadgets & Tech">Gadgets & Tech</option>
            <option value="Beleza & Cuidados">Beleza & Cuidados</option>
            <option value="Pets">Pets & Animais</option>
            <option value="Software & Ferramentas">Software & Ferramentas</option>
          </select>
        </div>

        <!-- 4. Target Country / Geo -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">País Top Comprador</label>
          <select id="select-country" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-emerald-500">
            <option value="All">Todos os Países</option>
            <option value="US">🇺🇸 Estados Unidos (US)</option>
            <option value="BR">🇧🇷 Brasil (BR)</option>
            <option value="DE">🇩🇪 Alemanha (DE)</option>
            <option value="IT">🇮🇹 Itália (IT)</option>
            <option value="ES">🇪🇸 Espanha (ES)</option>
            <option value="UK">🇬🇧 Reino Unido (UK)</option>
            <option value="CA">🇨🇦 Canadá (CA)</option>
            <option value="AU">🇦🇺 Austrália (AU)</option>
            <option value="RO">🇷🇴 Romênia (RO)</option>
            <option value="MX">🇲🇽 México (MX)</option>
          </select>
        </div>

        <!-- 5. Funnel Type -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Mecânica de Funil</label>
          <select id="select-funnel" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-emerald-500">
            <option value="All">Todos os Funis</option>
            <option value="VSL">VSL (Video Sales Letter)</option>
            <option value="TSL">TSL (Text Sales Letter)</option>
            <option value="Quiz">Quiz Interativo</option>
            <option value="COD">COD (Cash on Delivery)</option>
            <option value="Direct Checkout">Checkout Direto</option>
            <option value="Webinar">Webinar Automatizado</option>
          </select>
        </div>

        <!-- 6. Sort Ordering -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Ordenação</label>
          <select id="select-sort" class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-emerald-500">
            <option value="searches-asc" selected>⬆️ Buscas (Crescente) [Padrão]</option>
            <option value="searches-desc">⬇️ Buscas (Decrescente)</option>
            <option value="payout-desc">💰 Maior Payout ($)</option>
            <option value="payout-asc">💵 Menor Payout ($)</option>
            <option value="cr-desc">🎯 Maior Conversão (%)</option>
            <option value="growth-desc">🔥 Maior Crescimento (%)</option>
          </select>
        </div>
      </div>

      <!-- Active Filters Tag Pills & Reset -->
      <div id="active-filters-bar" class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
        <div id="filter-pills" class="flex flex-wrap items-center gap-1.5">
          <span class="text-slate-400 text-[11px]">Filtros ativos:</span>
          <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">Lançamentos 2025-2026</span>
          <span class="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px]">Ordem Crescente de Buscas</span>
        </div>
        <button id="btn-reset-filters" class="text-xs text-slate-400 hover:text-white underline cursor-pointer">
          Resetar todos os filtros
        </button>
      </div>
    </div>

    <!-- PRODUCTS MAIN VIEW CONTAINER -->
    <div id="products-view-container" class="space-y-4">
      <!-- Grid Container (Cards) -->
      <div id="grid-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Rendered via JS -->
      </div>

      <!-- Table Container -->
      <div id="table-container" class="hidden glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th class="py-3 px-4">Rank</th>
                <th class="py-3 px-4">Produto & Lançamento</th>
                <th class="py-3 px-4">Plataforma</th>
                <th class="py-3 px-4 text-right">Buscas Google (mês)</th>
                <th class="py-3 px-4 text-right">Visitas Est.</th>
                <th class="py-3 px-4 text-right">Payout</th>
                <th class="py-3 px-4">Funil</th>
                <th class="py-3 px-4">Geos</th>
                <th class="py-3 px-4 text-center">Raio-X</th>
              </tr>
            </thead>
            <tbody id="table-body" class="divide-y divide-slate-800/60 font-medium">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div id="empty-state" class="hidden glass-panel p-12 rounded-xl text-center border border-slate-800/80">
        <i data-lucide="filter-x" class="w-12 h-12 text-slate-400 mx-auto mb-3"></i>
        <h3 class="text-lg font-bold text-white mb-1">Nenhum produto encontrado</h3>
        <p class="text-xs text-slate-400 max-w-md mx-auto mb-4">
          Tente alterar seus termos de busca ou remover alguns filtros selecionados.
        </p>
        <button id="btn-empty-reset" class="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-all cursor-pointer">
          Limpar Filtros
        </button>
      </div>
    </div>

    <!-- PAGINATION & LOAD MORE -->
    <div class="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div id="pagination-info" class="text-xs text-slate-400">
        Mostrando <span id="page-start" class="font-bold text-white">1</span> - <span id="page-end" class="font-bold text-white">30</span> de <span id="page-total" class="font-bold text-white">1.200</span> produtos
      </div>

      <div class="flex items-center gap-2">
        <button id="btn-load-more" class="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5">
          <i data-lucide="plus-circle" class="w-4 h-4"></i>
          <span>Carregar Mais (+30)</span>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-[11px] text-slate-400 hidden md:inline">Itens por página:</label>
        <select id="select-page-size" class="px-2.5 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
          <option value="30" selected>30 produtos</option>
          <option value="60">60 produtos</option>
          <option value="120">120 produtos</option>
          <option value="300">300 produtos</option>
          <option value="1200">Todos (1.200)</option>
        </select>
        
        <div class="flex items-center gap-1 ml-2">
          <button id="btn-prev-page" class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
          </button>
          <span id="page-current" class="text-xs font-bold text-white px-2">1</span>
          <button id="btn-next-page" class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>

  </main>

  <!-- PRODUCT DEEP DIVE MODAL ("RAIO-X DO PRODUTO") -->
  <div id="product-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
    <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D1322] border border-slate-700/80 p-6 shadow-2xl text-slate-200">
      
      <!-- Close Button -->
      <button id="modal-close" class="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <!-- Modal Content (Rendered dynamically) -->
      <div id="modal-body" class="space-y-6">
        <!-- Injected via JS -->
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs shadow-2xl">
    <i data-lucide="check" class="w-4 h-4"></i>
    <span id="toast-message">Operação realizada com sucesso!</span>
  </div>

  <!-- FOOTER -->
  <footer class="mt-16 border-t border-slate-800/80 py-8 bg-[#060910] text-slate-400 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <p class="font-bold text-slate-200">AffiliateRadar 2026 - Lançamentos Ativos 2025/2026</p>
        <p class="text-slate-400 mt-0.5">1.200 ofertas lançadas nos anos de 2025 e 2026 (300 por plataforma) em ordem crescente de buscas no Google.</p>
      </div>
      <div class="flex items-center gap-4 text-slate-400">
        <span>ClickBank</span> •
        <span>Digistore24</span> •
        <span>MediaScalers</span> •
        <span>SmartADV</span>
      </div>
    </div>
  </footer>

  <!-- SCRIPT INCLUSION -->
  <script src="./index.js"></script>
</body>
</html>
`;

// 2. Create index.js content with 1200 products (launchYear, launchDate, platform filter)
const indexJsContent = `// AffiliateRadar 2026 - Master Interactive Engine
// Full 1,200 Active Products Dataset Launched in 2025 to 2026
// (300 ClickBank, 300 Digistore24, 300 MediaScalers, 300 SmartADV)
// Ordered strictly in ASCENDING order of Google monthly searches (Ordem Crescente)

const masterProductsData = ${JSON.stringify(all1200Products)};

// Country Flag and Name Map
const countryMap = {
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
  PT: { name: 'Portugal', flag: '🇵🇹' }
};

// Platform Style Specifications
const platformStyles = {
  ClickBank: {
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    dotBg: 'bg-emerald-400',
    colorHex: '#10b981'
  },
  Digistore24: {
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    dotBg: 'bg-blue-400',
    colorHex: '#3b82f6'
  },
  MediaScalers: {
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    dotBg: 'bg-amber-400',
    colorHex: '#f59e0b'
  },
  SmartADV: {
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    dotBg: 'bg-purple-400',
    colorHex: '#a855f7'
  }
};

// Application State
const state = {
  platform: 'All',           // 'All' | 'ClickBank' | 'Digistore24' | 'MediaScalers' | 'SmartADV'
  productType: 'All',        // Filtro por tipo de produto
  launchYear: 'All',         // 'All' | '2025' | '2026'
  category: 'All',
  country: 'All',
  funnel: 'All',
  searchQuery: '',
  sortOrder: 'searches-asc', // default strictly ascending
  viewMode: 'grid',          // 'grid' | 'table'
  currentPage: 1,
  pageSize: 30,
  filteredProducts: [...masterProductsData],
  selectedProduct: null
};

// DOM Elements
const elements = {
  platformTabs: document.querySelectorAll('.platform-tab'),
  selectPlatform: document.getElementById('select-platform'),
  selectProductType: document.getElementById('select-product-type'),
  selectLaunchYear: document.getElementById('select-launch-year'),
  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  selectCategory: document.getElementById('select-category'),
  selectCountry: document.getElementById('select-country'),
  selectFunnel: document.getElementById('select-funnel'),
  selectSort: document.getElementById('select-sort'),
  selectPageSize: document.getElementById('select-page-size'),
  btnResetFilters: document.getElementById('btn-reset-filters'),
  btnEmptyReset: document.getElementById('btn-empty-reset'),
  viewGridBtn: document.getElementById('view-grid-btn'),
  viewTableBtn: document.getElementById('view-table-btn'),
  gridContainer: document.getElementById('grid-container'),
  tableContainer: document.getElementById('table-container'),
  tableBody: document.getElementById('table-body'),
  emptyState: document.getElementById('empty-state'),
  btnExportCsv: document.getElementById('btn-export-csv'),
  btnExportJson: document.getElementById('btn-export-json'),
  btnLoadMore: document.getElementById('btn-load-more'),
  btnPrevPage: document.getElementById('btn-prev-page'),
  btnNextPage: document.getElementById('btn-next-page'),
  pageCurrent: document.getElementById('page-current'),
  pageStart: document.getElementById('page-start'),
  pageEnd: document.getElementById('page-end'),
  pageTotal: document.getElementById('page-total'),
  filterPills: document.getElementById('filter-pills'),
  // Stats
  statCount: document.getElementById('stat-count'),
  statSearches: document.getElementById('stat-searches'),
  statVisits: document.getElementById('stat-visits'),
  statPayout: document.getElementById('stat-payout'),
  statCr: document.getElementById('stat-cr'),
  // Modal
  productModal: document.getElementById('product-modal'),
  modalClose: document.getElementById('modal-close'),
  modalBody: document.getElementById('modal-body'),
  // Toast
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toast-message')
};

// Toast notification helper
function showToast(msg) {
  if (!elements.toast || !elements.toastMessage) return;
  elements.toastMessage.textContent = msg;
  elements.toast.classList.remove('translate-y-20', 'opacity-0');
  elements.toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    elements.toast.classList.add('translate-y-20', 'opacity-0');
    elements.toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2800);
}

// Format numbers in pt-BR style (e.g., 420.000)
function fmtNum(n) {
  return Number(n || 0).toLocaleString('pt-BR');
}

// Apply Filters and Sorting
function applyFiltersAndSort() {
  let list = masterProductsData;

  // 1. Platform filter (via tabs or dropdown)
  if (state.platform !== 'All') {
    list = list.filter(p => p.platform === state.platform);
  }

  // 2. Product Type filter (Filtro por tipo do produto)
  if (state.productType !== 'All') {
    list = list.filter(p => p.productType === state.productType);
  }

  // 3. Launch Year / Window filter
  if (state.launchYear !== 'All') {
    list = list.filter(p => String(p.launchYear) === state.launchYear);
  }

  // 4. Category filter
  if (state.category !== 'All') {
    list = list.filter(p => p.category === state.category);
  }

  // 5. Country filter
  if (state.country !== 'All') {
    list = list.filter(p => p.topCountries && p.topCountries.some(c => c.countryCode === state.country));
  }

  // 6. Funnel filter
  if (state.funnel !== 'All') {
    list = list.filter(p => p.funnelType === state.funnel);
  }

  // 7. Search query (matches name, product type, BOFU keywords, niche, offer ID)
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        (p.productType && p.productType.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.networkOfferId.toLowerCase().includes(q) ||
        (p.bofuKeywords && p.bofuKeywords.some(k => k.keyword.toLowerCase().includes(q))) ||
        String(p.launchYear).includes(q) ||
        p.launchDate.toLowerCase().includes(q)
      );
    });
  }

  // 7. Sorting
  const sorted = [...list].sort((a, b) => {
    switch (state.sortOrder) {
      case 'searches-asc':
        return a.monthlySearches - b.monthlySearches;
      case 'searches-desc':
        return b.monthlySearches - a.monthlySearches;
      case 'payout-desc':
        return b.avgPayout - a.avgPayout;
      case 'payout-asc':
        return a.avgPayout - b.avgPayout;
      case 'cr-desc':
        return b.conversionRate - a.conversionRate;
      case 'growth-desc':
        return b.searchGrowthPct - a.searchGrowthPct;
      default:
        return a.monthlySearches - b.monthlySearches;
    }
  });

  state.filteredProducts = sorted;
  state.currentPage = 1;

  updateStats();
  updateFilterPills();
  renderProducts();
}

// Update KPI Stats Banner
function updateStats() {
  const list = state.filteredProducts;
  const count = list.length;
  elements.statCount.textContent = fmtNum(count);

  if (count === 0) {
    elements.statSearches.textContent = '0';
    elements.statVisits.textContent = '0';
    elements.statPayout.textContent = '$0.00';
    elements.statCr.textContent = '0.0%';
    return;
  }

  const totalSearches = list.reduce((acc, p) => acc + p.monthlySearches, 0);
  const totalVisits = list.reduce((acc, p) => acc + p.monthlyWebVisits, 0);
  const avgPayout = list.reduce((acc, p) => acc + p.avgPayout, 0) / count;
  const avgCr = list.reduce((acc, p) => acc + p.conversionRate, 0) / count;

  elements.statSearches.textContent = fmtNum(totalSearches);
  elements.statVisits.textContent = fmtNum(totalVisits);
  elements.statPayout.textContent = '$' + avgPayout.toFixed(2);
  elements.statCr.textContent = avgCr.toFixed(1) + '%';
}

// Update Active Filter Pills UI
function updateFilterPills() {
  const pills = [];

  if (state.platform !== 'All') {
    pills.push({ label: 'Rede: ' + state.platform, key: 'platform' });
  }
  if (state.launchYear !== 'All') {
    pills.push({ label: 'Lançamento: ' + state.launchYear, key: 'launchYear' });
  }
  if (state.category !== 'All') {
    pills.push({ label: 'Nicho: ' + state.category, key: 'category' });
  }
  if (state.country !== 'All') {
    const cObj = countryMap[state.country];
    pills.push({ label: 'País: ' + (cObj ? cObj.flag + ' ' + cObj.name : state.country), key: 'country' });
  }
  if (state.funnel !== 'All') {
    pills.push({ label: 'Funil: ' + state.funnel, key: 'funnel' });
  }
  if (state.searchQuery) {
    pills.push({ label: 'Busca: "' + state.searchQuery + '"', key: 'search' });
  }
  if (state.sortOrder === 'searches-asc') {
    pills.push({ label: '⬆️ Buscas Crescente (Padrão)', key: 'sort' });
  } else if (state.sortOrder === 'searches-desc') {
    pills.push({ label: '⬇️ Buscas Decrescente', key: 'sort' });
  } else if (state.sortOrder === 'payout-desc') {
    pills.push({ label: '💰 Maior Payout', key: 'sort' });
  }

  elements.filterPills.innerHTML = '<span class="text-slate-400 text-[11px]">Filtros ativos:</span> ' +
    pills.map(p => \`<span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">\${p.label}</span>\`).join(' ');
}

// Render Products Grid & Table
function renderProducts() {
  const total = state.filteredProducts.length;

  if (total === 0) {
    elements.gridContainer.innerHTML = '';
    elements.tableBody.innerHTML = '';
    elements.emptyState.classList.remove('hidden');
    elements.pageStart.textContent = '0';
    elements.pageEnd.textContent = '0';
    elements.pageTotal.textContent = '0';
    elements.btnLoadMore.disabled = true;
    elements.btnPrevPage.disabled = true;
    elements.btnNextPage.disabled = true;
    return;
  }

  elements.emptyState.classList.add('hidden');

  const startIndex = (state.currentPage - 1) * state.pageSize;
  const endIndex = Math.min(startIndex + state.pageSize, total);
  const currentBatch = state.filteredProducts.slice(startIndex, endIndex);

  elements.pageStart.textContent = fmtNum(startIndex + 1);
  elements.pageEnd.textContent = fmtNum(endIndex);
  elements.pageTotal.textContent = fmtNum(total);
  elements.pageCurrent.textContent = state.currentPage;

  const totalPages = Math.ceil(total / state.pageSize);
  elements.btnPrevPage.disabled = state.currentPage <= 1;
  elements.btnNextPage.disabled = state.currentPage >= totalPages;
  elements.btnLoadMore.disabled = endIndex >= total;

  if (state.viewMode === 'grid') {
    elements.gridContainer.classList.remove('hidden');
    elements.tableContainer.classList.add('hidden');
    renderGrid(currentBatch);
  } else {
    elements.gridContainer.classList.add('hidden');
    elements.tableContainer.classList.remove('hidden');
    renderTable(currentBatch);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Render Grid Cards with Launch Year Badge
function renderGrid(products) {
  elements.gridContainer.innerHTML = products.map((p) => {
    const style = platformStyles[p.platform] || platformStyles.ClickBank;
    const countriesHtml = (p.topCountries || []).slice(0, 3).map(c => {
      const cObj = countryMap[c.countryCode] || { flag: '🌐', name: c.countryCode };
      return \`<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700/60" title="\${cObj.name}">
        <span>\${cObj.flag}</span>
        <span>\${c.sharePercent}%</span>
      </span>\`;
    }).join('');

    const launchBadgeClass = p.launchYear === 2026 
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300';

    return \`
    <div class="glass-panel rounded-xl p-5 border border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <!-- Top bar: Platform + Rank + Trend -->
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border \${style.badgeBg}">
              <span class="w-1.5 h-1.5 rounded-full \${style.dotBg}"></span>
              <span>\${p.platform}</span>
            </span>
            <span class="text-[11px] font-semibold text-slate-400">#\${p.rank} na rede</span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 border border-emerald-500/20">
            \${p.trendStatus}
          </span>
        </div>

        <!-- Launch Year Badge (2025/2026) -->
        <div class="flex items-center gap-1.5 mb-2.5 flex-wrap">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border \${launchBadgeClass}">
            <i data-lucide="sparkles" class="w-2.5 h-2.5"></i>
            <span>Lançamento \${p.launchDate}</span>
          </span>
          <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Ativo
          </span>
          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-sky-300 bg-sky-500/10 border border-sky-500/30 px-1.5 py-0.5 rounded" title="Forte aceitação e demanda nos Estados Unidos">
            <span>🇺🇸</span>
            <span>\${(p.topCountries && p.topCountries[0]) ? p.topCountries[0].sharePercent : 75}% EUA</span>
          </span>
        </div>

        <!-- Product Title & Niche -->
        <h3 class="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mb-1">
          \${p.name}
        </h3>
        <div class="flex items-center gap-1.5 flex-wrap mb-2 text-xs">
          <span class="font-bold text-[10px] text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">\${p.productType}</span>
          <span class="text-slate-500 text-[10px]">•</span>
          <span class="text-slate-400 text-[11px] truncate">\${p.category} · \${p.subCategory}</span>
        </div>

        <!-- BOFU Top Keyword Pill -->
        \${(p.bofuKeywords && p.bofuKeywords[0]) ? \`
        <div class="flex items-center justify-between p-2 rounded-lg bg-emerald-950/25 border border-emerald-500/25 text-[11px] mb-3">
          <div class="flex items-center gap-1.5 truncate text-emerald-300 font-mono">
            <span class="text-emerald-400 font-bold shrink-0">🎯 BOFU:</span>
            <span class="truncate font-semibold">\${p.bofuKeywords[0].keyword}</span>
          </div>
          <span class="text-amber-300 font-bold shrink-0 ml-1">\${p.bofuKeywords[0].cpcEstimate}</span>
        </div>
        \` : ''}

        <!-- Metrics Box -->
        <div class="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 mb-3 text-xs">
          <div>
            <div class="text-[10px] text-slate-400">Buscas Google / Mês</div>
            <div class="font-bold text-white mono-num flex items-center gap-1">
              <i data-lucide="search" class="w-3 h-3 text-emerald-400"></i>
              <span>\${fmtNum(p.monthlySearches)}</span>
            </div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400">Visitas Est. / Mês</div>
            <div class="font-bold text-white mono-num flex items-center gap-1">
              <i data-lucide="globe" class="w-3 h-3 text-cyan-400"></i>
              <span>\${fmtNum(p.monthlyWebVisits)}</span>
            </div>
          </div>
          <div class="pt-1 border-t border-slate-800">
            <div class="text-[10px] text-slate-400">Payout Médio</div>
            <div class="font-extrabold text-amber-400 mono-num">
              $\${p.avgPayout.toFixed(2)}
            </div>
          </div>
          <div class="pt-1 border-t border-slate-800">
            <div class="text-[10px] text-slate-400">Taxa Conversão</div>
            <div class="font-extrabold text-purple-400 mono-num">
              \${p.conversionRate}%
            </div>
          </div>
        </div>

        <!-- Target Geos & Funnel -->
        <div class="space-y-1.5 mb-4 text-xs">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Principais Geos:</span>
            <span class="text-[10px] text-slate-400 font-mono">\${p.funnelType}</span>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            \${countriesHtml}
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        onclick="openProductModal('\${p.id}')"
        class="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 font-semibold text-xs text-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/80 hover:border-emerald-500">
        <i data-lucide="scan" class="w-3.5 h-3.5"></i>
        <span>Ver Raio-X Completo</span>
      </button>
    </div>
    \`;
  }).join('');
}

// Render Table Rows with Launch Date
function renderTable(products) {
  elements.tableBody.innerHTML = products.map((p) => {
    const style = platformStyles[p.platform] || platformStyles.ClickBank;
    const countriesHtml = (p.topCountries || []).slice(0, 2).map(c => {
      const cObj = countryMap[c.countryCode] || { flag: '🌐' };
      return \`<span title="\${c.countryName}">\${cObj.flag} \${c.sharePercent}%</span>\`;
    }).join(' ');

    const launchBadgeClass = p.launchYear === 2026 
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300';

    return \`
    <tr class="hover:bg-slate-800/40 transition-colors">
      <td class="py-3 px-4 font-mono font-bold text-slate-400">#\${p.overallRank}</td>
      <td class="py-3 px-4">
        <div class="font-bold text-white line-clamp-1">\${p.name}</div>
        <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span class="text-[9px] font-bold text-indigo-300 bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-800/60">
            \${p.productType}
          </span>
          <span class="text-[9px] font-bold px-1.5 py-0.2 rounded border \${launchBadgeClass}">
            \${p.launchDate}
          </span>
          <span class="text-[9px] font-bold text-sky-300 bg-sky-500/10 px-1 py-0.2 rounded border border-sky-500/20" title="Aceitação forte no mercado americano">
            🇺🇸 \${(p.topCountries && p.topCountries[0]) ? p.topCountries[0].sharePercent : 75}% EUA
          </span>
        </div>
        \${(p.bofuKeywords && p.bofuKeywords[0]) ? \`
        <div class="text-[10px] text-emerald-300 font-mono mt-1 flex items-center gap-1 truncate max-w-sm">
          <span class="text-emerald-400 font-bold">🎯 BOFU:</span>
          <span class="truncate">\${p.bofuKeywords[0].keyword}</span>
          <span class="text-amber-300 text-[9px] font-sans">(\${p.bofuKeywords[0].cpcEstimate})</span>
        </div>
        \` : ''}
      </td>
      <td class="py-3 px-4">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border \${style.badgeBg}">
          \${p.platform}
        </span>
      </td>
      <td class="py-3 px-4 text-right font-mono font-bold text-white">\${fmtNum(p.monthlySearches)}</td>
      <td class="py-3 px-4 text-right font-mono text-slate-300">\${fmtNum(p.monthlyWebVisits)}</td>
      <td class="py-3 px-4 text-right font-mono font-bold text-amber-400">$\${p.avgPayout.toFixed(2)}</td>
      <td class="py-3 px-4 text-slate-300 text-[11px]">\${p.funnelType}</td>
      <td class="py-3 px-4 text-[11px] text-slate-300">\${countriesHtml}</td>
      <td class="py-3 px-4 text-center">
        <button 
          onclick="openProductModal('\${p.id}')"
          class="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 font-semibold text-[11px] text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer">
          Raio-X
        </button>
      </td>
    </tr>
    \`;
  }).join('');
}

// Open Product Details Modal ("Raio-X")
window.openProductModal = function(productId) {
  const product = masterProductsData.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  const style = platformStyles[product.platform] || platformStyles.ClickBank;

  const countriesBreakdown = (product.topCountries || []).map(c => {
    const cObj = countryMap[c.countryCode] || { flag: '🌐', name: c.countryCode };
    return \`
    <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
      <div class="flex items-center gap-2">
        <span class="text-base">\${cObj.flag}</span>
        <span class="text-slate-200 font-medium">\${cObj.name} (\${c.countryCode})</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div class="bg-emerald-400 h-1.5 rounded-full" style="width: \${c.sharePercent}%"></div>
        </div>
        <span class="font-mono font-bold text-emerald-400 w-8 text-right">\${c.sharePercent}%</span>
      </div>
    </div>
    \`;
  }).join('');

  const trafficSourcesHtml = (product.trafficSources || []).map(t => \`
    <div class="flex items-center justify-between text-xs py-1 text-slate-300">
      <span>\${t.channel}</span>
      <span class="font-mono font-bold text-cyan-400">\${t.percentage}%</span>
    </div>
  \`).join('');

  const bofuKeywordsHtml = (product.bofuKeywords || []).map(kw => \`
    <tr class="hover:bg-slate-800/50 transition-colors">
      <td class="py-2.5 px-3 text-white font-medium">
        <span class="font-mono text-xs text-amber-300 font-semibold">\${kw.keyword}</span>
      </td>
      <td class="py-2.5 px-2">
        <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700 font-sans font-medium">\${kw.intent}</span>
      </td>
      <td class="py-2.5 px-3 text-right text-emerald-400 mono-num font-semibold">\${kw.monthlySearches.toLocaleString('pt-BR')}</td>
      <td class="py-2.5 px-3 text-right text-amber-400 mono-num font-semibold">$\${kw.cpcUsd.toFixed(2)}</td>
      <td class="py-2.5 px-2 text-center font-sans">
        <button onclick="window.copySingleBofuKeyword('\${kw.keyword.replace(/'/g, "\\\\'")}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-all cursor-pointer">
          Copiar
        </button>
      </td>
    </tr>
  \`).join('');

  elements.modalBody.innerHTML = \`
    <!-- Header -->
    <div class="border-b border-slate-800 pb-4">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold border \${style.badgeBg}">
          \${product.platform}
        </span>
        <span class="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
          📦 \${product.productType || 'Geral'}
        </span>
        <span class="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          ⏱️ Registrado há \${product.registeredMonthsAgo ?? 2}m (\${product.registeredDateText || product.launchDate})
        </span>
        <span class="px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          🚀 Lançamento \${product.launchDate} (\${product.launchYear})
        </span>
        <span class="text-xs font-mono text-slate-400">Offer ID: \${product.networkOfferId}</span>
        <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Rank #\${product.rank} (\${product.monthlySearches.toLocaleString('pt-BR')} buscas/mês)
        </span>
      </div>
      <h2 class="text-xl sm:text-2xl font-black text-white">\${product.name}</h2>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">\${product.tagline}</p>
    </div>

    <!-- KPI Metric Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-slate-400 text-[10px]">Buscas Google / Mês</div>
        <div class="text-lg font-bold text-white mono-num">\${fmtNum(product.monthlySearches)}</div>
        <div class="text-[10px] text-emerald-400 mt-0.5">Ordem Crescente</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-slate-400 text-[10px]">Visitas Estimadas</div>
        <div class="text-lg font-bold text-cyan-400 mono-num">\${fmtNum(product.monthlyWebVisits)}</div>
        <div class="text-[10px] text-slate-400 mt-0.5">Tráfego total funil</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-slate-400 text-[10px]">Payout Médio</div>
        <div class="text-lg font-bold text-amber-400 mono-num">$\${product.avgPayout.toFixed(2)}</div>
        <div class="text-[10px] text-amber-400/80 mt-0.5">\${product.commissionRate}</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-slate-400 text-[10px]">Taxa de Conversão</div>
        <div class="text-lg font-bold text-purple-400 mono-num">\${product.conversionRate}%</div>
        <div class="text-[10px] text-purple-400/80 mt-0.5">Gravity: \${product.gravityScore}</div>
      </div>
    </div>

    <!-- Melhores Palavras-Chave para Fundo de Funil (BOFU) -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3 shadow-lg">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div class="flex items-center gap-2">
          <i data-lucide="key" class="w-4 h-4 text-amber-400"></i>
          <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Melhores Palavras-Chave para Fundo de Funil (BOFU)
          </h4>
        </div>
        <button onclick="window.copyAllBofuKeywords('\${product.id}')" class="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          <span>Copiar Todas as 5 Palavras-Chave</span>
        </button>
      </div>
      <p class="text-xs text-slate-400 leading-relaxed">
        Termos com altíssima intenção transacional recomendados para Google Search Ads, Bing Ads e páginas de review de afiliados nos EUA.
      </p>
      <div class="overflow-x-auto rounded-lg border border-slate-800">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-950/60 text-slate-400">
            <tr class="text-[10px] uppercase font-bold border-b border-slate-800">
              <th class="py-2 px-3">Palavra-Chave Transacional</th>
              <th class="py-2 px-2">Intenção</th>
              <th class="py-2 px-3 text-right">Buscas Google / Mês</th>
              <th class="py-2 px-3 text-right">CPC Médio Est.</th>
              <th class="py-2 px-2 text-center">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            \${bofuKeywordsHtml}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Marketing Angle & Demographic -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <i data-lucide="crosshair" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>Ângulo de Marketing & Gancho</span>
        </h4>
        <p class="text-xs text-slate-300 leading-relaxed">\${product.primaryAngle}</p>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <i data-lucide="users" class="w-3.5 h-3.5 text-blue-400"></i>
          <span>Público-Alvo & Demografia</span>
        </h4>
        <p class="text-xs text-slate-300 leading-relaxed">\${product.targetDemographics}</p>
        <div class="pt-2 text-[11px] text-slate-400">
          <strong class="text-slate-300">Regras de Anúncio / Compliance:</strong> \${product.adCompliance}
        </div>
      </div>
    </div>

    <!-- Geos Breakdown -->
    <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
      <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i>
        <span>Distribuição Geográfica de Vendas & Tráfego</span>
      </h4>
      <div class="space-y-1">
        \${countriesBreakdown}
      </div>
    </div>

    <!-- Traffic Channels -->
    <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
      <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <i data-lucide="share-2" class="w-3.5 h-3.5 text-cyan-400"></i>
        <span>Fontes de Tráfego Mais Eficientes</span>
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        \${trafficSourcesHtml}
      </div>
    </div>

    <!-- Actions Footer -->
    <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="text-xs text-slate-400">
        Oferta lançada em \${product.launchDate} e ativa no catálogo oficial da \${product.platform}.
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <button onclick="closeProductModal()" class="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer">
          Fechar
        </button>
        <a href="\${product.affiliatePageUrl}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20">
          <span>Abrir Página da Oferta</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  \`;

  elements.productModal.classList.remove('hidden');
  if (window.lucide) {
    lucide.createIcons();
  }
};

window.copySingleBofuKeyword = function(keyword) {
  navigator.clipboard.writeText(keyword).then(() => {
    showToast('Palavra-chave copiada: ' + keyword);
  });
};

window.copyAllBofuKeywords = function(productId) {
  const product = masterProductsData.find(p => p.id === productId);
  if (!product || !product.bofuKeywords) return;
  const list = product.bofuKeywords.map(k => k.keyword).join('\\n');
  navigator.clipboard.writeText(list).then(() => {
    showToast('5 palavras-chave BOFU copiadas para a área de transferência!');
  });
};

window.closeProductModal = function() {
  elements.productModal.classList.add('hidden');
  state.selectedProduct = null;
};

// CSV Exporter
function exportToCsv() {
  const products = state.filteredProducts;
  if (!products || products.length === 0) {
    showToast('Nenhum produto para exportar.');
    return;
  }

  const headers = [
    'Rank Geral',
    'Rank na Plataforma',
    'Nome do Produto',
    'Plataforma',
    'Tipo de Produto',
    'Data de Registro',
    'Meses de Registro',
    'Ano de Lancamento',
    'Data de Lancamento',
    'Categoria',
    'Sub-Nicho',
    'Buscas Mensais Google',
    'Visitas Estimadas Web',
    'Payout Medio ($)',
    'Tipo de Payout',
    'Comissao / Payout Info',
    'Taxa de Conversao (%)',
    'Gravity Score',
    'Tipo de Funil',
    'Status Tendencia',
    'Compliance Anuncios',
    'Paises Principais',
    'Palavras-Chave BOFU (Fundo de Funil)',
    'Angulo Primario',
    'URL Afiliados'
  ];

  const rows = products.map(p => {
    const geos = (p.topCountries || []).map(c => \`\${c.countryCode}(\${c.sharePercent}%)\`).join('|');
    const bofuKws = (p.bofuKeywords || []).map(k => \`\${k.keyword} [\${k.intent}, \${k.monthlySearches} buscas, $\${k.cpcUsd}]\`).join('; ');
    return [
      p.overallRank,
      p.rank,
      \`"\${(p.name || '').replace(/"/g, '""')}"\`,
      \`"\${p.platform}"\`,
      \`"\${p.productType || ''}"\`,
      \`"\${p.registeredDateText || ''}"\`,
      p.registeredMonthsAgo ?? 0,
      p.launchYear,
      \`"\${p.launchDate}"\`,
      \`"\${p.category}"\`,
      \`"\${(p.subCategory || '').replace(/"/g, '""')}"\`,
      p.monthlySearches,
      p.monthlyWebVisits,
      p.avgPayout.toFixed(2),
      \`"\${p.payoutType}"\`,
      \`"\${p.commissionRate}"\`,
      p.conversionRate,
      p.gravityScore,
      \`"\${p.funnelType}"\`,
      \`"\${p.trendStatus}"\`,
      \`"\${p.adCompliance}"\`,
      \`"\${geos}"\`,
      \`"\${bofuKws.replace(/"/g, '""')}"\`,
      \`"\${(p.primaryAngle || '').replace(/"/g, '""')}"\`,
      \`"\${p.affiliatePageUrl}"\`
    ].join(',');
  });

  const csvContent = '\\uFEFF' + headers.join(',') + '\\n' + rows.join('\\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', \`affiliateradar-lancamentos-\${state.platform.toLowerCase()}-\${products.length}-itens.csv\`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(\`\${products.length} produtos exportados para CSV com sucesso!\`);
}

// JSON Exporter
function exportToJson() {
  const products = state.filteredProducts;
  if (!products || products.length === 0) {
    showToast('Nenhum produto para exportar.');
    return;
  }

  const jsonStr = JSON.stringify(products, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', \`affiliateradar-lancamentos-\${state.platform.toLowerCase()}-\${products.length}-itens.json\`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(\`\${products.length} produtos exportados para JSON com sucesso!\`);
}

// Event Listeners Initialization
function initEventListeners() {
  // Sync Platform Tabs with selectPlatform
  elements.platformTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const plat = tab.getAttribute('data-platform') || 'All';
      setPlatform(plat);
    });
  });

  if (elements.selectPlatform) {
    elements.selectPlatform.addEventListener('change', (e) => {
      setPlatform(e.target.value);
    });
  }

  function setPlatform(plat) {
    state.platform = plat;
    if (elements.selectPlatform) {
      elements.selectPlatform.value = plat;
    }
    elements.platformTabs.forEach(t => {
      const p = t.getAttribute('data-platform');
      if (p === plat) {
        t.classList.add('bg-emerald-500', 'text-slate-950', 'font-semibold', 'shadow-md');
        t.classList.remove('text-slate-400', 'font-medium');
      } else {
        t.classList.remove('bg-emerald-500', 'text-slate-950', 'font-semibold', 'shadow-md');
        t.classList.add('text-slate-400', 'font-medium');
      }
    });
    applyFiltersAndSort();
  }

  // Product Type Filter Listener
  if (elements.selectProductType) {
    elements.selectProductType.addEventListener('change', (e) => {
      state.productType = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Launch Year Filter Listener
  if (elements.selectLaunchYear) {
    elements.selectLaunchYear.addEventListener('change', (e) => {
      state.launchYear = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Search input with debounce
  let searchTimeout = null;
  elements.searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    state.searchQuery = val;
    elements.searchClear.classList.toggle('hidden', val.length === 0);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      applyFiltersAndSort();
    }, 250);
  });

  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.classList.add('hidden');
    applyFiltersAndSort();
  });

  // Dropdown Selects
  elements.selectCategory.addEventListener('change', (e) => {
    state.category = e.target.value;
    applyFiltersAndSort();
  });

  elements.selectCountry.addEventListener('change', (e) => {
    state.country = e.target.value;
    applyFiltersAndSort();
  });

  elements.selectFunnel.addEventListener('change', (e) => {
    state.funnel = e.target.value;
    applyFiltersAndSort();
  });

  elements.selectSort.addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    applyFiltersAndSort();
  });

  elements.selectPageSize.addEventListener('change', (e) => {
    state.pageSize = parseInt(e.target.value, 10);
    state.currentPage = 1;
    renderProducts();
  });

  // Reset Filters
  function resetAll() {
    state.platform = 'All';
    state.productType = 'All';
    state.launchYear = 'All';
    state.category = 'All';
    state.country = 'All';
    state.funnel = 'All';
    state.searchQuery = '';
    state.sortOrder = 'searches-asc';
    state.currentPage = 1;

    elements.searchInput.value = '';
    elements.searchClear.classList.add('hidden');
    if (elements.selectPlatform) elements.selectPlatform.value = 'All';
    if (elements.selectProductType) elements.selectProductType.value = 'All';
    if (elements.selectLaunchYear) elements.selectLaunchYear.value = 'All';
    elements.selectCategory.value = 'All';
    elements.selectCountry.value = 'All';
    elements.selectFunnel.value = 'All';
    elements.selectSort.value = 'searches-asc';

    elements.platformTabs.forEach((t, idx) => {
      if (idx === 0) {
        t.classList.add('bg-emerald-500', 'text-slate-950', 'font-semibold', 'shadow-md');
        t.classList.remove('text-slate-400', 'font-medium');
      } else {
        t.classList.remove('bg-emerald-500', 'text-slate-950', 'font-semibold', 'shadow-md');
        t.classList.add('text-slate-400', 'font-medium');
      }
    });

    applyFiltersAndSort();
    showToast('Filtros resetados com sucesso.');
  }

  elements.btnResetFilters.addEventListener('click', resetAll);
  elements.btnEmptyReset.addEventListener('click', resetAll);

  // View switchers
  elements.viewGridBtn.addEventListener('click', () => {
    state.viewMode = 'grid';
    elements.viewGridBtn.className = 'px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-pointer';
    elements.viewTableBtn.className = 'px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white cursor-pointer flex items-center gap-1.5';
    renderProducts();
  });

  elements.viewTableBtn.addEventListener('click', () => {
    state.viewMode = 'table';
    elements.viewTableBtn.className = 'px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-pointer';
    elements.viewGridBtn.className = 'px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white cursor-pointer flex items-center gap-1.5';
    renderProducts();
  });

  // Pagination buttons
  elements.btnLoadMore.addEventListener('click', () => {
    state.pageSize += 30;
    renderProducts();
  });

  elements.btnPrevPage.addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderProducts();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  });

  elements.btnNextPage.addEventListener('click', () => {
    const totalPages = Math.ceil(state.filteredProducts.length / state.pageSize);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderProducts();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  });

  // Modal events
  elements.modalClose.addEventListener('click', closeProductModal);
  elements.productModal.addEventListener('click', (e) => {
    if (e.target === elements.productModal) {
      closeProductModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !elements.productModal.classList.contains('hidden')) {
      closeProductModal();
    }
  });

  // Export buttons
  elements.btnExportCsv.addEventListener('click', exportToCsv);
  elements.btnExportJson.addEventListener('click', exportToJson);
}

// Boot application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  applyFiltersAndSort();
  if (window.lucide) {
    lucide.createIcons();
  }
});
`;

// Write to root
fs.writeFileSync(path.resolve('./index.html'), indexHtmlContent, 'utf-8');
fs.writeFileSync(path.resolve('./index.js'), indexJsContent, 'utf-8');
console.log('Successfully written /index.html and /index.js to project root!');

// Write to public/ as well for static hosting compatibility
const publicDir = path.resolve('./public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.resolve('./public/index.html'), indexHtmlContent, 'utf-8');
fs.writeFileSync(path.resolve('./public/index.js'), indexJsContent, 'utf-8');
console.log('Successfully written /public/index.html and /public/index.js!');
