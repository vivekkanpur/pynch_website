import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { PageTransition } from "./components/PageTransition";
import { SEO } from "./components/SEO";
import LandingView from "./views/LandingView";
import ShopView from "./views/ShopView";
import CollectionsView from "./views/CollectionsView";
import ProductDetailView from "./views/ProductDetailView";
import PhilosophyView from "./views/PhilosophyView";
import TashuStudioView from "./views/TashuStudioView";
import CheckoutView from "./views/CheckoutView";
import WaitlistView from "./views/WaitlistView";
import LoginView from "./views/LoginView";
import AccountView from "./views/AccountView";
import CartDrawer from "./components/CartDrawer";
import SizeGuideDrawer from "./components/SizeGuideDrawer";
import { ShopifyCartIdentitySync } from "./components/ShopifyCartIdentitySync";
import { useAuth } from "./contexts/AuthContext";
import SizeGuideView from "./views/SizeGuideView";
import LustListView from "./views/LustListView";
import LegalView from "./views/LegalView";
import OrderTrackingView from "./views/OrderTrackingView";
import { Product } from "./types";
import { ShopifyProvider, CartProvider, useCart } from '@shopify/hydrogen-react';
import { AuthProvider } from './contexts/AuthContext';

// Shared global state for shopping cart (in a real app, use Context or Redux)
export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string; images: string[] };
  selectedSize: string;
  quantity: number;
}

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  
  const { totalQuantity } = useCart();

  // Lust List State
  const [lustListItems, setLustListItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pynch_lust_list');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const { user } = useAuth();

  // Save Lust List to LocalStorage
  useEffect(() => {
    localStorage.setItem('pynch_lust_list', JSON.stringify(lustListItems));
  }, [lustListItems]);

  // Handlers for mocked features (Cart logic moved to CartDrawer and Shopify CartProvider)
  const handleAddToCart = (product: Product, colorName: string, size: string) => {
    setIsCartOpen(true);
    // Real cart add happens inside ProductDetailView using Shopify Cart hooks
  };

  const handleCheckout = () => {
    // We don't route to /checkout anymore. Shopify provides a checkout URL.
    // This is now handled in CartDrawer directly.
    setIsCartOpen(false);
  };
  const handleToggleLust = (product: Product) => {
    setLustListItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigate("/product");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--theme-bg)] text-[var(--theme-text)] w-full">
      <ScrollToTop />
      <ShopifyCartIdentitySync />
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={totalQuantity || 0}
        onLustListClick={() => navigate('/lust-list')}
        lustListItemCount={lustListItems.length}
      />

      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<PageTransition><SEO /><LandingView 
            onViewChange={(path) => navigate(`/${path}`)} 
            onSelectProduct={handleSelectProduct} 
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p) => {
              handleAddToCart({
                product: p,
                selectedColor: p.colors[0],
                selectedSize: p.sizes[0],
                quantity: 1
              });
            }}
          /></PageTransition>} />
          <Route path="/waitlist" element={<PageTransition><SEO title="Join the Waitlist" description="Be the first to experience PYNCH luxury intimate wear. Join our exclusive waitlist for early access to our collections." /><WaitlistView /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><SEO title="Shop All Intimates" description="Explore the full PYNCH collection — bras, bralettes, panties, and more. Premium fabrics, zero hardware, designed for your comfort." /><ShopView 
            onSelectProduct={handleSelectProduct} 
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p) => {
              // Simplified quick add
              handleAddToCart({
                product: p,
                selectedColor: p.colors[0],
                selectedSize: p.sizes[0],
                quantity: 1
              });
          }} /></PageTransition>} />
          <Route path="/collections" element={<PageTransition><SEO title="Collections" description="Browse PYNCH mood-based collections — Aarambh (Seductress), Ishq (Romantic), Shararat (Playful), and Sukoon (Comfy)." /><CollectionsView 
            onSelectProduct={handleSelectProduct} 
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p) => console.log('Quick add')}
          /></PageTransition>} />
          <Route path="/our-world" element={<PageTransition><SEO title="Our World" description="Discover the PYNCH philosophy — we dress the person, not the performance. Four moods, four versions of you, all of them real." /><PhilosophyView /></PageTransition>} />
          <Route path="/login" element={<PageTransition><SEO title="Log In" description="Sign in to your PYNCH account to manage orders, track deliveries, and access your Lust List." /><LoginView /></PageTransition>} />
          <Route path="/account" element={<PageTransition><SEO title="My Account" /><AccountView /></PageTransition>} />
          <Route path="/size-guide" element={<PageTransition><SEO title="Sizing & Comfort Guide" description="Find your perfect PYNCH fit with our comprehensive sizing guide and comfort calculator." /><SizeGuideView /></PageTransition>} />
          <Route path="/tashu-studio" element={<PageTransition><SEO title="Tashu Studio" description="Meet the creator behind PYNCH. Explore Tashu's vision for redefining luxury intimate wear." /><TashuStudioView /></PageTransition>} />
          <Route path="/lust-list" element={<PageTransition><SEO title="Lust List" description="Your curated selection of PYNCH pieces you love." /><LustListView 
            lustListItems={lustListItems}
            onSelectProduct={handleSelectProduct}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p) => console.log('Quick add')}
          /></PageTransition>} />
          <Route path="/product" element={
            selectedProduct ? (
              <PageTransition><SEO title={selectedProduct.name} description={selectedProduct.description} /><ProductDetailView
                key={selectedProduct.id}
                product={selectedProduct}
                onBack={() => navigate(-1)}
                onSizingOpen={() => setIsSizingOpen(true)}
                lustListItems={lustListItems}
                onToggleLust={handleToggleLust}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={(p) => {
                  handleAddToCart({
                    product: p,
                    selectedColor: p.colors[0],
                    selectedSize: p.sizes[0],
                    quantity: 1
                  });
                }}
              /></PageTransition>
            ) : (
              <div className="pt-32 text-center">Product not found.</div>
            )
          } />
          <Route path="/returns-and-exchanges" element={<PageTransition><SEO title="Returns & Exchanges" description="PYNCH returns and exchanges policy. We want you to love your purchase." /><LegalView type="returns" /></PageTransition>} />
          <Route path="/refund-policy" element={<PageTransition><SEO title="Refund Policy" /><LegalView type="refunds" /></PageTransition>} />
          <Route path="/privacy-policy" element={<PageTransition><SEO title="Privacy Policy" /><LegalView type="privacy" /></PageTransition>} />
          <Route path="/terms-of-service" element={<PageTransition><SEO title="Terms of Service" /><LegalView type="terms" /></PageTransition>} />
          <Route path="/track-order" element={<PageTransition><SEO title="Track My Order" description="Track your PYNCH order status and delivery updates." /><OrderTrackingView /></PageTransition>} />
          {/* Checkout route removed for Shopify Headless */}
        </Routes>
      </main>

      <Footer
        onViewChange={(path) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          navigate(
            path === 'shop' ? '/shop' : 
            path === 'tashu-studio' ? '/tashu-studio' : 
            path === 'philosophy' ? '/our-world' : '/'
          );
        }}
        onSizingOpen={() => navigate('/size-guide')}
      />

      {/* Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <SizeGuideDrawer
        isOpen={isSizingOpen}
        onClose={() => setIsSizingOpen(false)}
      />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
    <ShopifyProvider
      storeDomain={import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}
      storefrontToken={import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN}
      storefrontApiVersion="2024-10"
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <CartProvider>
        <AuthProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </CartProvider>
    </ShopifyProvider>
    </HelmetProvider>
  );
}
