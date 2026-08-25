const SITE_URL = 'https://justpynch.com';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/shop', priority: '0.9', changefreq: 'daily' },
  { path: '/collections', priority: '0.9', changefreq: 'daily' },
  { path: '/our-world', priority: '0.6', changefreq: 'monthly' },
  { path: '/tashu-studio', priority: '0.5', changefreq: 'monthly' },
  { path: '/size-guide', priority: '0.5', changefreq: 'monthly' },
  { path: '/waitlist', priority: '0.4', changefreq: 'monthly' },
  { path: '/lust-list', priority: '0.3', changefreq: 'monthly' },
  { path: '/returns-and-exchanges', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

const PRODUCT_HANDLES_QUERY = `
  query SitemapProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          handle
          updatedAt
        }
      }
    }
  }
`;

async function fetchProductHandles() {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) return [];

  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query: PRODUCT_HANDLES_QUERY, variables: { first: 250 } }),
  });

  if (!res.ok) return [];
  const json = await res.json();
  const edges = json?.data?.products?.edges ?? [];
  return edges.map((e) => ({ handle: e.node.handle, updatedAt: e.node.updatedAt }));
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlEntry(loc, { priority, changefreq, lastmod }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    '  </url>',
  ].filter(Boolean).join('\n');
}

export default async function handler(req, res) {
  let products = [];
  try {
    products = await fetchProductHandles();
  } catch (err) {
    console.error('sitemap: failed to fetch Shopify products', err);
  }

  const staticEntries = STATIC_ROUTES.map((route) =>
    urlEntry(`${SITE_URL}${route.path}`, route)
  );

  const productEntries = products.map((p) =>
    urlEntry(`${SITE_URL}/product/${encodeURIComponent(p.handle)}`, {
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: p.updatedAt ? p.updatedAt.slice(0, 10) : undefined,
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...productEntries].join('\n')}
</urlset>
`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}
