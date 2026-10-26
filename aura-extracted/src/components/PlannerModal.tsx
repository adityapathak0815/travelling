import React, { useState, useEffect } from 'react';
import { Destination, PlannerFormData } from '../types/travel';
import { FEATURED_DESTINATIONS, validatePlannerForm } from '../utils/travel';
import { X, CheckCircle, Calendar, Users, Compass, Send } from 'lucide-react';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDestination?: Destination | null;
}

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  preselectedDestination,
}) => {
  const [formData, setFormData] = useState<PlannerFormData>({
    name: '',
    email: '',
    destinationId: preselectedDestination?.id || FEATURED_DESTINATIONS[0].id,
    travelStyle: 'Cultural',
    travelers: 2,
    season: 'Autumn (Sep – Nov)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (preselectedDestination) {
      setFormData((prev) => ({ ...prev, destinationId: preselectedDestination.id }));
    }
  }, [preselectedDestination]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePlannerForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setReferenceCode(`AUR-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSubmitted(true);
  };

  const selectedDest = FEATURED_DESTINATIONS.find((d) => d.id === formData.destinationId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="planner-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close trip planner"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-editorial text-2xl font-bold text-white">
              Itinerary Request Confirmed
            </h3>

            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{formData.name}</span>. A senior expedition specialist has reserved your inquiry for{' '}
              <span className="text-amber-300 font-medium">{selectedDest?.name}</span>.
            </p>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-neutral-400">Reference:</span>
                <span className="font-mono text-amber-300">{referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Party Size:</span>
                <span className="text-neutral-200 font-mono">{formData.travelers} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Timing:</span>
                <span className="text-neutral-200">{formData.season}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Direct Contact:</span>
                <span className="text-neutral-200 truncate">{formData.email}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Bespoke Travel Consultation</span>
              </div>
              <h3 id="planner-modal-title" className="font-editorial text-2xl font-bold text-white">
                Design Your Custom Journey
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Share your travel vision. Our field directors craft private flights, access rites, and sanctuaries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Destination & Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="destination" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Destination Focus
                  </label>
                  <select
                    id="destination"
                    value={formData.destinationId}
                    onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                  >
                    {FEATURED_DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.country})
                      </option>
                    ))}
                  </select>
                  {errors.destinationId && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.destinationId}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="travel-style" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Expedition Style
                  </label>
                  <select
                    id="travel-style"
                    value={formData.travelStyle}
                    onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cultural">Cultural & Heritage Immersion</option>
                    <option value="Expedition">High-Adventure Glacier / Island Trek</option>
                    <option value="Coastal">Private Yacht & Maritime Reserve</option>
                    <option value="Wildlife">Savanna Wildlife & Dawn Balloon Safari</option>
                    <option value="Alpine">High Alpine Climbing & Chalet Solitude</option>
                  </select>
                </div>
              </div>

              {/* Season & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="season" className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    Target Season
                  </label>
                  <select
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Spring (Mar – May)">Spring (Mar – May)</option>
                    <option value="Summer (Jun – Aug)">Summer (Jun – Aug)</option>
                    <option value="Autumn (Sep – Nov)">Autumn (Sep – Nov)</option>
                    <option value="Winter (Dec – Feb)">Winter (Dec – Feb)</option>
                    <option value="Flexible / Year-Round">Flexible / Year-Round</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="travelers" className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    Number of Guests
                  </label>
                  <input
                    id="travelers"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  {errors.travelers && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.travelers}</p>
                  )}
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="traveler-name" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="traveler-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Alexandra Wright"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="traveler-email" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="traveler-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexandra@example.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Bespoke Itinerary
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2">
                  Complimentary 45-minute discovery consultation with a dedicated regional curator.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
