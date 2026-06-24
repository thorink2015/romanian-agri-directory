import Link from 'next/link';
import { ArrowRight, CheckCircle, Plane } from 'lucide-react';

interface Props {
  country?: 'RO' | 'MD';
}

export default function OperatorSignupCTA({ country = 'RO' }: Props) {
  const isMd = country === 'MD';

  const theme = isMd
    ? {
        card: 'from-blue-900 via-blue-900 to-blue-800 border-blue-800',
        badge: 'bg-blue-500/20 text-blue-100 border-blue-400/30',
        check: 'text-blue-300',
        btn: 'text-blue-800 hover:bg-blue-50',
        accentText: 'text-blue-700',
      }
    : {
        card: 'from-green-900 via-green-900 to-green-800 border-green-800',
        badge: 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30',
        check: 'text-emerald-300',
        btn: 'text-green-800 hover:bg-green-50',
        accentText: 'text-green-700',
      };

  const benefits = [
    'Profil verificat și publicat în 48 de ore',
    'Fără comision și fără costuri ascunse',
    isMd
      ? 'Apari în căutările fermierilor din toată Moldova'
      : 'Apari în căutările fermierilor din județul tău',
  ];

  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${theme.card} p-8 md:p-12`}>
          {/* decorative texture */}
          <div
            className="absolute inset-0 opacity-[0.10] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
            {/* Left: copy + benefits */}
            <div>
              <span className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase border rounded-full px-3 py-1.5 mb-4 ${theme.badge}`}>
                <Plane className="w-3.5 h-3.5 rotate-45" />
                Listare 100% gratuită
              </span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {isMd ? 'Ești operator de drone din Moldova?' : 'Ești operator de drone agricole?'}
              </h2>
              <p className="text-white/75 mt-3 leading-relaxed max-w-lg">
                {isMd
                  ? 'Adaugă afacerea ta în cel mai complet director de drone agricole din Republica Moldova și ajunge la fermierii care caută operatori chiar acum.'
                  : 'Adaugă afacerea ta în cea mai completă platformă de drone agricole din România și ajunge la fermierii care caută operatori chiar acum.'}
              </p>

              <ul className="mt-5 space-y-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${theme.check}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: action card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-sm font-semibold text-gray-900 mb-1">
                Adaugă-te în director
              </div>
              <p className="text-xs text-gray-500 mb-4">Durează aproximativ 3 minute.</p>
              <Link
                href="/adauga-operator"
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 ${
                  isMd ? 'border-blue-700' : 'border-green-700'
                } ${theme.accentText} font-bold rounded-xl hover:bg-gray-50 transition-colors`}
              >
                Adaugă operator <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-gray-400 mt-3">
                Ai deja un profil? Scrie-ne la{' '}
                <a href="mailto:eugen@terradron.ro" className={`underline ${theme.accentText}`}>
                  eugen@terradron.ro
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
