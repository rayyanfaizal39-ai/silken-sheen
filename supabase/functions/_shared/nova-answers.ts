// Stable persisted codes: 2 is a retired Phoenix answer and must never be reused.
export const NOVA_CREATURES = ["Phoenix", "Magical Fox", "Dragon", "Lion", "Unicorn"] as const;
const CREATURE_ANSWERS = [0, 1, 3, 4, 5] as const;

/** Convert a visible choice into its durable identity code. */
export function answerValue(question: number, option: number) {
  return question === 1 ? CREATURE_ANSWERS[option] : option;
}

/** Convert a durable answer into its visible choice, including legacy Phoenix. */
export function answerOptionIndex(question: number, answer: number) {
  return question === 1
    ? answer === 2
      ? 0
      : CREATURE_ANSWERS.indexOf(answer as (typeof CREATURE_ANSWERS)[number])
    : answer;
}

export function validNovaAnswer(question: number, answer: number) {
  return (
    Number.isInteger(question) &&
    question >= 0 &&
    question < 12 &&
    Number.isInteger(answer) &&
    answer >= 0 &&
    answer <= (question === 1 ? 5 : 3)
  );
}
