import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Plane, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorMap from '@/components/map/OperatorMap';
import { getRomaniaMapData } from '@/lib/map-data';
import { counties } from '@/data/counties';
import { getRoOperators } from '@/data/operators';

export const metadata: Metadata = {
  title: { absolute: 'Harta Operatorilor de Drone Agricole din România | TerraDron.ro' },
  description:
    'Hartă interactivă a operatorilor de drone agricole din România. Apasă pe județul tău și vezi operatorii verificați de pulverizare, fertilizare și monitorizare din zonă.',
  alternates: { canonical: '/harta' },
  openGraph: {
    title: 'Harta Operatorilor de Drone Agricole din România',
    description: 'Apasă pe județul tău și descoperă operatorii de drone agricole din zona ta.',
    url: 'https://terradron.ro/harta',
  },
};

export default function HartaPage() {
  const { regions, operatorsByRegion } = getRomaniaMapData();
  const roCount = getRoOperators().length;
  const coveredCounties = counties.filter((c) => (regions[c.slug]?.count ?? 0) > 0).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Hartă operatori' }]} />

      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Harta operatorilor de drone agricole din România
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
          Apasă pe județul tău de pe hartă și vezi toți operatorii verificați de drone agricole din
          zonă. Cu cât județul este mai închis la culoare, cu atât sunt mai mulți operatori
          disponibili.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Plane className="w-4 h-4 text-green-600" />
          <strong className="text-gray-900">{roCount}</strong> operatori listați
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-green-600" />
          <strong className="text-gray-900">{coveredCounties}</strong> județe acoperite
        </div>
      </div>

      <OperatorMap
        geoUrl="/geo/ro-counties.json"
        regions={regions}
        operatorsByRegion={operatorsByRegion}
        accent="green"
        regionWord="județ"
        allOperatorsHref="/operatori"
        country="RO"
      />

      {/* Cross-link to Moldova */}
      <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-gray-900">Cauți operatori în Republica Moldova?</h2>
          <p className="text-sm text-gray-600 mt-1">
            Moldova are un director separat, cu prețuri în MDL și acoperire pe raioane.
          </p>
        </div>
        <Link
          href="/moldova/harta"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors"
        >
          Harta Moldova <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
