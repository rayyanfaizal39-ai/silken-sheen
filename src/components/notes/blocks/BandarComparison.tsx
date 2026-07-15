import { bgPanel, neon } from "./neon-tokens";

export interface BandarComparisonItem {
  type: string;
  populationThreshold: string;
  characteristics: string[];
}

export function BandarComparison({ items }: { items: BandarComparisonItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item) => {
        const isUrban = item.type === "bandar";
        const color = isUrban ? neon.blue : neon.green;
        return (
          <div
            key={item.type}
            className="w-full max-w-[260px] rounded-2xl p-4 text-center"
            style={{ background: bgPanel }}
          >
            <h5 className="font-display text-sm font-bold capitalize" style={{ color }}>
              {isUrban ? "🏙️ Bandar" : "🌾 Luar Bandar"}
            </h5>
            <p className="mt-1 text-xs font-semibold text-muted-foreground/80">
              {item.populationThreshold}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-left">
              {item.characteristics.map((c, j) => (
                <li key={j} className="text-[11px] leading-relaxed text-muted-foreground">
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
