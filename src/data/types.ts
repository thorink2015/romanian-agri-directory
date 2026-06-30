export type ServiceType =
  | 'spraying'
  | 'spreading'
  | 'monitoring'
  | 'mapping'
  | 'training'
  | 'rental'
  | 'sales'
  | 'seeding'
  | 'consultancy'
  | 'emergency';

export const SERVICE_LABELS: Record<ServiceType, string> = {
  spraying: 'Pulverizare',
  spreading: 'Fertilizare',
  monitoring: 'Monitorizare',
  mapping: 'Cartografiere',
  training: 'Formare piloți',
  rental: 'Închiriere drone',
  sales: 'Vânzare echipamente',
  seeding: 'Semănat',
  consultancy: 'Consultanță agricolă',
  emergency: 'Intervenție rapidă',
};

/** A training course offered by an operator (e.g. a drone-pilot academy). */
export interface OperatorCourse {
  title: string;
  description: string;
  duration?: string;              // e.g. "4 zile (2 zile teorie + 2 zile practică)"
  requiresPrerequisite?: boolean; // true = needs a prior/base course to enrol
  highlight?: boolean;            // emphasise (e.g. the agriculture specialisation)
}

export interface Operator {
  slug: string;
  name: string;             // Full legal name (used on profile page)
  shortName?: string;       // Short name for listings (max ~18 chars)
  tagline?: string;         // 1-line pitch (max ~60 chars)
  description: string;
  country: 'RO' | 'MD';
  counties: string[];
  moldovaRaioane?: string[]; // Moldova: raion slugs covered
  coverageNote?: string;     // Free-text coverage shown instead of county chips (e.g. national reach)
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  founded?: number;
  services: ServiceType[];
  drones: string[];
  dronesCustom?: string[];   // Free-text drone names not in the agri-drone catalog (non-linked badges)
  courses?: OperatorCourse[]; // Training courses (rendered as an expandable accordion)
  crops: string[];
  priceMinRon?: number;
  priceMaxRon?: number;
  priceNote?: string;        // Off-site pricing: short note shown in the price box
  priceUrl?: string;         // Off-site pricing: link to the operator's pricing page
  priceMinMdl?: number;
  priceMaxMdl?: number;
  haTreated?: number;
  fleetSize?: number;
  pilotsCount?: number;
  clientsCount?: number;
  responseTimeHours?: number;     // Average response time
  coverageRadiusKm?: number;      // Radius from base
  languagesSpoken?: string[];     // ['ro', 'en', 'hu', 'ru']
  paymentMethods?: string[];      // ['cash', 'transfer', 'card', 'leasing']
  acceptsAfirFunds?: boolean;     // Accepts AFIR-funded payments
  emergencyService?: boolean;     // 24/7 emergency service
  certAACR?: boolean;
  certDJI?: boolean;
  certXAG?: boolean;
  certANSA?: boolean;             // Moldova
  iso9001?: boolean;              // Quality certification
  gdprCompliant?: boolean;
  cui?: string;                   // Romanian tax ID
  regCom?: string;                // Registry number
  featured?: boolean;
  verified?: boolean;
  logoUrl?: string;               // Path to logo image
  lat?: number;
  lng?: number;
}

export interface County {
  slug: string;
  name: string;
  nameRo: string;
  region: string;
  lat: number;
  lng: number;
  agriculturalLandHa: number;
  mainCrops: string[];
  vineyardHa?: number;
  orchardHa?: number;
}

export interface MoldovaRegion {
  slug: string;
  name: string;
  region: string;               // North, Center, South, Găgăuzia, Transnistria
  lat: number;
  lng: number;
  agriculturalLandHa?: number;
  vineyardHa?: number;
  orchardHa?: number;
  mainCrops?: string[];
}

export interface Crop {
  slug: string;
  name: string;
  nameRo: string;
  description: string;
  priceMinRon: number;
  priceMaxRon: number;
  treatmentMonths: number[];
  haRomania?: number;
  haMoldova?: number;
  icon: string;
  mainPests?: string[];           // Top pests/diseases (search terms farmers use)
  uvlNormLHa?: string;            // Ultra-low volume norm (e.g. "8-15 L/ha")
  yieldGainPct?: number;          // Estimated yield gain from drone use vs. trampling
}

export interface DroneModel {
  slug: string;
  name: string;
  manufacturer: string;
  tankCapacityL: number;
  coverageHaPerHour: number;
  haPerDay?: number;              // Practical daily coverage (8h operation)
  flowRateLPerMin?: number;       // Max spray flow rate
  workWidthM?: number;            // Spray work width (meters)
  spreadingCapacityKg?: number;   // Granule/seed spreading payload (kg)
  weightKg?: number;              // Empty weight (kg)
  ipRating?: string;              // Ingress protection (IP67 etc.)
  priceEurMin?: number;
  priceEurMax?: number;
  afirEligible?: boolean;
  highlightFeature?: string;      // Key selling point for comparisons
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'top-lists' | 'guide' | 'news' | 'case-study' | 'legislation';
  country?: 'RO' | 'MD';       // defaults to 'RO' if absent
  publishedAt: string;          // ISO date
  updatedAt?: string;
  author: string;
  readMinutes: number;
  tags: string[];
  relatedCounties?: string[];
  relatedCrops?: string[];
  relatedServices?: ServiceType[];
  content: string;              // Markdown
  featuredImage?: string;
}
