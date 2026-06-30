import { Operator } from '@/data/types';

interface Props {
  operator: Operator;
}

export default function OperatorSchema({ operator }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: operator.name,
    description: operator.description,
    url: operator.website,
    telephone: operator.phone,
    email: operator.email,
    address: operator.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: operator.address,
          addressLocality: operator.city,
          addressCountry: operator.country,
        }
      : undefined,
    geo: operator.lat && operator.lng
      ? {
          '@type': 'GeoCoordinates',
          latitude: operator.lat,
          longitude: operator.lng,
        }
      : undefined,
    areaServed: (operator.counties.length > 0
      ? operator.counties
      : operator.moldovaRaioane || []
    ).map((c) => ({
      '@type': 'AdministrativeArea',
      name: c,
    })),
    sameAs: [
      operator.website,
      operator.facebook,
      operator.instagram,
      operator.linkedin,
      operator.tiktok,
      operator.youtube,
    ].filter(Boolean),
    priceRange: operator.priceMinRon
      ? `${operator.priceMinRon}–${operator.priceMaxRon || operator.priceMinRon} RON/ha`
      : undefined,
    foundingDate: operator.founded?.toString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
