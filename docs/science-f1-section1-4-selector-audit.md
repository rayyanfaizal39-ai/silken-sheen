# Science Form 1 §1.4 — instrument selector fix

13 September 2026. Scope: the six measuring-instrument tabs, BM + DLP. No Chapter 2 changes, chapter redesign, commit or deployment.

## Changes

| Tab | Standard visual | Higher-accuracy visual |
| --- | --- | --- |
| Length | Rigid ruler and visibly flexible, graduated tape | Existing vernier and micrometer shapes |
| Mass | Lever balance plus triple-beam balance, with pan, three graduated beams/riders, pointer and base | Digital balance with platform, body, LCD, buttons and feet |
| Time | Enlarged analogue stopwatch with dial, hand and controls | Digital stopwatch with display and controls |
| Temperature | Long glass laboratory thermometer with bulb, column and graduations | Narrow clinical thermometer and digital probe thermometer |
| Electric current | Analogue needle meter, scale, A and terminals | Digital meter, LCD, A and terminals |
| Liquid volume | Measuring cylinder, liquid, meniscus and stable base | No unsupported/empty second card |

- Temperature grouping corrected in the shared Chapter 1 content builder: laboratory thermometer is standard; clinical and digital thermometers are on the higher-accuracy side.
- One visible instrument heading per card; duplicate figure captions are suppressed. Numbered multi-tool drawings correspond to the numbered names in that heading. SVG titles and aria labels remain.
- Source-backed values retained: vernier 0.01 cm / 0.1 mm; micrometer 0.001 cm / 0.01 mm; standard stopwatch 0.1 s or 0.2 s; digital stopwatch 0.01 s; laboratory thermometer 1°C; clinical/digital thermometers 0.1°C; digital ammeter 0.01 A.
- No numerical balance resolution was invented. The requested LCD samples (125.4 g, 00:12.34, 36.7°C, 0.34 A) are labelled illustrative, not textbook measurements.
- Sensitivity/reading explanations use the existing Chapter 1 concepts and the user-approved brief. Instrument names come from the existing bilingual content; BM digital balance remains **Penimbang digital**.
- Two comparable-height cards at desktop widths, stacked on mobile. Liquid volume uses one card rather than a forced comparison.
- Detailed vernier/micrometer reading lessons and the meniscus/parallax lesson elsewhere in §1.4 are unchanged.

## Files

- `src/components/notes/blocks/MeasuringInstrumentComparison.tsx` — new shared comparison renderer and missing SVG drawings.
- `src/components/notes/blocks/Chapter1Completion.tsx` — caption suppression, flexible tape shape and analogue-tool framing.
- `src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx` — wires the comparison into the existing selector and associates tabs with their panel.
- `src/content/form1/science/chapter-1/chapter1-content.ts` — temperature regrouping only.
- `src/components/notes/ScienceF1InstrumentSelector.test.tsx` — all-six-tab live-render tests.
- This report.

## Verification

- **58 tests passed**: 20 selector tests, 19 current Chapter 1 visual-render tests, 13 canonical/assessment tests, six navigation tests.
- The new tests render the actual `ScienceF1Chapter1VisualNotesBlock` in each tab state in both languages. State is selected with a test-only React hook override; this is rendered-state coverage, not a claim of browser click testing.
- Tests cover both cards' shapes, single visible headings, accessibility labels, temperature grouping, source values, the liquid-volume exception, preserved detailed lessons and identical BM/DLP shape geometry.
- SVGs from all six states were rasterized and visually inspected in both languages. Inspection corrected out-of-place tape graduations and normalized analogue-tool framing. Temporary QA harness removed.
- Production build passed.
- TypeScript still reports the two existing out-of-scope Form 2 test errors (`string | undefined`), at `chapter-7-9-10-visual-integration.test.tsx:298` and `chapter-9/chapter-9-heat-visuals.test.tsx:480`. No Section 1.4 TypeScript errors reported.
- **Full browser visual/interaction sign-off remains pending**: the available browser/app inventory was empty. SVG inspection and responsive-code checks do not establish the final desktop/mobile page layout.

The UI/UX skill guided readable diagrams, comparable card sizing, caption removal and accessible labels without introducing a new design system. No new dependencies or generated illustration assets enter the application.

Stopped after this selector fix. Do not treat this report as browser sign-off or authorization to begin Chapter 2.
