'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MapPin, Plane, ArrowRight, Send } from 'lucide-react';
import { openLead } from '@/lib/lead';

interface GeoRegion {
  slug: string;
  name: string;
  d: string;
  cx: number;
  cy: number;
}
interface GeoData {
  viewBox: string;
  width: number;
  height: number;
  regions: GeoRegion[];
}

export interface MapRegionInfo {
  name: string;
  count: number;
  href: string;
}
export interface MapOperator {
  slug: string;
  name: string;
  city: string;
}

interface Props {
  geoUrl: string;
  regions: Record<string, MapRegionInfo>;
  operatorsByRegion: Record<string, MapOperator[]>;
  accent?: 'green' | 'blue';
  regionWord?: string; // "județ" | "raion"
  allOperatorsHref: string;
  country?: 'RO' | 'MD';
  /** Defer fetching geometry until the map scrolls into view (homepage) */
  lazy?: boolean;
}

const SCALES = {
  green: [
    { max: 0, fill: '#eef2f6', label: '0' },
    { max: 2, fill: '#bbf7d0', label: '1–2' },
    { max: 4, fill: '#4ade80', label: '3–4' },
    { max: 6, fill: '#16a34a', label: '5–6' },
    { max: Infinity, fill: '#14532d', label: '7+' },
  ],
  blue: [
    { max: 0, fill: '#eef2f6', label: '0' },
    { max: 2, fill: '#bfdbfe', label: '1–2' },
    { max: 4, fill: '#60a5fa', label: '3–4' },
    { max: 6, fill: '#2563eb', label: '5–6' },
    { max: Infinity, fill: '#1e3a8a', label: '7+' },
  ],
};

export default function OperatorMap({
  geoUrl,
  regions,
  operatorsByRegion,
  accent = 'green',
  regionWord = 'județ',
  allOperatorsHref,
  country = 'RO',
  lazy = false,
}: Props) {
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  const scale = SCALES[accent];
  const accentText = accent === 'blue' ? 'text-blue-700' : 'text-green-700';
  const accentBtn = accent === 'blue' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-green-700 hover:bg-green-800';

  function bucketIndex(count: number) {
    return scale.findIndex((b) => count <= b.max);
  }
  function fillFor(slug: string) {
    const count = regions[slug]?.count ?? 0;
    return scale[bucketIndex(count)].fill;
  }

  // Lazy: load geometry only when scrolled into view
  useEffect(() => {
    if (!lazy || shouldLoad) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    let active = true;
    fetch(geoUrl)
      .then((r) => {
        if (!r.ok) throw new Error('geo');
        return r.json();
      })
      .then((d: GeoData) => active && setGeo(d))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [geoUrl, shouldLoad]);

  const selectedInfo = selected ? regions[selected] : null;
  const selectedOps = selected ? operatorsByRegion[selected] ?? [] : [];
  const hoveredInfo = hovered ? regions[hovered] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2">
        <div
          ref={containerRef}
          className="relative bg-white border border-gray-200 rounded-2xl p-3 sm:p-5"
          onMouseLeave={() => {
            setHovered(null);
            setTip(null);
          }}
        >
          {!geo && !failed && (
            <div className="aspect-[4/3] flex items-center justify-center text-gray-400 text-sm">
              Se încarcă harta…
            </div>
          )}

          {failed && (
            <div className="aspect-[4/3] flex flex-col items-center justify-center text-center gap-3 px-6">
              <p className="text-sm text-gray-500">Harta nu a putut fi încărcată.</p>
              <Link href={allOperatorsHref} className={`text-sm font-semibold ${accentText} hover:underline`}>
                Vezi lista operatorilor →
              </Link>
            </div>
          )}

          {geo && (
            <svg
              viewBox={geo.viewBox}
              className="w-full h-auto"
              role="img"
              aria-label={`Harta operatorilor de drone pe ${regionWord}`}
              onMouseMove={(e) => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              {geo.regions.map((r) => {
                const info = regions[r.slug];
                const isActive = hovered === r.slug || selected === r.slug;
                const count = info?.count ?? 0;
                return (
                  <path
                    key={r.slug + r.cx}
                    d={r.d}
                    fill={fillFor(r.slug)}
                    stroke={isActive ? (accent === 'blue' ? '#1e3a8a' : '#14532d') : '#ffffff'}
                    strokeWidth={isActive ? 1.6 : 0.6}
                    className="cursor-pointer transition-[stroke,opacity] duration-150"
                    style={{ opacity: hovered && hovered !== r.slug ? 0.85 : 1 }}
                    onMouseEnter={() => setHovered(r.slug)}
                    onClick={() => setSelected(r.slug)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${info?.name ?? r.name}: ${count} operatori`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelected(r.slug);
                      }
                    }}
                  />
                );
              })}

              {/* Count labels for covered regions */}
              {geo.regions.map((r) => {
                const count = regions[r.slug]?.count ?? 0;
                if (count <= 0) return null;
                const dark = bucketIndex(count) >= 3;
                return (
                  <text
                    key={'t' + r.slug + r.cx}
                    x={r.cx}
                    y={r.cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none select-none"
                    style={{ fontSize: 11, fontWeight: 700, fill: dark ? '#ffffff' : '#1f2937' }}
                  >
                    {count}
                  </text>
                );
              })}
            </svg>
          )}

          {/* Tooltip */}
          {geo && hoveredInfo && tip && (
            <div
              className="pointer-events-none absolute z-10 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap -translate-x-1/2 -translate-y-full"
              style={{ left: tip.x, top: tip.y - 10 }}
            >
              {hoveredInfo.name} · {hoveredInfo.count} operatori
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 px-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Operatori per {regionWord}
          </span>
          {scale.map((b) => (
            <span key={b.label} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-4 h-4 rounded border border-gray-200" style={{ background: b.fill }} />
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Side panel */}
      <div className="lg:col-span-1">
        {selectedInfo ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 lg:sticky lg:top-20">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">{regionWord}</div>
                <h3 className="text-lg font-bold text-gray-900">{selectedInfo.name}</h3>
              </div>
              <span className={`text-sm font-bold ${accentText}`}>
                {selectedInfo.count} operatori
              </span>
            </div>

            {selectedOps.length > 0 ? (
              <ul className="mt-4 space-y-1.5 max-h-72 overflow-y-auto">
                {selectedOps.map((op) => (
                  <li key={op.slug}>
                    <Link
                      href={`/operatori/${op.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Plane className="w-3.5 h-3.5 text-green-700 rotate-45" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-gray-900 truncate group-hover:text-green-700">
                          {op.name}
                        </span>
                        <span className="block text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {op.city}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                Niciun operator listat încă aici. Cere o ofertă și găsim noi operatorii potriviți.
              </p>
            )}

            <button
              onClick={() => openLead({ variant: 'match', county: selectedInfo.name, country })}
              className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors ${accentBtn}`}
            >
              <Send className="w-4 h-4" />
              Cere ofertă în {selectedInfo.name}
            </button>
            <Link
              href={selectedInfo.href}
              className={`mt-2 w-full inline-flex items-center justify-center gap-1 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
                accent === 'blue'
                  ? 'text-blue-700 border-blue-200 hover:bg-blue-50'
                  : 'text-green-700 border-green-200 hover:bg-green-50'
              }`}
            >
              Vezi pagina {regionWord}ului <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-6 text-center lg:sticky lg:top-20">
            <MapPin className={`w-8 h-8 mx-auto mb-3 ${accentText}`} />
            <p className="text-sm text-gray-600 font-medium">
              Apasă pe un {regionWord} de pe hartă
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Vezi operatorii de drone agricole din zona ta și cere o ofertă gratuită.
            </p>
            <Link
              href={allOperatorsHref}
              className={`inline-flex items-center gap-1 mt-4 text-sm font-semibold ${accentText} hover:underline`}
            >
              Sau vezi toți operatorii <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
