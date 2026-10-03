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

export function GlassBlockDiagram() {
  const start = { x: 60, y: 65 },
    entry = { x: 170, y: 150 },
    end = { x: 235, y: 290 };
  const incoming = Math.hypot(110, 85),
    inside = Math.hypot(65, 140);
  return (
    <svg
      data-refraction-visual="experiment"
      viewBox="0 0 320 320"
      aria-hidden="true"
      className="w-full"
    >
      <rect
        data-glass-block
        x="15"
        y="150"
        width="290"
        height="155"
        fill="#0ea5e9"
        fillOpacity=".18"
        stroke="#7dd3fc"
        strokeWidth="2"
      />
      <path
        data-entry-normal
        d="M170 30V305"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <path data-right-angle d="M170 138H182V150" fill="none" stroke="#cbd5e1" strokeWidth="2" />
      <Ray start={start} end={entry} kind="incident" />
      <Ray start={entry} end={end} kind="refracted" color="#38bdf8" />
      <path
        data-i-arc
        d={`M170 95A55 55 0 0 0 ${170 - (55 * 110) / incoming} ${150 - (55 * 85) / incoming}`}
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
      />
      <path
        data-r-arc
        d={`M170 205A55 55 0 0 0 ${170 + (55 * 65) / inside} ${150 + (55 * 140) / inside}`}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
      />
      <text data-angle="i" x="136" y="89" fontSize="28" fontStyle="italic" fill="#fde68a">
        i
      </text>
      <text data-angle="r" x="184" y="233" fontSize="28" fontStyle="italic" fill="#7dd3fc">
        r
      </text>
      <circle data-entry-point cx="170" cy="150" r="3" fill="#f8fafc" />
    </svg>
  );
}

export function Chapter8Refraction({ source: s }: { source: RefractionLesson }) {
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
        <figure className="mx-auto mt-5 max-w-md">
          <figcaption className="font-semibold text-amber-200">{l.demo}</figcaption>
          <div data-glass-entry-diagram className="relative mt-4">
            <GlassBlockDiagram />
            <span className="absolute left-0 top-0 max-w-[40%] text-sm leading-5 text-amber-200">
              {l.incident}
            </span>
            <span className="absolute left-[53%] top-0 text-sm leading-5 text-slate-200">
              {l.normal}
            </span>
            <span className="absolute left-[8%] top-[38%] text-sm leading-5 text-slate-200">
              {s.glassEntry.air}
            </span>
            <span className="absolute left-[8%] top-[55%] text-sm leading-5 text-sky-200">
              {s.glassEntry.glass}
            </span>
            <span className="absolute right-0 top-[54%] max-w-[34%] text-sm leading-5 text-sky-200">
              {l.refracted}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span className="text-amber-200">{l.incidence}</span>
            <span className="text-sky-200">{l.refraction}</span>
          </div>
        </figure>
        <div data-glass-entry-rule className="mt-5 border-l-2 border-cyan-300 pl-4">
          <p className="font-semibold text-cyan-200">{s.glassEntry.rule}</p>
          <p className="mt-2 text-slate-300">{s.glassEntry.angleComparison}</p>
          <p className="mt-2 font-mono text-xl font-bold text-cyan-200">r &lt; i</p>
        </div>
        <p data-glass-angle-relationship className="mt-4 text-slate-300">
          {e.hypothesis}
        </p>
      </section>
    </div>
  );
}
