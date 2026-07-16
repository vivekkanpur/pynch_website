import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const FitGuide = () => {
  const [underbust, setUnderbust] = useState(32);
  const [bust, setBust] = useState(34);

  // Calculate the result dynamically
  const result = useMemo(() => {
    if (bust <= underbust) return 'Please check measurements';

    // Step 1: Band size (round to nearest even integer)
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

    return `${bandSize} ${cupLetter}`;
  }, [underbust, bust]);

  const isValid = result !== 'Please check measurements';

  // Custom slider CSS using Tailwind arbitrary variants for Webkit and Mozilla
  const sliderTrackBase = "w-full appearance-none bg-transparent cursor-pointer focus:outline-none";
  const webkitTrack = "[&::-webkit-slider-runnable-track]:h-[1px] [&::-webkit-slider-runnable-track]:bg-[#E5E5E5] dark:[&::-webkit-slider-runnable-track]:bg-[#333333]";
  const webkitThumb = "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#CFE11C] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:-mt-[7.5px]";
  const mozTrack = "[&::-moz-range-track]:h-[1px] [&::-moz-range-track]:bg-[#E5E5E5] dark:[&::-moz-range-track]:bg-[#333333]";
  const mozThumb = "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#CFE11C] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none";
  const sliderClasses = `${sliderTrackBase} ${webkitTrack} ${webkitThumb} ${mozTrack} ${mozThumb}`;

  return (
    <div className="w-full py-10 border-y border-[#E5E5E5] dark:border-[#333333] flex flex-col gap-10 transition-colors duration-300">
      
      {/* Interactive Sliders */}
      <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
        {/* Underbust Slider */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center font-['Inter'] text-xs text-black dark:text-white uppercase tracking-wider">
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
          <div className="flex justify-between items-center font-['Inter'] text-xs text-black dark:text-white uppercase tracking-wider">
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

      {/* Output Display */}
      <div className="flex flex-col items-center justify-center mt-2 min-h-[120px]">
        {/* Using standard Framer Motion layout animations for buttery smooth transitions 
            without constantly unmounting the node during fast drags */}
        <motion.div
          layout
          animate={{ scale: isValid ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`text-center transition-colors duration-300 ${
            !isValid 
              ? "font-['Inter'] text-xs tracking-widest uppercase text-[#999999] dark:text-[#666666] mt-4" 
              : "font-['Cormorant_Garamond'] text-6xl md:text-7xl leading-none font-medium text-[#CFE11C]"
          }`}
        >
          {result}
        </motion.div>
        
        {isValid && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-['Inter'] text-[10px] tracking-widest text-black dark:text-white uppercase mt-4"
          >
            Your Pynch Size
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default FitGuide;
