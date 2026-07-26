import {
  cleanImportedText,
  createImportedOption,
  createImportedQuestion,
} from "./normaliseImportedQuiz";
import type { ImportedQuizOption, ImportedQuizQuestion, QuizParseResult } from "./types";

export const MAX_QUIZ_IMPORT_LENGTH = 250_000;

type RawAnswer = {
  value: unknown;
  fieldName?: string;
};

type DraftQuestion = {
  question: string;
  options: string[];
  answer?: RawAnswer;
  explanation: string;
  warnings: string[];
};

const QUESTION_LABEL = /^(?:#{1,6}\s*)?(?:question|soalan)\s*(?:\d+)?\s*[:.)-]?\s*(.*)$/i;
const ANSWER_LABEL =
  /^(?:\*\*|__)?\s*(?:correct\s*answer|answer|jawapan\s*betul|jawapan)\s*(?:\*\*|__)?\s*[:=-]\s*(.+)$/i;
const EXPLANATION_LABEL =
  /^(?:\*\*|__)?\s*(?:explanation|reason|penjelasan|penerangan)\s*(?:\*\*|__)?\s*[:=-]\s*(.*)$/i;
const OPTION_LABEL = /^(?:[-*+]\s*)?(?:\(([A-Fa-f1-6])\)|([A-Fa-f1-6])[.)])\s*(.+)$/;
const NUMBERED_LINE = /^(?:#{1,6}\s*)?(\d+)[.)]\s+(.+)$/;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function firstDefined(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) return { key, value: record[key] };
  }
  return null;
}

function optionText(value: unknown) {
  if (typeof value === "string" || typeof value === "number")
    return cleanImportedText(String(value));
  const record = asRecord(value);
  if (!record) return "";
  return cleanImportedText(record.text ?? record.label ?? record.value ?? record.answer ?? "");
}

function extractJsonOptions(record: Record<string, unknown>) {
  const candidate = firstDefined(record, ["options", "choices"]);
  const answersCandidate = record.answers;
  const values = Array.isArray(candidate?.value)
    ? candidate.value
    : !candidate && Array.isArray(answersCandidate)
      ? answersCandidate
      : [];
  const options = values.map(optionText);
  let markedCorrectIndex: number | null = null;
  values.forEach((value, index) => {
    const item = asRecord(value);
    if (item && (item.correct === true || item.isCorrect === true || item.is_correct === true)) {
      markedCorrectIndex = markedCorrectIndex === null ? index : -2;
    }
  });
  return { options, markedCorrectIndex };
}

function answerFromJson(
  record: Record<string, unknown>,
  markedCorrectIndex: number | null,
): RawAnswer | undefined {
  if (markedCorrectIndex !== null && markedCorrectIndex >= 0) {
    return { value: markedCorrectIndex, fieldName: "markedOptionIndex" };
  }
  const candidate = firstDefined(record, [
    "correctOptionIndex",
    "correct_option_index",
    "answerIndex",
    "answer_index",
    "correctAnswer",
    "correct_answer",
    "answer",
  ]);
  if (candidate) return { value: candidate.value, fieldName: candidate.key };
  if (record.answers !== undefined && !Array.isArray(record.answers)) {
    return { value: record.answers, fieldName: "answers" };
  }
  if (Array.isArray(record.answers)) {
    const truthyIndexes = record.answers
      .map((value, index) => (value === true ? index : -1))
      .filter((index) => index >= 0);
    if (truthyIndexes.length === 1) {
      return { value: truthyIndexes[0], fieldName: "answersBooleanIndex" };
    }
    if (record.options !== undefined && record.answers.length === 1) {
      return { value: record.answers[0], fieldName: "answers" };
    }
  }
  return undefined;
}

function resolveAnswer(
  answer: RawAnswer | undefined,
  options: ImportedQuizOption[],
): { correctOptionId: string | null; warning?: string } {
  if (!answer || answer.value === null || answer.value === undefined || answer.value === "") {
    return { correctOptionId: null, warning: "No correct answer was supplied." };
  }

  const raw =
    Array.isArray(answer.value) && answer.value.length === 1 ? answer.value[0] : answer.value;
  if (typeof raw === "string") {
    const value = cleanImportedText(raw)
      .replace(/^option\s+/i, "")
      .trim();
    const letter = value.match(/^\(?([A-F])\)?(?:[.)])?$/i);
    if (letter) {
      const index = letter[1].toUpperCase().charCodeAt(0) - 65;
      return options[index]
        ? { correctOptionId: options[index].id }
        : { correctOptionId: null, warning: `Correct answer "${value}" does not match an option.` };
    }
    if (/^\d+$/.test(value)) {
      return resolveNumericAnswer(Number(value), answer.fieldName, options);
    }
    const exactIndex = options.findIndex(
      (option) => option.text.trim().toLocaleLowerCase("ms") === value.toLocaleLowerCase("ms"),
    );
    return exactIndex >= 0
      ? { correctOptionId: options[exactIndex].id }
      : {
          correctOptionId: null,
          warning: `Correct answer text "${value}" does not match an option exactly.`,
        };
  }

  if (typeof raw === "number" && Number.isInteger(raw)) {
    return resolveNumericAnswer(raw, answer.fieldName, options);
  }

  return {
    correctOptionId: null,
    warning: "The correct answer format is not supported; select it manually.",
  };
}

function resolveNumericAnswer(
  value: number,
  fieldName: string | undefined,
  options: ImportedQuizOption[],
): { correctOptionId: string | null; warning?: string } {
  const explicitlyZeroBased =
    fieldName === "markedOptionIndex" ||
    fieldName === "answersBooleanIndex" ||
    /(?:option|answer)_?index/i.test(fieldName ?? "");
  if (explicitlyZeroBased) {
    return options[value]
      ? { correctOptionId: options[value].id }
      : { correctOptionId: null, warning: `Answer index ${value} is outside the option list.` };
  }
  if (value === 0 && options[0]) return { correctOptionId: options[0].id };
  if (value === options.length && options[value - 1])
    return { correctOptionId: options[value - 1].id };
  if (value >= 1 && value < options.length) {
    return {
      correctOptionId: null,
      warning: `Numeric answer ${value} is ambiguous (zero-based or one-based); select it manually.`,
    };
  }
  return { correctOptionId: null, warning: `Numeric answer ${value} is outside the option list.` };
}

function finaliseDraft(draft: DraftQuestion): ImportedQuizQuestion {
  const options = draft.options.map(createImportedOption);
  const resolved = resolveAnswer(draft.answer, options);
  return createImportedQuestion({
    question: draft.question,
    options,
    correctOptionId: resolved.correctOptionId,
    explanation: draft.explanation,
    parserWarnings: [...draft.warnings, ...(resolved.warning ? [resolved.warning] : [])],
  });
}

function stripOptionalMarkdownFence(input: string) {
  const fenced = input.match(/^```(?:json)?[ \t]*\r?\n([\s\S]*?)\r?\n```$/i);
  return fenced ? fenced[1].trim() : input;
}

function parseJsonValue(parsed: unknown): QuizParseResult {
  const root = asRecord(parsed);
  const rows = Array.isArray(parsed)
    ? parsed
    : root && Array.isArray(root.questions)
      ? root.questions
      : null;
  if (!rows) {
    return {
      questions: [],
      warnings: ['JSON must be an array of questions or an object containing a "questions" array.'],
      format: "json",
    };
  }

  const warnings: string[] = [];
  const questions: ImportedQuizQuestion[] = [];
  rows.forEach((row, index) => {
    const record = asRecord(row);
    if (!record) {
      warnings.push(`Item ${index + 1} is not an object and was not imported.`);
      return;
    }
    const questionValue = firstDefined(record, ["question", "text", "prompt"]);
    const explanationValue = firstDefined(record, ["explanation", "reason"]);
    const { options, markedCorrectIndex } = extractJsonOptions(record);
    const itemWarnings: string[] = [];
    if (markedCorrectIndex === -2) itemWarnings.push("More than one option is marked correct.");
    const importedOptions = options.map(createImportedOption);
    const resolved = resolveAnswer(answerFromJson(record, markedCorrectIndex), importedOptions);
    questions.push(
      createImportedQuestion({
        question: cleanImportedText(questionValue?.value ?? ""),
        options: importedOptions,
        correctOptionId: resolved.correctOptionId,
        explanation: cleanImportedText(explanationValue?.value ?? ""),
        parserWarnings: [...itemWarnings, ...(resolved.warning ? [resolved.warning] : [])],
      }),
    );
  });
  return { questions, warnings, format: "json" };
}

function parseJsonFirst(input: string): QuizParseResult | null {
  const jsonInput = stripOptionalMarkdownFence(input);
  try {
    return parseJsonValue(JSON.parse(jsonInput));
  } catch (cause) {
    const looksLikeJson = /^(?:\{|\[)/.test(jsonInput.trim());
    if (!looksLikeJson) return null;
    const detail = cause instanceof Error ? cause.message : String(cause);
    return {
      questions: [],
      warnings: [`JSON parsing failed: ${detail}`],
      format: "json",
    };
  }
}

function isExpectedNumericOption(marker: string, draft: DraftQuestion | null) {
  if (!draft || !/^\d$/.test(marker)) return false;
  return Number(marker) === draft.options.length + 1 && !draft.answer && !draft.explanation;
}

function parseText(input: string): QuizParseResult {
  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const questions: ImportedQuizQuestion[] = [];
  const warnings: string[] = [];
  let draft: DraftQuestion | null = null;
  let inExplanation = false;

  const flush = () => {
    if (!draft) return;
    if (draft.question || draft.options.length || draft.answer || draft.explanation) {
      questions.push(finaliseDraft(draft));
    }
    draft = null;
    inExplanation = false;
  };

  lines.forEach((rawLine, lineIndex) => {
    const line = cleanImportedText(rawLine.replace(/^>\s?/, "")).replace(/(?:\*\*|__)/g, "");
    if (!line) return;

    const explicitQuestion = line.match(QUESTION_LABEL);
    if (explicitQuestion) {
      flush();
      draft = {
        question: cleanImportedText(explicitQuestion[1]),
        options: [],
        explanation: "",
        warnings: [],
      };
      return;
    }

    const answer = line.match(ANSWER_LABEL);
    if (answer && draft) {
      draft.answer = { value: cleanImportedText(answer[1]), fieldName: "plainTextAnswer" };
      inExplanation = false;
      return;
    }

    const explanation = line.match(EXPLANATION_LABEL);
    if (explanation && draft) {
      draft.explanation = cleanImportedText(explanation[1]);
      inExplanation = true;
      return;
    }

    const numbered = line.match(NUMBERED_LINE);
    const option = line.match(OPTION_LABEL);
    const optionMarker = option?.[1] ?? option?.[2];
    const beginsNumberedQuestion =
      numbered &&
      (!draft ||
        Boolean(draft.answer) ||
        Boolean(draft.explanation) ||
        (draft.options.length >= 2 && !isExpectedNumericOption(numbered[1], draft)));

    if (beginsNumberedQuestion) {
      flush();
      draft = {
        question: cleanImportedText(numbered[2]),
        options: [],
        explanation: "",
        warnings: [],
      };
      return;
    }

    if (option && draft && !inExplanation) {
      const marker = optionMarker ?? "";
      if (/^[A-Fa-f]$/.test(marker) || isExpectedNumericOption(marker, draft)) {
        draft.options.push(cleanImportedText(option[3]));
        return;
      }
    }

    if (inExplanation && draft) {
      draft.explanation = cleanImportedText(`${draft.explanation}\n${line}`);
      return;
    }

    if (!draft) {
      draft = { question: line, options: [], explanation: "", warnings: [] };
      return;
    }

    if (!draft.options.length && !draft.answer) {
      draft.question = cleanImportedText(`${draft.question} ${line}`);
      return;
    }

    if (draft.answer && !draft.explanation) {
      draft.explanation = line;
      inExplanation = true;
      return;
    }

    draft.warnings.push(`Line ${lineIndex + 1} could not be classified: "${line.slice(0, 100)}"`);
  });

  flush();
  if (!questions.length && input.trim()) warnings.push("No question boundaries could be detected.");
  return { questions, warnings, format: "text" };
}

export function parseNotebookLmQuiz(input: string): QuizParseResult {
  if (input.length > MAX_QUIZ_IMPORT_LENGTH) {
    return {
      questions: [],
      warnings: [
        `The pasted quiz exceeds the ${MAX_QUIZ_IMPORT_LENGTH.toLocaleString()} character limit.`,
      ],
      format: "text",
    };
  }
  const trimmed = input.trim();
  if (!trimmed)
    return { questions: [], warnings: ["Paste quiz content before parsing."], format: "text" };
  const withoutFence = stripOptionalMarkdownFence(trimmed);
  return parseJsonFirst(trimmed) ?? parseText(withoutFence);
}
