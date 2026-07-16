import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import imgAarambh from "../data/images/models/mood_lingerie_seductress.webp";
import imgIshq from "../data/images/models/mood_lingerie_romantic.webp";
import imgShararat from "../data/images/models/mood_lingerie_playful.webp";
import imgSukoon from "../data/images/models/mood_lingerie_comfy.webp";

const MOODS = [
  {
    id: "Aarambh",
    title: "AARAMBH",
    subtitle: "the seductress",
    img: imgAarambh,
  },
  {
    id: "Ishq",
    title: "ISHQ",
    subtitle: "the romantic",
    img: imgIshq,
  },
  {
    id: "Shararat",
    title: "SHARARAT",
    subtitle: "always playful",
    img: imgShararat,
  },
  {
    id: "Sukoon",
    title: "SUKOON",
    subtitle: "the comfy aesthetic",
    img: imgSukoon,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const MARQUEE_MOODS = [...MOODS, ...MOODS, ...MOODS, ...MOODS];

export function MoodsSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[var(--theme-bg)] py-16 overflow-hidden">
      <div className="mb-12 flex justify-center text-center">
        <h2 className="font-serif font-light text-3xl sm:text-4xl text-[var(--theme-teal)] uppercase tracking-[0.1em]">
          Moods
        </h2>
      </div>
      <div className="w-full relative flex items-center">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 120, 
            ease: "linear", 
            repeat: Infinity 
          }}
          className="flex gap-6 w-max px-6"
        >
          {MARQUEE_MOODS.map((mood, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/collections', { state: { selectedMood: mood.id } })}
              className="group relative w-[90vw] sm:w-[50vw] md:w-[45vw] xl:w-[35vw] shrink-0 h-[80vh] sm:h-[90vh] overflow-hidden no-radius cursor-pointer"
            >
              <img
                src={mood.img}
                alt={mood.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              {/* Deep teal overlay */}
              <div className="absolute inset-0 bg-[#08514C]/30 mix-blend-multiply group-hover:bg-[#08514C]/50 transition-colors duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-center justify-end text-white z-10 transition-transform duration-500 transform group-hover:-translate-y-4">
                <span className="font-sans text-[18px] sm:text-[22px] font-light tracking-wider mb-3 opacity-90 lowercase">
                  {mood.subtitle}
                </span>
                <h2 className="font-serif text-[36px] lg:text-[44px] font-light tracking-widest uppercase leading-none text-center">
                  {mood.title}
                </h2>
              </div>

              {/* Shop Now Button (Appears on hover) */}
              <div className="absolute bottom-0 inset-x-0 bg-[var(--theme-lime)] text-[#1A1A1A] py-5 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                <span className="font-sans text-[11px] uppercase tracking-[0.4em] font-medium">
                  Shop Now
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
