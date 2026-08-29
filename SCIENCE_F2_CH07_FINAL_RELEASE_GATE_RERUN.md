# Science Form 2 — Chapter 7 (Keelektrikan dan Kemagnetan / Electricity and Magnetism)
# FINAL INDEPENDENT RELEASE GATE — RERUN

**Mode:** READ-ONLY. No project file was modified, created, deleted, or formatted.
This report is the only file written.

**Read-only proof.** MD5 hashes of all 16 Chapter 7 source and component files were
captured before the gate and re-verified after it: **0 changed**.

**Method.** Nothing in the audit, remediation changelog, or post-gate changelog was
taken as evidence. Every claim below was re-derived from one of:
the live registry-mounted chapter rendered in a browser, geometry measured in screen
coordinates via `getScreenCTM()`, the module graph loaded from the dev server, or the
authoritative PDFs. Where a probe disagreed with the product, the probe was
re-examined before the product was blamed — several apparent failures were my own
regex or click-sequence artefacts and are documented as such.

---

## 1. LIVE PATH

Re-traced end to end, not assumed.

| Step | Evidence |
|---|---|
| Registry | `registry.ts:3536` `science-f2-c7-bm`, `:3550` `science-f2-c7-dlp` |
| Data | both carry `sciF2InteractiveData` (chapter `7`, 10 sections) |
| Route branch | `notes.tsx:1999` `activeChapter?.sciF2InteractiveData ?` → `:2055` `chapter === 7` |
| Component | `:2056` `ScienceF2Chapter7NotesBlock` |
| Language prop | `:2059` `lang={scienceLang === "dlp" ? "en" : "bm"}` — **DLP receives `"en"`** |
| Shared block | `ScienceF2Chapter7NotesBlock.tsx:1` re-exports `ScienceF2InteractiveNotesBlock` |

**Dead legacy notes remain non-rendered.** Both entries still register `notes:`
(`scienceF2C7NotesBM` / `DLP`), but that branch sits at `notes.tsx:2141`, inside the
same `? :` chain *after* `:1999`. The interactive branch matches first, so `notes-bm.ts`
/ `notes-dlp.ts` never render. Both files show **0 modifications** in git status —
they were neither revived nor deleted. **No credit is given to them anywhere in this gate.**

The chapter was mounted for verification by reading the entry out of the real
`chapters` registry array and passing `entry.sciF2InteractiveData` with the route's own
`lang` mapping — not by hand-constructing props.

---

## 2. SECTION ARCHITECTURE

Rendered walk of both streams: 10 sections, one active at a time, numbered nav,
**Back** disabled on section 1, **Next section** present on every section.
Total rendered text 26,795 chars (BM) / 25,706 (DLP) across the ten — **no content wall**.

| # | BM | DLP |
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

Same count, same order, same semantics. Per-section control counts are **identical**
across streams — `[10, 1, 7, 2, 7, 1, 4, 14, 6, 36]` — as are per-section SVG counts.
No duplicated teaching was found across sections.

---

## 3. ALL 10 STANDARD PEMBELAJARAN

The SP list was re-extracted from `audit-sources/Science/Form-2/DSKP.pdf`
(pages 80–82, printed pp. 69–71), not taken from the audit report. Bab 7.0 carries
exactly ten SPs. Each was checked against the rendered learner output of both streams.

| SP | Requirement (DSKP) | Status | Evidence in the live chapter |
|---|---|---|---|
| 7.1.1 | Menghuraikan dan berkomunikasi mengenai tenaga | **COVERED** | §1 — 9 energy forms as flip controls, 8 energy sources, explicit *form vs source* contrast |
| 7.1.2 | Kewujudan cas elektrostatik | **COVERED** | §2 — electron transfer ("hanya elektron berpindah — proton tidak bergerak"), like/unlike charges, electroscope with gold-leaf divergence ∝ quantity of charge |
| 7.1.3 | Elektrostatik dalam kehidupan seharian | **COVERED** | §3 — lightning, lightning conductor, Faraday cage, petrol refuelling, low-humidity fabric choice |
| 7.1.4 | Cas yang mengalir menghasilkan arus | **COVERED** | §4 — charge flow → current, Van de Graaff / galvanometer |
| 7.1.5 | Mencirikan arus, voltan, rintangan + unit | **COVERED** | §5 — A / V / Ω, ammeter and voltmeter with connection rules and a measured circuit diagram |
| 7.1.6 | Perkaitan arus–voltan–rintangan | **COVERED** | §6 — Ohm's Law stated with the constant-temperature proviso, `V = IR`, live calculator |
| 7.2.1 | Litar bersiri dan litar selari | **COVERED** | §7 — both schematics, all six formulas, advantages/disadvantages, household wiring |
| 7.3.1 | Merumuskan ciri magnet | **COVERED** | §8 — 4 properties, field definition, bar / horseshoe / magnadur patterns, compass |
| 7.3.2 | Elektromagnet | **COVERED** | §9 — straight / loop / solenoid patterns and directions, grip rule, spacing ↔ strength, field strength vs distance |
| 7.3.3 | Eksperimen + kegunaan magnet/elektromagnet | **COVERED** | §10 — full two-part investigation, uses incl. electric bell and compass |

```
COVERED 10 | PARTIAL 0 | MISSING 0 | INCORRECT 0 | NOT_RENDERED 0 | CONFUSING 0
```

**Two DSKP *Catatan* activity methods are not reproduced** — the iron-filings activity
(7.3.1) and the polythene/acetate/glass/balloon rod set (7.1.2). Under the DSKP
authority rule (printed p.39) these sit in *Cadangan aktiviti PdP*, which is
non-binding, and the binding scope they support is covered by other means (field-pattern
diagrams and the compass for 7.3.1; charging-by-rubbing and the electroscope for 7.1.2).
Neither is an SP gap. Iron filings is recorded below as a LOW observation.

---

## 4. FORMER FINDINGS

| ID | Finding | Verdict | Independent evidence |
|---|---|---|---|
| C-01 | Mandatory experiment missing | **FIXED** | Both parts render with all 10 required fields (§25 below) |
| H-01 | Meter connection rules missing | **FIXED** | Measured circuit (§15), plus quiz, flashcard and 2 mind-map nodes |
| H-02 | Electrostatic applications missing | **FIXED** | Faraday cage, petrol, humidity/fabric, lightning conductor all render |
| H-03 | Field patterns + grip rule | **FIXED** | 3 conductor patterns render; **0 inverted grip-rule phrasings** on 8 surfaces |
| H-04 | Fire-alarm question | **SOURCE-RESOLVED** | Matches Textbook PDF p.288 (§18 below) |
| M-01 | Compressed structure / no visuals | **FIXED** | 10 sections, one at a time, 5 interactive SVG figures |
| M-02 | Experiment/Activity leakage | **FIXED** | 0 leaks over 372K/353K chars (§30) |
| M-03 | Energy sources missing | **FIXED** | 8 sources + 9 forms + form-vs-source contrast |
| M-04 | Neutral point / magnet patterns missing | **FIXED** | Like-poles view with X; all three magnet types |
| L-01 | No Chapter 7 tests | **FIXED** | 116 tests, including rendered-output guards |
| L-02 | Weak interaction affordance | **FIXED** | "INTERAKTIF / INTERACTIVE" badge on every figure; 88 controls; 0 inert |
| L-03 | BM/DLP mind-map asymmetry | **FIXED** | 195/195 nodes, ids aligned, **0 deleted vs HEAD** |

**FORMER CRITICAL OPEN: 0 — FORMER HIGH OPEN: 0**

---

## 5. N-01 — BAR-MAGNET FIELD ARROWS

Measured on the **rendered** SVG inside the live chapter, in screen coordinates.
Source constants were read only to cross-check, never as the evidence.

| Measurement | BM | DLP |
|---|---|---|
| N pole rect (`#d4544a`) | x=124, screen cx **172.7** | x=124, screen cx **172.7** |
| S pole rect (`#4a7fd4`) | x=160, screen cx **205.3** | x=160, screen cx **205.3** |
| North left of south | ✔ | ✔ |
| Pole letters drawn | **U** / **S** | **N** / **S** |
| Arrowheads rendered | 4 | 4 |
| Arrow apex x / base x (all four) | **192.6 / 185.4** | **192.6 / 185.4** |
| All apex > base → all point N → S | ✔ | ✔ |
| **Reversed external arrows** | **0** | **0** |

Arrow transforms, with the magnet occupying y 64–86:

```
translate(160 14)  rotate(0)   upper arc   -> N -> S
translate(160 30)  rotate(0)   upper arc   -> N -> S
translate(160 120) rotate(0)   LOWER arc   -> N -> S
translate(160 136) rotate(0)   LOWER arc   -> N -> S
```

**TOP: N → S. BOTTOM: N → S.** The previously reversed lower pair now matches the upper
pair. Direction is derived in source from the pole centres
(`EXTERNAL_FIELD_DEG`, evaluated live as `0`), so no arc carries a hand-typed rotation.

**Caption agrees with the diagram**, verified by clicking the *Arah / Direction* control:

> BM — "Di luar magnet, garisan medan magnet mengarah dari kutub utara ke kutub selatan."
> DLP — "Outside the magnet, magnetic field lines run from the north pole to the south pole."

The default view text also reads "Garisan medan magnet melengkung keluar dari kutub utara
dan masuk semula ke kutub selatan" / "curve out of the north pole and back into the south
pole" — consistent with what is drawn.

**N-01: PASS.**

---

## 6. N-01 VISUAL REGRESSION GUARD

`chapter-7-remediation.test.tsx` contains guards that assert the **drawing**, not prose:

- `:507` parses `rotate(...)` values out of `renderToStaticMarkup` output
- `:758` `expect(deg % 360).not.toBe(180)` on those rendered rotations
- `:482` lower arcs must equal the upper arcs' heading — *"a lower arc regressed to the reversed direction"*
- `:463–473` per-arc heading derived from `BAR_MAGNET_POLES`, not compared to a literal `0`
- `:489` the arrowhead glyph's own apex must sit on +x, so flipping the path cannot silently reverse every arrow
- `:751–752` pole rect x-positions must not move

Because this pass is read-only, the guards were proven to bite **in memory**: the real
`BAR_FIELD_ARCS` was cloned, lower arcs set to `180`, and the guard logic re-executed
against the clone. No file was touched.

```
guard "points from N toward S"        real: pass   mutated: FAIL — points away from south pole
guard "lower arcs match upper arcs"   real: pass   one lower arc flipped: FAIL — lower arc regressed
```

The guard is anchored to rendered output and to the pole geometry, so it cannot be
satisfied by prose alone.

**VISUAL ARROW-DIRECTION GUARD: PASS.**

---

## 7. OTHER MAGNET VIEWS + SOLENOID

All measured in the live chapter, both streams, identical results.

| View | Poles (SVG coords) | Arrows | Direction | Verdict |
|---|---|---|---|---|
| Bar | N@124,64 · S@160,64 | 4 | all RIGHT | N → S ✔ |
| Horseshoe | N@110,116 · S@193,116 | 3 | all RIGHT | N → S across the gap ✔ |
| Magnadur | N@96,40 · S@96,112 | 5 | all DOWN | N → S (N slab above S slab) ✔ |
| Like poles | N@40 · S@76 · S@208 · N@244 | 0 by design | — | **inner poles both S**; neutral point X between them ✔ |
| Solenoid | labelled ends | 1 | RIGHT | poles swap correctly on current reversal ✔ |

Pole-rect coordinates are **byte-identical between BM and DLP** in every view, confirming
the localization changed letters only and moved no geometry.

**Pattern vs direction** (§23) verified by toggling the reverse-current control on each
conductor: arrowheads flip (`UD`→`DU`, `DDD`→`UUU`, `R`→`L`) while the field-line
element count is unchanged — reversing current changes the **direction**, not the
**pattern**. Matches the on-screen claim.

---

## 8. N-04 — POLE LOCALIZATION

Every pole-labelled Chapter 7 visual, both streams, read from the rendered DOM.

| View | BM letters | DLP letters |
|---|---|---|
| Bar magnet | `U` `S` | `N` `S` |
| Horseshoe | `U` `S` | `N` `S` |
| Magnadur | `U` `S` | `N` `S` |
| Like poles / neutral point | `U` `S` `S` `U` | `N` `S` `S` `N` |
| Solenoid (`CurrentFieldPatterns`) | `S` `U` | `S` `N` |

The like-poles view faces two **south** poles inward, so `S … S` is correct unchanged in
both languages; the outer poles are north and are correctly localized.

**Hardcoded `"U"` in Chapter 7 English learner-facing output: 0.** A sweep of every
notes block found the only remaining literal `"U"` in a source *comment*.
`BearingDiagram.tsx` also holds a literal `"U"` but is a compass bearing consumed solely
by `GeoChapter1NotesBlock` (Geography Form 1) — not a magnet pole, correctly out of scope.

Live copy table read from the module: BM `poleNorth: "U"`, DLP `poleNorth: "N"`,
`poleSouth: "S"` in both.

**N-04 BM: PASS. N-04 DLP: PASS.**

---

## 9. POLE ACCESSIBILITY

Every drawn pole letter carries `role="img"` with a localized `aria-label`:

| Stream | Accessible names emitted |
|---|---|
| BM | `Kutub utara`, `Kutub selatan` |
| DLP | `North pole`, `South pole` |

No DLP surface emits `U` or `Kutub …`; no BM surface emits `North pole` / `South pole`.
A screen reader never receives a bare letter. Figure-level `aria-label`s were already
localized from content data ("Magnet bar" / "Bar magnet") and are unchanged.

**POLE A11Y LOCALIZATION: PASS.**

---

## 10. N-04 REGRESSION GUARDS

Present and rendered-output-based:

- `:707` `expect(l.letter).not.toBe("U")` for **DLP**, across every view
- `:716` BM must not render `"N"`
- `:724 / :726` a11y cross-leak guards on `aria-label`
- per-view letter and pole-count assertions for bar, horseshoe, magnadur, like-poles and solenoid
- non-default views are forced to render by reordering `shapes` / `conductors`, so all five are genuinely exercised

Proven to bite in memory: with `poleNorth` for DLP set to `"U"`, the guard returns
`FAIL — DLP regressed to BM letter`. Real code passes.

---

## 11. N-02 — OHM CALCULATOR

Driven through the real React inputs in the live chapter, both streams — 13 states each.

| Input | BM | DLP |
|---|---|---|
| empty | Isikan mana-mana dua nilai | Fill in any two values |
| V=12, I=0.025 | **R = 480.00 Ω** | **R = 480.00 Ω** |
| V=6, R=3 | **I = 2.000 A** | **I = 2.000 A** |
| I=2, R=4 | **V = 8.00 V** | **V = 8.00 V** |
| V=12, **I=0** | Arus mesti lebih besar daripada 0 A untuk mengira rintangan. | Current must be greater than 0 A to calculate resistance. |
| V=12, **R=0** | Rintangan mesti lebih besar daripada 0 Ω untuk mengira arus. | Resistance must be greater than 0 Ω to calculate current. |
| V=12, **I=−0** | (same zero-current message — no `-Infinity`) | (same) |
| I=0, R=5 | **V = 0.00 V** | **V = 0.00 V** |
| I=3, R=0 | **V = 0.00 V** | **V = 0.00 V** |
| I=0, R=0 | **V = 0.00 V** | **V = 0.00 V** |
| V=1e400 | treated as not entered | treated as not entered |
| I=1e200 × R=1e200 | Nilai itu terlalu besar untuk dikira di sini. | Those values are too large to calculate here. |
| restore 12 / 0.025 | **R = 480.00 Ω** | **R = 480.00 Ω** |

`I = 2 A` displays as `I = 2.000 A`, matching the component's pre-existing 3-dp format
for current — formatting was preserved, not changed.

**Valid zero inputs are not banned** (§13): every `V = I × R` case with a zero operand
still computes `V = 0.00 V`. Only the two division branches guard their own denominator.

**Extreme inputs** (§14): non-finite parsed inputs are treated as not entered, and a
non-finite product is intercepted with a localized message rather than printed.

Scan of all 26 recorded learner-facing outputs for `Infinity` / `-Infinity` / `NaN` /
`undefined`: **0**.

**N-02: PASS. LEARNER-FACING Infinity/NaN: 0.**

---

## 12. METER PLACEMENT

Checked **electrically** by tracing the rendered SVG, not by reading labels.

```
top wire   34,34 → 96,34   [switch 96/130 + blade]   130,34 → 196,34
           [AMMETER circle cx=212 cy=34 r=15, spans x 197–227]   228,34 → 286,34
right      286,34 → 286,138
bottom     286,138 → 196,138   [BULB circle cx=173 cy=138 r=15 + X cross, spans 158–188]
           150,138 → 34,138
left       34,138 → 34,34      [battery plates y 72/82/92, "+" marked]
```

- **Ammeter** sits in the only loop, between the wire ending at x=196 and resuming at
  x=228. No path bypasses it, so it carries the same current as the bulb. **In series.**
- **Voltmeter** (cx=173, cy=186) is joined by two paths —
  `M150,138 L150,186 L157,186` and `M189,186 L196,186 L196,138` —
  tapping the junction dots at **(150,138)** and **(196,138)**. Those two dots bracket the
  bulb, which spans 158–188 on the same wire. The voltmeter is therefore connected
  across exactly the bulb's two terminals. **In parallel across the measured component.**

Geometry identical in both streams.

**AMMETER IN SERIES: PASS. VOLTMETER IN PARALLEL: PASS.**

---

## 13. OHM'S LAW, SERIES / PARALLEL

Ohm's Law as rendered: *"…arus elektrik yang mengalir melalui suatu konduktor adalah
berkadar terus dengan voltan yang merentasi dua hujung konduktor itu, dengan syarat suhu
dan keadaan fizik lain adalah tetap. Hubungan ini ditulis sebagai **V = IR**."*
Correct statement including the constant-conditions proviso. Units A / V / Ω used
consistently. No wrong rearrangement found on any surface.

| | Rendered |
|---|---|
| Series | `I = I₁ = I₂` · `V = V₁ + V₂` · `R = R₁ + R₂` |
| Parallel | `I = I₁ + I₂` · `V = V₁ = V₂` · `1/R = 1/R₁ + 1/R₂` |

*(An earlier reading of mine showed the parallel resistance rule as `R = 1/R₁ + 1/R₂`;
that was my own regex clipping the leading `1/`. The source and the rendered output both
carry `1/R = 1/R₁ + 1/R₂`.)*

Schematics: series SVG draws two lamps (r=9) at (60,26) and (114,26) on one loop;
parallel SVG draws two lamps at (70,20) and (70,80) on separate branches with junction
dots at (46,50) and (104,50). Topologically correct. Household wiring and
advantages/disadvantages both present.

**OHM'S LAW: PASS. SERIES/PARALLEL CIRCUITS: PASS.**

---

## 14. H-04 — FIRE ALARM

Verified directly against the authoritative source, not the changelog.

**Textbook.pdf, PDF page 288 — *Bab 7, Latihan Sumatif 7*, Q5:**

> "Litar selari. Supaya penggera boleh dihidupkan oleh suis pengesan haba dari lokasi
> yang berlainan dalam satu bangunan."

**AcadeMY, `interactive-bm.ts:325`:**

> "Litar selari — supaya penggera boleh dihidupkan oleh suis pengesan haba dari lokasi
> yang berlainan dalam bangunan itu, and one failed detector does not disable the rest."
> *(BM text matches the key near-verbatim; the added clause about a failed detector is a
> correct elaboration, not a contradiction.)*

DLP carries the semantically identical answer. The previously contested "series" answer
is gone from every surface.

**H-04: SOURCE-RESOLVED.**

---

## 15. ELECTROSTATICS, CURRENT vs ELECTRON FLOW

All present and correct in both streams:

- **Electron transfer** — *"Apabila dua bahan berbeza digosokkan, hanya elektron
  berpindah — proton tidak bergerak."* (only electrons move; protons do not) — precise
- Like charges repel / unlike attract, with the rubbed-comb example
- **Electroscope** — detects charge; gold leaf diverges because like charges repel;
  greater divergence = greater quantity of charge
- Lightning; **lightning conductor**; **Faraday cage** (metal-bodied vehicle safest in a
  thunderstorm, charge travels over the outer surface)
- Low-humidity clothing/fabric choice
- Petrol refuelling static-spark hazard

**Conventional current** (`+ → −`) and **electron movement** (`− → +`) are both stated and
distinguished. No arrow reversal found. No unsafe or misleading claim.

**ELECTROSTATICS: PASS.**

---

## 16. MAGNETISM

Section 8 renders four properties, matching the source:

1. Attracts magnetic materials — **iron, steel, cobalt and nickel**
2. Has poles — every magnet has a north and a south pole
3. Like poles repel; unlike poles attract
4. A freely suspended magnet points north–south

Magnetic field defined as *"the region around a magnet where its magnetic force can be
felt."* Field lines run N → S; **closer lines = stronger field**; **lines never cross**;
neutral point taught with the X marker between two like poles.

**No claim that all metals are magnetic** — the text names the four magnetic materials
specifically. Negative check across both streams: clean.

**MAGNETIC FIELD: PASS.**

---

## 17. RIGHT-HAND GRIP RULE

Swept across notes, diagram, interaction, mini quiz, full quiz, flashcards and mind map
in both languages. Every occurrence takes **current as the input** and **field as the
output**:

- Notes: *"Tuding ibu jari tangan KANAN mengikut arah arus konvensional"* / *"Point the thumb of your RIGHT hand in the direction of the conventional current."*
- Mini quiz hint: thumb → conventional current; curled fingers → magnetic field
- Flashcard f37: *"…jari-jari yang melengkung menunjukkan arah medan magnet."*
- Quiz q19: "Apakah fungsi petua tangan kanan?" → *"Menentukan arah medan magnet bagi aliran arus dalam wayar lurus"*
- Mind map `c3-4-4`, `c3-7-2`, `c3-8-3` — all current → field

**0 inverted phrasings.**

*(My first sweep reported the grip rule missing from the BM quiz and BM mind map. That
was a regex artefact — BM uses "petua tangan kanan" where I had searched for
"genggaman". Both surfaces carry it.)*

**RIGHT-HAND GRIP RULE: PASS.**

---

## 18. FIELD PATTERNS AND FIELD STRENGTH

Straight wire, loop and solenoid all render with their own pattern, current direction and
field direction, and a working reverse-current toggle. Direction is attributed to the
grip rule.

The three strength facts are taught **separately and correctly**:

- greater current → stronger electromagnet
- more coil turns → stronger electromagnet
- greater distance → weaker measured field, stated as its own card:
  *"Kekuatan medan magnet berkurang apabila menjauhi pusat konduktor. Ini berbeza
  daripada faktor yang mengubah kekuatan elektromagnet itu sendiri — **jarak mengubah
  kekuatan yang anda ukur, bukan kekuatan yang dihasilkan**."*

That last sentence explicitly prevents the §24 error of attaching the distance fact to
coil turns. The wire-pattern description also carries it — *"bulatan sepusat mengelilingi
dawai, semakin renggang semakin jauh dari dawai."*

*(My first pass flagged this as missing; my regex required the word "lemah"/"weak" and the
content uses "berkurang"/"decreases". The content is present and rendered.)*

**STRAIGHT WIRE / LOOP / SOLENOID: PASS.**

---

## 19. MANDATORY DSKP EXPERIMENT 7.3.3

Read from the rendered learner output with both tabs opened, in both streams.

| Field | Part A — Current | Part B — Coil turns |
|---|---|---|
| Aim (shared) | ✔ study factors affecting electromagnet field strength | ✔ |
| Question | ✔ Does the current affect field strength? | ✔ Do the coil turns affect field strength? |
| Hypothesis | ✔ greater current → higher strength | ✔ more turns → higher strength |
| Manipulated | **Current** | **Number of coil turns** |
| Responding | **Number of pins attracted** | **Number of pins attracted** |
| Controlled | **Number of coil turns (10 turns)** | **Current (0.5 A)** |
| Materials | pins, iron rod, copper wire | same |
| Apparatus | D.C. supply, switch, ammeter, rheostat, Petri dish, connecting wires, retort stand, clamp | same |
| Method | 5 steps, **0.5 / 1.0 / 1.5 / 2.0 / 2.5 A** | 5 steps, **10 / 20 / 30 / 40 / 50 turns** |
| Observation | qualitative — more current, more pins | qualitative — more turns, more pins |
| Conclusion | ✔ hypothesis accepted | ✔ hypothesis accepted |

All ten required elements present in both parts, both languages. Source ranges match.

**No fabricated pin-count dataset** — observations are stated as trends, with no invented
numeric table.

**MANDATORY EXPERIMENT 7.3.3: PASS.**

---

## 20. EXPERIMENT APPARATUS

Traced from the rendered SVG:

```
M30,40 L96,40           supply wire to switch
  [SWITCH 96/130 + blade]
M130,40 L166,40         to ammeter
  [AMMETER cx=186 r=14]
M206,40 L240,40         to rheostat
  [RHEOSTAT rect x=240 w=50 -> spans 240–290, with arrow]
M290,40 L290,120 L200,120
  [IRON ROD rect 120–200 wound with 5 coil ellipses]
M120,120 L30,120 L30,40 back to supply
  [DC SUPPLY plates y 72/82/92]   [PINS in Petri dish below rod]   [RETORT STAND]
```

- DC supply ✔ · switch ✔ · ammeter ✔ · rheostat ✔ · coil ✔ · iron rod ✔ · pins ✔ · retort stand ✔
- **Rheostat is not bypassed** — the wire terminates at x=240 and resumes at x=290, so
  current must pass through it
- **No voltmeter** — correct for this investigation
- Single closed series loop; electrically sensible; apparatus list matches the diagram

**EXPERIMENT APPARATUS: PASS.**

---

## 21. QUIZZES

Loaded the real modules and validated every item.

| | BM | DLP |
|---|---|---|
| Total | 30 | 30 |
| Easy / Medium / Hard | 10 / 10 / 10 | 10 / 10 / 10 |
| Options per question | 4 (all) | 4 (all) |
| **Out-of-range answer keys** | **0** | **0** |
| Duplicate ids | 0 | 0 |
| Duplicate option sets | 0 | 0 |
| Missing explanations | 0 | 0 |

Decks are 1:1 aligned (`q1…q30` paired), with **0 answer-index mismatches** and
**0 difficulty mismatches** across streams.

Formerly missing areas now assessed, keys spot-verified as correct:

| Area | Sample key |
|---|---|
| Meter connection | ammeter → "Secara bersiri dengan mentol" ✔ |
| Electrostatic application | metal-bodied car → charge travels around the outside ✔ |
| Faraday cage | assessed by concept (metal-car item) though not by name |
| Grip rule | "Menentukan arah medan magnet bagi aliran arus dalam wayar lurus" ✔ |
| Neutral point | two north poles → neutral point, fields oppose ✔ |
| Field patterns / strength | "Magnitud arus dan bilangan lilitan gegelung" ✔ |
| Experiment variables | turns = controlled, pins = responding ✔ |
| Ohm's Law | resistance unit → "Ohm (Ω)" ✔ |

**QUIZ ANSWER KEYS: PASS.** One quality observation is recorded as NEW MEDIUM below.

---

## 22. FLASHCARDS AND MIND MAP

**Flashcards** — 74 / 74, all 15 checked topic areas present in both streams, including
meter connection, Faraday cage, neutral point, grip rule and the experiment factors.
Leakage: none.

**Mind map** — 195 / 195 nodes, all ids unique, ids aligned across streams. All 15 topic
areas covered: energy forms, energy sources, electrostatics, current/voltage/resistance,
meter connections, Ohm's Law, series/parallel, magnetism, neutral point, field patterns,
electromagnet, grip rule, strength factors, applications, Faraday cage.

**No unrelated nodes were deleted.** Diff against `HEAD`:

```
mindmap-bm.ts   189 -> 195   deleted ids: 0   added: 6
mindmap-dlp.ts  189 -> 195   deleted ids: 0   added: 6
added (both):   c1-4-faraday  c1-4-humid  c1-4-petrol
                c1-meter-a    c1-meter-v  c3-3-neutral
```

This independently clears the risk the remediation changelog flagged.

---

## 23. LEARNER-FACING LEAKAGE

Every control on all 10 sections was clicked in both streams to expose collapsed and
click-revealed content, yielding **372,385 chars (BM)** and **352,996 chars (DLP)** of
learner-visible text. All 21 leakage patterns were run against it, plus separate scans of
the quiz, flashcard and mind-map decks.

```
DSKP · SK n · SP n · Jadual 9 · Eksperimen 7.x · Experiment 7.x · Aktiviti 7.x ·
Activity/Activities 7.x · Rajah 7.x · Figure 7.x · Jadual 7.x · Table 7.x ·
according to textbook · buku teks · audit · binding · mandatory · reviewer ·
remediation · standard pembelajaran · 7.n.n

BM: 0 hits    DLP: 0 hits    quizzes: 0    flashcards: 0    mind map: 0
```

**Adjudicated, not hidden:** the headings *"Semak diri — 7.1 / 7.2 / 7.3"* and
*"Check yourself — 7.1 / 7.2 / 7.3"* expose the bare numbers 7.1–7.3. These are **not**
curriculum metadata: the Textbook's own table of contents (PDF p.3) prints
**7.1 Keelektrikan, 7.2 Pengaliran Arus Elektrik dalam Litar Bersiri dan Selari,
7.3 Kemagnetan**. They are the learner's own subtopic numbers, visible in the printed
book, and they point a student back to the right pages. No three-part SP code (`7.n.n`)
appears anywhere.

**LEARNER-FACING LEAKAGE: 0.**

---

## 24. INTERACTIONS

88 controls per stream, walked and clicked individually.

A first sequential sweep flagged 12 as inert. Each was re-tested in isolation on a fresh
mount, and **all 12 were probe artefacts**:

| Count | Apparent cause | Verified reality |
|---|---|---|
| 3 | "Magnet bar", "Dawai lurus", "⚡Arus" | already `aria-pressed="true"` — clicking the selected option is a no-op **by design**; each responds when not already selected |
| 8 | mini-quiz options | the quiz **locks after the first answer**. On a fresh mount the first click changes the DOM and populates the live region with feedback |
| 1 | "Tandakan Bab 7 Selesai" | `onMarkRead` is a no-op stub in the verification harness, not in the product |

**0 genuinely inert controls. 0 dead hotspots.** Every figure carries the
"INTERAKTIF / INTERACTIVE" badge plus an instruction line, so the affordance is explicit.

**INTERACTIONS: PASS.**

---

## 25. BM / DLP PARITY

| Dimension | Result |
|---|---|
| Sections | 10 / 10, same order and semantics |
| Controls per section | identical — `[10,1,7,2,7,1,4,14,6,36]` |
| SVG figures per section | identical |
| Formulas, values, units | identical (`V = IR`, all six circuit rules, 480 Ω / 2 A / 8 V) |
| Experiment | identical structure, variables and source ranges |
| Diagram geometry | pole rects byte-identical in every view |
| Arrows | identical counts and directions |
| Quizzes | 30 / 30, ids paired, 0 answer-index or difficulty mismatches |
| Flashcards | 74 / 74 |
| Mind map | 195 / 195, ids aligned |

Pole letters differ by design — BM `U`/`S`, DLP `N`/`S` — which is correct localization
and is **not** counted as a parity failure, as specified.

**BM/DLP PARITY: PASS.**

---

## 26. MOBILE QA

Full 10-section walk of both streams with every control revealed, at four viewports.

| Width | Page overflow | Diagrams wider than container | Pole labels hidden | Bar arrows wrong | Buttons < 40 px | Back/Next |
|---|---|---|---|---|---|---|
| 1280 (desktop) | **0 px** | 0 | 0 | 0 / 4 | 0 | ✔ every section |
| 430 | **0 px** | 0 | 0 | 0 / 4 | 0 | ✔ |
| 390 | **0 px** | 0 | 0 | 0 / 4 | 0 | ✔ |
| 375 | **0 px** | 2 (see below) | 0 | 0 / 4 | 0 | ✔ |

Pole letters remained visible and correctly localized at every width (`U`/`S` on BM,
`N`/`S` on DLP), and every bar-magnet arrowhead still pointed N → S.

At 375 px two figures exceed their container and **scroll inside their own
`overflow-x-auto` wrapper** rather than clipping or pushing the page:

```
meter circuit   svg 300px in a 287px container   scrollWidth 300 / clientWidth 287  (13px)
bar magnet      svg 290px in a 287px container   scrollWidth 290 / clientWidth 287  ( 3px)
```

`overflow-x: auto`, container scrollable, **page overflow 0 px**. This is the intended
responsive pattern for wide content, not clipping — the content stays reachable. Recorded
as a LOW observation.

**MOBILE QA: PASS.**

---

## 27. NEW DEFECT SWEEP

Targeted at side effects of the N-01, N-02 and N-04 fixes.

| Risk | Result |
|---|---|
| Geometry changed unexpectedly | none — pole rects identical across streams and to their documented positions |
| Pole orientation changed | none — N left / S right on bar; like-poles still S…S inward |
| Arrow direction regressed | none — 0 reversed at every width, both streams |
| DLP `U` leak | 0 |
| BM `N` leak | 0 |
| Broken screen-reader text | none — `role="img"` + localized `aria-label` on every pole |
| Shared `PoleLabel` side effects | consumed by exactly 3 files (definition + 2 Ch7 consumers); no other chapter touched; Science F2 485/485 |
| `figureCopy` added fields | additive only; 7 consumers; typecheck clean |
| Calculator finite-value regression | none — 1e400 and overflow both intercepted |
| Zero-input regression | none — `V = I × R` still accepts zero operands |
| Stale component import | none in the built output; typecheck and build both clean |
| Broken SVG rendering | none — all 5 figures render in both streams |
| Mobile clipping | none — page overflow 0 px at all four widths |

```
NEW CRITICAL: 0
NEW HIGH:     0
NEW MEDIUM:   1
NEW LOW:      2
```

### NEW MEDIUM — M-N1 · quiz answer-key positional skew (pre-existing, non-blocking)

Answer positions are heavily concentrated on option A, and option D is never correct:

```
answerIndex histogram (both streams):  0 -> 22    1 -> 6    2 -> 2    3 -> 0
```

A learner who always picks A scores 73%. Every key is *correct*, so this is an assessment
quality issue rather than a content error, and it does not misteach anything.

**Pre-existing and not caused by any of the three fixes** — at `HEAD` the distribution was
`0→26, 1→2, 2→2, 3→0`; the remediation moved four answers off position A and slightly
improved it. Non-blocking; recommended for a future assessment-balance pass.

### NEW LOW — L-N1 · iron-filings activity not represented

DSKP 7.3.1 *Catatan* suggests studying a bar magnet's field with iron filings
("serbuk besi"). The phrase appears nowhere in Chapter 7. It sits in *Cadangan aktiviti
PdP* (non-binding), the compass method **is** present, and the field patterns are taught
with dedicated diagrams — so the binding SP is met. Worth considering if a lab-method
surface is ever added.

### NEW LOW — L-N2 · two diagrams scroll inside their container at 375 px

13 px and 3 px of in-container horizontal scroll at the narrowest supported width, with
page overflow 0 px. Correct responsive pattern; cosmetic only.

---

## 28. VALIDATION

```
TYPECHECK                 PASS   tsc --noEmit, exit 0
BUILD                     PASS   npm run build, exit 0 (nitro + Cloudflare Pages worker)
CHAPTER 7 TESTS           PASS   116 / 116
SCIENCE F2 TESTS          PASS   485 / 485
LEARNER-FACING LEAKAGE    PASS    56 / 56, 0 leaks
FULL SUITE                1982 passed | 8 failed (191 files)
```

The 8 full-suite failures are **pre-existing and unrelated**, unchanged in identity and
count from the previous two runs:

- `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
- `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
- `src/lib/invoice-pdf.server.test.ts` — invoice PDF
- `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
- `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
- `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
- `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
- `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

**0 are Science Form 2. 0 are Chapter 7. 0 are attributable to Chapter 7 work.**

---

## 29. FREEZE DECISION

Every blocking criterion is met. Former CRITICAL and HIGH findings are all closed and
independently re-verified. The three post-gate fixes (N-01, N-02, N-04) hold in the live
rendered product in both streams, are protected by guards anchored to rendered output,
and introduced no new CRITICAL or HIGH defect. One MEDIUM and two LOW observations remain,
all pre-existing or cosmetic, all documented above, none blocking.

---

CHAPTER 7 FINAL VERDICT:
PASS — FREEZE CHAPTER

FORMER CRITICAL OPEN:
0

FORMER HIGH OPEN:
0

N-01 BAR-MAGNET FIELD ARROWS:
PASS

N-01 VISUAL REGRESSION GUARD:
PASS

N-02 OHM CALCULATOR ZERO-DENOMINATOR:
PASS

LEARNER-FACING Infinity/NaN:
0

N-04 BM POLE LABELS U/S:
PASS

N-04 DLP POLE LABELS N/S:
PASS

N-04 POLE A11Y LOCALIZATION:
PASS

MAGNET GEOMETRY REGRESSION:
0

FIELD-DIRECTION REGRESSION:
0

SP COVERAGE:
COVERED: 10
PARTIAL: 0
MISSING: 0
INCORRECT: 0
NOT_RENDERED: 0
CONFUSING: 0

MANDATORY EXPERIMENT 7.3.3:
PASS

AMMETER IN SERIES:
PASS

VOLTMETER IN PARALLEL:
PASS

OHM'S LAW:
PASS

SERIES/PARALLEL CIRCUITS:
PASS

ELECTROSTATICS:
PASS

H-04 FIRE ALARM:
SOURCE-RESOLVED

MAGNETIC FIELD:
PASS

RIGHT-HAND GRIP RULE:
PASS

STRAIGHT WIRE / LOOP / SOLENOID:
PASS

EXPERIMENT APPARATUS:
PASS

QUIZ ANSWER KEYS:
PASS

INTERACTIONS:
PASS

BM/DLP PARITY:
PASS

LEARNER-FACING LEAKAGE:
0

MOBILE QA:
PASS

NEW CRITICAL:
0

NEW HIGH:
0

NEW MEDIUM:
1

NEW LOW:
2

TYPECHECK:
PASS

BUILD:
PASS

CHAPTER 7 TESTS:
PASS

SCIENCE F2 TESTS:
PASS

ACADEMY CONTENT MODIFIED:
NO

RELEASE GATE ONLY:
YES
