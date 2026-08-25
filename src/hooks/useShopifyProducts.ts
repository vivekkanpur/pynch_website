import { useState, useEffect } from 'react';
import { storeFetch, PRODUCTS_QUERY, mapShopifyProductsToLocal } from '../lib/shopify';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export function useShopifyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Fetch from live Shopify Storefront API
        const response = await storeFetch(PRODUCTS_QUERY, { first: 250 });
        const mappedProducts = mapShopifyProductsToLocal(response);
        setProducts(mappedProducts);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch Shopify products:', err);
        // Fallback to mock data on error
        setProducts(MOCK_PRODUCTS as Product[]);
        setError('Using local data — live sync temporarily unavailable');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
