import { useState } from "react";
import type { CapillaryDiagramBlock } from "@/content/form2/science/interactive-types";
import type { ImageAnnotation } from "./AnnotatedImage";
import {
  conceptButtonClass,
  InteractiveBadge,
  InteractiveFigureCard,
  mergeConcepts,
} from "./InteractiveFigureCard";

/**
 * Water rising through a xylem tube, with the two forces that drive it.
 *
 * Drawn rather than photographed because the teaching point is invisible in a
 * photograph: cohesion acts between water molecules, adhesion acts between
 * water and the tube wall, and the rise is what the two produce together.
 * Selecting a force highlights only the arrows belonging to it, so the pair
 * never has to be told apart by reading the labels alone.
 */
export function CapillaryDiagram({ block, lang }: { block: CapillaryDiagramBlock; lang?: string }) {
  // Approved artwork replaces the schematic outright — the two never appear
  // together, and every label below is this block's own verified data.
  if (block.image) {
    const concepts: ImageAnnotation[] = block.labels.map((item) => {
      const point = block.image!.points.find((p) => p.id === item.id);
      return {
        id: item.id,
        label: item.label,
        note: item.note,
        x: point?.x,
        y: point?.y,
        w: point?.w,
        h: point?.h,
      };
    });
    const withExtras = mergeConcepts(concepts, block.image.extra);
    return (
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        prompt={block.hint}
        concepts={withExtras}
        image={{
          src: block.image.src,
          alt: block.image.alt,
          size: block.image.size ?? "wide",
          aspect: block.image.aspect ?? "3 / 2",
          caption: block.image.caption,
          legendLabel: block.image.legendLabel ?? block.title,
          annotationMode: block.image.annotationMode ?? "regions",
          imageKey: block.image.imageKey,
        }}
      />
    );
  }


  const [active, setActive] = useState<string | null>(null);
  const activeLabel = block.labels.find((l) => l.id === active) ?? null;

  const on = (id: string) => active === id;
  const dim = (id: string) => (active && !on(id) ? 0.25 : 1);

  // viewBox 0..300 wide, 0..200 tall. Tube walls at x=118 and x=182.
  const WALL_L = 118;
  const WALL_R = 182;
  const WATER_TOP = 74;
  const BASE = 178;

  // water molecules stacked inside the column
  const molecules = [
    { x: 134, y: 96 },
    { x: 166, y: 96 },
    { x: 150, y: 118 },
    { x: 134, y: 140 },
    { x: 166, y: 140 },
    { x: 150, y: 162 },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 300 200"
          className="mx-auto h-auto w-full min-w-[280px] max-w-[420px]"
          role="img"
          aria-label={block.title}
        >
          <defs>
            <marker id="cap-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" className="fill-current" />
            </marker>
          </defs>

          {/* leaf at the top, root at the bottom — where the water is going */}
          <text x={150} y={16} textAnchor="middle" fontSize="15">
            🍃
          </text>
          <text x={150} y={196} textAnchor="middle" fontSize="13">
            🌱
          </text>

          {/* tube walls */}
          <line
            x1={WALL_L}
            y1={22}
            x2={WALL_L}
            y2={BASE}
            className="stroke-border"
            strokeWidth="2.5"
          />
          <line
            x1={WALL_R}
            y1={22}
            x2={WALL_R}
            y2={BASE}
            className="stroke-border"
            strokeWidth="2.5"
          />

          {/* water column with a concave meniscus */}
          <path
            d={`M${WALL_L + 1},${BASE} L${WALL_L + 1},${WATER_TOP} Q150,${WATER_TOP + 16} ${WALL_R - 1},${WATER_TOP} L${WALL_R - 1},${BASE} Z`}
            className="fill-sky-400/25"
          />
          <path
            d={`M${WALL_L + 1},${WATER_TOP} Q150,${WATER_TOP + 16} ${WALL_R - 1},${WATER_TOP}`}
            fill="none"
            className="stroke-sky-300/80"
            strokeWidth="1.6"
          />

          {molecules.map((m) => (
            <circle
              key={`${m.x}-${m.y}`}
              cx={m.x}
              cy={m.y}
              r="6.5"
              className="fill-sky-300/70 stroke-sky-200/60"
              strokeWidth="0.8"
            />
          ))}

          {/* cohesion: water molecule to water molecule */}
          <g className="text-cyan-300" opacity={dim("cohesion")}>
            <line
              x1={140}
              y1={96}
              x2={160}
              y2={96}
              className="stroke-current"
              strokeWidth={on("cohesion") ? 2.4 : 1.6}
              markerEnd="url(#cap-arrow)"
              markerStart="url(#cap-arrow)"
            />
            <line
              x1={150}
              y1={124}
              x2={150}
              y2={156}
              className="stroke-current"
              strokeWidth={on("cohesion") ? 2.4 : 1.6}
              markerEnd="url(#cap-arrow)"
              markerStart="url(#cap-arrow)"
            />
          </g>

          {/* adhesion: water molecule to the tube wall */}
          <g className="text-amber-300" opacity={dim("adhesion")}>
            <line
              x1={128}
              y1={140}
              x2={WALL_L + 2}
              y2={140}
              className="stroke-current"
              strokeWidth={on("adhesion") ? 2.4 : 1.6}
              markerEnd="url(#cap-arrow)"
            />
            <line
              x1={172}
              y1={96}
              x2={WALL_R - 2}
              y2={96}
              className="stroke-current"
              strokeWidth={on("adhesion") ? 2.4 : 1.6}
              markerEnd="url(#cap-arrow)"
            />
          </g>

          {/* capillary action: the resulting rise */}
          <g className="text-emerald-300" opacity={dim("capillary")}>
            <line
              x1={98}
              y1={BASE - 6}
              x2={98}
              y2={WATER_TOP - 4}
              className="stroke-current"
              strokeWidth={on("capillary") ? 3 : 2}
              markerEnd="url(#cap-arrow)"
            />
            <line
              x1={202}
              y1={BASE - 6}
              x2={202}
              y2={WATER_TOP - 4}
              className="stroke-current"
              strokeWidth={on("capillary") ? 3 : 2}
              markerEnd="url(#cap-arrow)"
            />
          </g>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

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
              className={conceptButtonClass(isActive)}
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
