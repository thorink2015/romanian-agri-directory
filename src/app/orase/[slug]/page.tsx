import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { cities, getCityBySlug } from '@/data/cities';
import { getOperatorsByCounty, getOperatorsByRaion } from '@/data/operators';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  if (!city) return {};

  return {
    title: `Drone Agricole ${city.name} | Operatori și Prețuri 2026`,
    description: `Operatori de drone agricole în ${city.name}, ${city.countyName}. Servicii de pulverizare, fertilizare și monitorizare. Contacte și prețuri directe.`,
    alternates: {
      canonical: `/orase/${params.slug}`,
    },
  };
}

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  // Moldova cities use a "-md" county sentinel and live under /moldova/<raion>
  const isMdCity = city.county.endsWith('-md');
  const raionSlug = city.county.replace(/-md$/, '');
  const countyHref = isMdCity ? `/moldova/${raionSlug}` : `/judete/${city.county}`;
  const ops = isMdCity ? getOperatorsByRaion(raionSlug) : getOperatorsByCounty(city.county);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          isMdCity
            ? { label: 'Moldova', href: '/moldova' }
            : { label: 'Județe', href: '/judete' },
          { label: city.countyName, href: countyHref },
          { label: city.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{city.countyName} • {city.agriculturalRegion}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone agricole în {city.name}
        </h1>
        <p className="text-gray-600 text-lg">{city.description}</p>
      </div>

      {/* City info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="font-bold text-gray-900">{ops.length}</div>
          <div className="text-xs text-gray-500">Operatori în județ</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="font-bold text-gray-900 text-sm">{city.countyName}</div>
          <div className="text-xs text-gray-500">Județ</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="font-bold text-gray-900">{formatPrice(70, 200)}</div>
          <div className="text-xs text-gray-500">Preț pulverizare</div>
        </div>
      </div>

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operatori drone agricole aproape de {city.name}
        </h2>

        {ops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ops.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              Nu avem operatori listați în {city.countyName} momentan
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/operatori" className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">
                Toți operatorii naționali
              </Link>
              <Link href="/adauga-operator" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
                Adaugă-te gratuit
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Links to county and services */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={countyHref}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
        >
          Toate dronele din {city.countyName}
        </Link>
        <Link
          href="/preturi-pulverizare-drona"
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
        >
          Prețuri pulverizare 2026
        </Link>
        <Link
          href="/operatori"
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
        >
          Toți operatorii
        </Link>
      </div>
    </div>
  );
}
