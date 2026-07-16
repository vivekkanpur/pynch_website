import React from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "../types";
import { useShopifyProducts } from "../hooks/useShopifyProducts";

interface ProductGridProps {
  onSelectProduct?: (product: Product) => void;
  onQuickAdd?: (product: Product, colorName: string, size: string) => void;
  lustListItems?: any[];
  onToggleLust?: (product: any) => void;
}

export function ProductGrid({ onSelectProduct, onQuickAdd, lustListItems, onToggleLust }: ProductGridProps) {
  const { products, loading, error } = useShopifyProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="w-full bg-[#1A1A1A]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center text-[var(--theme-olive)] font-sans uppercase tracking-widest text-sm">
            Loading products...
          </div>
        ) : error ? (
          <div className="col-span-full h-32 flex items-center justify-center text-red-500 font-sans uppercase tracking-widest text-sm">
            {error}
          </div>
        ) : (
          featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product as any} 
              onClick={onSelectProduct || (() => {})} 
              onQuickAdd={onQuickAdd || (() => {})}
              isLusted={lustListItems?.some((p: any) => p.id === product.id)}
              onToggleLust={onToggleLust}
            />
          ))
        )}
      </div>
    </section>
  );
}
