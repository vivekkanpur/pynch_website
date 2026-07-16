import React, { useState } from 'react';
import { motion } from 'motion/react';

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
        method: "POST",
        headers: { 
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          moods: selectedMoods.join(", ") || "None selected"
        })
      });

      if (response.ok) {
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

  return (
    <div className="w-full bg-[#F8F5F0] p-8 border border-[var(--theme-border)]">
      {/* Social Proof Counter */}
      <div className="mb-8 border-b border-[var(--theme-border)] pb-4">
        <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--theme-teal)]">
          2,400+ women already on the list
        </span>
      </div>

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

      {/* Form */}
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[var(--theme-teal)] text-white flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="font-serif text-3xl font-light text-[#1A1A1A] mb-4">You're on the list.</h3>
          <p className="font-sans text-sm text-[#1A1A1A] opacity-80">
            Keep an eye on your inbox. A note from Tashu is on its way.
          </p>
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
                    <img 
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

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#1A1A1A] text-white py-4 mt-6 font-sans text-[11px] uppercase tracking-[0.3em] hover:bg-[var(--theme-teal)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 no-radius"
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
