import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts, getBlogPostBySlug, BLOG_CATEGORY_LABELS } from '@/data/blog-posts';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { blogContent } from './content';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | TerraDron.ro Blog` },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const content = blogContent[post.content];
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: { '@type': 'Organization', name: post.author },
            publisher: {
              '@type': 'Organization',
              name: 'TerraDron.ro',
              logo: { '@type': 'ImageObject', url: 'https://terradron.ro/opengraph-image' },
            },
            keywords: post.tags.join(', '),
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title.slice(0, 60) + '...' }]} />

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
              <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full font-medium">
                {BLOG_CATEGORY_LABELS[post.category]}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.publishedAt).toLocaleDateString('ro', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span>de {post.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600">{post.description}</p>
          </header>

          <div className="prose prose-green prose-lg max-w-none">{content}</div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Articole similare</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all"
                >
                  <div className="text-xs text-gray-500 mb-1">{BLOG_CATEGORY_LABELS[r.category]}</div>
                  <div className="font-semibold text-gray-900 group-hover:text-green-700 text-sm line-clamp-2">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">Cauți un operator de drone?</h2>
          <p className="text-sm text-gray-600 mb-4">Descoperă peste 20 de operatori verificați din România.</p>
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
