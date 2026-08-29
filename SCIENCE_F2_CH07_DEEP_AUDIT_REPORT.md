# Science Form 2 Chapter 7 Deep Audit — Keelektrikan dan Kemagnetan / Electricity and Magnetism (BM + DLP)

**Mode:** READ-ONLY. No learner-facing content, component, quiz, flashcard, mind map, image or test was modified. `git status` on `chapter-7/` shows **0 modifications**. Only diagnostics were run (PDF extraction, grep, dev-server mount probes, typecheck, build, tests).
**Date:** 2026-08-28

---

## 1. Verdict

# FAIL — HUMAN REVIEW REQUIRED

Chapter 7's **formulas, units, circuit laws and quiz answer keys are all correct** — 60/60 keys verified, both calculators mathematically sound. It fails on scope and on the one thing DSKP makes legally compulsory.

- **1 CRITICAL** — SP 7.3.3 is a **Jadual 9 mandatory experiment** (independently re-verified) and is taught only as two fact cards. No hypothesis, no variables, no procedure, no conclusion anywhere on any surface.
- **4 HIGH** — the ammeter-in-series / voltmeter-in-parallel rule is absent from *every* surface; three of SP 7.1.3's four required applications are absent; SP 7.3.2's field patterns are absent and the right-hand grip rule is stated backwards and contradicts the chapter's own quiz; a check-yourself answer presents a textbook-listed *disadvantage* as an advantage.
- Structurally, Chapter 7 is the most compressed Science F2 chapter audited: **3 sections for 10 SPs, ~8,250 rendered characters, zero instructional diagrams** — in a chapter whose core content is circuits and fields.

---

## 2. Source provenance

| Source | Identity verified from the file | Status | Chapter 7 location |
|---|---|---|---|
| DSKP.pdf | KPM / BPK, *KSSM Sains Tingkatan 2 DSKP* | Authoritative | 7.0 on PDF pp. 79–83 (printed 68–72); **Jadual 9 on PDF p. 44 (printed 33)** |
| Textbook.pdf | KPM 2017, *Sains Tingkatan 2*, Karangkraf | Authoritative | Bab 7 = printed pp. 140–166 (PDF idx 147–173) |
| Errata.pdf | **Self-disclaimed** mirrored publisher-correction record | **Advisory only** | One Bab 7 correction — see §5 |

**Authority rule applied (DSKP printed p. 39):** *Catatan* carries binding *Skop SK & SP* and non-binding *Cadangan aktiviti PdP*. **Jadual 9 is the sole authority on which investigations are WAJIB.**

**Audit limitation:** the DLP/English textbook was not supplied; English strings were checked by translation equivalence.

---

## 3. NotebookLM corrections

The source map was used as a checklist only. It is **unusually accurate on this chapter** — its SP list, numbering, Jadual 9 flag, formulas and experiment details all verify. Three corrections:

**NL-01 · WRONG · the Newton's Third Law cross-reference is fabricated.**
NotebookLM §9.3 states: *"Bab 8 Errata removes references to Newton's Third Law, but **Bab 7 still contains active mentions of Daya tindakan and Daya tindak balas** (e.g., electrostatic interactions)."*
Verified: `daya tindakan` / `daya tindak balas` → **0 occurrences in textbook Chapter 7**. The claimed conceptual conflict does not exist. Acting on it would have sent a remediation looking for content that isn't there.

**NL-02 · IMPRECISE · 7.3.3 applications conflate DSKP with textbook scope.**
NotebookLM lists "Kompas, loceng elektrik, credit/debit card magnetic strips, electromagnetic locks." **DSKP 7.3.3 Catatan names only two** — *kompas, loceng elektrik*. The card strips and magnetic door locks are genuine, but they come from the **textbook** (Gambar foto 7.18, verified, 2 hits), not the binding DSKP list. The distinction matters when grading coverage.

**NL-03 · INCOMPLETE · omits a binding 7.3.2 requirement.**
DSKP 7.3.2 Catatan requires activities showing the relationship between field lines and field strength **and "Kekuatan daya magnet dengan jarak"** (magnetic force versus distance). NotebookLM's 7.3.2 entry omits the distance relationship entirely.

**Confirmed correct in NotebookLM:** all 10 SPs and their numbering; Jadual 9 status of 7.3.3 (§6); Ohm's Law and both circuit formula sets; Eksperimen 7.1 and 7.2 variables and ranges; the p. 151 *"sel sering"* typo (verified present in the textbook, line 587, in the Gambar foto 7.11 / Eksperimen 7.1 Part B context).

---

## 4. Source reconstruction

**Chapter title:** Bab 7 — Keelektrikan dan Kemagnetan (printed pp. 140–166).

**Textbook order:** Bab 7 opener (p. 140) → 7.1 Keelektrikan (p. 142) → 7.2 Pengaliran Arus Elektrik dalam Litar Bersiri dan Litar Selari (p. 152) → 7.3 Kemagnetan (p. 158) → Latihan Sumatif 7 (p. 164).

**DSKP structure — 10 SPs across 3 SK:**

| SK | SP | Binding Catatan (abridged) |
|---|---|---|
| **7.1 Keelektrikan** | 7.1.1 Menghuraikan mengenai tenaga | Mengapa tenaga diperlukan; **jenis tenaga; sumber tenaga** |
| | 7.1.2 Kewujudan cas elektrostatik | Rod politena/asetat/kaca/belon; **elektroskop** for existence, quantity and type of charge |
| | 7.1.3 Elektrostatik dalam kehidupan seharian | Simulasi kilat (Van de Graaff/Wimhurst); **pemilihan fabrik pakaian** in low humidity; **mengelakkan kebakaran kenderaan semasa mengepam petrol**; **konsep Faraday's cage** |
| | 7.1.4 Cas yang mengalir menghasilkan arus | Van de Graaff → **galvanometer yang dibumikan** |
| | 7.1.5 Mencirikan arus, voltan, rintangan + unit | Unit discovery; **mengukur arus dan voltan menggunakan alat pengukuran yang sesuai** |
| | 7.1.6 Perkaitan arus, voltan, rintangan | Design experiment: effect of resistance on current, voltage on current; **Hukum Ohm** |
| **7.2** | 7.2.1 Pengaliran arus dalam litar bersiri dan selari | Build complete circuits; advantages/disadvantages; **pendawaian elektrik di rumah**; **menyelesaikan masalah numerikal** |
| **7.3 Kemagnetan** | 7.3.1 Merumuskan ciri magnet | Iron filings on bar magnet; compass for direction; **sketch patterns for magnet bar, magnet ladam kuda, magnet magnadur** |
| | 7.3.2 Elektromagnet | Field lines ↔ field strength; **kekuatan daya magnet dengan jarak**; pattern and direction from **dawai lurus, dawai gelung, solenoid**; draw and mark direction |
| | 7.3.3 **Eksperimen** + kegunaan magnet/elektromagnet | **Mengkaji hubungan antara kekuatan medan magnet dengan: arus yang mengalir, bilangan gegelung**; multimedia on uses (kompas, loceng elektrik) |

**Key source facts verified verbatim:**

- **Units and instruments** (printed p. 149): *"unit S.I. bagi arus elektrik ialah **ampere (A)**"* measured by **ammeter**; *"**Voltan ialah beza upaya** di antara dua titik yang boleh diukur dalam unit **volt (V)** menggunakan **voltmeter**"*.
- **Voltmeter connection** (p. 149, Langkah Berjaga-jaga): *"**Voltmeter perlu disambungkan secara selari dengan mentol** supaya dapat mengukur voltan."*
- **Hukum Ohm** (p. 151): *"arus elektrik yang mengalir melalui suatu konduktor adalah berkadar terus dengan voltan yang merentasi dua hujung konduktor dengan syarat suhu dan keadaan fizik lain adalah tetap."* → **V = IR**
- **Series** (p. 154, Rajah 7.10): `I = I₁ = I₂` · `V = V₁ + V₂` · `R = R₁ + R₂`
- **Parallel** (p. 156): `I = I₁ + I₂` · `V = V₁ = V₂` · `1/R = 1/R₁ + 1/R₂`
- **Magnet properties** (p. 158, Rajah 7.14) — four: suspends north-south when free; like poles repel / unlike attract; attracts magnetic materials; has two poles.
- **Medan magnet:** *"Kawasan di sekitar magnet yang wujud kesan daya oleh magnet."*
- **Field-line characteristics** (p. 159, Rajah 7.16): closer together where the field is stronger; **mengarah dari kutub utara ke kutub selatan**; **tidak akan bertemu atau bersilang**.
- **Titik neutral (X):** *"Medan magnet di antara dua kutub yang sama akan menghasilkan satu titik kosong yang tidak mempunyai sebarang medan magnet."*
- **Grip rule** (p. 160–161): *"Arah medan magnet ditentukan oleh arah arus elektrik. **Petua genggaman tangan kanan dapat menentukan arah medan magnet** pada dawai lurus yang membawa arus."* Rajah 7.19 labels the thumb "Arah arus" and the fingers "Arah medan magnet".
- **Also stated:** *"Kekuatan medan magnet berkurang apabila menjauhi pusat konduktor"* and *"Corak medan magnet yang terhasil **tidak dipengaruhi** oleh arah aliran arus."*

**Activities (suggested) vs experiments:** Aktiviti 7.2, 7.3, 7.6, 7.7, 7.8, 7.9, 7.10 are suggested activities. **Eksperimen 7.1** (Ohm's Law, tagged 7.1.6) is an experiment but **not in Jadual 9**. **Eksperimen 7.2** (tagged 7.3.3) **is** in Jadual 9 — see §6.

---

## 5. Errata matrix

| Item | Finding |
|---|---|
| Bab 7 factual corrections | **One typographical correction** — printed **p. 151**: *"sel sering"* must read *"sel kering"* |
| Verified in the textbook? | **Yes** — `sel sering` appears exactly once (line 587, in the Gambar foto 7.11 / Eksperimen 7.1 Part B procedure); `sel kering` appears 21 times |
| **Does AcadeMY reproduce the typo?** | **No — 0 occurrences across all Chapter 7 files.** Clean |
| Broken QR resources in Ch7 range | Errata QR list is pp. 6, 53, 55, 59, 77, 78, 81, 84, 129, 218, 232 — **none inside Ch7's printed 140–166** |

**Provenance limitation preserved:** Errata.pdf states of itself that no officially hosted copy was located. No Chapter 7 item here may be called *errata-verified*.

---

## 6. Jadual 9 / mandatory experiment — INDEPENDENTLY RE-VERIFIED

Inspected directly at DSKP PDF p. 44 (printed 33). The complete Form 2 list is **3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5**. The Chapter 7 entry reads verbatim:

> **7.3.3 Menjalankan eksperimen mengenai kegunaan magnet dan elektromagnet dalam kehidupan harian.**

The DSKP preamble on the same page states: *"Semua penyiasatan saintifik/eksperimen yang dinyatakan **WAJIB** dilaksanakan menggunakan pendekatan inkuiri."*

**CONFIRMED: SP 7.3.3 is a mandatory experiment.** AcadeMY must teach it as a real investigation.

**The experiment itself — Eksperimen 7.2 (textbook pp. 161–162), reconstructed from source:**

**Tujuan:** Mengkaji faktor-faktor yang mempengaruhi kekuatan medan magnet.

| | **Part A — Arus** | **Part B — Bilangan lilitan** |
|---|---|---|
| Pernyataan masalah | Adakah arus yang mengalir mempengaruhi kekuatan medan magnet? | Adakah bilangan lilitan gegelung mempengaruhi kekuatan medan magnet? |
| **Hipotesis** | Semakin besar arus yang mengalir dalam konduktor, semakin tinggi kekuatan medan magnet | Semakin banyak bilangan lilitan gegelung, semakin tinggi kekuatan medan magnet |
| **Dimanipulasikan** | Arus | Bilangan lilitan gegelung |
| **Bergerak balas** | **Bilangan jarum peniti yang ditarik** | **Bilangan jarum peniti yang ditarik** |
| **Dimalarkan** | Bilangan lilitan gegelung (10) | Arus (0.5 A) |
| Range | 0.5, 1.0, 1.5, 2.0, 2.5 A | 10, 20, 30, 40, 50 lilitan |

**Bahan:** Jarum peniti, rod besi, dawai kuprum. **Radas:** Bekalan kuasa a.t., suis, **ammeter**, **reostat**, piring Petri, dawai penyambung, kaki retort dan pengapit (Rajah 7.21).

**Kesimpulan:** Adakah hipotesis diterima? Berikan alasan anda.

**AcadeMY's treatment — see §16. It is not staged as an investigation.**

---

## 7. Live production path

| Layer | Exact artefact | Status |
|---|---|---|
| Registry | `src/content/registry.ts:3536` (`science-f2-c7-bm`), `:3550` (`-dlp`) | — |
| `sciF2InteractiveData` | `chapter-7/interactive-bm.ts` (10,472 B) / `interactive-dlp.ts` (9,942 B) | **LIVE** |
| `notes` | `chapter-7/notes-bm.ts` (19,755 B) / `notes-dlp.ts` (20,546 B) | **REGISTERED-BUT-NOT-RENDERED (dead legacy)** |
| Route branch | `src/routes/notes.tsx:2055` → `ScienceF2Chapter7NotesBlock` | — |
| Component | `ScienceF2Chapter7NotesBlock.tsx` → `ScienceF2InteractiveNotesBlock.tsx` | — |
| Lang prop | `lang={scienceLang === "dlp" ? "en" : "bm"}` | — |

**The Chapters 3–6 shadowing pattern is present, and is the most lopsided yet.** `registry.ts:3544` sets `notes:` and `:3545` sets `sciF2InteractiveData:`. In `notes.tsx` the `sciF2InteractiveData` branch (line 1999) is evaluated before the `activeChapter?.notes` fallback (line 2141), so the interactive branch always wins.

**The dead notes are ~2× the size of the live files** (19.8 KB vs 10.5 KB). Nothing in them is credited as coverage. They were checked for the missing content in §8 and **do not contain the meter-connection rule either**, so reviving them would not close that gap.

**Runtime confirmation** (real components mounted from the Vite dev ESM graph, both languages):

```
BM  : 3 sections — "Elektrik" (3,281 ch) · "Litar Bersiri dan Litar Selari" (1,924) · "Kemagnetan" (3,041)
DLP : 3 sections — "Electricity" · "Series and Parallel Circuits" · "Magnetism"
Total rendered teaching content: ~8,246 characters
Instructional diagrams: 0   (1 img = blog-highlight header; SVGs are UI icons only)
```

---

## 8. SP coverage matrix

Judged on the live rendered surface. COVERED requires the concept to be scientifically correct **and** rendered **and** intelligible at Form 2 level.

| SP | Requirement | Source page | Live AcadeMY location | Status | Severity | Finding |
|---|---|---|---|---|---|---|
| **7.1.1** | Tenaga: jenis + sumber | pp. 142–143 | S1 intro + 9 flip cards | **PARTIAL** | MEDIUM | Definition and joule ✓; 9 energy types ✓. **Energy *sources* absent from the notes** (present only in quiz/flashcard/mind map) |
| **7.1.2** | Cas elektrostatik | pp. 144–146 | S1 intro + "Mengesan cas" card | **COVERED** | — | Electron transfer, gain/loss, like-repel/unlike-attract, electroscope with diverging leaf all correct |
| **7.1.3** | Elektrostatik dalam kehidupan | pp. 146–147 | S1 "Bagaimana kilat terbentuk" card | **PARTIAL** | **HIGH** | Lightning + conductor ✓. **Fabric-in-low-humidity, petrol-pumping, and Faraday's cage all absent from every surface** — 3 of 4 DSKP-named applications |
| **7.1.4** | Cas mengalir → arus | pp. 147–148 | S1 "Arus" card + check | **COVERED** | — | Current defined as rate of flow of charge ✓; Van de Graaff referenced. Galvanometer absent from notes (minor) |
| **7.1.5** | Arus/voltan/rintangan + unit | pp. 148–149 | S1 three cards | **PARTIAL** | **HIGH** | All three quantities, symbols, units and instruments correct. **Ammeter-in-series and voltmeter-in-parallel absent from every live and dead surface** |
| **7.1.6** | Hukum Ohm | pp. 150–152 | S1 Ohm calculator + checks | **COVERED** | — | V = IR ✓; calculator verified 12 V ÷ 0.025 A = 480.00 Ω ✓; resistance↔current relationship taught |
| **7.2.1** | Litar bersiri dan selari | pp. 152–157 | S2 tabs + comparator | **COVERED** | — | All six formulas correct; advantages/disadvantages ✓; household wiring ✓; numerical work ✓. See H-04 on one check answer |
| **7.3.1** | Ciri magnet | pp. 158–159 | S3 intro + 4 flip cards | **PARTIAL** | MEDIUM | 4 properties ✓; field lines N→S, closer=stronger, never cross ✓. **Titik neutral (X) absent; bar/horseshoe/magnadur patterns absent** |
| **7.3.2** | Elektromagnet | pp. 160–161 | S3 grip-rule accordion | **PARTIAL** | **HIGH** | Temporary-magnet idea ✓. **Solenoid, straight-wire and loop-wire field patterns, concentric circles all absent from the notes.** Grip rule stated backwards and contradicts the chapter's own quiz |
| **7.3.3** | **MANDATORY EXPERIMENT** + uses | pp. 161–163 | S3 two accordions + uses card | **PARTIAL** | **CRITICAL** | Both factors and the applications are correct, but stated as facts. **No hypothesis, no variables, no procedure, no observation, no conclusion anywhere** |

| Status | Count |
|---|---|
| COVERED | **4 / 10** |
| PARTIAL | **6 / 10** |
| MISSING | 0 / 10 |
| INCORRECT | 0 / 10 |
| NOT_RENDERED | 0 / 10 |
| CONFUSING | 0 / 10 |

---

## 9. CRITICAL findings

**C-01 · The Jadual 9 mandatory experiment (SP 7.3.3) is not taught as an investigation**

- **Location:** `chapter-7/interactive-bm.ts` / `interactive-dlp.ts`, section 3 accordions.
- **Current, verbatim (BM):**
  > *"⚡ Faktor 1 — Lebih arus: Arus yang lebih besar mengalir melalui gegelung menghasilkan medan magnet yang lebih kuat."*
  > *"🌀 Faktor 2 — Lebih banyak lilitan gegelung: Lebih banyak lilitan wayar di sekeliling teras juga menguatkan medan magnet — dan kekuatannya berkurang apabila semakin jauh daripada pusat konduktor."*
- **Evidence:** DSKP Jadual 9 makes 7.3.3 **WAJIB** (§6). The source experiment has a stated problem, hypothesis, three variables, apparatus, a five-point procedure and a conclusion prompt — for **each of two parts**.
- **Verified across every surface, both languages:** `hipotesis` / `hypothesis` → **0**. `pemboleh ubah` / `manipulated variable` / `responding variable` → **0** in the BM notes (the single DLP hit is *"variable resistor"*, unrelated). `jarum peniti` (the responding variable's actual measure) → **0** in the notes.
- **No quiz assesses experimental design.** The only near-hit is *"What is the difference between a fixed resistor and a variable resistor?"*.
- **Problem:** the two conclusions are delivered as facts to memorise. A student is told *what* the experiment found but never shown *how* it was found, and cannot name the manipulated or responding variable — which is the examinable skill, and the reason the DSKP mandates the experiment at all.
- Chapter 5's remediation established a `MiniExperiment` block for exactly this shape; Chapter 7 does not use it.

---

## 10. HIGH findings

**H-01 · The ammeter/voltmeter connection rule is absent from every surface**

- **Verified counts** (regex `ammeter…(bersiri|series)` and `voltmeter…(selari|parallel)`):

| Surface | ammeter-in-series | voltmeter-in-parallel |
|---|---|---|
| interactive-bm / -dlp | **0 / 0** | **0 / 0** |
| quizzes-bm / -dlp | 0 / 0 | 0 / 0 |
| flashcards-bm / -dlp | 0 / 0 | 0 / 0 |
| mindmap-bm / -dlp | 0 / 0 | 0 / 0 |
| **notes-bm / -dlp (dead)** | **0 / 0** | **0 / 0** |

- **Evidence:** DSKP 7.1.5 binds *"Mengukur arus dan voltan dalam litar elektrik menggunakan alat pengukuran yang sesuai."* The textbook states the voltmeter rule explicitly as a safety step (p. 149): *"Voltmeter perlu disambungkan secara selari dengan mentol supaya dapat mengukur voltan."*
- AcadeMY teaches *what* each meter measures and its unit, but never *how it goes into the circuit*.
- **Problem:** this is the single highest-risk fact in the chapter, and it is a standard exam item. Nothing here is *wrong* — it is simply not taught. The only meter quiz item (q5) asks *"Apakah fungsi ammeter?"* → *"Mengukur arus elektrik"*, which does not touch connection.
- Not graded CRITICAL because no incorrect connection is asserted or drawn; the brief's CRITICAL bucket covers *wrong* placement, and this is absence.

**H-02 · SP 7.1.3 is three-quarters absent**

- DSKP 7.1.3 Catatan names four daily-life problems: lightning simulation, **fabric choice in low humidity**, **avoiding vehicle fire while pumping petrol**, and **finding safe shelter in a thunderstorm (Faraday's cage)**.
- AcadeMY teaches lightning and the lightning conductor only. Verified across **all live and dead surfaces, both languages**: `fabrik`/`fabric` → 0, `petrol`/`refuel` → 0, `Faraday` → **0**.
- **Problem:** three of four binding applications have no home. Faraday's cage in particular is named explicitly in the DSKP and is a favourite TP4 problem-solving item.

**H-03 · SP 7.3.2's field patterns are absent, and the grip rule is stated backwards**

- **Absent from the notes** (present at most in other surfaces): `solenoid` → 0 in notes; `dawai lurus`/`straight wire` → 0 in notes; `bulatan sepusat`/`concentric circles` → 0 in notes. DSKP 7.3.2 binds *"corak dan arah medan magnet yang dihasilkan oleh arus yang mengalir dalam **dawai lurus, dawai gelung dan solenoid**"* and requires learners to **draw and mark direction**. AcadeMY has no such diagram and no such content.
- **The grip rule is inverted and self-contradictory.** The notes accordion says:
  > *"**Lengkungkan jari tangan kanan mengikut arah medan magnet, dan ibu jari menunjukkan arah arus** konvensional"* (DLP: *"Curl your right hand's fingers in the direction of the magnetic field, and your thumb points in the direction of conventional current"*).

  The chapter's own mini-quiz explanation says the opposite way round — correctly:
  > *"Petua tangan kanan: **tunjukkan ibu jari mengikut arah arus, dan jari yang melengkung menunjukkan arah medan magnet**."*

  And quiz **q19** keys *"Menentukan arah medan magnet bagi aliran arus dalam wayar lurus"* — also correct.
- **Source (p. 160–161):** *"Arah medan magnet ditentukan oleh arah arus elektrik. Petua genggaman tangan kanan dapat **menentukan arah medan magnet**…"*; Rajah 7.19 labels thumb = *Arah arus*, fingers = *Arah medan magnet*. Current is the input, field the output.
- **Why this is HIGH and not CRITICAL, stated for the record:** the accordion describes the same physical correspondence (thumb ↔ current, fingers ↔ field), so no direction is *physically reversed* — it is not a sign error. But it inverts the source's procedure, is unusable as a method (a learner cannot start from a field they do not yet know), and **contradicts two other places in the same chapter**. A student who studies the notes and then meets q19 is being taught two different rules.
- The distance relationship (*"kekuatannya berkurang apabila semakin jauh daripada pusat konduktor"*) **is** source-supported (p. 161) — but it is appended to the *number-of-turns* card, conflating two independent factors.

**H-04 · The fire-alarm check answer presents a textbook disadvantage as an advantage**

- **Current, verbatim (both languages):**
  > Q: *"Mengapakah sistem penggera kebakaran biasanya didawaikan secara bersiri, bukan selari?"*
  > Hint: *"Dalam litar bersiri, sebarang putusan tunggal (seperti sensor yang tercetus) menjejaskan keseluruhan litar — sesuai untuk sistem yang perlu tercetus dan memberi amaran serta-merta."*
- **Evidence:** the question is lifted from **Latihan Sumatif 7 Q5** — *"Apakah litar yang sesuai digunakan dalam sistem penggera kebakaran? Jelaskan"* — but AcadeMY supplies the answer, and it runs against the textbook's own framing. Jadual 7.2 lists *"satu komponen rosak menyebabkan seluruh litar terhenti"* as a **disadvantage** (kekurangan) of series; Jadual 7.3 lists *"setiap alat elektrik boleh dihidupkan atau dimatikan secara berasingan"* and *"penambahan alat elektrik tidak menjejaskan fungsi alat elektrik yang lain"* as **advantages** of parallel.
- **Problem:** AcadeMY asserts *series* and justifies it with the exact property the textbook classifies as a drawback. A learner applying the textbook's own advantage/disadvantage tables would answer *parallel*.
- **HUMAN REVIEW REQUIRED.** The textbook poses the question but the answer key was not in the supplied extract, and a defensible engineering argument exists for series *detection loops* (a break registers as a fault). Flagged for a curriculum lead rather than asserted as flatly wrong — but as written the answer conflicts with the chapter's own tables and should not stand unexamined.

---

## 11. MEDIUM findings

**M-01 · 3 sections for 10 SPs, ~8,250 characters, zero instructional diagrams**
Runtime-verified. Section 1 alone carries SPs 7.1.1–7.1.6 (six standards, 3,281 characters). This is the most compressed Science F2 chapter audited — Chapter 6 pre-remediation was 2 sections for 6 SPs; the remediated Chapters 5 and 6 run 12 and 9 sections. Back/Next, one-active-section and progress all work correctly; the issue is granularity and the total absence of visuals in a chapter about circuits and fields.

**M-02 · 9 learner-facing textbook reference leaks**

| Surface | Hits |
|---|---|
| `quizzes-bm` | `Eksperimen 7.2` (L288), `Eksperimen 7.1` (L425) |
| `quizzes-dlp` | `Experiment 7.2`, `Experiment 7.1` |
| `mindmap-bm` | `Eksperimen 7.1`, **`Aktiviti 7.7`**, `Eksperimen 7.2` |
| `mindmap-dlp` | `Experiment 7.1`, `Experiment 7.2` |
| `interactive-bm` / `-dlp` | **CLEAN** |

Same defect class as Chapter 6 (30 leaks, since remediated). A student inside AcadeMY has never seen an "Eksperimen 7.1". **Also a parity break** — mindmap-bm has 3, mindmap-dlp has 2 (`Aktiviti 7.7` is BM-only).

**M-03 · Energy sources absent from the notes**
DSKP 7.1.1 Catatan binds *jenis tenaga* **and** *sumber tenaga*. The notes carry nine energy *types* as flip cards but no sources; the textbook names eight (matahari, angin, bahan radioaktif, bahan api fosil, geoterma, biojisim, ombak, air). Sources appear in the quiz, flashcards and mind map — but not where the concept is taught.

**M-04 · Titik neutral and the three magnet types are absent**
DSKP 7.3.1 binds sketching field patterns for **magnet bar, magnet ladam kuda dan magnet magnadur**; `ladam kuda`/`horseshoe` and `magnadur` → **0 across every surface**. The textbook's *titik neutral (X)* — the zero-field point between like poles — is likewise absent everywhere. Both are examinable and both are naturally visual.

---

## 12. LOW findings

**L-01 · No Chapter 7 test coverage.** No `chapter-7/*.test.*` file exists, and `learner-facing-leakage.test.ts` covers Chapters 1–6 only (`C7` references = 0). Had it covered Chapter 7, M-02's nine leaks would have failed the build.

**L-02 · Chapter 7 is not on the new interaction standard.** The `InteractiveBadge` / `InteractiveFigureCard` pattern ("✨ Interaktif — Ketik konsep untuk meneroka") now used by twelve components across Chapters 3–6 is **absent from Chapter 7**: the components it renders (`FlipCard`, `OhmsLawCalculator`, `ResistanceComparator`, tabs, accordions) carry no badge. Runtime confirmed `interactiveBadge: false`. Nothing signals to a learner that the flip cards or calculators are interactive.

**L-03 · Mind-map BM/DLP asymmetry.** Beyond the leak counts (M-02), `mindmap-bm.ts` carries an `Aktiviti 7.7` node with no DLP counterpart.

---

## 13. Electricity audit

| Concept | Source scope | AcadeMY | Verdict |
|---|---|---|---|
| Tenaga: definition, joule | pp. 142–143 | *"kemampuan untuk melakukan kerja, diukur dalam joule (J)"* | ✓ |
| 9 energy types | p. 143 | 9 flip cards (bunyi, kinetik, elektrik, keupayaan graviti, keupayaan kenyal, cahaya, nuklear, haba, kimia) | ✓ complete |
| 8 energy sources | p. 143 | **absent from notes** | M-03 |
| Electrostatic charge | pp. 144–146 | Electron transfer, gain = negative, loss = positive, equal = neutral; like repel / unlike attract | ✓ |
| Electroscope | p. 146 | *"daun emasnya mencapah kerana cas yang sama saling menolak, dan semakin jauh percapahannya, semakin banyak cas"* | ✓ — covers existence **and quantity**, as DSKP requires |
| Lightning + conductor | pp. 146–147 | Cloud charge separation, conductor gives a safe path to earth | ✓ |
| Fabric / petrol / Faraday | p. 147 | **absent** | H-02 |
| Current = rate of flow of charge | p. 148 | *"Kadar aliran cas elektrik melalui konduktor"* | ✓ |
| Voltage = potential difference | p. 149 | *"Beza keupayaan antara dua titik dalam litar"* | ✓ |
| Resistance + rheostat | p. 149 | *"perintang tetap tidak boleh diselaraskan, tetapi reostat (perintang berubah) boleh"* | ✓ |
| Units A / V / Ω | p. 149 | ampere (A), volt (V), ohm (Ω) — all correct with correct instruments | ✓ |
| **Meter connections** | p. 149 | **absent** | **H-01** |
| Ohm's Law | pp. 150–152 | V = IR, calculator verified | ✓ |

**No incorrect electricity statement was found.** Every quantity carries the right meaning, symbol, unit and instrument.

---

## 14. Circuit / meter audit

**Formulas — all six verified against the textbook, in both languages:**

| | Series (p. 154) | AcadeMY | Parallel (p. 156) | AcadeMY |
|---|---|---|---|---|
| Current | `I = I₁ = I₂` | ✓ | `I = I₁ + I₂` | ✓ |
| Voltage | `V = V₁ + V₂` | ✓ | `V = V₁ = V₂` | ✓ |
| Resistance | `R = R₁ + R₂` | ✓ | `1/R = 1/R₁ + 1/R₂` | ✓ |

**Advantages / disadvantages** match Jadual 7.2 and 7.3, including *"setiap komponen menerima arus yang sama"* (series advantage) and *"voltan setiap alat tidak boleh diselaraskan"* (parallel disadvantage). **Household wiring** correctly justified: *"satu mentol yang terbakar tidak sepatutnya memutuskan kuasa seluruh rumah, dan setiap alat mendapat voltan yang sama"* ✓.

**Numerical work (DSKP 7.2.1 binds it):** the `resistance-comparator` calculator was driven at runtime with R₁ = R₂ = 4 Ω and returned **series 8.00 Ω** and **parallel 2.00 Ω** — both correct. Quiz items q21 (480 Ω), q22 (1.5 A), q23 (6 A) verified.

**Meter placement:** no diagram exists, so nothing is drawn incorrectly — but nothing teaches the rule either (**H-01**).

**Circuit diagrams: none.** DSKP 7.2.1 asks learners to *build complete series and parallel circuits*; AcadeMY conveys both entirely in prose and one numeric comparator. Jadual 7.1 (the circuit-symbol reference chart) has no counterpart.

---

## 15. Magnetism audit

| Concept | Source | AcadeMY | Verdict |
|---|---|---|---|
| 4 magnet properties | Rajah 7.14 | 4 flip cards, all four | ✓ |
| Medan magnet definition | p. 158 | *"Ruang di sekeliling magnet yang mempunyai daya magnet"* | ✓ |
| Field lines N → S | Rajah 7.16 | *"sentiasa bermula dari kutub utara ke kutub selatan"* | ✓ |
| Closer = stronger | Rajah 7.16 | *"menjadi lebih rapat di kawasan medan yang lebih kuat"* | ✓ |
| Never cross | Rajah 7.16 | *"tidak pernah bersilang"* | ✓ |
| **Titik neutral (X)** | p. 159 | **absent** | M-04 |
| Bar / horseshoe / magnadur patterns | p. 159 | **absent** | M-04 |
| Electromagnet = temporary | p. 160 | *"magnet sementara — ia hanya berfungsi semasa arus mengalir"* | ✓ |
| **Grip rule** | Rajah 7.19 | **inverted; contradicts own quiz** | **H-03** |
| Straight / loop / solenoid patterns | pp. 160–161 | **absent from notes** | **H-03** |
| Concentric circles | p. 161 | **absent from notes** | H-03 |
| Strength ↓ with distance | p. 161 | present but attached to the turns card | H-03 |
| Factors: current, turns | Eksperimen 7.2 | both present and correct | ✓ |
| Applications | Gambar foto 7.18 | compass, credit/debit strips, magnetic locks, electric bell | ✓ all four |

**Not carried:** the textbook's point that *"corak medan magnet yang terhasil tidak dipengaruhi oleh arah aliran arus"* (the *pattern* is unaffected by current direction — only the *direction* changes). This is precisely the distinction a learner needs to avoid confusing field pattern with field direction.

---

## 16. Mandatory experiment audit (SP 7.3.3)

| Required element | Source (Eksperimen 7.2) | AcadeMY live surface |
|---|---|---|
| Aim | Mengkaji faktor-faktor yang mempengaruhi kekuatan medan magnet | **absent** |
| Problem statement (×2) | present for both parts | **absent** |
| **Hypothesis (×2)** | both stated verbatim | **absent — 0 occurrences on any surface** |
| **Manipulated variable** | Arus / Bilangan lilitan | **absent** |
| **Responding variable** | Bilangan jarum peniti yang ditarik | **absent** |
| **Controlled variable** | Bilangan lilitan / Arus | **absent** |
| Apparatus | ammeter, reostat, rod besi, dawai kuprum, piring Petri, jarum peniti | **absent** |
| Procedure | 5 steps ×2, ranges 0.5–2.5 A and 10–50 turns | **absent** |
| Observation | pin counts | **absent** |
| Conclusion | "Adakah hipotesis diterima?" | stated as a fact, not concluded |
| Visual setup | Rajah 7.21 | **no diagram** |
| Quiz assessment of experimental understanding | — | **none** |

**What AcadeMY does have:** two accordions correctly stating that more current and more turns give a stronger field, and a check-yourself item (*"Elektromagnet yang digunakan untuk mengangkat besi buruk mempunyai gegelung dengan banyak lilitan. Mengapa?"*) that applies the turns factor.

**Verdict: FAIL.** The findings are right; the investigation is missing. Per the brief — *"If mandatory experiment content is absent or merely stated as facts: flag CRITICAL"* — this is **C-01**.

---

## 17. Quiz audit

**30 items per language, 60 total.**

| Check | BM | DLP |
|---|---|---|
| Out-of-range `answerIndex` | **0** | **0** |
| Duplicate option sets | **0** | **0** |
| Duplicate ids | **0** | **0** |
| Difficulty | Easy 10 / Medium 10 / Hard 10 | identical |
| Parity | 30 | 30 |

**Scientific correctness — verified item by item on every electricity, circuit, formula and magnetism item. No wrong answer key was found.** Spot verifications:

| Item | Key | Verdict |
|---|---|---|
| q1 | "Kemampuan untuk melakukan kerja" | ✓ |
| q6 | "Ohm (Ω)" | ✓ |
| q7 | Ohm's Law statement incl. constant-temperature proviso | ✓ |
| q14 | `V = V₁ + V₂` (series) | ✓ |
| q15 | `I = I₁ + I₂` (parallel) | ✓ |
| q16 | Household parallel — same voltage from supply | ✓ |
| q19 | Grip rule determines **field** direction from current | ✓ (and correct where the notes are not) |
| q21 | 480 Ω | ✓ matches textbook Latihan Formatif 7.1 Q3 |
| q22 | 1.5 A | ✓ |
| q23 | 6 A | ✓ |
| q30 | Series — one failure stops all | ✓ |

**Items testing material the live notes do not teach:**

| Item(s) | Tests | Taught in notes? |
|---|---|---|
| Energy-source items | sumber tenaga | **No** — M-03 |
| q referencing `Eksperimen 7.1` / `7.2` | experiment context | **No**, and the reference itself leaks — M-02 |

**No quiz should be weakened.** All are correct; the notes are the deficient side.

**Not assessed at all:** meter connections (H-01), Faraday's cage / petrol / fabric (H-02), solenoid and wire field patterns (H-03), titik neutral (M-04), and experimental design (C-01).

---

## 18. Interaction audit

Verified by mounting the real components and driving them.

| Interaction | Count | Result |
|---|---|---|
| Flip cards (energy types, magnet properties) | 13 | **All work** |
| Tabs (Bersiri / Selari) | 2 | **Work**, content distinct and correct |
| Accordions (grip rule, factor 1, factor 2) | 3 | **All expand** |
| `OhmsLawCalculator` | 1 | **Works** — 12 V, 0.025 A → **480.00 Ω** |
| `ResistanceComparator` | 1 | **Works** — 4 Ω + 4 Ω → series **8.00 Ω**, parallel **2.00 Ω** |
| Mini quiz | 2 | Render and score correctly |
| Matcher / sequence / interactive diagram / hotspot | **0** | none present |

- **No dead controls.** Every control responds.
- **No misleading circuit animation** — there is no circuit animation at all.
- **No visually interactive-looking object that does nothing.**
- **Interaction affordance fails the new standard (L-02):** none of Chapter 7's components carries the `InteractiveBadge` now used across Chapters 3–6. Runtime `interactiveBadge: false`. A learner has no signal that the flip cards or the two calculators are interactive — the calculators in particular are the chapter's best teaching devices and are undiscoverable.

---

## 19. Flashcard audit

- **Counts:** `flashcards-bm.ts` 19,372 B / `flashcards-dlp.ts` 20,127 B — structurally parallel.
- **Scientific correctness: clean** on formulas, symbols, units and terminology. No contradiction with the notes or quizzes was found.
- Flashcards are **ahead of the notes** on energy sources (M-03).
- **Leakage: clean** — 0 activity/experiment references (unlike quizzes and mind maps).
- Meter connections absent here too (H-01).

---

## 20. Mind-map audit

- **Hierarchy is sound** and mirrors the textbook's Rumusan: energy importance/sources → electrostatic charge → current/voltage/resistance → Ohm's Law → series/parallel → magnetism → electromagnet.
- **Scientifically accurate** on the relationships checked.
- Carries content the notes lack (energy sources, solenoid references) — the same "mind map ahead of notes" pattern seen in Chapters 5 and 6.
- **Defects:** 3 leaks in BM (`Eksperimen 7.1`, `Aktiviti 7.7`, `Eksperimen 7.2`) and 2 in DLP — both a leakage finding (M-02) and a parity break (L-03).
- Missing majors mirror the notes: no titik neutral, no meter connections.

---

## 21. Visual audit

**Instructional visuals: none.** Runtime: 1 `img` (blog-highlight header), SVGs are UI chrome. No circuit diagram, no meter placement diagram, no field-line diagram, no electromagnet setup, no Rajah 7.21 equivalent.

**Consequence:** for a chapter whose brief calls circuit connections, meter placement and field direction "high risk", there is nothing to get wrong — and nothing to learn from. There are **no dead hotspots, no reversed meters and no misleading field arrows**, because there are no diagrams.

**Genuinely learning-improving visuals this chapter lacks** (not decorative):

1. **A series/parallel circuit pair** with correctly placed ammeter (in series) and voltmeter (in parallel) — would close H-01 and serve 7.2.1's "build complete circuits".
2. **A bar-magnet field-line diagram** with N→S arrows, line spacing showing strength, and the neutral point between like poles — closes M-04.
3. **Straight wire / loop / solenoid field patterns** with current and field marked — closes half of H-03 and is explicitly required by DSKP 7.3.2 ("Melukis corak dan menandakan arah").
4. **The Eksperimen 7.2 apparatus** (rod besi, coil, rheostat, ammeter, pins) — supports C-01.

All four are schematic and belong as SVG/HTML, not photographs.

**Mobile:** not separately re-tested this pass; the chapter renders only text, flip cards, tabs, accordions and two calculators, all shared components already gated in Chapters 1–6.

---

## 22. Learner comprehension

Read as a Form 2 student, against the confusions the brief names:

| Risk | Verdict |
|---|---|
| current vs voltage | **Clear** — separate cards, correct definitions, distinct units and instruments |
| current vs electrons | **Not addressed** — conventional current vs electron flow direction (source p. 152) is absent |
| series vs parallel | **Clear** — tabs are well contrasted, formulas correct |
| **ammeter vs voltmeter** | **Incomplete** — the learner knows what each measures but not where each goes (H-01) |
| resistance vs current | **Clear** — the inverse relationship is stated and the Ohm calculator makes it explorable |
| electrical vs magnetic effects | **Clear** |
| permanent magnet vs electromagnet | **Clear** — *"magnet sementara"* framing is good |
| **field strength vs field direction** | **CONFUSED** — the grip rule (direction) is stated backwards, the strength-vs-distance fact is glued onto the turns card, and there is no diagram to separate the two ideas (H-03) |
| formula symbol vs unit | **Clear** — every card gives symbol and unit separately |

**Section 1 is a comprehension risk in its own right:** six SPs and 3,281 characters in a single section, running from "what is energy" through electrostatics to Ohm's Law with one intervening calculator.

---

## 23. BM / DLP parity

| Dimension | BM | DLP | Verdict |
|---|---|---|---|
| Sections | 3 | 3 | **PASS** |
| Section titles/order | Elektrik → Litar → Kemagnetan | Electricity → Circuits → Magnetism | **PASS** |
| Cards / flip cards / tabs / accordions / calculators | 17 / 13 / 1 / 1 / 2 | 17 / 13 / 1 / 1 / 2 | **PASS** |
| Quizzes | 30 | 30 | **PASS** |
| Formulas, units, values | identical | identical | **PASS** |
| Grip-rule error | present | present | parity, but both wrong (H-03) |
| Fire-alarm answer | present | present | parity, both questionable (H-04) |
| **Mind-map leaks** | **3** | **2** | **FAIL** — `Aktiviti 7.7` is BM-only (L-03) |

Technical terminology translates correctly throughout: *arus* / current, *voltan* / voltage, *rintangan* / resistance, *litar bersiri* / series circuit, *litar selari* / parallel circuit, *medan magnet* / magnetic field, *elektromagnet* / electromagnet, *reostat* / rheostat, *elektroskop* / electroscope.

---

## 24. Learner-facing source leakage

| Surface | Result |
|---|---|
| `interactive-bm` / `interactive-dlp` | **CLEAN** |
| `flashcards-bm` / `flashcards-dlp` | **CLEAN** |
| `quizzes-bm` / `quizzes-dlp` | **2 hits each** — `Eksperimen/Experiment 7.1`, `7.2` |
| `mindmap-bm` | **3 hits** — `Eksperimen 7.1`, `Aktiviti 7.7`, `Eksperimen 7.2` |
| `mindmap-dlp` | **2 hits** — `Experiment 7.1`, `Experiment 7.2` |
| **Total live** | **9** |

DSKP, SK, SP, Standard Pembelajaran, Standard Kandungan, Jadual 9, Rajah 7.x, Jadual 7.x, "according to textbook", buku teks, audit, binding, mandatory, source-supported, reviewer, remediation, SP codes `7.x.x` → **0 across all surfaces**.

SK-level numbers (`Semak diri — 7.1`) come from the shared shell and are identical across Chapters 1–6, which are release-gated. Not a Chapter 7 defect.

**Verdict: FAIL** — the notes and flashcards are clean, but quizzes and mind maps are not.

---

## 25. Tests / runtime

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| `npm run build` | **PASS** (exit 0) |
| Chapter 7 tests | **NONE EXIST** |
| Leakage-suite coverage of Ch7 | **NONE** (`C7` references = 0) |
| Science F2 suites | **PASS** — 361/361 (7 files) |
| Full `vitest run` | 1858 passed, **8 failed** |
| **Chapter 7-attributable failures** | **0** |

**Pre-existing failures, unrelated to Chapter 7 — reported, not hidden:**

1. `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
2. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
3. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
4. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
5. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
6. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
7. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
8. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

None touches Science Form 2 content; all match the baseline recorded in the Chapter 6 gate. `npm run lint` fails repo-wide on CRLF-vs-LF; pre-existing.

---

## 26. Limitations

1. **The DLP/English textbook was not supplied.** English strings were validated by translation equivalence against the BM textbook only.
2. **`Errata.pdf` is self-disclaimed** as a mirrored, non-official record. Its single Bab 7 item was cross-checked against the textbook and holds, but no item here is *errata-verified*.
3. **Dead-notes content was read but never credited.** They are ~2× the live files; critically, they do **not** contain the meter-connection rule, so reviving them would not close H-01.
4. **H-04 is genuinely open.** Latihan Sumatif 7 Q5's answer key was not in the supplied extract. Both readings are set out; a curriculum lead must adjudicate.
5. **Screenshots were unavailable** — the Browser pane was not compositing. Visual claims rest on measured DOM counts and rendered text. Since Chapter 7 has no instructional diagrams, little turned on this.
6. **Mobile QA was not re-run** for this chapter (§21); it renders only shared components already gated in earlier chapters.
7. **Quiz distractor quality was spot-checked, not exhaustively modelled** — all 60 keys were verified in range and correct, but not every distractor was traced to a misconception.

---

## 27. Recommended remediation

Proposals only. **Nothing here has been implemented.**

### P0 — release blockers

| # | Finding | Action |
|---|---|---|
| 1 | **C-01** | Stage SP 7.3.3 as a real investigation using the existing `MiniExperiment` block: both parts, with hypothesis, manipulated/responding/controlled variables, the source apparatus (ammeter, reostat, rod besi, dawai kuprum, jarum peniti), the 0.5–2.5 A and 10–50 turn ranges, observation and conclusion. **This is the only Jadual 9 experiment in the chapter and it is legally compulsory.** |
| 2 | **H-01** | Teach that the **ammeter connects in series** and the **voltmeter in parallel**, ideally with a small circuit schematic. Add at least one quiz item. |
| 3 | **H-03** | Correct the grip-rule accordion to the source's direction (thumb = current → curled fingers = field) so it stops contradicting q19 and the mini-quiz; add straight-wire, loop and solenoid field patterns with marked direction. |
| 4 | **H-02** | Add the three missing SP 7.1.3 applications: fabric choice in low humidity, petrol-pumping fire prevention, and **Faraday's cage**. |
| 5 | **H-04** | Resolve the fire-alarm answer against the textbook's own advantage/disadvantage tables, or reframe the question so it does not assert a contested answer. **Curriculum-lead decision.** |

### P1 — coverage and structure

| # | Finding | Action |
|---|---|---|
| 6 | M-01 | Restructure 3 → 9–11 sections so each SP has a teaching home; section 1 currently carries six SPs |
| 7 | §21 | Add the four schematics named in the visual audit — circuits with meters, bar-magnet field lines with neutral point, wire/loop/solenoid patterns, and the Eksperimen 7.2 apparatus |
| 8 | M-03, M-04 | Add energy sources to the notes; add *titik neutral (X)* and the bar/horseshoe/magnadur field patterns |
| 9 | §15 | Add the textbook's point that the field *pattern* is unaffected by current direction, and conventional-current vs electron-flow direction |

### P2 — hygiene and guards

| # | Finding | Action |
|---|---|---|
| 10 | M-02, L-03 | Remove all 9 `Eksperimen/Aktiviti 7.x` references from quizzes and mind maps, rewriting questions to be self-contained — **without weakening them**; restore mind-map parity |
| 11 | L-01 | Add `chapter-7-remediation.test.tsx` and extend `learner-facing-leakage.test.ts` to Chapter 7 |
| 12 | L-02 | Migrate Chapter 7's components to the `InteractiveBadge` standard so the flip cards and calculators are discoverable |

**Constraints for whoever implements this:**
- **Do not weaken any quiz item** — all 60 keys are correct; the notes are the deficient side.
- **Do not import experiment scaffolding into non-mandatory activities** — only 7.3.3 is in Jadual 9. Eksperimen 7.1 (Ohm's Law) is an experiment but **not** mandatory, and Aktiviti 7.2/7.3/7.6–7.10 are suggested activities.
- **Do not reproduce the p. 151 "sel sering" typo** — AcadeMY is currently clean on this.
- **Do not act on NotebookLM's Newton's-Third-Law cross-reference** — it is fabricated (§3, NL-01).
- **Do not revive the dead notes in parallel**, and do not delete them.

---

## CHAPTER 7 VERDICT

```
CHAPTER 7 VERDICT: FAIL — HUMAN REVIEW REQUIRED

CRITICAL: 1   (C-01 Jadual 9 mandatory experiment 7.3.3 taught as two fact cards,
               with no hypothesis, variables, procedure or conclusion anywhere)
HIGH:     4   (H-01 ammeter-series / voltmeter-parallel absent from every surface;
               H-02 three of four SP 7.1.3 applications absent incl. Faraday's cage;
               H-03 SP 7.3.2 field patterns absent + grip rule inverted and
                    self-contradictory against the chapter's own quiz;
               H-04 fire-alarm answer presents a textbook disadvantage as an advantage)
MEDIUM:   4   (M-01 3 sections / 10 SPs / ~8,250 chars / 0 diagrams;
               M-02 9 learner-facing Eksperimen/Aktiviti 7.x leaks;
               M-03 energy sources absent from the notes;
               M-04 titik neutral and bar/horseshoe/magnadur patterns absent)
LOW:      3   (L-01 no Ch7 tests or leakage coverage;
               L-02 not migrated to the InteractiveBadge standard;
               L-03 mind-map BM/DLP asymmetry)

SP COVERAGE:
  COVERED:      4 / 10   (7.1.2, 7.1.4, 7.1.6, 7.2.1)
  PARTIAL:      6 / 10   (7.1.1, 7.1.3, 7.1.5, 7.3.1, 7.3.2, 7.3.3)
  MISSING:      0 / 10
  INCORRECT:    0 / 10
  NOT_RENDERED: 0 / 10
  CONFUSING:    0 / 10

MANDATORY EXPERIMENT 7.3.3:  FAIL
                             (Jadual 9 status independently re-confirmed;
                              Form 2 list = 3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5)
CIRCUIT ACCURACY:            PASS   (all six formulas correct; no wrong connection asserted)
FORMULAS:                    PASS   (V=IR, series and parallel sets, both calculators verified)
MAGNETISM:                   FAIL   (grip rule inverted and self-contradictory;
                                     field patterns and neutral point absent)
QUIZ ANSWER KEYS:            PASS   (60/60 correct, 0 out-of-range, 0 duplicates)
INTERACTIONS:                PASS   (all controls work; 0 dead) — but see L-02 on affordance
BM/DLP PARITY:               FAIL   (mind-map leak asymmetry, 3 vs 2)
LEARNER-FACING LEAKAGE:      FAIL   (9 occurrences in quizzes and mind maps)
TYPECHECK:                   PASS
BUILD:                       PASS
TESTS:                       PASS   (8 pre-existing failures, 0 from Chapter 7)

ACADEMY CONTENT MODIFIED: NO
AUDIT ONLY: YES
```

**HUMAN REVIEW REQUIRED specifically for:**
1. **H-04** — the fire-alarm series-vs-parallel answer. The textbook poses the question; the supplied extract does not carry the key. A curriculum-authority decision.
2. **H-03's severity** — whether an inverted-but-self-consistent grip-rule statement that contradicts the chapter's own quiz should be treated as a correctness defect or a wording defect. Both readings are set out in §10.
3. **The DLP source gap** — every English string was validated only by translation equivalence.

## Action taken

**None.** This audit modified no project file. No fixes were implemented and no content was rewritten. `git status` on `src/content/form2/science/chapter-7/` shows **0 modifications**. Every action in §27 is a proposal for a future, separately approved change.
