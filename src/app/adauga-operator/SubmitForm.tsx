'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { counties } from '@/data/counties';
import { SERVICE_LABELS } from '@/data/types';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'operator_listing',
          _subject: 'Cerere de listare operator nou — TerraDron',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('A apărut o eroare. Vă rugăm trimiteți un email direct la eugen@terradron.ro');
      }
    } catch {
      setError('A apărut o eroare de rețea. Încercați din nou.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Cerere trimisă cu succes!</h3>
        <p className="text-gray-600">
          Am primit informațiile dumneavoastră. Echipa noastră va verifica și va publica profilul în maxim 48 de ore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Denumire companie *
          </label>
          <input
            name="company"
            type="text"
            required
            placeholder="Ex: AgroDrone SRL"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Localitate / Oraș *
          </label>
          <input
            name="city"
            type="text"
            required
            placeholder="Ex: Timișoara"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Județ principal *
        </label>
        <select
          name="county"
          required
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Selectează județul...</option>
          <option value="Moldova">Republica Moldova</option>
          {counties.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Județe acoperite (multiple)
        </label>
        <textarea
          name="counties_covered"
          rows={2}
          placeholder="Ex: Timiș, Arad, Bihor, Caraș-Severin..."
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Servicii oferite *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(SERVICE_LABELS).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name={`service_${key}`}
                value={key}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Tipuri de drone utilizate
        </label>
        <input
          name="drones"
          type="text"
          placeholder="Ex: DJI Agras T50, DJI Agras T25P"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Preț mediu (RON/ha)
          </label>
          <input
            name="price_avg"
            type="text"
            placeholder="Ex: 100 RON/ha"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Website
          </label>
          <input
            name="website"
            type="url"
            placeholder="https://exemplu.ro"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Telefon *
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+40 7XX XXX XXX"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="contact@companie.ro"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Informații suplimentare
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Descriere scurtă, hectare tratate, certificări, etc."
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          'Se trimite...'
        ) : (
          <>
            <Send className="w-4 h-4" />
            Trimite cererea de listare
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Prin trimiterea acestui formular, ești de acord ca informațiile să fie publicate pe platforma TerraDron.ro.
        Listarea este gratuită și permanentă.
      </p>
    </form>
  );
}
