import { useState } from "react";
import type {
  Chapter6Content,
  ClassificationContent,
} from "@/content/form1/science/chapter-6/chapter6-content";
type Experiment = ClassificationContent["experiments"][number];
const materialColors: Record<string, string> = {
  copper: "#d99162",
  carbon: "#475569",
  iron: "#94a3b8",
  sulphur: "#fbbf24",
  tin: "#cbd5e1",
};
export function ExperimentDiagram({
  experiment,
  sample,
}: {
  experiment: Experiment;
  sample: number;
}) {
  const item = experiment.samples[sample];
  const color = materialColors[item.material];
  const effect = item.effect;
  return (
    <svg
      data-experiment-diagram={experiment.id}
      data-sample={item.material}
      data-effect={effect}
      viewBox="0 0 360 220"
      role="img"
      aria-label={`${experiment.title}: ${item.name}`}
      className="mx-auto w-full max-w-md"
    >
      <desc>{experiment.procedure}</desc>
      {experiment.id === "lustre" && (
        <g>
          <path d="M42 161 L263 64" stroke={color} strokeWidth="15" />
          <path
            data-sandpaper
            d="M185 50 L242 90 L284 46 L228 13Z"
            fill="#a87d4f"
            stroke="#d6b58c"
            strokeWidth="2"
          />
          <path d="M208 37 l15 10 m-5 14 15 10 m-30 -20 15 10" stroke="#735436" />
          <path
            d="M152 40 l-24 20 12 -1 M128 60 l3 -13"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2"
          />
          {effect === "shine" && (
            <g data-shine stroke="#fef3c7" strokeWidth="2">
              <path d="M89 106 v27 m-13 -14 h27 M280 87 v20 m-10 -10 h20" />
            </g>
          )}
        </g>
      )}
      {experiment.id === "ductility" && (
        <g>
          {effect === "bend" ? (
            <path
              data-bent-wire
              d="M130 169 C62 94 125 23 181 28 C257 24 294 117 232 170"
              fill="none"
              stroke={color}
              strokeWidth="8"
            />
          ) : (
            <g data-broken-graphite>
              <path
                d="M62 118 L174 118 M193 137 L298 153"
                fill="none"
                stroke={color}
                strokeWidth="10"
              />
              <path d="M175 99 l9 12 m4 13 10 -4" stroke="#fbbf24" strokeWidth="2" />
            </g>
          )}
        </g>
      )}
      {experiment.id === "malleability" && (
        <g>
          <path
            data-wooden-block
            d="M47 160 H302 V202 H47Z"
            fill="#946d48"
            stroke="#d6b58c"
            strokeWidth="2"
          />
          <path
            d="M67 175 q50 -15 110 0 t100 0 M70 190 q65 -17 160 0"
            fill="none"
            stroke="#735436"
          />
          {effect === "flat" ? (
            <ellipse
              data-flattened-sheet
              cx="174"
              cy="153"
              rx="95"
              ry="7"
              fill={color}
              stroke="#e2e8f0"
            />
          ) : (
            <g data-broken-sheet fill={color}>
              <path d="M75 146 l29 -12 12 23Z M150 138 l35 2 -10 16Z M220 154 l40 -23 21 24Z" />
            </g>
          )}
          <g data-hammer transform="rotate(-25 210 90)">
            <rect x="207" y="50" width="14" height="90" rx="3" fill="#b59368" />
            <rect x="169" y="40" width="82" height="25" rx="3" fill="#94a3b8" stroke="#e2e8f0" />
          </g>
          <path d="M154 99 v34 l-6 -8 m6 8 6 -8" fill="none" stroke="#67e8f9" strokeWidth="2" />
        </g>
      )}
      {experiment.id === "electricity" && (
        <g data-circuit fill="none" stroke="#cbd5e1" strokeWidth="2.5">
          <path d="M65 96 V35 H162 M182 35 H295 V95 M295 121 V180 H235 M125 180 H65 V134" />
          <g data-dry-cell>
            <path d="M165 22 V48 M177 28 V42" />
            <path d="M151 18 h8 m-4 -4 v8" stroke="#fda4af" />
          </g>
          <g data-switch>
            <circle cx="295" cy="96" r="3" />
            <circle cx="295" cy="119" r="3" />
            <path d="M295 96 V119" />
          </g>
          <g data-ammeter>
            <circle cx="65" cy="115" r="23" fill="#0f172a" />
            <text x="65" y="109" textAnchor="middle" fontSize="14" fill="#e2e8f0" stroke="none">
              A
            </text>
            <path
              data-needle
              d={effect === "current" ? "M65 129 L78 113" : "M65 129 L50 116"}
              stroke="#6ee7b7"
            />
          </g>
          <path data-test-rod d="M127 180 H233" stroke={color} strokeWidth="13" />
          <g data-crocodile-clips stroke="#fda4af" strokeWidth="4">
            <path d="M113 174 l19 6 -19 6 M247 174 l-19 6 19 6" />
          </g>
        </g>
      )}
      {experiment.id === "heat" && (
        <g>
          <path
            data-retort-stand
            d="M37 193 H107 M72 190 V25 M72 70 H130"
            stroke="#94a3b8"
            strokeWidth="5"
            fill="none"
          />
          <rect x="124" y="63" width="170" height="11" rx="4" fill={color} stroke="#cbd5e1" />
          <path
            data-clamp
            d="M118 60 H140 V78 H118Z"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
          <path data-wax d="M270 77 q9 -7 17 0 l-4 5 h-10Z" fill="#fde68a" />
          <g data-thumbtack transform={effect === "drop" ? "translate(0 58)" : ""}>
            <path d="M272 83 H286 M279 83 V97" stroke="#cbd5e1" strokeWidth="3" />
          </g>
          {effect === "drop" && (
            <path d="M301 88 v47 l-5 -6 m5 6 5 -6" stroke="#6ee7b7" fill="none" strokeWidth="2" />
          )}
          <path data-candle d="M155 190 V108 H169 V190Z" fill="#7dd3fc" stroke="#e0f2fe" />
          <path d="M162 107 Q152 97 162 79 Q173 98 162 107Z" fill="#fbbf24" />
          <g data-stopwatch>
            <circle cx="322" cy="166" r="22" stroke="#94a3b8" fill="none" strokeWidth="2" />
            <path
              d="M322 144 V135 M315 135 H329 M322 151 V168 L332 177"
              stroke="#94a3b8"
              fill="none"
              strokeWidth="2"
            />
          </g>
        </g>
      )}
      {experiment.id === "melting" && (
        <g>
          <path
            data-fume-chamber
            d="M28 203 V12 H329 V203 M28 34 H329"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
          />
          <path
            d="M120 23 H232 m-91 -6 -8 6 8 6 m70 -12 8 6 -8 6"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2"
          />
          <path
            data-crucible
            d="M118 77 Q124 138 180 138 Q236 138 242 77"
            stroke="#d6b58c"
            fill="#ad835c"
            strokeWidth="3"
          />
          <ellipse data-powder cx="180" cy="84" rx="57" ry="9" fill={color} />
          <path data-thermometer d="M181 41 V113" stroke="#e2e8f0" strokeWidth="7" />
          <path d="M181 109 V69" stroke="#fda4af" strokeWidth="2" />
          <path
            data-pipeclay-triangle
            d="M107 146 H253 L181 136Z"
            stroke="#cbd5e1"
            fill="none"
            strokeWidth="3"
          />
          <path
            data-tripod
            d="M122 149 L112 195 M238 149 L248 195 M181 151 V193"
            stroke="#94a3b8"
            strokeWidth="4"
          />
          <path
            data-bunsen
            d="M166 209 H196 M177 209 V187 H185 V209"
            fill="#64748b"
            stroke="#cbd5e1"
          />
          <path d="M181 185 Q170 171 181 152 Q194 174 181 185Z" fill="#fbbf24" />
        </g>
      )}
    </svg>
  );
}
export function ExperimentPanel({
  experiment,
  source,
}: {
  experiment: Experiment;
  source: Chapter6Content;
}) {
  const [sample, setSample] = useState(0);
  const l = source.classification.labels;
  const keys: Record<string, (keyof typeof l)[]> = {
    lustre: ["sandpaper"],
    ductility: [],
    malleability: ["hammer", "wood"],
    electricity: ["dryCell", "ammeter", "switch", "clips"],
    heat: ["stand", "candle", "wax", "thumbtack", "stopwatch"],
    melting: ["fume", "crucible", "thermometer", "triangle", "tripod", "burner"],
  };
  return (
    <article data-property-test={experiment.id} className="min-w-0 border-t border-white/15 pt-5">
      <h4 className="text-lg font-black">{experiment.title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {experiment.samples.map((v, i) => (
          <button
            type="button"
            key={v.name}
            aria-pressed={sample === i}
            onClick={() => setSample(i)}
            className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-bold focus-visible:outline focus-visible:outline-cyan-200 ${sample === i ? "border-cyan-300 bg-cyan-300/10" : "border-white/20"}`}
          >
            {v.name}
          </button>
        ))}
      </div>
      <ExperimentDiagram experiment={experiment} sample={sample} />
      <p className="text-xs leading-5 text-cyan-200">
        {keys[experiment.id].map((k) => l[k]).join(" · ")}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{experiment.procedure}</p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{experiment.materials}</p>
      <p className="mt-3 border-l-2 border-emerald-300 pl-3 text-sm font-bold text-emerald-100">
        {l.conclusion}: {experiment.samples[sample].outcome}
      </p>
      {experiment.safety && (
        <p className="mt-3 rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
          {experiment.safety}
        </p>
      )}
    </article>
  );
}
export function Chapter6Experiments({ source }: { source: Chapter6Content }) {
  const c = source.classification;
  return (
    <section data-visual="experiment-6-2" className="space-y-6">
      <h3 className="text-2xl font-black">{c.labels.experiment}</h3>
      <div className="grid gap-8 lg:grid-cols-2">
        {c.experiments.map((e) => (
          <ExperimentPanel key={e.id} experiment={e} source={source} />
        ))}
      </div>
      <p className="text-xs text-slate-400">{c.labels.model}</p>
      <aside className="border-t border-violet-300/25 pt-6">
        <h3 className="text-xl font-black text-violet-100">{c.labels.appreciation}</h3>
        {c.appreciation.map((text) => (
          <p key={text} className="mt-3 text-sm leading-6 text-slate-300">
            {text}
          </p>
        ))}
      </aside>
    </section>
  );
}
