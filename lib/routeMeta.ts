// Single source of truth for per-route SEO copy. Used client-side by
// src/App.tsx (via the SEO component) and at the edge by middleware.ts,
// which bakes the same title/description into the HTML served to bots
// that don't execute JS (link-preview crawlers, some search engines).

export const SITE_URL = 'https://justpynch.com';

export const DEFAULT_TITLE = 'PYNCH — Luxury Intimate Wear | Dress The Person, Not The Performance';
export const DEFAULT_DESCRIPTION = 'PYNCH is a luxury intimate wear brand built around four moods — Aarambh, Ishq, Shararat, and Sukoon. Premium fabrics, zero hardware, designed to honor your natural geometry.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export interface RouteMeta {
  title?: string;
  description?: string;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {},
  '/waitlist': {
    title: 'Join the Waitlist',
    description: 'Be the first to experience PYNCH luxury intimate wear. Join our exclusive waitlist for early access to our collections.',
  },
  '/shop': {
    title: 'Shop All Intimates',
    description: 'Explore the full PYNCH collection — bras, bralettes, panties, and more. Premium fabrics, zero hardware, designed for your comfort.',
  },
  '/collections': {
    title: 'Collections',
    description: 'Browse PYNCH mood-based collections — Aarambh (Seductress), Ishq (Romantic), Shararat (Playful), and Sukoon (Comfy).',
  },
  '/our-world': {
    title: 'Our World',
    description: 'Discover the PYNCH philosophy — we dress the person, not the performance. Four moods, four versions of you, all of them real.',
  },
  '/login': {
    title: 'Log In',
    description: 'Sign in to your PYNCH account to manage orders, track deliveries, and access your Lust List.',
  },
  '/account': {
    title: 'My Account',
  },
  '/size-guide': {
    title: 'Sizing & Comfort Guide',
    description: 'Find your perfect PYNCH fit with our comprehensive sizing guide and comfort calculator.',
  },
  '/tashu-studio': {
    title: 'Tashu Studio',
    description: "Meet the creator behind PYNCH. Explore Tashu's vision for redefining luxury intimate wear.",
  },
  '/lust-list': {
    title: 'Lust List',
    description: 'Your curated selection of PYNCH pieces you love.',
  },
  '/returns-and-exchanges': {
    title: 'Returns & Exchanges',
    description: 'PYNCH returns and exchanges policy. We want you to love your purchase.',
  },
  '/refund-policy': {
    title: 'Refund Policy',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
  },
  '/terms-of-service': {
    title: 'Terms of Service',
  },
  '/track-order': {
    title: 'Track My Order',
    description: 'Track your PYNCH order status and delivery updates.',
  },
};
