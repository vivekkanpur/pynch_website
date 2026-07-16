import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WaitlistForm } from '../components/WaitlistForm';

import imgAarambh from '../data/images/models/mood_lingerie_seductress.webp';
import imgIshq from '../data/images/models/mood_lingerie_romantic.webp';
import imgShararat from '../data/images/models/mood_lingerie_playful.webp';
import imgSukoon from '../data/images/models/mood_lingerie_comfy.webp';

const moodImages = [
  { id: 'Aarambh', src: imgAarambh },
  { id: 'Ishq', src: imgIshq },
  { id: 'Shararat', src: imgShararat },
  { id: 'Sukoon', src: imgSukoon },
];

export default function WaitlistView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Loop images every 6 seconds (4x the fade duration)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % moodImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[var(--theme-bg)] flex flex-col lg:flex-row h-full lg:min-h-[calc(100vh-140px)]">
      
      {/* Left Side - Looping Images */}
      <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-0 flex-grow overflow-hidden order-1 lg:order-none">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={moodImages[currentIndex].src} 
              alt={moodImages[currentIndex].id} 
              className="w-full h-full object-cover"
            />
            {/* Elegant dark gradient overlay for text readability if needed */}
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* Optional Mood Label on top of image */}
        <div className="absolute bottom-8 left-8 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-80 mb-2">Current Mood</p>
              <p className="font-serif text-4xl sm:text-5xl font-light tracking-wide drop-shadow-md">
                {moodImages[currentIndex].id}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16 order-2 lg:order-none relative">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-[600px]"
        >
          <WaitlistForm />
        </motion.div>
      </div>

    </div>
  );
}
