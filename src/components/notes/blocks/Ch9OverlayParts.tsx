import type { Arrow } from "./ch9-heat-geometry";
import { arrowDeg } from "./ch9-heat-geometry";

/**
 * The marks every Chapter 9 overlay draws on top of its photograph.
 *
 * Shared rather than repeated per figure so an arrow means the same thing
 * everywhere in the chapter: one palette, one arrowhead, one weight. The dark
 * outline on every stroke is what lets a single colour stay legible over both a
 * bright noon coastline and a dark navy apparatus board.
 */

export const CH9_COLOURS = {
  /** Moving air, and anything that circulates. */
  flow: "#34d399",
  /** Warm air, warm water, heat arriving. */
  warm: "#fb7185",
  /** Cool air, cool water. */
  cool: "#7dd3fc",
  /** Radiation. */
  ray: "#fbbf24",
  /** Something the reader is being asked to look at. */
  focus: "#fcd34d",
  outline: "#0b1220",
} as const;

/** A straight arrow with a head at its end, in the artwork's pixel space. */
export function FlowArrow({
  arrow,
  colour,
  width = 11,
  head = 1,
  opacity = 1,
  dashed = false,
}: {
  arrow: Arrow;
  colour: string;
  width?: number;
  /** Arrowhead scale. */
  head?: number;
  opacity?: number;
  dashed?: boolean;
}) {
  return (
    <g opacity={opacity}>
      <line
        x1={arrow.x1}
        y1={arrow.y1}
        x2={arrow.x2}
        y2={arrow.y2}
        stroke={CH9_COLOURS.outline}
        strokeWidth={width + 7}
        strokeOpacity={0.4}
        strokeLinecap="round"
      />
      <line
        x1={arrow.x1}
        y1={arrow.y1}
        x2={arrow.x2}
        y2={arrow.y2}
        stroke={colour}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? `${width * 2} ${width * 1.6}` : undefined}
      />
      <path
        d="M-16,-13 L16,0 L-16,13 Z"
        transform={`translate(${arrow.x2} ${arrow.y2}) rotate(${arrowDeg(arrow)}) scale(${head})`}
        fill={colour}
        stroke={CH9_COLOURS.outline}
        strokeWidth={3}
        strokeOpacity={0.5}
      />
    </g>
  );
}

/** A short caption pinned to the artwork, on a plate so it stays readable. */
export function OverlayTag({
  x,
  y,
  text,
  colour = CH9_COLOURS.focus,
  anchor = "middle",
}: {
  x: number;
  y: number;
  text: string;
  colour?: string;
  anchor?: "start" | "middle" | "end";
}) {
  // Sized from the text length: an SVG has no layout engine, and a plate that
  // does not fit its label is worse than no plate.
  const width = text.length * 17 + 34;
  const left = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
  return (
    <g>
      <rect
        x={left}
        y={y - 34}
        width={width}
        height={46}
        rx={23}
        fill={CH9_COLOURS.outline}
        fillOpacity={0.72}
        stroke={colour}
        strokeWidth={2.5}
        strokeOpacity={0.8}
      />
      <text
        x={anchor === "middle" ? x : anchor === "end" ? x - 17 : x + 17}
        y={y - 2}
        textAnchor={anchor}
        fontSize={28}
        fontWeight="bold"
        fill={colour}
      >
        {text}
      </text>
    </g>
  );
}
