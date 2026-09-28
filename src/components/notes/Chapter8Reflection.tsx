import { useState } from "react";
import type { ReflectionLesson } from "@/content/form1/science/chapter-8/chapter8-content";

// Both angles are measured from the upward normal at (210, 260).
function reflectionGeometry(angle: number) {
  const theta = (angle * Math.PI) / 180;
  const point = (side: number, length: number) => ({
    x: 210 + side * length * Math.sin(theta),
    y: 260 - length * Math.cos(theta),
  });
  return {
    origin: { x: 210, y: 260 },
    incident: point(-1, 170),
    reflected: point(1, 170),
    leftArc: point(-1, 60),
    rightArc: point(1, 60),
    theta,
  };
}
function arrow(x: number, y: number, dx: number, dy: number) {
  return `${x},${y} ${x - dx * 12 - dy * 5},${y - dy * 12 + dx * 5} ${x - dx * 12 + dy * 5},${y - dy * 12 - dx * 5}`;
}
export function ReflectionRayDiagram({
  angle = 30,
  apparatus = false,
}: {
  angle?: number;
  apparatus?: boolean;
}) {
  const g = reflectionGeometry(angle);
  const sin = Math.sin(g.theta),
    cos = Math.cos(g.theta);
  const ink = apparatus ? "#475569" : "#94a3b8";
  return (
    <svg
      data-reflection-diagram={apparatus ? "experiment" : "law"}
      data-incidence-angle={angle}
      viewBox="0 0 420 350"
      aria-hidden="true"
      className="w-full"
    >
      {apparatus && (
        <>
          <rect data-white-paper x="12" y="12" width="396" height="294" rx="8" fill="#f8fafc" />
          <path
            data-protractor
            d="M100 260A110 110 0 0 1 320 260Z"
            fill="#0ea5e9"
            fillOpacity=".07"
            stroke="#94a3b8"
          />
          {Array.from({ length: 19 }, (_, i) => i * 10).map((deg) => {
            const t = (deg * Math.PI) / 180;
            return (
              <path
                key={deg}
                d={`M${210 - 110 * Math.cos(t)} ${260 - 110 * Math.sin(t)}L${210 - 102 * Math.cos(t)} ${260 - 102 * Math.sin(t)}`}
                stroke="#94a3b8"
              />
            );
          })}
          <path
            d={`M${g.incident.x - 14} ${g.incident.y - 15}C15 100 15 215 36 320`}
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
          />
          <g data-power-supply>
            <rect x="16" y="312" width="62" height="26" rx="4" fill="#475569" />
            <circle cx="29" cy="325" r="4" fill="#4ade80" />
            <path d="M44 325h18m-9 -6v12" stroke="#cbd5e1" />
          </g>
          <g
            data-ray-box
            transform={`translate(${g.incident.x} ${g.incident.y}) rotate(${-angle})`}
          >
            <rect x="-19" y="-48" width="38" height="48" rx="4" fill="#334155" stroke="#94a3b8" />
            <circle cx="0" cy="-29" r="9" fill="#fbbf24" opacity=".8" />
            <path data-slit d="M-19 -3H-2M2 -3H19" stroke="#e2e8f0" strokeWidth="5" />
          </g>
        </>
      )}
      <rect data-plane-mirror x="35" y="260" width="350" height="13" fill="#164e63" />
      {Array.from({ length: 29 }, (_, i) => 35 + i * 12).map((x) => (
        <path key={x} d={`M${x} 262l10 10`} stroke="#67e8f9" strokeWidth="1" />
      ))}
      <path d="M35 260H385" stroke="#67e8f9" strokeWidth="4" />
      <path data-normal d="M210 35V260" stroke={ink} strokeWidth="2" strokeDasharray="6 5" />
      <path data-right-angle d="M210 247H223V260" stroke={ink} fill="none" />
      <path
        data-incident-ray
        d={`M${g.incident.x} ${g.incident.y}L210 260`}
        stroke={apparatus ? "#b45309" : "#fbbf24"}
        strokeWidth="3"
        fill="none"
      />
      <polygon
        data-incident-arrow
        points={arrow(210 - 100 * sin, 260 - 100 * cos, sin, cos)}
        fill={apparatus ? "#b45309" : "#fbbf24"}
      />
      <path
        data-reflected-ray
        d={`M210 260L${g.reflected.x} ${g.reflected.y}`}
        stroke={apparatus ? "#0369a1" : "#38bdf8"}
        strokeWidth="3"
        fill="none"
      />
      <polygon
        data-reflected-arrow
        points={arrow(210 + 125 * sin, 260 - 125 * cos, sin, -cos)}
        fill={apparatus ? "#0369a1" : "#38bdf8"}
      />
      <path
        data-incidence-arc
        d={`M${g.leftArc.x} ${g.leftArc.y}A60 60 0 0 1 210 200`}
        fill="none"
        stroke={apparatus ? "#b45309" : "#fbbf24"}
        strokeWidth="2"
      />
      <path
        data-reflection-arc
        d={`M210 200A60 60 0 0 1 ${g.rightArc.x} ${g.rightArc.y}`}
        fill="none"
        stroke={apparatus ? "#0369a1" : "#38bdf8"}
        strokeWidth="2"
      />
      <text
        x={210 - 85 * Math.sin(g.theta / 2) - 5}
        y={260 - 85 * Math.cos(g.theta / 2)}
        fill={apparatus ? "#92400e" : "#fde68a"}
        fontSize="20"
        fontStyle="italic"
      >
        i
      </text>
      <text
        x={210 + 85 * Math.sin(g.theta / 2)}
        y={260 - 85 * Math.cos(g.theta / 2)}
        fill={apparatus ? "#075985" : "#7dd3fc"}
        fontSize="20"
        fontStyle="italic"
      >
        r
      </text>
      <circle
        data-point-of-incidence
        cx="210"
        cy="260"
        r="4"
        fill={apparatus ? "#334155" : "#f8fafc"}
      />
    </svg>
  );
}

export function AmbulanceReflection({ word }: { word: string }) {
  return (
    <svg
      data-reflection-diagram="ambulance"
      viewBox="0 0 420 250"
      aria-hidden="true"
      className="w-full"
    >
      <g data-vehicle>
        <path
          d="M25 158V79Q25 63 40 63H170Q185 63 185 79V158Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="3"
        />
        <path d="M43 80H167V110H43Z" fill="#334155" />
        <rect x="70" y="52" width="70" height="10" rx="3" fill="#38bdf8" />
        <path d="M26 165H185" stroke="#e2e8f0" strokeWidth="10" />
        <rect x="33" y="166" width="24" height="24" rx="5" fill="#475569" />
        <rect x="153" y="166" width="24" height="24" rx="5" fill="#475569" />
        <g data-reversed-word transform="translate(210 0) scale(-1 1)">
          <text x="105" y="142" textAnchor="middle" fill="#be123c" fontSize="20" fontWeight="bold">
            {word}
          </text>
        </g>
      </g>
      <path d="M197 115H235m-9 -7l9 7-9 7" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <g data-rear-view-mirror>
        <path d="M324 40V23" stroke="#94a3b8" strokeWidth="8" />
        <rect
          x="246"
          y="43"
          width="155"
          height="107"
          rx="20"
          fill="#164e63"
          stroke="#67e8f9"
          strokeWidth="5"
        />
        <path d="M260 65L272 53M260 78L285 53" stroke="#67e8f9" opacity=".6" />
        <text
          data-readable-word
          x="324"
          y="112"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="19"
          fontWeight="bold"
        >
          {word}
        </text>
      </g>
      <path d="M324 156V175m-5 -7l5 7 5-7" stroke="#38bdf8" strokeWidth="2" fill="none" />
      <g data-driver>
        <circle cx="324" cy="198" r="17" fill="#94a3b8" />
        <path d="M293 243Q294 218 324 218Q354 218 355 243" fill="#475569" />
        <path d="M304 249A21 21 0 0 1 344 249" fill="none" stroke="#cbd5e1" strokeWidth="4" />
      </g>
    </svg>
  );
}

function RoadApplication({ kind }: { kind: number }) {
  return (
    <svg
      data-reflection-application={kind}
      viewBox="0 0 160 120"
      aria-hidden="true"
      className="mx-auto w-full max-w-40"
    >
      {kind === 0 ? (
        <>
          <path d="M46 103L72 19H89L115 103Z" fill="#fb923c" />
          <path d="M62 53H99L105 73H56Z" fill="#f8fafc" />
          <path d="M39 106H122" stroke="#94a3b8" strokeWidth="7" />
        </>
      ) : kind === 1 ? (
        <>
          <path d="M80 70V116" stroke="#94a3b8" strokeWidth="6" />
          <rect
            x="15"
            y="16"
            width="130"
            height="70"
            rx="5"
            fill="#065f46"
            stroke="#f8fafc"
            strokeWidth="3"
          />
          <path d="M39 51H119m-18 -16l18 16-18 16" stroke="#f8fafc" strokeWidth="7" fill="none" />
        </>
      ) : (
        <>
          <path d="M20 99L80 14L140 99Z" fill="#f43f5e" />
          <path d="M44 85L80 34L116 85Z" fill="#0f172a" />
          <path d="M57 110H103" stroke="#94a3b8" strokeWidth="5" />
        </>
      )}
    </svg>
  );
}

function RayLegend({ source: s }: { source: ReflectionLesson }) {
  return (
    <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
      {(
        [
          ["incident", "incidence"],
          ["reflected", "reflection"],
          ["normal", "mirror"],
        ] as const
      ).map(([a, b], i) => (
        <div
          key={a}
          className={i === 0 ? "text-amber-200" : i === 1 ? "text-sky-200" : "text-slate-200"}
        >
          <dt className="font-bold">{s.rayLabels[a]}</dt>
          <dd>{s.rayLabels[b]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Chapter8Reflection({ source: s }: { source: ReflectionLesson }) {
  const [selected, setSelected] = useState(0);
  const angle = s.experiment.angles[selected];
  return (
    <div data-reflection-lesson className="space-y-9 text-sm leading-6 sm:text-base">
      <section className="rounded-2xl border border-sky-300/20 bg-slate-950/40 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-sky-200">{s.title}</h3>
        <p className="mt-3 max-w-3xl text-slate-300">{s.definition}</p>
        <div className="mt-4 grid items-center gap-5 lg:grid-cols-[1.2fr_1fr]">
          <figure>
            <figcaption className="text-center text-sm text-slate-300">
              {s.rayLabels.normal}
            </figcaption>
            <ReflectionRayDiagram angle={angle} />
            <RayLegend source={s} />
            <p className="mt-3 text-center text-xs text-slate-400">● {s.rayLabels.point}</p>
          </figure>
          <div>
            <p className="text-center font-mono text-4xl font-bold text-sky-200">
              {s.lawOfReflection.keyEquation}
            </p>
            <ul className="mt-5 space-y-4">
              {s.lawOfReflection.statement.map((statement) => (
                <li key={statement} className="border-l-2 border-sky-400 pl-4">
                  {statement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section data-reflection-experiment>
        <h3 className="text-xl font-bold text-white">{s.experiment.title}</h3>
        <p className="mt-2 text-slate-300">{s.experiment.aim}</p>
        <div className="mt-5 grid items-start gap-6 md:grid-cols-2">
          <figure>
            <figcaption className="font-semibold text-sky-200">{s.labels.schematic}</figcaption>
            <ReflectionRayDiagram angle={angle} apparatus />
            <div data-angle-selector className="flex flex-wrap gap-2">
              {s.experiment.angles.map((a, i) => (
                <button
                  key={a}
                  type="button"
                  aria-label={`${s.rayLabels.incidence}: ${a}°`}
                  aria-pressed={i === selected}
                  onClick={() => setSelected(i)}
                  className={`min-h-11 rounded-lg border px-4 font-mono ${i === selected ? "border-sky-300 bg-sky-300/15 text-sky-200" : "border-white/20 text-slate-300"}`}
                >
                  i = {a}°
                </button>
              ))}
            </div>
            <p className="mt-3 font-semibold text-sky-200">
              {s.rayLabels.incidence} → {s.rayLabels.reflection}
            </p>
            <p className="mt-2 text-slate-300">{s.labels.measure}</p>
            <div className="mt-4 rounded-xl border border-white/10 p-4">
              <p className="font-bold text-white">{s.labels.results}</p>
              <table data-source-results className="mt-2 w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="p-2">i (°)</th>
                    <th className="p-2">r (°)</th>
                  </tr>
                </thead>
                <tbody>
                  {s.experiment.printedResults.map((row) => (
                    <tr key={row.i}>
                      <td className="p-2">{row.i}</td>
                      <td
                        data-unfilled-result
                        aria-label={s.labels.unfilled}
                        className="border-b border-dashed border-slate-500 p-2"
                      >
                        {row.r}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white">{s.labels.materials}</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {s.experiment.materials.map((m) => (
                  <li key={m} className="rounded-lg border border-white/15 px-3 py-1">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <details className="border-y border-white/10 py-3">
              <summary className="cursor-pointer font-bold">
                {s.labels.hypothesis} · {s.labels.variables}
              </summary>
              <p className="mt-3">{s.experiment.hypothesis}</p>
              <ul className="mt-3 space-y-2">
                {s.experiment.variables.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </details>
            <h4 className="font-bold text-white">{s.labels.procedure}</h4>
            <ol className="list-decimal space-y-2 pl-5 text-slate-300">
              {s.experiment.instructions.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <div className="border-l-2 border-sky-300 pl-4">
              <h4 className="font-bold">{s.labels.conclusion}</h4>
              <p className="mt-2">{s.experiment.conclusion}</p>
              <p className="mt-2 font-mono text-xl text-sky-200">{s.lawOfReflection.keyEquation}</p>
            </div>
          </div>
        </div>
      </section>
      <section data-lateral-inversion className="border-t border-white/10 pt-6">
        <h3 className="text-xl font-bold text-amber-200">{s.lateralInversion.title}</h3>
        <div className="mt-3 grid items-center gap-6 md:grid-cols-2">
          <figure>
            <AmbulanceReflection word={s.lateralInversion.word} />
            <figcaption className="flex flex-wrap justify-center gap-2 text-sm text-slate-300">
              <span>{s.lateralInversion.vehicle}</span>→<span>{s.lateralInversion.mirror}</span>→
              <span>{s.lateralInversion.image}</span>
            </figcaption>
          </figure>
          <p className="text-slate-300">{s.lateralInversion.prompt}</p>
        </div>
      </section>
      <section data-reflection-applications className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-white">{s.applications.title}</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {s.applications.items.map((name, i) => (
            <figure key={name}>
              <RoadApplication kind={i} />
              <figcaption className="text-center text-sm text-slate-300">{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section data-practice="8.3" className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-violet-200">{s.practice.title}</h3>
        <ol className="mt-3 list-decimal space-y-3 pl-6">
          {s.practice.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
