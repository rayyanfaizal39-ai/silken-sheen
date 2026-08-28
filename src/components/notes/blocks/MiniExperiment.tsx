import { useState } from "react";
import type { MiniExperimentBlock } from "@/content/form2/science/interactive-types";

/**
 * A compulsory experiment, staged compactly enough to sit inside a notes
 * section rather than expanding into a worksheet page.
 *
 * One tab per manipulated variable. The three variables are pinned at the top
 * in a fixed order and colour, because naming the manipulated and responding
 * variable is the part that gets examined — everything below them is support.
 */
export function MiniExperiment({ block }: { block: MiniExperimentBlock }) {
  const [activeId, setActiveId] = useState(block.parts[0]?.id ?? "");
  const part = block.parts.find((p) => p.id === activeId) ?? block.parts[0];

  if (!part) return null;

  const variables = [
    {
      key: "manipulated",
      label: block.manipulatedLabel,
      value: part.manipulated,
      tone: "border-amber-400/35 bg-amber-500/10 text-amber-200",
    },
    {
      key: "responding",
      label: block.respondingLabel,
      value: part.responding,
      tone: "border-sky-400/35 bg-sky-500/10 text-sky-200",
    },
    {
      key: "controlled",
      label: block.controlledLabel,
      value: part.controlled,
      tone: "border-violet-400/35 bg-violet-500/10 text-violet-200",
    },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="mb-3 rounded-xl border border-border bg-card/55 px-3 py-2">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
          {block.aimLabel}
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-foreground">{block.aim}</p>
      </div>

      {/* one tab per manipulated variable */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {block.parts.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(p.id)}
              className={`min-h-11 cursor-pointer rounded-full border-2 px-3 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/55 text-muted-foreground hover:border-primary"
              }`}
            >
              {p.icon && <span className="mr-1">{p.icon}</span>}
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-[13.5px] font-semibold leading-relaxed text-foreground">
          {part.question}
        </p>

        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-emerald-300">
            {block.hypothesisLabel}
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-foreground">{part.hypothesis}</p>
        </div>

        {/* the examinable triad */}
        <div className="grid gap-2 sm:grid-cols-3">
          {variables.map((v) => (
            <div key={v.key} className={`rounded-xl border px-3 py-2 ${v.tone}`}>
              <p className="text-[10.5px] font-bold uppercase tracking-wide">{v.label}</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{v.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/55 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
              {block.materialsLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{part.materials}</p>
          </div>
          <div className="rounded-xl border border-border bg-card/55 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
              {block.apparatusLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{part.apparatus}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
            {block.methodLabel}
          </p>
          <ol className="mt-1 flex list-decimal flex-col gap-1 pl-4">
            {part.method.map((step) => (
              <li key={step} className="text-[12.5px] leading-relaxed text-foreground">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/55 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
              {block.observationLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">
              {part.observation}
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
              {block.conclusionLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">
              {part.conclusion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
