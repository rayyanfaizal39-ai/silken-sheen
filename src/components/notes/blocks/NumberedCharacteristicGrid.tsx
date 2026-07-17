import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface NumberedCharacteristicItem {
  num: number;
  name: string;
  description: string;
}

export function NumberedCharacteristicGrid({ items }: { items: NumberedCharacteristicItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.num}
          className="flex items-start gap-2.5 rounded-2xl p-3.5"
          style={{ background: bgPanel, boxShadow: groupGlow(neon.blue, 12, 0.08) }}
        >
          <span
            className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              width: 26,
              height: 26,
              background: `linear-gradient(135deg, ${neon.violet}, ${neon.blue})`,
              boxShadow: groupGlow(neon.violet, 10, 0.4),
            }}
          >
            {item.num}
          </span>
          <div>
            <h5 className="font-display text-[12.5px] font-bold text-foreground">{item.name}</h5>
            <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
