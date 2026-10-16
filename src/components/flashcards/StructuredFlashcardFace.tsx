import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import {
  mathText,
  partLabel,
  REVIEW_MODE_COPY,
  type FlashcardReviewMode,
  type StructuredFlashcard,
} from "@/features/flashcards/structuredFlashcard";

/**
 * The two faces of a structured flashcard: a question with optional parts and
 * visuals, and a worked solution laid out step by step. Readable fixed type
 * sizes (no shrink-to-fit); the card grows to fit instead (see FlashcardDeck).
 */

/**
 * A note's own lead-in ("Check:", "Common error:", "Semak:", …) becomes its
 * label, so the label never repeats the text; other notes are labelled Tip.
 */
function SolutionNote({ note, lang }: { note: string; lang: "bm" | "dlp" }) {
  const lead = note.match(/^([^:]{2,24}):\s+(.*)$/s);
  return (
    <p className="fc-structured-note">
      <span className="fc-structured-note-label">
        {lead ? lead[1] : lang === "bm" ? "Petua" : "Tip"}
      </span>
      {mathText(lead ? lead[2] : note)}
    </p>
  );
}

function ModeBadge({ mode, lang }: { mode: FlashcardReviewMode; lang: "bm" | "dlp" }) {
  return (
    <span className="fc-mode-badge" data-mode={mode}>
      <span aria-hidden="true">{REVIEW_MODE_COPY[mode].icon}</span>{" "}
      {REVIEW_MODE_COPY[mode][lang].title}
    </span>
  );
}

export function StructuredFlashcardFront({
  card,
  lang,
  mode,
}: {
  card: StructuredFlashcard;
  lang: "bm" | "dlp";
  mode?: FlashcardReviewMode;
}) {
  const hasParts = (card.parts?.length ?? 0) > 0;
  return (
    <div className="fc-structured" data-side="front">
      {mode && <ModeBadge mode={mode} lang={lang} />}
      <p className="fc-structured-prompt whitespace-pre-line">{mathText(card.prompt)}</p>
      {card.visuals?.map((visual, index) => (
        <div key={index} className="fc-structured-visual">
          <MathQuestionVisual visual={visual} lang={lang} />
        </div>
      ))}
      {hasParts && (
        <ol className="fc-structured-parts">
          {card.parts!.map((part, index) => (
            <li key={index}>
              <span className="fc-part-label">{partLabel(index)}</span>
              <span>{mathText(part)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function StructuredFlashcardBack({
  card,
  lang,
}: {
  card: StructuredFlashcard;
  lang: "bm" | "dlp";
}) {
  const hasParts = (card.parts?.length ?? 0) > 0;
  return (
    <div className="fc-structured" data-side="back">
      <p className="fc-structured-heading">{lang === "bm" ? "Penyelesaian" : "Worked solution"}</p>
      <ol className="fc-structured-solution">
        {card.answer.map((lines, index) => (
          <li key={index} className={hasParts ? "has-label" : undefined}>
            {hasParts && <span className="fc-part-label">{partLabel(index)}</span>}
            <span className="fc-solution-lines">
              {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="fc-solution-line">
                  {mathText(line)}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ol>
      {card.answerVisuals?.map((visual, index) => (
        <div key={index} className="fc-structured-visual">
          <MathQuestionVisual visual={visual} lang={lang} />
        </div>
      ))}
      {card.note && <SolutionNote note={card.note} lang={lang} />}
    </div>
  );
}
