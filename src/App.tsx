import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
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

  // Load Lust List from Firestore when user logs in
  useEffect(() => {
    if (!user) return;
    
    import('firebase/firestore').then(({ doc, getDoc }) => {
      import('./lib/firebase').then(({ db }) => {
        getDoc(doc(db, 'users', user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.lustList && Array.isArray(data.lustList)) {
              // Merge local and cloud list by unique ID
              setLustListItems(prev => {
                const merged = [...prev];
                data.lustList.forEach((cloudItem: Product) => {
                  if (!merged.find(p => p.id === cloudItem.id)) {
                    merged.push(cloudItem);
                  }
                });
                return merged;
              });
            }
          }
        });
      });
    });
  }, [user]);

  // Save Lust List to LocalStorage and Firestore
  useEffect(() => {
    localStorage.setItem('pynch_lust_list', JSON.stringify(lustListItems));
    
    if (user) {
      import('firebase/firestore').then(({ doc, setDoc }) => {
        import('./lib/firebase').then(({ db }) => {
          setDoc(doc(db, 'users', user.uid), { lustList: lustListItems }, { merge: true });
        });
      });
    }
  }, [lustListItems, user]);

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
      duration: 1.2,
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
    <div className="min-h-screen flex flex-col relative bg-[var(--theme-bg)] text-[var(--theme-text)]">
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
          <Route path="/" element={<LandingView 
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
          />} />
          <Route path="/waitlist" element={<WaitlistView />} />
          <Route path="/shop" element={<ShopView 
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
          }} />} />
          <Route path="/collections" element={<CollectionsView 
            onSelectProduct={handleSelectProduct} 
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p) => console.log('Quick add')}
          />} />
          <Route path="/our-world" element={<PhilosophyView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/account" element={<AccountView />} />
          <Route path="/size-guide" element={<SizeGuideView />} />
          <Route path="/tashu-studio" element={<TashuStudioView />} />
          <Route path="/lust-list" element={<LustListView 
            lustListItems={lustListItems}
            onSelectProduct={handleSelectProduct}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p) => console.log('Quick add')}
          />} />
          <Route path="/product" element={
            selectedProduct ? (
              <ProductDetailView
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
              />
            ) : (
              <div className="pt-32 text-center">Product not found.</div>
            )
          } />
          <Route path="/returns-and-exchanges" element={<LegalView type="returns" />} />
          <Route path="/refund-policy" element={<LegalView type="refunds" />} />
          <Route path="/privacy-policy" element={<LegalView type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalView type="terms" />} />
          <Route path="/track-order" element={<OrderTrackingView />} />
          {/* Checkout route removed for Shopify Headless */}
        </Routes>
      </main>

      <Footer
        onViewChange={(path) => navigate(
          path === 'shop' ? '/shop' : 
          path === 'tashu-studio' ? '/tashu-studio' : '/'
        )}
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
    </div>
  );
}

export default function App() {
  return (
    <ShopifyProvider
      storeDomain={import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}
      storefrontToken={import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN}
      storefrontApiVersion="2024-01"
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
  );
}
