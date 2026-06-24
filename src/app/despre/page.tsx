import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Shield, Globe, TrendingUp } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { operators } from '@/data/operators';

export const metadata: Metadata = {
  title: { absolute: 'Despre TerraDron.ro | Platforma Operatorilor de Drone Agricole' },
  description:
    'TerraDron.ro este prima platformă completă de operatori de drone agricole din România. Misiunea noastră: conectăm fermierii cu operatorii de drone agricole verificați.',
  alternates: { canonical: '/despre' },
};

export default function DesprePage() {
  const totalHa = operators.reduce((sum, op) => sum + (op.haTreated || 0), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Despre noi' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Despre TerraDron.ro</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p className="text-lg leading-relaxed">
          <strong>TerraDron.ro</strong> este prima platformă completă de operatori de drone agricole din România. Misiunea noastră este simplă: să conectăm fermierii cu operatorii de drone agricole verificați din zona lor, în cel mai rapid mod posibil.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          {[
            { value: `${operators.length}+`, label: 'Operatori listați' },
            { value: '41', label: 'Județe acoperite' },
            { value: `${(totalHa / 1000).toFixed(0)}K+`, label: 'Ha tratate cumulat' },
            { value: '100%', label: 'Listare gratuită' },
          ].map((s) => (
            <div key={s.label} className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-800">{s.value}</div>
              <div className="text-xs text-green-700 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">De ce am construit această platformă?</h2>
        <p className="leading-relaxed">
          Piața de drone agricole din România crește cu peste 40% pe an, dar fermierii nu aveau o resursă centralizată pentru a găsi operatori locali verificați. Întrebând «drone agricole [județ]» pe Google, găseai numai pagini generice sau magazine online, nicio listă a prestatorilor de servicii.
        </p>
        <p className="leading-relaxed">
          Am construit TerraDron.ro pentru a umple acest gol: o platformă structurată, cu profiluri detaliate, prețuri orientative și posibilitatea de a contacta direct operatorul.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {[
            { icon: Target, title: 'Misiunea noastră', desc: 'Conectăm fermierii cu operatori de drone agricole verificați din zona lor.' },
            { icon: Shield, title: 'Calitate verificată', desc: 'Verificăm fiecare operator înainte de publicare: autorizații, servicii, contact.' },
            { icon: Globe, title: 'Acoperire completă', desc: 'România: toate 41 de județe. Moldova: acoperire națională.' },
            { icon: TrendingUp, title: 'Actualizat constant', desc: 'Platforma este actualizată cu noi operatori și prețuri regulat.' },
          ].map((b) => (
            <div key={b.title} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <b.icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{b.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Cum funcționează listarea?</h2>
        <p className="leading-relaxed">
          Listarea pe TerraDron.ro este și va rămâne <strong>complet gratuită</strong> pentru toți operatorii de drone agricole din România. Nu percepem comisioane, nu există versiuni premium ascunse. Putem oferi în viitor opțiuni de promovare suplimentară, dar listarea de bază va fi mereu gratuită.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
          <p className="font-medium text-gray-900 mb-2">Ești operator de drone agricole?</p>
          <p className="text-sm text-gray-600 mb-3">
            Adaugă afacerea ta gratuit și ajunge la mii de fermieri din toată România.
          </p>
          <Link
            href="/adauga-operator"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            Adaugă-te gratuit
          </Link>
        </div>
      </div>
    </div>
  );
}
