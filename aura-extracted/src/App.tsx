import { useState, useEffect } from 'react';
import { Destination, Experience, Currency } from './types/travel';
import { CURRENCIES, FEATURED_DESTINATIONS, filterDestinations } from './utils/travel';
import { Header } from './components/Header';
import { SearchModal } from './components/SearchModal';
import { PlannerModal } from './components/PlannerModal';
import { MobileNav } from './components/MobileNav';
import { HeroSection } from './components/HeroSection';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { SecondarySections } from './components/SecondarySections';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(CURRENCIES.USD);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(FEATURED_DESTINATIONS);

  // Global keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setFilteredDestinations(
      FEATURED_DESTINATIONS.filter((d) => d.id === dest.id || d.region === dest.region)
    );
    const target = document.getElementById('destinations-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectExperience = (exp: Experience) => {
    const matchingDest = FEATURED_DESTINATIONS.find((d) =>
      exp.destinationName.toLowerCase().includes(d.name.toLowerCase().split(' ')[0]) ||
      exp.destinationName.toLowerCase().includes(d.country.toLowerCase())
    ) || FEATURED_DESTINATIONS[0];
    
    setSelectedDestination(matchingDest);
    setIsPlannerOpen(true);
  };

  const handleFilterChange = (destId: string, season: string, category: string) => {
    let result = FEATURED_DESTINATIONS;
    if (destId !== 'all') {
      result = result.filter((d) => d.id === destId);
    }
    if (category !== 'All') {
      result = result.filter((d) => d.category === category);
    }
    setFilteredDestinations(result);
  };

  const handleOpenPlannerForDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Professional Travelling Website Header (3-Zone Contract) */}
      <Header
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPlanner={() => setIsPlannerOpen(true)}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onSelectDestination={handleSelectDestination}
        onSelectExperience={handleSelectExperience}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Contextual Hero Section */}
        <HeroSection
          onSearchClick={() => setIsSearchOpen(true)}
          onPlanTripClick={() => setIsPlannerOpen(true)}
          onFilterChange={handleFilterChange}
          selectedDestination={selectedDestination}
        />

        {/* Featured Expeditions Grid (Dynamic according to Header actions) */}
        <FeaturedDestinations
          destinations={filteredDestinations}
          currentCurrency={currentCurrency}
          selectedDestination={selectedDestination}
          onSelectDestination={handleSelectDestination}
          onPlanTrip={handleOpenPlannerForDestination}
        />

        {/* Secondary Navigation Anchors: Journeys, Journal, Heritage & Footer */}
        <SecondarySections
          currentCurrency={currentCurrency}
          onOpenPlanner={() => setIsPlannerOpen(true)}
        />
      </main>

      {/* Interactive Search & Discovery Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currentCurrency={currentCurrency}
        onSelectDestination={handleSelectDestination}
      />

      {/* Interactive Bespoke Journey Planner Modal */}
      <PlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        preselectedDestination={selectedDestination}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPlanner={() => setIsPlannerOpen(true)}
        onSelectDestination={handleSelectDestination}
        onSelectExperience={handleSelectExperience}
      />
    </div>
  );
}
