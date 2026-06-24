import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PriceCalculator from './PriceCalculator';

export const metadata: Metadata = {
  title: { absolute: 'Calculator preț pulverizare cu drona 2026 | TerraDron.ro' },
  description:
    'Calculează gratuit costul total al pulverizării cu drona agricolă în România. Introdu hectarele, cultura și numărul de tratamente pentru estimare instantanee.',
  alternates: { canonical: '/unelte/calculator-pret-pulverizare' },
};

export default function PriceCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Unelte', href: '/unelte' },
        { label: 'Calculator preț pulverizare' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Calculator preț pulverizare cu drona
        </h1>
        <p className="text-gray-600">
          Estimează costul total al pulverizării cu drona agricolă pentru ferma ta. Prețurile sunt calculate
          pe baza mediilor de piață din 2026.
        </p>
      </header>

      <PriceCalculator />

      <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-3">Cum folosesc acest calculator?</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Selectează cultura pe care vrei să o tratezi</li>
          <li>Introdu suprafața totală în hectare</li>
          <li>Selectează numărul de tratamente planificate pentru sezon</li>
          <li>Obține estimarea costului total și compară cu metodele tradiționale</li>
        </ol>
        <p className="mt-4 text-xs text-gray-500">
          * Prețurile sunt orientative și pot varia în funcție de operator, regiune și condiții specifice.
          Pentru o ofertă reală, contactează direct{' '}
          <a href="/operatori" className="text-green-700 underline">operatorii din județul tău</a>.
        </p>
      </section>
    </div>
  );
}
