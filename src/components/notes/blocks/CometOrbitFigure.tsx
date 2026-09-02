import { useState } from "react";
import type { CometOrbitBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Rajah 13.4 — a comet on its elliptical orbit, and which way its tail points.
 *
 * Text alone cannot settle the chapter's classic misconception. "The tail points
 * away from the Sun" sounds like it should mean "behind the comet", and it does
 * not: on the outbound leg the tail leads. So the learner moves the comet round
 * the orbit and the tail is recomputed each time as the direction Sun → comet,
 * which is the only rule the source states.
 *
 * The tail is drawn longer near the Sun, matching the source's "semakin laju,
 * mencair dan kelihatan seperti berekor panjang". The speed readout is the
 * source's own range; nothing is computed from orbital mechanics.
 */

/**
 * The canvas is sized around the TAIL, not the orbit.
 *
 * At perihelion the tail is at its longest and points straight out from the
 * Sun, so it reaches ~206 px to the left of the ellipse centre — well past the
 * orbit itself. A canvas drawn to fit the orbit clips exactly there, losing
 * half the tail at the one position whose whole point is that the tail is long.
 * So the box is the full content extent (364 x 242) plus margin, and the orbit
 * simply sits inside it. Aspect ratio is kept at ~1.53 so the rendered height
 * is unchanged; text and symbols are scaled to match the wider box.
 */
const VIEW_W = 430;
const VIEW_H = 280;
/** Ellipse geometry. The Sun sits at a focus, not the centre — the orbit is elliptical. */
const CX = 222;
const CY = VIEW_H / 2;
const RX = 132;
const RY = 78;
const FOCUS_X = CX - Math.sqrt(RX * RX - RY * RY);

/** Stops around the orbit, in degrees, starting at perihelion (nearest the Sun). */
const STOPS = [180, 240, 300, 0, 60, 120];

function pointAt(angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
}

/**
 * Where the comet sits at a stop, and which way its tail lies.
 *
 * Exported so the tail rule can be asserted at every position rather than
 * eyeballed at one: the tail must point along Sun → comet everywhere on the
 * orbit, which is what makes it *lead* the comet on the outbound leg.
 */
export function cometGeometry(stopIndex: number) {
  const comet = pointAt(STOPS[stopIndex % STOPS.length]);
  const dx = comet.x - FOCUS_X;
  const dy = comet.y - CY;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const near = 1 - Math.min(dist / (RX + Math.abs(FOCUS_X - CX)), 1);
  return {
    sun: { x: FOCUS_X, y: CY },
    comet,
    tail: { ux, uy },
    distanceToSun: dist,
    tailLength: 26 + near * 54,
    isNear: near > 0.5,
  };
}

export const COMET_STOP_COUNT = STOPS.length;

/** The drawing canvas, so tests can assert nothing is clipped by it. */
export const COMET_VIEWBOX = { width: VIEW_W, height: VIEW_H };

export function CometOrbitFigure({ block, lang }: { block: CometOrbitBlock; lang?: string }) {
  const [stopIndex, setStopIndex] = useState(0);
  const copy = figureCopy(lang);

  // the only rule the source gives: the tail lies along Sun -> comet, always
  const { comet, tail, tailLength: tailLen, isNear } = cometGeometry(stopIndex);
  const { ux, uy } = tail;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {STOPS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === stopIndex}
            onClick={() => setStopIndex(i)}
            className={conceptButtonClass(i === stopIndex)}
          >
            {block.positionLabel} {i + 1}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full min-w-[300px]"
          role="img"
          aria-label={block.figureLabel}
        >
          {/* elliptical orbit */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX}
            ry={RY}
            fill="none"
            className="stroke-muted-foreground/40"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />

          {/* solar wind, blowing outward from the Sun in every direction */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={FOCUS_X + 19 * Math.cos(a)}
                y1={CY + 19 * Math.sin(a)}
                x2={FOCUS_X + 34 * Math.cos(a)}
                y2={CY + 34 * Math.sin(a)}
                className="stroke-yellow-500/40"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            );
          })}

          {/* the Sun, at a focus of the ellipse */}
          <circle cx={FOCUS_X} cy={CY} r="16" className="fill-yellow-400" />
          <text
            x={FOCUS_X}
            y={CY + 35}
            textAnchor="middle"
            className="fill-current text-[11.5px] font-bold text-foreground"
          >
            {block.sunLabel}
          </text>

          {/* every stop, so the path is readable while one is selected */}
          {STOPS.map((deg, i) => {
            const p = pointAt(deg);
            return (
              <circle
                key={deg}
                cx={p.x}
                cy={p.y}
                r="3.4"
                className={i === stopIndex ? "fill-transparent" : "fill-muted-foreground/45"}
              />
            );
          })}

          {/* the tail: drawn along Sun -> comet, so it always points away */}
          <defs>
            <linearGradient
              id="c13-tail"
              x1={comet.x}
              y1={comet.y}
              x2={comet.x + ux * tailLen}
              y2={comet.y + uy * tailLen}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M ${comet.x - uy * 6.5} ${comet.y + ux * 6.5}
                L ${comet.x + ux * tailLen} ${comet.y + uy * tailLen}
                L ${comet.x + uy * 6.5} ${comet.y - ux * 6.5} Z`}
            fill="url(#c13-tail)"
            className="text-sky-400"
          />

          {/* the comet head */}
          <circle cx={comet.x} cy={comet.y} r="8" className="fill-sky-200 stroke-sky-500" strokeWidth="2" />

          {/* the rule, stated on the drawing itself */}
          <line
            x1={FOCUS_X + ux * 21}
            y1={CY + uy * 21}
            x2={comet.x - ux * 13}
            y2={comet.y - uy * 13}
            className="stroke-muted-foreground/50"
            strokeWidth="1.3"
            strokeDasharray="3 4"
          />

          <text x="11" y="21" className="fill-current text-[11.5px] font-semibold text-muted-foreground">
            {isNear ? block.nearSunLabel : block.farSunLabel}
          </text>
          <text x="11" y={VIEW_H - 11} className="fill-current text-[11.5px] font-bold text-foreground">
            {isNear ? block.nearSpeedLabel : block.farSpeedLabel}
          </text>
        </svg>
      </div>

      <p className="mt-2 text-center text-[11px] italic text-muted-foreground">{block.scaleNote}</p>

      <div className="mt-3 rounded-xl border border-primary/20 bg-background/70 p-3">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {isNear ? block.nearBody : block.farBody}
        </p>
        <p className="mt-2 text-[13px] font-semibold leading-relaxed text-foreground">{block.tailRule}</p>
      </div>
    </div>
  );
}
