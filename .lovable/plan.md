# Cinematic Command Center Homepage

## Why

`www.myacademy.my/command-center-preview` currently 404s on the deployed site — the route was removed after the previous 500 issues (see `src/routes/index.tsx` comment about Cloudflare Worker resource limits). But the shell you saw there (dark cosmic sidebar, "Ready to study?" hero, level chip, upgrade CTA, footer) is what you want for `/`.

Right now `/` renders the marketing `Landing` component (kept for SSR safety). We'll replace it with a new **cinematic Command Center landing** that:
- Keeps SSR + KSSM SEO metadata intact (title, description, og:*).
- Uses only static/marketing data at module scope (no `content/registry`, no `tracker`, no auth-only stats) — this is what blew up `HomeDashboard` on `/` before.
- Adopts the sidebar-shell look **visually** but keeps the page fully public (no gated dashboard data).
- Adds a strong "Captain, your mission awaits" welcome + subscribe pressure without gating learning quality (per `ACADEMY_PRINCIPLES`).

## What's on the page

Single new component `src/components/CommandCenterHome.tsx` (client-safe, SSR-renderable), wired into `src/routes/index.tsx` in place of `<Landing />`.

Layout (desktop):

```text
┌─────────────┬────────────────────────────────────────────┐
│  SIDEBAR    │  TOP BAR: search • Lv 1 • Upgrade • Sign In│
│  (visual)   ├────────────────────────────────────────────┤
│  Home       │  HERO: "Welcome aboard, Captain."          │
│  Dashboard  │        Cinematic Earth-horizon backdrop    │
│  Notes      │        Streak ring • Start Mission CTA     │
│  Mind Maps  │        Cosmic Companion peek               │
│  Quizzes    ├────────────────────────────────────────────┤
│  Flashcards │  MISSION TILES: 6 subjects (KSSM)          │
│  AI Tracker │  → each links to /subjects                 │
│  Companion  ├────────────────────────────────────────────┤
│  Leaderboard│  CAPTAIN'S UPGRADE PANEL (premium pitch)   │
│  Parent     │  • Insights • Reports • Cikgu AI unlimited │
│             │  • 2 plans: Cadet (free) / Captain (Pro)   │
│             ├────────────────────────────────────────────┤
│  Sign in    │  SOCIAL PROOF strip + FOOTER               │
└─────────────┴────────────────────────────────────────────┘
```

Mobile: sidebar collapses to a top drawer trigger; hero + tiles stack.

## Cinematic direction

- Reuse existing tokens: deep-space `#020617` base, cyan/violet accents, `OrbitalBackdrop` earth horizon, `CinematicStars` layer.
- Hero copy: "Welcome aboard, Captain." + "Your mission control for KSSM Form 1–3." — welcoming, aspirational, uses the "Captain" identity you mentioned.
- Streak/level shown as **example** ("Lv 1 · 0-day streak · Sign in to start your mission") so unauthenticated visitors see the promise without the page depending on real user data.
- Subscribe pressure = premium panel + subtle "Captain badge" glow on locked features (Cikgu AI unlimited, Parent reports, offline pack). Learning content stays free.

## SSR / SEO safety

- No import of `@/content/registry`, `@/lib/tracker`, `@/lib/leaderboard`, `useProgress`, or anything reading `localStorage`/`window` at module scope.
- Any `window`-touching effect (parallax, sound) is inside `useEffect`.
- Keeps current `seoMeta(...)` head from `src/routes/index.tsx` unchanged.
- Landing route (`/landing`) stays as-is so we have a rollback.

## Files touched

- **NEW** `src/components/CommandCenterHome.tsx` — the page.
- **NEW** `src/components/command/Sidebar.tsx` — visual sidebar (public, links to real routes).
- **NEW** `src/components/command/TopBar.tsx` — search + level + upgrade + sign in.
- **NEW** `src/components/command/MissionTile.tsx` — subject tile.
- **NEW** `src/components/command/UpgradePanel.tsx` — Captain pitch.
- **EDIT** `src/routes/index.tsx` — swap `<Landing />` for `<CommandCenterHome />`, keep `seoMeta`.
- No changes to auth, DB, server functions, or `HomeDashboard`.

## Out of scope

- Fixing/re-adding the broken `/command-center-preview` route (the design is being reincarnated on `/` instead — cleaner and avoids the original 500).
- Real personalized dashboard data on `/` (that lives on `/home` / `/dashboard` behind auth).
- Payment flow changes (Upgrade button links to existing `/upgrade`).

Approve and I'll build it.
