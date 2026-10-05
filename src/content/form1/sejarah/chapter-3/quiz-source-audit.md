# Sejarah Form 1 Bab 3 quiz audit and selective repair

## Pre-edit audit

Baseline: `ef300d10`. Audited the **actual live** Chapter 3 records before editing. The route reads the registry, which reads `src/data/content.ts`; the older `src/data/quizzes.ts` copy is different. The user’s listed concerns mostly describe that older copy. Preserve strong live questions rather than restoring weaker obsolete ones.

Source: `prompts/T1 BT SEJ - SEJARAH.pdf`, printed pp. 44–72. Extracted the chapter text; visually inspected printed pp. 47, 53, 63, 66 and 69 to verify labelled tools, microliths, burial interpretation, Malaysian metal evidence and burial locations.

The actual live bank is **8 Easy, 15 Medium, 7 Hard**, with answer-index distribution A/B/C/D = **7/7/8/8**. The stale copy is all Medium. Preserve all live per-ID metadata and combined Sejarah completion behavior; no XP/catalog/shuffle change.

| Q | Decision | Source check / necessary action |
|---|---|---|
| 1 | CORRECT | Exact definition; remove archaeology-only claim. |
| 2 | KEEP | Sound chronology and three Stone Age stages. |
| 3 | CORRECT | Keep rough/simple tool choices; use direct source description instead of an extra manufacturing explanation. |
| 4 | KEEP | Zhoukoudian and Peking Man verified. |
| 5 | KEEP | Ritual and star observation verified; no stronger astronomy claim. |
| 6 | KEEP | Kota Tampan workshop confirmed; live stem has no superlative. |
| 7 | CORRECT | Replace protein explanation with source forest gathering, hunting and fishing. |
| 8 | KEEP | Settled Neolithic life linked to agriculture and husbandry. |
| 9 | KEEP | Barter definition and surplus explanation supported. |
| 10 | REPLACE | Repeated barter-limitation scenario replaced with an artefact/ecofact application; obsolete Bukit Tengkorak claim not found in chapter. |
| 11 | KEEP | Bronze and iron technologies verified. |
| 12 | KEEP | Live evidence-inference question already avoids Perak Man superlative. |
| 13 | KEEP | Animism concept and explanation match source. |
| 14 | REWRITE | Preserve social-organisation reasoning, cover source Metal Age administration instead of another Neolithic lifestyle item. |
| 15 | KEEP | Live bronze-bell/drum trade question confirmed; no Sungai Lang ritual/status claim. |
| 16 | KEEP | Neolithic refinement supported by tool-making activity and polished-tool evidence. |
| 17 | KEEP | Self-contained ecofact/food-economy inference; stronger than pure Chauvet location recall. |
| 18 | REWRITE | Equipment and food in burials explicitly support life-after-death belief. |
| 19 | KEEP | Nomadic movement to find food supported. |
| 20 | REWRITE | Use verified Klang metal-tool evidence; do not connect socketed iron to Lembah Bernam. |
| 21 | KEEP | Shahr-i-Sokhta functional zones and organised life verified. |
| 22 | CORRECT | Complete source microlith description: small, thin, sharp serrated edge; no harpoon claim. |
| 23 | CORRECT | Retain pottery continuity scenario without unsourced water-storage detail. |
| 24 | KEEP | Live decorated-bronze question already teaches aesthetics without bundled megaliths. |
| 25 | REPLACE | Weak generic evidence item duplicates q12; add missing regional Hoabinhian terminology in a museum-label application. |
| 26 | KEEP | Strong tool-function continuity inference. |
| 27 | KEEP | Neolithic cultivation/husbandry continuity, not a single invention. |
| 28 | CORRECT | Use the verified stone-slab-burial location rather than extrapolated construction detail. |
| 29 | REPLACE | Repeated food-production comparison replaced with missing source sailing concept; obsolete Catal Huyuk roof-entry trivia removed with duplicate bank. |
| 30 | KEEP | Strong preservation scenario; obsolete treasure-hunting distractors are not retained. |

KEEP means the entire live record remains unchanged. CORRECT retains the concept and fixes wording/explanation scope; REWRITE improves the existing conceptual task; REPLACE reallocates a repetitive or weak slot. These decisions were recorded before changing the bank.

## Validation

Pending implementation and final checks.
