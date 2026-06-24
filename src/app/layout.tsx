import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import GAPageView from '@/components/analytics/GAPageView';
import LeadModal from '@/components/lead/LeadModal';
import { defaultMetadata } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2D6A4F',
};

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL('https://terradron.ro'),
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION ?? '',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? '',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://terradron.ro',
    siteName: 'TerraDron.ro',
    title: 'Platforma Operatorilor de Drone Agricole din România',
    description:
      'Găsește rapid operatori verificați de drone agricole în județul tău. Servicii de pulverizare, fertilizare, cartografiere și monitorizare.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TerraDron.ro — Operatori de Drone Agricole din România',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@terradronro',
    title: 'Operatori de Drone Agricole în România | TerraDron.ro',
    description:
      'Găsește operatori verificați de drone agricole în România. 20 operatori, 41 județe.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://formspree.io" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-green-700 focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Sari la conținut
        </a>
        <GoogleAnalytics />
        <GAPageView />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <LeadModal />
      </body>
    </html>
  );
}
