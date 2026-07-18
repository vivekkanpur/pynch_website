import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/firebase";

import logoImage from "../data/images/logo/Pynch Logo - Copy.png";
import { MOCK_PRODUCTS } from "../data/mockProducts";

// Product & Mood Images for Mega Menus
import imgCorset from "../data/images/products/model_black_corset.webp";
import imgBalconette from "../data/images/products/model_lace_balconette.webp";
import imgBralette from "../data/images/products/prod_tascher_bralette.webp";
import imgSeductress from "../data/images/models/mood_lingerie_seductress.webp";
import imgRomantic from "../data/images/models/mood_lingerie_romantic.webp";
import imgPlayful from "../data/images/models/mood_lingerie_playful.webp";
import imgComfy from "../data/images/models/mood_lingerie_comfy.webp";
import imgOurWorld from "../data/images/models/Models New/Comphy/Nap Time Mid Rise Bikini/Syrn_DanielDerro8088.webp";

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
  onLustListClick: () => void;
  lustListItemCount: number;
}

export function Header({ onCartClick, cartItemCount, onLustListClick, lustListItemCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full bg-[var(--theme-bg)] border-b border-[var(--theme-border)] transition-all duration-400 ease-in-out group/header"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Announcement Bar */}
      <div className="bg-[var(--theme-text)] text-[var(--theme-bg)] py-2 text-center text-[10px] font-sans uppercase tracking-[0.4em] font-light">
        Complimentary organic sandalwood scenting on all orders
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Left: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 flex-1 h-full">
            <Link
              to="/waitlist"
              className="text-[10px] font-sans uppercase tracking-[0.4em] text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors font-light link-underline pb-1"
              onMouseEnter={() => setActiveMenu(null)}
            >
              Waitlist
            </Link>
            
            {/* Shop Trigger */}
            <div 
              className="h-full flex items-center cursor-pointer"
              onMouseEnter={() => setActiveMenu('shop')}
            >
              <span onClick={() => navigate('/shop')} className="text-[10px] font-sans uppercase tracking-[0.4em] text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors font-light link-underline pb-1">
                Shop
              </span>
            </div>

            {/* Collections Trigger */}
            <div 
              className="h-full flex items-center cursor-pointer"
              onMouseEnter={() => setActiveMenu('collections')}
            >
              <span onClick={() => navigate('/collections')} className="text-[10px] font-sans uppercase tracking-[0.4em] text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors font-light link-underline pb-1">
                Collections
              </span>
            </div>

            {/* Our World Trigger */}
            <div 
              className="h-full flex items-center cursor-pointer"
              onMouseEnter={() => setActiveMenu('our-world')}
            >
              <span onClick={() => navigate('/our-world')} className="text-[10px] font-sans uppercase tracking-[0.4em] text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors font-light link-underline pb-1">
                Our World
              </span>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex-1 flex justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[var(--theme-text)]"
            >
              <Menu className="w-5 h-5 stroke-[1]" />
            </button>
          </div>

          {/* Center: Brand Name */}
          <div 
            className="flex-1 flex justify-center items-center select-none cursor-pointer h-full"
            onMouseEnter={() => setActiveMenu(null)}
          >
            <Link to="/" className="relative inline-block group">
              <img
                src={logoImage}
                alt="PYNCH Logo"
                className="w-auto h-auto max-w-full max-h-10 sm:max-h-14 object-contain transition-all duration-300 group-hover:opacity-80"
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div 
            className="flex-1 flex justify-end items-center gap-4 sm:gap-6 h-full"
            onMouseEnter={() => setActiveMenu(null)}
          >
            <button
              onClick={() => navigate('/size-guide')}
              className="px-2 text-[var(--theme-text)] text-[10px] font-sans uppercase tracking-[0.4em] font-light hover:text-[var(--theme-lime)] transition-colors hidden xl:block whitespace-nowrap"
            >
              Sizing & Comfort Guide
            </button>
            <button
              className="p-2 text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors hidden sm:block relative"
              onClick={onLustListClick}
            >
              <svg viewBox="0 0 100 100" className="w-6 h-6 stroke-current fill-none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50 85 C 50 85, 15 55, 15 30 C 15 10, 40 10, 50 30 C 60 10, 85 10, 85 30 C 85 55, 50 85, 50 85 Z" />
              </svg>
              {lustListItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--theme-lime)] rounded-full"></span>
              )}
            </button>
            
            {user ? (
              <div className="relative group/user flex items-center h-full">
                <button
                  onClick={() => navigate('/account')}
                  className="px-2 text-[var(--theme-text)] text-[10px] font-sans uppercase tracking-[0.4em] font-light hover:text-[var(--theme-lime)] transition-colors hidden sm:block whitespace-nowrap"
                >
                  {user.displayName ? `Hi, ${user.displayName.split(' ')[0]}` : "Account"}
                </button>
                <div className="absolute top-full right-0 bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-xl p-4 hidden group-hover/user:flex flex-col gap-3 min-w-[150px] z-50">
                  <span className="text-[9px] font-sans text-gray-500 uppercase tracking-widest truncate max-w-full">{user.email}</span>
                  <button onClick={() => navigate('/account')} className="text-left text-[10px] font-sans uppercase tracking-[0.2em] hover:text-[var(--theme-lime)]">My Account</button>
                  <button onClick={() => signOut()} className="text-left text-[10px] font-sans uppercase tracking-[0.2em] hover:text-red-500 transition-colors">Sign Out</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-2 text-[var(--theme-text)] text-[10px] font-sans uppercase tracking-[0.4em] font-light hover:text-[var(--theme-lime)] transition-colors hidden sm:block whitespace-nowrap"
              >
                Log In
              </button>
            )}
            
            <button
              className="p-2 text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors relative"
              onClick={onCartClick}
            >
              <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 10 20 L 25 20 L 35 65 L 80 65 L 90 25 L 28 25" />
                <path d="M 40 75 C 35 70, 30 72, 30 77 C 30 82, 40 88, 40 88 C 40 88, 50 82, 50 77 C 50 72, 45 70, 40 75 Z" />
                <path d="M 75 75 C 70 70, 65 72, 65 77 C 65 82, 75 88, 75 88 C 75 88, 85 82, 85 77 C 85 72, 80 70, 75 75 Z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--theme-lime)] rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menus Overlay Layer */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-[var(--theme-bg)] border-b border-[var(--theme-border)] shadow-xl z-40 hidden md:block"
            onMouseEnter={() => setActiveMenu(activeMenu)}
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
              
              {/* SHOP MENU */}
              {activeMenu === 'shop' && (
                <div className="flex gap-16">
                  {/* Left Links */}
                  <div className="flex gap-16 min-w-[300px]">

                    <div className="flex flex-col gap-4">
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Shop All</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Bras</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Bralettes</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Panties</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Corsets & Bodysuits</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Attire</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Accessories</Link>
                    </div>
                  </div>
                  
                  {/* Right Content */}
                  <div className="flex-1 flex flex-col gap-4">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--theme-teal)]">Our Favorites</span>
                    <div className="grid grid-cols-3 gap-4 h-[300px]">
                      {MOCK_PRODUCTS.slice(6, 9).map((product, idx) => (
                        <div key={product.id} onClick={() => navigate(`/shop`)} className="relative group overflow-hidden cursor-pointer bg-gray-100 flex flex-col h-full">
                          <div className="flex-1 relative overflow-hidden min-h-0 [transform:translateZ(0)]">
                            {idx === 0 && <span className="absolute top-2 left-2 bg-[var(--theme-lime)] text-[#1A1A1A] text-[8px] font-sans uppercase tracking-widest px-2 py-1 z-10">On Tashu's Rack</span>}
                            <img src={product.colors[0].images[0]} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt={product.name} />
                          </div>
                          <div className="mt-2 flex flex-col">
                            <span className="font-[var(--font-playfair)] text-lg tracking-wide text-[var(--theme-teal)] truncate">{product.name}</span>
                            <span className="font-sans text-xs text-[#1A1A1A] font-medium mt-1">₹{product.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* COLLECTIONS MENU */}
              {activeMenu === 'collections' && (
                <div className="flex gap-16">
                  {/* Left Links */}
                  <div className="flex gap-16 min-w-[300px]">

                    <div className="flex flex-col gap-4">
                      <Link to="/collections" state={{ selectedMood: 'Sukoon' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">SUKOON (Comfy)</Link>
                      <Link to="/collections" state={{ selectedMood: 'Shararat' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">SHARARAT (Playful)</Link>
                      <Link to="/collections" state={{ selectedMood: 'Ishq' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">ISHQ (Romantic)</Link>
                      <Link to="/collections" state={{ selectedMood: 'Aarambh' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">AARAMBH (Seductress)</Link>
                    </div>
                  </div>
                  
                  {/* Right Content - Reveal Meter & 4 Mood Images */}
                  <div className="flex-1 flex flex-col">
                    {/* Reveal Meter */}
                    <div className="w-full flex flex-col mb-6 relative">
                      <div className="flex justify-between items-center text-[9px] font-sans tracking-[0.2em] uppercase text-[var(--theme-text)] opacity-60 mb-2 px-4">
                        <span>Max Coverage (Comfy)</span>
                        <span>Reveal Meter</span>
                        <span>Max Reveal (Seductress)</span>
                      </div>
                      <div className="w-full flex items-center relative mt-1">
                         {/* Continuous Line */}
                         <div className="absolute left-[12.5%] right-[12.5%] top-[3px] h-px bg-[var(--theme-border)]"></div>
                         {/* 4 Markers */}
                         <div className="w-1/4 flex flex-col items-center z-10 gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-teal)]"></div>
                           <span className="text-[10px] font-sans tracking-widest text-[var(--theme-text)]">75%</span>
                         </div>
                         <div className="w-1/4 flex flex-col items-center z-10 gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]"></div>
                           <span className="text-[10px] font-sans tracking-widest text-[var(--theme-text)] opacity-70">50%</span>
                         </div>
                         <div className="w-1/4 flex flex-col items-center z-10 gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]"></div>
                           <span className="text-[10px] font-sans tracking-widest text-[var(--theme-text)] opacity-70">35%</span>
                         </div>
                         <div className="w-1/4 flex flex-col items-center z-10 gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-teal)]"></div>
                           <span className="text-[10px] font-sans tracking-widest text-[var(--theme-text)]">20%</span>
                         </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div onClick={() => navigate('/collections', { state: { selectedMood: 'Sukoon' } })} className="relative group cursor-pointer flex flex-col h-full">
                        <div className="relative overflow-hidden aspect-[3/4]">
                          <img src={imgComfy} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="SUKOON (Comfy)" />
                        </div>
                        <span className="font-[var(--font-playfair)] text-lg tracking-wide text-[var(--theme-teal)] mt-3">SUKOON (Comfy)</span>
                      </div>
                      <div onClick={() => navigate('/collections', { state: { selectedMood: 'Shararat' } })} className="relative group cursor-pointer flex flex-col h-full">
                        <div className="relative overflow-hidden aspect-[3/4]">
                          <img src={imgPlayful} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="SHARARAT (Playful)" />
                        </div>
                        <span className="font-[var(--font-playfair)] text-lg tracking-wide text-[var(--theme-teal)] mt-3">SHARARAT (Playful)</span>
                      </div>
                      <div onClick={() => navigate('/collections', { state: { selectedMood: 'Ishq' } })} className="relative group cursor-pointer flex flex-col h-full">
                        <div className="relative overflow-hidden aspect-[3/4]">
                          <img src={imgRomantic} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="ISHQ (Romantic)" />
                        </div>
                        <span className="font-[var(--font-playfair)] text-lg tracking-wide text-[var(--theme-teal)] mt-3">ISHQ (Romantic)</span>
                      </div>
                      <div onClick={() => navigate('/collections', { state: { selectedMood: 'Aarambh' } })} className="relative group cursor-pointer flex flex-col h-full">
                        <div className="relative overflow-hidden aspect-[3/4]">
                          <img src={imgSeductress} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="AARAMBH (Seductress)" />
                        </div>
                        <span className="font-[var(--font-playfair)] text-lg tracking-wide text-[var(--theme-teal)] mt-3">AARAMBH (Seductress)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OUR WORLD MENU */}
              {activeMenu === 'our-world' && (
                <div className="flex gap-16">
                  {/* Left Links */}
                  <div className="flex gap-16 min-w-[300px]">
                    <div className="flex flex-col gap-4">
                      <Link to="/our-world" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Our World</Link>
                      <Link to="/shop" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Shop All</Link>
                      <Link to="/" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">FAQs</Link>
                      <Link to="/size-guide" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Size Guides</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link to={user ? "/account" : "/login"} className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">My Account</Link>
                      <Link to="/track-order" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Track My Order</Link>
                      <Link to="/returns-and-exchanges" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Start a Return</Link>
                      <a href="mailto:care@justpynch.com" className="text-sm font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">Contact Us</a>
                    </div>
                  </div>
                  
                  {/* Right Content */}
                  <div className="flex-1 flex flex-col gap-4">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--theme-teal)]">The Philosophy</span>
                    <div className="grid grid-cols-2 gap-4 h-[300px]">
                      <div onClick={() => navigate('/our-world')} className="relative group overflow-hidden cursor-pointer bg-gray-100 flex flex-col col-span-1 h-full">
                        <div className="flex-1 relative overflow-hidden min-h-0 [transform:translateZ(0)]">
                          <img src={imgOurWorld} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Our World" />
                        </div>
                        <div className="mt-2 flex flex-col">
                          <span className="font-[var(--font-playfair)] text-lg tracking-wide text-[var(--theme-teal)] truncate">Read The Essential Journal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--theme-bg)] border-b border-[var(--theme-border)] shadow-xl py-6 px-8 flex flex-col gap-6 text-[var(--theme-text)] z-40">
          <Link
            to="/waitlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11px] font-sans uppercase tracking-[0.4em] text-left hover:text-[var(--theme-lime)]"
          >
            Waitlist
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11px] font-sans uppercase tracking-[0.4em] text-left hover:text-[var(--theme-lime)]"
          >
            Shop
          </Link>
          <Link
            to="/collections"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11px] font-sans uppercase tracking-[0.4em] text-left hover:text-[var(--theme-lime)]"
          >
            Collections
          </Link>
          <Link
            to="/size-guide"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11px] font-sans uppercase tracking-[0.4em] text-left hover:text-[var(--theme-lime)]"
          >
            Sizing & Comfort Guide
          </Link>
          <Link
            to="/lust-list"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11px] font-sans uppercase tracking-[0.4em] text-left hover:text-[var(--theme-lime)] flex items-center justify-between"
          >
            <span>Lust List</span>
            {lustListItemCount > 0 && (
              <span className="w-2 h-2 bg-[var(--theme-lime)] rounded-full"></span>
            )}
          </Link>
          <Link
            to="/our-world"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11px] font-sans uppercase tracking-[0.4em] text-left hover:text-[var(--theme-lime)]"
          >
            Our World
          </Link>
        </div>
      )}
    </header>
  );
}
