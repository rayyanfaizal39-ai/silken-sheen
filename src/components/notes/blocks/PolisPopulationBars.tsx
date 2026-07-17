import { bgPanel, neon } from "./neon-tokens";

export interface PolisBarItem {
  name: string;
  population: string;
  populationValue: number;
}

const GRADIENTS: Record<string, { from: string; to: string }> = {
  Athens: { from: neon.blue, to: "#1d4ed8" },
  Sparta: { from: neon.green, to: "#15803d" },
  Corinth: { from: neon.amber, to: "#c2760c" },
};

export function PolisPopulationBars({ items }: { items: PolisBarItem[] }) {
  const max = Math.max(...items.map((i) => i.populationValue));
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: bgPanel }}>
      {items.map((item) => {
        const pct = Math.max(8, Math.round((item.populationValue / max) * 100));
        const grad = GRADIENTS[item.name] ?? { from: neon.violet, to: "#4c1d95" };
        return (
          <div key={item.name} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-right text-xs font-bold text-foreground">{item.name}</span>
            <div className="h-6 flex-1 overflow-hidden rounded-lg bg-card">
              <div
                className="flex h-full items-center whitespace-nowrap rounded-lg px-2.5 text-[10.5px] font-bold text-[#0c1128]"
                style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
              >
                {item.population}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
