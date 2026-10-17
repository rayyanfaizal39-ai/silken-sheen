/** Pixels a pointer must travel before a press counts as a drag, not a tap. */
export const CARD_DRAG_THRESHOLD = 6;

/** How much more vertical than horizontal a move must be to count as a scroll. */
const VERTICAL_BIAS = 1.2;

export type CardDragIntent = "undecided" | "scroll" | "swipe";

/**
 * Decides what a press on the flashcard is turning into, from its movement so
 * far. Small moves stay "undecided" (still a tap). Mostly vertical movement is
 * a page "scroll" the browser owns (the card is `touch-action: pan-y`), so the
 * card must not track it. Anything else is a horizontal Know / Don't know
 * "swipe". Diagonals lean towards scrolling so reading is never interrupted.
 */
export function classifyCardDrag(dx: number, dy: number): CardDragIntent {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (ax < CARD_DRAG_THRESHOLD && ay < CARD_DRAG_THRESHOLD) return "undecided";
  return ay > ax * VERTICAL_BIAS ? "scroll" : "swipe";
}
