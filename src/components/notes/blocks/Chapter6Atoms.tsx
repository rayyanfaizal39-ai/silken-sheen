import { useState } from "react";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";

export function AtomDiagram({ source, selected }: { source: Chapter6Content; selected: number }) {
  const l = source.classification.labels;
  const clusters = [
    [
      [140, 131],
      [173, 148],
      [141, 168],
    ],
    [
      [160, 123],
      [132, 149],
      [161, 172],
    ],
    [
      [150, 40],
      [55, 205],
      [245, 205],
    ],
  ];
  return (
    <svg
      data-atom-diagram
      viewBox="0 0 300 290"
      role="img"
      aria-label={`${l.atom}: ${source.atomsAndMolecules.subatomicParticles[selected].name}`}
      className="mx-auto w-full max-w-sm"
    >
      <desc>{source.atomsAndMolecules.neutralityNote}</desc>
      <circle
        data-nucleus
        cx="150"
        cy="150"
        r="48"
        fill="#a78bfa"
        fillOpacity=".12"
        stroke="#c4b5fd"
        strokeWidth="2"
      />
      <circle
        cx="150"
        cy="150"
        r="110"
        fill="none"
        stroke="#38bdf8"
        strokeOpacity=".4"
        strokeDasharray="5 6"
      />
      {clusters.map((ps, i) => (
        <g
          key={i}
          data-subatomic={["proton", "neutron", "electron"][i]}
          data-highlighted={selected === i}
          opacity={selected === i ? 1 : 0.4}
        >
          {ps.map(([x, y], j) => (
            <g key={j}>
              <circle
                cx={x}
                cy={y}
                r={i === 2 ? 12 : 14}
                fill={["#fda4af", "#94a3b8", "#38bdf8"][i]}
                stroke={selected === i ? "#fff" : "#64748b"}
                strokeWidth={selected === i ? 3 : 1}
              />
              {i === 0 ? (
                <path
                  d={`M${x - 5} ${y} h10 M${x} ${y - 5} v10`}
                  stroke="#07131d"
                  strokeWidth="2"
                />
              ) : i === 2 ? (
                <path d={`M${x - 5} ${y} h10`} stroke="#07131d" strokeWidth="2" />
              ) : (
                <circle cx={x} cy={y} r="4" fill="none" stroke="#07131d" strokeWidth="2" />
              )}
            </g>
          ))}
        </g>
      ))}
      <g data-electron-motion fill="none" stroke="#7dd3fc" strokeWidth="2">
        <path d="M183 45 Q218 57 236 86 l-1 -12 M236 86 l-12 -5" />
        <path d="M125 257 Q90 249 67 223 l2 12 M67 223 l12 3" />
      </g>
      <path d="M181 184 L218 262" stroke="#c4b5fd" strokeWidth="2" />
    </svg>
  );
}

export function Chapter6Atoms({ source }: { source: Chapter6Content }) {
  const [selected, setSelected] = useState(0);
  const l = source.classification.labels;
  const p = source.atomsAndMolecules.subatomicParticles[selected];
  return (
    <section data-visual="chapter6-atoms" className="space-y-7">
      <h3 className="text-2xl font-black">
        {l.atom} · {l.molecule}
      </h3>
      <p className="max-w-3xl text-sm leading-7 text-slate-300">
        {source.atomsAndMolecules.definition}
      </p>
      <aside className="border-l-2 border-cyan-300 pl-4">
        <p className="text-sm font-bold text-cyan-200">{l.microscope}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {source.classification.microscopeAnalogy}
        </p>
      </aside>
      <div className="grid items-center gap-6 md:grid-cols-2">
        <figure>
          <AtomDiagram source={source} selected={selected} />
          <figcaption className="text-center text-violet-200">{l.nucleus}</figcaption>
        </figure>
        <div>
          <div role="group" aria-label={l.choose} className="flex flex-wrap gap-2">
            {source.atomsAndMolecules.subatomicParticles.map((v, i) => (
              <button
                key={v.name}
                type="button"
                data-particle-select={i}
                aria-pressed={selected === i}
                aria-controls="chapter6-selected-particle"
                onClick={() => setSelected(i)}
                className={`min-h-11 rounded-lg border px-4 py-2 font-bold focus-visible:outline focus-visible:outline-cyan-200 ${selected === i ? "border-cyan-300 bg-cyan-300/15" : "border-white/20"}`}
              >
                {v.name}
              </button>
            ))}
          </div>
          <div id="chapter6-selected-particle" className="mt-5 border-l-2 border-cyan-300 pl-4">
            <h4 className="text-lg font-black">{p.name}</h4>
            <p className="mt-3 text-sm text-cyan-100">
              {l.charge}: {p.charge}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {l.location}: {p.location}
            </p>
          </div>
          <div data-neutral-atom className="mt-6 rounded-xl bg-emerald-300/10 p-4">
            <h4 className="font-black text-emerald-100">{l.neutral}</h4>
            <div className="my-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center text-sm font-bold">
              <div>
                <p className="text-rose-200">+ + +</p>
                {l.protons}
              </div>
              <span className="text-2xl text-emerald-300">=</span>
              <div>
                <p className="text-cyan-200">− − −</p>
                {l.electrons}
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              {source.atomsAndMolecules.neutralityNote}
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400">{l.model}</p>
      <div className="grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-2">
        {[false, true].map((m) => (
          <figure key={String(m)}>
            <svg
              data-oxygen={m ? "molecule" : "atom"}
              viewBox="0 0 240 120"
              role="img"
              aria-label={m ? l.oxygenMolecule : l.oxygenAtom}
              className="mx-auto h-32 w-full max-w-xs"
            >
              {(m ? [94, 146] : [120]).map((x) => (
                <g key={x}>
                  <circle
                    data-oxygen-atom
                    cx={x}
                    cy="60"
                    r="28"
                    fill="#0891b2"
                    stroke="#67e8f9"
                    strokeWidth="2"
                  />
                  <text x={x} y="68" textAnchor="middle" fontSize="24" fill="white">
                    O
                  </text>
                </g>
              ))}
            </svg>
            <figcaption className="text-center font-bold">
              {m ? l.oxygenMolecule : l.oxygenAtom}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-sm leading-7 text-slate-300">
        {source.atomsAndMolecules.moleculeDefinition}
      </p>
      <div className="grid gap-7 border-t border-white/15 pt-6 sm:grid-cols-2">
        {[false, true].map((compound) => (
          <figure key={String(compound)}>
            <h3 className="text-xl font-black">{compound ? l.compound : l.element}</h3>
            <svg
              data-material-model={compound ? "compound" : "element"}
              viewBox="0 0 270 160"
              role="img"
              aria-label={compound ? l.salt : source.elementsAndCompounds.elementExamples[0]}
              className="mx-auto w-full max-w-xs"
            >
              {Array.from({ length: 16 }, (_, i) => {
                const alternate = compound && (i + Math.floor(i / 4)) % 2 === 1;
                return (
                  <g key={i}>
                    <circle
                      cx={70 + (i % 4) * 40}
                      cy={20 + Math.floor(i / 4) * 40}
                      r="19"
                      fill={alternate ? "#b45309" : "#0e7490"}
                      stroke={alternate ? "#fcd34d" : "#67e8f9"}
                    />
                    <text
                      x={70 + (i % 4) * 40}
                      y={26 + Math.floor(i / 4) * 40}
                      textAnchor="middle"
                      fontSize="14"
                      fill="white"
                    >
                      {compound ? (alternate ? "Cl" : "Na") : "Fe"}
                    </text>
                  </g>
                );
              })}
            </svg>
            <figcaption>
              <p className="text-sm font-bold text-cyan-100">
                {compound
                  ? `${l.salt}: ${l.sodium} + ${l.chlorine}`
                  : source.elementsAndCompounds.elementExamples[0]}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {compound
                  ? source.elementsAndCompounds.compoundDefinition
                  : source.elementsAndCompounds.elementDefinition}
              </p>
              <p className="mt-2 text-xs leading-6 text-slate-400">
                {(compound
                  ? source.elementsAndCompounds.compoundExamples
                  : source.elementsAndCompounds.elementExamples
                ).join(" · ")}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
