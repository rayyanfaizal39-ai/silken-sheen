# Bab 7 — Peningkatan Tamadun India dan China: source audit

## Source and scope

Audited the supplied **KSSM Sejarah Tingkatan 1**, `prompts/T1 BT SEJ - SEJARAH.pdf`, printed **138–157** (PDF indices 147–166). Printed 138–154 cover the introduction, India, China, examination system, paper-making and conclusion. Printed 155–156 contain *Pemahaman dan Pemikiran Kritis*; p. 157 contains *Nilai, Patriotisme dan Iktibar*. Chapter 8 begins on p. 158 and was not implemented.

Read the extracted chapter text and inspected the page diagrams, especially the examination characteristics/book list (151), examination-stage comparison and scholars (152), and nine numbered paper-making illustrations (153). Inspected both existing Asoka and Qin/Han raster illustrations before deciding what to retain. Source facts take precedence over old repository summaries; historical plausibility is not treated as textbook evidence.

Baseline: `70e51de1`. The completed Science Chapter 8 work is outside this task and remains unchanged.

## Fact-by-fact inventory

Statuses refer to the implementation before this audit. “Present but incomplete” includes correct canonical facts hidden by the live renderer.

| Major fact / source page | Before | Audit result and action |
| --- | --- | --- |
| Official structure, 140/146 | Incorrect | Only **7.1 Tamadun India** and **7.2 Tamadun China** are official subsections. Removed invented 7.3–7.7 headings and false assignment of 7.2 to India's expansion factors. Internal lessons remain unnumbered and are assigned to their actual parent section. Legacy subtopic lists now also contain only the two official subjects. |
| Chapter focus, 138–139 | Present but incomplete | India: expansion of power and religion; China: education. Replaced the promotional opening with the textbook synopsis concept. No new historical claim was added. |
| Indus → Ganges, Janapada → Mahajanapada, 140 | Present and correct | Retained the strong introduction and added an ordered relationship strip. Janapada are small kingdoms, not an unsupported new political theory. |
| Magadha, 140 | Correct canonical / incorrect duplicates | Textbook explicitly gives **540–490 SM**, northeastern India, strategic Ganges position and control of its principal trading route. Removed 540–320 SM from old notes/revision. Removed unsupported Magadha iron, elephant-resource and river-defence explanations. |
| Definition and five expansion factors, 141 | Present but incomplete | Preserved military strength, government policy, human resources, religious diplomacy and finance. Completed the definition's “usaha untuk mengatasi pihak lain” clause. |
| Physical/religious expansion, 142/144 | Present and correct | Preserved territorial conquest/submission versus cross-border religious/humanitarian influence. Restored military discipline as a condition of physical expansion. Removed legacy “Dharma” as the name of a textbook expansion category. |
| Nanda, 142 | Present and correct | Retained 345–321 SM; 20,000 cavalry, 200,000 infantry, 3,000 elephant troops; Bengal–Punjab and Deccan; Pataliputra (present-day Patna). |
| Maurya, 143 | Present and correct canonical / unsupported duplicates | Retained 322–185 SM, Chandragupta Maurya and Asoka, Bengal–Hindu Kush, Pataliputra, 9,000 elephant troops, 30,000 cavalry and 600,000 infantry. Removed Chanakya-as-adviser, Bindusara and Mysore accounts absent from this chapter. Kautilya remains as the explicitly sourced author of Arthasastra. |
| Kalinga, 143 | Correct canonical / incorrect duplicates | Retained the source's **150,000 losing property** and **100,000 killed**. Removed “more than 100,000” and the unsupplied 261 SM date. These are distinct outcomes; did not turn both figures into deaths. |
| Asoka transformation, 143–144 | Present and correct | Retained the existing visual and source facts: more tolerant/responsible government; physical expansion stopped; Buddhism promoted. Removed unsourced conversion-date/detail and named “Dasar Dharma” from revision answers. |
| Tiang Asoka and missions, 144 | Present and correct | Retained laws/rules inscribed on stone pillars in strategic places; Tibet, Nepal, Alexandria, Antioch, Bactria, Burma; Mahendra to Sri Lanka; Sona/Uttara to Southeast Asia. Removed extra moral-manifesto and “earliest mass-media” assertions from legacy revision. |
| Gupta, 144–145 | Present but incomplete | Retained 320–550 M dynasty, Chandragupta I 320–335 M, Punjab–Bengal, Pataliputra, Hindu development and Samudragupta 335–376 M / Kaviraja. Restored the source's Hindu basis of culture, literature, architecture, trade and government, plus Gupta gold coins. |
| General Indian achievements, 145 | Incorrect grouping | Arthasastra concerns Maurya administration/military; Ajanta/Ellora and land/maritime trade are broader Indian achievements. Moved these out of “Pencapaian Zaman Gupta”. Kept Gupta's gold coins and Hindu emphasis separate. |
| Glossary and India activities, 142/145 | Missing / incomplete | Added source meanings of dynasty, empire, infantry, cavalry and golden age. Retained map/poster tasks about strengthening civilisation and Tiang Asoka. No fabricated territory map. |
| China location and Qin, 146 | Present but incomplete | Retained Huang He, 221–206 SM, Raja Zheng / Shi Huangdi, Xianyang, Gobi–Vietnam extent and unification. Restored full facts instead of rendering only the first fact; included political stability enabling economic/social advancement. Weight/measure standardisation is also explicitly supplied in p. 155 practice. |
| Han, 147 | Present but incomplete | Retained 206 SM–220 M, Liu Bang / Gaozu, empire extent, early Han 206 SM–8 M / Chang'an and later Han 25–220 M / Loyang. Previously hidden founder/capital/details now render. |
| Silk Road, 147 | Present but incomplete / misleading image | Retained Han Wu Di 140–87 SM and the source description of the longest overland route, China–Roman Empire. Replaced the existing raster's misleading route, including its passage through India, with a labelled **schematic**, not a territorial map. Named stops follow the printed map: Chang'an, Dunhuang, Kashgar, Merv, Damsyik; Roman Empire endpoint. The raster file itself is not deleted or changed. |
| Shang/Zhou and Confucius, 148 | Present and correct | Retained origins in Shang, development in Zhou, 551–479 SM, Lun Yu / Analects and continuing Confucian tradition. Added a development strip without invented dates. |
| Qin education, 148 | Present but incomplete: hidden | Restored `qinEducation`: Han Fei Zi, legal understanding, strict law controlling behaviour, Shi Huangdi standardising writing. |
| Han education, 148 | Present but incomplete: hidden | Restored `hanEducation`: higher school in Chang'an, Confucian learning, district and regional schools. |
| Goals/levels/social order, 149 | Present but incomplete | All five goals and all three levels render. Corrected old revision's extra middle-school philosophy and high-school law/leadership claims to source level descriptions. Added four assessed skills and educated people → farmers → artisans → merchants social hierarchy. |
| Exam introduction/abolition, 150 | Correct canonical / incorrect duplicate | Retained the textbook's **Maharaja Wu, Han, 29 SM → 1905, Dowager Cixi**. Removed the summary claiming introduction under Qin. See chronology note below. |
| Eligibility/tradition, 151 | Missing live | Restored competitive nature; males across backgrounds/social classes; Confucian tradition and prohibition of changes to preserve tradition. Xiucai's “semua orang” remains within the explicitly male-only overall context. |
| Community support, 151 | Missing | Restored village sponsorship of promising candidates and hoped-for honour for family, clan and village. |
| Anti-cheating controls, 151 | Incorrect legacy / missing live | Same system throughout empire; cheats punished; confinement **before** examination; excellent passes enter government service. No penalty type or confinement duration is supplied. Removed “hukuman mati”, three nights and conflation with exam duration. |
| Syllabus, 151 | Missing | Restored Empat Buku / The Four Books + Lima Kitab / The Five Classics = Sembilan Buku Suci. All nine English titles in the printed inset are available in an expandable list; did not invent Malay titles or Chinese transliterations. |
| Xiucai, 152 | Incorrect legacy / missing live | **Daerah; open to all within male-only context; twice every three years; one day; 500–2,000; 1:35.** Removed every-two-years claim from the correct answers and summaries. |
| Juren, 152 | Incorrect location / missing live detail | **Ibu kota daerah; first-stage pass required; every three years; three days; 4,800–10,000; 1:120.** Removed “ibu kota wilayah”. |
| Jinshi, 152 | Unsupported additions / missing live detail | **Ibu kota kerajaan; every three years; 13 days.** No extra entrance requirement, candidate count or pass ratio was inferred. Removed “istana di hadapan Maharaja” and unsourced superlative scholar status. |
| Successful-candidate privileges, 152 | Missing / incomplete | Xiucai: golden hat button, junior government work, royal banquet. Juren: golden button/job, name sign at house entrance, attendants. Jinshi: high rank/position, privileges for candidate/family/village. Each stays attached to the correct stage. |
| Scholars, 152 | Missing | Dong Zhongshu 179–104 SM, prominent Confucian scholar; Sima Qian 145–86 SM, first Chinese historian, Shiji covering China up to 90 SM. Added brief source profiles and the group research/folio task. No expanded biographies. |
| Cai Lun / paper, 148/153 | Present but incomplete | Source materials are bark, cloth/hemp scraps and nets (p. 153 specifies fishing nets). Restored all nine steps in order and benefit to schooling. Compact materials/process/result illustration plus expandable sequence; no nine giant cards. |
| Conclusion/formative/values, 154–157 | Present but incomplete | Summary now includes the complete China material. Added eight source practice tasks/concepts without inventing an answer key; restored leadership, peace, cooperation, law and education values. The p. 156 image-based goal question is presented as a text question without claiming to reproduce its illustration. |
| Additional old revision claims | Unsupported enrichment | Removed Dharma-as-origin-of-human-rights, unprecedented comparative meritocracy, guessed moral mechanisms, precise unsourced punishments and broad regional influence claims. Replaced unsupported questions with verified chapter knowledge, retaining 30 quiz and 40 flashcard IDs. No enrichment tier was needed. |

## Source limits and chronology

- p. 147 gives Han Wu Di's reign as **140–87 SM**, while p. 150 attributes the early examination system to **Maharaja Wu / 29 SM**. Both printed statements are retained in their separate source contexts as requested; this is a textbook chronology discrepancy, not independently repaired using general history. No revised year is invented.
- The Nanda/Maurya printed ranges overlap (345–321 SM and 322–185 SM). Both remain exactly source-aligned; the dynasty relationship strip is not a proportional or non-overlapping time scale.
- Jinshi's prerequisite, pass ratio and candidate count are not supplied in the stage table. Omitted those cells rather than filling gaps.
- No fixed duration for pre-exam confinement or specific cheating penalty is supplied. A distractor such as “setiap dua tahun” in a multiple-choice question is intentionally incorrect, not a retained teaching answer.

## Presentation and canonical ownership

`sej7-content.ts` remains the canonical BM lesson. The renderer preserves the existing India foundations, military cards and Asoka before/after visual. New/updated functional visuals are the Ganges–kingdom development chain, dynasty sequence, schematic Silk Road, Chinese education development/social hierarchy, Xiucai → Juren → Jinshi ladder with outcomes, and compact paper process. Names, periods and explanations are source-controlled. New UI-only text consists of controls, comparison labels (Tempat, Kelayakan, Kekerapan, Tempoh peperiksaan, Bilangan calon, Kadar kelulusan), route-schematic accessibility wording and Bahan/Proses/Kertas labels.

`sej7-revision.ts` derives summaries, subtopics, flashcard answers and quiz explanations from the canonical lesson. `notes.ts`, `quizzes.ts`, `flashcards.ts` and legacy `content.ts` consume those shared records. `sejarah-f1-subtopics.ts` retains two lightweight summary snapshots, equality-tested against the canonical-derived summaries, and no longer carries a second contradictory Chapter 7 addition list. It deliberately does **not** import the canonical lesson: that file is on the Notes landing route's static import path. The existing Notes loading regression test verifies that opening Notes still cannot eagerly reach chapter content. Only Chapter 7 records are replaced. Unrelated record text is protected by baseline SHA-256 checks in the dedicated test.

The generated `notes-catalog.generated.ts` changes only Chapter 7 subtopic metadata from ten internal topics to the two official sections, across the existing catalog views. No unrelated metadata or availability counts changed.

**UNSOURCED CORE HISTORICAL CLAIMS ADDED: NONE.** Recall questions and wrong multiple-choice alternatives are assessment presentation, not claimed verbatim textbook prose. No English/DLP lesson was created.

## Regression coverage

`SejarahF1Chapter7Audit.test.tsx` covers live rendering of every lesson, the official two-section structure, source figures and chronology, previously hidden fields, exam stage details/privileges, confinement distinction, scholars, nine books, nine paper-making steps, source practice, navigation/paper expansion/Mark as Read, shared legacy records and unchanged unrelated data.

- Dedicated Chapter 7 audit: **38 tests passed**, including live selection, paper expansion and Mark as Read.
- Related Chapter 6 structure, Sejarah hero/category, Notes summary gate and Notes on-demand loading: **43 tests passed**. Total **81/81**, six files.
- Strict targeted ESLint on the five Chapter 7 TypeScript/TSX files: **passed, zero warnings**.
- Shared legacy data files: semantic ESLint passes with only the Prettier rule disabled. Full lint was also run and encounters pre-existing CRLF/formatting errors throughout these large files; unrelated formatting was intentionally not rewritten. New import/summary fragments were formatted separately.
- TypeScript reports only the existing Form 2 Science test errors: `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:305` and `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:523` (`string | undefined` passed as `string`). No errors remain in this task's files.
- Production build: **passed**, including generated catalog, static shell and Pages worker.
- Desktop (1120 px) and mobile (390 px) component renders inspected in headless Chromium using production CSS. Examination labels wrap without overlap; paper-making remains compact. These are component render checks, not a claim of a signed-in end-to-end Notes browser session.
- `git diff --check` and unrelated data-record baseline checks pass. Existing Science Chapter 8 files match their pre-task hashes. Temporary extraction/rendering artifacts are removed before handoff.
