import { ArrowDown, ArrowUp, Copy, Plus, Trash2, X } from "lucide-react";
import type {
  ImportedQuizQuestion,
  QuizDuplicateMatch,
  QuizQuestionValidation,
} from "@/lib/quiz-importer/types";
import { createImportedOption } from "@/lib/quiz-importer/normaliseImportedQuiz";
import { MAX_QUIZ_OPTIONS, MIN_QUIZ_OPTIONS } from "@/lib/quiz-importer/validateImportedQuiz";

interface Props {
  index: number;
  total: number;
  question: ImportedQuizQuestion;
  validation: QuizQuestionValidation;
  duplicate?: QuizDuplicateMatch;
  onChange: (question: ImportedQuizQuestion) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMove: (direction: -1 | 1) => void;
}

export function QuizQuestionEditor({
  index,
  total,
  question,
  validation,
  duplicate,
  onChange,
  onDelete,
  onDuplicate,
  onMove,
}: Props) {
  const questionErrors = validation.issues.filter(
    (issue) => issue.field === "question" && issue.severity === "error",
  );
  const answerErrors = validation.issues.filter(
    (issue) => issue.field === "correctAnswer" && issue.severity === "error",
  );
  const explanationIssues = validation.issues.filter((issue) => issue.field === "explanation");

  function updateOption(optionId: string, text: string) {
    onChange({
      ...question,
      options: question.options.map((option) =>
        option.id === optionId ? { ...option, text } : option,
      ),
    });
  }

  function removeOption(optionId: string) {
    if (question.options.length <= MIN_QUIZ_OPTIONS) return;
    onChange({
      ...question,
      options: question.options.filter((option) => option.id !== optionId),
      correctOptionId: question.correctOptionId === optionId ? null : question.correctOptionId,
    });
  }

  return (
    <article
      className={`quiz-question-card ${validation.valid ? "" : "has-errors"} ${duplicate ? "has-duplicate" : ""}`}
      id={`quiz-question-${question.id}`}
    >
      <header className="quiz-question-card-head">
        <div>
          <span className="quiz-question-number">Question {index + 1}</span>
          <span className={`quiz-status-label ${validation.valid ? "valid" : "invalid"}`}>
            {validation.valid ? "Valid" : "Needs attention"}
          </span>
          {duplicate && (
            <span className="quiz-status-label duplicate">
              {duplicate.kind === "exact" ? "Exact duplicate" : "Possible duplicate"}
            </span>
          )}
        </div>
        <div className="quiz-icon-actions">
          <button
            type="button"
            className="quiz-icon-button"
            aria-label={`Move question ${index + 1} up`}
            title="Move up"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ArrowUp size={17} />
          </button>
          <button
            type="button"
            className="quiz-icon-button"
            aria-label={`Move question ${index + 1} down`}
            title="Move down"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ArrowDown size={17} />
          </button>
          <button
            type="button"
            className="quiz-icon-button"
            aria-label={`Duplicate question ${index + 1}`}
            title="Duplicate question"
            onClick={onDuplicate}
          >
            <Copy size={17} />
          </button>
          <button
            type="button"
            className="quiz-icon-button danger"
            aria-label={`Delete question ${index + 1}`}
            title="Delete question"
            onClick={onDelete}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </header>

      {question.parserWarnings.length > 0 && (
        <div className="quiz-inline-warning" role="status">
          {question.parserWarnings.map((warning) => (
            <span key={warning}>{warning}</span>
          ))}
        </div>
      )}

      {duplicate && (
        <div className="quiz-inline-warning duplicate-copy">
          Matches{" "}
          {duplicate.source === "existing" ? "an existing question" : "an earlier pasted question"}{" "}
          at {Math.round(duplicate.similarity * 100)}%: “{duplicate.matchedQuestion}”
        </div>
      )}

      <div className="quiz-field">
        <label htmlFor={`question-${question.id}`}>Question text</label>
        <textarea
          id={`question-${question.id}`}
          className={questionErrors.length ? "field-invalid" : ""}
          value={question.question}
          maxLength={2_000}
          onChange={(event) => onChange({ ...question, question: event.target.value })}
        />
        {questionErrors.map((issue) => (
          <span className="quiz-field-error" key={issue.code}>
            {issue.message}
          </span>
        ))}
      </div>

      <fieldset className="quiz-options-fieldset">
        <legend>Answer options</legend>
        <p>Select the radio button beside the correct answer.</p>
        <div className="quiz-options-list">
          {question.options.map((option, optionIndex) => {
            const optionIssues = validation.issues.filter(
              (issue) => issue.optionId === option.id && issue.severity === "error",
            );
            return (
              <div className="quiz-option-row" key={option.id}>
                <label className="quiz-correct-choice">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctOptionId === option.id}
                    onChange={() => onChange({ ...question, correctOptionId: option.id })}
                  />
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  <span className="sr-only">Mark option {optionIndex + 1} correct</span>
                </label>
                <div className="quiz-option-input-wrap">
                  <input
                    aria-label={`Question ${index + 1}, option ${String.fromCharCode(65 + optionIndex)}`}
                    className={optionIssues.length ? "field-invalid" : ""}
                    value={option.text}
                    maxLength={1_000}
                    onChange={(event) => updateOption(option.id, event.target.value)}
                  />
                  {optionIssues.map((issue) => (
                    <span className="quiz-field-error" key={`${issue.code}-${option.id}`}>
                      {issue.message}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="quiz-icon-button danger"
                  aria-label={`Remove option ${String.fromCharCode(65 + optionIndex)}`}
                  title="Remove option"
                  disabled={question.options.length <= MIN_QUIZ_OPTIONS}
                  onClick={() => removeOption(option.id)}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
        {answerErrors.map((issue) => (
          <span className="quiz-field-error" key={issue.code}>
            {issue.message}
          </span>
        ))}
        <button
          type="button"
          className="btn quiz-add-option"
          disabled={question.options.length >= MAX_QUIZ_OPTIONS}
          onClick={() =>
            onChange({ ...question, options: [...question.options, createImportedOption()] })
          }
        >
          <Plus size={16} aria-hidden="true" />
          Add option
        </button>
      </fieldset>

      <div className="quiz-field">
        <label htmlFor={`explanation-${question.id}`}>Explanation</label>
        <textarea
          id={`explanation-${question.id}`}
          value={question.explanation}
          maxLength={4_000}
          onChange={(event) => onChange({ ...question, explanation: event.target.value })}
        />
        {explanationIssues.map((issue) => (
          <span className="quiz-field-hint" key={issue.code}>
            {issue.message}
          </span>
        ))}
      </div>
    </article>
  );
}
