import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const DEFAULT_TITLE = 'PYNCH — Luxury Intimate Wear | Dress The Person, Not The Performance';
const DEFAULT_DESCRIPTION = 'PYNCH is a luxury intimate wear brand built around four moods — Sukoon, Shararat, Ishq, and Aarambh. Premium fabrics, zero hardware, designed to honor your natural geometry.';
const DEFAULT_KEYWORDS = 'PYNCH, luxury lingerie, intimate wear, bras, panties, bralettes, Indian lingerie brand, premium underwear, comfortable lingerie, mood-based lingerie';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage,
  ogType = 'website',
  canonical,
}: SEOProps) {
  const fullTitle = title ? `${title} | PYNCH` : DEFAULT_TITLE;

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
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
