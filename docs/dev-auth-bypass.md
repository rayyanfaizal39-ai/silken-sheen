# Local dev sign-in

`npm run dev` can sign in as a demo student with no Supabase project. The bypass is off unless all of these are true:

- the Vite dev server is running (`import.meta.env.DEV`)
- `.env.local` contains `VITE_DEV_AUTH_BYPASS=true`
- the site is opened on `localhost`, `127.0.0.1`, or `::1`
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not configured

Production builds drop the bypass. A production call that still asks for it fails closed.

## Turn it on

In the repo root, create `.env.local` (this file is gitignored):

```
VITE_DEV_AUTH_BYPASS=true
```

Do not put a Supabase URL or key in that file. Restart `npm run dev`, then open:

`http://localhost:8080/login?next=/companion`

Choose **Aisha · Form 1** or **Haziq · Form 2**. Answer the twelve questions, summon the companions, and choose one. The portrait card is on that page and at `http://localhost:8080/nova`. Tap the card for the QR code and barcode on the back.

Companion matching runs in the browser from the same matcher the server uses. No artwork job is sent, and `NOVA_AI_ENABLED` stays off. Each student's answers, choice, and card stay in this browser's `localStorage` under `academymy.dev-auth.v1`.

## Turn it off

Delete `VITE_DEV_AUTH_BYPASS` from `.env.local`, or set it to `false`, then restart `npm run dev`. To clear a local journey, remove the `academymy.dev-auth.v1` entry in the browser's site data.
