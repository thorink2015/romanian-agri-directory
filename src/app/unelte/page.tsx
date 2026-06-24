import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Ruler, Zap, Calendar, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: { absolute: 'Unelte gratuite pentru fermieri și operatori drone | TerraDron.ro' },
  description:
    'Calculatoare gratuite pentru fermieri și operatori drone agricole: calculator preț pulverizare, calculator hectare, comparator drone, calendar tratamente.',
  alternates: { canonical: '/unelte' },
};

const tools = [
  {
    slug: 'calculator-pret-pulverizare',
    name: 'Calculator preț pulverizare',
    description: 'Calculează costul total al pulverizării cu drona pentru ferma ta, în funcție de suprafață și cultură.',
    icon: Calculator,
    color: 'green',
  },
  {
    slug: 'calculator-hectare',
    name: 'Calculator suprafață hectare',
    description: 'Convertor rapid între hectare, acri, metri pătrați și pogoane românești.',
    icon: Ruler,
    color: 'blue',
  },
  {
    slug: 'comparator-drone',
    name: 'Comparator drone agricole',
    description: 'Compară specificațiile dronelor DJI Agras, XAG și ADT: preț, capacitate, productivitate.',
    icon: Zap,
    color: 'yellow',
  },
  {
    slug: 'calendar-tratamente',
    name: 'Calendar tratamente',
    description: 'Calendar lunar cu tratamentele recomandate pentru principalele culturi din România.',
    icon: Calendar,
    color: 'purple',
  },
];

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-100 text-green-700 border-green-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function ToolsHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Unelte' }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Unelte gratuite pentru fermieri și operatori
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Calculatoare și instrumente online gratuite pentru a estima costurile tratamentelor cu drona, a
          compara echipamentele și a planifica sezonul agricol.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/unelte/${tool.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all"
            >
              <div className={`w-14 h-14 ${COLOR_MAP[tool.color]} border rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7" />
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              <span className="text-sm text-green-700 font-medium group-hover:underline">
                Deschide unealta <ArrowRight className="w-4 h-4 inline" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
