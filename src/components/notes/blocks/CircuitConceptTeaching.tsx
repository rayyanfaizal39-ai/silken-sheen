import type { CircuitConceptSection } from "@/content/form2/science/interactive-types";
import { CircuitWorkedDiagram } from "./CircuitWorkedDiagram";

/**
 * A standalone teaching block for ONE circuit type — series OR parallel,
 * taught as its own concept before either is ever compared to the other or
 * used in a calculation. Large diagram first (the picture IS the point),
 * then its I/V/R relationships as three compact, un-buried cards, then the
 * already-correct advantages/disadvantages kept visibly secondary — last,
 * smaller, after the concept and the formulas are both established.
 */
export function CircuitConceptTeaching({ block }: { block: CircuitConceptSection }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
          {block.tag}
        </span>
        <h3 className="font-display text-base font-bold text-foreground">{block.title}</h3>
      </div>

      <CircuitWorkedDiagram spec={{ ...block.circuit, size: "large" }} highlight={[]} />

      <p className="mt-2.5 text-[13px] leading-relaxed text-foreground">{block.explanation}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {block.relationships.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-primary/25 bg-card/60 px-3 py-2.5"
          >
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
              {card.label}
            </p>
            <p className="font-display mt-1 text-[16px] font-bold text-foreground">
              {card.formula}
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">
              {card.teachingPoint}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-emerald-500">
            {block.advantagesLabel}
          </p>
          <ul className="mt-1 flex flex-col gap-1 text-[12px] leading-relaxed text-foreground">
            {block.advantages.map((a) => (
              <li key={a} className="before:mr-1.5 before:content-['•']">
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-amber-500">
            {block.disadvantagesLabel}
          </p>
          <ul className="mt-1 flex flex-col gap-1 text-[12px] leading-relaxed text-foreground">
            {block.disadvantages.map((d) => (
              <li key={d} className="before:mr-1.5 before:content-['•']">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
