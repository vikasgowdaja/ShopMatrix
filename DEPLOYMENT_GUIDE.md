# GitHub Pages Deployment Guide

## Overview
This project is configured for deployment to GitHub Pages. All necessary changes have been made to support static hosting.

## What Was Changed for GitHub Pages Compatibility

### 1. ✅ Router Configuration
- **Changed**: `BrowserRouter` → `HashRouter`
- **Why**: GitHub Pages doesn't support HTML5 History API. HashRouter uses URL hashes (e.g., `/#/products`) which work on static hosts
- **File**: `src/App.tsx`

### 2. ✅ Base URL Configuration
- **Setting**: `base: "/ShopMatrix/"` in `vite.config.ts`
- **Why**: All assets must be served from the `/ShopMatrix/` subdirectory
- **File**: `vite.config.ts`

### 3. ✅ Mock API Configuration
- **Status**: Enabled for production
- **Why**: GitHub Pages can't run backend services; mock API ensures full functionality
- **File**: `.env.production` (sets `VITE_USE_MOCK_API=true`)

### 4. ✅ Jekyll Configuration
- **Added**: `.nojekyll` file in public folder
- **Why**: Prevents GitHub from processing the site as Jekyll; Vite handles all bundling
- **File**: `public/.nojekyll`

### 5. ✅ GitHub Actions Workflow
- **Added**: Automated CI/CD pipeline
- **What it does**: Automatically builds and deploys on every push to `main` branch
- **File**: `.github/workflows/deploy.yml`

### 6. ✅ Package.json Updates
- **Added**: `build:deploy` script for local deployment
- **Added**: `homepage` field for proper asset paths
- **File**: `package.json`

## Deployment Methods

### Method 1: Automatic (Recommended)
1. Ensure code is pushed to the `main` branch
2. GitHub Actions workflow automatically:
   - Installs dependencies
   - Builds the project
   - Deploys to GitHub Pages
3. Visit: `https://YOUR_USERNAME.github.io/ShopMatrix`

### Method 2: Manual Deployment
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## GitHub Settings Configuration

### Required Steps:
1. Go to your repository → **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - **Branch**: main (automatic deployment)
3. Under "GitHub Pages":
   - **Custom domain**: (optional - leave blank for username.github.io/ShopMatrix)
4. Save and wait ~5 minutes for first deployment

## Project Architecture for Deployment

```
ShopMatrix/
├── src/
│   ├── api/
│   │   ├── index.ts          (API layer - switches between real/mock)
│   │   └── mockApi.ts        (Mock data for production)
│   ├── lib/
│   │   └── api.ts            (Real API endpoints - unused on GitHub Pages)
│   ├── mock/
│   │   └── data.ts           (Mock products, companies, categories)
│   ├── App.tsx               (HashRouter instead of BrowserRouter)
│   └── ...
├── public/
│   └── .nojekyll             (Prevents Jekyll processing)
├── .github/
│   └── workflows/
│       └── deploy.yml        (GitHub Actions configuration)
├── .env                      (Dev: VITE_USE_MOCK_API=true)
├── .env.production           (Production: VITE_USE_MOCK_API=true)
├── vite.config.ts            (base: "/ShopMatrix/")
└── package.json              (homepage, scripts)
```

## Troubleshooting

### Issue: Assets not loading (404 errors)
- **Cause**: Incorrect base URL in vite.config.ts
- **Fix**: Verify `base: "/ShopMatrix/"` matches your repository name

### Issue: Routing not working (blank pages)
- **Cause**: Still using BrowserRouter instead of HashRouter
- **Fix**: Verify `src/App.tsx` uses `HashRouter`

### Issue: Deployed site is blank
- **Cause**: GitHub Pages settings not configured correctly
- **Fix**: Go to Settings → Pages and ensure "GitHub Actions" is selected

### Issue: 404 on page refresh
- **This is normal** for SPA with HashRouter - refresh works correctly
- SPA navigation uses hashes: `/#/products`, `/#/company/apple`

## Environment Variables

The project uses different environment files:
- `.env` - Local development
- `.env.production` - Production build (GitHub Pages)

Both currently use mock API since real backend isn't available on GitHub Pages.

## Performance Optimizations

- ✅ Vite handles tree-shaking
- ✅ React 18.3.1 with optimized rendering
- ✅ Tailwind CSS for minimal CSS output
- ✅ React Query (TanStack Query) for smart data caching
- ✅ Code splitting via React Router

## Features Working on GitHub Pages

✅ Product browsing and filtering  
✅ Company/Category navigation  
✅ Price range filtering  
✅ Availability filtering  
✅ Mock product data (2 sample products)  
✅ Responsive UI with Tailwind CSS  
✅ Dark/Light mode with next-themes  
✅ All UI components (shadcn/ui)  

## To Add More Mock Data

Edit `src/mock/data.ts`:

```typescript
export const mockProducts: Product[] = [
  {
    id: 'p3',
    productName: 'MacBook Pro',
    company: 'apple',
    category: 'Electronics',
    price: 150000,
    availability: 'yes',
    rating: 4.9,
    discount: 10,
    image: 'https://example.com/macbook.jpg'
  },
  // Add more products...
];
```

## Next Steps (Optional)

If you want to use a real backend API later:

1. Update `src/lib/api.ts` with your actual API endpoints
2. Change `.env.production` to `VITE_USE_MOCK_API=false`
3. Ensure CORS headers are properly configured on your API server
4. Consider using a backend service that supports GitHub Pages requirements

---

**Status**: ✅ Ready for GitHub Pages deployment!
