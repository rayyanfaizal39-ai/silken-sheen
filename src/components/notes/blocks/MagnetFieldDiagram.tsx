import { useState } from "react";
import type { MagnetFieldDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge, PoleLabel } from "./InteractiveFigureCard";
import { figureCopy, type FigureCopy } from "./figure-copy";

/**
 * Magnetic field patterns, with the field direction actually drawn.
 *
 * Field-line direction is the thing a diagram most easily gets wrong, so every
 * arrow here is generated from one rule — lines leave N and enter S outside the
 * magnet — rather than placed by hand per shape. The like-poles view exists to
 * show the neutral point, which cannot be shown at all on a single magnet.
 *
 * Lines are drawn as separate arcs that never intersect, because "field lines
 * never cross" is one of the properties the diagram is teaching.
 */

const N_FILL = "#d4544a";
const S_FILL = "#4a7fd4";

/**
 * Bar-magnet geometry in the SVG user space used below, exported so the field
 * direction can be derived from the pole positions instead of being typed in
 * per arc. An arrowhead can then never disagree with the poles it is drawn
 * between, which is the one error this diagram must not make.
 */
export const BAR_MAGNET_RECT = { x: 124, y: 64, w: 72, h: 22 } as const;

/** Left half is the north pole, right half the south pole (BarMagnet, unflipped). */
export const BAR_MAGNET_POLES = {
  north: { x1: BAR_MAGNET_RECT.x, x2: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w / 2 },
  south: { x1: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w / 2, x2: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w },
} as const;

const poleCentre = (p: { x1: number; x2: number }) => (p.x1 + p.x2) / 2;

/**
 * Outside a magnet, field lines run north -> south. Every external arc here is
 * horizontal at its midpoint, so the arrowhead there points along +x when the
 * south pole lies to the right of the north pole, and along -x otherwise.
 * This holds above and below the magnet alike: the loop below the magnet still
 * leaves N and enters S, so it is NOT the mirror of the loop above it.
 */
export const EXTERNAL_FIELD_DEG =
  poleCentre(BAR_MAGNET_POLES.south) > poleCentre(BAR_MAGNET_POLES.north) ? 0 : 180;

/** Bar magnet: arcs from the N end round to the S end, both above and below. */
export const BAR_FIELD_ARCS = [
  { d: "M196,64 C236,20 84,20 124,64", a: [160, 30] as [number, number], deg: EXTERNAL_FIELD_DEG },
  { d: "M196,64 C256,4 64,4 124,64", a: [160, 14] as [number, number], deg: EXTERNAL_FIELD_DEG },
  { d: "M196,86 C236,130 84,130 124,86", a: [160, 120] as [number, number], deg: EXTERNAL_FIELD_DEG },
  { d: "M196,86 C256,146 64,146 124,86", a: [160, 136] as [number, number], deg: EXTERNAL_FIELD_DEG },
];

function BarMagnet({
  x,
  y,
  w,
  h,
  copy,
  flip = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  copy: FigureCopy;
  flip?: boolean;
}) {
  const half = w / 2;
  return (
    <g>
      <rect x={x} y={y} width={half} height={h} fill={flip ? S_FILL : N_FILL} opacity="0.85" />
      <rect x={x + half} y={y} width={half} height={h} fill={flip ? N_FILL : S_FILL} opacity="0.85" />
      <PoleLabel
        x={x + half / 2}
        y={y + h / 2 + 4}
        pole={flip ? "south" : "north"}
        copy={copy}
        fill="#fff"
      />
      <PoleLabel
        x={x + half + half / 2}
        y={y + h / 2 + 4}
        pole={flip ? "north" : "south"}
        copy={copy}
        fill="#fff"
      />
    </g>
  );
}

/** Arrow head pointing along the tangent at (x,y), rotated by `deg`. */
function Arrow({ x, y, deg, dim }: { x: number; y: number; deg: number; dim: boolean }) {
  return (
    <path
      d="M-4,-3 L4,0 L-4,3 Z"
      transform={`translate(${x} ${y}) rotate(${deg})`}
      className={dim ? "fill-muted-foreground/40" : "fill-emerald-300"}
    />
  );
}

export function MagnetFieldDiagram({
  block,
  lang,
}: {
  block: MagnetFieldDiagramBlock;
  lang?: string;
}) {
  const [shape, setShape] = useState(block.shapes[0]?.id ?? "bar");
  const [feature, setFeature] = useState<string | null>(null);
  const copy = figureCopy(lang);

  const activeShape = block.shapes.find((s) => s.id === shape) ?? block.shapes[0];
  const activeFeature = block.features.find((f) => f.id === feature) ?? null;

  const showNeutral = feature === "neutral";
  const dimField = feature !== null && feature !== "direction" && feature !== "density" && feature !== "no-cross";

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      {/* which magnet */}
      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={block.shapeLabel}>
        {block.shapes.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={shape === s.id}
            onClick={() => setShape(s.id)}
            className={conceptButtonClass(shape === s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 150"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={activeShape?.name ?? block.title}
        >
          {shape === "bar" && (
            <>
              {BAR_FIELD_ARCS.map((arc) => (
                <g key={arc.d}>
                  <path
                    d={arc.d}
                    fill="none"
                    className={dimField ? "stroke-muted-foreground/30" : "stroke-emerald-300/80"}
                    strokeWidth={feature === "density" ? 2 : 1.5}
                  />
                  <Arrow x={arc.a[0]} y={arc.a[1]} deg={arc.deg} dim={dimField} />
                </g>
              ))}
              <BarMagnet
                x={BAR_MAGNET_RECT.x}
                y={BAR_MAGNET_RECT.y}
                w={BAR_MAGNET_RECT.w}
                h={BAR_MAGNET_RECT.h}
                copy={copy}
              />
            </>
          )}

          {shape === "horseshoe" && (
            <>
              {/* U-shaped magnet: two limbs, poles facing across the gap */}
              <path
                d="M118,120 L118,60 A42,42 0 0 1 202,60 L202,120"
                fill="none"
                stroke="#8b93a7"
                strokeWidth="17"
                strokeLinecap="butt"
              />
              <rect x={110} y={116} width="17" height="20" fill={N_FILL} opacity="0.9" />
              <rect x={193} y={116} width="17" height="20" fill={S_FILL} opacity="0.9" />
              <PoleLabel x={118} y={131} pole="north" copy={copy} fontSize={10} fill="#fff" />
              <PoleLabel x={201} y={131} pole="south" copy={copy} fontSize={10} fill="#fff" />
              {/* field crosses the gap, N -> S */}
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <line
                    x1={128}
                    y1={122 + i * 5}
                    x2={192}
                    y2={122 + i * 5}
                    className={dimField ? "stroke-muted-foreground/30" : "stroke-emerald-300/80"}
                    strokeWidth="1.5"
                  />
                  <Arrow x={162} y={122 + i * 5} deg={0} dim={dimField} />
                </g>
              ))}
            </>
          )}

          {shape === "magnadur" && (
            <>
              {/* two flat slab magnets, poles on the broad faces, facing each other */}
              <rect x={96} y={40} width="128" height="16" fill={N_FILL} opacity="0.85" />
              <PoleLabel x={160} y={52} pole="north" copy={copy} fontSize={10} fill="#fff" />
              <rect x={96} y={112} width="128" height="16" fill={S_FILL} opacity="0.85" />
              <PoleLabel x={160} y={124} pole="south" copy={copy} fontSize={10} fill="#fff" />
              {[112, 136, 160, 184, 208].map((x) => (
                <g key={x}>
                  <line
                    x1={x}
                    y1={58}
                    x2={x}
                    y2={110}
                    className={dimField ? "stroke-muted-foreground/30" : "stroke-emerald-300/80"}
                    strokeWidth="1.5"
                  />
                  <Arrow x={x} y={86} deg={90} dim={dimField} />
                </g>
              ))}
            </>
          )}

          {shape === "like-poles" && (
            <>
              <BarMagnet x={40} y={64} w={72} h={22} copy={copy} />
              <BarMagnet x={208} y={64} w={72} h={22} copy={copy} flip />
              {/* both inner poles are S here, so the fields oppose and cancel between them */}
              {[-26, -13, 13, 26].map((dy) => (
                <g key={dy}>
                  <path
                    d={`M112,${75 + dy * 0.35} C138,${75 + dy} 138,${75 + dy} 160,${75 + dy * 0.15}`}
                    fill="none"
                    className={dimField ? "stroke-muted-foreground/30" : "stroke-emerald-300/70"}
                    strokeWidth="1.4"
                  />
                  <path
                    d={`M208,${75 + dy * 0.35} C182,${75 + dy} 182,${75 + dy} 160,${75 + dy * 0.15}`}
                    fill="none"
                    className={dimField ? "stroke-muted-foreground/30" : "stroke-emerald-300/70"}
                    strokeWidth="1.4"
                  />
                </g>
              ))}
              {/* the neutral point sits midway between the two like poles */}
              <g>
                <line
                  x1={154}
                  y1={69}
                  x2={166}
                  y2={81}
                  className={showNeutral ? "stroke-amber-300" : "stroke-amber-300/60"}
                  strokeWidth={showNeutral ? 3 : 2}
                />
                <line
                  x1={166}
                  y1={69}
                  x2={154}
                  y2={81}
                  className={showNeutral ? "stroke-amber-300" : "stroke-amber-300/60"}
                  strokeWidth={showNeutral ? 3 : 2}
                />
                {showNeutral && (
                  <circle cx={160} cy={75} r="15" fill="none" className="stroke-amber-300" strokeWidth="1.6" />
                )}
              </g>
              <text x={160} y={110} textAnchor="middle" fontSize="9" className="fill-amber-300">
                X
              </text>
            </>
          )}
        </svg>
      </div>

      {/* which property */}
      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.features.map((f) => {
          const isActive = feature === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFeature(isActive ? null : f.id)}
              className={conceptButtonClass(isActive)}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          activeFeature || activeShape
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeFeature ? (
          <>
            <b className="text-primary">{activeFeature.label}</b> — {activeFeature.note}
          </>
        ) : activeShape ? (
          <>
            <b className="text-primary">{activeShape.name}</b> — {activeShape.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
