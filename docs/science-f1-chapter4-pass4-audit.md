# Chapter 4 Pass 4 source and visual audit

Scope: only 4.7 Plant Reproduction / Pembiakan Tumbuhan. Passes 1–3 and Chapter Check are preserved.

## Source handling

Existing flower, pollination, seed and germination facts render from `chapter4-content.ts`. The canonical flower data groups the anther/filament under stamen and stigma/style/ovary/ovule under pistil. Selecting a substructure displays its canonical parent name/function; no individual functions were invented.

Experiment 4.1 apparatus was checked against the local `C:/Users/rayya/Downloads/T1 BT SN- SAINS.pdf`, printed pp. 129–130 (PDF pages 139–140), Figure 4.37:

- A: moist cotton at room temperature.
- B: dry cotton at room temperature.
- C: cooled boiled water with a cooking-oil layer at room temperature.
- D: moist cotton in a refrigerator.
- Black paper is represented as an exterior covering with a schematic cutaway for visibility.

These setup labels are stored once in the canonical `germinationExperiment` data. EN labels are semantic counterparts of the verified BM setup, not claimed as verbatim DLP quotations. The visual compares A/B for water, A/C for air and A/D for temperature. No measured germination results, invented data or student worksheet inputs are added.

The numeric 25–35°C clause could not be verified in the available approved textbook. It was removed from both canonical temperature reasons as explicitly requested; the existing enzyme-activity clause is preserved. No replacement numeric range was added.

SOURCE CONFLICT FOUND: canonical BM seed label is `Radikal`; the local BM textbook, printed p. 127 (PDF page 137), uses `Radikel`. The canonical label remains unchanged pending a source correction decision. No scientific function was changed.

## Presentation

One official 4.7 section replaces the two old learner-facing section headings. Internal headings are unnumbered and follow the requested topic structure. Shared geometry handles flower anatomy, grouped reproductive organs, flower types, pollinating agents, same-plant versus different-plant routes, the pollen tube, ovule/seed and ovary/fruit outcomes, seed anatomy, cotyledon counts, soil-level germination and experiment apparatus.

New presentation copy is limited to requested internal headings and their BM counterparts, selection labels derived from canonical part names, same/different-plant cues, schematic/not-to-scale text and the explicit light-not-required-to-start checkpoint. No unsourced biological claims were added.

## Verification

Live React render tests cover source content, anatomy, route locations, classification, experimental setups and language geometry parity. Direct button-handler interaction tests verify canonical functions and highlights for all eight flower substructures and six seed parts. SVGs were rasterised and visually reviewed. Browser viewport testing was not performed.
