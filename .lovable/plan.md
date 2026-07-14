# Adaptive Background Music System

Replace the manual music player with an automatic, section-aware background music engine using four AI-generated lo-fi tracks.

## 1. Remove existing player

- Delete `src/components/MusicPlayer.tsx`.
- Remove its `<MusicPlayer />` mount from `src/routes/__root.tsx`.
- Remove any lingering imports (e.g. `src/routes/quizzes.tsx`).
- Remove the ambient Web Audio `music.*` API in `src/lib/sounds.ts` (unused after removal).

## 2. Generate 4 signature tracks via ElevenLabs Music

Link the ElevenLabs connector, then add a one-time admin server function `generateBackgroundTracks` (auth + admin-role check) that generates all four MP3s and uploads them to a new **public** Supabase storage bucket `bg-music` at fixed paths:

- `home.mp3` — warm cozy lo-fi, 60s loop, mellow piano + soft drums
- `quiz.mp3` — same identity, ~15% more energetic, subtle groove
- `flashcards.mp3` — calmest, ambient pads + soft piano, minimal drums
- `notes.mp3` — softest variant of home, no drums

Duration ~60s each (seamless loop via HTMLAudio `loop=true`). I run the function once from chat, then the app just streams the fixed public URLs — no runtime generation cost.

## 3. New adaptive music engine

Create `src/lib/bg-music.ts` — a singleton module (no React state, no UI):

- Maintains two `HTMLAudioElement`s (A/B) for gapless **crossfade** between tracks.
- Public API: `setSection(section)`, `duck(reason)`, `unduck(reason)`.
- Section detection helper `sectionFromPath(pathname)`:
  - `/` → `home`
  - `/quizzes*`, `/quiz/*` → `quiz`
  - `/flashcards*` → `flashcards`
  - `/notes*` → `notes`
  - anything else → `home` (default identity)
- Volume targets: home 0.18, quiz 0.20, flashcards 0.15, notes 0.15.
- Fades: initial fade-in 2s, section crossfade 1.8s, duck fade 400ms, unduck 800ms.
- **Never restart** the same track; if `setSection` is called with the current section, no-op.
- Preload next track by setting `preload="auto"` on the idle element.
- Lazy-init on the **first user interaction** (`pointerdown`/`keydown`, once) — browsers block autoplay before that.
- Persist mute preference in `localStorage` (`academy-bg-music-muted`) so users who choose to mute (via a keyboard shortcut, see §5) stay muted. Default: **unmuted**.

## 4. Global auto-duck detection

Inside the engine, on init, install passive listeners:

- `document.addEventListener('play', …, true)` on any `<video>` or non-bg `<audio>` element → duck.
- Corresponding `pause`/`ended` → check if any media is still playing; if none, unduck.
- Monkey-patch `window.speechSynthesis.speak` to duck on start and unduck on `utterance.onend`/`onerror` (covers Cikgu AI read-aloud).
- Expose `duck('cikgu-ai')` / `unduck('cikgu-ai')` for streaming-audio call sites that don't go through `<audio>`/speechSynthesis (e.g. NotebookLM WebSocket) — I'll wire these where such sites exist.

Ducking uses a reference-counted set of reasons; music resumes only when the set is empty.

## 5. React integration

- New tiny component `src/components/BgMusicController.tsx` that:
  - Reads current pathname via `useRouterState`.
  - Calls `bgMusic.setSection(sectionFromPath(pathname))` on every change.
  - Renders nothing.
- Mount it in `src/routes/__root.tsx` in place of the removed `<MusicPlayer />`.
- Keyboard shortcut: `Shift+M` toggles mute (hidden power-user affordance; no visible UI, per spec "users should not manually control").

## 6. Files touched

```text
DELETE  src/components/MusicPlayer.tsx
NEW     src/lib/bg-music.ts
NEW     src/components/BgMusicController.tsx
NEW     src/lib/bg-music-generate.functions.ts   (one-time admin generator)
EDIT    src/routes/__root.tsx                    (swap MusicPlayer → BgMusicController)
EDIT    src/lib/sounds.ts                        (remove unused ambient music.* export)
EDIT    src/routes/quizzes.tsx                   (drop stale music import if any)
```

## Technical notes

- Storage bucket `bg-music` will be public so `<audio>` can stream via CDN URL directly — no signed URLs, no auth on the hot path.
- Tracks are ~60s @ 96kbps MP3 (~700KB each, ~2.8MB total). Only the current section's track is fetched; others preload on first crossfade.
- SSR-safe: engine module guards all `window`/`Audio` access; the controller only calls into it inside `useEffect`.
- Autoplay policy respected: engine waits for first user interaction before playing anything. No hard errors if the user never interacts.
- Reduced-motion / low-power users unaffected — audio has its own opt-out via `Shift+M`.
