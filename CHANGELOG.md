# Changelog

All notable changes to this project are documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2026.10] - 2026-10-12

- recipe-website is a public front-end demo of a digital recipe e-commerce site (catalog, bundle builder, subscription, downloads, admin view); React 19 + Vite + Tailwind 4 with ten routes in src/App.jsx and a live demo on Vercel.
- Reviewed October 2026: tree re-checked; README links (live demo, skynetjoe.com) returned HTTP 200.
- Known gaps: the README still lists React 18 / Vite 5 / Framer Motion and advertises /cart, /faq, /about and /contact routes that do not exist in the code; no payment SDK is installed so checkout is front-end only; no tests and no LICENSE.
- Release housekeeping only: package version 0.1.0 to 0.2.0, Status line, changelog and Work with SkynetLabs section. README inaccuracies were not changed in this pass.

## [2026.09] - 2026-09-16

- Maintenance review of recipe-website — a front-end demo of a digital recipe e-commerce platform (recipe catalog, bundle builder, subscription, downloads and an admin view).
- Status: ten routes are wired in `src/App.jsx` — `/`, `/shop`, `/recipe/:id`, `/bundles`, `/subscription`, `/checkout`, `/order-confirmation`, `/admin`, `/login`, `/downloads` — over cart and auth React contexts, a `CartDrawer`, and recipe data held in `src/data/recipes.js`. README links a live demo at https://recipe-website-sand-theta.vercel.app; `vercel.json` handles SPA rewrites.
- Stack: React 19 + Vite 8 + Tailwind CSS 4, react-router-dom 7, lucide-react, ESLint 9; no backend, no tests.
- Reviewed September 2026: docs refreshed, package version bumped to 0.1.0, versioned as v2026.09. No pages, contexts, recipe data or config were changed.
- Known gaps: README drifts from the code — it lists React 18 / Vite 5 / Tailwind 3 and Framer Motion (not a dependency), and advertises `/cart`, `/faq`, `/about` and `/contact` pages that have no route or component; Stripe and PayPal are described as "ready" but no payment SDK is installed and checkout is front-end only; package version had never been set (0.0.0); no LICENSE and no CHANGELOG before this release.
