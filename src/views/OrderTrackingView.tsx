import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Package, Truck, MapPin, Check, ChevronRight } from 'lucide-react';

const TRACKING_STEPS = [
  { id: 1, label: 'Order Confirmed', icon: CheckCircle2, date: 'Oct 12, 10:45 AM' },
  { id: 2, label: 'Order Packed', icon: Package, date: 'Oct 13, 09:15 AM' },
  { id: 3, label: 'Order Shipped', icon: Truck, date: 'Oct 13, 04:30 PM' },
  { id: 4, label: 'Out for Delivery', icon: MapPin, date: 'Pending' },
  { id: 5, label: 'Delivered', icon: Check, date: 'Pending' },
];

export default function OrderTrackingView() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingState, setTrackingState] = useState<'idle' | 'loading' | 'results'>('idle');

  // Simulated current step (1 to 5)
  const currentStep = 3; 

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;
    
    setTrackingState('loading');
    
    // Simulate API call to logistics partner
    setTimeout(() => {
      setTrackingState('results');
    }, 1500);
  };

  return (
    <div className="w-full bg-[var(--theme-bg)] min-h-[calc(100vh-140px)] flex flex-col items-center py-16 px-4 sm:px-8">
      
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl text-[var(--theme-teal)] mb-4 tracking-wide">
            Track Your Order
          </h1>
          <p className="font-sans text-sm text-[var(--theme-text)] opacity-70 max-w-md mx-auto tracking-wide">
            Enter your order number and email address to see the latest updates on your delivery.
          </p>
        </div>

        {/* Input Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleTrack} 
          className="bg-white p-6 sm:p-8 border border-[var(--theme-border)] shadow-sm flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">Order Number *</label>
              <input 
                type="text" 
                placeholder="e.g. #PYNCH-1001"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-sm focus:outline-none focus:border-[var(--theme-teal)] transition-colors text-[#1A1A1A]" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">Email or Phone *</label>
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-sm focus:outline-none focus:border-[var(--theme-teal)] transition-colors text-[#1A1A1A]" 
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={trackingState === 'loading'}
            className="w-full bg-[#1A1A1A] text-white py-4 mt-2 font-sans text-[11px] uppercase tracking-[0.3em] hover:bg-[var(--theme-teal)] transition-colors duration-300 no-radius disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {trackingState === 'loading' ? 'Locating...' : 'Track Order'}
            {trackingState !== 'loading' && <ChevronRight className="w-4 h-4" />}
          </button>
        </motion.form>

        {/* Tracking Results Timeline */}
        <AnimatePresence>
          {trackingState === 'results' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="w-full overflow-hidden"
            >
              <div className="bg-white border border-[var(--theme-border)] p-6 sm:p-10 shadow-sm relative">
                
                {/* Details Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--theme-border)] pb-6 mb-10 gap-4">
                  <div>
                    <h3 className="font-sans font-medium text-lg text-[var(--theme-teal)] uppercase tracking-widest">{orderId}</h3>
                    <p className="font-sans text-[11px] text-[#1A1A1A] opacity-60 tracking-wider uppercase mt-1">Via Delhivery Express</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-sans text-[10px] text-[#1A1A1A] opacity-60 tracking-widest uppercase">Est. Delivery</p>
                    <p className="font-[var(--font-playfair)] text-2xl text-[var(--theme-text)] mt-1">Oct 16, 2026</p>
                  </div>
                </div>

                {/* The Timeline */}
                <div className="relative">
                  {/* Vertical Progress Line (Background) */}
                  <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gray-100 z-0"></div>
                  
                  {/* Vertical Progress Line (Active) */}
                  <div 
                    className="absolute left-6 top-6 w-[2px] bg-[var(--theme-teal)] z-0 transition-all duration-1000 ease-in-out"
                    style={{ height: `${((currentStep - 1) / (TRACKING_STEPS.length - 1)) * 100}%` }}
                  ></div>

                  <div className="flex flex-col gap-10 relative z-10">
                    {TRACKING_STEPS.map((step, index) => {
                      const isCompleted = step.id <= currentStep;
                      const isCurrent = step.id === currentStep;
                      const Icon = step.icon;

                      return (
                        <div key={step.id} className="flex items-start gap-6 group">
                          {/* Step Icon Node */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500 bg-white ${
                            isCompleted ? 'border-[var(--theme-teal)] text-[var(--theme-teal)]' : 'border-gray-200 text-gray-300'
                          }`}>
                            <Icon className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          
                          {/* Step Details */}
                          <div className={`flex flex-col pt-1 transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                            <span className={`font-sans text-[12px] uppercase tracking-[0.2em] ${isCurrent ? 'font-medium text-[var(--theme-teal)]' : 'text-[#1A1A1A]'}`}>
                              {step.label}
                            </span>
                            <span className="font-sans text-[11px] text-[#1A1A1A] opacity-60 tracking-wide mt-1">
                              {step.date}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Notice */}
                <div className="mt-12 pt-6 border-t border-[var(--theme-border)] text-center">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A] opacity-50">
                    Need help? <a href="mailto:hello@pynch.com" className="hover:text-[var(--theme-teal)] underline underline-offset-4">Contact Support</a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
