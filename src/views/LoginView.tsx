import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  loginWithGoogle,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  auth,
  logUserInteraction,
  syncUserToSheet,
} from '../lib/firebase';
import { ConfirmationResult } from 'firebase/auth';

export default function LoginView() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/account');
  }, [user, navigate]);

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    // Initialize RecaptchaVerifier
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const digits = phoneNumber.replace(/\D/g, '');
      const formattedPhone = countryCode + digits;

      if (digits.length < 5) {
        throw new Error('Please enter a valid phone number.');
      }

      const appVerifier = (window as any).recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setIsOtpStep(true);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Please include your country code (e.g., +1 for US).');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('SMS login is disabled or your region is not allowed. Check Firebase Console.');
      } else {
        setError(err.message || 'Failed to send OTP. Please check the phone number.');
      }
      if ((window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier.render().then((widgetId: any) => {
              (window as any).grecaptcha.reset(widgetId);
          });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setLoading(true);
    setError(null);
    try {
      await confirmationResult.confirm(otp);
      await logUserInteraction('login', { method: 'phone' });
      await syncUserToSheet();
      navigate('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await loginWithGoogle();
      await logUserInteraction('login', { method: 'google' });
      await syncUserToSheet();
      navigate('/account');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center py-24 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-lg w-full space-y-12 bg-[#F8F5F0] p-8 sm:p-12 border border-[var(--theme-border)]"
      >
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl text-[var(--theme-teal)] uppercase tracking-[0.1em] font-light">
            {isOtpStep ? 'Verify Code' : 'Welcome'}
          </h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--theme-text)] opacity-60">
            {isOtpStep
              ? "Enter the code sent to your phone"
              : 'Enter your phone number to access your atelier'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-xs font-sans p-3 border border-red-100 text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        {!isOtpStep ? (
          <form className="space-y-8" onSubmit={handleSendOtp}>
            <div className="space-y-2">
              <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Phone Number</label>
              <div className="flex border-b border-[var(--theme-border)] focus-within:border-[var(--theme-lime)] transition-colors">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-transparent py-3 pr-2 focus:outline-none font-sans text-sm text-[var(--theme-text)] cursor-pointer outline-none"
                >
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+61">AU (+61)</option>
                  <option value="+81">JP (+81)</option>
                  <option value="+49">DE (+49)</option>
                  <option value="+33">FR (+33)</option>
                  <option value="+86">CN (+86)</option>
                </select>
                <input
                  type="tel" required value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent py-3 pl-2 focus:outline-none font-sans text-sm text-[var(--theme-text)] placeholder-gray-400"
                  placeholder="234 567 8900"
                />
              </div>
            </div>
            
            <div id="recaptcha-container"></div>

            <button type="submit" disabled={loading}
              className="w-full bg-[var(--theme-text)] text-[var(--theme-bg)] py-4 font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Sending Code...' : 'Send Code'}
            </button>
          </form>
        ) : (
          <form className="space-y-8" onSubmit={handleVerifyOtp}>
            <div className="space-y-2">
              <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Verification Code</label>
              <input
                type="text" required value={otp} onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm text-[var(--theme-text)] tracking-widest text-center"
                placeholder="••••••"
                maxLength={6}
              />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[var(--theme-text)] text-[var(--theme-bg)] py-4 font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            
            <div className="text-center">
              <button type="button" onClick={() => setIsOtpStep(false)}
                className="font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)] opacity-60 hover:opacity-100 transition-all"
              >
                Change Phone Number
              </button>
            </div>
          </form>
        )}

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-[var(--theme-border)] opacity-30"></div>
          <span className="px-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)] opacity-60">or</span>
          <div className="flex-1 border-t border-[var(--theme-border)] opacity-30"></div>
        </div>

        <button
          type="button" onClick={handleGoogle} disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-transparent border border-[var(--theme-border)] py-4 font-sans text-[10px] uppercase tracking-[0.4em] hover:border-[var(--theme-teal)] hover:text-[var(--theme-teal)] transition-colors duration-300 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
}
