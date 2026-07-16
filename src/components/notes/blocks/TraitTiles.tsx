import { bgPanel, neon } from "./neon-tokens";

export interface TraitTileItem {
  trait: string;
  meaning: string;
}

export function TraitTiles({ items }: { items: TraitTileItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.trait} className="rounded-xl p-4 text-center" style={{ background: bgPanel }}>
          <h5 className="font-display text-sm font-bold" style={{ color: neon.amber }}>
            {item.trait}
          </h5>
          <p className="mt-1 text-[10.5px] text-muted-foreground">{item.meaning}</p>
        </div>
      ))}
    </div>
  );
}
