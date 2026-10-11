import type { Rect } from "./layout";

// Camera maths for the mind map. A camera maps world → screen as
// screen = world * s + (x, y). Framing functions are pure so the follow
// behaviour can be tested without a browser; CameraController applies a
// camera to the DOM with transforms only, outside React rendering.

export type Camera = { x: number; y: number; s: number };
export type Insets = { top: number; right: number; bottom: number; left: number };
export type Viewport = { w: number; h: number; insets: Insets };
export type ScalePolicy = {
  /** Lowest scale reachable manually or through Fit (overview). */
  min: number;
  max: number;
  /** Automatic camera moves never go below this: text stays readable. */
  minRead: number;
  /** Scale restored when a selection happens while zoomed out too far. */
  read: number;
};

export const DESKTOP_SCALE: ScalePolicy = { min: 0.12, max: 2.2, minRead: 0.8, read: 1 };
export const COMPACT_SCALE: ScalePolicy = { min: 0.12, max: 2.2, minRead: 0.88, read: 1 };

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

export function safeArea(vp: Viewport, pad: number) {
  const left = vp.insets.left + pad;
  const top = vp.insets.top + pad;
  const right = Math.max(left + 1, vp.w - vp.insets.right - pad);
  const bottom = Math.max(top + 1, vp.h - vp.insets.bottom - pad);
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

function width(r: Rect) {
  return r.maxX - r.minX;
}
function height(r: Rect) {
  return r.maxY - r.minY;
}

/**
 * Translation on one axis that brings [bMin, bMax] into [lo, hi] with the
 * smallest move. When the box cannot fit, it is aligned by `mode` while the
 * anchor (the selected card) is kept fully inside the safe range.
 */
function solveAxis(
  bMin: number,
  bMax: number,
  aMin: number,
  aMax: number,
  s: number,
  t0: number,
  lo: number,
  hi: number,
  mode: "start" | "center",
) {
  const room = hi - lo;
  if ((bMax - bMin) * s <= room) {
    const start = bMin * s + t0;
    const end = bMax * s + t0;
    if (start < lo) return t0 + (lo - start);
    if (end > hi) return t0 - (end - hi);
    return t0;
  }
  let t = mode === "start" ? lo - bMin * s : (lo + hi) / 2 - ((aMin + aMax) / 2) * s;
  if (mode === "center") {
    // Do not leave empty canvas before the first or after the last item.
    if (bMin * s + t > lo) t = lo - bMin * s;
    if (bMax * s + t < hi) t = hi - bMax * s;
  }
  if (aMax * s + t > hi) t -= aMax * s + t - hi;
  if (aMin * s + t < lo) t += lo - (aMin * s + t);
  return t;
}

/**
 * Camera that keeps the selected card readable and as much of `focus`
 * (the card plus anything it just revealed) visible as possible, moving the
 * least distance from the current camera. Optional `context` (the parent)
 * is included only when it fits too.
 */
export function followCamera({
  cam,
  vp,
  anchor,
  focus,
  context,
  policy,
  pad = 28,
}: {
  cam: Camera;
  vp: Viewport;
  anchor: Rect;
  focus: Rect;
  context?: Rect | null;
  policy: ScalePolicy;
  pad?: number;
}): Camera {
  const safe = safeArea(vp, pad);
  let s = cam.s < policy.minRead ? policy.read : cam.s;
  // The selected card itself must always fit.
  s = Math.min(
    s,
    safe.width / Math.max(1, width(anchor)),
    safe.height / Math.max(1, height(anchor)),
  );
  // Zoom out a little to show revealed children, but never below readable.
  const fitFocus = Math.min(
    safe.width / Math.max(1, width(focus)),
    safe.height / Math.max(1, height(focus)),
  );
  if (fitFocus < s) s = Math.max(fitFocus, Math.min(s, policy.minRead));
  s = clamp(s, policy.min, policy.max);

  let box = focus;
  if (context) {
    const withContext: Rect = {
      minX: Math.min(focus.minX, context.minX),
      maxX: Math.max(focus.maxX, context.maxX),
      minY: Math.min(focus.minY, context.minY),
      maxY: Math.max(focus.maxY, context.maxY),
    };
    if (width(withContext) * s <= safe.width && height(withContext) * s <= safe.height) {
      box = withContext;
    }
  }

  // Zoom about the anchor's current screen position so a scale change does
  // not throw the selected card across the screen.
  const ax = (anchor.minX + anchor.maxX) / 2;
  const ay = (anchor.minY + anchor.maxY) / 2;
  const x0 = ax * cam.s + cam.x - ax * s;
  const y0 = ay * cam.s + cam.y - ay * s;

  return {
    s,
    x: solveAxis(
      box.minX,
      box.maxX,
      anchor.minX,
      anchor.maxX,
      s,
      x0,
      safe.left,
      safe.right,
      "start",
    ),
    y: solveAxis(
      box.minY,
      box.maxY,
      anchor.minY,
      anchor.maxY,
      s,
      y0,
      safe.top,
      safe.bottom,
      "center",
    ),
  };
}

/** Whole-rect overview, used by Fit. May go below the reading scale. */
export function fitCamera(rect: Rect, vp: Viewport, policy: ScalePolicy, maxScale = 1, pad = 36) {
  const safe = safeArea(vp, pad);
  const s = clamp(
    Math.min(safe.width / Math.max(1, width(rect)), safe.height / Math.max(1, height(rect))),
    policy.min,
    Math.min(policy.max, maxScale),
  );
  return {
    s,
    x: safe.left + safe.width / 2 - ((rect.minX + rect.maxX) / 2) * s,
    y: safe.top + safe.height / 2 - ((rect.minY + rect.maxY) / 2) * s,
  };
}

export function zoomAt(cam: Camera, px: number, py: number, factor: number, policy: ScalePolicy) {
  const s = clamp(cam.s * factor, policy.min, policy.max);
  const ratio = s / cam.s;
  return { s, x: px - (px - cam.x) * ratio, y: py - (py - cam.y) * ratio };
}

/** 300–520 ms depending on how far the camera travels. */
export function cameraDuration(from: Camera, to: Camera) {
  const distance =
    Math.hypot(to.x - from.x, to.y - from.y) + Math.abs(Math.log(to.s / from.s)) * 600;
  if (distance < 1) return 0;
  return Math.round(300 + clamp(distance / 4, 0, 220));
}

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Owns the live camera. Writes `transform` straight to the world element,
 * so panning and camera animations never re-render React. Subscribers
 * (minimap, zoom readout) are notified at most once per frame.
 */
export class CameraController {
  cam: Camera = { x: 0, y: 0, s: 1 };
  private world: HTMLElement | null = null;
  private frame: number | null = null;
  private notifyFrame: number | null = null;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners = new Set<() => void>();
  onApply: ((cam: Camera) => void) | null = null;

  attach(world: HTMLElement | null) {
    this.world = world;
    if (world) this.write();
  }

  get animating() {
    return this.frame !== null;
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.cam;

  set(cam: Camera) {
    if (!Number.isFinite(cam.x) || !Number.isFinite(cam.y) || !Number.isFinite(cam.s)) return;
    this.cam = { x: cam.x, y: cam.y, s: cam.s };
    this.write();
  }

  stop() {
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
  }

  /** Interruptible: a new call always starts from wherever the camera is now. */
  animateTo(target: Camera, duration = cameraDuration(this.cam, target), onDone?: () => void) {
    this.stop();
    if (!Number.isFinite(target.x) || !Number.isFinite(target.y) || !Number.isFinite(target.s)) {
      return;
    }
    if (duration <= 0 || prefersReducedMotion()) {
      this.set(target);
      onDone?.();
      return;
    }
    const start = this.cam;
    const startedAt = performance.now();
    const step = (now: number) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const eased = easeInOutCubic(progress);
      // Interpolate scale geometrically so zooms feel even.
      const s = start.s * Math.pow(target.s / start.s, eased);
      this.set({
        s,
        x: start.x + (target.x - start.x) * eased,
        y: start.y + (target.y - start.y) * eased,
      });
      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      } else {
        this.frame = null;
        onDone?.();
      }
    };
    this.frame = requestAnimationFrame(step);
  }

  dispose() {
    this.stop();
    if (this.notifyFrame !== null) cancelAnimationFrame(this.notifyFrame);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.listeners.clear();
  }

  private write() {
    const world = this.world;
    if (world) {
      const { x, y, s } = this.cam;
      world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      // Promote the layer only while moving: a permanently promoted layer is
      // rasterised once and scaled, which leaves text blurry after a zoom.
      world.style.willChange = "transform";
      if (this.idleTimer) clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        if (this.world) this.world.style.willChange = "auto";
      }, 180);
    }
    this.onApply?.(this.cam);
    if (this.notifyFrame === null && typeof requestAnimationFrame === "function") {
      this.notifyFrame = requestAnimationFrame(() => {
        this.notifyFrame = null;
        this.listeners.forEach((listener) => listener());
      });
    }
  }
}
