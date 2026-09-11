import type { UnitsMemoryBlock } from "@/content/form2/science/interactive-types";

/**
 * "Remember the Units" — a compact I / V / R memory card.
 *
 * Kept as three clearly separate facts per quantity (symbol, unit NAME, unit
 * SYMBOL) rather than a single line, because the mistake this card exists to
 * head off is a learner collapsing a quantity with its unit — writing
 * "R = Ω" as if resistance and the ohm were the same thing. The physical
 * quantity's symbol is always the largest, most prominent line; the unit
 * name and unit symbol sit underneath it, visibly secondary.
 */
export function UnitsMemoryCard({ block }: { block: UnitsMemoryBlock }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <h4 className="font-display mb-2.5 text-center text-[12px] font-bold uppercase tracking-wide text-primary">
        {block.title}
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {block.items.map((item) => (
          <div
            key={item.quantitySymbol}
            className="flex flex-col items-center gap-0.5 rounded-xl border border-border bg-card/60 px-2 py-2.5"
          >
            <span className="font-display text-2xl font-bold leading-none text-primary">
              {item.quantitySymbol}
            </span>
            <span className="text-[10.5px] leading-tight text-muted-foreground">
              {item.unitName}
            </span>
            <span className="font-display text-[13px] font-bold leading-none text-foreground">
              {item.unitSymbol}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
