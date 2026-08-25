import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/lib/routeMeta';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const DEFAULT_KEYWORDS = 'PYNCH, luxury lingerie, intimate wear, bras, panties, bralettes, Indian lingerie brand, premium underwear, comfortable lingerie, mood-based lingerie';

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PYNCH',
  url: SITE_URL,
  sameAs: [
    'https://www.facebook.com/profile.php?id=61591969918421',
  ],
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PYNCH',
  url: SITE_URL,
};

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage,
  ogType = 'website',
  canonical,
  jsonLd,
}: SEOProps) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | PYNCH` : DEFAULT_TITLE;
  const canonicalUrl = canonical || `${SITE_URL}${pathname}`;
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;
  const absoluteOgImage = resolvedOgImage.startsWith('http')
    ? resolvedOgImage
    : `${SITE_URL}${resolvedOgImage}`;

  const structuredData = [
    ORGANIZATION_JSON_LD,
    WEBSITE_JSON_LD,
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="PYNCH" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data */}
      {structuredData.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
