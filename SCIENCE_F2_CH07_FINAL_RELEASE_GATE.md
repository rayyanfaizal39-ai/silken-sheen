# Science Form 2 Chapter 7 Final Release Gate — Keelektrikan dan Kemagnetan (BM + DLP)

**Mode:** READ-ONLY. No project file was modified. `git status` on `chapter-7/` shows only the nine remediation-era entries, unchanged by this pass; `notes-bm.ts` / `notes-dlp.ts` show **0 modifications**.
**Date:** 2026-08-28
**Method:** The remediation changelog was read but **not trusted**. Every claim was re-verified by mounting the real components from the Vite dev ESM graph, reading **51,477 characters** of rendered learner output across both languages, and measuring SVG geometry attribute-by-attribute where a diagram makes a scientific claim.

---

## 1. Final verdict

# FAIL — HUMAN REVIEW REQUIRED

The remediation is very largely successful: **all twelve former findings are FIXED**, all 10 SPs are now genuinely taught, the mandatory DSKP experiment is properly staged, the meter-placement diagram is topologically correct, H-04 is source-resolved against the textbook's own answer key, leakage is 0, and parity is exact.

Freeze is blocked by **one new CRITICAL defect introduced by the remediation**: in the bar-magnet view of the new field diagram, the two field lines below the magnet carry **reversed arrowheads**, pointing S→N outside the magnet. This contradicts the source, and contradicts the same diagram's own stated property.

The gate's own rule applies directly: *"A visual error overrides correct prose"* and *"Do not accept reversed arrows."*

This is a small, well-localised fix — four numbers in one array — but it is a wrong scientific claim in the chapter's flagship new magnetism visual, so it cannot be waved through.

---

## 2. Source provenance

| Source | Status | Chapter 7 location |
|---|---|---|
| DSKP.pdf | Authoritative | 7.0 on PDF pp. 79–83 (printed 68–72); **Jadual 9** on PDF p. 44 (printed 33) |
| Textbook.pdf | Authoritative | Bab 7 printed pp. 140–166; **answer key printed p. 281** |
| Errata.pdf | **Self-disclaimed**, advisory only | One Bab 7 item: p. 151 *"sel sering"* → *"sel kering"* |
| NotebookLM source map | Checklist only | Its fabricated Newton's-Third-Law cross-reference was correctly not acted on |

Authority order was applied as instructed. Where outside science was needed to identify a contradiction — the reversed arrows — the finding is nonetheless **source-derived**: textbook Rajah 7.16 states *"Garisan medan magnet mengarah dari kutub utara ke kutub selatan magnet,"* and AcadeMY's own feature note repeats it verbatim. No outside knowledge was required to see the conflict.

Jadual 9 is described throughout as a **mandatory DSKP experiment**, never as "legally compulsory".

---

## 3. Live production path

| Layer | Artefact | Status |
|---|---|---|
| Registry | `registry.ts:3536` (`science-f2-c7-bm`), `:3550` (`-dlp`) | — |
| `sciF2InteractiveData` | `chapter-7/interactive-bm.ts` (34.6 KB) / `interactive-dlp.ts` (33.4 KB) | **LIVE** |
| `notes` | `chapter-7/notes-bm.ts` (19.8 KB) / `notes-dlp.ts` (20.5 KB) | **REGISTERED-BUT-NOT-RENDERED (dead legacy)** |
| Route | `routes/notes.tsx:2055` → `ScienceF2Chapter7NotesBlock` | — |
| Component | → `ScienceF2InteractiveNotesBlock.tsx` | — |

**Precedence re-verified:** `activeChapter?.sciF2InteractiveData ?` at `notes.tsx:1999` is evaluated before the `activeChapter?.notes &&` fallback at `:2141`. The interactive branch always wins.

**Dead notes were not revived.** They remain registered (`scienceF2C7Notes*` appears 4× in the registry: 2 imports, 2 assignments) but unreachable, and git shows **0 modifications** to both files. No second Chapter 7 system exists. Nothing in this report credits them.

---

## 4. Section architecture

**10 sections in both languages**, verified by walking the live component.

| # | BM (rendered) | DLP (rendered) |
|---|---|---|
| 1 | Tenaga | Energy |
| 2 | Cas Elektrostatik | Electrostatic Charges |
| 3 | Elektrostatik dalam Kehidupan Harian | Electrostatics in Daily Life |
| 4 | Arus Elektrik | Electric Current |
| 5 | Arus, Voltan dan Rintangan | Current, Voltage and Resistance |
| 6 | Hukum Ohm | Ohm's Law |
| 7 | Litar Bersiri dan Litar Selari | Series and Parallel Circuits |
| 8 | Sifat Magnet dan Medan Magnet | Properties of Magnets and Magnetic Fields |
| 9 | Elektromagnet dan Corak Medan Magnet | Electromagnets and Field Patterns |
| 10 | Kekuatan Elektromagnet dan Kegunaannya | Electromagnet Strength and Its Uses |

One active section at a time; Back / Next verified working across all ten (9 forward transitions at every width tested); progress chips update. No duplicate concept section. No content wall — the 3 → 10 split moved ~8,250 rendered characters to ~22,600 spread across ten sections.

**On the changelog's own question about the 4 → 5 → 6 run:** read in sequence, current (what flows) → the three quantities and their instruments → Ohm's Law relating them is a coherent progression, and section 6 opens by naming the relationship rather than restating section 5. No confusion found.

---

## 5. SP coverage matrix

| SP | Source requirement | Live learner evidence | Status | Blocker? |
|---|---|---|---|---|
| **7.1.1** | Tenaga: jenis + sumber | S1: joule definition, 9 forms as flip cards, **8 sources**, explicit form-vs-source card | **COVERED** | No |
| **7.1.2** | Cas elektrostatik | S2: electron transfer, protons do not move, gain→negative / lose→positive, like/unlike, electroscope + gold-leaf divergence | **COVERED** | No |
| **7.1.3** | Elektrostatik harian | S3: lightning, conductor, **dry weather/clothing, petrol refuelling, Faraday cage** | **COVERED** | No |
| **7.1.4** | Cas mengalir → arus | S4: rate-of-flow definition, **conventional + → − and electron − → +**, Van de Graaff + galvanometer | **COVERED** | No |
| **7.1.5** | I, V, R + units | S5: three cards with symbol/unit/instrument **and connection**; circuit meter diagram | **COVERED** | No |
| **7.1.6** | Hukum Ohm | S6: V = IR with rearrangements; calculator verified at three values | **COVERED** | No |
| **7.2.1** | Litar bersiri/selari | S7: all six formulas, schematic, comparator, advantages/disadvantages, household wiring | **COVERED** | No |
| **7.3.1** | Ciri magnet | S8: 4 properties, field definition, N→S / spacing / never-cross / neutral point, bar+horseshoe+magnadur | **COVERED** | **See N-01** |
| **7.3.2** | Elektromagnet | S9: grip rule (current→field), straight/loop/solenoid, pattern-vs-direction, distance separated | **COVERED** | No |
| **7.3.3** | Mandatory experiment + uses | S10: two-part investigation, apparatus diagram, applications split by magnet type | **COVERED** | No |

| Status | Count |
|---|---|
| **COVERED** | **10 / 10** |
| PARTIAL | 0 |
| MISSING | 0 |
| INCORRECT | 0 |
| NOT_RENDERED | 0 |
| CONFUSING | 0 |

SP 7.3.1's *content* is complete and correct; the blocker attached to it is a defect in one view of its **diagram** (N-01), not a coverage gap.

---

## 6. Former finding regression matrix

| ID | Former finding | Verified how | Result |
|---|---|---|---|
| **C-01** | Mandatory 7.3.3 investigation missing | Both parts present with aim, hypothesis, all three variables, apparatus, procedure, observation, conclusion — see §7 | **FIXED** |
| **H-01** | Ammeter series / voltmeter parallel absent | Taught on the quantity cards, in the diagram, in 2 checks and 2 quiz items per language; diagram topology measured | **FIXED** |
| **H-02** | Three electrostatic applications absent | `Faraday`, `petrol`, `cuaca kering/wap air` all present in both languages; tyre misconception explicitly rejected | **FIXED** |
| **H-03** | Field patterns absent; grip rule inverted | **0 inverted phrasings across all 8 surfaces**; straight/loop/solenoid all present; distance detached from the turns card | **FIXED** |
| **H-04** | Fire-alarm answer unresolved | Textbook answer key printed p. 281 located and matched verbatim — see §12 | **FIXED (SOURCE-RESOLVED)** |
| **M-01** | 3 sections / 10 SPs / 0 diagrams | 10 sections, 5 instructional schematics | **FIXED** |
| **M-02** | 9 learner-facing Experiment/Activity refs | **0 across all 8 surfaces** under a widened pattern including plurals | **FIXED** |
| **M-03** | Energy sources missing from notes | All 8 sources present in both languages, with the form-vs-source distinction | **FIXED** |
| **M-04** | Neutral point + magnet patterns absent | Neutral point taught and drawn; bar, horseshoe and magnadur all present | **FIXED** |
| **L-01** | No Chapter 7 tests | `chapter-7-remediation.test.tsx`, 86 tests; leakage suite extended | **FIXED** (see N-03 for a coverage gap) |
| **L-02** | No interactive affordance standard | 5 `InteractiveBadge` instances render per walk at every width | **FIXED** |
| **L-03** | Mind-map BM/DLP asymmetry | 195 / 195 nodes, all ids unique in both | **FIXED** |

**No former finding regressed.** The remediation also self-reported a tenth leak the original audit's singular-only pattern missed (*"Activities 7.7 & 7.8"*); that is confirmed fixed and the shared pattern now covers plurals.

---

## 7. Mandatory experiment gate — **PASS**

Verified against textbook pp. 161–162 in **both languages**.

| Element | Part A — Current | Part B — Turns |
|---|---|---|
| Aim | ✓ shared: factors affecting magnetic field strength | ✓ |
| Problem / question | ✓ | ✓ |
| Hypothesis | ✓ *"Semakin besar arus…, semakin tinggi kekuatan medan magnet"* | ✓ *"Semakin banyak bilangan lilitan…"* |
| Manipulated | **Arus** ✓ | **Bilangan lilitan gegelung** ✓ |
| Responding | **Bilangan jarum peniti yang ditarik** ✓ | same ✓ |
| Controlled | **10 lilitan** ✓ | **0.5 A** ✓ |
| Source range | **0.5, 1.0, 1.5, 2.0, 2.5 A** ✓ | **10, 20, 30, 40, 50** ✓ |
| Apparatus | ammeter, reostat, piring Petri, rod besi, dawai kuprum, jarum peniti, kaki retort ✓ | same ✓ |
| Procedure | 5 steps, source-faithful ✓ | 5 steps ✓ |
| Observation | ✓ qualitative | ✓ qualitative |
| Conclusion | ✓ | ✓ |

The two parts manipulate different variables and control the other, and share the same responding variable — verified programmatically. **No pin counts are fabricated**; the source publishes no dataset and the chapter stays qualitative.

This is a genuine investigation, not a restated conclusion. The former "more current = stronger magnet" fact cards have been replaced by the staged experiment.

---

## 8. Electricity gate — **PASS**

Taught in the **notes**, not hidden in quiz explanations:

| Quantity | Symbol | Unit | Instrument | Connection |
|---|---|---|---|---|
| Current | I | ampere (A) | ammeter | **in series** ✓ |
| Voltage | V | volt (V) | voltmeter | **in parallel** ✓ |
| Resistance | R | ohm (Ω) | fixed resistor / rheostat | — ✓ |

Current is defined as the rate of flow of charge; voltage as potential difference between two points — both matching the textbook (printed p. 149). Conventional current (+ → −) and electron movement (− → +) are given as an explicitly opposed pair.

---

## 9. Meter-placement gate — **PASS**

Measured from the rendered SVG in **both languages**, identical results:

```
Ammeter  circle at (212, 34)  — on the TOP wire = inside the main loop
Bulb     circle at (173, 138) — on the BOTTOM wire
Voltmeter circle at (173, 186) — on the branch below
Junction dots at (150, 138) and (196, 138) — exactly the bulb's two nodes
Symbols drawn: "A" and "V"
```

- **Ammeter is genuinely in series** — the top wire is drawn in three segments with the ammeter circle interrupting it. There is no bypass path around it.
- **Voltmeter is genuinely in parallel** — its branch leaves the loop at the node before the bulb and rejoins at the node after, with both junctions marked. `branchTapsBulbNodes` verified true.
- Rule caption renders correctly: *"Ammeter — disambung BERSIRI · Voltmeter — disambung SELARI"* / *"…IN SERIES · …IN PARALLEL"*.
- All five labels map to the correct explanation in both languages.

No impossible connection, no decorative non-conducting wire, no voltmeter in series.

---

## 10. Ohm's Law gate — **PASS on physics, MEDIUM on an edge case**

`V = IR` stated with rearrangements `I = V ÷ R` and `R = V ÷ I`; units V / A / Ω correct; the constant-temperature proviso is carried.

Calculator driven at three values:

| V | I | Expected | Shown |
|---|---|---|---|
| 12 | 0.025 | 480 Ω | **480.00 Ω** ✓ |
| 6 | 2 | 3 Ω | **3.00 Ω** ✓ |
| 0 | 5 | 0 Ω | **0.00 Ω** ✓ |

**Edge case:** entering I = 0 renders **"Infinity"** to the learner. See **N-02** — this is a pre-existing component defect, not introduced by the remediation, but Chapter 7 is its only consumer.

---

## 11. Series/parallel gate — **PASS**

All six formulas render correctly in both languages:

| | Series | Parallel |
|---|---|---|
| Current | `I = I₁ = I₂` ✓ | `I = I₁ + I₂` ✓ |
| Voltage | `V = V₁ + V₂` ✓ | `V = V₁ = V₂` ✓ |
| Resistance | `R = R₁ + R₂` ✓ | `1/R = 1/R₁ + 1/R₂` ✓ |

Schematic draws series as one closed loop with both bulbs on it, and parallel as two branches between two explicitly-dotted junctions — the distinction is structural, not merely labelled. Advantages and disadvantages match Jadual 7.2 / 7.3. Household wiring correctly attributed to parallel.

**Resistance comparator verified numerically at three settings:**

| R₁, R₂ | Series expected | Shown | Parallel expected | Shown |
|---|---|---|---|---|
| 4, 4 | 8 Ω | **8.00** ✓ | 2 Ω | **2.00** ✓ |
| 3, 6 | 9 Ω | **9.00** ✓ | 2 Ω | **2.00** ✓ |
| 10, 15 | 25 Ω | **25.00** ✓ | 6 Ω | **6.00** ✓ |

No unsupported shortcut such as "parallel always draws less current" appears.

---

## 12. Electrostatics gate — **PASS**

All required teaching present in both languages: electron transfer with protons stationary, gain → negative, loss → positive, equal → neutral, like repel, unlike attract, electroscope with gold-leaf divergence proportional to charge.

Daily applications now complete: lightning, lightning conductor, **dry weather / clothing**, **petrol refuelling**, **Faraday cage**.

**The tyre misconception is explicitly rejected**, in both languages:
> *"Perlindungan itu datang daripada badan logam yang mengalirkan cas di sekelilingnya — bukan daripada tayar getah."*
> *"The protection comes from the metal body conducting charge around you — not from the rubber tyres."*

### H-04 — **SOURCE-RESOLVED**

The remediation located the textbook's answer section, which the original audit did not have. **Printed p. 281, Bab 7 Latihan Sumatif 7 Q5:**

> *"5. **Litar selari.** Supaya penggera boleh dihidupkan oleh suis pengesan haba dari lokasi yang berlainan dalam satu bangunan."*

AcadeMY's live answer, BM: *"Litar selari — supaya penggera boleh dihidupkan oleh suis pengesan haba dari lokasi yang berlainan dalam bangunan itu, dan satu pengesan yang rosak tidak melumpuhkan keseluruhan sistem."* — matches the key. DLP is the semantic equivalent.

The former series assertion is **gone from both languages** (0 occurrences). No invented engineering justification was substituted. This is resolution against source, not reframing.

---

## 13. Magnetism gate — **PASS on content**

Four magnet properties all present; no overgeneralisation such as "all metals are magnetic" — the wording is *"Menarik bahan magnet: besi, keluli, kobalt dan nikel"*.

Field content correct in the data: definition, N→S outside the magnet, closer lines = stronger field, lines never cross, neutral point defined as the point between two like poles with no magnetic field.

Bar, horseshoe and magnadur are all covered, as DSKP 7.3.1 requires.

**The diagram, however, does not match this content in one view — see §15 and N-01.**

---

## 14. Right-hand grip rule gate — **PASS**

Scanned every surface for the inverted phrasing:

| Surface | Mentions | Inverted |
|---|---|---|
| interactive-bm / -dlp | 8 / 8 | **0 / 0** |
| quizzes-bm / -dlp | 3 / 2 | **0 / 0** |
| flashcards-bm / -dlp | 3 / 3 | **0 / 0** |
| mindmap-bm / -dlp | 4 / 3 | **0 / 0** |

The rule renders as ordered steps with current as the input:
> 1. Tuding ibu jari tangan KANAN mengikut arah arus konvensional.
> 2. Jari-jari yang melengkung menunjukkan arah medan magnet.

This matches Rajah 7.19 (thumb = *Arah arus*, fingers = *Arah medan magnet*) and now agrees with the mini-quiz, quiz q19, the flashcards and the mind map. **Zero contradictions.**

---

## 15. Magnetic field visual gate — **FAIL**

Four views were inspected by reading pole-rect fills, pole labels and arrowhead transforms directly from the rendered SVG.

| View | Poles | Arrows | Verdict |
|---|---|---|---|
| **Bar magnet** | N red x=124–160 (left), S blue x=160–196 (right) | top `rotate(0)` ×2, **bottom `rotate(180)` ×2** | **INCORRECT — see N-01** |
| Horseshoe | U at x=118, S at x=201 | 3 × `rotate(0)` crossing the gap left→right, i.e. N→S | ✓ correct |
| Magnadur | U at y=52 (top), S at y=124 (bottom) | 5 × `rotate(90)` pointing downward, i.e. N→S | ✓ correct |
| Like poles | Inner poles both S (x=94 and x=226) | no arrowheads; neutral cross drawn at (160, 75) | ✓ correct |

**Neutral point placement is sound:** both inner poles are S (verified from the label positions), the cross sits on the axis midway between the facing pole faces, and the label wording is Form 2-level and does not claim "no field exists anywhere between the magnets". It is correctly *not* shown between unlike poles.

**No invented field geometry** was found — horseshoe and magnadur patterns are the standard source-aligned representations.

---

## 16. Experiment visual gate — **PASS**

The apparatus schematic draws a single series loop: DC supply → switch → ammeter → rheostat → coil-on-iron-rod → back to supply, with the Petri dish beneath and a retort stand holding the rod.

Checked against the gate's failure list:
- **Ammeter present, voltmeter absent** ✓ — correct, the source circuit uses only an ammeter. Verified: `hasAmmeterSymbol: true`, `hasVoltmeterSymbol: false`.
- **Rheostat is in the loop, not bypassed** ✓ — it sits on the top wire between the ammeter and the right-hand corner.
- **Switch drawn closed-ish on the loop**, not an open circuit presented as operating ✓.
- No impossible connection; no misleading current path.
- All **8 parts** are clickable and each returns its own correct explanation.

---

## 17. Quiz gate — **PASS**

| Check | BM | DLP |
|---|---|---|
| Items | **30** | **30** |
| Out-of-range `answerIndex` | **0** | **0** |
| Duplicate option sets | **0** | **0** |
| Duplicate ids | **0** | **0** |
| Difficulty | Easy 10 / Medium 10 / Hard 10 | identical |
| Activity-number leakage | **0** | **0** |

Newly assessed high-value concepts confirmed present in both languages: ammeter-in-series, voltmeter-in-parallel, Faraday cage, neutral point, right-hand grip rule, and experiment variables (controlled vs responding).

Electromagnet strength factors are assessed by the surviving item testing **both** factors together, which the gate explicitly permits — *"Do NOT require every concept to have its own question if total balance is still pedagogically sound."*

Previously correct keys were preserved: current-vs-electron direction, the grip-rule function item, 480 Ω, 1.5 A, 6 A. Five lower-value items were **replaced, not added to**, keeping 30.

---

## 18. Flashcard gate — **PASS**

**74 per language, exact parity.** Fourteen added covering meter connections, Faraday cage, dry-weather charge build-up, refuelling, neutral point, grip rule, straight-wire pattern, reverse-current effect, the experiment's responding variable, both hypotheses, the eight energy sources and form-vs-source.

Scientifically correct throughout; no duplication explosion; **0 leakage**; no contradiction with the notes or quizzes.

---

## 19. Mind-map gate — **PASS**

**195 nodes per language, all ids unique, exact parity.**

The remediation's own flagged risk was the re-insertion after an earlier misplacement. Diffed against the pre-remediation commit: **9 changed lines per file — 6 node additions and 3 de-referencing relabels. No pre-existing node was removed, renamed or given a different id.**

Placement verified by reading neighbouring labels:
- `c1-4-humid`, `c1-4-petrol`, `c1-4-faraday` → directly after the lightning-conductor node, inside the electrostatics branch ✓
- `c1-meter-a` → after *"Diukur menggunakan ammeter (unit SI: ampere, A)"* ✓
- `c1-meter-v` → after *"Diukur dalam volt (V) menggunakan voltmeter"* ✓
- `c3-3-neutral` → after *"Kawasan sekeliling magnet yang mempunyai daya magnet"*, inside the magnetic-field branch ✓

Hierarchy covers energy forms and sources, electrostatics and applications, I/V/R with instruments and connections, Ohm's Law, series/parallel formulas, magnet properties, neutral point, field patterns, electromagnet, grip rule, strength factors and applications. **Zero activity/experiment numbering.**

---

## 20. Interaction gate — **PASS**

- **64 interactive controls per language; 0 inert** across the full ten-section walk in both.
- **5 `InteractiveBadge` instances** render per walk, at every width tested — "✨ INTERAKTIF / Tekan konsep untuk meneroka" and the English equivalent.
- Concept buttons use the shared `conceptButtonClass`: `min-h-11` (44 px), 2 px border, hover lift, `focus-visible` ring with offset, and an unmistakable selected state. **0 tap targets under 40 px** at any width.
- No hover-only interaction — every control responds to click and is keyboard-focusable.
- Pattern-vs-direction toggle verified functionally: reversing the current flips the arrowheads (`rotate(90)` → `rotate(270)`) while the field circles stay identical — exactly the source point it teaches.

---

## 21. BM / DLP parity — **PASS**

| Dimension | BM | DLP |
|---|---|---|
| Sections | 10 | 10 (same order, same `number` sequence) |
| Interactive controls | 64, 0 inert | 64, 0 inert |
| Quizzes | 30 | 30 |
| Flashcards | 74 | 74 |
| Mind-map nodes | 195 (ids unique) | 195 (ids unique) |
| Formulas, units, values | identical | identical |
| Experiment structure, hypotheses, variables, ranges | identical | identical |
| Meter diagram geometry | identical coordinates | identical coordinates |

Terminology is semantically equivalent throughout. **The N-01 arrow defect is present in both languages equally**, so it is a content defect rather than a parity break.

---

## 22. Learner-facing leakage — **0**

Scanned all 8 live surfaces against a widened pattern covering `Eksperimen | Aktiviti | Experiment(s) | Activity/Activities | Rajah | Figure | Jadual | Table` with numbers, plus DSKP, SK/SP codes, Standard Pembelajaran/Kandungan, Jadual 9, "according to textbook", buku teks, audit, binding, mandatory, source-supported, reviewer, remediation.

| Surface | Result |
|---|---|
| interactive-bm / -dlp | **CLEAN** |
| quizzes-bm / -dlp | **CLEAN** |
| flashcards-bm / -dlp | **CLEAN** |
| mindmap-bm / -dlp | **CLEAN** |
| **Total** | **0** |

The `"sel sering"` errata typo is not reproduced (0 occurrences). SK-level numbers (`Semak diri — 7.1`) come from the shared shell and are identical across Chapters 1–6, which are release-gated.

---

## 23. Mobile / browser QA — **PASS**

| Width | Page overflow | Max SVG | SVG clipped outside a scroll rail | Tap targets < 40 px | Badges | Back/Next |
|---|---|---|---|---|---|---|
| Desktop | **0 px** | 560 px | **0** | **0** | 5 | 9 transitions ✓ |
| 430 px | **0 px** | 358 px | **0** | **0** | 5 | ✓ |
| 390 px | **0 px** | 318 px | **0** | **0** | 5 | ✓ |
| 375 px | **0 px** | 303 px | **0** | **0** | 5 | ✓ |

No horizontal page scroll at any width. Circuit wires are not clipped — every schematic sits inside an `overflow-x: auto` container and scales below its `max-w`. No giant full-screen diagram. Back/Next unaffected.

---

## 24. Tests

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| `npm run build` | **PASS** (exit 0) |
| Chapter 7 remediation tests | **PASS** — 86/86 |
| Leakage suite (Ch1–7) | **PASS** — 56/56 |
| Science F2 suites | **PASS** — 455/455 (8 files) |
| Full `vitest run` | 1952 passed, **8 failed** |
| **Chapter 7-attributable failures** | **0** |

The Chapter 7 suite genuinely guards source-required content, meter connections, the grip rule (positively and negatively), experiment structure with source ranges, formulas, parity, leakage including plurals, and mind-map id uniqueness.

**Pre-existing failures, unrelated to Chapter 7 — reported, not hidden.** Unchanged from the audit baseline:

1. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
2. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
3. `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
4. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
5. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
6. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
7. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
8. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

None touches Science Form 2 content. `npm run lint` fails repo-wide on CRLF-vs-LF; pre-existing.

---

## 25. New defects

**N-01 · CRITICAL · Bar-magnet field lines below the magnet point the wrong way**

- **Location:** `src/components/notes/blocks/MagnetFieldDiagram.tsx`, the `barArcs` array — the two entries with `deg: 180`.
- **Measured from the rendered SVG:**
  - N pole = red rect, x = 124–160 (**left half**); S pole = blue rect, x = 160–196 (**right half**).
  - Four arcs, all drawn `M196,y … 124,y`.
  - Arrowheads: `translate(160 30) rotate(0)` and `translate(160 14) rotate(0)` — point **+x, N→S** ✓
  - Arrowheads: `translate(160 120) rotate(180)` and `translate(160 136) rotate(180)` — point **−x, S→N** ✗
- **Why this is wrong:** outside a bar magnet every field line runs from N to S. Both the over-the-top loop and the under-the-bottom loop leave the N end (left) and enter the S end (right), so at the midpoint x = 160 both should travel in the **+x** direction. The bottom two arrows are reversed.
- **It contradicts the same diagram's own text.** Selecting the "Arah" property renders: *"Di luar magnet, garisan medan magnet mengarah dari kutub utara ke kutub selatan."* / *"Outside the magnet, magnetic field lines run from the north pole to the south pole."* The picture disagrees with the caption a learner reads beside it.
- **It contradicts the source.** Textbook Rajah 7.16: *"Garisan medan magnet mengarah dari kutub utara ke kutub selatan magnet."*
- **Present identically in both languages** (the component is shared), and the bar magnet is the **default view** — it is what every learner sees first on that block.
- **Scope of fix:** change `deg: 180` to `deg: 0` on the two bottom arcs. The horseshoe, magnadur and like-poles views are correct and need no change.
- **Severity:** CRITICAL under this gate's own model — *"wrong magnetic field direction"* is listed as CRITICAL, and *"A visual error overrides correct prose."*

**N-02 · MEDIUM · Ohm's Law calculator shows "Infinity" when current is zero**

- **Location:** `src/components/notes/blocks/OhmsLawCalculator.tsx`.
- Entering V = 12, I = 0 renders **"Infinity"** as the resistance. No `isFinite` or zero guard exists in the component.
- **Pre-existing, not introduced by the remediation** — git shows 0 modifications to this file, and it dates from commit `d003a639`. But `"ohms-law"` is used **only by Chapter 7**, so Chapter 7 is its sole consumer and the gate criterion *"No division-by-zero or NaN learner-facing failure"* applies here.
- Requires deliberate input to reach; the physics for all valid inputs is correct.

**N-03 · LOW · The Chapter 7 test suite has no arrow-direction guard**

- `chapter-7-remediation.test.tsx` contains **0 assertions** referencing `rotate`, arrows or direction degrees. That is precisely why N-01 passed 86/86.
- The suite asserts the *prose* claim (`direction` note says N→S) but never the *drawing*. A guard reading the `barArcs` rotations — or asserting all four are equal — would have caught it.

No other new defect was found. Specifically checked and clear: no duplicated teaching, no broken rendering, no bad SVG connection, no label overlap, no wrong interaction state, no inaccessible button, no duplicate id (mind map 195/195 unique), no dead hotspot, no bad formula, no new leakage, no BM/DLP mismatch, no contradictory explanation, no quiz regression.

---

## 26. Limitations

1. **The DLP/English textbook was not supplied.** English strings were validated by translation equivalence against the BM textbook.
2. **`Errata.pdf` is self-disclaimed** as a mirrored, non-official record. Its single Bab 7 item was cross-checked against the textbook and holds, but no item here is *errata-verified*.
3. **Screenshots were unavailable** — the Browser pane was not compositing. All visual claims rest on measured SVG attributes (pole-rect fills and x-positions, arrowhead `translate`/`rotate` transforms, circle centres, junction-dot coordinates), which is stronger evidence for direction and topology than a screenshot, but does not substitute for a human eyeballing the rendered figures once.
4. **Outside science was used once**, in N-01, to state that field lines run N→S outside a magnet. This is also stated by the source and by AcadeMY's own caption, so the finding does not depend on it.
5. **Quiz distractor quality was spot-checked, not exhaustively modelled** — all 60 keys were verified in range and correct, but not every distractor was traced to a misconception.

---

## 27. Freeze decision

Freeze is **withheld** on a single, precisely-located defect. Everything the remediation set out to fix is genuinely fixed and independently verified; the blocker is a new one it introduced in a diagram it also authored, and which its own test suite had no assertion to catch.

Once N-01 is corrected — two `deg` values — and a guard is added per N-03, Chapter 7 should return to this gate and is expected to pass. N-02 is a pre-existing shared-component issue that a curriculum lead may reasonably choose to accept or schedule separately.

---

```
CHAPTER 7 FINAL VERDICT:
FAIL — HUMAN REVIEW REQUIRED

FORMER CRITICAL OPEN: 0
FORMER HIGH OPEN:     0
NEW CRITICAL:         1   (N-01 bar-magnet field arrows below the magnet reversed,
                           contradicting the source and the diagram's own caption)
NEW HIGH:             0
NEW MEDIUM:           1   (N-02 Ohm calculator renders "Infinity" at I = 0;
                           pre-existing component, Chapter 7 its only consumer)
NEW LOW:              1   (N-03 Chapter 7 suite has no arrow-direction assertion)

SP COVERAGE:
  COVERED:      10 / 10
  PARTIAL:       0
  MISSING:       0
  INCORRECT:     0
  NOT_RENDERED:  0
  CONFUSING:     0

MANDATORY EXPERIMENT 7.3.3:   PASS
AMMETER IN SERIES:            PASS
VOLTMETER IN PARALLEL:        PASS
OHM'S LAW:                    PASS   (physics correct; see N-02 on the I = 0 edge case)
SERIES/PARALLEL CIRCUITS:     PASS
ELECTROSTATICS APPLICATIONS:  PASS
FIRE-ALARM H-04:              SOURCE-RESOLVED
MAGNETIC FIELD:               FAIL   (N-01)
RIGHT-HAND GRIP RULE:         PASS
ELECTROMAGNET FIELD PATTERNS: PASS
EXPERIMENT APPARATUS VISUAL:  PASS
QUIZ ANSWER KEYS:             PASS
INTERACTIONS:                 PASS
BM/DLP PARITY:                PASS
LEARNER-FACING LEAKAGE:       0
MOBILE QA:                    PASS
TYPECHECK:                    PASS
BUILD:                        PASS
CHAPTER 7 TESTS:              PASS   (86/86 — but see N-03)
SCIENCE F2 TESTS:             PASS   (455/455)

ACADEMY CONTENT MODIFIED:     NO
RELEASE GATE ONLY:            YES
```
