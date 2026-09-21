# Chapter 5 — Pass 1 source audit

Scope: official chapter structure and 5.1 only. No particle, diffusion, state-change, temperature-plateau or conservation redesign.

## Sources checked

- BM: `C:/Users/rayya/OneDrive/Faizal/OneDrive/Desktop/tingkatan 3/textbooks/T1 BT SN- SAINS.pdf`, printed pp. 138–145 and chapter summary p. 158. The apparatus page (140) and density/temperature page (143) were rendered for visual inspection.
- DLP: [Science Form 1 textbook, school-library copy](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), printed pp. 138–145, contents and Table 5.2. This is a hosted textbook copy, not a Ministry-hosted download.
- Existing `chapter5-content.ts` and the supplied Pass 1 brief remain the implementation sources. New factual labels/excerpts live in that canonical file; SVG components accept source props.

## Corrections and presentation changes

- The canonical structure now supplies Matter / Jirim and exactly two official headings: 5.1 Matter in Nature / Jirim dalam Alam; 5.2 Three States of Matter / Tiga Keadaan Jirim. The six repeated-number concept cards were replaced with two chapter-path links. Internal 5.2 lesson numbering was removed without rewriting the lessons.
- BM physical-property label `Pengalir haba` became `Kekonduksian haba`, matching the process label in the BM textbook summary. Its existing example remains unchanged.
- The definition, living/non-living examples, experimental conclusions, density rankings, solubility example and all eight temperature values remain from canonical data.
- Short physical/chemical comparison definitions implement the supplied brief; they are not claimed as verbatim textbook quotations. BM uses the verified textbook labels Sifat Fizik Jirim and Bahan larut in the new presentation.
- The two quantities in the temperature table are independent columns, not an arrow sequence.
- Glycerol/water is a density ranking in separate vessels, not a claim that the liquids form persistent layers. Petrol/mercury uses layers; sand/water and oil/cork use the source-backed sink/float relationship. No density formula was added.

## Source conflicts and verification limits

1. **Balloon activity numbering — unresolved; canonical label retained.** The supplied brief and existing canonical data say Experiment 5.2 / Eksperimen 5.2. Both checked textbooks put the balloon setup in Activity 5.1(B), Figure 5.2; Activity 5.2 is the physical/chemical-properties exercise. Clarification was requested. The disputed label has not been silently changed; the requested before/after apparatus and both existing conclusions are implemented.
2. **Gas mass — deferred to Pass 2.** The existing canonical table says Fixed for a fixed amount / Tetap bagi kuantiti tetap, while the supplied textbook correction says No fixed mass / Tiada jisim tetap. This pass leaves all `statesOfMatter` data untouched.
3. **Non-matter examples — canonical-backed, not verified as a textbook list.** The checked definition page asks learners for non-matter examples; it does not list all four canonical examples (light, sound, heat, shadows). They were retained as expressly requested, with no new examples.
4. **Heat-conduction example — existing specificity retained.** The canonical example specifies steel/keluli for the pan; the checked textbook illustration describes a metal conductor more generally. No new material or adaptation was added.

## Verification

- Live-render tests check the two official headings, all Pass 1 facts and values, apparatus states, density representations, temperature columns, solubility sequence and BM/DLP SVG geometry.
- Interaction tests exercise all three sample selections and both apparatus views.
- A comparison against the original renderer checks unchanged 5.2 SVGs and lesson text, allowing only removal of repeated official section codes. Canonical Pass 2 data has fixed regression hashes.
- No new unsourced scientific examples or measurements were added. New UI wording is limited to source labels and the supplied comparison wording.
