# Nova Sanctuary design review

## Scope and preview

The initial local visual integration was prepared on `feature/nova-sanctuary-design`, based on the existing Nova branch at `a3e43af83c129b8ba0bf2292f5352c64700f9fc4`. It is now continued on `feature/nova-companion-cards` for draft PR #68; see [the current audio and creature-selection review](nova-audio-creature-review.md). This is a continuation of the existing application. No new app, authentication service, database, migration, paid generation request or deployment was created for this design work.

Start the repository's existing Vite development server:

```powershell
node node_modules/vite/bin/vite.js dev --host 127.0.0.1 --port 5181 --strictPort
```

Review the fictional experience without a student account:

- [Mia: cinematic opening](http://127.0.0.1:5181/nova/studio?preview=mia&scene=welcome)
- [Mia: adventure questions](http://127.0.0.1:5181/nova/studio?preview=mia&scene=quiz)
- [Mia: ready egg and two Origin artworks](http://127.0.0.1:5181/nova/studio?preview=mia&scene=reveal)
- [Mia: selected collectible](http://127.0.0.1:5181/nova/studio?preview=mia&scene=selected)
- [Rayyan: Phoenix sanctuary](http://127.0.0.1:5181/nova/studio?preview=rayyan&scene=selected)

The preview toolbar switches between welcome, quiz, identity, waiting, reveal and selected scenes. These fixtures use memory only, reset on reload, and never call the live Studio API. The Reveal fixture starts with a ready egg; click **Hatch egg** to inspect both choices. The existing `/nova/demo` SVG evolution study remains available.

## Export inspection

Source archive: `nova-studio_-companion-sanctuary-&-relic-forge.zip` (207,319 bytes). All entries were inventoried. Its source was reviewed as design reference; README setup/deployment instructions, environment variables and declared Gemini capability were not treated as authorization to run services or generate images.

| Exported files                                          | Role / finding                                                                                                                                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/App.tsx`, `src/main.tsx`                           | Standalone React mount and scene state; localStorage demonstration state, simulated XP and reset actions. Replaced by the existing Studio controller/API.                                              |
| `src/components/CinematicOpening.tsx`                   | Darkness → spark → portal → invitation. Timed reveal, skip and sound controls. Adapted directly.                                                                                                       |
| `src/components/CinematicFlightWorld.tsx`               | Canvas camera flight, spores, luminous trees, pointer parallax, elemental shockwaves and four world chapters. Adapted to the existing twelve questions.                                                |
| `src/components/CosmicCanvas.tsx`                       | Interactive starfield and constellation lines with elemental hues. Reused for the sanctuary and card scenes.                                                                                           |
| `src/components/NovaEggAwakening.tsx`                   | Floating gold/violet egg, armillary rings, hatch and two portrait choices with permanent-bond confirmation. Split into egg, reveal, dialog and confetti components.                                    |
| `src/components/Screen3MyNova.tsx`                      | Central foil collectible, flip, share/download controls, description and evolution path. Applied as a theme to the existing functional `NovaCard`.                                                     |
| `src/components/Header.tsx`                             | Branded progress/navigation, sound and return-to-learning controls. Adapted with the existing AcadeMY icon.                                                                                            |
| `src/index.css`, `index.html`                           | Midnight navy, warm gold, violet/aqua atmosphere; Bodoni Moda, Plus Jakarta Sans and Space Grotesk; float, spin, shimmer and hatch keyframes. Scoped to Nova Studio.                                   |
| `src/data/companions.ts`, `src/types.ts`                | Demonstration card data and external portrait URLs. Two supplied fox portraits are used only in Mia's explicitly fictional design fixture.                                                             |
| `src/data/quizQuestions.ts`, `src/utils/personality.ts` | Alternate question/scoring implementation. Not adopted; the repository's original identity mapping remains authoritative.                                                                              |
| `src/utils/audio.ts`                                    | Synthesized harmonic ambience and chimes. Adapted with explicit opt-in, visibility handling and route cleanup.                                                                                         |
| `package.json`, `bun.lock`                              | React 19, Tailwind 4, Motion 12, Lucide, canvas-confetti, Vite 8, TypeScript 7, Gemini/Express/dotenv dependencies. Existing compatible UI dependencies are sufficient; no package or lockfile change. |
| `vite.config.ts`, `tsconfig.json`, `.gitignore`         | Standalone tooling configuration. Existing TanStack/Vite/Cloudflare configuration was retained.                                                                                                        |
| `metadata.json`, `README.md`, `.env.example`            | Export metadata and setup information. Environment key names are `GEMINI_API_KEY` and `APP_URL`; no values were copied or configured.                                                                  |

There are no bundled bitmap assets in the archive. Its character images are externally hosted URLs. Those fixture images and the source fonts require network access; real companion artwork continues to come from the existing signed-artwork system. The original fox image contains decorative card lettering, so the fictional fixture alone uses a tighter art crop. Real artwork uses its normal framing. Rayyan's fictional Phoenix continues to use the existing SVG renderer.

## Integration decisions

- Kept the existing TanStack route and lazy-loaded `/nova/studio` architecture. New presentation components live in `src/features/nova-cards/sanctuary/`; styles are scoped to `.nova-sanctuary`. The ordinary collection/card theme keeps its existing default appearance.
- Preserved the source's cinematic opening, flight worlds, background effects, egg, hatch, two-card reveal, gold frames, foil flip and typography. Small CSS particles replace the export's additional confetti dependency.
- Existing `QUESTIONS` supplies every question, option and ordering. The presentation adapter supplies only chapter labels and decorative colours. Answers save successfully through `saveStudioDraft` before progression; failed saves stay on the same question.
- Retained existing identity confirmation, durable draft/resume, two Origin candidates, server-controlled next-day reveal, permanent choice, subscription checks and evolution requests. The client never marks a real generation request ready.
- Retained `getMyCard`, real QR/Code 128 encoding, privacy-aware sharing and export authorization. Completed artwork refreshes when the existing evolution job status changes.
- Evolution uses the existing thresholds: **Origin 0, Awakened 1,600, Ascended 9,000, Mythic 32,000, Legendary 80,000 XP**. The export's simulated XP grants, reset flow, placeholder codes and alternate thresholds were excluded.
- The existing Supabase/session architecture and business logic were reused without changes. No database was contacted for the fictional visual checks. SQL/RLS tests run against their existing local test harness.
- Sound starts only when explicitly enabled. Muting stops active chimes; hiding the tab pauses sound and animation; leaving the route disposes audio and timers. OS reduced-motion and the manual calm control suppress movement. The permanent-choice dialog uses native modal focus handling, Escape cancellation and focus restoration.

## Initial visual integration verification — 17 October 2026

| Check                                  | Result                                                                                                                                                                                                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nova + business-card Vitest suites     | **63 tests passed across 11 files**: full twelve-question journeys/resume, waiting/reveal/selection, SQL/RLS, worker behavior, QR/barcodes and export, evolution preview, intro cleanup, confirmation retry/cancellation, audio opt-in/muting. |
| ESLint on changed TypeScript/TSX files | Passed.                                                                                                                                                                                                                                        |
| Nova worker TypeScript check           | Passed (`node scripts/check-nova-worker-types.mjs`).                                                                                                                                                                                           |
| Production build                       | Passed (`npm run build`), including static shell, sitemap and local Pages worker packaging. No deployment command was run.                                                                                                                     |
| Repository TypeScript check            | Only two pre-existing science-test errors: `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9-heat-visuals.test.tsx:523` (`string \| undefined` supplied to a string parameter). No Nova errors.                                  |
| Browser: 1440 × 1000 desktop           | Card front/back, actual QR/barcode, hatching and two-card reveal verified; choices align side by side.                                                                                                                                         |
| Browser: 768 × 1024 tablet             | Both Origin choices fit in two columns with no horizontal page overflow.                                                                                                                                                                       |
| Browser: 390 × 844 mobile              | Choices stack, card fits, dialog fits, Escape restores focus, intro starts the twelve-question flow, all answer buttons are reachable, no horizontal page overflow.                                                                            |

Real authenticated account operations and paid generation were not exercised. Their existing local regression suites passed. The initial visual review was local. The subsequent audio/creature update is prepared for draft PR #68; see the current review above. No merge, production deployment or production database modification was performed.
