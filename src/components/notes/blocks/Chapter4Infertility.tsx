import { useState } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Arrow, Cell, Diagram, Sperm, panel, type Lang } from "./Chapter4Pass1Shared";
import { ReproductiveAnatomyDiagram } from "./Chapter4ReproductiveAnatomy";

const copy = {
  en: {
    male: "Male",
    female: "Female",
    factors: "Factors",
    treatments: "Treatments",
    contraception: "Contraception methods",
    screening: "Health screening",
    outside: "Fertilisation outside the body — glass dish",
    embryo: "Embryo",
    sperm: "Sperm",
    ovum: "Ovum",
    hormones: "Hormones",
    ovulation: "Ovulation",
    implantation: "Implantation",
    scale: "Schematic / not to scale",
  },
  bm: {
    male: "Lelaki",
    female: "Perempuan",
    factors: "Faktor",
    treatments: "Rawatan",
    contraception: "Kaedah kontraseptif",
    screening: "Saringan kesihatan",
    outside: "Persenyawaan di luar badan — piring kaca",
    embryo: "Embrio",
    sperm: "Sperma",
    ovum: "Ovum",
    hormones: "Hormon",
    ovulation: "Ovulasi",
    implantation: "Implantasi",
    scale: "Skematik / bukan mengikut skala",
  },
};
// Positional mappings are presentation associations to the approved anatomy, not new factors.
const factorOrgans = {
  male: [5, null, null, null, null, null],
  female: [1, 0, 2, 2, null, null],
} as const;
export function InfertilityFactors({
  content,
  lang,
  sex,
}: {
  content: Chapter4Content;
  lang: Lang;
  sex: "male" | "female";
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const factors =
    sex === "male" ? content.infertility.maleFactors : content.infertility.femaleFactors;
  const parts =
    sex === "male"
      ? content.humanReproductiveSystem.maleParts
      : content.humanReproductiveSystem.femaleParts;
  const organ = selected === null ? null : (factorOrgans[sex][selected] ?? null);
  const c = copy[lang];
  return (
    <div data-infertility-factors={sex} className="min-w-0">
      <h3 className="font-bold text-rose-200">
        {c[sex]} · {c.factors}
      </h3>
      <div className="mx-auto max-w-[250px]">
        <ReproductiveAnatomyDiagram content={content} lang={lang} sex={sex} selected={organ} />
      </div>
      <ul className="mt-3 divide-y divide-white/10">
        {factors.map((factor, i) => {
          const target = factorOrgans[sex][i] ?? null;
          return (
            <li key={factor} className="py-2 text-sm leading-6 text-slate-300">
              {target === null ? (
                factor
              ) : (
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                  className="w-full rounded-lg p-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                >
                  <span className={selected === i ? "text-cyan-100" : "text-slate-300"}>
                    {factor}
                  </span>
                  <span className="mt-1 block text-xs text-cyan-300">
                    {target + 1}. {parts[target].part}
                  </span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function Embryo({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="21" stroke="#f9a8d4" strokeWidth="2" fill="#512d4c" />
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={i}
          cx={Math.cos((i * Math.PI) / 3) * 10}
          cy={Math.sin((i * Math.PI) / 3) * 10}
          r="7"
          fill="#f9a8d4"
          stroke="#9f4268"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}
export function IVFPathway({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <figure
      className="mt-4 border-t border-cyan-300/20 pt-4"
      data-ivf-pathway="outside-body-to-uterus"
    >
      <div className="grid items-center gap-4 sm:grid-cols-3">
        <div data-ivf-stage="outside-body">
          <Diagram label={c.outside} kind="ivf-glass-dish" viewBox="0 0 240 170">
            <ellipse
              cx="120"
              cy="100"
              rx="95"
              ry="46"
              fill="#164e6322"
              stroke="#67e8f9"
              strokeWidth="3"
            />
            <path d="M25 100 V122 C25 180 215 180 215 122 V100" stroke="#67e8f9" strokeWidth="3" />
            <Sperm x={84} y={96} />
            <Cell x={144} y={98} radius={26} color="#f9a8d4" />
            <Arrow d="M104 96 H111" />
          </Diagram>
          <p className="text-center text-sm font-bold text-cyan-200">
            {c.sperm} + {c.ovum}
          </p>
          <p className="mt-1 text-center text-xs leading-5 text-slate-300">{c.outside}</p>
        </div>
        <div data-ivf-stage="embryo">
          <Diagram label={c.embryo} kind="ivf-embryo" viewBox="0 0 240 170">
            <Arrow d="M10 84 H65" />
            <Embryo x={120} y={84} />
            <Arrow d="M171 84 H227" />
          </Diagram>
          <p className="text-center text-sm font-bold text-rose-200">→ {c.embryo} →</p>
        </div>
        <div data-ivf-stage="uterus">
          <div className="relative mx-auto max-w-[250px]">
            <ReproductiveAnatomyDiagram content={content} lang={lang} sex="female" selected={2} />
            <svg
              viewBox="0 0 360 350"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
              data-reproduction-diagram="ivf-uterus-placement"
            >
              <g transform="translate(193 153) scale(.5)">
                <Embryo x={0} y={0} />
              </g>
              <Arrow d="M263 184 L214 160" />
            </svg>
          </div>
          <p className="text-center text-sm font-bold text-rose-200">
            {content.humanReproductiveSystem.femaleParts[2].part}
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-slate-400">{c.scale}</figcaption>
    </figure>
  );
}
function TreatmentCue({ index, label }: { index: number; label: string }) {
  return (
    <Diagram label={label} kind={`infertility-treatment-${index}`} viewBox="0 0 180 85">
      {index === 0 ? (
        <>
          <circle cx="32" cy="40" r="15" fill="#c084fc" />
          <circle cx="57" cy="25" r="7" fill="#c084fc" />
          <Arrow d="M67 43 H114" />
          <circle cx="144" cy="43" r="23" stroke="#6ee7b7" strokeWidth="3" />
          <circle cx="144" cy="43" r="8" fill="#6ee7b7" />
        </>
      ) : index === 1 ? (
        <>
          <path
            d="M12 32 H68 M12 54 H68 M117 32 H171 M117 54 H171"
            stroke="#f9a8d4"
            strokeWidth="5"
          />
          <path d="M42 24 V62" stroke="#fbbf24" strokeWidth="8" />
          <Arrow d="M78 43 H106" />
          <Arrow d="M128 43 H162" color="#6ee7b7" />
        </>
      ) : (
        <>
          <ellipse cx="57" cy="46" rx="39" ry="20" stroke="#67e8f9" strokeWidth="3" />
          <Sperm x={40} y={43} />
          <Cell x={70} y={43} radius={12} color="#f9a8d4" />
          <Arrow d="M109 46 H129" />
          <g transform="translate(157 46) scale(.85)">
            <Embryo x={0} y={0} />
          </g>
        </>
      )}
    </Diagram>
  );
}
export function InfertilityTreatments({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <section className={panel}>
      <h3 className="font-bold text-emerald-200">{c.treatments}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {content.infertility.treatments.map((item, i) => (
          <div
            key={item.name}
            data-infertility-treatment={i}
            className="min-w-0 border-t-2 border-emerald-300/30 pt-3"
          >
            <h4 className="text-sm font-bold text-emerald-100">{item.name}</h4>
            <TreatmentCue index={i} label={item.name} />
            <p className="text-sm leading-6 text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
      <IVFPathway content={content} lang={lang} />
    </section>
  );
}
function StopMark({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#fbbf24" strokeWidth="4">
      <circle r="14" fill="#071923" />
      <path d="M-10 10 L10 -10" />
    </g>
  );
}
function CutTies({ x, y }: { x: number; y: number }) {
  return (
    <g data-cut-tied="true">
      <path d={`M${x} ${y - 9} V${y + 9}`} stroke="#071923" strokeWidth="17" />
      <path
        d={`M${x - 8} ${y - 10} L${x + 8} ${y - 6} M${x + 8} ${y - 10} L${x - 8} ${y - 6} M${x - 8} ${y + 6} L${x + 8} ${y + 10} M${x + 8} ${y + 6} L${x - 8} ${y + 10}`}
        stroke="#fbbf24"
        strokeWidth="3"
      />
    </g>
  );
}
export function PermanentContraception({
  content,
  lang,
  sex,
}: {
  content: Chapter4Content;
  lang: Lang;
  sex: "male" | "female";
}) {
  const selected = sex === "male" ? 2 : 0;
  const part = (
    sex === "male"
      ? content.humanReproductiveSystem.maleParts
      : content.humanReproductiveSystem.femaleParts
  )[selected];
  return (
    <figure data-permanent-contraception={sex}>
      <div className="relative mx-auto max-w-sm">
        <ReproductiveAnatomyDiagram content={content} lang={lang} sex={sex} selected={selected} />
        <svg
          viewBox="0 0 360 350"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          data-reproduction-diagram={`cut-tied-${sex}`}
        >
          {sex === "male" ? (
            <>
              <CutTies x={106} y={190} />
              <CutTies x={254} y={190} />
              <Arrow d="M118 235 L109 213" />
              <Arrow d="M242 235 L251 213" />
            </>
          ) : (
            <>
              <g transform="rotate(-68 125 98)">
                <CutTies x={125} y={98} />
              </g>
              <g transform="rotate(68 235 98)">
                <CutTies x={235} y={98} />
              </g>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm font-bold text-amber-200">
        {selected + 1}. {part.part}
      </figcaption>
    </figure>
  );
}
export function ContraceptionDiagram({
  content,
  lang,
  index,
}: {
  content: Chapter4Content;
  lang: Lang;
  index: number;
}) {
  const c = copy[lang],
    item = content.infertility.contraceptionMethods[index];
  if (index < 0 || index > 5) return null;
  if (index === 4 || index === 5)
    return (
      <PermanentContraception content={content} lang={lang} sex={index === 4 ? "male" : "female"} />
    );
  if (index === 3)
    return (
      <figure>
        <div className="relative mx-auto max-w-sm" data-iucd-location="uterus">
          <ReproductiveAnatomyDiagram content={content} lang={lang} sex="female" selected={2} />
          <svg
            viewBox="0 0 360 350"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
            data-reproduction-diagram="iucd"
          >
            <path
              d="M167 132 H193 M180 132 V171"
              stroke="#67e8f9"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <g transform="translate(208 170) scale(.4)">
              <Embryo x={0} y={0} />
            </g>
            <StopMark x={224} y={190} />
          </svg>
        </div>
        <figcaption className="mt-2 text-center text-sm text-amber-200">
          {c.implantation}
        </figcaption>
      </figure>
    );
  if (index === 2)
    return (
      <Diagram label={item.description} kind="condom-barrier" viewBox="0 0 360 230">
        <path
          d="M25 65 H146 Q204 65 204 115 Q204 165 146 165 H25"
          fill="#512d4c"
          stroke="#f9a8d4"
          strokeWidth="3"
        />
        <path
          data-barrier="condom"
          d="M27 57 H146 Q214 57 214 115 Q214 173 146 173 H27"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="6"
        />
        <path d="M270 63 V173 M308 63 V173" stroke="#f9a8d4" strokeWidth="8" />
        <Sperm x={174} y={115} />
        <StopMark x={228} y={115} />
        <text x="95" y="210" textAnchor="middle" fill="#cbd5e1" fontSize="14">
          {content.humanReproductiveSystem.maleParts[3].part}
        </text>
        <text x="286" y="210" textAnchor="middle" fill="#cbd5e1" fontSize="14">
          {content.humanReproductiveSystem.femaleParts[4].part}
        </text>
      </Diagram>
    );
  return (
    <figure>
      <Diagram
        label={item.description}
        kind={index === 0 ? "pill-prevents-ovulation" : "implant-prevents-ovulation"}
        viewBox="0 0 360 210"
      >
        {index === 0 ? (
          <>
            <rect
              x="20"
              y="54"
              width="76"
              height="102"
              rx="12"
              fill="#164e63"
              stroke="#67e8f9"
              strokeWidth="3"
            />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle
                key={i}
                cx={41 + (i % 2) * 34}
                cy={76 + Math.floor(i / 2) * 29}
                r="9"
                fill="#f9a8d4"
              />
            ))}
          </>
        ) : (
          <>
            <path
              d="M12 50 Q63 33 103 52 L122 148 Q62 183 22 151Z"
              fill="#512d4c"
              stroke="#f9a8d4"
              strokeWidth="3"
            />
            <path d="M42 72 L51 122" stroke="#67e8f9" strokeWidth="7" strokeLinecap="round" />
            <circle cx="77" cy="91" r="5" fill="#c084fc" />
            <circle cx="91" cy="103" r="4" fill="#c084fc" />
            <circle cx="106" cy="97" r="3" fill="#c084fc" />
          </>
        )}
        <Arrow d="M126 108 H177" />
        <ellipse cx="223" cy="112" rx="28" ry="18" fill="#fbbf24" />
        <path d="M221 74 Q270 34 329 63" stroke="#f9a8d4" strokeWidth="7" fill="none" />
        <circle data-ovum-retained="true" cx="223" cy="112" r="8" fill="#fef3c7" />
        <Arrow d="M245 100 L256 88" color="#fbbf24" />
        <StopMark x={265} y={77} />
        <text x="258" y="175" fill="#fbbf24" textAnchor="middle" fontSize="14">
          {c.ovulation}
        </text>
        {index === 1 && (
          <text x="63" y="191" textAnchor="middle" fill="#d8b4fe" fontSize="14">
            {c.hormones}
          </text>
        )}
      </Diagram>
    </figure>
  );
}
export function ContraceptionSelector({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const [selected, setSelected] = useState(0);
  const c = copy[lang],
    methods = content.infertility.contraceptionMethods;
  // Both axes come from canonical classifications; no second method/classification dataset.
  const durations = [...new Set(methods.map((method) => method.classification.split(" - ")[0]))];
  const sexes = [...new Set(methods.map((method) => method.classification.split(" - ")[1]))];
  const item = methods[selected];
  return (
    <section className={panel} data-contraception-comparison="canonical-classifications">
      <h3 className="font-bold text-rose-200">{c.contraception}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {durations.map((duration) => (
          <div key={duration} className="min-w-0 rounded-xl border border-amber-200/20 p-3">
            <h4 className="text-sm font-bold text-amber-200">{duration}</h4>
            {sexes.map((sex) => (
              <div
                key={sex}
                data-classification={`${duration} - ${sex}`}
                className="mt-3 border-t border-white/10 pt-3"
              >
                <p className="text-xs font-bold capitalize text-slate-300">{sex}</p>
                <div className="mt-2 flex flex-col gap-2">
                  {methods.map(
                    (method, i) =>
                      method.classification === `${duration} - ${sex}` && (
                        <button
                          key={method.name}
                          type="button"
                          onClick={() => setSelected(i)}
                          aria-pressed={selected === i}
                          className={`min-h-11 break-words rounded-lg border p-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${selected === i ? "border-cyan-300 bg-cyan-300/10 text-cyan-100" : "border-white/10 text-slate-200"}`}
                        >
                          {method.name}
                        </button>
                      ),
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 grid items-center gap-4 md:grid-cols-2" data-selected-method={selected}>
        <ContraceptionDiagram content={content} lang={lang} index={selected} />
        <div aria-live="polite">
          <h4 className="font-bold text-rose-100">{item.name}</h4>
          <p className="mt-2 text-sm font-bold text-amber-200">{item.classification}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
          <p className="mt-3 text-xs text-slate-400">{c.scale}</p>
        </div>
      </div>
    </section>
  );
}
export function Chapter4Infertility({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <div className="space-y-4" data-pass3="infertility">
      <section className={panel}>
        <p className="text-sm leading-6 text-slate-300">{content.infertility.definition}</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <InfertilityFactors content={content} lang={lang} sex="male" />
          <InfertilityFactors content={content} lang={lang} sex="female" />
        </div>
      </section>
      <InfertilityTreatments content={content} lang={lang} />
      <ContraceptionSelector content={content} lang={lang} />
      <section className={panel}>
        <h3 className="font-bold text-emerald-200">{c.screening}</h3>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2" data-health-screening="canonical">
          <>
            {content.infertility.healthScreeningImportance.map((text, i) => (
              <li key={text} className="flex gap-3 text-sm leading-6 text-slate-300">
                <span aria-hidden="true" className="font-bold text-emerald-300">
                  {i === 0 ? "⌕" : i === 1 ? "→" : "✓"}
                </span>
                {text}
              </li>
            ))}
          </>
        </ol>
      </section>
    </div>
  );
}
