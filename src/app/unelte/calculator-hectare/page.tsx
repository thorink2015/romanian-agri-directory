import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import HectareCalculator from './HectareCalculator';

export const metadata: Metadata = {
  title: { absolute: 'Calculator suprafață hectare | Conversie ha, acri, m² | TerraDron.ro' },
  description:
    'Calculator online gratuit pentru conversia între hectare, acri, metri pătrați și pogoane. Tool util pentru fermieri români.',
  alternates: { canonical: '/unelte/calculator-hectare' },
};

export default function HectareCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Unelte', href: '/unelte' },
        { label: 'Calculator hectare' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Calculator suprafață hectare
        </h1>
        <p className="text-gray-600">
          Convertor rapid între hectare, acri, metri pătrați, kilometri pătrați și pogoane românești.
          Introdu o valoare și vei vedea toate echivalențele.
        </p>
      </header>

      <HectareCalculator />

      <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-3">Echivalențe standard</h2>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>1 hectar = 10.000 m²</li>
          <li>1 hectar = 2,471 acri</li>
          <li>1 hectar = 0,01 km²</li>
          <li>1 hectar = 2 pogoane românești (1 pogon ≈ 5.000 m²)</li>
          <li>1 hectar = 10 decalitri</li>
        </ul>
      </section>
    </div>
  );
}
