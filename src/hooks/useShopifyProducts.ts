import { useState, useEffect } from 'react';
import { storeFetch, PRODUCTS_QUERY, mapShopifyProductsToLocal } from '../lib/shopify';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';

// Module-level cache shared by every component that calls this hook, so the
// full product catalog is fetched from Shopify at most once per page load
// instead of once per mounted view (Shop, Collections, Product detail, App
// shell all called this independently, causing repeated loading flashes and
// duplicate network requests on every navigation).
let cachedProducts: Product[] | null = null;
let cachedError: string | null = null;
let inFlightRequest: Promise<void> | null = null;
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((listener) => listener());
}

function loadProducts(): Promise<void> {
  if (!inFlightRequest) {
    inFlightRequest = (async () => {
      try {
        const response = await storeFetch(PRODUCTS_QUERY, { first: 250 });
        cachedProducts = mapShopifyProductsToLocal(response);
        cachedError = null;
      } catch (err: any) {
        console.error('Failed to fetch Shopify products:', err);
        cachedProducts = MOCK_PRODUCTS as Product[];
        cachedError = 'Using local data — live sync temporarily unavailable';
      } finally {
        notifySubscribers();
      }
    })();
  }
  return inFlightRequest;
}

export function useShopifyProducts() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const listener = () => forceRender((n) => n + 1);
    subscribers.add(listener);
    if (cachedProducts === null) {
      loadProducts();
    }
    return () => {
      subscribers.delete(listener);
    };
  }, []);

  return {
    products: cachedProducts ?? [],
    loading: cachedProducts === null,
    error: cachedError,
  };
}
