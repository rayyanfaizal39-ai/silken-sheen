// Shared helpers for the landing/marketing pages to scale motion intensity
// down for users who asked for it (prefers-reduced-motion), coarse-pointer
// devices (phones/tablets — no mouse to parallax against), and small
// viewports (mobile, where continuous rotations/particles cost real battery
// and frame budget). Read once on the client; these never change mid-session
// in any way that matters for a landing page, so no listeners needed.

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

/** True when continuous/heavy motion (infinite rotations, particle loops, mouse parallax) should be skipped or simplified. */
export function shouldReduceMotion(): boolean {
  return prefersReducedMotion() || isCoarsePointer() || isMobileViewport();
}
