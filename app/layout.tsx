import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AffiliateRadar 2026 | 1.200 Produtos Lançados em 2025/2026 com Forte Aceitação nos EUA',
  description: 'Inteligência de mercado dos 1.200 produtos com nomes simples e forte aceitação nos Estados Unidos lançados entre 2025 e 2026 (300 por plataforma: ClickBank, Digistore24, MediaScalers e SmartADV) em ordem crescente de buscas no Google.',
  openGraph: {
    title: 'AffiliateRadar 2026 | 1.200 Produtos Lançados em 2025/2026 com Forte Aceitação nos EUA',
    description: '1.200 ofertas com nomes simples e forte aceitação nos Estados Unidos em ordem crescente de buscas no Google nas plataformas ClickBank, Digistore24, MediaScalers e SmartADV.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AffiliateRadar 2026 | 1.200 Produtos em Ordem Crescente de Buscas',
    description: 'Monitor dos 1.200 produtos mais buscados com nomes simples e forte aceitação nos EUA.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
