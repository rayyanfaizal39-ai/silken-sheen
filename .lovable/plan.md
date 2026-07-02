
## What's heavy on `/landing`

Total asset payload ~**19 MB** before JS. Biggest offenders:

### 1. Oversized PNGs (~14 MB — the main problem)
All shipped as unoptimized PNGs at ~2000×2000:
- `cikgu-ai.png` — **2.98 MB** (unused now — replaced by robot but still imported? actually only robot is imported, cikgu-ai.png can be deleted)
- `hero-astronaut.png` — **2.80 MB**
- `academy-astronaut-core.png` — **2.22 MB** (unused after intro-video swap)
- `back-ground.png` — **2.17 MB** (full-page background, LCP-blocking)
- `academy-robot.png` — **1.55 MB**
- `tool-flashcards.png` — **1.20 MB** (5× bigger than the other 4 tool icons)

### 2. Video (~2.6 MB)
- `hero-intro.mp4` — 2.6 MB. Currently `preload="none"` so it only downloads on click — this one is fine.

### 3. JavaScript
- `gsap` (~70 KB gz) + `framer-motion` (~50 KB gz) both loaded on landing.
- `Landing.tsx` is **1,209 lines** in a single chunk — no code splitting between hero / tools orbit / pricing / FAQ.
- `CinematicStars` renders a canvas with many particles on mount.

### 4. Dead imports
- `cikgu-ai.png` and `academy-astronaut-core.png` are no longer used but still on disk. Not shipped to browser, but wasted CDN + repo weight.

---

## Proposed fix (biggest wins first)

1. **Convert the 6 large PNGs to WebP** (regenerate at ~1200px, quality ~78). Expected: ~14 MB → ~1.5 MB (~90% cut). Visually identical.
2. **Preload the LCP hero image** via `head().links` in `src/routes/landing.tsx` with `fetchpriority: "high"`.
3. **Delete unused assets**: `cikgu-ai.png`, `academy-astronaut-core.png`.
4. **Re-export `tool-flashcards.png`** at the same dimensions as the other 4 (should be ~250 KB not 1.2 MB).
5. **Lazy-load below-the-fold sections** (tools orbit, pricing, FAQ, parents dashboard) with `React.lazy` + `Suspense` so the hero renders first.
6. **Reduce `CinematicStars` particle count** on mobile (or gate with `prefers-reduced-motion`).
7. **(Optional) Drop `framer-motion`** from `/landing` if only used for one or two simple animations — GSAP can cover them.

Expected result: LCP asset ~200 KB instead of ~3 MB, total transfer ~2–3 MB instead of ~19 MB.

Say the word and I'll switch to build mode and execute steps 1–5 (safest, highest impact). Steps 6–7 are optional polish.
