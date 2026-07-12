import { useState } from "react";
import type { CompositionGasEntry, RevealCard } from "@/content/form1/science/chapter-7/bab7-content";

const ACCENT_CLASSES: Record<RevealCard["accent"], string> = {
  violet: "border-accent/45 bg-accent/10 text-violet-200",
  amber: "border-amber-400/45 bg-amber-400/10 text-amber-200",
  blue: "border-primary/45 bg-primary/10 text-blue-200",
};

const CENTER_LABEL: Record<"en" | "bm", string> = {
  en: "of the air around you",
  bm: "udara di sekeliling anda",
};

export function CompositionDonut({
  legend,
  reveals,
  lang,
}: {
  legend: CompositionGasEntry[];
  reveals: RevealCard[];
  lang: "en" | "bm";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const R = 76;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const arcs = legend.map((entry) => {
    const pct = parseFloat(entry.percentage);
    const len = (pct / 100) * C;
    const arc = { entry, len, offset };
    offset += len;
    return arc;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-10">
        <div className="relative h-[190px] w-[190px] shrink-0">
          <svg width={190} height={190} viewBox="0 0 190 190" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={95} cy={95} r={R} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={24} />
            {arcs.map(({ entry, len, offset: off }) => (
              <circle
                key={entry.name}
                cx={95}
                cy={95}
                r={R}
                fill="none"
                strokeWidth={24}
                strokeLinecap="round"
                style={{ stroke: entry.color }}
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-off}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="font-display text-2xl font-bold text-foreground">100%</div>
            <div className="text-[10.5px] leading-tight text-muted-foreground">{CENTER_LABEL[lang]}</div>
          </div>
        </div>
        <div className="flex min-w-[220px] flex-1 flex-col gap-2.5">
          {legend.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center gap-2.5 rounded-lg bg-secondary/40 px-3 py-2 text-[13.5px]"
            >
              <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: entry.color }} />
              <span className="text-foreground">{entry.name}</span>
              <b className="font-display ml-auto text-[13.5px] text-foreground">{entry.percentage}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {reveals.map((r, i) => (
          <div key={r.chipLabel}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={`inline-flex items-center gap-2 rounded-lg border border-dashed px-3.5 py-2 text-[13px] font-semibold ${ACCENT_CLASSES[r.accent]}`}
            >
              {r.chipLabel}
            </button>
            {openIndex === i && (
              <div className="mt-2 max-w-2xl rounded-xl border border-border bg-secondary/30 p-3.5 text-[13.5px] leading-relaxed text-muted-foreground animate-fade-up">
                {r.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
