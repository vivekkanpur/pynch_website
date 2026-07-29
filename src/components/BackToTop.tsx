import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-[var(--theme-text)] text-[var(--theme-bg)] flex items-center justify-center shadow-lg hover:bg-[var(--theme-teal)] transition-colors duration-300 group"
          aria-label="Back to top"
          id="back-to-top-btn"
        >
          <ChevronUp 
            size={20} 
            strokeWidth={1.5} 
            className="transition-transform duration-300 group-hover:-translate-y-0.5" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
