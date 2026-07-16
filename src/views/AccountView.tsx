import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, signOut } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AccountView() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          // Initialize empty profile
          const defaultProfile = { walletBalance: 0, sizes: {}, address: {} };
          await setDoc(docRef, defaultProfile);
          setProfile(defaultProfile);
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaveStatus('Saving...');
    try {
      await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
      setSaveStatus('Saved successfully');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error saving');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center font-sans tracking-widest uppercase text-xs">Loading Account...</div>;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Order History' },
    { id: 'sizes', label: 'My Sizes' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'wallet', label: 'Store Credit' },
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-[var(--theme-bg)] pt-32 pb-24 px-4 sm:px-8 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="font-[var(--font-playfair)] italic text-3xl text-[var(--theme-text)]">My Account</h1>
            <p className="font-sans text-[10px] tracking-widest uppercase text-gray-500">
              Welcome, {user?.displayName || user?.email?.split('@')[0]}
            </p>
          </div>
          
          <nav className="flex flex-col gap-4 border-t border-[var(--theme-border)] pt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left font-sans text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  activeTab === tab.id ? 'text-[var(--theme-text)] font-medium' : 'text-gray-400 hover:text-[var(--theme-text)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleSignOut}
              className="text-left font-sans text-[11px] uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors mt-8"
            >
              Sign Out
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-[500px]">
          
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--theme-text)] mb-8">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border border-[var(--theme-border)] p-8 bg-white flex flex-col items-center justify-center text-center space-y-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-500">Wallet Balance</span>
                  <span className="font-[var(--font-playfair)] text-4xl text-[var(--theme-text)]">₹{profile?.walletBalance || 0}</span>
                </div>
                <div className="border border-[var(--theme-border)] p-8 bg-white flex flex-col items-center justify-center text-center space-y-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-500">Recent Orders</span>
                  <span className="font-sans text-sm text-[var(--theme-text)]">0 Orders</span>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--theme-text)] mb-8">Order History</h2>
              
              {/* Mock Order */}
              <div className="border border-[var(--theme-border)] bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[var(--theme-border)] pb-6 mb-6">
                  <div>
                    <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Order #PY-8492</span>
                    <span className="block font-sans text-[12px] text-[var(--theme-text)]">Placed on June 12, 2026</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block font-[var(--font-playfair)] text-xl text-[var(--theme-text)] mb-1">₹3,490</span>
                    <span className="block font-sans text-[10px] uppercase tracking-widest text-[var(--theme-lime)] bg-[#111111] px-3 py-1 inline-block">Delivered</span>
                  </div>
                </div>
                
                <div className="flex gap-6 items-center">
                  <div className="w-20 aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1594913785162-e678537db3b1?q=80&w=200" alt="Product" className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans text-xs uppercase tracking-widest mb-1">The Seduction Lightly Lined</h4>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-gray-500">Black • 34B</p>
                  </div>
                  <div className="hidden sm:block">
                    <button className="border border-[var(--theme-text)] px-6 py-3 font-sans text-[10px] uppercase tracking-widest hover:bg-[var(--theme-text)] hover:text-white transition-colors">
                      1-Click Reorder
                    </button>
                  </div>
                </div>
                <div className="mt-6 sm:hidden">
                    <button className="w-full border border-[var(--theme-text)] px-6 py-3 font-sans text-[10px] uppercase tracking-widest hover:bg-[var(--theme-text)] hover:text-white transition-colors">
                      1-Click Reorder
                    </button>
                </div>
              </div>

              <div className="text-center pt-8">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">
                  Real order history syncing requires a Shopify Admin API integration.
                </p>
              </div>
            </div>
          )}

          {/* SIZES */}
          {activeTab === 'sizes' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--theme-text)]">My Sizes</h2>
                <button 
                  onClick={handleSaveProfile}
                  className="bg-[var(--theme-text)] text-white px-8 py-3 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-colors"
                >
                  {saveStatus || 'Save Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Bra Size</label>
                  <input 
                    type="text" 
                    value={profile?.sizes?.bra || ''}
                    onChange={(e) => setProfile({...profile, sizes: {...profile.sizes, bra: e.target.value}})}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                    placeholder="e.g. 34B"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Panty Size</label>
                  <input 
                    type="text" 
                    value={profile?.sizes?.panty || ''}
                    onChange={(e) => setProfile({...profile, sizes: {...profile.sizes, panty: e.target.value}})}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                    placeholder="e.g. M"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Bodysuit / Corset Size</label>
                  <input 
                    type="text" 
                    value={profile?.sizes?.bodysuit || ''}
                    onChange={(e) => setProfile({...profile, sizes: {...profile.sizes, bodysuit: e.target.value}})}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                    placeholder="e.g. M"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--theme-text)]">Saved Addresses</h2>
                <button 
                  onClick={handleSaveProfile}
                  className="bg-[var(--theme-text)] text-white px-8 py-3 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-colors"
                >
                  {saveStatus || 'Save Address'}
                </button>
              </div>

              <div className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Full Name</label>
                  <input 
                    type="text" 
                    value={profile?.address?.name || ''}
                    onChange={(e) => setProfile({...profile, address: {...profile.address, name: e.target.value}})}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">Street Address</label>
                  <input 
                    type="text" 
                    value={profile?.address?.street || ''}
                    onChange={(e) => setProfile({...profile, address: {...profile.address, street: e.target.value}})}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">City</label>
                    <input 
                      type="text" 
                      value={profile?.address?.city || ''}
                      onChange={(e) => setProfile({...profile, address: {...profile.address, city: e.target.value}})}
                      className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--theme-text)]">PIN Code</label>
                    <input 
                      type="text" 
                      value={profile?.address?.pin || ''}
                      onChange={(e) => setProfile({...profile, address: {...profile.address, pin: e.target.value}})}
                      className="w-full bg-transparent border-b border-[var(--theme-border)] py-3 focus:outline-none focus:border-[var(--theme-lime)] transition-colors font-sans text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WALLET */}
          {activeTab === 'wallet' && (
            <div className="space-y-8 animate-fade-in flex flex-col items-center justify-center min-h-[400px] text-center border border-[var(--theme-border)] bg-white p-8">
               <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[1] stroke-[var(--theme-text)] fill-none mb-4">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
               </svg>
               <h2 className="font-[var(--font-playfair)] text-3xl text-[var(--theme-text)] mb-2">Store Credit</h2>
               <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-8 max-w-md mx-auto">
                 Your wallet balance can be automatically applied during checkout on eligible purchases.
               </p>
               <div className="bg-[#111111] text-[var(--theme-lime)] px-12 py-8 rounded-full">
                  <span className="font-[var(--font-playfair)] text-5xl">₹{profile?.walletBalance || 0}</span>
               </div>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
