import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mood01 from "../data/images/Mood01.webp";
import mood02 from "../data/images/Mood02.webp";
import mood03 from "../data/images/Mood03.webp";
import mood04 from "../data/images/Mood04.webp";

const MOODS_DATA = [
  {
    id: "seductress",
    categoryId: "Aarambh",
    label: "Seductress",
    title: "AARAMBH",
    img: mood01,
  },
  {
    id: "romantic",
    categoryId: "Ishq",
    label: "Romantic",
    title: "ISHQ",
    img: mood02,
  },
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
];

export function TogglableMoods() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MOODS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MOODS_DATA.length) % MOODS_DATA.length);
  };

  return (
    <section className="relative w-full h-[90vh] sm:h-screen bg-[#1A1A1A] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={MOODS_DATA[activeIndex].img}
            alt={MOODS_DATA[activeIndex].title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to make text more readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          
          <div className="absolute top-8 sm:top-16 left-8 sm:left-16 text-left text-white z-10">
             <h2 className="font-[var(--font-playfair)] text-6xl sm:text-7xl lg:text-8xl font-medium tracking-wider uppercase leading-none drop-shadow-lg">
                {MOODS_DATA[activeIndex].title}
             </h2>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 sm:left-8 flex items-center z-20">
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft size={36} strokeWidth={1} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 sm:right-8 flex items-center z-20">
        <button
          onClick={handleNext}
          className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight size={36} strokeWidth={1} />
        </button>
      </div>

      {/* Mood Selectors (Bottom Left) */}
      <div className="absolute bottom-8 sm:bottom-16 left-8 sm:left-16 z-30 flex flex-col gap-2">
        {MOODS_DATA.map((mood, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={mood.id}
              onClick={() => setActiveIndex(idx)}
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

      {/* Optional: "Get the look" or Shop button bottom right */}
      <div className="absolute bottom-8 sm:bottom-16 right-8 sm:right-16 z-30">
        <button 
          onClick={() => navigate('/collections', { state: { selectedMood: MOODS_DATA[activeIndex].categoryId } })}
          className="bg-[var(--theme-lime)] text-[#1A1A1A] px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors"
        >
          Get The Look
        </button>
      </div>
    </section>
  );
}
