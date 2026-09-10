# Science Form 2 — Chapter 2 (Ekosistem / Ecosystem)

## BM + DLP human-audit remediation — implementation report

Scope: Science Form 2 Chapter 2 only, applied to both language streams in parallel.
No Supabase, Cloudflare, auth, billing, subscription, payment or analytics code was touched.
No new notes route was created and no legacy notes surface was made visible.

---

## 1. Live path

Traced before editing.

| Layer | File |
| --- | --- |
| Registry entries | `src/content/registry.ts` — `science-f2-c2-bm` (line 3384) and `science-f2-c2-dlp` (line 3398) |
| Data object that actually renders | `sciF2InteractiveData` → `scienceF2C2InteractiveBM` / `scienceF2C2InteractiveDLP` |
| Live content files | `src/content/form2/science/chapter-2/interactive-bm.ts`, `interactive-dlp.ts` |
| Route branch | `src/routes/notes.tsx:2046` — `activeChapter?.sciF2InteractiveData` → `chapter === 2` |
| Component | `src/components/notes/ScienceF2Chapter2NotesBlock.tsx`, a re-export of the shared `ScienceF2InteractiveNotesBlock` |
| Sectioned shell | `src/components/notes/ScienceSectionedNotesShell.tsx` (unchanged) |

`notes-bm.ts` / `notes-dlp.ts` are registered on the same entries but are **unreachable**: the
`sciF2InteractiveData` branch is evaluated first and returns. They were used as reference only and
were not edited, so nothing renders twice.

---

## 2. Files changed

**Modified**

- `src/content/form2/science/chapter-2/interactive-bm.ts`
- `src/content/form2/science/chapter-2/interactive-dlp.ts`
- `src/content/form2/science/interactive-types.ts` — added `standardTitle`, `contextImageSet`, `ConceptTreeBlock`, `ImpactTableBlock`
- `src/components/notes/ScienceF2InteractiveNotesBlock.tsx` — renders the four additions
- `src/components/notes/blocks/AnnotatedImage.tsx` — nested `regions` hit areas now stack smallest-on-top
- `src/content/form2/science/chapter-2/chapter-2-textbook-emphasis.test.tsx` — golden data regenerated

**Added**

- `src/components/notes/blocks/ConceptTree.tsx`
- `src/components/notes/blocks/ImpactTable.tsx`
- `src/assets/notes/form2-science/chapter-2/chapter2_pond_ecosystem.webp`
- `src/assets/notes/form2-science/chapter-2/chapter2_mutualism_clownfish_anemone.webp`
- `src/assets/notes/form2-science/chapter-2/chapter2_commensalism_remora_shark.webp`
- `src/assets/notes/form2-science/chapter-2/chapter2_parasitism_tapeworm_intestine.webp`

Both new blocks are generic and reusable — neither mentions Chapter 2 — per the AcadeMY
"reusable architecture, single source of truth" principle.

---

## 3. Human-audit fixes

### Section 2.1 — Energy Flow in an Ecosystem

| Item | Status |
| --- | --- |
| Official section title visible | **Fixed.** The shell only ever printed a section's own title, so the Standard Kandungan was invisible. Added `standardTitle`, shown as an eyebrow above every section: "2.1 Energy Flow in an Ecosystem" / "2.1 Aliran Tenaga dalam Ekosistem". Applied to 2.2, 2.3 and 2.4 as well. |
| Sun → chemical energy → consumers | **Fixed.** Opening explanation rewritten to the textbook's three-step statement, kept to three short sentences. |
| Producer | **Fixed.** "A producer is an organism that **produces its own food through photosynthesis**. Most plants are producers." Examples moved to the card's detail line. |
| Primary consumer | **Fixed.** Consumer defined first, then "Primary consumers are **herbivores and omnivores** that **eat producers**." |
| Secondary consumer | **Fixed.** "an omnivore or carnivore that eats a **primary consumer**"; the primary-carnivore naming is kept as the second sentence. |
| Tertiary consumer | **Fixed.** "a **secondary carnivore** that eats a **secondary consumer**". |
| Decomposer + saprophytism | **Fixed.** "breaks down dead animals and plants into simpler materials or nutrients… known as **saprophytism**", all three concepts marked. |
| Food chain / food web section (2.1.2) | **Preserved** — already correct, only `standardTitle` added. |

### Section 2.2 — Nutrient Cycle in an Ecosystem

| Item | Status |
| --- | --- |
| Water Cycle before Carbon/Oxygen | **Fixed.** The two sections were swapped. Per your instruction the SP codes stayed attached to their own content, so the order is now 2.2.2 Water Cycle → 2.2.1 Carbon and Oxygen Cycles → 2.2.3 Disruptions. The SP number is not printed in the section header; it appears only in the "Check yourself — 2.2.x" heading. |
| Existing water-cycle visual kept | **Preserved.** No replacement image was generated or introduced. All eight original processes (evaporation, condensation, precipitation, runoff, infiltration, groundwater, root uptake, transpiration) are untouched. |
| Respiration, defecation, excretion added | **Fixed**, three ways so it is never hover- or tooltip-only: (a) a ninth hotspot on the deer already in the artwork — "Animals return water" / "Haiwan mengembalikan air" — whose panel lists all three processes; (b) the "Role of living things" tab reworded from "respiration, sweating and excretion" to "**respiration, defecation and excretion**"; (c) a new always-visible card naming all three, with sweating and urination as the excretion examples. |
| Carbon/oxygen interactive visual | **Preserved.** Academically correct and useful; no new carbon-cycle image was created. |
| Disruption terminology (DLP) | **Fixed.** "Uncontrolled deforestation" → "Unrestricted logging"; "Excessive use of water" → "Overconsumption of water resources"; the matching Check Yourself hint follows. |
| Disruption terminology (BM) | **Already correct / preserved** — "Penebangan hutan yang tidak terkawal" and "Penggunaan sumber air yang berlebihan" were already textbook-faithful. |
| Check Yourself CO₂/O₂ wording | **Fixed.** Now "carbon dioxide" / "oxygen" and "karbon dioksida" / "oksigen". The symbols remain in the cause-and-effect chains, where they are the textbook's own shorthand and no concept is being assessed. |

### Section 2.3 — Interdependence, ecological terms and interactions

| Item | Status |
| --- | --- |
| Species | **Fixed.** "common characteristics" (not "similar"), and the ability to reproduce and breed offspring retained. Corrected in both the card and the relationship diagram. |
| Population | **Fixed** to the textbook phrasing; the dragonfly example kept. |
| Community | **Fixed** — "a few populations of different organisms… interact with one another". |
| Habitat | **Fixed** — "the natural surroundings or home of an organism"; examples kept. |
| Ecosystem | **Fixed** wording; already included the non-living components, which are retained. |
| Pond ecosystem visual | **Fixed.** `assets/ch2_pond_ecosystem.png` integrated as an interactive figure in `regions` mode with five concepts. The five hit areas nest the way the concepts do — dragonflies inside the community, inside the pond, inside the ecosystem — so stepping through them draws the hierarchy. Five 44 px concept buttons drive it, with an obvious selected state and a live explanation panel. Species highlights the whole dragonfly group, never a single organism. |
| Adaptation memorisation load | **Fixed.** The learning content is intact; a compact "ℹ️ Additional info / Info tambahan" callout now carries the tropical, desert and tundra conditions plus why adaptation matters. No new memorisation table was added. |
| Interaction hierarchy | **Fixed.** The five interactions used to sit in one flat card grid, which reads as five peers. Added a `ConceptTree` block stating the real classification, cut the card grid down to the three kinds of symbiosis, and moved prey–predator and competition into their own contrast block under the heading "Two interactions that are not symbiosis". |
| Three symbiosis visuals | **Fixed.** All three integrated as one set — same size, same 16:9 aspect, three across from `sm`, stacked on a phone. Each caption carries the relationship definition in its own language, visible without any interaction. |
| Tapeworm feeding | **Fixed.** Card now says it absorbs nutrients across its body surface; no copy implies a mouth. |
| "Shortage of water supply" (DLP) | **Fixed** → "Limited water supply". BM keeps "Kekurangan bekalan air". |
| Matcher, biological control, population factors | **Preserved** — correct, and not weakened. |

### Section 2.4 — Role of Humans in Maintaining a Balanced Nature

| Item | Status |
| --- | --- |
| Table 2.1 / Jadual 2.1 | **Fixed.** Restored in full through the new `ImpactTable` block: four activities × their effects, exactly as listed in the pack. A real table from `sm` up; stacked cards on a phone, where a two-column table would overflow or shrink past reading size. |
| Four main steps | **Fixed.** Enforce laws, increase public awareness, practise the 5Rs, use biological control — each with a concise explanation rather than a bare heading. The Forestry Department patrol/roadblock detail moved into the law-enforcement card. |
| 5R detail | **Preserved**, moved into a single compact accordion so all five definitions survive without a five-card wall. |
| Old two-column summary | **Removed from the live render.** It duplicated the new table exactly (left column) and the four steps (right column). Verified line by line that no fact was lost before removing it. |

---

## 4. Images

| Supplied asset | Final repo path |
| --- | --- |
| `ch2_pond_ecosystem.png` | `src/assets/notes/form2-science/chapter-2/chapter2_pond_ecosystem.webp` |
| `ch2_mutualism_clownfish_anemone.png` | `src/assets/notes/form2-science/chapter-2/chapter2_mutualism_clownfish_anemone.webp` |
| `ch2_commensalism_remora_shark.png` | `src/assets/notes/form2-science/chapter-2/chapter2_commensalism_remora_shark.webp` |
| `ch2_parasitism_tapeworm_intestine.png` | `src/assets/notes/form2-science/chapter-2/chapter2_parasitism_tapeworm_intestine.webp` |

Converted to WebP and renamed to the `chapter2_*` prefix the chapter's five existing figures already
use, and imported the same way (a `src/assets` import through the `@` alias). No Supabase bucket, no
Cloudflare storage, no new asset architecture. Sizes 47–136 KB, in line with the existing files.

All four are text-free, so BM and DLP import the identical files; every label, caption and alt text
lives in chapter content. Each figure declares its intrinsic aspect ratio, so the box is reserved
before the file arrives and nothing shifts as it loads.

**Water cycle: the existing AcadeMY visual was retained.** No replacement image was created or
introduced, exactly as the pack specifies.

---

## 5. BM / DLP parity

**Passed.** Verified programmatically against the two content objects rather than by eye:

- identical section count (11), order, SP numbers and `standardTitle` presence
- identical set of block types per section, identical card and check counts
- identical image assets referenced by both streams
- 53 emphasis markers per stream, in exactly the same field paths, none repeated
- no English function words anywhere in the BM stream
- no BM strings in the DLP stream

Intentional wording differences, all required by textbook terminology rather than translation:

- DLP "Unrestricted logging" ↔ BM "Penebangan hutan yang tidak terkawal"
- DLP "Overconsumption of water resources" ↔ BM "Penggunaan sumber air yang berlebihan"
- DLP "Limited water supply" ↔ BM "Kekurangan bekalan air"
- DLP "Prey–predator" ↔ BM "Mangsa–pemangsa"; DLP "saprophytism" ↔ BM "saprofitisme"
- BM keeps the English 5R keywords with a Malay gloss, e.g. "Refuse (Tolak)"

---

## 6. Validation

| Gate | Result |
| --- | --- |
| TypeScript (`tsc --noEmit`) | Clean. |
| Science Form 2 + notes tests | 1545 passed, 69 files, 0 failed. |
| Full suite | 3094 passed, 8 failed — all pre-existing, see below. |
| Production build (`npm run build`) | Succeeds. |
| Console | No React warnings, no missing keys, no broken asset requests, no runtime exceptions. |

**Responsive QA** at 1280, 430, 390 and 375 px, both languages, all 11 sections:

- zero horizontal overflow on the document, and no element overhanging the viewport
- every figure loads, none distorted or clipped; the three symbiosis images render at identical
  boxes at every width (299×167 at 375 px, 354×198 at 430 px, 256×143 at desktop)
- Table 2.1 renders as a table from `sm` up and as four stacked cards below it, verified at 375 px
- interactive controls are ≥44 px; the only sub-36 px controls anywhere are the pre-existing
  "Enlarge" affordance and the shared Tabs/accordion triggers, which this change did not introduce
- selected state confirmed: `aria-pressed` flips, the button restyles, the explanation panel updates

**One defect found and fixed during QA.** In `regions` mode every hit area was `z-10`, so where
regions nest, the largest is painted last and swallows every click meant for the ones inside it —
clicking the dragonflies selected "Ecosystem". Regions are now stacked by area, smallest on top.
Chapter 2 is the first content with nested regions, so nothing else changes behaviour.

**Pre-existing failures, unrelated to this work** (confirmed by stashing these changes and
re-running — they fail identically on a clean tree):

- `src/lib/billing-core.test.ts`
- `src/lib/invoice-pdf.server.test.ts`
- `src/routes/-onboarding-ui.test.ts`
- `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`
- `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
- `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
- `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
- `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`

---

## 7. Related Chapter 2 surfaces

Inspected the Chapter 2 quiz, flashcards and mind map for direct contradictions. **No changes were
needed** — they were already textbook-faithful, and the notes were the outlier:

- flashcards already define a species as having "common characteristics" / "ciri sepunya"
- the quiz already carries the pack's producer and decomposer definitions verbatim
- flashcards already say "Limited water supply"
- both mind maps already nest only mutualism, commensalism and parasitism under Symbiosis, with
  prey–predator and competition as siblings

No assessment content was rewritten and no question difficulty was reduced.

---

## 8. Notes for the maintainer

- **The repository is mid-cherry-pick.** `.git/CHERRY_PICK_HEAD` points at `f61fc206 "Enhance
  biodiversity content and terminology in Chapter 1"`, whose content is already on `main` as
  `ca6cdfec`. This predates this work and was left untouched — resolve it with
  `git cherry-pick --abort` or `--skip` before committing.
- `src/content/form3/science/master-quizzes.generated.ts` was modified in the working tree at the
  start of this session. Starting the dev server regenerated it from the master CSV and it now
  matches `HEAD`; it is a generated artifact, reproducible with `npm run generate:science-f3-quizzes`.
- Chapter 2 could not be reached through the running app locally: there is no `.env`, so Supabase
  auth never resolves and `/notes` sits on the loading screen even with guest mode enabled. Browser
  QA was therefore done against the same component and the same content objects the route renders,
  mounted directly; the harness was deleted afterwards. Screenshots were unavailable because the
  Browser pane was hidden throughout, so the visual checks above are DOM and geometry measurements
  rather than images.
