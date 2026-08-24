# FINAL LEARNER-FACING QA AUDIT — Sains / Science Tingkatan 2, Bab 1–3

**Mode:** AUDIT ONLY. No learner-facing file was modified. This report is the only file created.
**Scope:** Chapter 1 (Biodiversiti), Chapter 2 (Ekosistem), Chapter 3 (Nutrisi) — BM and DLP.
**Date:** 2026-08-23.
**Method:** Every live, student-facing data file was searched (interactive notes, quizzes,
flashcards, mind maps) plus the React components that render them, for (a) DSKP/curriculum/
textbook/audit metadata leaking into learner copy, and (b) academic regressions against
previously-corrected content. `notes-{bm,dlp}.ts` in all three chapter directories are
confirmed dead/unregistered legacy files (superseded by `sciF2C1Data` for Ch1 and
`sciF2InteractiveData` for Ch2/Ch3 in the routing ternary in `src/routes/notes.tsx`) and were
excluded, since students never see them.

**Headline finding:** the two most recent Chapter 3 remediation passes — done by this same
assistant, in this same session — introduced the exact class of leak this audit was
commissioned to find. Explaining internally *why* something is "not core DSKP scope" by
writing that sentence directly into the student-facing card is the single largest source of
findings below. Chapter 2 has the identical pattern in miniature (2 cards). This is flagged
prominently rather than downplayed.

---

## Chapter 1

### Leakage findings

| # | Language | Surface | File | Line | Exact current text | Type | Why | Recommended replacement |
|---|---|---|---|---|---|---|---|---|
| 1 | BM | Quiz `sci-f2-c1-bm-q23`, explanation | `chapter-1/quizzes-bm.ts` | 333 | "...dan kadar pembiakan yang tinggi. **[Nota KBAT — penaakulan lanjutan: buku teks hanya menyatakan bahawa serangga ialah kumpulan haiwan terbesar dengan 950,000 spesies; sebab-sebab di atas ialah huraian tambahan, bukan petikan buku teks.]**" | AUDIT_LEAK / TEXTBOOK_META | A bracketed note addressed to a content reviewer ("this is not a textbook quotation") leaked into the explanation a student reads after answering. | Delete the bracketed sentence entirely. Keep: "...dan kadar pembiakan yang tinggi." The `[KBAT]` difficulty framing on the question itself is fine to keep — see note below. |
| 2 | DLP | Quiz `sci-f2-c1-dlp-q23`, explanation | `chapter-1/quizzes-dlp.ts` | 332 | "...high reproduction rate. **[KBAT note — extended reasoning: the textbook states only that insects are the largest animal group with 950,000 species; the reasons above are additional explanation, not a textbook quotation.]**" | AUDIT_LEAK / TEXTBOOK_META | Same as #1, in English. | Delete the bracketed sentence. Keep: "...high reproduction rate." |
| 3 | BM+DLP | Section eyebrow labels (5 distinct render sites, hardcoded in the component, not the data file) | `src/components/notes/ScienceF2Chapter1NotesBlock.tsx` | 327, 356, 469, 492, 512 | `eyebrow: "1.1"` (×2), `eyebrow: "1.2"` (×3) | SP_UI_LEAK | Raw SK/SP-shaped codes rendered as a small label directly above each section title — see the dedicated SP-in-UI analysis below. | Drop the eyebrow row for this component, or replace with a plain "Bahagian X" / "Part X" progress label. Confirmed **zero navigation impact** — see analysis below. |

**Note on `[KBAT]` tags themselves:** `KBAT` ("Kemahiran Berfikir Aras Tinggi" / Higher-Order
Thinking Skills) is a real, standard Malaysian exam-paper and textbook label that students
routinely see printed on questions in their own school materials — unlike DSKP/SP codes, it is
not internal curriculum-authoring metadata. The 8 `[KBAT]`-tagged flashcards found in Chapter 1
(`flashcards-{bm,dlp}.ts` lines 375, 384, 438, 447, 483, 510, 537) are judged **acceptable as
difficulty framing** and are not flagged as findings. One of them (`f447`,
"...according to the standard dichotomous key?" / "...mengikut kekunci dikotomi standard?")
uses slightly stiff phrasing referencing the in-lesson classification tool (not an external
document) — noted as a very low-priority style polish, not a leak, and not listed as a numbered
finding.

### Academic regression check — PRESENT+CORRECT (BM/DLP parity confirmed)

- **Dichotomous key**: sound branch logic spot-checked (feathered→chicken, unfeathered→lion;
  vertebrate/invertebrate root split). No malformed branches found.
- **Amphibian breathing correction**: intact and correct. `interactive-bm.ts:405` / `-dlp.ts:405`
  — "Katak ialah amfibia. Berudu (anak katak) bernafas melalui insang, manakala katak dewasa
  bernafas menggunakan peparu dan kulit yang lembap." / "The frog is an amphibian. Tadpoles
  breathe through gills, while adult frogs breathe through lungs and moist skin." Correctly
  stage-differentiated (larval gills → adult lungs+skin), not oversimplified.
- **Primary/secondary classification logic**: the invertebrate branch's two-level nesting
  (legs present/absent → then segmented/unsegmented, or leg-pair count) is taxonomically
  coherent (`interactive-bm.ts:244–266`).
- **Invertebrate hierarchy**: correct groupings — unsegmented (sponge, coral, planaria, snail)
  vs segmented without legs (earthworm, leech, tapeworm) vs three-leg-pairs (ant, butterfly,
  cockroach) vs more-than-three-leg-pairs (spider, scorpion, centipede, shrimp, horseshoe crab).
- **Human-impact cause→effect**: three coherent chains present (`interactive-bm.ts:170–199`) —
  deforestation→habitat loss→food loss→extinction risk; hunting/trafficking→population
  decline→endemic+threatened species hit hardest→Wildlife Protection Act 1972; development
  needs vs conservation→controlled deforestation→biodiversity protected.
- **Endemic vs threatened distinction**: explicitly and correctly distinguished, not treated as
  synonyms — "Endemik dan terancam BUKAN perkara yang sama... contohnya harimau Malaya yang
  endemik dan juga terancam." / "Endemic and threatened are NOT the same thing... the Malayan
  tiger, for example, is endemic and also threatened." (`interactive-bm.ts:224`, `-dlp.ts:224`)
- **Keyword definitions**: biodiversity, species, endemic, threatened, vertebrate, invertebrate
  definitions spot-checked and accurate.
- **BM "bulu pelepah" terminology**: present and used correctly as the bird/mammal
  distinguisher in the dichotomous key and vertebrate definitions, including the correct
  negative case for mammals ("Badan dilitupi bulu dan rambut (**bukan** bulu pelepah)").

### Language quality
No awkward literal-translation sentences found in a spot check of the dichotomous key, human
impact chains, and endemic/threatened definitions. DLP reads as natural school English; BM
reads as natural Malaysian Science-textbook register.

---

## Chapter 2

*(Findings and regression check below are carried from a dedicated sub-audit of Chapter 2's
live files; independently spot-verified.)*

### Leakage findings

| # | Language | Surface | File | Line | Exact current text | Type | Why | Recommended replacement |
|---|---|---|---|---|---|---|---|---|
| 4 | BM | Interactive notes §2.2.3 "Gangguan Kitar Nutrien", accordion | `chapter-2/interactive-bm.ts` | 303–304 | Title: "⭐ Pengayaan (di luar skop DSKP Bab 2) — Baja berlebihan dan eutrofikasi". Body: "...Ini bukan salah satu daripada tiga gangguan yang disenaraikan dalam DSKP Bab 2 — anggap ia sebagai maklumat tambahan." | SOURCE_LEAK | Names "DSKP" and frames content by its position in a curriculum document. | Title → "⭐ Tambahan — Baja berlebihan dan eutrofikasi". Body → "Ini bukan salah satu daripada tiga gangguan utama yang dibincangkan dalam bab ini — anggap ia sebagai pengetahuan tambahan." |
| 5 | DLP | Same accordion | `chapter-2/interactive-dlp.ts` | 303–304 | Title: "⭐ Enrichment (beyond DSKP Chapter 2 scope) — Fertiliser overuse and eutrophication". Body: "...This is not one of the three disruptions listed in DSKP Chapter 2 — treat it as additional information." | SOURCE_LEAK | Same as #4, English. | Title → "⭐ Extra — Fertiliser overuse and eutrophication". Body → "This isn't one of the three main disruptions covered in this chapter — treat it as bonus knowledge." |
| 6 | BM | Interactive notes §2.3.2, card detail field | `chapter-2/interactive-bm.ts` | 466 | "Aktiviti cadangan dalam buku teks" | TEXTBOOK_META | Cites "the textbook" as the activity's origin. | "Contoh penyiasatan makmal" |
| 7 | DLP | Same card | `chapter-2/interactive-dlp.ts` | 466 | "Suggested activity in the textbook" | TEXTBOOK_META | Same as #6. | "Example lab investigation" |
| 8 | BM | Quiz `q24` explanation | `chapter-2/quizzes-bm.ts` | 381 | "...ialah salah satu daripada tiga gangguan kitar nutrien yang disenaraikan dalam DSKP." | SOURCE_LEAK | Names DSKP as the reason something is taught. Answer index (1) unaffected by the fix. | "...ialah salah satu daripada tiga gangguan utama kepada kitar nutrien." |
| 9 | DLP | Quiz `q24` explanation | `chapter-2/quizzes-dlp.ts` | 381 | "...is one of the three nutrient-cycle disruptions listed in the DSKP." | SOURCE_LEAK | Same as #8. | "...is one of the three main disruptions to the nutrient cycle." |
| 10 | BM | Flashcard `f40` | `chapter-2/flashcards-bm.ts` | 364–365 | Front: "[Pengayaan — di luar skop Bab 2] Bandingkan konsep piramid tenaga dengan aliran tenaga linear..." Back: "...Nota: istilah piramid tenaga tidak terdapat dalam DSKP mahupun buku teks Bab 2 — ia maklumat tambahan sahaja." | SOURCE_LEAK / TEXTBOOK_META | Names both DSKP and "buku teks" as scope authorities in one card. | Front tag → "[Tambahan]". Back → "Nota: 'piramid tenaga' bukan istilah wajib bagi bab ini — ia hanya membantu visualisasikan idea yang sama." |
| 11 | DLP | Flashcard `f40` | `chapter-2/flashcards-dlp.ts` | 364–365 | "...Note: the term energy pyramid appears in neither the DSKP nor the Chapter 2 textbook — treat it as additional information." | SOURCE_LEAK / TEXTBOOK_META | Same as #10. | "Note: 'energy pyramid' isn't a required term for this chapter — it just helps visualise the same idea." |
| 12 | BM | Flashcard `f59` | `chapter-2/flashcards-bm.ts` | 537 | "Apakah hipotesis yang diuji dalam **Eksperimen 2.1** mengenai kutu kayu (woodlice)?" | TEXTBOOK_META | Numbered-exercise reference (same family as "Rajah [number]"). | "Dalam penyiasatan makmal tentang kutu kayu, apakah hipotesis yang diuji?" |
| 13 | DLP | Flashcard `f59` | `chapter-2/flashcards-dlp.ts` | 537 | "What hypothesis was tested in **Experiment 2.1** about woodlice?" | TEXTBOOK_META | Same as #12. | "In the woodlice lab investigation, what hypothesis was tested?" |
| 14 | BM+DLP | Mind map node `c1-2-4` (soft/borderline) | `chapter-2/mindmap-{bm,dlp}.ts` | 29 | "[Pengayaan] Piramid tenaga: tenaga berkurang ke aras lebih tinggi" / "[Enrichment] Energy pyramid: energy decreases at higher levels" | AI_WORDING (mild) | Same scope-boundary tagging pattern as #10/#11, low severity. | "Piramid tenaga (tambahan): ..." / "Energy pyramid (extra): ..." |
| 15 | BM+DLP | Section eyebrow labels, 11 distinct SP values | `chapter-2/interactive-{bm,dlp}.ts` | 30, 79, 155, 197, 258, 321, 374, 483, 548, 611, 668 | `"2.1.1"`, `"2.1.2"`, `"2.2.1"`, `"2.2.2"`, `"2.2.3"`, `"2.3.1"`, `"2.3.2"`, `"2.3.3"`, `"2.3.4"`, `"2.3.5"`, `"2.4.1"` — identical values/lines in both language files | SP_UI_LEAK | Each renders as a small curriculum-code eyebrow above the section title. | See dedicated SP-in-UI analysis below — safe to remove/replace, zero navigation impact. |

### Academic regression check — PRESENT+CORRECT (BM/DLP parity confirmed)

- **Food-web teaching**: internally consistent tiered web (producer→primary→secondary→tertiary
  consumer), arrows correctly point toward the eater (energy-flow direction).
- **Primary/secondary carnivore terminology**: correct and consistently applied — "Kerana ia
  karnivor yang pertama dalam rantai itu, ia dipanggil karnivor primer" (first carnivore in the
  chain = primary carnivore, eats primary consumers) / "karnivor sekunder" (second carnivore,
  eats primary carnivores). Verified against quiz `q11`/`dlp-q11` and flashcards `f8`/`f9`.
- **Excessive/wasteful water-use case**: present, causally sound (§2.2.3 cause-effect chain:
  over-extraction → falling groundwater/river/lake levels → less water for organisms → water
  cycle disrupted), with a conservation solution note. Reinforced in quiz `q24` and flashcard
  `f36` (aside from the DSKP leak in #8/#9, the underlying science is sound).
- **Ecosystem-change teaching** (water supply / migration / population change): all three
  present with sensible mechanisms in §2.3.5 — water shortage→producer decline→food-web
  impact; cattle-egret migration to Kuala Gula→insect-population effects; predator-removal→prey
  population increase→plant decline.
- **Adaptation teaching**: scientifically sound across tropical/desert/tundra cases. Notably,
  the camel-hump explanation correctly states it stores **fat** (energy reserve), not water — a
  common misconception this content avoids. Cactus spine→reduced surface area→reduced
  transpiration reasoning is correct. Arctic fox small-ears→reduced heat loss is correctly
  taught and correctly the right answer (not the "better hearing" misconception distractor) in
  quiz `q16`.
- **Population-affecting factors**: four factors (disease outbreak, predators, food source,
  weather/drought) consistently listed and non-garbled, matching quiz `q27` and flashcards
  `f34`/`f35`. Symmetric in BM and DLP.
- **No misleading adaptation visual**: checked every adaptation card's stated
  mechanism→function link (drip-tip leaves, spines, hump, ear size) — no causal-claim errors.
- **BM/DLP structural parity**: both `interactive-{bm,dlp}.ts` are 734 lines, identical section
  count/order/`number:` values at identical lines, identical block counts. Quizzes 30/30 same
  IDs and order. Flashcards 60/60 same IDs and order. No content present in one language only.

### Language quality
DLP reads as natural school-level English, not literal-translated (e.g. "mencengkam tanah" →
"grip the soil", not a stiffer "clamp the soil"). No awkward-translation instances flagged.

---

## Chapter 3

### Leakage findings

This chapter carries the largest concentration of findings, almost entirely introduced during
the two most recent remediation passes (the "not core DSKP scope" labelling work for BMI,
maltase and Kwashiorkor, plus the Visking-experiment authoring).

| # | Language | Surface | File | Line | Exact current text | Type | Why | Recommended replacement |
|---|---|---|---|---|---|---|---|---|
| 16 | BM | §3.1.1 Kelas Makanan, Protein card `detail` | `chapter-3/interactive-bm.ts` | 46–47 | "Pengetahuan Tambahan: kekurangan teruk protein dikaitkan dengan Kwasyiorkor (kanak-kanak 1–3 tahun) — **bukan skop teras DSKP Bab 3**." | SOURCE_LEAK | "Bukan skop teras DSKP Bab 3" is internal scoping language, not teaching content. "Pengetahuan Tambahan" alone is fine and should stay (see the [KBAT]-style reasoning above — a plain "extra info" tag is not a leak). | "Pengetahuan Tambahan: kekurangan teruk protein dikaitkan dengan Kwasyiorkor (kanak-kanak 1–3 tahun)." (drop the DSKP clause only) |
| 17 | DLP | Same card | `chapter-3/interactive-dlp.ts` | 46–47 | "Additional Knowledge: severe protein deficiency is linked to Kwashiorkor (children aged 1–3) — **not core DSKP Chapter 3 scope**." | SOURCE_LEAK | Same as #16. | "Additional Knowledge: severe protein deficiency is linked to Kwashiorkor (children aged 1–3)." |
| 18 | BM | §3.1.1 Vitamin dan Mineral, section `intro` | `chapter-3/interactive-bm.ts` | 85 | "**DSKP mengehendaki** enam vitamin utama dan enam mineral utama diperkenalkan bersama sumber, kepentingan dan kesan kekurangan masing-masing." | SOURCE_LEAK | Opens the section by naming DSKP as the reason this is being taught — exactly the pattern the task's own "BAD" examples target. | "Terdapat enam vitamin utama dan enam mineral utama yang perlu anda kenali, bersama sumber, kepentingan dan kesan kekurangan masing-masing." |
| 19 | DLP | Same section intro | `chapter-3/interactive-dlp.ts` | 85 | "**The DSKP requires** six main vitamins and six main minerals to be introduced, each with its source, importance and deficiency effect." | SOURCE_LEAK | Same as #18. | "There are six main vitamins and six main minerals you need to know, each with its source, importance and deficiency effect." |
| 20 | BM | §3.2.2 Nilai Kalori, BMI card | `chapter-3/interactive-bm.ts` | 328–329 | Title: "Indeks Jisim Badan (BMI) — Pengayaan Buku Teks". Body: "...tetapi BMI **BUKAN keperluan teras DSKP Bab 3** — ia adalah butiran tambahan daripada buku teks." | SOURCE_LEAK / TEXTBOOK_META | Both the card title and body name curriculum documents as the reason BMI is optional. | Title → "Indeks Jisim Badan (BMI) — Pengetahuan Tambahan". Body → "BMI = Jisim (kg) ÷ [Ketinggian (m) × Ketinggian (m)]. Formula ini digunakan untuk menilai status jisim badan, tetapi ia bukan sesuatu yang wajib anda hafal untuk bab ini." |
| 21 | DLP | Same card | `chapter-3/interactive-dlp.ts` | 325–326 | Title: "Body Mass Index (BMI) — Textbook Enrichment". Body: "...but BMI is **NOT a core DSKP requirement** in Chapter 3 — it is additional textbook detail." | SOURCE_LEAK / TEXTBOOK_META | Same as #20. | Title → "Body Mass Index (BMI) — Additional Knowledge". Body → "BMI = Mass (kg) ÷ [Height (m) × Height (m)]. This formula is used to assess body mass status, but it isn't something you need to memorise for this chapter." |
| 22 | BM | §3.2.3 Gaya Hidup Sihat, "check yourself" question | `chapter-3/interactive-bm.ts` | 392 | "Namakan tiga penyakit berkaitan pemakanan tidak sihat yang **dinyatakan DSKP**." | SOURCE_LEAK | **This is a verbatim match to the task brief's own worked "BAD" example** ("Name three diet-related diseases named in the DSKP."). Tests awareness of a curriculum document, not science. | "Namakan tiga penyakit yang boleh dikaitkan dengan pemakanan tidak sihat." |
| 23 | DLP | Same question | `chapter-3/interactive-dlp.ts` | 388 | "Name three diet-related diseases **named in the DSKP**." | SOURCE_LEAK | Identical to the task brief's own "BAD" example. | "Name three diseases that may be associated with an unhealthy diet." |
| 24 | BM | §3.3.1 Enzim, section `intro` | `chapter-3/interactive-bm.ts` | 560 | "**DSKP memperkenalkan** tiga enzim pencernaan: amilase, protease dan lipase..." | SOURCE_LEAK | Opens by citing DSKP as the source of the three-enzyme scope. | "Terdapat tiga enzim pencernaan utama yang perlu anda kenali: amilase, protease dan lipase..." |
| 25 | DLP | Same intro | `chapter-3/interactive-dlp.ts` | 556 | "**The DSKP introduces** three digestive enzymes: amylase, protease and lipase..." | SOURCE_LEAK | Same as #24. | "There are three main digestive enzymes you need to know: amylase, protease and lipase..." |
| 26 | BM | §3.3.1 Enzim, Maltase accordion | `chapter-3/interactive-bm.ts` | 581–582 | Title: "➕ Butiran Buku Teks: Maltase". Body: "...**DSKP hanya mewajibkan tiga enzim** (amilase, protease, lipase), jadi maltase adalah butiran tambahan buku teks — bukan keperluan teras untuk dihafal." | SOURCE_LEAK / TEXTBOOK_META | Explains the maltase-scope *decision* to the student, rather than just teaching the science. | Title → "➕ Tahukah Anda: Maltase". Body → "Usus kecil turut merembeskan maltase, yang mencerna maltosa → glukosa, melengkapkan laluan karbohidrat: kanji → maltosa → glukosa. Maltase adalah butiran tambahan — anda tidak perlu menghafalnya seperti tiga enzim utama di atas." |
| 27 | DLP | Same accordion | `chapter-3/interactive-dlp.ts` | 577–578 | Title: "➕ Textbook Detail: Maltase". Body: "...**The DSKP requires only three enzymes** (amylase, protease, lipase), so maltase is additional textbook detail — not a core requirement to memorise." | SOURCE_LEAK / TEXTBOOK_META | Same as #26. | Title → "➕ Did You Know: Maltase". Body → "...Maltase is additional detail — you don't need to memorise it like the three main enzymes above." |
| 28 | BM+DLP | Mind map node `c3-3-4` | `chapter-3/mindmap-{bm,dlp}.ts` | 120 | "Maltase (**butiran buku teks**): maltosa → glukosa" / "Maltase (**textbook detail**): maltose → glucose" | TEXTBOOK_META | Same pattern, terser. | "Maltase (tambahan): maltosa → glukosa" / "Maltase (extra): maltose → glucose" |
| 29 | BM | §3.4.1 Eksperimen Tiub Visking, section `intro` and diagram `title` | `chapter-3/interactive-bm.ts` | 656, 680 | "**Eksperimen 3.1** menggunakan tiub Visking sebagai model..." / "Susunan radas **Eksperimen 3.1**" | TEXTBOOK_META | Numbered-exercise reference to the textbook's own exercise numbering, in the section's most-visible text (opening sentence and diagram caption). | "Tiub Visking digunakan sebagai model dinding usus kecil untuk mengkaji penyerapan hasil pencernaan." / "Susunan radas eksperimen tiub Visking" |
| 30 | DLP | Same intro/diagram title | `chapter-3/interactive-dlp.ts` | 652, 676 | "**Experiment 3.1** uses Visking tubing as a model..." / "**Experiment 3.1** apparatus set-up" | TEXTBOOK_META | Same as #29. | "Visking tubing is used as a model of the small intestine wall to study the absorption of digested products." / "Visking-tubing experiment apparatus set-up" |
| 31 | BM+DLP | Section eyebrow labels, 9 distinct SP values across 13 sections | `chapter-3/interactive-{bm,dlp}.ts` | 34, 81, 159, 207, 298/297, 340/336, 401/396, 524/519, 556/551, 597/591, 652/647, 708/703, 769/764 | `"3.1.1"` (×2), `"3.1.2"`, `"3.2.1"`, `"3.2.2"`, `"3.2.3"`, `"3.3.1"` (×3), `"3.4.1"` (×2), `"3.4.2"`, `"3.4.3"` | SP_UI_LEAK | Every one of the 13 sections shows a raw SP-code eyebrow above its title — the densest instance of this pattern in the three chapters, and the values are now real DSKP-matching codes (a deliberate correction from the prior invented-numbering pass), making them look even more like an official curriculum reference to an attentive parent/student. | See dedicated SP-in-UI analysis below — zero navigation impact confirmed. |

### Academic regression check — PRESENT+CORRECT (all task-listed items verified)

- **Protein digestion** (protein→polypeptide→dipeptide→amino acids): intact.
  `sections[6].sequence` (Duodenum step) contains "polipeptida→dipeptida"; the Usus Kecil step
  contains "dipeptida→asid amino"; the Perut step stops at "polipeptida sahaja". Covered by
  automated regression test `chapter-3-remediation.test.tsx`.
- **Pancreas / liver / gall bladder / duodenum**: all four present as named organs with correct
  functions in the digestive-system diagram and the digestion Journey.
- **Physical vs chemical digestion**: present as its own section (SP 3.3.1, UX section 8).
- **Food tests**: present (SP 3.1.2, UX section 3), all four reagent/result pairs intact.
- **Malaysia Food Pyramid 2020 + current serving guidance**: present, 4-tier/5-group structure
  with the corrected servings (≥3/2/3–5/1/1–2/1/2), verified by automated test.
- **Calorific-value wording**: "dioksidakan"/"oxidised" confirmed present, "dibakar"/"burnt"
  confirmed absent, per the prior pass's fix.
- **Healthy lifestyle section**: present (SP 3.2.3) — the underlying disease/lifestyle science
  is correctly taught; only its check-yourself question wording leaks DSKP framing (finding
  #22/#23 above).
- **Visking experiment**: present and scientifically correct (outside-tube test location
  intact) — only its exercise-numbering wording leaks textbook framing (finding #29/#30 above).
- **Assimilation**: present (SP 3.4.2), correctly defined.
- **Digestive/circulatory/respiratory cooperation**: present, three-system cause-effect chain
  intact.
- **Defaecation**: present (SP 3.4.3).
- **Kwashiorkor not core assessed knowledge**: confirmed compliant — quiz `q3` now tests
  Beri-beri, flashcard `f5` no longer names the disease, and every remaining mention (mind map,
  notes card) is explicitly labelled "Pengetahuan Tambahan"/"Additional Knowledge" — though see
  finding #16/#17 for the DSKP clause that should be trimmed from that same label.
- **Correct real SP mapping internally**: confirmed correct against the actual Bab 3 structure
  (3.1.1, 3.1.2, 3.2.1–3, 3.3.1, 3.4.1–3) — the mapping itself is accurate; the issue is purely
  that it is visible in the UI (finding #31), not that it's wrong.

### Language quality
BM and DLP read naturally and match in scientific meaning throughout the sections checked; no
stiff literal-translation artifacts found beyond the source-leak wording itself (which is
awkward in both languages for the same reason — it's developer language, not a translation
problem).

---

## SP NUMBERS IN THE UI — dedicated analysis

**Mechanism (shared across Chapters 2 and 3):** `ScienceSectionedNotesShell.tsx` renders
`active.eyebrow` as a small bold uppercase label directly above every section's title:
```
<p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{active.eyebrow}</p>
<h2 className="...">{active.title}</h2>
```
`ScienceF2InteractiveNotesBlock.tsx` sets `eyebrow: section.number` — so whatever curriculum
code sits in a chapter's data file is what students see. Chapter 1's dedicated component
(`ScienceF2Chapter1NotesBlock.tsx`) hardcodes its own `eyebrow: "1.1"`/`"1.2"` values directly
in JSX using the identical shell/prop shape.

**Navigation impact of removing/hiding these labels: NONE**, confirmed by reading the shell's
own state logic — `current` (a numeric array index) drives which section is shown, is what gets
persisted to `sessionStorage`, and is what the Back/Next buttons increment/decrement. The
React list `key` was already changed to `sec-${index}` in the prior Chapter 3 pass specifically
*because* `section.number` is not guaranteed unique — it was never load-bearing for navigation.
Section-picker pills show `index + 1` and `section.label` (the natural title), never `number`.

**Recommendation:** keep `number:` in every chapter's data file (it is legitimate, accurate
internal curriculum-traceability metadata worth having for content ops), but stop piping it
into `eyebrow`. Suggested replacement for the visible label: nothing (cleanest), or a plain
"Bahagian {index+1} daripada {total}" / "Part {index+1} of {total}" progress readout (check
first whether `ResearchModuleMeta`, rendered directly below, already shows an equivalent
progress indicator, to avoid duplication).

**Total distinct SP-shaped codes currently visible to students:** 5 in Chapter 1 (same values
in both languages, since the eyebrow string isn't translated), 11 in Chapter 2 (×2 languages),
9 in Chapter 3 (×2 languages) = **25 distinct code values, 44 total section-render sites**
across the three chapters.

---

## DSKP / CURRICULUM LANGUAGE LEAKAGE

Every learner-visible occurrence found, chapter by chapter (excludes internal code
comments/JSDoc, which are correctly never rendered — confirmed by direct inspection of
`PyramidDiagram.tsx`, `DigestiveSystemDiagram.tsx`, `ViskingExperimentDiagram.tsx`,
`VillusDiagram.tsx`, `FoodWebDiagram.tsx`, and `interactive-types.ts`, none of which leak their
own JSDoc comments into rendered output).

**Literal "DSKP" string, learner-visible:**
- Chapter 1: 0 occurrences.
- Chapter 2: 8 occurrences — `interactive-bm.ts`/`-dlp.ts` L303–304 (×2 per language),
  `quizzes-bm.ts`/`-dlp.ts` L381 (×1 per language), `flashcards-bm.ts`/`-dlp.ts` L364–365
  (×1 per language).
- Chapter 3: 8 occurrences — `interactive-bm.ts` L47, 85, 329, 392; `interactive-dlp.ts` L47,
  85, 326, 388.
- **Total: 16 learner-visible literal "DSKP" occurrences.**

**"KSSM", "Standard Kandungan", "Standard Pembelajaran", literal "SK"/"SP" + number codes as
prose text:** 0 occurrences found in any of the six chapter-language file sets. (The SP codes
that *are* visible reach students only through the `eyebrow` UI mechanism above, as bare
numbers like "3.2.3" with no "SP" prefix — still a leak, just a different shape, see SP_UI_LEAK
count above.)

**Textbook-meta occurrences ("the textbook", "buku teks", numbered "Eksperimen X.X"/
"Experiment X.X", numbered "Aktiviti X.X"/"Activity X.X"):**
- Chapter 1: 2 (the KBAT bracket note, BM+DLP).
- Chapter 2: 6 ("buku teks"/"textbook" activity-detail ×2, "Eksperimen 2.1"/"Experiment 2.1"
  flashcard ×2, "buku teks Bab 2"/"Chapter 2 textbook" inside the DSKP-counted flashcard ×2).
- Chapter 3: 10 (BMI title+body ×2 langs = 4, Maltase title+body ×2 langs = 4, mind-map label
  ×2, plus "Eksperimen 3.1"/"Experiment 3.1" ×4 counted separately below).
- Chapter 3 numbered-exercise references specifically: 4 ("Eksperimen 3.1"/"Experiment 3.1" in
  both the section intro and the diagram title, ×2 languages).
- **Total: 22 learner-visible textbook-meta occurrences.**

**Audit/developer-language occurrences** (text that reads as a note *to a reviewer*, not
teaching content — the KBAT bracket notes and the explicit "not core DSKP/textbook scope"
justification clauses):
- Chapter 1: 2 (`quizzes-{bm,dlp}.ts` q23 bracket notes).
- Chapter 2: 2 (`interactive-{bm,dlp}.ts` §2.2.3 "di luar skop DSKP Bab 2"/"beyond DSKP Chapter
  2 scope" framing — distinct from the plain-DSKP-mention count above, this is the *scoping
  justification* pattern specifically).
- Chapter 3: 6 (the three DSKP-scope-justification clauses — Kwashiorkor, BMI, maltase — each
  in both languages).
- **Total: 10 learner-visible audit/developer-language occurrences.**

No instance of "errata", "audit", "release gate", "remediation", "source-supported",
"source-aligned", "authoritative source", "mandatory outcome", or "curriculum requirement" (as
literal strings) was found in any learner-facing surface across all three chapters.

---

## Unnatural / Source-Aware Questions

Every question flagged below tests awareness of a curriculum/textbook document rather than
science knowledge, or otherwise reads like a QA note rather than a teacher's question.

### 1 — Chapter 3, BM, interactive notes "check yourself" (§3.2.3)
CURRENT:
"Namakan tiga penyakit berkaitan pemakanan tidak sihat yang dinyatakan DSKP."

RECOMMENDED:
"Namakan tiga penyakit yang boleh dikaitkan dengan pemakanan tidak sihat."

ANSWER CHANGES: NO (hint stays: penyakit jantung, tekanan darah tinggi, kencing manis, kanser
kulit, kanser peparu)

### 2 — Chapter 3, DLP, interactive notes "check yourself" (§3.2.3)
CURRENT:
"Name three diet-related diseases named in the DSKP."

RECOMMENDED:
"Name three diseases that may be associated with an unhealthy diet."

ANSWER CHANGES: NO

### 3 — Chapter 1, BM, quiz `sci-f2-c1-bm-q23` explanation
CURRENT:
"...dan kadar pembiakan yang tinggi. [Nota KBAT — penaakulan lanjutan: buku teks hanya
menyatakan bahawa serangga ialah kumpulan haiwan terbesar dengan 950,000 spesies; sebab-sebab
di atas ialah huraian tambahan, bukan petikan buku teks.]"

RECOMMENDED:
"...dan kadar pembiakan yang tinggi." (delete the bracketed sentence; question and options
unchanged)

ANSWER CHANGES: NO

### 4 — Chapter 1, DLP, quiz `sci-f2-c1-dlp-q23` explanation
CURRENT:
"...high reproduction rate. [KBAT note — extended reasoning: the textbook states only that
insects are the largest animal group with 950,000 species; the reasons above are additional
explanation, not a textbook quotation.]"

RECOMMENDED:
"...high reproduction rate." (delete the bracketed sentence)

ANSWER CHANGES: NO

### 5 — Chapter 2, BM, quiz `q24` explanation
CURRENT:
"Penggunaan sumber air yang berlebihan untuk pertanian dan kegunaan domestik ialah salah satu
daripada tiga gangguan kitar nutrien yang disenaraikan dalam DSKP."

RECOMMENDED:
"Penggunaan sumber air yang berlebihan untuk pertanian dan kegunaan domestik ialah salah satu
daripada tiga gangguan utama kepada kitar nutrien."

ANSWER CHANGES: NO

### 6 — Chapter 2, DLP, quiz `q24` explanation
CURRENT:
"Excessive use of water for agricultural and domestic purposes is one of the three
nutrient-cycle disruptions listed in the DSKP."

RECOMMENDED:
"Excessive use of water for agricultural and domestic purposes is one of the three main
disruptions to the nutrient cycle."

ANSWER CHANGES: NO

### 7 — Chapter 2, BM, flashcard `f59`
CURRENT:
"Apakah hipotesis yang diuji dalam Eksperimen 2.1 mengenai kutu kayu (woodlice)?"

RECOMMENDED:
"Dalam penyiasatan makmal tentang kutu kayu, apakah hipotesis yang diuji?"

ANSWER CHANGES: NO

### 8 — Chapter 2, DLP, flashcard `f59`
CURRENT:
"What hypothesis was tested in Experiment 2.1 about woodlice?"

RECOMMENDED:
"In the woodlice lab investigation, what hypothesis was tested?"

ANSWER CHANGES: NO

*(The BMI, maltase, and Kwashiorkor card findings in Chapters 2 and 3 above are not phrased as
questions — they are notes/cards — and are therefore listed only in the main leakage tables,
not repeated here.)*

---

## FINAL VERDICT

CHAPTER 1 LEARNER-FACING QA: **FAIL** *(2 AUDIT_LEAK instances — the KBAT bracket note pair —
plus the eyebrow SP_UI_LEAK; all academic content PASSES)*
CHAPTER 2 LEARNER-FACING QA: **FAIL** *(8 SOURCE_LEAK/TEXTBOOK_META instances plus the eyebrow
SP_UI_LEAK; all academic content PASSES)*
CHAPTER 3 LEARNER-FACING QA: **FAIL** *(16 SOURCE_LEAK/TEXTBOOK_META instances — the largest
concentration, mostly introduced in the two most recent passes — plus the eyebrow SP_UI_LEAK;
all academic content PASSES)*

SOURCE-METADATA LEAKAGE PRESENT: **YES** (16 literal "DSKP" occurrences, 22 textbook-meta
occurrences, 10 audit/developer-language occurrences, 25 distinct SP-code values visible via
the section-eyebrow UI across 44 render sites — see the dedicated sections above for the full
itemised list)

ACADEMIC REGRESSIONS FOUND: **NO** (every previously-corrected fact checked in Chapters 1–3 —
dichotomous key, amphibian breathing, invertebrate hierarchy, human-impact chains, endemic vs
threatened, food web, primary/secondary carnivore terms, water-use case, ecosystem-change
teaching, adaptation teaching, population factors, protein digestion chain, pancreas/liver/
gall-bladder/duodenum, physical-vs-chemical digestion, food tests, Food Pyramid 2020, calorific
wording, Visking experiment, assimilation, three-system cooperation, defaecation, Kwashiorkor
scoring status — is present and scientifically correct in both languages)

BM/DLP PARITY ISSUES FOUND: **NO** (structural parity — section counts, IDs, order, answer
indices — confirmed intact in all three chapters; the leakage findings above affect BM and DLP
symmetrically, not asymmetrically)

REPOSITORY LEARNER CONTENT MODIFIED: **NO**
AUDIT ONLY: **YES**

---

## Post-Cleanup Verification

All 31 numbered findings above (#1–#31) were fixed as a targeted cleanup pass — wording only,
no scientific meaning, answer, or difficulty changed anywhere. Full per-finding fix details are
in each chapter's own remediation changelog (`SCIENCE_F2_CH01_REMEDIATION_CHANGELOG.md` §
"Learner-Facing Cleanup Pass", `..._CH02_...`, `..._CH03_...`).

### Shared-layer fix (findings #3, #15, #31 — one fix, three chapters)

`ScienceSectionedNotesShell.tsx` no longer renders `active.eyebrow` (the field every chapter's
`section.number` — a raw SP-shaped code — was piped into). The `<p>` element was deleted
outright; nothing replaced it, per the "cleanest" option this same report recommended. `number:`
remains untouched in every chapter's data file for internal traceability. Navigation state
(`current`, a numeric index) never depended on it, confirmed unaffected. `ScienceF2Chapter1NotesBlock.tsx`'s
own hardcoded `eyebrow: "1.1"/"1.2"` values go through the same shell and are equally
suppressed — no per-chapter edits were needed for this finding.

### Per-chapter content fixes

Chapter 1: 2 findings fixed (the KBAT bracket-note pair in quiz `q23`).
Chapter 2: 10 findings fixed (§2.2.3 accordion, §2.3.2 card detail, quiz `q24`, flashcards `f40`
and `f59`, mind-map node `c1-2-4`).
Chapter 3: 15 findings fixed (Kwashiorkor detail, Vitamin&Mineral intro, BMI card, §3.2.3
check-yourself question, Enzim intro, Maltase accordion, mind-map maltase node, Visking intro +
diagram title).

### Regression search re-run (task item 10, exact term list)

Re-ran across all 24 live BM+DLP files (interactive/quizzes/flashcards/mindmap × 3 chapters ×
2 languages) after the fixes:

| Term searched | Occurrences found |
|---|---|
| `DSKP` (any case) | 0 |
| `Standard Pembelajaran` / `Standard Kandungan` | 0 |
| `SP`/`SK` as a curriculum-code prefix | 0 (the only `SP`/`sp` matches are the legitimate Latin species abbreviation "sp." in `Marchantia sp.`/`Gnetum sp.`, and `// SP 2.x.x` **code comments** in `chapter-2/interactive-{bm,dlp}.ts` marking section boundaries for developers — never rendered, correctly out of scope per the task's own "internal metadata is allowed" rule) |
| `according to the textbook` / `buku teks menyatakan` | 0 |
| `Rajah [number]` / `Figure [number]` | 0 |
| `Eksperimen 1./2./3.` / `Experiment 1./2./3.` | 0 |
| `mandatory`, `binding scope`, `core scope`, `outside scope`, `source-supported`, `source-aligned`, `audit`, `remediation`, `reviewer` | 0 |
| `not core` | 1 — reviewed and kept (see below) |

**The one surviving "not core" hit**, reviewed in context: Chapter 3 §3.2.3's NHMS-statistics
accordion ends with "statistik ini adalah konteks sokongan, bukan fakta wajib hafal" / "these
statistics are supporting context, not core facts to memorise." This names no curriculum
document, textbook, or audit process — it is plain, natural teacher-style study guidance ("you
don't need to memorise the exact percentages"), which is exactly the kind of legitimate
pedagogical language the task instructed not to blindly strip. Left unchanged.

Also newly checked and confirmed clean: `[Nota KBAT...]`/`[KBAT note...]` reviewer brackets (0
remaining, both were in Chapter 1's `q23`), `[Pengayaan]`/`[Enrichment]` bracket tags (both
standardised to the canonical "Pengetahuan Tambahan"/"Additional Knowledge" wording per the
task's own rule).

### Automated verification

- **`src/content/form2/science/learner-facing-leakage.test.ts`** (new, 24 tests) — asserts,
  per live surface per chapter per language, that none of 27 forbidden curriculum/audit/
  textbook-meta patterns appear anywhere in the serialized content. All 24 pass.
- **`ScienceF2Chapter1NotesBlock.test.tsx`** (new) — asserts the "1.1"/"1.2" eyebrow values
  never appear in rendered output for either language. Passes.
- **`ScienceSectionedNotesShell.test.tsx`** — extended with an explicit assertion that the
  eyebrow value ("2.1"/"2.2" in the test fixture) is absent from rendered markup. Passes.
- **`chapter-3-remediation.test.tsx`** (18 pre-existing tests, all still passing unmodified) —
  every science-content assertion (protein digestion chain, enzyme secretion sources, Food
  Pyramid 2020 tiers/servings, gall-bladder-is-not-a-gland classification, Visking outside-tube
  fix, BM/DLP parity) continues to pass without needing a single change, which is itself
  evidence that this cleanup pass altered wording only, not science.
- Full targeted suite (9 files, 75 tests total, spanning all three chapters' notes/quiz/
  flashcard/mind-map rendering plus shared chrome components): **all 75 pass.**
- `npm run audit:quizzes`: `science:form-2:chapter-{1,2,3}:{bm,dlp}` all report `count=30`, no
  new critical or warning issues. The 18 pre-existing CRITICAL issues are unrelated
  `math:form-1:chapter-{3,4,5}` metadata mismatches, unchanged from before this pass.
- `tsc --noEmit`: clean.
- `eslint` on every touched/new file: clean (repo-wide pre-existing CRLF `prettier/prettier`
  noise on Windows-checked-out files, unrelated to this pass, not touched).
- `vite build`: succeeds.

### Report

VISIBLE DSKP OCCURRENCES: **0**
VISIBLE SP/SK CODE OCCURRENCES: **0** *(mechanism removed at the shared rendering layer;
`number:`/`sp`-shaped values remain in data files internally, as instructed)*
VISIBLE TEXTBOOK-META OCCURRENCES: **0**
VISIBLE AUDIT/DEVELOPER LANGUAGE OCCURRENCES: **0**

CHAPTER 1 LEARNER-FACING QA: **PASS**
CHAPTER 2 LEARNER-FACING QA: **PASS**
CHAPTER 3 LEARNER-FACING QA: **PASS**

ACADEMIC REGRESSIONS: **NONE** *(re-verified — every previously-frozen fact listed in the
original audit's per-chapter regression checks was re-read after the edits and confirmed
unchanged; no wording fix touched a number, formula, causal chain, or named organ/enzyme/
disease; all pre-existing science-content test assertions pass without modification)*
BM/DLP PARITY: **NO ISSUES** *(every fix was applied to both languages in the same edit pass;
BM reads as natural Malaysian Science-register wording, DLP as natural school English — neither
is a stiff literal translation of the other)*
BUILD: **PASS**
TYPECHECK: **PASS**

Chapters 1–3 are **not** declared frozen. Per the standing instruction, a final learner-facing
**visual** QA pass (an actual browser click-through of both languages across all three
chapters) is still outstanding and should happen next.
