export interface PopulationBarItem {
  country: string;
  population: string;
}

function parsePopulation(pop: string): number {
  return Number(pop.replace(/,/g, ""));
}

export function PopulationBarChart({ items }: { items: PopulationBarItem[] }) {
  const values = items.map((i) => parsePopulation(i.population));
  const max = Math.max(...values);
  return (
    <div className="space-y-2.5">
      {items.map((item, i) => {
        const val = values[i];
        // True linear scale — no compression/log-scale, so Indonesia dwarfs the rest as it should.
        const pct = Math.max(1, (val / max) * 100);
        return (
          <div key={item.country} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-[12px] font-semibold text-foreground sm:w-28">
              {item.country}
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="h-3.5 min-w-0 flex-1 overflow-hidden rounded-full bg-border/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-24 shrink-0 whitespace-nowrap text-right text-[10.5px] text-muted-foreground">
                {item.population}
              </span>
            </div>
          </div>
        );
      })}
      <p className="text-[10.5px] italic text-muted-foreground">
        Skala linear sebenar — panjang bar mewakili nisbah penduduk sebenar antara negara.
      </p>
    </div>
  );
}
