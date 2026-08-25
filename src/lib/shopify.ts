import { createStorefrontClient } from '@shopify/hydrogen-react';
import type { Product } from '../types';

export const client = (() => {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
  if (!domain || !token) {
    console.warn('Shopify env vars missing: live sync unavailable');
  }
  return createStorefrontClient({
    storeDomain: domain,
    publicStorefrontToken: token,
    storefrontApiVersion: '2024-10',
  });
})();

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;

export async function storeFetch<T>(query: string, variables = {}): Promise<T> {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error('Network response from Shopify was not ok');
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error('GraphQL Errors: ' + JSON.stringify(json.errors));
  }

  return json.data as T;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url(transform: { maxWidth: 1600 })
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function mapShopifyProductsToLocal(shopifyData: any): Product[] {
  if (!shopifyData?.products?.edges) return [];
  
  return shopifyData.products.edges.map(({ node }: any) => {
    // Map Shopify images (guard against missing images connection)
    const images = (node.images?.edges ?? []).map((e: any) => e.node.url).filter(Boolean);

    // Extract sizes from variants (assuming option name is 'Size')
    const sizes = (node.variants?.edges ?? [])
      .map((e: any) => e.node.selectedOptions?.find((o: any) => o.name === 'Size')?.value)
      .filter(Boolean);
      
    // Deduplicate sizes
    const uniqueSizes = Array.from(new Set(sizes));

    // Extract color names from variant options (assuming option name is 'Color')
    const colorNames = Array.from(new Set(
      (node.variants?.edges ?? [])
        .map((e: any) => e.node.selectedOptions?.find((o: any) => o.name === 'Color')?.value)
        .filter(Boolean)
    ));
    const palette = ['#8B7355', '#C4A882', '#D4C4B0', '#E8DCC8', '#F5EFE6', '#3E2F23'];

    // Extract mood from tags (Aarambh, Ishq, Shararat, Sukoon)
    // Shopify Storefront API returns `tags` as a string array, not a comma-separated string
    const tags = Array.isArray(node.tags)
      ? node.tags.map((t: string) => t.trim())
      : (node.tags ? String(node.tags).split(',').map((t: string) => t.trim()) : []);
    const moods = ['Aarambh', 'Ishq', 'Shararat', 'Sukoon'];
    const productMood = tags.find((t: string) => moods.includes(t)) || null;

    return {
      id: node.id,
      sku: node.handle,
      handle: node.handle,
      name: node.title,
      tagline: node.handle, // fallback
      description: node.description,
      price: parseFloat(node.priceRange?.minVariantPrice?.amount ?? '0'),
      category: (node.productType || tags[0] || 'sets').toLowerCase(),
      mood: productMood,
      colors: (colorNames.length > 0 ? colorNames : ['Default']).map((cname, i) => ({
        name: cname,
        hex: palette[i % palette.length],
        images: images.length > 0 ? images : [],
      })),
      sizes: uniqueSizes,
      materials: 'Shopify Product Material',
      details: ['Fetched dynamically from Shopify'],
      features: ['Storefront API Integration'],
      fitInfo: 'Standard fit',
      story: 'Story fetched from Shopify backend.',
      shopifyVariants: (node.variants?.edges ?? []).map((e: any) => e.node)
    };
  });
}
