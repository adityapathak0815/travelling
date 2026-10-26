import React from 'react';
import { Currency } from '../types/travel';
import { formatCurrency, FEATURED_EXPERIENCES } from '../utils/travel';
import { BookOpen, Compass, ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';

interface SecondarySectionsProps {
  currentCurrency: Currency;
  onOpenPlanner: () => void;
}

const JOURNAL_ARTICLES = [
  {
    title: 'The Solitude of Kyoto’s Hidden Temple Gardens at Dawn',
    author: 'Kenji Takahashi · Kyoto Curator',
    readTime: '6 min read',
    excerpt: 'Before monks sweep the gravel courtyards, silence settles over centuries of stone, moss, and distilled intention.',
    date: 'Autumn 2026',
  },
  {
    title: 'Navigating Torres del Paine: Wind, Ice, and Granite Spires',
    author: 'Elena Gomez · Alpine Expedition Lead',
    readTime: '8 min read',
    excerpt: 'Facing the untamed Patagonian climate with customized mountain gear and private high-altitude refugios.',
    date: 'Late Summer 2026',
  },
  {
    title: 'The Great Migration: Aerial Perspectives Over the Mara River',
    author: 'David Omondi · Lead Naturalist',
    readTime: '5 min read',
    excerpt: 'From sunrise hot air balloon traverses to low-impact conservation-first tracking in private concessions.',
    date: 'Summer 2026',
  },
];

export const SecondarySections: React.FC<SecondarySectionsProps> = ({
  currentCurrency,
  onOpenPlanner,
}) => {
  return (
    <div className="space-y-24 pb-16">
      {/* Journeys Section */}
      <section id="journeys" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>Signature Private Charters</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Curated Private Journeys
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Fully customized private itineraries combining private charter flights, private island or chalet buyouts, and personalized field guides.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenPlanner}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            Request Itinerary
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <span className="font-mono text-amber-300">{exp.category}</span>
                  <span className="font-mono text-neutral-400">{exp.durationDays} Days</span>
                </div>
                <h3 className="font-editorial text-lg font-semibold text-white leading-snug">
                  {exp.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-2 line-clamp-3 leading-relaxed">
                  {exp.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-mono block">From</span>
                  <span className="text-sm font-semibold text-white font-mono tabular-nums">
                    {formatCurrency(exp.startingPriceUSD, currentCurrency)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenPlanner}
                  className="text-xs text-amber-300 hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  Inquire
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Field Notes & Curatorial Essays</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Expedition Journal
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Essays, dispatch dispatches, and photographic logs written by our on-site anthropologists, marine biologists, and mountain guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((art, idx) => (
            <article
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-2">
                  <span>{art.date}</span>
                  <span className="mx-2">·</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-editorial text-xl font-semibold text-white leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                <span className="italic">{art.author}</span>
                <span className="text-amber-300 font-medium hover:underline cursor-pointer">Read</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Heritage & Pledge */}
      <section id="heritage" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
              <HeartHandshake className="w-4 h-4" />
              <span>Conservation Pledge & Stewardship</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Travel as Reverence, Not Consumption.
            </h2>
            <p className="text-sm text-neutral-300 mt-4 leading-relaxed font-light">
              Since our founding, 5% of every expedition fee is transferred directly to local wildlife conservancies and indigenous cultural preservation trusts. We limit every journey to private micro-parties to ensure zero impact on delicate ecosystems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Certified B-Corp Travel Partner</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero-Single-Use-Plastic Logistics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="pt-12 border-t border-neutral-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-400 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8">
          <div className="flex items-center gap-2">
            <span className="font-editorial italic font-normal text-amber-300 text-lg">Aura</span>
            <span className="font-sans font-semibold tracking-wider uppercase text-white text-xs">Expeditions</span>
            <span className="text-neutral-600 ml-2">© 2026 Aura Luxury Expeditions Ltd.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#destinations-grid" className="hover:text-white transition-colors">Destinations</a>
            <a href="#journeys" className="hover:text-white transition-colors">Private Charters</a>
            <a href="#journal" className="hover:text-white transition-colors">Field Dispatches</a>
            <a href="#heritage" className="hover:text-white transition-colors">Conservation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
