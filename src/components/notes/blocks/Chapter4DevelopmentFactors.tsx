import type { CSSProperties } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Arrow, Diagram, panel, type Lang } from "./Chapter4Pass1Shared";
import { FoetusShape } from "./Chapter4PregnancyVisuals";

// Presentation labels only; nutrient, exposure and benefit text is supplied by content.
const copy = {
  en: {
    nutrients: "Nutrients during pregnancy",
    harmful: "Substances to avoid",
    breastfeeding: "Why breastfeeding helps",
    mother: "Mother",
    baby: "Baby",
  },
  bm: {
    nutrients: "Nutrien semasa mengandung",
    harmful: "Bahan yang perlu dielakkan",
    breastfeeding: "Mengapa penyusuan susu ibu membantu",
    mother: "Ibu",
    baby: "Bayi",
  },
};
export function MaternalNutritionDiagram({ label, count }: { label: string; count: number }) {
  return (
    <Diagram label={label} kind="maternal-nutrition" viewBox="0 0 300 330">
      <circle cx="140" cy="41" r="26" fill="#f9a8d4" />
      <path
        d="M116 72 Q79 78 89 148 L76 293 H208 L200 246 Q247 179 211 127 Q198 103 172 104 L166 75Z"
        fill="#512d4c"
        stroke="#f9a8d4"
        strokeWidth="3"
      />
      <ellipse cx="176" cy="186" rx="54" ry="64" fill="#083344" stroke="#6ee7b7" strokeWidth="2" />
      <g transform="translate(65 77) scale(0.62)">
        <FoetusShape stage={3} />
      </g>
      <path
        d="M99 109 Q87 187 137 204"
        fill="none"
        stroke="#f9a8d4"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {Array.from({ length: count }, (_, i) => {
        const left = i < Math.ceil(count / 2);
        const row = left ? i : i - Math.ceil(count / 2);
        const y = 100 + row * 55;
        return (
          <g key={i} data-nutrient-link={i}>
            <circle cx={left ? 18 : 281} cy={y} r="12" fill="#064e3b" stroke="#6ee7b7" />
            <text x={left ? 18 : 281} y={y + 4} fill="#d1fae5" fontSize="12" textAnchor="middle">
              {i + 1}
            </text>
            <Arrow d={left ? `M35 ${y} H66` : `M265 ${y} H238`} color="#6ee7b7" />
          </g>
        );
      })}
    </Diagram>
  );
}
function ExposureCue({ index }: { index: number }) {
  return (
    <g stroke="#fbbf24" strokeWidth="3" fill="none">
      {index === 0 ? (
        <>
          <path d="M12 43 H61 V56 H12Z M47 43 V56 M64 39 Q77 32 67 25 Q60 17 71 10" />
          <path d="M12 43 H24 V56 H12Z" fill="#fbbf24" />
        </>
      ) : index === 1 ? (
        <>
          <path d="M22 10 H57 L54 37 Q40 61 25 37Z M40 48 V69 M27 69 H53 M25 30 H54" />
        </>
      ) : (
        <>
          <path d="M25 18 C12 19 10 32 19 41 L44 66 C57 78 73 60 61 48 L37 23Z M31 41 L47 28" />
          <path d="M25 18 C12 19 10 32 19 41 L31 53 L48 36 L37 23Z" fill="#fbbf2425" />
        </>
      )}
    </g>
  );
}
function BenefitCue({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9 shrink-0 text-emerald-200"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      data-benefit-cue={index}
    >
      {index === 0 ? (
        <>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="10" />
          <path d="M9 10 V38 M39 10 V38" />
        </>
      ) : index === 1 ? (
        <>
          <path d="M24 5 L40 12 V24 Q38 35 24 43 Q10 35 8 24 V12Z" />
          <path d="M16 24 l6 6 l12 -14" />
        </>
      ) : index === 2 ? (
        <path d="M24 39 L8 23 C-2 8 18 2 24 15 C30 2 50 8 40 23Z" />
      ) : (
        <path d="M22 6 V19 C37 6 45 23 35 36 C30 44 11 41 10 30 Q10 22 17 25 Q25 27 16 12 V6" />
      )}
    </svg>
  );
}
export function Chapter4DevelopmentFactors({
  content,
  lang,
}: {
  content: Chapter4Content;
  lang: Lang;
}) {
  const c = copy[lang],
    source = content.foetalDevelopmentFactors;
  const split = Math.ceil(source.nutrientNeeds.length / 2);
  return (
    <div className="space-y-4" data-pass3="development-factors">
      <section className={panel}>
        <h3 className="font-bold text-emerald-200">{c.nutrients}</h3>
        <div className="mt-4 grid items-center gap-x-5 gap-y-3 lg:grid-cols-[1fr_.85fr_1fr]">
          <figure className="mx-auto w-full max-w-xs lg:col-start-2 lg:row-start-1 lg:row-span-4">
            <MaternalNutritionDiagram label={c.nutrients} count={source.nutrientNeeds.length} />
          </figure>
          {source.nutrientNeeds.map((item, i) => (
            <div
              key={item.nutrient}
              data-nutrient={i}
              className="min-w-0 border-l-2 border-emerald-300/30 pl-3 lg:col-start-[var(--nutrient-column)] lg:row-start-[var(--nutrient-row)]"
              style={
                {
                  "--nutrient-column": i < split ? 1 : 3,
                  "--nutrient-row": i < split ? i + 1 : i - split + 1,
                } as CSSProperties
              }
            >
              <h4 className="text-sm font-bold text-emerald-100">
                <span className="mr-2 text-emerald-300">{i + 1}</span>
                {item.nutrient}
              </h4>
              <p className="mt-1 text-sm text-rose-200">→ {item.examples}</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">→ {item.fn}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={panel}>
        <h3 className="font-bold text-amber-200">{c.harmful}</h3>
        <div className="mt-4 divide-y divide-amber-200/15">
          {source.harmfulSubstances.map((item, i) => (
            <div
              key={item.substance}
              data-exposure={i}
              className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr]"
            >
              <div className="flex items-center gap-3">
                <svg
                  role="img"
                  aria-label={item.substance}
                  viewBox="0 0 82 82"
                  className="h-14 w-14 shrink-0"
                  data-reproduction-diagram={`exposure-${i}`}
                >
                  <ExposureCue index={i} />
                </svg>
                <h4 className="text-sm font-bold text-amber-100">
                  {item.substance}
                  <span aria-hidden="true" className="ml-2 text-amber-300">
                    →
                  </span>
                </h4>
              </div>
              <ul className="space-y-1 border-l-2 border-amber-300/30 pl-4 text-sm leading-6 text-slate-300">
                {item.effects.map((effect) => (
                  <li key={effect}>{effect}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className={panel}>
        <h3 className="font-bold text-emerald-200">{c.breastfeeding}</h3>
        <div className="mt-4 grid items-center gap-4 md:grid-cols-[.8fr_1.2fr]">
          <figure>
            <Diagram
              label={`${c.mother} → ${c.baby}`}
              kind="breastfeeding-support"
              viewBox="0 0 300 190"
            >
              <circle cx="92" cy="35" r="24" fill="#f9a8d4" />
              <path
                d="M65 69 Q41 107 53 167 H150 L130 75Z"
                fill="#512d4c"
                stroke="#f9a8d4"
                strokeWidth="3"
              />
              <ellipse cx="155" cy="111" rx="20" ry="22" fill="#f9a8d4" />
              <path
                d="M148 128 Q179 111 207 143 Q189 177 144 152Z"
                fill="#164e63"
                stroke="#67e8f9"
                strokeWidth="3"
              />
              <path
                d="M64 96 Q54 161 145 152 M122 91 Q130 129 159 133"
                stroke="#f9a8d4"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <Arrow d="M148 59 Q190 60 199 100" color="#6ee7b7" />
              <text x="48" y="185" fill="#fce7f3" fontSize="13">
                {c.mother}
              </text>
              <text x="203" y="185" fill="#a7f3d0" fontSize="13">
                {c.baby}
              </text>
            </Diagram>
          </figure>
          <ul className="grid gap-4 sm:grid-cols-2">
            {source.breastfeedingBenefits.map((benefit, i) => (
              <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <BenefitCue index={i} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
