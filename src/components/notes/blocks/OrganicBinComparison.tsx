import { bgCard, bgPanel, groupGlow, neon } from "./neon-tokens";

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
        const color = isOrganic ? neon.green : neon.amber;
        return (
          <div
            key={item.category}
            className="rounded-2xl p-4 text-center"
            style={{ background: bgPanel, boxShadow: groupGlow(color, 24, 0.15) }}
          >
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full text-2xl">
              {isOrganic ? "🌱" : "⚙️"}
            </div>
            <h5 className="font-display text-sm font-bold capitalize" style={{ color }}>
              Bahan {item.category}
            </h5>
            <p className="mt-1 text-xs text-muted-foreground">{item.definition}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">{item.source}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {item.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full px-2.5 py-1 text-[10.5px] font-medium text-foreground"
                  style={{ background: bgCard }}
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
