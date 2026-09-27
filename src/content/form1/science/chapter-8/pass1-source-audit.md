# Chapter 8 Pass 1 — source audit

Scope: **8.1 The Use of Mirrors / Penggunaan Cermin**, BM and DLP. Chapters 1–7 are locked. Deferred Chapter 8 lessons retain their existing scientific data and presentation apart from the requested official-section separation and relocation of the law of reflection.

## Sources inspected

- Supplied BM `T1 BT SN- SAINS.pdf`: printed pp. **222–228**, including rendered apparatus images on pp. 222, 223, 226 and 227.
- [DLP Science Form 1 textbook facsimile](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/): the same printed pages. Actual page images for [Activity 8.2](https://online.fliphtml5.com/bjsfz/tpck/files/large/234.webp), [periscope](https://online.fliphtml5.com/bjsfz/tpck/files/large/237.webp) and [kaleidoscope](https://online.fliphtml5.com/bjsfz/tpck/files/large/238.webp) were inspected; dimensions were not inferred from extraction order.
- **Scope clarification:** Formative Practice 8.1 is printed at the top of **p. 229**, not pp. 222–228. Its three questions are included because the brief explicitly requests them. The remainder of p. 229 (8.2) is not reimplemented.
- The existing plane-mirror characteristic list was cross-checked against the BM answer key on printed **p. 282**, Formative Practice 8.3 question 2 (upright, same size, virtual, equal distance, laterally inverted). Retaining the requested list in 8.1 does not add the later ray-diagram construction or law of reflection to this pass.

## Corrections and edition differences

| Area | Previous state | Verified source and implementation |
| --- | --- | --- |
| Chapter structure | Five grouped navigation items, including 8.2–8.3 and 8.5–8.6; generated chapter headline | Seven official links and distinct targets, with the supplied official titles. Chapter heading now reads Light and Optics / Cahaya dan Optik. The earlier promotional hero subtitle is removed. Deferred content inside the separated sections is preserved. |
| Canonical ownership | Law of reflection nested under `mirrors` | Moved unchanged to `reflection.lawOfReflection`, consumed under official 8.3. Compatibility renderer reads the new location. No law or normal-line construction enters 8.1. |
| Real image terminology | BM **imej nyata** in live label / glossary | Textbook p. 222 uses **imej sahih**. The canonical lesson uses the verified term. The existing chapter glossary still says **Imej nyata**; this closing-only pass preserves that pre-existing entry and records the discrepancy rather than silently rewriting approved content. |
| Definition | Real image phrase plus a long mixed virtual-image explanation | Separate textbook definitions: forms on a screen / cannot be formed on a screen. The plane-mirror image appears behind the mirror and is virtual; that source explanation is retained separately. |
| Activity 8.1 | Two independently authored supplement sentences; no apparatus visual | Canonical materials and four steps plus two questions. Black A4 card, white A4 card/screen, candle, pin, pinhole and mirror are represented. BM explicitly specifies a dark room; DLP step 2 does not, and that difference is preserved. The drawn inverted candle follows Figure 8.1, but no inverted-image ray theory, lens or camera-obscura explanation is added. |
| Mirror shapes | Selector mostly changed text | Separate flat, inward-curved and outward-curved profiles follow Figure 8.3. Reflecting faces are cyan, backing is grey. |
| Activity 8.2 | Missing | Restored source materials, sequence and questions. **BM** includes a ruler and an initial distance of **4 graph-paper squares**. **DLP** has neither a ruler in its apparatus list nor a prescribed starting distance. BM records results before repeating; DLP repeats before recording. These differences remain canonical. |
| Image size and distance | Text only | Activity-specific same-size / bigger / smaller comparison, using the source's mirror applications for the curved-mirror emphasis. Separate plane-mirror diagram places object and image at equal distances; no centimetre reading is invented. The shared illustrative grid shows four equal intervals each side. DLP does not label those intervals as a required experimental measurement. |
| Plane characteristics | Compressed list | Upright, virtual, same size, laterally inverted and equal object/image distance retained at the requested textbook level. No ray construction is added. |
| Applications | Abbreviated / mixed list | Exact source applications from pp. 224–225: dancer and room; make-up and dentist; dangerous road corner and supermarket. Bicycle use remains in the source's Science in Life section rather than being an extra item copied into the application dataset. |
| Activity 8.3 | Missing | Group discussion of the three mirror uses, followed by multimedia presentation. No apparatus or experiment invented. |
| Periscope | Generic explanation card | Source explanation plus two 45° plane mirrors and object → upper mirror → lower mirror → eye path. Three buttons highlight successive light segments. Source 45° geometry, not a new law-of-reflection lesson. |
| Activity 8.4 | Missing | Four construction steps, source materials and exact knife warning retained. Figure 8.7 dimensions verified visually: box **30 × 10 × 15 cm**; mirror cards **15 × 14 cm**. Displayed as source dimensions, not inferred construction recommendations. BM lists two mirrors; DLP explicitly lists two plane mirrors. |
| Kaleidoscope | Generic instrument card | Three-mirror triangular cross-section and a separate repeated-pattern view. The schematic shows more image motifs than actual bead motifs; the number drawn is not an experimentally predicted image count. Rotation is a UI interaction, not a claim about reflection angles. |
| Activity 8.5 | Missing | All nine material entries and ten steps retained. Mirror cards **4.3 cm wide, 21 cm long**; both plastic discs **5.3 cm diameter**; round black cardboard **5.3 cm diameter**. DLP step 6 explicitly pushes the disc until it touches the prism; BM retains its own attachment wording. |
| Science in Life | Uses listed without problems | Three source problems: looking behind while cycling, seeing beyond a wall, dangerous blind corner. Tap-to-open source solutions, with short reason labels extracted from the situation/solution rather than new explanations. |
| Formative Practice 8.1 | Missing | Exactly the three p. 229 questions: identify the mirror/image characteristic, plane mirrors in a periscope, mirrors in a lift. A schematic person/mirror image supports question 1. No unrelated questions or fabricated answers. |
| Supplement | Independent `realVirtualActivity` factual array | Removed. All audited 8.1 materials, definitions, procedures, questions and instrument descriptions are owned by `chapter8-content.ts` under `mirrors`. Other supplement fields remain byte-for-byte equivalent as serialized data. |

## Geometry and accessibility

`Chapter8Mirrors.tsx` contains only shared vector geometry, visual mappings and interaction state. Facts, labels, apparatus, procedure and questions come through canonical props. No separate BM and DLP drawing implementations. Definitions and diagram explanations are adjacent HTML, not native SVG hover titles. Buttons, disclosure controls and source labels work without hovering. Long procedures use expandable details; key diagrams, definitions, equal-distance result and knife warning are visible directly.

The mirror-comparison panel is a **size comparison**, not a curved-mirror ray diagram. It does not specify focal length, object-position cases or curved-mirror image distances. The equal-distance construction applies only to the separately labelled plane-mirror diagram.

Presentation-only text: generic interface labels (e.g. Rotate, Solution, Reason and BM counterparts); short diagram labels split existing source concepts into readable parts. Official headings and scientific definitions are source-controlled. The permitted science-in-life reason labels restate only what the source problem/solution says.

**UNSOURCED LEARNER-FACING SCIENTIFIC CONTENT ADDED: NONE.**

## Deferred-content locks

SHA-256 hashes were calculated from the pre-edit canonical records. JSON property order is retained.

| Protected data | DLP SHA-256 | BM SHA-256 |
| --- | --- | --- |
| propertiesOfLight, refraction, dispersion, scattering, colorAdditionSubtraction | `24de65c11ce89881db7195871876bb5ba6b119c160fbfcd6234a2148a04e236c` | `8344aedadb6a27170249a635d44b1dc8ac833a616d98c582efd7ccb297000d77` |
| lawOfReflection (moved without changes) | `f5ed4cc45268200683339fa2b9f5a1e10617a3731a4ed262fc1d80a26ae297c6` | `2b7d5deadb10d6bd033d3018251be4fd1b22574c8097b3457e0c1c465fd0b516` |
| supplement excluding removed 8.1 realVirtualActivity | `161e4900205ac12165031887a35c06996e84302068113e7af5477842468bd1a5` | `287bc6456b4692dcf85d720ef0a0fe4870ab27307b78dc9aeaf43a024d355aba` |

The supplement lock includes the reflection experiment, optical history, refraction rules/experiment, dispersion experiments, scattering experiment, object-colour rows, filters, filter matrix and existing active recall. No Chapters 1–7 implementation was edited.

## Source boundaries

No unresolved disagreement is being silently resolved: the explicit BM/DLP procedural differences are preserved. The full plane-mirror characteristic list is supported by the chapter's later source/answer key, as noted above; its law and ray construction remain deferred. The source's blank experimental results table is not replaced with invented readings or centimetre values. Source figures provide schematic demonstrations, not scale models.

## Closing scope and regression locks

This closing commit applies the audit/tests and dead-UI cleanup to `origin/main` at `c3d264cf`. Earlier closing work existed on a separate feature branch and was not present on main. No canonical science data or `Chapter8Mirrors.tsx` geometry is changed here. The existing seven-section live navigation is retained.

The dedicated test embeds the six deferred-data hashes above and both approved canonical mirrors hashes:

- DLP: `f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115`
- BM: `a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a`
- Main-branch approved mirror component (normalized LF): `e048f18ea0739910d13aebe1d90987ef190543dcf6c7fbabc90726f52f05056d`

The component lock uses the actual main-branch implementation, not the later visual refinements on the separate feature branch. Tests do not depend on temporary artifacts. All 17 tracked files in `tmp/ch8p1/` are removed. Unused `ui.path` and unused section entries are removed; the two still-used section entries retain their exact values with updated indexes. No learner-facing text is added.

## Closing validation

- Dedicated live-render/interaction regression suite: **41 passed**.
- Existing Chapter 8 integration suite: **2 passed** after replacing stale pre-Pass-1 heading expectations with the approved official headings. Total **43/43**.
- Targeted ESLint: passed for both test files and the root Notes component.
- TypeScript: reports only two pre-existing, out-of-scope Form 2 errors (`TS2345`, `string | undefined`): `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:305` and `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:523`. Those files are unchanged.
- Approved 8.1 component/canonical locks and all deferred 8.2–8.7 locks pass. The canonical content file and approved mirror component have no diff against the main baseline.
- Production build: **passed (exit 0)**, including static shell, sitemap and Pages worker generation.
- Commit and push to main are explicitly authorized for this closing pass.
