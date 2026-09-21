import { useState } from "react";
import type { ChangeOfState } from "@/content/form1/science/chapter-5/chapter5-content";
import { MotionArrow, ParticleModel, type ParticleStateSource } from "./Chapter5ParticleStates";

export function HeatArrow({
  released = false,
  reverse = false,
}: {
  released?: boolean;
  reverse?: boolean;
}) {
  return (
    <svg
      data-heat-arrow={released ? "released" : "absorbed"}
      viewBox="0 0 160 24"
      aria-hidden="true"
      className="h-6 w-full"
    >
      <MotionArrow
        x={reverse ? 149 : 11}
        y={12}
        dx={reverse ? -138 : 138}
        dy={0}
        color={released ? "#7dd3fc" : "#fbbf24"}
      />
    </svg>
  );
}

export function ParticleTransition({
  change,
  source,
}: {
  change: ChangeOfState;
  source: ParticleStateSource;
}) {
  return (
    <div
      data-particle-transition={change.id}
      data-from={change.from}
      data-to={change.to}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
    >
      <figure className="min-w-0">
        <ParticleModel index={change.from} source={source.stateProperties[change.from]} />
        <figcaption className="text-center font-bold text-sky-100">
          {change.initialState}
        </figcaption>
      </figure>
      <div className="w-10 sm:w-24">
        <HeatArrow released={change.heat === "released"} />
      </div>
      <figure className="min-w-0">
        <ParticleModel index={change.to} source={source.stateProperties[change.to]} />
        <figcaption className="text-center font-bold text-sky-100">{change.finalState}</figcaption>
      </figure>
    </div>
  );
}

export function Chapter5StateChanges({ source }: { source: ParticleStateSource }) {
  const [selected, setSelected] = useState("melting");
  const l = source.pass3Presentation;
  const change = source.changesOfState.find((c) => c.id === selected)!;
  const controls = (ids: string[]) => (
    <div className="space-y-2">
      {ids.map((id) => {
        const c = source.changesOfState.find((c) => c.id === id)!;
        return (
          <button
            key={id}
            type="button"
            data-process={id}
            data-from={c.from}
            data-to={c.to}
            data-heat={c.heat}
            aria-pressed={selected === id}
            aria-controls="chapter5-particle-mechanism"
            onClick={() => setSelected(id)}
            className={`w-full rounded-lg border px-3 py-2 text-sm leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-200 ${selected === id ? "border-white/60 bg-white/10" : "border-white/10 hover:bg-white/5"}`}
          >
            <span className="block font-bold text-white">{c.name}</span>
            <HeatArrow released={c.heat === "released"} reverse={c.from > c.to} />
            <span className={c.heat === "released" ? "text-sky-200" : "text-amber-200"}>
              {c.thermalAction}
            </span>
            <span className="block text-xs text-slate-300 md:sr-only">
              {c.initialState} → {c.finalState}
            </span>
          </button>
        );
      })}
    </div>
  );
  return (
    <section data-pass3="state-changes" className="space-y-7">
      <h3 className="text-2xl font-black text-white">{l.heading}</h3>
      <div className="flex flex-wrap gap-5 text-sm">
        <span className="text-amber-200">→ {l.absorbed}</span>
        <span className="text-sky-200">← {l.released}</span>
      </div>
      <div
        data-state-change-map
        className="grid items-center gap-3 md:grid-cols-[1fr_.8fr_1fr_.8fr_1fr]"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="contents">
            <figure className="mx-auto w-full max-w-52 md:max-w-none">
              <ParticleModel index={i} source={source.stateProperties[i]} />
              <figcaption className="text-center text-lg font-black">
                {source.stateProperties[i].state}
              </figcaption>
            </figure>
            {i < 2 &&
              controls(
                i === 0 ? ["melting", "freezing"] : ["boiling", "evaporation", "condensation"],
              )}
          </div>
        ))}
      </div>
      <div
        data-direct-solid-gas
        className="grid gap-3 border-y border-white/10 py-4 sm:grid-cols-[1fr_2fr_1fr] sm:items-center"
      >
        <p className="text-center font-bold">{source.stateProperties[0].state}</p>
        {controls(["sublimation", "sublimation-reverse"])}
        <p className="text-center font-bold">{source.stateProperties[2].state}</p>
      </div>
      <div
        id="chapter5-particle-mechanism"
        data-selected-process={change.id}
        className="grid gap-5 rounded-xl bg-white/[.035] p-4 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <h4 className="text-lg font-black text-white">{change.name}</h4>
          <p className="mt-1 text-xs text-slate-400">{l.mechanism}</p>
          <ParticleTransition change={change} source={source} />
          <p className="mt-3 text-center text-sm font-bold text-amber-100">
            {change.thermalAction}
          </p>
        </div>
        <ol className="space-y-3 text-sm leading-6 text-slate-200">
          {change.description.map((text, i) => (
            <li key={text} className="flex gap-3">
              <span className="font-mono text-emerald-300">{i + 1}.</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-xs text-slate-400">{source.particlePresentation.modelNote}</p>
    </section>
  );
}

export function LiquidGasVessel({
  boiling,
  label,
  activity = false,
}: {
  boiling: boolean;
  label: string;
  activity?: boolean;
}) {
  return (
    <svg
      data-liquid-gas={boiling ? "boiling" : "evaporation"}
      data-boiling-activity={activity || undefined}
      viewBox="0 0 300 250"
      role="img"
      aria-label={label}
      className="mx-auto w-full max-w-xs"
    >
      <path
        d="M65 70 V169 Q65 180 76 180 H224 Q235 180 235 169 V70"
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="3"
      />
      <path
        d="M68 110 H232 V168 Q232 177 222 177 H78 Q68 177 68 168 Z"
        fill="#38bdf8"
        opacity=".3"
      />
      <path d="M68 110 H232" stroke="#7dd3fc" strokeWidth="2" />
      {boiling ? (
        <g data-boiling-bubbles>
          {[
            [90, 163, 5],
            [134, 147, 8],
            [189, 166, 5],
            [207, 131, 10],
            [101, 121, 7],
            [161, 120, 6],
          ].map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r} fill="none" stroke="#bae6fd" strokeWidth="2" />
          ))}
        </g>
      ) : (
        <g data-gradual-vapour>
          {[
            [88, 48],
            [162, 29],
            [222, 53],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" fill="#7dd3fc" />
          ))}
        </g>
      )}
      {boiling && (
        <g data-heating-apparatus>
          <path
            d="M54 185 H246 M77 190 L65 236 M223 190 L235 236"
            stroke="#94a3b8"
            strokeWidth="4"
          />
          <path data-wire-gauze d="M62 180 H238 M65 183 H235" stroke="#cbd5e1" />
          <path d="M133 236 H167 M145 236 V216 H155 V236" fill="#64748b" stroke="#cbd5e1" />
          <path d="M150 216 Q136 208 150 191 Q164 208 150 216Z" fill="#fbbf24" />
        </g>
      )}
      {activity && (
        <g data-retort-thermometer>
          <path d="M27 231 V20 M15 232 H44 M27 38 H148" stroke="#94a3b8" strokeWidth="4" />
          <rect x="139" y="18" width="10" height="127" rx="5" fill="#cbd5e1" />
          <path d="M144 138 V58" stroke="#fda4af" strokeWidth="3" />
          <circle cx="144" cy="140" r="5" fill="#fda4af" />
          <path d="M134 34 H154 V42 H134Z" fill="#64748b" />
        </g>
      )}
    </svg>
  );
}

export function Chapter5BoilingTemperature({ source }: { source: ParticleStateSource }) {
  const l = source.pass3Presentation;
  return (
    <>
      <section data-pass3="boiling-evaporation" className="space-y-5">
        <h3 className="text-2xl font-black">{l.comparison}</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {["boiling", "evaporation"].map((id) => {
            const c = source.changesOfState.find((c) => c.id === id)!;
            return (
              <figure
                key={id}
                data-comparison-process={id}
                className="border-t border-sky-300/25 pt-4"
              >
                <h4 className="text-lg font-black">{c.name}</h4>
                <LiquidGasVessel boiling={id === "boiling"} label={c.name} />
                <figcaption>
                  <p className="font-bold text-sky-200">
                    {c.initialState} → {c.finalState}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                    {c.description.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>
      <section data-pass3="constant-temperature" className="space-y-5">
        <h3 className="text-2xl font-black">{l.constant}</h3>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">{source.constantFacts[0]}</p>
        <div className="grid gap-5 lg:grid-cols-3">
          {source.constantProcesses.map((id) => {
            const c = source.changesOfState.find((c) => c.id === id)!;
            return (
              <figure key={id} data-constant-process={id} className="border-t border-white/15 pt-4">
                <h4 className="font-bold">{c.name}</h4>
                <ParticleTransition change={c} source={source} />
                <div className="mt-4 flex items-center gap-4">
                  <svg
                    data-constant-thermometers
                    viewBox="0 0 100 130"
                    role="img"
                    aria-label={l.sameTemperature}
                    className="h-24 w-20 shrink-0"
                  >
                    {[20, 70].map((x) => (
                      <g key={x}>
                        <rect
                          x={x}
                          y="10"
                          width="10"
                          height="88"
                          rx="5"
                          stroke="#cbd5e1"
                          fill="none"
                        />
                        <path
                          data-fixed-level
                          d={`M${x + 5} 98 V42`}
                          stroke="#fda4af"
                          strokeWidth="4"
                        />
                        <circle cx={x + 5} cy="105" r="10" fill="#fda4af" />
                      </g>
                    ))}
                    <path d="M42 65 H58 M42 72 H58" stroke="#6ee7b7" strokeWidth="3" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-bold text-emerald-200">{l.sameTemperature}</p>
                    <HeatArrow released={c.heat === "released"} />
                    <p className="text-slate-300">{c.thermalAction}</p>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
        <div
          data-activity="5.6A"
          className="grid items-center gap-5 border-t border-white/10 pt-6 sm:grid-cols-[minmax(220px,1fr)_2fr]"
        >
          <div>
            <LiquidGasVessel boiling activity label={source.boilingActivity.title} />
            <p className="text-center text-xs text-sky-200">
              {l.water} · {l.thermometer}
            </p>
          </div>
          <div>
            <h4 className="font-black">{source.boilingActivity.title}</h4>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {source.boilingActivity.materials}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              {source.boilingActivity.procedure}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
