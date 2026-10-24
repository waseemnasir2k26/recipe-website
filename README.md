# recipe-website

Front-end demo of a digital recipe store: browse recipes, add them to a cart, buy bundles or a monthly subscription, and see an admin view. Payments are simulated; no real checkout is connected.

**Live demo:** https://recipe-website-sand-theta.vercel.app

## What is in the demo

- Shop with a recipe catalog (data in `src/data/recipes.js`) and a recipe detail page.
- Bundles page and a $9.99/month subscription page.
- Cart drawer, checkout page with card and PayPal options, order confirmation, downloads page and login.
- Admin page with order and revenue views (demo data).

Routes: `/`, `/shop`, `/recipe/:id`, `/bundles`, `/subscription`, `/checkout`, `/order-confirmation`, `/downloads`, `/login`, `/admin`.

## Stack

React 19, Vite, Tailwind CSS 4, React Router 7. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev
```

## Limits

- Checkout waits a second and then confirms. There is no Stripe or PayPal SDK in the code; wiring real payments, accounts and file delivery is separate work.
- Recipes, prices and testimonials are sample content.

Demo built by SkynetLabs.
