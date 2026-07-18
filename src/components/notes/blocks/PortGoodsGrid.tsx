import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface PortGoodsItem {
  kingdom: string;
  ports: string[];
  goods: string[];
}

export function PortGoodsGrid({ items }: { items: PortGoodsItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.kingdom}
          className="rounded-2xl p-4"
          style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 14, 0.1) }}
        >
          <h5 className="font-display mb-1.5 text-[12.5px] font-bold" style={{ color: neon.amber }}>
            {item.kingdom}
          </h5>
          <p className="mb-2 text-[10px] text-muted-foreground">{item.ports.join(", ")}</p>
          <div className="flex flex-wrap gap-1.5">
            {item.goods.map((good) => (
              <span key={good} className="rounded-md bg-card px-2 py-1 text-[9.5px] text-foreground">
                {good}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
