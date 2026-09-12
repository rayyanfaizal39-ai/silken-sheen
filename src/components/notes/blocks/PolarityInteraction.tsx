import { useState } from "react";
import type { PolarityInteractionBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

// One arrow per charge, drawn below it. Fixed length regardless of how far
// apart the two charges sit, so the pair is always two equal, independent
// arrows rather than one line stretched across whatever gap the charges
// happen to have — the exact defect a prior version of this figure had.
const ARROW_Y = 100;
const ARROW_HALF = 18;

/**
 * One charge's own arrow, as an SVG line command: fixed length (`2 *
 * ARROW_HALF`) centred on that charge's x, pointing toward increasing x when
 * `pointsRight` is true, toward decreasing x otherwise. Exported so a test
 * can confirm both charges in a pair always get an equal-length arrow,
 * independent of how far apart the two charges are drawn.
 */
export function chargeArrowPath(chargeX: number, pointsRight: boolean): string {
  const from = pointsRight ? chargeX - ARROW_HALF : chargeX + ARROW_HALF;
  const to = pointsRight ? chargeX + ARROW_HALF : chargeX - ARROW_HALF;
  return `M${from},${ARROW_Y} L${to},${ARROW_Y}`;
}

/**
 * The electrostatic force rule, shown rather than only stated: pick a pair of
 * charges and watch the arrows point together or apart.
 *
 * Deterministic SVG, not a baked-in image, so the same file teaches both
 * languages and the direction is drawn — not implied by an icon a learner
 * might not read as motion.
 */
export function PolarityInteraction({
  block,
  lang,
}: {
  block: PolarityInteractionBlock;
  lang?: string;
}) {
  const [active, setActive] = useState(block.pairs[0]?.id ?? "");
  const copy = figureCopy(lang);
  const pair = block.pairs.find((p) => p.id === active) ?? block.pairs[0];
  if (!pair) return null;

  const attracting = pair.outcome === "attract";
  // Charges start close for attraction (they end up meeting) and further
  // apart for repulsion (they end up pushed apart) — the resting distance
  // itself hints at the outcome before the arrows are even read.
  const leftX = attracting ? 92 : 70;
  const rightX = attracting ? 148 : 170;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div
        className="mb-2.5 flex flex-wrap justify-center gap-1.5"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {block.pairs.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={p.id === active}
            onClick={() => setActive(p.id)}
            className={conceptButtonClass(p.id === active)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 240 120"
        className="mx-auto h-auto w-full max-w-[320px]"
        role="img"
        aria-label={`${pair.label} — ${attracting ? block.attractLabel : block.repelLabel}`}
      >
        {/* One arrow per charge, anchored directly under it — never a single
            arrow spanning the gap between them. Both arrows share the same
            fixed length and stroke, so neither charge's force reads as
            stronger than the other's: attraction points both arrows inward,
            repulsion points both outward. */}
        <path
          d={chargeArrowPath(leftX, attracting)}
          className="stroke-primary"
          strokeWidth="3.5"
          strokeLinecap="round"
          markerEnd="url(#polarity-arrow)"
        />
        <path
          d={chargeArrowPath(rightX, !attracting)}
          className="stroke-primary"
          strokeWidth="3.5"
          strokeLinecap="round"
          markerEnd="url(#polarity-arrow)"
        />

        <defs>
          <marker
            id="polarity-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
            className="fill-primary"
          >
            <path d="M0,0 L8,4 L0,8 Z" />
          </marker>
        </defs>

        <circle
          cx={leftX}
          cy={60}
          r="22"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2.5"
        />
        <text
          x={leftX}
          y={67}
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          className="fill-primary"
        >
          {pair.leftCharge}
        </text>
        <circle
          cx={rightX}
          cy={60}
          r="22"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2.5"
        />
        <text
          x={rightX}
          y={67}
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          className="fill-primary"
        >
          {pair.rightCharge}
        </text>
      </svg>

      <p className="mt-1 text-center text-[12.5px] font-bold text-primary">
        {attracting ? block.attractLabel : block.repelLabel}
      </p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.5rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-1.5 text-[12px] leading-relaxed text-foreground"
      >
        {pair.note}
      </p>
    </div>
  );
}
