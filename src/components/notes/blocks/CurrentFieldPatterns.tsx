import { useState } from "react";
import type { CurrentFieldPatternsBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge, PoleLabel } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Magnetic field patterns produced by a current.
 *
 * The reverse-current toggle exists to teach one specific source point: flipping
 * the current flips the field *direction* but leaves the *pattern* unchanged.
 * That is easy to state and easy to disbelieve, so here the arrowheads reverse
 * while the circles stay exactly where they were.
 *
 * The grip rule is rendered as ordered steps with current first, because the
 * rule takes current as its input and yields field as its output — stating it
 * the other way round is the error this chapter previously carried.
 */
export function CurrentFieldPatterns({
  block,
  lang,
}: {
  block: CurrentFieldPatternsBlock;
  lang?: string;
}) {
  const [shape, setShape] = useState(block.conductors[0]?.id ?? "straight");
  const [reversed, setReversed] = useState(false);
  const copy = figureCopy(lang);
  const active = block.conductors.find((c) => c.id === shape) ?? block.conductors[0];

  // One arrowhead, rotated. `reversed` flips it 180 degrees in place.
  const head = (x: number, y: number, deg: number, key: string) => (
    <path
      key={key}
      d="M-4,-3 L4,0 L-4,3 Z"
      transform={`translate(${x} ${y}) rotate(${deg + (reversed ? 180 : 0)})`}
      className="fill-emerald-300"
    />
  );

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.conductors.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={shape === c.id}
            onClick={() => setShape(c.id)}
            className={conceptButtonClass(shape === c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 300 150"
          className="mx-auto h-auto w-full min-w-[280px] max-w-[420px]"
          role="img"
          aria-label={active?.name ?? block.title}
        >
          {shape === "straight" && (
            <>
              {/* wire straight down the middle; concentric circles around it */}
              {[22, 38, 54].map((r) => (
                <circle
                  key={r}
                  cx={150}
                  cy={75}
                  r={r}
                  fill="none"
                  className="stroke-emerald-300/70"
                  strokeWidth="1.5"
                />
              ))}
              {[22, 38, 54].map((r) => head(150 + r, 75, 90, `s${r}`))}
              <line x1={150} y1={8} x2={150} y2={142} className="stroke-amber-400" strokeWidth="3" />
              <path
                d={`M150,${reversed ? 30 : 20} l-4,${reversed ? 8 : -8} M150,${reversed ? 30 : 20} l4,${reversed ? 8 : -8}`}
                className="stroke-amber-400"
                strokeWidth="2.5"
                fill="none"
              />
            </>
          )}

          {shape === "loop" && (
            <>
              {/* a single loop seen edge-on: circles round each side of the conductor */}
              {[-1, 1].map((side) => (
                <g key={side}>
                  {[14, 26].map((r) => (
                    <circle
                      key={r}
                      cx={150 + side * 52}
                      cy={75}
                      r={r}
                      fill="none"
                      className="stroke-emerald-300/70"
                      strokeWidth="1.4"
                    />
                  ))}
                  {head(150 + side * 52 + 26, 75, side > 0 ? 90 : -90, `l${side}`)}
                </g>
              ))}
              <ellipse
                cx={150}
                cy={75}
                rx={52}
                ry={40}
                fill="none"
                className="stroke-amber-400"
                strokeWidth="3"
              />
            </>
          )}

          {shape === "solenoid" && (
            <>
              {/* coil turns, with a bar-magnet-like field through and around */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <ellipse
                  key={i}
                  cx={96 + i * 22}
                  cy={75}
                  rx={9}
                  ry={30}
                  fill="none"
                  className="stroke-amber-400"
                  strokeWidth="2.4"
                />
              ))}
              <line x1={86} y1={75} x2={224} y2={75} className="stroke-emerald-300/80" strokeWidth="1.8" />
              {head(160, 75, 0, "sol-core")}
              <path
                d="M224,75 C268,75 272,20 150,26 C28,32 32,75 86,75"
                fill="none"
                className="stroke-emerald-300/60"
                strokeWidth="1.4"
              />
              <path
                d="M224,75 C268,75 272,130 150,124 C28,118 32,75 86,75"
                fill="none"
                className="stroke-emerald-300/60"
                strokeWidth="1.4"
              />
              <PoleLabel
                x={78}
                y={79}
                textAnchor="end"
                pole={reversed ? "north" : "south"}
                copy={copy}
                fontSize={10}
                className="fill-sky-300"
              />
              <PoleLabel
                x={232}
                y={79}
                textAnchor="start"
                pole={reversed ? "south" : "north"}
                copy={copy}
                fontSize={10}
                className="fill-rose-300"
              />
            </>
          )}
        </svg>
      </div>

      <button
        type="button"
        aria-pressed={reversed}
        onClick={() => setReversed((v) => !v)}
        className={conceptButtonClass(reversed, "mt-2 w-full sm:w-auto")}
      >
        ⇄ {block.keyPoint.split(".")[0]}
      </button>

      <div className="mt-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
          {block.gripRule.title}
        </p>
        <ol className="mt-1 flex list-decimal flex-col gap-0.5 pl-4">
          {block.gripRule.steps.map((s) => (
            <li key={s} className="text-[12.5px] leading-relaxed text-foreground">
              {s}
            </li>
          ))}
        </ol>
      </div>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {active && (
          <>
            <b className="text-primary">{active.name}</b> — <b>{block.patternLabel}:</b>{" "}
            {active.pattern} <b>{block.directionLabel}:</b> {active.direction}
          </>
        )}
      </p>

      <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{block.keyPoint}</p>
    </div>
  );
}
