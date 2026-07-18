import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SizeGuideView from '../views/SizeGuideView';

interface SizeGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideDrawer({ isOpen, onClose }: SizeGuideDrawerProps) {
  // Prevent scrolling on body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            data-lenis-prevent="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 no-radius"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E8E3DB] flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="font-sans text-xl tracking-[0.1em] text-[#111111] uppercase font-light">
                  Sizing & Comfort Guide
                </h2>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mt-1">
                  Find your true fitting
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors focus:outline-none">
                <X className="w-5 h-5 stroke-[1]" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 bg-[#F4F0EA]" data-lenis-prevent="true">
              <SizeGuideView isDrawer={true} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
