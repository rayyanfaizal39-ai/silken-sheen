import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Optional study metadata for flashcards that are organised into review modes
 * inside a subtopic (Form 2 Maths Chapter 1 today). Cards without it keep the
 * plain front/back behaviour used by every other subject.
 */
export type FlashcardReviewMode = "concept" | "practice" | "challenge";

export const FLASHCARD_REVIEW_MODES: readonly FlashcardReviewMode[] = [
  "concept",
  "practice",
  "challenge",
];

/**
 * A question with optional parts and visuals, and a worked solution with one
 * group of lines per part. Text uses plain Unicode maths (T₈, n², −5); there
 * is never HTML in it.
 */
export interface StructuredFlashcard {
  prompt: string;
  /** (a), (b), (c) … in order; the labels are added when rendering. */
  parts?: string[];
  visuals?: MathQuestionVisual[];
  /** One group per part (or a single group when there are no parts). */
  answer: string[][];
  answerVisuals?: MathQuestionVisual[];
  /** A short common-error or check note shown under the solution. */
  note?: string;
}

export interface FlashcardStudyMeta {
  /** KSSM subtopic number, e.g. "1.2". */
  subtopic?: string;
  reviewMode?: FlashcardReviewMode;
  structured?: StructuredFlashcard;
}

/** Keeps "n = 14" on one line so an answer never wraps straight after "=". */
export function mathText(text: string) {
  return text.replace(/ = /g, " = ");
}

export const PART_LABELS = ["a", "b", "c", "d"] as const;

export function partLabel(index: number) {
  return `(${PART_LABELS[index] ?? String(index + 1)})`;
}

/** Plain-text front, used for search, accessibility fallbacks and audits. */
export function structuredFront(card: StructuredFlashcard) {
  return [
    card.prompt,
    ...(card.parts ?? []).map((part, index) => `${partLabel(index)} ${part}`),
  ].join("\n");
}

/** Plain-text back: every line of the worked solution, labelled by part. */
export function structuredBack(card: StructuredFlashcard) {
  const multi = (card.parts?.length ?? 0) > 0;
  const lines = card.answer.flatMap((group, index) =>
    group.map((line, lineIndex) =>
      multi && lineIndex === 0 ? `${partLabel(index)} ${line}` : line,
    ),
  );
  return [...lines, ...(card.note ? [card.note] : [])].join("\n");
}

/**
 * The review modes available for a set of cards, in teaching order, or []
 * when the set is not organised into modes (every card must carry one).
 */
export function getReviewModes(cards: readonly FlashcardStudyMeta[]): FlashcardReviewMode[] {
  if (cards.length === 0 || cards.some((card) => !card.reviewMode)) return [];
  return FLASHCARD_REVIEW_MODES.filter((mode) => cards.some((card) => card.reviewMode === mode));
}

export function cardsForReviewMode<T extends FlashcardStudyMeta>(
  cards: readonly T[],
  mode: FlashcardReviewMode,
): T[] {
  return cards.filter((card) => card.reviewMode === mode);
}

export function normalizeReviewModeParam(value: unknown): FlashcardReviewMode | null {
  return typeof value === "string" && (FLASHCARD_REVIEW_MODES as readonly string[]).includes(value)
    ? (value as FlashcardReviewMode)
    : null;
}

export const REVIEW_MODE_COPY: Record<
  FlashcardReviewMode,
  { icon: string; bm: { title: string; purpose: string }; dlp: { title: string; purpose: string } }
> = {
  concept: {
    icon: "◆",
    dlp: {
      title: "Concept Review",
      purpose: "Recognise the pattern from a visual or a short list.",
    },
    bm: {
      title: "Ulang Kaji Konsep",
      purpose: "Kenal pasti corak daripada visual atau senarai ringkas.",
    },
  },
  practice: {
    icon: "✎",
    dlp: {
      title: "Practice Review",
      purpose: "Short structured questions with one or two calculation steps.",
    },
    bm: {
      title: "Ulang Kaji Latihan",
      purpose: "Soalan berstruktur pendek dengan satu atau dua langkah pengiraan.",
    },
  },
  challenge: {
    icon: "★",
    dlp: {
      title: "Challenge Review",
      purpose: "Multi-step problems with diagrams, reasoning and error analysis.",
    },
    bm: {
      title: "Ulang Kaji Cabaran",
      purpose: "Masalah pelbagai langkah dengan rajah, penaakulan dan analisis kesilapan.",
    },
  },
};
