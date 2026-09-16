# Changelog

All notable changes to this project are documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2026.09] - 2026-09-16

- Maintenance review of recipe-website — a front-end demo of a digital recipe e-commerce platform (recipe catalog, bundle builder, subscription, downloads and an admin view).
- Status: ten routes are wired in `src/App.jsx` — `/`, `/shop`, `/recipe/:id`, `/bundles`, `/subscription`, `/checkout`, `/order-confirmation`, `/admin`, `/login`, `/downloads` — over cart and auth React contexts, a `CartDrawer`, and recipe data held in `src/data/recipes.js`. README links a live demo at https://recipe-website-sand-theta.vercel.app; `vercel.json` handles SPA rewrites.
- Stack: React 19 + Vite 8 + Tailwind CSS 4, react-router-dom 7, lucide-react, ESLint 9; no backend, no tests.
- Reviewed September 2026: docs refreshed, package version bumped to 0.1.0, versioned as v2026.09. No pages, contexts, recipe data or config were changed.
- Known gaps: README drifts from the code — it lists React 18 / Vite 5 / Tailwind 3 and Framer Motion (not a dependency), and advertises `/cart`, `/faq`, `/about` and `/contact` pages that have no route or component; Stripe and PayPal are described as "ready" but no payment SDK is installed and checkout is front-end only; package version had never been set (0.0.0); no LICENSE and no CHANGELOG before this release.
