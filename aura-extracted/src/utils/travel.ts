import { Destination, Experience, Currency, PlannerFormData, ValidationResult } from '../types/travel';

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5 },
};

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto & Nara',
    country: 'Japan',
    region: 'Asia & Pacific',
    tagline: 'Centuries of Zen gardens, temple pavilions, and private tea rites',
    bestSeason: 'Mar – May & Oct – Nov',
    climate: 'Temperate Continental',
    startingPriceUSD: 5400,
    category: 'Cultural',
    highlights: ['Arashiyama Private Access', 'Kiyomizu Sunset Tea', 'Nara Sika Reserve'],
    gradient: 'from-amber-900/60 via-stone-900 to-neutral-950',
    badgeText: 'Curated Icon',
  },
  {
    id: 'amalfi',
    name: 'Amalfi & Capri',
    country: 'Italy',
    region: 'Europe & Mediterranean',
    tagline: 'Terraced pastel cliffs, secluded private coves, and vintage coastal sailing',
    bestSeason: 'May – Sep',
    climate: 'Mediterranean Sun',
    startingPriceUSD: 6800,
    category: 'Coastal',
    highlights: ['Positano Private Yacht', 'Ravello Villa Gardens', 'Anacapri Grotto'],
    gradient: 'from-sky-950/70 via-blue-900/40 to-neutral-950',
    badgeText: 'Seasonal Highlight',
  },
  {
    id: 'patagonia',
    name: 'Torres del Paine',
    country: 'Chile',
    region: 'Americas & Polar',
    tagline: 'Granite spires, pristine glacial fjords, and untamed sub-Antarctic wilderness',
    bestSeason: 'Nov – Mar',
    climate: 'Subpolar Oceanic',
    startingPriceUSD: 7900,
    category: 'Expedition',
    highlights: ['Grey Glacier Heli-Trek', 'French Valley Traverse', 'Guanaco Wildlife Tracking'],
    gradient: 'from-teal-950/70 via-cyan-900/30 to-neutral-950',
  },
  {
    id: 'serengeti',
    name: 'Serengeti & Ngorongoro',
    country: 'Tanzania',
    region: 'Africa & Middle East',
    tagline: 'The Great Migration, golden savanna dawn flights, and luxury tented eco-camps',
    bestSeason: 'Jun – Oct & Jan – Feb',
    climate: 'Tropical Savanna',
    startingPriceUSD: 8500,
    category: 'Wildlife',
    highlights: ['Mara River Migration Crossing', 'Hot Air Balloon Sunrise', 'Crater Floor Expedition'],
    gradient: 'from-amber-950/70 via-stone-900 to-neutral-950',
    badgeText: 'Conservation Partner',
  },
  {
    id: 'dolomites',
    name: 'Dolomiti Bellunesi',
    country: 'Italy',
    region: 'Europe & Mediterranean',
    tagline: 'Limestone pinnacles, private high-alpine refugios, and via ferrata passes',
    bestSeason: 'Jun – Oct',
    climate: 'Alpine Continental',
    startingPriceUSD: 4900,
    category: 'Alpine',
    highlights: ['Tre Cime Sunrise Route', 'Cortina Heli-Drop', 'Michelin Alpine Dining'],
    gradient: 'from-stone-800/80 via-neutral-900 to-neutral-950',
  },
  {
    id: 'raja-ampat',
    name: 'Raja Ampat Archipelago',
    country: 'Indonesia',
    region: 'Asia & Pacific',
    tagline: 'The planet’s richest coral reefs, private schooner charter, and limestone islets',
    bestSeason: 'Oct – Apr',
    climate: 'Equatorial Marine',
    startingPriceUSD: 9200,
    category: 'Expedition',
    highlights: ['Wayag Lagoon Islands', 'Bioluminescent Night Dives', 'Manta Ray Sanctuary'],
    gradient: 'from-emerald-950/70 via-teal-900/30 to-neutral-950',
  },
];

export const FEATURED_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Kyoto Imperial Tea & Zen Master Retreat',
    subtitle: 'Private cloister ceremonies closed to public visitors',
    durationDays: 7,
    category: 'Cultural',
    destinationName: 'Kyoto, Japan',
    startingPriceUSD: 5800,
  },
  {
    id: 'exp-2',
    title: 'Patagonia Fjords & Glacial Heli-Trek',
    subtitle: 'High-altitude mountaineering and remote wilderness lodge',
    durationDays: 10,
    category: 'Expedition',
    destinationName: 'Torres del Paine, Chile',
    startingPriceUSD: 8200,
  },
  {
    id: 'exp-3',
    title: 'Amalfi Coastline Riva Vintage Charter',
    subtitle: 'Capri, Positano, and Ischia private maritime navigation',
    durationDays: 8,
    category: 'Coastal',
    destinationName: 'Campania, Italy',
    startingPriceUSD: 7400,
  },
  {
    id: 'exp-4',
    title: 'Serengeti Private Concession Safari',
    subtitle: 'Off-road dawn tracking with veteran naturalists',
    durationDays: 9,
    category: 'Wildlife',
    destinationName: 'Serengeti, Tanzania',
    startingPriceUSD: 9100,
  },
];

export function formatCurrency(amountUSD: number, currency: Currency): string {
  const converted = Math.round(amountUSD * currency.rate);
  if (currency.code === 'JPY') {
    return `${currency.symbol}${converted.toLocaleString()}`;
  }
  return `${currency.symbol}${converted.toLocaleString()}`;
}

export function filterDestinations(
  destinations: Destination[],
  query: string,
  regionFilter: string = 'All',
  categoryFilter: string = 'All'
): Destination[] {
  const sanitized = query.trim().toLowerCase();

  return destinations.filter((dest) => {
    const matchesRegion = regionFilter === 'All' || dest.region === regionFilter;
    const matchesCategory = categoryFilter === 'All' || dest.category === categoryFilter;

    if (!matchesRegion || !matchesCategory) return false;
    if (!sanitized) return true;

    const matchesName = dest.name.toLowerCase().includes(sanitized);
    const matchesCountry = dest.country.toLowerCase().includes(sanitized);
    const matchesTagline = dest.tagline.toLowerCase().includes(sanitized);
    const matchesHighlights = dest.highlights.some((h) => h.toLowerCase().includes(sanitized));

    return matchesName || matchesCountry || matchesTagline || matchesHighlights;
  });
}

export function validatePlannerForm(formData: PlannerFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.destinationId) {
    errors.destinationId = 'Please select a destination.';
  }

  if (!formData.travelers || formData.travelers < 1 || formData.travelers > 20) {
    errors.travelers = 'Traveler party size must be between 1 and 20.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
