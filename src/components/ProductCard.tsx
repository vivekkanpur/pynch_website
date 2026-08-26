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
  hidden:  { opacity: 0, y: 36 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export function ProductCard({
  product,
  onClick,
  onQuickAdd,
  isLusted,
  onToggleLust,
  priority = false,
}: ProductCardProps) {
  const navigate = useNavigate();
  const activeColor = product.colors[0];
  const primaryImage   = activeColor.images[0] || "";
  const secondaryImage = activeColor.images[1] || primaryImage;

  return (
    <motion.div
      variants={itemVariants}
      className="product-card group relative w-full h-full bg-[var(--theme-bg)] flex flex-col cursor-pointer"
      onClick={() => onClick(product)}
      style={{
        border: '1px solid var(--theme-border)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
    >
      {/* Image container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden isolate z-0">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{ transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        />

        {/* Secondary Image — crossfade on hover */}
        <img
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          decoding="async"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', transform: 'scale(1.04)' }}
        />

        {/* Tagline badge */}
        {product.tagline && (
          <div className="absolute top-3 left-3 bg-[var(--theme-lime)] text-[var(--theme-text)] text-[9px] uppercase font-sans tracking-[0.28em] px-3 py-1 font-medium z-10 pointer-events-none">
            {product.tagline}
          </div>
        )}

        {/* Heart / Lust button */}
        <button
          onClick={(e) => { e.stopPropagation(); if (onToggleLust) onToggleLust(product); }}
          className="absolute top-3 right-3 z-10 pointer-events-auto"
          style={{ opacity: isLusted ? 1 : 0.55, transition: 'opacity 0.3s ease, transform 0.3s ease' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = isLusted ? '1' : '0.55')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={isLusted ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round"
            className="text-[var(--theme-text)]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Join Waitlist — premium slide-up */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate('/waitlist'); }}
          className="absolute inset-x-0 bottom-0 z-20 pointer-events-auto flex items-center justify-center gap-2 bg-[var(--theme-text)] text-[var(--theme-bg)] text-[9px] font-sans tracking-[0.3em] uppercase py-4"
          style={{
            transform: 'translateY(100%)',
            opacity: 0,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--theme-teal)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--theme-text)';
          }}
          ref={el => {
            if (!el) return;
            const parent = el.closest('.group');
            if (!parent) return;
            parent.addEventListener('mouseenter', () => {
              el.style.transform = 'translateY(0)';
              el.style.opacity = '1';
            });
            parent.addEventListener('mouseleave', () => {
              el.style.transform = 'translateY(100%)';
              el.style.opacity = '0';
            });
          }}
        >
          Join Waitlist
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Card info */}
      <div className="flex flex-col items-start justify-start pt-4 px-4 pb-5 flex-grow">
        <h3
          className="font-serif italic text-[20px] tracking-wide text-[var(--theme-text)] font-light mb-3 line-clamp-2"
          style={{ lineHeight: '1.35', minHeight: '3.2rem' }}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between w-full mt-auto">
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase font-medium text-[var(--theme-teal)]">
            ₹{product.price}
          </p>
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[var(--theme-text)] opacity-35">
            {product.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

