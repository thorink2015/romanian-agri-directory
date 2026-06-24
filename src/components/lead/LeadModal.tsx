'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send, CheckCircle, Sparkles } from 'lucide-react';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { trackEvent } from '@/components/analytics/events';
import { LEAD_EVENT, type LeadDetail, type LeadVariant } from '@/lib/lead';

const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_LEAD_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

const SEEN_KEY = 'td_lead_seen';
const SEEN_DAYS = 7;
const AUTO_DELAY_MS = 35000;

function recentlySeen(): boolean {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < SEEN_DAYS * 864e5;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export default function LeadModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<LeadVariant>('match');
  const [operator, setOperator] = useState<{ slug: string; name: string } | null>(null);
  const [presetCounty, setPresetCounty] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const openedRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  const openModal = useCallback((detail: LeadDetail) => {
    setVariant(detail.variant ?? 'match');
    setOperator(detail.operator ?? null);
    setPresetCounty(detail.county ?? (detail.country === 'MD' ? 'Republica Moldova' : ''));
    setStatus('idle');
    setOpen(true);
    openedRef.current = true;
    markSeen();
  }, []);

  // ── Explicit triggers (buttons across the site) ──────────────────────────
  useEffect(() => {
    function onLead(e: Event) {
      openModal((e as CustomEvent<LeadDetail>).detail || {});
    }
    window.addEventListener(LEAD_EVENT, onLead);
    return () => window.removeEventListener(LEAD_EVENT, onLead);
  }, [openModal]);

  // ── Auto triggers: exit intent (desktop) + timed (mobile fallback) ───────
  useEffect(() => {
    // Don't nag on conversion-oriented pages.
    if (pathname?.startsWith('/adauga-operator') || pathname?.startsWith('/contact')) return;
    if (recentlySeen()) return;

    function autoOpen() {
      if (openedRef.current || recentlySeen()) return;
      openModal({ variant: 'match' });
    }

    function onMouseOut(e: MouseEvent) {
      if (e.clientY <= 0 && !e.relatedTarget) autoOpen();
    }

    const timer = window.setTimeout(autoOpen, AUTO_DELAY_MS);
    document.addEventListener('mouseout', onMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [pathname, openModal]);

  // ── Body scroll lock + ESC ───────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const payload = {
      ...data,
      source: variant === 'quote' ? 'operator_quote' : 'lead_match',
      operator_slug: operator?.slug ?? '',
      operator_name: operator?.name ?? '',
    };
    try {
      if (!FORMSPREE_ID) throw new Error('no-form-id');
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad-response');
      setStatus('success');
      trackEvent('lead_submit', {
        lead_type: payload.source,
        operator_slug: operator?.slug ?? '',
      });
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  const isQuote = variant === 'quote';
  const title = isQuote
    ? `Cere o ofertă de la ${operator?.name ?? 'operator'}`
    : 'Ai nevoie de un operator de drone pentru câmpurile tale?';
  const subtitle = isQuote
    ? `Spune-ne suprafața, cultura și județul. ${operator?.name ?? 'Operatorul'} îți răspunde în maxim 24 de ore. Gratuit, fără obligații.`
    : 'Spune-ne județul și cultura. Te punem în legătură cu până la 3 operatori verificați în 24 de ore. Gratuit, fără obligații.';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={close} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={close}
          aria-label="Închide"
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="px-6 py-12 text-center">
            <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cererea a fost trimisă!</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isQuote
                ? `Am transmis cererea ta către ${operator?.name ?? 'operator'}. Vei fi contactat în maxim 24 de ore.`
                : 'Te punem în legătură cu operatorii potriviți din zona ta. Verifică-ți emailul în următoarele 24 de ore.'}
            </p>
            <button
              onClick={close}
              className="mt-6 px-5 py-2.5 bg-green-700 text-white text-sm font-semibold rounded-xl hover:bg-green-800 transition-colors"
            >
              Închide
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {isQuote ? 'Ofertă gratuită' : 'Te conectăm cu operatori'}
            </div>
            <h2 className="text-xl font-bold text-gray-900 pr-6 leading-snug">{title}</h2>
            <p className="text-sm text-gray-600 mt-2 mb-5 leading-relaxed">{subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="email"
                type="email"
                required
                placeholder="Adresa ta de email *"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  name="county"
                  required
                  defaultValue={presetCounty}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Județ *</option>
                  <option value="Republica Moldova">Republica Moldova</option>
                  {counties.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  name="crop"
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Cultură *</option>
                  {crops.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                name="acres"
                type="text"
                inputMode="numeric"
                placeholder="Suprafață (ha) — opțional"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {status === 'error' && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  A apărut o eroare. Scrie-ne direct la{' '}
                  <a href="mailto:eugen@terradron.ro" className="underline font-medium">
                    eugen@terradron.ro
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-700 text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? (
                  'Se trimite...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {isQuote ? 'Trimite cererea de ofertă' : 'Găsește-mi operatori'}
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed">
              {isQuote
                ? 'Datele tale sunt transmise doar operatorului ales. Fără spam.'
                : 'Fără spam. Îți partajăm datele doar cu operatorii cu care te punem în legătură.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
