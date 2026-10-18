# AcadeMY Cards

Standalone TanStack Start application for `https://cards.myacademy.my`.

The application imports the existing Nova companion domain module from the repository root, but
owns its route tree, root layout, metadata, public assets, build output and Cloudflare Pages worker.
Database tables, RPC names, storage buckets and generation flags retain their existing `nova_*`
identifiers for compatibility.

## Local commands

```bash
npm ci
npm run build
npm test
npm run typecheck
```

From the repository root, `npm run build:cards` invokes this application's build.

## Cloudflare Pages project

- Project name: `academymy-cards`
- Root directory: `apps/cards`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist/client`
- Node version: use the same supported version as the existing AcadeMY Pages project
- Custom domain: `cards.myacademy.my`

Configure `VITE_CARDS_SITE_URL`, the existing Supabase project URL and its publishable/anon key in
both Production and Preview. Set the preview site URL to the exact preview origin. Keep
`NOVA_AI_ENABLED` and `NOVA_AI_BATCH_ENABLED` set to `false` until a separately approved activation.
Never configure a Supabase service-role or secret key in this application.

The main AcadeMY deployment keeps `VITE_CARDS_INTEGRATION_ENABLED=false` until a Cards preview has
been verified. For local testing, set it to `true` and point `VITE_CARDS_SITE_URL` at
`http://127.0.0.1:4174`. For an authenticated remote preview, use the explicitly allow-listed
`https://preview.cards.myacademy.my` hostname; a `pages.dev` hostname cannot receive the existing
`.myacademy.my` session cookie.

Supabase Auth needs the central AcadeMY callback URL, not a token-bearing Cards redirect. Cards
passes only an allow-listed destination URL to Main's login page; it never places an access token
or refresh token in a redirect URL.
