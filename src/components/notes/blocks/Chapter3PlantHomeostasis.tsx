import { useId, type ReactNode } from "react";
import type { Chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
type Lang = "en" | "bm";
const copy = {
  en: {
    transpiration: "Transpiration",
    route: [
      "Soil water",
      "Root hairs",
      "Water + mineral absorption",
      "Transport up the stem",
      "Leaf",
      "Stoma",
      "Water vapour to surroundings",
    ],
    crossSection: "Leaf cross-section",
    pull: "Transpiration pull",
    cooling: "Evaporation cools the plant",
    guards: "Guard cells",
    open: "Open stoma",
    closed: "Closed stoma",
    gas: "Gas exchange",
    vapour: "Water vapour",
    banana: "Banana leaf",
    normal: "Less hot condition",
    hot: "Hot condition",
    broad: "Broad leaf",
    rolled: "Reduced exposed area → reduced water loss",
  },
  bm: {
    transpiration: "Transpirasi",
    route: [
      "Air tanah",
      "Akar rambut",
      "Penyerapan air + mineral",
      "Pengangkutan ke atas melalui batang",
      "Daun",
      "Stoma",
      "Wap air ke persekitaran",
    ],
    crossSection: "Keratan rentas daun",
    pull: "Tarikan transpirasi",
    cooling: "Penyejatan menyejukkan tumbuhan",
    guards: "Sel pengawal",
    open: "Stoma terbuka",
    closed: "Stoma tertutup",
    gas: "Pertukaran gas",
    vapour: "Wap air",
    banana: "Daun pisang",
    normal: "Keadaan kurang panas",
    hot: "Keadaan panas",
    broad: "Daun terbuka luas",
    rolled: "Luas permukaan terdedah berkurang → kehilangan air berkurang",
  },
} as const;
const card = "min-w-0 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-4 sm:p-5";
function Svg({
  label,
  kind,
  children,
  viewBox = "0 0 360 300",
}: {
  label: string;
  kind: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      data-plant-diagram={kind}
      viewBox={viewBox}
      className="mx-auto w-full max-w-md"
      fill="none"
      fontFamily="Arial, sans-serif"
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
        <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6Z" fill={color} />
        </marker>
      </defs>
      <path d={d} stroke={color} strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${id})`} />
    </g>
  );
}
function NumberCue({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="13" fill="#083344" stroke="#67e8f9" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fill="#e0f2fe">
        {n}
      </text>
    </g>
  );
}
export function PlantWaterDiagram({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <Svg label={c.route.join(" → ")} kind="soil-root-stem-leaf" viewBox="0 0 360 410">
      <rect data-soil="true" x="12" y="270" width="336" height="126" rx="16" fill="#443c2d" />
      <path d="M12 271 H348" stroke="#a3a177" strokeWidth="3" />
      <g data-root-hairs="true" stroke="#e6d3a0" strokeLinecap="round">
        <path
          d="M180 269 V354 M180 302 L119 342 L87 364 M180 313 L234 346 L265 364 M180 334 L139 380 M180 345 L209 382"
          strokeWidth="7"
        />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} strokeWidth="2">
            <path d={`M${119 + i * 13} ${342 - i * 8} l-18 -7 m12 12 l-13 13`} />
            <path d={`M${234 - i * 12} ${346 - i * 8} l19 -6 m-12 12 l13 13`} />
          </g>
        ))}
      </g>
      <path
        data-stem="transport"
        d="M180 282 V96"
        stroke="#34d399"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <g data-leaf="true" fill="#15803d" stroke="#6ee7b7" strokeWidth="2">
        <path d="M180 190 Q80 197 54 103 Q151 92 180 190Z" />
        <path d="M182 136 Q203  40 302  50 Q291 146 182 136Z" />
        <path d="M181 108 Q120 57 172 16 Q221  60 181 108Z" />
      </g>
      <path d="M180 190 L83 123 M182 136 L271 71" stroke="#a7f3d0" strokeWidth="2" />
      <g data-root-uptake="water-and-minerals">
        <Arrow d="M 50 324 H120" />
        <Arrow d="M310 320 H242" />
        {[50, 305].map((x) => (
          <path key={x} d={`M${x} 283 q-16 23 0 23 q16 0 0 -23`} fill="#38bdf8" />
        ))}
      </g>
      <g data-transpiration-pull="upward">
        <Arrow d="M180 350 V297" />
        <Arrow d="M180 258 V210" />
        <Arrow d="M180 177 V142 Q216 114 250 100" />
      </g>
      <NumberCue x={35} y={380} n={1} />
      <NumberCue x={93} y={350} n={2} />
      <NumberCue x={291} y={343} n={3} />
      <NumberCue x={209} y={224} n={4} />
      <NumberCue x={305} y={103} n={5} />
    </Svg>
  );
}
function LeafDetail({ lang }: { lang: Lang }) {
  return (
    <Svg
      label={`${copy[lang].crossSection}: ${copy[lang].route.slice(4).join(" → ")}`}
      kind="leaf-stoma-vapour"
    >
      <g data-leaf-cross-section="true">
        <rect
          x="25"
          y=" 40"
          width="310"
          height="120"
          rx="20"
          fill="#14532d"
          stroke="#6ee7b7"
          strokeWidth="3"
        />
        {[45, 90, 135, 180, 225, 270].map((x) => (
          <rect key={x} x={x} y="54" width=" 30" height=" 40" rx="10" fill="#4d9668" />
        ))}
        {[65, 115, 210, 270].map((x) => (
          <ellipse key={x} cx={x} cy="124" rx=" 20" ry="14" fill="#4d9668" />
        ))}
        <rect data-stoma-route="true" x="164" y="145" width="32" height="22" fill="#061923" />
        <ellipse cx="150" cy="157" rx="15" ry="9" fill="#86efac" />
        <ellipse cx="210" cy="157" rx="15" ry="9" fill="#86efac" />
      </g>
      <g data-water-vapour="leaving-leaf">
        <Arrow d="M180 111 V194" />
        <Arrow d="M164 187 Q125 206 125 250" />
        <Arrow d="M195 187 Q230 208 230 250" />
      </g>
      <NumberCue x={30} y={20} n={5} />
      <NumberCue x={245} y={173} n={6} />
      <NumberCue x={180} y={267} n={7} />
    </Svg>
  );
}
// Shared outer outline; the inner edge flattens as the pore closes.
const guardCell = (open: boolean) =>
  `M156 60 C108 60 89 110 99 158 C106 199 133 218 156 200 C${open ? 130 : 156} 173 ${open ? 130 : 156} 91 156 60Z`;
export function StomaDiagram({ open, lang }: { open: boolean; lang: Lang }) {
  const c = copy[lang];
  return (
    <Svg
      label={`${open ? c.open : c.closed}: ${c.guards}`}
      kind={open ? "stoma-open" : "stoma-closed"}
    >
      <ellipse cx="180" cy="133" rx="143" ry="113" fill="#12352c" stroke="#276450" />
      <ellipse
        data-stoma-pore={open ? "open" : "closed"}
        cx="180"
        cy="133"
        rx={open ? 27 : 2}
        ry=" 60"
        fill="#020b14"
        stroke="#67e8f9"
        strokeWidth="2"
      />
      <g data-guard-cells="shared" fill="#34a871" stroke="#a7f3d0" strokeWidth="3">
        <path
          data-guard-cell="left"
          d={guardCell(open)}
          transform={`translate(${open ? 0 : 23} 0)`}
        />
        <path
          data-guard-cell="right"
          d={guardCell(open)}
          transform={`translate(${open ? 360 : 337} 0) scale(-1 1)`}
        />
      </g>
      {open && (
        <>
          <g data-stoma-vapour="escaping">
            <Arrow d="M171 114 V25" />
            <Arrow d="M190 139 Q232 124 246 57" />
          </g>
          <g data-stoma-gas-exchange="true">
            <Arrow d="M247 214 H198" color="#fbbf24" />
            <Arrow d="M185 231 H239" color="#fbbf24" />
          </g>
        </>
      )}
      <text x="180" y="282" textAnchor="middle" fill="#d1fae5" fontSize="16">
        {c.guards}
      </text>
    </Svg>
  );
}
export function BananaLeafDiagram({ rolled, lang }: { rolled: boolean; lang: Lang }) {
  return (
    <Svg
      label={rolled ? copy[lang].hot : copy[lang].normal}
      kind={rolled ? "banana-rolled" : "banana-broad"}
      viewBox="0 0 360 230"
    >
      <path d="M180 207 V27" stroke="#a3e635" strokeWidth="5" />
      <g
        data-exposed-leaf-area={rolled ? "reduced" : "broad"}
        transform={`translate(180 0) scale(${rolled ? 0.4 : 1} 1) translate(-180 0)`}
      >
        <path
          d="M180 17 C104 40 87 154 180 203 C273 154 256 40 180 17Z"
          fill="#15803d"
          stroke="#86efac"
          strokeWidth="3"
        />
        <path
          d="M180 25 V195 M180 75 L145 60 M180 112 L127 90 M180 149 L136 133 M180 75 L215 60 M180 112 L233 90 M180 149 L224 133"
          stroke="#6ee7b7"
          strokeWidth="2"
        />
      </g>
      {rolled && (
        <g data-rolled-inward="true" stroke="#a7f3d0" strokeWidth="4">
          <path d="M166  40 Q125 97 167 191 M194  40 Q235 97 193 191" />
          <Arrow d="M92 106 H132" color="#a7f3d0" />
          <Arrow d="M269 106 H228" color="#a7f3d0" />
        </g>
      )}
    </Svg>
  );
}
export function Chapter3PlantHomeostasis({
  content,
  lang,
}: {
  content: Chapter3Content;
  lang: Lang;
}) {
  const c = copy[lang];
  const plant = content.plantHomeostasis;
  return (
    <div data-plant-homeostasis="true" className="space-y-5">
      <div className={card}>
        <h4 className="font-bold text-emerald-200">{c.transpiration}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-300">{plant.transpirationDefinition}</p>
        <div className="mt-4 grid items-center gap-5 md:grid-cols-2">
          <figure>
            <PlantWaterDiagram lang={lang} />
            <figcaption className="text-center text-sm font-bold text-cyan-200">
              {c.pull}
            </figcaption>
          </figure>
          <figure>
            <h4 className="text-center text-sm font-bold text-emerald-200">{c.crossSection}</h4>
            <LeafDetail lang={lang} />
            <figcaption className="text-center text-sm font-bold text-emerald-200">
              {c.cooling}
            </figcaption>
          </figure>
        </div>
        <ol
          data-water-process="soil-root-stem-leaf-stoma-vapour"
          className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {c.route.map((text, i) => (
            <li
              key={text}
              className="flex items-start gap-2 rounded-xl bg-cyan-300/5 p-3 text-sm text-slate-200"
            >
              <span className="font-mono font-bold text-cyan-300">{i + 1}</span>
              <span>{text}</span>
              {i < 6 && (
                <span aria-hidden="true" className="ml-auto text-cyan-300">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
          {plant.transpirationFunctions.map((text) => (
            <li key={text} className="rounded-xl border border-emerald-300/15 p-3">
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-cyan-300/10 p-3 text-sm font-semibold leading-6 text-cyan-100">
          {plant.waterLossFact}
        </p>
      </div>
      <div data-stoma-comparison="true" className="grid gap-4 sm:grid-cols-2">
        {plant.stomaStates.map((state) => (
          <figure key={state.stomaState} className={card}>
            <h4 className="font-bold text-white">{state.condition}</h4>
            <p className="mt-1 text-sm text-emerald-200">
              {state.stomaState === "open" ? c.open : c.closed}
            </p>
            <StomaDiagram open={state.stomaState === "open"} lang={lang} />
            <figcaption className="text-sm leading-6 text-slate-300">{state.reason}</figcaption>
            {state.stomaState === "open" && (
              <p className="mt-2 text-xs text-cyan-200">
                {c.vapour} · <span className="text-amber-200">{c.gas}</span>
              </p>
            )}
          </figure>
        ))}
      </div>
      <div className={card}>
        <h4 className="font-bold text-emerald-200">{c.banana}</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[false, true].map((rolled) => (
            <figure key={String(rolled)}>
              <h5 className="text-center text-sm font-bold text-white">
                {rolled ? c.hot : c.normal}
              </h5>
              <BananaLeafDiagram rolled={rolled} lang={lang} />
              <figcaption className="text-center text-sm leading-6 text-emerald-200">
                {rolled ? c.rolled : c.broad}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{plant.bananaResponse}</p>
      </div>
    </div>
  );
}
export function Chapter3Importance({ content }: { content: Chapter3Content }) {
  const importance = content.importanceHomeostasis;
  return (
    <div data-homeostasis-importance="true" className="space-y-4">
      {[importance.process, importance.enzymeProcess].map((flow, index) => (
        <div
          key={index}
          data-importance-flow={index === 0 ? "metabolism" : "enzymes"}
          className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4"
        >
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((text, i) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-sm font-semibold leading-6 text-slate-100"
              >
                <span>{text}</span>
                {i < 3 && (
                  <span aria-hidden="true" className="ml-auto text-cyan-300">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {index === 0 ? importance.explanation : importance.enzymeExplanation}
          </p>
        </div>
      ))}
      <div data-homeostasis-reflection="true" className="grid gap-3 sm:grid-cols-2">
        {importance.reflection.map((question, i) => (
          <p
            key={question}
            className={`rounded-2xl border p-4 text-sm leading-6 ${i === 0 ? "border-amber-300/25 bg-amber-300/5 text-amber-100" : "border-cyan-300/25 bg-cyan-300/5 text-cyan-100"}`}
          >
            {question}
          </p>
        ))}
      </div>
    </div>
  );
}
