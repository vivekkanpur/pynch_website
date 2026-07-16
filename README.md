# PYNCH Storefront

Welcome to the custom headless commerce storefront for **PYNCH**. 
This is a modern, high-performance React application designed to provide a premium, editorial shopping experience, backed by Shopify's robust e-commerce engine.

## 🚀 Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion (`motion`) & Lenis (Smooth Scrolling)
- **Commerce:** Shopify Storefront API (Headless via `@shopify/hydrogen-react`)
- **Hosting / Deployment:** Vercel

## 📦 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vivekkanpur/pynch_website.git
   cd pynch_website
   ```

2. **Install dependencies:**
   ```bash
   # We use legacy-peer-deps because @shopify/hydrogen-react expects React 18
   # while we are using the cutting-edge React 19.
   npm install --legacy-peer-deps
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory (do not commit this file) and add your Shopify credentials:
   ```env
   VITE_SHOPIFY_STORE_DOMAIN=justpynch.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_token
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🛍️ Shopify Integration & Dummy Data

The application is built to dynamically fetch products from Shopify. 
However, to allow for seamless UI/UX development before the Shopify product catalog is fully populated, the app contains a **fallback dummy data system**.

- **Shopify Hook:** `src/hooks/useShopifyProducts.ts` handles the API calls to Shopify.
- **Mock Data:** If the Shopify API fails or returns no products (or if the `.env` variables are missing), the application will automatically fall back to the curated mock catalog defined in `src/data/mockProducts.ts`. 

## ⚠️ Important Notes for Future Developers

1. **React 19 & Peer Dependencies:**
   Because this project uses React 19, some libraries (like `@shopify/hydrogen-react` and `framer-motion`) may throw peer dependency warnings during `npm install`. 
   **Do not remove the `.npmrc` file.** It contains `legacy-peer-deps=true` which is strictly required for Vercel deployments to succeed without crashing during the build step.

2. **Image Optimization:**
   The category filters and mood thumbnails in `src/data/images/filters` have been heavily compressed into `.webp` formats and converted into looping `.gif` files to ensure instant loading. Avoid replacing these with massive uncompressed `.png` files, and never use `loading="lazy"` on above-the-fold imagery as it ruins the LCP (Largest Contentful Paint) metrics.

3. **Routing:**
   The application uses standard `react-router-dom` for client-side routing. The main layout and route definitions can be found in `src/App.tsx`.
