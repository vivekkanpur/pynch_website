import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, useLocation, matchPath } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { PageTransition } from "./components/PageTransition";
import { SEO } from "./components/SEO";
// LandingView stays a static import — it's the entry point for the majority
// of first visits, so lazy-loading it would only add a network round-trip.
import LandingView from "./views/LandingView";
import CartDrawer from "./components/CartDrawer";
import SizeGuideDrawer from "./components/SizeGuideDrawer";
import { ShopifyCartIdentitySync } from "./components/ShopifyCartIdentitySync";
import { useAuth } from "./contexts/AuthContext";
import { Product } from "./types";
import { ROUTE_META } from "@/lib/routeMeta";

// Every other route is code-split so the initial bundle only ships the
// landing page; the rest loads on demand as the user navigates there.
const ShopView = lazy(() => import("./views/ShopView"));
const CollectionsView = lazy(() => import("./views/CollectionsView"));
const ProductDetailView = lazy(() => import("./views/ProductDetailView"));
const PhilosophyView = lazy(() => import("./views/PhilosophyView"));
const TashuStudioView = lazy(() => import("./views/TashuStudioView"));
const WaitlistView = lazy(() => import("./views/WaitlistView"));
const LoginView = lazy(() => import("./views/LoginView"));
const AccountView = lazy(() => import("./views/AccountView"));
const SizeGuideView = lazy(() => import("./views/SizeGuideView"));
const LustListView = lazy(() => import("./views/LustListView"));
const LegalView = lazy(() => import("./views/LegalView"));
const OrderTrackingView = lazy(() => import("./views/OrderTrackingView"));
import { useShopifyProducts } from "./hooks/useShopifyProducts";
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

  // Load product from /product/:handle when refreshing
  // Note: useParams() doesn't work here since AppContent isn't rendered inside a <Route>,
  // so we extract the handle from location.pathname directly.
  const { products, loading: productsLoading, error: productsError } = useShopifyProducts();
  const productMatch = matchPath('/product/:handle', location.pathname);
  const urlHandle = productMatch?.params?.handle;

  useEffect(() => {
    if (urlHandle && !selectedProduct) {
      const cleanHandle = decodeURIComponent(urlHandle).toLowerCase();
      const found = products.find(p => {
        const h = p.handle ? p.handle.toLowerCase() : "";
        return h === cleanHandle || (p.id ? p.id.toLowerCase() === cleanHandle : false);
      });
      if (found) setSelectedProduct(found);
    }
  }, [urlHandle, products, selectedProduct]);

  // Prune Lust List entries that no longer exist in Shopify (deleted/unpublished
  // products). Saved items are full snapshots in localStorage, so nothing else
  // ever revalidates them against the live catalog. Only run this once a real
  // Shopify fetch has actually succeeded (not the MOCK_PRODUCTS fallback, and
  // not the empty array during the initial load) — otherwise a temporary API
  // failure or the loading state would wipe the whole saved list.
  useEffect(() => {
    if (productsLoading || productsError || products.length === 0) return;
    setLustListItems(prev => {
      const liveIds = new Set(products.map(p => p.id));
      const pruned = prev.filter(p => liveIds.has(p.id));
      return pruned.length === prev.length ? prev : pruned;
    });
  }, [products, productsLoading, productsError]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/product/${encodeURIComponent(product.handle || product.id || "item")}`);
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
        <Suspense fallback={
          <div className="pt-32 text-center h-screen flex items-center justify-center text-[var(--theme-olive)] font-sans text-sm tracking-widest uppercase">
            Loading...
          </div>
        }>
        <Routes>
          <Route path="/" element={<PageTransition><SEO /><LandingView 
            onViewChange={(path) => navigate(`/${path}`)} 
            onSelectProduct={handleSelectProduct} 
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p, colorName, size) => {
              handleAddToCart(p, colorName || p.colors[0].name, size || p.sizes[0]);
            }}
          /></PageTransition>} />
          <Route path="/waitlist" element={<PageTransition><SEO {...ROUTE_META['/waitlist']} /><WaitlistView /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><SEO {...ROUTE_META['/shop']} /><ShopView 
            onSelectProduct={handleSelectProduct} 
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p, colorName, size) => {
              handleAddToCart(p, colorName || p.colors[0].name, size || p.sizes[0]);
            }} /></PageTransition>} />
          <Route path="/collections" element={<PageTransition><SEO {...ROUTE_META['/collections']} /><CollectionsView
            onSelectProduct={handleSelectProduct}
            lustListItems={lustListItems}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p, colorName, size) => {
              handleAddToCart(p, colorName || p.colors[0].name, size || p.sizes[0]);
            }}
          /></PageTransition>} />
          <Route path="/our-world" element={<PageTransition><SEO {...ROUTE_META['/our-world']} /><PhilosophyView /></PageTransition>} />
          <Route path="/login" element={<PageTransition><SEO {...ROUTE_META['/login']} /><LoginView /></PageTransition>} />
          <Route path="/account" element={<PageTransition><SEO {...ROUTE_META['/account']} /><AccountView /></PageTransition>} />
          <Route path="/size-guide" element={<PageTransition><SEO {...ROUTE_META['/size-guide']} /><SizeGuideView /></PageTransition>} />
          <Route path="/tashu-studio" element={<PageTransition><SEO {...ROUTE_META['/tashu-studio']} /><TashuStudioView /></PageTransition>} />
          <Route path="/lust-list" element={<PageTransition><SEO {...ROUTE_META['/lust-list']} /><LustListView
            lustListItems={lustListItems}
            onSelectProduct={handleSelectProduct}
            onToggleLust={handleToggleLust}
            onQuickAdd={(p, colorName, size) => {
              handleAddToCart(p, colorName || p.colors[0].name, size || p.sizes[0]);
            }}
          /></PageTransition>} />
          <Route path="/product/:handle" element={
            selectedProduct ? (
              <PageTransition><SEO
                title={selectedProduct.name}
                description={selectedProduct.description}
                ogImage={selectedProduct.colors?.[0]?.images?.[0]}
                ogType="product"
                jsonLd={{
                  '@context': 'https://schema.org',
                  '@type': 'Product',
                  name: selectedProduct.name,
                  description: selectedProduct.description,
                  sku: selectedProduct.sku,
                  image: selectedProduct.colors?.flatMap(c => c.images) ?? [],
                  offers: {
                    '@type': 'Offer',
                    url: `https://justpynch.com/product/${encodeURIComponent(selectedProduct.handle || selectedProduct.id)}`,
                    priceCurrency: selectedProduct.currency || 'INR',
                    price: selectedProduct.price,
                    availability: 'https://schema.org/InStock',
                  },
                }}
              /><ProductDetailView
                key={selectedProduct.id}
                product={selectedProduct}
                onBack={() => navigate(-1)}
                onSizingOpen={() => setIsSizingOpen(true)}
                lustListItems={lustListItems}
                onToggleLust={handleToggleLust}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={(p, colorName, size) => {
                  handleAddToCart(p, colorName || p.colors[0].name, size || p.sizes[0]);
                }}
              /></PageTransition>
            ) : (
              <div className="pt-32 text-center h-screen flex items-center justify-center">
                {products.length === 0 ? 'Loading products...' : 'Product not found.'}
              </div>
            )
          } />
          <Route path="/returns-and-exchanges" element={<PageTransition><SEO {...ROUTE_META['/returns-and-exchanges']} /><LegalView type="returns" /></PageTransition>} />
          <Route path="/refund-policy" element={<PageTransition><SEO {...ROUTE_META['/refund-policy']} /><LegalView type="refunds" /></PageTransition>} />
          <Route path="/privacy-policy" element={<PageTransition><SEO {...ROUTE_META['/privacy-policy']} /><LegalView type="privacy" /></PageTransition>} />
          <Route path="/terms-of-service" element={<PageTransition><SEO {...ROUTE_META['/terms-of-service']} /><LegalView type="terms" /></PageTransition>} />
          <Route path="/track-order" element={<PageTransition><SEO {...ROUTE_META['/track-order']} /><OrderTrackingView /></PageTransition>} />
          {/* Checkout route removed for Shopify Headless */}
        </Routes>
        </Suspense>
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
