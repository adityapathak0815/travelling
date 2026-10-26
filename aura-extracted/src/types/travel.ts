export type Region = 'All' | 'Asia & Pacific' | 'Europe & Mediterranean' | 'Americas & Polar' | 'Africa & Middle East';

export type ExperienceCategory = 'All' | 'Cultural' | 'Expedition' | 'Coastal' | 'Alpine' | 'Wildlife';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: Exclude<Region, 'All'>;
  tagline: string;
  bestSeason: string;
  climate: string;
  startingPriceUSD: number;
  category: Exclude<ExperienceCategory, 'All'>;
  highlights: string[];
  gradient: string;
  badgeText?: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  durationDays: number;
  category: Exclude<ExperienceCategory, 'All'>;
  destinationName: string;
  startingPriceUSD: number;
}

export interface Currency {
  code: 'USD' | 'EUR' | 'GBP' | 'JPY';
  symbol: string;
  rate: number;
}

export interface PlannerFormData {
  name: string;
  email: string;
  destinationId: string;
  travelStyle: string;
  travelers: number;
  season: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
