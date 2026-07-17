import { bgPanel, neon } from "./neon-tokens";

export interface ContinuityPairItem {
  activity: string;
  prehistoricOrigin: string;
  modernContinuation: string;
}

export function ContinuityPairs({ items }: { items: ContinuityPairItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <div
          key={item.activity}
          className="flex flex-col items-stretch gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
          style={{ background: bgPanel }}
        >
          <div className="flex-1 text-[11px] leading-snug text-muted-foreground">
            <b className="mb-0.5 block text-[12.5px] text-foreground">{item.activity}</b>
            {item.prehistoricOrigin}
          </div>
          <div className="shrink-0 self-center text-lg" style={{ color: neon.amber }}>
            →
          </div>
          <div className="flex-1 text-[11px] leading-snug text-muted-foreground">
            <b className="mb-0.5 block text-[12.5px] text-foreground">Hari Ini</b>
            {item.modernContinuation}
          </div>
        </div>
      ))}
    </div>
  );
}
