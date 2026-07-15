export interface WasteBinItem {
  category: string;
  definition: string;
  source: string;
  examples: string[];
}

export function OrganicBinComparison({ items }: { items: WasteBinItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const isOrganic = item.category === "organik";
        return (
          <div
            key={item.category}
            className={`rounded-2xl border p-4 text-center ${
              isOrganic
                ? "border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 to-transparent shadow-[0_0_20px_-4px] shadow-emerald-400/30"
                : "border-slate-400/40 bg-gradient-to-br from-slate-500/15 to-transparent shadow-[0_0_20px_-4px] shadow-slate-400/30"
            }`}
          >
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full text-2xl">
              {isOrganic ? "🟢" : "⚫"}
            </div>
            <h5 className="font-display text-sm font-bold capitalize text-foreground">
              Bahan {item.category}
            </h5>
            <p className="mt-1 text-xs text-muted-foreground">{item.definition}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">{item.source}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {item.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-[10.5px] font-medium text-foreground"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
