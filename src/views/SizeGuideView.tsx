import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CUP_LADDER = ['A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H'];
const EU_CUP_LADDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const ALPHA_LADDER = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

const RANGES = {
  underbust: { min: 22, max: 52, label: 'underbust' },
  overbust:  { min: 25, max: 60, label: 'overbust' },
  waist:     { min: 20, max: 52, label: 'waist' },
  hip:       { min: 26, max: 60, label: 'hip' },
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

  // Industry-standard Indian & International Band Size calculation (+4/+5 rule mapped to even bands)
  const calculateBandIN = (underbustInches: number) => {
    if (underbustInches < 25.5) return 28;
    const steps = Math.floor((underbustInches - 25.5) / 2);
    return Math.min(52, Math.max(28, 30 + steps * 2));
  };

  const bandINtoEU = (bandIN: number) => Math.round((bandIN - 32) * 2.5 + 70);

  // Cup size is calculated from the difference between Overbust and Calculated Band Size
  const calculateCupIndex = (overbustInches: number, bandIN: number) => {
    const diff = overbustInches - bandIN;
    if (diff <= 0.5) return 0; // Cup A (or AA)
    if (diff <= 1.5) return 1; // Cup B (1" diff)
    if (diff <= 2.5) return 2; // Cup C (2" diff)
    if (diff <= 3.5) return 3; // Cup D (3" diff)
    if (diff <= 4.5) return 4; // Cup DD/E (4" diff)
    if (diff <= 5.5) return 5; // Cup E/F (5" diff)
    if (diff <= 6.5) return 6; // Cup F/FF (6" diff)
    if (diff <= 7.5) return 7; // Cup FF/G (7" diff)
    if (diff <= 8.5) return 8; // Cup G (8" diff)
    if (diff <= 9.5) return 9; // Cup GG/H (9" diff)
    return 10; // Cup H+
  };

  const sisterSizesIN = (bandIN: number, cupIndex: number) => {
    const sisters = [];
    if (cupIndex + 1 < CUP_LADDER.length && bandIN - 2 >= 28) {
      sisters.push(`${bandIN - 2}${CUP_LADDER[cupIndex + 1]}`);
    }
    if (cupIndex - 1 >= 0 && bandIN + 2 <= 52) {
      sisters.push(`${bandIN + 2}${CUP_LADDER[cupIndex - 1]}`);
    }
    return sisters;
  };

  const sisterSizesEU = (bandIN: number, cupIndex: number) => {
    const sisters = [];
    if (cupIndex + 1 < EU_CUP_LADDER.length && bandIN - 2 >= 28) {
      sisters.push(`${bandINtoEU(bandIN - 2)}${EU_CUP_LADDER[cupIndex + 1]}`);
    }
    if (cupIndex - 1 >= 0 && bandIN + 2 <= 52) {
      sisters.push(`${bandINtoEU(bandIN + 2)}${EU_CUP_LADDER[cupIndex - 1]}`);
    }
    return sisters;
  };

  // Accurate Panty sizing based on Hip (and optional Waist) in inches
  const getPantySizeIndex = (hipInches: number, waistInches: number | null) => {
    let hipIdx = 0;
    if (hipInches <= 34.5) hipIdx = 0; // S
    else if (hipInches <= 37.5) hipIdx = 1; // M
    else if (hipInches <= 40.5) hipIdx = 2; // L
    else if (hipInches <= 43.5) hipIdx = 3; // XL
    else if (hipInches <= 46.5) hipIdx = 4; // 2XL
    else if (hipInches <= 50.5) hipIdx = 5; // 3XL
    else hipIdx = 6; // 4XL

    let waistIdx = 0;
    if (waistInches !== null) {
      if (waistInches <= 26) waistIdx = 0;
      else if (waistInches <= 29) waistIdx = 1;
      else if (waistInches <= 32) waistIdx = 2;
      else if (waistInches <= 35) waistIdx = 3;
      else if (waistInches <= 38) waistIdx = 4;
      else if (waistInches <= 42) waistIdx = 5;
      else waistIdx = 6;
    }

    return Math.max(hipIdx, waistIdx);
  };

  const pantySizeIN = (hipInches: number, waistInches: number | null) => {
    const sizes = ['S / 80 cm', 'M / 85 cm', 'L / 90 cm', 'XL / 95 cm', '2XL / 100 cm', '3XL / 105 cm', '4XL / 110+ cm'];
    const idx = getPantySizeIndex(hipInches, waistInches);
    return sizes[idx] || 'XL / 95 cm';
  };

  const pantySizeEU = (hipInches: number, waistInches: number | null) => {
    const sizes = ['EU 36 (S)', 'EU 38 (M)', 'EU 40 (L)', 'EU 42 (XL)', 'EU 44 (2XL)', 'EU 46 (3XL)', 'EU 48+ (4XL)'];
    const idx = getPantySizeIndex(hipInches, waistInches);
    return sizes[idx] || 'EU 42 (XL)';
  };

  // Bodysuit / Lingerie Alpha calculation accounting for Band + Cup Volume
  const alphaFromBandCup = (bandIN: number, cupIndex: number) => {
    let baseIdx = 0;
    if (bandIN <= 30) baseIdx = 0;       // XS
    else if (bandIN === 32) baseIdx = 1; // S
    else if (bandIN === 34) baseIdx = 2; // M
    else if (bandIN === 36) baseIdx = 3; // L
    else if (bandIN === 38) baseIdx = 4; // XL
    else if (bandIN === 40) baseIdx = 5; // 2XL
    else if (bandIN <= 44) baseIdx = 6;  // 3XL
    else baseIdx = 7;                    // 4XL

    // Bump up one alpha size for D+ cup volume to ensure bust comfort in one-piece garments
    if (cupIndex >= 3 && baseIdx < ALPHA_LADDER.length - 1) {
      baseIdx += 1;
    }

    return ALPHA_LADDER[baseIdx];
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
        setWarning('Overbust measurement should be larger than underbust. Please verify: underbust is taken snugly directly beneath the bust (exhale first), while overbust is measured across the fullest point of the bust.');
        return;
      }

      const bandIN = calculateBandIN(underbust);
      const diff = overbust - bandIN;
      const rawDiff = overbust - underbust;
      const cupIndex = calculateCupIndex(overbust, bandIN);

      if (rawDiff > 12) {
        setWarning(`An overbust difference of ${rawDiff.toFixed(1)}" exceeds standard catalog tables — we recommend a personalized bespoke fitting consultation with our Atelier.`);
      }

      if (product === 'bra') {
        setResult({
          type: 'bra',
          bandIN,
          diff,
          rawDiff,
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
          rawDiff,
          cupIndex,
          underbust,
          overbust,
          hip,
          isIN: region === 'IN'
        });
      }
    } else if (product === 'panty') {
      const waist = validateField('waist', false);
      const hip = validateField('hip', true);
      if (hip === null) return;
      
      if (waist !== null && waist >= hip) {
        setWarning('Waist measurement is typically smaller than hip circumference. If correct, our calculator automatically prioritizes the larger dimension for optimal elastic comfort.');
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
      if (id === 'underbust') return 'e.g. 30.5';
      if (id === 'overbust') return 'e.g. 36.0';
      if (id === 'waist') return 'e.g. 28.5';
      if (id === 'hip') return 'e.g. 38.0';
    } else {
      if (id === 'underbust') return 'e.g. 77.5';
      if (id === 'overbust') return 'e.g. 91.5';
      if (id === 'waist') return 'e.g. 72.5';
      if (id === 'hip') return 'e.g. 96.5';
    }
    return '';
  };

  const regionText = region === 'IN'
    ? 'India sizing follows the standard international band convention (+4/+5 rib cage mapping) and alpha cup ladder (A–B–C–D–DD–E–F–FF–G) for precision fit.'
    : 'EU sizing utilizes the centimeter band metric (70/75/80/85...) and sequential single-letter cup progression (D–E–F–G–H), optimized for European apparel metrics.';

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
            Bra · Panties · Lingerie — precision calibrated for India & EU wearers
          </p>
        </>
      )}

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
        <div className="flex border border-[#111111] no-radius">
          <button 
            onClick={() => { setRegion('IN'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius border-r border-[#111111] transition-colors ${region === 'IN' ? 'bg-[#111111] text-white font-medium' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            India
          </button>
          <button 
            onClick={() => { setRegion('EU'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius transition-colors ${region === 'EU' ? 'bg-[#111111] text-white font-medium' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            EU
          </button>
        </div>
        <div className="flex border border-[#111111] no-radius overflow-x-auto">
          <button 
            onClick={() => { setProduct('bra'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius border-r border-[#111111] whitespace-nowrap transition-colors ${product === 'bra' ? 'bg-[#111111] text-white font-medium' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            Bra
          </button>
          <button 
            onClick={() => { setProduct('panty'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius border-r border-[#111111] whitespace-nowrap transition-colors ${product === 'panty' ? 'bg-[#111111] text-white font-medium' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            Panties
          </button>
          <button 
            onClick={() => { setProduct('lingerie'); setResult(null); }}
            className={`px-6 py-2.5 font-sans text-xs uppercase tracking-widest no-radius whitespace-nowrap transition-colors ${product === 'lingerie' ? 'bg-[#111111] text-white font-medium' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
          >
            Lingerie / Bodysuit
          </button>
        </div>
      </div>

      <div className={isDrawer ? "flex flex-col gap-8 items-start" : "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"}>
        
        {/* LEFT: INPUT PANEL */}
        <div className={isDrawer ? "w-full bg-white border border-gray-200 p-6 space-y-6 shadow-sm no-radius" : "col-span-1 lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 space-y-8 shadow-sm no-radius"}>
          
          {/* Philosophy Box */}
          <div className="border border-[#E8E3DB] p-6 bg-[#F4F0EA] no-radius space-y-3">
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#111111] font-semibold block">
              Tashu’s Fitting Philosophy
            </span>
            <p className="font-sans font-light italic text-xs text-gray-800 leading-relaxed">
              "Lingerie sizes shouldn't be arbitrary guesswork. Our fabrics are engineered with high-tension thermal recovery that adapts to your body's warmth. Measure yourself gently—do not compress your ribs or tissue. We design for the breathing, living form."
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
                  Underbust <span className="normal-case tracking-normal text-gray-400">snug around ribs, exhaled</span>
                </label>
                <input 
                  type="number" step="0.1" inputMode="decimal"
                  value={measurements.underbust} onChange={(e) => handleChange('underbust', e.target.value)}
                  placeholder={getPlaceholder('underbust')}
                  className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.underbust ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                />
                {errors.underbust && <div className="text-red-500 text-[11px] mt-1.5 font-sans uppercase tracking-wider">{errors.underbust}</div>}
              </div>

              <div>
                <label className="flex justify-between items-baseline text-[11px] font-sans uppercase tracking-widest text-[#57534a] mb-2">
                  Overbust <span className="normal-case tracking-normal text-gray-400">fullest point of bust</span>
                </label>
                <input 
                  type="number" step="0.1" inputMode="decimal"
                  value={measurements.overbust} onChange={(e) => handleChange('overbust', e.target.value)}
                  placeholder={getPlaceholder('overbust')}
                  className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.overbust ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                />
                {errors.overbust && <div className="text-red-500 text-[11px] mt-1.5 font-sans uppercase tracking-wider">{errors.overbust}</div>}
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
                  {errors.waist && <div className="text-red-500 text-[11px] mt-1.5 font-sans uppercase tracking-wider">{errors.waist}</div>}
                </div>
              )}

              <div>
                <label className="flex justify-between items-baseline text-[11px] font-sans uppercase tracking-widest text-[#57534a] mb-2">
                  Hip <span className="normal-case tracking-normal text-gray-400">fullest part of hips/seat</span>
                </label>
                <input 
                  type="number" step="0.1" inputMode="decimal"
                  value={measurements.hip} onChange={(e) => handleChange('hip', e.target.value)}
                  placeholder={getPlaceholder('hip')}
                  className={`w-full p-3 border font-sans text-sm bg-gray-50 focus:outline-none focus:border-[#111111] no-radius ${errors.hip ? 'border-red-400 bg-red-50' : 'border-[#d9d3c3]'}`}
                />
                {errors.hip && <div className="text-red-500 text-[11px] mt-1.5 font-sans uppercase tracking-wider">{errors.hip}</div>}
              </div>
            </div>
          )}

          <button 
            onClick={handleCalculate}
            className="w-full bg-[#111111] text-white p-4 font-sans text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 no-radius mt-2 shadow-sm"
          >
            Determine My True Fitting
          </button>
          
          <p className="text-[10px] text-gray-500 font-sans leading-relaxed mt-4">
            {regionText}
          </p>
        </div>

        {/* RIGHT: RESULTS PANEL */}
        <div className={isDrawer ? "w-full bg-[#1A1A1A] text-white min-h-[400px] flex flex-col no-radius border border-[#222222]" : "col-span-1 lg:col-span-7 bg-[#1A1A1A] text-white min-h-[500px] flex flex-col no-radius border border-[#222222]"}>
          <div className="p-8 sm:p-10 pb-6 bg-[#111111] border-b border-[#222222]">
            <h2 className="font-serif font-light text-3xl uppercase tracking-wider mb-2 text-[var(--theme-teal)]">Your Perfect Fit</h2>
            <div className="text-gray-400 text-xs font-sans tracking-wide max-w-md">Calibrated instantly for maximum tactile comfort and seamless silhouette wear.</div>
          </div>

          {!result ? (
            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center text-gray-500">
              <div className="font-serif italic text-lg text-gray-400 mb-3">— awaiting measurements —</div>
              <div className="text-xs font-sans tracking-[0.1em] uppercase opacity-70">Enter your dimensions to calculate your perfect atelier fit.</div>
              {warning && (
                <div className="mt-8 bg-red-500/10 border-l-2 border-red-500 p-4 text-red-200 text-xs font-sans text-left leading-relaxed">
                  {warning}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 sm:p-10 flex-grow animate-fade-in">
              
              <div className="bg-[#111111] border border-white/10 p-8 text-center mb-8 no-radius">
                <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Recommended {result.type === 'bra' ? 'Bra' : result.type === 'panty' ? 'Panty' : 'Lingerie / Bodysuit'} Size — {result.isIN ? 'India Standard' : 'EU Metric'}
                </div>
                <div className="font-serif text-6xl sm:text-7xl text-[var(--theme-lime)] tracking-wide my-3 font-normal">
                  {result.type === 'bra' ? `${result.isIN ? result.bandIN : bandINtoEU(result.bandIN)}${result.isIN ? CUP_LADDER[result.cupIndex] : EU_CUP_LADDER[result.cupIndex]}` :
                   result.type === 'lingerie' ? alphaFromBandCup(result.bandIN, result.cupIndex) :
                   result.isIN ? pantySizeIN(result.hip, result.waist) : pantySizeEU(result.hip, result.waist)}
                </div>
                <div className="text-[11px] font-sans tracking-wider text-gray-300 mt-2 uppercase">
                  {result.type === 'bra' ? (result.isIN ? `Band ${result.bandIN}" · ${CUP_LADDER[result.cupIndex]} Cup Volume` : `EU Band ${bandINtoEU(result.bandIN)} · ${EU_CUP_LADDER[result.cupIndex]} Cup`) :
                   result.type === 'lingerie' ? `Calibrated for Band ${result.isIN ? result.bandIN : bandINtoEU(result.bandIN)} & ${result.isIN ? CUP_LADDER[result.cupIndex] : EU_CUP_LADDER[result.cupIndex]} Cup proportions` :
                   'Optimized for hip & waist stretch contour'}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[var(--theme-lime)] font-semibold mb-4">How we derived your fit</h3>
                
                {result.type !== 'panty' && (
                  <>
                    <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                      <span>Raw Underbust Measured</span><b className="text-white font-mono">{result.underbust.toFixed(1)}" ({Math.round(result.underbust * 2.54)} cm)</b>
                    </div>
                    <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                      <span>Overbust Measured</span><b className="text-white font-mono">{result.overbust.toFixed(1)}" ({Math.round(result.overbust * 2.54)} cm)</b>
                    </div>
                    {result.type === 'bra' ? (
                      <>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                          <span>India Band Size (+4/+5 rib mapping)</span><b className="text-[var(--theme-lime)] font-mono text-sm">{result.bandIN}</b>
                        </div>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                          <span>Cup Volume Difference (Bust vs Band)</span><b className="text-white font-mono">{Math.max(0, result.diff).toFixed(1)}" ({CUP_LADDER[result.cupIndex]} Cup)</b>
                        </div>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                          <span>EU Band Metric Equivalent</span><b className="text-white font-mono">{bandINtoEU(result.bandIN)} cm</b>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                          <span>Bra Equivalent Basis</span><b className="text-[var(--theme-lime)] font-mono">{result.bandIN}{CUP_LADDER[result.cupIndex]}</b>
                        </div>
                        <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                          <span>Hip Measurement</span><b className="text-white font-mono">{result.hip.toFixed(1)}" ({Math.round(result.hip * 2.54)} cm)</b>
                        </div>
                      </>
                    )}
                  </>
                )}

                {result.type === 'panty' && (
                  <>
                    {result.waist !== null && (
                      <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                        <span>Waist Measured</span><b className="text-white font-mono">{result.waist.toFixed(1)}" ({Math.round(result.waist * 2.54)} cm)</b>
                      </div>
                    )}
                    <div className="flex justify-between text-xs py-2.5 border-b border-white/5 text-gray-400 font-sans">
                      <span>Hip Measured</span><b className="text-white font-mono">{result.hip.toFixed(1)}" ({Math.round(result.hip * 2.54)} cm)</b>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-white/5 border border-white/10 p-4 text-center no-radius">
                    <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-gray-400 mb-1">India Standard Size</div>
                    <div className="font-serif text-2xl text-white font-medium">
                      {result.type === 'bra' ? `${result.bandIN}${CUP_LADDER[result.cupIndex]}` :
                       result.type === 'lingerie' ? alphaFromBandCup(result.bandIN, result.cupIndex) :
                       pantySizeIN(result.hip, result.waist)}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 text-center no-radius">
                    <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-gray-400 mb-1">EU Standard Size</div>
                    <div className="font-serif text-2xl text-white font-medium">
                      {result.type === 'bra' ? `${bandINtoEU(result.bandIN)}${EU_CUP_LADDER[result.cupIndex]}` :
                       result.type === 'lingerie' ? alphaFromBandCup(result.bandIN, result.cupIndex) :
                       pantySizeEU(result.hip, result.waist)}
                    </div>
                  </div>
                </div>

                {result.type === 'lingerie' && (
                  <div className="bg-[var(--theme-lime)]/10 border-l-2 border-[var(--theme-lime)] p-4 text-xs leading-relaxed text-gray-300 mt-4 font-sans">
                    ✦ <b className="text-[var(--theme-lime)] uppercase tracking-wider">Bodysuit Note:</b> For cup sizes D and above, our calculator automatically bumps up one alpha size to ensure generous bust containment without tension along the straps or snap closures.
                  </div>
                )}
              </div>

              {result.type === 'bra' && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[var(--theme-lime)] font-semibold mb-3">Your Sister Sizes</h3>
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {(() => {
                      const sisters = result.isIN ? sisterSizesIN(result.bandIN, result.cupIndex) : sisterSizesEU(result.bandIN, result.cupIndex);
                      return sisters.length ? sisters.map((s: string, i: number) => (
                        <div key={i} className="border border-white/20 px-4 py-2 font-mono text-xs bg-white/5 text-gray-200 font-semibold">{s}</div>
                      )) : <div className="border border-white/20 px-4 py-2 text-xs text-gray-300 font-sans">No sister sizes at this range extreme</div>;
                    })()}
                  </div>
                  <div className="bg-[var(--theme-lime)]/10 border-l-2 border-[var(--theme-lime)] p-4 text-xs leading-relaxed text-gray-300 font-sans">
                    ✦ <b className="text-[var(--theme-lime)] uppercase tracking-wider">Fitting Tip:</b> Sister sizes offer identical cup volume across differing band lengths. Choose a sister size down in band (left) for a snugger torso feel, or up in band (right) for relaxed ribcage comfort.
                  </div>
                </div>
              )}

              {warning && (
                <div className="mt-6 bg-red-500/10 border-l-2 border-red-500 p-4 text-red-200 text-xs font-sans leading-relaxed">
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
