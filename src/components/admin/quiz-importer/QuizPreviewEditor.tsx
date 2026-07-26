import { Plus } from "lucide-react";
import {
  cloneImportedQuestion,
  createImportedQuestion,
} from "@/lib/quiz-importer/normaliseImportedQuiz";
import type {
  ImportedQuizQuestion,
  QuizDuplicateMatch,
  QuizQuestionValidation,
} from "@/lib/quiz-importer/types";
import { QuizQuestionEditor } from "./QuizQuestionEditor";

interface Props {
  questions: ImportedQuizQuestion[];
  validations: QuizQuestionValidation[];
  duplicates: QuizDuplicateMatch[];
  onChange: (questions: ImportedQuizQuestion[]) => void;
}

export function QuizPreviewEditor({ questions, validations, duplicates, onChange }: Props) {
  const validCount = validations.filter((validation) => validation.valid).length;
  const warningCount = questions.filter(
    (question, index) =>
      question.parserWarnings.length > 0 ||
      validations[index]?.issues.some((issue) => issue.severity === "warning"),
  ).length;
  const invalidCount = questions.length - validCount;

  function replace(index: number, question: ImportedQuizQuestion) {
    onChange(
      questions.map((current, currentIndex) => (currentIndex === index ? question : current)),
    );
  }

  function remove(index: number) {
    if (!window.confirm(`Delete question ${index + 1}?`)) return;
    onChange(questions.filter((_, currentIndex) => currentIndex !== index));
  }

  function duplicate(index: number) {
    const copy = cloneImportedQuestion(questions[index]);
    onChange([...questions.slice(0, index + 1), copy, ...questions.slice(index + 1)]);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;
    const next = [...questions];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="quiz-preview-editor">
      <div className="quiz-summary-grid" aria-label="Quiz parsing summary">
        <div>
          <span>Total detected</span>
          <strong>{questions.length}</strong>
        </div>
        <div>
          <span>Valid</span>
          <strong className="success">{validCount}</strong>
        </div>
        <div>
          <span>With warnings</span>
          <strong className="warning">{warningCount}</strong>
        </div>
        <div>
          <span>Invalid</span>
          <strong className="danger">{invalidCount}</strong>
        </div>
        <div>
          <span>Possible duplicates</span>
          <strong className="warning">{duplicates.length}</strong>
        </div>
      </div>

      {questions.map((question, index) => (
        <QuizQuestionEditor
          key={question.id}
          index={index}
          total={questions.length}
          question={question}
          validation={validations[index]}
          duplicate={duplicates.find((duplicateMatch) => duplicateMatch.questionId === question.id)}
          onChange={(next) => replace(index, next)}
          onDelete={() => remove(index)}
          onDuplicate={() => duplicate(index)}
          onMove={(direction) => move(index, direction)}
        />
      ))}

      <button
        type="button"
        className="btn quiz-add-question"
        onClick={() => onChange([...questions, createImportedQuestion()])}
      >
        <Plus size={17} aria-hidden="true" />
        Add question manually
      </button>
    </div>
  );
}
