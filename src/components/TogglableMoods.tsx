import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mood01 from "../data/images/hf_20260717_060736_71c8edad-d77a-42bc-b4e9-d916adaa1823.png";
import mood02 from "../data/images/romantic_indian_16x9_4k.png";
import mood03 from "../data/images/Mood03.webp";
import mood04 from "../data/images/Mood04.webp";

const MOODS_DATA = [
  {
    id: "comfy",
    categoryId: "Sukoon",
    label: "Comfy",
    title: "SUKOON",
    img: mood03,
  },
  {
    id: "playful",
    categoryId: "Shararat",
    label: "Playful",
    title: "SHARARAT",
    img: mood04,
  },
  {
    id: "romantic",
    categoryId: "Ishq",
    label: "Romantic",
    title: "ISHQ",
    img: mood02,
  },
  {
    id: "seductress",
    categoryId: "Aarambh",
    label: "Seductress",
    title: "AARAMBH",
    img: mood01,
  },
];

export function TogglableMoods() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const handleNext = useCallback((manual = false) => {
    if (manual) setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % MOODS_DATA.length);
  }, []);

  const handlePrev = useCallback((manual = false) => {
    if (manual) setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + MOODS_DATA.length) % MOODS_DATA.length);
  }, []);

  const handleSelectMood = useCallback((idx: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(idx);
  }, []);

  // Auto-loop every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext(false);
    }, 8000);
    return () => clearInterval(timer);
  }, [handleNext, isAutoPlaying, activeIndex]);

  return (
    <section className="relative w-full h-[85vh] md:h-auto md:aspect-video bg-[#1A1A1A] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={MOODS_DATA[activeIndex].img}
            alt={MOODS_DATA[activeIndex].title}
            className={`w-full h-full object-cover ${
              MOODS_DATA[activeIndex].id === "seductress" 
                ? "object-[75%_center] md:object-center" 
                : "object-center"
            } ${
              MOODS_DATA[activeIndex].id === "romantic"
                ? "scale-[1.20] md:scale-100"
                : "scale-100"
            }`}
          />
          {/* Subtle gradient overlay to make text more readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          
          <div className="absolute top-8 sm:top-16 left-8 sm:left-16 text-left text-white z-20 max-w-md">
             <h2 className="font-[var(--font-playfair)] text-5xl sm:text-6xl font-medium tracking-wider uppercase leading-none drop-shadow-lg">
                {MOODS_DATA[activeIndex].title}
             </h2>
          </div>

          {/* Centered Main Hero Element */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 pointer-events-none px-4">
             <h1 className="font-serif italic text-6xl sm:text-8xl lg:text-[8rem] xl:text-[10rem] tracking-wide drop-shadow-2xl mb-4 sm:mb-6 leading-none">
               Sensual Honesty
             </h1>
             <p className="font-sans text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0.4em] uppercase opacity-90 drop-shadow-xl max-w-3xl mt-2 sm:mt-4">
               Dress the person, not the performance
             </p>
             <p className="font-sans text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0.4em] uppercase opacity-90 drop-shadow-xl max-w-3xl mt-2">
               WEAR YOUR MOOD
             </p>
             <button 
               onClick={() => navigate('/collections', { state: { selectedMood: 'All Moods' } })}
               className="pointer-events-auto mt-8 sm:mt-16 border border-white/50 bg-black/20 backdrop-blur-sm px-6 py-4 sm:px-10 sm:py-5 text-white font-sans text-[10px] sm:text-sm uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300"
             >
               Explore Collection
             </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 sm:left-8 flex items-center z-20">
        <button
          onClick={() => handlePrev(true)}
          className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft size={36} strokeWidth={1} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 sm:right-8 flex items-center z-20">
        <button
          onClick={() => handleNext(true)}
          className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight size={36} strokeWidth={1} />
        </button>
      </div>

      {/* Mood Selectors (Bottom Left) */}
      <div className="absolute bottom-6 sm:bottom-16 left-4 sm:left-16 z-30 flex flex-col gap-1 sm:gap-2">
        {MOODS_DATA.map((mood, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={mood.id}
              onClick={() => handleSelectMood(idx)}
              className={`text-left font-serif text-xl sm:text-2xl transition-all duration-300 ${
                isActive
                  ? "text-[var(--theme-lime)] italic ml-4"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isActive ? `+ ${mood.label}` : mood.label}
            </button>
          );
        })}
      </div>



      {/* Join the waitlist button bottom right */}
      <div className="absolute bottom-6 sm:bottom-16 right-4 sm:right-16 z-30">
        <button 
          onClick={() => navigate('/waitlist')}
          className="bg-[var(--theme-lime)] text-[#1A1A1A] px-4 py-2 sm:px-6 sm:py-3 font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors"
        >
          Join Waitlist
        </button>
      </div>
    </section>
  );
}
