import React from 'react';

export interface CategoryItem {
  id: string;
  label: string;
  image: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CategoryGrid = React.memo(({ categories, selectedId, onSelect }: CategoryGridProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4 mb-4 hide-scrollbar">
      <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-max px-4 sm:px-8 justify-center">
        {categories.map((cat) => {
          const isSelected = selectedId === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex flex-col items-center gap-4 cursor-pointer group w-40 sm:w-48 md:w-58 shrink-0"
            >
              <div className={`w-full aspect-[4/5] bg-[#E8EAEB] overflow-hidden isolate z-0 transition-all duration-300 ${isSelected ? 'ring-1 ring-[var(--theme-teal)] ring-offset-4 ring-offset-[var(--theme-bg)]' : ''}`}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover object-top mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className={`font-serif text-xs sm:text-sm tracking-widest transition-all duration-300 ${isSelected
                  ? 'text-[var(--theme-teal)] border-b border-[var(--theme-teal)] pb-2'
                  : 'text-[var(--theme-text)] opacity-70 group-hover:opacity-100 border-b border-transparent pb-2'
                }`}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
