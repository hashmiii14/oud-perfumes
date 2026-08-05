import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { StoreProvider } from '@/lib/store/store-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/layout/cart-drawer';
import { SearchOverlay } from '@/components/layout/search-overlay';
import { Toaster } from 'sonner';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oudarabia.com'),
  title: {
    default: 'Oud Arábia — Luxury Oud & Arabian Perfumes',
    template: '%s | Oud Arábia',
  },
  description:
    'Discover rare oud, attars and Arabian luxury perfumes. Crafted in India, loved across the Gulf. Free shipping across India, UAE, Qatar, Saudi Arabia, Kuwait, Bahrain & Oman.',
  keywords: ['oud', 'arabian perfume', 'attar', 'luxury fragrance', 'oud perfume', 'perfume india', 'perfume dubai'],
  openGraph: {
    title: 'Oud Arábia — Luxury Oud & Arabian Perfumes',
    description: 'Rare oud, attars and luxury Arabian perfumes crafted in India, shipped across the Gulf.',
    type: 'website',
    siteName: 'Oud Arábia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oud Arábia — Luxury Oud & Arabian Perfumes',
    description: 'Rare oud, attars and luxury Arabian perfumes crafted in India, shipped across the Gulf.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Oud Arábia',
    description: 'Luxury oud and Arabian perfume maison',
    url: 'https://oudarabia.com',
    foundingDate: '1996',
    address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  };

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-background text-foreground">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(30 8% 7%)',
                color: 'hsl(40 30% 96%)',
                border: '1px solid hsl(38 44% 55% / 0.3)',
                fontFamily: 'var(--font-sans)',
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
