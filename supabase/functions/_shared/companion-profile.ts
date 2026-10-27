// The student's answer-derived personality profile: one source for the Cosmic Identity screen,
// the matcher and its explanations. Contains no companion catalogue, so it is safe to ship to
// the browser without revealing which companions a student will be matched with.
import { validNovaAnswer } from "./nova-answers.ts";

export const PERSONALITIES = ["Explorer", "Nurturer", "Strategist", "Guardian"] as const;
export type Personality = (typeof PERSONALITIES)[number];

type Weights = Partial<Record<Personality, number>>;
/**
 * What each option of a personality question supports, in option order. An option supports a
 * personality only where its wording does; options that fit none carry no signal. Rationale
 * for every mapping: docs/cosmic-companion-matching.md, "Answer mappings".
 */
export const PERSONALITY_SIGNALS: { question: number; options: readonly Weights[] }[] = [
  // "What draws you into an adventure?" (the student's own motivation; strongest signal)
  { question: 0, options: [{ Explorer: 4 }, { Nurturer: 4 }, { Strategist: 4 }, { Guardian: 4 }] },
  // "When a challenge appears, you…" "Trust your instincts" describes how a decision is
  // made, not a personality, so it carries no personality signal.
  { question: 10, options: [{ Explorer: 2 }, { Nurturer: 2 }, { Strategist: 2 }, {}] },
  // "How does your companion greet a stranger?" (the temperament wanted in a companion)
  {
    question: 7,
    options: [{ Explorer: 2 }, { Nurturer: 2 }, { Strategist: 2 }, { Guardian: 1, Nurturer: 1 }],
  },
  // "Choose your bond." "Inspire each other" is mutual encouragement shared by every
  // personality, so it carries no personality signal.
  { question: 11, options: [{ Explorer: 2 }, { Nurturer: 2 }, { Guardian: 2 }, {}] },
];
/** Order used to settle a tie between equally supported personalities. */
const DOMINANCE_ORDER = [0, 10, 7, 11] as const;

/** Answer-derived support for each personality. Answers must already be valid. */
export function personalityScores(answers: readonly number[]): Record<Personality, number> {
  const scores: Record<Personality, number> = {
    Explorer: 0,
    Nurturer: 0,
    Strategist: 0,
    Guardian: 0,
  };
  for (const s of PERSONALITY_SIGNALS)
    for (const [p, w] of Object.entries(s.options[answers[s.question]]))
      scores[p as Personality] += w;
  return scores;
}

/**
 * The most supported personality. Ties go to the personality named by the earliest answer in
 * DOMINANCE_ORDER (adventure, challenge, greeting, bond).
 */
export function dominantPersonality(
  answers: readonly number[],
  scores: Record<Personality, number> = personalityScores(answers),
): Personality {
  const top = Math.max(...Object.values(scores));
  const tied = PERSONALITIES.filter((p) => scores[p] === top);
  for (const question of DOMINANCE_ORDER) {
    const named = PERSONALITY_SIGNALS.find((s) => s.question === question)!.options[
      answers[question]
    ];
    const pick = tied.find((p) => (named[p] ?? 0) > 0);
    if (pick) return pick;
  }
  return tied[0];
}

/** The dominant personality of a complete, valid set of 12 answers; otherwise null. */
export function profilePersonality(answers: readonly number[]): Personality | null {
  if (answers.length !== 12 || answers.some((a, i) => !validNovaAnswer(i, a))) return null;
  return dominantPersonality(answers);
}
