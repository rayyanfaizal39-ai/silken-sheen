import { useState } from "react";
import type { CometOrbitBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Rajah 13.4 — a comet on its elliptical orbit, and which way its tail points.
 *
 * Three named positions, not five numbered ones: far from the Sun, nearest
 * the Sun, moving away. That is enough to teach the concept, and it reads as
 * three sentences instead of a geometry exercise. At every position the tail
 * is recomputed as the direction Sun → comet — never from the direction of
 * travel, which is why a comet moving away still trails its tail in FRONT of
 * it. `travel` stays on `cometGeometry`'s return even though nothing draws it
 * any more, because the "tail is not the travel direction" claim is still
 * asserted against it in tests.
 *
 * Nearer the Sun the coma is larger and brighter and the tail longer. Nothing
 * is computed from orbital mechanics beyond the ellipse itself.
 */

/**
 * The canvas is sized around the TAIL, not the orbit: at the nearest position
 * the tail is longest and points straight out from the Sun, past the ellipse.
 */
const VIEW_W = 420;
const VIEW_H = 260;
/** Ellipse geometry. The Sun sits at a focus, not the centre. */
const CX = 230;
const CY = VIEW_H / 2;
const RX = 125;
const RY = 74;
const FOCUS_OFFSET = Math.sqrt(RX * RX - RY * RY);
const FOCUS_X = CX - FOCUS_OFFSET;

/**
 * Far, nearest, moving away — in the order the comet visits them. 180° is
 * nearest the Sun. The "far" stop is 40°, not the true aphelion at 0°: it
 * keeps the tail short (still clearly far), while also being the one place
 * among the three where the tail visibly TRAILS the comet — at the exact
 * aphelion and perihelion points the tail is perpendicular to the direction
 * of travel, which would not demonstrate that the tail can trail as well as
 * lead. 40° shows both without a fourth stop.
 */
const STOPS = [40, 180, 300];

function pointAt(angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
}

/** Unit direction of travel along the orbit at an angle (the comet moves towards increasing angle). */
function travelAt(angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  const tx = -RX * Math.sin(a);
  const ty = RY * Math.cos(a);
  const m = Math.hypot(tx, ty) || 1;
  return { ux: tx / m, uy: ty / m };
}

/**
 * Where the comet sits at a position, which way its tail lies, and which way it
 * is moving.
 *
 * Exported so the tail rule is asserted at every position rather than eyeballed
 * at one: the tail must lie along Sun → comet everywhere, whatever `travel` is.
 */
export function cometGeometry(stopIndex: number) {
  const angle = STOPS[stopIndex % STOPS.length];
  const comet = pointAt(angle);
  const dx = comet.x - FOCUS_X;
  const dy = comet.y - CY;
  const dist = Math.hypot(dx, dy) || 1;
  const near = 1 - Math.min(dist / (RX + FOCUS_OFFSET), 1);
  return {
    sun: { x: FOCUS_X, y: CY },
    comet,
    tail: { ux: dx / dist, uy: dy / dist },
    travel: travelAt(angle),
    distanceToSun: dist,
    tailLength: 8 + near * 72,
    comaRadius: 5 + near * 10,
    isNear: near > 0.5,
  };
}

export const COMET_STOP_COUNT = STOPS.length;

/** The drawing canvas, so tests can assert nothing is clipped by it. */
export const COMET_VIEWBOX = { width: VIEW_W, height: VIEW_H };

const HALO = { paintOrder: "stroke" as const, strokeWidth: 3, strokeLinejoin: "round" as const };
/** The halo matches the card's own fixed navy background, not the site theme. */
const NAVY = "#0b1220";

export function CometOrbitFigure({ block, lang }: { block: CometOrbitBlock; lang?: string }) {
  const [stopIndex, setStopIndex] = useState(0);
  const copy = figureCopy(lang);

  const { comet, tail, tailLength, comaRadius, isNear } = cometGeometry(stopIndex);
  const { ux, uy } = tail;
  const stage = block.stages[stopIndex] ?? block.stages[0];
  const tailHalfWidth = isNear ? 8 : 5;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {STOPS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === stopIndex}
            aria-label={`${block.positionLabel} ${i + 1}: ${block.stages[i]?.label ?? ""}`}
            onClick={() => setStopIndex(i)}
            className={conceptButtonClass(i === stopIndex, "flex-auto sm:flex-none")}
          >
            {block.stages[i]?.label}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${block.figureLabel} — ${stage.label}`}
        data-ch13-figure="comet-orbit"
        data-position={stopIndex + 1}
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} rx="18" fill={NAVY} />

        <defs>
          <linearGradient
            id="c13-tail"
            x1={comet.x}
            y1={comet.y}
            x2={comet.x + ux * tailLength}
            y2={comet.y + uy * tailLength}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="c13-coma">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* elliptical orbit — a clean, thin cyan line, not a grey dashed one */}
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.4"
          opacity="0.6"
        />

        {/* the other two positions, small and dim — the three points on the
            orbit, with nothing to read except "there are three of them" */}
        {STOPS.map((deg, i) => {
          if (i === stopIndex) return null;
          const p = pointAt(deg);
          return <circle key={deg} cx={p.x} cy={p.y} r="3.2" fill="#475569" opacity="0.7" />;
        })}

        {/* solar wind, blowing outward from the Sun in every direction */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={FOCUS_X + 18 * Math.cos(a)}
              y1={CY + 18 * Math.sin(a)}
              x2={FOCUS_X + 31 * Math.cos(a)}
              y2={CY + 31 * Math.sin(a)}
              stroke="#fbbf24"
              strokeOpacity="0.5"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          );
        })}

        {/* the Sun, at a focus of the ellipse */}
        <circle cx={FOCUS_X} cy={CY} r="20" fill="#fbbf24" opacity="0.2" />
        <circle cx={FOCUS_X} cy={CY} r="14" fill="#fbbf24" />
        <text
          x={FOCUS_X}
          y={CY + 34}
          textAnchor="middle"
          fill="#e2e8f0"
          fontSize="12"
          fontWeight="700"
          stroke={NAVY}
          style={HALO}
        >
          {block.sunLabel}
        </text>

        {/* the tail: drawn along Sun -> comet, so it always points away */}
        <path
          data-comet-tail=""
          aria-label={block.tailLabel}
          d={`M ${comet.x - uy * tailHalfWidth} ${comet.y + ux * tailHalfWidth}
              L ${comet.x + ux * tailLength} ${comet.y + uy * tailLength}
              L ${comet.x + uy * tailHalfWidth} ${comet.y - ux * tailHalfWidth} Z`}
          fill="url(#c13-tail)"
        />

        {/* coma: grows and brightens near the Sun */}
        <circle
          cx={comet.x}
          cy={comet.y}
          r={comaRadius}
          fill="url(#c13-coma)"
          opacity={isNear ? 0.95 : 0.5}
        />

        {/* the head: a small dark rocky/icy core */}
        <circle cx={comet.x} cy={comet.y} r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />

        <text
          x="12"
          y="24"
          fill="#e2e8f0"
          fontSize="13"
          fontWeight="700"
          stroke={NAVY}
          style={HALO}
        >
          {stage.label}
        </text>
      </svg>

      <p className="mt-2 text-center text-[11px] italic text-muted-foreground">{block.scaleNote}</p>

      <div
        aria-live="polite"
        className="mt-3 rounded-xl border border-primary/35 bg-primary/8 px-3 py-2.5"
      >
        <p className="font-display text-[13px] font-bold text-primary">{stage.label}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground">{stage.body}</p>
        <p className="mt-2 text-[13px] font-semibold leading-relaxed text-foreground">
          {block.tailRule}
        </p>
      </div>
    </div>
  );
}
