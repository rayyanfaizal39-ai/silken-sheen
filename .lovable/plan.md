## Problem

After the Cloudflare Pages static deploy, the bundled entry chunk crashes with `Invariant failed` and the app never mounts.

Root cause: the static shell (`scripts/generate-static-shell.js`) injects `@tanstack/react-start`'s default client entry (`.../default-entry/client.tsx`). That entry calls `hydrateRoot` and expects an SSR-rendered HTML tree plus a serialized router/dehydrated state script. Our static shell only ships an empty `<div id="root"></div>`, so TanStack Start's hydration invariants fire immediately — exactly the `Invariant failed` from `index-D_XDOVAn.js`.

Local dev and Vercel SSR work because both have a real SSR pass that produces the markup the Start client expects. Cloudflare Pages here is a pure static deploy with no SSR, so we must bootstrap as a plain SPA — not an SSR hydration.

## Fix

Stop hydrating Start's SSR entry and mount the router as a SPA on the client.

1. Add `src/client.tsx` — a tiny SPA entry that:
   - imports `./styles.css` (so the manifest treats it as the real entry chunk and emits the CSS link),
   - calls `getRouter()` from `src/router.tsx`,
   - renders `<RouterProvider router={router} />` via `createRoot(document.getElementById("root")!).render(...)`.
   - No `hydrateRoot`, no Start server-entry imports.

2. Register that file as the Rollup entry for the client build in `vite.config.ts` (`vite.build.rollupOptions.input = { main: "src/client.tsx" }`). This is what makes it appear in `dist/client/.vite/manifest.json` as `isEntry`, so `scripts/generate-static-shell.js` picks it instead of Start's default-entry client. Server entry (`src/server.ts`) and SSR/Vercel paths stay untouched — those don't read the client manifest.

3. No changes to routes, providers, UI, styles, or content. `__root.tsx` still owns providers (QueryClientProvider, AuthProvider, CikguProvider, AppShell) because `RouterProvider` renders the route tree, so the existing provider chain runs unchanged.

4. Leave `scripts/generate-static-shell.js` as-is — it already reads whichever chunk is marked `isEntry` in the manifest, so swapping the entry is enough.

## Verification

- `npm run build && node scripts/generate-static-shell.js`
- Confirm `dist/client/index.html` references the new `client-*.js` chunk (not `index-*.js` from Start's default-entry).
- Serve `dist/client/` statically (`npx serve dist/client`) and confirm `/`, `/dashboard`, and a deep-link route load without `Invariant failed` in the console.

## Out of scope

UI, styling, content, routes, SSR/Vercel entry, and the existing error-capture wrapper in `src/server.ts` are not touched.
