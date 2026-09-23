import { useState } from "react";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
const colors = { M: "#94a3b8", N: "#fbbf24", S: "#c4b5fd", I: "#6ee7b7" };
const regions = { M: "metal", N: "nonmetal", S: "semi", I: "inert" };
export function PeriodicSchematic({
  source,
  selected,
}: {
  source: Chapter6Content;
  selected: string;
}) {
  const c = source.classification;
  return (
    <svg
      data-periodic-table
      viewBox="0 0 740 415"
      role="img"
      aria-label={c.labels.table}
      className="w-full"
    >
      <desc>
        {c.arrangement} {c.regions.map((r) => `${r.name}: ${r.location}`).join("; ")}
      </desc>
      {c.regionRows.map((row, y) =>
        [...row].map((v, x) =>
          v === "." ? null : (
            <rect
              key={`${x}-${y}`}
              data-region={regions[v as keyof typeof regions]}
              data-row={y}
              data-column={x}
              x={10 + x * 40}
              y={10 + y * 40}
              width="35"
              height="35"
              rx="3"
              fill={colors[v as keyof typeof colors]}
              opacity={selected === regions[v as keyof typeof regions] ? 1 : 0.3}
              stroke={selected === regions[v as keyof typeof regions] ? "#fff" : "none"}
              strokeWidth="2"
            />
          ),
        ),
      )}
      {[0, 1].map((y) => (
        <g key={y} data-detached-metals opacity={selected === "metal" ? 1 : 0.3}>
          {Array.from({ length: 15 }, (_, i) => (
            <rect
              key={i}
              x={130 + i * 40}
              y={325 + y * 40}
              width="35"
              height="35"
              rx="3"
              fill={colors.M}
            />
          ))}
        </g>
      ))}
      <path
        d="M108 230 H120 V320 H140 M108 270 H115 V375 H130"
        stroke="#94a3b8"
        fill="none"
        strokeDasharray="3 5"
      />
      <text x="27" y="34" textAnchor="middle" fontSize="19" fill="#07131d">
        H
      </text>
      <text x="547" y="114" textAnchor="middle" fontSize="17" fill="#07131d">
        Si
      </text>
      <text x="547" y="154" textAnchor="middle" fontSize="17" fill="#07131d">
        Ge
      </text>
    </svg>
  );
}
export function Chapter6PeriodicTable({ source }: { source: Chapter6Content }) {
  const [selected, setSelected] = useState("metal");
  const c = source.classification;
  const l = c.labels;
  return (
    <section data-visual="chapter6-periodic" className="space-y-6">
      <h3 className="text-2xl font-black">{l.table}</h3>
      <p className="text-sm leading-6 text-slate-300">{c.arrangement}</p>
      <div className="rounded-xl bg-violet-300/10 p-4">
        <p className="font-bold text-violet-200">{l.context}</p>
        <p className="mt-2 text-sm">{source.periodicTable.totalDiscovered}</p>
      </div>
      <PeriodicSchematic source={source} selected={selected} />
      <div role="group" aria-label={l.table} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {c.regions.map((r, i) => (
          <button
            type="button"
            key={r.id}
            aria-pressed={selected === r.id}
            onClick={() => setSelected(r.id)}
            className={`min-h-16 rounded-lg border p-3 text-left focus-visible:outline focus-visible:outline-cyan-200 ${selected === r.id ? "border-white/70 bg-white/10" : "border-white/15"}`}
          >
            <span
              className="mr-2 inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: Object.values(colors)[i] }}
            />
            <b>{r.name}</b>
            <span className="mt-1 block text-xs leading-5 text-slate-300">{r.location}</span>
          </button>
        ))}
      </div>
      <p className="border-l-2 border-violet-300 pl-4 text-sm leading-7 text-violet-100">
        {source.metalsVsNonMetals.semiMetalNote}
      </p>
      <div>
        <h4 className="text-lg font-black">{l.history}</h4>
        <ol className="mt-4 grid gap-5 md:grid-cols-3">
          {c.history.map((h) => (
            <li key={h.scientist} className="border-l-2 border-violet-300 pl-4">
              <p className="font-bold text-violet-200">{h.scientist}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{h.contribution}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-sm leading-6 text-slate-400">{source.periodicTable.namingNote}</p>
    </section>
  );
}
export function Chapter6MetalProperties({ source }: { source: Chapter6Content }) {
  const c = source.classification;
  const l = c.labels;
  return (
    <section data-visual="chapter6-metal-properties" className="space-y-7">
      <h3 className="text-2xl font-black">{l.comparison}</h3>
      <div
        className="overflow-x-auto rounded-xl border border-white/15"
        role="region"
        aria-label={l.comparison}
        tabIndex={0}
      >
        <table data-metal-comparison className="w-full min-w-96 text-sm">
          <thead>
            <tr>
              {[l.metal, l.property, l.nonmetal].map((v) => (
                <th key={v} className="bg-white/5 p-3 text-left">
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {source.metalsVsNonMetals.comparison.map((r) => (
              <tr key={r.property} className="border-t border-white/10">
                <td className="p-3 text-sky-100">{r.metal}</td>
                <th scope="row" className="p-3 text-left text-slate-300">
                  {r.property}
                </th>
                <td className="p-3 text-amber-100">{r.nonMetal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-lg font-black">{l.applications}</h4>
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
        {c.applications.map((a) => (
          <div key={a.id} data-element-application={a.id} className="border-t border-white/15 pt-4">
            <p className="font-black text-cyan-100">{a.element}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{a.properties}</p>
            <p className="mt-2 text-sm font-bold text-emerald-100">
              <span aria-hidden="true">→ </span>
              {a.uses}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
