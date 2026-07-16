import { createStorefrontClient } from '@shopify/hydrogen-react';

export const client = createStorefrontClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '',
  publicStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
  storefrontApiVersion: '2024-01',
});

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
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
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

export function mapShopifyProductsToLocal(shopifyData: any): any[] {
  if (!shopifyData?.products?.edges) return [];
  
  return shopifyData.products.edges.map(({ node }: any) => {
    // Map Shopify images
    const images = node.images.edges.map((e: any) => e.node.url);
    
    // Extract sizes from variants (assuming option name is 'Size')
    const sizes = node.variants.edges
      .map((e: any) => e.node.selectedOptions.find((o: any) => o.name === 'Size')?.value)
      .filter(Boolean);
      
    // Deduplicate sizes
    const uniqueSizes = Array.from(new Set(sizes));

    return {
      id: node.id,
      name: node.title,
      tagline: node.handle, // fallback
      description: node.description,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      category: 'sets', // default until we map collections
      colors: [
        {
          name: 'Default',
          hex: '#000000',
          images: images.length > 0 ? images : ['https://via.placeholder.com/400'],
        }
      ],
      sizes: uniqueSizes.length > 0 ? uniqueSizes : ['XS', 'S', 'M', 'L'],
      materials: 'Shopify Product Material',
      details: ['Fetched dynamically from Shopify'],
      features: ['Storefront API Integration'],
      fitInfo: 'Standard fit',
      story: 'Story fetched from Shopify backend.',
      shopifyVariants: node.variants.edges.map((e: any) => e.node)
    };
  });
}
