import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import {
  mathText,
  partLabel,
  REVIEW_MODE_COPY,
  type FlashcardReviewMode,
  type StructuredFlashcard,
} from "@/features/flashcards/structuredFlashcard";

/**
 * Typeset inline algebraic fractions as stacked numerator/denominator rather
 * than exposing slash notation. This handles the Chapter 2 bank's explicit
 * fraction tokens without changing stored card text or progress IDs.
 */
export function MathFlashcardText({ value }: { value: string }) {
  const fraction = /(\([^()]+\)|[A-Za-z0-9²³]+)\/(\([^()]+\)|[A-Za-z0-9²³]+)/g;
  const parts: Array<string | { top: string; bottom: string }> = [];
  let last = 0;
  for (const match of value.matchAll(fraction)) {
    const offset = match.index ?? 0;
    if (offset > last) parts.push(value.slice(last, offset));
    parts.push({ top: match[1], bottom: match[2] });
    last = offset + match[0].length;
  }
  if (last === 0) return <>{mathText(value)}</>;
  if (last < value.length) parts.push(value.slice(last));
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={index}><MathFlashcardText value={part} /></span>
        ) : (
          <span
            key={index}
            className="inline-flex align-middle flex-col items-center justify-center mx-1 leading-tight text-[0.9em]"
            role="math"
            aria-label={`${part.top} over ${part.bottom}`}
          >
            <span className="block px-1 text-center border-b border-current">{part.top}</span>
            <span className="block px-1 text-center">{part.bottom}</span>
          </span>
        ),
      )}
    </>
  );
}

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
      <MathFlashcardText value={lead ? lead[2] : note} />
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
      <p className="fc-structured-prompt whitespace-pre-line"><MathFlashcardText value={card.prompt} /></p>
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
                  <MathFlashcardText value={line} />
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
