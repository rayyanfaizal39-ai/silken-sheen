import { bgPanel } from "./neon-tokens";

export interface KingdomChipGridItem {
  name: string;
  chips: string[];
  note?: string;
}

export function KingdomChipGrid({ heading, items }: { heading?: string; items: KingdomChipGridItem[] }) {
  return (
    <div>
      {heading && <h4 className="font-display mb-2.5 text-sm font-bold text-foreground">{heading}</h4>}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="rounded-2xl p-4" style={{ background: bgPanel }}>
            <h5 className="font-display mb-2 text-[12.5px] font-bold text-foreground">{item.name}</h5>
            {item.chips.length > 0 && (
              <div className="mb-1.5 flex flex-wrap gap-1.5">
                {item.chips.map((chip) => (
                  <span key={chip} className="rounded-lg bg-card px-2.5 py-1 text-[10px] text-foreground">
                    {chip}
                  </span>
                ))}
              </div>
            )}
            {item.note && <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
