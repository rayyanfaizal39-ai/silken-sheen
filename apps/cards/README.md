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
been verified. For local testing, set it to `true` and run both apps on the **same hostname**,
for example Main on `http://localhost:8080` and Cards on `http://localhost:4174` with
`VITE_CARDS_SITE_URL=http://localhost:4174` and `VITE_MAIN_SITE_URL=http://localhost:8080`.
Browsers scope cookies by hostname, not port, so Main on `localhost` and Cards on `127.0.0.1`
cannot share a session. Both apps also need the same Supabase project, with the Cards migrations
applied, before a signed-in student can load the Studio. For an authenticated remote preview, use the explicitly allow-listed
`https://preview.cards.myacademy.my` hostname; a `pages.dev` hostname cannot receive the existing
`.myacademy.my` session cookie.

`VITE_MAIN_SITE_URL` sets the Main origin used for login, upgrade and "back to learning" links. It
defaults to `https://www.myacademy.my`; only HTTPS origins (or local `http://localhost` /
`http://127.0.0.1`) are accepted, and anything else falls back to production. Point it at the Main
preview when testing both previews together.

Supabase Auth needs the central AcadeMY callback URL, not a token-bearing Cards redirect. Cards
passes only an allow-listed destination URL to Main's login page; it never places an access token
or refresh token in a redirect URL.

## Student entrance and rollback

With `VITE_CARDS_INTEGRATION_ENABLED=true`, Main's **My Nova** navigation item (the former Cosmic
Companion position, `/companion`) renders an animated portal (`src/features/nova-portal`). Its one
action, **Enter your Nova universe**, plays the opening and hands off in the same tab to this app's
`/studio`, where the existing cinematic Studio begins. Main's own `/nova` and `/nova/studio` routes
redirect to the portal and `/nova/demo` to this app's `/demo`, so students have one entrance.
Returning students with a permanent Nova are shown their saved card by the Studio.

Setting the flag to `false` restores the original Cosmic Companion page and Main's own Nova routes,
which is the rollback path until the production release is approved.

When the Studio cannot load a student's account it states the actual cause: signed out, no database
connection in this environment, Nova storage awaiting its reviewed migration, or the server being
unreachable. Only the signed-out case offers sign-in.
