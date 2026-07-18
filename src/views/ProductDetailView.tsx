import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { useCart } from '@shopify/hydrogen-react';
import { useNavigate } from 'react-router-dom';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { ProductCard } from '../components/ProductCard';
interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSizingOpen: () => void;
  lustListItems?: Product[];
  onToggleLust?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  onQuickAdd?: (product: Product, colorName: string, size: string) => void;
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

export default function ProductDetailView({
  product,
  onBack,
  onSizingOpen,
  lustListItems,
  onToggleLust,
  onSelectProduct,
  onQuickAdd
}: ProductDetailViewProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState<boolean>(false);

  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [pincodeMessage, setPincodeMessage] = useState('');

  const activeColor = product.colors[selectedColorIdx];
  const isLusted = lustListItems?.some(p => p.id === product.id);
  const { linesAdd } = useCart();
  const navigate = useNavigate();
  const { products } = useShopifyProducts();

  // Recommendations: same category or mood, excluding this one
  let recommendedProducts = products.filter((p: any) => p.id !== product.id && (p.category === product.category || p.mood === product.mood));
  if (recommendedProducts.length === 0) {
    recommendedProducts = products.filter((p: any) => p.id !== product.id);
  }
  recommendedProducts = recommendedProducts.slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }

    // Find the correct Shopify variant ID based on selected size (and color if mapped)
    // Shopify options are typically { name: 'Size', value: 'M' }, etc.
    let variantId = product.shopifyVariants?.[0]?.id; // Default fallback

    if (product.shopifyVariants) {
      const match = product.shopifyVariants.find((v: any) => 
        v.selectedOptions.some((opt: any) => opt.name === 'Size' && opt.value === selectedSize)
      );
      if (match) {
        variantId = match.id;
      }
    }

    if (variantId) {
      linesAdd([{ merchandiseId: variantId, quantity }]);
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
    } else {
      alert('This is a dummy product. Please sync real inventory to Shopify to add items to your bag!');
    }
  };

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleCheckPincode = () => {
    if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
      setPincodeStatus('error');
      setPincodeMessage('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    
    setPincodeStatus('checking');
    
    // Simulate API call to shipping provider
    setTimeout(() => {
      // Mock unserviceable pincode (starts with 9 or 0 for demo purposes)
      if (pincode.startsWith('9') || pincode.startsWith('0')) {
        setPincodeStatus('error');
        setPincodeMessage('Sorry, we do not currently deliver to this PIN code.');
      } else {
        setPincodeStatus('success');
        setPincodeMessage('Delivery available. Estimated arrival in 3-5 business days. Cash on Delivery eligible.');
      }
    }, 800);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-20 sm:py-32"
    >
      {/* Back CTA */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] uppercase text-gray-500 hover:text-[#111111] mb-12 transition-colors"
        id="back-to-portfolio-btn"
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Side: Images */}
        <div className="col-span-12 lg:col-span-7 flex overflow-x-auto snap-x snap-mandatory lg:flex-col lg:space-y-4 lg:overflow-visible gap-4 lg:gap-0 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {product.videos?.map((vid, idx) => (
            <div key={`vid-${idx}`} className="w-[85vw] sm:w-[70vw] lg:w-full shrink-0 snap-center lg:snap-align-none bg-[#F4F0EA] overflow-hidden">
              <video
                src={vid}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover mix-blend-multiply"
              />
            </div>
          ))}
          {activeColor.images.map((img, idx) => (
            <div key={`img-${idx}`} className="w-[85vw] sm:w-[70vw] lg:w-full shrink-0 snap-center lg:snap-align-none bg-[#F4F0EA] overflow-hidden">
              <img
                src={img}
                alt={`${product.name} detail ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover mix-blend-multiply"
              />
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Checkout / Details */}
        <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 space-y-12">
          
          {/* Header Area */}
          <div className="space-y-2">
            <h1 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl tracking-wide text-[#111111] leading-tight">
              {product.name}
            </h1>
            <div className="font-sans text-sm tracking-widest text-[#111111]">
              ₹{product.price}
            </div>
          </div>

          {/* Description */}
          <p className="font-sans font-light text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-8">
            {/* Colorways Selector */}
            <div className="space-y-3">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[14px] font-sans text-[#006064] border-b border-[#006064] pb-0 inline-block mb-1">
                All
              </a>
              
              <div className="flex">
                {product.colors.map((color, idx) => {
                  const isSelected = selectedColorIdx === idx;
                  const isGradient = color.hex.includes(',');
                  const backgroundStyle = isGradient 
                    ? `linear-gradient(to top left, ${color.hex.split(',')[0]} 50%, ${color.hex.split(',')[1]} 50%)`
                    : color.hex;

                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColorIdx(idx);
                        setSelectedSize(null);
                      }}
                      className={`w-9 h-9 relative p-0 transition-none ${
                        isSelected 
                          ? 'outline outline-1 outline-black ring-2 ring-white ring-inset z-10' 
                          : 'z-0 hover:opacity-90'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="absolute inset-0"
                        style={{ background: backgroundStyle }}
                      ></span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[14px] font-sans text-[#006064] mt-3">
                Color: {activeColor.name}
              </div>
            </div>

            {/* Sizing Model Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-sans tracking-[0.2em] uppercase">
                <span className="text-gray-400">Size</span>
                <button
                  onClick={onSizingOpen}
                  className="text-gray-400 hover:text-[#111111] border-b border-transparent hover:border-[#111111] transition-all"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`border text-[11px] font-sans tracking-[0.1em] py-2 px-4 min-w-[3rem] text-center transition-all duration-300 no-radius ${
                      selectedSize === sz
                        ? 'border-[#111111] bg-[#111111] text-white shadow-md scale-105'
                        : 'border-[#111111]/20 text-[#111111] hover:border-[#111111] hover:bg-[#F8F6F3]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Controls */}
            <div className="pt-4 space-y-4">
              <div className="flex gap-4">
                {/* 
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 h-12 text-[11px] font-sans tracking-[0.2em] uppercase transition-all duration-500 no-radius flex items-center justify-center relative overflow-hidden group ${
                    selectedSize
                      ? 'bg-[#111111] text-white cursor-pointer hover:shadow-xl'
                      : 'bg-transparent text-gray-400 cursor-not-allowed border border-gray-200'
                  }`}
                  id="add-to-bag-cta"
                >
                  {selectedSize ? (
                    <>
                      <span className="relative z-10 group-hover:scale-105 transition-transform duration-500">Add to Bag</span>
                      <div className="absolute inset-0 bg-[#0C3839] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
                    </>
                  ) : (
                    <span>Select a Size</span>
                  )}
                </button>
                */}

                {/* Waitlist Mode Button */}
                <button
                  onClick={() => navigate('/waitlist')}
                  className="flex-1 h-12 text-[11px] font-sans tracking-[0.2em] uppercase transition-all duration-500 no-radius flex items-center justify-center relative overflow-hidden group bg-[#111111] text-white cursor-pointer hover:shadow-xl"
                  id="join-waitlist-cta"
                >
                  <span className="relative z-10 group-hover:scale-105 transition-transform duration-500">Join Waitlist</span>
                  <div className="absolute inset-0 bg-[#0C3839] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
                </button>
                <button
                  onClick={() => onToggleLust && onToggleLust(product)}
                  className={`w-12 h-12 border border-[#E8E3DB] flex items-center justify-center hover:border-[#111111] transition-colors ${
                    isLusted ? 'text-[#111111]' : 'text-gray-400'
                  }`}
                  aria-label={isLusted ? "Remove from Lust List" : "Add to Lust List"}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isLusted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>

              {addedMessage && (
                <div className="text-[#111111] font-sans text-[10px] tracking-[0.2em] uppercase py-2 text-center">
                  Added to bag
                </div>
              )}
            </div>

            {/* Pincode Checker */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#111111]">
                Delivery Options
              </div>
              <div className="flex gap-2 h-12">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 border border-gray-200 px-4 text-xs font-sans focus:border-[#111111] focus:outline-none transition-colors no-radius"
                />
                <button
                  onClick={handleCheckPincode}
                  disabled={pincodeStatus === 'checking'}
                  className="w-24 bg-[#F4F0EA] text-[#111111] text-[10px] font-sans tracking-[0.1em] uppercase hover:bg-gray-200 transition-colors no-radius disabled:opacity-50"
                >
                  {pincodeStatus === 'checking' ? '...' : 'Check'}
                </button>
              </div>
              {pincodeStatus === 'success' && (
                <p className="text-xs text-green-700 font-sans font-light">✓ {pincodeMessage}</p>
              )}
              {pincodeStatus === 'error' && (
                <p className="text-xs text-red-500 font-sans font-light">✗ {pincodeMessage}</p>
              )}
            </div>

          </div>

          <hr className="border-gray-100" />

          {/* Accordion Panels */}
          <div className="divide-y divide-gray-100 font-sans font-light">
            {/* Story */}
            <div className="py-4">
              <button
                onClick={() => toggleTab('story')}
                className="w-full flex justify-between items-center text-left text-lg font-[var(--font-playfair)] italic tracking-wide text-[#111111] hover:opacity-70 transition-opacity"
              >
                <span>The Story</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${activeTab === 'story' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'story' && (
                <div className="text-gray-500 text-xs leading-relaxed pt-4 italic">
                  "{product.story}"
                </div>
              )}
            </div>

            {/* Materials & Origin */}
            <div className="py-4">
              <button
                onClick={() => toggleTab('materials')}
                className="w-full flex justify-between items-center text-left text-lg font-[var(--font-playfair)] italic tracking-wide text-[#111111] hover:opacity-70 transition-opacity"
              >
                <span>Materials & Origin</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${activeTab === 'materials' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'materials' && (
                <div className="text-gray-500 text-xs leading-relaxed pt-4 space-y-3">
                  <p>{product.materials}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.map((dt, idx) => (
                      <li key={idx}>{dt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Fit Info */}
            <div className="py-4">
              <button
                onClick={() => toggleTab('fit')}
                className="w-full flex justify-between items-center text-left text-lg font-[var(--font-playfair)] italic tracking-wide text-[#111111] hover:opacity-70 transition-opacity"
              >
                <span>Fit Information</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${activeTab === 'fit' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'fit' && (
                <div className="text-gray-500 text-xs leading-relaxed pt-4">
                  <p>{product.fitInfo}</p>
                </div>
              )}
            </div>

            {/* Shipping & Packaging */}
            <div className="py-4">
              <button
                onClick={() => toggleTab('shipping')}
                className="w-full flex justify-between items-center text-left text-lg font-[var(--font-playfair)] italic tracking-wide text-[#111111] hover:opacity-70 transition-opacity"
              >
                <span>Shipping & Discreet Packaging</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${activeTab === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'shipping' && (
                <div className="text-gray-500 text-xs leading-relaxed pt-4 space-y-3">
                  <p>
                    <strong>Your Privacy is Our Priority.</strong> We understand that purchasing intimate wear is a personal experience. To ensure your complete privacy, all PYNCH orders are dispatched in 100% unbranded, opaque packaging. 
                  </p>
                  <p>
                    There are no visible logos, product descriptions, or brand markers on the exterior of the parcel. The sender's name on the shipping label will simply read "Fulfillment Center," ensuring the contents remain entirely known only to you.
                  </p>
                  <p>
                    <strong>Delivery:</strong> We offer premium multi-carrier shipping across India. Standard delivery typically takes 3-5 business days. Cash on Delivery is available for eligible PIN codes.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Recommendations Section */}
      {recommendedProducts.length > 0 && (
        <div className="mt-24 sm:mt-32 border-t border-[var(--theme-border)] pt-16">
          <h2 className="font-serif font-light text-2xl sm:text-3xl text-[var(--theme-teal)] uppercase tracking-[0.1em] mb-8 text-center sm:text-left">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {recommendedProducts.map((prod: any) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onClick={onSelectProduct || (() => {})}
                onQuickAdd={onQuickAdd || (() => {})}
                isLusted={lustListItems?.some(p => p.id === prod.id)}
                onToggleLust={onToggleLust}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
