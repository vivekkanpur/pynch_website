import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const SizeCalculator = () => {
  const [underbust, setUnderbust] = useState(32);
  const [bust, setBust] = useState(34);

  // Calculate the result dynamically
  const result = useMemo(() => {
    if (bust <= underbust) return 'INVALID MEASUREMENT';

    // Step 1: Band size
    const bandSize = Math.round(underbust / 2) * 2;
    
    // Step 2: Cup difference
    const difference = bust - underbust;
    
    // Step 3: Cup letter
    let cupLetter = 'E';
    if (difference <= 1) cupLetter = 'A';
    else if (difference === 2) cupLetter = 'B';
    else if (difference === 3) cupLetter = 'C';
    else if (difference === 4) cupLetter = 'D';
    else if (difference === 5) cupLetter = 'DD';

    return `${bandSize}${cupLetter}`;
  }, [underbust, bust]);

  // Calculate dynamic scale for the visual measuring tape
  // Scales from 0.1 to 1.0 based on bust size relative to its min/max range
  const minBust = 28;
  const maxBust = 50;
  const scaleVisual = Math.max(0.1, (bust - minBust) / (maxBust - minBust));

  // Custom slider CSS using Tailwind arbitrary variants for Webkit and Mozilla
  const sliderTrackBase = "w-full appearance-none bg-transparent cursor-pointer focus:outline-none";
  const webkitTrack = "[&::-webkit-slider-runnable-track]:h-[1px] [&::-webkit-slider-runnable-track]:bg-[#E5E5E5]";
  const webkitThumb = "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#CFE11C] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:-mt-[7.5px]";
  const mozTrack = "[&::-moz-range-track]:h-[1px] [&::-moz-range-track]:bg-[#E5E5E5]";
  const mozThumb = "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#CFE11C] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none";
  const sliderClasses = `${sliderTrackBase} ${webkitTrack} ${webkitThumb} ${mozTrack} ${mozThumb}`;

  return (
    <div className="w-full max-w-lg mx-auto p-10 border border-[#E5E5E5] bg-[#FFFFFF] rounded-none flex flex-col gap-10">
      
      {/* Header */}
      <h2 className="font-['Inter'] text-[10px] uppercase tracking-widest text-center text-black">
        Find Your Pynch Fit
      </h2>

      {/* Interactive Sliders */}
      <div className="flex flex-col gap-8">
        {/* Underbust Slider */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center font-['Inter'] text-xs text-black uppercase tracking-wider">
            <span>Underbust (Inches)</span>
            <span>{underbust}</span>
          </div>
          <input
            type="range"
            min="26"
            max="44"
            step="1"
            value={underbust}
            onChange={(e) => setUnderbust(Number(e.target.value))}
            className={sliderClasses}
          />
        </div>

        {/* Bust Slider */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center font-['Inter'] text-xs text-black uppercase tracking-wider">
            <span>Bust (Inches)</span>
            <span>{bust}</span>
          </div>
          <input
            type="range"
            min="28"
            max="50"
            step="1"
            value={bust}
            onChange={(e) => setBust(Number(e.target.value))}
            className={sliderClasses}
          />
        </div>
      </div>

      {/* Dynamic Visual (Measuring Tape) */}
      <div className="h-[1px] w-full bg-[#E5E5E5] relative mt-2">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#CFE11C] origin-left"
          animate={{ scaleX: scaleVisual }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ width: "100%" }}
        />
      </div>

      {/* Output Display */}
      <div className="flex flex-col items-center justify-center mt-4 min-h-[140px]">
        <motion.div
          key={result}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`font-['Cormorant_Garamond'] text-center text-black ${
            result === 'INVALID MEASUREMENT' 
              ? 'text-xl tracking-[0.2em] font-sans uppercase mt-6 text-[#999999]' 
              : 'text-8xl leading-none font-medium'
          }`}
        >
          {result}
        </motion.div>
        
        {result !== 'INVALID MEASUREMENT' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-['Inter'] text-[10px] tracking-widest text-[#666666] uppercase mt-6"
          >
            Your perfect fit.
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default SizeCalculator;
