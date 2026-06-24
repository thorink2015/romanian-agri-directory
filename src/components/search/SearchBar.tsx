'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { counties } from '@/data/counties';
import { moldovaRegions } from '@/data/regions-moldova';

interface Props {
  country?: 'RO' | 'MD';
}

export default function SearchBar({ country = 'RO' }: Props) {
  const [region, setRegion] = useState('');
  const router = useRouter();
  const isMd = country === 'MD';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (region) {
      router.push(isMd ? `/moldova/${region}` : `/judete/${region}`);
    } else {
      router.push(isMd ? '/moldova/operatori' : '/operatori');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <label htmlFor="region-select" className="sr-only">
          {isMd ? 'Alege raionul' : 'Alege județul'}
        </label>
        <select
          id="region-select"
          aria-label={isMd ? 'Alege raionul' : 'Alege județul'}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className={`w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:border-transparent appearance-none cursor-pointer ${
            isMd ? 'focus:ring-blue-500' : 'focus:ring-green-500'
          }`}
        >
          <option value="">{isMd ? 'Alege raionul tău...' : 'Alege județul tău...'}</option>
          <optgroup label={isMd ? 'Republica Moldova' : 'România'}>
            {(isMd ? moldovaRegions : counties).map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <button
        type="submit"
        className={`flex items-center justify-center gap-2 px-6 py-3.5 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap ${
          isMd ? 'bg-blue-700 hover:bg-blue-800' : 'bg-green-700 hover:bg-green-800'
        }`}
      >
        <Search className="w-4 h-4" />
        Găsește operatori
      </button>
    </form>
  );
}
