import { useState, type ReactNode } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Arrow, Cue, Diagram, panel, type Lang } from "./Chapter4Pass1Shared";
type Plant = Chapter4Content["plantReproduction"];
const copy = {
  en: {
    structure: "Flower Structure",
    types: "Flower Types",
    bisexual: "Bisexual",
    unisexual: "Unisexual",
    or: "OR",
    pollination: "Pollination",
    comparison: "Self vs Cross-pollination",
    self: "Self-pollination",
    cross: "Cross-pollination",
    same: "Same plant",
    different: "Different plants · same species",
    fertilisation: "Fertilisation in Flowering Plants",
    after: "After Fertilisation",
    advantages: "Advantages of cross-pollination",
  },
  bm: {
    structure: "Struktur Bunga",
    types: "Jenis Bunga",
    bisexual: "Biseksual",
    unisexual: "Uniseksual",
    or: "ATAU",
    pollination: "Pendebungaan",
    comparison: "Pendebungaan Sendiri vs Pendebungaan Kacukan",
    self: "Pendebungaan sendiri",
    cross: "Pendebungaan kacukan",
    same: "Tumbuhan yang sama",
    different: "Tumbuhan berlainan · spesies yang sama",
    fertilisation: "Persenyawaan dalam Tumbuhan Berbunga",
    after: "Selepas Persenyawaan",
    advantages: "Kelebihan pendebungaan kacukan",
  },
};
// Substructure names are extracted from canonical grouped names, not a second anatomy dataset.
function names(source: Plant) {
  return [
    ...source.flowerParts[0].part.split("(")[1].replace(")", "").split(" + "),
    ...source.flowerParts[1].part.split("(")[1].replace(")", "").split(" + "),
    source.flowerParts[2].part,
    source.flowerParts[3].part,
  ];
}
const parents = [0, 0, 1, 1, 1, 1, 2, 3];
export function FlowerGeometry({
  selected = null,
  sex = "both",
  pathway = false,
}: {
  selected?: number | null;
  sex?: "both" | "male" | "female";
  pathway?: boolean;
}) {
  const organ = (i: number, children: ReactNode) => (
    <g
      data-flower-part={i}
      data-highlighted={selected === i}
      opacity={selected === null || selected === i ? 1 : 0.3}
    >
      {children}
    </g>
  );
  return (
    <g data-flower-geometry="shared">
      <path d="M180 269 V319" stroke="#34d399" strokeWidth="9" />
      {organ(
        6,
        <g fill="#9d386b" stroke="#f9a8d4" strokeWidth="2">
          <path d="M168 238 C72 226 37 150 48 72 C109 71 147 139 168 238Z" />
          <path d="M192 238 C288 226 323 150 312 72 C251 71 213 139 192 238Z" />
          <path d="M143 220 Q180 23 218 220" fillOpacity=".25" />
        </g>,
      )}
      {organ(
        7,
        <path
          d="M180 275 Q108 270 97 233 Q153 233 180 261 Q207 233 263 233 Q252 270 180 275Z"
          fill="#065f46"
          stroke="#6ee7b7"
          strokeWidth="3"
        />,
      )}
      {sex !== "female" && (
        <g data-flower-organ="stamen">
          {organ(
            1,
            <path
              d="M151 243 Q108 211 105 140 M209 243 Q252 211 255 140"
              stroke="#f9a8d4"
              strokeWidth="6"
              fill="none"
            />,
          )}
          {organ(
            0,
            <g fill="#fbbf24" stroke="#fde68a" strokeWidth="2">
              <ellipse cx="105" cy="132" rx="22" ry="10" transform="rotate(-25 105 132)" />
              <ellipse cx="255" cy="132" rx="22" ry="10" transform="rotate(25 255 132)" />
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={105 + i * 7} cy={115 - i * 5} r="3" />
              ))}
            </g>,
          )}
        </g>
      )}
      {sex !== "male" && (
        <g data-flower-organ="pistil">
          {organ(
            3,
            <path d="M173 94 V209 H187 V94Z" fill="#be185d" stroke="#f9a8d4" strokeWidth="3" />,
          )}
          {organ(
            4,
            <ellipse
              cx="180"
              cy="236"
              rx="43"
              ry="38"
              fill="#064e3b"
              stroke="#6ee7b7"
              strokeWidth="4"
            />,
          )}
          {organ(
            2,
            <ellipse
              cx="180"
              cy="91"
              rx="24"
              ry="10"
              fill="#f9a8d4"
              stroke="#fce7f3"
              strokeWidth="3"
            />,
          )}
          {organ(
            5,
            <ellipse
              cx="180"
              cy="245"
              rx="13"
              ry="16"
              fill="#fbbf24"
              stroke="#fef3c7"
              strokeWidth="3"
            />,
          )}
        </g>
      )}
      {pathway && (
        <g data-fertilisation-site="ovule">
          <circle cx="180" cy="78" r="7" fill="#67e8f9" />
          <path
            data-pollen-tube="stigma-style-ovary-ovule"
            d="M180 84 V202 Q205 217 189 240"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="6"
          />
          <Arrow d="M181 127 V175" />
          <circle cx="183" cy="224" r="4" fill="#67e8f9" />
          <circle cx="177" cy="246" r="5" fill="#f9a8d4" />
          <circle cx="185" cy="246" r="5" fill="#67e8f9" />
        </g>
      )}
    </g>
  );
}
export function FlowerAnatomy({ source, lang }: { source: Plant; lang: Lang }) {
  const [selected, setSelected] = useState(0);
  const c = copy[lang],
    labels = names(source),
    parent = source.flowerParts[parents[selected]];
  return (
    <section className={panel}>
      <h3 className="font-bold text-fuchsia-200">{c.structure}</h3>
      <div className="mt-4 grid items-center gap-4 md:grid-cols-2">
        <Diagram label={c.structure} kind="flower-anatomy" viewBox="0 0 360 330">
          <FlowerGeometry selected={selected} />
          {[
            [45, 115, 90, 132],
            [30, 190, 122, 188],
            [275, 45, 197, 91],
            [285, 189, 186, 170],
            [300, 275, 215, 245],
            [85, 295, 172, 245],
            [36, 45, 80, 87],
            [285, 313, 224, 260],
          ].map(([x, y, tx, ty], i) => (
            <Cue key={i} x={x} y={y} number={i + 1} to={[tx, ty]} />
          ))}
        </Diagram>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {labels.map((label, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={`min-h-11 rounded-lg border p-2 text-left text-sm capitalize focus-visible:outline focus-visible:outline-cyan-300 ${selected === i ? "border-cyan-300 bg-cyan-300/10" : "border-white/15"}`}
              >
                {i + 1}. {label}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="mt-4 text-sm leading-6">
            <p className="font-bold text-fuchsia-200">{parent.part}</p>
            <p className="mt-1 text-slate-300">{parent.function}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {source.flowerParts.slice(0, 2).map((part) => (
          <p
            key={part.part}
            className="border-l-2 border-fuchsia-300/40 pl-3 text-sm text-slate-300"
          >
            <b className="block text-fuchsia-100">{part.part}</b>
            {part.function}
          </p>
        ))}
      </div>
    </section>
  );
}
function MiniFlower({
  x,
  y,
  sex = "both",
}: {
  x: number;
  y: number;
  sex?: "both" | "male" | "female";
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(.32)`}>
      <FlowerGeometry sex={sex} />
    </g>
  );
}
export function FlowerTypes({ source, lang }: { source: Plant; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-fuchsia-200">{c.types}</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <figure>
          <h4 className="text-sm font-bold text-fuchsia-100">{c.bisexual}</h4>
          <Diagram label={c.bisexual} kind="bisexual-flower" viewBox="0 0 360 190">
            <g transform="translate(80 0) scale(.57)">
              <FlowerGeometry />
            </g>
          </Diagram>
          <figcaption className="text-sm leading-6 text-slate-300">
            {source.flowerTypes.bisexual}
          </figcaption>
        </figure>
        <figure>
          <h4 className="text-sm font-bold text-fuchsia-100">{c.unisexual}</h4>
          <Diagram label={c.unisexual} kind="unisexual-flowers" viewBox="0 0 360 190">
            <g transform="translate(0 0) scale(.5)">
              <FlowerGeometry sex="male" />
            </g>
            <g transform="translate(180 0) scale(.5)">
              <FlowerGeometry sex="female" />
            </g>
            <text x="180" y="182" fill="#fff" textAnchor="middle" fontSize="14">
              {c.or}
            </text>
          </Diagram>
          <figcaption className="text-sm leading-6 text-slate-300">
            {source.flowerTypes.unisexual}
            <p className="mt-2 text-xs text-emerald-200">
              {source.flowerTypes.unisexualExamples.join(" · ")}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
export function PollinationRoute({ source, lang }: { source: Plant; lang: Lang }) {
  const labels = names(source);
  return (
    <figure>
      <Diagram label={copy[lang].pollination} kind="anther-to-stigma" viewBox="0 0 360 140">
        <path d="M56 112 V70" stroke="#f9a8d4" strokeWidth="6" />
        <ellipse cx="56" cy="60" rx="27" ry="13" fill="#fbbf24" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={101 + i * 22} cy={61 - i * 4} r="4" fill="#67e8f9" />
        ))}
        <Arrow d="M183 50 Q237 24 291 53" />
        <path d="M304 69 V111" stroke="#f9a8d4" strokeWidth="8" />
        <ellipse cx="304" cy="61" rx="27" ry="10" fill="#f9a8d4" />
        <text x="56" y="133" fill="#fff" textAnchor="middle" fontSize="14">
          {labels[0]}
        </text>
        <text x="304" y="133" fill="#fff" textAnchor="middle" fontSize="14">
          {labels[2]}
        </text>
      </Diagram>
    </figure>
  );
}
export function AgentDiagram({ index, label }: { index: number; label: string }) {
  return (
    <Diagram label={label} kind={`pollinating-agent-${index}`} viewBox="0 0 360 185">
      {index === 0 ? (
        <>
          <MiniFlower x={0} y={55} />
          <MiniFlower x={242} y={55} />
          <g data-pollen-carrier="insect">
            <ellipse cx="180" cy="68" rx="28" ry="14" fill="#fbbf24" />
            <ellipse cx="169" cy="48" rx="15" ry="19" fill="#bae6fd" fillOpacity=".6" />
            <ellipse cx="193" cy="48" rx="15" ry="19" fill="#bae6fd" fillOpacity=".6" />
            <path
              d="M173 58 V78 M188 58 V78 M163 79 L157 96 M184 81 V100 M200 78 L208 95"
              stroke="#78350f"
              strokeWidth="4"
            />
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={158 + i * 15} cy={95} r="3" fill="#67e8f9" />
            ))}
          </g>
          <Arrow d="M80 91 Q106 54 145 62" />
          <Arrow d="M216 63 Q269 40 298 85" />
        </>
      ) : (
        <>
          <g data-wind-flower="pale-long-filament">
            <path d="M45 157 V52" stroke="#fce7f3" strokeWidth="4" />
            <ellipse cx="45" cy="48" rx="20" ry="9" fill="#fde68a" />
            <path d="M15 142 Q44 158 72 140" stroke="#f8fafc" strokeWidth="8" />
          </g>
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={83 + i * 12} cy={62 + (i % 3) * 13} r="2.5" fill="#67e8f9" />
          ))}
          <Arrow d="M79 42 Q172 10 268 47" />
          <path d="M296 160 V60" stroke="#fce7f3" strokeWidth="5" />
          <g data-furry-stigma="true" stroke="#f9a8d4" strokeWidth="3">
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M296 ${60 + i * 11} l-18 -10 M296 ${60 + i * 11} l18 -10`} />
            ))}
          </g>
        </>
      )}
    </Diagram>
  );
}
export function PollinationComparison({ source, lang }: { source: Plant; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-cyan-200">{c.comparison}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {(["self", "cross"] as const).map((type) => (
          <figure key={type}>
            <h4 className="text-sm font-bold text-cyan-100">{c[type]}</h4>
            <Diagram label={c[type]} kind={`${type}-pollination`} viewBox="0 0 360 230">
              <g data-plant="1">
                <path
                  d={type === "self" ? "M180 220 V153 L67 124 M180 153 L291 124" : "M67 220 V124"}
                  stroke="#34d399"
                  strokeWidth="6"
                />
                <MiniFlower x={10} y={30} />
                {type === "self" && <MiniFlower x={234} y={30} />}
              </g>
              {type === "cross" && (
                <g data-plant="2" data-same-species="true">
                  <path d="M291 220 V124" stroke="#34d399" strokeWidth="6" />
                  <MiniFlower x={234} y={30} />
                </g>
              )}
              <Arrow d="M44 70 Q168 -9 292 57" />
              {type === "self" && <Arrow d="M44 70 Q23 31 67 52" color="#fbbf24" />}
              <text x="180" y="200" textAnchor="middle" fill="#a7f3d0" fontSize="13">
                {type === "self" ? c.same : c.different}
              </text>
            </Diagram>
            <figcaption className="text-sm leading-6 text-slate-300">
              {source.pollinationTypes[type]}
            </figcaption>
          </figure>
        ))}
      </div>
      <h4 className="mt-4 text-sm font-bold text-emerald-200">{c.advantages}</h4>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {source.crossPollinationAdvantages.map((text) => (
          <li
            key={text}
            className="border-l-2 border-emerald-300/30 pl-3 text-sm leading-6 text-slate-300"
          >
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
export function PlantFertilisation({ source, lang }: { source: Plant; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-cyan-200">{c.fertilisation}</h3>
      <div className="mt-4 grid items-center gap-4 md:grid-cols-2">
        <Diagram label={c.fertilisation} kind="flower-fertilisation" viewBox="0 0 360 330">
          <FlowerGeometry pathway />
          {[
            [280, 62, 185, 78],
            [280, 154, 183, 154],
            [290, 221, 195, 217],
            [91, 287, 180, 245],
          ].map(([x, y, tx, ty], i) => (
            <Cue key={i} x={x} y={y} to={[tx, ty]} number={i + 1} />
          ))}
        </Diagram>
        <ol className="space-y-3">
          {source.fertilisationSteps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-slate-300">
              <b className="text-cyan-300">{i + 1}</b>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold text-cyan-200">{c.pollination}</h4>
          <PollinationRoute source={source} lang={lang} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-fuchsia-200">{c.fertilisation}</h4>
          <Diagram
            label={source.fertilisationSteps[3]}
            kind="fusion-inside-ovule"
            viewBox="0 0 360 140"
          >
            <ellipse
              cx="180"
              cy="60"
              rx="62"
              ry="43"
              fill="#064e3b"
              stroke="#fbbf24"
              strokeWidth="3"
            />
            <circle cx="174" cy="60" r="12" fill="#f9a8d4" />
            <circle cx="192" cy="60" r="12" fill="#67e8f9" />
            <text x="180" y="123" textAnchor="middle" fill="#fff" fontSize="14">
              {names(source)[5]}
            </text>
          </Diagram>
          <p className="text-sm text-slate-300">{source.fertilisationSteps[3]}</p>
        </div>
      </div>
      <h4 className="mt-4 font-bold text-emerald-200">{c.after}</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {source.afterFertilisation.map((outcome, i) => (
          <figure key={outcome.source}>
            <Diagram
              label={`${outcome.source} → ${outcome.outcome}`}
              kind={`after-fertilisation-${i}`}
              viewBox="0 0 360 125"
            >
              {i === 0 ? (
                <>
                  <ellipse cx="65" cy="60" rx="18" ry="22" fill="#fbbf24" />
                  <ellipse
                    cx="281"
                    cy="60"
                    rx="28"
                    ry="35"
                    fill="#92400e"
                    stroke="#fde68a"
                    strokeWidth="4"
                  />
                </>
              ) : (
                <>
                  <ellipse
                    cx="65"
                    cy="60"
                    rx="29"
                    ry="32"
                    fill="#064e3b"
                    stroke="#6ee7b7"
                    strokeWidth="3"
                  />
                  <ellipse
                    cx="281"
                    cy="60"
                    rx="46"
                    ry="51"
                    fill="#065f46"
                    stroke="#6ee7b7"
                    strokeWidth="4"
                  />
                  <ellipse cx="281" cy="65" rx="12" ry="17" fill="#fbbf24" />
                </>
              )}
              <Arrow d="M118 60 H215" />
            </Diagram>
            <figcaption className="text-center text-sm font-bold text-emerald-100">
              {outcome.source} → {outcome.outcome}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
export function Chapter4FlowerReproduction({
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
      <FlowerAnatomy source={source} lang={lang} />
      <FlowerTypes source={source} lang={lang} />
      <section className={panel}>
        <h3 className="font-bold text-cyan-200">{c.pollination}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{source.pollinationDefinition}</p>
        <PollinationRoute source={source} lang={lang} />
        <div className="mt-3 grid gap-5 md:grid-cols-2">
          {source.pollinatingAgents.map((agent, i) => (
            <div key={agent.agent}>
              <h4 className="text-sm font-bold text-cyan-100">{agent.agent}</h4>
              <AgentDiagram index={i} label={agent.agent} />
              <p className="text-sm leading-6 text-slate-300">{agent.mechanism}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {agent.flowerCharacteristics.map((text) => (
                  <li key={text}>• {text}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-emerald-200">{agent.examples.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      <PollinationComparison source={source} lang={lang} />
      <PlantFertilisation source={source} lang={lang} />
    </div>
  );
}
