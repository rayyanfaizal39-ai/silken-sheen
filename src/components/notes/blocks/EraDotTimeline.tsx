import { neon, type NeonColor } from "./neon-tokens";

export interface EraDotTimelineItem {
  label: string;
  detail: string;
  color: NeonColor;
}

export function EraDotTimeline({ items }: { items: EraDotTimelineItem[] }) {
  return (
    <div className="flex flex-wrap gap-y-4 py-2">
      {items.map((item) => {
        const hex = neon[item.color];
        return (
          <div key={item.label} className="min-w-[130px] flex-1 px-1.5 text-center">
            <div
              className="mx-auto mb-1.5 h-3.5 w-3.5 rounded-full"
              style={{ background: hex, boxShadow: `0 0 6px ${hex}99` }}
            />
            <h6 className="font-display text-[11px] font-bold text-foreground">{item.label}</h6>
            <p className="text-[9.5px] leading-snug text-muted-foreground">{item.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
