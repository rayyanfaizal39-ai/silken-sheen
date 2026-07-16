export interface ChinaDynastyTimelineItem {
  name: string;
  duration: string;
  fact: string;
  color: string;
}

export function ChinaDynastyTimeline({ items }: { items: ChinaDynastyTimelineItem[] }) {
  return (
    <div className="flex items-start">
      {items.map((item, i) => (
        <div key={item.name} className="relative flex-1 px-2 text-center">
          {i < items.length - 1 && (
            <div className="absolute left-1/2 top-2 h-0.5 w-full" style={{ background: "rgba(148,163,184,0.14)" }} />
          )}
          <div
            className="relative z-10 mx-auto mb-2 h-4 w-4 rounded-full"
            style={{ background: item.color, boxShadow: `0 0 8px ${item.color}99` }}
          />
          <h5 className="font-display text-[12.5px] font-bold text-foreground">{item.name}</h5>
          <p className="text-[10px] text-muted-foreground">{item.duration}</p>
          <p className="mt-1.5 text-[9.5px] leading-relaxed text-muted-foreground">{item.fact}</p>
        </div>
      ))}
    </div>
  );
}
