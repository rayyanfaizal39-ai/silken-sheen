import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
  type UIEvent,
} from "react";
import { Check, ChevronRight, Heart, RotateCcw, X } from "lucide-react";
import { LearningArena } from "@/components/learning/LearningArena";

/** Exit animation length; the page waits this long before dealing the next card. */
export const FLASHCARD_EXIT_MS = 260;

// The card keeps the flashcard identity students already know: a dark,
// subject-tinted study card with a soft subject border and glow, sitting in
// the subject's world scene. Faces are opaque (tinted to match the original
// glass look) so the reverse can never show through mid-flip.
const FLASHCARD_ARENA_CSS = `
  .flashcard-arena {
    --fc-card-h: clamp(260px, calc(100dvh - 27.5rem), 440px);
    /* How far each decorative stack layer peeks out below the card. */
    --fc-stack-step: 12px;
    --fc-surface: color-mix(in srgb, var(--arena-accent) 7%, #0d1416);
    --fc-surface-deep: color-mix(in srgb, var(--arena-accent) 3%, #090e10);
    --fc-border: color-mix(in srgb, var(--arena-accent) 25%, transparent);
  }
  /* Desktop: the card takes what the viewport leaves after the header and the
     rest of the stage (progress, ratings, secondary row and breathing room),
     capped at flashcard proportions. */
  @media (min-width: 1024px) {
    .flashcard-arena {
      --fc-card-h: clamp(300px, calc(100dvh - 23rem), 440px);
      --fc-stack-step: 10px;
    }
  }
  /* Progress, card, ratings and the secondary row are one composition with
     fixed heights, centred together in the space under the header, so nothing
     moves between cards or on flip. */
  .fc-stage {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block: 0.75rem 0.25rem;
  }
  @media (min-width: 1024px) {
    .fc-stage { padding-block: 1.5rem; }
  }
  .fc-column { width: 100%; max-width: 36rem; margin-inline: auto; }
  @media (min-width: 1024px) {
    .fc-column { max-width: 820px; }
  }
  .fc-progress { margin-bottom: 0.75rem; }
  @media (min-width: 1024px) {
    .fc-progress { margin-bottom: 1.5rem; }
  }
  .fc-progress-fill {
    background-image: linear-gradient(90deg, var(--arena-accent-from), var(--arena-accent-to));
    transition: width 700ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .fc-card-slot {
    position: relative;
    height: var(--fc-card-h);
    margin-bottom: 1.5rem;
  }
  @media (min-width: 1024px) {
    .fc-card-slot { margin-bottom: 2rem; }
  }
  .fc-stack-layer {
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    background: var(--fc-surface);
    pointer-events: none;
    transform-origin: 50% 100%;
  }
  /* Transforms only, so the stack never adds layout height. Layer 1 rises
     into place as the top card is dragged away (--fc-drag, 0 → 1). */
  .fc-stack-layer-1 {
    opacity: 0.5;
    transform: translateY(calc(var(--fc-stack-step) * (1 - var(--fc-drag, 0))))
      scale(calc(0.96 + 0.04 * var(--fc-drag, 0)));
    transition: transform 300ms ease;
  }
  .fc-stack-layer-2 {
    transform: translateY(calc(var(--fc-stack-step) * 2)) scale(0.92);
    opacity: 0.28;
  }
  .fc-left-pill {
    position: absolute;
    top: -0.75rem;
    right: -0.5rem;
    z-index: 20;
    pointer-events: none;
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: #fff;
    background: #0d1416;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  .fc-card-motion { position: absolute; inset: 0; }
  .fc-card-motion.is-entering { animation: fc-enter 260ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .fc-card-motion.is-exit-right {
    animation: fc-exit-right ${FLASHCARD_EXIT_MS - 20}ms cubic-bezier(0.4, 0, 1, 1) forwards;
    pointer-events: none;
  }
  .fc-card-motion.is-exit-left {
    animation: fc-exit-left ${FLASHCARD_EXIT_MS - 20}ms cubic-bezier(0.4, 0, 1, 1) forwards;
    pointer-events: none;
  }
  @keyframes fc-enter {
    from { opacity: 0; transform: translateY(12px) scale(0.96); }
    to { opacity: 1; transform: none; }
  }
  @keyframes fc-exit-right { to { opacity: 0; transform: translate3d(64px, 0, 0) rotate(3deg); } }
  @keyframes fc-exit-left { to { opacity: 0; transform: translate3d(-64px, 0, 0) rotate(-3deg); } }
  @keyframes fc-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fc-fade-out { to { opacity: 0; } }
  .flashcard-arena .flashcard-study-card {
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .flashcard-arena .flashcard-study-card:focus-visible {
    outline: 2px solid var(--arena-accent);
    outline-offset: 4px;
  }
  .flashcard-arena .flashcard-inner {
    transition: transform 460ms cubic-bezier(0.3, 0.7, 0.2, 1);
  }
  .fc-face {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 1.5rem;
    padding: 1.5rem;
    color: #fff;
    border: 1px solid var(--fc-border);
    box-shadow: 0 24px 70px -30px var(--arena-glow);
  }
  @media (min-width: 640px) {
    .fc-face { padding: 2rem; }
  }
  .fc-face.flashcard-front {
    background: linear-gradient(180deg, var(--fc-surface), var(--fc-surface-deep));
  }
  .fc-face.flashcard-back {
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--arena-accent) 13%, transparent), rgba(0, 0, 0, 0.45)),
      var(--fc-surface);
  }
  /* Both faces share one geometry: a fixed header, a flexible content region
     and a fixed footer, so the text centres in the same box on either side. */
  .fc-face-head {
    display: flex;
    min-height: 2rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .fc-face-foot { flex-shrink: 0; }
  /* Only this region scrolls. Its child uses auto margins rather than
     justify-content so short text centres while long text starts at the top
     and stays reachable. */
  .fc-face-body {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-block: 0.75rem;
  }
  .fc-face-body > p { margin: auto; text-align: center; overflow-wrap: anywhere; text-wrap: pretty; }
  /* Phones scroll without a visible scrollbar. */
  .fc-face-body { scrollbar-width: none; }
  .fc-face-body::-webkit-scrollbar { display: none; }
  /* Fade the edge that has more content beyond it. */
  .fc-face-body[data-more="below"] {
    -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 2.75rem), transparent);
    mask-image: linear-gradient(to bottom, #000 calc(100% - 2.75rem), transparent);
  }
  .fc-face-body[data-more="above"] {
    -webkit-mask-image: linear-gradient(to top, #000 calc(100% - 2rem), transparent);
    mask-image: linear-gradient(to top, #000 calc(100% - 2rem), transparent);
  }
  .fc-face-body[data-more="both"] {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 2rem, #000 calc(100% - 2.75rem), transparent);
    mask-image: linear-gradient(to bottom, transparent, #000 2rem, #000 calc(100% - 2.75rem), transparent);
  }
  /* Desktop: a contained study card with calm, readable type in a few fixed
     tiers. Phones keep the approved mobile sizes above. */
  @media (min-width: 1024px) {
    .flashcard-arena .fc-face { padding: 1.75rem 3.5rem 1.5rem; border-radius: 30px; }
    .flashcard-arena .flashcard-study-card,
    .flashcard-arena .fc-stack-layer { border-radius: 30px; }
    /* The scroll region reaches out to the card edge so its thin scrollbar
       sits by the border rather than floating mid-card. Stable gutters on
       both sides keep centred text centred whether or not it overflows. */
    .flashcard-arena .fc-face-body {
      margin-inline: -3rem;
      padding-inline: 3rem;
      scrollbar-gutter: stable both-edges;
      scrollbar-width: thin;
      scrollbar-color: color-mix(in srgb, var(--arena-accent) 40%, transparent) transparent;
    }
    .flashcard-arena .fc-face-body::-webkit-scrollbar { display: block; width: 6px; }
    .flashcard-arena .fc-face-body::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background: color-mix(in srgb, var(--arena-accent) 40%, transparent);
    }
    .flashcard-arena .fc-face-body::-webkit-scrollbar-track { background: transparent; }
    .flashcard-arena .fc-face-body > p { max-width: 660px; }
    .flashcard-arena .fc-question { font-size: 2.125rem; font-weight: 650; line-height: 1.28; }
    .flashcard-arena .fc-question[data-length="medium"] { font-size: 2rem; line-height: 1.3; }
    .flashcard-arena .fc-question[data-length="long"] { font-size: 1.75rem; line-height: 1.32; }
    .flashcard-arena .fc-answer { font-size: 1.75rem; font-weight: 600; line-height: 1.4; }
    .flashcard-arena .fc-answer[data-length="medium"] { font-size: 1.5rem; }
    .flashcard-arena .fc-answer[data-length="long"] { font-size: 1.3125rem; line-height: 1.5; }
    .flashcard-arena .fc-meta { font-size: 15px; font-weight: 500; }
    /* Two lines on desktop, reserved on both faces. */
    .flashcard-arena .fc-hint { min-height: 2.625rem; font-size: 14px; line-height: 1.5; }
    .flashcard-arena .fc-watermark { right: 1.5rem; bottom: 1.25rem; }
  }
  .fc-watermark {
    position: absolute;
    right: 1rem;
    bottom: 0.75rem;
    pointer-events: none;
    font-family: var(--font-display);
    font-weight: 900;
    line-height: 1;
    font-size: 2.6rem;
    color: var(--arena-accent);
  }
  /* Ratings and the secondary row are one grid under the card. Every slot has
     a fixed height, and the finer ratings only toggle visibility, so nothing
     moves on flip.
     Phones (approved): ratings, finer ratings, then tools · pager.
     Desktop: the finer ratings take the otherwise empty right-hand cell of the
     secondary row, so no empty row is reserved between the ratings and it. */
  .fc-controls {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
      "rate rate rate"
      "fine fine fine"
      "tools pager .";
    /* Explicit row heights (the .fc-rate height), so the pending prompt that
       replaces both rating rows can't change the grid's height. */
    grid-template-rows: 3.5rem 3.5rem auto;
    row-gap: 0.5rem;
    align-items: center;
  }
  .fc-rate-row { grid-area: rate; }
  .fc-fine { grid-area: fine; }
  .fc-tools { grid-area: tools; display: flex; align-items: center; gap: 0.375rem; }
  .fc-pager { grid-area: pager; display: flex; align-items: center; gap: 0.5rem; }
  .fc-tools, .fc-pager { margin-top: 0.75rem; }
  /* While a swipe's rating waits for Next Card, the prompt covers the rating
     and finer-rating rows; the hidden finer buttons beneath it ignore input. */
  .fc-pending {
    grid-row: 1 / span 2;
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
  }
  .fc-fine-label { display: inline; }
  @media (min-width: 640px) {
    .fc-pager { gap: 0.75rem; }
  }
  @media (min-width: 1024px) {
    .fc-controls {
      grid-template-areas:
        "rate rate rate"
        "tools pager fine";
      grid-template-rows: 3.5rem auto;
      row-gap: 1.5rem;
    }
    .fc-tools, .fc-pager { margin-top: 0; }
    .fc-fine { display: flex; justify-self: end; gap: 0.5rem; }
    .fc-fine .fc-rate { min-height: 2.75rem; padding: 0.25rem 1rem; border-radius: 0.875rem; }
    .fc-fine-label { display: flex; flex-direction: column; align-items: center; line-height: 1.2; }
    .fc-fine-sep { display: none; }
    /* Same height as the ratings: the prompt on the left, Next Card where
       Know was. */
    .fc-pending {
      grid-row: auto;
      grid-area: rate;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 1rem;
    }
    .fc-pending > p { text-align: left; font-size: 0.875rem; }
    .fc-pending > button { max-width: none; }
  }
  /* Short laptops: tighten the stage spacing before the type gets smaller. */
  @media (min-width: 1024px) and (max-height: 760px) {
    .fc-stage { padding-block: 0.75rem; }
    .fc-progress { margin-bottom: 1rem; }
    .flashcard-arena .fc-card-slot { margin-bottom: 1.5rem; }
    .fc-controls { row-gap: 1rem; }
  }
  .fc-rate {
    display: flex;
    min-height: 3.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.125rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 700;
    touch-action: manipulation;
    transition: transform 150ms ease, background-color 150ms ease, opacity 150ms ease;
  }
  .fc-rate:active:not(:disabled) { transform: scale(0.97); }
  .fc-rate:disabled { opacity: 0.45; cursor: not-allowed; }
  .fc-rate:focus-visible { outline: 2px solid var(--arena-accent); outline-offset: 3px; }
  .fc-rate-sub { font-size: 10px; font-weight: 400; opacity: 0.65; }
  .fc-icon-btn {
    display: inline-flex;
    height: 2.75rem;
    min-width: 2.75rem;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.75rem;
    font-weight: 600;
    transition: background-color 150ms ease, color 150ms ease;
  }
  .fc-icon-btn.fc-icon-btn-sm { height: 2.5rem; min-width: 2.5rem; }
  .fc-icon-btn:hover:not(:disabled) { background: rgba(255, 255, 255, 0.12); color: #fff; }
  .fc-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .fc-icon-btn:focus-visible { outline: 2px solid var(--arena-accent); outline-offset: 2px; }
  .fc-chip[aria-pressed="true"] {
    color: #fff;
    border-color: color-mix(in srgb, var(--arena-accent) 45%, transparent);
    background: color-mix(in srgb, var(--arena-accent) 16%, transparent);
  }
  .fc-fav[aria-pressed="true"] {
    color: #fda4af;
    border-color: rgba(251, 113, 133, 0.4);
    background: rgba(244, 63, 94, 0.18);
  }
  .fc-complete { animation: fc-fade-in 240ms ease both; }
  @media (prefers-reduced-motion: reduce) {
    .flashcard-arena .flashcard-inner { transition: none; }
    .fc-stack-layer-1 { transition: none; }
    .fc-card-motion.is-entering { animation: fc-fade-in 120ms linear both; }
    .fc-card-motion.is-exit-right,
    .fc-card-motion.is-exit-left { animation: fc-fade-out 120ms linear forwards; }
    .fc-rate:active:not(:disabled) { transform: none; }
  }
`;

export function FlashcardArena({
  subjectId,
  children,
}: {
  subjectId?: string | null;
  children: ReactNode;
}) {
  return (
    <LearningArena
      subjectId={subjectId}
      className="flashcard-arena"
      label="AcadeMY Flashcard Arena"
      atmosphere="planet"
      keepMobileNav
    >
      <style>{FLASHCARD_ARENA_CSS}</style>
      {children}
    </LearningArena>
  );
}

// The original card typography, stepped down only for the longest real cards
// (fronts ≤ ~160 chars, backs ≤ ~300) so every card fits without the arena
// changing size between cards.
function frontTextClass(text: string) {
  if (text.length <= 110) return "text-2xl leading-tight sm:text-4xl";
  return "text-xl leading-tight sm:text-3xl";
}

function backTextClass(text: string) {
  if (text.length <= 120) return "text-xl leading-relaxed sm:text-3xl";
  if (text.length <= 200) return "text-lg leading-relaxed sm:text-2xl";
  return "text-base leading-relaxed sm:text-xl";
}

// Desktop type tiers (see `data-length` in the arena CSS). A handful of steps,
// never a per-character scale; anything longer scrolls inside the card.
function frontLength(text: string) {
  if (text.length <= 80) return "short";
  if (text.length <= 140) return "medium";
  return "long";
}

function backLength(text: string) {
  if (text.length <= 120) return "short";
  if (text.length <= 200) return "medium";
  return "long";
}

/** Marks which edges of a face's scroll region hide more content, for the fade. */
function syncOverflowFade(el: HTMLElement) {
  const above = el.scrollTop > 1;
  const below = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
  const more = above && below ? "both" : above ? "above" : below ? "below" : "";
  if (more) el.dataset.more = more;
  else delete el.dataset.more;
}

/** Resets and re-measures both faces whenever `contentKey` changes (a new card). */
function useOverflowFade(contentKey: string) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const bodies = [frontRef.current, backRef.current].filter(
      (el): el is HTMLDivElement => el !== null,
    );
    bodies.forEach((el) => {
      el.scrollTop = 0;
      syncOverflowFade(el);
    });
    if (typeof ResizeObserver === "undefined") return;
    // Re-measure when the card resizes or late-loading fonts reflow the text.
    const observer = new ResizeObserver(() => bodies.forEach(syncOverflowFade));
    bodies.forEach((el) => {
      observer.observe(el);
      if (el.firstElementChild) observer.observe(el.firstElementChild);
    });
    return () => observer.disconnect();
  }, [contentKey]);
  return { frontRef, backRef };
}

/**
 * The active card plus up to two decorative layers behind it. Only the top
 * card is interactive; the layers carry no text and ignore pointer events.
 */
export function FlashcardDeck({
  turnKey,
  front,
  back,
  metaLabel,
  favourite,
  onToggleFavourite,
  watermark,
  flipped,
  exit,
  remaining,
  dragProgress,
  cardRef,
  cardStyle,
  ariaLabel,
  hint,
  knowCueOpacity,
  dontKnowCueOpacity,
  ratingCue,
  showXp,
  onFlip,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: {
  turnKey: string;
  front: string;
  back: string;
  metaLabel: string;
  favourite: boolean;
  onToggleFavourite: () => void;
  watermark: readonly [string, string] | null;
  flipped: boolean;
  exit: "left" | "right" | null;
  remaining: number;
  dragProgress: number;
  cardRef: Ref<HTMLDivElement>;
  cardStyle: CSSProperties;
  ariaLabel: string;
  hint: string;
  knowCueOpacity: number;
  dontKnowCueOpacity: number;
  ratingCue: { text: string; tone: "know" | "review" } | null;
  showXp: boolean;
  onFlip: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
}) {
  const { frontRef, backRef } = useOverflowFade(turnKey);
  const onBodyScroll = (event: UIEvent<HTMLDivElement>) => syncOverflowFade(event.currentTarget);
  return (
    <div className="fc-card-slot">
      {remaining > 2 && <div aria-hidden="true" className="fc-stack-layer fc-stack-layer-2" />}
      {remaining > 1 && (
        <div
          aria-hidden="true"
          className="fc-stack-layer fc-stack-layer-1"
          style={{ ["--fc-drag" as string]: dragProgress }}
        />
      )}
      {remaining > 1 && (
        <div className="fc-left-pill" aria-hidden="true">
          {remaining} left
        </div>
      )}
      <div
        key={turnKey}
        className={`fc-card-motion ${exit === "right" ? "is-exit-right" : exit === "left" ? "is-exit-left" : "is-entering"}`}
      >
        <div
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={ariaLabel}
          onClick={onFlip}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          className="flashcard-study-card"
          style={cardStyle}
        >
          {knowCueOpacity > 0 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-4 z-30 -rotate-6 rounded-xl border-2 border-emerald-400 px-3 py-1 text-lg font-black uppercase tracking-wide text-emerald-400"
              style={{ opacity: knowCueOpacity }}
            >
              Know
            </div>
          )}
          {dontKnowCueOpacity > 0 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 z-30 rotate-6 rounded-xl border-2 border-rose-400 px-3 py-1 text-lg font-black uppercase tracking-wide text-rose-400"
              style={{ opacity: dontKnowCueOpacity }}
            >
              Don&apos;t know
            </div>
          )}
          {ratingCue && (
            <div
              className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-lg"
              style={{ backgroundColor: ratingCue.tone === "know" ? "#22C55E" : "#F43F5E" }}
            >
              {ratingCue.text}
            </div>
          )}
          {showXp && (
            <div className="pointer-events-none absolute left-1/2 top-6 z-40 animate-xp-float font-display text-2xl font-bold text-emerald-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]">
              +XP
            </div>
          )}
          <div className="flashcard-scene">
            <div className={`flashcard-inner${flipped ? " is-flipped" : ""}`}>
              <div className="flashcard-face flashcard-front fc-face" aria-hidden={flipped}>
                {watermark && (
                  <span aria-hidden className="fc-watermark" style={{ opacity: 0.12 }}>
                    {watermark[0]}
                  </span>
                )}
                <div className="fc-face-head">
                  <span className="fc-meta min-w-0 truncate text-xs font-semibold text-white/60">
                    {metaLabel}
                  </span>
                  <button
                    type="button"
                    aria-label={favourite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={favourite}
                    tabIndex={flipped ? -1 : 0}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavourite();
                    }}
                    className={`shrink-0 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 ${
                      favourite
                        ? "bg-rose-500/20 text-rose-300"
                        : "bg-white/5 text-white/55 hover:text-rose-300"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favourite ? "fill-current" : ""}`} />
                  </button>
                </div>
                <div ref={frontRef} className="fc-face-body" onScroll={onBodyScroll}>
                  <p
                    className={`fc-question font-display font-bold ${frontTextClass(front)}`}
                    data-length={frontLength(front)}
                  >
                    {front}
                  </p>
                </div>
                <p className="fc-face-foot fc-hint text-center text-xs text-white/50">
                  {hint.split(" · ").map((part, index) => (
                    <span key={part} className={index === 0 ? "lg:block" : ""}>
                      {index > 1 ? (
                        " · "
                      ) : index === 1 ? (
                        <span className="lg:hidden"> · </span>
                      ) : null}
                      {part}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flashcard-face flashcard-back fc-face" aria-hidden={!flipped}>
                {watermark && (
                  <span aria-hidden className="fc-watermark" style={{ opacity: 0.14 }}>
                    {watermark[1]}
                  </span>
                )}
                <div className="fc-face-head">
                  <span className="fc-meta min-w-0 truncate text-xs font-semibold text-white/60">
                    {metaLabel}
                  </span>
                </div>
                <div ref={backRef} className="fc-face-body" onScroll={onBodyScroll}>
                  <p
                    className={`fc-answer whitespace-pre-line font-display ${backTextClass(back)}`}
                    data-length={backLength(back)}
                  >
                    {back}
                  </p>
                </div>
                <p className="fc-face-foot fc-hint text-center text-xs text-white/50">
                  Tap to flip back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Rating controls in the flashcard colours (rose / orange / emerald / sky),
 * plus the secondary row (`tools` on the left, `pager` in the centre) so the
 * whole set lays out as one grid under the card. Every slot keeps a fixed
 * height across all three states (question showing / answer showing / swipe
 * decision pending), so nothing jumps when the learner flips or decides.
 */
export function FlashcardControls({
  flipped,
  pending,
  disabled,
  onDontKnow,
  onKnow,
  onAlmost,
  onEasy,
  onNext,
  tools,
  pager,
}: {
  flipped: boolean;
  pending: "know" | "review" | null;
  disabled: boolean;
  onDontKnow: () => void;
  onKnow: () => void;
  onAlmost: () => void;
  onEasy: () => void;
  onNext: () => void;
  tools?: ReactNode;
  pager?: ReactNode;
}) {
  const showFine = flipped && !pending;
  return (
    <div className="fc-controls">
      {pending ? (
        <div className="fc-pending">
          <p className="text-center text-xs text-white/60" aria-live="polite">
            {pending === "know"
              ? "Marked as known — read the answer, then continue."
              : "Marked for review — read the answer, then continue."}
          </p>
          <button
            type="button"
            aria-label="Continue to the next card"
            onClick={onNext}
            className="mx-auto flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[#8B5CF6] px-6 text-base font-bold text-white shadow-lg transition-all hover:bg-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] active:scale-95"
          >
            Next Card <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="fc-rate-row grid grid-cols-2 gap-2.5 lg:gap-4">
          <button
            type="button"
            aria-label="Don't know — review this card again"
            onClick={onDontKnow}
            disabled={disabled}
            className="fc-rate bg-rose-500/15 text-rose-200 hover:bg-rose-500/25"
          >
            <span className="inline-flex items-center gap-1.5">
              <X className="h-4 w-4" aria-hidden="true" /> Don&apos;t know
            </span>
            <span className="fc-rate-sub">Lagi</span>
          </button>
          <button
            type="button"
            aria-label="Know this card"
            onClick={onKnow}
            disabled={disabled}
            className="fc-rate bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4" aria-hidden="true" /> Know
            </span>
            <span className="fc-rate-sub">Tahu{flipped ? " · +10 XP" : ""}</span>
          </button>
        </div>
      )}
      {/* The finer ratings stay available once the answer is showing.
          Hidden (not removed) before that so their slot never changes size. */}
      <div
        className="fc-fine grid grid-cols-2 gap-2.5"
        style={{ visibility: showFine ? "visible" : "hidden" }}
        aria-hidden={!showFine}
      >
        <button
          type="button"
          aria-label="Rate this card Almost"
          onClick={onAlmost}
          disabled={disabled || !showFine}
          tabIndex={showFine ? 0 : -1}
          className="fc-rate min-h-11 bg-orange-500/15 text-orange-200 hover:bg-orange-500/25"
        >
          <span className="fc-fine-label">
            <span>😓 Almost</span>{" "}
            <span className="fc-rate-sub">
              <span className="fc-fine-sep">· </span>Hampir · No XP
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-label="Rate this card Easy"
          onClick={onEasy}
          disabled={disabled || !showFine}
          tabIndex={showFine ? 0 : -1}
          className="fc-rate min-h-11 bg-sky-500/15 text-sky-200 hover:bg-sky-500/25"
        >
          <span className="fc-fine-label">
            <span>✨ Easy</span>{" "}
            <span className="fc-rate-sub">
              <span className="fc-fine-sep">· </span>Mudah · +15 XP
            </span>
          </span>
        </button>
      </div>
      {tools && <div className="fc-tools">{tools}</div>}
      {pager && <div className="fc-pager">{pager}</div>}
    </div>
  );
}

export function FlashcardCompletion({
  setTitle,
  total,
  neededReview,
  bestStreak,
  xpEarned,
  nextSetTitle,
  onNextSet,
  onStudyAgain,
  onFinish,
}: {
  setTitle: string | null;
  total: number;
  neededReview: number;
  bestStreak: number;
  xpEarned: number;
  nextSetTitle: string | null;
  onNextSet: (() => void) | null;
  onStudyAgain: () => void;
  onFinish: () => void;
}) {
  const firstTime = Math.max(0, total - neededReview);
  const stats = [
    { label: "First try", value: firstTime },
    { label: "Needed review", value: neededReview },
    { label: "Best streak", value: bestStreak },
  ];
  return (
    <div className="fc-complete fc-column text-center" aria-live="polite">
      <div
        className="fc-face relative mx-auto w-full max-w-md"
        style={{ background: "linear-gradient(180deg, var(--fc-surface), var(--fc-surface-deep))" }}
      >
        <div className="text-5xl" aria-hidden="true">
          🏆
        </div>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-white/55">
          Set complete
        </p>
        {setTitle && <h2 className="mt-1 font-display text-2xl font-bold">{setTitle}</h2>}
        <p className="mt-5 font-display text-6xl font-black tabular-nums">{total}</p>
        <p className="text-sm font-semibold text-emerald-300">Mastered</p>
        <dl className="mt-5 grid grid-cols-3 gap-2 text-sm">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 p-3">
              <dd className="font-display text-xl font-bold tabular-nums">{stat.value}</dd>
              <dt className="text-[11px] text-white/55">{stat.label}</dt>
            </div>
          ))}
        </dl>
        {xpEarned > 0 && (
          <p className="mt-4 text-xs font-semibold text-nova-yellow">
            +{xpEarned} Activity XP earned
          </p>
        )}
      </div>
      <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2.5">
        {onNextSet && (
          <button
            type="button"
            onClick={onNextSet}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            {nextSetTitle ? `Continue to ${nextSetTitle}` : "Next set"}
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={onStudyAgain}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-transform hover:scale-[1.02] ${
            onNextSet
              ? "glass-strong text-white"
              : "fc-primary bg-gradient-to-r from-primary to-accent text-white"
          }`}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Study this set again
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="min-h-11 rounded-full px-6 text-sm font-semibold text-white/70 hover:text-white"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
