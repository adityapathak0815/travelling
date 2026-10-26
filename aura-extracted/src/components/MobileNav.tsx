import React, { useState, useEffect } from 'react';
import { Destination, Experience, Currency } from '../types/travel';
import { FEATURED_DESTINATIONS, FEATURED_EXPERIENCES, formatCurrency } from '../utils/travel';
import { CurrencySelector } from './CurrencySelector';
import { X, Search, ChevronDown, ArrowRight, Compass, Sparkles } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  onOpenSearch: () => void;
  onOpenPlanner: () => void;
  onSelectDestination: (destination: Destination) => void;
  onSelectExperience: (experience: Experience) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  onSelectCurrency,
  onOpenSearch,
  onOpenPlanner,
  onSelectDestination,
  onSelectExperience,
}) => {
  const [destExpanded, setDestExpanded] = useState(false);
  const [expExpanded, setExpExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setDestExpanded(false);
      setExpExpanded(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
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
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-sm h-full bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 p-6 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with brand & close */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
            <span className="font-editorial text-lg font-bold tracking-tight text-white">
              Aura Expeditions
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors text-xs"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search expeditions & stays...</span>
              </span>
              <kbd className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Links Accordion */}
          <nav className="mt-6 space-y-1">
            {/* Destinations Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setDestExpanded(!destExpanded)}
                aria-expanded={destExpanded}
                className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors min-h-[44px]"
              >
                <span className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Destinations
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    destExpanded ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {destExpanded && (
                <div className="pl-6 pr-2 py-2 space-y-2 border-l border-neutral-800 ml-4 my-1">
                  {FEATURED_DESTINATIONS.map((dest) => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => {
                        onSelectDestination(dest);
                        onClose();
                      }}
                      className="w-full text-left py-2 px-2 rounded hover:bg-neutral-900/60 transition-colors flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="text-neutral-200 font-medium">{dest.name}</div>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          From {formatCurrency(dest.startingPriceUSD, currentCurrency)}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Experiences Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setExpExpanded(!expExpanded)}
                aria-expanded={expExpanded}
                className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors min-h-[44px]"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Experiences
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    expExpanded ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {expExpanded && (
                <div className="pl-6 pr-2 py-2 space-y-2 border-l border-neutral-800 ml-4 my-1">
                  {FEATURED_EXPERIENCES.map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => {
                        onSelectExperience(exp);
                        onClose();
                      }}
                      className="w-full text-left py-2 px-2 rounded hover:bg-neutral-900/60 transition-colors flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="text-neutral-200 font-medium">{exp.title}</div>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          {exp.durationDays} Days · {formatCurrency(exp.startingPriceUSD, currentCurrency)}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Nav links */}
            <a
              href="#journeys"
              onClick={onClose}
              className="flex items-center py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors min-h-[44px]"
            >
              Curated Journeys
            </a>
            <a
              href="#journal"
              onClick={onClose}
              className="flex items-center py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors min-h-[44px]"
            >
              Expedition Journal
            </a>
            <a
              href="#heritage"
              onClick={onClose}
              className="flex items-center py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors min-h-[44px]"
            >
              Our Heritage & Pledge
            </a>
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400">Currency</span>
            <CurrencySelector
              currentCurrency={currentCurrency}
              onSelectCurrency={onSelectCurrency}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPlanner();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors min-h-[44px] cursor-pointer"
          >
            Plan a Journey
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
