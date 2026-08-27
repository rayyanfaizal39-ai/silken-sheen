import { useState } from "react";
import type { ImmunityMatrixBlock } from "@/content/form2/science/interactive-types";

/**
 * Immunity as a 2 x 2: active or passive, each acquired naturally or
 * artificially.
 *
 * Presenting it as a grid rather than four separate panels is the point — the
 * two questions a student has to answer are "does the body make its own
 * antibodies?" and "how were they acquired?", and the grid makes both readable
 * at once. Selecting a cell reveals how it is acquired, how fast protection
 * starts and how long it lasts.
 */
export function ImmunityMatrix({ block }: { block: ImmunityMatrixBlock }) {
  const [active, setActive] = useState<string | null>(null);
  const activeCell = block.cells.find((c) => c.id === active) ?? null;

  const cellFor = (row: "active" | "passive", column: "natural" | "artificial") =>
    block.cells.find((c) => c.row === row && c.column === column);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>
      )}

      <div className="grid grid-cols-[auto_1fr_1fr] gap-1.5">
        <span aria-hidden="true" />
        {[block.naturalLabel, block.artificialLabel].map((label) => (
          <span
            key={label}
            className="px-1 text-center text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80"
          >
            {label}
          </span>
        ))}

        {(["active", "passive"] as const).map((row) => (
          <div key={row} className="contents">
            <span className="flex items-center pr-1 text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80">
              {row === "active" ? block.activeLabel : block.passiveLabel}
            </span>
            {(["natural", "artificial"] as const).map((column) => {
              const cell = cellFor(row, column);
              if (!cell) return <span key={column} aria-hidden="true" />;
              const isActive = active === cell.id;
              return (
                <button
                  key={column}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : cell.id)}
                  onMouseEnter={() => setActive(cell.id)}
                  onFocus={() => setActive(cell.id)}
                  className={`min-w-0 rounded-xl border p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "border-primary bg-primary/12"
                      : "border-border bg-card/55 hover:border-primary/60"
                  }`}
                >
                  <span className="block font-display text-[12px] font-bold text-foreground">
                    {cell.source}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                    {cell.duration}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className={`mt-2.5 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeCell
            ? "border-primary/25 bg-primary/8 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeCell ? (
          <>
            <b className="text-primary">{activeCell.name}</b> — {activeCell.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
