import { useState } from "react";
import type { DopplerWavefrontsBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Doppler effect — wavefronts around a source that is moving to the right.
 *
 * The wavefronts are NOT authored. Each one is the circle a pulse emitted `age`
 * moments ago would have grown into, drawn around the place the source actually
 * was when it emitted:
 *
 *   centre = SRC_X - SOURCE_SPEED * age      (the source has moved on since)
 *   radius = WAVE_SPEED * age                (the pulse has spread since)
 *
 * That makes the leading edges land at SRC_X + (WAVE_SPEED - SOURCE_SPEED) * age
 * and the trailing edges at SRC_X - (WAVE_SPEED + SOURCE_SPEED) * age. Because
 * the source speed is positive, the gaps ahead are necessarily smaller than the
 * gaps behind. The figure cannot be drawn with the compression on the wrong side
 * without changing the physics constants themselves.
 *
 * The source emits at a steady rate throughout — only what each observer
 * receives differs. Nothing here says the siren changes its own frequency.
 */

const WIDTH = 320;
const HEIGHT = 172;
const SRC_X = 150;
const MID_Y = 84;

/** Both in view units per "age" step. The wave must outrun the source. */
export const WAVE_SPEED = 26;
export const SOURCE_SPEED = 11;
const AGES = [1, 2, 3] as const;

export function wavefront(age: number) {
  return { cx: SRC_X - SOURCE_SPEED * age, r: WAVE_SPEED * age };
}

/** Leading edge on the right, where the source is heading. */
export function frontEdge(age: number) {
  const { cx, r } = wavefront(age);
  return cx + r;
}

/** Trailing edge on the left, the side the source is leaving. */
export function backEdge(age: number) {
  const { cx, r } = wavefront(age);
  return cx - r;
}

const OBSERVER_X = { ahead: 258, behind: 34 } as const;

export function DopplerWavefronts({
  block,
  lang,
}: {
  block: DopplerWavefrontsBlock;
  lang?: string;
}) {
  const [which, setWhich] = useState<"ahead" | "behind">(block.observers[0]?.id ?? "ahead");
  const copy = figureCopy(lang);
  const active = block.observers.find((o) => o.id === which) ?? block.observers[0];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.observers.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={which === o.id}
            onClick={() => setWhich(o.id)}
            className={conceptButtonClass(which === o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={`${active.label} — ${active.note}`}
        >
          <defs>
            <marker id="dop-move" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="fill-foreground" />
            </marker>
          </defs>

          {/* Wavefronts, oldest (largest) first so newer ones sit on top. */}
          {[...AGES].reverse().map((age) => {
            const { cx, r } = wavefront(age);
            return (
              <circle
                key={age}
                cx={cx}
                cy={MID_Y}
                r={r}
                className="fill-none stroke-primary/60"
                strokeWidth="1.8"
              />
            );
          })}

          {/* The source, and the direction it is travelling. */}
          <circle cx={SRC_X} cy={MID_Y} r="7" className="fill-accent" />
          <line
            x1={SRC_X + 11}
            y1={MID_Y}
            x2={SRC_X + 34}
            y2={MID_Y}
            className="stroke-foreground"
            strokeWidth="2.5"
            markerEnd="url(#dop-move)"
          />
          <text
            x={SRC_X}
            y={MID_Y - 13}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="10"
            fontWeight="700"
          >
            {block.sourceLabel}
          </text>

          {/* Observers on both sides; the selected one is emphasised. */}
          {block.observers.map((o) => {
            const x = OBSERVER_X[o.id];
            const on = o.id === which;
            return (
              <g key={o.id} opacity={on ? 1 : 0.4}>
                <circle
                  cx={x}
                  cy={MID_Y + 44}
                  r="7.5"
                  className={on ? "fill-foreground" : "fill-muted-foreground"}
                />
                <text
                  x={x}
                  y={MID_Y + 68}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize="9.5"
                  fontWeight={on ? 700 : 500}
                >
                  {o.effect === "higher" ? "↑" : "↓"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>
      <p className="mt-2 rounded-xl border border-border bg-background/45 p-2.5 text-[13px] leading-relaxed text-foreground/90">
        <b className="font-display">{active.label}</b> — {active.note}
      </p>
      {/* The source frequency itself never changes; say so where it cannot be missed. */}
      <p className="mt-2 rounded-xl border border-accent/35 bg-accent/10 p-2.5 text-[12.5px] leading-relaxed text-foreground/90">
        {block.emittedNote}
      </p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
