type LearningText = string | null | undefined;

const STRUCTURAL_WORDS = [
  "chapter",
  "bab",
  "topic",
  "topik",
  "subtopic",
  "subtopik",
  "concept",
  "konsep",
  "formula",
  "unit",
  "lesson",
  "module",
  "modul",
] as const;

const STRUCTURAL_WORD_PATTERN = STRUCTURAL_WORDS.join("|");
const NUMBER_REFERENCE_PATTERN = String.raw`\d+(?:\.\d+)*`;
const DASH_PATTERN = String.raw`[-–—]`;

const LEADING_STRUCTURAL_PREFIX = new RegExp(
  String.raw`^(${STRUCTURAL_WORD_PATTERN})\s+(${NUMBER_REFERENCE_PATTERN})(?:\s*([:.)\]}]|${DASH_PATTERN})\s*|\s+)`,
  "i",
);
const INLINE_STRUCTURAL_PREFIX = new RegExp(
  String.raw`(?:\bof\s+)?\b(?:${STRUCTURAL_WORD_PATTERN})\s+${NUMBER_REFERENCE_PATTERN}(?:['’]s)?(?:\s*(?:[:.)\]}]|${DASH_PATTERN})\s*|\s+|(?=[?!,;]|$))`,
  "gi",
);
const BRACKETED_INLINE_STRUCTURAL_REFERENCE = new RegExp(
  String.raw`(?:\(\s*|\[\s*|\{\s*)(?:${STRUCTURAL_WORD_PATTERN})\s+${NUMBER_REFERENCE_PATTERN}\s*(?:\)|\]|\})\s*`,
  "gi",
);
const LEADING_DECIMAL_REFERENCE = new RegExp(
  String.raw`^\d+\.\d+(?:\.\d+)*(?:\s*[:)\]}]\s*|\s+${DASH_PATTERN}\s+|\s+)`,
);
const LEADING_INTEGER_REFERENCE = new RegExp(
  String.raw`^\d+(?:\s*[:)\]}]\s*|\.\s+|\s+${DASH_PATTERN}\s+)`,
);
const INLINE_DECIMAL_TOPIC_REFERENCE = /\b\d{1,2}\.\d{1,2}(?:\.\d{1,2})?\s+(?=\p{Lu}\p{Ll}{2})/gu;
const CHAPTER_11_BANKRUPTCY_TOKEN = "__LEARNING_CHAPTER_11_BANKRUPTCY__";

const TRAILING_NAMED_METADATA =
  /\s*(?:[-–—]\s*)?(?:\(\s*|\[\s*|\{\s*)?(?:set|question|card|q)\s*#?\d+(?:\s*\)|\s*\]|\s*\})?\s*$/i;
const TRAILING_COUNT_METADATA =
  /\s*(?:\(\s*|\[\s*|\{\s*)?\d+\s+(?:questions?|cards?|soalan|kad)(?:\s*\)|\s*\]|\s*\})?\s*$/i;
const TRAILING_NUMERIC_REFERENCE =
  /\s*(?:\(\s*\d+(?:\.\d+)*\s*\)|\[\s*\d+(?:\.\d+)*\s*\]|\{\s*\d+(?:\.\d+)*\s*\})\s*$/;

function normalizeInput(text: LearningText): { original: string; value: string } {
  if (typeof text !== "string") return { original: "", value: "" };
  const original = text.trim();
  return { original, value: original };
}

function stripLeadingStructuralPrefix(value: string): string {
  if (/^Chapter\s+11\s+bankruptcy\b/i.test(value)) return value;
  return value.replace(LEADING_STRUCTURAL_PREFIX, "");
}

function stripLeadingNumberReference(value: string): string {
  const decimalMatch = value.match(LEADING_DECIMAL_REFERENCE);
  if (decimalMatch) {
    const nextCharacter = value.slice(decimalMatch[0].length).trimStart().charAt(0);
    if (nextCharacter && /\p{Lu}/u.test(nextCharacter)) {
      return value.slice(decimalMatch[0].length);
    }
  }

  return value.replace(LEADING_INTEGER_REFERENCE, "");
}

function stripInlineCurriculumReferences(value: string): string {
  const protectedValue = value.replace(
    /\bChapter\s+11\s+bankruptcy\b/gi,
    CHAPTER_11_BANKRUPTCY_TOKEN,
  );
  const withoutLabels = protectedValue
    .replace(BRACKETED_INLINE_STRUCTURAL_REFERENCE, "")
    .replace(INLINE_STRUCTURAL_PREFIX, "");

  return withoutLabels
    .replace(INLINE_DECIMAL_TOPIC_REFERENCE, "")
    .replaceAll(CHAPTER_11_BANKRUPTCY_TOKEN, "Chapter 11 bankruptcy");
}

function stripTrailingMetadata(value: string): string {
  let cleaned = value;

  for (let index = 0; index < 4; index += 1) {
    const previous = cleaned;
    cleaned = cleaned
      .replace(TRAILING_NAMED_METADATA, "")
      .replace(TRAILING_COUNT_METADATA, "")
      .replace(TRAILING_NUMERIC_REFERENCE, (match, offset: number) => {
        const precedingCharacter = cleaned.slice(0, offset).trimEnd().slice(-1);
        return /[,=+×÷/{]/.test(precedingCharacter) ? match : "";
      })
      .trim();
    if (cleaned === previous) break;
  }

  return cleaned;
}

function cleanLeftoverPunctuation(value: string): string {
  return value
    .replace(/\(\s*\)|\[\s*\]|\{\s*\}/g, "")
    .replace(/^[\s:;|,\-–—]+/, "")
    .replace(/[\s:;|,\-–—]+$/, "")
    .replace(/\?{2,}/g, "?")
    .replace(/!{2,}/g, "!")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function cleanLearningText(text: LearningText, includeInlineReferences: boolean): string {
  const { original, value } = normalizeInput(text);
  if (!value) return original;

  const beganWithStructuralPrefix =
    LEADING_STRUCTURAL_PREFIX.test(value) && !/^Chapter\s+11\s+bankruptcy\b/i.test(value);
  let cleaned = stripLeadingStructuralPrefix(value);
  cleaned = stripLeadingNumberReference(cleaned);
  if (includeInlineReferences) cleaned = stripInlineCurriculumReferences(cleaned);
  cleaned = stripTrailingMetadata(cleaned);
  cleaned = cleanLeftoverPunctuation(cleaned);
  if (beganWithStructuralPrefix && /^\p{Ll}/u.test(cleaned)) {
    cleaned = cleaned.charAt(0).toLocaleUpperCase() + cleaned.slice(1);
  }

  return cleaned || original;
}

/** Cleans headings, breadcrumbs, chips, set names, and flashcard-front titles. */
export function cleanLearningTitle(text: LearningText): string {
  return cleanLearningText(text, true);
}

/** Cleans complete quiz prompts and the same prompts repeated in review/results views. */
export function cleanLearningQuestion(text: LearningText): string {
  return cleanLearningText(text, true);
}

/** Cleans compact chapter, topic, set, and navigation metadata labels. */
export function cleanLearningLabel(text: LearningText): string {
  return cleanLearningText(text, true);
}
