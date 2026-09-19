import { useState, type ReactNode } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Arrow, Cue, Diagram, panel, type Lang } from "./Chapter4Pass1Shared";
type Plant = Chapter4Content["plantReproduction"];
const copy = {
  en: {
    structure: "Seed Structure",
    types: "Monocotyledonous vs Dicotyledonous Seeds",
    mono: "Monocotyledonous",
    di: "Dicotyledonous",
    germination: "Germination",
    epigeal: "Epigeal",
    hypogeal: "Hypogeal",
    conditions: "Conditions for Germination",
    soil: "Soil surface",
    experiment: "Experiment 4.1",
    light: "Not required to start germination",
    scale: "Schematic / not to scale",
  },
  bm: {
    structure: "Struktur Biji Benih",
    types: "Biji Benih Monokotiledon vs Dikotiledon",
    mono: "Monokotiledon",
    di: "Dikotiledon",
    germination: "Percambahan",
    epigeal: "Epigeal",
    hypogeal: "Hipogeal",
    conditions: "Syarat Percambahan",
    soil: "Permukaan tanah",
    experiment: "Eksperimen 4.1",
    light: "Tidak diperlukan untuk memulakan percambahan",
    scale: "Skematik / bukan mengikut skala",
  },
};
export function SeedGeometry({ selected = null }: { selected?: number | null }) {
  const part = (i: number, children: ReactNode) => (
    <g
      data-seed-part={i}
      data-highlighted={selected === i}
      opacity={selected === null || selected === i ? 1 : 0.4}
    >
      {children}
    </g>
  );
  return (
    <g data-seed-geometry="shared-bean-cross-section">
      {part(
        0,
        <path
          d="M125 62 C209 11 296 56 304 142 C314 238 219 290 142 250 C108 233 102 205 124 174 C146 148 89 89 125 62Z"
          fill="#78350f"
          stroke="#fde68a"
          strokeWidth="6"
        />,
      )}
      {part(
        5,
        <path
          d="M148 73 C219 32 284 82 287 149 C292 221 227 266 156 235 C128 223 128 203 145 180 C167 150 119 101 148 73Z"
          fill="#fbbf24"
          stroke="#fef3c7"
          strokeWidth="2"
        />,
      )}
      {part(
        1,
        <ellipse
          cx="112"
          cy="164"
          rx="7"
          ry="16"
          fill="#fce7f3"
          stroke="#9f4268"
          strokeWidth="3"
        />,
      )}
      {part(2, <circle cx="115" cy="207" r="5" fill="#071923" stroke="#67e8f9" strokeWidth="3" />)}
      {part(
        3,
        <g fill="#34d399" stroke="#a7f3d0" strokeWidth="2">
          <path d="M162 169 Q141 119 149 99 Q172 114 162 147 Q176 113 195 107 Q195 135 164 155Z" />
        </g>,
      )}
      {part(
        4,
        <path
          d="M163 160 Q173 184 139 212"
          fill="none"
          stroke="#a7f3d0"
          strokeWidth="9"
          strokeLinecap="round"
        />,
      )}
    </g>
  );
}
export function SeedAnatomy({ source, lang }: { source: Plant; lang: Lang }) {
  const [selected, setSelected] = useState(0),
    c = copy[lang],
    part = source.seedParts[selected];
  return (
    <section className={panel}>
      <h3 className="font-bold text-amber-200">{c.structure}</h3>
      <div className="mt-4 grid items-center gap-4 md:grid-cols-2">
        <Diagram label={c.structure} kind="seed-anatomy" viewBox="0 0 360 300">
          <SeedGeometry selected={selected} />
          {[
            [48, 57, 139, 58],
            [36, 147, 111, 164],
            [37, 237, 115, 207],
            [240, 36, 183, 124],
            [238, 275, 151, 199],
            [319, 223, 244, 178],
          ].map(([x, y, tx, ty], i) => (
            <Cue key={i} x={x} y={y} to={[tx, ty]} number={i + 1} />
          ))}
        </Diagram>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {source.seedParts.map((p, i) => (
              <button
                key={p.part}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={`min-h-11 rounded-lg border p-2 text-left text-sm focus-visible:outline focus-visible:outline-cyan-300 ${selected === i ? "border-amber-300 bg-amber-300/10" : "border-white/15"}`}
              >
                {i + 1}. {p.part}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="mt-4 text-sm leading-6">
            <p className="font-bold text-amber-100">{part.part}</p>
            <p className="mt-1 text-slate-300">{part.function}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function SeedTypes({ source, lang }: { source: Plant; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-amber-200">{c.types}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {(["monocotyledonous", "dicotyledonous"] as const).map((type, i) => (
          <figure key={type}>
            <h4 className="text-sm font-bold text-amber-100">{i === 0 ? c.mono : c.di}</h4>
            <Diagram
              label={source.seedTypes[type]}
              kind={`seed-type-${type}`}
              viewBox="0 0 360 220"
            >
              {i === 0 ? (
                <>
                  <path
                    d="M128 25 Q217 3 253 81 L232 187 Q178 214 123 178 Q97 114 128 25Z"
                    fill="#78350f"
                    stroke="#fde68a"
                    strokeWidth="4"
                  />
                  <path d="M142 37 Q209 17 236 87 L218 170 Q183 190 150 176Z" fill="#fbbf24" />
                  <path
                    data-cotyledon="1"
                    d="M143 74 Q178 125 142 175 Q115 134 143 74Z"
                    fill="#6ee7b7"
                    stroke="#d1fae5"
                    strokeWidth="3"
                  />
                  <text x="142" y="134" textAnchor="middle" fill="#064e3b" fontSize="18">
                    1
                  </text>
                </>
              ) : (
                <>
                  <ellipse
                    cx="180"
                    cy="110"
                    rx="91"
                    ry="93"
                    fill="#78350f"
                    stroke="#fde68a"
                    strokeWidth="4"
                  />
                  {[0, 1].map((j) => (
                    <g key={j} data-cotyledon={j + 1}>
                      <ellipse
                        cx={140 + j * 80}
                        cy="110"
                        rx="37"
                        ry="77"
                        fill="#fbbf24"
                        stroke="#fef3c7"
                        strokeWidth="2"
                      />
                      <text
                        x={140 + j * 80}
                        y="117"
                        textAnchor="middle"
                        fill="#78350f"
                        fontSize="22"
                      >
                        {j + 1}
                      </text>
                    </g>
                  ))}
                </>
              )}
            </Diagram>
            <figcaption className="text-sm text-slate-300">{source.seedTypes[type]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
export function GerminationSequence({
  type,
  label,
  soil,
}: {
  type: "epigeal" | "hypogeal";
  label: string;
  soil: string;
}) {
  return (
    <Diagram label={label} kind={`germination-${type}`} viewBox="0 0 360 265">
      <path d="M5 147 H355 V255 H5Z" fill="#78350f" fillOpacity=".2" />
      <path data-soil-line="147" d="M5 147 H355" stroke="#b45309" strokeWidth="3" />
      {[0, 1, 2].map((stage) => {
        const x = 48 + stage * 124,
          cy = stage === 0 ? 174 : type === "epigeal" ? 125 - stage * 18 : 174;
        return (
          <g
            key={stage}
            data-seedling-stage={stage}
            data-cotyledon-position={stage === 0 ? "below" : type === "epigeal" ? "above" : "below"}
          >
            <path
              d={`M${x} ${cy + 12} Q${x - 12} 207 ${x} ${stage === 0 ? 211 : 244} ${stage === 0 ? "" : `M${x - 3} 218 l-12 9 M${x - 2} 232 l12 8`}`}
              stroke="#a7f3d0"
              strokeWidth="3"
              fill="none"
            />
            {stage > 0 && (
              <>
                <path d={`M${x} 177 V${85 - stage * 15}`} stroke="#34d399" strokeWidth="5" />
                <path
                  d={`M${x} ${96 - stage * 15} q-32 -39 -38 -12 q14 21 38 12 q32 -39 38 -12 q-14 21 -38 12`}
                  fill="#34d399"
                />
              </>
            )}
            <ellipse
              data-cotyledon-y={cy}
              cx={x}
              cy={cy}
              rx="20"
              ry="13"
              fill="#fbbf24"
              stroke="#fde68a"
              strokeWidth="2"
            />
          </g>
        );
      })}
      <Arrow d="M79 189 H135" />
      <Arrow d="M198 189 H258" />
      <text x="180" y="138" textAnchor="middle" fill="#d6d3d1" fontSize="13">
        {soil}
      </text>
    </Diagram>
  );
}
export function GerminationConditions({ source, lang }: { source: Plant; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-emerald-200">{c.conditions}</h3>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm font-bold text-cyan-200">
        {source.germinationConditions.map((condition) => (
          <p key={condition}>{condition}</p>
        ))}
      </div>
      <Diagram
        label={source.germinationConditions.join(" + ")}
        kind="germination-required-inputs"
        viewBox="0 0 360 230"
      >
        <path d="M60 15 Q18 66 60 72 Q102 66 60 15Z" fill="#67e8f9" />
        <path
          d="M147 36 H195 Q221 32 207 19 M147 53 H213 M147 68 H194 Q215 71 204 83"
          stroke="#67e8f9"
          strokeWidth="4"
        />
        <path
          d="M294 19 Q300 7 306 19 V64 A15 15 0 1 1 294 64Z"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="4"
        />
        <path d="M300 37 V81" stroke="#fbbf24" strokeWidth="5" />
        <Arrow d="M65 88 L148 154" />
        <Arrow d="M180 92 V144" />
        <Arrow d="M294 94 L212 154" />
        <ellipse cx="180" cy="181" rx="28" ry="20" fill="#fbbf24" />
        <path
          d="M180 177 V141 Q152 112 154 137 Q163 149 180 141 Q209 113 206 137 Q196 149 180 141 M180 200 Q168 210 178 225"
          stroke="#6ee7b7"
          strokeWidth="4"
          fill="#34d399"
        />
      </Diagram>
      <div className="rounded-xl border border-amber-300/30 bg-amber-300/5 p-3">
        <h4 className="text-sm font-bold text-amber-200">{c.light}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-300">{source.germinationExamTip}</p>
      </div>
    </section>
  );
}
export function ExperimentSetup({ index, label }: { index: number; label: string }) {
  return (
    <Diagram label={label} kind={`germination-experiment-${index}`} viewBox="0 0 180 210">
      <g data-black-paper="cutaway">
        <path
          d="M44 30 V166 Q44 201 90 201 Q136 201 136 166 V30"
          fill="#020617"
          stroke="#64748b"
          strokeWidth="3"
        />
        <path
          d="M58 30 V165 Q58 187 90 187 Q122 187 122 165 V30"
          stroke="#7dd3fc"
          strokeWidth="3"
          fill="none"
        />
      </g>
      {index === 2 ? (
        <g data-air-condition="cooled-boiled-water-oil-layer">
          <path d="M61 68 H119 V164 Q119 184 90 184 Q61 184 61 164Z" fill="#164e63" />
          <path d="M61 68 H119 V80 H61Z" fill="#fbbf24" />
        </g>
      ) : (
        <g data-cotton={index === 1 ? "dry" : "moist"}>
          <path
            d="M61 149 Q72 133 82 145 Q99 131 118 148 V164 Q117 183 90 183 Q63 183 61 164Z"
            fill={index === 1 ? "#cbd5e1" : "#67e8f9"}
            fillOpacity=".65"
          />
        </g>
      )}
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx={74 + i * 16}
          cy={index === 2 ? 174 : 147}
          rx="6"
          ry="4"
          fill="#fbbf24"
        />
      ))}
      {index === 3 && (
        <g data-refrigerator="true" stroke="#67e8f9" strokeWidth="2">
          <path d="M18 15 V203 H161 V15Z M18 51 H44 M136 51 H161 M147 68 V86" fill="none" />
          <path d="M28 70 V90 M21 80 H35 M22 73 L34 87 M22 87 L34 73" />
        </g>
      )}
    </Diagram>
  );
}
export function GerminationExperiment({ source, lang }: { source: Plant; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-emerald-200">{c.experiment}</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {source.germinationExperiment.map((setup, i) => (
          <figure key={setup.label} data-experiment-setup={setup.label}>
            <h4 className="text-center text-sm font-bold text-cyan-200">
              {setup.label} · {setup.temperature}
            </h4>
            <ExperimentSetup index={i} label={`${setup.label}: ${setup.medium}; ${setup.cover}`} />
            <figcaption className="text-center text-xs leading-5 text-slate-300">
              {setup.medium}
              <span className="block text-slate-400">{setup.cover}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-400">{c.scale}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {source.germinationConditionDetails.map((detail, i) => (
          <div
            key={detail.condition}
            data-condition-reason={i}
            className="border-t border-emerald-300/30 pt-3"
          >
            <h4 className="text-sm font-bold text-emerald-200">
              {detail.condition}{" "}
              <span className="text-xs text-cyan-300">{["A ↔ B", "A ↔ C", "A ↔ D"][i]}</span>
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-300">{detail.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Chapter4SeedReproduction({
  content,
  lang,
}: {
  content: Chapter4Content;
  lang: Lang;
}) {
  const source = content.plantReproduction,
    c = copy[lang];
  return (
    <div className="space-y-4">
      <SeedAnatomy source={source} lang={lang} />
      <SeedTypes source={source} lang={lang} />
      <section className={panel}>
        <h3 className="font-bold text-emerald-200">{c.germination}</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {(["epigeal", "hypogeal"] as const).map((type) => (
            <figure key={type}>
              <h4 className="text-sm font-bold text-emerald-100">{c[type]}</h4>
              <GerminationSequence type={type} label={c[type]} soil={c.soil} />
              <figcaption className="text-sm leading-6 text-slate-300">
                {source.germinationTypes[type]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <GerminationConditions source={source} lang={lang} />
      <GerminationExperiment source={source} lang={lang} />
    </div>
  );
}
