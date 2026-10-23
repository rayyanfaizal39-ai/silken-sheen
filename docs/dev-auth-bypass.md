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

Choose **Aisha · Form 1** or **Haziq · Form 2**. Answer the twelve questions, summon the companions, and choose one. Companion artwork is a local stand-in (a drawing already in this repo, or a portrait generated in the browser from the companion's species and element). No image API is called, and `NOVA_AI_ENABLED` stays off.

The finished portrait card, with its gold frame, QR code and barcode, is at:

`http://localhost:8080/nova`

The same companion is shown on `http://localhost:8080/companion` and on the student dashboard. Until a companion is chosen, both say **Awaiting discovery**.

Each student's answers, choice, and card stay in this browser's `localStorage` under `academymy.dev-auth.v1`. After pulling this update, refresh the studio page. A journey that was already saved will pick up the local artwork.

## Turn it off

Delete `VITE_DEV_AUTH_BYPASS` from `.env.local`, or set it to `false`, then restart `npm run dev`. To clear a local journey, remove the `academymy.dev-auth.v1` entry in the browser's site data.
