import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle } from 'lucide-react';
import { counties, getCountyBySlug } from '@/data/counties';
import { crops, getCropBySlug, CROP_NAME_MAP } from '@/data/crops';
import { getOperatorsByCounty } from '@/data/operators';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string; crop: string };
}

export async function generateStaticParams() {
  return counties.flatMap((county) =>
    crops.map((crop) => ({ slug: county.slug, crop: crop.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountyBySlug(params.slug);
  const crop = getCropBySlug(params.crop);
  if (!county || !crop) return {};

  return {
    title: `Drone ${crop.name} ${county.name} | Pulverizare ${crop.name} cu Drona 2026`,
    description: `Operatori de drone pentru ${crop.name.toLowerCase()} în județul ${county.name}. Prețuri ${formatPrice(crop.priceMinRon, crop.priceMaxRon)}, contactează direct operatorii verificați.`,
    alternates: {
      canonical: `/judete/${params.slug}/culturi/${params.crop}`,
    },
  };
}

export default function CountyCropPage({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  const crop = getCropBySlug(params.crop);
  if (!county || !crop) notFound();

  const allCountyOps = getOperatorsByCounty(county.slug);
  // Operators that treat this crop (or all county operators if no crop filter possible)
  const cropOps = allCountyOps.filter((op) => op.crops.includes(crop.slug));
  const displayOps = cropOps.length > 0 ? cropOps : allCountyOps;

  const monthNames = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const faqs = [
    {
      question: `Cât costă pulverizarea cu drona la ${crop.name.toLowerCase()} în ${county.name}?`,
      answer: `Prețul pentru tratamentele cu drona la ${crop.name.toLowerCase()} în județul ${county.name} este de ${formatPrice(crop.priceMinRon, crop.priceMaxRon)}. Prețul variază în funcție de suprafața totală, distanța față de baza operatorului și tipul produsului fitosanitar utilizat.`,
    },
    {
      question: `Când se aplică tratamentele cu drona la ${crop.name.toLowerCase()}?`,
      answer: `Tratamentele cu drona pentru ${crop.name.toLowerCase()} se aplică în lunile: ${crop.treatmentMonths.map((m) => monthNames[m - 1]).join(', ')}. Calendarul exact depinde de condițiile meteorologice și de presiunea bolilor sau dăunătorilor în fiecare an.`,
    },
    {
      question: `Ce avantaje oferă drona față de utilajele terestre pentru ${crop.name.toLowerCase()}?`,
      answer: `Drona agricolă are mai multe avantaje pentru ${crop.name.toLowerCase()}: nu tasează solul, poate opera pe terenuri umede sau accidentate, asigură acoperire uniformă 100% a culturii și reduce risipa de produse fitosanitare cu 20–30% față de metodele terestre.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Județe', href: '/judete' },
          { label: county.name, href: `/judete/${county.slug}` },
          { label: crop.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{county.region}, România</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone agricole pentru {crop.name.toLowerCase()} în {county.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Tratamente fitosanitare cu drona pentru {crop.name.toLowerCase()} în județul {county.name}.{' '}
          Preț orientativ: <span className="font-semibold text-green-700">{formatPrice(crop.priceMinRon, crop.priceMaxRon)}</span>
        </p>
      </div>

      {/* Crop info card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{crop.icon}</span>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Despre cultura {crop.name.toLowerCase()}</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{crop.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-gray-500">Preț România: </span>
                <span className="font-semibold text-green-700">{formatPrice(crop.priceMinRon, crop.priceMaxRon)}</span>
              </div>
              <div>
                <span className="text-gray-500">Suprafață RO: </span>
                <span className="font-semibold text-gray-900">
                  {crop.haRomania ? `${(crop.haRomania / 1000000).toFixed(1)} mil. ha` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment calendar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Calendar tratamente {crop.name.toLowerCase()}</h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {monthNames.map((month, idx) => {
            const isActive = crop.treatmentMonths.includes(idx + 1);
            return (
              <div
                key={month}
                className={`text-center py-2 rounded-lg text-xs font-medium ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {month}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <CheckCircle className="w-3 h-3 text-green-600 inline mr-1" />
          Lunile marcate cu verde sunt perioadele optime de tratament
        </p>
      </div>

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operatori drone {crop.name.toLowerCase()} în {county.name}
          {cropOps.length === 0 && allCountyOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">(toți operatorii din județ)</span>
          )}
        </h2>

        {displayOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              Nu avem operatori listați în {county.name} momentan
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/operatori"
                className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                Toți operatorii naționali
              </Link>
              <Link
                href="/adauga-operator"
                className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
              >
                Adaugă-te gratuit
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Întrebări frecvente despre drone pentru {crop.name.toLowerCase()} în {county.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Related crops in county */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Alte culturi în {county.name}</h2>
        <div className="flex flex-wrap gap-2">
          {county.mainCrops
            .filter((c) => c !== crop.slug && CROP_NAME_MAP[c])
            .map((c) => (
              <Link
                key={c}
                href={`/judete/${county.slug}/culturi/${c}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {CROP_NAME_MAP[c] || c}
              </Link>
            ))}
          <Link
            href={`/judete/${county.slug}`}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-600"
          >
            ← Înapoi la {county.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
