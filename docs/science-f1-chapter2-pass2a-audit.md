# Science Form 1 Chapter 2 — Pass 2A

## Scope

Only unicellular/multicellular organisms, specialised animal/plant cells, and levels of organisation were changed. Pass 1 cell diagrams and microscope practicals, the 11-system selector, respiration, photosynthesis and investigations remain unchanged. No deployment, commit or push.

## Existing visual inspection

Inspected all three requested WEBP files and the relevant `Chapter2LearningVisuals.tsx` implementations before creating visuals.

- `unicellular-multicellular.webp`: recognisable silhouettes and no embedded language, but one glossy montage makes individual recognition features small on mobile. The old component reveals canonical notes but has no recognition clues.
- `specialised-cells.webp`: recognisable cell families, but the montage lacks a separate RBC side profile and individual structure-to-function presentation. Raster detail is small when fitted to mobile.
- `levels-of-organisation.webp`: overall examples match the chains, but the plant starting image is a generic chloroplast-bearing cell, not a clear epidermal-cell schematic; the animal starting cell does not visually match its epithelial tissue. No sufficiently clear zoom-out relationship on mobile.

These assets and their legacy component were left intact. The current live page now uses simple SVG/React diagrams with canonical text. No raster/image-generation assets were created for learners.

## Files

- `src/components/notes/ScienceF1Chapter2VisualNotesBlock.tsx`: integrates only the three in-scope visual areas.
- `src/components/notes/blocks/Chapter2OrganismDiagrams.tsx`: seven organism SVGs, correct canonical grouping and native tap/keyboard-expand details.
- `src/components/notes/blocks/Chapter2SpecialisedDiagrams.tsx`: ten specialised-cell entries, appearance → adaptation → existing description.
- `src/components/notes/blocks/Chapter2OrganisationDiagrams.tsx`: two connected five-level visual sequences with source-backed names and definitions.
- `src/content/form1/science/chapter-2/chapter2-canonical.ts`: adds recognition clues and structural cues to the existing entries, not a second dataset.
- `src/content/form1/science/chapter-2/chapter2-content.ts`: localises the two new fields.
- `src/components/notes/ScienceF1Chapter2Pass2A.test.tsx`: ten new live-render tests.
- This audit.

## Coverage

Organisms: Amoeba, Paramecium, Chlamydomonas, Euglena, Mucor, Spirogyra, Hydra. Existing Euglena note and all canonical classifications retained. Mucor morphology does not invent cross-walls in the hyphae.

Animal cells: nerve, epithelial, muscle, red blood, white blood, reproductive (sperm and ovum). RBC has top and biconcave side views and no nucleus. Epithelial mucus wording is retained verbatim.

Plant cells: epidermal, palisade, guard and root hair. Guard pair surrounds a stoma; root hair has a long extension; canonical water/nutrient and epidermal gas-exchange wording are retained.

Animal chain: epithelial cell → epithelial tissue → stomach → digestive system → animal.

Plant chain: epidermal cell → epidermal tissue → leaf → transport system → plant.

The digestive-system diagram is confined to the required organisation example; no 11-system redesign was made.

## Text provenance and uncertainty

Existing canonical names, notes, functions, classifications and organisation chains are unchanged. New recognition and adaptation phrases originate from the user's Pass 2A brief, with BM equivalents added alongside them in the same canonical entries. UI wording added from that brief includes ONE CELL/SATU SEL, MANY CELLS/BANYAK SEL and their life-process/specialisation connections, Top view/Pandangan atas, Side view/Pandangan sisi, Sperm/Sperma, Ovum and Stoma. These are implementation translations/captions, not newly verified verbatim textbook quotations.

No additional scientific claims beyond the supplied brief and existing source were introduced. The repository's existing boundary still applies: English content is a semantic translation of source-verified BM; an official DLP textbook was not supplied for independent verification. Diagram proportions are schematic, not quantitative size claims.

## Verification

- All 54 permanent Chapter 2 tests passed across six files, including all Pass 1 tests and ten new Pass 2A live-render tests.
- All 27 new SVG geometries are identical between BM and DLP. Labels alone change.
- Mutation checks confirm the renderer consumes canonical names, notes, clues, adaptations, functions and chain names.
- SVG contact sheets were rasterised and visually inspected; cilia anchors, root-hair outline and digestive-tract connections were refined after inspection. The temporary review test was removed.
- No browser click/mobile screenshot sign-off is claimed. Organism interactions use native `details`/`summary`, with visible keyboard focus and no hover dependency. Responsive diagrams retain HTML labels; specialised cells and organisation levels remain visible without interaction.
- TypeScript check: only the two existing out-of-scope Form 2 test errors (`chapter-7-9-10-visual-integration.test.tsx:298` and `chapter-9-heat-visuals.test.tsx:480`). No new errors.
- Production build: passed again after the final geometry refinements.

The UI/UX skill informed touch targets, focus visibility, mobile stacking and readable labels. Its repository search script was absent, so the written checklist and existing AcadeMY palette were used.
