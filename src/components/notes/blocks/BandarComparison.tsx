export interface BandarComparisonItem {
  type: string;
  populationThreshold: string;
  characteristics: string[];
}

export function BandarComparison({ items }: { items: BandarComparisonItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => {
        const isUrban = item.type === "bandar";
        return (
          <div
            key={item.type}
            className={`rounded-2xl border p-4 ${
              isUrban
                ? "border-primary/30 bg-primary/5"
                : "border-emerald-400/30 bg-emerald-500/5"
            }`}
          >
            <h5 className="font-display text-sm font-bold capitalize text-foreground">
              {isUrban ? "🏙️ Petempatan Bandar" : "🌾 Petempatan Luar Bandar"}
            </h5>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-border/50">
              <div
                className={`h-full rounded-full ${isUrban ? "bg-primary" : "bg-emerald-400"}`}
                style={{ width: isUrban ? "90%" : "35%" }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              {item.populationThreshold}
            </p>
            <ul className="mt-3 space-y-1.5">
              {item.characteristics.map((c, j) => (
                <li key={j} className="flex items-start gap-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
