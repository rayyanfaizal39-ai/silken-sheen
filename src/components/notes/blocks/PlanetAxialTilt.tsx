import { useState } from "react";
import type {
  PlanetAxialTiltBlock,
  PlanetTiltItem,
} from "@/content/form2/science/interactive-types";
import { InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Rajah 12.6 — each planet's axis of rotation, drawn tilted by its own real
 * angle rather than described in a sentence. Seven planets spin the same way
 * (west to east); Venus alone spins the opposite way; Uranus is tilted so far
 * its axis lies almost in the plane of its orbit rather than sticking up out
 * of it. Colour is never the only signal: the arrow's curve direction and the
 * tile's own label carry the same information.
 *
 * Angles are the DSKP's own (Mercury 0.1° through Neptune 30°) — deliberately
 * not to scale against one another the way a real astronomical diagram would
 * be, since the point of the figure is "which way, and roughly how far", not
 * precise geometry.
 */

const TILE = 72;
const CX = TILE / 2;
const CY = TILE / 2 + 4;
const R = 22;
const AXIS_LEN = R + 12;

function axisEndpoints(tiltDeg: number) {
  // 0° tilt draws a vertical axis; positive tilt leans it clockwise.
  const rad = (tiltDeg * Math.PI) / 180;
  const dx = Math.sin(rad) * AXIS_LEN;
  const dy = -Math.cos(rad) * AXIS_LEN;
  return {
    x1: CX - dx,
    y1: CY - dy,
    x2: CX + dx,
    y2: CY + dy,
  };
}

const DIRECTION_COLOUR: Record<PlanetTiltItem["direction"], string> = {
  prograde: "#38bdf8", // sky-400
  retrograde: "#fb7185", // rose-400
  sideways: "#a78bfa", // violet-400
};

function PlanetTile({ planet, active }: { planet: PlanetTiltItem; active: boolean }) {
  const { x1, y1, x2, y2 } = axisEndpoints(planet.tiltDeg);
  const colour = DIRECTION_COLOUR[planet.direction];
  const arrowClockwise = planet.direction !== "retrograde";

  return (
    <svg
      viewBox={`0 0 ${TILE} ${TILE + 14}`}
      className="mx-auto block h-auto w-full max-w-[84px]"
      role="img"
      aria-label={`${planet.name}: ${planet.tiltDeg}°`}
    >
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        className={active ? "stroke-foreground/70" : "stroke-muted-foreground/40"}
        strokeWidth={active ? 1.6 : 1.1}
      />
      {/* the axis of rotation, tilted by the planet's own angle */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={colour}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* a short curved arrow at the equator showing spin direction */}
      <path
        d={
          arrowClockwise
            ? `M ${CX - R * 0.6} ${CY + R * 0.72} A ${R} ${R} 0 0 1 ${CX + R * 0.6} ${CY + R * 0.72}`
            : `M ${CX + R * 0.6} ${CY + R * 0.72} A ${R} ${R} 0 0 1 ${CX - R * 0.6} ${CY + R * 0.72}`
        }
        fill="none"
        stroke={colour}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#c12-tilt-arrow-${planet.direction})`}
        opacity="0.85"
      />
      <text
        x={CX}
        y={TILE + 11}
        textAnchor="middle"
        className={`text-[9.5px] font-bold ${active ? "fill-foreground" : "fill-muted-foreground"}`}
      >
        {planet.tiltDeg}°
      </text>
    </svg>
  );
}

export function PlanetAxialTilt({ block, lang }: { block: PlanetAxialTiltBlock; lang?: string }) {
  const [activeId, setActiveId] = useState(block.planets[0]?.id ?? "");
  const copy = figureCopy(lang);
  const active = block.planets.find((p) => p.id === activeId) ?? block.planets[0];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <svg width="0" height="0" aria-hidden="true">
        <defs>
          {(["prograde", "retrograde", "sideways"] as const).map((direction) => (
            <marker
              key={direction}
              id={`c12-tilt-arrow-${direction}`}
              markerWidth="5"
              markerHeight="5"
              refX="4"
              refY="2.5"
              orient="auto"
            >
              <path d="M0,0 L5,2.5 L0,5 Z" fill={DIRECTION_COLOUR[direction]} />
            </marker>
          ))}
        </defs>
      </svg>

      <div
        className="grid grid-cols-4 gap-2 sm:grid-cols-8"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {block.planets.map((planet) => {
          const isActive = planet.id === activeId;
          return (
            <button
              key={planet.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(planet.id)}
              className={`flex min-h-11 flex-col items-center gap-0.5 rounded-xl border-2 p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-transparent hover:border-primary/40"
              }`}
            >
              <PlanetTile planet={planet} active={isActive} />
              <span
                className={`text-[10px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {planet.name}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-center text-[11px] font-semibold text-foreground">
        {block.ruleLabel}
      </p>
      <p className="mt-1 text-center text-[11px] italic text-muted-foreground">{block.scaleNote}</p>

      {active && (
        <div
          aria-live="polite"
          className="mt-3 rounded-xl border border-primary/35 bg-primary/8 px-3 py-2.5"
        >
          <p className="font-display text-[13px] font-bold text-primary">
            {active.name} — {active.tiltDeg}°
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground">{active.note}</p>
        </div>
      )}
    </div>
  );
}
