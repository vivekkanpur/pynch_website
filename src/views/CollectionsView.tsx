import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { CategoryGrid, CategoryItem } from '../components/CategoryGrid';

interface CollectionsViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
  lustListItems?: Product[];
  onToggleLust?: (product: Product) => void;
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
import allMoodsImg from '../data/images/models/all_moods.gif';
import moodAarambhImg from '../data/images/models/mood_lingerie_seductress.webp';
import moodIshqImg from '../data/images/models/mood_lingerie_romantic.webp';
import moodSukoonImg from '../data/images/models/mood_lingerie_comfy.webp';
import moodShararatImg from '../data/images/models/mood_lingerie_playful.webp';

import laceEditImg from '../data/images/models/Models New/Seductress/String You Along Low Rise Lace Thong/hf_20260713_163158_2283bfb8-5a8e-40b3-bc09-15fb1d4de7d8.webp';
import silkEditImg from '../data/images/models/Models New/Romantic/Forever Yours Lightly Lined Demi Bra/ECOM_PR_SY-SB-10016_DWM_FRONT_SHOT01_2x3_2O2MM.webp';

export default function CollectionsView({ onSelectProduct, onQuickAdd, lustListItems, onToggleLust }: CollectionsViewProps) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    location.state?.selectedMood || 'All Moods'
  );
  const { products, loading, error } = useShopifyProducts();
  
  const collectionProducts = products.filter(
    (product) => selectedCategory === 'All Moods' || product.mood === selectedCategory
  );

  const categoryItems: CategoryItem[] = [
    { id: 'All Moods', label: 'ALL MOODS', image: allMoodsImg },
    { id: 'Sukoon', label: 'SUKOON (Comfy)', image: moodSukoonImg },
    { id: 'Shararat', label: 'SHARARAT (Playful)', image: moodShararatImg },
    { id: 'Ishq', label: 'ISHQ (Romantic)', image: moodIshqImg },
    { id: 'Aarambh', label: 'AARAMBH (Seductress)', image: moodAarambhImg }
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-[var(--theme-bg)] pt-24 sm:pt-32 min-h-screen"
    >
      {/* Visual Mood Category Control Bar */}
      <div className="w-full mt-8 mb-12 sm:mb-20">
        <CategoryGrid 
          categories={categoryItems}
          selectedId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id)}
        />
      </div>

      {/* Product Grid */}
      <div className="w-auto my-8 mx-8">
        {loading ? (
          <div className="flex justify-center items-center h-64 text-[var(--theme-olive)] font-sans text-sm tracking-widest uppercase">
            Loading products...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500 font-sans text-sm tracking-widest uppercase">
            {error}
          </div>
        ) : collectionProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-[var(--theme-text)] opacity-50 font-sans text-sm tracking-widest uppercase">
            No pieces found.
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 sm:gap-y-16"
          >
            {collectionProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onClick={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isLusted={lustListItems?.some(p => p.id === prod.id)}
                onToggleLust={onToggleLust}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Collection Footer Banners */}
      <motion.div 
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-8 mx-8"
      >
        <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer border border-[var(--theme-border)] p-4 bg-[var(--theme-bg)]">
          <div className="relative w-full h-full overflow-hidden isolate z-0">
            <img 
              src={laceEditImg}
              alt="Collection Image 1"
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light uppercase tracking-widest">
                the <span className="italic">LACE</span> edit
              </h3>
            </div>
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer border border-[var(--theme-border)] p-4 bg-[var(--theme-bg)]">
          <div className="relative w-full h-full overflow-hidden isolate z-0">
            <img 
              src={silkEditImg}
              alt="Collection Image 2"
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light uppercase tracking-widest">
                everyday <span className="italic">SILK</span>
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

