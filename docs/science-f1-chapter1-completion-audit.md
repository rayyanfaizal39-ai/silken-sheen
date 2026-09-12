# Science Form 1 Chapter 1 — completion-pass audit

Scope: Chapter 1 only, BM and DLP together. Prepared 11 September 2026 for the requested human audit. No deployment or commit performed.

## Files changed

- `src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx`: integrates the completion content into the existing live notes renderer.
- `src/components/notes/blocks/Chapter1Completion.tsx`: shared bilingual line diagrams, density explorer, classification and canonical-content supplements.
- `src/components/notes/blocks/LaboratoryApparatusVisual.tsx`: four numbered heating-setup callouts; existing apparatus geometry preserved.
- `src/content/form1/science/chapter-1/chapter1-activities.ts`: measured pendulum procedure corrected from one oscillation to ten in both languages.
- `src/components/notes/ScienceF1Chapter1VisualNotesBlock.test.tsx`: expanded actual-component-render coverage.
- This audit report.

## Section-by-section changes

| Section | Implemented |
| --- | --- |
| 1.1 | Surfaced canonical daily-life connections and innovation definition/examples; added the requested science → knowledge → innovation flow; career fallback now labels subfield examples as examples. |
| 1.2 | Preserved 14 apparatus and four comparison groups; all ten laboratory rules now render; rules, safety measures and accidents have distinct presentation; added a function-based apparatus classification tree and four heating-setup callouts. |
| 1.3 | Surfaced the physical-quantity definition near the beginning; added quantity → value → unit using the brief's length/2.5/m example; decimal prefix values accompany powers of ten; kg/g conversion directions are shown. |
| 1.4 | Added instrument line drawings, three-eye-position water-meniscus/parallax diagram, accuracy/precision targets, sensitivity scales and systematic/random error diagrams. Surfaced canonical error examples, remedies and measurement innovation. |
| 1.5 | Distinguished six solids in water from four liquids on a density scale; solids can float, sink or remain suspended for equal density. Surfaced operational definition and four everyday examples; added mass, initial volume, fully submerged final volume and V₂ − V₁ displacement diagrams. |
| 1.6 | Preserved nine investigation steps and twelve process skills; added pendulum setup/variable callouts and scientific graph. Procedure/responding variable and both axes use the requested ten-oscillation wording. Problem, hypothesis and conclusion retain one-oscillation conceptual wording. |
| 1.7 | Surfaced the canonical purpose and reflection activity; added the brief's honesty/accuracy/responsibility → behaviour → purpose examples, translated together. Existing values remain. |

All eight existing learning experiences are integrated into their relevant sections, with purpose and practical notice visible and expandable instructions. No digital interaction claims to certify a completed physical practical.

## Pendulum data and source fidelity

The table and graph retain these existing pairs without division by ten:

| Length (cm) | Time for 10 complete oscillations (s) |
| --- | --- |
| 20 | 9.1 |
| 30 | 11.4 |
| 40 | 13.1 |
| 50 | 14.3 |
| 60 | 15.2 |

The optional explanation is the exact bilingual note approved in the user's clarification. It explains how a period can be calculated, without substituting calculated values into the main graph or table.

Canonical content remains in `chapter1-canonical.ts` and `chapter1-content.ts`; neither was modified. Existing activities remain in `chapter1-activities.ts`, with only the expressly approved measured-procedure correction. New teaching examples and diagram relationships follow the completion brief. Diagram labels and translations are presentation content, not claimed verbatim textbook quotations.

Runtime inspected: both Science Form 1 registry entries supply `chapter1Content`; the notes route imports and renders `ScienceF1Chapter1VisualNotesBlock`. The tests render that component, rather than testing data presence alone.

UNSOURCED LEARNER-FACING ACADEMIC CONTENT ADDED: NONE

This statement concerns additions in this pass, using the canonical repository content and the user's explicit approved brief. It is not a claim that every pre-existing sentence has been independently checked against an original textbook scan.

## Visuals and language parity

New illustrations are code-authored SVG lines and shapes; no generated raster artwork or new dependencies. Shared components supply the same geometry, data, interaction structure and activity depth to BM and DLP. Numbered callouts and graph-axis wording are bilingual. Native buttons/details support tap/click without hover dependence.

A temporary render harness rasterized 31 SVG instances for geometric inspection. This checks illustrations, not the final responsive page. Temporary harness files were removed; no QA script enters the application.

## Verification

- Chapter 1 canonical coverage: 13 tests passed, without weakening the canonical test file.
- Chapter 1 visual-notes coverage: 12 tests passed.
- Science notes registry/navigation: 6 tests passed.
- Total relevant tests: 31 passed.
- Production build: passed. The build runs repository-wide generators; no semantic Form 3 quiz changes were retained.
- TypeScript: fails on two untouched Form 2 test errors (`string | undefined` passed as `string`): `chapter-7-9-10-visual-integration.test.tsx:291` and `chapter-9/chapter-9-heat-visuals.test.tsx:480`. No Chapter 1 TypeScript errors reported.
- Live browser desktop/mobile interaction review: not performed; the available computer/browser surface inventory was empty. Responsive classes and rendered markup were checked, but visual browser sign-off remains required.

## Remaining human textbook audit

- The existing canonical density table labels pure water as `40°C` in both languages while giving density `1.00`. This pre-existing label was preserved, not silently corrected; verify against the original textbook typography/scan.
- Exact pre-existing section headings and narrative wording have not been independently rechecked against an original textbook scan in this pass. No claim of complete verbatim textbook certification is made.
- Review the diagrams at actual desktop/mobile sizes, instrument-selector interactions and every solid-density state in a connected browser before final acceptance.

Stopped at Chapter 1. No Chapter 2+ implementation, routing rebuild, quiz/flashcard content change, global redesign, deployment or commit.
