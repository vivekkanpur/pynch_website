import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { CategoryGrid, CategoryItem } from '../components/CategoryGrid';
import accessoriesImg from '../data/images/filters/Accessories.webp';
import attireImg from '../data/images/filters/Attire.webp';
import bodysuitsImg from '../data/images/filters/bodysuits.webp';
import braImg from '../data/images/filters/Bra.webp';
import corsetImg from '../data/images/filters/corset.webp';
import pantiesImg from '../data/images/filters/panties.webp';

interface ShopViewProps {
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

export default function ShopView({ onSelectProduct, onQuickAdd, lustListItems = [], onToggleLust }: ShopViewProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const { products, loading, error } = useShopifyProducts();

  const filteredProducts = products.filter(
    (product) => !filter || product.category === filter.toLowerCase()
  );

  const categoryItems: CategoryItem[] = [
    { id: 'Bras', label: 'Bras', image: braImg },
    { id: 'Panties', label: 'Panties', image: pantiesImg },
    { id: 'Bodysuits', label: 'Bodysuits', image: bodysuitsImg },
    { id: 'Corsets', label: 'Corsets', image: corsetImg },
    { id: 'Attire', label: 'Attire', image: attireImg },
    { id: 'Accessories', label: 'Accessories', image: accessoriesImg }
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-[var(--theme-bg)] pt-24 sm:pt-32 min-h-screen"
    >
      {/* Visual Category Control Bar */}
      <div className="w-full mt-8 mb-12 sm:mb-20">
        <CategoryGrid 
          categories={categoryItems}
          selectedId={filter || ''}
          onSelect={(id) => setFilter(filter === id ? null : id)}
        />
      </div>

      {/* Product Grid */}
      <div className="w-auto my-8 mx-8">
        {loading ? (
          <div className="flex justify-center items-center h-64 text-[var(--theme-olive)] font-sans text-sm tracking-widest uppercase">
            Loading Studio Selection...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500 font-sans text-sm tracking-widest uppercase">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-[var(--theme-text)] opacity-50 font-sans text-sm tracking-widest uppercase">
            No pieces found.
          </div>
        ) : (
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full auto-rows-max"
          >
            {filteredProducts.map((prod) => (
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

      {/* Campaign Footer Blocks */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-8 mx-8"
      >
        <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer border border-[var(--theme-border)] p-4 bg-[var(--theme-bg)]">
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1652715256284-6cba3e829a70?q=80&w=774&auto=format&fit=crop" 
              alt="Campaign Image 1"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light uppercase tracking-widest">
                forever the <span className="italic">SEDUCTRESS</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer border border-[var(--theme-border)] p-4 bg-[var(--theme-bg)]">
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1652859921634-d30457cb9695?q=80&w=774&auto=format&fit=crop" 
              alt="Campaign Image 2"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light uppercase tracking-widest">
                a little <span className="italic">PLAYFUL</span>
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
