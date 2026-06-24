'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Plane, ChevronDown, Send } from 'lucide-react';
import { openLead } from '@/lib/lead';

// ─── Romania nav ─────────────────────────────────────────────────────────────
const roNav = [
  { href: '/operatori', label: 'Operatori' },
  { href: '/judete', label: 'Județe' },
  { href: '/harta', label: 'Hartă' },
  {
    label: 'Culturi & Servicii',
    dropdown: [
      { href: '/culturi', label: 'Culturi tratate', description: 'Grâu, porumb, viță de vie, livezi' },
      { href: '/servicii', label: 'Servicii drone', description: 'Pulverizare, fertilizare, monitorizare' },
      { href: '/drone', label: 'Modele drone', description: 'DJI Agras, XAG, ADT' },
      { href: '/regiuni-viticole', label: 'Regiuni viticole', description: 'Dealu Mare, Murfatlar, Cotnari' },
    ],
  },
  {
    label: 'Resurse',
    dropdown: [
      { href: '/ghid', label: 'Ghiduri', description: 'Legislație AACR, AFIR, licență pilot' },
      { href: '/blog', label: 'Blog', description: 'Topuri, studii de caz, știri RO' },
      { href: '/unelte', label: 'Calculatoare', description: 'Preț, hectare, comparator' },
      { href: '/preturi-pulverizare-drona', label: 'Prețuri RON/ha', description: 'Tarife actualizate 2026' },
    ],
  },
];

// ─── Moldova nav ──────────────────────────────────────────────────────────────
const mdNav = [
  { href: '/moldova/operatori', label: 'Operatori' },
  { href: '/moldova', label: 'Raioane' },
  { href: '/moldova/harta', label: 'Hartă' },
  { href: '/moldova/servicii', label: 'Servicii' },
  {
    label: 'Informații',
    dropdown: [
      { href: '/moldova/ghid', label: 'Ghiduri Moldova', description: 'ANSA, AIPA, cum devii operator' },
      { href: '/moldova/blog', label: 'Blog Moldova', description: 'Topuri și noutăți din Moldova' },
      { href: '/moldova/preturi', label: 'Prețuri MDL/ha', description: 'Tarife în lei moldovenești' },
      { href: '/moldova/unelte', label: 'Calculatoare', description: 'Calculator preț MDL, hectare' },
    ],
  },
];

type NavItem = { href?: string; label: string; dropdown?: { href: string; label: string; description?: string }[] };

export default function Header() {
  const pathname = usePathname();
  const isMd = pathname?.startsWith('/moldova') ?? false;
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const nav: NavItem[] = isMd ? mdNav : roNav;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-sm ${isMd ? 'border-b-2 border-blue-500' : 'border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={isMd ? '/moldova' : '/'} className="flex items-center gap-2 group flex-shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isMd ? 'bg-blue-700' : 'bg-green-700'}`}>
              <Plane className="w-5 h-5 text-white rotate-45" />
            </div>
            <span className={`font-bold text-xl ${isMd ? 'text-blue-900' : 'text-green-900'} group-hover:opacity-80 transition-opacity`}>
              TerraDron
              <span className={isMd ? 'text-blue-700' : 'text-yellow-700'}>
                {isMd ? '.md' : '.ro'}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1">
            {nav.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${isMd ? 'text-blue-700 hover:text-blue-900' : 'text-gray-600 hover:text-green-700'}`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`block p-3 rounded-lg transition-colors ${isMd ? 'hover:bg-blue-50' : 'hover:bg-green-50'}`}
                        >
                          <div className="font-semibold text-sm text-gray-900">{sub.label}</div>
                          {sub.description && (
                            <div className="text-xs text-gray-500 mt-0.5">{sub.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${isMd ? 'text-blue-700 hover:text-blue-900' : 'text-gray-600 hover:text-green-700'}`}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Cross-country switcher */}
            {isMd ? (
              <Link
                href="/"
                className="ml-2 px-3 py-1.5 text-xs font-semibold text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                România
              </Link>
            ) : (
              <Link
                href="/moldova"
                className="ml-1 px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 border-l border-gray-200 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Moldova
              </Link>
            )}

            <button
              onClick={() => openLead({ variant: 'match', country: isMd ? 'MD' : 'RO' })}
              className={`ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 text-white text-sm font-semibold rounded-lg transition-colors ${isMd ? 'bg-blue-700 hover:bg-blue-800' : 'bg-green-700 hover:bg-green-800'}`}
            >
              <Send className="w-3.5 h-3.5" />
              Cere ofertă
            </button>
            <Link
              href="/adauga-operator"
              className={`ml-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg border transition-colors ${isMd ? 'text-blue-700 border-blue-300 hover:bg-blue-50' : 'text-green-700 border-green-300 hover:bg-green-50'}`}
            >
              Adaugă operator
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-green-700"
            onClick={() => setOpen(!open)}
            aria-label="Meniu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {isMd && (
              <div className="mx-3 mt-3 mb-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 font-medium">
                Director Moldova (TerraDron.md)
              </div>
            )}
            <nav className="flex flex-col gap-1 pt-2">
              {nav.map((item) =>
                item.dropdown ? (
                  <details key={item.label} className="group">
                    <summary className={`cursor-pointer px-3 py-2 text-sm font-semibold rounded-lg flex items-center justify-between ${isMd ? 'text-blue-800 hover:bg-blue-50' : 'text-gray-900 hover:bg-green-50'}`}>
                      {item.label}
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="ml-3 mt-1 space-y-0.5">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-3 py-1.5 text-sm rounded-lg ${isMd ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}
                          onClick={() => setOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isMd ? 'text-blue-700 hover:bg-blue-50' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Cross-country link */}
              <div className="border-t border-gray-100 mt-2 pt-3 px-3">
                {isMd ? (
                  <Link href="/" className="flex items-center gap-2 text-sm text-green-700 font-medium" onClick={() => setOpen(false)}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Mergi la TerraDron.ro (România)
                  </Link>
                ) : (
                  <Link href="/moldova" className="flex items-center gap-2 text-sm text-blue-700 font-medium" onClick={() => setOpen(false)}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Moldova (director separat)
                  </Link>
                )}
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  openLead({ variant: 'match', country: isMd ? 'MD' : 'RO' });
                }}
                className={`mt-3 mx-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-lg text-center transition-colors ${isMd ? 'bg-blue-700 hover:bg-blue-800' : 'bg-green-700 hover:bg-green-800'}`}
              >
                <Send className="w-4 h-4" />
                Cere ofertă gratuită
              </button>
              <Link
                href="/adauga-operator"
                className={`mt-2 mx-3 px-4 py-2.5 text-sm font-semibold rounded-lg text-center border transition-colors ${isMd ? 'text-blue-700 border-blue-300 hover:bg-blue-50' : 'text-green-700 border-green-300 hover:bg-green-50'}`}
                onClick={() => setOpen(false)}
              >
                Adaugă operator
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
