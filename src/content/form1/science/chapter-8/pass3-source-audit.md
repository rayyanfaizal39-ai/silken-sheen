# Chapter 8 Pass 3 — source audit (8.4 only)

## Scope and sources inspected

Baseline: `b8069527`. This pass implements only **8.4 Refraction of Light / Pembiasan Cahaya**. Approved 8.1–8.3 and deferred 8.5–8.7 remain protected.

- Supplied BM `T1 BT SN- SAINS.pdf`, printed **233–236**, extracted page text and rendered diagrams. The Experiment 8.2 variable labels were also checked directly in the printed p. 235 image.
- [DLP Science Form 1 facsimile](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), inspected page images: [233](https://online.fliphtml5.com/bjsfz/tpck/files/large/244.webp), [234](https://online.fliphtml5.com/bjsfz/tpck/files/large/245.webp), [235](https://online.fliphtml5.com/bjsfz/tpck/files/large/246.webp), [236](https://online.fliphtml5.com/bjsfz/tpck/files/large/247.webp).
- Only the 8.4 portion of p. 236 was implemented. Its following dispersion lesson remains deferred.

## Findings and canonical corrections

| Topic | Verified source and implementation |
| --- | --- |
| Definition | p. 233 describes a change in direction through media of different densities. BM retains “perubahan arah perambatan atau pembengkokan cahaya” and “dua medium yang berbeza ketumpatan”. No refractive index, equations or Snell's law was added. |
| Opening examples | p. 233 introduces a deep pond/fish appearing shallower and a pencil appearing bent in water. These source examples precede the ray cases. Activity 8.6 separately uses a spoon. |
| Figure 8.14 | p. 234 shows an observer above water, the actual fish deeper than its apparent image, and light travelling from fish through the water–air boundary. Shared SVG rays bend away from the normal; dashed backward extensions meet at the shallower apparent position. The catching-fish prompt is retained as a question. The old supplement's `fishTip` answer was removed because no approved answer source was verified. |
| Figure 8.15 | All four cases are retained: water → air bends away; air → water bends towards; travel along the normal remains straight in each direction. Boundaries, perpendicular normals, incident/refracted rays and propagation arrows are actual geometry. BM uses sinar tuju, sinar biasan and garis normal. |
| Old supplementary rules | The audited 8.4 pages do not explicitly teach the old speed-increase/decrease rules or `i > r` / `i < r` as rules. Removed those supplement fields and their live presentation. The ray drawings demonstrate the verified bending directions without adding numerical rules. |
| Experiment 8.2 purpose | pp. 235–236 investigate the relationship between i and r for light entering a glass block from air. The source hypothesis says r increases as i increases. This is not converted into a numerical or straight-line equation. |
| Variables | Manipulated: angle of incidence i. Responding: angle of refraction r. Constant: slit size and glass-block shape. See the edition/erratum note below. |
| Apparatus | Glass block, ray box, single-slit plate, ruler, power supply, white paper and protractor. DLP specifies a plastic ruler; BM says pembaris. The ray box and its single-slit plate are separate display entries for the same source apparatus. |
| Procedure | Retained all nine numbered steps: dark room; trace block; direct/mark incident ray; mark emerging ray; remove block/connect entry and exit; draw normal; measure i and r; repeat steps 3–7 for different i; record results. The diagram offers block-present and block-removed views. |
| Setup | Top-down block, ray box/slit, incident/internal/emerging paths, entry normal and i/r arcs measured from that normal. Paper, power supply, ruler and protractor are represented. Angles are schematic demonstration geometry, not measured results. |
| Results and graph | Both columns in all five source rows are blank. Canonical values remain null; no invented readings. Retained “plot a graph of i against r”, with blank axes (vertical i, horizontal r), relationship question and conclusion question. The two follow-up bending questions on p. 236 remain unanswered. |
| Activity 8.6 | Research/communication activity using library/Internet and class presentation. Preserves spoon-in-water and pool-depth phenomena; it is not presented as another laboratory experiment. |
| Formative Practice 8.4 | Exactly the source's two concepts: explain apparent pool depth; compare medium densities using two ray cases. Shared A/B and C/D diagrams preserve the pictured propagation and bending. No invented answer reveal. |
| Ownership | All lesson facts, questions, apparatus, procedure and labels live in `chapter8-content.ts`. Removed `refractionRules`, `refractionExperiment` and `fishTip` from the supplement/interface. `Chapter8Refraction.tsx` owns geometry and UI state, and both Notes renderers consume it. |

## BM/DLP and the reported variable-label erratum

The user reported a BM printing with incorrectly mapped variable labels and explicitly required the corrected DLP structure. **The supplied BM p. 235 copy inspected here already displays the correct mapping**, agreeing with DLP. No separate errata sheet or incorrectly labelled edition was verified. Consequently this audit does not claim to have observed the reported error in this copy. The implementation and regression tests enforce the requested correct scientific mapping in both languages.

The inspected BM procedure step 7 says “Ukur sinar tuju, i dan sinar biasan, r”. The implementation uses **sudut tuju** and **sudut biasan** for the measured quantities, as explicitly requested and confirmed by DLP's angle wording. BM apparatus terminology uses **bongkah kaca** consistently; the source also uses “blok kaca” within its procedure.

Other genuine edition differences are retained: the BM problem asks about increasing i and r, while DLP explicitly names the less-dense/more-dense transition; DLP specifies a plastic ruler; BM Activity 8.6 has four instructions whereas DLP combines identification/research into three. Both retain the same two phenomena.

## Regression locks

Original approved mirrors, properties-of-light and reflection data/component hashes remain unchanged. Existing Pass 1/2 combined deferred locks formerly included 8.4. Their scope was narrowed only for this authorized pass, using **pre-edit baseline hashes** for the remaining content; protected content was not changed or rebaselined to hide a difference.

| Protected content | DLP SHA-256 | BM SHA-256 |
| --- | --- | --- |
| Mirrors | `f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115` | `a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a` |
| Properties of light | `30892516c7b52edbeb3a815af5dd9e0c68697f3e459a4564257fab75f28f5b32` | `98f9abcf4c1563d3b0f0427f4cef260bc2aeb5b42b715e56af831751032cfe6a` |
| Reflection | `edb95a522087ad0eecc853000d66d3984a8eff84382aedb7e9bf003d8cdd9da4` | `6f63c7b902fa79fa6711548e6ae2bc511ef95bbfc4a764d4255ec38f9cf57888` |
| Dispersion, scattering, colour addition/subtraction | `6f52dd8ec4ae7bfaaffa2d13b42f6abf41ace1e70606681bb0fae967305ab35a` | `f9cdac68601e093710b4a2666bcf4d384f32d8c2efeaf17eca1ef8ad1bf0e90f` |
| Remaining supplement, including active recall | `9bd74bf30eb00a9a879ff93dab8849098ef92d958f795273c37b8b02b7281c44` | `2113d8887f3f58f8012552aff1966740fdbcdf25641b695ef3128dde61cf1f5b` |

Normalized-LF component locks:

- `Chapter8Mirrors.tsx`: `e048f18ea0739910d13aebe1d90987ef190543dcf6c7fbabc90726f52f05056d`
- `Chapter8PropertiesOfLight.tsx`: `e92572bc4e6980b5505efd0b7cab711c95a024b4fe2f71afeb5855b8be078d64`
- `Chapter8Reflection.tsx`: `63e3e7cbd789f880780d8103b6b859c45b4f2225602b6da80cffd6c345d2ec56`
- Live Notes presentation from the 8.5 section onward: `0896220e0550adedfe80d3a7797f574e461d131ddaf73dcfd39736fc67600518`

## Presentation boundaries

BM and DLP use identical ray, fish, boundary, normal, angle and apparatus geometry, including both block interaction states. Labels alone vary. Diagram demonstration, block-view controls and the accessible indication of a blank source result are presentation labels, not claimed verbatim textbook quotations. No new scientific claims or explanatory theory were added outside the verified source. Rendered SVGs were inspected; this is not a claim of a full browser/mobile inspection.

**UNSOURCED LEARNER-FACING SCIENTIFIC CLAIMS ADDED: NONE.** Remaining source uncertainty is limited to the reported alternate BM variable-label printing, which was not available for direct verification. The fish-catching answer remains intentionally unverified and unprovided.

## Validation results

- Pass 1: 41 tests passed; Pass 2: 31; Pass 3: 27; integration: 2. **101/101 passed**, including block interaction, ray geometry, BM/DLP parity and unchanged protected hashes.
- Targeted ESLint: passed with zero warnings. `git diff --check`: passed.
- Production build: passed, including static shell and Pages worker generation.
- TypeScript: blocked only by existing `string | undefined` errors in Form 2 tests: `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9-heat-visuals.test.tsx:523`. No Chapter 8 errors were reported; unrelated files were not changed.
