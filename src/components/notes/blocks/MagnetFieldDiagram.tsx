import { useState } from "react";
import type {
  MagnetFieldDiagramBlock,
  MagnetFieldFeature,
  MagnetShape,
} from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge, PoleLabel } from "./InteractiveFigureCard";
import { figureCopy, type FigureCopy } from "./figure-copy";
import {
  BAR_FIELD_ARCS,
  BAR_MAGNET_RECT,
  LIKE_POLE_ARCS,
  LIKE_POLES,
  type FieldArrow,
} from "./ch7-field-geometry";

/**
 * Magnetic field patterns, with the field direction actually drawn.
 *
 * Both magnet-field views here are traced from the field of the poles they
 * show rather than drawn by hand (see `ch7-field-geometry.ts`), because three
 * of the four properties this diagram teaches are properties of streamlines and
 * are simply true of a traced line: they never cross, they crowd where the
 * field is strong and spread where it is weak, and none of them can pass
 * through a neutral point. Hand-placed arcs got each of those only by care, and
 * lost them at the first edit — the previous like-poles view ran lines together
 * at the very point its caption called neutral.
 *
 * The like-poles view exists to show the neutral point, which cannot be shown
 * at all on a single magnet — so the neutral-point explanation is bound to it,
 * and the two can never be on screen apart.
 */

const N_FILL = "#d4544a";
const S_FILL = "#4a7fd4";

/** Which magnet is drawn, and which of its properties is being explained. */
export type MagnetSelection = { shape: MagnetShape["id"]; feature: string | null };

export type MagnetPick =
  | { pick: "shape"; id: MagnetShape["id"] }
  | { pick: "feature"; id: string };

/**
 * Resolves what tapping a control does, given what is already selected.
 *
 * Kept as a pure function rather than inline handlers because the invariant it
 * enforces is the fix this diagram needed: a property that only one arrangement
 * demonstrates must never be explained beside an arrangement that does not.
 * Picking such a property therefore switches to the arrangement that has it,
 * and switching arrangement drops it — so the picture on screen and the
 * sentence underneath it are always the same claim. Tapping "Neutral point"
 * beside a horseshoe magnet used to explain a neutral point the horseshoe does
 * not have and the drawing did not show; here that state is unreachable, and a
 * test can walk every combination and prove it.
 */
export function magnetSelection(
  features: MagnetFieldFeature[],
  current: MagnetSelection,
  action: MagnetPick,
): MagnetSelection {
  if (action.pick === "shape") {
    const held = features.find((f) => f.id === current.feature);
    const keep = !held?.requiresShape || held.requiresShape === action.id;
    return { shape: action.id, feature: keep ? current.feature : null };
  }
  if (current.feature === action.id) return { ...current, feature: null };
  const picked = features.find((f) => f.id === action.id);
  return { shape: picked?.requiresShape ?? current.shape, feature: action.id };
}

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

/**
 * Arrow head pointing along the tangent at (x,y), rotated by `deg`.
 *
 * `emphasize` (the DIRECTION property) scales it up and brightens it — the
 * one property whose whole content IS the arrowhead, so it is the one thing
 * that grows rather than a line changing colour.
 */
function Arrow({
  x,
  y,
  deg,
  dim,
  emphasize = false,
}: FieldArrow & { dim: boolean; emphasize?: boolean }) {
  return (
    <path
      d="M-4,-3 L4,0 L-4,3 Z"
      transform={`translate(${x} ${y}) rotate(${deg}) scale(${emphasize ? 1.7 : 1})`}
      className={
        dim ? "fill-muted-foreground/40" : emphasize ? "fill-emerald-200" : "fill-emerald-300"
      }
    />
  );
}

/**
 * A traced field line. `separate` (the NEVER-CROSS property) draws it wider
 * and brighter so the learner's eye follows one distinct path start to
 * finish — the point being made is that this line stays itself, unbroken and
 * apart from its neighbours, all the way along.
 */
export function lineClass(dim: boolean, separate: boolean): string {
  if (dim) return "stroke-muted-foreground/30";
  return separate ? "stroke-teal-200" : "stroke-emerald-300/80";
}
export function lineWidth(base: number, separate: boolean): number {
  return separate ? base + 0.9 : base;
}

export function MagnetFieldDiagram({
  block,
  lang,
}: {
  block: MagnetFieldDiagramBlock;
  lang?: string;
}) {
  const [selection, setSelection] = useState<MagnetSelection>({
    shape: block.shapes[0]?.id ?? "bar",
    feature: null,
  });
  const { shape, feature } = selection;
  const copy = figureCopy(lang);
  const pick = (action: MagnetPick) =>
    setSelection((current) => magnetSelection(block.features, current, action));

  const activeShape = block.shapes.find((s) => s.id === shape) ?? block.shapes[0];
  const activeFeature = block.features.find((f) => f.id === feature) ?? null;

  /**
   * The neutral point is being explained right now, which by the rule above can
   * only happen on the arrangement that has one. Its marker and the field lines
   * behind it are styled from this, so the emphasis and the explanation cannot
   * disagree.
   */
  const showNeutral = activeFeature?.requiresShape === shape;
  // A property tied to one arrangement is about a place in the picture, not
  // about the lines, so the lines step back while it is being explained.
  const dimField = activeFeature?.requiresShape !== undefined;
  // DIRECTION and NEVER-CROSS are properties of the lines themselves — unlike
  // SPACING (already highlighted at the poles below) and NEUTRAL POINT
  // (already highlighted at its marker), so the lines/arrows carry their own
  // visual response instead of only the caption changing underneath them.
  const emphasizeDirection = feature === "direction";
  const emphasizeSeparation = feature === "no-cross";

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
            onClick={() => pick({ pick: "shape", id: s.id })}
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
                    className={lineClass(dimField, emphasizeSeparation)}
                    strokeWidth={lineWidth(feature === "density" ? 2 : 1.5, emphasizeSeparation)}
                  />
                  <Arrow {...arc.arrow} dim={dimField} emphasize={emphasizeDirection} />
                </g>
              ))}
              {/* Where the lines crowd. Highlighted only while the spacing
                  property is selected, so it explains that property and does
                  not decorate the other three. */}
              {feature === "density" &&
                [BAR_MAGNET_RECT.x, BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w].map((cx) => (
                  <circle
                    key={cx}
                    cx={cx}
                    cy={BAR_MAGNET_RECT.y + BAR_MAGNET_RECT.h / 2}
                    r={17}
                    fill="none"
                    className="stroke-amber-300/80"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                  />
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
                    className={lineClass(dimField, emphasizeSeparation)}
                    strokeWidth={lineWidth(1.5, emphasizeSeparation)}
                  />
                  <Arrow
                    x={162}
                    y={122 + i * 5}
                    deg={0}
                    dim={dimField}
                    emphasize={emphasizeDirection}
                  />
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
                    className={lineClass(dimField, emphasizeSeparation)}
                    strokeWidth={lineWidth(1.5, emphasizeSeparation)}
                  />
                  <Arrow x={x} y={86} deg={90} dim={dimField} emphasize={emphasizeDirection} />
                </g>
              ))}
            </>
          )}

          {shape === "like-poles" && (
            <>
              {LIKE_POLE_ARCS.map((arc) => (
                <g key={arc.d}>
                  <path
                    d={arc.d}
                    fill="none"
                    className={lineClass(dimField, emphasizeSeparation)}
                    strokeWidth={lineWidth(1.4, emphasizeSeparation)}
                  />
                  <Arrow {...arc.arrow} dim={dimField} emphasize={emphasizeDirection} />
                </g>
              ))}
              <BarMagnet {...LIKE_POLES.left} copy={copy} />
              <BarMagnet {...LIKE_POLES.right} copy={copy} flip />
              {/* Both inner poles are south here, so the two fields oppose and
                  cancel exactly midway between them. No traced line reaches
                  this point, because the field there is zero. */}
              <g role="img" aria-label={block.features.find((f) => f.requiresShape)?.label}>
                <line
                  x1={LIKE_POLES.neutral.x - 6}
                  y1={LIKE_POLES.neutral.y - 6}
                  x2={LIKE_POLES.neutral.x + 6}
                  y2={LIKE_POLES.neutral.y + 6}
                  className={showNeutral ? "stroke-amber-300" : "stroke-amber-300/60"}
                  strokeWidth={showNeutral ? 3 : 2}
                />
                <line
                  x1={LIKE_POLES.neutral.x + 6}
                  y1={LIKE_POLES.neutral.y - 6}
                  x2={LIKE_POLES.neutral.x - 6}
                  y2={LIKE_POLES.neutral.y + 6}
                  className={showNeutral ? "stroke-amber-300" : "stroke-amber-300/60"}
                  strokeWidth={showNeutral ? 3 : 2}
                />
                {showNeutral && (
                  <circle
                    cx={LIKE_POLES.neutral.x}
                    cy={LIKE_POLES.neutral.y}
                    r="16"
                    fill="none"
                    className="animate-pulse stroke-amber-300"
                    strokeWidth="1.6"
                  />
                )}
              </g>
            </>
          )}
        </svg>
      </div>

      {/* which property */}
      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={block.featureLabel}>
        {block.features.map((f) => {
          const isActive = feature === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => pick({ pick: "feature", id: f.id })}
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
