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
        const data = await storeFetch(PRODUCTS_QUERY, { first: 20 });
        const localProducts = mapShopifyProductsToLocal(data);
        
        if (localProducts.length === 0) {
          // Fallback to mock data if store is empty
          setProducts(MOCK_PRODUCTS as Product[]);
        } else {
          setProducts(localProducts);
        }
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch Shopify products:', err);
        // Fallback to mock data on error as well
        setProducts(MOCK_PRODUCTS as Product[]);
        setError(null); // Clear error so UI renders the mock products
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
