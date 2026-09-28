# Chapter 8 Pass 2 — source audit (8.2 and 8.3 only)

## Baseline and scope

Baseline: `3c1e1d6c` (includes Pass 1 closing commit `6e710213`). The approved `mirrors` records and `Chapter8Mirrors.tsx` are locked. Chapters 1–7 and the science/presentation of 8.4–8.7 are outside this pass. Seven official section titles and navigation targets remain separate.

## Sources actually inspected

- Supplied BM `T1 BT SN- SAINS.pdf`, printed **229–232**: extracted text plus rendered page diagrams. Printed p. 233 was checked only to establish the start of deferred 8.4.
- [DLP Science Form 1 facsimile](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), actual page images: [229](https://online.fliphtml5.com/bjsfz/tpck/files/large/240.webp), [230](https://online.fliphtml5.com/bjsfz/tpck/files/large/241.webp), [231](https://online.fliphtml5.com/bjsfz/tpck/files/large/242.webp), [232](https://online.fliphtml5.com/bjsfz/tpck/files/large/243.webp). Read the images, including the blank results table and application photographs; did not infer apparatus from the old supplement.

## Findings and implementation decisions

| Area | Verified source and action |
| --- | --- |
| Speed | Both p. 229 editions print 3.0 × 10⁸ m s⁻¹ and explain seeing lightning before hearing thunder. Retained the equivalent existing m/s notation; no calculations or extra qualification added. |
| Straight-line travel and shadow | p. 229 describes straight-line sunlight, an opaque umbrella blocking it, and a shadow behind the opaque object. Canonical source statements retained. Main schematic uses the pictured opaque umbrella; light rays terminate at the obstruction and its shadow is behind it. No umbra, penumbra, diffraction or advanced optics. |
| Other 8.2 source material | p. 229 illustrates straight-line light in a light show. p. 230 explicitly mentions dispersion by water droplets forming a rainbow; retained this short source statement without implementing 8.5. No separately numbered investigation/activity occurs in 8.2. |
| Sundial | p. 230 uses blocked sunlight/shadows to indicate daytime. Neither edition requires the word **gnomon**. Removed it with the old supplement entry. Used the source explanation and the UI label “Upright pointer / Penunjuk tegak”. Three selectable schematic positions change the light direction and shadow; they are not numbered clock hours or calibrated time readings. |
| Shadow-length edition difference | BM says the shadow shortens approaching midday and lengthens in the evening. DLP says short “in the afternoon” and long in the evening. Each edition's wording is preserved; no answer is silently imposed on either edition's fill-in-the-blank practice. |
| Wayang kulit | p. 230 explains blocked light producing shadows. Shows lamp → opaque puppet → screen/shadow using a shared puppet silhouette; no new shadow-size rule. |
| Formative Practice 8.2 | Exactly two p. 230 concepts: shortest shadow/Sun position; draw the shadows of two opaque wooden blocks lit by a torch. Retained both questions and an unanswered two-block/screen schematic. No invented answer key. |
| Reflection and law | pp. 231–232 describe reflection at a plane mirror; incident/reflected rays and normal on the same plane; i = r. Existing canonical law statements are semantically consistent and retained unchanged, including their hash. Definition and diagram labels are canonical. Angles are measured between each ray and the normal, not the mirror. |
| Ray diagram | Figure 8.13 supplies mirror, normal, two directed rays and i/r. A common coordinate construction makes incident and reflected angles symmetric about the normal. The experiment illustration is rotated relative to Figure 8.12, without changing the relationships. Point-of-incidence label is requested diagram UI. |
| Experiment 8.1 | pp. 231–232 confirm plane mirror, ray box, **power supply**, white paper and **protractor**; dark conditions; initial i = 10°, then 20°, 30°, 40°, 50°. Restored full aim, hypothesis, three variables (constant: slit size), six procedure steps and conclusion question. Power supply/protractor were missing from the supplement. Protractor is drawn because it is in the apparatus list and angles are measured; no numerical output reading is invented. |
| Results correction | The printed result rows show i = 10 and 20 with **blank r cells**. The old supplement's statement that every reading agrees and the hypothesis is accepted was not a printed observation. Removed that assertion. Canonical results preserve null r values. Selectable angle geometry is explicitly a ray diagram demonstrating the law, not measured results. The measurement task and unanswered source conclusion prompt remain beside i = r. |
| Lateral inversion | Table 8.1 uses **Songsang sisi**. Changed chapter-wide BM key-exam wording from “berbalik sisi” to “songsang sisi”; removed the supplement's “pembalikan sisi”. Locked 8.1 records already use the approved term and remain untouched. |
| Ambulance | p. 232 Science Exploration asks why the word is inverted and what another driver's rear-view mirror shows. Retained the source question; the requested functional diagram mirrors the vehicle lettering and shows readable AMBULANCE / AMBULANS in the mirror. No perception theory or added response-time claim (“immediately”). |
| Applications | p. 232 photographs show traffic cones, road signage and a warning triangle. Small shared vectors retain these pictured examples. Labels identify pictured objects; no invented retroreflector mechanism or additional mirror applications. |
| Formative Practice 8.3 | Exactly two p. 232 concepts: explain the law using a ray diagram; complete the plane-image characteristics/distance statement. Retained the source questions without repeating the approved 8.1 lesson or inventing solutions. |
| Shared BM terminology | Changed the chapter-wide key term **Imej nyata → Imej sahih**, explicitly authorized in this pass and verified on p. 222 in Pass 1. No locked 8.1 data or geometry changed. |
| Canonical ownership | Moved audited 8.2/8.3 teaching into `propertiesOfLight` and `reflection`. Removed `opticalHistory`, `reflectionExperiment`, `lateralInversion` from both supplement records/interface. Components contain geometry/state and consume canonical facts, labels and procedures. |

## Deferred terminology issues — recorded, not edited

Official 8.5 already reads **Penyebaran Cahaya** and 8.6 **Penyerakan Cahaya**. The older deferred 8.5 presentation/science strings still include **Serakan** and the spectrum has **Nila** rather than the requested future textbook correction **Indigo**. Leave these for the authorized later source audit. Do not revise deferred summaries on that basis in this pass.

## Locks

The original Pass 1 mirrors hashes and component hash are **unchanged**. Existing law-of-reflection hashes also remain unchanged. The old combined lock included 8.2 and the three now-authorized supplement fields; its scope was narrowed explicitly to deferred content using hashes captured **before editing**. This is not a rebaseline of changed protected data.

| Protected record | DLP SHA-256 | BM SHA-256 |
| --- | --- | --- |
| Approved mirrors | `f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115` | `a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a` |
| refraction, dispersion, scattering, colorAdditionSubtraction | `47ed8a3d2d71d9f991bbca1df946b582c337622fa7e85bf928053cfc5ddda130` | `09c8cfe1ef775d6b0dd6ae9af65149de2427adf1beaa575466897e64bc4fd949` |
| Remaining deferred supplement (including activeRecall) | `b74d9795297a718c1afcdccc4f9a7d536dd89fbc9948bf9aeb693ad67e75dbad` | `ae38f7540f1382fe22c831ceb31185774ff100617c6432497b6b4ddd9460f6c0` |

`Chapter8Mirrors.tsx` normalized-LF SHA-256 remains `e048f18ea0739910d13aebe1d90987ef190543dcf6c7fbabc90726f52f05056d`.

## Language, presentation and source boundaries

All scientific SVG geometry is shared. Only canonical text labels vary. Ordinary diagram/control labels such as Light source, Upright pointer, Point of incidence, position selector numbers, and the accessible indication that a table cell is not supplied by the textbook are presentation text, not claimed verbatim textbook quotations. Road-object labels identify the source photographs. No independent biological/scientific dataset lives in the components.

**UNSOURCED LEARNER-FACING SCIENTIFIC CLAIMS ADDED: NONE.** The source-edition shadow-length difference is preserved and disclosed above. No further unresolved factual conflict was found in the audited scope.

## Validation

- Pass 1: **41 tests passed**, including original 8.1 hashes.
- Pass 2: **31 tests passed**, covering live renders, sundial and five angle interactions, ray direction/angle geometry, source blank results, terminology, canonical ownership and BM/DLP parity.
- Chapter 8 integration: **2 tests passed**. Total **74/74**.
- Targeted ESLint: **passed, no warnings**.
- TypeScript: no Chapter 8 errors. Only the existing Form 2 `TS2345` errors remain in `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9/chapter-9-heat-visuals.test.tsx:523`; neither file changed.
- Production build: **passed (exit 0)** after the final puppet-screen refinement, including static shell, sitemap and Pages worker generation.
- No 8.1 hash rebaseline, no Chapter 1–7 changes, no deferred lesson redesign, and no commit/push performed for Pass 2.

 Full browser inspection is unavailable because the connected browser inventory is empty; do not represent this as a completed desktop/mobile browser test. Actual SVGs were rendered and inspected, including low/high ray angles, experiment apparatus, sundial, puppet and ambulance. The puppet screen was widened after that check to keep its shadow silhouette recognizable. Responsive layouts use shared viewBoxes, HTML labels and stacked small-screen sections; interaction behavior is covered by live DOM tests.

## Explicit opaque-object follow-up

User-supplied wording is now canonical and learner-facing: “An opaque object does not allow light to pass through it.” / “Objek legap tidak membenarkan cahaya menembusinya.” The main 8.2 shadow schematic now uses the textbook umbrella instead of a generic obstruction. Five parallel sunlight rays terminate at their mathematical intersections with the opaque canopy; none continues through it. The shadow sits below/behind the canopy along the light direction. Visible HTML labels identify sunlight, the umbrella as an opaque object, blocked light and the shadow. The four-step source chain explicitly includes blocking and inability to pass through. No transparent/translucent classification was added. Puppet, sundial, 8.3 and all locked lessons remain unchanged. Follow-up tests check the exact BM/DLP definitions, chain, canopy intersections, absence of transmitted rays, shadow location and canonical ownership.

Opaque-object follow-up validation: **74/74 Chapter 8 tests passed**, targeted lint passed, production build passed (exit 0). TypeScript still reports only the two existing Form 2 errors documented above. The actual umbrella SVG was rendered and visually checked; temporary render files were removed.
