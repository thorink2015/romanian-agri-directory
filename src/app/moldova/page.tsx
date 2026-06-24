import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, MapPin, CheckCircle, Sprout, BarChart3, Plane, Leaf,
  Droplets, Eye, Map, Search, Clock,
} from 'lucide-react';
import { getMdOperators } from '@/data/operators';
import { moldovaRegions, MOLDOVA_MACRO_REGIONS } from '@/data/regions-moldova';
import { blogPosts } from '@/data/blog-posts';
import OperatorCard from '@/components/operators/OperatorCard';
import SearchBar from '@/components/search/SearchBar';
import FAQAccordion from '@/components/ui/FAQAccordion';
import NewsletterCTA from '@/components/ui/NewsletterCTA';
import OperatorSignupCTA from '@/components/ui/OperatorSignupCTA';
import OperatorMap from '@/components/map/OperatorMap';
import { getMoldovaMapData } from '@/lib/map-data';

export const metadata: Metadata = {
  title: 'Drone Agricole Moldova | Operatori, Raioane și Prețuri 2026',
  description:
    'Lista completă a operatorilor de drone agricole din Republica Moldova. Acoperire în toate cele 32 de raioane + municipalități + UTA Găgăuzia. Prețuri în MDL.',
  alternates: { canonical: '/moldova' },
  openGraph: {
    title: 'TerraDron: Operatori de Drone Agricole în Republica Moldova',
    description: 'Operatori verificați de drone agricole în toate raioanele din Moldova. Prețuri MDL, subvenții AIPA 50%.',
    url: 'https://terradron.ro/moldova',
  },
};

const mdServices = [
  { icon: Droplets, name: 'Pulverizare', desc: 'Stropit culturi: fungicide, erbicide, insecticide', href: '/moldova/servicii/spraying' },
  { icon: Leaf, name: 'Fertilizare', desc: 'Aplicare îngrășăminte foliare de precizie', href: '/moldova/servicii/spreading' },
  { icon: Map, name: 'Cartografiere', desc: 'Hărți NDVI și ortofotoplanuri', href: '/moldova/servicii/mapping' },
  { icon: Eye, name: 'Monitorizare', desc: 'Supraveghere culturi și identificare boli', href: '/moldova/servicii/monitoring' },
  { icon: Sprout, name: 'Semănat', desc: 'Semănat de precizie cu drona agricolă', href: '/moldova/servicii/seeding' },
  { icon: Plane, name: 'Închiriere', desc: 'Dronă cu sau fără operator inclus', href: '/moldova/servicii/rental' },
];

const mdHowItWorks = [
  {
    icon: Search,
    title: 'Alege raionul',
    desc: 'Selectează raionul în care se află ferma ta și descoperă toți operatorii activi din zonă.',
  },
  {
    icon: BarChart3,
    title: 'Compară operatorii',
    desc: 'Vizualizează profiluri, prețuri MDL/ha, servicii și zone de acoperire pe raioane.',
  },
  {
    icon: CheckCircle,
    title: 'Contactează direct',
    desc: 'Ia legătura cu operatorul ales prin telefon sau email. Fără comisioane, fără intermediari.',
  },
];

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
  const mdPosts = blogPosts.filter((p) => p.country === 'MD');
  const coveredRaioane = moldovaRegions.filter((r) => (mdMap.regions[r.slug]?.count ?? 0) > 0).length;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <MapPin className="w-4 h-4 text-blue-300" />
            Director dedicat Republicii Moldova
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
            Operatori de
            <span className="text-blue-300"> drone agricole</span>
            <br />din Republica Moldova
          </h1>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pulverizare, fertilizare și monitorizare NDVI. Prețuri de la 170 MDL/ha, subvenții AIPA 50%, contact direct cu operatorul.
          </p>

          <SearchBar country="MD" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-blue-300" />
              {mdOps.length}+ operatori verificați
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-300" />
              {coveredRaioane} raioane acoperite
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-blue-300" />
              50K+ ha tratate/an
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${mdOps.length}+`, label: 'Operatori listați', icon: Plane },
              { value: `${coveredRaioane}`, label: 'Raioane acoperite', icon: MapPin },
              { value: '50K+', label: 'Hectare tratate/an', icon: Sprout },
              { value: '~200', label: 'MDL/ha câmp', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="w-6 h-6 text-blue-600 mb-1" />
                <div className="text-3xl font-bold text-blue-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Găsește operatori de drone pe raioane</h2>
              <p className="text-gray-500 mt-1">
                Apasă pe orice raion pentru a vedea operatorii din zonă. Albastru mai închis = mai mulți operatori.
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
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Servicii disponibile</h2>
          <p className="text-gray-500 text-center mb-8">Alege tipul de serviciu de care ai nevoie</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {mdServices.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
                  href={s.href}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <span className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">
                    {s.name}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block leading-tight">{s.desc}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Operatori din Moldova</h2>
              <p className="text-gray-500 mt-1">Verificați și cu experiență dovedită</p>
            </div>
            <Link
              href="/moldova/operatori"
              className="flex items-center gap-1 text-blue-700 font-medium text-sm hover:text-blue-800 transition-colors"
            >
              Toți operatorii <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mdOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        </div>
      </section>

      {/* Market context */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Piața de drone agricole din Moldova</h2>
          <p className="text-gray-500 text-center mb-8">Context, prețuri și subvenții pentru fermierii din Moldova</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6">
            {[
              { value: '50K+', label: 'ha tratate/an' },
              { value: '100K', label: 'ha viticole' },
              { value: '50%', label: 'subvenție AIPA' },
              { value: '200K MDL', label: 'plafon subvenție' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-800">{s.value}</div>
                <div className="text-xs text-blue-600">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
            Moldova are peste 100.000 ha de viticultură și 1,8 mil. ha teren agricol. Programele UNDP și
            EU4Moldova finanțează parțial adoptarea tehnologiei dronelor. Principalele regiuni viticole sunt
            Ștefan Vodă, Cahul și UTA Găgăuzia.
          </p>
        </div>
      </section>

      {/* Raioane grouped by macro region */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Caută după raion</h2>
              <p className="text-gray-500 mt-1">Operatori în toate cele {moldovaRegions.length} raioane și municipalități</p>
            </div>
          </div>

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
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Cum funcționează</h2>
          <p className="text-gray-500 text-center mb-12">Găsești operatorul potrivit în 3 pași simpli</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-blue-200 z-0" />
            {mdHowItWorks.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="relative bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    Pasul {i + 1}
                  </div>
                  <div className="w-14 h-14 bg-blue-50 border-2 border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/moldova/operatori"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
            >
              Caută operatori acum <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterCTA variant="md" />

      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Întrebări frecvente</h2>
          <p className="text-gray-500 text-center mb-8">Tot ce trebuie să știi despre dronele agricole în Moldova</p>
          <FAQAccordion faqs={moldovaFaqs} />
          <div className="text-center mt-6">
            <Link href="/moldova/preturi" className="text-blue-700 font-medium text-sm hover:underline">
              Vezi ghidul complet de prețuri MDL →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      {mdPosts.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Articole despre drone în Moldova</h2>
                <p className="text-gray-500 mt-1">Topuri, ghiduri și noutăți din Republica Moldova</p>
              </div>
              <Link
                href="/moldova/blog"
                className="flex items-center gap-1 text-blue-700 font-medium text-sm hover:text-blue-800 transition-colors"
              >
                Toate articolele <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
          </div>
        </section>
      )}

      {/* CTA */}
      <OperatorSignupCTA country="MD" />
    </>
  );
}
