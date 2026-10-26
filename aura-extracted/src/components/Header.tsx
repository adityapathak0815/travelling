import React, { useState, useEffect, useRef } from 'react';
import { Destination, Experience, Currency } from '../types/travel';
import { MegaMenuDestinations } from './MegaMenuDestinations';
import { MegaMenuExperiences } from './MegaMenuExperiences';
import { CurrencySelector } from './CurrencySelector';
import { Search, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  onOpenSearch: () => void;
  onOpenPlanner: () => void;
  onOpenMobileNav: () => void;
  onSelectDestination: (destination: Destination) => void;
  onSelectExperience: (experience: Experience) => void;
}

type ActiveMenu = 'none' | 'destinations' | 'experiences';

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onSelectCurrency,
  onOpenSearch,
  onOpenPlanner,
  onOpenMobileNav,
  onSelectDestination,
  onSelectExperience,
}) => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('none');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Monitor scroll for frosted glass elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard and outside click handling
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu('none');
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveMenu('none');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMenu = (menu: ActiveMenu) => {
    setActiveMenu((prev) => (prev === menu ? 'none' : menu));
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-lg shadow-black/30'
          : 'bg-neutral-950/40 backdrop-blur-sm border-b border-white/10 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Contract: [Brand] — [4-5 Nav Links] — [Primary Action + Utility] */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          
          {/* Zone 1: Single Wordmark Element (No badges or descriptors) */}
          <a
            href="/"
            className="group flex items-center gap-1.5 sm:gap-2 text-lg sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            aria-label="Aura Expeditions - Return to homepage"
          >
            <span className="font-editorial italic font-normal text-amber-300 group-hover:text-amber-200 transition-colors">
              Aura
            </span>
            <span className="font-sans font-semibold tracking-wider uppercase text-xs sm:text-base text-neutral-100 group-hover:text-white transition-colors">
              Expeditions
            </span>
          </a>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-neutral-300"
            aria-label="Main Navigation"
          >
            {/* Destinations Dropdown Trigger */}
            <button
              type="button"
              onClick={() => toggleMenu('destinations')}
              aria-expanded={activeMenu === 'destinations'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-white whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === 'destinations' ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              <span>Destinations</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'destinations' ? 'rotate-180 text-amber-300' : 'text-neutral-400'
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Experiences Dropdown Trigger */}
            <button
              type="button"
              onClick={() => toggleMenu('experiences')}
              aria-expanded={activeMenu === 'experiences'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-white whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === 'experiences' ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              <span>Experiences</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'experiences' ? 'rotate-180 text-amber-300' : 'text-neutral-400'
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Journeys Direct Link */}
            <a
              href="#journeys"
              onClick={() => setActiveMenu('none')}
              className="py-1 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Journeys
            </a>

            {/* Journal Direct Link */}
            <a
              href="#journal"
              onClick={() => setActiveMenu('none')}
              className="py-1 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Journal
            </a>

            {/* Heritage Direct Link */}
            <a
              href="#heritage"
              onClick={() => setActiveMenu('none')}
              className="py-1 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Heritage
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Clean Utility Affordances */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs text-neutral-300 hover:text-white rounded-md transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              aria-label="Open travel search"
            >
              <Search className="w-4 h-4 text-neutral-300" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium">Search</span>
              <kbd className="hidden md:inline-block text-[10px] bg-neutral-800/80 px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Currency Selector (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <CurrencySelector
                currentCurrency={currentCurrency}
                onSelectCurrency={onSelectCurrency}
              />
            </div>

            {/* Primary Action Button (Desktop & Tablet) */}
            <button
              type="button"
              onClick={onOpenPlanner}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20 cursor-pointer"
            >
              Plan a Journey
            </button>

            {/* Mobile Hamburger Menu Button (lg:hidden) */}
            <button
              type="button"
              onClick={onOpenMobileNav}
              className="p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 lg:hidden transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop MegaMenu Container */}
      {activeMenu === 'destinations' && (
        <div className="absolute top-full left-0 right-0 animate-in fade-in slide-in-from-top-2 duration-200">
          <MegaMenuDestinations
            currentCurrency={currentCurrency}
            onSelectDestination={onSelectDestination}
            onClose={() => setActiveMenu('none')}
          />
        </div>
      )}

      {activeMenu === 'experiences' && (
        <div className="absolute top-full left-0 right-0 animate-in fade-in slide-in-from-top-2 duration-200">
          <MegaMenuExperiences
            currentCurrency={currentCurrency}
            onSelectExperience={onSelectExperience}
            onClose={() => setActiveMenu('none')}
          />
        </div>
      )}
    </header>
  );
};
