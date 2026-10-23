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

Choose **Aisha · Form 1**, **Haziq · Form 2**, or **Staff**. Answer the twelve questions, summon the companions, and choose one. The two companions you compare use a local drawing so you can see them. That drawing is not the card portrait. No image API is called, and `NOVA_AI_ENABLED` / `NOVA_AI_BATCH_ENABLED` stay off.

Until a staff portrait is approved, the card says **Your companion is being crafted**. The gold frame, serial, QR code and barcode are already there. The portrait appears after Staff uploads it and approves it.

The card is at:

`http://localhost:8080/nova`

The same companion is shown on `http://localhost:8080/companion` and on the student dashboard. Until a companion is chosen, both say **Awaiting discovery**. After the choice, they say the companion is being crafted. After approval, they show the uploaded portrait.

## Staff portraits

Sign in as **Staff**, then open:

`http://localhost:8080/admin/companion-craft`

The queue lists the student, form, answers, companion, species, element and card serial. Export CSV or JSON, make the portrait with any tool, upload it, preview it, and approve it. Replacing a portrait before approval does not change the serial. One card stays with the student.

Aisha and Haziq cannot open that screen. The same admin check lives in the `nova_admin_*` database functions. The migration file `supabase/migrations/20261023140000_nova_staff_craft.sql` is for review only. Do not apply it to a Supabase project from this dev bypass.

Each student's answers, choice, and card stay in this browser's `localStorage` under `academymy.dev-auth.v1`. After pulling this update, refresh the studio page. A journey that was already saved keeps its serial. The card waits for a staff portrait instead of copying the comparison drawing.

## Turn it off

Delete `VITE_DEV_AUTH_BYPASS` from `.env.local`, or set it to `false`, then restart `npm run dev`. To clear a local journey, remove the `academymy.dev-auth.v1` entry in the browser's site data.
