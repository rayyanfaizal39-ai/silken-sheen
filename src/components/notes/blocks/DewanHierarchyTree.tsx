import { bgPanel, groupGlow, neon } from "./neon-tokens";

export function DewanHierarchyTree({ top, items }: { top: string; items: string[] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-xl px-6 py-3 text-sm font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${neon.violet}, ${neon.blue})`, boxShadow: groupGlow(neon.violet, 16, 0.4) }}
      >
        {top}
      </div>
      <div className="h-5 w-0.5 bg-border" />
      <div className="flex flex-wrap justify-center gap-3.5">
        {items.map((item) => (
          <div key={item} className="rounded-lg px-4 py-2.5 text-[13px] font-semibold text-foreground" style={{ background: bgPanel }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
