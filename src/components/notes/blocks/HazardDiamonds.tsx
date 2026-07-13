export interface HazardDiamondItem {
  icon: string;
  name: string;
  body: string;
  examples: string;
  fillClass: string;
}

export function HazardDiamonds({ items }: { items: HazardDiamondItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
          <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
            <rect x="10" y="10" width="40" height="40" rx="4" className={item.fillClass} transform="rotate(45 30 30)" />
            <text x="30" y="38" fontSize="24" textAnchor="middle">
              {item.icon}
            </text>
          </svg>
          <p className="font-display mt-2 text-[12.5px] font-bold text-foreground">{item.name}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{item.examples}</p>
          <p className="mt-1.5 text-[10.5px] leading-snug text-muted-foreground/80">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
