import { useState } from "react";
import type { PyramidBlock } from "@/content/form2/science/interactive-types";

/**
 * Renders a food/nutrition pyramid as stacked, proportionally-widening bars —
 * base tier widest, apex narrowest — so every tier's relative size is visible
 * at once. A pyramid's whole teaching point is that simultaneous comparison,
 * which a one-tier-at-a-time stepper (the old <Journey> pattern) cannot show.
 *
 * Tapping a tier expands its serving guidance. Labels are plain HTML/SVG text
 * driven entirely by `block` — nothing is baked into an image, so BM and DLP
 * content files can each pass their own strings safely.
 */
export function PyramidDiagram({ block }: { block: PyramidBlock }) {
  const [openTier, setOpenTier] = useState<string | null>(block.tiers[0]?.id ?? null);
  const count = block.tiers.length;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
      <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>

      <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-1">
        {[...block.tiers].reverse().map((tier, reversedIndex) => {
          const index = count - 1 - reversedIndex;
          // Base (index 0) is widest at 100%; apex narrows toward ~34%.
          const widthPct = 100 - index * (66 / Math.max(1, count - 1));
          const isOpen = openTier === tier.id;
          return (
            <div key={tier.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setOpenTier((v) => (v === tier.id ? null : tier.id))}
                aria-expanded={isOpen}
                style={{ width: `${widthPct}%` }}
                className={`min-h-11 rounded-lg border px-3 py-2 text-center text-[11.5px] font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isOpen
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/30 bg-card/70 text-foreground hover:border-primary/60"
                }`}
              >
                {tier.icon ? `${tier.icon} ` : ""}
                {tier.groups.map((g) => g.label).join(" · ")}
              </button>
              {isOpen && (
                <div className="mt-1.5 w-full max-w-sm rounded-lg border border-border bg-card/60 p-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
                  {tier.groups.map((g) => (
                    <p key={g.label}>
                      <span className="font-semibold text-foreground">{g.label}</span>
                      {g.servings ? ` — ${g.servings}` : ""}
                    </p>
                  ))}
                  <p className="mt-1">{tier.note}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {block.limitNote && (
        <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-center text-[11.5px] text-amber-200">
          {block.limitNote}
        </p>
      )}
      {block.baseNote && (
        <p className="mt-2 text-center text-[11px] text-muted-foreground">{block.baseNote}</p>
      )}
      <p className="mt-2 text-center text-[10.5px] text-muted-foreground/70">{block.sourceLabel}</p>
    </div>
  );
}
