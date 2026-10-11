# Mind Map Explorer

The fullscreen, camera-guided mind map used by `/mindmaps`. This note covers
how it is put together and which rules other code can rely on.

## Journey

`/mindmaps` → subject → form → chapter list → **explorer** (fullscreen) → Back.

- URLs are unchanged: `?subject=…&form=…&chapter=…`. A deep link opens the
  explorer directly. Browser Back and the explorer's Back button both return
  to the chapter list, which scrolls to and focuses the chapter that was open.
- The explorer is rendered in `LearningArena` (`layout="fill"`), the same
  portal frame as the Quiz and Flashcard arenas. It covers the sidebar, header,
  footer and mobile nav without the browser Fullscreen API.
- Bahasa Melayu topic Previous/Next (Pemahaman, KOMSAS and the listed grammar
  topics) lives in the top bar on desktop and in the ⋯ menu on phones.

## Modules (`src/components/mindmap/`)

| File                                                                                 | Responsibility                                                                                                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `tree.ts`                                                                            | Pure tree data: normalisation, pre-order index, ancestors, primary branch, visibility.                                          |
| `layout.ts`                                                                          | Horizontal tree layout, typography metrics (desktop / compact), card size estimates, connector paths.                           |
| `camera.ts`                                                                          | Pure framing maths (`followCamera`, `fitCamera`, `zoomAt`) and `CameraController`, which writes transforms straight to the DOM. |
| `theme.ts`                                                                           | Colours, branch palette, English / Malay UI strings.                                                                            |
| `MindMapNodeCard.tsx`                                                                | Memoised card plus the explorer's CSS.                                                                                          |
| `MindMapTopBar.tsx`, `MindMapReader.tsx`, `MindMapMinimap.tsx`, `MindMapOutline.tsx` | Chrome: top bar, reading view, minimap, list view.                                                                              |
| `MindMapExplorer.tsx`                                                                | `LearningArena` + `MindMap`, used by the route.                                                                                 |

`src/components/MindMap.tsx` is the engine and still exports `MindMap`,
`MindNode`, `calculateMindMapLayout`, `getExpandableMindNodeIds` and
`getVisibleMindNodes`. Content files and tests import from there.

## Display titles

`format.ts` → `formatMindMapTitle` removes leading textbook section numbers
("8.1 Force" → "Force", "3.2.1 Types of Chemical Bonds" → "Types of Chemical
Bonds"). It runs once, in `normalizeMindNode`, when the display tree is built,
so every surface (cards, dock, reading view, breadcrumbs, Focus chip, Outline,
accessible labels) shows the same clean title. Content files, ids, order and
summaries are untouched. The chapter header in the top bar comes from the
route, so it keeps "Chapter 8".

It only strips a dotted number (1–99, then 1–2 digit parts, up to four
levels) that is followed by a capitalised word that isn't a unit. Step numbers
("1. Sambung dua titik"), years, decimals ("0.03025"), measurements ("2.5 cm",
"101.3 kPa") and quantities ("1.2 juta") are kept. A test runs every label in
the registry through it.

## Rules the engine keeps

- **Content is untouched.** Data is rendered as supplied. Cards grow to fit
  their text and never truncate it. The reading view shows a node's full
  summary, path and subtopics.
- **Layout.** Each subtree owns its own vertical band, so cards cannot
  overlap. Real card heights are measured from the DOM after render and fed
  back into the layout. A test lays out every registered mind map, fully
  expanded, at both metric sets, and checks for overlaps.
- **Readable camera.** Automatic moves never go below the reading scale
  (0.8 desktop, 0.88 phone). Only Fit and manual zoom go lower, and the next
  selection restores reading scale. Moves are minimal: if the target is
  already visible, the camera stays put. Moves last 300–520 ms, can be
  interrupted (the newest action wins) and respect reduced motion.
- **No React work per frame.** Camera, pan, pinch and layout tweens write
  `transform` / path `d` directly. React re-renders only on state changes.
- **Containers never scroll.** The stage uses `overflow: clip`, because
  browsers scroll `overflow: hidden` boxes to reveal a focused card.
- **Scroll lock.** `LearningArena` marks `<html data-learning-arena-open>`.
  A stylesheet rule then keeps the page locked even when other code clears
  `body.style.overflow`, as the boot loader does on first load.

## Interaction summary

- Tap a closed topic: open it and follow it.
- Tap an open topic that isn't selected: select it.
- Tap the selected open topic: close it.
- Double-click or **Read** opens the reading view.
- Prev/Next walks the authored pre-order, opening parents as needed.
- Keyboard: arrow keys move through the tree (←/→ also close/open topics);
  Home jumps to the main topic; + and − zoom; Esc closes the reader or
  leaves Focus mode.
- Focus mode dims every primary branch except the selected one, and frames
  that branch when the selection moves into it.
