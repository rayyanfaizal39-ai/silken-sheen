import { useState } from "react";

export function RankedRevealList({
  items,
}: {
  items: { symbol: string; name: string; fact: string; highlight?: boolean }[];
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="mt-3 flex flex-col gap-1">
      {items.map((item, index) => (
        <div
          key={`${item.symbol}-${index}`}
          className={`overflow-hidden rounded-xl border transition-colors ${
            item.highlight ? "border-nova-yellow/30 bg-nova-yellow/5" : "border-border bg-card/55"
          }`}
        >
          <button
            type="button"
            onClick={() => toggle(index)}
            aria-expanded={open.has(index)}
            className="flex min-h-11 w-full items-center gap-3 px-3.5 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="w-8 shrink-0 text-center font-display text-sm font-bold text-primary">{item.symbol}</span>
            <span className="flex-1 text-[13px] text-foreground">{item.name}</span>
          </button>
          {open.has(index) && (
            <p className="px-3.5 pb-3 pl-[4.25rem] text-[12px] leading-relaxed text-muted-foreground">{item.fact}</p>
          )}
        </div>
      ))}
    </div>
  );
}
