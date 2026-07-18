import React, { useRef, useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { MoodsSection } from "../components/MoodsSection";
import { TogglableMoods } from "../components/TogglableMoods";
import { CustomerReviews } from "../components/CustomerReviews";
import { motion, useMotionValue, animate } from "motion/react";
import { useShopifyProducts } from "../hooks/useShopifyProducts";
import separatorImage from "../data/images/img01.webp";
import { MOCK_PRODUCTS } from "../data/mockProducts";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const sliderVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function LandingView({
  onViewChange,
  onSelectProduct,
  lustListItems = [],
  onToggleLust,
  onQuickAdd,
}: {
  onViewChange: (view: any) => void;
  onSelectProduct: (product: any) => void;
  lustListItems?: any[];
  onToggleLust?: (product: any) => void;
  onQuickAdd: (product: any, colorName: string, size: string) => void;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [bestSellersWidth, setBestSellersWidth] = useState(0);
  const x = useMotionValue(0);
  const xBest = useMotionValue(0);

  const { products, loading, error } = useShopifyProducts();
  const featuredProducts = products.slice(0, 12);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    if (bestSellersRef.current) {
      setBestSellersWidth(bestSellersRef.current.scrollWidth - bestSellersRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (carouselRef.current) setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      if (bestSellersRef.current) setBestSellersWidth(bestSellersRef.current.scrollWidth - bestSellersRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  const handleScrollLeft = () => {
    const currentX = x.get();
    animate(x, Math.min(currentX + 400, 0), { type: "tween", duration: 0.5, ease: "easeInOut" });
  };

  const handleScrollRight = () => {
    const currentX = x.get();
    animate(x, Math.max(currentX - 400, -width), { type: "tween", duration: 0.5, ease: "easeInOut" });
  };

  const handleBestScrollLeft = () => {
    const currentX = xBest.get();
    animate(xBest, Math.min(currentX + 400, 0), { type: "tween", duration: 0.5, ease: "easeInOut" });
  };

  const handleBestScrollRight = () => {
    const currentX = xBest.get();
    animate(xBest, Math.max(currentX - 400, -bestSellersWidth), { type: "tween", duration: 0.5, ease: "easeInOut" });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-[var(--theme-bg)]"
    >
      {/* HERO SECTION (TOGGLABLE MOODS) */}
      <TogglableMoods />

      {/* HORIZONTAL SCROLLING MARQUEE */}
      <section className="w-full overflow-hidden bg-[var(--theme-bg)] py-6 flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="font-serif italic text-2xl text-[var(--theme-text)] mx-6">dress the person, not the performance</span>
              <span className="text-[var(--theme-teal)] text-sm mx-6">✦</span>
              <span className="font-sans font-light tracking-widest text-sm text-[var(--theme-text)] uppercase mx-6">New Collection Arrived</span>
              <span className="text-[var(--theme-teal)] text-sm mx-6">✦</span>
              <span className="font-serif italic text-2xl text-[var(--theme-text)] mx-6">luxury intimates</span>
              <span className="text-[var(--theme-teal)] text-sm mx-6">✦</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURED CAROUSEL MODULAR */}
      <motion.section
        variants={sliderVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-[var(--theme-bg)] py-16 px-4 sm:px-8 overflow-hidden"
      >
        <div className="mb-12 flex justify-between items-end">
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-[var(--theme-teal)] uppercase tracking-[0.1em]">
            Just a Pynch
          </h2>
          <div className="flex gap-4">
            <button onClick={handleScrollLeft} className="w-12 h-12 border border-[var(--theme-border)] rounded-full flex items-center justify-center text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button onClick={handleScrollRight} className="w-12 h-12 border border-[var(--theme-border)] rounded-full flex items-center justify-center text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Horizontal drag container */}
        <motion.div
          ref={carouselRef}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-8"
        >
          <motion.div
            drag="x"
            style={{ x }}
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8 w-max"
          >
            {loading ? (
              <div className="flex justify-center items-center w-[85vw] sm:w-[45vw] md:w-[25vw] h-[60vh] text-[var(--theme-olive)] font-sans text-sm tracking-widest uppercase">
                Loading...
              </div>
            ) : error ? (
              <div className="flex justify-center items-center w-[85vw] sm:w-[45vw] md:w-[25vw] h-[60vh] text-red-500 font-sans text-sm tracking-widest uppercase">
                {error}
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="flex justify-center items-center w-[85vw] sm:w-[45vw] md:w-[25vw] h-[60vh] text-[var(--theme-text)] opacity-50 font-sans text-sm tracking-widest uppercase">
                No pieces found.
              </div>
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="w-[85vw] sm:w-[45vw] md:w-[25vw] shrink-0 pointer-events-auto">
                  <ProductCard
                    product={product as any}
                    onClick={onSelectProduct}
                    onQuickAdd={onQuickAdd}
                    isLusted={lustListItems?.some((p: any) => p.id === product.id)}
                    onToggleLust={onToggleLust}
                  />
                </div>
              ))
            )}
            {/* Final Slide: SHOP MORE */}
            <div
              className="w-[85vw] sm:w-[45vw] md:w-[25vw] shrink-0 relative aspect-[2/3] group bg-[#1A1A1A] flex items-center justify-center overflow-hidden border border-[var(--theme-border)] pointer-events-auto cursor-pointer"
              onClick={() => onViewChange("shop")}
            >
              <img
                src={MOCK_PRODUCTS[0].colors[0].images[0]}
                alt="Shop More"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
              />
              <h3 className="relative z-10 font-serif text-4xl text-white font-light tracking-widest group-hover:scale-110 transition-transform duration-700 uppercase pointer-events-none">
                Shop More
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* THE SEPARATOR / IMAGE PLACEHOLDER */}
      <section className="w-full flex justify-center items-center bg-[var(--theme-bg)] min-h-[50vh] sm:min-h-[70vh] overflow-hidden">
        <img src={separatorImage} alt="PYNCH Separator" className="w-full h-full object-cover" />
      </section>

      {/* BEST SELLERS GRID */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-[var(--theme-bg)] py-16 px-4 sm:px-8 overflow-hidden"
      >
        <div className="mb-12 border-b border-[var(--theme-border)] pb-6 flex justify-between items-end">
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-[var(--theme-teal)] uppercase tracking-[0.1em]">
            Best Sellers
          </h2>
          <div className="flex gap-4">
            <button onClick={handleBestScrollLeft} className="w-10 h-10 border border-[var(--theme-border)] rounded-full flex items-center justify-center text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button onClick={handleBestScrollRight} className="w-10 h-10 border border-[var(--theme-border)] rounded-full flex items-center justify-center text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <motion.div
          ref={bestSellersRef}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-4"
        >
          <motion.div
            drag="x"
            style={{ x: xBest }}
            dragConstraints={{ right: 0, left: -bestSellersWidth }}
            className="flex gap-4 w-max"
          >
            {featuredProducts.slice(0, 12).map((product) => (
              <div key={product.id} className="w-[85vw] sm:w-[45vw] md:w-[25vw] shrink-0 pointer-events-auto">
                <ProductCard
                  product={product as any}
                  onClick={onSelectProduct}
                  onQuickAdd={onQuickAdd}
                  isLusted={lustListItems?.some(p => p.id === product.id)}
                  onToggleLust={onToggleLust}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* MOODS SECTION */}
      <MoodsSection />


      {/* CUSTOMER REVIEWS */}
      <CustomerReviews />
    </motion.div>
  );
}
