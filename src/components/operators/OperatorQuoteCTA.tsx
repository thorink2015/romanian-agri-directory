'use client';

import { Send } from 'lucide-react';
import { openLead } from '@/lib/lead';

interface Props {
  slug: string;
  name: string;
  /** Short display name for the button/heading */
  displayName?: string;
  responseTimeHours?: number;
  /** Region used for the "compare" line + form preselect */
  regionName?: string;
  country?: 'RO' | 'MD';
}

export default function OperatorQuoteCTA({
  slug,
  name,
  displayName,
  responseTimeHours,
  regionName,
  country = 'RO',
}: Props) {
  const short = displayName || name;
  const responseText =
    responseTimeHours && responseTimeHours < 1
      ? 'în mai puțin de o oră'
      : `în maxim ${responseTimeHours ?? 24} de ore`;
  const compareRegion = regionName || (country === 'MD' ? 'Moldova' : 'zona ta');

  return (
    <div className="bg-green-700 text-white rounded-xl p-5 shadow-sm">
      <h3 className="font-bold text-lg leading-snug">Cere o ofertă de la {short}</h3>
      <p className="text-sm text-green-50 mt-1.5 leading-relaxed">
        Trimite-ne câmpurile, cultura și suprafața. {short} îți răspunde {responseText}. Gratuit,
        fără obligații.
      </p>

      <button
        onClick={() => openLead({ variant: 'quote', operator: { slug, name }, county: regionName, country })}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-green-800 font-bold text-sm rounded-lg hover:bg-green-50 transition-colors"
      >
        <Send className="w-4 h-4" />
        Cere o ofertă
      </button>

      <p className="text-xs text-green-100/90 mt-3 leading-relaxed">
        Vrei să compari? Poți cere oferte și de la alți operatori verificați din {compareRegion}.{' '}
        <button
          onClick={() => openLead({ variant: 'match', county: regionName, country })}
          className="underline font-medium hover:text-white"
        >
          Compară oferte
        </button>
      </p>
    </div>
  );
}
