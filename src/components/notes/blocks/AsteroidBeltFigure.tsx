import { useState } from "react";
import type {
  AsteroidBeltBlock,
  AsteroidBeltItem,
} from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Gambar foto 13.1 — where the asteroid belt sits: between Mars and Jupiter.
 *
 * The one claim the figure must make is positional, so it draws only what that
 * claim needs: Earth's orbit for scale, Mars's orbit, a dense band of asteroids,
 * and Jupiter's orbit. Venus and the crossing orbits used to share this canvas
 * and turned it into a ring of empty circles; the crossing orbits now have a
 * figure of their own.
 *
 * Selecting Mars, the belt or Jupiter brightens that element, thickens its
 * orbit and rings the planet, while the other two dim — selection is shown by
 * weight, outline and brightness as well as colour.
 *
 * Radii are drawing values chosen to keep the belt visibly between the two
 * orbits; the figure is not to scale and says so.
 */

const VIEW = 320;
const CX = VIEW / 2;
const CY = VIEW / 2;

/**
 * Orbit radii, out from the Sun. Exported so the positional claim can be
 * asserted rather than eyeballed: the band lies strictly between the Mars and
 * Jupiter orbits (p.271, "di antara orbit planet Marikh dengan Musytari").
 */
export const ORBIT_R = { earth: 46, mars: 68, beltInner: 84, beltOuter: 112, jupiter: 136 };

/** A small seeded generator, so the belt is identical on the server and in every render. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Many small bodies, densest in the middle of the band. */
export const BELT_ROCKS = (() => {
  const rand = seeded(1301);
  return Array.from({ length: 150 }, () => {
    const angle = rand() * 360;
    const spread = (rand() + rand()) / 2;
    const r = ORBIT_R.beltInner + 2 + spread * (ORBIT_R.beltOuter - ORBIT_R.beltInner - 4);
    return { angle, r, size: 0.8 + rand() * 1.5 };
  });
})();

const PLANET_ANGLE = { earth: 150, mars: 25, jupiter: 228 };

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
}

/** Labels sit on a knocked-out halo so they stay legible over orbits and rocks. */
const HALO = { paintOrder: "stroke" as const, strokeWidth: 3.5, strokeLinejoin: "round" as const };

export function AsteroidBeltFigure({ block, lang }: { block: AsteroidBeltBlock; lang?: string }) {
  const [active, setActive] = useState<AsteroidBeltItem["id"]>("belt");
  const copy = figureCopy(lang);
  const selected = block.items.find((item) => item.id === active) ?? block.items[0];
  const labelOf = (id: AsteroidBeltItem["id"]) =>
    block.items.find((item) => item.id === id)?.label ?? "";

  const marsOn = active === "mars";
  const beltOn = active === "belt";
  const jupiterOn = active === "jupiter";
  const beltMid = (ORBIT_R.beltInner + ORBIT_R.beltOuter) / 2;

  const [ex, ey] = polar(PLANET_ANGLE.earth, ORBIT_R.earth);
  const [mx, my] = polar(PLANET_ANGLE.mars, ORBIT_R.mars);
  const [jx, jy] = polar(PLANET_ANGLE.jupiter, ORBIT_R.jupiter);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === active}
            aria-label={item.label}
            onClick={() => setActive(item.id)}
            className={conceptButtonClass(item.id === active, "flex-auto sm:flex-none")}
          >
            {item.label}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="mx-auto block h-auto w-full max-w-[420px]"
        role="img"
        aria-label={block.figureLabel}
        data-ch13-figure="asteroid-belt"
        data-active={active}
      >
        {/* the belt's own boundary, marked with dashes rather than a filled
            ring — the rocks below are what say "asteroid belt", not a solid
            band standing in for them */}
        {[ORBIT_R.beltInner, ORBIT_R.beltOuter].map((r) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            className={beltOn ? "stroke-amber-500" : "stroke-amber-500/35"}
            strokeWidth={beltOn ? "1.6" : "1"}
            strokeDasharray="4 4"
          />
        ))}

        {/* Earth's orbit, for scale only */}
        <circle
          cx={CX}
          cy={CY}
          r={ORBIT_R.earth}
          fill="none"
          className="stroke-sky-500/45"
          strokeWidth="1"
        />

        <circle
          cx={CX}
          cy={CY}
          r={ORBIT_R.mars}
          fill="none"
          className={marsOn ? "stroke-red-500" : "stroke-muted-foreground/40"}
          strokeWidth={marsOn ? 2.6 : 1.1}
        />
        <circle
          cx={CX}
          cy={CY}
          r={ORBIT_R.jupiter}
          fill="none"
          className={jupiterOn ? "stroke-orange-500" : "stroke-muted-foreground/40"}
          strokeWidth={jupiterOn ? 2.6 : 1.1}
        />

        {/* many discrete rocks, never a filled band — this is what "asteroid
            belt" actually looks like, whether or not it is the active choice */}
        <g opacity={beltOn ? 1 : 0.75}>
          {BELT_ROCKS.map((rock, i) => {
            const [x, y] = polar(rock.angle, rock.r);
            return <circle key={i} cx={x} cy={y} r={rock.size} className="fill-stone-500" />;
          })}
        </g>

        {/* Sun */}
        <circle cx={CX} cy={CY} r="10" className="fill-yellow-400" />
        <text
          x={CX}
          y={CY + 24}
          textAnchor="middle"
          className="fill-foreground stroke-background text-[11px] font-semibold"
          style={HALO}
        >
          {block.sunLabel}
        </text>

        {/* Earth */}
        <circle cx={ex} cy={ey} r="4.5" className="fill-sky-400" />
        <text
          x={ex}
          y={ey + 16}
          textAnchor="middle"
          className="fill-muted-foreground stroke-background text-[10.5px] font-semibold"
          style={HALO}
        >
          {block.earthLabel}
        </text>

        {/* Mars */}
        <g opacity={marsOn || beltOn ? 1 : 0.5}>
          {marsOn && (
            <circle
              cx={mx}
              cy={my}
              r="12"
              fill="none"
              className="stroke-red-500"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
          )}
          <circle cx={mx} cy={my} r={marsOn ? 7 : 5.5} className="fill-red-500" />
          <text
            x={mx + (marsOn ? 16 : 10)}
            y={my + 4}
            className={`fill-foreground stroke-background ${marsOn ? "text-[13px] font-extrabold" : "text-[12px] font-bold"}`}
            style={HALO}
          >
            {labelOf("mars")}
          </text>
        </g>

        {/* Jupiter */}
        <g opacity={jupiterOn || beltOn ? 1 : 0.5}>
          {jupiterOn && (
            <circle
              cx={jx}
              cy={jy}
              r="15"
              fill="none"
              className="stroke-orange-500"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
          )}
          <circle
            cx={jx}
            cy={jy}
            r={jupiterOn ? 10 : 8.5}
            className="fill-orange-300 stroke-orange-500"
            strokeWidth="1.2"
          />
          <text
            x={jx}
            y={jy - (jupiterOn ? 20 : 14)}
            textAnchor="middle"
            className={`fill-foreground stroke-background ${jupiterOn ? "text-[13px] font-extrabold" : "text-[12px] font-bold"}`}
            style={HALO}
          >
            {labelOf("jupiter")}
          </text>
        </g>

        {/* the belt's name, on the band */}
        <text
          x={CX}
          y={CY + beltMid + 5}
          textAnchor="middle"
          opacity={beltOn ? 1 : 0.6}
          className={`fill-foreground stroke-background ${beltOn ? "text-[13px] font-extrabold" : "text-[12px] font-bold"}`}
          style={HALO}
        >
          {labelOf("belt")}
        </text>
      </svg>

      <p className="mt-2 text-center text-[11px] italic text-muted-foreground">{block.scaleNote}</p>

      <div
        aria-live="polite"
        className="mt-3 rounded-xl border border-primary/35 bg-primary/8 px-3 py-2.5"
      >
        <p className="font-display text-[13px] font-bold text-primary">{selected.label}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground">{selected.note}</p>
      </div>
    </div>
  );
}
