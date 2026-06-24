import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { guides, getGuideBySlug, GUIDE_CATEGORIES } from '@/data/guides';

const CATEGORY_COLORS: Record<string, string> = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
};
import Breadcrumb from '@/components/layout/Breadcrumb';
import { guideContent } from './content';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return guides.filter((g) => !g.country || g.country === 'RO').map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide || guide.country === 'MD') return {};
  return {
    title: { absolute: `${guide.title} | TerraDron.ro` },
    description: guide.description,
    alternates: { canonical: `/ghid/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.lastUpdated,
    },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide || guide.country === 'MD') notFound();

  const content = guideContent[guide.slug];
  const otherGuides = guides
    .filter((g) => g.slug !== guide.slug && (!g.country || g.country === 'RO'))
    .slice(0, 3);
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
            author: { '@type': 'Organization', name: 'TerraDron.ro' },
            publisher: {
              '@type': 'Organization',
              name: 'TerraDron.ro',
              logo: { '@type': 'ImageObject', url: 'https://terradron.ro/opengraph-image' },
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Ghiduri', href: '/ghid' }, { label: guide.shortTitle }]} />

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <span className={`px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[categoryMeta.color] || 'bg-gray-100 text-gray-800'}`}>
                {categoryMeta.label}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {guide.readMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Actualizat {new Date(guide.lastUpdated).toLocaleDateString('ro')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-600">{guide.description}</p>
          </header>

          <div className="prose prose-green prose-lg max-w-none">{content}</div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Alte ghiduri utile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/ghid/${g.slug}`}
                className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-2">{g.icon}</div>
                <div className="font-semibold text-gray-900 group-hover:text-green-700 text-sm mb-1">
                  {g.shortTitle}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">{g.description}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">Cauți un operator de drone agricole?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Vezi cei peste 20 de operatori verificați din România.
          </p>
          <Link
            href="/operatori"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            Toți operatorii <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

