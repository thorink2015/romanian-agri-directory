import { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Contact | TerraDron.ro' },
  description: 'Contactează echipa TerraDron.ro pentru întrebări, sugestii sau adăugarea unui nou operator pe platformă.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact</h1>
      <p className="text-gray-600 mb-8">
        Ai întrebări sau sugestii? Suntem disponibili prin email.
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl">
          <Mail className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Email general</div>
            <a href="mailto:eugen@terradron.ro" className="text-green-700 hover:underline text-sm">
              eugen@terradron.ro
            </a>
          </div>
        </div>

        <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl">
          <MessageSquare className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Adaugă / corectează o listare</div>
            <p className="text-sm text-gray-600 mb-2">
              Dacă ești operator sau dacă ai informații incorecte pe platformă, completează formularul dedicat.
            </p>
            <Link
              href="/adauga-operator"
              className="text-sm text-green-700 font-medium hover:underline"
            >
              Formular adăugare operator →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-2">Timp de răspuns</h2>
        <p className="text-sm text-gray-600">
          Răspundem la emailuri în maxim 48 de ore lucrătoare. Cererile de listare sunt procesate și publicate în același interval de timp.
        </p>
      </div>
    </div>
  );
}
