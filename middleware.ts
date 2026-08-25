// This site is a client-rendered SPA — react-helmet-async sets per-page
// <title>/meta tags, but only after JS runs. Googlebot generally executes
// JS and copes fine, but link-preview crawlers (WhatsApp, Facebook,
// Twitter/X, Slack, iMessage, Discord) and some search bots (Bing) mostly
// don't. Without this, every shared PYNCH link — including product pages —
// previews with the generic homepage title/image instead of its own.
//
// This middleware detects those bots by user-agent and, for them only,
// serves the built index.html with the correct title/description/OG/
// canonical/JSON-LD already baked into <head>. Everyone else (real
// browsers, Googlebot) gets the untouched SPA shell as before.
import { ROUTE_META, SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from './lib/routeMeta';

export const config = {
  matcher: ['/((?!api/|.*\\..*).*)'],
};

const BOT_UA_REGEX = /facebookexternalhit|Facebot|Twitterbot|WhatsApp|Slackbot|LinkedInBot|TelegramBot|Discordbot|Googlebot|bingbot|Applebot|Pinterest|redditbot|SkypeUriPreview|vkShare|W3C_Validator|Yandex|DuckDuckBot|Bytespider/i;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url(transform: { maxWidth: 1200 })
          }
        }
      }
    }
  }
`;

async function fetchProductMeta(handle: string) {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) return null;

  try {
    const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query: PRODUCT_BY_HANDLE_QUERY, variables: { handle } }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const product = json?.data?.product;
    if (!product) return null;

    return {
      title: product.title,
      description: product.description || DEFAULT_DESCRIPTION,
      image: product.images?.edges?.[0]?.node?.url,
      price: product.priceRange?.minVariantPrice?.amount,
      currency: product.priceRange?.minVariantPrice?.currencyCode || 'INR',
      handle: product.handle,
    };
  } catch {
    return null;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType,
  jsonLd,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType: string;
  jsonLd?: Record<string, unknown>;
}) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | PYNCH`;
  const safeTitle = escapeHtml(fullTitle);
  const safeDescription = escapeHtml(description);
  const safeImage = escapeHtml(ogImage);
  const safeUrl = escapeHtml(canonicalUrl);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PYNCH',
      url: SITE_URL,
      sameAs: ['https://www.facebook.com/profile.php?id=61591969918421'],
    },
    ...(jsonLd ? [jsonLd] : []),
  ];

  return `
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="PYNCH" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:image" content="${safeImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
    <link rel="canonical" href="${safeUrl}" />
    ${structuredData.map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`).join('\n    ')}
  `;
}

export default async function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA_REGEX.test(ua)) return;

  const url = new URL(request.url);
  const pathname = url.pathname;
  const canonicalUrl = `${SITE_URL}${pathname}`;

  let head: string;
  const productMatch = pathname.match(/^\/product\/([^/]+)\/?$/);

  if (productMatch) {
    const handle = decodeURIComponent(productMatch[1]);
    const product = await fetchProductMeta(handle);
    if (!product) return; // unknown/invalid handle — let the SPA's own 404 handling take over

    head = buildHead({
      title: product.title,
      description: product.description,
      canonicalUrl,
      ogImage: product.image || DEFAULT_OG_IMAGE,
      ogType: 'product',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image ? [product.image] : [],
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: product.currency,
          price: product.price,
          availability: 'https://schema.org/InStock',
        },
      },
    });
  } else {
    const meta = ROUTE_META[pathname];
    if (meta === undefined && pathname !== '/') return; // unrecognized route — let the SPA handle it

    head = buildHead({
      title: meta?.title || DEFAULT_TITLE,
      description: meta?.description || DEFAULT_DESCRIPTION,
      canonicalUrl,
      ogImage: DEFAULT_OG_IMAGE,
      ogType: 'website',
    });
  }

  const shellRes = await fetch(new URL('/index.html', request.url));
  if (!shellRes.ok) return;
  const shell = await shellRes.text();
  const html = shell.replace(
    /<title>.*?<\/title>/s,
    () => head
  );

  return new Response(html, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
