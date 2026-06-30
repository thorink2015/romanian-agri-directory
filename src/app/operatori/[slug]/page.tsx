import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Globe, MapPin, CheckCircle, Calendar, Plane,
  Clock, Languages, CreditCard, Shield, Award, Zap, Users, ClipboardList,
  GraduationCap, ArrowUpRight,
} from 'lucide-react';
import {
  FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, TiktokIcon,
} from '@/components/ui/SocialIcons';
import { operators, getOperatorBySlug } from '@/data/operators';
import { counties } from '@/data/counties';
import { moldovaRegions } from '@/data/regions-moldova';
import { CROP_NAME_MAP } from '@/data/crops';
import { DRONE_NAME_MAP } from '@/data/drone-models';
import { SERVICE_LABELS } from '@/data/types';
import { formatPrice } from '@/lib/utils';
import { buildOperatorMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorSchema from '@/components/schema/OperatorSchema';
import ExternalLink from '@/components/ui/ExternalLink';
import OperatorContactLinks from '@/components/operators/OperatorContactLinks';
import OperatorQuoteCTA from '@/components/operators/OperatorQuoteCTA';
import OperatorCourses from '@/components/operators/OperatorCourses';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return operators.map((op) => ({ slug: op.slug }));
}

export async function generateMetadata({ params }: Props) {
  const op = getOperatorBySlug(params.slug);
  if (!op) return {};
  return buildOperatorMetadata(op);
}

const LANGUAGE_LABELS: Record<string, string> = {
  ro: 'Română',
  en: 'Engleză',
  hu: 'Maghiară',
  ru: 'Rusă',
  de: 'Germană',
  fr: 'Franceză',
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Numerar',
  transfer: 'Transfer bancar',
  card: 'Card',
  leasing: 'Leasing',
};

export default function OperatorPage({ params }: Props) {
  const operator = getOperatorBySlug(params.slug);
  if (!operator) notFound();

  const coveredCounties = counties.filter((c) => operator.counties.includes(c.slug));
  const coveredRaioane = moldovaRegions.filter((r) =>
    operator.moldovaRaioane?.includes(r.slug)
  );

  return (
    <>
      <OperatorSchema operator={operator} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Operatori', href: '/operatori' },
            { label: operator.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main content ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero / Header card */}
            <div className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-200">
                  <Plane className="w-10 h-10 text-green-700 rotate-45" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{operator.name}</h1>
                    {operator.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                        <CheckCircle className="w-3 h-3" /> Verificat
                      </span>
                    )}
                    {operator.featured && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                        Recomandat
                      </span>
                    )}
                  </div>
                  {operator.tagline && (
                    <p className="text-green-700 font-medium text-sm mb-2">{operator.tagline}</p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {operator.city}
                      {operator.country === 'MD' ? ', Moldova' : ', România'}
                    </span>
                    {operator.founded && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Fondată {operator.founded}
                      </span>
                    )}
                    {operator.coverageRadiusKm && (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        Rază {operator.coverageRadiusKm} km
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{operator.description}</p>

              {/* Quick stats bar */}
              {(operator.haTreated || operator.fleetSize || operator.pilotsCount || operator.clientsCount) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200">
                  {operator.haTreated && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.haTreated.toLocaleString('ro')}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">ha tratate</div>
                    </div>
                  )}
                  {operator.fleetSize && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.fleetSize}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">drone în flotă</div>
                    </div>
                  )}
                  {operator.pilotsCount && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.pilotsCount}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">piloți</div>
                    </div>
                  )}
                  {operator.clientsCount && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.clientsCount}+</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">clienți</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Services */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Servicii oferite</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {operator.services.map((s) => (
                  <Link
                    key={s}
                    href={`/servicii/${s}`}
                    className="px-3 py-2 bg-green-50 text-green-800 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-100 hover:border-green-300 transition-colors text-center"
                  >
                    {SERVICE_LABELS[s]}
                  </Link>
                ))}
              </div>
            </section>

            {/* Courses (training academies) */}
            {operator.courses && operator.courses.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  Cursuri oferite
                </h2>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Apasă pe un curs pentru detalii, durată și cerințe de participare.
                </p>
                <OperatorCourses courses={operator.courses} />
              </section>
            )}

            {/* Crops */}
            {operator.crops.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">Culturi tratate</h2>
                <div className="flex flex-wrap gap-2">
                  {operator.crops.map((c) => (
                    <Link
                      key={c}
                      href={`/culturi/${c}`}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      {CROP_NAME_MAP[c] || c}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Drones */}
            {(operator.drones.length > 0 || (operator.dronesCustom?.length ?? 0) > 0) && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">Drone utilizate</h2>
                <div className="flex flex-wrap gap-2">
                  {operator.drones.map((d) => (
                    <Link
                      key={d}
                      href={`/drone/${d}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Plane className="w-3.5 h-3.5 rotate-45" />
                      {DRONE_NAME_MAP[d] || d}
                    </Link>
                  ))}
                  {operator.dronesCustom?.map((d) => (
                    <span
                      key={d}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-sm font-medium"
                    >
                      <Plane className="w-3.5 h-3.5 rotate-45" />
                      {d}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications + Quality */}
            {(operator.certAACR || operator.certDJI || operator.certXAG || operator.certANSA || operator.iso9001 || operator.gdprCompliant || operator.acceptsAfirFunds) && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Certificări și conformitate
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {operator.certAACR && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Autorizație AACR (Aeronautică Civilă)</span>
                    </div>
                  )}
                  {operator.certDJI && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Partener autorizat DJI</span>
                    </div>
                  )}
                  {operator.certXAG && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Dealer autorizat XAG</span>
                    </div>
                  )}
                  {operator.certANSA && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Certificat ANSA Moldova</span>
                    </div>
                  )}
                  {operator.iso9001 && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Certificare ISO 9001</span>
                    </div>
                  )}
                  {operator.gdprCompliant && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Conform GDPR</span>
                    </div>
                  )}
                  {operator.acceptsAfirFunds && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Acceptă proiecte AFIR</span>
                    </div>
                  )}
                  {operator.emergencyService && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>Intervenție rapidă 24/7</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Coverage — free-text note (e.g. national / European reach) */}
            {operator.coverageNote && coveredCounties.length === 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Zone de acoperire
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">{operator.coverageNote}</p>
              </section>
            )}

            {/* Coverage — Romania counties */}
            {coveredCounties.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">
                  Zone de acoperire ({coveredCounties.length} județe)
                </h2>
                <div className="flex flex-wrap gap-2">
                  {coveredCounties.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/judete/${c.slug}`}
                      className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs border border-gray-200 rounded hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Coverage — Moldova raioane */}
            {coveredRaioane.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">
                  Raioane acoperite în Moldova ({coveredRaioane.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {coveredRaioane.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/moldova/${r.slug}`}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs border border-blue-200 rounded hover:border-blue-400 transition-colors"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Legal info (RO only) */}
            {(operator.cui || operator.regCom) && (
              <section className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h2 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Date legale
                </h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {operator.cui && (
                    <div>
                      <div className="text-xs text-gray-500">CUI</div>
                      <div className="font-mono text-gray-900">{operator.cui}</div>
                    </div>
                  )}
                  {operator.regCom && (
                    <div>
                      <div className="text-xs text-gray-500">Reg. Com.</div>
                      <div className="font-mono text-gray-900">{operator.regCom}</div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* ─── Sidebar ─────────────────────────────────────── */}
          <aside className="space-y-4">
            {/* Request a quote */}
            <OperatorQuoteCTA
              slug={operator.slug}
              name={operator.name}
              displayName={operator.shortName}
              responseTimeHours={operator.responseTimeHours}
              regionName={
                operator.country === 'MD'
                  ? coveredRaioane[0]?.name
                  : coveredCounties[0]?.name
              }
              country={operator.country}
            />

            {/* Price */}
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                Prețuri{operator.priceNote ? '' : ' orientative'}
              </h3>
              {operator.priceNote ? (
                <>
                  <p className="text-sm text-gray-700 leading-relaxed">{operator.priceNote}</p>
                  {operator.priceUrl && (
                    <ExternalLink
                      href={operator.priceUrl}
                      operatorSlug={operator.slug}
                      source="operator_pricing"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                    >
                      Vezi prețurile pe site
                      <ArrowUpRight className="w-4 h-4" />
                    </ExternalLink>
                  )}
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {formatPrice(operator.priceMinRon, operator.priceMaxRon)}
                  </div>
                  {operator.priceMinMdl && (
                    <div className="text-xl font-semibold text-green-600">
                      {formatPrice(operator.priceMinMdl, operator.priceMaxMdl, 'MDL')}
                    </div>
                  )}
                  {!operator.priceMinRon && !operator.priceMinMdl && (
                    <p className="text-sm text-gray-500">Contactați pentru ofertă</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    * Variază în funcție de cultură și suprafață
                  </p>
                </>
              )}
            </div>

            {/* Response time + service details */}
            {(operator.responseTimeHours || operator.languagesSpoken?.length || operator.paymentMethods?.length) && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                {operator.responseTimeHours && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Timp răspuns
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {operator.responseTimeHours < 1
                        ? '< 1 oră'
                        : `~ ${operator.responseTimeHours} ore`}
                    </div>
                  </div>
                )}
                {operator.languagesSpoken && operator.languagesSpoken.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5" /> Limbi vorbite
                    </div>
                    <div className="text-sm text-gray-900">
                      {operator.languagesSpoken.map((l) => LANGUAGE_LABELS[l] || l).join(', ')}
                    </div>
                  </div>
                )}
                {operator.paymentMethods && operator.paymentMethods.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" /> Metode de plată
                    </div>
                    <div className="text-sm text-gray-900">
                      {operator.paymentMethods.map((p) => PAYMENT_LABELS[p] || p).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact */}
            <div id="contact" className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                <Users className="w-4 h-4" /> Contact
              </h3>
              <div className="space-y-2">
                <OperatorContactLinks
                  operatorSlug={operator.slug}
                  phone={operator.phone}
                  email={operator.email}
                />
                {operator.website && (
                  <ExternalLink
                    href={operator.website}
                    operatorSlug={operator.slug}
                    source="operator_profile"
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-green-600" />
                    Website oficial
                  </ExternalLink>
                )}
              </div>

              {/* Social media */}
              {(operator.facebook || operator.instagram || operator.linkedin || operator.youtube || operator.tiktok) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Social media</div>
                  <div className="flex flex-wrap gap-2">
                    {operator.facebook && (
                      <ExternalLink
                        href={operator.facebook}
                        operatorSlug={operator.slug}
                        source="operator_profile_facebook"
                        withUtm={false}
                        className="w-9 h-9 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.instagram && (
                      <ExternalLink
                        href={operator.instagram}
                        operatorSlug={operator.slug}
                        source="operator_profile_instagram"
                        withUtm={false}
                        className="w-9 h-9 bg-pink-50 text-pink-700 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.linkedin && (
                      <ExternalLink
                        href={operator.linkedin}
                        operatorSlug={operator.slug}
                        source="operator_profile_linkedin"
                        withUtm={false}
                        className="w-9 h-9 bg-sky-50 text-sky-700 rounded-lg flex items-center justify-center hover:bg-sky-100 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.youtube && (
                      <ExternalLink
                        href={operator.youtube}
                        operatorSlug={operator.slug}
                        source="operator_profile_youtube"
                        withUtm={false}
                        className="w-9 h-9 bg-red-50 text-red-700 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                        aria-label="YouTube"
                      >
                        <YoutubeIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.tiktok && (
                      <ExternalLink
                        href={operator.tiktok}
                        operatorSlug={operator.slug}
                        source="operator_profile_tiktok"
                        withUtm={false}
                        className="w-9 h-9 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label="TikTok"
                      >
                        <TiktokIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/adauga-operator"
              className="block w-full text-center px-4 py-2.5 border border-green-700 text-green-700 rounded-xl text-sm font-medium hover:bg-green-50 transition-colors"
            >
              Corectează informațiile
            </Link>
            <Link
              href="/ghid/cum-sa-devii-operator"
              className="block w-full text-center px-4 py-2.5 bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-xl text-sm font-medium hover:bg-yellow-100 transition-colors"
            >
              Vrei să devii operator?
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
