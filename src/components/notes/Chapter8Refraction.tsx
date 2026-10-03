import { useState } from "react";
import type {
  RefractionCase,
  RefractionLesson,
} from "@/content/form1/science/chapter-8/chapter8-content";

type Point = { x: number; y: number };
function Ray({
  start,
  end,
  kind,
  color = "#fbbf24",
  dashed = false,
}: {
  start: Point;
  end: Point;
  kind: string;
  color?: string;
  dashed?: boolean;
}) {
  const length = Math.hypot(end.x - start.x, end.y - start.y);
  const dx = (end.x - start.x) / length,
    dy = (end.y - start.y) / length;
  const x = start.x + (end.x - start.x) * 0.62,
    y = start.y + (end.y - start.y) * 0.62;
  return (
    <g>
      <path
        data-ray={kind}
        d={`M${start.x} ${start.y}L${end.x} ${end.y}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      {!dashed && (
        <polygon
          data-ray-arrow={kind}
          points={`${x},${y} ${x - dx * 12 - dy * 4},${y - dy * 12 + dx * 4} ${x - dx * 12 + dy * 4},${y - dy * 12 - dx * 4}`}
          fill={color}
        />
      )}
    </g>
  );
}
function Fish({ image = false }: { image?: boolean }) {
  return (
    <g
      fill={image ? "#fbbf24" : "#22d3ee"}
      fillOpacity={image ? 0.2 : 1}
      stroke={image ? "#fbbf24" : "#a5f3fc"}
      strokeWidth="2"
      strokeDasharray={image ? "4 3" : undefined}
    >
      <path d="M-34 0Q-10 -26 26 -5L44 -17L40 0L44 17L26 5Q-10 26 -34 0Z" />
      <circle cx="-20" cy="-3" r="2" fill={image ? "#fbbf24" : "#0f172a"} stroke="none" />
    </g>
  );
}

export function ApparentDepthDiagram() {
  const actual = { x: 300, y: 265 },
    apparent = { x: 300, y: 205 };
  const crossings = [
    { x: 180, y: 130 },
    { x: 196, y: 130 },
  ];
  return (
    <svg data-refraction-visual="fish" viewBox="0 0 420 330" aria-hidden="true" className="w-full">
      <path d="M20 130H400V307H20Z" fill="#0ea5e9" fillOpacity=".15" />
      <path data-water-surface d="M20 130H400" stroke="#7dd3fc" strokeWidth="3" />
      <path d="M20 294Q75 280 130 297T240 296T400 295V307H20Z" fill="#64748b" fillOpacity=".35" />
      {crossings.map((p, index) => {
        const eye = { x: p.x - ((apparent.x - p.x) * 80) / 75, y: 50 };
        return (
          <g key={index} data-fish-ray-pair={index}>
            <Ray start={actual} end={p} kind="fish-water" />
            <Ray start={p} end={eye} kind="fish-air" />
            <Ray start={p} end={apparent} kind="apparent-extension" color="#fbbf24" dashed />
          </g>
        );
      })}
      <g data-observer transform="translate(68 43)">
        <path d="M-30 0Q0 -26 30 0Q0 22 -30 0Z" fill="#e2e8f0" />
        <circle r="8" fill="#0f172a" />
      </g>
      <g data-actual-fish transform="translate(300 265)">
        <Fish />
      </g>
      <g data-apparent-fish transform="translate(300 205)">
        <Fish image />
      </g>
      <path d="M350 205H376M350 265H376" stroke="#94a3b8" />
    </svg>
  );
}

export function PencilIllusionDiagram() {
  return (
    <svg
      data-refraction-visual="pencil"
      viewBox="0 0 320 250"
      aria-hidden="true"
      className="w-full"
    >
      <path d="M75 68L89 226H233L247 68" fill="none" stroke="#94a3b8" strokeWidth="3" />
      <path d="M80 125H242L233 223H89Z" fill="#0ea5e9" fillOpacity=".20" />
      <path data-pencil-above d="M211 29L162 125" stroke="#fbbf24" strokeWidth="9" />
      <path data-pencil-seen-in-water d="M162 125L95 207" stroke="#fde68a" strokeWidth="9" />
      <path data-pencil-water-surface d="M80 125H242" stroke="#7dd3fc" strokeWidth="2" />
      <ellipse cx="161" cy="68" rx="86" ry="12" fill="none" stroke="#94a3b8" strokeWidth="2" />
    </svg>
  );
}

const rayGeometry = {
  "water-air": { start: { x: 120, y: 30 }, end: { x: 270, y: 205 }, topWater: true },
  "air-water": { start: { x: 50, y: 35 }, end: { x: 200, y: 210 }, topWater: false },
  "normal-water-air": { start: { x: 160, y: 30 }, end: { x: 160, y: 210 }, topWater: true },
  "normal-air-water": { start: { x: 160, y: 30 }, end: { x: 160, y: 210 }, topWater: false },
} as const;
export function RefractionCaseDiagram({ kind }: { kind: RefractionCase["id"] }) {
  const g = rayGeometry[kind];
  const crossing = { x: 160, y: 120 };
  return (
    <svg data-refraction-visual={kind} viewBox="0 0 320 240" aria-hidden="true" className="w-full">
      <rect
        data-water-medium
        x="15"
        y={g.topWater ? 15 : 120}
        width="290"
        height="105"
        fill="#0ea5e9"
        fillOpacity=".18"
      />
      <path data-boundary d="M15 120H305" stroke="#7dd3fc" strokeWidth="2" />
      <path data-normal d="M160 8V232" stroke="#cbd5e1" strokeDasharray="5 5" />
      <Ray start={g.start} end={crossing} kind="incident" />
      <Ray start={crossing} end={g.end} kind="refracted" color="#38bdf8" />
      <circle cx="160" cy="120" r="3" fill="#f8fafc" />
    </svg>
  );
}

export function GlassBlockDiagram({ showBlock = true }: { showBlock?: boolean }) {
  const start = { x: 80, y: 295 },
    entry = { x: 165, y: 205 },
    exit = { x: 215, y: 105 },
    end = { x: 300, y: 15 };
  const incoming = Math.hypot(85, 90),
    inside = Math.hypot(50, 100);
  return (
    <svg
      data-refraction-visual="experiment"
      data-block-present={showBlock}
      viewBox="0 0 400 370"
      aria-hidden="true"
      className="w-full"
    >
      <rect data-white-paper x="15" y="5" width="370" height="325" rx="5" fill="#f8fafc" />
      <rect
        data-traced-outline
        x="125"
        y="105"
        width="180"
        height="100"
        fill="none"
        stroke="#64748b"
        strokeDasharray="5 4"
      />
      {showBlock && (
        <rect
          data-glass-block
          x="125"
          y="105"
          width="180"
          height="100"
          fill="#7dd3fc"
          fillOpacity=".35"
          stroke="#0284c7"
          strokeWidth="2"
        />
      )}
      <path data-entry-normal d="M165 140V282" stroke="#475569" strokeDasharray="5 4" />
      <path data-exit-normal d="M215 55V150" stroke="#475569" strokeDasharray="5 4" />
      <Ray start={start} end={entry} kind="incident" color="#b45309" />
      <Ray start={entry} end={exit} kind="internal" color="#0369a1" />
      <Ray start={exit} end={end} kind="emerging" color="#0369a1" />
      <path
        data-i-arc
        d={`M165 250A45 45 0 0 1 ${165 - (45 * 85) / incoming} ${205 + (45 * 90) / incoming}`}
        fill="none"
        stroke="#b45309"
        strokeWidth="2"
      />
      <path
        data-r-arc
        d={`M165 160A45 45 0 0 1 ${165 + (45 * 50) / inside} ${205 - (45 * 100) / inside}`}
        fill="none"
        stroke="#0369a1"
        strokeWidth="2"
      />
      <text x="143" y="263" fontSize="19" fontStyle="italic" fill="#92400e">
        i
      </text>
      <text x="185" y="155" fontSize="19" fontStyle="italic" fill="#075985">
        r
      </text>
      <circle data-entry-point cx="165" cy="205" r="3" fill="#334155" />
      <circle data-exit-point cx="215" cy="105" r="3" fill="#334155" />
      <g data-ray-box transform="translate(80 295) rotate(43.36)">
        <rect x="-19" y="0" width="38" height="48" rx="3" fill="#334155" stroke="#94a3b8" />
        <circle cx="0" cy="27" r="9" fill="#fbbf24" />
        <path data-single-slit d="M-19 3H-2M2 3H19" stroke="#cbd5e1" strokeWidth="5" />
      </g>
      <path d="M38 326Q13 350 32 350H57" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <g data-power-supply>
        <rect x="57" y="337" width="65" height="25" rx="3" fill="#475569" />
        <circle cx="69" cy="349" r="4" fill="#4ade80" />
      </g>
      <g data-ruler>
        <rect x="316" y="141" width="27" height="138" fill="#fde68a" stroke="#a16207" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M316 ${149 + i * 11}h${i % 2 === 0 ? 12 : 7}`} stroke="#92400e" />
        ))}
      </g>
      <g data-protractor>
        <path d="M213 309A49 49 0 0 1 311 309Z" fill="#cbd5e1" fillOpacity=".6" stroke="#64748b" />
        {Array.from({ length: 7 }, (_, i) => (i * Math.PI) / 6).map((t) => (
          <path
            key={t}
            d={`M${262 - 49 * Math.cos(t)} ${309 - 49 * Math.sin(t)}L${262 - 42 * Math.cos(t)} ${309 - 42 * Math.sin(t)}`}
            stroke="#64748b"
          />
        ))}
      </g>
    </svg>
  );
}

export function Chapter8Refraction({ source: s }: { source: RefractionLesson }) {
  const [showBlock, setShowBlock] = useState(true);
  const l = s.labels,
    e = s.experiment;
  return (
    <div data-refraction-lesson className="space-y-9 text-sm leading-6 sm:text-base">
      <div data-refraction-illusions className="grid gap-7 md:grid-cols-[1.2fr_1fr]">
        <figure>
          <figcaption className="text-lg font-semibold text-cyan-200">
            {s.illusions.pond}
          </figcaption>
          <p className="mt-4 pl-6 text-sm text-slate-300">{l.observer}</p>
          <ApparentDepthDiagram />
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span className="text-cyan-200">● {l.actualFish}</span>
            <span className="text-amber-200">◌ {l.image}</span>
            <span className="text-amber-200">→ {l.light}</span>
            <span className="text-sky-200">— {l.surface}</span>
          </div>
          <p className="mt-4 text-slate-300">{s.fish.explanation}</p>
          <p className="mt-2 text-slate-300" data-refraction-phenomenon>
            {s.activity.phenomena[1]}
          </p>
        </figure>
        <figure>
          <figcaption className="text-lg font-semibold text-cyan-200">
            {s.illusions.pencil}
          </figcaption>
          <div className="mx-auto max-w-md">
            <PencilIllusionDiagram />
          </div>
          <p className="mt-2 text-slate-300" data-refraction-phenomenon>
            {s.activity.phenomena[0]}
          </p>
        </figure>
      </div>
      <p
        data-refraction-definition
        className="border-l-2 border-violet-400 py-2 pl-5 text-lg text-slate-100"
      >
        {s.definition}
      </p>
      <p data-fish-question className="max-w-3xl text-slate-300">
        {s.fish.question}
      </p>
      <section data-ray-cases>
        <h3 className="text-xl font-bold text-cyan-200">{l.rayCases}</h3>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {s.cases.map((c, i) => (
            <figure
              key={c.id}
              data-ray-case={c.id}
              className="rounded-xl border border-sky-300/15 bg-slate-950/35 p-4"
            >
              <figcaption className="font-bold text-white">
                {String.fromCharCode(65 + i)} · {c.scenario}
              </figcaption>
              <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
                <span>{c.from}</span>
                <span className="text-slate-400">┆ {l.normal}</span>
              </div>
              <RefractionCaseDiagram kind={c.id} />
              <p className="text-sm">{c.to}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <span className="text-amber-200">→ {l.incident}</span>
                <span className="text-sky-200">→ {l.refracted}</span>
              </div>
              <p className="mt-3 text-slate-300">{c.behavior}</p>
            </figure>
          ))}
        </div>
      </section>
      <section data-refraction-experiment className="border-t border-white/10 pt-7">
        <h3 className="text-xl font-bold text-white">{e.title}</h3>
        <p className="mt-3 text-slate-300">{e.aim}</p>
        <p className="mt-3 font-semibold text-cyan-200">{e.hypothesis}</p>
        <div className="mx-auto mt-5 max-w-xl">
          <figure>
            <figcaption className="font-semibold text-amber-200">{l.demo}</figcaption>
            <GlassBlockDiagram showBlock={showBlock} />
            <div data-glass-controls className="flex flex-wrap gap-2">
              {[true, false].map((p) => (
                <button
                  key={String(p)}
                  type="button"
                  onClick={() => setShowBlock(p)}
                  aria-pressed={showBlock === p}
                  className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold ${showBlock === p ? "border-cyan-300 bg-cyan-300/10 text-cyan-200" : "border-white/20 text-slate-300"}`}
                >
                  {p ? l.glass : l.remove}
                </button>
              ))}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="text-amber-200">
                <dt>{l.incident}</dt>
                <dd>{l.incidence}</dd>
              </div>
              <div className="text-sky-200">
                <dt>{l.refracted}</dt>
                <dd>{l.refraction}</dd>
              </div>
              <div>
                <dt>{l.normal}</dt>
                <dd>{l.paper}</dd>
              </div>
              <div>
                <dt>{l.box}</dt>
                <dd>{l.slit}</dd>
              </div>
            </dl>
          </figure>
        </div>
      </section>
    </div>
  );
}
