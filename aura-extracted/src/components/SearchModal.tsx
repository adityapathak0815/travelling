import React, { useState, useEffect, useRef } from 'react';
import { Destination, Currency } from '../types/travel';
import { FEATURED_DESTINATIONS, filterDestinations, formatCurrency } from '../utils/travel';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  onSelectDestination: (destination: Destination) => void;
}

const POPULAR_TAGS = ['Kyoto', 'Amalfi Coast', 'Patagonia', 'Serengeti', 'Dolomites', 'Raja Ampat'];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  onSelectDestination,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = filterDestinations(FEATURED_DESTINATIONS, query);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input Field */}
        <div className="flex items-center px-6 py-4 border-b border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            id="search-modal-title"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, countries, or travel styles (e.g., Japan, Safari, Glaciers)..."
            className="w-full bg-transparent text-base text-white placeholder-neutral-500 focus:outline-none"
            aria-label="Search travel destinations"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white border border-neutral-700/60 rounded-md transition-colors shrink-0"
            aria-label="Close search dialog"
          >
            Esc
          </button>
        </div>

        {/* Quick Recommendation Tags */}
        <div className="px-6 py-3 bg-neutral-950/40 border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-500 shrink-0 font-mono">Popular:</span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded bg-neutral-800/60 text-neutral-300 hover:text-amber-200 hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <MapPin className="w-8 h-8 text-neutral-600 mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm">No destinations found matching &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching for &lsquo;Japan&rsquo;, &lsquo;Italy&rsquo;, &lsquo;Expedition&rsquo;, or &lsquo;Coastal&rsquo;.
              </p>
            </div>
          ) : (
            results.map((dest) => (
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
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-neutral-800/80 bg-neutral-950/40 hover:bg-neutral-800/50 hover:border-neutral-700 transition-all cursor-pointer gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="font-medium text-amber-300">{dest.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dest.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-neutral-500">{dest.category}</span>
                  </div>
                  <h4 className="font-editorial text-lg font-semibold text-white group-hover:text-amber-200 transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-1">{dest.tagline}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800/60">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase text-neutral-500 font-mono block">From</span>
                    <span className="text-sm font-semibold text-white font-mono tabular-nums">
                      {formatCurrency(dest.startingPriceUSD, currentCurrency)}
                    </span>
                  </div>
                  <span className="inline-flex items-center text-xs text-neutral-300 group-hover:text-amber-300 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Select an expedition or press Esc to return</span>
          <span className="font-mono">{results.length} available</span>
        </div>
      </div>
    </div>
  );
};
