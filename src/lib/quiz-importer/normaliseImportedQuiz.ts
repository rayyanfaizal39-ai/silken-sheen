import type { ImportedQuizOption, ImportedQuizQuestion } from "./types";

let fallbackId = 0;

export function createImporterId(prefix: "question" | "option" = "question") {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  fallbackId += 1;
  return `${prefix}-${Date.now().toString(36)}-${fallbackId.toString(36)}`;
}

export function cleanImportedText(value: unknown) {
  if (typeof value !== "string") return "";
  let text = value
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/^[\t ]*[-*+]\s+/, "")
    .trim();

  const wrappers: Array<[RegExp, string]> = [
    [/^\*\*([\s\S]+)\*\*$/, "$1"],
    [/^__([\s\S]+)__$/, "$1"],
    [/^`([\s\S]+)`$/, "$1"],
    [/^_([\s\S]+)_$/, "$1"],
    [/^\*([\s\S]+)\*$/, "$1"],
  ];
  for (const [pattern, replacement] of wrappers) text = text.replace(pattern, replacement).trim();
  return text.replace(/[ \t]+/g, " ").trim();
}

export function createImportedOption(text = ""): ImportedQuizOption {
  return { id: createImporterId("option"), text: cleanImportedText(text) };
}

export function createImportedQuestion(
  input: Partial<Omit<ImportedQuizQuestion, "id" | "options">> & {
    id?: string;
    options?: Array<string | ImportedQuizOption>;
  } = {},
): ImportedQuizQuestion {
  const options = (input.options ?? ["", "", "", ""]).map((option) =>
    typeof option === "string" ? createImportedOption(option) : { ...option },
  );
  return {
    id: input.id ?? createImporterId("question"),
    question: cleanImportedText(input.question ?? ""),
    options,
    correctOptionId: input.correctOptionId ?? null,
    explanation: cleanImportedText(input.explanation ?? ""),
    parserWarnings: [...(input.parserWarnings ?? [])],
  };
}

export function cloneImportedQuestion(question: ImportedQuizQuestion): ImportedQuizQuestion {
  const options = question.options.map((option) => createImportedOption(option.text));
  const correctIndex = question.options.findIndex(
    (option) => option.id === question.correctOptionId,
  );
  return createImportedQuestion({
    question: question.question,
    options,
    correctOptionId: correctIndex >= 0 ? (options[correctIndex]?.id ?? null) : null,
    explanation: question.explanation,
    parserWarnings: [],
  });
}

export function normaliseQuestionForComparison(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ms")
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
