import { useState } from "react";
import type { AsteroidBeltBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Gambar foto 13.1 + Rajah 13.3 — where the asteroid belt sits, and how some
 * asteroid orbits reach Earth's.
 *
 * The two source images teach one idea between them: most asteroids are held in
 * a ring between Mars and Jupiter, but the Apollo, Amor and Aten orbits lie
 * outside that ring and can come near or cross Earth's orbit — which is what
 * makes a collision possible at all. Drawn separately the link is lost, so both
 * are one figure here with the crossing orbits toggled on and off.
 *
 * Orbits are concentric circles in source order out from the Sun. Radii are
 * drawing values chosen to keep the belt visibly between Mars and Jupiter; they
 * are not to scale, and the figure says so.
 */

const VIEW = 300;
const CX = VIEW / 2;
const CY = VIEW / 2;

/**
 * Orbit radii, in source order out from the Sun. Drawing values, not to scale.
 *
 * Exported so the one claim the figure has to get right can be asserted rather
 * than eyeballed: the belt band must lie strictly between the Mars and Jupiter
 * orbits (p.271, "di antara orbit planet Marikh dengan Musytari").
 */
export const ORBIT_R = { venus: 34, earth: 52, mars: 72, beltInner: 88, beltOuter: 108, jupiter: 128 };

/** Fixed positions so the picture is identical on every render. */
const BELT_ROCKS = [
  [12, 96], [47, 104], [79, 91], [118, 100], [151, 93], [186, 105],
  [214, 90], [248, 101], [281, 97], [312, 92], [338, 103], [7, 106],
  [63, 89], [135, 107], [231, 95], [298, 105], [166, 88], [96, 108],
] as const;

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
}

export function AsteroidBeltFigure({ block, lang }: { block: AsteroidBeltBlock; lang?: string }) {
  const [showCrossing, setShowCrossing] = useState(false);
  const copy = figureCopy(lang);

  const planets = [
    { key: "venus", r: ORBIT_R.venus, angle: 210, label: block.venusLabel, cls: "fill-amber-300" },
    { key: "earth", r: ORBIT_R.earth, angle: 145, label: block.earthLabel, cls: "fill-sky-400" },
    { key: "mars", r: ORBIT_R.mars, angle: 40, label: block.marsLabel, cls: "fill-red-400" },
    { key: "jupiter", r: ORBIT_R.jupiter, angle: 305, label: block.jupiterLabel, cls: "fill-orange-300" },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        <button
          type="button"
          aria-pressed={!showCrossing}
          onClick={() => setShowCrossing(false)}
          className={conceptButtonClass(!showCrossing)}
        >
          {block.beltToggleLabel}
        </button>
        <button
          type="button"
          aria-pressed={showCrossing}
          onClick={() => setShowCrossing(true)}
          className={conceptButtonClass(showCrossing)}
        >
          {block.crossingToggleLabel}
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="mx-auto h-auto w-full min-w-[260px] max-w-[340px]"
          role="img"
          aria-label={showCrossing ? block.crossingFigureLabel : block.beltFigureLabel}
        >
          {/* the belt, drawn as a band so "between Mars and Jupiter" is literal */}
          <circle
            cx={CX}
            cy={CY}
            r={(ORBIT_R.beltInner + ORBIT_R.beltOuter) / 2}
            fill="none"
            className="stroke-stone-400/25"
            strokeWidth={ORBIT_R.beltOuter - ORBIT_R.beltInner}
          />

          {/* planet orbits */}
          {planets.map((p) => (
            <circle
              key={p.key}
              cx={CX}
              cy={CY}
              r={p.r}
              fill="none"
              className="stroke-muted-foreground/35"
              strokeWidth="1"
            />
          ))}

          {/* Apollo / Amor / Aten — outside the belt, reaching Earth's orbit */}
          {showCrossing &&
            block.crossingOrbits.map((orbit, i) => (
              <ellipse
                key={orbit.id}
                cx={CX + orbit.offsetX}
                cy={CY}
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                className={
                  ["stroke-rose-500", "stroke-violet-500", "stroke-teal-500"][i] ?? "stroke-rose-500"
                }
                strokeWidth="1.6"
                strokeDasharray="5 3"
                transform={`rotate(${orbit.rotate} ${CX} ${CY})`}
              />
            ))}

          {/* asteroids in the belt */}
          {BELT_ROCKS.map(([angle, r], i) => {
            const [x, y] = polar(angle, r);
            return <circle key={i} cx={x} cy={y} r="2" className="fill-stone-500" />;
          })}

          {/* Sun */}
          <circle cx={CX} cy={CY} r="9" className="fill-yellow-400" />
          <text
            x={CX}
            y={CY + 22}
            textAnchor="middle"
            className="fill-current text-[8px] font-semibold text-muted-foreground"
          >
            {block.sunLabel}
          </text>

          {/* planets */}
          {planets.map((p) => {
            const [x, y] = polar(p.angle, p.r);
            return (
              <g key={p.key}>
                <circle cx={x} cy={y} r={p.key === "jupiter" ? 7 : 5} className={p.cls} />
                <text
                  x={x}
                  y={y - (p.key === "jupiter" ? 11 : 9)}
                  textAnchor="middle"
                  className="fill-current text-[8.5px] font-bold text-foreground"
                >
                  {p.label}
                </text>
              </g>
            );
          })}

          {/* belt name, placed on the band itself */}
          <text
            x={CX}
            y={CY - (ORBIT_R.beltInner + ORBIT_R.beltOuter) / 2 - 4}
            textAnchor="middle"
            className="fill-current text-[8.5px] font-bold text-foreground"
          >
            {block.beltLabel}
          </text>

          {showCrossing &&
            block.crossingOrbits.map((orbit, i) => (
              <text
                key={orbit.id}
                x={12}
                y={VIEW - 34 + i * 11}
                className={
                  ["fill-rose-500", "fill-violet-500", "fill-teal-500"][i] ?? "fill-rose-500"
                }
                fontSize="8.5"
                fontWeight="700"
              >
                {orbit.label}
              </text>
            ))}
        </svg>
      </div>

      <p className="mt-2 text-center text-[11px] italic text-muted-foreground">{block.scaleNote}</p>

      <div className="mt-3 rounded-xl border border-primary/20 bg-background/70 p-3">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {showCrossing ? block.crossingBody : block.beltBody}
        </p>
      </div>
    </div>
  );
}
