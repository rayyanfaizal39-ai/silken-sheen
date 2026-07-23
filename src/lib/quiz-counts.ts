export type CountableQuizQuestion = {
  id?: string;
  question?: string;
  options?: readonly string[];
};

export function getQuizQuestionIdentity(question: CountableQuizQuestion): string {
  if (question.id) return `id:${question.id}`;
  return `content:${question.question ?? ""}|${(question.options ?? []).join("\u001f")}`;
}

export function getUniqueQuizQuestions<T extends CountableQuizQuestion>(
  questionSets: Iterable<readonly T[] | null | undefined>,
): T[] {
  const unique = new Map<string, T>();

  for (const set of questionSets) {
    for (const question of set ?? []) {
      unique.set(getQuizQuestionIdentity(question), question);
    }
  }

  return [...unique.values()];
}

export function getQuizQuestionCount<T extends CountableQuizQuestion>(
  questionSets: Iterable<readonly T[] | null | undefined>,
): number {
  return getUniqueQuizQuestions(questionSets).length;
}
