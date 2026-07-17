export interface FactorItem {
  factor: string;
  effect: string;
  examples: string[];
}

export interface FactorCategory {
  key: string;
  icon: string;
  label: string;
  items: FactorItem[];
}

export function FactorsGrid({ categories }: { categories: FactorCategory[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((cat) => (
        <div key={cat.key} className="rounded-2xl border border-border bg-secondary/40 p-4">
          <h4 className="font-display mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <span>{cat.icon}</span> {cat.label}
          </h4>
          <div className="flex flex-col gap-3">
            {cat.items.map((item) => (
              <div key={item.factor} className="rounded-xl border border-border/60 bg-card/60 p-3">
                <p className="text-[13px] font-semibold text-foreground">{item.factor}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.effect}</p>
                {item.examples.length > 0 && (
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    <b className="text-foreground">Contoh:</b> {item.examples.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
