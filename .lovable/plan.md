## Why the images are broken on localhost

Both images are healthy — I fetched them from production and got HTTP 200:

- `…/hero-astronaut.webp` → 200, 525 KB
- `…/academy-robot-2.png` → 200, 1.6 MB

They render fine on `acade-my.lovable.app` and inside the Lovable preview. They break **only on `http://localhost:8080`**.

Reason: every asset created via `lovable-assets create` (hero, robot, background, video, parents-dashboard, etc.) is referenced by a **relative path**:

```
/__l5e/assets-v1/<asset_id>/<filename>
```

`/__l5e/*` is not a real folder in the repo — it's a route served by Lovable's hosting edge (Cloudflare Worker). In the Lovable preview and the published site, that request is intercepted by Lovable's infra and streamed from R2. On raw `localhost:8080` (plain Vite dev, no Lovable proxy in front), nothing handles that path, so Vite returns its SPA fallback (index.html) with `Content-Type: text/html` — the browser treats it as a broken image.

This is why only asset-hosted images break; anything bundled through `src/assets/*` imports still works.

## Fix

Add a dev-only proxy in `vite.config.ts` that forwards `/__l5e/*` to the Lovable asset origin. No production impact — the proxy only runs under `vite dev`. Published builds continue to be served by the real Lovable edge.

### Change

`vite.config.ts` — add a `server.proxy` block inside `vite`:

```ts
vite: {
  server: {
    proxy: {
      "/__l5e": {
        target: "https://acade-my.lovable.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: { manifest: true },
  optimizeDeps: { /* unchanged */ },
  environments: { /* unchanged */ },
},
```

That's the entire change. After restarting the dev server:

- `http://localhost:8080/__l5e/assets-v1/<id>/hero-astronaut.webp` → proxied to Lovable CDN → 200 image/webp
- Hero astronaut, Cikgu AI robot, orbital background, intro video, parents-dashboard mockup all render on localhost.

### Verification

1. `curl -sI http://localhost:8080/__l5e/assets-v1/adf9ec40-a51c-42a7-aeff-59d48f294874/hero-astronaut.webp` must return `HTTP/1.1 200` with `content-type: image/webp` (not `text/html`).
2. Reload `/` and `/landing` on localhost — hero + robot visible, no broken-image icons.
3. Production untouched (proxy is dev-server only).

### Not in scope

- The hydration-mismatch runtime error in the console (`"You're doing great!"` vs `"Ready for another mission, Cadet?"` in `NextMissionCard`) is unrelated to the missing images — it's a separate SSR/client text mismatch. Happy to fix in a follow-up if you want.
