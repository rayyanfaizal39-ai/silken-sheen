import { useState } from "react";
import type { DryAqueousPanel, DryVsAqueousBlock } from "@/content/form2/science/interactive-types";

const PAPER: Record<"blue" | "red", string> = {
  blue: "#4a7fd4",
  red: "#d4544a",
};

/**
 * The four-panel dry-versus-aqueous comparison.
 *
 * This is the chapter's one genuinely counter-intuitive idea — a substance that
 * *is* an acid behaving as though it were not — and it only lands when the four
 * cases sit side by side. Each panel draws the litmus paper in the colour it
 * actually ends up, so the "unchanged" cases are visibly identical to their
 * starting colour rather than merely asserted to be.
 */
function Panel({ panel, selected }: { panel: DryAqueousPanel; selected: boolean }) {
  return (
    <svg viewBox="0 0 92 66" className="h-auto w-full" role="img" aria-label={panel.substance}>
      {/* beaker */}
      <path
        d="M22,10 L22,54 L70,54 L70,10"
        fill="none"
        className={selected ? "stroke-primary" : "stroke-border"}
        strokeWidth={selected ? 2 : 1.4}
      />
      {/* contents: a dry solid/liquid sits low; with water the beaker is fuller */}
      <rect
        x={23}
        y={panel.withWater ? 20 : 42}
        width="46"
        height={panel.withWater ? 33 : 11}
        fill={panel.withWater ? "rgba(96,165,250,0.28)" : "rgba(148,163,184,0.4)"}
      />
      {/* water droplet marker only when water is present */}
      {panel.withWater && (
        <text x={46} y={16} textAnchor="middle" fontSize="9">
          💧
        </text>
      )}
      {/* litmus paper dipped in */}
      <rect
        x={41}
        y={panel.withWater ? 12 : 30}
        width="10"
        height="26"
        rx="1.5"
        fill={PAPER[panel.result]}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function DryVsAqueous({ block }: { block: DryVsAqueousBlock }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = block.panels.find((p) => p.id === activeId) ?? null;

  const acids = block.panels.filter((p) => p.litmus === "blue");
  const alkalis = block.panels.filter((p) => p.litmus === "red");

  const group = (label: string, panels: DryAqueousPanel[]) => (
    <div className="min-w-0">
      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {panels.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(isActive ? null : p.id)}
              className={`flex flex-col rounded-xl border px-2 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive ? "border-primary bg-primary/10" : "border-border bg-card/55 hover:border-primary"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {p.withWater ? block.withWaterLabel : block.withoutWaterLabel}
              </span>
              <span className="text-[11.5px] font-semibold leading-tight text-foreground">
                {p.substance}
              </span>
              <Panel panel={p} selected={isActive} />
              <span className="text-[11px] leading-snug text-foreground">{p.resultText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {group(block.acidColumnLabel, acids)}
        {group(block.alkaliColumnLabel, alkalis)}
      </div>

      <p className="mt-2.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12.5px] font-semibold leading-relaxed text-foreground">
        {block.keyMessage}
      </p>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          active
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {active ? (
          <>
            <b className="text-primary">{active.substance}</b> — {active.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
