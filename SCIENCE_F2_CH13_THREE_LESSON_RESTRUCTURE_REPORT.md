# Science Form 2 · Chapter 13 — Three-Lesson Restructure

Meteoroid, Asteroid, Comet / Meteoroid, Asteroid dan Komet — BM and DLP.

## Why

The chapter was one long 13.1 page: combined characteristic cards, three
accordions and three figures stacked together. Meteoroids, asteroids and comets
did not read as three distinct objects, and the meteoroid figure taught
`meteoroid → meteor → meteor shower → meteorite` as one four-stage journey,
which is scientifically wrong.

## Architecture

- **Same syllabus numbering.** Every section is still `13.1`; the new headings
  are learner-facing lessons, not KSSM subsections.
- **`lessonFlow`** (`interactive-types.ts`): an ordered list of typed parts on a
  section, rendered top to bottom by `LessonFlow.tsx`. The renderer's fixed slot
  order could not express "definition → characteristics → visual → movement →
  effects", so the order now lives in content. It replaces the three
  Chapter-13-only slots (`meteoroidEntry`, `asteroidBelt`, `cometOrbit`).
- **Generic parts** that other chapters can reuse: `heading`, `points`,
  `callout`, `branchFlow`, `contextCards`, `processFlow`, `comparisonTable`,
  `blog`.
- **Chapter 13 figures**: `figure` (approved photograph + spotlight hotspots),
  `meteorShower`, `asteroidBelt`, `crossingOrbits`, `cometOrigin`, `cometOrbit`.
- **Words vs geometry.** Content supplies words only. Photograph hotspots live
  in `ch13-approved-figure-geometry.ts`, the same contract as Chapter 9. Orbit
  geometry lives in each figure component. BM and DLP therefore cannot drift.
- **Renderer.** `ScienceF2InteractiveNotesBlock` no longer prints an empty
  "Check yourself" heading for a section with no checks.

## Learner flow

1. Other Objects in the Solar System — three one-line preview cards
2. Meteoroids, Meteors & Meteorites — characteristics → journey image
   (meteoroid / meteor / meteorite) → fork (burns up | survives → meteorite) →
   remember callout → meteor shower (separate) → Hoba Meteorite blog
3. Asteroids — characteristics → belt (Mars / belt / Jupiter) → Apollo / Amor /
   Aten → collision → impact crater image → Arizona crater + dinosaur theory
4. Comets — characteristics → anatomy image (nucleus / coma / tail / solar
   wind) → Kuiper Belt & Oort Cloud → 5-position orbit → collision risk → Halley
5. Protecting Earth from Asteroid Impacts — detect → track → assess → warn →
   deflect / alter course
6. Meteoroid vs Asteroid vs Comet — six-row comparison
7. Check Yourself — eight questions, reflection, quick quiz

## Assets

`public/science/form2/chapter-13/`, registered as `SCIENCE_F2_CH13_IMAGES` in
`visual-assets.ts`. It follows the Form 2 approved-figure convention
(`public/science/form2/chapter-N/*.webp`). Before this, Chapter 13 had no image
folder, only the shared banner `src/assets/science/form2/ch13-meteoroid-asteroid-komet.png`.

| File | Source PNG | WebP (q90) |
| --- | --- | --- |
| science-f2-ch13-meteoroid-meteor-meteorite.webp | 1774×887, 1,729,526 B | 1774×887, 159,874 B |
| science-f2-ch13-asteroid-impact-crater.webp | 1774×887, 2,147,569 B | 1774×887, 290,428 B |
| science-f2-ch13-comet-anatomy-tail.webp | 1774×887, 1,993,728 B | 1774×887, 167,832 B |
| science-f2-ch13-hoba-meteorite.webp | 1774×887, 2,317,504 B | 1774×887, 331,506 B |

The source PNGs are inputs, not shipped files. The existing asset test forbids a
PNG beside a converted WebP.

## Scientific decisions

- **Meteor shower** is taken off the journey everywhere, mind maps included. It
  is taught as its own mini-concept with a drawn SVG.
- **Apollo / Amor / Aten** ellipses are built from size, elongation and
  direction, with the Sun at a focus. Crossing points are computed: Apollo and
  Aten cross Earth's orbit twice; Amor comes close but does not cross.
- **Comet tail** is computed as Sun → comet at all five positions. The direction
  of travel is drawn separately, and a test asserts the tail trails inbound and
  leads outbound.
- **Dinosaur extinction** is worded as "one scientific explanation proposes".
- **Protection** stays conceptual: no weapon or explosive detail (test-guarded).

## Deviations from the brief

- **Meteor shower in BM.** "Hujan meteor" is used as requested. The textbook
  label "pancuran meteor" is kept once in the note, so both terms stay findable.
- **Dinosaur wording.** "The textbook refers to…" became "The asteroid in this
  explanation is estimated to be about 10 km". The chapter's hygiene tests
  forbid telling learners to consult the textbook.
- **Chapter-level blog.** It used to pair the Hoba story with the generic space
  banner. Hoba now lives only in the meteoroid lesson, on its own photograph.
  The chapter blog tells the Shoemaker-Levy 9 story, an existing chapter fact
  already covered by a quiz question.
- **BM terminology across all Chapter 13 BM files.** `Lingkaran Asteroid` →
  `jalur asteroid` and `Lingkaran Kuiper` → `Jalur Kuiper` in quizzes,
  flashcards, mind map and notes.

## Tests

- `chapter-13-remediation.test.tsx` — rewritten: the earlier fact guards plus
  the restructure, parity, geometry, image and rendering guards.
- `chapter-13-textbook-emphasis.test.tsx` — markers re-baselined on the new
  wording.
- `chapter-7-9-10-visual-integration.test.tsx` — asset count 30 → 34.
