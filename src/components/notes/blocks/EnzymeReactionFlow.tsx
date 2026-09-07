import type { ReactionFlowBlock, ReactionColumn } from "@/content/form2/science/interactive-types";

/**
 * The three digestion pathways (carbohydrate/protein/fat) as static parallel
 * columns — substrate -> enzyme -> product, read top to bottom, no tabs.
 *
 * This replaced a tabbed "explore each enzyme" version: switching tabs let a
 * learner see only one pathway at a time, which hides the exact comparison
 * that matters here (protein takes three enzyme steps, fat takes one). The
 * default, un-clicked view now teaches the whole story at a glance, matching
 * the textbook's own one-page reaction summary.
 */
function ReactionColumnView({ column }: { column: ReactionColumn }) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-xl border border-border bg-card/55 p-3">
      <h4 className="font-display text-[12.5px] font-bold uppercase tracking-wide text-primary">
        {column.icon ? `${column.icon} ` : ""}
        {column.title}
      </h4>
      <div className="mt-2 flex flex-col items-center gap-0.5">
        {column.steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-center text-[12px] font-semibold leading-tight text-foreground">
              {step.substrate}
            </span>
            <span className="text-base leading-none text-primary" aria-hidden="true">
              ↓
            </span>
            <span className="text-center text-[10px] font-bold uppercase tracking-wide text-primary">
              {step.enzyme}
            </span>
            <span className="mb-0.5 text-center text-[9.5px] leading-tight text-muted-foreground">
              {step.organs}
            </span>
          </div>
        ))}
        <span className="rounded-lg border border-primary bg-primary/15 px-2.5 py-1 text-center text-[12px] font-bold leading-tight text-primary">
          {column.finalProduct}
        </span>
      </div>
    </div>
  );
}

export function EnzymeReactionFlow({ block }: { block: ReactionFlowBlock }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {block.columns.map((column) => (
          <ReactionColumnView key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}
