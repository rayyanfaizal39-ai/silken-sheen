import { useState } from "react";
import type {
  ComparisonMatrixBlock,
  ComparisonMatrixValue,
} from "@/content/form2/science/interactive-types";

const MARK: Record<ComparisonMatrixValue, string> = {
  yes: "✓",
  no: "✗",
  partial: "~",
};

const TONE: Record<ComparisonMatrixValue, string> = {
  yes: "text-emerald-300",
  no: "text-rose-300/80",
  partial: "text-amber-300",
};

/**
 * "Which method does what" grid.
 *
 * The mark alone would be ambiguous to a screen reader and to anyone who reads
 * ✓/✗ as decoration, so each cell carries a visually-hidden word as well.
 * Selecting a row surfaces the sentence that explains why that row's pattern of
 * marks looks the way it does — the marks are the summary, not the teaching.
 */
export function ComparisonMatrix({ block }: { block: ComparisonMatrixBlock }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRow = block.rows.find((r) => r.id === activeId) ?? null;

  const wordFor = (v: ComparisonMatrixValue) =>
    v === "yes" ? block.yesLabel : v === "no" ? block.noLabel : block.partialLabel;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b border-border px-2 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground" />
              {block.columns.map((col) => (
                <th
                  key={col}
                  className="border-b border-border px-2 py-1.5 text-center text-[10.5px] font-bold leading-tight text-muted-foreground"
                >
                  {col}
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
                      {row.icon && <span className="mr-1">{row.icon}</span>}
                      {row.label}
                    </button>
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={block.columns[i] ?? i}
                      className={`border-b border-border/60 px-2 py-1 text-center text-[15px] font-bold ${TONE[v]}`}
                    >
                      <span aria-hidden="true">{MARK[v]}</span>
                      <span className="sr-only">{wordFor(v)}</span>
                    </td>
                  ))}
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
            <b className="text-primary">{activeRow.label}</b> — {activeRow.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
