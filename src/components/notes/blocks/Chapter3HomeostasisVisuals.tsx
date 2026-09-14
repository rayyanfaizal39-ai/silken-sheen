import { useId, type ReactNode } from "react";
import type {
  Chapter3Content,
  Chapter3Practical,
} from "@/content/form1/science/chapter-3/chapter3-content";

type Lang = "bm" | "en";
const copy = {
  en: {
    normal: "Normal range restored",
    increase: "Internal condition increases",
    decrease: "Internal condition decreases",
    detection: "Control centre detects change",
    correction: "Corrective mechanism",
    down: "Condition decreases",
    up: "Condition increases",
    high: "High body water",
    low: "Low body water",
    brain: "Brain",
    kidneys: "Kidneys",
    hormone: "Hormone",
    moreUrine: "More urine",
    lessUrine: "Less urine + thirst",
    hotExercise: "Hot / exercise",
    moreSweat: "Sweating increases",
    waterFalls: "Water content decreases",
    urineFalls: "Urine amount decreases",
    hot: "Hot surroundings",
    cold: "Cold surroundings",
    hairFlat: "Hairs lie flat",
    hairErect: "Hairs stand erect",
    sweatGland: "Sweat gland",
    air: "Trapped air layer",
    heatMore: "Increased heat loss",
    heatLess: "Reduced heat loss",
    normalTemp: "Normal body temperature: 37°C",
    problem: "Problem statement",
    hypothesis: "Hypothesis",
    purpose: "Purpose",
    manipulated: "Manipulated variable",
    responding: "Responding variable",
    fixed: "Fixed variable",
    apparatus: "Materials and apparatus",
    procedure: "Procedure",
    results: "Results",
    conclusion: "Conclusion",
    surrounding: "Surrounding condition",
    sweat: "Presence of sweat",
    fanOff: "Fan OFF",
    fanOn: "Fan ON",
    minutes: "minutes",
    minute: "minute",
    pulse: "Pulse count",
    student: "Student name",
    group: "Group number",
  },
  bm: {
    normal: "Julat normal dipulihkan",
    increase: "Keadaan dalaman meningkat",
    decrease: "Keadaan dalaman menurun",
    detection: "Pusat kawalan mengesan perubahan",
    correction: "Mekanisme pembetulan",
    down: "Keadaan menurun",
    up: "Keadaan meningkat",
    high: "Kandungan air tinggi",
    low: "Kandungan air rendah",
    brain: "Otak",
    kidneys: "Ginjal",
    hormone: "Hormon",
    moreUrine: "Lebih banyak air kencing",
    lessUrine: "Kurang air kencing + dahaga",
    hotExercise: "Panas / aktiviti fizikal",
    moreSweat: "Peluh bertambah",
    waterFalls: "Kandungan air menurun",
    urineFalls: "Air kencing berkurang",
    hot: "Suhu persekitaran tinggi",
    cold: "Suhu persekitaran rendah",
    hairFlat: "Bulu roma condong",
    hairErect: "Bulu roma menegak",
    sweatGland: "Kelenjar peluh",
    air: "Lapisan udara terperangkap",
    heatMore: "Haba mudah dibebaskan",
    heatLess: "Pembebasan haba berkurang",
    normalTemp: "Suhu normal (37°C)",
    problem: "Pernyataan masalah",
    hypothesis: "Hipotesis",
    purpose: "Tujuan",
    manipulated: "Pemboleh ubah dimanipulasikan",
    responding: "Pemboleh ubah bergerak balas",
    fixed: "Pemboleh ubah dimalarkan",
    apparatus: "Bahan dan radas",
    procedure: "Prosedur",
    results: "Keputusan",
    conclusion: "Kesimpulan",
    surrounding: "Suhu persekitaran",
    sweat: "Kehadiran peluh",
    fanOff: "Kipas tidak dipasang",
    fanOn: "Kipas dipasang",
    minutes: "minit",
    minute: "minit",
    pulse: "Kiraan nadi",
    student: "Nama murid",
    group: "Nombor kumpulan",
  },
} as const;
const panel = "min-w-0 rounded-2xl border border-white/15 bg-[#071923] p-4 sm:p-5";

function Diagram({
  label,
  viewBox = "0 0 380 320",
  children,
  ...data
}: {
  label: string;
  viewBox?: string;
  children: ReactNode;
  "data-homeostasis-diagram"?: string;
  "data-skin-condition"?: string;
  "data-fan-condition"?: string;
  "data-activity"?: string;
}) {
  return (
    <svg
      {...data}
      role="img"
      aria-label={label}
      viewBox={viewBox}
      fontFamily="Arial, sans-serif"
      className="mx-auto my-3 block w-full max-w-lg"
    >
      {children}
    </svg>
  );
}
function Arrow({ d, color = "#67e8f9" }: { d: string; color?: string }) {
  const id = useId();
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7" fill={color} />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={color} strokeWidth="3" markerEnd={`url(#${id})`} />
    </g>
  );
}
function Label({
  x,
  y,
  text,
  width = 22,
  size = 16,
  color = "#e2e8f0",
}: {
  x: number;
  y: number;
  text: string;
  width?: number;
  size?: number;
  color?: string;
}) {
  const lines: string[] = [];
  for (const word of text.split(" ")) {
    const last = lines.length - 1;
    if (last < 0 || lines[last].length + word.length + 1 > width) lines.push(word);
    else lines[last] += ` ${word}`;
  }
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight="600" textAnchor="middle">
      {Array.from({ length: Math.max(3, lines.length) }, (_, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size + 3}>
          {lines[i] ?? ""}
        </tspan>
      ))}
    </text>
  );
}
function Brain({ x, y }: { x: number; y: number }) {
  return (
    <g data-brain="true" transform={`translate(${x} ${y})`}>
      <path
        d="M-37 16 C-52 -2 -41 -31 -20 -30 C-18 -44 9 -43 16 -29 C41 -32 54 -9 39 9 C44 30 15 41 3 28 C-12 42 -34 36 -37 16Z"
        fill="#fdba74"
        stroke="#ffedd5"
        strokeWidth="2"
      />
      <path
        d="M0 -32 V29 M-27 -17 Q-3 -17 -18 0 Q-39 7 -18 21 M24 -18 Q2 -11 23 1 Q41 13 17 23"
        fill="none"
        stroke="#9a3412"
        strokeWidth="3"
      />
    </g>
  );
}
function Kidneys({ x, y }: { x: number; y: number }) {
  return (
    <g
      data-kidneys="true"
      transform={`translate(${x} ${y})`}
      fill="#fda4af"
      stroke="#ffe4e6"
      strokeWidth="2"
    >
      <path d="M-22 -31 C-65 -41 -70 27 -35 32 C-15 31 -6 10 -28 4 C-44 -2 -15 -15 -22 -31Z" />
      <path d="M22 -31 C65 -41 70 27 35 32 C15 31 6 10 28 4 C44 -2 15 -15 22 -31Z" />
    </g>
  );
}

export function HomeostaticControlVisual({
  content,
  lang,
}: {
  content: Chapter3Content;
  lang: Lang;
}) {
  const c = copy[lang];
  return (
    <section className={panel} data-homeostatic-control="true">
      <h3 className="text-lg font-black text-white">{content.structure.control}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {(["increase", "decrease"] as const).map((direction) => {
          const rising = direction === "increase";
          const tone = rising ? "#fbbf24" : "#7dd3fc";
          const nodes = [
            { x: 24, y: 38, text: rising ? c.increase : c.decrease },
            { x: 210, y: 38, text: c.detection },
            { x: 210, y: 170, text: c.correction },
            { x: 24, y: 170, text: rising ? c.down : c.up },
          ];
          return (
            <figure key={direction} className="rounded-xl border border-white/10 p-2">
              <Diagram
                label={`${rising ? c.increase : c.decrease} → ${c.detection} → ${c.correction} → ${rising ? c.down : c.up} → ${c.normal}`}
                data-homeostasis-diagram={`control-${direction}`}
              >
                <Arrow d="M65 290 H14 V67 H24" color={tone} />
                <Arrow d="M170 67 H210" color={tone} />
                <Arrow d="M283 96 V170" color={tone} />
                <Arrow d="M210 199 H170" color={tone} />
                <Arrow d="M97 228 V250 H190 V270" color="#6ee7b7" />
                {nodes.map((node) => (
                  <g key={node.text}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width="146"
                      height="58"
                      rx="12"
                      fill="#164e63"
                      stroke={tone}
                    />
                    <Label x={node.x + 73} y={node.y + 20} text={node.text} width={18} size={14} />
                  </g>
                ))}
                <rect
                  data-normal-range="true"
                  x="65"
                  y="270"
                  width="250"
                  height="40"
                  rx="12"
                  fill="#065f46"
                  stroke="#6ee7b7"
                />
                <Label x={190} y={296} text={c.normal} width={32} />
              </Diagram>
            </figure>
          );
        })}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{content.controlProcessConcept}</p>
    </section>
  );
}

export function WaterRegulationVisual({ content, lang }: { content: Chapter3Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className="space-y-4" data-water-regulation="true">
      <h3 className="text-2xl font-black text-white">{content.structure.water}</h3>
      <p className="text-sm text-slate-300">
        {content.waterRegulation.systemsInvolved} · {content.waterRegulation.organsInvolved}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {(["increase", "decrease"] as const).map((direction) => {
          const high = direction === "increase";
          const mechanism = content.waterRegulation[direction];
          return (
            <figure key={direction} className={panel}>
              <h3 className="font-black text-cyan-100">{mechanism.trigger}</h3>
              <Diagram
                label={`${high ? c.high : c.low} → ${c.brain} → ${c.hormone} → ${c.kidneys} → ${high ? c.moreUrine : c.lessUrine} → ${mechanism.result}`}
                viewBox="0 0 380 390"
                data-homeostasis-diagram={`water-${direction}`}
              >
                <Arrow d="M62 350 H15 V60 H45" />
                <Arrow d="M139 60 H220" />
                <Arrow d="M270 109 V165" />
                <Arrow d="M218 204 H132" />
                <Arrow d="M89 292 V324" color="#6ee7b7" />
                <g data-water-level={high ? "high" : "low"}>
                  <path d="M45 25 V92 H139 V25" fill="#164e63" stroke="#bae6fd" strokeWidth="3" />
                  <rect
                    x="48"
                    y={high ? 43 : 73}
                    width="88"
                    height={high ? 47 : 17}
                    fill="#38bdf8"
                    fillOpacity=".5"
                  />
                  <Label x={93} y={115} text={high ? c.high : c.low} width={18} size={14} />
                </g>
                <Brain x={270} y={59} />
                <Label x={270} y={115} text={c.brain} />
                <Label x={326} y={147} text={c.hormone} size={14} />
                <Kidneys x={270} y={204} />
                <Label x={270} y={254} text={c.kidneys} />
                <g data-urine-production={high ? "more" : "less"}>
                  <path
                    d="M52 165 L62 231 H116 L126 165Z"
                    fill="#713f12"
                    fillOpacity=".3"
                    stroke="#fde68a"
                    strokeWidth="2"
                  />
                  <path
                    d={high ? "M59 184 H120 L113 229 H65Z" : "M65 216 H115 L113 229 H65Z"}
                    fill="#fbbf24"
                    fillOpacity=".7"
                  />
                  <Label
                    x={89}
                    y={254}
                    text={high ? c.moreUrine : c.lessUrine}
                    width={17}
                    size={14}
                  />
                </g>
                <rect
                  x="62"
                  y="324"
                  width="285"
                  height="52"
                  rx="12"
                  fill="#065f46"
                  stroke="#6ee7b7"
                />
                <Label x={204} y={346} text={mechanism.result} width={30} size={14} />
              </Diagram>
              <figcaption>
                <ul className="space-y-2 text-sm leading-6 text-slate-300">
                  {mechanism.mechanism.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div
        data-sweat-urine-process="true"
        className={`${panel} flex flex-wrap items-center justify-center gap-3 text-center text-sm font-bold`}
      >
        {[c.hotExercise, c.moreSweat, c.waterFalls, c.urineFalls].map((text, i) => (
          <span key={text} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="text-cyan-300">
                →
              </span>
            )}
            <span>{text}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function SkinThermoregulationDiagram({
  content,
  lang,
  condition,
}: {
  content: Chapter3Content;
  lang: Lang;
  condition: "hotCondition" | "coldCondition";
}) {
  const c = copy[lang];
  const hot = condition === "hotCondition";
  return (
    <Diagram
      label={`${hot ? c.hot : c.cold}: ${hot ? c.hairFlat : c.hairErect}; ${hot ? c.heatMore : c.heatLess}`}
      data-skin-condition={hot ? "hot" : "cold"}
      viewBox="0 0 380 330"
    >
      <rect
        data-skin-layer="true"
        x="25"
        y="110"
        width="330"
        height="155"
        fill="#a8755d"
        stroke="#edc9b7"
        strokeWidth="2"
      />
      <path d="M25 123 H355" stroke="#f0b294" strokeWidth="10" />
      {!hot && (
        <g data-trapped-air="true">
          <rect
            x="46"
            y="75"
            width="129"
            height="32"
            rx="8"
            fill="#7dd3fc"
            fillOpacity=".18"
            stroke="#7dd3fc"
            strokeDasharray="5 4"
          />
          <Label x={258} y={70} text={c.air} width={18} size={14} />
        </g>
      )}
      <path
        d="M116 113 V241 Q97 248 99 224 V147 Q99 120 116 113Z"
        fill="#5b392c"
        stroke="#e5c0a7"
        strokeWidth="2"
      />
      <path
        data-body-hair={hot ? "leaning" : "erect"}
        d={hot ? "M116 124 Q127 94 174 92" : "M116 124 V43"}
        fill="none"
        stroke="#fef3c7"
        strokeWidth="5"
      />
      <Label x={123} y={23} text={hot ? c.hairFlat : c.hairErect} width={26} size={14} />
      <g
        data-sweat-gland={hot ? "active" : "reduced"}
        fill="none"
        stroke={hot ? "#fde68a" : "#e2c391"}
        strokeWidth="4"
      >
        <path d="M234 110 V179 Q250 187 232 196 Q214 205 234 211 Q253 221 230 225 Q214 229 221 215 Q225 198 241 207 Q253 216 234 232" />
        <path d="M245 225 L277 228" stroke="#cbd5e1" strokeWidth="1.5" />
      </g>
      <Label x={301} y={219} text={c.sweatGland} width={12} size={13} />
      {hot && (
        <g data-sweat-at-surface="true" fill="#7dd3fc">
          <path d="M234 77 Q220 93 234 99 Q248 93 234 77Z" />
          <path d="M263 57 Q251 71 263 77 Q275 71 263 57Z" />
        </g>
      )}
      <g data-blood-vessel={hot ? "dilated-near-skin" : "constricted-deeper"} fill="none">
        <path
          d={hot ? "M38 150 C110 130 195 161 342 145" : "M38 242 C110 228 195 253 342 239"}
          stroke="#fb7185"
          strokeWidth={hot ? 15 : 4}
        />
        <path
          d={hot ? "M38 172 C110 156 195 181 342 167" : "M38 255 C110 242 195 264 342 252"}
          stroke="#60a5fa"
          strokeWidth={hot ? 11 : 3}
        />
      </g>
      <g data-heat-loss={hot ? "increased" : "reduced"}>
        {hot ? (
          <>
            <Arrow d="M50 99 V48" color="#fb923c" />
            <Arrow d="M190 94 V37" color="#fb923c" />
            <Arrow d="M326 93 V32" color="#fb923c" />
          </>
        ) : (
          <Arrow d="M329 94 V74" color="#94a3b8" />
        )}
      </g>
      <Label
        x={190}
        y={290}
        text={content.temperatureRegulation[condition].mechanism[0]}
        width={35}
        size={14}
      />
      <Label x={190} y={317} text={hot ? c.heatMore : c.heatLess} width={35} size={14} />
    </Diagram>
  );
}

export function TemperatureRegulationVisual({
  content,
  lang,
}: {
  content: Chapter3Content;
  lang: Lang;
}) {
  const c = copy[lang];
  return (
    <section data-temperature-regulation="true" className="space-y-4">
      <h3 className="text-2xl font-black text-white">{content.structure.temperature}</h3>
      <p className="rounded-xl border border-emerald-300/25 bg-emerald-300/10 p-4 text-center text-lg font-bold text-emerald-100">
        {c.normalTemp}
      </p>
      <p className="text-sm text-slate-300">
        {content.temperatureRegulation.systemsInvolved} ·{" "}
        {content.temperatureRegulation.organsInvolved}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {(["hotCondition", "coldCondition"] as const).map((condition, index) => {
          const mechanism = content.temperatureRegulation[condition];
          return (
            <figure key={condition} className={panel}>
              <h3
                className={`text-lg font-black ${index === 0 ? "text-amber-200" : "text-cyan-200"}`}
              >
                {index === 0 ? c.hot : c.cold}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {mechanism.trigger} · {mechanism.detectedBy}
              </p>
              <SkinThermoregulationDiagram content={content} lang={lang} condition={condition} />
              <figcaption className="space-y-4">
                <ul className="space-y-2 text-sm leading-6 text-slate-200">
                  {mechanism.mechanism.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
                <p className="rounded-xl bg-emerald-300/10 p-3 text-sm font-bold text-emerald-100">
                  {mechanism.result} → 37°C
                </p>
                <ul className="space-y-2 text-xs leading-5 text-slate-300">
                  {content.temperatureRegulation.skinMechanisms[index].mechanisms.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function PracticalIntroduction({
  experiment,
  notice,
  lang,
}: {
  experiment: Chapter3Practical;
  notice: string;
  lang: Lang;
}) {
  const c = copy[lang];
  return (
    <>
      <h3 className="text-2xl font-black text-white">{experiment.title}</h3>
      <p className="mt-3 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
        {notice}
      </p>
      <dl className="my-4 grid gap-3 text-sm sm:grid-cols-2">
        {[
          [c.problem, experiment.problem],
          [c.hypothesis, experiment.hypothesis],
          [c.purpose, experiment.purpose],
          [c.manipulated, experiment.variables.manipulated],
          [c.responding, experiment.variables.responding],
          [c.fixed, experiment.variables.fixed],
          [c.apparatus, experiment.apparatus],
        ].map(([label, text]) => (
          <div key={label}>
            <dt className="font-bold text-cyan-200">{label}</dt>
            <dd className="mt-1 leading-6 text-slate-300">{text}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
function Procedure({ steps, lang }: { steps: string[]; lang: Lang }) {
  return (
    <div>
      <h3 className="mb-3 font-bold text-cyan-200">{copy[lang].procedure}</h3>
      <ol className="grid gap-3 sm:grid-cols-2">
        {steps.map((text, i) => (
          <li
            key={i}
            className="rounded-xl border border-white/10 p-3 text-sm leading-6 text-slate-300"
          >
            <span className="mr-2 font-bold text-amber-200">{i + 1}.</span>
            {text}
          </li>
        ))}
      </ol>
    </div>
  );
}
function FanSetup({ lang, on }: { lang: Lang; on: boolean }) {
  const c = copy[lang];
  return (
    <Diagram
      label={`${on ? c.fanOn : c.fanOff}: 10 ${c.minutes}`}
      data-fan-condition={on ? "on" : "off"}
      viewBox="0 0 360 230"
    >
      <path d="M89 142 V199 M53 202 H126" fill="none" stroke="#94a3b8" strokeWidth="9" />
      <circle cx="89" cy="85" r="54" fill="#164e63" stroke="#cbd5e1" strokeWidth="3" />
      <g fill="#67e8f9">
        {[0, 120, 240].map((angle) => (
          <path
            key={angle}
            transform={`rotate(${angle} 89 85)`}
            d="M89 85 C53 80 60 37 84 45 Q97 50 89 85Z"
          />
        ))}
      </g>
      <circle cx="89" cy="85" r="9" fill="#e2e8f0" />
      <circle cx="89" cy="175" r="6" fill={on ? "#34d399" : "#fb7185"} />
      {on && (
        <g data-fan-airflow="true" stroke="#7dd3fc" strokeWidth="3" fill="none">
          <path d="M151 69 H209 Q229 69 229 55 M151 86 H224 M151 102 H209 Q229 102 229 118" />
        </g>
      )}
      <g data-student="true" stroke="#e2e8f0" strokeWidth="6" fill="none">
        <circle cx="284" cy="77" r="20" fill="#1e3a5f" />
        <path d="M284 98 V160 M284 114 L254 141 M284 114 L313 141 M284 160 L261 199 M284 160 L309 199" />
      </g>
      <g data-stopwatch="true">
        <circle cx="267" cy="24" r="18" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
        <path d="M267 24 V12 M267 24 L276 28 M267 5 V1" stroke="#fbbf24" strokeWidth="3" />
      </g>
      <Label x={180} y={228} text={`10 ${c.minutes}`} />
    </Diagram>
  );
}

export function SweatingExperimentVisual({
  content,
  lang,
}: {
  content: Chapter3Content;
  lang: Lang;
}) {
  const c = copy[lang];
  const experiment = content.sweatExperiment;
  return (
    <section data-experiment="3.1" className={panel}>
      <PracticalIntroduction experiment={experiment} notice={content.practicalNotice} lang={lang} />
      <div className="mb-5 grid gap-4 md:grid-cols-2">
        {experiment.conditions.map((condition, i) => (
          <figure key={condition} className="rounded-xl border border-white/10 p-3">
            <h3 className="text-center font-bold text-white">{condition}</h3>
            <FanSetup lang={lang} on={i === 1} />
          </figure>
        ))}
      </div>
      <Procedure steps={experiment.sequence} lang={lang} />
      <h3 className="mb-3 mt-5 font-bold text-cyan-200">{c.results}</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th className="border border-white/15 p-3">{c.surrounding}</th>
            <th className="border border-white/15 p-3">{c.sweat}</th>
          </tr>
        </thead>
        <tbody>
          {experiment.conditions.map((condition) => (
            <tr key={condition}>
              <th scope="row" className="border border-white/15 p-3 font-medium">
                {condition}
              </th>
              <td className="border border-white/15 p-3">
                <input
                  type="text"
                  aria-label={`${condition}: ${c.sweat}`}
                  className="min-h-11 w-full rounded-lg border border-white/20 bg-slate-950/40 px-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm leading-6 text-emerald-200">
        {c.conclusion}: {experiment.conclusion}
      </p>
    </section>
  );
}

function ActivityDiagram({ id, label }: { id: "rest" | "walking" | "jogging"; label: string }) {
  return (
    <Diagram label={label} data-activity={id} viewBox="0 0 180 150">
      <circle cx="87" cy="30" r="14" fill="#1e3a5f" stroke="#bae6fd" strokeWidth="3" />
      <g fill="none" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round">
        {id === "rest" ? (
          <>
            <path d="M87 46 V87 H117 V126 M87 59 L65 82 M87 59 L109 82" />
            <path d="M54 81 V100 H92 V128" stroke="#94a3b8" />
          </>
        ) : id === "walking" ? (
          <path d="M87 46 V88 M87 60 L65 76 M87 60 L110 76 M87 88 L61 124 M87 88 L110 125" />
        ) : (
          <path d="M87 46 L76 85 M83 60 L105 76 L122 60 M83 60 L62 52 L49 70 M76 85 L101 97 L113 123 M76 85 L52 110 L32 103" />
        )}
      </g>
    </Diagram>
  );
}
export function WristPulseDiagram({ content, lang }: { content: Chapter3Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <Diagram
      label={content.pulseExperiment.sequence[1]}
      data-homeostasis-diagram="wrist-pulse"
      viewBox="0 0 380 200"
    >
      <path
        d="M25 112 H155 C173 112 180 80 201 77 L286 64 Q309 61 314 73 Q316 84 299 91 L246 102 L325 101 Q342 103 340 115 Q338 124 319 125 L248 125 L313 132 Q329 134 327 146 Q325 154 307 151 L239 144 L284 157 Q299 162 293 173 Q289 181 273 174 L216 155 C192 162 173 151 156 151 H25Z"
        fill="#b87b61"
        stroke="#f4c5ac"
        strokeWidth="3"
      />
      <g data-two-fingers="true" stroke="#fed7aa" strokeWidth="13" strokeLinecap="round">
        <path d="M204 23 L195 111" />
        <path d="M224 29 L214 111" />
      </g>
      <circle
        data-pulse-point="true"
        cx="204"
        cy="112"
        r="15"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="3"
      />
      <Label
        x={190}
        y={197}
        text={`${c.pulse}: ${content.pulseExperiment.countDurationMinutes} ${c.minute}`}
        width={40}
      />
    </Diagram>
  );
}

export function PulseExperimentVisual({ content, lang }: { content: Chapter3Content; lang: Lang }) {
  const c = copy[lang];
  const experiment = content.pulseExperiment;
  return (
    <section data-experiment="3.2" className={panel}>
      <PracticalIntroduction experiment={experiment} notice={content.practicalNotice} lang={lang} />
      <div data-activity-sequence="true" className="my-4 grid grid-cols-3 gap-2">
        {experiment.activities.map((activity, i) => (
          <figure key={activity.id} className="relative rounded-xl border border-white/10 p-2">
            <h3 className="text-center text-sm font-bold">{activity.label}</h3>
            <ActivityDiagram id={activity.id} label={activity.label} />
            {activity.durationMinutes !== undefined && (
              <p className="text-center text-sm font-bold text-cyan-200">
                {activity.durationMinutes} {c.minutes}
              </p>
            )}
            {i < 2 && (
              <span
                aria-hidden="true"
                className="absolute -right-3 top-1/2 z-10 text-xl text-cyan-200"
              >
                →
              </span>
            )}
          </figure>
        ))}
      </div>
      <WristPulseDiagram content={content} lang={lang} />
      <Procedure steps={experiment.sequence} lang={lang} />
      <h3 className="mb-3 mt-5 font-bold text-cyan-200">
        {c.results} · {c.pulse}
      </h3>
      <div className="overflow-x-auto">
        <table data-pulse-results="true" className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr>
              {[c.group, c.student, ...experiment.activities.map((activity) => activity.label)].map(
                (label) => (
                  <th key={label} className="border border-white/15 p-3">
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((group) => (
              <tr key={group}>
                <th scope="row" className="border border-white/15 p-3">
                  {group}
                </th>
                <td className="border border-white/15 p-2">
                  <input
                    type="text"
                    aria-label={`${c.group} ${group}: ${c.student}`}
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-slate-950/40 px-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  />
                </td>
                {experiment.activities.map((activity) => (
                  <td key={activity.id} className="border border-white/15 p-2">
                    <input
                      type="number"
                      min="0"
                      aria-label={`${c.group} ${group}: ${activity.label} — ${c.pulse}`}
                      className="min-h-11 w-full rounded-lg border border-white/20 bg-slate-950/40 px-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm font-bold leading-6 text-emerald-200">
        {c.conclusion}: {experiment.conclusion}
      </p>
    </section>
  );
}
