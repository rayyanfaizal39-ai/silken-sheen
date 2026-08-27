import { useState } from "react";
import type { ElectrolysisDiagramBlock } from "@/content/form2/science/interactive-types";

/**
 * Electrolysis of water, drawn so the 2:1 ratio is measurable off the picture
 * rather than only asserted in the caption.
 *
 * The hydrogen gas column is exactly twice the height of the oxygen column
 * (60 vs 30 units), so a learner who compares the two tubes reads the same
 * ratio the text states. Getting these two numbers out of step would make the
 * diagram argue against its own caption.
 */
const GAS_TOP = 44;
const H_COLUMN = 60;
const O_COLUMN = H_COLUMN / 2;

export function ElectrolysisDiagram({ block }: { block: ElectrolysisDiagramBlock }) {
  const [active, setActive] = useState<string | null>(null);
  const activeLabel = block.labels.find((l) => l.id === active) ?? null;

  const on = (id: string) => active === id;
  const ring = (id: string) => (on(id) ? "stroke-primary" : "stroke-border");

  const WATER_TOP = 92;
  const BASE = 172;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 200"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[440px]"
          role="img"
          aria-label={block.title}
        >
          {/* battery */}
          <rect
            x={134}
            y={8}
            width="52"
            height="18"
            rx="3"
            className="fill-card/70 stroke-border"
            strokeWidth="1.2"
          />
          <text x={146} y={21} fontSize="10" className="fill-rose-300" fontWeight="bold">
            +
          </text>
          <text x={172} y={21} fontSize="10" className="fill-sky-300" fontWeight="bold">
            −
          </text>
          {/* leads: + goes right to the anode, − goes left to the cathode */}
          <path
            d="M146,26 L146,34 L232,34 L232,58"
            fill="none"
            className="stroke-rose-300/70"
            strokeWidth="1.4"
          />
          <path
            d="M174,26 L174,34 L88,34 L88,58"
            fill="none"
            className="stroke-sky-300/70"
            strokeWidth="1.4"
          />

          {/* beaker + water */}
          <path
            d={`M56,${WATER_TOP - 20} L56,${BASE} L264,${BASE} L264,${WATER_TOP - 20}`}
            fill="none"
            className="stroke-border"
            strokeWidth="2"
          />
          <rect
            x={57}
            y={WATER_TOP}
            width="206"
            height={BASE - WATER_TOP - 1}
            className="fill-sky-400/20"
          />

          {/* cathode side (left) — hydrogen, the taller column */}
          <g>
            <rect
              x={72}
              y={GAS_TOP - 6}
              width="34"
              height={130}
              rx="4"
              fill="none"
              className={ring("hydrogen")}
              strokeWidth={on("hydrogen") ? 2.4 : 1.4}
            />
            <rect
              x={73}
              y={GAS_TOP}
              width="32"
              height={H_COLUMN}
              className={on("hydrogen") ? "fill-emerald-300/55" : "fill-emerald-400/30"}
            />
            <line
              x1={88}
              y1={58}
              x2={88}
              y2={BASE - 12}
              className={ring("cathode")}
              strokeWidth={on("cathode") ? 3.4 : 2.2}
            />
          </g>

          {/* anode side (right) — oxygen, half the column */}
          <g>
            <rect
              x={216}
              y={GAS_TOP - 6}
              width="34"
              height={130}
              rx="4"
              fill="none"
              className={ring("oxygen")}
              strokeWidth={on("oxygen") ? 2.4 : 1.4}
            />
            <rect
              x={217}
              y={GAS_TOP}
              width="32"
              height={O_COLUMN}
              className={on("oxygen") ? "fill-rose-300/55" : "fill-rose-400/30"}
            />
            <line
              x1={232}
              y1={58}
              x2={232}
              y2={BASE - 12}
              className={ring("anode")}
              strokeWidth={on("anode") ? 3.4 : 2.2}
            />
          </g>

          {/* column heights called out where they can be compared */}
          <text x={89} y={GAS_TOP + H_COLUMN + 14} textAnchor="middle" fontSize="8.5" className="fill-emerald-300">
            2
          </text>
          <text x={233} y={GAS_TOP + O_COLUMN + 14} textAnchor="middle" fontSize="8.5" className="fill-rose-300">
            1
          </text>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] font-semibold text-foreground">
        {block.ratioCaption}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {block.labels.map((label) => {
          const isActive = active === label.id;
          return (
            <button
              key={label.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : label.id)}
              onMouseEnter={() => setActive(label.id)}
              onFocus={() => setActive(label.id)}
              className={`min-h-[36px] rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/55 text-muted-foreground hover:border-primary"
              }`}
            >
              {label.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeLabel
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeLabel ? (
          <>
            <b className="text-primary">{activeLabel.label}</b> — {activeLabel.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
