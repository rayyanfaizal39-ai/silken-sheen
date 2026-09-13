# Science Form 1 Chapter 2 — Pass 2B

## Scope

Only the 11 human body systems and section 2.1.7 appreciation/reflection were implemented, for BM and DLP together. Cell diagrams, microscope practicals, organisms, specialised cells, organisation chains, respiration, photosynthesis and investigations are unchanged. No deployment, commit or push.

The supplied request ends at “The student shou” under nervous-system requirements. Implementation follows the complete visible requirements and existing Chapter 2 content; no missing instructions or reflection wording were invented.

## Existing visual inspection

Inspected `human-body-systems.webp`, `BodySystemsVisual`, the current live `ScienceF1Chapter2VisualNotesBlock`, both localised `bodySystems` arrays and `chapter2BodySystemNames` before editing.

The WEBP has a central human figure surrounded by separate system illustrations. Its geometry is recognisable, but all systems remain visible together, and its excretory illustration concentrates on urinary organs rather than all three source-listed structures. The legacy component puts numeric markers on that static montage. The current live page does not render that component: it has a text selector without anatomy. The existing appreciation content is rendered by the legacy page but absent from the live visual page.

The raster asset remains untouched. The legacy body-system export now delegates to the same reusable component as the live page.

## Implementation

- `Chapter2BodySystemsVisual.tsx`: one persistent front-facing body outline, 11 distinct selectable anatomy layers, numbered organ connections, and the existing names/organs/functions. The selector follows the canonical name order using an explicit mapping to the differently ordered `bodySystems` array. No duplicate factual dataset was created.
- `ScienceF1Chapter2VisualNotesBlock.tsx`: replaces only the existing body-system selector, then adds section 2.1.7 using the existing appreciation title, body and all three reflection items. Reflection uses labelled native checkboxes; it does not award completion or claim practical participation. Checks remain present when switching language within the mounted page; reload persistence was not added.
- `Chapter2LearningVisuals.tsx`: replaces only the old body-system implementation with a re-export. Its other visual implementations are unchanged.
- `ScienceF1Chapter2Pass2B.test.tsx`: validates live integration, all 22 BM/DLP selector states, source-data consumption, shared silhouette geometry, language parity, reflection content and the reusable legacy export.

## Anatomy coverage

| System | Visual representation |
| --- | --- |
| Nervous | Brain, spinal cord and branching peripheral nerves |
| Digestive | Mouth, oesophagus, stomach and distinct small/large intestines |
| Skeletal | Skull, ribs, spine, pelvis and major limb bones |
| Excretory | Skin outline, lungs and kidneys, matching all source-listed structures |
| Respiratory | Nose, airway and paired lungs |
| Reproductive | Pelvic region linked to separate ovarian and testicular/penile insets |
| Lymphatic | Simplified pathways and nodes; the source-listed “Limfa”/“Lymph” wording is retained |
| Blood circulatory | Heart and branching blood vessels |
| Muscular | Distinct chest, abdominal, arm and leg muscle groups |
| Endocrine | Pituitary, thyroid, adrenal and pancreas positions, plus separate ovarian/testicular insets |
| Integumentary | Highlighted skin across the body outline |

Only the selected system's anatomy is mounted. The unrelated systems are hidden. Insets keep reproductive examples separate rather than implying one combined anatomy. Geometry is schematic, not a quantitative scale or anatomical atlas. Number callouts sit beside small structures so they remain visible.

## Text provenance

All rendered system names, organ terms and functions come directly from the supplied `content.bodySystems` entries. Splitting comma-separated organ terms changes only presentation. No organ names were added to the source lists. Section 2.1.7 renders `content.appreciation` verbatim. System/Sistem, Organs/Organ and Function/Fungsi are existing Chapter 2 UI labels. Numbered diagram links and the 2.1.7 identifier add no scientific claims.

The existing source boundary remains: no official DLP textbook was supplied; English wording is the repository's existing semantic translation of source-verified BM. The lymphatic source entry lists only Limfa/Lymph, so the geometry's nodes are not given newly authored organ labels or explanations.

UNSOURCED LEARNER-FACING CONTENT ADDED: NONE

## Verification

- 85 permanent Chapter 2 tests passed across seven files, including all 54 existing tests and 31 Pass 2B tests.
- Every selector state renders exactly one anatomy layer and its own source function in both languages; unrelated functions and anatomy layers are absent.
- Every system uses the same body-outline geometry. BM and DLP anatomy geometry is identical.
- Synthetic source mutations verify that displayed names, organs, functions and reflection text are read from the supplied content.
- All 11 SVG diagrams were rasterised into a contact sheet and visually inspected. Small-organ callout placement and the lymphatic connection were refined.
- ESLint for the new component and tests, formatting checks and `git diff --check` passed.
- Production build passed. Build-generated tracked content has no substantive changes.
- TypeScript reports only the two existing out-of-scope Form 2 test errors at `chapter-7-9-10-visual-integration.test.tsx:298` and `chapter-9-heat-visuals.test.tsx:480`, already recorded in Pass 2A. No new errors.
- Browser access was unavailable through CUA. Browser clicks, keyboard interaction and mobile screenshots are not claimed as verified. Controls use native buttons/checkboxes, visible focus, touch targets of at least 44px, and a stacked small-screen layout without hover-dependent information.

The emil-design-eng skill informed selection feedback and focus visibility. Temporary review files and the local review server were removed after verification.
