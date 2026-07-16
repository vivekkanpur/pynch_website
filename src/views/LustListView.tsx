import React from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface LustListViewProps {
  lustListItems: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleLust: (product: Product) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function LustListView({
  lustListItems,
  onSelectProduct,
  onToggleLust,
  onQuickAdd,
}: LustListViewProps) {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-[var(--theme-bg)] pt-24 sm:pt-32 min-h-screen pb-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] font-light uppercase tracking-widest mb-4">
            Lust List
          </h1>
          <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-500">
            {lustListItems.length} {lustListItems.length === 1 ? 'Piece' : 'Pieces'} Saved
          </p>
        </div>

        {lustListItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-[#E8E3DB] bg-white">
            <svg viewBox="0 0 100 100" className="w-16 h-16 stroke-gray-200 fill-none mb-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 50 85 C 50 85, 15 55, 15 30 C 15 10, 40 10, 50 30 C 60 10, 85 10, 85 30 C 85 55, 50 85, 50 85 Z" />
            </svg>
            <h3 className="font-sans text-lg text-[#111111] uppercase tracking-[0.1em] font-light mb-2">
              Your lust list is empty
            </h3>
            <p className="font-sans text-xs text-gray-500 tracking-[0.1em] mb-8">
              Discover pieces that speak to you.
            </p>
            <Link
              to="/shop"
              className="bg-[#111111] text-white px-8 py-4 font-sans text-[10px] uppercase tracking-[0.3em] hover:bg-[#111111]/80 transition-colors"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full"
          >
            {lustListItems.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onClick={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isLusted={true}
                onToggleLust={onToggleLust}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
