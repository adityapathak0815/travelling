import React, { useState } from 'react';
import { Destination, Region, Currency } from '../types/travel';
import { FEATURED_DESTINATIONS, formatCurrency } from '../utils/travel';
import { Compass, ArrowRight } from 'lucide-react';

interface MegaMenuDestinationsProps {
  currentCurrency: Currency;
  onSelectDestination: (destination: Destination) => void;
  onClose: () => void;
}

const REGIONS: Region[] = [
  'All',
  'Asia & Pacific',
  'Europe & Mediterranean',
  'Americas & Polar',
  'Africa & Middle East',
];

export const MegaMenuDestinations: React.FC<MegaMenuDestinationsProps> = ({
  currentCurrency,
  onSelectDestination,
  onClose,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');

  const filtered = selectedRegion === 'All'
    ? FEATURED_DESTINATIONS
    : FEATURED_DESTINATIONS.filter((d) => d.region === selectedRegion);

  return (
    <div
      role="region"
      aria-label="Destinations navigation menu"
      className="w-full bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 shadow-2xl py-8 px-6 lg:px-12 text-neutral-200"
    >
      <div className="max-w-7xl mx-auto">
        {/* Region selector bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {REGIONS.map((region) => {
              const active = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-neutral-800 text-amber-300 border border-neutral-700/60'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-neutral-400 font-mono tracking-wider">
            Showing {filtered.length} Curated Expeditions
          </span>
        </div>

        {/* Destination Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 3).map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                onSelectDestination(dest);
                onClose();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDestination(dest);
                  onClose();
                }
              }}
              className="group relative rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 hover:border-amber-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="font-medium tracking-wide text-neutral-300">{dest.country}</span>
                  <span className="font-mono text-neutral-500">{dest.category}</span>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-xl font-semibold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                  {dest.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>

                {/* Highlights List */}
                <div className="mt-4 pt-3 border-t border-neutral-800/60 space-y-1">
                  {dest.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center text-[11px] text-neutral-400">
                      <span className="text-amber-400/70 mr-1.5 font-bold">·</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="relative z-10 mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-mono tracking-wider block">
                    Starting from
                  </span>
                  <span className="text-sm font-semibold text-white font-mono tabular-nums">
                    {formatCurrency(dest.startingPriceUSD, currentCurrency)}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-medium group-hover:translate-x-0.5 transition-transform">
                  Explore Details
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info bar */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Private guides, bespoke aircraft transfers, and secluded lodgings included in all bookings.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-600 hover:decoration-white"
          >
            Close menu
          </button>
        </div>
      </div>
    </div>
  );
};
