import React, { useState } from 'react';
import { Destination } from '../types/travel';
import { FEATURED_DESTINATIONS } from '../utils/travel';
import { Search, Compass, Calendar, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onSearchClick: () => void;
  onPlanTripClick: () => void;
  onFilterChange: (destId: string, season: string, category: string) => void;
  selectedDestination: Destination | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchClick,
  onPlanTripClick,
  onFilterChange,
  selectedDestination,
}) => {
  const [selectedDestId, setSelectedDestId] = useState(selectedDestination?.id || 'all');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleDiscoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(selectedDestId, selectedSeason, selectedCategory);
    const target = document.getElementById('destinations-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950">
      {/* Editorial Atmospheric Background with Topographic & Aurora Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-amber-600/15 via-amber-800/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-sky-900/10 blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-teal-900/10 blur-3xl opacity-40" />

        {/* Topographic Lines pattern simulation */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Subtle Editorial Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300/90 text-xs font-mono tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Curated Field Expeditions · Season 2026 / 2027</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08] text-balance">
          Where Untamed Silence Meets the Horizon.
        </h1>

        {/* Value Proposition */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
          Bespoke private journeys to Earth’s most evocative landscapes. From high-alpine refugios and Kyoto tea cloisters to private sub-Antarctic glacial charters, every itinerary is tailored by dedicated regional specialists.
        </p>

        {/* Quick Discovery Strip */}
        <div className="pt-6 max-w-4xl mx-auto w-full">
          <form
            onSubmit={handleDiscoverySubmit}
            className="p-2 sm:p-3 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-2 text-left"
          >
            {/* Field 1: Destination */}
            <div className="p-2.5 rounded-xl hover:bg-neutral-800/50 transition-colors">
              <label htmlFor="hero-dest" className="block text-[11px] font-mono uppercase text-neutral-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-400" />
                Destination
              </label>
              <select
                id="hero-dest"
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-neutral-900 text-neutral-200">
                  All Destinations
                </option>
                {FEATURED_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-neutral-900 text-neutral-200">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Season */}
            <div className="p-2.5 rounded-xl hover:bg-neutral-800/50 transition-colors">
              <label htmlFor="hero-season" className="block text-[11px] font-mono uppercase text-neutral-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-amber-400" />
                Departure Period
              </label>
              <select
                id="hero-season"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-neutral-900 text-neutral-200">Any Season</option>
                <option value="Spring" className="bg-neutral-900 text-neutral-200">Spring Blossom</option>
                <option value="Summer" className="bg-neutral-900 text-neutral-200">Mediterranean Summer</option>
                <option value="Autumn" className="bg-neutral-900 text-neutral-200">Alpine Autumn</option>
                <option value="Winter" className="bg-neutral-900 text-neutral-200">Glacial Winter</option>
              </select>
            </div>

            {/* Field 3: Style */}
            <div className="p-2.5 rounded-xl hover:bg-neutral-800/50 transition-colors">
              <label htmlFor="hero-style" className="block text-[11px] font-mono uppercase text-neutral-400 mb-1 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-amber-400" />
                Expedition Style
              </label>
              <select
                id="hero-style"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-neutral-900 text-neutral-200">All Styles</option>
                <option value="Cultural" className="bg-neutral-900 text-neutral-200">Cultural Immersion</option>
                <option value="Expedition" className="bg-neutral-900 text-neutral-200">Wilderness Expedition</option>
                <option value="Coastal" className="bg-neutral-900 text-neutral-200">Private Yacht Coastal</option>
                <option value="Wildlife" className="bg-neutral-900 text-neutral-200">Savanna Wildlife</option>
                <option value="Alpine" className="bg-neutral-900 text-neutral-200">High Alpine Solitude</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="flex items-center p-1">
              <button
                type="submit"
                className="w-full h-full min-h-[46px] flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/10"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Explore Journeys</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust Markers */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Guaranteed Private Air & Sanctuary Permits</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <div>100% Carbon Offset on All Field Logistics</div>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <button
            type="button"
            onClick={onPlanTripClick}
            className="text-amber-300 hover:text-white underline underline-offset-4 transition-colors"
          >
            Request Private Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
