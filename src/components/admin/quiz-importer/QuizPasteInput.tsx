import { FileJson2, RotateCcw, Sparkles } from "lucide-react";
import { MAX_QUIZ_IMPORT_LENGTH } from "@/lib/quiz-importer/parseNotebookLmQuiz";

interface Props {
  value: string;
  parsing: boolean;
  warnings: string[];
  onChange: (value: string) => void;
  onParse: () => void;
  onBack: () => void;
}

const EXAMPLE = `Question 1: Apakah maksud homeostasis?
A. Proses pembiakan organisma
B. Pengekalan persekitaran dalaman badan yang stabil
C. Penghasilan tenaga cahaya
D. Pergerakan organisma ke habitat baharu
Jawapan: B
Explanation: Homeostasis mengekalkan keadaan dalaman badan dalam julat yang sesuai.

Question 2: Organ manakah bertindak sebagai pusat kawalan homeostasis?
(A) Jantung
(B) Otak
(C) Perut
(D) Kulit
Correct answer: B
Explanation: Otak mengesan perubahan dan menyelaras tindak balas badan.`;

export function QuizPasteInput({ value, parsing, warnings, onChange, onParse, onBack }: Props) {
  function clear() {
    if (value && !window.confirm("Clear the pasted quiz draft?")) return;
    onChange("");
  }

  return (
    <section className="quiz-importer-panel" aria-labelledby="paste-heading">
      <div className="quiz-importer-panel-head">
        <div>
          <p className="quiz-importer-kicker">Step 2</p>
          <h2 id="paste-heading">Paste NotebookLM Quiz Output</h2>
          <p>Parsing stays in this browser. No pasted content is sent to an AI service.</p>
        </div>
        <span className="quiz-character-count">
          {value.length.toLocaleString()} / {MAX_QUIZ_IMPORT_LENGTH.toLocaleString()}
        </span>
      </div>

      <div className="quiz-field">
        <label htmlFor="notebooklm-quiz-output">Quiz content</label>
        <textarea
          id="notebooklm-quiz-output"
          className="quiz-paste-area"
          value={value}
          maxLength={MAX_QUIZ_IMPORT_LENGTH}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste a JSON array, numbered questions, Markdown, or Question / A–D / Answer / Explanation format…"
          spellCheck
        />
        <span className="quiz-field-hint">
          Supports A. / A) / (A), numbered options, Jawapan, Jawapan betul, Answer, and Correct
          Answer.
        </span>
      </div>

      {warnings.length > 0 && (
        <div className="quiz-alert quiz-alert-warning" role="alert">
          <strong>Parser feedback</strong>
          <ul>
            {warnings.map((warning, index) => (
              <li key={`${warning}-${index}`}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="quiz-importer-actions quiz-importer-actions-split">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Back
        </button>
        <div>
          <button type="button" className="btn" onClick={() => onChange(EXAMPLE)}>
            <Sparkles size={16} aria-hidden="true" />
            Load example
          </button>
          <button type="button" className="btn" onClick={clear} disabled={!value || parsing}>
            <RotateCcw size={16} aria-hidden="true" />
            Clear
          </button>
          <button
            type="button"
            className="btn btn-primary quiz-action-primary"
            disabled={!value.trim() || parsing}
            onClick={onParse}
          >
            <FileJson2 size={17} aria-hidden="true" />
            {parsing ? "Parsing…" : "Parse quiz"}
          </button>
        </div>
      </div>
    </section>
  );
}
