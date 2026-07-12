import type { SourceCard } from "@/content/form1/science/chapter-7/bab7-content";

const SOURCE_ICONS = ["🚗", "🔥", "🏗️", "☢️", "🌾", "🧊"];

export function SourceCards({ sources }: { sources: SourceCard[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {sources.map((s, i) => (
        <div key={s.from} className="rounded-2xl border border-border bg-secondary/40 p-4">
          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {SOURCE_ICONS[i % SOURCE_ICONS.length]} {s.from}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {s.pollutants.map((p) => (
              <span
                key={p}
                className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10.5px] text-red-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
