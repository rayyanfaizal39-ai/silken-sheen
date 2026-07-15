export interface SplitItem {
  title: string;
  details: string[];
}

export function KesanLangkahSplit({
  leftHeading,
  leftItems,
  rightHeading,
  rightItems,
}: {
  leftHeading: string;
  leftItems: SplitItem[];
  rightHeading: string;
  rightItems: SplitItem[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 className="font-display mb-2.5 flex items-center gap-2 text-sm font-bold text-foreground">
          ⚠️ {leftHeading}
        </h4>
        <div className="space-y-2.5">
          {leftItems.map((item) => (
            <div key={item.title} className="rounded-xl border border-red-400/25 bg-red-500/5 p-3">
              <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
              <ul className="mt-1.5 space-y-1">
                {item.details.map((d, i) => (
                  <li key={i} className="text-[11.5px] leading-relaxed text-muted-foreground">
                    • {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display mb-2.5 flex items-center gap-2 text-sm font-bold text-foreground">
          ✅ {rightHeading}
        </h4>
        <div className="space-y-2.5">
          {rightItems.map((item) => (
            <div key={item.title} className="rounded-xl border border-emerald-400/25 bg-emerald-500/5 p-3">
              <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
              <ul className="mt-1.5 space-y-1">
                {item.details.map((d, i) => (
                  <li key={i} className="text-[11.5px] leading-relaxed text-muted-foreground">
                    • {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
