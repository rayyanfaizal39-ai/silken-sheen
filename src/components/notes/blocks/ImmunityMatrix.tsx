import { useState } from "react";
import type { ImmunityMatrixBlock } from "@/content/form2/science/interactive-types";

/**
 * A small antibody-concentration-over-time sketch, shaped by the cell's own
 * row rather than authored per cell — every active cell (natural or
 * artificial) rises in two stages, higher on the second, because the body is
 * making its own antibodies and remembers the antigen; every passive cell
 * only ever falls, because the antibodies were never the body's own and are
 * never replenished. This is the one place the primary/secondary-response
 * idea still lives — folded into the relevant cells rather than taught as its
 * own lesson.
 */
function ImmunityTrendChart({ trend }: { trend: "active" | "passive" }) {
  return (
    <svg viewBox="0 0 120 44" className="h-10 w-full max-w-[220px]" aria-hidden="true">
      <line
        x1="2"
        y1="16"
        x2="118"
        y2="16"
        className="stroke-current text-muted-foreground/40"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {trend === "active" ? (
        <path
          d="M4,38 C13,38 17,25 25,23 C33,21 34,29 39,29 C45,29 49,11 61,6 C73,1 79,9 91,9 C99,9 108,9 116,9"
          fill="none"
          className="stroke-current text-primary"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4,6 C20,9 34,17 48,23 C64,29 80,33 96,36 C104,37 110,38 116,38"
          fill="none"
          className="stroke-current text-accent"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/**
 * Immunity as a 2 x 2: active or passive, each acquired naturally or
 * artificially.
 *
 * Presenting it as a grid rather than four separate panels is the point — the
 * two questions a student has to answer are "does the body make its own
 * antibodies?" and "how were they acquired?", and the grid makes both readable
 * at once. Selecting a cell reveals how it is acquired, how fast protection
 * starts and how long it lasts, plus its own small antibody-trend sketch —
 * each of the four types gets its own visual rather than one shared graph.
 */
export function ImmunityMatrix({ block }: { block: ImmunityMatrixBlock }) {
  const [active, setActive] = useState<string | null>(null);
  const activeCell = block.cells.find((c) => c.id === active) ?? null;

  const cellFor = (row: "active" | "passive", column: "natural" | "artificial") =>
    block.cells.find((c) => c.row === row && c.column === column);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
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
              // Any selection at all dims the other three cells, so the
              // active one is unmistakable rather than a colour change alone.
              const isDimmed = active !== null && !isActive;
              return (
                <button
                  key={column}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : cell.id)}
                  onMouseEnter={() => setActive(cell.id)}
                  onFocus={() => setActive(cell.id)}
                  className={`min-w-0 rounded-xl border-2 p-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/45 ring-offset-2 ring-offset-background"
                      : `border-border bg-card/55 hover:border-primary/60 ${isDimmed ? "opacity-50" : ""}`
                  }`}
                >
                  <span
                    className={`block font-display text-[12px] font-bold ${isActive ? "" : "text-foreground"}`}
                  >
                    {cell.source}
                  </span>
                  <span
                    className={`mt-0.5 block text-[11px] leading-snug ${isActive ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                  >
                    {cell.duration}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div
        aria-live="polite"
        className={`mt-2.5 min-h-[2.5rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          activeCell
            ? "border-primary/25 bg-primary/8 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeCell ? (
          <>
            <p>
              <b className="text-primary">{activeCell.name}</b> — {activeCell.note}
            </p>
            <ImmunityTrendChart trend={activeCell.row} />
            <p className="text-[11.5px] leading-snug text-muted-foreground">
              {activeCell.graphNote}
            </p>
          </>
        ) : (
          block.hint
        )}
      </div>
    </div>
  );
}
