import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import FitGuideGraphic from './FitGuideGraphic';

interface SizingGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizingGuide({ isOpen, onClose }: SizingGuideProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [underbust, setUnderbust] = useState<string>('');
  const [overbust, setOverbust] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);
  const [calculatedBriefSize, setCalculatedBriefSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const ub = parseFloat(underbust);
    const ob = parseFloat(overbust);
    const hp = parseFloat(hip);

    if (isNaN(ub) || isNaN(ob)) {
      alert('Please enter valid measurements for a precise fitting.');
      return;
    }

    // Convert to inches if in cm for standard lookup logic
    const ubIn = unit === 'cm' ? ub / 2.54 : ub;
    const obIn = unit === 'cm' ? ob / 2.54 : ob;
    const hpIn = isNaN(hp) ? 36 : (unit === 'cm' ? hp / 2.54 : hp);

    // Calculate Bralette/Bra recommended size
    let size = 'M';
    if (ubIn < 30) {
      size = 'XS';
    } else if (ubIn >= 30 && ubIn < 33) {
      size = obIn - ubIn > 3 ? 'S (D+ Cup)' : 'S';
    } else if (ubIn >= 33 && ubIn < 36) {
      size = obIn - ubIn > 3 ? 'M (D+ Cup)' : 'M';
    } else if (ubIn >= 36 && ubIn < 39) {
      size = obIn - ubIn > 3 ? 'L (D+ Cup)' : 'L';
    } else {
      size = 'XL';
    }

    // Calculate brief/hipster size based on hips
    let bSize = 'M';
    if (hpIn < 35) bSize = 'XS';
    else if (hpIn >= 35 && hpIn < 38) bSize = 'S';
    else if (hpIn >= 38 && hpIn < 41) bSize = 'M';
    else if (hpIn >= 41 && hpIn < 44) bSize = 'L';
    else if (hpIn >= 44 && hpIn < 47) bSize = 'XL';
    else bSize = 'XXL';

    setCalculatedSize(size);
    setCalculatedBriefSize(bSize);
  };

  const handleReset = () => {
    setUnderbust('');
    setOverbust('');
    setHip('');
    setCalculatedSize(null);
    setCalculatedBriefSize(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="w-full max-w-xl bg-white h-full overflow-y-auto no-radius flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E3DB] flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="font-sans text-xl tracking-[0.1em] text-[#111111] uppercase font-light">
              Sizing & Sensation
            </h2>
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mt-1">
              "dress the person, not the performance"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black transition-colors focus:outline-none"
            id="close-sizing-modal"
          >
            <X className="w-5 h-5 stroke-[1]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 flex-1">
          {/* Brand Philosophy Note */}
          <div className="border border-[#E8E3DB] p-6 bg-[#F4F0EA] no-radius space-y-3">
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#111111] font-medium block">
              Tashu’s Fitting Philosophy
            </span>
            <p className="font-sans font-light italic text-sm text-gray-800 leading-relaxed">
              "Lingerie sizes are arbitrary numbers constructed for production lines.
              Our fabrics are designed with a high-tension stretch recovery that responds to your body's heat.
              Measure yourself comfortably—do not pull the tape too tight. We dress the breathing body, not the static mannequin."
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex justify-between items-center border-b border-[#E8E3DB] pb-4">
            <span className="text-[11px] font-sans tracking-[0.15em] uppercase text-gray-600">Measurement Unit</span>
            <div className="flex border border-[#111111]/20 no-radius p-0.5">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-[10px] font-sans uppercase tracking-[0.2em] transition-colors no-radius ${
                  unit === 'in' ? 'bg-[#111111] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-[10px] font-sans uppercase tracking-[0.2em] transition-colors no-radius ${
                  unit === 'cm' ? 'bg-[#111111] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Calculator Form */}
          {!calculatedSize ? (
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="space-y-4">
                {/* Underbust */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.1em] text-gray-700 mb-2 flex items-center justify-between">
                    <span>1. Underbust Measurement</span>
                    <span className="text-gray-400 font-light lowercase text-[10px]">around ribs</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={underbust}
                    onChange={(e) => setUnderbust(e.target.value)}
                    placeholder={unit === 'in' ? 'e.g., 32' : 'e.g., 81'}
                    className="w-full border border-[#E8E3DB] px-4 py-3 text-sm no-radius font-sans focus:border-[#111111] focus:outline-none transition-colors"
                  />
                </div>

                {/* Overbust */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.1em] text-gray-700 mb-2 flex items-center justify-between">
                    <span>2. Overbust Measurement</span>
                    <span className="text-gray-400 font-light lowercase text-[10px]">fullest part</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={overbust}
                    onChange={(e) => setOverbust(e.target.value)}
                    placeholder={unit === 'in' ? 'e.g., 35' : 'e.g., 89'}
                    className="w-full border border-[#E8E3DB] px-4 py-3 text-sm no-radius font-sans focus:border-[#111111] focus:outline-none transition-colors"
                  />
                </div>

                {/* Hips */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.1em] text-gray-700 mb-2 flex items-center justify-between">
                    <span>3. Hip Measurement (Optional)</span>
                    <span className="text-gray-400 font-light lowercase text-[10px]">fullest part of seat</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    placeholder={unit === 'in' ? 'e.g., 37' : 'e.g., 94'}
                    className="w-full border border-[#E8E3DB] px-4 py-3 text-sm no-radius font-sans focus:border-[#111111] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] text-white py-4 text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-black transition-colors no-radius font-light"
                id="calculate-size-btn"
              >
                Determine My True Fitting
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="border border-[#E8E3DB] p-8 no-radius bg-white space-y-4">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gray-400 block">
                  Your Recommended Fit
                </span>
                
                <div className="flex justify-center gap-8 items-center py-4">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-sans text-[#111111] font-light">{calculatedSize}</div>
                    <div className="text-[9px] font-sans text-gray-400 uppercase tracking-[0.2em] mt-2">Bralettes & Tops</div>
                  </div>
                  <div className="h-10 w-px bg-[#E8E3DB]"></div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-sans text-[#111111] font-light">{calculatedBriefSize}</div>
                    <div className="text-[9px] font-sans text-gray-400 uppercase tracking-[0.2em] mt-2">Briefs & Knickers</div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-light leading-relaxed text-left border-t border-[#E8E3DB] pt-4">
                  * Based on your measurements of {underbust}{unit} underbust and {overbust}{unit} overbust. 
                  Our fabric molds to your shape, so you will feel a firm but un-restrictive hug.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 border border-[#111111] text-[#111111] py-4 text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-gray-50 transition-colors no-radius font-light"
                  id="recalculate-size-btn"
                >
                  Measure Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-[#111111] text-white py-4 text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-black transition-colors no-radius font-light"
                  id="apply-fitting-btn"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {/* Sizing Chart Details */}
          <div className="pt-8 border-t border-[#E8E3DB]">
            <FitGuideGraphic />
          </div>
        </div>
      </div>
    </div>
  );
}
