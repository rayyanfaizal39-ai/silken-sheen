import { useState } from "react";
import type { EcholocationBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Sonar and bat echolocation, which are the same idea in two media.
 *
 * Both modes draw two pulses — one leaving the emitter and one coming back after
 * reflection. A single outgoing arrow would show a sound being sent, not a
 * distance being measured, and measuring the return is the entire application.
 *
 * The medium is drawn from `medium`, so the sonar case is always shown inside
 * water and the bat case in air. The pulses are positioned inside that medium
 * band rather than at fixed coordinates, so a mode can never appear to send its
 * pulse through the wrong material.
 */

const WIDTH = 320;
const HEIGHT = 176;

/** The band the pulse travels through, per medium. */
const MEDIUM_BAND = {
  water: { y: 52, h: 104 },
  air: { y: 34, h: 118 },
} as const;

const EMITTER_X = 62;
const TARGET_X = 258;

export function EcholocationDiagram({
  block,
  lang,
}: {
  block: EcholocationBlock;
  lang?: string;
}) {
  const [which, setWhich] = useState<"sonar" | "bat">(block.modes[0]?.id ?? "sonar");
  const copy = figureCopy(lang);
  const active = block.modes.find((m) => m.id === which) ?? block.modes[0];
  const band = MEDIUM_BAND[active.medium];

  /** Both pulses ride inside the medium band, never outside it. */
  const outY = band.y + band.h * 0.34;
  const backY = band.y + band.h * 0.66;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={which === m.id}
            onClick={() => setWhich(m.id)}
            className={conceptButtonClass(which === m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={`${active.emitterLabel} → ${active.targetLabel} → ${active.emitterLabel}`}
        >
          <defs>
            <marker id="ech-out" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="fill-primary" />
            </marker>
            <marker id="ech-back" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="fill-accent" />
            </marker>
          </defs>

          {/* The medium the pulse actually travels through. */}
          <rect
            x="6"
            y={band.y}
            width={WIDTH - 12}
            height={band.h}
            rx="8"
            className={
              active.medium === "water"
                ? "fill-primary/15 stroke-primary/40"
                : "fill-muted/25 stroke-border"
            }
            strokeWidth="1.5"
          />
          <text
            x={WIDTH - 14}
            y={band.y + 14}
            textAnchor="end"
            className="fill-muted-foreground"
            fontSize="9.5"
            fontStyle="italic"
          >
            {active.medium === "water" ? block.modes[0].label : ""}
          </text>

          {/* Emitter. */}
          <circle cx={EMITTER_X} cy={band.y + band.h / 2} r="12" className="fill-accent/85" />
          <text
            x={EMITTER_X}
            y={band.y - 8}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="10"
            fontWeight="700"
          >
            {active.emitterLabel}
          </text>

          {/* Target. */}
          <rect
            x={TARGET_X - 14}
            y={band.y + band.h / 2 - 14}
            width="28"
            height="28"
            rx="6"
            className="fill-muted-foreground/40 stroke-muted-foreground/75"
            strokeWidth="1.5"
          />
          <text
            x={TARGET_X}
            y={band.y - 8}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="10"
            fontWeight="700"
          >
            {active.targetLabel}
          </text>

          {/* Outgoing pulse. */}
          <line
            x1={EMITTER_X + 18}
            y1={outY}
            x2={TARGET_X - 20}
            y2={outY}
            className="stroke-primary"
            strokeWidth="2.5"
            markerEnd="url(#ech-out)"
          />
          <text
            x={(EMITTER_X + TARGET_X) / 2}
            y={outY - 7}
            textAnchor="middle"
            className="fill-primary"
            fontSize="9.5"
            fontWeight="600"
          >
            {block.outgoingLabel}
          </text>

          {/* Returning pulse, after reflecting off the target. */}
          <line
            x1={TARGET_X - 20}
            y1={backY}
            x2={EMITTER_X + 18}
            y2={backY}
            className="stroke-accent"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            markerEnd="url(#ech-back)"
          />
          <text
            x={(EMITTER_X + TARGET_X) / 2}
            y={backY + 15}
            textAnchor="middle"
            className="fill-accent"
            fontSize="9.5"
            fontWeight="600"
          >
            {block.returningLabel}
          </text>
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>
      <p className="mt-2 rounded-xl border border-border bg-background/45 p-2.5 text-[13px] leading-relaxed text-foreground/90">
        <b className="font-display">{active.label}</b> — {active.note}
      </p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
