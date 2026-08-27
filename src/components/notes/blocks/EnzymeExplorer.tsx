import { useState } from "react";
import type { EnzymeExplorerBlock, EnzymeStage } from "@/content/form2/science/interactive-types";

/**
 * One reaction: substrate → product, with the organ that secretes the enzyme
 * and the organ where it acts. Drawn per stage rather than once per enzyme,
 * because protease acts three separate times on three different substrates and
 * a single arrow would misrepresent that.
 */
function StageDiagram({ stage, accent }: { stage: EnzymeStage; accent: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/55 p-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span className="rounded-lg border border-border bg-secondary/50 px-2 py-1 text-[12px] font-semibold text-foreground">
          {stage.substrate}
        </span>
        <span className="flex min-w-0 flex-col items-center px-0.5" aria-hidden="true">
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent }}>
            {stage.enzymeLabel}
          </span>
          <span className="text-base leading-none" style={{ color: accent }}>
            →
          </span>
        </span>
        <span
          className="rounded-lg border px-2 py-1 text-[12px] font-bold"
          style={{ borderColor: accent, color: accent }}
        >
          {stage.product}
        </span>
      </div>
      <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
        {(
          [
            [stage.sourceLabel, stage.source],
            [stage.siteLabel, stage.site],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/80">
              {label}
            </dt>
            <dd className="text-[12px] leading-relaxed text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * The enzyme section, rebuilt so each tab is genuinely about its own enzyme.
 *
 * The previous version showed one generic three-row pathway picture behind every
 * tab, so switching from Amylase to Lipase changed the prose but not the visual
 * — leaving a student unsure which enzyme did what. Here each enzyme renders its
 * own reaction stages, and every stage names source, site, substrate and product
 * explicitly rather than burying them in a paragraph.
 */
export function EnzymeExplorer({ block }: { block: EnzymeExplorerBlock }) {
  const [activeId, setActiveId] = useState(block.enzymes[0]?.id ?? "");
  const active = block.enzymes.find((e) => e.id === activeId) ?? block.enzymes[0];

  if (!active) return null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div role="tablist" aria-label={block.title} className="mb-3 flex flex-wrap gap-2">
        {block.enzymes.map((enzyme) => {
          const isActive = enzyme.id === active.id;
          return (
            <button
              key={enzyme.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(enzyme.id)}
              className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-transparent text-white"
                  : "border-border bg-card/55 text-muted-foreground hover:border-primary"
              }`}
              style={isActive ? { backgroundColor: enzyme.accent } : undefined}
            >
              {enzyme.name}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={active.name} className="flex flex-col gap-2.5">
        <p className="text-[13px] leading-relaxed text-foreground">{active.summary}</p>

        {active.stages.map((stage, i) => (
          <div key={`${active.id}-${i}`} className="flex flex-col gap-1">
            {stage.stageLabel && (
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground/80">
                {stage.stageLabel}
              </p>
            )}
            <StageDiagram stage={stage} accent={active.accent} />
          </div>
        ))}

        {active.note && (
          <p className="rounded-xl border border-border bg-secondary/30 px-3 py-2 text-[12px] leading-relaxed text-muted-foreground">
            {active.note}
          </p>
        )}
      </div>
    </div>
  );
}
