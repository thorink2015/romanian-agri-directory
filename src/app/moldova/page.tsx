import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import { getMdOperators } from '@/data/operators';
import { moldovaRegions, MOLDOVA_MACRO_REGIONS } from '@/data/regions-moldova';
import { blogPosts } from '@/data/blog-posts';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import NewsletterCTA from '@/components/ui/NewsletterCTA';
import OperatorMap from '@/components/map/OperatorMap';
import { getMoldovaMapData } from '@/lib/map-data';

export const metadata: Metadata = {
  title: 'Drone Agricole Moldova | Operatori, Raioane și Prețuri 2026',
  description:
    'Lista completă a operatorilor de drone agricole din Republica Moldova. Acoperire în toate cele 32 de raioane + municipalități + UTA Găgăuzia. Prețuri în MDL.',
  alternates: { canonical: '/moldova' },
};

const moldovaFaqs = [
  {
    question: 'Cât costă pulverizarea cu drona în Moldova?',
    answer:
      'Prețurile pentru pulverizarea cu drona în Republica Moldova sunt de 170–240 MDL/ha (~€8.50–12/ha). Principalul operator, DRON Assistance, practică tarife competitive cu suport din programele UNDP și EU4Moldova.',
  },
  {
    question: 'Există subvenții pentru drone agricole în Moldova?',
    answer:
      'Da. Agenția de Intervenție și Plăți pentru Agricultură (AIPA) oferă subvenții de 50% din costul dronei, plafonate la 200.000 MDL (~€10.000) per beneficiar, în cadrul Programului de subvenționare pentru echipamente de precizie (Anexa 3). Cererile se depun la AIPA Chișinău sau cele 9 birouri regionale.',
  },
  {
    question: 'Care sunt operatorii de drone agricole din Moldova?',
    answer:
      'Principalii operatori din Republica Moldova sunt: DRON Assistance (droneagro.md), liderul pieței cu 16 drone și 14 piloți certificați, susținut de UNDP; BOSAL Solutions, distribuitor autorizat DJI; AgroDron.md; DroneX Moldova. Piața este în creștere rapidă, cu estimativ 50.000+ ha tratate anual.',
  },
  {
    question: 'În câte raioane operează operatorii de drone din Moldova?',
    answer:
      'Republica Moldova are 32 de raioane, 3 municipalități (Chișinău, Bălți, Tighina), UTA Găgăuzia și Stînga Nistrului. DRON Assistance acoperă toate raioanele la nivel național, cu centre regionale în Edineț, Căușeni, Bălți, Comrat și Ungheni.',
  },
];

export default function MoldovaPage() {
  const mdOps = getMdOperators();
  const mdMap = getMoldovaMapData();

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Moldova' }]} />

      {/* Header with distinct Moldova treatment (blue accent) */}
      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full mb-3">
          <MapPin className="w-3.5 h-3.5" />
          Pagină dedicată Republicii Moldova
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Operatori de drone agricole din Republica Moldova
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          {mdOps.length} operatori verificați cu acoperire în toate cele {moldovaRegions.length} raioane,
          municipalități și regiuni autonome. Prețuri 170–240 MDL/ha. Subvenții AIPA 50%.
        </p>
      </header>

      {/* Market stats */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4 text-lg">Piața de drone agricole din Moldova</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-center">
          {[
            { value: '50K+', label: 'ha tratate/an' },
            { value: '100K', label: 'ha viticole' },
            { value: '50%', label: 'subvenție AIPA' },
            { value: '200K MDL', label: 'plafon subvenție' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="text-2xl font-bold text-blue-800">{s.value}</div>
              <div className="text-xs text-blue-600">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Moldova are peste 100.000 ha de viticultură și 1,8 mil. ha teren agricol. Programele UNDP și
          EU4Moldova finanțează parțial adoptarea tehnologiei dronelor. Principalele regiuni viticole sunt
          Ștefan Vodă, Cahul și UTA Găgăuzia.
        </p>
      </section>

      {/* Operators */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Operatori din Moldova</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {mdOps.map((op) => (
            <OperatorCard key={op.slug} operator={op} />
          ))}
        </div>
      </section>

      {/* Interactive map */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-5 gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Găsește operatori pe raioane</h2>
            <p className="text-gray-500 mt-1 text-sm">
              Apasă pe raionul tău pentru a vedea operatorii de drone din zonă.
            </p>
          </div>
          <Link
            href="/moldova/harta"
            className="flex items-center gap-1 text-blue-700 font-medium text-sm hover:text-blue-800 transition-colors"
          >
            Vezi harta completă <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <OperatorMap
          geoUrl="/geo/md-raioane.json"
          regions={mdMap.regions}
          operatorsByRegion={mdMap.operatorsByRegion}
          accent="blue"
          regionWord="raion"
          allOperatorsHref="/moldova/operatori"
          country="MD"
          lazy
        />
      </section>

      {/* Raioane grouped by macro region */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          Raioane din Moldova ({moldovaRegions.length})
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Click pe orice raion pentru a vedea operatorii de drone agricole care acoperă zona.
        </p>

        {MOLDOVA_MACRO_REGIONS.map((macro) => {
          const regionsInMacro = moldovaRegions.filter((r) => r.region === macro);
          if (regionsInMacro.length === 0) return null;
          return (
            <div key={macro} className="mb-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {macro} ({regionsInMacro.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {regionsInMacro.map((region) => (
                  <Link
                    key={region.slug}
                    href={`/moldova/${region.slug}`}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-center group"
                  >
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm">
                      {region.name}
                    </div>
                    {region.vineyardHa && region.vineyardHa >= 3000 && (
                      <div className="text-[10px] text-purple-600 mt-0.5">
                        🍇 {(region.vineyardHa / 1000).toFixed(0)}K ha vii
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Moldova Blog Posts */}
      {(() => {
        const mdPosts = blogPosts.filter((p) => p.country === 'MD');
        if (mdPosts.length === 0) return null;
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Articole despre drone în Moldova</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {mdPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-blue-100 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-2 text-xs text-blue-500 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 rounded-full font-medium uppercase tracking-wide">Moldova</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" /> {post.readMinutes} min
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex-1 mb-3">{post.description}</p>
                  <span className="text-sm text-blue-700 font-medium group-hover:underline">Citește →</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Întrebări frecvente despre drone agricole în Moldova</h2>
        <FAQAccordion faqs={moldovaFaqs} />
      </section>

      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center mb-0">
        <h2 className="font-bold text-gray-900 mb-2">Ești operator de drone din Moldova?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adaugă-te gratuit pe platforma noastră și ajunge la fermieri din toată Moldova.
        </p>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Adaugă-te gratuit <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
    <NewsletterCTA variant="md" />
    </>
  );
}
