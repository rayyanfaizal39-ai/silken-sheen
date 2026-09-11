import { useState, type ReactNode } from "react";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import type { Chapter1Section } from "@/content/form1/science/chapter-1/chapter1-activities";
import { LaboratoryApparatusVisual } from "./LaboratoryApparatusVisual";

type Lang = "en" | "bm";
const box = "rounded-2xl border border-white/15 bg-slate-950/25 p-4 sm:p-5";
function Figure({ title, children, id }: { title: string; children: ReactNode; id: string }) {
  return (
    <figure className="min-w-0" data-chapter1-diagram={id}>
      <figcaption className="mb-3 text-sm font-bold text-teal-100">{title}</figcaption>
      {children}
    </figure>
  );
}
function Drawing({
  children,
  label,
  viewBox = "0 0 320 180",
}: {
  children: ReactNode;
  label: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className="mx-auto w-full max-w-lg text-slate-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}
function Text({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} fill="currentColor" stroke="none" fontSize="13">
      {children}
    </text>
  );
}

/** Diagram labels follow the canonical instrument strings; drawings are shared across languages. */
export function InstrumentVisual({ index, lang }: { index: number; lang: Lang }) {
  const en = lang === "en";
  if (index === 5)
    return (
      <LaboratoryApparatusVisual
        apparatus="measuring-cylinder"
        label={en ? "Measuring cylinder" : "Silinder penyukat"}
        className="mx-auto h-44 w-full text-slate-200"
      />
    );
  const labels = en
    ? [
        "Ruler / measuring tape",
        "Triple-beam balance",
        "Stopwatch",
        "Laboratory thermometer",
        "Ammeter",
        "",
        "Vernier calipers / micrometer screw gauge",
      ]
    : [
        "Pembaris / pita pengukur",
        "Neraca tiga alur",
        "Jam randik",
        "Termometer makmal",
        "Ammeter",
        "",
        "Angkup vernier / tolok skru mikrometer",
      ];
  return (
    <Figure title={labels[index]} id={`instrument-${index}`}>
      <Drawing label={labels[index]} viewBox={index === 6 ? "0 0 320 310" : undefined}>
        {index === 0 && (
          <>
            <rect x="20" y="30" width="280" height="42" rx="2" />
            {Array.from({ length: 29 }, (_, i) => (
              <path key={i} d={`M${20 + i * 10} 30v${i % 5 === 0 ? 23 : 12}`} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Text key={n} x={20 + n * 50} y={65}>
                {n}
              </Text>
            ))}
            <path d="M35 112h220q35 0 35 18t-35 18H50q-25 0-25-18t25-18M255 112v36" />
            {Array.from({ length: 20 }, (_, i) => (
              <path key={i} d={`M${50 + i * 10} 113v10`} />
            ))}
          </>
        )}
        {index === 1 && (
          <>
            <path d="M30 142h250l-12 18H40zM150 140V63M150 70H60m-30 0h60l-8 9H38zM60 79v50M37 129h46M150 50h140M150 65h140M150 80h140M285 45v45" />
            <rect x="192" y="44" width="10" height="12" />
            <rect x="232" y="59" width="10" height="12" />
            <rect x="172" y="74" width="10" height="12" />
            {[50, 65, 80].map((y) => (
              <g key={y}>
                {Array.from({ length: 12 }, (_, i) => (
                  <path key={i} d={`M${155 + i * 10} ${y}v5`} />
                ))}
              </g>
            ))}
          </>
        )}
        {index === 2 && (
          <>
            <circle cx="160" cy="100" r="55" />
            <path d="M150 45V28h20v17m-37 8-10-12m65 12 10-12M160 100V59m0 41 24 15" />
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} transform={`rotate(${i * 30} 160 100)`} d="M160 51v8" />
            ))}
            <Text x={154} y={140}>
              s
            </Text>
          </>
        )}
        {index === 3 && (
          <>
            <path d="M145 122V25a10 10 0 0 1 20 0v97a23 23 0 1 1-20 0Z" />
            <path d="M155 137V62" strokeWidth="5" className="text-red-300" />
            <circle cx="155" cy="141" r="12" className="text-red-300" />
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M170 ${30 + i * 10}h${i % 2 ? 7 : 14}`} />
            ))}
            <Text x={195} y={35}>
              °C
            </Text>
          </>
        )}
        {index === 4 && (
          <>
            <rect x="60" y="35" width="200" height="120" rx="12" />
            <path d="M88 105a76 76 0 0 1 144 0M160 113l-30-58" />
            {Array.from({ length: 7 }, (_, i) => (
              <path key={i} transform={`rotate(${-60 + i * 20} 160 113)`} d="M160 43v9" />
            ))}
            <Text x={154} y={133}>
              A
            </Text>
            <circle cx="90" cy="143" r="4" />
            <circle cx="230" cy="143" r="4" />
            <Text x={82} y={171}>
              −
            </Text>
            <Text x={222} y={171}>
              +
            </Text>
          </>
        )}
        {index === 6 && (
          <>
            <Text x={15} y={18}>
              {en ? "Vernier calipers" : "Angkup vernier"}
            </Text>
            <path d="M25 62h270v16H25zM25 62V32l14 12v18M25 78v48l14-12V78M91 62V38l-12 9v15M91 78v48l-15-12V78M295 70h16" />
            <rect x="68" y="58" width="46" height="30" />
            {Array.from({ length: 23 }, (_, i) => (
              <path key={i} d={`M${40 + i * 10} 63v${i % 5 === 0 ? 10 : 5}`} />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M${72 + i * 4} 80v6`} />
            ))}
            <Text x={15} y={164}>
              {en ? "Micrometer screw gauge" : "Tolok skru mikrometer"}
            </Text>
            <path d="M64 207c-47 0-50 85 5 85h39c34 0 43-23 43-49v-42h20M66 219c-30 0-29 60 3 60h36c21 0 33-12 33-36v-10h33M64 200v26h12v-26zM94 211h77v12H94z" />
            <rect x="171" y="201" width="38" height="32" />
            <path d="m209 196 65 5v33l-65 5zM274 210h24v17h-24" />
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={`M${214 + i * 7} 202v30`} />
            ))}
            <path d="M181 208v9m10-9v9M171 217h38" />
          </>
        )}
      </Drawing>
    </Figure>
  );
}

export function MeasurementConceptVisual({ index, lang }: { index: number; lang: Lang }) {
  const en = lang === "en";
  if (index === 2)
    return (
      <Drawing
        label={en ? "Scale divisions: 1 unit and 0.1 unit" : "Senggatan skala: 1 unit dan 0.1 unit"}
      >
        <Text x={15} y={27}>
          A: 1
        </Text>
        <path d="M35 55h250M35 43v24M285 43v24" />
        <Text x={30} y={88}>
          0
        </Text>
        <Text x={280} y={88}>
          1
        </Text>
        <Text x={15} y={116}>
          B: 0.1
        </Text>
        <path d="M35 138h250" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${35 + i * 25} 127v22`} />
        ))}
        <Text x={30} y={175}>
          0
        </Text>
        <Text x={280} y={175}>
          1
        </Text>
      </Drawing>
    );
  return (
    <Drawing
      label={
        en
          ? index === 0
            ? "Accurate and precise"
            : "Precise but inaccurate"
          : index === 0
            ? "Jitu dan persis"
            : "Persis tetapi tidak jitu"
      }
    >
      {[55, 35, 15].map((r) => (
        <circle key={r} cx="160" cy="82" r={r} opacity=".6" />
      ))}
      <path d="M155 82h10m-5-5v10" />
      {(index === 0
        ? [
            [156, 77],
            [164, 79],
            [158, 88],
            [166, 87],
          ]
        : [
            [190, 51],
            [198, 53],
            [192, 61],
            [201, 60],
          ]
      ).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" className="text-teal-300" />
      ))}
      <Text x={35} y={165}>
        {en
          ? index === 0
            ? "Accurate + precise"
            : "Precise, inaccurate"
          : index === 0
            ? "Jitu + persis"
            : "Persis, tidak jitu"}
      </Text>
    </Drawing>
  );
}

export function ErrorVisual({ systematic, lang }: { systematic: boolean; lang: Lang }) {
  return (
    <Drawing
      label={
        lang === "en" ? "Readings relative to the true value" : "Bacaan berbanding nilai sebenar"
      }
    >
      <path d="M30 115h260M160 30v100" strokeDasharray="4 5" />
      <path d="M160 130v9" />
      <Text x={125} y={156}>
        {lang === "en" ? "True value" : "Nilai sebenar"}
      </Text>
      {(systematic ? [223, 224, 225, 224] : [125, 187, 142, 171]).map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={35 + i * 23}
          r="4"
          fill="currentColor"
          className="text-amber-200"
        />
      ))}
    </Drawing>
  );
}

function ReadingVisual({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <Figure
      id="parallax-meniscus"
      title={en ? "Parallax error / water meniscus" : "Ralat paralaks / meniskus air"}
    >
      <Drawing
        label={
          en
            ? "Read the bottom of the water meniscus at eye level"
            : "Baca dasar meniskus air pada aras mata"
        }
        viewBox="0 0 320 270"
      >
        <path d="M45 25v205h75V25M35 235h95v10H35z" />
        <path d="M47 120q35 24 71 0" className="text-cyan-300" strokeWidth="3" />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M100 ${35 + i * 13}h20`} />
        ))}
        {[58, 132, 206].map((y, i) => (
          <g key={y} className={i === 1 ? "text-teal-300" : "text-slate-400"}>
            <path
              d={`M204 ${y}q13-12 26 0-13 12-26 0ZM204 ${y} 83 132`}
              strokeDasharray={i === 1 ? undefined : "4 5"}
            />
            <circle cx="217" cy={y} r="3" />
            <Text x={240} y={y + 5}>
              {i === 1 ? "✓" : "×"}
            </Text>
          </g>
        ))}
        <Text x={144} y={25}>
          {en ? "Eye position" : "Kedudukan mata"}
        </Text>
        <Text x={144} y={102}>
          {en ? "Eye level → bottom" : "Aras mata → dasar"}
        </Text>
        <Text x={144} y={122}>
          {en ? "of water meniscus" : "meniskus air"}
        </Text>
      </Drawing>
    </Figure>
  );
}

const solidIndices = [0, 2, 3, 4, 7, 9];
const liquidIndices = [1, 5, 6, 8];
export function DensityExplorer({
  content,
  lang,
}: {
  content: Chapter1Content["density"];
  lang: Lang;
}) {
  const [selected, setSelected] = useState(7);
  const en = lang === "en",
    item = content.table[selected],
    density = Number(item.density);
  const state = density < 1 ? "float" : density > 1 ? "sink" : "suspended";
  const y = state === "float" ? 66 - 40 * (1 - density) : state === "sink" ? 136 : 103;
  return (
    <div className={box} data-density-mode="solids-and-liquid-scale">
      <h3 className="font-bold">{en ? "Solid in water" : "Pepejal di dalam air"}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {solidIndices.map((i) => (
          <button
            type="button"
            key={i}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            className={`min-h-11 rounded-lg border p-2 text-sm focus-visible:ring-2 focus-visible:ring-teal-200 ${selected === i ? "border-teal-300 bg-teal-300/10" : "border-white/15"}`}
          >
            {content.table[i].material}
          </button>
        ))}
      </div>
      <Drawing label={item.material} viewBox="0 0 320 195">
        <path d="M35 20v156h130V20M35 66h130" />
        <path d="M36 67h128v108H36z" fill="currentColor" stroke="none" opacity=".08" />
        <rect
          x="80"
          y={y}
          width="40"
          height="40"
          className="text-amber-200"
          fill="#142b35"
          data-solid-state={state}
        />
        <Text x={185} y={76}>
          {item.density} g cm⁻³
        </Text>
        <Text x={185} y={105}>
          {density < 1
            ? en
              ? "Floats"
              : "Terapung"
            : density > 1
              ? en
                ? "Sinks"
                : "Tenggelam"
              : en
                ? "Suspended"
                : "Terapung neutral"}
        </Text>
        <Text x={40} y={193}>
          {en ? "Water: 1.00 g cm⁻³" : "Air: 1.00 g cm⁻³"}
        </Text>
      </Drawing>
      <h3 className="mt-5 font-bold">{en ? "Liquid density" : "Ketumpatan cecair"} (g cm⁻³)</h3>
      <p className="mt-1 text-xs text-slate-300">
        {en ? "Density scale" : "Skala ketumpatan"}: 0 → 14
      </p>
      <div className="mt-3 space-y-3">
        {liquidIndices.map((i) => (
          <div key={i} data-liquid-density={i}>
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <span>{content.table[i].material}</span>
              <span>{content.table[i].density}</span>
            </div>
            <div className="mt-1 h-3 border-l border-white/40 bg-white/5">
              <div
                className="h-full bg-cyan-300/50"
                style={{ width: `${(Number(content.table[i].density) / 14) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Displacement({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <Figure id="water-displacement" title={en ? "Water displacement" : "Sesaran air"}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Drawing label={en ? "Measure mass" : "Ukur jisim"} viewBox="0 0 180 220">
          <Text x={15} y={22}>
            1. {en ? "Mass" : "Jisim"}
          </Text>
          <path d="m64 62 25-9 22 18-12 27-38-5zM37 98h109l-8 12H45zM55 110v35h75v-35M31 146h124v43H31z" />
          <rect x="60" y="160" width="64" height="19" />
          <Text x={80} y={175}>
            m
          </Text>
        </Drawing>
        {[false, true].map((after) => (
          <Drawing
            key={String(after)}
            label={
              after
                ? en
                  ? "Fully submerged object"
                  : "Objek ditenggelamkan sepenuhnya"
                : en
                  ? "Initial volume"
                  : "Isi padu awal"
            }
            viewBox="0 0 180 220"
          >
            <Text x={12} y={22}>
              {after ? "3–4. V₂" : "2. V₁"}
            </Text>
            <path d="M45 42v145h75V42M34 190h100v10H34z" />
            <path d={`M47 ${after ? 88 : 120}q36 12 71 0`} className="text-cyan-300" />
            <path
              d={`M47 ${after ? 95 : 127}h71V186H47z`}
              fill="currentColor"
              stroke="none"
              opacity=".08"
            />
            {after && <path d="m68 147 18-12 16 14-5 24-30-5z" fill="#142b35" />}
            <Text x={130} y={after ? 102 : 132}>
              {after ? "V₂" : "V₁"}
            </Text>
            {Array.from({ length: 10 }, (_, i) => (
              <path key={i} d={`M106 ${53 + i * 13}h14`} />
            ))}
          </Drawing>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-lg text-teal-200">
        {en ? "Volume of object" : "Isi padu objek"} = V₂ − V₁
      </p>
      <p className="mt-2 text-center text-sm">
        {en ? "Density = Mass ÷ Volume" : "Ketumpatan = Jisim ÷ Isi padu"}
      </p>
    </Figure>
  );
}

export function PendulumFigure({
  data,
  lang,
  xLabel,
  yLabel,
}: {
  data: ReadonlyArray<readonly [number, number]>;
  lang: Lang;
  xLabel: string;
  yLabel: string;
}) {
  const en = lang === "en";
  return (
    <div className="mt-5 space-y-5">
      <Figure id="pendulum-setup" title={en ? "Experimental setup" : "Susunan radas eksperimen"}>
        <Drawing
          label={
            en
              ? "Pendulum length from support to centre of bob"
              : "Panjang bandul dari titik sokongan ke pusat ladung"
          }
          viewBox="0 0 320 310"
        >
          <path d="M22 270h166l12 12H12zM42 270V32h8v238M46 43h118M160 35v18M164 43v167" />
          <circle cx="164" cy="225" r="15" />
          <circle cx="164" cy="225" r="2" fill="currentColor" />
          <path
            d="M192 43v182m-5-175 5-7 5 7m-10 168 5 7 5-7M164 43h31M164 225h31"
            className="text-teal-300"
          />
          <g transform="rotate(-20 164 43)" strokeDasharray="4 4">
            <path d="M164 43v167" />
            <circle cx="164" cy="225" r="15" />
          </g>
          <path d="M164 75q6 0 11-2" strokeDasharray="4 4" />
          <path d="M75 48h16v192H75z" />
          {Array.from({ length: 19 }, (_, i) => (
            <path key={i} d={`M75 ${53 + i * 10}h${i % 5 ? 6 : 11}`} />
          ))}
          <Text x={204} y={105}>
            1
          </Text>
          <Text x={174} y={253}>
            3
          </Text>
          <Text x={195} y={73}>
            4
          </Text>
          <circle cx="268" cy="157" r="26" />
          <path d="M262 131v-9h12v9M268 157v-19m0 19 12 8" />
          <Text x={264} y={200}>
            2
          </Text>
        </Drawing>
        <ol className="grid gap-2 text-sm sm:grid-cols-2">
          {(en
            ? [
                "Manipulated: pendulum length",
                "Responding: Time taken for 10 complete oscillations",
                "Constant: bob mass",
                "Constant: initial displacement / angle",
              ]
            : [
                "Dimanipulasikan: panjang bandul",
                "Bergerak balas: Masa untuk 10 ayunan lengkap",
                "Dimalarkan: jisim ladung",
                "Dimalarkan: sesaran / sudut awal",
              ]
          ).map((v, i) => (
            <li key={v}>
              <span className="mr-2 text-teal-200">{i + 1}.</span>
              {v}
            </li>
          ))}
        </ol>
      </Figure>
      <Figure id="pendulum-graph" title={en ? "Results graph" : "Graf keputusan"}>
        <p className="mb-2 text-sm text-teal-100">{yLabel}</p>
        <Drawing label={`${yLabel}; ${xLabel}`} viewBox="0 0 340 260">
          {[0, 4, 8, 12, 16].map((n) => (
            <g key={n}>
              <path d={`M40 ${215 - n * 11}h275`} opacity=".15" />
              <Text x={12} y={220 - n * 11}>
                {n}
              </Text>
            </g>
          ))}
          <path d="M40 25v190h275" />
          {[0, 10, 20, 30, 40, 50, 60].map((n) => (
            <g key={n}>
              <path d={`M${40 + n * 4.3} 215v5`} />
              <Text x={35 + n * 4.3} y={240}>
                {n}
              </Text>
            </g>
          ))}
          <polyline
            points={data.map(([x, y]) => `${40 + x * 4.3},${215 - y * 11}`).join(" ")}
            className="text-teal-300"
          />
          {data.map(([x, y]) => (
            <circle
              key={x}
              cx={40 + x * 4.3}
              cy={215 - y * 11}
              r="4"
              fill="currentColor"
              data-pendulum-point={`${x},${y}`}
              className="text-teal-300"
            />
          ))}
        </Drawing>
        <p className="mt-1 text-center text-sm text-teal-100">{xLabel}</p>
      </Figure>
      <p className="border-l-2 border-teal-300 pl-4 text-sm leading-6">
        {en
          ? "In the experiment, the time for 10 oscillations is measured to obtain a more reliable timing. The period of one oscillation can be obtained by dividing the time for 10 oscillations by 10."
          : "Dalam eksperimen, masa bagi 10 ayunan diukur untuk mendapatkan bacaan yang lebih boleh dipercayai. Tempoh satu ayunan boleh diperoleh dengan membahagikan masa 10 ayunan dengan 10."}
      </p>
    </div>
  );
}

const groups = [
  {
    en: "Holding / containing substances",
    bm: "Mengisi bahan",
    ids: ["test-tube", "beaker", "conical-flask", "flat-bottom-flask"],
  },
  {
    en: "Measuring liquid volume",
    bm: "Menyukat isi padu cecair",
    ids: ["measuring-cylinder", "burette", "pipette"],
  },
  {
    en: "Heating / evaporation / heat distribution",
    bm: "Pemanasan / penyejatan / penyebaran haba",
    ids: ["boiling-tube", "evaporating-dish", "wire-gauze"],
  },
  { en: "Supporting apparatus", bm: "Menyokong radas", ids: ["tripod-stand", "retort-stand"] },
  { en: "Filtration", bm: "Penurasan", ids: ["filter-funnel"] },
  { en: "Collecting gas", bm: "Mengumpul gas", ids: ["gas-jar"] },
] as const;

export function Chapter1Completion({
  section,
  content: t,
  lang,
}: {
  section: Chapter1Section;
  content: Chapter1Content;
  lang: Lang;
}) {
  const en = lang === "en";
  return (
    <div className="space-y-5" data-chapter1-completion={section}>
      {section === "science" && (
        <>
          <ol className="flex flex-wrap gap-2 text-sm text-teal-100">
            {(en
              ? [
                  "Observation of daily life",
                  "Science",
                  "Knowledge",
                  "Technology / innovation",
                  "Improved daily life",
                ]
              : [
                  "Pemerhatian kehidupan harian",
                  "Sains",
                  "Pengetahuan",
                  "Teknologi / inovasi",
                  "Kehidupan harian yang lebih baik",
                ]
            ).map((label, i) => (
              <li key={label}>
                {i > 0 && <span className="mx-2">→</span>}
                {label}
              </li>
            ))}
          </ol>
          <ul className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
            {t.scienceInLife.dailyConnections.map((v) => (
              <li key={v} className="border-l border-teal-300/40 pl-4">
                {v}
              </li>
            ))}
          </ul>
          <div className={box}>
            <h3 className="font-bold">{en ? "Technological innovation" : "Inovasi teknologi"}</h3>
            <p className="mt-2 text-sm leading-6">{t.scienceInLife.innovation.definition}</p>
            <ul className="mt-3 list-inside list-disc text-sm leading-6">
              {t.scienceInLife.innovation.examples.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      {section === "laboratory" && (
        <div className={box} data-apparatus-classification>
          <h3 className="font-bold">
            {en
              ? "Laboratory apparatus — classification by function"
              : "Radas makmal — pengelasan mengikut fungsi"}
          </h3>
          <ul className="mt-4 grid gap-4 border-l-2 border-teal-300/40 pl-4 sm:grid-cols-2">
            {groups.map((group) => (
              <li key={group.en} className="border-t border-teal-300/30 pt-3">
                <h4 className="font-bold text-teal-100">{group[lang]}</h4>
                <ul className="mt-2 space-y-2">
                  {group.ids.map((id) => {
                    const item = t.laboratory.apparatus.find((a) => a.id === id)!;
                    return (
                      <li key={id} data-classified-apparatus={id} className="text-sm">
                        <span className="font-semibold">{item.name}</span>
                        <span className="block text-slate-300">{item.function}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      {section === "units" && (
        <div className={box}>
          <p className="text-sm leading-6">{t.quantitiesAndUnits.physicalQuantityDefinition}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span>
              {en ? "Physical quantity" : "Kuantiti fizik"}
              <br />
              {t.quantitiesAndUnits.baseQuantities[0].quantity}
            </span>
            →
            <span>
              {en ? "Value" : "Nilai"}
              <br />
              2.5
            </span>
            →
            <span>
              {en ? "Unit" : "Unit"}
              <br />m
            </span>
          </div>
          <p className="mt-4 font-mono text-teal-200">kg → × 1000 → g</p>
          <p className="mt-2 font-mono text-teal-200">g → ÷ 1000 → kg</p>
        </div>
      )}
      {section === "measurement" && (
        <>
          <div className={box}>
            <ReadingVisual lang={lang} />
          </div>
          <div className={box}>
            <h3 className="font-bold">{en ? "Measurement innovation" : "Inovasi pengukuran"}</h3>
            <p className="mt-2 text-sm leading-6">{t.measuringInstruments.innovation}</p>
          </div>
        </>
      )}
      {section === "density" && (
        <>
          <p className="border-l-2 border-teal-300 pl-4 text-sm leading-6">
            {t.density.operationalDefinition}
          </p>
          <div className={box}>
            <Displacement lang={lang} />
          </div>
          <ul className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
            {t.density.everydayExamples.map((v) => (
              <li key={v} className="border-l border-teal-300/40 pl-4">
                {v}
              </li>
            ))}
          </ul>
        </>
      )}
      {section === "values" && (
        <>
          <p className="border-l-2 border-teal-300 pl-4 text-sm leading-6">
            {t.attitudesAndValues.purpose}
          </p>
          {/* Behaviour-to-purpose examples explicitly supplied in the Chapter 1 completion brief. */}
          <div
            className="grid gap-3 md:grid-cols-3"
            data-chapter1-diagram="values-behaviour-purpose"
          >
            {(en
              ? [
                  ["Honesty", "Record actual readings", "Makes results trustworthy"],
                  ["Accuracy", "Measure carefully", "Reduces unreliable conclusions"],
                  [
                    "Responsibility",
                    "Protect people and the environment",
                    "Safe scientific practice",
                  ],
                ]
              : [
                  ["Kejujuran", "Rekod bacaan sebenar", "Menjadikan keputusan boleh dipercayai"],
                  [
                    "Ketepatan",
                    "Ukur dengan teliti",
                    "Mengurangkan kesimpulan yang tidak boleh dipercayai",
                  ],
                  [
                    "Tanggungjawab",
                    "Lindungi manusia dan alam sekitar",
                    "Amalan saintifik yang selamat",
                  ],
                ]
            ).map(([value, behaviour, purpose]) => (
              <ol key={value} className={`${box} space-y-2 text-sm leading-6`}>
                <li className="font-bold text-lime-200">{value}</li>
                <li>
                  <span aria-hidden="true">↓ </span>
                  {behaviour}
                </li>
                <li>
                  <span aria-hidden="true">↓ </span>
                  {purpose}
                </li>
              </ol>
            ))}
          </div>
        </>
      )}
      {t.learningExperiences[section].map((experience) => (
        <article key={experience.id} className={box} data-learning-experience={experience.id}>
          <h3 className="font-bold text-amber-100">{experience.title}</h3>
          <p className="mt-2 text-sm leading-6">{experience.purpose}</p>
          <p className="mt-2 text-xs leading-5 text-amber-200">{experience.practicalNotice}</p>
          <details className="mt-3">
            <summary className="min-h-11 cursor-pointer py-3 text-sm text-teal-200 focus-visible:ring-2 focus-visible:ring-teal-200">
              {en ? "Show activity" : "Tunjukkan aktiviti"}
            </summary>
            <ol className="list-inside list-decimal space-y-2 text-sm leading-6">
              {experience.instructions.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-6">{experience.studentOutput}</p>
          </details>
        </article>
      ))}
    </div>
  );
}
