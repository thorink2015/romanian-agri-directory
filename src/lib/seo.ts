import { Metadata } from 'next';
import { Operator } from '@/data/types';
import { County } from '@/data/types';

const SITE_URL = 'https://terradron.ro';
const SITE_NAME = 'TerraDron.ro';

export function buildOperatorMetadata(operator: Operator): Metadata {
  const price = operator.priceMinRon
    ? `Prețuri de la ${operator.priceMinRon} RON/ha. `
    : operator.priceMinMdl
    ? `Prețuri de la ${operator.priceMinMdl} MDL/ha. `
    : '';
  const coverage = operator.country === 'MD'
    ? `Acoperire în ${operator.moldovaRaioane?.length || 'toate'} raioane din Moldova.`
    : operator.counties.length > 0
    ? `Acoperire în ${operator.counties.length} județe din România.`
    : 'Acoperire la nivel național.';
  return {
    title: `${operator.name} | Servicii Drone Agricole ${operator.city} | Prețuri și Contact`,
    description: `${operator.name}, operator de drone agricole din ${operator.city}. ${price}${operator.services.length} servicii disponibile. ${coverage} Contact direct.`,
    alternates: { canonical: `/operatori/${operator.slug}` },
    openGraph: {
      title: `${operator.name} | TerraDron.ro`,
      description: operator.description.slice(0, 155),
      url: `${SITE_URL}/operatori/${operator.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${operator.name} | Drone Agricole ${operator.city}`,
      description: operator.description.slice(0, 155),
    },
  };
}

export function buildCountyMetadata(county: County, operatorCount: number): Metadata {
  const crops = county.mainCrops.slice(0, 3).join(', ');
  const desc = `Găsești ${operatorCount} operatori de drone agricole în județul ${county.name}. Prețuri pulverizare, recenzii și contact direct. Servicii pentru ${crops} și alte culturi.`;
  return {
    title: `Drone Agricole ${county.name} | Operatori și Prețuri 2026`,
    description: desc,
    alternates: { canonical: `/judete/${county.slug}` },
    openGraph: {
      title: `Drone Agricole ${county.name} | TerraDron.ro`,
      description: `Operatori verificați de drone agricole în ${county.name}. Pulverizare, cartografiere și monitorizare pentru fermieri.`,
      url: `${SITE_URL}/judete/${county.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Drone Agricole ${county.name} | Operatori și Prețuri 2026`,
      description: desc,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Operatori de Drone Agricole din România | TerraDron.ro',
    template: '%s | TerraDron.ro',
  },
  description:
    'Cea mai completă platformă de operatori de drone agricole din România. Găsește operatori verificați pentru pulverizare, cartografiere și monitorizare în toată țara.',
  keywords: [
    'drone agricole', 'operatori drone agricole', 'pulverizare cu drona',
    'tratamente cu drona', 'drone agricole Romania', 'platforma drone agricole',
  ],
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'ro_RO',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'TerraDron.ro — Operatori de Drone Agricole din România',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};
