# Chapter 5 Pass 3 source audit

## Sources inspected before implementation

BM Form 1 Science textbook, printed pp. 151–161 (`T1 BT SN- SAINS.pdf`, PDF indices 160–170). Figures 5.14–5.18 were visually inspected, including container openings, balance types and the ball/ring arrangement. DLP corresponding pp. 151–161 were checked against the school-library textbook copy at https://fliphtml5.com/bjsfz/tpck/Science_Form_1/.

Passes 1 and 2 are locked. Their canonical fields and visual component files are protected separately from the newly audited Pass 3 fields.

## Canonical corrections and decisions

| Existing content | Verified source and implementation decision |
| --- | --- |
| Sublimation described only solid to gas; reverse hidden in thermal wording | Figure 5.14 and p. 153 explicitly use Sublimation/Pemejalwapan for both directions. Represent two directed relationships using the same name, with separate heat classifications. Do not introduce deposition or another term. |
| Evaporation limited to temperatures below boiling point | p. 153 says any temperature. Correct both languages; retain slow evaporation. DLP says absorbs heat from surroundings; BM says absorbs heat when heated. Preserve that source-specific distinction. |
| Condensation description omitted temperature qualification | p. 153 DLP says equal to or below boiling point; BM says below boiling point. Preserve each language's wording. |
| Freezing said fixed positions without explicit vibration | p. 153 explicitly retains vibration at fixed positions. Add this to prevent an implication that movement stops. |
| Temperature and mass combined with an over-broad kinetic-energy explanation | p. 155 confirms constant temperature at melting, freezing and boiling, with heat overcoming/forming attraction. Separate temperature explanation from the p. 159 conclusion that mass remains unchanged during physical changes. Do not apply “only kinetic energy changes” universally to dissolution. |
| Ice procedure omitted empty-beaker weighing | Activity 5.6 B(I), p. 154: empty beaker first, then beaker plus ice, then same beaker plus melted water; open beaker, lever balance. Restore sequence. |
| Salt procedure too generic | Activity 5.6 B(II), p. 155: weigh beaker plus 100 ml water, add ten spatulas fine salt and weigh, stir using glass rod, weigh after dissolution. Compare the mixture after salt addition with the final solution; do not equate water alone with solution. Open beaker, lever balance. |
| Metal ball required failure to fit through ring | Activity 5.6 B(III), p. 155: weigh ball and ring, heat ball for five minutes, reweigh hot ball and ring. Triple-beam balance and Bunsen burner. Remove the unsupported ring-fit test and added particle-spacing observation. |
| Missing boiling activity visual | Activity 5.6 A, p. 154: 100 ml water, beaker, Bunsen burner, tripod, wire gauze, retort stand/clamp and thermometer. Record initial temperature then at ten-minute intervals until constant. No invented readings or measured graph. |
| Everyday examples | Figure 5.19, p. 156 supports all four existing examples and wet clothes drying. Retain ice cream, dry ice preventing melting, shrinking mothballs and dew; include the source's wet-clothes example. Correct BM mothballs from kapur barus to ubat gegat. No added sublimating substances. |
| Wet-towel recall answer added wind | Retain evaporation question, grounded in p. 153 any-temperature statement and p. 156 wet-clothes example. Remove wind and other unprovided environmental factors. |
| Particle-movement recall | Already covered in approved Pass 2; remove duplicate question. |
| Ethanol/water-bath recall | Not found in Chapter 5 pages; remove from this chapter. |
| Seawater recall | Chapter 5 assessment p. 161 question 6 explicitly asks for a condensation design using a container, plastic sheet, stone and glass. Retain as a proposed design based on this question, not as a printed textbook answer. |
| Old creative Pass 3 headings and closing rule | Replace with source headings and the canonical mass conclusion; remove duplicated renderer-only science copy. |

## Textbook limitations

The inspected Chapter 5 pages do not explicitly state boiling throughout liquid versus evaporation only at the surface. The existing canonical wording and requested schematic extend beyond those pages. The user explicitly chose strict Chapter 5 content. Remove the old throughout/surface-only claims and do not add corresponding instructional arrows. The comparison instead shows source-backed bubbling heated water (p. 154) and gradual liquid-to-gas change without an active burner. This supersedes the original requested surface-only distinction.

Activity 5.7 asks learners to research and present daily-life examples. Retain its purpose and task compactly without inventing additional examples or a laboratory worksheet.

No fabricated measured masses, numerical plateau temperatures or exact particle scale will be introduced. Balance pointers and before/after equality are qualitative.

## Implementation verification

The complete header, Pass 1 and Pass 2 server-rendered HTML matches the pre-Pass-3 baseline in both languages. All three locked visual component files are unchanged. Canonical Pass 1 and Pass 2 subsets are protected by baseline hashes. Legacy emoji fields remain solely for compatibility with the older content renderer; none are used in the new application diagrams.

The seawater answer is retained as a design response to the textbook assessment prompt; it is not represented as a verbatim textbook solution. The wet-towel question is a retained application of the verified evaporation and wet-clothes content. No unverified environmental factors remain. Presentation controls and schematic qualifiers come from the implementation brief/existing UI, not claimed textbook quotations.

UNSOURCED SCIENTIFIC CLAIMS ADDED: NONE. The requested but unverified boiling/evaporation location distinction is excluded as instructed.
