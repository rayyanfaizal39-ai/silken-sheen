import { useState } from "react";
import type { CosmicScaleBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Earth nested outward to the universe.
 *
 * The rings are evenly spaced presentation geometry, not proportions — the
 * source figure carries the note "Gambar tidak mengikut skala", and a drawing
 * that implied real ratios would be a worse lie than one that doesn't try. The
 * label on the figure says so out loud.
 *
 * What the figure *does* assert is containment order: each tier encloses the one
 * before it. That ordering comes straight from the tier list, so a tier cannot be
 * drawn inside something it should contain.
 */

const SIZE = 300;
const CENTRE = SIZE / 2;
const INNER_R = 16;

export function CosmicScale({ block, lang }: { block: CosmicScaleBlock; lang?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const copy = figureCopy(lang);

  const n = block.tiers.length;
  const step = (CENTRE - INNER_R - 12) / (n - 1);
  const radiusFor = (i: number) => INNER_R + i * step;
  const selected = block.tiers.find((t) => t.id === active) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.tiers.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={active === t.id}
            onClick={() => setActive(active === t.id ? null : t.id)}
            className={conceptButtonClass(active === t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto h-auto w-full min-w-[260px] max-w-[340px]"
          role="img"
          aria-label={block.tiers.map((t) => t.label).join(" ⊂ ")}
        >
          {/* Outermost first so inner rings paint on top. */}
          {[...block.tiers].reverse().map((tier) => {
            const i = block.tiers.indexOf(tier);
            const r = radiusFor(i);
            const on = active === tier.id;
            return (
              <circle
                key={tier.id}
                cx={CENTRE}
                cy={CENTRE}
                r={r}
                className={
                  on ? "fill-accent/15 stroke-accent" : "fill-primary/[0.04] stroke-primary/45"
                }
                strokeWidth={on ? 2.4 : 1.3}
              />
            );
          })}

          {/* Earth sits at the centre. */}
          <circle cx={CENTRE} cy={CENTRE} r={7} className="fill-accent" />

          {/* One leader line per tier, alternating sides so labels never stack. */}
          {block.tiers.map((tier, i) => {
            const r = radiusFor(i);
            const on = active === tier.id;
            const left = i % 2 === 1;
            const y = CENTRE - r + 1;
            const xEdge = CENTRE + (left ? -r * 0.55 : r * 0.55);
            const yEdge = CENTRE - r * 0.82;
            return (
              <g key={tier.id} opacity={active && !on ? 0.4 : 1}>
                <circle cx={xEdge} cy={yEdge} r={on ? 3.2 : 2.2} className={on ? "fill-accent" : "fill-primary/70"} />
                <text
                  x={xEdge}
                  y={yEdge - 5}
                  textAnchor={left ? "start" : "end"}
                  className="fill-foreground"
                  fontSize="8.5"
                  fontWeight={on ? 700 : 500}
                >
                  {tier.label}
                </text>
              </g>
            );
          })}

          <text
            x={CENTRE}
            y={SIZE - 5}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="8"
            fontStyle="italic"
          >
            {block.notToScaleLabel}
          </text>
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>

      <p className="mt-2 rounded-xl border border-border bg-background/45 p-2.5 text-[12.5px] leading-relaxed text-foreground/90">
        {selected ? (
          <>
            <b className="font-display">{selected.label}</b> — {selected.note}
          </>
        ) : (
          block.tiers.map((t) => t.label).join(" → ")
        )}
      </p>

      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
