'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { trackEvent } from '@/components/analytics/events';

interface Props {
  className?: string;
}

export default function NewsletterForm({ className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const formspreeId =
    process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID ||
    process.env.NEXT_PUBLIC_FORMSPREE_ID ||
    '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !formspreeId) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_signup' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        trackEvent('newsletter_signup');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3 ${className}`}>
        <Check className="w-5 h-5 text-emerald-300 flex-shrink-0" />
        <span className="text-sm text-white/90">
          Mulțumim! Verifică emailul pentru confirmare.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-center gap-1.5 bg-white rounded-xl p-1.5 shadow-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresa ta de email"
          required
          aria-label="Adresa ta de email"
          className="flex-1 min-w-0 bg-transparent text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-gray-900 text-white px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-black transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? '...' : 'Abonează-te'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-200 mt-2">A apărut o eroare. Încearcă din nou.</p>
      )}
    </form>
  );
}
