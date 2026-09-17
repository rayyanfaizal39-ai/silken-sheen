import { useState } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Arrow, Cell, Cue, Diagram, Sperm, panel, type Lang } from "./Chapter4Pass1Shared";
import { ReproductiveAnatomyDiagram } from "./Chapter4ReproductiveAnatomy";

// Labels and geometry only. Functions, process descriptions and stages are supplied by content.
const copy = {
  en: {
    fertilisation: "Fertilisation",
    implantation: "Implantation",
    sperm: "Sperm",
    ovum: "Ovum",
    zygote: "Zygote",
    division: "Repeated cell division",
    embryo: "Embryo",
    foetus: "Foetus",
    scale: "Schematic / not to scale",
    support: ["Placenta", "Umbilical cord", "Amnion", "Amniotic fluid", "Uterine wall"],
    mother: "Mother",
    oxygen: "Oxygen + nutrients",
    waste: "Carbon dioxide + waste",
    birth: [
      "Fully developed foetus",
      "Head at cervix",
      "Uterine contractions",
      "Amnion breaks / amniotic fluid released",
      "Baby exits through vagina",
    ],
    cells: ["2 cells", "Several cells"],
  },
  bm: {
    fertilisation: "Persenyawaan",
    implantation: "Implantasi",
    sperm: "Sperma",
    ovum: "Ovum",
    zygote: "Zigot",
    division: "Pembahagian sel berulang",
    embryo: "Embrio",
    foetus: "Fetus",
    scale: "Skematik / bukan mengikut skala",
    support: ["Plasenta", "Tali pusat", "Amnion", "Cecair amnion", "Dinding uterus"],
    mother: "Ibu",
    oxygen: "Oksigen + nutrien",
    waste: "Karbon dioksida + bahan buangan",
    birth: [
      "Fetus terbentuk sepenuhnya",
      "Kepala di serviks",
      "Pengecutan uterus",
      "Amnion pecah / cecair amnion terkeluar",
      "Bayi keluar melalui vagina",
    ],
    cells: ["2 sel", "Beberapa sel"],
  },
};
const supportKeys = [
  "placentaFunction",
  "umbilicalCordFunction",
  "amnionFunction",
  "amnioticFluidFunction",
  "uterineWallFunction",
] as const;

function EmbryoCells({ x, y, count }: { x: number; y: number; count: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="26" fill="#f9a8d420" stroke="#f9a8d4" strokeWidth="2" />
      {Array.from({ length: count }, (_, i) => {
        const a = (i * Math.PI * 2) / count;
        return (
          <circle
            key={i}
            cx={count === 1 ? 0 : Math.cos(a) * 12}
            cy={count === 1 ? 0 : Math.sin(a) * 12}
            r={count === 1 ? 14 : count === 2 ? 11 : 8}
            fill="#f9a8d4"
            stroke="#9f4268"
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
}
export function CellDivision({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const names = [`${c.sperm} + ${c.ovum}`, c.zygote, ...c.cells, c.embryo];
  return (
    <figure className={panel} data-cell-division="zygote-to-embryo">
      <figcaption className="text-sm font-bold text-cyan-200">
        {c.zygote} → {c.division} → {c.embryo}
      </figcaption>
      <ol className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {names.map((name, i) => (
          <li key={name} className="relative text-center">
            <Diagram label={name} kind={`division-${i}`} viewBox="0 0 110 85">
              {i === 0 ? (
                <>
                  <Sperm x={40} y={42} />
                  <Cell x={79} y={42} radius={20} color="#f9a8d4" />
                </>
              ) : (
                <EmbryoCells x={55} y={42} count={[0, 1, 2, 4, 8][i]} />
              )}
            </Diagram>
            <p className="text-xs text-slate-200">
              {i > 0 && (
                <span className="mr-1 text-cyan-300" aria-hidden="true">
                  →
                </span>
              )}
              {name}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-slate-400">{c.scale}</p>
    </figure>
  );
}
export function FertilisationPathway({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang],
    source = content.fertilisationAndPregnancy;
  return (
    <div className="space-y-4">
      <div className={`${panel} grid gap-4 md:grid-cols-2`}>
        <figure className="min-w-0">
          <div
            className="relative mx-auto w-full max-w-lg"
            data-fertilisation-site="fallopian-tube"
            data-implantation-site="uterine-wall"
          >
            <ReproductiveAnatomyDiagram content={content} lang={lang} sex="female" />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 360 350"
              fill="none"
              aria-label={`${c.fertilisation} → ${c.implantation}`}
              role="img"
              data-reproduction-diagram="fertilisation-route"
            >
              <Arrow d="M181 293 V202 Q169 169 151 128 Q133 94 102 99" />
              <g transform="rotate(-90 180 277)">
                <Sperm x={180} y={277} />
              </g>
              <circle cx="104" cy="99" r="9" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
              <Arrow d="M111 88 Q158 89 181 151" color="#fbbf24" />
              <g transform="translate(200 161) scale(0.35)">
                <EmbryoCells x={0} y={0} count={6} />
              </g>
            </svg>
          </div>
          <figcaption className="mt-2 space-y-2 text-xs text-slate-200">
            <p>
              <span className="text-amber-200">{c.fertilisation}</span> →{" "}
              {content.humanReproductiveSystem.femaleParts[0].part}
            </p>
            <p>
              <span className="text-rose-200">{c.implantation}</span> →{" "}
              {content.humanReproductiveSystem.femaleParts[2].part} / {c.support[4]}
            </p>
          </figcaption>
        </figure>
        <div className="self-center space-y-3 text-sm text-slate-300">
          {content.humanReproductiveSystem.femaleParts.map((part, i) => (
            <p key={part.part}>
              <span className="mr-2 font-bold text-cyan-200">{i + 1}</span>
              {part.part}
            </p>
          ))}
          <p className="border-t border-white/10 pt-3 text-xs text-slate-400">{c.scale}</p>
        </div>
        <ol
          className="grid gap-4 md:col-span-2 sm:grid-cols-2 lg:grid-cols-5"
          data-biological-pathway="canonical-order"
        >
          {source.process.map((step, i) => (
            <li key={step} className="min-w-0 border-t border-cyan-300/30 pt-3">
              <span className="text-sm font-bold text-cyan-300">
                {i + 1} {i < source.process.length - 1 ? "→" : ""}
              </span>
              <Diagram label={step} kind={`pregnancy-pathway-${i}`} viewBox="0 0 120 100">
                {i === 0 && (
                  <>
                    <path d="M45 12 V85 M75 12 V85" stroke="#f9a8d4" strokeWidth="8" />
                    <g transform="rotate(-90 60 65)">
                      <Sperm x={60} y={65} />
                    </g>
                    <Arrow d="M60 46 V17" />
                  </>
                )}
                {i === 1 && (
                  <>
                    <path
                      d="M8 15 Q63 0 110 29 M8 82 Q63 69 110 94"
                      stroke="#f9a8d4"
                      strokeWidth="5"
                    />
                    <Sperm x={42} y={49} />
                    <Cell x={80} y={49} radius={22} color="#fbbf24" />
                  </>
                )}
                {i === 2 && (
                  <>
                    <EmbryoCells x={30} y={48} count={1} />
                    <Arrow d="M58 48 H65" />
                    <EmbryoCells x={92} y={48} count={8} />
                  </>
                )}
                {i === 3 && (
                  <>
                    <path
                      d="M10 48 Q60 70 110 48 V92 H10Z"
                      fill="#9f4268"
                      stroke="#fb7185"
                      strokeWidth="8"
                    />
                    <EmbryoCells x={60} y={55} count={8} />
                  </>
                )}
                {i === 4 && (
                  <g transform="translate(-24 -45) scale(0.47)">
                    <FoetusShape />
                  </g>
                )}
              </Diagram>
              <p className="text-sm leading-6 text-slate-300">{step}</p>
            </li>
          ))}
        </ol>
      </div>
      <CellDivision lang={lang} />
      <figure className={`${panel} grid items-center gap-4 sm:grid-cols-2`}>
        <div>
          <figcaption className="font-bold text-rose-200">{c.implantation}</figcaption>
          <p className="mt-2 text-sm leading-6 text-slate-300">{source.process[3]}</p>
          <p className="mt-2 text-xs text-slate-400">{c.scale}</p>
        </div>
        <div>
          <Diagram
            label={`${c.embryo} — ${c.support[4]}`}
            kind="implantation"
            viewBox="0 0 360 180"
          >
            <path
              d="M20 30 Q180 90 340 30 V160 H20Z"
              fill="#9f4268"
              stroke="#f9a8d4"
              strokeWidth="3"
            />
            <path d="M20 30 Q180 90 340 30" stroke="#fb7185" strokeWidth="20" />
            <g data-embryo-embedded="uterine-lining">
              <EmbryoCells x={180} y={59} count={8} />
            </g>
            <Cue x={280} y={116} number={1} to={[250, 80]} />
            <Cue x={125} y={22} number={2} to={[165, 45]} />
          </Diagram>
          <p className="text-center text-xs text-slate-300">
            1 {c.support[4]} · 2 {c.embryo}
          </p>
        </div>
      </figure>
    </div>
  );
}

export function FoetusShape({ stage = 4 }: { stage?: number }) {
  return (
    <g
      data-development-shape={stage}
      transform={`translate(180 163) scale(${[0.48, 0.62, 0.77, 0.9, 1][stage]}) translate(-180 -163)`}
      fill="#f9a8d4"
      stroke="#9f4268"
      strokeWidth="3"
    >
      <path d="M177 140 C131 140 129 188 152 216 C174 241 214 210 207 187 C201 169 184 169 182 155Z" />
      <ellipse cx="171" cy="125" rx={stage < 2 ? 28 : 33} ry="32" />
      <path
        d="M173 169 Q211 151 212 176 L190 184 M164 206 Q186 239 214 221 L193 201"
        fill="none"
        stroke="#fbcfe8"
        strokeWidth={stage === 0 ? 7 : 12}
        strokeLinecap="round"
      />
      {stage === 0 && (
        <path d="M155 210 Q137 219 132 206" fill="none" stroke="#f9a8d4" strokeWidth="7" />
      )}
      {stage >= 1 && (
        <>
          <path d="M142 124 l-8 7 l9 3" />
          <path d="M184 125 q10 -6 8 8" fill="none" />
          <path d="M209 167 l5 -7 m-4 10 l9 -4 m-10 7 l10 1" fill="none" strokeWidth="2" />
        </>
      )}
    </g>
  );
}
export function PregnancyDiagram({ selected, lang }: { selected: number; lang: Lang }) {
  const c = copy[lang];
  const dim = (index: number) => (selected === index ? 1 : 0.55);
  return (
    <Diagram
      label={`${c.foetus}: ${c.support.join(", ")}`}
      kind="pregnancy-support"
      viewBox="0 0 360 330"
    >
      <g data-support="uterineWallFunction" data-highlighted={selected === 4} opacity={dim(4)}>
        <path
          d="M178 18 C37 13 17 226 138 274 L155 311 H205 L222 274 C343 226 323 13 178 18Z"
          fill="#9f4268"
          stroke="#f9a8d4"
          strokeWidth="7"
        />
      </g>
      <g data-support="amnioticFluidFunction" data-highlighted={selected === 3} opacity={dim(3)}>
        <ellipse cx="180" cy="151" rx="119" ry="119" fill="#164e63" />
        <path
          d="M87 155 q15 -9 30 0 M239 192 q15 -9 30 0 M97 224 q15 -9 30 0"
          stroke="#67e8f9"
          strokeWidth="2"
        />
      </g>
      <g data-support="amnionFunction" data-highlighted={selected === 2} opacity={dim(2)}>
        <ellipse
          cx="180"
          cy="151"
          rx="119"
          ry="119"
          stroke="#a5f3fc"
          strokeWidth={selected === 2 ? 6 : 3}
        />
      </g>
      <g data-support="placentaFunction" data-highlighted={selected === 0} opacity={dim(0)}>
        <path
          d="M71 70 Q31 151 77 224 L96 209 Q64 147 94 85Z"
          fill="#fb7185"
          stroke="#fecdd3"
          strokeWidth="3"
        />
      </g>
      <FoetusShape />
      <g data-support="umbilicalCordFunction" data-highlighted={selected === 1} opacity={dim(1)}>
        <path
          d="M198 185 C261 201 256 106 190 89 S115 165 82 151"
          stroke="#fda4af"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M198 185 C261 201 256 106 190 89 S115 165 82 151"
          stroke="#be123c"
          strokeWidth="2"
        />
      </g>
      <Cue x={25} y={102} number={1} to={[75, 115]} />
      <Cue x={310} y={87} number={2} to={[232, 111]} />
      <Cue x={307} y={244} number={3} to={[267, 231]} />
      <Cue x={259} y={288} number={4} to={[238, 235]} />
      <Cue x={31} y={266} number={5} to={[108, 263]} />
      <text x="183" y="252" textAnchor="middle" fill="#fff" fontSize="14">
        {c.foetus}
      </text>
    </Diagram>
  );
}
export function PregnancySupport({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const [selected, setSelected] = useState(0);
  const c = copy[lang];
  return (
    <div className={panel}>
      <div className="grid items-center gap-4 md:grid-cols-2">
        <PregnancyDiagram selected={selected} lang={lang} />
        <div>
          <div className="grid grid-cols-2 gap-2">
            {supportKeys.map((key, i) => (
              <button
                type="button"
                key={key}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                className={`min-h-12 rounded-xl border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${selected === i ? "border-rose-300 bg-rose-300/10 text-rose-100" : "border-white/15 text-slate-300"}`}
              >
                {i + 1}. {c.support[i]}
              </button>
            ))}
          </div>
          <p
            className="mt-4 text-sm leading-6 text-slate-200"
            aria-live="polite"
            data-canonical-function={supportKeys[selected]}
          >
            {content.fertilisationAndPregnancy[supportKeys[selected]]}
          </p>
          <p className="mt-3 text-xs text-slate-400">{c.scale}</p>
        </div>
      </div>
      <div
        className="mt-4 rounded-xl border border-cyan-300/20 p-3 text-center"
        data-placental-exchange="separate-maternal-foetal-sides"
      >
        <div className="grid grid-cols-3 gap-2 text-sm font-bold">
          <span className="text-rose-200">{c.mother}</span>
          <span className="text-rose-200">{c.support[0]}</span>
          <span className="text-cyan-200">{c.foetus}</span>
        </div>
        <p className="mt-2 text-xs text-cyan-200">{c.oxygen} → →</p>
        <p className="mt-2 text-xs text-amber-200">← ← {c.waste}</p>
      </div>
    </div>
  );
}
export function FoetalTimeline({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <div className={panel}>
      <p className="font-bold text-rose-200">
        {c.zygote} → {c.embryo} → {c.foetus}
      </p>
      <p className="mt-2 text-xs text-slate-400">{c.scale}</p>
      <ol
        className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        data-foetal-timeline="source-stages"
      >
        {content.fertilisationAndPregnancy.foetalDevelopment.map((stage, i) => (
          <li key={stage.weeks} className="min-w-0 border-t-2 border-rose-300/40 pt-3">
            <p className="text-sm font-bold text-rose-200">{stage.weeks}</p>
            <Diagram label={stage.weeks} kind={`foetal-stage-${i}`} viewBox="100 75 150 175">
              <g transform={i === 4 ? "rotate(180 180 163)" : undefined}>
                <FoetusShape stage={i} />
              </g>
            </Diagram>
            <p className="text-xs font-bold text-cyan-200">{i < 2 ? c.embryo : c.foetus}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{stage.description}</p>
          </li>
        ))}
      </ol>
      <ol
        className="mt-5 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-5"
        data-birth-process="schematic"
      >
        {c.birth.map((step, i) => (
          <li key={step} className="min-w-0 text-xs leading-5 text-slate-300">
            <Diagram label={step} kind={`birth-${i}`} viewBox="0 0 120 110">
              <path
                d="M58 10 C12 8 13 70 45 83 L48 103 M62 10 C108 8 107 70 75 83 L72 103"
                stroke="#f9a8d4"
                strokeWidth="6"
              />
              {i < 4 && (
                <g transform="translate(-6 0) scale(0.37)">
                  <g transform="rotate(180 180 163)">
                    <FoetusShape />
                  </g>
                </g>
              )}
              {i === 2 && (
                <>
                  <Arrow d="M5 40 H23" />
                  <Arrow d="M115 40 H97" />
                </>
              )}
              {i === 3 && (
                <>
                  <ellipse
                    cx="60"
                    cy="45"
                    rx="32"
                    ry="34"
                    stroke="#67e8f9"
                    strokeWidth="2"
                    strokeDasharray="12 7"
                  />
                  <path d="M55 91 l-3 6 h6Z M64 101 l-3 6 h6Z" fill="#67e8f9" />
                </>
              )}
              {i === 4 && (
                <>
                  <circle cx="61" cy="87" r="10" fill="#f9a8d4" />
                  <Arrow d="M60 24 V66" />
                </>
              )}
            </Diagram>
            <span className="mr-2 font-bold text-cyan-300">{i + 1} →</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
export function Chapter4PregnancyVisuals(props: { content: Chapter4Content; lang: Lang }) {
  return (
    <div className="space-y-4" data-pass2="fertilisation-pregnancy">
      <FertilisationPathway {...props} />
      <PregnancySupport {...props} />
      <FoetalTimeline {...props} />
    </div>
  );
}
