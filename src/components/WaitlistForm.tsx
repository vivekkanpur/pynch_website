import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Turnstile } from '@marsidev/react-turnstile';

import imgAarambh from '../data/images/models/mood_lingerie_seductress.webp';
import imgIshq from '../data/images/models/mood_lingerie_romantic.webp';
import imgShararat from '../data/images/models/mood_lingerie_playful.webp';
import imgSukoon from '../data/images/models/mood_lingerie_comfy.webp';

const moodData = [
  { id: 'Aarambh', image: imgAarambh },
  { id: 'Ishq', image: imgIshq },
  { id: 'Shararat', image: imgShararat },
  { id: 'Sukoon', image: imgSukoon },
];

export function WaitlistForm() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [waitlistNumber, setWaitlistNumber] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [couponCode5, setCouponCode5] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // On mount: read ?ref= from the URL so a referred user's code is captured
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferredBy(ref);
    }
  }, []);

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          moods: selectedMoods.join(', ') || 'None selected',
          referredBy: referredBy || null,
          turnstileToken
        })
      });

      if (response.ok) {
        const data = await response.json();
        setWaitlistNumber(data.position);
        setReferralLink(data.referralLink ?? null);
        setCouponCode5(data.couponCode5 ?? null);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '' });
        setSelectedMoods([]);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2500);
      });
    }
  };

  return (
    <div className="w-full bg-[#F8F5F0] p-8 border border-[var(--theme-border)]">
      {/* Social Proof Counter */}
      <div className="mb-8 border-b border-[var(--theme-border)] pb-4">
        <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--theme-teal)]">
          2,400+ women already on the list
        </span>
      </div>

      {/* Referral Banner — shown when arriving via a referral link */}
      {referredBy && status === 'idle' && (
        <div className="mb-8 bg-[var(--theme-teal)] text-white px-5 py-4 flex items-start gap-3">
          <span className="text-lg leading-none mt-0.5">🎁</span>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] mb-1">Friend's Invite</p>
            <p className="font-sans text-xs leading-relaxed opacity-90">
              A friend shared this with you. Sign up and get an extra <strong>5% off</strong> on launch day — on top of the 20% early access discount.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#1A1A1A] mb-4">
          be the first to wear your mood.
        </h2>
        <p className="font-sans text-sm tracking-wide text-[#1A1A1A] opacity-80 mb-6 px-4">
          PYNCH launches soon. Join early for first access, 20% off, and a personal note from our founder.
        </p>
        <p className="font-serif italic text-lg text-[var(--theme-olive)]">
          just a pynch is enough.
        </p>
      </div>

      {/* Form / Success State */}
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in gap-6">
          {/* Position Badge */}
          <div className="w-20 h-20 rounded-full bg-[var(--theme-teal)] text-white flex items-center justify-center shadow-lg">
            <span className="font-serif text-xl font-light">
              #{waitlistNumber?.toLocaleString() || '---'}
            </span>
          </div>

          <div>
            <h3 className="font-serif text-3xl font-light text-[#1A1A1A] mb-3">You're on the list.</h3>
            <p className="font-sans text-sm text-[#1A1A1A] opacity-80 max-w-xs mx-auto leading-relaxed">
              You are number {waitlistNumber?.toLocaleString()} in line. Keep an eye on your inbox and WhatsApp — a note from Tashu is on its way.
            </p>
          </div>

          {/* 5% Referral Bonus — only shown if the user came via a referral link */}
          {couponCode5 && (
            <div className="w-full bg-[var(--theme-teal)]/10 border border-[var(--theme-teal)] px-6 py-5">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--theme-teal)] mb-2">🎁 Referral Bonus Unlocked</p>
              <p className="font-sans text-sm text-[#1A1A1A] leading-relaxed mb-3">
                Your friend brought you here, so you get an extra <strong>5% off</strong> on launch day.
              </p>
              <div className="bg-white border border-[var(--theme-border)] px-4 py-3 inline-block">
                <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#888] block mb-1">Your Code</span>
                <span className="font-mono text-lg font-bold text-[var(--theme-teal)] tracking-widest">{couponCode5}</span>
              </div>
              <p className="font-sans text-[10px] text-[#1A1A1A] opacity-50 mt-3">Save this — it will be valid at checkout when we launch.</p>
            </div>
          )}

          {/* Referral Share Block */}
          {referralLink && (
            <div className="w-full bg-[#0C3839] px-6 py-6">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#CCFF00] mb-2">Share & Give 5% Off</p>
              <p className="font-sans text-xs text-white opacity-80 leading-relaxed mb-4">
                Know someone who dresses for themselves? Share your link — they get 5% off when they join.
              </p>
              <div className="bg-white/10 px-4 py-3 mb-4 break-all">
                <span className="font-sans text-[11px] text-white/70">{referralLink}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="w-full bg-[#CCFF00] text-[#0C3839] py-3 font-sans text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors duration-300"
              >
                {linkCopied ? '✓ Copied!' : 'Copy My Referral Link'}
              </button>
            </div>
          )}
        </div>
      ) : (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">Full Name *</label>
          <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-sm focus:outline-none focus:border-[var(--theme-teal)] transition-colors text-[#1A1A1A]" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">Email Address *</label>
          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-sm focus:outline-none focus:border-[var(--theme-teal)] transition-colors text-[#1A1A1A]" />
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">Phone Number</label>
            <span className="font-sans text-[9px] text-[#1A1A1A] opacity-50 italic">get launch updates on WhatsApp instead of email</span>
          </div>
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-sm focus:outline-none focus:border-[var(--theme-teal)] transition-colors text-[#1A1A1A]" />
        </div>

        {/* Mood Selector */}
        <div className="mt-4 mb-2">
          <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] block mb-4">
            Your Mood — choose all that speak to you
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moodData.map(({ id, image }) => {
              const isSelected = selectedMoods.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleMood(id)}
                  className={`group relative flex flex-col gap-3 p-2 border transition-all duration-500 overflow-hidden ${
                    isSelected 
                      ? 'border-[var(--theme-teal)] bg-white shadow-lg' 
                      : 'border-[var(--theme-border)] bg-transparent hover:border-[var(--theme-teal)]/50'
                  }`}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <img decoding="async" loading="lazy" 
                      src={image} 
                      alt={id} 
                      className={`object-cover w-full h-full transition-transform duration-700 ease-out ${
                        isSelected ? 'scale-105' : 'group-hover:scale-105'
                      }`} 
                    />
                    {/* Subtle overlay when selected */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isSelected ? 'bg-[var(--theme-teal)]/10' : 'bg-black/5 group-hover:bg-transparent'
                      }`} 
                    />
                    {/* Checkmark indicator */}
                    <div 
                      className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-500 transform ${
                        isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--theme-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <span 
                    className={`font-sans text-[11px] uppercase tracking-wider transition-colors duration-300 w-full text-center pb-2 ${
                      isSelected ? 'text-[var(--theme-teal)] font-medium' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Turnstile CAPTCHA */}
        <div className="flex justify-center mt-2">
          <Turnstile 
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
            onSuccess={(token) => setTurnstileToken(token)}
            options={{ theme: 'light' }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading' || !turnstileToken}
          className="w-full bg-[#1A1A1A] text-white py-4 mt-2 font-sans text-[11px] uppercase tracking-[0.3em] hover:bg-[var(--theme-teal)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 no-radius"
        >
          {status === 'loading' ? 'Claiming Spot...' : 'Claim My Spot'}
        </button>

        {status === 'error' && (
          <p className="text-center font-sans text-[11px] text-red-500 mt-2">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-center font-sans text-[10px] text-[#1A1A1A] opacity-50 mt-2 tracking-wide uppercase">
          No spam. Ever. Your data is safe with us.
        </p>
      </form>
      )}
    </div>
  );
}
