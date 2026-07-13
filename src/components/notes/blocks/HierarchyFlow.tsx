const ICONS = ["🔵", "🔷", "🫀", "🩻", "🧍"];
const SIZES = [16, 20, 24, 28, 32];

export interface HierarchyFlowLevel {
  level: string;
  description: string;
}

export function HierarchyFlow({ levels }: { levels: HierarchyFlowLevel[] }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {levels.map((lvl, i) => (
          <div key={lvl.level} className="flex items-center gap-1.5">
            <div className="flex min-w-[84px] flex-col items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-4 py-3.5">
              <span style={{ fontSize: `${SIZES[i] ?? 32}px`, lineHeight: 1 }}>{ICONS[i] ?? "🧍"}</span>
              <span className="font-display text-[12px] font-bold text-foreground">{lvl.level}</span>
            </div>
            {i < levels.length - 1 && <span className="text-lg text-primary">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {levels.map((lvl, i) => (
          <div
            key={lvl.level}
            className="flex items-start gap-2 rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[12.5px] text-muted-foreground"
          >
            <span className="mt-0.5 shrink-0">{ICONS[i] ?? "🧍"}</span>
            <span>
              <b className="text-foreground">{lvl.level}:</b> {lvl.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
