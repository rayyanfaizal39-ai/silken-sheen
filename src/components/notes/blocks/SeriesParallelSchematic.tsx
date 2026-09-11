import { useState } from "react";
import type {
  CircuitDiagramPart,
  CircuitKind,
  SeriesParallelBlock,
} from "@/content/form2/science/interactive-types";
import { InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { CircuitWorkedDiagram } from "./CircuitWorkedDiagram";

/**
 * SERIES VS PARALLEL — the side-by-side comparison.
 *
 * Two real circuit diagrams, not two cards of prose: a Current/Voltage/
 * Resistance property selector drives BOTH diagrams' highlighting and BOTH
 * formulas at once, so "series adds resistances, parallel doesn't" is
 * something a learner watches happen on two pictures together rather than
 * reads as two separate, disconnected facts. This is deliberately the ONLY
 * place series and parallel are compared — the standalone concept blocks
 * teach each one on its own first, and this teaches the difference between
 * them, once, right before Numerical Problems.
 */

type Property = "current" | "voltage" | "resistance";

const PROPERTY_HIGHLIGHT: Record<
  Property,
  { series: CircuitDiagramPart[]; parallel: CircuitDiagramPart[] }
> = {
  // Current: the whole path lights up — series' single loop, parallel's
  // trunk + both branches — and the I/I₁/I₂ arrows stay at full brightness.
  current: { series: ["source", "loop"], parallel: ["source", "r1", "r2"] },
  // Voltage: the source (the "V" the whole thing is measured against) AND
  // the resistors (V₁/V₂ are measured across them) light up together.
  voltage: { series: ["source", "r1", "r2"], parallel: ["source", "r1", "r2"] },
  // Resistance: only the resistors themselves — never the source or trunk.
  resistance: { series: ["r1", "r2"], parallel: ["r1", "r2"] },
};

function ruleFor(kind: CircuitKind, property: Property): string {
  if (property === "current") return kind.currentRule;
  if (property === "voltage") return kind.voltageRule;
  return kind.resistanceRule;
}

export function SeriesParallelSchematic({
  block,
  lang,
}: {
  block: SeriesParallelBlock;
  lang?: string;
}) {
  const [property, setProperty] = useState<Property>("current");
  const copy = figureCopy(lang);
  const series = block.kinds.find((k) => k.id === "series");
  const parallel = block.kinds.find((k) => k.id === "parallel");
  const highlight = PROPERTY_HIGHLIGHT[property];

  const properties: { id: Property; label: string }[] = [
    { id: "current", label: block.currentLabel },
    { id: "voltage", label: block.voltageLabel },
    { id: "resistance", label: block.resistanceLabel },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="grid gap-2.5 sm:grid-cols-2">
        {[series, parallel].map((kind) =>
          kind ? (
            <div key={kind.id} className="rounded-xl border border-primary/25 bg-card/60 p-2.5">
              <div className="mb-1.5 flex items-center justify-between gap-1.5">
                <span className="font-display text-[13px] font-bold text-foreground">
                  {kind.name}
                </span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  {kind.pathSummary}
                </span>
              </div>
              {block.circuits && (
                <CircuitWorkedDiagram
                  // Large enough that series-vs-parallel reads at a glance,
                  // even before a learner reads the "ONE PATH"/"SEVERAL
                  // BRANCHES" badge above it.
                  spec={{ ...block.circuits[kind.id], size: "large" }}
                  highlight={highlight[kind.id]}
                  dimArrows={property !== "current"}
                />
              )}
              <p className="font-display mt-2 text-center text-[15px] font-bold text-primary">
                {ruleFor(kind, property)}
              </p>
            </div>
          ) : null,
        )}
      </div>

      <div
        className="mt-3 flex flex-wrap justify-center gap-1.5"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {properties.map((p) => {
          const isActive = property === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setProperty(p.id)}
              className={`min-h-11 cursor-pointer rounded-full border-2 px-3.5 py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/55 text-muted-foreground hover:border-primary"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* One sentence per selected property — never the same caption twice
          in a row, so it actually explains what just changed on screen. */}
      <p
        aria-live="polite"
        className="mt-2 text-center text-[12px] leading-relaxed text-muted-foreground"
      >
        {block.propertyExplanations?.[property] ?? block.hint}
      </p>
    </div>
  );
}
