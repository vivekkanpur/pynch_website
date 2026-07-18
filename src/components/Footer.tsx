import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, Instagram, Linkedin } from 'lucide-react';
import logoImage from "../data/images/logo/Pynch Logo.png";

interface FooterProps {
  onViewChange: (view: string) => void;
  onSizingOpen: () => void;
}

export default function Footer({ onViewChange, onSizingOpen }: FooterProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-[#E8E3DB] text-[#111111]">
      {/* Brand Ethos Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 border-b border-[#E8E3DB]/50">
        <div className="col-span-12 md:col-span-6 space-y-6">
          <h3 className="font-sans italic text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-light leading-snug tracking-wide">
            "dress the person, not the performance."
          </h3>
          <p className="font-sans font-light text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
            PYNCH is an exploration of physical comfort. We do not design intimate garments to shape or reform;
            we stitch them to accompany, release, and honor your natural geometry. Sourced ethically, made with kindness.
          </p>
        </div>

        {/* Newsletter subscription */}
        <div className="col-span-12 md:col-span-6 space-y-4 flex flex-col justify-center max-w-md w-full">
          <span className="text-[10px] font-sans tracking-[0.2em] capitalize text-gray-500 block">
            Subscribe to Tashu’s Journal
          </span>
          <p className="text-xs text-gray-600 font-sans font-light italic pb-2">
            Receive reflective journal essays, collection lookbooks, and invitation-only releases directly from our atelier.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex border-b border-[#111111] py-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-none text-[11px] font-sans tracking-wide py-2 focus:outline-none placeholder-gray-400"
                id="footer-email-input"
              />
              <button
                type="submit"
                className="text-[#111111] hover:translate-x-1.5 transition-transform duration-300 p-2"
                aria-label="Subscribe"
                id="footer-subscribe-btn"
              >
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </form>
          ) : (
            <div className="bg-[#F4F0EA] p-4 no-radius text-[11px] font-sans tracking-wide text-[#111111]">
              ✓ Thank you for joining. We write sparingly and with intent.
            </div>
          )}
        </div>
      </div>

      {/* Structured Links Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 text-[10px] font-sans tracking-[0.15em] capitalize font-light">

        {/* Logo Mark (Left Side) */}
        <div className="w-full flex flex-col justify-start items-start col-span-1 order-first pb-8 md:pb-0">
          <img src={logoImage} alt="PYNCH Logo" className="w-[150px] sm:w-[180px] h-auto object-contain pointer-events-none" />
        </div>

        {/* Column 1: Socials (Left of Directory) */}
        <div className="space-y-4 col-span-1">
          <span className="text-[var(--theme-teal)] font-medium block text-xs tracking-[0.2em]">Socials</span>
          <ul className="space-y-3 text-[var(--theme-text)] opacity-70">
            <li>
              <a href="https://www.instagram.com/justpynch" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors flex items-center gap-3">
                <Instagram className="w-4 h-4 stroke-[1.5]" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors flex items-center gap-3">
                <Linkedin className="w-4 h-4 stroke-[1.5]" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/917020442771" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <a href="mailto:care@justpynch.com" className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors flex items-center gap-3">
                <Mail className="w-4 h-4 stroke-[1.5]" />
                <span>Email</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 1: Brand Directory */}
        <div className="space-y-4 col-span-1">
          <span className="text-[var(--theme-teal)] font-medium block text-xs tracking-[0.2em]">Directory</span>
          <ul className="space-y-3 text-[var(--theme-text)] opacity-70">
            <li>
              <button
                onClick={() => onViewChange('shop')}
                className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors text-left"
                id="footer-link-shop"
              >
                Shop All Intimates
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange('editorial')}
                className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors text-left"
                id="footer-link-editorial"
              >
                The Essential Journal
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange('philosophy')}
                className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors text-left block"
                id="footer-link-philosophy"
              >
                Brand Philosophy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Caring & Sensation */}
        <div className="space-y-4 col-span-1">
          <span className="text-[var(--theme-teal)] font-medium block text-xs tracking-[0.2em]">Sensitive Fit</span>
          <ul className="space-y-3 text-[var(--theme-text)] opacity-70">
            <li>
              <span className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block">Flexible Wire Weave</span>
            </li>
            <li>
              <span className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block">Organic Care & Washing</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Support & Policies */}
        <div className="space-y-4 col-span-1">
          <span className="text-[var(--theme-teal)] font-medium block text-xs tracking-[0.2em]">Support</span>
          <ul className="space-y-3 text-[var(--theme-text)] opacity-70">
            <li>
              <button onClick={() => navigate('/track-order')} className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block text-left">Track My Order</button>
            </li>
            <li>
              <button onClick={() => navigate('/returns-and-exchanges')} className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block text-left">Returns & Exchanges</button>
            </li>
            <li>
              <button onClick={() => navigate('/refund-policy')} className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block text-left">Refund Policy</button>
            </li>
            <li>
              <button onClick={() => navigate('/privacy-policy')} className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block text-left">Privacy Policy</button>
            </li>
            <li>
              <button onClick={() => navigate('/terms-of-service')} className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block text-left">Terms of Service</button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Location */}
        <div className="space-y-4 col-span-1">
          <span className="text-[var(--theme-teal)] font-medium block text-xs tracking-[0.2em]">Connect</span>
          <ul className="space-y-3 text-[var(--theme-text)] opacity-70">
            <li>
              <Link
                to="/tashu-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer"
              >
                Tashu Studio
              </Link>
            </li>
            <li>
              <a href="mailto:care@justpynch.com" className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors lowercase tracking-normal text-[11px] block">
                care@justpynch.com
              </a>
            </li>
            <li>
              <span className="hover:text-[var(--theme-teal)] hover:opacity-100 transition-colors cursor-pointer block">Milan ╱ New Delhi</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Credentials */}
      <div className="bg-[#111111] text-[#E8E3DB] py-8 px-4 sm:px-8 text-[9px] font-sans tracking-[0.2em] font-light">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="opacity-70">© 2026 Pynch. VELURIA INTERNATIONAL PRIVATE LIMITED. All rights reserved.</span>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center sm:text-left">
            <span className="opacity-100">Designed by Tashu</span>
            <span className="opacity-50">Dress the person, not the performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
