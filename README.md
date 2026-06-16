# AcadeMY — Admin Dashboard module

A drop-in `/admin` console for the AcadeMY (TanStack Start + Supabase) app.
Admin-only, mobile responsive, styled to match the Mission Control dark theme.

Open **`preview.html`** in a browser to see the finished design with mock data.

---

## What's included

```
supabase/migrations/0001_admin_dashboard.sql   ← run this in Supabase
src/lib/admin.types.ts                          ← shared TS types
src/lib/supabase.server.ts                      ← per-request server client (RLS-respecting)
src/server/admin.server.ts                      ← server functions (stats + 3 tables)
src/routes/admin.tsx                             ← /admin layout + ADMIN-ONLY guard
src/routes/admin.index.tsx                       ← the dashboard page
src/components/admin/AdminShell.tsx              ← sidebar + topbar
src/components/admin/Filters.tsx                 ← date / subject / form / plan / role
src/components/admin/ui.tsx                       ← StatCard, Donut, BarList, Feed, Pill
src/components/admin/admin.css                    ← scoped theme (namespaced .admin-root)
preview.html                                      ← static visual preview
```

## Install — 4 steps

**1. Database.** Paste `supabase/migrations/0001_admin_dashboard.sql` into the
Supabase SQL editor and run it. It is idempotent and only *adds* things — it
creates `profiles`, `quiz_attempts`, `payments` if missing, adds any missing
columns if they already exist, sets up RLS, the `is_admin()` guard, an auto
profile-on-signup trigger, the `admin_users_overview` view, and the
`admin_dashboard_stats()` aggregate. Then make yourself admin:

```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```

**2. Dependency.**
```bash
npm i @supabase/ssr
```

**3. Env.** Ensure these are available to the server runtime:
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```
On Cloudflare Workers, if env arrives via bindings instead of `process.env`,
swap the two reads in `src/lib/supabase.server.ts` for your binding accessor.

**4. Copy the files** into your `src/` (matching the paths above). The routes
are auto-registered by TanStack Router's file-based routing — no manual route
wiring needed.

## How the admin lock works

`src/routes/admin.tsx` runs `beforeLoad` on the **server**. It calls
`getAdminProfile()`, and if the visitor isn't signed in or `role !== 'admin'`,
it `throw redirect({ to: '/' })` **before** any admin HTML or data leaves the
server. Defence in depth backs this up at the database layer: every query runs
through the user's own session, and RLS only returns all rows when
`is_admin()` is true. So even a crafted direct API call can't read other users'
data.

## Won't touch existing student pages

- All CSS is namespaced under `.admin-root` — it can't leak into other pages.
- New routes live only at `/admin` and `/admin/`.
- The SQL is additive (create-if-missing / add-column-if-missing); it never
  drops or rewrites your data. RLS keeps each student seeing only their own
  rows, exactly as before — admins simply also see everything.

## Integration seams (the only spots you may need to adjust)

1. **Env access** on Workers (`supabase.server.ts`) — noted above.
2. **Server-function imports** — paths assume `@tanstack/react-start`. If your
   version exposes `createServerFn` / `getWebRequest` from `@tanstack/start`,
   update the two import lines.
3. **Existing `profiles` table** — if yours uses different column names
   (e.g. `name` vs `full_name`), either add a column or tweak the `select`s in
   `admin.server.ts`. The migration won't clobber your columns.

## Notes

- Charts are dependency-free SVG/CSS (no ApexCharts/Recharts needed), so there
  are no SSR/bundle surprises on the edge. Swap in a chart lib later if you want
  animation.
- Filters apply to the three tables; the headline KPIs are global. Wire filters
  into `admin_dashboard_stats()` later if you want the KPIs to react too.
- `last_login_at` is shown but you populate it — set it on sign-in
  (`update profiles set last_login_at = now() where id = auth.uid()`).
