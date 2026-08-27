import { useState } from "react";
import type { StrengthComparisonBlock } from "@/content/form2/science/interactive-types";

/**
 * Strong versus weak acids and alkalis, compared at equal concentration.
 *
 * The equal-concentration condition is rendered first and given its own banner,
 * because without it the comparison proves nothing: two solutions can differ in
 * pH purely because one is more dilute. Getting this wrong is what makes
 * learners read "low pH" as "strong acid" for any substance they meet.
 *
 * Strong and weak are shown as a matched pair within each group so the contrast
 * is between two named substances, never between a substance and an adjective.
 */
export function StrengthComparison({ block }: { block: StrengthComparisonBlock }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = block.entries.find((e) => e.id === activeId) ?? null;

  const groups = [
    { key: "acid" as const, label: block.acidGroupLabel },
    { key: "alkali" as const, label: block.alkaliGroupLabel },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      {/* the condition that makes the whole comparison mean anything */}
      <div className="mb-3 rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-amber-300">
          {block.conditionLabel}
        </p>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{block.condition}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.key} className="min-w-0">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
              {g.label}
            </p>
            <div className="flex flex-col gap-2">
              {block.entries
                .filter((e) => e.kind === g.key)
                .map((e) => {
                  const isActive = e.id === activeId;
                  const strong = e.strength === "strong";
                  return (
                    <button
                      key={e.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(isActive ? null : e.id)}
                      className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card/55 hover:border-primary"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold leading-tight text-foreground">
                          {e.name}
                        </span>
                        <span
                          className={`text-[10.5px] font-bold uppercase tracking-wide ${
                            strong ? "text-rose-300" : "text-sky-300"
                          }`}
                        >
                          {strong ? block.strongLabel : block.weakLabel}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-md bg-secondary/50 px-1.5 py-0.5 text-[11px] font-bold text-foreground">
                        {e.ph}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12.5px] leading-relaxed text-foreground">
        {block.keyPoint}
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
            <b className="text-primary">{active.name}</b> — {active.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
