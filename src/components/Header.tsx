import { Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/firebase";

import logoImage from "../data/images/logo/Pynch Logo - Copy.webp";
import { MOCK_PRODUCTS } from "../data/mockProducts";

// Product & Mood Images for Mega Menus
import imgCorset from "../data/images/products/model_black_corset.webp";
import imgBalconette from "../data/images/products/model_lace_balconette.webp";
import imgBralette from "../data/images/products/prod_tascher_bralette.webp";
import imgSeductress from "../data/images/models/mood_lingerie_seductress.webp";
import imgRomantic from "../data/images/models/mood_lingerie_romantic.webp";
import imgPlayful from "../data/images/models/mood_lingerie_playful.webp";
import imgComfy from "../data/images/models/mood_lingerie_comfy.webp";
const imgOurWorld = "/images/models/Models New/Comphy/Nap Time Mid Rise Bikini/Syrn_DanielDerro8088.webp";

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
  const [revealIndex, setRevealIndex] = useState(0); // 0=Aarambh(Seductress) … 3=Sukoon(Comfy)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const ANNOUNCEMENTS = [
    'Complimentary organic sandalwood scenting on all orders',
    'Ethical sourcing · Made with kindness · Shipped with care',
    'New collection — discover ISHQ, the romantic',
  ];
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setAnnouncementVisible(false);
      setTimeout(() => {
        setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length);
        setAnnouncementVisible(true);
      }, 450);
    }, 4500);
    return () => clearInterval(cycle);
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
      {/* Announcement Bar — rotating messages with fade */}
      <div className="bg-[var(--theme-text)] text-[var(--theme-bg)] py-2.5 text-center text-[9px] font-sans uppercase tracking-[0.45em] font-light overflow-hidden" style={{ height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            display: 'block',
            opacity: announcementVisible ? 1 : 0,
            transform: announcementVisible ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {ANNOUNCEMENTS[announcementIdx]}
        </span>
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
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
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
              <img decoding="async" loading="lazy"
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
                <button
                  onClick={() => navigate('/account')}
                  className="p-2 text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors sm:hidden"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
                <div className="absolute top-full right-0 bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-xl p-4 hidden group-hover/user:flex flex-col gap-3 min-w-[150px] z-50">
                  <span className="text-[9px] font-sans text-gray-500 uppercase tracking-widest truncate max-w-full">{user.email}</span>
                  <button onClick={() => navigate('/account')} className="text-left text-[10px] font-sans uppercase tracking-[0.2em] hover:text-[var(--theme-lime)]">My Account</button>
                  <button onClick={() => { signOut(); navigate('/'); }} className="text-left text-[10px] font-sans uppercase tracking-[0.2em] hover:text-red-500 transition-colors">Sign Out</button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-2 text-[var(--theme-text)] text-[10px] font-sans uppercase tracking-[0.4em] font-light hover:text-[var(--theme-lime)] transition-colors hidden sm:block whitespace-nowrap"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="p-2 text-[var(--theme-text)] hover:text-[var(--theme-lime)] transition-colors sm:hidden"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
              </>
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
            transition={{ duration: 0.2, ease: "easeOut" as any }}
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
                            {idx === 0 && <span className="absolute top-2 left-2 bg-[var(--theme-lime)] text-[var(--theme-text)] text-[8px] font-sans uppercase tracking-widest px-2 py-1 z-10">On Tashu's Rack</span>}
                            <img decoding="async" loading="lazy" src={product.colors[0].images[0]} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt={product.name} />
                          </div>
                          <div className="mt-2 flex flex-col">
                            <span className="font-serif text-lg tracking-wide text-[var(--theme-teal)] truncate">{product.name}</span>
                            <span className="font-sans text-xs text-[var(--theme-text)] font-medium mt-1">₹{product.price}</span>
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
                      <Link to="/collections" state={{ selectedMood: 'Aarambh' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">AARAMBH (Seductress)</Link>
                      <Link to="/collections" state={{ selectedMood: 'Ishq' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">ISHQ (Romantic)</Link>
                      <Link to="/collections" state={{ selectedMood: 'Shararat' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">SHARARAT (Playful)</Link>
                      <Link to="/collections" state={{ selectedMood: 'Sukoon' }} className="text-base font-sans text-[var(--theme-text)] hover:text-[var(--theme-teal)] transition-colors">SUKOON (Comfy)</Link>
                    </div>
                  </div>
                  
                  {/* Right Content - Reveal Meter & 4 Mood Images */}
                  <div className="flex-1 flex flex-col">
                    {(() => {
                      const MOODS = [
                        { key: 'Aarambh',  label: 'AARAMBH (Seductress)', coverage: 20, img: imgSeductress },
                        { key: 'Ishq',     label: 'ISHQ (Romantic)',      coverage: 35, img: imgRomantic },
                        { key: 'Shararat', label: 'SHARARAT (Playful)',   coverage: 50, img: imgPlayful },
                        { key: 'Sukoon',   label: 'SUKOON (Comfy)',       coverage: 75, img: imgComfy },
                      ];
                      const TEMP_COLORS = ['#991B1B', '#DC2626', '#EA580C', '#F97316'];
                      const HEAT_GRADIENT = 'linear-gradient(to right, #991B1B, #DC2626, #EA580C, #F97316)';
                      const fillPct = (revealIndex / 3) * 100;
                      const activeColor = TEMP_COLORS[revealIndex];
                      // Pill translation: keep within bounds at edges
                      const pillTranslate = revealIndex === 0 ? '0%' : revealIndex === 3 ? '-100%' : '-50%';

                      return (
                        <>
                          {/* ── Reveal Meter ── */}
                          <div className="w-full flex flex-col mb-6">

                            {/* Title row */}
                            <div className="flex justify-between items-center mb-5">
                              <span className="text-[8px] font-sans tracking-[0.22em] uppercase text-[var(--theme-text)] opacity-35">
                                Max Reveal
                              </span>
                              <span
                                className="text-[9px] font-sans tracking-[0.25em] uppercase font-medium"
                                style={{ color: activeColor, transition: 'color 0.3s ease' }}
                              >
                                — Reveal Meter —
                              </span>
                              <span className="text-[8px] font-sans tracking-[0.22em] uppercase text-[var(--theme-text)] opacity-35">
                                Max Coverage
                              </span>
                            </div>

                            {/* Slider container — fixed height for layering */}
                            <div className="relative w-full" style={{ height: '72px' }}>

                              {/* ① Floating pill badge above thumb */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: `${fillPct}%`,
                                  transform: `translateX(${pillTranslate})`,
                                  transition: 'left 0.18s ease, transform 0s',
                                  pointerEvents: 'none',
                                  zIndex: 20,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: revealIndex === 0 ? 'flex-start' : revealIndex === 3 ? 'flex-end' : 'center',
                                }}
                              >
                                <div
                                  style={{
                                    background: activeColor,
                                    color: 'white',
                                    fontSize: '9px',
                                    fontFamily: 'var(--font-sans)',
                                    letterSpacing: '0.18em',
                                    padding: '3px 10px',
                                    borderRadius: '20px',
                                    whiteSpace: 'nowrap',
                                    boxShadow: `0 2px 10px ${activeColor}55`,
                                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {MOODS[revealIndex].coverage}% covered
                                </div>
                                {/* Caret */}
                                <div
                                  style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: '5px solid transparent',
                                    borderRight: '5px solid transparent',
                                    borderTop: `5px solid ${activeColor}`,
                                    alignSelf: revealIndex === 0 ? 'flex-start' : revealIndex === 3 ? 'flex-end' : 'center',
                                    marginLeft: revealIndex === 0 ? '12px' : undefined,
                                    marginRight: revealIndex === 3 ? '12px' : undefined,
                                    transition: 'border-top-color 0.3s ease',
                                  }}
                                />
                              </div>

                              {/* ② Track background */}
                              <div
                                style={{
                                  position: 'absolute', left: 0, right: 0,
                                  top: '36px', height: '6px',
                                  borderRadius: '3px',
                                  background: 'var(--theme-border)',
                                }}
                              />

                              {/* ③ Gradient fill */}
                              <div
                                style={{
                                  position: 'absolute', left: 0,
                                  top: '36px', height: '6px',
                                  borderRadius: '3px',
                                  width: `${fillPct}%`,
                                  background: HEAT_GRADIENT,
                                  transition: 'width 0.15s ease',
                                }}
                              />

                              {/* ④ Glow bloom beneath fill */}
                              <div
                                style={{
                                  position: 'absolute', left: 0,
                                  top: '42px', height: '14px',
                                  width: `${fillPct}%`,
                                  background: HEAT_GRADIENT,
                                  filter: 'blur(7px)',
                                  opacity: 0.38,
                                  transition: 'width 0.15s ease',
                                  pointerEvents: 'none',
                                  borderRadius: '3px',
                                }}
                              />

                              {/* ⑤ Range input */}
                              <input
                                type="range"
                                min={0} max={3} step={1}
                                value={revealIndex}
                                onChange={e => setRevealIndex(Number(e.target.value))}
                                onClick={e => e.stopPropagation()}
                                onMouseDown={e => e.stopPropagation()}
                                className="reveal-meter-slider"
                                style={{
                                  position: 'absolute', left: 0, right: 0,
                                  top: '33px', width: '100%', margin: 0,
                                  '--thumb-color': activeColor,
                                } as React.CSSProperties}
                              />

                              {/* ⑥ Snap ticks + % labels */}
                              {MOODS.map((m, i) => {
                                const snapPct = (i / 3) * 100;
                                const isActive = i === revealIndex;
                                const isPast   = i <= revealIndex;
                                return (
                                  <div
                                    key={m.key}
                                    style={{
                                      position: 'absolute',
                                      top: '52px',
                                      left: `${snapPct}%`,
                                      transform: i === 0 ? 'translateX(0)' : i === 3 ? 'translateX(-100%)' : 'translateX(-50%)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: i === 0 ? 'flex-start' : i === 3 ? 'flex-end' : 'center',
                                      pointerEvents: 'none',
                                      gap: '3px',
                                    }}
                                  >
                                    {/* Tick mark */}
                                    <div style={{
                                      width: isActive ? '2px' : '1px',
                                      height: isActive ? '10px' : '6px',
                                      borderRadius: '1px',
                                      background: isPast ? TEMP_COLORS[i] : 'var(--theme-border)',
                                      transition: 'all 0.25s ease',
                                    }} />
                                    {/* % label */}
                                    <span style={{
                                      fontSize: '8px',
                                      fontFamily: 'var(--font-sans)',
                                      letterSpacing: '0.15em',
                                      color: isActive ? TEMP_COLORS[i] : 'var(--theme-text)',
                                      opacity: isActive ? 1 : 0.35,
                                      transition: 'color 0.25s ease, opacity 0.25s ease',
                                      fontWeight: isActive ? '500' : '400',
                                    }}>
                                      {m.coverage}%
                                    </span>
                                  </div>
                                );
                              })}

                            </div>{/* /slider container */}
                          </div>{/* /meter */}

                          {/* ── Mood Cards ── */}
                          <div className="grid grid-cols-4 gap-4">
                            {MOODS.map((mood, i) => (
                              <div
                                key={mood.key}
                                onClick={() => navigate('/collections', { state: { selectedMood: mood.key } })}
                                onMouseEnter={() => setRevealIndex(i)}
                                className="relative group cursor-pointer flex flex-col h-full"
                              >
                                <div
                                  className="relative overflow-hidden aspect-[3/4]"
                                  style={{
                                    outline: i === revealIndex ? `1.5px solid ${TEMP_COLORS[i]}` : '1.5px solid transparent',
                                    opacity: i === revealIndex ? 1 : 0.5,
                                    transform: i === revealIndex ? 'scale(1.03)' : 'scale(1)',
                                    boxShadow: i === revealIndex ? `0 8px 24px ${TEMP_COLORS[i]}30` : 'none',
                                    transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                                  }}
                                >
                                  <img
                                    decoding="async" loading="lazy" src={mood.img}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    alt={mood.label}
                                  />
                                </div>
                                <span
                                  className="font-serif text-lg tracking-wide mt-3"
                                  style={{
                                    color: i === revealIndex ? TEMP_COLORS[i] : 'var(--theme-text)',
                                    opacity: i === revealIndex ? 1 : 0.45,
                                    transition: 'color 0.25s ease, opacity 0.25s ease',
                                  }}
                                >
                                  {mood.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
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
                          <img decoding="async" loading="lazy" src={imgOurWorld} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Our World" />
                        </div>
                        <div className="mt-2 flex flex-col">
                          <span className="font-serif text-lg tracking-wide text-[var(--theme-teal)] truncate">Read The Essential Journal</span>
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
