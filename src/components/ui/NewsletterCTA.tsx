'use client';

import { Mail } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface Props {
  variant?: 'ro' | 'md';
}

export default function NewsletterCTA({ variant = 'ro' }: Props) {
  const isMd = variant === 'md';

  const theme = isMd
    ? {
        card: 'from-blue-900 via-blue-900 to-blue-800',
        accent: 'text-blue-300',
        badge: 'border-blue-300/40 text-blue-100',
      }
    : {
        card: 'from-green-900 via-green-900 to-green-800',
        accent: 'text-yellow-400',
        badge: 'border-emerald-300/40 text-emerald-100',
      };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.card} p-8 md:p-12`}>
          {/* dotted texture */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: copy */}
            <div>
              <span className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase border rounded-full px-3 py-1.5 mb-5 ${theme.badge}`}>
                <Mail className="w-3.5 h-3.5" />
                Buletinul săptămânal
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Tank Mix <span className={theme.accent}>de la TerraDron</span>
              </h2>

              <p className="mt-4 text-white/80 leading-relaxed max-w-lg">
                Lectura săptămânală pentru operatorii de drone agricole. Ce s-a schimbat în
                legislație, tarife, vreme și echipamente.{' '}
                <span className="text-white font-medium">Peste 700 de operatori îl citesc.</span>
              </p>
            </div>

            {/* Right: form */}
            <div className="bg-black/25 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-3">Pentru operatori de drone</p>

              <NewsletterForm />

              <p className="text-xs text-white/55 mt-3">
                Un email pe săptămână. Fără spam. Te dezabonezi oricând.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
