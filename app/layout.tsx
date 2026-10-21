import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AffiliateRadar 2026 | Top 100 Produtos com Mais Buscas por Plataforma',
  description: 'Inteligência de mercado e afiliados: Os 100 produtos com maior volume de buscas no Google em Setembro e Outubro de 2026 nas plataformas ClickBank, Digistore24, MediaScalers e SmartADV.',
  openGraph: {
    title: 'AffiliateRadar 2026 | Top 100 Produtos com Mais Buscas por Plataforma',
    description: 'Os 100 produtos de maior volume de busca no Google em Setembro e Outubro de 2026 nas plataformas ClickBank, Digistore24, MediaScalers e SmartADV.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AffiliateRadar 2026 | Top 100 Mais Buscados por Plataforma',
    description: 'Monitor dos produtos com mais buscas no Google em redes de afiliados globais.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
