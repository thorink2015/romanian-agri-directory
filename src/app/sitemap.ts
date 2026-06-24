import { MetadataRoute } from 'next';
import { operators, getOperatorsByCounty } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { moldovaRegions } from '@/data/regions-moldova';
import { services } from '@/data/services';
import { droneModels } from '@/data/drone-models';
import { cities } from '@/data/cities';
import { wineRegions } from '@/data/wine-regions';
import { guides } from '@/data/guides';
import { blogPosts } from '@/data/blog-posts';
import { SERVICE_LABELS } from '@/data/types';

const BASE_URL = 'https://terradron.ro';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Static pages ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/operatori`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/judete`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/harta`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/culturi`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servicii`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/drone`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/orase`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/regiuni-viticole`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/moldova`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/moldova/operatori`, lastModified: now, changeFrequency: 'weekly', priority: 0.82 },
    { url: `${BASE_URL}/moldova/harta`, lastModified: now, changeFrequency: 'weekly', priority: 0.78 },
    { url: `${BASE_URL}/moldova/servicii`, lastModified: now, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE_URL}/moldova/preturi`, lastModified: now, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE_URL}/moldova/ghid`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/moldova/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}/moldova/unelte`, lastModified: now, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE_URL}/moldova/unelte/calculator-pret-pulverizare`, lastModified: now, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${BASE_URL}/moldova/unelte/calculator-hectare`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/moldova/unelte/comparator-drone`, lastModified: now, changeFrequency: 'monthly', priority: 0.68 },
    { url: `${BASE_URL}/moldova/unelte/calendar-tratamente`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/preturi-pulverizare-drona`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/ghid`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/unelte`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/adauga-operator`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/despre`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  // ─── Operator profiles (23) ─────────────────────────────────────────────
  const operatorPages: MetadataRoute.Sitemap = operators.map((op) => ({
    url: `${BASE_URL}/operatori/${op.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // ─── County pages (41 × 2 = 82) ──────────────────────────────────────────
  const countyPages: MetadataRoute.Sitemap = counties.flatMap((c) => [
    {
      url: `${BASE_URL}/judete/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/judete/${c.slug}/operatori`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
  ]);

  // ─── County + Crop pages (41 × 8 = 328) ──────────────────────────────────
  const countyCropPages: MetadataRoute.Sitemap = counties.flatMap((county) =>
    crops.map((crop) => ({
      url: `${BASE_URL}/judete/${county.slug}/culturi/${crop.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ─── County + Service pages — only counties that have at least 1 operator ──
  const serviceKeys = Object.keys(SERVICE_LABELS);
  const countyServicePages: MetadataRoute.Sitemap = counties
    .filter((county) => getOperatorsByCounty(county.slug).length > 0)
    .flatMap((county) =>
      serviceKeys.map((serviceKey) => ({
        url: `${BASE_URL}/judete/${county.slug}/servicii/${serviceKey}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    );

  // ─── Crop pages (8) ───────────────────────────────────────────────────────
  const cropPages: MetadataRoute.Sitemap = crops.map((c) => ({
    url: `${BASE_URL}/culturi/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Service pages (10) ──────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/servicii/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // ─── Drone model pages (5) ───────────────────────────────────────────────
  const dronePages: MetadataRoute.Sitemap = droneModels.map((d) => ({
    url: `${BASE_URL}/drone/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  // ─── City pages ──────────────────────────────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = cities
    .filter((c) => !c.county.includes('-md'))
    .map((c) => ({
      url: `${BASE_URL}/orase/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // ─── Wine region pages (6) ───────────────────────────────────────────────
  const wineRegionPages: MetadataRoute.Sitemap = wineRegions.map((r) => ({
    url: `${BASE_URL}/regiuni-viticole/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));

  // ─── Moldova region pages (35) ───────────────────────────────────────────
  const moldovaPages: MetadataRoute.Sitemap = moldovaRegions.map((r) => ({
    url: `${BASE_URL}/moldova/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // ─── Guide pages (RO only — MD guides live at /moldova/ghid/[slug]) ────────
  const guidePages: MetadataRoute.Sitemap = guides
    .filter((g) => !g.country || g.country === 'RO')
    .map((g) => ({
      url: `${BASE_URL}/ghid/${g.slug}`,
      lastModified: new Date(g.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // ─── Moldova guide detail pages (MD guides only) ─────────────────────────
  const moldovaGuidePages: MetadataRoute.Sitemap = guides
    .filter((g) => g.country === 'MD')
    .map((g) => ({
      url: `${BASE_URL}/moldova/ghid/${g.slug}`,
      lastModified: new Date(g.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    }));

  // ─── Moldova service detail pages ────────────────────────────────────────
  const moldovaServiceDetailPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/moldova/servicii/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));

  // ─── Tools pages (4) ─────────────────────────────────────────────────────
  const toolPages: MetadataRoute.Sitemap = [
    'calculator-pret-pulverizare',
    'calculator-hectare',
    'comparator-drone',
    'calendar-tratamente',
  ].map((slug) => ({
    url: `${BASE_URL}/unelte/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.78,
  }));

  // ─── Blog posts (12+) ────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,        // 15
    ...operatorPages,      // 23
    ...countyPages,        // 82
    ...countyCropPages,    // 328
    ...countyServicePages, // 410 (41 × 10 services)
    ...cropPages,          // 8
    ...servicePages,       // 10
    ...dronePages,         // 5
    ...cityPages,          // ~18
    ...wineRegionPages,    // 6
    ...moldovaPages,              // 35
    ...guidePages,                // 6
    ...moldovaGuidePages,         // 3 (MD guides)
    ...moldovaServiceDetailPages, // 10
    ...toolPages,                 // 4
    ...blogPages,                 // 12
    // Total: ~985+ URLs
  ];
}
