'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Plane, ChevronDown } from 'lucide-react';
import { counties } from '@/data/counties';
import { moldovaRegions } from '@/data/regions-moldova';

export default function Footer() {
  const pathname = usePathname();
  const isMd = pathname?.startsWith('/moldova') ?? false;
  const [showAll, setShowAll] = useState(false);

  const accent = isMd
    ? {
        bg: 'bg-blue-900',
        border: 'border-blue-800',
        muted: 'text-blue-200',
        highlight: 'text-blue-300',
        hover: 'hover:text-blue-200',
        toggle: 'hover:text-blue-300',
      }
    : {
        bg: 'bg-green-900',
        border: 'border-green-800',
        muted: 'text-green-300',
        highlight: 'text-yellow-400',
        hover: 'hover:text-yellow-300',
        toggle: 'hover:text-yellow-300',
      };

  return (
    <footer className={`${accent.bg} text-white mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Moldova context banner */}
        {isMd && (
          <div className="bg-blue-800/50 border border-blue-700 rounded-xl px-4 py-3 mb-8 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-blue-100">
              Director Drone Agricole, <strong>Republica Moldova</strong> · Prețuri MDL · Subvenții AIPA 50%
            </span>
            <Link href="/" className="text-xs text-blue-300 hover:text-white underline">
              → TerraDron.ro (România)
            </Link>
          </div>
        )}

        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={isMd ? '/moldova' : '/'} className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white rotate-45" />
              </div>
              <span className="font-bold text-lg text-white">
                TerraDron
                <span className={isMd ? 'text-blue-300' : 'text-yellow-400'}>
                  {isMd ? '.md' : '.ro'}
                </span>
              </span>
            </Link>

            <p className={`text-sm ${accent.muted} leading-relaxed max-w-xs`}>
              {isMd
                ? `Directorul operatorilor de drone agricole din Republica Moldova. Acoperire în toate cele ${moldovaRegions.length} raioane și municipalități. Prețuri 170–240 MDL/ha.`
                : 'Directorul operatorilor de drone agricole din România. Peste 20 de operatori verificați în toate cele 41 de județe.'}
            </p>

            <a
              href="mailto:eugen@terradron.ro"
              className={`inline-block mt-3 text-sm ${accent.muted} hover:text-white transition-colors`}
            >
              eugen@terradron.ro
            </a>
          </div>

          {/* Servicii */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Servicii</h3>
            <ul className={`space-y-2 text-sm ${accent.muted}`}>
              {isMd ? (
                <>
                  <li>
                    <Link href="/moldova/servicii" className="hover:text-white transition-colors">
                      Toate serviciile
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/servicii" className="hover:text-white transition-colors">
                      Pulverizare
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/servicii" className="hover:text-white transition-colors">
                      Fertilizare
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/servicii" className="hover:text-white transition-colors">
                      Monitorizare NDVI
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/servicii" className="hover:text-white transition-colors">
                      Cartografiere
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/preturi" className="hover:text-white transition-colors">
                      Prețuri MDL/ha
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/servicii/spraying" className="hover:text-white transition-colors">
                      Pulverizare
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicii/spreading" className="hover:text-white transition-colors">
                      Fertilizare
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicii/monitoring" className="hover:text-white transition-colors">
                      Monitorizare NDVI
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicii/mapping" className="hover:text-white transition-colors">
                      Cartografiere
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicii/training" className="hover:text-white transition-colors">
                      Cursuri piloți
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/preturi-pulverizare-drona"
                      className="hover:text-white transition-colors"
                    >
                      Prețuri RON/ha
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Resurse */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Resurse</h3>
            <ul className={`space-y-2 text-sm ${accent.muted}`}>
              {isMd ? (
                <>
                  <li>
                    <Link href="/moldova/ghid" className="hover:text-white transition-colors">
                      Toate ghidurile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/moldova/ghid/legislatie-ansa-moldova"
                      className="hover:text-white transition-colors"
                    >
                      Legislație ANSA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/moldova/ghid/subventii-moldova-aipa"
                      className="hover:text-white transition-colors"
                    >
                      Subvenții AIPA
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/blog" className="hover:text-white transition-colors">
                      Blog Moldova
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/moldova/unelte/calculator-pret-pulverizare"
                      className="hover:text-white transition-colors"
                    >
                      Calculator preț MDL
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/ghid" className="hover:text-white transition-colors">
                      Toate ghidurile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ghid/legislatie-drone-agricole"
                      className="hover:text-white transition-colors"
                    >
                      Legislație AACR
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ghid/fonduri-afir-drone"
                      className="hover:text-white transition-colors"
                    >
                      Fonduri AFIR
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-white transition-colors">
                      Blog & noutăți
                    </Link>
                  </li>
                  <li>
                    <Link href="/unelte" className="hover:text-white transition-colors">
                      Calculatoare gratuite
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Directory</h3>
            <ul className={`space-y-2 text-sm ${accent.muted}`}>
              {isMd ? (
                <>
                  <li>
                    <Link href="/moldova/operatori" className="hover:text-white transition-colors">
                      Toți operatorii
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova" className="hover:text-white transition-colors">
                      Toate raioanele
                    </Link>
                  </li>
                  <li>
                    <Link href="/moldova/servicii" className="hover:text-white transition-colors">
                      Servicii disponibile
                    </Link>
                  </li>
                  <li>
                    <Link href="/adauga-operator" className="hover:text-white transition-colors">
                      Adaugă operator
                    </Link>
                  </li>
                  <li>
                    <Link href="/despre" className="hover:text-white transition-colors">
                      Despre noi
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/operatori" className="hover:text-white transition-colors">
                      Toți operatorii
                    </Link>
                  </li>
                  <li>
                    <Link href="/judete" className="hover:text-white transition-colors">
                      Toate județele
                    </Link>
                  </li>
                  <li>
                    <Link href="/culturi" className="hover:text-white transition-colors">
                      Toate culturile
                    </Link>
                  </li>
                  <li>
                    <Link href="/drone" className="hover:text-white transition-colors">
                      Modele drone
                    </Link>
                  </li>
                  <li>
                    <Link href="/adauga-operator" className="hover:text-white transition-colors">
                      Adaugă operator
                    </Link>
                  </li>
                  <li>
                    <Link href="/despre" className="hover:text-white transition-colors">
                      Despre noi
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Expandable: counties (RO) or raioane (MD) */}
        <div className={`border-t ${accent.border} pt-6 mb-6`}>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`w-full flex items-center justify-between text-white font-semibold text-sm uppercase tracking-wide mb-3 ${accent.toggle} transition-colors`}
            aria-expanded={showAll}
          >
            <span>
              {isMd
                ? `Toate raioanele din Moldova (${moldovaRegions.length})`
                : `Toate județele din România (${counties.length})`}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>

          {showAll ? (
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1 text-xs ${accent.muted}`}
            >
              {(isMd ? moldovaRegions : counties).map((item) => (
                <Link
                  key={item.slug}
                  href={isMd ? `/moldova/${item.slug}` : `/judete/${item.slug}`}
                  className="hover:text-white transition-colors py-1.5 block"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-1 text-xs ${accent.muted}`}
            >
              {(isMd ? moldovaRegions.slice(0, 10) : counties.slice(0, 12)).map((item) => (
                <Link
                  key={item.slug}
                  href={isMd ? `/moldova/${item.slug}` : `/judete/${item.slug}`}
                  className="hover:text-white transition-colors py-1.5 block"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setShowAll(true)}
                className={`${accent.highlight} ${accent.hover} font-semibold text-left py-1.5`}
              >
                + Vezi toate →
              </button>
            </div>
          )}
        </div>

        {/* Cross-link: Moldova ↔ Romania */}
        <div className={`border-t ${accent.border} pt-5 mb-2`}>
          {isMd ? (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-green-300 hover:text-green-200 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              TerraDron.ro (România)
            </Link>
          ) : (
            <Link
              href="/moldova"
              className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Director separat: Drone Agricole Republica Moldova →
            </Link>
          )}
        </div>

        <div
          className={`border-t ${accent.border} mt-4 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${
            isMd ? 'text-blue-200' : 'text-white'
          }`}
        >
          <p>© 2026 TerraDron.ro. Toate drepturile rezervate.</p>
          <p>
            {isMd
              ? 'Listare gratuită pentru operatori din Moldova'
              : 'Listare gratuită pentru operatori din România'}
          </p>
        </div>
      </div>
    </footer>
  );
}
