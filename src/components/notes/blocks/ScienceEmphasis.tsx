import { Fragment, type ReactNode } from "react";

/**
 * Renders a Science note string, giving the textbook's own emphasis to any run
 * the content marks with `**double asterisks**`.
 *
 * This is deliberately NOT a Markdown renderer. The only syntax it understands
 * is `**...**`, because the only thing it exists to express is "the textbook
 * set this term apart from the prose around it". Headings, links, lists and
 * nested formatting are not supported and must not be added: every other
 * decision about how a note reads already belongs to the component that lays
 * it out, and a general Markdown pipeline here would quietly become a second,
 * competing way to author content.
 *
 * Nothing is ever parsed as HTML — the pieces are plain strings handed to
 * React, so a stray `<` in chapter content stays a `<`.
 *
 * The treatment is a restrained pill: semibold text in the brand's
 * blue-to-purple range, on a translucent blue-purple wash, with a soft
 * rounded corner and a hair of horizontal padding — enough that the reader's
 * eye lands on the term without the page turning into a wall of badges. No
 * glow, no shadow, no block-level wrapper.
 */

/** Splits on `**…**`, keeping the marked runs. Odd indices are the emphasis. */
const MARKER = /\*\*([^*]+)\*\*/g;

export function scienceEmphasisParts(text: string): { text: string; emphasised: boolean }[] {
  const parts: { text: string; emphasised: boolean }[] = [];
  let at = 0;
  for (const match of text.matchAll(MARKER)) {
    const start = match.index ?? 0;
    if (start > at) parts.push({ text: text.slice(at, start), emphasised: false });
    parts.push({ text: match[1], emphasised: true });
    at = start + match[0].length;
  }
  if (at < text.length) parts.push({ text: text.slice(at), emphasised: false });
  return parts;
}

/**
 * The same string with its markers removed.
 *
 * For the places a note's words are used as data rather than shown as prose —
 * `alt` text, `aria-label`, a document title — where a literal `**` would be
 * read aloud.
 */
export function stripEmphasis(text: string): string {
  return text.replace(MARKER, "$1");
}

export function ScienceEmphasis({ text }: { text: string }) {
  const parts = scienceEmphasisParts(text);
  // Nothing marked: hand back the string untouched rather than wrapping it, so
  // an unmarked note renders exactly the DOM it rendered before.
  if (parts.length === 1 && !parts[0].emphasised) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        part.emphasised ? (
          <strong
            key={i}
            className="rounded-[5px] bg-gradient-to-r from-primary/15 to-accent/20 px-1 py-0.5 font-semibold text-accent ring-1 ring-inset ring-accent/20"
          >
            {part.text}
          </strong>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Compact callouts for the two textbook-driven patterns that don't fit inline
 * emphasis: a core definition/rule worth pausing on ("Remember"), and a short
 * clarifying aside the textbook itself offers ("Quick Explanation").
 *
 * Both render through `ScienceEmphasis`, so a callout's own text may still
 * carry `**...**` markers for the specific term it's defining.
 *
 * Kept deliberately small: one line of label, a couple of sentences of body.
 * These are not a general callout system — reach for them only when Step 5/6
 * of the emphasis pass calls for one, not as a decorative wrapper.
 */

const CALLOUT_LABEL: Record<"remember" | "quickExplanation", Record<"bm" | "en", string>> = {
  remember: { bm: "Ingat", en: "Remember" },
  quickExplanation: { bm: "Penjelasan Ringkas", en: "Quick Explanation" },
};

const CALLOUT_ICON: Record<"remember" | "quickExplanation", string> = {
  remember: "🧠",
  quickExplanation: "💡",
};

const CALLOUT_TONE: Record<"remember" | "quickExplanation", string> = {
  remember: "border-accent/25 bg-accent/8",
  quickExplanation: "border-primary/25 bg-primary/8",
};

function ScienceCallout({
  kind,
  lang,
  text,
  children,
}: {
  kind: "remember" | "quickExplanation";
  lang: "bm" | "en";
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`flex gap-2.5 rounded-xl border p-3 ${CALLOUT_TONE[kind]}`}>
      <span className="text-base leading-none" aria-hidden="true">
        {CALLOUT_ICON[kind]}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-accent">
          {CALLOUT_LABEL[kind][lang]}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/90">
          {text !== undefined ? <ScienceEmphasis text={text} /> : children}
        </p>
      </div>
    </div>
  );
}

/** 🧠 Ingat / Remember — a core textbook definition or rule worth pausing on. */
export function ScienceRemember({
  lang,
  text,
  children,
}: {
  lang: "bm" | "en";
  text?: string;
  children?: ReactNode;
}) {
  return (
    <ScienceCallout kind="remember" lang={lang} text={text}>
      {children}
    </ScienceCallout>
  );
}

/** 💡 Penjelasan Ringkas / Quick Explanation — a short textbook-backed clarifier. */
export function ScienceQuickExplanation({
  lang,
  text,
  children,
}: {
  lang: "bm" | "en";
  text?: string;
  children?: ReactNode;
}) {
  return (
    <ScienceCallout kind="quickExplanation" lang={lang} text={text}>
      {children}
    </ScienceCallout>
  );
}
