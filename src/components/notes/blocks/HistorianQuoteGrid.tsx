import { bgPanel, groupGlow, neon, type NeonColor } from "./neon-tokens";

export interface HistorianQuoteItem {
  icon: string;
  name: string;
  quote: string;
  work: string;
}

const ROTATION: NeonColor[] = ["violet", "blue", "amber", "green"];

export function HistorianQuoteGrid({ items }: { items: HistorianQuoteItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => {
        const color = neon[ROTATION[i % ROTATION.length]];
        return (
          <div
            key={item.name}
            className="rounded-2xl p-4"
            style={{ background: bgPanel, boxShadow: groupGlow(color, 22, 0.12) }}
          >
            <div
              className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-full text-xl"
              style={{ background: `linear-gradient(135deg, ${neon.violet}, ${neon.blue})`, boxShadow: groupGlow(neon.violet, 14, 0.4) }}
            >
              {item.icon}
            </div>
            <h4 className="font-display text-sm font-bold text-foreground">{item.name}</h4>
            <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground">"{item.quote}"</p>
            <p className="mt-2 text-[10.5px] font-medium" style={{ color }}>
              {item.work}
            </p>
          </div>
        );
      })}
    </div>
  );
}
