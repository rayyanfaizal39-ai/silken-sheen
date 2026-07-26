import type { QuizQuestion } from "@/data/types";
import { normaliseQuestionForComparison } from "./normaliseImportedQuiz";
import type { ImportedQuizQuestion, QuizDuplicateMatch } from "./types";

function tokens(value: string) {
  return new Set(normaliseQuestionForComparison(value).split(" ").filter(Boolean));
}

function tokenSimilarity(left: string, right: string) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function bigrams(value: string) {
  const normalised = normaliseQuestionForComparison(value).replace(/\s+/g, " ");
  const result = new Map<string, number>();
  for (let index = 0; index < normalised.length - 1; index += 1) {
    const pair = normalised.slice(index, index + 2);
    result.set(pair, (result.get(pair) ?? 0) + 1);
  }
  return result;
}

function diceSimilarity(left: string, right: string) {
  const a = bigrams(left);
  const b = bigrams(right);
  const aCount = Array.from(a.values()).reduce((sum, value) => sum + value, 0);
  const bCount = Array.from(b.values()).reduce((sum, value) => sum + value, 0);
  if (!aCount || !bCount) return 0;
  let intersection = 0;
  for (const [pair, count] of a) intersection += Math.min(count, b.get(pair) ?? 0);
  return (2 * intersection) / (aCount + bCount);
}

export function questionSimilarity(left: string, right: string) {
  const a = normaliseQuestionForComparison(left);
  const b = normaliseQuestionForComparison(right);
  if (a === b && a.length > 0) return 1;
  return Math.max(tokenSimilarity(a, b), diceSimilarity(a, b));
}

export function detectQuizDuplicates(
  imported: ImportedQuizQuestion[],
  existing: Pick<QuizQuestion, "id" | "question">[] = [],
  nearThreshold = 0.78,
): QuizDuplicateMatch[] {
  const matches: QuizDuplicateMatch[] = [];
  imported.forEach((question, index) => {
    if (!question.question.trim()) return;
    const candidates = [
      ...existing.map((candidate) => ({ ...candidate, source: "existing" as const })),
      ...imported.slice(0, index).map((candidate) => ({
        id: candidate.id,
        question: candidate.question,
        source: "import" as const,
      })),
    ];
    let best: QuizDuplicateMatch | null = null;
    for (const candidate of candidates) {
      const similarity = questionSimilarity(question.question, candidate.question);
      const isExact = similarity === 1;
      const isNear =
        !isExact &&
        similarity >= nearThreshold &&
        normaliseQuestionForComparison(question.question).length >= 18;
      if (!isExact && !isNear) continue;
      const match: QuizDuplicateMatch = {
        questionId: question.id,
        matchedQuestionId: candidate.id,
        matchedQuestion: candidate.question,
        source: candidate.source,
        kind: isExact ? "exact" : "near",
        similarity,
      };
      if (!best || match.similarity > best.similarity) best = match;
    }
    if (best) matches.push(best);
  });
  return matches;
}
