import { useState } from "react";
import type {
  CometOriginBlock,
  CometOriginRegion,
} from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Where most comets come from — the Kuiper Belt and the Oort Cloud.
 *
 * The two regions differ in SHAPE as much as distance, and that is what the
 * figure shows: the Kuiper Belt is a flat ring beyond the outermost planet's
 * orbit (drawn tilted, so it reads as a disc), while the Oort Cloud is a shell
 * that surrounds the whole solar system in every direction. Drawn on a dark
 * space panel in both themes so the scattered icy bodies stay visible.
 *
 * Radii are drawing values only; the real Oort Cloud is thousands of times
 * farther away than this, and the figure is marked not to scale.
 */

const W = 340;
const H = 230;
const SX = W / 2;
const SY = H / 2;
/** Perspective squash for the flat, tilted discs. */
const TILT = 0.36;

/** Exported so the nesting is asserted: planets < Kuiper Belt < Oort Cloud. */
export const COMET_ORIGIN_R = {
  neptune: 50,
  kuiperInner: 60,
  kuiperOuter: 82,
  oortInner: 96,
  oortOuter: 110,
};

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

const KUIPER_DOTS = (() => {
  const rand = seeded(1313);
  return Array.from({ length: 90 }, () => {
    const a = rand() * Math.PI * 2;
    const r =
      COMET_ORIGIN_R.kuiperInner +
      rand() * (COMET_ORIGIN_R.kuiperOuter - COMET_ORIGIN_R.kuiperInner);
    return { x: SX + r * Math.cos(a), y: SY + r * Math.sin(a) * TILT, size: 0.8 + rand() * 0.9 };
  });
})();

const OORT_DOTS = (() => {
  const rand = seeded(1331);
  return Array.from({ length: 170 }, () => {
    const a = rand() * Math.PI * 2;
    const r =
      COMET_ORIGIN_R.oortInner + rand() * (COMET_ORIGIN_R.oortOuter - COMET_ORIGIN_R.oortInner);
    return { x: SX + r * Math.cos(a), y: SY + r * Math.sin(a), size: 0.7 + rand() * 0.9 };
  });
})();

const PLANET_ORBITS = [12, 22, 34, COMET_ORIGIN_R.neptune];

const HALO = { paintOrder: "stroke" as const, strokeWidth: 3, strokeLinejoin: "round" as const };

export function CometOriginFigure({ block, lang }: { block: CometOriginBlock; lang?: string }) {
  const [active, setActive] = useState<CometOriginRegion["id"]>(block.regions[0]?.id ?? "kuiper");
  const copy = figureCopy(lang);
  const selected = block.regions.find((region) => region.id === active) ?? block.regions[0];
  const labelOf = (id: CometOriginRegion["id"]) =>
    block.regions.find((region) => region.id === id)?.label ?? "";
  const kuiperOn = active === "kuiper";
  const oortOn = active === "oort";

  const oortLeader = {
    x: SX + COMET_ORIGIN_R.oortInner * Math.cos((235 * Math.PI) / 180),
    y: SY + COMET_ORIGIN_R.oortInner * Math.sin((235 * Math.PI) / 180),
  };

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.regions.map((region) => (
          <button
            key={region.id}
            type="button"
            aria-pressed={region.id === active}
            aria-label={region.label}
            onClick={() => setActive(region.id)}
            className={conceptButtonClass(region.id === active, "flex-auto sm:flex-none")}
          >
            {region.label}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto block h-auto w-full max-w-[560px] rounded-xl"
        role="img"
        aria-label={block.figureLabel}
        data-ch13-figure="comet-origin"
        data-active={active}
      >
        <rect x="0" y="0" width={W} height={H} rx="12" className="fill-slate-950" />

        {/* Oort Cloud: a shell all round the solar system */}
        <g opacity={oortOn ? 1 : 0.3}>
          {oortOn &&
            [COMET_ORIGIN_R.oortInner, COMET_ORIGIN_R.oortOuter].map((r) => (
              <circle
                key={r}
                cx={SX}
                cy={SY}
                r={r}
                fill="none"
                className="stroke-sky-300/70"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}
          {OORT_DOTS.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={oortOn ? dot.size + 0.3 : dot.size}
              className="fill-sky-100"
            />
          ))}
        </g>

        {/* the planets' orbits, the outermost being Neptune's */}
        {PLANET_ORBITS.map((r) => (
          <ellipse
            key={r}
            cx={SX}
            cy={SY}
            rx={r}
            ry={r * TILT}
            fill="none"
            className="stroke-slate-400/45"
            strokeWidth="0.9"
          />
        ))}

        {/* Kuiper Belt: a flat ring beyond the planets */}
        <g opacity={kuiperOn ? 1 : 0.3}>
          {kuiperOn &&
            [COMET_ORIGIN_R.kuiperInner, COMET_ORIGIN_R.kuiperOuter].map((r) => (
              <ellipse
                key={r}
                cx={SX}
                cy={SY}
                rx={r}
                ry={r * TILT}
                fill="none"
                className="stroke-amber-300/80"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}
          {KUIPER_DOTS.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={kuiperOn ? dot.size + 0.4 : dot.size}
              className="fill-amber-200"
            />
          ))}
        </g>

        {/* Sun */}
        <circle cx={SX} cy={SY} r="6" className="fill-yellow-300" />
        <text
          x={SX}
          y={SY - 11}
          textAnchor="middle"
          className="fill-white stroke-slate-950 text-[10px] font-semibold"
          style={HALO}
        >
          {block.sunLabel}
        </text>

        {/* labels */}
        <text
          x={SX}
          y={SY + COMET_ORIGIN_R.kuiperOuter * TILT + 17}
          textAnchor="middle"
          opacity={kuiperOn ? 1 : 0.65}
          className={`fill-amber-100 stroke-slate-950 ${kuiperOn ? "text-[13px] font-extrabold" : "text-[12px] font-bold"}`}
          style={HALO}
        >
          {labelOf("kuiper")}
        </text>
        <line
          x1="84"
          y1="21"
          x2={oortLeader.x}
          y2={oortLeader.y}
          className="stroke-sky-200/70"
          strokeWidth="1"
          opacity={oortOn ? 1 : 0.6}
        />
        <text
          x="10"
          y="24"
          opacity={oortOn ? 1 : 0.65}
          className={`fill-sky-100 stroke-slate-950 ${oortOn ? "text-[13px] font-extrabold" : "text-[12px] font-bold"}`}
          style={HALO}
        >
          {labelOf("oort")}
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
