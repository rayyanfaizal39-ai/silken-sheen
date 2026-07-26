import { createFileRoute } from "@tanstack/react-router";
import { Check, Clipboard, Download, ExternalLink, FileCode2, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { QuizDestinationSelector } from "@/components/admin/quiz-importer/QuizDestinationSelector";
import { QuizImportSummary } from "@/components/admin/quiz-importer/QuizImportSummary";
import { QuizPasteInput } from "@/components/admin/quiz-importer/QuizPasteInput";
import { QuizPreviewEditor } from "@/components/admin/quiz-importer/QuizPreviewEditor";
import "@/components/admin/quiz-importer/quiz-importer.css";
import { getChaptersForSubject } from "@/content/registry";
import { quizzes as legacyQuizzes } from "@/data/quizzes";
import type { QuizQuestion } from "@/data/types";
import { createQuizExportPackage } from "@/lib/quiz-importer/convertToExistingQuizSchema";
import { getCanonicalQuizChapters } from "@/lib/quiz-importer/destinationMetadata";
import { detectQuizDuplicates } from "@/lib/quiz-importer/detectQuizDuplicates";
import { parseNotebookLmQuiz } from "@/lib/quiz-importer/parseNotebookLmQuiz";
import type {
  ImportedQuizQuestion,
  QuizDestination,
  QuizExportPackage,
} from "@/lib/quiz-importer/types";
import { validateImportedQuiz } from "@/lib/quiz-importer/validateImportedQuiz";
import { subjectIdToSlug } from "@/lib/study-routing";

export const Route = createFileRoute("/admin/content/quiz-importer")({
  component: QuizImporterPage,
});

const INITIAL_DESTINATION_BASE: QuizDestination = {
  language: "bm",
  form: "Form 1",
  subjectId: "science",
  chapterKey: "",
  quizSet: "chapter",
  difficulty: "Medium",
};

const STEP_LABELS = ["Destination", "Paste quiz", "Preview & validate", "Import result"];
const DRAFT_STORAGE_KEY = "academy.quiz-importer.paste-draft";

function initialDestination(): QuizDestination {
  return {
    ...INITIAL_DESTINATION_BASE,
    chapterKey: getCanonicalQuizChapters(INITIAL_DESTINATION_BASE)[0]?.key ?? "",
  };
}

function existingQuestionsForDestination(destination: QuizDestination): QuizQuestion[] {
  const registryQuestions = getChaptersForSubject(
    destination.subjectId,
    destination.language,
    destination.form,
  )
    .filter((chapter) => chapter.chapterKey === destination.chapterKey)
    .flatMap((chapter) => chapter.quiz ?? []);
  const legacyQuestions = legacyQuizzes.filter(
    (question) =>
      question.subjectId === destination.subjectId &&
      question.form === destination.form &&
      question.chapter === destination.chapterKey &&
      (!question.lang || question.lang === destination.language),
  );
  const unique = new Map<string, QuizQuestion>();
  for (const question of [...registryQuestions, ...legacyQuestions]) {
    unique.set(`${question.id}:${question.question}`, question);
  }
  return Array.from(unique.values());
}

function downloadPackage(result: QuizExportPackage) {
  const blob = new Blob([result.source], { type: "text/typescript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = result.downloadFileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

function QuizImporterPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [destination, setDestination] = useState<QuizDestination>(initialDestination);
  const [paste, setPaste] = useState("");
  const [questions, setQuestions] = useState<ImportedQuizQuestion[]>([]);
  const [parserWarnings, setParserWarnings] = useState<string[]>([]);
  const [parsing, setParsing] = useState(false);
  const [duplicateMode, setDuplicateMode] = useState<"skip" | "review">("skip");
  const [reviewed, setReviewed] = useState(false);
  const [result, setResult] = useState<QuizExportPackage | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    const saved = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) setPaste(saved);
  }, []);

  useEffect(() => {
    if (paste) window.localStorage.setItem(DRAFT_STORAGE_KEY, paste);
    else window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  }, [paste]);

  const existingQuestions = useMemo(
    () => existingQuestionsForDestination(destination),
    [destination],
  );
  const validations = useMemo(() => validateImportedQuiz(questions), [questions]);
  const duplicates = useMemo(
    () => detectQuizDuplicates(questions, existingQuestions),
    [existingQuestions, questions],
  );
  const duplicateIds = useMemo(
    () => new Set(duplicates.map((duplicate) => duplicate.questionId)),
    [duplicates],
  );
  const includedQuestions = useMemo(
    () =>
      duplicateMode === "skip"
        ? questions.filter((question) => !duplicateIds.has(question.id))
        : questions,
    [duplicateIds, duplicateMode, questions],
  );
  const includedIds = useMemo(
    () => new Set(includedQuestions.map((question) => question.id)),
    [includedQuestions],
  );
  const includedValid = validations
    .filter((validation) => includedIds.has(validation.questionId))
    .every((validation) => validation.valid);
  const warningCount =
    parserWarnings.length +
    questions.reduce((count, question) => count + question.parserWarnings.length, 0) +
    validations.reduce(
      (count, validation) =>
        count + validation.issues.filter((issue) => issue.severity === "warning").length,
      0,
    );
  const canImport =
    reviewed &&
    includedQuestions.length > 0 &&
    includedValid &&
    (duplicateMode === "skip" || duplicates.length === 0);

  function handleParse() {
    setParsing(true);
    setQuestions([]);
    setParserWarnings([]);
    setReviewed(false);
    setResult(null);
    window.setTimeout(() => {
      const parsed = parseNotebookLmQuiz(paste);
      setQuestions(parsed.questions);
      setParserWarnings(parsed.warnings);
      setParsing(false);
      if (parsed.questions.length > 0) setStep(3);
    }, 0);
  }

  function handleImport() {
    if (!canImport) return;
    try {
      const packageResult = createQuizExportPackage(
        includedQuestions,
        destination,
        existingQuestions.length,
      );
      downloadPackage(packageResult);
      setResult(packageResult);
      setCopyStatus("idle");
      setStep(4);
    } catch (cause) {
      setParserWarnings([
        `The export could not be created. Your pasted content is still available. ${
          cause instanceof Error ? cause.message : "Unknown error."
        }`,
      ]);
    }
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.source);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  function startAnother() {
    setPaste("");
    setQuestions([]);
    setParserWarnings([]);
    setReviewed(false);
    setResult(null);
    setCopyStatus("idle");
    setStep(2);
  }

  const quizHref = `/quizzes?subject=${encodeURIComponent(
    subjectIdToSlug[destination.subjectId] ?? destination.subjectId,
  )}&form=${destination.form.match(/\d+/)?.[0] ?? "1"}&chapter=${encodeURIComponent(destination.chapterKey)}`;

  return (
    <main className="admin-content">
      <div className="quiz-importer">
        <header className="quiz-importer-hero">
          <div>
            <div className="admin-eyebrow">Content · Quiz Importer</div>
            <h1>NotebookLM Quiz Importer</h1>
            <p>
              Parse, edit, validate, and safely package NotebookLM questions for AcadeMY’s existing
              quiz schema.
            </p>
          </div>
          <span className="quiz-storage-badge">
            <FileCode2 size={16} aria-hidden="true" />
            Static TypeScript quiz storage
          </span>
        </header>

        <ol className="quiz-stepper" aria-label="Quiz import progress">
          {STEP_LABELS.map((label, index) => {
            const stepNumber = index + 1;
            const state = stepNumber === step ? "current" : stepNumber < step ? "complete" : "";
            return (
              <li
                className={state}
                key={label}
                aria-current={stepNumber === step ? "step" : undefined}
              >
                <span className="step-number">
                  {stepNumber < step ? <Check size={15} /> : stepNumber}
                </span>
                <div>
                  <strong>{label}</strong>
                </div>
              </li>
            );
          })}
        </ol>

        {step === 1 && (
          <QuizDestinationSelector
            destination={destination}
            onChange={(next) => {
              setDestination(next);
              setReviewed(false);
            }}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <QuizPasteInput
            value={paste}
            parsing={parsing}
            warnings={parserWarnings}
            onChange={setPaste}
            onParse={handleParse}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <>
            <section className="quiz-importer-panel" aria-labelledby="preview-heading">
              <div className="quiz-importer-panel-head">
                <div>
                  <p className="quiz-importer-kicker">Step 3</p>
                  <h2 id="preview-heading">Preview and validate</h2>
                  <p>
                    Edit every field below. Import stays blocked while included questions have
                    errors.
                  </p>
                </div>
                <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
                  Back to pasted text
                </button>
              </div>

              {parserWarnings.length > 0 && (
                <div className="quiz-alert quiz-alert-warning" role="alert">
                  <strong>Parser feedback</strong>
                  <ul>
                    {parserWarnings.map((warning, index) => (
                      <li key={`${warning}-${index}`}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <QuizPreviewEditor
                questions={questions}
                validations={validations}
                duplicates={duplicates}
                onChange={(next) => {
                  setQuestions(next);
                  setReviewed(false);
                }}
              />
            </section>

            <QuizImportSummary
              destination={destination}
              validCount={validations.filter((validation) => validation.valid).length}
              warningCount={warningCount}
              duplicates={duplicates}
              skippedCount={duplicateMode === "skip" ? duplicates.length : 0}
              duplicateMode={duplicateMode}
              reviewed={reviewed}
              canImport={canImport}
              onDuplicateModeChange={(mode) => {
                setDuplicateMode(mode);
                setReviewed(false);
              }}
              onReviewedChange={setReviewed}
              onReviewDuplicates={() => {
                const first = duplicates[0];
                if (!first) return;
                document
                  .getElementById(`quiz-question-${first.questionId}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              onImport={handleImport}
            />
          </>
        )}

        {step === 4 && result && (
          <section className="quiz-result-panel" aria-labelledby="result-heading">
            <div className="quiz-result-icon">
              <Check size={28} aria-hidden="true" />
            </div>
            <p className="quiz-importer-kicker">Step 4</p>
            <h2 id="result-heading">Import package ready</h2>
            <p>
              The exact-schema TypeScript package was downloaded. Merge its exported array into{" "}
              <code>{result.destinationPath}</code> and register it through that file’s existing
              export pattern. No existing quiz was overwritten.
            </p>

            <div className="quiz-result-stats">
              <div>
                <span>Questions prepared</span>
                <strong>{result.questions.length}</strong>
              </div>
              <div>
                <span>Skipped duplicates</span>
                <strong>{duplicates.length}</strong>
              </div>
              <div>
                <span>Failed</span>
                <strong>0</strong>
              </div>
            </div>

            <pre className="quiz-code-preview" tabIndex={0}>
              {result.source}
            </pre>

            <div className="quiz-result-actions">
              <button type="button" className="btn" onClick={() => downloadPackage(result)}>
                <Download size={16} aria-hidden="true" />
                Download again
              </button>
              <button type="button" className="btn" onClick={() => void copyResult()}>
                <Clipboard size={16} aria-hidden="true" />
                {copyStatus === "copied"
                  ? "Copied"
                  : copyStatus === "failed"
                    ? "Copy failed"
                    : "Copy TypeScript"}
              </button>
              <a className="btn" href={quizHref}>
                <ExternalLink size={16} aria-hidden="true" />
                View current quiz
              </a>
              <button type="button" className="btn btn-primary" onClick={startAnother}>
                <RotateCcw size={16} aria-hidden="true" />
                Import another quiz
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
