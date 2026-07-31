import { useEffect, useMemo } from "react";
import { learningForms } from "@/content/metadata/forms";
import { subjects } from "@/data/subjects-meta";
import { getQuizDestinationPath } from "@/lib/quiz-importer/convertToExistingQuizSchema";
import { getCanonicalQuizChapters } from "@/lib/quiz-importer/destinationMetadata";
import { useContentRegistry } from "@/hooks/use-content-registry";
import type { QuizDestination } from "@/lib/quiz-importer/types";

interface Props {
  destination: QuizDestination;
  onChange: (destination: QuizDestination) => void;
  onContinue: () => void;
}

const QUIZ_SETS = [
  { id: "chapter" as const, label: "Chapter bank" },
  { id: "set-a" as const, label: "Set A" },
  { id: "set-b" as const, label: "Set B" },
  { id: "set-c" as const, label: "Set C" },
];

export function QuizDestinationSelector({ destination, onChange, onContinue }: Props) {
  const registry = useContentRegistry();
  const chapters = useMemo(
    () => getCanonicalQuizChapters(destination, registry),
    [destination, registry],
  );

  // chapterKey starts empty (registry isn't loaded on first render) — once
  // the chapter list resolves, default to the first canonical chapter.
  useEffect(() => {
    if (chapters.length === 0) return;
    if (chapters.some((chapter) => chapter.key === destination.chapterKey)) return;
    onChange({ ...destination, chapterKey: chapters[0].key });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapters]);

  function update(
    patch: Partial<
      Pick<
        QuizDestination,
        "language" | "form" | "subjectId" | "chapterKey" | "quizSet" | "difficulty"
      >
    >,
  ) {
    const next = { ...destination, ...patch };
    if (patch.language || patch.form || patch.subjectId) {
      const nextChapters = getCanonicalQuizChapters(next, registry);
      if (!nextChapters.some((chapter) => chapter.key === next.chapterKey)) {
        next.chapterKey = nextChapters[0]?.key ?? "";
      }
    }
    onChange(next);
  }

  const ready = Boolean(
    destination.subjectId &&
    destination.chapterKey &&
    chapters.some((chapter) => chapter.key === destination.chapterKey),
  );

  return (
    <section className="quiz-importer-panel" aria-labelledby="destination-heading">
      <div className="quiz-importer-panel-head">
        <div>
          <p className="quiz-importer-kicker">Step 1</p>
          <h2 id="destination-heading">Choose the destination</h2>
          <p>Selections use AcadeMY’s registered forms, subjects, and chapter labels.</p>
        </div>
      </div>

      <div className="quiz-destination-grid">
        <div className="quiz-field">
          <label htmlFor="quiz-import-language">Language / stream</label>
          <select
            id="quiz-import-language"
            value={destination.language}
            onChange={(event) =>
              update({ language: event.target.value as QuizDestination["language"] })
            }
          >
            <option value="bm">BM</option>
            <option value="dlp">DLP</option>
          </select>
        </div>

        <div className="quiz-field">
          <label htmlFor="quiz-import-form">Form</label>
          <select
            id="quiz-import-form"
            value={destination.form}
            onChange={(event) => update({ form: event.target.value as QuizDestination["form"] })}
          >
            {learningForms
              .filter(
                (form) => form.available && ["Form 1", "Form 2", "Form 3"].includes(form.label),
              )
              .map((form) => (
                <option key={form.id} value={form.label}>
                  {form.label.replace("Form", "Tingkatan")}
                </option>
              ))}
          </select>
        </div>

        <div className="quiz-field">
          <label htmlFor="quiz-import-subject">Subject</label>
          <select
            id="quiz-import-subject"
            value={destination.subjectId}
            onChange={(event) => update({ subjectId: event.target.value })}
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-field">
          <label htmlFor="quiz-import-chapter">Chapter</label>
          <select
            id="quiz-import-chapter"
            value={destination.chapterKey}
            onChange={(event) => update({ chapterKey: event.target.value })}
          >
            {!chapters.length && <option value="">No registered chapters</option>}
            {chapters.map((chapter) => (
              <option key={chapter.key} value={chapter.key}>
                {chapter.label}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-field">
          <label htmlFor="quiz-import-set">Quiz set</label>
          <select
            id="quiz-import-set"
            value={destination.quizSet}
            onChange={(event) =>
              update({ quizSet: event.target.value as QuizDestination["quizSet"] })
            }
          >
            {QUIZ_SETS.map((set) => (
              <option key={set.id} value={set.id}>
                {set.label}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-field">
          <label htmlFor="quiz-import-difficulty">Default difficulty</label>
          <select
            id="quiz-import-difficulty"
            value={destination.difficulty}
            onChange={(event) =>
              update({ difficulty: event.target.value as QuizDestination["difficulty"] })
            }
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <span className="quiz-field-hint">Required by the current QuizQuestion schema.</span>
        </div>
      </div>

      <div className="quiz-destination-resolved" aria-live="polite">
        <span>Resolved destination</span>
        <strong>
          {destination.language.toUpperCase()} · {destination.form} ·{" "}
          {subjects.find((subject) => subject.id === destination.subjectId)?.name ??
            destination.subjectId}{" "}
          ·{" "}
          {chapters.find((chapter) => chapter.key === destination.chapterKey)?.label ??
            "Choose a chapter"}{" "}
          · {QUIZ_SETS.find((set) => set.id === destination.quizSet)?.label}
        </strong>
        <code>{getQuizDestinationPath(destination)}</code>
      </div>

      <div className="quiz-importer-actions">
        <button
          type="button"
          className="btn btn-primary quiz-action-primary"
          disabled={!ready}
          onClick={onContinue}
        >
          Continue to paste
        </button>
      </div>
    </section>
  );
}
