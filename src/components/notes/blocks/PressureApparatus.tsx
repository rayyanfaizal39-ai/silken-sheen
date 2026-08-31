import { useState } from "react";
import type { ApparatusDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Set-up for the surface-area / pressure investigation.
 *
 * The two blocks have equal mass and differ only in the area of the face that
 * meets the plasticine -- that is the whole point of the investigation, so the
 * drawing derives each block's width from its contact area rather than letting
 * them be sized by hand. The indentations below are drawn from the same numbers,
 * which keeps "smaller area -> deeper mark" true in the picture as well as in
 * the text.
 *
 * No depth figures are printed: the source leaves its results table blank, so the
 * drawing shows the relationship, not measurements.
 */

/** Relative contact areas of the two blocks. Equal mass, different footprint. */
const BLOCKS = [
  { id: "small-area", x: 86, area: 0.35 },
  { id: "large-area", x: 200, area: 1 },
] as const;

const MAX_W = 62;
const PLASTICINE = { x: 44, y: 118, w: 232, h: 30 } as const;

export function PressureApparatus({ block, lang }: { block: ApparatusDiagramBlock; lang?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const copy = figureCopy(lang);
  const part = block.parts.find((p) => p.id === active) ?? null;
  const on = (id: string) => active === id;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 180"
          className="mx-auto h-auto w-full min-w-[300px] max-w-[430px]"
          role="img"
          aria-label={block.title}
        >
          {/* retort stand: upright, base, and the cross bar the blocks hang from */}
          <g className={on("stand") ? "stroke-primary" : "stroke-muted-foreground"} strokeWidth={on("stand") ? 3.4 : 2.4}>
            <line x1={292} y1={162} x2={292} y2={22} />
            <line x1={252} y1={162} x2={300} y2={162} />
            <line x1={292} y1={26} x2={70} y2={26} />
          </g>

          {BLOCKS.map((b) => {
            const w = MAX_W * b.area;
            const blockH = 34;
            const top = 60;
            // Same mass, so the deeper mark belongs to the smaller contact area.
            const depth = 16 * (1 / b.area) * 0.35;
            const highlight = on("blocks");
            return (
              <g key={b.id}>
                {/* string from the cross bar down to the block */}
                <line
                  x1={b.x}
                  y1={26}
                  x2={b.x}
                  y2={top}
                  className={on("string") ? "stroke-primary" : "stroke-muted-foreground"}
                  strokeWidth={on("string") ? 2.6 : 1.6}
                />
                <rect
                  x={b.x - w / 2}
                  y={top}
                  width={w}
                  height={blockH}
                  rx="2"
                  className={highlight ? "fill-primary/25 stroke-primary" : "fill-primary/15 stroke-primary/60"}
                  strokeWidth={highlight ? 2.8 : 2}
                />
                {/* the indentation this block leaves in the plasticine */}
                <path
                  d={`M${b.x - w / 2},${PLASTICINE.y} L${b.x - w / 2},${PLASTICINE.y + depth} L${b.x + w / 2},${PLASTICINE.y + depth} L${b.x + w / 2},${PLASTICINE.y}`}
                  fill="none"
                  className={on("plasticine") ? "stroke-amber-300" : "stroke-amber-300/70"}
                  strokeWidth={on("plasticine") ? 2.6 : 2}
                />
              </g>
            );
          })}

          {/* the plasticine slab */}
          <rect
            x={PLASTICINE.x}
            y={PLASTICINE.y}
            width={PLASTICINE.w}
            height={PLASTICINE.h}
            className={on("plasticine") ? "fill-amber-300/25 stroke-amber-300" : "fill-amber-300/12 stroke-amber-300/60"}
            strokeWidth={on("plasticine") ? 2.6 : 2}
          />
          <line x1={30} y1={148} x2={290} y2={148} className="stroke-muted-foreground/50" strokeWidth="1.5" />

          {/* metre rule standing beside the plasticine, for measuring the mark */}
          <g className={on("rule") ? "stroke-primary" : "stroke-muted-foreground"} strokeWidth={on("rule") ? 2.6 : 1.8}>
            <rect x={22} y={92} width={12} height={56} fill="none" />
            {[100, 108, 116, 124, 132, 140].map((y) => (
              <line key={y} x1={22} y1={y} x2={28} y2={y} strokeWidth="1.2" />
            ))}
          </g>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.parts.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={active === p.id}
            onClick={() => setActive(active === p.id ? null : p.id)}
            className={conceptButtonClass(active === p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          part ? "border-primary/25 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {part ? (
          <>
            <b className="text-primary">{part.label}</b> — {part.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
