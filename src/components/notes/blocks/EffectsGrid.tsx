export type EffectsGridTint = "red" | "amber" | "green" | "blue";

const TINT_BG: Record<EffectsGridTint, string> = {
  red: "bg-red-500/5",
  amber: "bg-amber-400/5",
  green: "bg-emerald-500/5",
  blue: "bg-primary/5",
};

export interface EffectsGridCard {
  icon: string;
  tint: EffectsGridTint;
  heading: string;
  items: string[];
  /** Optional second labeled sub-list, e.g. "Ways to overcome" alongside "Examples". */
  secondaryLabel?: string;
  secondaryItems?: string[];
}

export function EffectsGrid({ cards }: { cards: EffectsGridCard[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {cards.map((c) => (
        <div key={c.heading} className={`rounded-2xl border border-border p-4 ${TINT_BG[c.tint]}`}>
          <h5 className="font-display mb-2.5 flex items-center gap-2 text-[13.5px] font-bold text-foreground">
            {c.icon} {c.heading}
          </h5>
          <ul className="flex flex-col gap-1.5">
            {c.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs leading-snug text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {c.secondaryItems && c.secondaryItems.length > 0 && (
            <>
              {c.secondaryLabel && (
                <div className="mt-3 mb-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  {c.secondaryLabel}
                </div>
              )}
              <ul className="flex flex-col gap-1.5">
                {c.secondaryItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-snug text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
