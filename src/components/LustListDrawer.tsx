import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface LustListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lustItems: Product[];
  onRemoveItem: (product: Product) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
}

export default function LustListDrawer({
  isOpen,
  onClose,
  lustItems,
  onRemoveItem,
  onQuickAdd,
}: LustListDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 no-radius">
        <div className="p-6 border-b border-[#E8E3DB] flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="font-sans text-xl tracking-[0.1em] text-[#111111] uppercase font-light">
              Lust List
            </h2>
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mt-1">
              {lustItems.length} {lustItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors focus:outline-none">
            <X className="w-5 h-5 stroke-[1]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {lustItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-gray-200 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50 85 C 50 85, 15 55, 15 30 C 15 10, 40 10, 50 30 C 60 10, 85 10, 85 30 C 85 55, 50 85, 50 85 Z" />
              </svg>
              <div>
                <p className="font-sans font-light text-sm text-gray-600 italic">Your lust list is empty.</p>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mt-2">
                  Find pieces that move you.
                </p>
              </div>
              <button
                onClick={onClose}
                className="border border-[#111111] text-[#111111] text-[11px] font-sans tracking-[0.2em] uppercase px-6 py-4 hover:bg-gray-50 transition-colors no-radius mt-4"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            lustItems.map((item, index) => {
              const activeColor = item.colors[0];
              const primaryImage = activeColor?.images[0] || '';
              
              return (
                <div key={`${item.id}-${index}`} className="flex gap-4 border-b border-[#E8E3DB] pb-6 last:border-0 last:pb-0">
                  <div className="w-24 aspect-[3/4] bg-[#F4F0EA] overflow-hidden shrink-0">
                    <img src={primaryImage} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans font-light text-sm tracking-[0.1em] uppercase text-[#111111]">
                          {item.name}
                        </h4>
                        <span className="font-sans font-light text-sm text-gray-900">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-[10px] font-sans text-gray-400 uppercase tracking-[0.1em]">
                        {activeColor?.name || ''}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => onQuickAdd(item, activeColor.name, item.sizes[0])}
                        className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#111111] flex items-center gap-2 hover:opacity-70 transition-opacity"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[1]" />
                        Move to Bag
                      </button>

                      <button
                        onClick={() => onRemoveItem(item)}
                        className="text-gray-400 hover:text-[#111111] transition-colors focus:outline-none p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
