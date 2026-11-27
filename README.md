# Resux showcase

A small shop built with [Resux](https://github.com/MahmoudAbdalrhmanMohamed/resux). It exercises server rendering, resumable handlers, components and slots, native events, client navigation, API routes and the deploy targets.

```sh
npm install
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## What it covers

- Pages and layout: home, products, product detail (dynamic route), cart, about, error page.
- Components: `Panel` (named slots), `ProductCard` (props, emit, scoped slot), `Pill`, `Promo` (created in the browser inside `v-if`).
- State: local refs, `useGlobalState` for the cart, a Vue island.
- Server: `/api/products`, `/api/orders` (POST), middleware, plugins.
- Deploy targets: set `deploy.target` in `resux.config.ts` (`node`, `static`, `vercel`, `netlify`, `cloudflare`).

## End-to-end check

`e2e/e2e.mjs` drives the built app with Playwright (home counter resume, client-created components, cart flow, checkout, direct load of a dynamic route). Run `npm run build`, then adapt the Chromium path at the top of the script and run it with Node.

## Notes

- `$fetch` does not serialize object bodies. The app sends `JSON.stringify(...)` with a `content-type` header.
- Needs `resuxjs` 0.5.0 or newer. Node 22.19 or newer.
