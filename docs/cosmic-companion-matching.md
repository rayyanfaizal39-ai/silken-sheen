# Cosmic Companion matching engine (Phase 1.1)

Status: matching logic and tests only. Nothing here is wired to the database, the Studio, the
reveal screens or artwork generation yet. `cc-matcher-v1` and `cc-catalogue-v1` become
immutable once they are approved and committed.

| File                                                | Purpose                                                                    |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| `supabase/functions/_shared/companion-catalogue.ts` | Versioned, reviewed archetype catalogue (`cc-catalogue-v1`, 20 archetypes) |
| `supabase/functions/_shared/companion-matcher.ts`   | Pure matcher (`cc-matcher-v1`): 12 answers → two candidate specifications  |
| `supabase/functions/_shared/content-fingerprint.ts` | Canonical JSON, synchronous SHA-256 and a tie-break hash                   |
| `src/features/nova-cards/companion-matcher.test.ts` | Rules, mappings, determinism, golden fingerprints and an exhaustive sweep  |

The modules live in `_shared` so the trusted app server and Deno workers run the same code.
They have no imports beyond `nova-answers.ts`, and use no randomness, clock, network or AI.

## What it does not change

- The 12 questions, their options and the stored answer codes.
- The live identity (`traitsFromAnswers` and SQL `nova_traits`). The matcher reads answers
  independently; a test keeps its option text identical to `QUESTIONS`.
- Submission, selection, scheduling, the Studio UI and the fictional preview data.

## Inputs

The student's 12 answers as stored (durable codes). Question 2 (creature) uses codes
0, 1, 3, 4, 5. **Code 2 is the retired Phoenix answer** and is read as Phoenix through
`answerOptionIndex`. Anything else (wrong length, non-integers, out-of-range codes) throws
`CompanionMatchError("invalid_answers")`.

## Answer mappings

Only nine answers can change which companions are chosen. Q5 (colours), Q9 (eyes) and Q10
(signature detail) only personalise the look. Question numbers are 1-based.

An option supports a personality or element only where its wording does. Options that fit
none carry no signal rather than a forced one.

### Personality

| Question                                                                                   | Option → support                                                                                                                                | Rationale                                                                                                                                                      |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1 "What draws you into an adventure?" (×4, the student's own motivation)                  | Discovering something new → Explorer · Helping a friend → Nurturer · Solving a mystery → Strategist · Protecting something precious → Guardian  | Each option names one motivation directly; this is also the live identity's personality.                                                                       |
| Q11 "When a challenge appears, you…" (×2)                                                  | Try a new path → Explorer · Bring friends together → Nurturer · Pause and make a plan → Strategist · **Trust your instincts → none**            | "Trust your instincts" describes how a decision is made, not a personality; mapping it to Guardian (v0) had no textual basis.                                  |
| Q8 "How does your companion greet a stranger?" (×2, the temperament wanted in a companion) | Curious and playful → Explorer · Gentle and patient → Nurturer · Quiet and watchful → Strategist · Bold and welcoming → Guardian 1 + Nurturer 1 | "Quiet and watchful" is observation before action. "Bold and welcoming" combines courage (Guardian) and warmth (Nurturer), so it supports both at half weight. |
| Q12 "Choose your bond." (×2)                                                               | Explore together → Explorer · Grow together → Nurturer · Protect each other → Guardian · **Inspire each other → none**                          | Mutual inspiration fits every personality; mapping it to Strategist (v0) had no textual basis.                                                                 |

Because only defensible mappings count, maximum support differs: Explorer 10, Nurturer 10,
Strategist 8, Guardian 7. Across all answer combinations the **dominant** personality is still
near-even: Explorer 25.4%, Nurturer 26.6%, Guardian 24.2%, Strategist 23.8%.

**Dominant personality** is the most supported personality. A tie goes to the personality
named by the earliest answer in this order: adventure, challenge, greeting, bond. The adventure
answer (4 points) always takes part in any tie at the top, because the other answers add at
most 6 points between them, so in practice Q1 settles every tie.

### Element

| Question                                | Option → support                                                                                                                 | Rationale                                                                                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q3 "Which element feels like you?" (×6) | Each option → its element                                                                                                        | Explicit choice.                                                                                                                                    |
| Q6 "Which gift would you choose?"       | **Light the way → Fire 1 + Starlight 1** · Healing currents → Water 2 · Stellar shield → Starlight 2 · Winds of courage → Wind 2 | "Light" names light, not its source: it fits a flame and a star equally. (v0 mapped it to Fire alone.)                                              |
| Q7 "Where would you explore together?"  | Moonlit lagoon → Water 1 · Floating islands → Wind 1 · **Ancient sky gardens → Wind 1** · **Crystal forest → none**              | A lagoon is water; both sky places are in the open air. Nothing in "Ancient sky gardens" suggests fire (v0), and "Crystal forest" names no element. |
| Q2 creature, Q4 silhouette              | Species; body shape (soft, sleek, sturdy, graceful)                                                                              | Direct.                                                                                                                                             |

## Two independent matches

All scores are integers. Ties break on a stable FNV-1a hash of the matcher version, catalogue
version, the nine selection answers (as visible choices, so legacy code 2 equals Phoenix) and
the archetype ID, then on the ID.

**Companion A: preference match.** Score = species match ×1000 + element affinity ×25

- personality ×6 + matching silhouette ×10. The chosen element always has at least 6 points
  and any other at most 3, a gap of at least 75, while personality and silhouette add at most 70.
  With all 20 creature-and-element pairs in v1, **A is exactly the student's chosen creature
  and element**. Personality and silhouette only affect selection in a catalogue with gaps;
  the silhouette answer is still carried into A's personalisation (below).

**Companion B: kindred spirit match.** B must be a different species **and** a different
element from A; this is a filter, not a weight. Score = personality ×100 + dominant
personality ×50 + element affinity ×4 + matching silhouette ×1. One personality point outweighs
everything after it, and the dominant bonus outweighs element and silhouette. So B always
carries the student's dominant personality. Each personality has five companions, one per
species and at most two per element, so excluding A's species and element still leaves at least
two companions of the dominant personality.

**Fallbacks** (only reachable with a future or reduced catalogue; tested with reduced copies):

- **Missing element.** A keeps the creature and says so: "You picked Wind, but no Dragon in
  this collection carries Wind yet…".
- **Missing creature.** A falls back on element and personality and says so.
- **Only one element left.** If every other species shares A's element, B keeps a different
  species only.
- **Fewer than two species.** `validateCatalogue` rejects the catalogue.

## Explanations

Every reason is built from the student's actual answers and records `answerIndexes`. Quoted
text is always the student's own option text. There are no percentages, scores or
psychological claims, and tests enforce this. Personality is described as the companion's
("Lumi has an Explorer spirit"), followed by up to two answers that support it. Where none do,
it is "a different strength", never a match.

## Personalisation and identity

Both companions keep their canonical anatomy, face shape and signature feature.

- **Companion A** uses the student's colours as its main palette, plus their chosen eyes and
  signature detail. It also carries the chosen silhouette (Q4) as
  `personalisation.silhouette`: a styling preference for pose and fur, feather or scale
  texture only. It never changes the archetype's canonical proportions or species anatomy,
  and the `rule` text says so.
- **Companion B** keeps its own palette, eyes, markings and body styling, with the student's
  colours as accents only (`silhouette`, `eyes` and `signatureDetail` are `null`).

All twelve answers also stay stored with the card, so any answer remains available to later
phases.

## Output format

```ts
CompanionMatch {
  matcherVersion: "cc-matcher-v1";
  catalogueVersion: "cc-catalogue-v1";
  inputFingerprint: string;          // SHA-256 of versions + answers
  candidates: [CompanionCandidateSpec /* a */, CompanionCandidateSpec /* b */];
}
CompanionCandidateSpec {
  schema: "cosmic-companion-candidate/1";
  matcherVersion; catalogueVersion;
  slot: "a" | "b";
  kind: "preference" | "kindred";
  candidateId: string;               // "cc1-<slot>-<first 20 hex of fingerprint>"
  archetypeId; name; species; element; personality;
  strengths; learningStyle; tagline; description; story; traits; abilities;
  match: { headline; reasons: { basis; text; answerIndexes }[] };
  visual: {
    style;
    canonical: { proportions; silhouette; face; eyes; markings; signatureFeature; palette };
    personalisation: { paletteRole: "main" | "accent"; palette; eyes; silhouette; signatureDetail; rule };
  };
  inputFingerprint: string;
  fingerprint: string;               // SHA-256 of canonical JSON of all fields except the two IDs
}
```

Specifications are plain JSON. `verifyCandidateFingerprint` detects any edit to a stored
specification. Student answers are not copied into the specification.

## Versioning rules

- Archetype IDs are permanent and never reused.
- A published archetype's identity fields are never edited in place; a golden test guards v1.
  Changes mean a new catalogue version, and new submissions use it.
- **Matching happens once, at submission, on the trusted server.** The result is stored.
  Stored specifications are never recomputed, so a later catalogue or matcher change cannot
  alter an existing student's companions. Artwork regeneration reads the stored
  specification, never the matcher.
- Clients must never supply or be trusted for specifications (Phase 2: worker-only write).

## Catalogue v1 coverage

20 archetypes: every creature-and-element pair exactly once. Each creature has all four
personalities; each element, personality and body shape appears five times.

|                 | Fire                 | Water              | Starlight          | Wind              |
| --------------- | -------------------- | ------------------ | ------------------ | ----------------- |
| **Magical Fox** | Saffron · Strategist | Mira · Nurturer    | Lumi · Explorer    | Bayu · Guardian   |
| **Phoenix**     | Seri · Nurturer      | Tasik · Strategist | Astra · Guardian   | Zephy · Explorer  |
| **Dragon**      | Blaze · Guardian     | Coral · Strategist | Comet · Explorer   | Mochi · Nurturer  |
| **Lion**        | Ember · Explorer     | Embun · Nurturer   | Orion · Strategist | Sol · Guardian    |
| **Unicorn**     | Spark · Explorer     | Brook · Guardian   | Celeste · Nurturer | Aria · Strategist |

Exhaustive sweep of all 327,680 selection-relevant answer combinations:

- **A** keeps both the chosen creature and element 100% of the time; each archetype is A
  exactly 5% of the time.
- **B** never shares A's species or element, and always has the dominant personality.
- Each archetype is B between 3.1% and 8.0% of the time. None is missing and none dominates.
- **All 240 allowed A/B pairs occur.** For each A, 16 companions have another species; 4 of
  those share A's element (one per other species), leaving 12. 20 × 12 = 240.

**B skew.** Among companions of the dominant personality, B prefers elements the answers
support. Fire is supported only by half of "Light the way", while Wind is supported by "Winds
of courage" and two sky habitats. So Fire archetypes appear least as B (3.1–3.5%) and Wind
archetypes most (up to 8.0%). This follows from the honest mappings, not from scoring.
Rebalancing it would mean inventing Fire signals, which the questions don't contain.

## Personality consistency (Phase 3 integration)

**Today:**

- The Cosmic Identity screen (`AwakeningChamber`), `NovaCard`, `EvolutionPreview` and
  `SanctuaryCardPanel` show `traits.personality`. That comes from Q1 only, through
  `traitsFromAnswers` and SQL `nova_traits`, and is frozen into each stored
  `nova-identity-v1` snapshot.
- The matcher uses Q1, Q8, Q11 and Q12. The two agree whenever Q1's personality is dominant.
  They differ only when the other three answers outweigh it, for example "Discovering
  something new" plus three Nurturer answers: Cosmic Identity says Explorer, while the
  matcher's dominant personality and Companion B are Nurturer.

**Recommendation.** One answer-derived profile, with the matcher's `deriveSignals` as the
single source:

1. **Store the profile with the match.** At submission the trusted server stores the match
   plus `{ dominantPersonality, supportingAnswers }` (no raw scores).
2. **Change the label on the Cosmic Identity screen.** "Personality" shows
   `dominantPersonality` from that stored profile. Q1's answer stays visible under its own
   label (for example "Adventure calling: Discovering something new"), so nothing the student
   chose disappears.
3. **Keep existing records unchanged.** Legacy `nova-identity-v1` snapshots keep their Q1
   personality; never recompute stored records. The chamber reads the new profile when
   present and falls back to `traits.personality` otherwise.
4. **Stop duplicating the logic.** SQL `nova_traits` stays for legacy rows only; new
   personality logic is not reimplemented in SQL.
5. **Make the profile match the explanations.** Companion explanations already cite the same
   supporting answers, so the screen and the reveal tell one story.

None of this changes the questions. Phase 3 touches `AwakeningChamber`, the Studio state type
and the server's submission path; it is not changed in Phase 1.1.

## Phase 4: artwork personalisation (not started)

No artwork is generated in Phase 1. When artwork is approved, the generator must:

- **Build prompts only from the stored specification.** Use `visual.style`, `visual.canonical`
  and `visual.personalisation`, never the raw answers or the matcher.
- **Treat the canonical sheet as fixed.** Proportions, silhouette, face, eyes, markings and
  signature feature never change.
- **Apply personalisation within those limits:**
  - palette as main colours (A) or accents (B);
  - A's chosen eyes and signature detail;
  - A's silhouette preference as pose and texture styling only.
- **Keep regenerations consistent** by editing from the approved image rather than generating
  anew.
- **Pass human review** of anatomy fidelity per archetype before release. File validation is
  not a check of art quality.
- **Decide the asset strategy:** a pre-approved library of per-archetype art with
  personalisation layers, per-student generation, or a hybrid.

## Required future correction: reveal timing

The approved rule is **reveal 24 hours after successful submission**. The existing (unapplied)
migration `20261018160100_nova_studio_batch.sql` sets `reveal_after` in `submit_nova_origin` to
the next midnight in Asia/Kuala_Lumpur. That reveals anywhere from a few minutes to 24 hours
after submission. Phase 2 must:

- change it to `now() + interval '24 hours'`, in a new migration rather than an edit to the
  reviewed one;
- update the waiting copy ("Return tomorrow…");
- update the readiness doc and the Waiting Sanctuary countdown tests.

Not changed in Phase 1.1.
