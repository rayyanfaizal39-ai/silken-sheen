import { useState, type ReactNode } from "react";
import type { Chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";

type Source = Chapter5Content["matterInNature"];
const sky = "#7dd3fc";
const green = "#6ee7b7";
const amber = "#fbbf24";

function Diagram({
  name,
  description,
  children,
  viewBox = "0 0 320 230",
}: {
  name: string;
  description: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      data-diagram={name}
      viewBox={viewBox}
      role="img"
      aria-label={description}
      className="mx-auto w-full max-w-sm"
    >
      <desc>{description}</desc>
      {children}
    </svg>
  );
}

function Arrow({ d, color = sky }: { d: string; color?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Beaker({
  x = 90,
  y = 45,
  fill = "#38bdf8",
  level = 65,
}: {
  x?: number;
  y?: number;
  fill?: string;
  level?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M5 ${level} H105 V125 Q105 135 95 135 H15 Q5 135 5 125 Z`}
        fill={fill}
        opacity=".45"
      />
      <path
        d="M0 0 H5 V125 Q5 135 15 135 H95 Q105 135 105 125 V8 L115 0"
        fill="none"
        stroke={sky}
        strokeWidth="3"
      />
      {[30, 55, 80, 105].map((y) => (
        <path key={y} d={`M85 ${y} h16`} stroke={sky} strokeWidth="2" />
      ))}
    </g>
  );
}

function Sample({ index, x = 0, y = 0 }: { index: number; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} data-sample-shape={index}>
      {index === 0 ? (
        <>
          <path d="M0 45 L18 32 L38 39 L58 25 L80 40 L96 45 V70 H0 Z" fill="#a88963" />
          {[10, 30, 50, 70, 85].map((x) => (
            <circle key={x} cx={x} cy="56" r="2" fill="#5b4635" />
          ))}
        </>
      ) : index === 1 ? (
        <path d="M0 35 Q25 29 48 35 T96 35 V70 H0 Z" fill="#38bdf8" opacity=".8" />
      ) : (
        [12, 38, 68].map((x, i) => (
          <g key={x} transform={`translate(${x} ${(i % 2) * 8})`}>
            <path d="M0 67 Q-8 49 5 23" stroke="#f1f5f9" strokeWidth="5" fill="none" />
            <ellipse cx="9" cy="20" rx="13" ry="7" fill={green} transform="rotate(-25 9 20)" />
          </g>
        ))
      )}
    </g>
  );
}

function LeverBalance({ sample }: { sample: number }) {
  return (
    <g data-apparatus="lever-balance">
      <path d="M80 205 H275 L250 180 H115 Z" fill="#334155" stroke={sky} strokeWidth="2" />
      <path d="M180 178 V95" stroke="#94a3b8" strokeWidth="12" />
      <path d="M73 172 A65 65 0 0 1 203 172" stroke={sky} strokeWidth="3" fill="#0f2535" />
      <path d="M138 169 L178 133" stroke={amber} strokeWidth="4" />
      <circle cx="138" cy="169" r="5" fill={amber} />
      <path
        d="M86 143 L94 149 M105 116 L109 126 M140 108 V120 M175 118 L170 127"
        stroke={sky}
        strokeWidth="2"
      />
      <path d="M70 95 H272 M180 95 L260 65" stroke="#94a3b8" strokeWidth="5" />
      <g transform="translate(35 -20) scale(.68)">
        <Beaker fill="transparent" />
        <Sample index={sample} x={99} y={103} />
      </g>
      <path d="M82 96 H165" stroke={green} strokeWidth="4" />
    </g>
  );
}

export function MatterEvidenceVisuals({ source }: { source: Source }) {
  const [sample, setSample] = useState(0);
  const l = source.labels;
  const activity = source.evidenceActivities[0];
  const balloon = source.evidenceActivities[1];
  return (
    <div className="space-y-10">
      <div
        data-visual="matter-definition"
        className="rounded-2xl border border-sky-300/20 bg-sky-400/[.06] p-4 sm:p-6"
      >
        <p className="text-center text-xl font-black text-white">{l.matter}</p>
        <svg viewBox="0 0 320 45" aria-hidden="true" className="mx-auto h-12 w-full max-w-sm">
          <Arrow d="M160 2 V18 H65 V40 m-7 -8 7 8 7 -8 M160 18 H255 V40 m-7 -8 7 8 7 -8" />
        </svg>
        <div className="grid grid-cols-2 gap-3 text-center font-bold text-emerald-200">
          <p>{l.mass}</p>
          <p>{l.space}</p>
        </div>
        <p className="mt-5 leading-7 text-slate-200">{source.definition}</p>
        <div className="mt-5 grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
          <div>
            <h3 className="font-bold text-emerald-200">{l.matter}</h3>
            <p className="mt-2 text-sm leading-6">{source.matterExamples.join(" · ")}</p>
          </div>
          <div>
            <h3 className="font-bold text-rose-200">{l.nonMatter}</h3>
            <p className="mt-2 text-sm leading-6">{source.nonMatterExamples.join(" · ")}</p>
          </div>
        </div>
      </div>
      <figure data-visual="activity-5-1" className="space-y-4">
        <h3 className="text-lg font-black text-white">{activity.title}</h3>
        <div role="group" aria-label={l.sample} className="flex flex-wrap gap-2">
          {source.evidenceSamples.map((name, i) => (
            <button
              key={name}
              type="button"
              aria-pressed={i === sample}
              onClick={() => setSample(i)}
              className={`min-h-11 rounded-full border px-4 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${i === sample ? "border-sky-300 bg-sky-300/15 text-sky-100" : "border-white/15 text-slate-300"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white/[.035] p-3 text-center">
            <p className="text-sm text-sky-200">
              {source.evidenceSamples[sample]} → {l.container}
            </p>
            <Diagram
              name="sample-space"
              description={`${source.evidenceSamples[sample]}: ${l.space}`}
            >
              <Beaker fill="transparent" />
              <Sample index={sample} x={99} y={103} />
              <Arrow d="M225 70 V176 m-6 -9 6 9 6 -9 M225 70 l-6 9 M225 70 l6 9" color={green} />
            </Diagram>
            <p className="font-bold text-emerald-200">{l.space}</p>
          </div>
          <div className="rounded-xl bg-white/[.035] p-3 text-center">
            <p className="text-sm text-sky-200">
              {source.evidenceSamples[sample]} → {l.balance}
            </p>
            <Diagram
              name="sample-mass"
              description={`${source.evidenceSamples[sample]}: ${l.mass}`}
            >
              <LeverBalance sample={sample} />
            </Diagram>
            <p className="font-bold text-emerald-200">{l.mass}</p>
          </div>
        </div>
        <figcaption>
          <p className="text-sm leading-6 text-slate-300">{activity.method}</p>
          <p className="mt-3 border-l-2 border-emerald-300 pl-3 text-sm leading-6 text-emerald-100">
            <b>{l.conclusion}: </b>
            {activity.conclusion}
          </p>
        </figcaption>
      </figure>
      <figure data-visual="balloon-balance" className="space-y-4">
        <h3 className="text-lg font-black text-white">{balloon.title}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[false, true].map((after) => (
            <div key={String(after)} className="rounded-xl bg-white/[.035] p-3 text-center">
              <p className="font-bold text-sky-200">{after ? l.after : l.before}</p>
              <Diagram
                name={after ? "balloon-after" : "balloon-before"}
                description={`${after ? l.after : l.before}: ${balloon.method}`}
              >
                <path d="M160 15 V75" stroke="#cbd5e1" strokeWidth="2" />
                <path
                  data-balance-state={after ? "tilted" : "balanced"}
                  d={after ? "M70 100 L250 50" : "M70 75 H250"}
                  stroke="#c6a27e"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <circle cx="160" cy="75" r="5" fill={amber} />
                <path
                  d={after ? "M75 100 V136 M245 52 V90" : "M75 75 V111 M245 75 V111"}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <ellipse
                  data-balloon="inflated"
                  cx="75"
                  cy={after ? 171 : 146}
                  rx="30"
                  ry="35"
                  fill="#38bdf8"
                  opacity=".8"
                />
                <path
                  d={after ? "M70 138 L75 130 L80 138" : "M70 113 L75 105 L80 113"}
                  fill={sky}
                />
                {after ? (
                  <g data-air="escaping">
                    <path d="M245 89 Q261 97 247 114 Q230 112 236 97 Z" fill="#fb7185" />
                    <rect x="251" y="97" width="7" height="8" rx="2" fill="#e2e8f0" />
                    <path d="M285 83 L254 101" stroke="#f8fafc" strokeWidth="2" />
                    <circle cx="285" cy="83" r="4" fill="none" stroke="#f8fafc" />
                    <path
                      d="M261 96 Q279 66 267 47 M269 103 Q305 85 293 57 M260 111 Q280 116 299 105"
                      stroke={sky}
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                  </g>
                ) : (
                  <g>
                    <ellipse
                      data-balloon="inflated"
                      cx="245"
                      cy="146"
                      rx="30"
                      ry="35"
                      fill="#fb7185"
                      opacity=".8"
                    />
                    <path d="M240 113 L245 105 L250 113" fill="#fda4af" />
                    <rect x="262" y="143" width="12" height="13" rx="2" fill="#e2e8f0" />
                  </g>
                )}
              </Diagram>
              <p className="font-bold text-emerald-200">{after ? l.mass : l.space}</p>
            </div>
          ))}
        </div>
        <figcaption>
          <p className="text-sm leading-6 text-slate-300">{balloon.method}</p>
          <p className="mt-3 border-l-2 border-emerald-300 pl-3 text-sm leading-6 text-emerald-100">
            <b>{l.conclusion}: </b>
            {balloon.conclusion}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

function PropertySymbol({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 80 60" aria-hidden="true" className="h-12 w-16 shrink-0">
      {index < 2 ? (
        <>
          <path d="M34 8 V37 A11 11 0 1 0 46 37 V8 Z" fill="none" stroke={amber} strokeWidth="3" />
          <path d="M40 19 V45" stroke={amber} strokeWidth="4" />
          <circle cx="40" cy="47" r="5" fill={amber} />
          <path d="M52 14 h10 M52 24 h7 M52 34 h10" stroke={amber} />
        </>
      ) : index === 2 ? (
        <>
          <path
            d="M18 20 V49 H62 V20"
            fill="#38bdf8"
            fillOpacity=".2"
            stroke={sky}
            strokeWidth="2"
          />
          <path d="M21 34 H59" stroke={sky} />
          <rect x="35" y="6" width="9" height="9" fill="white" />
        </>
      ) : index === 3 ? (
        <>
          <path d="M12 25 H57 V41 Q34 60 12 41 Z" fill="#64748b" stroke={sky} strokeWidth="2" />
          <path d="M57 28 H76" stroke="#c4a484" strokeWidth="7" />
          <path d="M20 18 V5 M32 18 V5 M44 18 V5" stroke={amber} strokeWidth="2" />
        </>
      ) : index === 4 ? (
        <>
          <path d="M14 14 H39 V20 H31 V52 H22 V20 H14 Z" fill="#94a3b8" />
          <path d="M43 28 H68 V34 H60 V56 H51 V34 H43 Z" fill="#bd734a" />
          <circle cx="54" cy="41" r="3" fill="#783f29" />
        </>
      ) : (
        <path
          d="M40 4 Q65 28 56 48 Q40 67 24 47 Q14 35 29 20 Q30 37 36 33 Q45 22 40 4 Z"
          fill="#fb7185"
        />
      )}
    </svg>
  );
}

function DensityComparison({ source, index }: { source: Source; index: number }) {
  const row = source.densityClassification[index];
  const l = source.labels;
  return (
    <figure className="border-t border-white/10 pt-4" data-density-comparison={index}>
      <figcaption className="font-bold text-white">{row.substance}</figcaption>
      <Diagram
        name={`density-${index}`}
        description={`${row.higherDensity}: ${l.higher}; ${row.lowerDensity}: ${l.lower}`}
        viewBox="0 0 320 200"
      >
        {index === 0 ? (
          <g data-density-mode="comparison-only">
            <g transform="translate(-55 -10) scale(.85)">
              <Beaker fill="#a78bfa" />
            </g>
            <g transform="translate(125 -10) scale(.85)">
              <Beaker />
            </g>
            <path d="M145 83 L170 97 L145 111" stroke={green} strokeWidth="3" fill="none" />
          </g>
        ) : (
          <g data-density-mode={index === 1 ? "liquid-layers" : index === 2 ? "sink" : "float"}>
            <Beaker y={20} fill={index === 3 ? "#fbbf24" : "#38bdf8"} level={60} />
            {index === 1 ? (
              <>
                <path d="M95 110 H195 V145 Q195 155 185 155 H105 Q95 155 95 145 Z" fill="#94a3b8" />
                <path d="M95 110 H195" stroke="white" strokeOpacity=".5" />
              </>
            ) : index === 2 ? (
              <g>
                <path
                  d="M95 131 L117 124 L141 128 L165 120 L195 132 V145 Q195 155 185 155 H105 Q95 155 95 145 Z"
                  fill="#b99b75"
                />
                {[109, 130, 151, 174].map((x) => (
                  <circle key={x} cx={x} cy="141" r="2" fill="#73563d" />
                ))}
              </g>
            ) : (
              <rect
                x="116"
                y="65"
                width="59"
                height="26"
                rx="5"
                fill="#c6a27e"
                stroke="#e2c9a7"
                strokeWidth="2"
              />
            )}
            <path
              d={index === 3 ? "M177 77 H252 M201 144 H252" : "M201 91 H252 M201 144 H252"}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <circle cx="267" cy={index === 3 ? 77 : 90} r="13" fill="#12384b" />
            <text x="267" y={index === 3 ? 82 : 95} textAnchor="middle" fill={sky} fontSize="14">
              1
            </text>
            <circle cx="267" cy="144" r="13" fill="#12384b" />
            <text x="267" y="149" textAnchor="middle" fill={sky} fontSize="14">
              2
            </text>
          </g>
        )}
      </Diagram>
      <div className="grid grid-cols-2 gap-3 text-sm leading-6">
        <p>
          <b className="text-sky-200">
            {index === 0 ? "" : "2 · "}
            {row.higherDensity}
          </b>
          <br />
          {l.higher}
        </p>
        <p>
          <b className="text-sky-200">
            {index === 0 ? "" : "1 · "}
            {row.lowerDensity}
          </b>
          <br />
          {l.lower}
        </p>
      </div>
    </figure>
  );
}

export function MatterPropertiesVisuals({ source }: { source: Source }) {
  const l = source.labels;
  return (
    <div className="space-y-10">
      <div data-visual="property-comparison" className="grid gap-6 lg:grid-cols-2">
        {(["physical", "chemical"] as const).map((type) => (
          <section
            key={type}
            className={`border-t-2 pt-4 ${type === "physical" ? "border-sky-300" : "border-rose-300"}`}
          >
            <h3
              className={`text-xl font-black ${type === "physical" ? "text-sky-200" : "text-rose-200"}`}
            >
              {l[type]}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {source.propertyDefinitions[type]}
            </p>
            <div className="mt-3 divide-y divide-white/10">
              {source[type === "physical" ? "physicalProperties" : "chemicalProperties"].map(
                (p, i) => (
                  <div key={p.label} className="flex items-start gap-3 py-4">
                    <PropertySymbol index={type === "physical" ? i : i + 4} />
                    <div>
                      <h4 className="font-bold text-white">{p.label}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{p.detail}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-black text-white">{l.classify}</h3>
        <nav aria-label={l.classify} className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {source.classificationCharacteristics.map((name, i) => (
            <a
              key={name}
              data-classification-tool={i}
              href={`#chapter5-${["density", "melting", "boiling", "solubility"][i]}`}
              className="flex min-h-16 items-center justify-between gap-2 rounded-lg border border-sky-300/20 bg-sky-300/[.06] p-3 text-sm font-bold text-sky-100 hover:bg-sky-300/15 focus-visible:outline focus-visible:outline-sky-300"
            >
              {name}
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      </div>
      <section id="chapter5-density" className="scroll-mt-24">
        <h3 className="text-xl font-black text-white">{l.density}</h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {source.densityClassification.map((row, i) => (
            <DensityComparison key={row.substance} source={source} index={i} />
          ))}
        </div>
      </section>
      <section data-visual="temperature-table">
        <h3 className="text-xl font-black text-amber-200">{l.points}</h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-amber-300/20">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{l.points}</caption>
            <thead className="bg-amber-300/[.08] text-amber-100">
              <tr>
                <th scope="col" className="p-3">
                  {l.substance}
                </th>
                <th scope="col" id="chapter5-melting" className="scroll-mt-24 p-3">
                  {source.classificationCharacteristics[1]}
                </th>
                <th scope="col" id="chapter5-boiling" className="scroll-mt-24 p-3">
                  {source.classificationCharacteristics[2]}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {source.meltingBoilingPoints.map((row) => (
                <tr key={row.substance}>
                  <th scope="row" className="p-3 font-semibold text-white">
                    {row.substance}
                  </th>
                  <td className="p-3 font-mono text-amber-200">{row.meltingPoint}</td>
                  <td className="p-3 font-mono text-amber-200">{row.boilingPoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <figure id="chapter5-solubility" data-visual="solubility" className="scroll-mt-24">
        <h3 className="text-xl font-black text-white">{l.solubility}</h3>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          <div className="text-center">
            <Diagram name="solute" description={`${l.sugar}: ${l.solute}`} viewBox="0 0 180 160">
              <path d="M60 111 L158 42" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
              <ellipse
                cx="54"
                cy="114"
                rx="33"
                ry="17"
                fill="#cbd5e1"
                transform="rotate(-20 54 114)"
              />
              {[35, 50, 65].map((x, i) => (
                <rect
                  key={x}
                  x={x}
                  y={89 - (i % 2) * 8}
                  width="14"
                  height="14"
                  rx="2"
                  fill="white"
                />
              ))}
            </Diagram>
            <p className="font-bold text-sky-200">{l.solute}</p>
            <p className="text-sm">{l.sugar}</p>
          </div>
          <span className="text-center text-2xl text-sky-300" aria-hidden="true">
            +
          </span>
          <div className="text-center">
            <Diagram name="solvent" description={`${l.coffee}: ${l.solvent}`} viewBox="0 0 180 160">
              <Beaker x={35} y={10} fill="#a87548" level={50} />
            </Diagram>
            <p className="font-bold text-sky-200">{l.solvent}</p>
            <p className="text-sm">{l.coffee}</p>
          </div>
          <span className="text-center text-2xl text-emerald-300" aria-hidden="true">
            →
          </span>
          <div className="text-center">
            <Diagram name="solution" description={l.solution} viewBox="0 0 180 160">
              <Beaker x={35} y={10} fill="#a87548" level={50} />
              <path d="M117 14 L67 118" stroke="#cbd5e1" strokeWidth="4" />
              <path d="M74 153 l8 7 15 -17" stroke={green} strokeWidth="3" fill="none" />
            </Diagram>
            <p className="font-bold text-emerald-200">{l.solution}</p>
          </div>
        </div>
        <figcaption className="mt-5 text-sm leading-7 text-slate-300">
          {source.solubilityDefinition}
        </figcaption>
      </figure>
    </div>
  );
}

export function Chapter5MatterInNature({ source, heading }: { source: Source; heading: string }) {
  return (
    <section id="chapter5-51" data-official-subtopic="5.1" className="scroll-mt-24 space-y-10">
      <h2 className="text-2xl font-black text-white sm:text-3xl">{heading}</h2>
      <MatterEvidenceVisuals source={source} />
      <MatterPropertiesVisuals source={source} />
    </section>
  );
}
