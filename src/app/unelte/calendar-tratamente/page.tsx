import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: { absolute: 'Calendar tratamente culturi 2026: Când să stropești? | TerraDron.ro' },
  description:
    'Calendar lunar cu tratamentele recomandate pentru grâu, porumb, rapiță, viță de vie, livezi și alte culturi din România.',
  alternates: { canonical: '/unelte/calendar-tratamente' },
};

interface Treatment {
  month: string;
  monthNumber: number;
  crops: { crop: string; treatment: string; urgency: 'low' | 'medium' | 'high' }[];
}

const CALENDAR: Treatment[] = [
  {
    month: 'Ianuarie', monthNumber: 1,
    crops: [
      { crop: 'Livezi', treatment: 'Tratament de iarnă (cupru) contra bolilor de scoarță', urgency: 'low' },
    ],
  },
  {
    month: 'Februarie', monthNumber: 2,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tăieri + tratament cupru', urgency: 'low' },
      { crop: 'Livezi', treatment: 'Stropire prefloralǎ cu cupru', urgency: 'medium' },
    ],
  },
  {
    month: 'Martie', monthNumber: 3,
    crops: [
      { crop: 'Grâu / Orz', treatment: 'Erbicidare de primăvară + fungicid preventiv', urgency: 'high' },
      { crop: 'Rapiță', treatment: 'Tratament contra gândacului lucios', urgency: 'high' },
      { crop: 'Livezi', treatment: 'Stropiri preventive fungice', urgency: 'medium' },
    ],
  },
  {
    month: 'Aprilie', monthNumber: 4,
    crops: [
      { crop: 'Viță de vie', treatment: 'Primul tratament cu cupru + sulf', urgency: 'high' },
      { crop: 'Grâu', treatment: 'Fungicid T1 (fuzarioză, pătarea)', urgency: 'high' },
      { crop: 'Porumb', treatment: 'Semănat + erbicide preemergente', urgency: 'high' },
      { crop: 'Livezi', treatment: 'Tratamente contra păduchelui din San José', urgency: 'medium' },
    ],
  },
  {
    month: 'Mai', monthNumber: 5,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tratamente contra manei + făinării', urgency: 'high' },
      { crop: 'Grâu', treatment: 'Fungicid T2 (protecția spicului)', urgency: 'high' },
      { crop: 'Rapiță', treatment: 'Tratament contra gărgăriței silicvei', urgency: 'high' },
      { crop: 'Floarea-soarelui', treatment: 'Erbicide postemergente', urgency: 'medium' },
    ],
  },
  {
    month: 'Iunie', monthNumber: 6,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tratamente contra manei + făinării (2x)', urgency: 'high' },
      { crop: 'Porumb', treatment: 'Erbicide postemergente + insecticid', urgency: 'high' },
      { crop: 'Livezi', treatment: 'Tratamente contra viermilor din fructe', urgency: 'high' },
    ],
  },
  {
    month: 'Iulie', monthNumber: 7,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tratamente finale preventive', urgency: 'medium' },
      { crop: 'Porumb', treatment: 'Tratament contra sfredelitorului', urgency: 'high' },
      { crop: 'Floarea-soarelui', treatment: 'Fungicid contra phomopsis', urgency: 'medium' },
    ],
  },
  {
    month: 'August', monthNumber: 8,
    crops: [
      { crop: 'Livezi', treatment: 'Tratamente pre-recoltare (cu timp de pauză)', urgency: 'medium' },
      { crop: 'Rapiță', treatment: 'Pregătire teren + semănat', urgency: 'high' },
    ],
  },
  {
    month: 'Septembrie', monthNumber: 9,
    crops: [
      { crop: 'Rapiță', treatment: 'Erbicide preemergente', urgency: 'high' },
      { crop: 'Grâu', treatment: 'Pregătire teren + semănat', urgency: 'high' },
      { crop: 'Viță de vie', treatment: 'Culegere + tratamente pre-iernare', urgency: 'low' },
    ],
  },
  {
    month: 'Octombrie', monthNumber: 10,
    crops: [
      { crop: 'Grâu', treatment: 'Erbicid postemergent', urgency: 'medium' },
      { crop: 'Livezi', treatment: 'Tratament de toamnă (cupru) contra bolilor', urgency: 'medium' },
    ],
  },
  {
    month: 'Noiembrie', monthNumber: 11,
    crops: [
      { crop: 'Livezi', treatment: 'Tratament cupru după căderea frunzelor', urgency: 'medium' },
    ],
  },
  {
    month: 'Decembrie', monthNumber: 12,
    crops: [{ crop: '—', treatment: 'Planificare sezonul următor + revizie echipament', urgency: 'low' }],
  },
];

const URGENCY_STYLE: Record<string, string> = {
  high: 'bg-red-50 border-red-200 text-red-900',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  low: 'bg-blue-50 border-blue-200 text-blue-900',
};

export default function TreatmentCalendarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Unelte', href: '/unelte' },
        { label: 'Calendar tratamente' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Calendar tratamente agricole 2026
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Ghid lunar cu tratamentele recomandate pentru principalele culturi din România. Perioadele exacte
          pot varia în funcție de condițiile meteorologice și de regiune.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CALENDAR.map((month) => (
          <section key={month.monthNumber} className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {month.monthNumber}
              </span>
              {month.month}
            </h2>
            <div className="space-y-2">
              {month.crops.map((c, i) => (
                <div key={i} className={`border rounded-lg p-3 text-sm ${URGENCY_STYLE[c.urgency]}`}>
                  <div className="font-semibold">{c.crop}</div>
                  <div className="text-xs mt-0.5 opacity-90">{c.treatment}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Cauți un operator pentru tratamentele tale?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Programează tratamentele cu operatorii verificați din județul tău.
        </p>
        <a
          href="/operatori"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          Găsește un operator →
        </a>
      </div>
    </div>
  );
}
