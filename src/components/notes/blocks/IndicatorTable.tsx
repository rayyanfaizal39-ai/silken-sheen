import { useState } from "react";
import type { IndicatorTableBlock } from "@/content/form2/science/interactive-types";

/**
 * Indicator colour reference, as a real table rather than a picture.
 *
 * Each cell is tinted with the colour it names, but the colour name is always
 * written out as well — the tint is a reading aid, never the sole carrier of
 * meaning, so the table still works for a colour-blind learner or in
 * high-contrast mode. Selecting a row surfaces the sentence that says what that
 * indicator is actually good for.
 */
export function IndicatorTable({ block }: { block: IndicatorTableBlock }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRow = block.rows.find((r) => r.id === activeId) ?? null;

  const cell = (text: string, swatch: string) => (
    <td className="border-b border-border/60 px-2 py-1.5 text-center">
      <span
        className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11.5px] font-medium text-foreground"
        style={{ backgroundColor: swatch }}
      >
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/20"
          style={{ backgroundColor: swatch }}
        />
        {text}
      </span>
    </td>
  );

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b border-border px-2 py-1.5 text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
                {block.indicatorLabel}
              </th>
              {[block.acidLabel, block.neutralLabel, block.alkaliLabel].map((h) => (
                <th
                  key={h}
                  className="border-b border-border px-2 py-1.5 text-center text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => {
              const isActive = row.id === activeId;
              return (
                <tr key={row.id}>
                  <th scope="row" className="border-b border-border/60 px-1 py-1">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(isActive ? null : row.id)}
                      className={`min-h-[36px] w-full rounded-lg border px-2 py-1 text-left text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-transparent bg-card/40 text-foreground hover:border-primary"
                      }`}
                    >
                      {row.name}
                    </button>
                  </th>
                  {cell(row.acid, row.acidSwatch)}
                  {cell(row.neutral, row.neutralSwatch)}
                  {cell(row.alkali, row.alkaliSwatch)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p
        aria-live="polite"
        className={`mt-2.5 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeRow
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeRow ? (
          <>
            <b className="text-primary">{activeRow.name}</b> — {activeRow.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
