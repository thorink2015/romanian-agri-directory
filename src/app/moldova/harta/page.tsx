import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Plane, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorMap from '@/components/map/OperatorMap';
import { getMoldovaMapData } from '@/lib/map-data';
import { moldovaRegions } from '@/data/regions-moldova';
import { getMdOperators } from '@/data/operators';

export const metadata: Metadata = {
  title: { absolute: 'Harta Operatorilor de Drone Agricole din Moldova | TerraDron.ro' },
  description:
    'Hartă interactivă a operatorilor de drone agricole din Republica Moldova. Apasă pe raionul tău și vezi operatorii de pulverizare și fertilizare disponibili.',
  alternates: { canonical: '/moldova/harta' },
  openGraph: {
    title: 'Harta Operatorilor de Drone Agricole din Republica Moldova',
    description: 'Apasă pe raionul tău și descoperă operatorii de drone agricole din zona ta.',
    url: 'https://terradron.ro/moldova/harta',
  },
};

export default function MoldovaHartaPage() {
  const { regions, operatorsByRegion } = getMoldovaMapData();
  const mdCount = getMdOperators().length;
  const coveredRaioane = moldovaRegions.filter((r) => (regions[r.slug]?.count ?? 0) > 0).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Hartă operatori' }]} />

      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Harta operatorilor de drone agricole din Moldova
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
          Apasă pe raionul tău de pe hartă și vezi operatorii de drone agricole din Republica
          Moldova. Cu cât raionul este mai închis la culoare, cu atât sunt mai mulți operatori
          disponibili.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Plane className="w-4 h-4 text-blue-600" />
          <strong className="text-gray-900">{mdCount}</strong> operatori listați
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-blue-600" />
          <strong className="text-gray-900">{coveredRaioane}</strong> raioane acoperite
        </div>
      </div>

      <OperatorMap
        geoUrl="/geo/md-raioane.json"
        regions={regions}
        operatorsByRegion={operatorsByRegion}
        accent="blue"
        regionWord="raion"
        allOperatorsHref="/moldova/operatori"
        country="MD"
      />

      <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-gray-900">Cauți operatori în România?</h2>
          <p className="text-sm text-gray-600 mt-1">
            România are un director separat, cu prețuri în RON și acoperire pe toate cele 41 de
            județe.
          </p>
        </div>
        <Link
          href="/harta"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white text-sm font-semibold rounded-xl hover:bg-green-800 transition-colors"
        >
          Harta România <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
