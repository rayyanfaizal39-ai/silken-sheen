import { useState } from "react";
import type { AltitudePressureBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Why atmospheric pressure falls with altitude.
 *
 * The figure draws the actual reason: the number of air molecules ABOVE a point
 * is what presses down on it, and there are fewer of them the higher you go. The
 * molecule density therefore thins with height and the "air above" tally shrinks,
 * rather than anything about gravity changing -- gravity is what gives air its
 * weight in the first place and does not meaningfully weaken over this range.
 *
 * Molecule y-positions come from a density curve, so the picture cannot end up
 * showing thicker air at the summit than at the foot.
 */

const SKY = { x: 34, y: 16, w: 252, h: 130 } as const;
/** Sample points on the mountain, as a fraction of the sky height from the top. */
const STOPS = { summit: 0.18, foot: 0.86 } as const;

/** Deterministic molecules, denser near the ground. */
function molecules(count: number) {
  const pts: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < count; i++) {
    const a = ((i * 9301 + 49297) % 233280) / 233280;
    const b = ((i * 7919 + 104729) % 199017) / 199017;
    // b^0.45 biases toward the bottom of the band -> denser air lower down.
    const yFrac = Math.pow(b, 0.45);
    pts.push({
      x: SKY.x + 6 + a * (SKY.w - 12),
      y: SKY.y + 6 + yFrac * (SKY.h - 12),
      r: 2 + yFrac * 0.9,
    });
  }
  return pts;
}

export function AltitudePressure({ block, lang }: { block: AltitudePressureBlock; lang?: string }) {
  const [active, setActive] = useState<"summit" | "foot" | null>(null);
  const copy = figureCopy(lang);

  const level = block.levels.find((l) => l.id === active) ?? null;
  const dots = molecules(block.particleCount);
  const markY = (id: "summit" | "foot") => SKY.y + STOPS[id] * SKY.h;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.levels.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={active === l.id}
            onClick={() => setActive(active === l.id ? null : (l.id as "summit" | "foot"))}
            className={conceptButtonClass(active === l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 170"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={block.title}
        >
          <rect x={SKY.x} y={SKY.y} width={SKY.w} height={SKY.h} className="fill-sky-400/10" />

          {/* air molecules: thinner high up, denser near the ground */}
          {dots.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} className="fill-sky-300/80" />
          ))}

          {/* the mountain, drawn over the sky */}
          <path
            d={`M${SKY.x + 60},${SKY.y + SKY.h} L${SKY.x + 126},${SKY.y + 12} L${SKY.x + 192},${SKY.y + SKY.h} Z`}
            className="fill-primary/25 stroke-primary/60"
            strokeWidth="2"
          />
          <line x1={SKY.x} y1={SKY.y + SKY.h} x2={SKY.x + SKY.w} y2={SKY.y + SKY.h} className="stroke-muted-foreground/60" strokeWidth="2" />

          {/* the two sample points, with a bracket showing how much air lies above each */}
          {(["summit", "foot"] as const).map((id) => {
            const y = markY(id);
            const on = active === id;
            const x = id === "summit" ? SKY.x + 126 : SKY.x + 214;
            return (
              <g key={id} className={on ? "opacity-100" : active ? "opacity-45" : "opacity-90"}>
                <circle cx={x} cy={y} r={on ? 5 : 4} className="fill-amber-300" />
                {/* bracket from this point up to the top of the atmosphere */}
                <line
                  x1={x + 14}
                  y1={SKY.y + 4}
                  x2={x + 14}
                  y2={y}
                  className={on ? "stroke-amber-300" : "stroke-amber-300/60"}
                  strokeWidth={on ? 2.4 : 1.6}
                />
                <line x1={x + 9} y1={SKY.y + 4} x2={x + 19} y2={SKY.y + 4} className={on ? "stroke-amber-300" : "stroke-amber-300/60"} strokeWidth={on ? 2.4 : 1.6} />
                <line x1={x + 9} y1={y} x2={x + 19} y2={y} className={on ? "stroke-amber-300" : "stroke-amber-300/60"} strokeWidth={on ? 2.4 : 1.6} />
              </g>
            );
          })}

          <text x={SKY.x + 4} y={SKY.y + 12} fontSize="9" className="fill-muted-foreground">
            {block.airAboveLabel}
          </text>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          level ? "border-primary/25 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {level ? (
          <>
            <b className="text-primary">{level.label}</b> — {level.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
