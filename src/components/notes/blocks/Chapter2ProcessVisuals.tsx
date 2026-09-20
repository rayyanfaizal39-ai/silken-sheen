import { useId, useState, type ReactNode } from "react";
import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import type { LocalizedChapter2PracticalArea } from "@/content/form1/science/chapter-2/chapter2-activities";
import { chapter2Processes } from "@/content/form1/science/chapter-2/chapter2-canonical";
import { parseWordEquation } from "./EquationFlow";

type Lang = "bm" | "en";
type Investigation = NonNullable<LocalizedChapter2PracticalArea["investigations"]>[number];
// Diagram labels only; experiment facts remain in chapter2-activities, the single source.
const labels = {
  en: {
    breathing: "External respiration (breathing)",
    external: "Physical gas exchange between an organism and its environment.",
    distinction: "Breathing ≠ cell respiration",
    gasOnly: "Gas exchange ≠ energy release",
    cell: "Cell respiration",
    photo: "Photosynthesis",
    lungs: "Lungs",
    bodyCell: "Body cell",
    mitochondria: "Mitochondria",
    chloroplast: "Chloroplast",
    question: "Question",
    setup: "Visual setup",
    variables: "Variables",
    observation: "Observation",
    inference: "Inference",
    ethanol: "Ethanol",
    bath: "Hot-water bath",
    tile: "White tile",
    iodine: "Iodine solution",
    brown: "Brown",
    blue: "Dark blue",
    before: "Before starch test",
    after: "After iodine",
    green: "Green areas",
    nonGreen: "Non-green areas",
    light: "Light",
    dark: "Darkness",
    watered: "Watered daily",
    unwatered: "Unwatered",
    available: "Carbon dioxide available",
    removed: "Carbon dioxide removed",
    koh: "Potassium hydroxide",
    produces: "Produces",
    used: "Used in",
    starchTitle: "Leaf starch test",
  },
  bm: {
    breathing: "Respirasi luar (pernafasan)",
    external: "Pertukaran gas secara fizikal antara organisma dengan persekitarannya.",
    distinction: "Pernafasan ≠ respirasi sel",
    gasOnly: "Pertukaran gas ≠ pembebasan tenaga",
    cell: "Respirasi sel",
    photo: "Fotosintesis",
    lungs: "Peparu",
    bodyCell: "Sel badan",
    mitochondria: "Mitokondria",
    chloroplast: "Kloroplas",
    question: "Soalan",
    setup: "Susunan radas",
    variables: "Pemboleh ubah",
    observation: "Pemerhatian",
    inference: "Inferens",
    ethanol: "Etanol",
    bath: "Rendaman air panas",
    tile: "Jubin putih",
    iodine: "Larutan iodin",
    brown: "Perang",
    blue: "Biru tua",
    before: "Sebelum ujian kanji",
    after: "Selepas larutan iodin",
    green: "Bahagian hijau",
    nonGreen: "Bahagian bukan hijau",
    light: "Cahaya",
    dark: "Gelap",
    watered: "Disiram setiap hari",
    unwatered: "Tanpa air",
    available: "Karbon dioksida tersedia",
    removed: "Karbon dioksida disingkirkan",
    koh: "Kalium hidroksida",
    produces: "Menghasilkan",
    used: "Digunakan dalam",
    starchTitle: "Ujian kanji daun",
  },
} as const;
const card = "min-w-0 rounded-2xl border border-white/15 bg-slate-950/40 p-4 sm:p-5";

function Canvas({
  name,
  children,
  viewBox = "0 0 360 300",
  ...data
}: {
  name: string;
  children: ReactNode;
  viewBox?: string;
  "data-process"?: string;
  "data-investigation-diagram"?: string;
  "data-starch-stage"?: number;
}) {
  const id = useId();
  return (
    <svg
      {...data}
      role="img"
      aria-labelledby={id}
      viewBox={viewBox}
      fontFamily="Arial, sans-serif"
      className="my-3 block w-full text-slate-100"
    >
      <title id={id}>{name}</title>
      {children}
    </svg>
  );
}
function Arrow({ d, color = "#67e8f9" }: { d: string; color?: string }) {
  const id = useId();
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8" fill={color} />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={color} strokeWidth="3" markerEnd={`url(#${id})`} />
    </g>
  );
}
function Text({
  x,
  y,
  children,
  color = "#e2e8f0",
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
}) {
  return (
    <text x={x} y={y} fill={color} fontSize="17" fontWeight="600" textAnchor="middle">
      {children}
    </text>
  );
}
function Leaf({
  x = 0,
  y = 0,
  fill = "#34d399",
  variegated = false,
  tested = false,
}: {
  x?: number;
  y?: number;
  fill?: string;
  variegated?: boolean;
  tested?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`} data-leaf={variegated ? "variegated" : "plain"}>
      <path
        d="M0 65 C-70 30 -60 -45 0 -70 C60 -45 70 30 0 65Z"
        fill={variegated ? (tested ? "#b77935" : "#f1e5b4") : fill}
        stroke="#d1fae5"
        strokeWidth="2"
      />
      {variegated && (
        <path
          data-leaf-area="green"
          d="M0 52 C-38 22 -30 -30 0 -48 C30 -30 38 22 0 52Z"
          fill={tested ? "#244ca8" : "#34d399"}
        />
      )}
      {variegated && (
        <path
          data-leaf-area="non-green"
          d="M-8 -61 C-45 -37 -52 0 -35 29"
          fill="none"
          stroke={tested ? "#b77935" : "#f1e5b4"}
          strokeWidth="9"
        />
      )}
      <path
        d="M0 80 V-48 M0 10 L-25 -12 M0 28 L26 3"
        fill="none"
        stroke="#064e3b"
        strokeWidth="2"
      />
    </g>
  );
}
function Plant() {
  return (
    <g data-plant="true">
      <path d="M180 220 V95" stroke="#34d399" strokeWidth="8" />
      <path
        d="M180 160 C100 165 105 90 120 85 C163 90 180 125 180 160 M180 125 C250 135 257 60 240 57 C197 66 180 90 180 125"
        fill="#34d399"
        stroke="#a7f3d0"
        strokeWidth="2"
      />
      <path d="M133 218 H227 L216 271 H144Z" fill="#94614e" stroke="#d6a893" strokeWidth="2" />
    </g>
  );
}
function Sunlight() {
  return (
    <g data-light="true">
      <circle cx="56" cy="45" r="20" fill="#fde68a" />
      {[0, 45, 90, 135].map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle} 56 45)`}
          d="M56 12 V4 M56 78 V86"
          stroke="#fde68a"
          strokeWidth="3"
        />
      ))}
      <Arrow d="M80 70 L121 105" color="#fde68a" />
    </g>
  );
}
function WordEquation({ value }: { value: string }) {
  const eq = parseWordEquation(value);
  return (
    <div
      data-word-equation="true"
      className="my-4 flex flex-col items-center gap-3 rounded-xl border border-cyan-300/25 bg-cyan-300/5 p-4 text-center text-sm font-bold sm:flex-row sm:justify-center"
    >
      <span data-equation-reactants="true">{eq.reactants}</span>
      <span className="flex flex-col items-center">
        {eq.conditions && (
          <span data-equation-conditions="true" className="mb-1 text-amber-200">
            {eq.conditions}
          </span>
        )}
        <span aria-hidden="true" className="text-2xl text-cyan-300">
          →
        </span>
      </span>
      <span data-equation-products="true">{eq.products}</span>
    </div>
  );
}

export function RespirationVisual({ content, lang }: { content: Chapter2Content; lang: Lang }) {
  const c = labels[lang];
  const inputs = chapter2Processes.respiration.reactants[lang].split(" + ");
  const outputs = chapter2Processes.respiration.products[lang].split(" + ");
  return (
    <section data-learning-standard="2.2.1" className="space-y-4">
      <p className="rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-4 text-center text-xl font-black text-cyan-100">
        {c.distinction}
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <figure className={card}>
          <h3 className="text-lg font-black">{c.breathing}</h3>
          <Canvas
            name={`${c.breathing}: ${inputs[1]} → ${c.lungs} → ${outputs[0]}`}
            data-process="breathing"
          >
            <path
              data-organism="human"
              d="M120 260 V110 C120 76 240 76 240 110 V260Z"
              fill="#164e63"
              stroke="#67e8f9"
              strokeWidth="2"
            />
            <circle cx="180" cy="48" r="30" fill="#164e63" stroke="#67e8f9" strokeWidth="2" />
            <g data-lungs="true" fill="#fda4af" stroke="#fecdd3" strokeWidth="2">
              <path d="M171 120 C150 95 129 133 130 182 C130 207 169 207 171 178Z" />
              <path d="M189 120 C210 95 231 133 230 182 C230 207 191 207 189 178Z" />
            </g>
            <path
              d="M180 83 V125 L154 147 M180 125 L206 147"
              stroke="#ffe4e6"
              strokeWidth="5"
              fill="none"
            />
            <Arrow d="M18 111 H115" />
            <Arrow d="M242 212 H342" color="#fda4af" />
            <Text x={60} y={94}>
              {inputs[1]}
            </Text>
            <Text x={282} y={244}>
              {outputs[0]}
            </Text>
            <Text x={180} y={282}>
              {c.lungs}
            </Text>
          </Canvas>
          <figcaption className="space-y-2 text-sm leading-6 text-slate-300">
            <p>{c.external}</p>
            <p className="font-bold text-amber-200">{c.gasOnly}</p>
          </figcaption>
        </figure>
        <figure className={card}>
          <h3 className="text-lg font-black">{c.cell}</h3>
          <Canvas name={`${c.bodyCell}: ${c.mitochondria}`} data-process="cell-respiration">
            <ellipse
              data-body-cell="true"
              cx="180"
              cy="150"
              rx="142"
              ry="103"
              fill="#1e3a5f"
              stroke="#93c5fd"
              strokeWidth="3"
            />
            <circle cx="93" cy="146" r="24" fill="#7c3aed" />
            <g data-mitochondrion="true">
              <ellipse
                cx="205"
                cy="155"
                rx="74"
                ry="44"
                fill="#a85429"
                stroke="#fed7aa"
                strokeWidth="3"
              />
              <path
                d="M152 156 Q163 118 177 150 T204 150 T231 150 T257 157"
                fill="none"
                stroke="#fed7aa"
                strokeWidth="5"
              />
            </g>
            <circle
              data-zoom-origin="true"
              cx="49"
              cy="266"
              r="13"
              fill="#1e3a5f"
              stroke="#93c5fd"
              strokeWidth="2"
            />
            <path
              data-cell-zoom="true"
              d="M41 254 L39 169 M62 261 L143 248"
              stroke="#93c5fd"
              strokeDasharray="5 4"
            />
            <Text x={180} y={30}>
              {c.bodyCell}
            </Text>
            <Text x={207} y={275}>
              {c.mitochondria}
            </Text>
            <Text x={180} y={80}>
              {inputs.join(" + ")}
            </Text>
            <Text x={180} y={235}>
              {outputs.join(" + ")}
            </Text>
            <Arrow d="M30 70 L135 119" />
            <Arrow d="M262 180 L335 232" color="#fbbf24" />
          </Canvas>
          <figcaption>
            <WordEquation value={content.respiration.wordEquation} />
            <p className="text-sm leading-6 text-slate-300">{content.respiration.definition}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function PhotosynthesisProcessVisual({
  content,
  lang,
}: {
  content: Chapter2Content;
  lang: Lang;
}) {
  const c = labels[lang];
  const [light, co2, water, chlorophyll] = content.photosynthesis.requirements;
  const [glucose, oxygen] = chapter2Processes.photosynthesis.products[lang].split(" + ");
  return (
    <section data-learning-standard="2.2.2" className={card}>
      <h3 className="text-lg font-black">{c.photo}</h3>
      <div className="grid items-center gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Canvas
          name={`${c.photo}: ${[light, co2, water, chlorophyll, glucose, oxygen].join(", ")}`}
          viewBox="0 0 420 480"
          data-process="photosynthesis"
        >
          <g transform="translate(25 135)">
            <Plant />
          </g>
          <Sunlight />
          <Arrow d="M77 72 L192 214" color="#fde68a" />
          <Text x={206} y={62}>
            {light}
          </Text>
          <Arrow d="M14 177 L140 239" />
          <Text x={95} y={151}>
            {co2}
          </Text>
          <Arrow d="M270 219 L381 182" />
          <Text x={337} y={155}>
            {oxygen}
          </Text>
          <Arrow d="M260 265 L363 293" color="#a7f3d0" />
          <Text x={343} y={322}>
            {glucose}
          </Text>
          <g data-root-water="true">
            <path
              d="M205 404 V444 M205 420 L174 440 M205 421 L235 444"
              fill="none"
              stroke="#d6a893"
              strokeWidth="3"
            />
            <Arrow d="M205 431 V287" color="#7dd3fc" />
          </g>
          <Text x={91} y={438}>
            {water}
          </Text>
          <Arrow d="M116 431 H175" color="#7dd3fc" />
          <g data-chloroplast="true">
            <path d="M257 227 L315 91" stroke="#a7f3d0" strokeDasharray="5 4" />
            <ellipse
              cx="330"
              cy="98"
              rx="42"
              ry="25"
              fill="#065f46"
              stroke="#a7f3d0"
              strokeWidth="2"
            />
            <path
              d="M308 88 H324 M308 96 H324 M308 104 H324 M335 88 H351 M335 96 H351 M335 104 H351"
              stroke="#34d399"
              strokeWidth="4"
            />
          </g>
          <Text x={330} y={39}>
            {chlorophyll}
          </Text>
          <Text x={330} y={133}>
            {c.chloroplast}
          </Text>
        </Canvas>
        <div>
          <p className="text-sm leading-6 text-slate-300">{content.photosynthesis.definition}</p>
          <WordEquation value={content.photosynthesis.wordEquation} />
        </div>
      </div>
    </section>
  );
}

function StarchStage({ stage, lang, name }: { stage: number; lang: Lang; name: string }) {
  const c = labels[lang];
  return (
    <Canvas
      name={name}
      data-starch-stage={stage}
      viewBox={stage === 1 ? "0 0 300 265" : "0 0 300 235"}
    >
      {stage <= 4 ? (
        <>
          {stage === 3 && (
            <g data-hot-water-bath="true">
              <path d="M35 72 V202 H265 V72" fill="#164e63" stroke="#7dd3fc" strokeWidth="3" />
              <path d="M38 123 H262 V199 H38Z" fill="#38bdf8" opacity=".3" />
              <Text x={150} y={227}>
                {c.bath}
              </Text>
            </g>
          )}
          <g data-container={stage === 2 || stage === 3 ? "ethanol" : "water"}>
            <path
              d="M96 38 V173 Q150 198 204 173 V38"
              fill={stage === 3 ? "#fef3c7" : "#164e63"}
              fillOpacity=".3"
              stroke="#e2e8f0"
              strokeWidth="3"
            />
            {stage === 1 && (
              <g data-boiling-water="true">
                <path d="M100 97 H200 V171 Q150 194 100 171Z" fill="#38bdf8" fillOpacity=".3" />
                <g fill="none" stroke="#bae6fd" strokeWidth="2">
                  <circle cx="118" cy="150" r="4" />
                  <circle cx="181" cy="133" r="5" />
                  <circle cx="128" cy="110" r="3" />
                  <circle cx="174" cy="157" r="3" />
                </g>
              </g>
            )}
            <path d="M100 97 H200" stroke="#7dd3fc" strokeWidth="2" />
            <g transform="translate(150 126) scale(.35)">
              <Leaf fill={stage >= 3 ? "#e5d9b2" : "#34d399"} />
            </g>
          </g>
          <Text x={150} y={24}>
            {stage === 2 || stage === 3
              ? c.ethanol
              : chapter2Processes.photosynthesis.requirements[2][lang]}
          </Text>
          {(stage === 1 || stage === 4) && (
            <g data-hot-water="true" stroke="#cbd5e1" strokeWidth="2" fill="none">
              <path d="M115 75 Q100 62 115 49 M150 75 Q135 62 150 49 M185 75 Q170 62 185 49" />
            </g>
          )}
          {stage === 1 && (
            <g data-active-water-heating="true" data-heat-source="electric-hotplate">
              <ellipse
                cx="150"
                cy="192"
                rx="57"
                ry="7"
                fill="#fb923c"
                stroke="#fed7aa"
                strokeWidth="2"
              />
              <rect
                x="75"
                y="199"
                width="150"
                height="40"
                rx="6"
                fill="#475569"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
              <path
                d="M88 239 V248 M212 239 V248 M225 221 H247 V249"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="4"
              />
              <circle cx="198" cy="218" r="7" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
              <path d="M198 218 L202 214" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="105" cy="218" r="5" fill="#fb923c" />
            </g>
          )}
          {stage === 3 && (
            <path
              data-nested-container="true"
              d="M70 54 L92 74 M230 54 L208 74"
              stroke="#fde68a"
              strokeWidth="3"
            />
          )}
        </>
      ) : (
        <>
          <rect
            data-white-tile="true"
            x="36"
            y="78"
            width="228"
            height="130"
            rx="8"
            fill="#f8fafc"
          />
          {stage === 7 && (
            <rect
              data-result-emphasis="true"
              x="32"
              y="74"
              width="236"
              height="138"
              rx="12"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="4"
            />
          )}
          <g
            data-final-leaf-result={stage === 7 ? "dark-blue" : undefined}
            transform={
              stage === 7 ? "translate(150 137) scale(.85)" : "translate(150 137) scale(.7)"
            }
          >
            <Leaf fill={stage === 7 ? "#244ca8" : "#e5d9b2"} />
          </g>
          {stage === 6 && (
            <g data-iodine="true">
              <g data-iodine-dropper="true">
                <path d="M195 14 L176 61" stroke="#fbbf24" strokeWidth="8" />
                <path d="M195 14 L176 61" stroke="#fef3c7" strokeWidth="2" />
                <ellipse
                  cx="197"
                  cy="12"
                  rx="8"
                  ry="11"
                  transform="rotate(22 197 12)"
                  fill="#64748b"
                />
              </g>
              <path d="M173 72 Q161 87 173 93 Q185 87 173 72" fill="#b77935" />
            </g>
          )}
          <Text x={150} y={stage >= 6 ? 232 : 48}>
            {stage === 7 ? c.blue : stage === 6 ? c.iodine : c.tile}
          </Text>
        </>
      )}
    </Canvas>
  );
}

function InvestigationDiagram({ item, lang }: { item: Investigation; lang: Lang }) {
  const c = labels[lang];
  if (item.id === "starch")
    return (
      <div data-investigation="starch">
        <h4 className="mb-3 font-black">{c.starchTitle}</h4>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {item.visualSteps?.map((step, index) => (
            <li key={step} className={card}>
              <p className="text-sm font-bold">
                <span className="mr-2 text-amber-200">{index + 1}.</span>
                {step}
              </p>
              <StarchStage stage={index + 1} lang={lang} name={step} />
            </li>
          ))}
        </ol>
        <div className="mt-4 flex items-center justify-center gap-4 rounded-xl border border-blue-300/30 p-4 text-sm font-bold">
          <span className="rounded-lg bg-amber-700/40 p-3">{c.brown}</span>
          <span>→</span>
          <span className="rounded-lg bg-blue-800 p-3 text-white">{c.blue}</span>
        </div>
      </div>
    );
  const variegated = item.id === "chlorophyll";
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[0, 1].map((side) => {
        const caption = variegated
          ? side === 0
            ? c.before
            : c.after
          : item.id === "light"
            ? side === 0
              ? c.light
              : c.dark
            : item.id === "water"
              ? side === 0
                ? c.watered
                : c.unwatered
              : side === 0
                ? c.available
                : c.removed;
        return (
          <figure key={side} className={card}>
            <h4 className="text-center font-bold text-cyan-100">{caption}</h4>
            <Canvas
              name={`${item.title}: ${caption}`}
              data-investigation-diagram={`${item.id}-${side}`}
              viewBox={variegated ? "0 0 360 260" : "0 0 360 410"}
            >
              {variegated ? (
                <>
                  <Leaf x={180} y={108} variegated tested={side === 1} />
                  <Text x={180} y={230}>
                    {side === 0 ? c.green : c.blue}
                  </Text>
                  <Text x={180} y={254}>
                    {side === 0 ? c.nonGreen : c.brown}
                  </Text>
                </>
              ) : (
                <>
                  {item.id === "light" && side === 1 ? (
                    <rect
                      data-dark-enclosure="true"
                      x="82"
                      y="18"
                      width="198"
                      height="264"
                      rx="12"
                      fill="#020617"
                      stroke="#64748b"
                      strokeDasharray="6 4"
                      strokeWidth="3"
                    />
                  ) : (
                    <Sunlight />
                  )}
                  <Plant />
                  {item.id === "carbon-dioxide" && (
                    <g data-sealed-bell-jar="true">
                      <path
                        d="M78 278 V108 A102 84 0 0 1 282 108 V278Z"
                        fill="#7dd3fc"
                        fillOpacity=".08"
                        stroke="#bae6fd"
                        strokeWidth="3"
                      />
                      <path d="M66 281 H295" stroke="#e2e8f0" strokeWidth="8" />
                      {side === 1 && (
                        <g data-koh="true">
                          <path
                            d="M237 231 L242 264 H270 L276 231Z"
                            fill="#c4b5fd"
                            stroke="#ede9fe"
                            strokeWidth="2"
                          />
                          <Text x={180} y={310}>
                            {c.koh}
                          </Text>
                        </g>
                      )}
                    </g>
                  )}
                  {item.id === "water" && (
                    <g data-watering={side === 0 ? "watered" : "unwatered"}>
                      <path d="M275 106 Q260 126 275 134 Q290 126 275 106" fill="#7dd3fc" />
                      {side === 0 ? (
                        <Arrow d="M275 145 L235 218" color="#7dd3fc" />
                      ) : (
                        <path
                          d="M256 104 L294 141 M294 104 L256 141"
                          stroke="#fda4af"
                          strokeWidth="4"
                        />
                      )}
                    </g>
                  )}
                  <Arrow
                    d={
                      item.id === "carbon-dioxide" && side === 1
                        ? "M100 290 V326 L161 347"
                        : "M180 290 V327"
                    }
                  />
                  <g transform="translate(180 363) scale(.35)">
                    <Leaf fill={side === 0 ? "#244ca8" : "#b77935"} />
                  </g>
                  <Text x={180} y={407}>
                    {side === 0 ? c.blue : c.brown}
                  </Text>
                </>
              )}
            </Canvas>
          </figure>
        );
      })}
    </div>
  );
}

export function PhotosynthesisInvestigationHub({
  area,
  lang,
}: {
  area: LocalizedChapter2PracticalArea;
  lang: Lang;
}) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const items = area.investigations ?? [];
  const item = items[index] ?? items[0];
  if (!item) return null;
  const c = labels[lang];
  // Separate the final source sentence (inference), preserving all source words.
  const sentenceBoundary = item.observeInfer.lastIndexOf(". ");
  const boundary = sentenceBoundary >= 0 ? sentenceBoundary : item.observeInfer.indexOf(", ");
  const observation = boundary < 0 ? item.observeInfer : item.observeInfer.slice(0, boundary + 1);
  const inference = boundary < 0 ? "" : item.observeInfer.slice(boundary + 2);
  return (
    <section data-photosynthesis-hub="true" className={card}>
      <h3 className="text-xl font-black">{area.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{area.practicalNotice}</p>
      <div
        role="group"
        aria-label={area.title}
        className="my-4 grid grid-cols-2 gap-2 sm:grid-cols-5"
      >
        {items.map((option, i) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={i === index}
            aria-controls={id}
            data-investigation-selector={option.id}
            onClick={() => setIndex(i)}
            className={`min-h-12 cursor-pointer rounded-xl border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${i === index ? "border-cyan-300 bg-cyan-300/20 text-white" : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"}`}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div id={id} aria-live="polite" data-selected-investigation={item.id} className="space-y-5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-200">{c.question}</h4>
          <p className="mt-2 text-lg font-bold">{item.question}</p>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-200">
            {c.setup}
          </h4>
          <p className="mb-3 text-sm leading-6 text-slate-300">{item.setup}</p>
          {item.safety && (
            <p
              data-investigation-safety="true"
              className="mb-4 rounded-xl border-2 border-amber-300/60 bg-amber-300/10 p-4 text-sm font-bold leading-6 text-amber-100"
            >
              {item.safety}
            </p>
          )}
          <InvestigationDiagram item={item} lang={lang} />
        </div>
        <div data-source-variables="true">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-200">
            {c.variables}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{item.variables}</p>
        </div>
        <div data-source-observation="true">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-200">
            {c.observation}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{observation}</p>
        </div>
        {inference && (
          <div data-source-inference="true">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              {c.inference}
            </h4>
            <p className="mt-2 text-sm font-bold leading-6 text-emerald-200">{inference}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ComplementaryCycle({ content, lang }: { content: Chapter2Content; lang: Lang }) {
  const c = labels[lang];
  const captionId = useId();
  const toRespiration = chapter2Processes.photosynthesis.products[lang];
  const toPhotosynthesis = chapter2Processes.photosynthesis.reactants[lang];
  const accessibleLoop = `${c.photo} → ${toRespiration} → ${c.cell} → ${toPhotosynthesis} → ${c.photo}`;
  const processNode = (
    process: "photosynthesis" | "respiration",
    x: number,
    y: number,
    width: number,
    height: number,
  ) => (
    <g data-cycle-node={process} transform={`translate(${x} ${y})`}>
      <rect
        width={width}
        height={height}
        rx="18"
        fill={process === "photosynthesis" ? "#064e3b" : "#164e63"}
        stroke={process === "photosynthesis" ? "#6ee7b7" : "#67e8f9"}
        strokeWidth="2"
      />
      <g transform={`translate(42 ${height / 2})`} aria-hidden="true">
        {process === "photosynthesis" ? (
          <g data-cycle-symbol="leaf-sunlight">
            <path
              d="M-5 20 C-24 5 -15 -17 15 -18 C21 6 11 22 -5 20Z"
              fill="#34d399"
              stroke="#a7f3d0"
              strokeWidth="1.5"
            />
            <path
              d="M-10 27 L11 -12 M0 10 L-8 0 M5 0 L14 -2"
              fill="none"
              stroke="#065f46"
              strokeWidth="2"
            />
            <circle cx="-16" cy="-22" r="7" fill="#fde68a" />
            <path
              d="M-16 -33 V-37 M-27 -22 H-31 M-24 -30 L-27 -33 M-6 -30 L-3 -33"
              fill="none"
              stroke="#fde68a"
              strokeWidth="2"
            />
          </g>
        ) : (
          <g data-cycle-symbol="cell-mitochondrion">
            <ellipse rx="26" ry="23" fill="#1e3a5f" stroke="#93c5fd" strokeWidth="2" />
            <circle cx="-13" cy="-4" r="6" fill="#a78bfa" />
            <ellipse
              cx="8"
              cy="5"
              rx="12"
              ry="8"
              fill="#a85429"
              stroke="#fed7aa"
              strokeWidth="1.5"
            />
            <path d="M-1 5 Q2 -2 5 5 T11 5 T17 5" fill="none" stroke="#fed7aa" strokeWidth="1.5" />
          </g>
        )}
      </g>
      <text
        x={(width + 66) / 2}
        y={height / 2 + 6}
        fill="#f8fafc"
        fontSize="18"
        fontWeight="800"
        textAnchor="middle"
      >
        {process === "photosynthesis" ? c.photo : c.cell}
      </text>
    </g>
  );
  return (
    <figure data-learning-standard="2.2.4" className={card}>
      <svg
        data-process="complementary-cycle"
        data-cycle-layout="desktop"
        role="img"
        aria-label={accessibleLoop}
        aria-describedby={captionId}
        viewBox="0 0 760 260"
        fontFamily="Arial, sans-serif"
        className="mx-auto my-3 hidden w-full max-w-[52rem] md:block"
      >
        <g data-cycle-flow="to-respiration">
          <Arrow d="M260 120 C315 32 445 32 500 120" color="#6ee7b7" />
          <text x="380" y="35" fill="#a7f3d0" fontSize="14" fontWeight="600" textAnchor="middle">
            {toRespiration}
          </text>
        </g>
        <g data-cycle-flow="to-photosynthesis">
          <Arrow d="M500 170 C445 240 315 240 260 170" />
          <text x="380" y="239" fill="#a5f3fc" fontSize="14" fontWeight="600" textAnchor="middle">
            {toPhotosynthesis}
          </text>
        </g>
        {processNode("photosynthesis", 25, 95, 235, 100)}
        {processNode("respiration", 500, 95, 235, 100)}
      </svg>
      <svg
        data-process="complementary-cycle"
        data-cycle-layout="mobile"
        role="img"
        aria-label={accessibleLoop}
        aria-describedby={captionId}
        viewBox="0 0 340 330"
        fontFamily="Arial, sans-serif"
        className="mx-auto my-3 block w-full max-w-[21rem] md:hidden"
      >
        <g data-cycle-flow="to-respiration">
          <Arrow d="M190 100 V180" color="#6ee7b7" />
          <rect x="65" y="125" width="250" height="30" rx="8" fill="#0b1e2a" />
          <text x="190" y="145" fill="#a7f3d0" fontSize="14" fontWeight="600" textAnchor="middle">
            {toRespiration}
          </text>
        </g>
        <g data-cycle-flow="to-photosynthesis">
          <Arrow d="M190 260 V295 H32 Q18 295 18 281 V62 Q18 48 32 48 H60" />
          <rect x="50" y="281" width="270" height="30" rx="8" fill="#0b1e2a" />
          <text x="190" y="302" fill="#a5f3fc" fontSize="14" fontWeight="600" textAnchor="middle">
            {toPhotosynthesis}
          </text>
        </g>
        {processNode("photosynthesis", 60, 20, 260, 80)}
        {processNode("respiration", 60, 180, 260, 80)}
      </svg>
      <figcaption id={captionId} className="mt-3 text-sm leading-6 text-slate-300">
        {content.complementaryRelationship}
      </figcaption>
    </figure>
  );
}
