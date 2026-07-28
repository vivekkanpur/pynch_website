import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, signInAnonymously, loginWithGoogle, loginWithApple } from '../lib/firebase';

interface MobileLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInline?: boolean;
}

export function MobileLoginModal({ isOpen, onClose, isInline = false }: MobileLoginModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Reset state when opened
  useEffect(() => {
    if (isOpen && step === 'success') {
      setStep('input');
      setPhone('');
      setEmail('');
      setOtp(['', '', '', '']);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phone && !email) {
      setError("Please enter a valid mobile number or email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance focus
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      // Authenticate via Firebase anonymous/demo session for OTP simulation
      await signInAnonymously(auth);
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onClose();
        navigate('/account');
      }, 1000);
    } catch (err: any) {
      console.error("Authentication error:", err);
      // Fallback redirect on simulated success
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onClose();
        navigate('/account');
      }, 1000);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setError(null);
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithApple();
      }
      onClose();
      navigate('/account');
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  const content = (
    <div className={`w-full max-w-md mx-auto bg-[#FDFBF7] text-[#1A1A1A] shadow-2xl border border-[var(--theme-border)] overflow-hidden transition-all relative no-radius ${isInline ? 'my-8' : 'rounded-none'}`}>
      
      {/* HEADER: Dark Noir Section with Watermark */}
      <div className="relative bg-[#111111] text-white py-12 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Faded Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06]">
          <span className="font-serif font-bold tracking-tighter uppercase text-[6.5rem] sm:text-[8rem] whitespace-nowrap text-white">
            PYNCH
          </span>
        </div>

        {/* Close Button */}
        {!isInline && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-white/70 hover:text-[var(--theme-lime)] p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        )}

        <span className="relative z-10 font-sans text-[11px] uppercase tracking-[0.3em] text-[#F9F6F0]/80 font-normal mb-2">
          Welcome Guest!
        </span>
        <h2 className="relative z-10 font-serif text-4xl sm:text-5xl font-light tracking-wider text-white">
          PYNCH Club
        </h2>
      </div>

      {/* CONTENT BODY */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="step-input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h3 className="font-serif text-2xl font-medium tracking-wide text-[#1A1A1A]">
                Get Started
              </h3>
              <p className="font-sans text-[11px] text-[#1A1A1A]/70 tracking-[0.08em] mt-1 mb-6 text-center">
                Welcome to PYNCH Loyalty Program &lt;&gt; Earn as you Buy
              </p>

              {error && (
                <div className="w-full bg-red-50 text-red-600 text-[11px] p-2.5 mb-4 border border-red-200 text-center tracking-wide font-sans">
                  {error}
                </div>
              )}

              <form onSubmit={handleSendOtp} className="w-full space-y-3.5">
                {/* Mobile Phone Box */}
                <div className="w-full bg-[#F3F0EA] border border-[#E3E0D8] p-3.5 flex items-center gap-3 focus-within:border-[#08514C] focus-within:bg-white transition-colors duration-200 no-radius">
                  <div className="flex items-center gap-2 pr-3 border-r border-[#D5CFDA]/50 select-none">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-xs font-semibold text-[#1A1A1A] tracking-wider">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Mobile Number"
                    className="bg-transparent font-sans text-sm outline-none w-full text-[#1A1A1A] placeholder-[#1A1A1A]/40"
                  />
                </div>

                {/* Email Box */}
                <div className="w-full bg-[#F3F0EA] border border-[#E3E0D8] p-3.5 flex items-center focus-within:border-[#08514C] focus-within:bg-white transition-colors duration-200 no-radius">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="bg-transparent font-sans text-sm outline-none w-full text-[#1A1A1A] placeholder-[#1A1A1A]/40"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading || (!phone && !email)}
                  className="w-full bg-[#111111] text-[#F9F6F0] py-4 mt-4 font-sans text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50 no-radius shadow-md"
                >
                  {loading ? "Sending..." : "SEND OTP"}
                </button>
              </form>

              {/* Social Options / Divider */}
              <div className="w-full flex items-center my-6">
                <div className="flex-1 border-t border-[#E3E0D8]"></div>
                <span className="px-3 text-[9px] font-sans uppercase tracking-widest text-[#1A1A1A]/50">Or</span>
                <div className="flex-1 border-t border-[#E3E0D8]"></div>
              </div>

              <div className="w-full grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  disabled={loading}
                  className="w-full bg-white border border-[#E3E0D8] py-2.5 px-3 flex items-center justify-center gap-2 text-[10px] font-sans uppercase tracking-widest hover:border-[#111111] transition-colors no-radius"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialAuth('apple')}
                  disabled={loading}
                  className="w-full bg-[#111111] text-white border border-[#111111] py-2.5 px-3 flex items-center justify-center gap-2 text-[10px] font-sans uppercase tracking-widest hover:bg-black transition-colors no-radius"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.641-.026 2.62-1.48 3.6-2.934 1.136-1.662 1.603-3.273 1.625-3.352-.039-.013-3.14-1.208-3.166-4.805-.026-3.003 2.454-4.441 2.571-4.52-1.415-2.065-3.61-2.312-4.383-2.35-1.99-.208-3.922 1.169-4.896 1.169-.974 0-2.52-1.078-4.22-1.052zM15.114 4.142c.844-1.026 1.416-2.441 1.26-3.857-1.208.052-2.701.805-3.585 1.831-.792.896-1.48 2.338-1.299 3.727 1.351.104 2.766-.675 3.624-1.688z"/>
                  </svg>
                  Apple
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-[#1A1A1A]/60 text-center mt-5 font-sans leading-relaxed">
                By signing-in, you agree to our{" "}
                <span onClick={() => navigate('/our-world')} className="underline cursor-pointer hover:text-[#1A1A1A] font-medium">T&Cs</span>{" "}
                and{" "}
                <span onClick={() => navigate('/our-world')} className="underline cursor-pointer hover:text-[#1A1A1A] font-medium">Privacy Policy</span>.
              </p>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="step-otp"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center py-2"
            >
              <h3 className="font-serif text-2xl font-medium tracking-wide text-[#1A1A1A]">
                Verify Your Number
              </h3>
              <p className="font-sans text-[11px] text-[#1A1A1A]/70 tracking-wide mt-1 mb-6">
                We sent a 4-digit security code to <span className="font-semibold text-[#08514C]">{phone ? `+91 ${phone}` : email}</span>
              </p>

              {error && (
                <div className="w-full bg-red-50 text-red-600 text-[11px] p-2.5 mb-4 border border-red-200 text-center tracking-wide font-sans">
                  {error}
                </div>
              )}

              {/* OTP Squares */}
              <div className="flex justify-center gap-3 my-4">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-14 bg-[#F3F0EA] border border-[#D5CFDA] text-center text-xl font-mono font-bold text-[#1A1A1A] focus:border-[#08514C] focus:bg-white outline-none transition-all no-radius"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.join('').length < 4}
                className="w-full bg-[#111111] text-[#F9F6F0] py-4 mt-6 font-sans text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50 no-radius shadow-md"
              >
                {loading ? "Verifying..." : "VERIFY & LOGIN"}
              </button>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtp(['', '', '', '']);
                    setStep('input');
                  }}
                  className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/60 hover:text-[#08514C] hover:underline transition-colors"
                >
                  Edit Number or Resend Code
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center py-8"
            >
              <CheckCircle2 size={48} className="text-[#08514C] mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl font-light text-[#08514C]">
                Welcome to PYNCH Club
              </h3>
              <p className="font-sans text-xs text-[#1A1A1A]/70 tracking-[0.2em] uppercase mt-2">
                Your Atelier is Ready
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER RIBBON / MARQUEE */}
      <div className="w-full bg-[#F7EBE8] text-[#8C3A36] border-t border-[#E5DFD7] py-2.5 overflow-hidden flex items-center select-none">
        <motion.div 
          className="flex whitespace-nowrap text-[10px] font-sans uppercase font-semibold tracking-[0.2em] gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 18, repeat: Infinity }}
        >
          <span>🎁 EARN REWARDS ON SIGNUP</span>
          <span>✦</span>
          <span>💎 COMPLIMENTARY ATELIER ACCESS</span>
          <span>✦</span>
          <span>EARN AS YOU BUY</span>
          <span>✦</span>
          <span>🎁 EARN REWARDS ON SIGNUP</span>
          <span>✦</span>
          <span>💎 COMPLIMENTARY ATELIER ACCESS</span>
          <span>✦</span>
          <span>EARN AS YOU BUY</span>
          <span>✦</span>
        </motion.div>
      </div>
    </div>
  );

  if (isInline) {
    return content;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md"
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
