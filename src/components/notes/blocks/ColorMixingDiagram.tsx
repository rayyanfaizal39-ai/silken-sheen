import type { ColorMix } from "@/content/form1/science/chapter-8/chapter8-content";

type Lang = "en" | "bm";

const LABELS: Record<Lang, { white: string; whiteLightIn: string; absorbedBy: string; reflectedLine1: string; reflectedLine2: string; otherExamples: string }> = {
  en: { white: "White", whiteLightIn: "White light", absorbedBy: "absorbed by the object", reflectedLine1: "reflected —", reflectedLine2: "what you see", otherExamples: "Also true for" },
  bm: { white: "Putih", whiteLightIn: "Cahaya putih", absorbedBy: "diserap oleh objek", reflectedLine1: "dipantulkan —", reflectedLine2: "yang anda lihat", otherExamples: "Turut berlaku untuk" },
};

function AdditionCircles({ lang, additionFormula, allThreeMixed }: { lang: Lang; additionFormula: ColorMix[]; allThreeMixed: string }) {
  const t = LABELS[lang];
  return (
    <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
      <svg viewBox="0 0 220 200" className="mx-auto w-full max-w-[200px]">
        <circle cx="90" cy="80" r="55" fill="#ff0000" opacity="0.65" />
        <circle cx="140" cy="80" r="55" fill="#00cc44" opacity="0.65" />
        <circle cx="115" cy="130" r="55" fill="#3366ff" opacity="0.65" />
        <text x="115" y="80" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">
          {t.white}
        </text>
      </svg>
      <ul className="mt-3 flex flex-col gap-1 text-left">
        {additionFormula.map((mix) => (
          <li key={`${mix.color1}-${mix.color2}`} className="text-[11.5px] text-muted-foreground">
            <span className="font-semibold text-foreground">
              {mix.color1} + {mix.color2}
            </span>{" "}
            = {mix.result}
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-[11.5px] font-semibold text-foreground">{allThreeMixed}</p>
    </div>
  );
}

function SubtractionLightPath({
  lang,
  example,
  otherExamples,
}: {
  lang: Lang;
  example: { object: string; reflects: string; absorbs: string };
  otherExamples: { object: string; reflects: string; absorbs: string }[];
}) {
  const t = LABELS[lang];
  return (
    <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
      <svg viewBox="0 0 300 220" className="mx-auto w-full max-w-[260px]">
        <circle cx="30" cy="60" r="14" className="fill-foreground" />
        <line x1="44" y1="65" x2="120" y2="105" className="stroke-foreground" strokeWidth="2.5" />
        <text x="30" y="35" fontSize="10" textAnchor="middle" className="fill-foreground">
          {t.whiteLightIn}
        </text>

        <path
          d="M110 100 Q160 90 190 120 Q170 150 130 145 Q100 135 110 100 Z"
          className="fill-amber-300 stroke-amber-500"
          strokeWidth="2"
          opacity="0.85"
        />
        <text x="150" y="122" fontSize="11" fontWeight="700" textAnchor="middle" fill="#1b2044">
          {example.object}
        </text>

        <circle cx="120" cy="90" r="3" className="fill-red-400" opacity="0.5" />
        <circle cx="128" cy="82" r="3" className="fill-primary" opacity="0.5" />
        <circle cx="136" cy="88" r="3" className="fill-emerald-400" opacity="0.5" />
        <text x="128" y="65" fontSize="9" textAnchor="middle" className="fill-muted-foreground">
          {example.absorbs}
        </text>
        <text x="128" y="76" fontSize="9" textAnchor="middle" className="fill-muted-foreground">
          {t.absorbedBy}
        </text>

        <line x1="180" y1="115" x2="230" y2="80" className="stroke-amber-400" strokeWidth="3" />
        <text x="240" y="68" fontSize="20" textAnchor="middle">
          👁️
        </text>
        <text x="295" y="93" fontSize="10.5" fontWeight="700" textAnchor="end" className="fill-amber-400">
          {example.reflects}
        </text>
        <text x="295" y="106" fontSize="9" textAnchor="end" className="fill-muted-foreground">
          {t.reflectedLine1}
        </text>
        <text x="295" y="117" fontSize="9" textAnchor="end" className="fill-muted-foreground">
          {t.reflectedLine2}
        </text>
      </svg>
      {otherExamples.length > 0 && (
        <p className="mt-3 text-left text-[11px] text-muted-foreground">
          <b className="text-foreground">{t.otherExamples}:</b>{" "}
          {otherExamples.map((ex) => `${ex.object} (${ex.reflects})`).join(" · ")}
        </p>
      )}
    </div>
  );
}

export function ColorMixingDiagram({
  lang,
  additionFormula,
  allThreeMixed,
  subtractionExamples,
}: {
  lang: Lang;
  additionFormula: ColorMix[];
  allThreeMixed: string;
  subtractionExamples: { object: string; reflects: string; absorbs: string }[];
}) {
  const [primaryExample, ...otherExamples] = subtractionExamples;
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <AdditionCircles lang={lang} additionFormula={additionFormula} allThreeMixed={allThreeMixed} />
      <SubtractionLightPath lang={lang} example={primaryExample} otherExamples={otherExamples} />
    </div>
  );
}
