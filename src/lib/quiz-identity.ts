import type { Form, QuizQuestion } from "@/data/content";

export type QuizLanguage = "bm" | "en" | "dlp";
export type QuizForm = 1 | 2 | 3;

export type QuizIdentity = {
  subject: string;
  form: QuizForm;
  chapter: string | number;
  language: QuizLanguage;
  set: string | number;
};

export type QuizIdentityIssue = {
  code: "subject" | "form" | "chapter" | "language" | "question-id";
  questionId: string;
  expected: string;
  actual: string;
};

function canonicalSegment(value: string | number) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^chapter[\s-]*/i, "")
    .replace(/^form[\s-]*/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formNumber(form: Form): QuizForm {
  const value = Number(form.replace("Form ", ""));
  if (value !== 1 && value !== 2 && value !== 3) {
    throw new Error(`Unsupported quiz form: ${form}`);
  }
  return value;
}

export function formLabel(form: QuizForm): Form {
  return `Form ${form}`;
}

export function defaultQuizLanguage(subject: string): QuizLanguage {
  return subject === "english" ? "en" : "bm";
}

export function createQuizKey(identity: QuizIdentity) {
  return [
    canonicalSegment(identity.subject),
    `form-${identity.form}`,
    `chapter-${canonicalSegment(identity.chapter)}`,
    canonicalSegment(identity.language),
    `set-${canonicalSegment(identity.set)}`,
  ].join(":");
}

export function questionChapterKey(question: Pick<QuizQuestion, "id" | "subjectId" | "chapter">) {
  if (question.chapter) return question.chapter;
  const match = question.id.match(/-(?:c|chapter-)(\d+)-/i);
  return match ? `Chapter ${Number(match[1])}` : null;
}

export function validateQuizQuestions(
  identity: QuizIdentity,
  questions: readonly QuizQuestion[],
): QuizIdentityIssue[] {
  const expectedForm = formLabel(identity.form);
  const expectedChapter = canonicalSegment(identity.chapter);
  const issues: QuizIdentityIssue[] = [];

  for (const question of questions) {
    if (!question.id?.trim()) {
      issues.push({
        code: "question-id",
        questionId: "(missing)",
        expected: "non-empty stable ID",
        actual: String(question.id),
      });
    }
    if (question.subjectId !== identity.subject) {
      issues.push({
        code: "subject",
        questionId: question.id,
        expected: identity.subject,
        actual: question.subjectId,
      });
    }
    if (question.form !== expectedForm) {
      issues.push({
        code: "form",
        questionId: question.id,
        expected: expectedForm,
        actual: question.form,
      });
    }

    const actualChapter = questionChapterKey(question);
    if (actualChapter && canonicalSegment(actualChapter) !== expectedChapter) {
      issues.push({
        code: "chapter",
        questionId: question.id,
        expected: String(identity.chapter),
        actual: actualChapter,
      });
    }

    const actualLanguage = question.lang ?? defaultQuizLanguage(question.subjectId);
    if (actualLanguage !== identity.language) {
      issues.push({
        code: "language",
        questionId: question.id,
        expected: identity.language,
        actual: actualLanguage,
      });
    }
  }

  return issues;
}

export function acceptCachedQuizState<T extends { quizKey: string }>(
  cached: T | null | undefined,
  requestedIdentity: QuizIdentity,
): T | null {
  if (!cached) return null;
  return cached.quizKey === createQuizKey(requestedIdentity) ? cached : null;
}
