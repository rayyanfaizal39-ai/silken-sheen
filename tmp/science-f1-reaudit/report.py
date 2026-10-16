import json,os,re,collections
from pathlib import Path
T=Path(os.environ['TEMP']);baseline=json.loads((T/'science-f1-pr65-baseline.json').read_text(encoding='utf-8'));final=json.loads((T/'science-f1-pr65-final.json').read_text(encoding='utf-8'));decisions=json.loads((T/'science-f1-pr65-decisions.json').read_text(encoding='utf-8'));base=json.loads((T/'science-f1-pr65-base.json').read_text(encoding='utf-8'))
old={q['id']:q for b in baseline for q in b['questions']};ancestor={q['id']:q for b in base for q in b['questions']};ancestor.update({q['id']:q for b in baseline if b['chapter']<3 for q in b['questions']})
sp={
1:'1.1.2 1.1.4 1.1.4/1.1.7 1.5.4 1.5.2/1.5.4 1.2.2 1.2.4 1.7.3 1.2.4 1.2.4/1.7.3 1.2.1 1.4.1/1.4.2 1.3.1 1.3.4 1.6.1 1.6.3 1.3.3 1.5.4 1.6.3 1.3.2 1.4.2 1.4.3 1.4.3 1.4.3 1.4.4 1.5.4 1.6.2 1.6.1 1.7.3 1.5.4',
3:'3.1.1 3.1.4 3.1.1 3.1.1 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.3 3.1.3 3.1.1/3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.2 3.1.3 3.1.2 3.1.3 3.1.2 3.1.2 3.1.3',
4:'4.1.1 4.1.1 4.1.1 4.1.2 4.1.1 4.1.1 4.1.1 4.1.1 4.2.1 4.2.1 4.2.2 4.2.3 4.4.1/4.6.1 4.7.2 4.7.4/4.7.5 4.1.1 4.1.1 4.1.1 4.3.1 4.5.3 4.3.2 4.3.1 4.4.1 4.4.1 4.4.3 4.6.1/4.6.3 4.4.2 4.5.2 4.7.2 4.7.3',
5:'5.1.1 5.1.2 5.1.1 5.1.2 5.1.2 5.1.3 5.1.3 5.2.2 5.2.1/5.2.2 5.2.2 5.2.2 5.2.3 5.2.3 5.2.4 5.1.4 5.1.4 5.2.2 5.2.4 5.2.4 5.2.4 5.2.4 5.2.5 5.2.6 5.1.4 5.2.7 5.2.3 5.1.4 5.2.5 5.1.3 5.1.4',
6:'6.1.1 6.1.1 6.1.1 6.1.1 6.1.1 6.1.1 6.1.1 6.1.2 6.1.2 6.1.2 6.1.3 6.1.3 6.1.3 6.1.3 6.1.4 6.2.2/6.3.6 6.1.2 6.1.4 6.1.4 6.2.1 6.2.2 6.2.2 6.2.2 6.2.2 6.3.6 6.3.5 6.3.4 6.1.4 6.3.3 6.3.2/6.3.6',
7:'7.1.1 7.1.1 7.1.1 7.1.1 7.1.1 7.2.1 7.1.3 7.1.3 7.1.3 7.1.3 7.2.1 7.2.1 7.3.1 7.3.2 7.3.2 7.1.4 7.1.4 7.1.5 7.2.2 7.2.2 7.2.2 7.3.2/7.3.4 7.3.4 7.1.5/7.3.4 7.3.3 7.2.1 7.3.4 7.1.5 7.3.3 7.3.4',
8:'8.2.1 8.2.1 8.2.1 8.2.1 8.2.1 8.1.1 8.7.2 8.1.3 8.1.2 8.1.5 8.1.5 8.3.4 8.3.2 8.4.4 8.5.1 8.3.1 8.3.2 8.3.3 8.4.2 8.4.2 8.4.2 8.5.1 8.5.1 8.7.2 8.1.6/8.3.4 8.2.1 8.4.4 8.5.2 8.6.2 8.7.6',
9:'9.1.1 9.1.1 9.1.1 9.1.1 9.1.1 9.1.1 9.1.1 9.1.1 9.1.2 9.6.4 9.6.1/9.6.2 9.1.2 9.6.3 9.2.2 9.2.1 9.1.2 9.3.1 9.1.2 9.5.3 9.3.1 9.3.1 9.3.1 9.4.1 9.5.1 9.6.2 9.6.2 9.5.3/9.5.4 9.3.1 9.4.2 9.6.6'}
sp={c:s.split() for c,s in sp.items()};assert all(len(s)==30 for s in sp.values())
fields=['question','options','answerIndex','explanation','difficulty'];rows=[];counts=collections.Counter();per=collections.defaultdict(collections.Counter);revisions=collections.defaultdict(list);difficulty=[];distractors=[];allchanges=[];pairchanges=set();basechanges=set()
visuals=dict(re.findall(r'"(sci-f1-[^"]+)": "([^\"]+)"',Path('src/content/form1/science/quiz-visuals.ts').read_text(encoding='utf-8')))
for bank in final:
 c,lang=bank['chapter'],bank['lang']
 for q in bank['questions']:
  n=int(q['id'].split('q')[-1]);before=old[q['id']];changes=[f for f in fields if before.get(f)!=q.get(f)];decision=decisions.get(f'{c}:{n}',{})
  classification=decision.get('classification','CORRECT') if changes else 'KEEP'
  if changes:
   pairchanges.add((c,n));revisions[c].append(q['id']);allchanges.append((q['id'],changes));problem=decision.get('problem','Explanation depended on original option position.' if c==2 else 'Stored answer-position bias.');action='Updated '+', '.join(changes)+'.'
   if c==9 and not decision: problem='Stored answer key overwhelmingly used A.';action='Reordered options and remapped answerIndex; correct meaning unchanged.'
  else:problem='No repair identified in semantic review.';action='Retained '+q['difficulty'].lower()+' item: '+q['question'][:100]+('…' if len(q['question'])>100 else '')
  if any(ancestor[q['id']].get(f)!=q.get(f) for f in fields):basechanges.add((c,n))
  if before['difficulty']!=q['difficulty'] and lang=='dlp':difficulty.append(f'C{c} Q{n}: {before["difficulty"]} → {q["difficulty"]}')
  if before['options']!=q['options'] and lang=='dlp' and set(before['options'])!=set(q['options']):distractors.append(f'C{c} Q{n}')
  standard=q.get('sp') or sp[c][n-1]
  visual=Path(visuals[q['id']]).name if q['id'] in visuals else 'No; text sufficient'
  if (c,n) in [(4,14),(7,12)]:visual='Removed decorative pairing'
  counts[classification]+=1;per[c][classification]+=1
  def clean(x):return str(x).replace('|','/').replace('\n',' ')
  rows.append('| '+' | '.join(map(clean,[c,q['id'],lang.upper(),classification,problem,action,standard,visual]))+' |')
summary=['| Chapter | KEEP records | CORRECT records | REWRITE records | REPLACE records | Revised pairs | Final Easy/Medium/Hard per language |','|---|---:|---:|---:|---:|---:|---|']
for c in range(1,10):
 d=collections.Counter(q['difficulty'] for b in final if b['chapter']==c and b['lang']=='dlp' for q in b['questions']);summary.append(f'| {c} | '+ ' | '.join(str(per[c][k]) for k in ['KEEP','CORRECT','REWRITE','REPLACE'])+f' | {sum(1 for cc,n in pairchanges if cc==c)} | {d["Easy"]}/{d["Medium"]}/{d["Hard"]} |')
header=f'''# Science Form 1 quiz re-audit — PR #65

This report supersedes the initial 2026-10-13 review. Audit branch: `audit/science-f1-quizzes-visuals-2026-10-13`. Baseline head: `1e7a94cd6a0a304e82a6554fa713f0c8156d3113`; original base: `d266d9f483c9f61ea097ebfb6026074a819d18d4`.

## Scope and decision accounting

All **270 numbered pairs / 540 BM+DLP records** were read, including stems, four options, marked answers and explanations. Retained 30 records per chapter per language and every ID. Decisions below describe **this re-audit relative to the original PR head**, excluding presentation-only changes from question revision counts. KEEP means no additional repair was identified; it is not an independent textbook-verification stamp. CORRECT includes difficulty changes and answer-position corrections. These are editorial judgements, not measured item-discrimination statistics.

- This re-audit changes **{len(pairchanges)} pairs / {sum(len(v) for v in revisions.values())} records**.
- Classification totals: **{dict(counts)}** (540 records).
- The entire PR now differs from its original base at **{len(basechanges)} pairs / {len(basechanges)*2} records**.
- Original PR count verified by executing the TypeScript exports at both Git revisions: **15 pairs / 30 records**, not 14. Original pairs: C3 Q25/Q28; C4 Q13/Q22/Q30; C5 Q29/Q30; C6 Q28/Q29; C7 Q26/Q30; C8 Q26/Q30; C9 Q28/Q30.

{chr(10).join(summary)}

## Sources and verification boundaries

Primary local sources inspected: `T1 BT SN- SAINS.pdf` (BM Form 1 textbook, Downloads) and `DSKP.pdf` (Science Form 1 curriculum, Downloads). BM textbook printed-page numbers are PDF indices + 10. DSKP mapping was read from its learning-standard tables (PDF pp. 51–57, 60–67, 70–75, 78–82, 85–88).

BM pages inspected for this audit include 12–13; 72–83; 89–95, 100, 103–106, 108, 110, 112, 114, 116–118, 120, 124–127, 129–130; 141–142, 147, 149–150, 152–156; 164–167, 169–170, 178, 182, 184–186; 204–205, 207–211; 228–234, 237, 239–240, 242, 244, 246–247; 256–257, 260, 262–273. This is a documented source sample supporting corrections, **not a claim of a page-by-page source check for every retained question**. Chapter 1's established canonical audit and Chapter 2's paired bank remain authoritative in the repository.

DLP cross-check: [school-library facsimile of Science Form 1](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), specifically the Chapter 3 cold response/snail passage, Chapter 7 extinguishing methods and Chapter 9 mantle-convection explanation. Both language banks were compared semantically throughout; full independent DLP textbook verification for every retained sentence remains a limitation. No scientific source conflict was resolved by inventing a new factual rule.

The row-level DSKP/SP column is an editorial assessment alignment, not metadata inserted into the learner question. Chapter 2 uses its existing canonical `sp`. Where an item combines skills, both standards are shown. Thirty questions sample each chapter; they do **not** certify every DSKP standard. Practical performance, presentations, attitudes, some health topics, ocean stratification/hydrothermal processes and detailed filter tasks are not exhaustively assessed by this MCQ bank.

## Scientific and pedagogical corrections

- C3 Q18's previous explanation grouped shivering with heat-loss reduction. Shivering generates heat; constriction/erect hairs reduce loss. Corrected the explanation and related response alternatives. Snail wording now follows source fluid rather than introducing a narrower secretion claim. Related human/plant response distractors replace irrelevant alternatives.
- C2 Q24 explanation no longer depends on the original option position; its answer, SP, canonical pair and blueprint are unchanged.
- C4 adds a controlled seed-germination comparison and improves spore identification and embryo/implantation sequence. Existing blocked-tube and ovule-to-seed problems remain. Hypothetical assessment setups are not represented as measured textbook data.
- C5 separates container shape/volume, diffusion comparison, heat during a plateau and physical/chemical change. Removes the unsupported surface-only addition from the evaporation explanation; the verified chapter statement is used. Avoids gas/vapour as competing synonymous answers.
- C6 chromatography asks what separated spots imply, rather than merely naming the apparatus. Electron wording does not add shell structure. Difficulty reflects the actual demand.
- C7 combustion includes heating, oxygen, heat and light. CO₂ cooling is explicitly framed as the textbook technique rather than claiming a universal extinguisher mechanism. Carbon-monoxide effect follows the chapter. Candle, forest-clearing and acid-rain questions require controlled comparison or linked reasoning. Removes unsupported carbonate-reaction detail.
- C8 reflection now distinguishes angles measured from the normal versus the surface; refraction explanations omit unsourced speed rules. Periscope tests repeated reflection. Spectrum alternatives all contain the seven colours. Scattering assesses blue-sky/sunset contrast without introducing wavelength theory.
- C9 removes advanced elastic-rebound/seismic-energy teaching and unexplained NTU values. Uses mantle convection and a qualitative mining/runoff scenario. Balances stored correct positions **8/8/7/7**, with matching BM/DLP meaning. Related alternatives and more balanced wording reduce length cues. Runtime shuffling is unchanged.

No existing numeric correct-answer index was found to select a different scientifically correct answer after option remapping. The main scientific error corrected was the C3 heat-generation/heat-loss explanation; other repairs concern scope, precision, ambiguity, distractors and reasoning. This is not a claim that author judgement replaces classroom item analysis.

Difficulty changes: { '; '.join(difficulty) }.

Revised option wording (not merely C9 permutation): { ', '.join(distractors) }.

Repeated foundational concepts are retained when demand differs: C1 displacement vs density; C3 individual temperature mechanisms vs combined response; C4 fertilisation vs implantation/development; C8 law recall vs angle-reference error. Replaced C5 diffusion repetition with a controlled-condition interpretation. Some recall remains intentionally Easy; no quota is used to relabel it Hard.

## Registry, rendering and shuffle contract

Removed image-decoration cloning from `getChapterQuizQuestions`; canonical object identity is preserved and the original C1 `toBe()` assertion remains intact. The route resolves the same shared visual map through `ScienceF1QuizVisual` at presentation time. It handles questions without IDs, leaves existing images and other subject visual paths intact, and supplies localised stimulus descriptions. No factual bank is duplicated.

The actual route tests render BM and DLP measurement questions, including the quiz portal. Their assertion searches the rendered document, not the detached root container. Existing timer, Shuffle, Redo, difficulty-filter, completion and progress mocks remain covered. All 540 records are checked through option permutations for correct-answer/explanation preservation and source immutability. Runtime question/option shuffle, XP, timer, scores, history and authentication code were not changed.

## Visual inventory and pairing decisions

**14 retained SVGs, 19 question pairs / 38 language mappings**. Removed the unused A/B/C fire triangle asset and its C7 Q12 pairing; removed the decorative flower from C4 Q14 but retained its ovule stimulus for Q30. No photos were added.

| Asset | Paired questions | Review and correction |
|---|---|---|
| measurement | C1 Q4, Q18 | Equal-width cylinders; water heights proportional to 50/65; distinct before/after captions; density vs displacement demand differs. |
| leaf-light | C2 Q18 | Clearly opaque covered patch and light, bilingual labels; no starch-result answer shown. |
| stoma | C3 Q15, Q25 | Guard-cell/pore geometry; removed chloroplast-like marks outside guard cells; supports structure/function, not answer text. |
| flower | C4 Q30 | Section with six ovules, no four-seed answer; removed face-on radial petals. |
| particles | C5 Q9, Q11 | Same 12 equal particles in all states, ordered/irregular/spaced arrangement; no false quantity/type change. |
| heating-curve | C5 Q22 | Conceptual unnumbered plateau; larger labels, no invented temperatures or answer explanation. |
| chromatography | C6 Q24 | Baseline above solvent, four spots; question requires interpretation of dyes, not naming image. |
| mirror | C8 Q8 | Correct facing reflective surface and 2 m object distance; image position omitted. |
| reflection | C8 Q17, Q18 | Normal perpendicular to mirror; incident ray and true 35° arc measured from normal; outgoing answer omitted. |
| refraction-glass | C8 Q19 | Incoming air-to-glass ray, labelled media and normal; outgoing answer omitted. |
| refraction-water | C8 Q20 | Water correctly below surface; ray travels upward to air; non-extreme incidence; outgoing answer omitted. |
| periscope | C8 Q25 | Two parallel 45° mirrors, two reflections and directed A-to-B path. |
| earth-layers | C9 Q9, Q12 | Four concentric regions, not five; thin crust and consistent A–D leaders; explicitly not to scale. |
| plates | C9 Q28 | Converging arrows match revised tectonic question; larger bilingual label. |

All retained SVGs were rasterised and inspected together at desktop and 320-pixel diagram widths. Captions touching apparatus were moved down with a taller viewBox; scientific geometry is shared by BM/DLP. A raster contact sheet is not a browser screenshot. Browser tools returned no available browser, so **real-browser desktop/mobile quiz QA remains outstanding**; jsdom live-route tests do verify that the student component requests the correct images in both languages. No unsupported claim of manual browser verification is made.

## Validation and deployment investigation

VALIDATION_PLACEHOLDER

The original PR's Vercel bot metadata reports `rootDirectory: silken-sheen-main`. That nested folder exists but contains a separate old package (`build: vite build`), while the audited source and current build scripts are at repository root. This is a concrete configuration mismatch with the code being reviewed. The original PR also had successful Cloudflare Pages previews. Vercel build logs were not accessible through the available browser session, so **the exact failing build step is not proven**; do not blame quiz data or call the deployment fixed. No speculative deployment setting change was made. Confirm the intended Vercel project root/build adapter in the deployment dashboard before release.

## Complete question-by-question decisions

Each BM and DLP record has its own row. Visual-only edits are recorded in the final column; they do not inflate revised-question totals.

| Chapter | Question ID | BM/DLP | Classification | Problem | Action | DSKP/SP | Visual needed? |
|---|---|---|---|---|---|---|---|
'''
Path('docs/science-f1-quiz-reaudit-2026-10-13.md').write_text(header+'\n'.join(rows)+'\n',encoding='utf-8')
print(dict(counts),'revised pairs',len(pairchanges),'whole PR',len(basechanges),'rows',len(rows))
(T/'science-f1-pr65-counts.json').write_text(json.dumps({'counts':dict(counts),'revisedPairs':len(pairchanges),'wholePrPairs':len(basechanges)}))
