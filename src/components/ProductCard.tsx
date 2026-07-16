import React from "react";
import { Product } from "../types";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
  priority?: boolean;
  isLusted?: boolean;
  onToggleLust?: (product: Product) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function ProductCard({
  product,
  onClick,
  onQuickAdd,
  isLusted,
  onToggleLust,
}: ProductCardProps) {
  const navigate = useNavigate();
  const activeColor = product.colors[0];
  const primaryImage = activeColor.images[0] || "";
  const secondaryImage = activeColor.images[1] || primaryImage;

  return (
    <motion.div
      variants={itemVariants}
      className="product-card group relative w-full border border-[var(--theme-border)] p-4 bg-[var(--theme-bg)] flex flex-col"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden isolate z-0 mb-4">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1500ms] ease-out opacity-100 group-hover:opacity-0 group-hover:scale-105 pointer-events-none"
        />

        {/* Secondary Image */}
        <img
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1500ms] ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105 scale-100 pointer-events-none"
        />

        {/* Top Left Badge */}
        {product.tagline && (
          <div className="absolute top-4 left-4 bg-[var(--theme-lime)] text-[#1A1A1A] text-[10px] uppercase font-sans tracking-[0.25em] px-3 py-1 no-radius font-medium z-10 pointer-events-none">
            {product.tagline}
          </div>
        )}

        {/* Top Right Heart */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleLust) onToggleLust(product);
          }}
          className="absolute top-4 right-4 z-10 text-[var(--theme-text)] opacity-60 hover:opacity-100 transition-opacity pointer-events-auto"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isLusted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Quick Add Button */}
        {/*
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product, activeColor.name, product.sizes[0]);
          }}
          className="absolute bottom-4 right-4 bg-[var(--theme-bg)] border border-[var(--theme-text)] text-[var(--theme-text)] text-[10px] tracking-[0.25em] uppercase px-4 py-2 flex items-center justify-center no-radius translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[400ms] cubic-bezier(0.25, 1, 0.5, 1) z-20 hover:bg-[var(--theme-lime)] hover:border-[var(--theme-lime)] hover:text-[#1A1A1A] pointer-events-auto"
        >
          Quick Add
        </button>
        */}
        
        {/* Waitlist Mode Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/waitlist');
          }}
          className="absolute bottom-4 right-4 bg-[var(--theme-bg)] border border-[var(--theme-text)] text-[var(--theme-text)] text-[10px] tracking-[0.25em] uppercase px-4 py-2 flex items-center justify-center no-radius translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[400ms] cubic-bezier(0.25, 1, 0.5, 1) z-20 hover:bg-[var(--theme-lime)] hover:border-[var(--theme-lime)] hover:text-[#1A1A1A] pointer-events-auto"
        >
          Join Waitlist
        </button>
      </div>

      {/* Bottom Information */}
      <div className="flex flex-col items-start justify-start pointer-events-none mt-2">
        <h3 className="font-[var(--font-playfair)] italic text-[22px] tracking-wide text-[var(--theme-text)] font-light mb-1">
          {product.name}
        </h3>
        <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--theme-text)] font-medium">
          ₹{product.price}
        </p>
      </div>
    </motion.div>
  );
}
