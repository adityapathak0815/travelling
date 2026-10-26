import React from 'react';
import { Destination, Currency } from '../types/travel';
import { formatCurrency } from '../utils/travel';
import { ArrowRight, Compass, Calendar, Plane, Sparkles } from 'lucide-react';

interface FeaturedDestinationsProps {
  destinations: Destination[];
  currentCurrency: Currency;
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
}

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  destinations,
  currentCurrency,
  selectedDestination,
  onSelectDestination,
  onPlanTrip,
}) => {
  return (
    <section id="destinations-grid" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-8 mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Curated Sanctuary Portfolio</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Featured Global Expeditions
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Each expedition includes private aircraft connection, field naturalist escort, and hand-selected secluded architectural sanctuaries.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span>Active Currency:</span>
          <span className="font-mono text-amber-300 font-semibold">{currentCurrency.code} ({currentCurrency.symbol})</span>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => {
          const isSelected = selectedDestination?.id === dest.id;
          return (
            <div
              key={dest.id}
              className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-400/80 bg-neutral-900 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900/80'
              }`}
            >
              {/* Card visual backdrop with custom topography aesthetic */}
              <div
                className={`h-48 w-full relative bg-gradient-to-br ${dest.gradient} p-6 flex flex-col justify-between overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-200 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                    {dest.region}
                  </span>
                  {dest.badgeText && (
                    <span className="text-[11px] font-sans font-medium text-amber-200 bg-amber-950/60 backdrop-blur-sm px-2 py-0.5 rounded border border-amber-500/30">
                      {dest.badgeText}
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="text-xs text-neutral-300 font-medium tracking-wide">
                    {dest.country}
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-white tracking-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {dest.tagline}
                  </p>

                  {/* Metadata Row */}
                  <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-neutral-400 pt-4 border-t border-neutral-800/80 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
                      <span className="truncate">{dest.bestSeason}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-amber-400/80" />
                      <span className="truncate">{dest.category}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      Expedition Exclusives
                    </span>
                    {dest.highlights.map((h, i) => (
                      <div key={i} className="flex items-center text-xs text-neutral-300">
                        <Sparkles className="w-3 h-3 text-amber-400 mr-2 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-mono block">
                      From
                    </span>
                    <span className="text-base font-bold text-white font-mono tabular-nums">
                      {formatCurrency(dest.startingPriceUSD, currentCurrency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectDestination(dest)}
                      className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => onPlanTrip(dest)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Inquire
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
