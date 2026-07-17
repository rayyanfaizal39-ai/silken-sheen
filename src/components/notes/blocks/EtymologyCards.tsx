import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface EtymologyCardItem {
  language: string;
  originalTerm: string;
  meaning: string;
}

export function EtymologyCards({ items }: { items: EtymologyCardItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.language} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.violet, 16, 0.1) }}>
          <h4 className="font-display text-[13px] font-bold" style={{ color: neon.violet }}>
            {item.language}
          </h4>
          <p className="mt-1.5 text-xs font-bold" style={{ color: neon.amber }}>
            {item.originalTerm}
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{item.meaning}</p>
        </div>
      ))}
    </div>
  );
}
