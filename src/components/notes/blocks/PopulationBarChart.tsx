import { hexToRgba, populationGradients, populationGreyGradient } from "./neon-tokens";

export interface PopulationBarItem {
  country: string;
  population: string;
}

function parsePopulation(pop: string): number {
  return Number(pop.replace(/,/g, ""));
}

const CHART_HEIGHT = 230; // px — matches Indonesia's bar height in the mockup (the max value)

export function PopulationBarChart({ items }: { items: PopulationBarItem[] }) {
  const values = items.map((i) => parsePopulation(i.population));
  const max = Math.max(...values);
  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2 overflow-x-auto pb-1.5" style={{ height: CHART_HEIGHT + 40 }}>
        {items.map((item, i) => {
          const val = values[i];
          // True linear scale — no floor/compression, so Indonesia dwarfs Brunei exactly as in the mockup.
          const heightPx = (val / max) * CHART_HEIGHT;
          const gradient = populationGradients[item.country];
          const style = gradient
            ? {
                height: `${heightPx}px`,
                background: `linear-gradient(180deg, ${gradient.from}, ${gradient.to})`,
                boxShadow: `0 0 14px ${hexToRgba(gradient.glow, 0.4)}`,
              }
            : {
                height: `${heightPx}px`,
                background: `linear-gradient(180deg, ${populationGreyGradient.from}, ${populationGreyGradient.to})`,
              };
          return (
            <div key={item.country} className="flex min-w-[70px] flex-col items-center justify-end">
              <div className="mb-1 whitespace-nowrap text-[9px] font-bold text-foreground">
                {formatMillions(val)}
              </div>
              <div className="w-9 rounded-t-md" style={style} />
              <div className="mt-1.5 max-w-[70px] text-center text-[9px] text-muted-foreground">
                {item.country}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10.5px] italic text-muted-foreground">
        Skala linear sebenar — panjang bar mewakili nisbah penduduk sebenar antara negara.
      </p>
    </div>
  );
}

function formatMillions(val: number): string {
  return `${(val / 1_000_000).toFixed(1)}M`;
}
