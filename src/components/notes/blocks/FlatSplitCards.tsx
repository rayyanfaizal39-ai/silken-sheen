import { bgPanel } from "./neon-tokens";

export interface FlatSplitCardItem {
  title: string;
  color: string;
  description: string;
}

export function FlatSplitCards({ items }: { items: FlatSplitCardItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl p-4" style={{ background: bgPanel }}>
          <h4 className="font-display mb-2 text-sm font-bold" style={{ color: item.color }}>
            {item.title}
          </h4>
          <p className="text-[11.5px] leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
