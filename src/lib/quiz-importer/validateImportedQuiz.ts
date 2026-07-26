import type { ImportedQuizQuestion, QuizQuestionValidation, QuizValidationIssue } from "./types";
import { normaliseQuestionForComparison } from "./normaliseImportedQuiz";

export const MIN_QUIZ_OPTIONS = 2;
export const MAX_QUIZ_OPTIONS = 6;

export function validateImportedQuestion(question: ImportedQuizQuestion): QuizQuestionValidation {
  const issues: QuizValidationIssue[] = [];
  if (!question.question.trim()) {
    issues.push({
      code: "question_required",
      field: "question",
      message: "Enter the question text.",
      severity: "error",
    });
  }
  if (question.options.length < MIN_QUIZ_OPTIONS || question.options.length > MAX_QUIZ_OPTIONS) {
    issues.push({
      code: "option_count",
      field: "options",
      message: `Use between ${MIN_QUIZ_OPTIONS} and ${MAX_QUIZ_OPTIONS} options.`,
      severity: "error",
    });
  }

  const seen = new Map<string, string>();
  for (const option of question.options) {
    if (!option.text.trim()) {
      issues.push({
        code: "option_required",
        field: "options",
        optionId: option.id,
        message: "Option text cannot be empty.",
        severity: "error",
      });
      continue;
    }
    const normalised = normaliseQuestionForComparison(option.text);
    const previous = seen.get(normalised);
    if (previous) {
      issues.push({
        code: "duplicate_option",
        field: "options",
        optionId: option.id,
        message: "Options within a question must be unique.",
        severity: "error",
      });
    } else {
      seen.set(normalised, option.id);
    }
  }

  if (!question.correctOptionId) {
    issues.push({
      code: "correct_answer_required",
      field: "correctAnswer",
      message: "Select exactly one correct answer.",
      severity: "error",
    });
  } else if (!question.options.some((option) => option.id === question.correctOptionId)) {
    issues.push({
      code: "correct_answer_missing",
      field: "correctAnswer",
      message: "The selected correct answer no longer exists.",
      severity: "error",
    });
  }

  if (!question.explanation.trim()) {
    issues.push({
      code: "explanation_recommended",
      field: "explanation",
      message: "Explanation is optional in the current schema, but recommended for learners.",
      severity: "warning",
    });
  }

  return {
    questionId: question.id,
    issues,
    valid: !issues.some((issue) => issue.severity === "error"),
  };
}

export function validateImportedQuiz(questions: ImportedQuizQuestion[]) {
  return questions.map(validateImportedQuestion);
}
