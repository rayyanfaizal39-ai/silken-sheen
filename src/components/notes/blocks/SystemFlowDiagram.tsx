import type { SystemFlowBlock } from "@/content/form2/science/interactive-types";

/**
 * Three systems funnel into one convergence point (body cells), which then
 * fans out into the outcomes each absorbed nutrient is used for. A plain row
 * of three cards can describe each system, but only a funnel-in/fan-out shape
 * actually SHOWS that the systems cooperate toward one destination rather
 * than just each doing their own separate thing.
 */
export function SystemFlowDiagram({ block }: { block: SystemFlowBlock }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>
      )}

      {/* Funnel-in: the three systems. */}
      <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-1.5">
        {block.systems.map((system) => (
          <div
            key={system.label}
            className="flex flex-col items-center rounded-xl border border-border bg-card/55 px-3 py-2 text-center"
          >
            <p className="text-[12.5px] font-bold text-foreground">
              {system.icon ? `${system.icon} ` : ""}
              {system.label}
            </p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{system.role}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center py-1" aria-hidden="true">
        <span className="text-xl leading-none text-primary">↓</span>
      </div>

      {/* The convergence point. */}
      <div className="mx-auto flex w-full max-w-[220px] flex-col items-center rounded-full border-2 border-primary bg-primary/15 px-4 py-2.5 text-center">
        <p className="font-display text-[13px] font-bold text-primary">{block.convergeLabel}</p>
        {block.convergeNote && (
          <p className="text-[11px] leading-snug text-foreground/90">{block.convergeNote}</p>
        )}
      </div>

      <div className="flex justify-center py-1" aria-hidden="true">
        <span className="text-xl leading-none text-primary">↓</span>
      </div>

      {/* Fan-out: what the body does with each nutrient. */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {block.outcomes.map((outcome) => (
          <div
            key={outcome.label}
            className="flex min-w-0 flex-col items-center rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-center"
          >
            <p className="text-[12px] font-bold text-accent-foreground">{outcome.label}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{outcome.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
