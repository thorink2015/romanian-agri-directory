import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Drone Agricole România | Lista Operatorilor Verificați 2026',
  description:
    'Cea mai completă platformă de operatori de drone agricole din România. 20 operatori verificați în 41 județe. Pulverizare, fertilizare, monitorizare NDVI.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'TerraDron.ro: Operatori de Drone Agricole în România',
    description: '23 operatori verificați în toate cele 41 de județe. Prețuri actualizate și contact direct.',
    url: 'https://terradron.ro',
  },
};
import {
  ArrowRight, MapPin, CheckCircle, Sprout, BarChart3, Plane, Leaf,
  Droplets, Eye, Map, Search,
} from 'lucide-react';
import { getFeaturedOperators, operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { pricingFAQs, generalFAQs } from '@/data/faqs';
import OperatorCard from '@/components/operators/OperatorCard';
import CountyCard from '@/components/counties/CountyCard';
import SearchBar from '@/components/search/SearchBar';
import FAQAccordion from '@/components/ui/FAQAccordion';
import HomeSchema from '@/components/schema/HomeSchema';
import NewsletterCTA from '@/components/ui/NewsletterCTA';
import OperatorSignupCTA from '@/components/ui/OperatorSignupCTA';
import OperatorMap from '@/components/map/OperatorMap';
import { getRomaniaMapData } from '@/lib/map-data';

const services = [
  { icon: Droplets, name: 'Pulverizare', desc: 'Stropit culturi: fungicide, erbicide, insecticide', href: '/servicii/spraying' },
  { icon: Leaf, name: 'Fertilizare', desc: 'Aplicare îngrășăminte foliare de precizie', href: '/servicii/spreading' },
  { icon: Map, name: 'Cartografiere', desc: 'Hărți NDVI și ortofotoplanuri', href: '/servicii/mapping' },
  { icon: Eye, name: 'Monitorizare', desc: 'Supraveghere culturi și identificare boli', href: '/servicii/monitoring' },
  { icon: Sprout, name: 'Semănat', desc: 'Semănat de precizie cu drona agricolă', href: '/servicii/seeding' },
  { icon: Plane, name: 'Închiriere', desc: 'Dronă cu sau fără operator inclus', href: '/servicii/rental' },
];

const howItWorks = [
  {
    step: '01',
    icon: Search,
    title: 'Alege județul',
    desc: 'Selectează județul în care se află ferma ta și descoperă toți operatorii activi din zonă.',
  },
  {
    step: '02',
    icon: BarChart3,
    title: 'Compară operatorii',
    desc: 'Vizualizează profiluri, prețuri, servicii și zone de acoperire. Filtrează după cultură sau tip de serviciu.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Contactează direct',
    desc: 'Ia legătura cu operatorul ales prin telefon sau email. Fără comisioane, fără intermediari.',
  },
];

export default function HomePage() {
  const featured = getFeaturedOperators().filter((op) => op.country === 'RO');
  const totalHa = operators.reduce((sum, op) => sum + (op.haTreated || 0), 0);
  const topCounties = counties.slice(0, 12);
  const allFaqs = [...pricingFAQs.slice(0, 2), ...generalFAQs];
  const roMap = getRomaniaMapData();

  return (
    <>
      <HomeSchema />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white overflow-hidden">
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
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            20 operatori verificați în România
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
            Operatori de
            <span className="text-yellow-400"> drone agricole</span>
            <br />din România
          </h1>

          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pulverizare, fertilizare și monitorizare NDVI. Prețuri de la 70 RON/ha, contact direct cu operatorul, fără comisioane.
          </p>

          <SearchBar />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-green-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {operators.length}+ operatori listați
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-400" />
              41 județe acoperite
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-green-400" />
              {(totalHa / 1000).toFixed(0)}K+ ha tratate
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${operators.length}+`, label: 'Operatori listați', icon: Plane },
              { value: '41', label: 'Județe acoperite', icon: MapPin },
              { value: `${(totalHa / 1000).toFixed(0)}K+`, label: 'Hectare tratate', icon: Sprout },
              { value: '~100', label: 'RON/ha câmp', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="w-6 h-6 text-green-600 mb-1" />
                <div className="text-3xl font-bold text-green-800">{stat.value}</div>
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
              <h2 className="text-2xl font-bold text-gray-900">Găsește operatori de drone în județul tău</h2>
              <p className="text-gray-500 mt-1">
                Apasă pe orice județ pentru a vedea operatorii din zonă. Verde mai închis = mai mulți operatori.
              </p>
            </div>
            <Link
              href="/harta"
              className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors"
            >
              Vezi harta completă <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <OperatorMap
            geoUrl="/geo/ro-counties.json"
            regions={roMap.regions}
            operatorsByRegion={roMap.operatorsByRegion}
            accent="green"
            regionWord="județ"
            allOperatorsHref="/operatori"
            country="RO"
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
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
                  href={s.href}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all text-center group"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <span className="font-semibold text-sm text-gray-900 group-hover:text-green-700 transition-colors">
                    {s.name}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block leading-tight">{s.desc}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured operators */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Operatori recomandați</h2>
              <p className="text-gray-500 mt-1">Verificați și cu experiență dovedită</p>
            </div>
            <Link
              href="/operatori"
              className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors"
            >
              Toți operatorii <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        </div>
      </section>

      {/* Crops */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Culturi tratate cu drona</h2>
              <p className="text-gray-500 mt-1">Ghiduri complete pe tip de cultură</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {crops.map((crop) => (
              <Link
                key={crop.slug}
                href={`/culturi/${crop.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl">{crop.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-green-700 text-sm">
                    {crop.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {crop.priceMinRon}–{crop.priceMaxRon} RON/ha
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Counties */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Caută după județ</h2>
              <p className="text-gray-500 mt-1">Operatori în toate cele 41 de județe</p>
            </div>
            <Link
              href="/judete"
              className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors"
            >
              Toate județele <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {topCounties.map((county) => (
              <CountyCard key={county.slug} county={county} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Cum funcționează</h2>
          <p className="text-gray-500 text-center mb-12">Găsești operatorul potrivit în 3 pași simpli</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-green-200 z-0" />

            {howItWorks.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    Pasul {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/operatori"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
            >
              Caută operatori acum <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA variant="ro" />

      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Întrebări frecvente</h2>
          <p className="text-gray-500 text-center mb-8">Tot ce trebuie să știi despre dronele agricole</p>
          <FAQAccordion faqs={allFaqs} />
          <div className="text-center mt-6">
            <Link
              href="/preturi-pulverizare-drona"
              className="text-green-700 font-medium text-sm hover:underline"
            >
              Vezi ghidul complet de prețuri →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <OperatorSignupCTA country="RO" />
    </>
  );
}
