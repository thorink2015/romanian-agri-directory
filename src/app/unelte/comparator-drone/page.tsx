import { Metadata } from 'next';
import Link from 'next/link';
import { droneModels } from '@/data/drone-models';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: { absolute: 'Comparator drone agricole DJI, XAG, ADT 2026 | TerraDron.ro' },
  description:
    'Compară specificațiile dronelor agricole DJI Agras T25P, T50, T100, XAG P100 și ADT Falcon 50P. Preț, capacitate, productivitate.',
  alternates: { canonical: '/unelte/comparator-drone' },
};

export default function DroneComparator() {
  const sorted = [...droneModels].sort((a, b) => (a.priceEurMin || 0) - (b.priceEurMin || 0));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Unelte', href: '/unelte' },
        { label: 'Comparator drone' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Comparator drone agricole 2026
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Compară toate modelele principale de drone agricole disponibile în România și Moldova. Prețurile
          sunt actualizate pentru 2026 și includ estimări pentru configurații standard (cu baterii și încărcător).
        </p>
      </header>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Model</th>
              <th className="text-left p-4 font-semibold text-gray-700">Producător</th>
              <th className="text-right p-4 font-semibold text-gray-700">Rezervor</th>
              <th className="text-right p-4 font-semibold text-gray-700">Productivitate</th>
              <th className="text-right p-4 font-semibold text-gray-700">Preț (EUR)</th>
              <th className="text-center p-4 font-semibold text-gray-700">AFIR</th>
              <th className="text-left p-4 font-semibold text-gray-700">Detalii</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((drone) => (
              <tr key={drone.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">{drone.name}</td>
                <td className="p-4 text-gray-700">{drone.manufacturer}</td>
                <td className="p-4 text-right text-gray-700">{drone.tankCapacityL} L</td>
                <td className="p-4 text-right text-gray-700">{drone.coverageHaPerHour} ha/h</td>
                <td className="p-4 text-right text-gray-900 font-semibold">
                  {drone.priceEurMin && drone.priceEurMax
                    ? `${(drone.priceEurMin / 1000).toFixed(0)}–${(drone.priceEurMax / 1000).toFixed(0)}K`
                    : '—'}
                </td>
                <td className="p-4 text-center">
                  {drone.afirEligible ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                      Da
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">—</span>
                  )}
                </td>
                <td className="p-4">
                  <Link
                    href={`/drone/${drone.slug}`}
                    className="text-green-700 text-sm font-medium hover:underline"
                  >
                    Detalii →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Ferme mici (&lt; 100 ha)</h3>
          <p className="text-sm text-gray-700">
            Recomandăm <Link href="/drone/dji-agras-t25p" className="text-green-700 font-medium hover:underline">DJI Agras T25P</Link>
: cel mai bun raport preț-productivitate.
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Ferme medii (100–500 ha)</h3>
          <p className="text-sm text-gray-700">
            Cel mai popular este <Link href="/drone/dji-agras-t50" className="text-green-700 font-medium hover:underline">DJI Agras T50</Link>
: 90% din operatorii români îl folosesc.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Ferme mari (&gt; 500 ha)</h3>
          <p className="text-sm text-gray-700">
            <Link href="/drone/dji-agras-t100" className="text-green-700 font-medium hover:underline">DJI Agras T100</Link>
: 75L rezervor, 40 ha/h.
          </p>
        </div>
      </section>
    </div>
  );
}
