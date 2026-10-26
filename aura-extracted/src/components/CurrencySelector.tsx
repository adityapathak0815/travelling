import React, { useState, useRef, useEffect } from 'react';
import { Currency } from '../types/travel';
import { CURRENCIES } from '../utils/travel';
import { ChevronDown, Globe } from 'lucide-react';

interface CurrencySelectorProps {
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  onSelectCurrency,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current currency: ${currentCurrency.code}. Click to change currency.`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 whitespace-nowrap shrink-0"
      >
        <Globe className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
        <span className="font-mono tracking-wide">{currentCurrency.code}</span>
        <span className="text-neutral-400 font-sans">({currentCurrency.symbol})</span>
        <ChevronDown
          className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select currency"
          className="absolute right-0 mt-2 w-36 rounded-lg bg-neutral-900 border border-neutral-800 shadow-xl shadow-black/50 py-1 z-50 focus:outline-none animate-in fade-in zoom-in-95 duration-150"
        >
          {Object.values(CURRENCIES).map((curr) => {
            const isSelected = curr.code === currentCurrency.code;
            return (
              <button
                key={curr.code}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => {
                  onSelectCurrency(curr);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-amber-500/10 text-amber-300 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <span className="font-medium font-mono">{curr.code}</span>
                <span className="text-neutral-400">{curr.symbol}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
