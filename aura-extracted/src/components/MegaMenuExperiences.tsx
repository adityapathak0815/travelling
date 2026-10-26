import React, { useState } from 'react';
import { Experience, ExperienceCategory, Currency } from '../types/travel';
import { FEATURED_EXPERIENCES, formatCurrency } from '../utils/travel';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuExperiencesProps {
  currentCurrency: Currency;
  onSelectExperience: (experience: Experience) => void;
  onClose: () => void;
}

const CATEGORIES: ExperienceCategory[] = [
  'All',
  'Cultural',
  'Expedition',
  'Coastal',
  'Wildlife',
];

export const MegaMenuExperiences: React.FC<MegaMenuExperiencesProps> = ({
  currentCurrency,
  onSelectExperience,
  onClose,
}) => {
  const [selectedCat, setSelectedCat] = useState<ExperienceCategory>('All');

  const filtered = selectedCat === 'All'
    ? FEATURED_EXPERIENCES
    : FEATURED_EXPERIENCES.filter((e) => e.category === selectedCat);

  return (
    <div
      role="region"
      aria-label="Experiences navigation menu"
      className="w-full bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 shadow-2xl py-8 px-6 lg:px-12 text-neutral-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-neutral-800 text-amber-300 border border-neutral-700/60'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-neutral-400 font-mono tracking-wider">
            Signature Travel Collections
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              onClick={() => {
                onSelectExperience(exp);
                onClose();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectExperience(exp);
                  onClose();
                }
              }}
              className="group relative rounded-xl border border-neutral-800 bg-neutral-950/70 p-5 hover:border-amber-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="text-amber-400/90 font-mono">{exp.category}</span>
                  <span className="font-mono text-neutral-500">{exp.durationDays} Days</span>
                </div>

                <h4 className="font-editorial text-base font-semibold text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {exp.title}
                </h4>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                  {exp.subtitle}
                </p>

                <div className="text-[11px] text-neutral-500 font-mono mt-3">
                  Location: {exp.destinationName}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 font-mono block">From</span>
                  <span className="text-sm font-semibold text-white font-mono tabular-nums">
                    {formatCurrency(exp.startingPriceUSD, currentCurrency)}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-medium group-hover:translate-x-0.5 transition-transform">
                  View
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Every journey is paired with a dedicated travel concierge and 24/7 field logistics.</span>
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
