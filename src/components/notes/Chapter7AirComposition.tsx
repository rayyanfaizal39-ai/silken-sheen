import { useId, useState } from "react";
import type { AirCycle, Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";

const surface = "rounded-2xl border border-sky-200/15 bg-slate-950/45 p-4 sm:p-6";
const heading = "text-xl font-bold text-white sm:text-2xl";

function Symbol({ kind, x = 0, y = 0 }: { kind: string; x?: number; y?: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "plants" ? (
        <>
          <path
            d="M0 20 V-16 M0 4 Q-30 4 -24 -21 Q0 -21 0 4 M0 -5 Q28 -9 25 -29 Q0 -28 0 -5"
            fill="#065f46"
          />
          <path d="M-15 23 H16" />
        </>
      ) : kind === "animals" || kind === "respiration" ? (
        <>
          <ellipse cx="0" cy="0" rx="24" ry="15" fill="#334155" />
          <path d="M-18 10 V27 M15 10 V27 M20 -9 L29 -28 L43 -20 L35 1 H24 M-25 -5 Q-38 -18 -34 -27" />
        </>
      ) : kind === "dead" || kind === "decomposition" ? (
        <>
          <path d="M-28 17 Q0 -15 30 17 Z M-12 17 V30 M16 17 V30" fill="#78350f" />
          <path d="M-18 -12 Q-8 -35 12 -22 Q9 1 -18 -12 Z M-13 -9 L14 8" />
        </>
      ) : kind === "fossil" ? (
        <>
          <path d="M-35 20 L-23 -12 L-2 -20 L16 -7 L31 23 Z" fill="#475569" />
          <path d="M-23 -12 L-5 7 L16 -7 M-5 7 L-8 22" />
        </>
      ) : kind === "combustion" ? (
        <path
          d="M0 -32 Q33 -4 21 18 Q0 40 -21 18 Q-32 4 -8 -8 Q-7 7 0 10 Q13 -5 0 -32Z"
          fill="#9a3412"
        />
      ) : kind === "rusting" ? (
        <>
          <path
            d="M-24 -25 L18 23 M-32 -18 L-16 -33 M-8 -24 L32 21 M-15 -16 L0 -31"
            stroke="#fb923c"
            strokeWidth="7"
          />
          <circle cx="6" cy="11" r="3" fill="#92400e" />
        </>
      ) : (
        <path
          d="M-32 12 Q-49 -6 -24 -15 Q-17 -39 5 -22 Q33 -28 32 -5 Q51 0 34 17 H-27"
          fill="#164e63"
        />
      )}
    </g>
  );
}

export function AirCompositionChart({ content: t }: { content: Bab7Content }) {
  let angle = -90;
  return (
    <figure className={surface} data-visual="air-composition">
      <h3 className={heading}>{t.airLesson.compositionTitle}</h3>
      <div className="mt-4 grid items-center gap-5 sm:grid-cols-[minmax(160px,240px)_1fr]">
        <svg
          viewBox="0 0 240 240"
          role="img"
          aria-label={t.airLesson.compositionTitle}
          className="mx-auto w-full max-w-60"
        >
          {t.composition.legend.map((gas, i) => {
            const start = angle;
            angle += parseFloat(gas.percentage) * 3.6;
            const point = (a: number) =>
              `${120 + 100 * Math.cos((a * Math.PI) / 180)} ${120 + 100 * Math.sin((a * Math.PI) / 180)}`;
            return (
              <path
                key={gas.name}
                data-gas={i}
                data-percentage={gas.percentage}
                d={`M120 120 L${point(start)} A100 100 0 ${angle - start > 180 ? 1 : 0} 1 ${point(angle)} Z`}
                fill={gas.color}
              />
            );
          })}
          <text x="85" y="155" fontSize="23" fontWeight="800" fill="#071126">
            78%
          </text>
          <text x="55" y="70" fontSize="18" fontWeight="800" fill="white">
            21%
          </text>
        </svg>
        <dl className="grid grid-cols-2 gap-3">
          {t.composition.legend.map((gas, i) => (
            <div
              key={gas.name}
              className="border-l-4 pl-3"
              style={{ borderColor: gas.color }}
              data-composition-gas={i}
            >
              <dt className="text-sm text-slate-200">{gas.name}</dt>
              <dd className="text-2xl font-bold tabular-nums text-white">{gas.percentage}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
        <p>{t.hook.body}</p>
        <p>
          <strong className="text-emerald-200">{t.composition.reveals[1].chipLabel}: </strong>
          {t.composition.reveals[1].body}
        </p>
        <div data-variable-components className="border-t border-white/10 pt-3">
          <strong className="text-sky-200">{t.airLesson.variableTitle}</strong>
          <p>{t.composition.reveals[0].body}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function OxygenApparatus({ content: t, stage }: { content: Bab7Content; stage: number }) {
  const jar = stage === 0 ? 290 : 180;
  const candle = stage === 0 ? 130 : 260;
  const water = stage === 2 ? 220 : 260;
  return (
    <svg
      viewBox="0 0 520 370"
      role="img"
      aria-label={t.airLesson.stageCaptions[stage]}
      data-apparatus-stage={stage}
      className="w-full"
    >
      <path
        data-apparatus="basin"
        d="M70 244 L85 334 H468 L485 244"
        fill="#0c4a6e"
        fillOpacity=".2"
        stroke="#cbd5e1"
        strokeWidth="3"
      />
      <path
        data-apparatus="water"
        d="M74 260 H482 L468 334 H85 Z"
        fill="#38bdf8"
        fillOpacity=".3"
      />
      <path
        data-apparatus="stand"
        d={`M${jar - 8} 307 H${jar + 24} M${jar + 136} 307 H${jar + 168} M${jar + 10} 307 V333 M${jar + 150} 307 V333`}
        stroke="#94a3b8"
        strokeWidth="6"
      />
      <path
        data-apparatus="jar"
        d={`M${jar} 305 V60 H${jar + 160} V305`}
        fill="#bae6fd"
        fillOpacity=".05"
        stroke="#e0f2fe"
        strokeWidth="3"
      />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i} data-jar-division={i + 1}>
          <rect
            x={jar + 1}
            y={60 + i * 40}
            width="158"
            height="40"
            fill="none"
            stroke="#7dd3fc"
            strokeDasharray="4 5"
            strokeOpacity=".35"
          />
          <path d={`M${jar + 144} ${100 + i * 40} h16`} stroke="#f8fafc" strokeWidth="2" />
        </g>
      ))}
      {stage === 2 && (
        <rect
          data-water-rise="one-fifth"
          x={jar + 2}
          y={water}
          width="156"
          height="40"
          fill="#38bdf8"
          fillOpacity=".5"
        />
      )}
      <path
        data-apparatus="plasticine"
        d={`M${candle - 28} 334 Q${candle - 22} 311 ${candle} 319 Q${candle + 26} 311 ${candle + 29} 334Z`}
        fill="#a78bfa"
      />
      <rect
        data-apparatus="candle"
        x={candle - 10}
        y="225"
        width="20"
        height="98"
        rx="3"
        fill="#fef3c7"
        stroke="#fbbf24"
        strokeWidth="2"
      />
      <path d={`M${candle} 226 V216`} stroke="#e2e8f0" strokeWidth="3" />
      {stage !== 2 && (
        <path
          data-flame="burning"
          d={`M${candle} 185 Q${candle + 23} 210 ${candle} 217 Q${candle - 19} 210 ${candle} 185Z`}
          fill="#fb923c"
        />
      )}
      <path data-original-water-level d="M55 260 H495" stroke="#e0f2fe" strokeDasharray="5 5" />
      {stage === 2 && (
        <>
          <path
            data-final-water-level
            d={`M${jar} 220 H${jar + 180} M${jar + 174} 220 V260 M${jar + 169} 225 L${jar + 174} 220 L${jar + 179} 225 M${jar + 169} 255 L${jar + 174} 260 L${jar + 179} 255`}
            stroke="#67e8f9"
            fill="none"
            strokeWidth="2"
          />
          <text x={jar + 183} y="246" fill="#67e8f9" fontSize="17">
            1/5
          </text>
        </>
      )}
      <g data-apparatus="matches">
        <rect x="10" y="310" width="44" height="24" rx="3" fill="#9a3412" stroke="#fed7aa" />
        <path d="M17 301 L46 287" stroke="#fed7aa" strokeWidth="3" />
        <circle cx="46" cy="287" r="3" fill="#f87171" />
      </g>
      <g data-apparatus="marker" transform="translate(26 155) rotate(-15)">
        <rect width="12" height="70" rx="3" fill="#94a3b8" />
        <rect width="12" height="18" fill="#334155" />
        <path d="M2 70 L6 80 L10 70" fill="#e2e8f0" />
      </g>
      {[
        [candle, 274, 1],
        [candle + 33, 326, 2],
        [31, 353, 3],
        [470, 350, 4],
        [28, 143, 5],
        [jar + 80, 43, 6],
        [jar + 156, 326, 7],
        [104, 321, 8],
      ].map(([x, y, n]) => (
        <g key={n}>
          <circle cx={x} cy={y} r="11" fill="#0f172a" stroke="#7dd3fc" />
          <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="12">
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function AirOxygenActivity({ content: t }: { content: Bab7Content }) {
  const [stage, setStage] = useState(0);
  const a = t.airLesson;
  return (
    <section className={surface} data-activity="7.1">
      <h3 className={heading}>{a.activityTitle}</h3>
      <p className="mt-2 text-slate-300">{t.experiment.aim}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="grid grid-cols-3 gap-2">
            {a.stages.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={stage === i}
                onClick={() => setStage(i)}
                className={`min-h-11 rounded-lg border p-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-sky-300 ${stage === i ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-white/15 text-slate-300"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <figure className="mt-2">
            <OxygenApparatus content={t} stage={stage} />
            <figcaption role="status" className="min-h-16 text-sm leading-6 text-sky-100">
              {a.stageCaptions[stage]}
              <span className="block text-xs text-slate-300">
                {stage === 2 ? a.finalWater : a.originalWater}
              </span>
            </figcaption>
          </figure>
        </div>
        <div>
          <h4 className="font-bold text-sky-200">{a.apparatusLabel}</h4>
          <ol className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            {a.apparatus.map((item, i) => (
              <li key={item.id} className="flex gap-2">
                <span className="font-mono text-sky-300">{i + 1}.</span>
                {item.label}
              </li>
            ))}
          </ol>
          <details className="mt-5 border-t border-white/10 pt-3">
            <summary className="cursor-pointer py-2 font-bold text-sky-200">
              {a.procedureLabel}
            </summary>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
              {t.experiment.steps.map((step) => (
                <li key={step.caption}>{step.caption}</li>
              ))}
            </ol>
          </details>
        </div>
      </div>
      <div className="mt-3 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
        <p
          data-activity-estimate
          className="rounded-xl bg-amber-300/10 p-3 font-bold text-amber-200"
        >
          {a.estimate}
        </p>
        <p data-chart-oxygen className="rounded-xl bg-sky-300/10 p-3 font-bold text-sky-200">
          {a.chartOxygen}
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{t.experiment.predictFeedback}</p>
    </section>
  );
}

const carbonNodes: Record<string, [number, number]> = {
  atmosphere: [300, 45],
  plants: [140, 220],
  animals: [460, 220],
  dead: [240, 390],
  fossil: [455, 505],
};
const carbonPaths: Record<string, [string, number, number]> = {
  photosynthesis: ["M218 64 Q115 75 128 176", 92, 112],
  "plant-respiration": ["M160 177 Q220 151 262 91", 225, 145],
  "animal-respiration": ["M449 176 Q440 100 359 77", 432, 110],
  feeding: ["M198 215 H399", 300, 207],
  "plant-death": ["M151 275 Q155 321 206 350", 169, 318],
  "animal-death": ["M444 274 Q404 345 291 377", 385, 335],
  decomposition: ["M193 394 C15 389 8 48 224 35", 43, 313],
  formation: ["M285 437 Q330 485 398 505", 333, 478],
  combustion: ["M493 482 C597 443 591 24 377 35", 557, 313],
};
const oxygenNodes: Record<string, [number, number]> = {
  oxygen: [300, 45],
  plants: [95, 222],
  carbon: [110, 460],
  respiration: [330, 190],
  rusting: [505, 190],
  combustion: [345, 340],
  decomposition: [497, 454],
};
const oxygenPaths: Record<string, [string, number, number]> = {
  photosynthesis: ["M87 180 Q72 26 224 35", 93, 103],
  "carbon-uptake": ["M101 418 V281", 105, 344],
  respiration: ["M300 90 L320 146", 322, 119],
  rusting: ["M366 61 Q494 61 503 146", 451, 103],
  combustion: ["M257 88 Q216 197 309 307", 240, 223],
  decomposition: ["M372 46 C591 28 595 310 519 415", 560, 309],
  "respiration-carbon": ["M318 252 Q252 350 148 422", 250, 335],
  "combustion-carbon": ["M320 387 L169 452", 267, 413],
  "decomposition-carbon": ["M446 481 Q302 566 176 492", 328, 525],
};

export function AirCycleDiagram({
  cycle,
  kind,
  title,
}: {
  cycle: AirCycle;
  kind: "carbon" | "oxygen";
  title: string;
}) {
  const [selected, setSelected] = useState(0);
  const uid = useId().replace(/:/g, "");
  const positions = kind === "carbon" ? carbonNodes : oxygenNodes;
  const paths = kind === "carbon" ? carbonPaths : oxygenPaths;
  const current = cycle.edges[selected];
  const nodeLabel = (id: string) => cycle.nodes.find((n) => n.id === id)?.label;
  return (
    <section className={surface} data-cycle={kind}>
      <h3 className={heading}>{title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{cycle.definition}</p>
      <div className="mt-4 grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <div className="relative mx-auto aspect-[10/11] w-full max-w-[640px]">
          <svg
            viewBox="0 0 600 660"
            role="img"
            aria-label={title}
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              {["uses", "returns", "transfer"].map((role, i) => (
                <marker
                  key={role}
                  id={`${uid}-${role}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L10 5 L0 10Z" fill={["#67e8f9", "#fbbf24", "#94a3b8"][i]} />
                </marker>
              ))}
            </defs>
            {cycle.edges.map((edge, i) => (
              <path
                key={edge.id}
                data-edge={edge.id}
                data-from={edge.from}
                data-to={edge.to}
                data-flow={edge.role}
                d={paths[edge.id][0]}
                fill="none"
                stroke={
                  edge.role === "uses" ? "#67e8f9" : edge.role === "returns" ? "#fbbf24" : "#94a3b8"
                }
                strokeWidth={selected === i ? 5 : 2.5}
                opacity={selected === i ? 1 : 0.65}
                markerEnd={`url(#${uid}-${edge.role})`}
              />
            ))}
            {cycle.nodes.map((node) => (
              <g key={node.id} data-cycle-node={node.id} className="text-sky-100">
                <Symbol kind={node.id} x={positions[node.id][0]} y={positions[node.id][1]} />
              </g>
            ))}
          </svg>
          {cycle.nodes.map((node) => (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 rounded-md bg-[#071126]/95 px-1 py-1 text-center text-xs font-semibold leading-tight text-slate-100 sm:text-sm"
              style={{
                left: `${positions[node.id][0] / 6}%`,
                top: `${(positions[node.id][1] + 32) / 6.6}%`,
                width: node.id === "atmosphere" || node.id === "oxygen" ? "43%" : "29%",
              }}
            >
              {node.label}
            </div>
          ))}
          {cycle.edges.map((edge, i) => (
            <button
              key={edge.id}
              type="button"
              aria-label={`${i + 1}. ${edge.label}: ${nodeLabel(edge.from)} → ${nodeLabel(edge.to)}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-bold focus-visible:outline-2 focus-visible:outline-sky-300 ${selected === i ? "border-white bg-sky-800 text-white" : "border-slate-500 bg-[#0b1932] text-slate-200"}`}
              style={{ left: `${paths[edge.id][1] / 6}%`, top: `${paths[edge.id][2] / 6.6}%` }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <p className="border-l-4 border-cyan-300 pl-2 text-cyan-100">{cycle.legend.uses}</p>
            <p className="border-l-4 border-amber-300 pl-2 text-amber-100">
              {cycle.legend.returns}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {cycle.edges.map((edge, i) => (
              <button
                key={edge.id}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={`flex min-h-11 items-center gap-2 rounded-lg border p-2 text-left text-xs leading-5 sm:text-sm ${selected === i ? "border-sky-300 bg-sky-300/10 text-white" : "border-white/10 text-slate-300"}`}
              >
                <span className="font-mono text-sky-300">{i + 1}</span>
                {edge.label}
              </button>
            ))}
          </div>
          <div
            role="status"
            className="mt-4 min-h-28 border-l-2 border-sky-300 bg-sky-300/5 p-3 text-sm leading-6"
          >
            <strong>{current.label}</strong>
            <p>
              {nodeLabel(current.from)} → {nodeLabel(current.to)}
            </p>
            {current.role !== "transfer" && (
              <p className={current.role === "uses" ? "text-cyan-200" : "text-amber-200"}>
                {cycle.legend[current.role]}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Chapter7AirComposition({ content: t }: { content: Bab7Content }) {
  const a = t.airLesson;
  return (
    <div className="space-y-8" data-air-lesson>
      <AirCompositionChart content={t} />
      <section className="border-l-2 border-sky-300 pl-4">
        <h3 className={heading}>{a.mixtureTitle}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{t.composition.reveals[2].body}</p>
        <ol className="mt-4 flex flex-col gap-3 text-sm text-sky-100 sm:flex-row sm:items-center">
          {a.distillation.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-xl">
                  →
                </span>
              )}
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
      <AirOxygenActivity content={t} />
      <section data-gas-uses>
        <h3 className={heading}>{a.usesTitle}</h3>
        <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.uses.tabs.map((gas, i) => (
            <div key={gas.name} className="border-t-2 border-sky-300/40 pt-3">
              <p className="font-mono text-xl font-bold text-sky-300">{gas.symbol}</p>
              <h4 className="mt-1 font-bold text-white">{gas.name}</h4>
              <svg
                viewBox="0 0 160 70"
                aria-hidden="true"
                data-gas-use-geometry={i}
                className="my-2 h-16 w-full text-sky-200"
              >
                {i === 0 ? (
                  <>
                    <path
                      d="M80 7 Q49 14 56 49 L67 39 L80 55 L93 39 L104 49 Q111 14 80 7Z"
                      fill="#164e63"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="80" cy="26" r="7" fill="#38bdf8" />
                    <path d="M70 51 L80 65 L90 51" fill="#fb923c" />
                  </>
                ) : i === 1 ? (
                  <Symbol kind="plants" x={80} y={39} />
                ) : i === 2 ? (
                  <>
                    <path
                      d="M51 10 H109 L118 62 H42 Z"
                      fill="#164e63"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <Symbol kind="plants" x={80} y={39} />
                  </>
                ) : (
                  <>
                    <ellipse cx="52" cy="23" rx="15" ry="20" fill="#164e63" stroke="currentColor" />
                    <path
                      d="M52 43 Q66 54 51 66 M99 40 Q79 9 104 8 Q131 9 111 40 V49 H99 Z M99 54 H111"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                {gas.uses.map((item) => (
                  <li key={item.label}>
                    {item.label}
                    {item.sub && <span className="block text-xs text-sky-200">{item.sub}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <AirCycleDiagram kind="carbon" title={t.cycles.carbonCycle.heading} cycle={a.carbon} />
      <AirCycleDiagram kind="oxygen" title={t.cycles.oxygenCycle.heading} cycle={a.oxygen} />
      <section
        className="border-l-2 border-emerald-300 pl-4"
        data-activity="7.2"
        data-activity-kind="research-presentation"
      >
        <h3 className={heading}>{a.research.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{a.research.aim}</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
          {a.research.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </section>
      <section data-interference>
        <h3 className={heading}>{a.interference.title}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-3 text-sm leading-6">
            <ul className="list-disc pl-5 text-slate-300">
              {a.interference.causes.map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>
            <p className="text-amber-200">↓ {a.interference.increase}</p>
            <p className="text-amber-100">↓ {a.interference.effects.join(" · ")}</p>
          </div>
          <span aria-hidden="true" className="self-center text-2xl text-emerald-300">
            →
          </span>
          <ol className="space-y-2 text-sm leading-6">
            {t.cycles.balanceActions.map((action, i) => (
              <li key={action} className="flex gap-3">
                <span className="text-emerald-300">{i + 1}.</span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className={surface} data-practice="7.1">
        <h3 className={heading}>{a.practice.title}</h3>
        <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-6 text-slate-200">
          {a.practice.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
