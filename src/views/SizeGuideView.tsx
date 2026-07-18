import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CUP_LADDER = ['A','B','C','D','DD','E','F','FF','G','GG','H'];
const EU_CUP_LADDER = ['A','B','C','D','E','F','G','H','I','J','K'];
const ALPHA_LADDER = ['XXS','XS','S','M','L','XL','XXL','XXXL'];

const RANGES = {
  underbust: { min: 22, max: 52, label: 'underbust' },
  overbust:  { min: 26, max: 58, label: 'overbust' },
  waist:     { min: 20, max: 52, label: 'waist' },
  hip:       { min: 26, max: 58, label: 'hip' },
};

type Unit = 'in' | 'cm';
type Region = 'IN' | 'EU';
type ProductType = 'bra' | 'panty' | 'lingerie';

export default function SizeGuideView({ isDrawer = false }: { isDrawer?: boolean } = {}) {
  const [unit, setUnit] = useState<Unit>('in');
  const [region, setRegion] = useState<Region>('IN');
  const [product, setProduct] = useState<ProductType>('bra');

  const [measurements, setMeasurements] = useState({
    underbust: '',
    overbust: '',
    waist: '',
    hip: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const prevUnitRef = useRef(unit);

  useEffect(() => {
    if (prevUnitRef.current !== unit) {
      const convert = (val: string, toCm: boolean) => {
        const num = parseFloat(val);
        if (isNaN(num)) return val;
        return toCm ? (num * 2.54).toFixed(1) : (num / 2.54).toFixed(1);
      };

      setMeasurements(prev => ({
        underbust: convert(prev.underbust, unit === 'cm'),
        overbust: convert(prev.overbust, unit === 'cm'),
        waist: convert(prev.waist, unit === 'cm'),
        hip: convert(prev.hip, unit === 'cm')
      }));
      setResult(null);
      prevUnitRef.current = unit;
    }
  }, [unit]);

  const handleChange = (field: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toInches = (v: number) => unit === 'cm' ? v / 2.54 : v;

  const validateField = (id: keyof typeof RANGES, required = true) => {
    const raw = measurements[id as keyof typeof measurements].trim();
    const range = RANGES[id];
    
    if (raw === '') {
      if (required) {
        setErrors(prev => ({ ...prev, [id]: `Enter your ${range.label} measurement.` }));
        return null;
      }
      return null;
    }

    const num = Number(raw);
    if (isNaN(num) || num <= 0) {
      setErrors(prev => ({ ...prev, [id]: `${range.label.charAt(0).toUpperCase() + range.label.slice(1)} must be a positive number.` }));
      return null;
    }

    const inInches = toInches(num);
    if (inInches < range.min || inInches > range.max) {
      const dispMin = unit === 'in' ? range.min : Math.round(range.min * 2.54);
      const dispMax = unit === 'in' ? range.max : Math.round(range.max * 2.54);
      setErrors(prev => ({ ...prev, [id]: `Enter a realistic ${range.label} between ${dispMin}–${dispMax} ${unit}.` }));
      return null;
    }

    return inInches;
  };

  const roundBandIN = (underbustInches: number) => {
    let rounded = Math.round(underbustInches);
    if (rounded % 2 !== 0) rounded += 1;
    return rounded;
  };

  const bandINtoEU = (bandIN: number) => Math.round((bandIN - 28) * 2.5 + 60);

  const cupFromDiff = (diffInches: number) => {
    const idx = Math.round(diffInches) - 1;
    if (idx < 0) return -1;
    if (idx >= CUP_LADDER.length) return CUP_LADDER.length - 1;
    return idx;
  };

  const sisterSizesIN = (bandIN: number, cupIndex: number) => {
    const sisters = [];
    if (cupIndex + 1 < CUP_LADDER.length) sisters.push(`${bandIN - 2}${CUP_LADDER[cupIndex + 1]}`);
    if (cupIndex - 1 >= 0) sisters.push(`${bandIN + 2}${CUP_LADDER[cupIndex - 1]}`);
    return sisters;
  };

  const sisterSizesEU = (bandIN: number, cupIndex: number) => {
    const sisters = [];
    if (cupIndex + 1 < EU_CUP_LADDER.length) sisters.push(`${bandINtoEU(bandIN - 2)}${EU_CUP_LADDER[cupIndex + 1]}`);
    if (cupIndex - 1 >= 0) sisters.push(`${bandINtoEU(bandIN + 2)}${EU_CUP_LADDER[cupIndex - 1]}`);
    return sisters;
  };

  const pantySizeIN = (hipInches: number) => {
    const table = [
      { max: 34, size: 'S / 28-30' },
      { max: 37, size: 'M / 32' },
      { max: 40, size: 'L / 34' },
      { max: 43, size: 'XL / 36' },
      { max: 46, size: 'XXL / 38' },
      { max: 49, size: '3XL / 40' },
      { max: 999, size: '4XL / 42+' }
    ];
    return table.find(t => hipInches <= t.max)?.size || '';
  };

  const pantySizeEU = (hipInches: number) => {
    const hipCm = hipInches * 2.54;
    const table = [
      { max: 89, size: 'EU 34' },
      { max: 93, size: 'EU 36' },
      { max: 97, size: 'EU 38' },
      { max: 101, size: 'EU 40' },
      { max: 105, size: 'EU 42' },
      { max: 109, size: 'EU 44' },
      { max: 9999, size: 'EU 46+' }
    ];
    return table.find(t => hipCm <= t.max)?.size || '';
  };

  const alphaFromBandCup = (bandIN: number, cupIndex: number) => {
    const bandIndex = Math.max(0, (bandIN - 28) / 2);
    const score = bandIndex + cupIndex;
    const alphaIndex = Math.min(ALPHA_LADDER.length - 1, Math.max(0, Math.floor(score / 2)));
    return ALPHA_LADDER[alphaIndex];
  };

  const handleCalculate = () => {
    setErrors({});
    setWarning(null);

    if (product === 'bra' || product === 'lingerie') {
      const underbust = validateField('underbust', true);
      const overbust = validateField('overbust', true);
      let hip = null;
      if (product === 'lingerie') {
        hip = validateField('hip', true);
      }

      if (underbust === null || overbust === null || (product === 'lingerie' && hip === null)) return;

      if (overbust <= underbust) {
        setWarning('Overbust must be larger than underbust. Please re-measure: underbust is taken snug around the ribcage (exhale first), overbust across the fullest part of the bust. We can\'t recommend a size when this is inverted.');
        return;
      }

      const bandIN = roundBandIN(underbust);
      const diff = overbust - underbust;
      const cupIndex = cupFromDiff(diff);

      if (cupIndex === -1) {
        setWarning('The difference between your underbust and overbust is under 1" — please double check both measurements were taken correctly.');
        return;
      }
      if (diff > 11) {
        setWarning(`A ${diff.toFixed(1)}" difference is outside our standard chart range — we'd recommend a one-on-one fitting consultation.`);
      }

      if (product === 'bra') {
        setResult({
          type: 'bra',
          bandIN,
          diff,
          cupIndex,
          underbust,
          overbust,
          isIN: region === 'IN'
        });
      } else {
        setResult({
          type: 'lingerie',
          bandIN,
          diff,
          cupIndex,
          hip,
          isIN: region === 'IN'
        });
      }
    } else if (product === 'panty') {
      const waist = validateField('waist', false);
      const hip = validateField('hip', true);
      if (hip === null) return;
      if (waist !== null && waist >= hip) {
        setWarning('Waist measurement should be smaller than hip measurement. Please re-check both values.');
        return;
      }
      setResult({
        type: 'panty',
        waist,
        hip,
        isIN: region === 'IN'
      });
    }
  };

  const getPlaceholder = (id: keyof typeof RANGES) => {
    if (unit === 'in') {
      if (id === 'underbust') return 'e.g. 32.5';
      if (id === 'overbust') return 'e.g. 36.5';
      if (id === 'waist') return 'e.g. 28.5';
      if (id === 'hip') return 'e.g. 37.5';
    } else {
      if (id === 'underbust') return 'e.g. 81.5';
      if (id === 'overbust') return 'e.g. 91.5';
      if (id === 'waist') return 'e.g. 71.5';
      if (id === 'hip') return 'e.g. 94.5';
    }
    return '';
  };

  const regionText = region === 'IN'
    ? 'India sizing follows the UK/US alpha cup ladder (A–B–C–D–DD–E–F–FF–G), consistent with standard conventions.'
    : 'EU sizing uses the 70/75/80… band scale and shifts the cup alphabet by one letter after D (UK DD = EU E, UK E = EU F). Decimal measurements are accepted — round only to the nearest tenth for consistency.';

  return (
    <motion.div 
      initial={isDrawer ? {} : { opacity: 0, y: 20 }}
      animate={isDrawer ? {} : { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={isDrawer ? "w-full" : "max-w-[1240px] mx-auto px-4 sm:px-8 py-16 sm:py-24"}
    >
      {!isDrawer && (
        <>
          <p className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#111111] font-semibold mb-2 text-center sm:text-left">Sizing & Sensation</p>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl tracking-wide uppercase text-[#111111] mb-2 text-center sm:text-left">
            True Fitting Calculator
          </h1>
          <p className="font-serif italic text-[#6b6558] text-base sm:text-lg mb-12 text-center sm:text-left">
            Bra · Panties · Lingerie — sized for India and EU, from one measurement
          </p>
        </>
      )}

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
        <div className="flex border border-[#111111] no-radius">
          <button 
            onClick={() => { setRegion('IN'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius border-r border-[#111111] transition-colors ${region === 'IN' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            India
          </button>
          <button 
            onClick={() => { setRegion('EU'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius transition-colors ${region === 'EU' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            EU
          </button>
        </div>
        <div className="flex border border-[#111111] no-radius">
          <button 
            onClick={() => { setProduct('bra'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius border-r border-[#111111] transition-colors ${product === 'bra' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            Bra
          </button>
          <button 
            onClick={() => { setProduct('panty'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius border-r border-[#111111] transition-colors ${product === 'panty' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            Panties
          </button>
          <button 
            onClick={() => { setProduct('lingerie'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius transition-colors ${product === 'lingerie' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            Lingerie / Bodysuit
          </button>
        </div>
      </div>

      <div className={isDrawer ? "flex flex-col gap-8 items-start" : "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"}>
        
        {/* LEFT: INPUT PANEL */}
        <div className={isDrawer ? "w-full bg-white border border-gray-200 p-6 space-y-6 shadow-sm" : "col-span-1 lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 space-y-8 shadow-sm"}>
          
          {/* Philosophy Box */}
          <div className="border border-[#E8E3DB] p-6 bg-[#F4F0EA] no-radius space-y-3">
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#111111] font-semibold block">
              Tashu’s Fitting Philosophy
            </span>
            <p className="font-sans font-light italic text-xs text-gray-800 leading-relaxed">
              "Lingerie sizes are arbitrary numbers constructed for production lines.
              Our fabrics are designed with a high-tension stretch recovery that responds to your body's heat.
              Measure yourself comfortably—do not pull the tape too tight. We dress the breathing body, not the static mannequin."
            </p>
          </div>

          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#8a8474] mb-3">Measurement Unit</div>
            <div className="flex border border-[#111111] w-fit no-radius">
              <button 
                onClick={() => setUnit('in')}
                className={`px-5 py-2 font-sans text-[11px] uppercase tracking-widest transition-colors no-radius border-r border-[#111111] ${unit === 'in' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
              >
                Inches
              </button>
              <button 
                onClick={() => setUnit('cm')}
                className={`px-5 py-2 font-sans text-[11px] uppercase tracking-widest transition-colors no-radius ${unit === 'cm' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {(product === 'bra' || product === 'lingerie') && (
            <div className="space-y-4">
              <div className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#8a8474] mb-4">
                {product === 'bra' ? 'Bra Measurements' : 'Lingerie / Bodysuit Measurements'}
              </div>
              
              <div>
                <label className="flex justify-between items-baseline text-[11px] font-sans uppercase tracking-widest text-[#57534a] mb-2">
                  Underbust <span className="normal-case tracking-normal text-gray-400">around ribs, exhaled</span>
                </label>
                <input 
                  type="number" step="0.1" inputMode="decimal"
                  value={measurements.underbust} onChange={(e) => handleChange('underbust', e.target.value)}
                  placeholder={getPlaceholder('underbust')}
                  className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.underbust ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                />
                {errors.underbust && <div className="text-red-500 text-[11px] mt-1.5">{errors.underbust}</div>}
              </div>

              <div>
                <label className="flex justify-between items-baseline text-[11px] font-sans uppercase tracking-widest text-[#57534a] mb-2">
                  Overbust <span className="normal-case tracking-normal text-gray-400">fullest part</span>
                </label>
                <input 
                  type="number" step="0.1" inputMode="decimal"
                  value={measurements.overbust} onChange={(e) => handleChange('overbust', e.target.value)}
                  placeholder={getPlaceholder('overbust')}
                  className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.overbust ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                />
                {errors.overbust && <div className="text-red-500 text-[11px] mt-1.5">{errors.overbust}</div>}
              </div>
            </div>
          )}

          {(product === 'panty' || product === 'lingerie') && (
            <div className="space-y-4">
              {product === 'panty' && (
                <div className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#8a8474] mb-4">Panty Measurements</div>
              )}
              
              {product === 'panty' && (
                <div>
                  <label className="flex justify-between items-baseline text-[11px] font-sans uppercase tracking-widest text-[#57534a] mb-2">
                    Waist <span className="normal-case tracking-normal text-gray-400">natural indentation</span>
                  </label>
                  <input 
                    type="number" step="0.1" inputMode="decimal"
                    value={measurements.waist} onChange={(e) => handleChange('waist', e.target.value)}
                    placeholder={getPlaceholder('waist')}
                    className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.waist ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                  />
                  {errors.waist && <div className="text-red-500 text-[11px] mt-1.5">{errors.waist}</div>}
                </div>
              )}

              <div>
                <label className="flex justify-between items-baseline text-[11px] font-sans uppercase tracking-widest text-[#57534a] mb-2">
                  Hip <span className="normal-case tracking-normal text-gray-400">fullest part of seat</span>
                </label>
                <input 
                  type="number" step="0.1" inputMode="decimal"
                  value={measurements.hip} onChange={(e) => handleChange('hip', e.target.value)}
                  placeholder={getPlaceholder('hip')}
                  className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.hip ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                />
                {errors.hip && <div className="text-red-500 text-[11px] mt-1.5">{errors.hip}</div>}
              </div>
            </div>
          )}

          <button 
            onClick={handleCalculate}
            className="w-full bg-[#111111] text-white p-4 font-sans text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-black transition-colors no-radius mt-2"
          >
            Determine My True Fitting
          </button>
          
          <p className="text-[11px] text-gray-400 leading-relaxed mt-4">
            {regionText}
          </p>
        </div>

        {/* RIGHT: RESULTS PANEL */}
        <div className={isDrawer ? "w-full bg-[#1A1A1A] text-white min-h-[400px] flex flex-col no-radius border border-[#222222]" : "col-span-1 lg:col-span-7 bg-[#1A1A1A] text-white min-h-[500px] flex flex-col no-radius border border-[#222222]"}>
          <div className="p-8 sm:p-10 pb-6 bg-[#111111] border-b border-[#222222]">
            <h2 className="font-serif font-medium text-3xl uppercase tracking-wide mb-2">Your True Fitting</h2>
            <div className="text-gray-400 text-xs leading-relaxed max-w-md">Enter your measurements to see your recommended size.</div>
          </div>

          {!result ? (
            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center text-gray-500">
              <div className="font-serif italic text-lg text-gray-400 mb-3">— awaiting measurements —</div>
              <div className="text-sm font-light">Your fitting will appear here once calculated.</div>
              {warning && (
                <div className="mt-8 bg-red-500/10 border-l-2 border-red-500 p-4 text-red-200 text-xs text-left leading-relaxed">
                  {warning}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 sm:p-10 flex-grow animate-fade-in">
              
              <div className="bg-[#111111] border border-white/10 p-8 text-center mb-8">
                <div className="text-[10px] font-sans uppercase tracking-[0.15em] text-gray-400 mb-3">
                  Your {result.type === 'bra' ? 'Bra' : result.type === 'panty' ? 'Panty' : 'Lingerie / Bodysuit'} Size — {result.isIN ? 'India' : 'EU'}
                </div>
                <div className="font-serif text-5xl sm:text-6xl text-[var(--theme-lime)] tracking-wide mb-3">
                  {result.type === 'bra' ? `${result.isIN ? result.bandIN : bandINtoEU(result.bandIN)}${result.isIN ? CUP_LADDER[result.cupIndex] : EU_CUP_LADDER[result.cupIndex]}` :
                   result.type === 'lingerie' ? alphaFromBandCup(result.bandIN, result.cupIndex) :
                   result.isIN ? pantySizeIN(result.hip) : pantySizeEU(result.hip)}
                </div>
                <div className="text-[11px] text-gray-400">
                  {result.type === 'bra' ? (result.isIN ? 'UK/US-aligned alpha sizing' : 'EU band, alphabet-shifted cup') :
                   result.type === 'lingerie' ? `Equivalent to ${result.isIN ? result.bandIN : bandINtoEU(result.bandIN)}${result.isIN ? CUP_LADDER[result.cupIndex] : EU_CUP_LADDER[result.cupIndex]} in band+cup terms` :
                   'Based on hip measurement'}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <h3 className="text-[11px] font-sans uppercase tracking-[0.15em] text-[var(--theme-lime)] font-semibold mb-4">How we got here</h3>
                
                {result.type !== 'panty' && (
                  <>
                    {result.type === 'bra' && (
                      <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                        <span>Underbust measured</span><b className="text-white font-medium">{result.underbust.toFixed(1)}"</b>
                      </div>
                    )}
                    {result.type === 'bra' && (
                      <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                        <span>Overbust measured</span><b className="text-white font-medium">{result.overbust.toFixed(1)}"</b>
                      </div>
                    )}
                    <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                      <span>Bust–underbust difference</span><b className="text-white font-medium">{result.diff.toFixed(1)}"</b>
                    </div>
                    {result.type === 'bra' ? (
                      <>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                          <span>Band (India / UK / US)</span><b className="text-white font-medium">{result.bandIN}</b>
                        </div>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                          <span>Band (EU)</span><b className="text-white font-medium">{bandINtoEU(result.bandIN)}</b>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                          <span>Band + cup basis</span><b className="text-white font-medium">{result.bandIN}{CUP_LADDER[result.cupIndex]}</b>
                        </div>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                          <span>Hip measured</span><b className="text-white font-medium">{result.hip.toFixed(1)}"</b>
                        </div>
                      </>
                    )}
                  </>
                )}

                {result.type === 'panty' && (
                  <>
                    {result.waist !== null && (
                      <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                        <span>Waist measured</span><b className="text-white font-medium">{result.waist.toFixed(1)}"</b>
                      </div>
                    )}
                    <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400">
                      <span>Hip measured</span><b className="text-white font-medium">{result.hip.toFixed(1)}"</b>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">India Size</div>
                    <div className="font-serif text-xl text-white">
                      {result.type === 'bra' ? `${result.bandIN}${CUP_LADDER[result.cupIndex]}` :
                       result.type === 'lingerie' ? alphaFromBandCup(result.bandIN, result.cupIndex) :
                       pantySizeIN(result.hip)}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">EU Size</div>
                    <div className="font-serif text-xl text-white">
                      {result.type === 'bra' ? `${bandINtoEU(result.bandIN)}${EU_CUP_LADDER[result.cupIndex]}` :
                       result.type === 'lingerie' ? alphaFromBandCup(result.bandIN, result.cupIndex) :
                       pantySizeEU(result.hip)}
                    </div>
                  </div>
                </div>

                {result.type === 'lingerie' && (
                  <div className="bg-[var(--theme-lime)]/10 border-l-2 border-[var(--theme-lime)] p-3 text-xs leading-relaxed text-gray-300 mt-4">
                    Teddy/bodysuit alpha sizing is a combined band+cup approximation, calibrated against industry pattern grading — validate against your own sample garments once cut, since alpha sizing varies more by house pattern than bra sizing does.
                  </div>
                )}
              </div>

              {result.type === 'bra' && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-[11px] font-sans uppercase tracking-[0.15em] text-[var(--theme-lime)] font-semibold mb-3">Sister Sizes</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(() => {
                      const sisters = result.isIN ? sisterSizesIN(result.bandIN, result.cupIndex) : sisterSizesEU(result.bandIN, result.cupIndex);
                      return sisters.length ? sisters.map((s: string, i: number) => (
                        <div key={i} className="border border-white/20 px-3 py-1.5 text-xs text-gray-300">{s}</div>
                      )) : <div className="border border-white/20 px-3 py-1.5 text-xs text-gray-300">No sister size at this extreme</div>;
                    })()}
                  </div>
                  <div className="bg-[var(--theme-lime)]/10 border-l-2 border-[var(--theme-lime)] p-3 text-xs leading-relaxed text-gray-300 mt-2">
                    Same fit volume, different band — useful if your true size is out of stock or feels off on the same hook.
                  </div>
                </div>
              )}

              {warning && (
                <div className="mt-6 bg-red-500/10 border-l-2 border-red-500 p-4 text-red-200 text-xs leading-relaxed">
                  {warning}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
