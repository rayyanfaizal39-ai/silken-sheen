import { useState } from "react";
import type { GasTab } from "@/content/form1/science/chapter-7/bab7-content";

export function TabbedUses({ tabs }: { tabs: GasTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setActive(i)}
            className={`min-w-[90px] flex-1 rounded-xl border px-3 py-3 text-center transition-colors ${
              i === active ? "border-accent bg-accent/15" : "border-border bg-secondary/40"
            }`}
          >
            <div className="font-display text-lg font-bold text-foreground">{t.symbol}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{t.name}</div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tab.uses.map((u) => (
          <div
            key={u.label}
            className="rounded-xl border border-border bg-secondary/40 p-3.5 text-center text-[13px] leading-snug text-foreground"
          >
            <span className="mb-2 block text-xl">{u.icon}</span>
            <b className="block text-[12.5px]">{u.label}</b>
            {u.sub && <span className="mt-0.5 block text-[11px] text-muted-foreground">{u.sub}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
