import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { guides, getGuideBySlug, GUIDE_CATEGORIES } from '@/data/guides';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { guideContent } from '@/app/ghid/[slug]/content';

interface Props {
  params: { slug: string };
}

// Only generate static params for Moldova-specific guides
export async function generateStaticParams() {
  return guides
    .filter((g) => g.country === 'MD')
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide || guide.country !== 'MD') return {};
  return {
    title: { absolute: `${guide.title} | TerraDron.md Moldova` },
    description: guide.description,
    alternates: { canonical: `/moldova/ghid/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.lastUpdated,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  green:  'bg-green-100  text-green-800',
  blue:   'bg-blue-100   text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
};

export default function MoldovaGuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide || guide.country !== 'MD') notFound();

  const content = guideContent[guide.slug];
  const otherMdGuides = guides
    .filter((g) => g.country === 'MD' && g.slug !== guide.slug);
  const categoryMeta = GUIDE_CATEGORIES[guide.category];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.description,
            datePublished: guide.lastUpdated,
            dateModified: guide.lastUpdated,
            author: { '@type': 'Organization', name: 'TerraDron.md' },
            publisher: {
              '@type': 'Organization',
              name: 'TerraDron.md',
              logo: { '@type': 'ImageObject', url: 'https://terradron.ro/opengraph-image' },
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Moldova', href: '/moldova' },
            { label: 'Ghiduri', href: '/moldova/ghid' },
            { label: guide.shortTitle },
          ]}
        />

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium text-xs">
                Republica Moldova
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                  CATEGORY_COLORS[categoryMeta.color] ?? 'bg-gray-100 text-gray-800'
                }`}
              >
                {categoryMeta.label}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {guide.readMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Actualizat {new Date(guide.lastUpdated).toLocaleDateString('ro')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-600">{guide.description}</p>
          </header>

          <div className="prose prose-blue prose-lg max-w-none">{content}</div>
        </article>

        {/* Other Moldova guides */}
        {otherMdGuides.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Alte ghiduri Moldova</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherMdGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/moldova/ghid/${g.slug}`}
                  className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm mb-1">
                    {g.shortTitle}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2">{g.description}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">Cauți un operator de drone în Moldova?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Vezi toți operatorii autorizați ANSA din Republica Moldova.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/moldova/operatori"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              Operatori Moldova <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/moldova/preturi"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Prețuri MDL/ha →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
