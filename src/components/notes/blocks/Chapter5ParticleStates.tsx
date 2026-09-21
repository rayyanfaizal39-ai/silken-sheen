import { useState } from "react";
import type {
  Chapter5Content,
  StateProperty,
} from "@/content/form1/science/chapter-5/chapter5-content";

export type ParticleStateSource = Chapter5Content["statesOfMatter"];
type Point = readonly [number, number];

// Geometry only. All states use the same container and particle radius.
const positions: readonly (readonly Point[])[] = [
  Array.from({ length: 42 }, (_, i) => [82 + (i % 7) * 22, 100 + Math.floor(i / 7) * 22] as const),
  [
    [212, 120],
    [185, 120],
    [154, 121],
    [38, 121],
    [131, 122],
    [100, 124],
    [252, 134],
    [79, 134],
    [175, 140],
    [230, 140],
    [278, 141],
    [208, 145],
    [134, 147],
    [96, 149],
    [64, 157],
    [153, 159],
    [41, 161],
    [195, 163],
    [249, 165],
    [126, 169],
    [229, 176],
    [174, 179],
    [286, 179],
    [149, 183],
    [96, 184],
    [64, 186],
    [41, 188],
    [247, 190],
    [205, 192],
    [122, 198],
    [184, 204],
    [156, 206],
    [283, 207],
    [221, 209],
    [91, 213],
    [134, 217],
    [35, 218],
    [244, 220],
    [69, 220],
    [197, 222],
    [267, 224],
    [112, 224],
  ],
  [
    [45, 48],
    [153, 43],
    [273, 59],
    [99, 99],
    [216, 118],
    [49, 167],
    [159, 170],
    [281, 189],
    [104, 224],
    [228, 225],
  ],
];
const directions: Point[] = [
  [1, -0.3],
  [-0.5, 0.8],
  [-0.8, 0.3],
  [0.6, -0.7],
  [0.6, 0.65],
  [0.7, 0.5],
  [-0.5, -0.8],
  [-0.8, -0.2],
  [0.7, -0.5],
  [0.2, -0.9],
];

export function MotionArrow({
  x,
  y,
  dx,
  dy,
  color = "#fbbf24",
}: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color?: string;
}) {
  const length = Math.hypot(dx, dy);
  const ux = dx / length,
    uy = dy / length;
  const endX = x + dx,
    endY = y + dy;
  return (
    <path
      d={`M${x} ${y} L${endX} ${endY} M${endX - ux * 5 - uy * 3} ${endY - uy * 5 + ux * 3} L${endX} ${endY} L${endX - ux * 5 + uy * 3} ${endY - uy * 5 - ux * 3}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function ParticleModel({ index, source }: { index: number; source: StateProperty }) {
  return (
    <svg
      data-particle-model={index}
      viewBox="0 0 320 260"
      role="img"
      aria-label={`${source.state}: ${source.particleArrangement}; ${source.particleMovement}`}
      className="mx-auto w-full max-w-sm"
    >
      <desc>
        {source.spaceBetweenParticles}. {source.particleMovement}.
      </desc>
      <rect
        data-container
        x="20"
        y="20"
        width="280"
        height="220"
        rx="12"
        fill="#071925"
        stroke="#7dd3fc"
        strokeWidth="2"
      />
      {positions[index].map(([x, y], i) => (
        <circle
          key={i}
          data-particle
          cx={x}
          cy={y}
          r="10"
          fill="#38bdf8"
          stroke="#bae6fd"
          strokeWidth="1.5"
        />
      ))}
      <g
        data-motion={
          index === 0 ? "vibration" : index === 1 ? "short-movement" : "random-fast-movement"
        }
      >
        {index === 0
          ? [82, 126, 170, 214].map((x) => (
              <path
                key={x}
                data-vibration
                d={`M${x - 6} 82 h12 m-3 -3 3 3 -3 3 M${x - 3} 79 l-3 3 3 3`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))
          : index === 1
            ? [2, 5, 9, 16, 28].map((i) => {
                const [x, y] = positions[1][i];
                return <MotionArrow key={i} x={x + 11} y={y - 10} dx={i % 2 ? -12 : 12} dy={-9} />;
              })
            : positions[2].map(([x, y], i) => {
                const [dx, dy] = directions[i];
                return (
                  <MotionArrow key={i} x={x + dx * 15} y={y + dy * 15} dx={dx * 40} dy={dy * 40} />
                );
              })}
      </g>
    </svg>
  );
}

export function KineticTheoryVisual({ source }: { source: ParticleStateSource }) {
  const l = source.particlePresentation;
  return (
    <figure data-visual="kinetic-theory" className="space-y-4">
      <h3 className="text-xl font-black text-white">{l.heading}</h3>
      <p className="text-sm leading-7 text-slate-300">{source.kineticTheory}</p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border-y border-amber-300/20 bg-amber-300/[.04] p-3 sm:gap-5 sm:p-5">
        <div className="text-center">
          <p className="text-sm font-bold text-sky-200">{l.cooling}</p>
          <p aria-hidden="true" className="text-2xl text-sky-300">
            ←
          </p>
          <p className="text-sm font-bold text-white">{l.lessEnergy}</p>
          <svg
            data-kinetic-speed="slower"
            viewBox="0 0 140 70"
            role="img"
            aria-label={l.slower}
            className="mx-auto w-full max-w-36"
          >
            <circle cx="42" cy="36" r="10" fill="#38bdf8" stroke="#bae6fd" />
            <MotionArrow x={59} y={36} dx={18} dy={0} />
          </svg>
          <p className="text-xs leading-5 text-slate-300">{l.slower}</p>
        </div>
        <div className="text-center">
          <svg viewBox="0 0 60 80" aria-hidden="true" className="mx-auto h-20 w-12">
            <circle cx="18" cy="30" r="9" fill="#38bdf8" />
            <circle cx="44" cy="46" r="9" fill="#38bdf8" />
            <circle cx="19" cy="64" r="9" fill="#38bdf8" />
          </svg>
          <p className="text-xs font-bold text-sky-100">{l.particles}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-amber-200">{l.heating}</p>
          <p aria-hidden="true" className="text-2xl text-amber-300">
            →
          </p>
          <p className="text-sm font-bold text-white">{l.moreEnergy}</p>
          <svg
            data-kinetic-speed="faster"
            viewBox="0 0 140 70"
            role="img"
            aria-label={l.faster}
            className="mx-auto w-full max-w-36"
          >
            <circle cx="42" cy="36" r="10" fill="#38bdf8" stroke="#bae6fd" />
            <MotionArrow x={59} y={36} dx={57} dy={0} />
          </svg>
          <p className="text-xs leading-5 text-slate-300">{l.faster}</p>
        </div>
      </div>
    </figure>
  );
}

export function Chapter5ParticleStates({ source }: { source: ParticleStateSource }) {
  const [selected, setSelected] = useState(0);
  const l = source.particlePresentation;
  const keys = Object.keys(l.properties) as Exclude<keyof StateProperty, "state">[];
  return (
    <div data-visual="particle-states" className="space-y-6">
      <KineticTheoryVisual source={source} />
      <div className="grid grid-cols-3 gap-2 md:hidden" role="group" aria-label={l.chooseState}>
        {source.stateProperties.map((s, i) => (
          <button
            key={s.state}
            type="button"
            aria-pressed={selected === i}
            aria-controls={`chapter5-particle-${i}`}
            onClick={() => setSelected(i)}
            className={`min-h-11 rounded-lg border px-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${selected === i ? "border-sky-300 bg-sky-300/15 text-white" : "border-white/10 text-slate-300"}`}
          >
            {s.state}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {source.stateProperties.map((s, i) => (
          <figure
            id={`chapter5-particle-${i}`}
            data-state-panel={i}
            key={s.state}
            className={`${selected === i ? "block" : "hidden md:block"} min-w-0 border-t border-sky-300/25 pt-4`}
          >
            <h4 className="text-center text-lg font-black text-white">{s.state}</h4>
            <ParticleModel index={i} source={s} />
            <figcaption data-cause-behaviour={i}>
              <div className="space-y-1 text-sm leading-6 text-sky-100">
                <p className="font-bold">{s.particleArrangement}</p>
                <p className="text-xs text-slate-300">
                  {l.properties.spaceBetweenParticles}: {s.spaceBetweenParticles}
                </p>
                <p>{s.particleMovement}</p>
              </div>
              <p aria-hidden="true" className="my-2 text-center text-2xl text-emerald-300">
                ↓
              </p>
              <div className="border-l-2 border-emerald-300 pl-3">
                <p className="mb-1 text-xs font-bold text-emerald-200">{l.behaviour}</p>
                <ul className="space-y-1 text-sm leading-6 text-slate-200">
                  {[s.shape, s.volume, s.compressibility].map((v, j) => (
                    <li key={j}>{v}</li>
                  ))}
                </ul>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-xs leading-6 text-slate-400">{l.modelNote}</p>
      <div
        className="overflow-x-auto rounded-xl border border-white/10"
        tabIndex={0}
        role="region"
        aria-label={l.comparison}
      >
        <table
          data-state-comparison
          className="w-full min-w-[32rem] text-left text-xs leading-5 sm:text-sm"
        >
          <caption className="p-3 text-left font-bold text-sky-200">{l.comparison}</caption>
          <thead className="bg-sky-300/[.08]">
            <tr>
              <th scope="col" className="p-3">
                {l.behaviour}
              </th>
              {source.stateProperties.map((s) => (
                <th key={s.state} scope="col" className="p-3 font-bold text-white">
                  {s.state}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {keys.map((key) => (
              <tr key={key}>
                <th scope="row" className="p-3 font-semibold text-sky-100">
                  {l.properties[key]}
                </th>
                {source.stateProperties.map((s) => (
                  <td key={s.state} className="p-3 align-top text-slate-300">
                    {s[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
