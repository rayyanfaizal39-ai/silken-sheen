import { useState } from "react";
import type {
  CombustionSection,
  FireCondition,
} from "@/content/form1/science/chapter-7/bab7-content";

const panel = "rounded-2xl border border-orange-200/15 bg-slate-950/45 p-4 sm:p-6";
const title = "text-xl font-bold text-white sm:text-2xl";
const buttonStyle = (active: boolean) =>
  `min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-amber-200 ${active ? "border-amber-300 bg-amber-300/15 text-amber-100" : "border-white/15 text-slate-200 hover:bg-white/5"}`;

function Flame({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} data-flame>
      <path
        d="M0 -36 Q31 -6 20 14 Q0 33 -19 14 Q-28 2 -9 -15 Q-9 1 0 5 Q10 -12 0 -36Z"
        fill="#fb923c"
      />
      <path d="M0 -6 Q15 9 5 19 Q-13 22 -8 7Z" fill="#fde68a" />
    </g>
  );
}

export function FireTriangle({
  source,
  removed,
}: {
  source: CombustionSection;
  removed: FireCondition | null;
}) {
  const paths = { heat: "M150 35 L35 232", oxygen: "M150 35 L265 232", fuel: "M35 232 H265" };
  return (
    <figure data-fire-triangle data-removed={removed ?? "none"} className="mx-auto w-full max-w-sm">
      <div className="relative aspect-[1/1]">
        <svg
          viewBox="0 0 300 300"
          role="img"
          aria-label={source.lesson.triangleTitle}
          className="h-full w-full"
        >
          {(Object.keys(paths) as FireCondition[]).map((condition, i) => (
            <path
              key={condition}
              data-triangle-side={condition}
              data-present={removed !== condition}
              d={paths[condition]}
              stroke={["#fb923c", "#67e8f9", "#a78bfa"][i]}
              strokeWidth="9"
              strokeLinecap="round"
              opacity={removed === condition ? 0 : 1}
            />
          ))}
          {removed === null ? (
            <Flame x={150} y={165} size={1.5} />
          ) : (
            <g data-extinguished stroke="#94a3b8" strokeWidth="4" fill="none">
              <path d="M124 186 H176 M140 177 Q124 161 140 148 M161 177 Q149 155 164 136" />
              <path d="M124 195 L179 128" stroke="#fda4af" />
            </g>
          )}
        </svg>
        {(Object.keys(paths) as FireCondition[]).map((condition, i) => (
          <span
            key={condition}
            className={`absolute -translate-x-1/2 rounded-md bg-[#091326] px-2 py-1 text-sm font-bold ${removed === condition ? "text-slate-400 line-through" : "text-white"}`}
            style={{ left: [22, 78, 50][i] + "%", top: [38, 38, 78][i] + "%" }}
          >
            {source.triangle[condition]}
          </span>
        ))}
      </div>
      <figcaption className="text-center text-sm leading-6 text-orange-100">
        {removed === null ? source.lesson.required : source.lesson.stopped}
      </figcaption>
    </figure>
  );
}

function Material({ id, x = 0, y = 0 }: { id: string; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} data-material={id}>
      {id === "glass" ? (
        <rect
          x="-35"
          y="-6"
          width="70"
          height="12"
          rx="5"
          fill="#bae6fd"
          fillOpacity=".4"
          stroke="#e0f2fe"
          strokeWidth="2"
        />
      ) : id === "wood" ? (
        <>
          <path d="M-36 -9 L34 -12 L38 9 L-33 11Z" fill="#92400e" stroke="#fcd34d" />
          <path d="M-26 -3 L22 -5 M-12 4 H28" stroke="#d97706" />
        </>
      ) : id === "candle" ? (
        <>
          <rect x="-27" y="-8" width="55" height="16" rx="3" fill="#fef3c7" />
          <path d="M28 0 H36" stroke="#cbd5e1" strokeWidth="3" />
        </>
      ) : (
        <path
          d="M-24 7 L-31 -3 L-10 -17 L17 -14 L30 3 L19 17 L-12 18 Z"
          fill="#64748b"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
      )}
    </g>
  );
}

function Igniter({ matches }: { matches: boolean }) {
  return (
    <g data-apparatus="igniter" transform="translate(445 235)">
      {matches ? (
        <>
          <rect width="42" height="28" rx="3" fill="#9a3412" stroke="#fed7aa" />
          <path d="M0 -10 L30 -22" stroke="#fde68a" strokeWidth="4" />
          <circle cx="30" cy="-22" r="4" fill="#f87171" />
        </>
      ) : (
        <>
          <rect width="25" height="44" rx="4" fill="#1d4ed8" stroke="#bfdbfe" />
          <path d="M3 0 V-8 H24 V0" stroke="#cbd5e1" strokeWidth="5" />
        </>
      )}
    </g>
  );
}

export function CombustionApparatus({
  source,
  condition,
  material,
  after,
}: {
  source: CombustionSection;
  condition: FireCondition;
  material: number;
  after: boolean;
}) {
  const selected = source.lesson.fuelMaterials[material];
  const investigation = source.lesson.investigations.find((i) => i.id === condition)!;
  return (
    <svg
      viewBox="0 0 520 310"
      role="img"
      aria-label={investigation.heading}
      data-investigation-svg={condition}
      data-state={after ? "observation" : "setup"}
      className="w-full"
    >
      {condition === "fuel" ? (
        <>
          <path
            data-apparatus="bunsen-burner"
            d="M174 282 H280 L270 268 H246 V211 H214 V268 H185 Z"
            fill="#475569"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
          <path d="M253 273 Q325 294 378 276" stroke="#7dd3fc" strokeWidth="7" fill="none" />
          <Flame x={230} y={182} size={1.2} />
          <path
            data-apparatus="tongs"
            d="M81 85 L229 127 M81 85 L230 147 M230 127 L258 135 M230 147 L258 142"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="5"
          />
          <Material id={selected.id} x={267} y={138} />
          {after && selected.isFuel && (
            <g data-material-burning>
              <Flame x={292} y={111} size={0.65} />
            </g>
          )}
          <Igniter matches={false} />
          {source.lesson.fuelMaterials.map((item, i) => (
            <Material key={item.id} id={item.id} x={85 + i * 112} y={35} />
          ))}
        </>
      ) : condition === "oxygen" ? (
        <>
          {[150, 355].map((x, i) => (
            <g key={x} data-candle={i === 0 ? "X" : "Y"}>
              <path
                data-apparatus="white-tile"
                d={`M${x - 64} 268 H${x + 65} L${x + 75} 282 H${x - 74}Z`}
                fill="#f8fafc"
                stroke="#94a3b8"
              />
              <path
                data-apparatus="plasticine"
                d={`M${x - 26} 267 Q${x - 16} 249 ${x} 259 Q${x + 14} 249 ${x + 26} 267Z`}
                fill="#a78bfa"
              />
              <rect
                data-apparatus="same-sized-candle"
                x={x - 9}
                y="177"
                width="18"
                height="82"
                rx="2"
                fill="#fef3c7"
              />
              <path d={`M${x} 177 V164`} stroke="#cbd5e1" strokeWidth="3" />
              {(!after || i === 1) && <Flame x={x} y={150} size={0.65} />}
              <text x={x} y="306" textAnchor="middle" fill="#f8fafc" fontSize="18">
                {i === 0 ? "X" : "Y"}
              </text>
            </g>
          ))}
          <path
            data-apparatus="inverted-gas-jar"
            d="M95 268 V52 H205 V268"
            fill="#7dd3fc"
            fillOpacity=".06"
            stroke="#e0f2fe"
            strokeWidth="3"
          />
        </>
      ) : (
        <>
          <g data-apparatus="refrigerator">
            <rect
              x="45"
              y="20"
              width="140"
              height="150"
              rx="8"
              fill="#164e63"
              stroke="#bae6fd"
              strokeWidth="3"
            />
            <path d="M45 77 H185 M162 42 V62 M162 98 V132" stroke="#bae6fd" strokeWidth="4" />
            <path d="M80 41 V63 M70 47 L90 57 M70 57 L90 47" stroke="#e0f2fe" strokeWidth="2" />
          </g>
          <path
            d="M113 183 V212 L106 201 M113 212 L120 201"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="3"
          />
          {[115, 365].map((x, i) => (
            <g key={x} data-match={i === 0 ? "P" : "Q"}>
              <path d={`M${x - 27} 240 L${x + 29} 215`} stroke="#fde68a" strokeWidth="7" />
              <circle cx={x + 29} cy="215" r="8" fill="#fb7185" />
              <text x={x} y="283" textAnchor="middle" fill="#f8fafc" fontSize="20">
                {i === 0 ? "P" : "Q"}
              </text>
              {after && (
                <text data-observation-unknown x={x + 41} y="198" fontSize="32" fill="#fbbf24">
                  ?
                </text>
              )}
            </g>
          ))}
          <g data-apparatus="matchbox">
            <rect
              x="220"
              y="108"
              width="84"
              height="50"
              rx="4"
              fill="#9a3412"
              stroke="#fed7aa"
              strokeWidth="2"
            />
            <path d="M230 140 H294" stroke="#fed7aa" strokeWidth="7" strokeDasharray="2 2" />
          </g>
          <path
            d="M159 231 L228 162 M316 228 L282 167"
            stroke="#94a3b8"
            strokeDasharray="5 5"
            fill="none"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

export function CombustionInvestigations({ source }: { source: CombustionSection }) {
  const [condition, setCondition] = useState<FireCondition>("fuel");
  const [material, setMaterial] = useState(0);
  const [after, setAfter] = useState(false);
  const l = source.lesson,
    item = l.investigations.find((i) => i.id === condition)!;
  return (
    <section className={panel} data-activity="7.3">
      <h3 className={title}>{l.activityTitle}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{l.aim}</p>
      <div className="mt-4 grid grid-cols-3 gap-2" data-condition-selector>
        {l.investigations.map((i) => (
          <button
            type="button"
            key={i.id}
            onClick={() => {
              setCondition(i.id);
              setAfter(false);
            }}
            aria-pressed={condition === i.id}
            className={buttonStyle(condition === i.id)}
          >
            {source.triangle[i.id]}
          </button>
        ))}
      </div>
      <h4 className="mt-5 font-semibold text-orange-100">{item.heading}</h4>
      <div className="mt-3 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <CombustionApparatus
            source={source}
            condition={condition}
            material={material}
            after={after}
          />
          {condition === "fuel" && (
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4" data-fuel-selector>
              {l.fuelMaterials.map((m, i) => (
                <button
                  type="button"
                  key={m.id}
                  className={buttonStyle(material === i)}
                  aria-pressed={material === i}
                  onClick={() => setMaterial(i)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
          {condition === "heat" && (
            <div className="grid grid-cols-2 gap-4 text-sm text-sky-100">
              <p>{l.labels.coldMatch}</p>
              <p>{l.labels.ordinaryMatch}</p>
              <p className="col-span-2 text-center text-slate-300">{l.labels.matchbox}</p>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2" data-observation-controls>
            {[false, true].map((state) => (
              <button
                key={String(state)}
                type="button"
                className={buttonStyle(after === state)}
                aria-pressed={after === state}
                onClick={() => setAfter(state)}
              >
                {state ? (condition === "heat" ? l.labels.test : l.labels.after) : l.labels.before}
              </button>
            ))}
          </div>
          <div
            role="status"
            className="mt-4 border-l-2 border-amber-300 pl-3 text-sm leading-6"
            data-observation-question={item.observationIsQuestion}
          >
            <strong className="text-amber-200">{l.labels.observation}</strong>
            <p>{item.observation}</p>
            {condition === "fuel" && (
              <p data-fuel-classification className="mt-2 text-orange-100">
                {l.fuelMaterials[material].label} →{" "}
                {l.fuelMaterials[material].isFuel ? l.fuel : l.nonFuel}
              </p>
            )}
          </div>
        </div>
        <div className="text-sm leading-6">
          <h5 className="font-bold text-sky-200">{l.labels.apparatus}</h5>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-slate-300">
            {item.apparatus.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
          <h5 className="mt-4 font-bold text-sky-200">{l.labels.setup}</h5>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-slate-300">
            {item.procedure.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          <p className="mt-4 border-t border-white/10 pt-3 text-orange-100">
            <strong>{l.labels.conclusion}: </strong>
            {item.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}

function ExtinguisherSymbol({ category }: { category: number }) {
  return (
    <svg
      viewBox="0 0 400 150"
      aria-hidden="true"
      data-extinguisher-category={category}
      className="mx-auto w-full max-w-sm"
    >
      <g strokeWidth="3" stroke="#cbd5e1" fill="#475569">
        {category === 0 ? (
          <>
            <path d="M35 90 L116 70 L128 96 L48 116Z" fill="#92400e" />
            <path d="M47 50 L105 43 L109 68 L49 75Z" fill="#f8fafc" />
          </>
        ) : category === 1 ? (
          <>
            <path d="M45 58 H110 L102 112 H53Z" fill="#fbbf24" />
            <path d="M48 58 Q75 43 108 58" fill="none" />
          </>
        ) : category === 2 ? (
          <>
            <rect x="55" y="45" width="54" height="77" rx="14" fill="#0e7490" />
            <path d="M71 45 V27 H92 V45 M67 26 H97" />
          </>
        ) : (
          <>
            <path d="M40 67 L62 45 L90 52 L97 84 L67 103Z" />
            <path d="M94 105 L103 73 L130 85 L139 117Z" />
          </>
        )}
      </g>
      <path d="M166 83 H243 L231 75 M243 83 L231 91" fill="none" stroke="#67e8f9" strokeWidth="4" />
      <g data-extinguisher stroke="#fecaca" strokeWidth="3">
        <rect x="282" y="51" width="56" height="81" rx="14" fill="#b91c1c" />
        <path d="M310 51 V29 H340 M306 29 H290 M329 42 Q369 48 354 96" fill="none" />
        <rect x="294" y="71" width="32" height="35" fill="#f8fafc" />
      </g>
    </svg>
  );
}

export function OilFireDiagram({ source }: { source: CombustionSection }) {
  return (
    <figure data-oil-fire className="grid gap-4 sm:grid-cols-2">
      {[false, true].map((foam) => (
        <div key={String(foam)}>
          <svg
            viewBox="0 0 260 190"
            role="img"
            aria-label={source.lesson.oilLabels[foam ? 2 : 1]}
            className="mx-auto w-full max-w-xs"
          >
            <path
              d="M40 85 H215 L202 162 H53Z"
              fill={foam ? "#fbbf24" : "#713f12"}
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            <path data-layer="oil" d="M41 86 H214 L208 118 H47Z" fill="#fbbf24" />
            {foam ? (
              <>
                <path
                  data-layer="foam"
                  d="M37 86 Q40 66 55 71 Q72 53 84 70 Q100 56 115 69 Q129 55 145 70 Q160 54 176 70 Q195 57 211 76 L218 86Z"
                  fill="#f8fafc"
                />
              </>
            ) : (
              <>
                <path data-layer="water-below-oil" d="M47 119 H208 L201 160 H54Z" fill="#38bdf8" />
                <Flame x={135} y={64} size={0.8} />
                <path
                  data-water-sinks
                  d="M71 30 V144 L64 132 M71 144 L78 132"
                  stroke="#bae6fd"
                  strokeWidth="3"
                  strokeDasharray="4 3"
                  fill="none"
                />
              </>
            )}
            <path d="M212 102 H248" stroke="#cbd5e1" strokeWidth="7" />
          </svg>
          <div className="flex flex-col items-center gap-1 text-sm text-slate-200">
            {(foam ? [2, 0] : [0, 1]).map((index) => (
              <p key={index} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: ["#fbbf24", "#38bdf8", "#f8fafc"][index] }}
                />
                {source.lesson.oilLabels[index]}
              </p>
            ))}
          </div>
        </div>
      ))}
    </figure>
  );
}

function FireBlanket({ source }: { source: CombustionSection }) {
  const [covered, setCovered] = useState(false),
    l = source.lesson;
  return (
    <section data-fire-blanket className="border-l-2 border-cyan-300 pl-4">
      <h4 className="font-bold text-sky-200">{l.blanketTitle}</h4>
      <div className="mt-3 grid items-center gap-4 sm:grid-cols-[200px_1fr]">
        <div>
          <svg viewBox="0 0 260 170" role="img" aria-label={l.blanketTitle} className="w-full">
            <path d="M65 128 H195 L179 148 H82Z" fill="#64748b" stroke="#cbd5e1" strokeWidth="3" />
            {covered ? (
              <path
                data-blanket-cover
                d="M49 139 Q51 84 130 87 Q208 85 212 139 L178 126 L155 146 L125 129 L95 145 L71 129Z"
                fill="#a5f3fc"
                stroke="#22d3ee"
                strokeWidth="3"
              />
            ) : (
              <Flame x={130} y={100} size={1.2} />
            )}
            <path d="M40 56 L82 81 M220 56 L178 81" stroke="#67e8f9" strokeWidth="3" fill="none" />
            {covered ? (
              <path
                d="M70 64 L88 83 M88 64 L70 83 M170 64 L188 83 M188 64 L170 83"
                stroke="#fda4af"
                strokeWidth="3"
              />
            ) : (
              <path
                d="M82 81 L71 77 M82 81 L78 68 M178 81 L188 77 M178 81 L182 68"
                stroke="#67e8f9"
                strokeWidth="3"
              />
            )}
            <text x="130" y="45" textAnchor="middle" fill="#67e8f9" fontSize="18">
              O₂
            </text>
          </svg>
          <button
            type="button"
            onClick={() => setCovered(!covered)}
            aria-pressed={covered}
            className={buttonStyle(covered)}
          >
            {covered ? l.labels.before : l.blanketTitle}
          </button>
        </div>
        <div>
          <ol className="flex flex-wrap gap-2 text-sm text-cyan-100">
            {l.blanketSteps.map((step, i) => (
              <li key={step}>
                {i > 0 ? "→ " : ""}
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm leading-6 text-slate-300">{l.blanket}</p>
        </div>
      </div>
    </section>
  );
}

export function Chapter7Combustion({ source }: { source: CombustionSection }) {
  const [removed, setRemoved] = useState<FireCondition | null>(null),
    [category, setCategory] = useState(0),
    [method, setMethod] = useState(0);
  const l = source.lesson,
    row = source.extinguisherTable[category];
  const answers = [
    source.definition,
    l.required,
    l.blanket,
    source.safetyChecklist.slice(0, 4).join("; "),
    l.paraffinAnswer,
  ];
  return (
    <div data-combustion-lesson className="space-y-8">
      <p data-combustion-definition className="max-w-3xl text-base leading-7 text-slate-200">
        {source.definition}
      </p>
      <section className={panel}>
        <h3 className={title}>{l.triangleTitle}</h3>
        <div className="grid items-center gap-5 md:grid-cols-2">
          <FireTriangle source={source} removed={removed} />
          <div className="space-y-3" data-triangle-controls>
            {(Object.keys(source.triangle) as FireCondition[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={removed === c}
                onClick={() => setRemoved(c)}
                className={`block w-full text-left ${buttonStyle(removed === c)}`}
              >
                {l.remove} → {source.triangle[c]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setRemoved(null)}
              className={buttonStyle(removed === null)}
            >
              {l.reset}
            </button>
          </div>
        </div>
      </section>
      <CombustionInvestigations source={source} />
      <section data-extinguisher-choice>
        <h3 className={title}>{l.extinguisherTitle}</h3>
        <p className="mt-3 text-sm font-semibold text-sky-200">{l.tableHeaders[0]} ↓</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" data-extinguisher-selector>
          {source.extinguisherTable.map((r, i) => (
            <button
              key={r.material}
              type="button"
              onClick={() => setCategory(i)}
              aria-pressed={category === i}
              className={buttonStyle(category === i)}
            >
              {r.material}
            </button>
          ))}
        </div>
        <ExtinguisherSymbol category={category} />
        <div
          role="status"
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl bg-sky-300/5 p-3 text-sm"
        >
          <p>
            {row.material}
            <span className="block text-slate-300">{row.examples}</span>
          </p>
          <span className="text-xl text-cyan-300">→</span>
          <p className="font-semibold text-cyan-100">{row.extinguishers.join(" / ")}</p>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm" data-extinguisher-table>
            <caption className="mb-3 text-left text-sm font-semibold text-slate-300">
              {l.tableTitle}
            </caption>
            <thead className="bg-white/5">
              <tr>
                {l.tableHeaders.map((h) => (
                  <th key={h} scope="col" className="p-3 text-sky-200">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {source.extinguisherTable.map((r) => (
                <tr key={r.material} className="border-b border-white/10">
                  <th scope="row" className="p-3">
                    {r.material}
                  </th>
                  <td className="p-3 text-slate-300">{r.examples}</td>
                  <td className="p-3 text-cyan-100">{r.extinguishers.join(" / ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={panel}>
        <h3 className={title}>{l.oilTitle}</h3>
        <OilFireDiagram source={source} />
        <p data-oil-warning className="mt-3 text-sm leading-6 text-amber-100">
          {l.oilWarning}
        </p>
      </section>
      <section data-extinguishing-methods className={panel}>
        <h3 className={title}>{l.methodsTitle}</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-3" data-method-selector>
          {source.methods.map((m, i) => (
            <button
              type="button"
              key={m.removes}
              onClick={() => setMethod(i)}
              aria-pressed={method === i}
              className={buttonStyle(method === i)}
            >
              {m.heading}
            </button>
          ))}
        </div>
        <div className="mt-3 grid items-center gap-5 md:grid-cols-[minmax(220px,320px)_1fr]">
          <FireTriangle source={source} removed={source.methods[method].removes} />
          <div role="status" className="text-sm leading-6">
            <p className="font-bold text-orange-100">
              {source.methods[method].heading} → {l.remove}{" "}
              {source.triangle[source.methods[method].removes]}
            </p>
            <p className="mt-3 text-slate-300">{source.methods[method].body}</p>
          </div>
        </div>
        <div className="mt-6">
          <FireBlanket source={source} />
        </div>
      </section>
      <section data-fire-prevention>
        <h3 className={title}>{l.preventionTitle}</h3>
        <ol className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {source.safetyChecklist.map((measure, i) => (
            <li
              key={measure}
              className="flex gap-3 border-b border-white/10 py-3 text-sm leading-6 text-slate-200"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-300/40 text-emerald-200">
                {i + 1}
              </span>
              {measure}
            </li>
          ))}
        </ol>
      </section>
      <section
        data-activity="7.4"
        data-activity-kind="poster"
        className="border-l-2 border-emerald-300 pl-4"
      >
        <h3 className={title}>{l.poster.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{l.poster.aim}</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
          {l.poster.instructions.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      </section>
      <section data-practice="7.2" className={panel}>
        <h3 className={title}>{l.practiceTitle}</h3>
        <div className="mt-3 divide-y divide-white/10">
          {l.questions.map((q, i) => (
            <details key={q} className="py-3">
              <summary className="cursor-pointer py-2 text-sm font-semibold text-white">
                {i + 1}. {q}
              </summary>
              <p className="mt-2 text-sm leading-6 text-slate-300">{answers[i]}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
