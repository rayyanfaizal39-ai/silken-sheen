import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Diagram, Arrow, Cell, Sperm, panel, type Lang } from "./Chapter4Pass1Shared";
const copy = {
  en: {
    sexual: "Sexual reproduction",
    asexual: "Asexual reproduction",
    male: "Male parent",
    female: "Female parent",
    sperm: "Sperm",
    ovum: "Ovum",
    fusion: "Fertilisation",
    one: "One parent",
    process: "Asexual process",
    noFusion: "No gamete fusion · No fertilisation",
    variation: "Offspring with variation",
    clones: "Genetically identical offspring",
    internal: "Internal fertilisation",
    external: "External fertilisation",
    inside: "Inside the female body",
    water: "Outside the female body · Water",
    examples: "Examples",
  },
  bm: {
    sexual: "Pembiakan seks",
    asexual: "Pembiakan aseks",
    male: "Induk jantan",
    female: "Induk betina",
    sperm: "Sperma",
    ovum: "Ovum",
    fusion: "Persenyawaan",
    one: "Satu induk",
    process: "Proses aseks",
    noFusion: "Tiada percantuman gamet · Tiada persenyawaan",
    variation: "Anak dengan variasi",
    clones: "Anak yang serupa secara genetik",
    internal: "Persenyawaan dalam",
    external: "Persenyawaan luar",
    inside: "Di dalam badan induk betina",
    water: "Di luar badan induk betina · Air",
    examples: "Contoh",
  },
} as const;
function Text({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill="#e2e8f0" fontSize="13">
      {children}
    </text>
  );
}
function Parent({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth="3">
      <circle cy="-11" r="10" fill={color} fillOpacity=".2" />
      <path d="M-18 27 V14 Q0 -1 18 14 V27" />
    </g>
  );
}
export function ReproductionFlow({ sexual, lang }: { sexual: boolean; lang: Lang }) {
  const c = copy[lang];
  return (
    <Diagram
      label={sexual ? c.sexual : c.asexual}
      kind={sexual ? "sexual-flow" : "asexual-flow"}
      viewBox="0 0 360 355"
    >
      {sexual ? (
        <>
          <Parent x={90} y={35} color="#67e8f9" />
          <Parent x={270} y={35} color="#f9a8d4" />
          <Text x={90} y={85}>
            {c.male}
          </Text>
          <Text x={270} y={85}>
            {c.female}
          </Text>
          <Arrow d="M90 95 V118" />
          <Arrow d="M270 95 V118" />
          <g data-gamete="sperm">
            <Sperm x={75} y={137} />
          </g>
          <g data-gamete="ovum">
            <Cell x={270} y={137} color="#f9a8d4" radius={17} />
          </g>
          <Text x={90} y={172}>
            {c.sperm}
          </Text>
          <Text x={270} y={172}>
            {c.ovum}
          </Text>
          <g data-fertilisation="fusion">
            <Arrow d="M105 184 L161 220" />
            <Arrow d="M255 184 L199 220" />
            <Cell x={180} y={230} color="#c4b5fd" radius={21} />
          </g>
          <Text x={180} y={270}>
            {c.fusion}
          </Text>
          <Arrow d="M180 279 V302" />
          <g data-offspring="variation">
            {["#67e8f9", "#c4b5fd", "#f9a8d4"].map((color, i) => (
              <Cell key={color} x={135 + i * 45} y={328} color={color} radius={14} />
            ))}
          </g>
        </>
      ) : (
        <>
          <Parent x={180} y={35} color="#6ee7b7" />
          <Text x={180} y={85}>
            {c.one}
          </Text>
          <Arrow d="M180 96 V134" />
          <Cell x={180} y={162} color="#6ee7b7" radius={25} />
          <Text x={180} y={216}>
            {c.process}
          </Text>
          <Arrow d="M180 230 V282" />
          <g data-offspring="clones">
            {[135, 180, 225].map((x) => (
              <Cell key={x} x={x} y={328} color="#6ee7b7" radius={14} />
            ))}
          </g>
        </>
      )}
    </Diagram>
  );
}
function Dragonfly({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#e9d5ff" strokeWidth="3">
      <ellipse
        cx="-22"
        cy="-5"
        rx="25"
        ry="9"
        transform="rotate(-25 -22 -5)"
        fill="#c4b5fd"
        fillOpacity=".25"
      />
      <ellipse
        cx="22"
        cy="-5"
        rx="25"
        ry="9"
        transform="rotate(25 22 -5)"
        fill="#c4b5fd"
        fillOpacity=".25"
      />
      <ellipse
        cx="-22"
        cy="15"
        rx="25"
        ry="8"
        transform="rotate(-15 -22 15)"
        fill="#c4b5fd"
        fillOpacity=".25"
      />
      <ellipse
        cx="22"
        cy="15"
        rx="25"
        ry="8"
        transform="rotate(15 22 15)"
        fill="#c4b5fd"
        fillOpacity=".25"
      />
      <path d="M0 -25 V65" strokeWidth="7" />
      <circle cy="-28" r="9" fill="#a78bfa" />
    </g>
  );
}
function Fish({ x, y, mirror = false }: { x: number; y: number; mirror?: boolean }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${mirror ? -1 : 1} 1)`}
      stroke="#bae6fd"
      strokeWidth="2"
    >
      <path d="M-28 0 Q0 -27 31 0 Q0 27 -28 0 L-45 -19 V19Z" fill="#0e7490" />
      <circle cx="19" cy="-4" r="3" fill="#e0f2fe" />
    </g>
  );
}
export function FertilisationDiagram({ internal, lang }: { internal: boolean; lang: Lang }) {
  const c = copy[lang];
  return (
    <Diagram
      label={internal ? c.internal : c.external}
      kind={internal ? "fertilisation-internal" : "fertilisation-external"}
      viewBox="0 0 360 250"
    >
      {internal ? (
        <>
          <Dragonfly x={80} y={65} />
          <path d="M91 124 L143 164" stroke="#94a3b8" strokeDasharray="4 4" />
          <rect
            data-female-body-boundary="true"
            x="145"
            y="42"
            width="195"
            height="161"
            rx="28"
            fill="#4a2045"
            stroke="#f9a8d4"
            strokeWidth="2"
          />
          <Sperm x={102} y={148} />
          <Arrow d="M145 148 H235" />
          <Cell x={279} y={148} color="#f9a8d4" radius={24} />
          <Text x={240} y={82}>
            {c.fusion}
          </Text>
        </>
      ) : (
        <>
          <rect
            data-water-environment="true"
            x="15"
            y="30"
            width="330"
            height="182"
            rx="20"
            fill="#083344"
            stroke="#67e8f9"
          />
          <Fish x={78} y={77} />
          <Fish x={282} y={77} mirror />
          <Arrow d="M85 101 L123 143" />
          <Arrow d="M280 103 L255 140" />
          <Sperm x={121} y={166} />
          <Arrow d="M180 166 H221" />
          <Cell x={251} y={165} color="#f9a8d4" radius={20} />
        </>
      )}
    </Diagram>
  );
}
export function AsexualProcessDiagram({ index, label }: { index: number; label: string }) {
  return (
    <Diagram label={label} kind={`asexual-${index}`} viewBox="0 0 360 150">
      {index === 0 && (
        <>
          <Cell x={45} y={75} />
          <Arrow d="M76 75 H119" />
          <path
            data-dividing-cell="true"
            d="M157 49 C126 29 111 88 145 99 Q166 106 179 93 Q196 112 219 98 C251 83 227 29 200 49 Q179 62 157 49Z"
            fill="#164e63"
            stroke="#67e8f9"
            strokeWidth="2"
          />
          <circle cx="151" cy="75" r="7" fill="#67e8f9" />
          <circle cx="210" cy="75" r="7" fill="#67e8f9" />
          <Arrow d="M242 75 H279" />
          <Cell x={315} y={46} radius={19} />
          <Cell x={315} y={104} radius={19} />
        </>
      )}
      {index === 1 && (
        <>
          <Cell x={35} y={82} radius={22} />
          <Arrow d="M65 82 H86" />
          <Cell x={119} y={82} radius={22} />
          <Cell x={137} y={61} radius={9} />
          <Arrow d="M151 82 H180" />
          <Cell x={212} y={82} radius={22} />
          <Cell x={235} y={59} radius={15} />
          <Arrow d="M248 82 H272" />
          <Cell x={306} y={85} radius={22} />
          <Cell x={329} y={40} radius={15} />
        </>
      )}
      {index === 2 && (
        <>
          <path
            data-fragment="true"
            d="M34 89 L53 47 Q80 45 95 67 L65 112Z"
            fill="#a78bfa"
            stroke="#ddd6fe"
            strokeWidth="2"
          />
          <Arrow d="M111 79 H189" />
          <path
            data-new-organism="true"
            d="M248 26 Q290 50 300 99 Q276 135 251 106 Q220 73 248 26Z"
            fill="#a78bfa"
            stroke="#ddd6fe"
            strokeWidth="2"
          />
          <circle cx="247" cy="48" r="3" fill="#0f172a" />
          <circle cx="261" cy="48" r="3" fill="#0f172a" />
        </>
      )}
      {index === 3 && (
        <>
          <g data-sporangium="true">
            <path d="M50 123 V57" stroke="#86efac" strokeWidth="4" />
            <circle cx="50" cy="42" r="23" fill="#a78bfa" stroke="#ddd6fe" />
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={40 + i * 7} cy={38 + (i % 2) * 9} r="3" fill="#e9d5ff" />
            ))}
          </g>
          <Arrow d="M82 60 H147" />
          <g data-released-spores="true" fill="#e9d5ff">
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={168 + i * 12} cy={45 + (i % 3) * 24} r="4" />
            ))}
          </g>
          <Arrow d="M229 80 H270" />
          <path d="M290 128 V95 M321 128 V82" stroke="#86efac" strokeWidth="4" />
          <circle cx="290" cy="84" r="13" fill="#a78bfa" />
          <circle cx="321" cy="68" r="17" fill="#a78bfa" />
        </>
      )}
      {index === 4 && (
        <>
          <path
            data-parent-plant-part="tuber"
            d="M24 91 Q31 50 73 64 Q111 73 88 104 Q41 127 24 91Z"
            fill="#a87f54"
            stroke="#fde68a"
            strokeWidth="2"
          />
          <circle cx="59" cy="77" r="4" fill="#365314" />
          <Arrow d="M116 86 H204" />
          <path
            d="M245 100 Q236 68 275 72 Q313 78 300 107 Q268 130 245 100Z"
            fill="#a87f54"
            stroke="#fde68a"
          />
          <path
            d="M274 80 V23 M271 100 L247 135 M278 104 L304 135"
            stroke="#86efac"
            strokeWidth="3"
          />
          <path
            d="M274 52 Q233 50 238 27 Q266 25 274 52 M274 38 Q286 13 310 25 Q307 47 274 38"
            fill="#15803d"
            stroke="#86efac"
          />
        </>
      )}
    </Diagram>
  );
}
export function Chapter4ReproductionVisuals({
  content,
  lang,
}: {
  content: Chapter4Content;
  lang: Lang;
}) {
  const c = copy[lang];
  return (
    <div data-reproduction-basics="true" className="space-y-5">
      <p className="text-sm leading-6 text-slate-300">{content.reproductionBasics.definition}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {(["sexual", "asexual"] as const).map((kind) => {
          const sexual = kind === "sexual",
            item = content.reproductionBasics[kind];
          return (
            <figure key={kind} className={panel}>
              <h3 className="text-lg font-bold text-white">{c[kind]}</h3>
              <ReproductionFlow sexual={sexual} lang={lang} />
              <figcaption className="space-y-2 text-sm leading-6 text-slate-300">
                <p className="font-bold text-cyan-200">{sexual ? c.variation : c.clones}</p>
                <p>{item.involves}</p>
                {!sexual && <p>{c.noFusion}</p>}
                <p>{item.variation}</p>
                <p className="text-xs">{item.occursIn.join(" · ")}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(["internal", "external"] as const).map((kind) => (
          <figure key={kind} className={panel}>
            <h3 className="font-bold text-white">{c[kind]}</h3>
            <FertilisationDiagram internal={kind === "internal"} lang={lang} />
            <figcaption className="space-y-2 text-sm leading-6 text-slate-300">
              <p className="font-bold text-cyan-200">{kind === "internal" ? c.inside : c.water}</p>
              {content.reproductionBasics.fertilisationTypes[kind].map((text) => (
                <p key={text}>{text}</p>
              ))}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {content.asexualTypes.map((type, index) => (
          <figure key={type.name} className={panel}>
            <h3 className="font-bold text-white">{type.name}</h3>
            <AsexualProcessDiagram index={index} label={type.name} />
            <figcaption className="text-sm leading-6 text-slate-300">
              {type.description}
              <p className="mt-2 text-xs text-cyan-200">
                {c.examples}: {type.examples.join(", ")}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <section data-reproduction-importance="true" className={panel}>
        <h3 className="font-bold text-amber-200">{content.reproductionImportance.title}</h3>
        <Diagram
          label={content.reproductionImportance.title}
          kind="reproduction-continuity"
          viewBox="0 0 360 95"
        >
          <Cell x={35} y={45} radius={13} />
          <Arrow d="M57 45 H112" />
          {[140, 174].map((x) => (
            <Cell key={x} x={x} y={45} radius={13} />
          ))}
          <Arrow d="M198 45 H246" />
          {[270, 305, 340].map((x) => (
            <Cell key={x} x={x} y={45} radius={13} />
          ))}
        </Diagram>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {content.reproductionImportance.benefits.map((text, i) => (
            <li key={text} className="rounded-xl bg-cyan-300/5 p-3 text-sm leading-6 text-cyan-100">
              {text}
              {i < 2 && (
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <Diagram
          label={content.reproductionImportance.failure.join(" → ")}
          kind="reproduction-extinction"
          viewBox="0 0 360 95"
        >
          {[25, 55, 85].map((x) => (
            <Cell key={x} x={x} y={45} radius={11} color="#fda4af" />
          ))}
          <Arrow d="M109 45 H161" color="#fda4af" />
          <Cell x={190} y={45} radius={11} color="#fda4af" />
          <Arrow d="M215 45 H273" color="#fda4af" />
          <g data-extinction="no-individuals" stroke="#94a3b8" strokeWidth="2">
            <circle cx="310" cy="45" r="18" strokeDasharray="4 4" />
            <path d="M297 58 L323 32" />
          </g>
        </Diagram>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {content.reproductionImportance.failure.map((text, i) => (
            <li key={text} className="rounded-xl bg-rose-300/5 p-3 text-sm leading-6 text-rose-100">
              {text}
              {i < 2 && (
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
