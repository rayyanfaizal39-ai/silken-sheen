import { AlertTriangle, Download, ShieldCheck } from "lucide-react";
import type { QuizDestination, QuizDuplicateMatch } from "@/lib/quiz-importer/types";
import { getQuizDestinationPath } from "@/lib/quiz-importer/convertToExistingQuizSchema";

interface Props {
  destination: QuizDestination;
  validCount: number;
  warningCount: number;
  duplicates: QuizDuplicateMatch[];
  skippedCount: number;
  duplicateMode: "skip" | "review";
  reviewed: boolean;
  canImport: boolean;
  onDuplicateModeChange: (mode: "skip" | "review") => void;
  onReviewedChange: (reviewed: boolean) => void;
  onReviewDuplicates: () => void;
  onImport: () => void;
}

export function QuizImportSummary({
  destination,
  validCount,
  warningCount,
  duplicates,
  skippedCount,
  duplicateMode,
  reviewed,
  canImport,
  onDuplicateModeChange,
  onReviewedChange,
  onReviewDuplicates,
  onImport,
}: Props) {
  return (
    <section className="quiz-import-summary" aria-labelledby="import-summary-heading">
      <div className="quiz-importer-panel-head">
        <div>
          <p className="quiz-importer-kicker">Import confirmation</p>
          <h3 id="import-summary-heading">Review the export package</h3>
          <p>The browser will create a TypeScript file. Existing questions remain untouched.</p>
        </div>
        <ShieldCheck size={26} aria-hidden="true" />
      </div>

      <dl className="quiz-confirmation-list">
        <div>
          <dt>Destination</dt>
          <dd>
            {destination.language.toUpperCase()} · {destination.form} · {destination.subjectId} ·{" "}
            {destination.chapterKey} · {destination.quizSet}
          </dd>
        </div>
        <div>
          <dt>Valid questions</dt>
          <dd>{validCount}</dd>
        </div>
        <div>
          <dt>Skipped</dt>
          <dd>{skippedCount}</dd>
        </div>
        <div>
          <dt>Duplicate count</dt>
          <dd>{duplicates.length}</dd>
        </div>
        <div>
          <dt>Warning count</dt>
          <dd>{warningCount}</dd>
        </div>
        <div>
          <dt>Existing questions</dt>
          <dd>Remain untouched</dd>
        </div>
        <div>
          <dt>Source destination</dt>
          <dd>
            <code>{getQuizDestinationPath(destination)}</code>
          </dd>
        </div>
      </dl>

      {duplicates.length > 0 && (
        <fieldset className="quiz-duplicate-choice">
          <legend>Duplicate protection</legend>
          <label>
            <input
              type="radio"
              name="duplicate-mode"
              checked={duplicateMode === "skip"}
              onChange={() => onDuplicateModeChange("skip")}
            />
            <span>
              <strong>Skip duplicates</strong>
              <small>Exclude every flagged exact or near duplicate from the export.</small>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="duplicate-mode"
              checked={duplicateMode === "review"}
              onChange={() => onDuplicateModeChange("review")}
            />
            <span>
              <strong>Review duplicates</strong>
              <small>Block export until duplicate questions are edited or removed.</small>
            </span>
          </label>
          {duplicateMode === "review" && (
            <button type="button" className="btn" onClick={onReviewDuplicates}>
              <AlertTriangle size={16} aria-hidden="true" />
              Review first duplicate
            </button>
          )}
        </fieldset>
      )}

      <label className="quiz-review-confirmation">
        <input
          type="checkbox"
          checked={reviewed}
          onChange={(event) => onReviewedChange(event.target.checked)}
        />
        <span>I have reviewed the questions and answers.</span>
      </label>

      <button
        type="button"
        className="btn btn-primary quiz-action-primary quiz-import-button"
        disabled={!canImport}
        onClick={onImport}
      >
        <Download size={17} aria-hidden="true" />
        Import questions
      </button>
      <p className="quiz-static-note">
        In this static-content architecture, “Import” downloads an exact-schema source package; it
        does not write into the repository.
      </p>
    </section>
  );
}
