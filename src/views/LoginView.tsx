import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  loginWithGoogle, 
  loginWithApple, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  auth 
} from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function LoginView() {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/account');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/account');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent!');
      setIsForgotPassword(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/account');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApple = async () => {
    try {
      await loginWithApple();
      navigate('/account');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center py-32 px-4 sm:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full space-y-12 bg-[#F8F5F0] p-8 sm:p-12 border border-[var(--theme-border)]"
      >
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl text-[var(--theme-teal)] uppercase tracking-[0.1em] font-light">
            {isForgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--theme-text)] opacity-60">
            {isForgotPassword ? "We'll send you a link to reset it" : isLogin ? "Enter your details to access your atelier" : "Join the PYNCH world"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-xs font-sans p-3 border border-red-100 text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        {isForgotPassword ? (
          <form className="space-y-8" onSubmit={handlePasswordReset}>
            <div className="space-y-2">
              <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm text-[var(--theme-text)] placeholder-gray-400"
                placeholder="hello@example.com"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--theme-text)] text-[var(--theme-bg)] py-4 font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center">
              <button 
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)] opacity-60 hover:text-[var(--theme-text)] hover:opacity-100 transition-all"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <>
            <form className="space-y-8" onSubmit={handleEmailAuth}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm text-[var(--theme-text)] placeholder-gray-400"
                    placeholder="Jane Doe"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm text-[var(--theme-text)] placeholder-gray-400"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm text-[var(--theme-text)] placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsForgotPassword(true)}
                    className="font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)] opacity-60 hover:text-[var(--theme-lime)] hover:opacity-100 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--theme-text)] text-[var(--theme-bg)] py-4 font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[var(--theme-lime)] hover:text-[#111111] transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Register")}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-[var(--theme-border)] opacity-30"></div>
              <span className="px-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)] opacity-60">or</span>
              <div className="flex-1 border-t border-[var(--theme-border)] opacity-30"></div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                type="button"
                onClick={handleGoogle}
                disabled={loading}
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

              <button 
                type="button"
                onClick={handleApple}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 bg-[#111111] text-white border border-[#111111] py-4 font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-colors duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.641-.026 2.62-1.48 3.6-2.934 1.136-1.662 1.603-3.273 1.625-3.352-.039-.013-3.14-1.208-3.166-4.805-.026-3.003 2.454-4.441 2.571-4.52-1.415-2.065-3.61-2.312-4.383-2.35-1.99-.208-3.922 1.169-4.896 1.169-.974 0-2.52-1.078-4.22-1.052zM15.114 4.142c.844-1.026 1.416-2.441 1.26-3.857-1.208.052-2.701.805-3.585 1.831-.792.896-1.48 2.338-1.299 3.727 1.351.104 2.766-.675 3.624-1.688z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)] opacity-60 hover:text-[var(--theme-text)] hover:opacity-100 transition-all"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
