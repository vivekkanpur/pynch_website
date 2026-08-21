# PYNCH Website — AI Agent Context Document

> **Purpose**: This file is the single source of truth for any AI agent working on this codebase. Read this before touching any file.

---

## 1. What Is PYNCH?

PYNCH is a **luxury Indian intimate-wear brand** targeting modern Indian women. The brand personality is sensual, confident, and editorial. The four core moods/collections are:

| Mood | Alias | Vibe |
|---|---|---|
| **Aarambh** | The Seductress | Bold, intense |
| **Ishq** | The Romantic | Soft, dreamy |
| **Shararat** | The Playful | Fun, cheeky |
| **Sukoon** | The Comfy | Laid-back, cozy |

The website lives at **justpynch.com** and is deployed on **Vercel**.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **React 19** + **Vite 6** (TypeScript) |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) |
| Routing | **React Router DOM v7** |
| E-Commerce | **Shopify Headless** via `@shopify/hydrogen-react` (Storefront API v2024-10) |
| Auth | **Firebase Auth** (Google OAuth + Phone/OTP) |
| Database | **Firebase Firestore** (user interactions, waitlist data) |
| Email | **Resend** (transactional emails) |
| Messaging | **Meta WhatsApp Business API** (welcome + discount messages) |
| Job Scheduling | **Upstash QStash** (Day-1 WhatsApp discount follow-up) |
| Cron Jobs | **Vercel Crons** (daily user sync at midnight) |
| Smooth Scroll | **@studio-freight/lenis** |
| Animations | **motion** (Framer Motion successor) |
| Icons | **lucide-react** |
| Bot Protection | **Cloudflare Turnstile** (`@marsidev/react-turnstile`) |
| SEO | **react-helmet-async** |
| Image Processing | **sharp** + custom `compress_images.js` script |
| Deployment | **Vercel** (SPA rewrites + serverless functions in `/api`) |

---

## 3. Project Structure

```
pynch_website/
├── src/                          # Frontend React app
│   ├── main.tsx                  # Entry point — mounts <App />
│   ├── App.tsx                   # Root: providers, routing, global state
│   ├── index.css                 # Global styles + Tailwind base
│   ├── types.ts                  # Shared TypeScript interfaces
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Header.tsx            # Nav, mobile menu, search, theme toggle
│   │   ├── Footer.tsx            # Links, newsletter, social
│   │   ├── CartDrawer.tsx        # Shopify cart slide-out panel
│   │   ├── LustListDrawer.tsx    # Wishlist slide-out panel
│   │   ├── SizeGuideDrawer.tsx   # Size guide slide-out panel
│   │   ├── SizingGuide.tsx       # Full sizing guide content
│   │   ├── ProductCard.tsx       # Card with hover swap, quick-add, lust toggle
│   │   ├── ProductGrid.tsx       # Wraps ProductCard in a grid
│   │   ├── CategoryGrid.tsx      # Grid of category CTAs
│   │   ├── WaitlistForm.tsx      # Multi-step waitlist signup form
│   │   ├── CustomerReviews.tsx   # Reviews/testimonials carousel
│   │   ├── MoodsSection.tsx      # Static mood display section
│   │   ├── TogglableMoods.tsx    # Interactive mood filter/toggle
│   │   ├── FitGuide.jsx          # Fit guide explainer UI
│   │   ├── FitGuideGraphic.jsx   # SVG/visual for fit guide
│   │   ├── SizeCalculator.jsx    # Interactive size calculator tool
│   │   ├── CustomCursor.tsx      # Custom branded cursor
│   │   ├── PageTransition.tsx    # Framer Motion page fade wrapper
│   │   ├── BackToTop.tsx         # Floating back-to-top button
│   │   ├── ThemeProvider.tsx     # Light/dark theme context
│   │   ├── SEO.tsx               # Helmet-based SEO meta tags
│   │   └── ShopifyCartIdentitySync.tsx  # Syncs Firebase user to Shopify cart
│   │
│   ├── views/                    # Page-level components (one per route)
│   │   ├── LandingView.tsx       # / — Homepage with hero, moods, featured products
│   │   ├── ShopView.tsx          # /shop — Full product listing
│   │   ├── CollectionsView.tsx   # /collections — Mood-based collections
│   │   ├── ProductDetailView.tsx # /product — PDP with Shopify buy integration
│   │   ├── PhilosophyView.tsx    # /our-world — Brand philosophy editorial
│   │   ├── TashuStudioView.tsx   # /tashu-studio — Designer profile/editorial
│   │   ├── WaitlistView.tsx      # /waitlist — Waitlist landing + form
│   │   ├── LoginView.tsx         # /login — Firebase Auth login
│   │   ├── AccountView.tsx       # /account — Orders, profile, lust list
│   │   ├── LustListView.tsx      # /lust-list — Saved/wishlist products
│   │   ├── SizeGuideView.tsx     # /size-guide — Full sizing page
│   │   ├── OrderTrackingView.tsx # /track-order — Order status tracking
│   │   ├── LegalView.tsx         # /returns, /privacy, /terms, /refund-policy
│   │   ├── EditorialView.tsx     # (editorial/journal content)
│   │   └── CheckoutView.tsx      # /checkout — Stub; Shopify handles checkout URL
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx       # Firebase auth state (user, loading)
│   │
│   ├── hooks/
│   │   └── useShopifyProducts.ts # Fetches products; currently forces MOCK_PRODUCTS
│   │
│   ├── lib/
│   │   ├── shopify.ts            # Storefront API client, queries, data mapper
│   │   └── firebase.ts           # Firebase app, auth, firestore, logUserInteraction()
│   │
│   └── data/
│       ├── products.ts           # Canonical local product data (41 KB — source of truth)
│       ├── mockProducts.ts       # Mock data used while Shopify sync is pending
│       └── product_name_suggestions.txt
│
├── api/                          # Vercel Serverless Functions (Node.js)
│   ├── waitlist.js               # POST /api/waitlist — Main waitlist signup handler
│   ├── waitlist-count.js         # GET /api/waitlist-count — Returns waitlist count
│   ├── export-waitlist.js        # GET /api/export-waitlist — CSV export (admin)
│   ├── send-discount.js          # POST /api/send-discount — QStash callback for Day-1 WA
│   ├── cron/
│   │   └── sync-users.js         # Cron: syncs Firebase users daily to Firestore
│   └── utils/
│       └── generateCodes.js      # Generates coupon + referral codes
│
├── public/                       # Static assets served as-is
├── assets/                       # Raw/source assets (pre-compression)
├── dist/                         # Vite build output (gitignored)
│
├── index.html                    # Vite entry HTML
├── vite.config.ts                # Vite config — Tailwind plugin, /api proxy to :3001
├── vercel.json                   # SPA rewrites + Vercel cron definitions
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies and npm scripts
├── firestore.rules               # Firestore security rules
├── firebase.json                 # Firebase hosting config
├── .env                          # Local secrets (NEVER commit)
├── .env.example                  # Template for required env vars
├── .env.local                    # Local overrides
│
├── AGENT_CONTEXT.md              # This file
│
└── [Utility Scripts]
    ├── compress_images.js        # Batch WebP compression via sharp
    ├── compress_python.py        # Python image compression alternative
    ├── generate_csv.py           # Generates Shopify import CSV from products.ts
    ├── generate_csv_from_dirs.py # CSV generation from image directories
    ├── export_shopify_csv.ts     # TypeScript Shopify CSV exporter
    ├── shopify_import.csv        # Generated Shopify product import file
    ├── create_mock.py            # Generates mockProducts.ts
    ├── generate_mock.py          # Alternative mock generator
    ├── find_modified.js          # Lists recently modified files
    ├── list_products.js          # Lists product IDs/names
    ├── restore_wide_images.py    # Restores original wide images
    ├── updateColors.cjs          # Updates color hex values in product data
    ├── check_git.js              # Git status helper
    ├── dev-server.js             # Local express server mimicking Vercel /api
    └── test-db.js                # Firebase connection test
```

---

## 4. Routing Map

| URL Path | View Component | Notes |
|---|---|---|
| `/` | `LandingView` | Homepage |
| `/shop` | `ShopView` | All products, filterable |
| `/collections` | `CollectionsView` | Mood-based browsing |
| `/product` | `ProductDetailView` | State-driven (no URL param) |
| `/our-world` | `PhilosophyView` | Brand editorial |
| `/tashu-studio` | `TashuStudioView` | Designer/founder page |
| `/waitlist` | `WaitlistView` | Waitlist signup |
| `/login` | `LoginView` | Firebase login |
| `/account` | `AccountView` | Protected user account page |
| `/lust-list` | `LustListView` | Wishlist (localStorage) |
| `/size-guide` | `SizeGuideView` | Full sizing page |
| `/track-order` | `OrderTrackingView` | Order tracking |
| `/returns-and-exchanges` | `LegalView` (returns) | |
| `/refund-policy` | `LegalView` (refunds) | |
| `/privacy-policy` | `LegalView` (privacy) | |
| `/terms-of-service` | `LegalView` (terms) | |

> **IMPORTANT**: Product navigation is state-based — `selectedProduct` state in `App.tsx` is set by `handleSelectProduct()`, then the router navigates to `/product`. There are NO URL params for individual products currently.

---

## 5. Key Data Flows

### 5a. Product Data
```
src/data/products.ts          <- Canonical source of truth (41KB, all products)
src/data/mockProducts.ts      <- Used by useShopifyProducts (currently forced)
useShopifyProducts.ts hook    <- Returns products[] (currently always mock)
Views (ShopView, LandingView) <- Consume hook or props
```
> **NOTE**: `useShopifyProducts` currently **forces mock data** (real Shopify fetch is commented out). To enable live data: uncomment `storeFetch()` call and remove the forced mock assignment.

### 5b. Cart Flow (Shopify Headless)
```
ShopifyProvider + CartProvider (App.tsx root)
  -> ProductDetailView -> useCart().linesAdd() -> adds real Shopify line items
  -> CartDrawer -> useCart() -> renders cart, calls checkoutUrl for redirect
  -> useCart().totalQuantity -> Header cart badge count
```

### 5c. Auth Flow
```
Firebase Auth (Google OAuth / Phone OTP)
  -> AuthContext.tsx -> provides { user, loading }
  -> LoginView.tsx -> triggers loginWithGoogle() or signInWithPhoneNumber()
  -> AccountView.tsx -> reads user, displays orders
  -> ShopifyCartIdentitySync.tsx -> associates Firebase user with Shopify cart
```

### 5d. Waitlist Flow
```
WaitlistForm.tsx (frontend)
  -> POST /api/waitlist
       -> Cloudflare Turnstile verification
       -> Firebase Firestore: stores signup (name, email, phone, referral)
       -> Google Sheets: appends row via google-spreadsheet
       -> Resend: welcome email
       -> Meta WhatsApp API: immediate welcome message
       -> QStash: schedules Day-1 discount WhatsApp via /api/send-discount
```

### 5e. Lust List (Wishlist)
```
lustListItems state (App.tsx)  <- initialized from localStorage key 'pynch_lust_list'
  -> handleToggleLust(product) -> add/remove product
  -> useEffect -> persists to localStorage
  -> LustListView -> reads lustListItems prop
```

---

## 6. Global State (App.tsx)

All global state lives in `AppContent` component (inside `App.tsx`). There is **no Redux or Zustand**. State is **prop-drilled** from `App.tsx` to views.

| State | Type | Purpose |
|---|---|---|
| `selectedProduct` | `Product or null` | Current product for PDP |
| `isCartOpen` | `boolean` | CartDrawer visibility |
| `isSizingOpen` | `boolean` | SizeGuideDrawer visibility |
| `lustListItems` | `Product[]` | Wishlist (persisted to localStorage) |

> Cart state is managed entirely by Shopify's `CartProvider` — never replicate this locally.

---

## 7. Core Types (`src/types.ts`)

```typescript
interface ProductColor {
  name: string;
  hex: string;
  images: string[];  // [0] = lifestyle/front, [1] = detail/texture
}

interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;           // 'bras' | 'bralettes' | 'panties' | 'sets' etc.
  colors: ProductColor[];
  sizes: string[];            // e.g. ['XS', 'S', 'M', 'L', 'XL']
  materials: string;
  details: string[];
  features: string[];
  fitInfo: string;
  story: string;
  washingGuide?: string;
  mood?: string;              // 'aarambh' | 'ishq' | 'shararat' | 'sukoon'
  videos?: string[];
  keepFullImage?: boolean;    // if true, disables image cropping in cards
  shopifyVariants?: any[] | null;
}

interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

interface JournalArticle {
  id: string; title: string; subtitle: string; date: string;
  readTime: string; author: string; excerpt: string;
  content: string[]; image: string; quote?: string;
  collectionLink?: { text: string; category: string; };
}
```

---

## 8. Environment Variables

### Frontend (VITE_ prefix — exposed to browser bundle)
| Variable | Purpose |
|---|---|
| `VITE_SHOPIFY_STORE_DOMAIN` | Shopify store domain (e.g. `store.myshopify.com`) |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Shopify Storefront API public token |
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |

### Backend (Vercel serverless only — never in browser)
| Variable | Purpose |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Admin SDK JSON (stringified) |
| `RESEND_API_KEY` | Resend email API key |
| `META_WHATSAPP_TOKEN` | Meta WhatsApp Business token |
| `META_PHONE_NUMBER_ID` | Meta phone number ID |
| `QSTASH_TOKEN` | Upstash QStash publishing token |
| `QSTASH_CURRENT_SIGNING_KEY` | QStash webhook verification |
| `QSTASH_NEXT_SIGNING_KEY` | QStash webhook verification (rotation) |
| `VERCEL_URL` | Deployed URL (e.g. `justpynch.com`) — for QStash callbacks |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server-side verify) |
| `GEMINI_API_KEY` | Google Gemini AI API key |

---

## 9. API Endpoints (`/api/`)

All functions in `/api/` are Vercel Serverless Functions (Node.js ESM).

| Method | Endpoint | File | Purpose |
|---|---|---|---|
| POST | `/api/waitlist` | `api/waitlist.js` | Waitlist signup (Firestore + Sheets + Email + WhatsApp) |
| GET | `/api/waitlist-count` | `api/waitlist-count.js` | Returns total waitlist count |
| GET | `/api/export-waitlist` | `api/export-waitlist.js` | Admin CSV export of waitlist |
| POST | `/api/send-discount` | `api/send-discount.js` | QStash callback — sends Day-1 discount WA |
| GET | `/api/cron/sync-users` | `api/cron/sync-users.js` | Daily Vercel cron — syncs Firebase users |

**Local dev proxy**: Vite proxies `/api/*` to `http://localhost:3001`. Run `npm run dev:api` to start `dev-server.js` which mimics Vercel serverless functions locally.

---

## 10. Vercel Configuration

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "crons": [{ "path": "/api/cron/sync-users", "schedule": "0 0 * * *" }]
}
```
- All routes fall through to `index.html` (SPA pattern).
- The cron fires daily at midnight UTC to sync users.

---

## 11. Shopify Integration Details

- **Library**: `@shopify/hydrogen-react` v2024.1.0
- **API Version**: Storefront API `2024-10`
- **Provider tree** in `App.tsx`:
  ```
  HelmetProvider > ShopifyProvider > CartProvider > AuthProvider > ThemeProvider > AppContent
  ```
- **Cart operations**: `useCart()` hook — `linesAdd()` to add items. `checkoutUrl` redirects to Shopify-hosted checkout. **No custom /checkout page**.
- **Products**: `useShopifyProducts` hook currently forces `MOCK_PRODUCTS`. Storefront API query is defined in `src/lib/shopify.ts`.
- **CSV tooling**: `generate_csv.py` / `export_shopify_csv.ts` → `shopify_import.csv` — for bulk product creation in Shopify admin.

---

## 12. Firebase Details

- **Auth methods**: Google OAuth (`signInWithPopup`) + Phone OTP (`signInWithPhoneNumber` with `RecaptchaVerifier`)
- **Firestore collections**:
  - `waitlist/` — Waitlist signups
  - `users/{uid}/interactions/` — User interaction logs (via `logUserInteraction()`)
- **Admin SDK**: Used in `/api/waitlist.js` and `/api/cron/sync-users.js` (server-side only, initialized from `FIREBASE_SERVICE_ACCOUNT` env var)
- **Client SDK**: Initialized in `src/lib/firebase.ts` using `VITE_FIREBASE_*` env vars

---

## 13. Styling & Design System

- **CSS Framework**: Tailwind CSS v4 — uses new `@tailwindcss/vite` plugin (NOT PostCSS plugin)
- **Theme system**: CSS custom properties via `ThemeProvider.tsx` — light/dark toggle using `--theme-bg`, `--theme-text`, etc.
- **Global CSS**: `src/index.css` — Tailwind base, CSS variable definitions, font face rules
- **Fonts**: Google Fonts — loaded in `index.html`
- **Animations**: `motion` library (Framer Motion v12+) + CSS transitions
- **Smooth scroll**: Lenis initialized globally in `App.tsx` with 0.6s duration

> **DO NOT** add `overflow: hidden` to `body` — it breaks Lenis smooth scrolling.

---

## 14. NPM Scripts

| Script | Command | Description |
|---|---|---|
| Dev (frontend) | `npm run dev` | Vite on port 3000 |
| Dev (API) | `npm run dev:api` | Express on port 3001 |
| Dev (full stack) | `npm run dev:full` | Both in parallel |
| Build | `npm run build` | Vite production build → `dist/` |
| Preview | `npm run preview` | Preview production build |
| Type check | `npm run lint` | `tsc --noEmit` |

---

## 15. Coding Conventions & Gotchas

1. **Product navigation is state-based**: Use `onSelectProduct(product)` prop callback. Do NOT add URL params like `/product/:id` without major refactor.
2. **Props are drilled from App.tsx**: `lustListItems`, `onToggleLust`, `onSelectProduct`, `onQuickAdd` are passed as props — not via context.
3. **Cart is Shopify-managed**: Never implement custom cart state. Use `useCart()` from hydrogen-react.
4. **Mock data is intentional**: `useShopifyProducts` forces `MOCK_PRODUCTS` during development.
5. **API files use ESM**: All `/api/*.js` files use `import`/`export` (not `require`).
6. **Image convention**: `ProductColor.images[0]` = lifestyle/front view, `[1]` = detail/texture view. `keepFullImage: true` disables card cropping.
7. **SEO component**: Wrap every route in `<SEO title="..." description="..." />`.
8. **Page transitions**: Every route element is wrapped in `<PageTransition>` for fade animations.
9. **New components should be `.tsx`**: Only legacy FitGuide and SizeCalculator are `.jsx`.
10. **Tailwind v4 syntax**: Uses CSS-first config — no `tailwind.config.js` file. Customize via CSS variables.

---

## 16. Feature Status

| Feature | Status | Notes |
|---|---|---|
| Full site routing | Done | All 16 routes |
| Header & Footer | Done | Nav, mobile menu, search, theme toggle |
| Landing page | Done | Hero, moods, featured products |
| Shop / product listing | Done | Filterable |
| Collections (mood-based) | Done | |
| Product Detail Page | Done | With Shopify buy integration |
| Shopify Cart (headless) | Done | CartDrawer + checkout redirect |
| Lust List / Wishlist | Done | localStorage persisted |
| Firebase Auth | Done | Google OAuth + Phone OTP |
| Account page | Done | Orders, profile |
| Waitlist system | Done | Firestore + Sheets + Email + WA |
| WhatsApp Day-1 discount | Done | QStash scheduled |
| Size Guide (full page) | Done | |
| Size Calculator | Done | |
| Order Tracking | Done | |
| Legal pages | Done | 4 legal docs |
| Philosophy / Our World page | Done | |
| Tashu Studio page | Done | |
| SEO meta tags | Done | react-helmet-async |
| Smooth scroll (Lenis) | Done | |
| Dark/Light theme | Done | |
| Image compression pipeline | Done | sharp + WebP |
| Shopify CSV import tooling | Done | |
| Live Shopify product sync | Pending | Mock data forced in useShopifyProducts |
| Shopify identity sync | Partial | Component exists, needs testing |

---

*Generated: 2026-08-21. Run a fresh scan if significant features have been added since.*
