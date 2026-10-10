import { Fragment } from "react";
import { MathIndexText } from "./MathIndexText";
import {
  describeMathIndicesVisual,
  type MathIndicesVisual as IndicesData,
} from "@/features/quiz/visuals/mathIndicesVisual";
import {
  textFor,
  type MathVisualLang,
} from "@/features/quiz/visuals/mathQuestionVisual";

const COLORS = ["#c4b5fd", "#fcd34d", "#7dd3fc", "#86efac"];

export function MathIndicesVisual({
  visual,
  lang,
}: {
  visual: IndicesData;
  lang: MathVisualLang;
}) {
  const expression = (text: string) => (
    <MathIndexText text={text} lang={lang} />
  );
  let body;
  switch (visual.kind) {
    case "index-notation":
      body = (
        <svg viewBox="0 0 320 138" className="w-full" aria-hidden="true">
          <rect
            x="103"
            y="22"
            width="72"
            height="83"
            rx="16"
            fill="#8b5cf6"
            fillOpacity=".15"
            stroke="#a78bfa"
          />
          <rect
            x="181"
            y="9"
            width="42"
            height="46"
            rx="10"
            fill="#fbbf24"
            fillOpacity=".15"
            stroke="#fbbf24"
          />
          <text x="139" y="84" textAnchor="middle" fontSize="58" fill="#ddd6fe">
            {visual.base}
          </text>
          <text x="202" y="43" textAnchor="middle" fontSize="30" fill="#fcd34d">
            {visual.exponent}
          </text>
        </svg>
      );
      break;
    case "factor-groups": {
      const bases = [
        ...new Set(
          visual.rows
            .flatMap((row) => row.groups.flat())
            .map((factor) => factor.split("^")[0]),
        ),
      ];
      const group = (factors: string[], index: number) => (
        <div
          key={index}
          className="flex flex-wrap items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.03] p-2"
        >
          {factors.map((factor, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="text-xs text-slate-400">×</span>}
              <span
                className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-lg bg-white/[0.06] px-2 py-1 font-semibold"
                style={{
                  color:
                    COLORS[bases.indexOf(factor.split("^")[0]) % COLORS.length],
                }}
              >
                {expression(factor)}
              </span>
            </Fragment>
          ))}
        </div>
      );
      body = (
        <div className="space-y-3" aria-hidden="true">
          {visual.rows.map((row, index) => (
            <div key={index}>
              {row.label && (
                <p className="mb-1.5 text-center text-sm text-slate-300">
                  {expression(textFor(row.label, lang))}
                </p>
              )}
              {row.operation === "quotient" ? (
                <div className="mx-auto flex w-fit max-w-full flex-col gap-2 text-sm">
                  {group(row.groups[0], 0)}
                  <div className="h-px bg-white/50" />
                  {group(row.groups[1], 1)}
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  {row.groups.map((factors, i) => (
                    <Fragment key={i}>
                      {i > 0 && <span className="text-slate-400">×</span>}
                      {group(factors, i)}
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
      break;
    }
    case "index-equations":
      body = (
        <div className="space-y-2" aria-hidden="true">
          {visual.rows.map((row, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
            >
              {row.label && (
                <p className="mb-1 text-center text-xs text-slate-400">
                  {textFor(row.label, lang)}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base font-semibold text-violet-100">
                <span>{expression(row.left)}</span>
                <span className="text-amber-300">=</span>
                <span>{expression(row.right)}</span>
              </div>
            </div>
          ))}
        </div>
      );
      break;
    case "geometry-model":
      body = (
        <div className="flex flex-wrap items-start justify-center gap-3" aria-hidden="true">
          {visual.models.map((model, index) => (
            <div key={index} className="w-full max-w-[222px] rounded-xl border border-white/10 bg-white/[0.03] p-2">
              {model.label && (
                <p className="mb-1 text-center text-xs font-medium text-slate-300">
                  {textFor(model.label, lang)}
                </p>
              )}
              <svg viewBox="0 0 220 178" className="h-auto w-full" aria-hidden="true">
                {model.shape === "square" ? (
                  <>
                    <rect x="53" y="16" width="114" height="114" rx="2"
                      fill="#8b5cf6" fillOpacity=".23" stroke="#c4b5fd" strokeWidth="2" />
                    {model.area && <text x="110" y="80" textAnchor="middle" fontSize="14" fill="#fcd34d">
                      {lang === "bm" ? "Luas" : "Area"} = {model.area}
                    </text>}
                    {model.side && <text x="110" y="155" textAnchor="middle" fontSize="14" fill="#e2e8f0">
                      {lang === "bm" ? "Sisi" : "Side"} = {model.side}
                    </text>}
                  </>
                ) : model.shape === "rectangle" ? (
                  <>
                    <rect x="36" y="31" width="163" height="88" rx="2"
                      fill="#38bdf8" fillOpacity=".20" stroke="#7dd3fc" strokeWidth="2" />
                    {model.area && <text x="117" y="79" textAnchor="middle" fontSize="14" fill="#fcd34d">
                      {lang === "bm" ? "Luas" : "Area"} = {model.area}
                    </text>}
                    {model.width && <text x="117" y="145" textAnchor="middle" fontSize="14" fill="#e2e8f0">{model.width}</text>}
                    {model.height && <text x="18" y="74" textAnchor="middle" fontSize="12" fill="#e2e8f0"
                      transform="rotate(-90 18 74)">{model.height}</text>}
                  </>
                ) : (
                  <>
                    <polygon points="52,52 150,52 150,149 52,149"
                      fill="#8b5cf6" fillOpacity=".34" stroke="#c4b5fd" strokeWidth="1.7" />
                    <polygon points="52,52 96,19 194,19 150,52"
                      fill="#38bdf8" fillOpacity=".28" stroke="#7dd3fc" strokeWidth="1.7" />
                    <polygon points="150,52 194,19 194,116 150,149"
                      fill="#fbbf24" fillOpacity=".26" stroke="#fcd34d" strokeWidth="1.7" />
                    {model.volume && <text x="102" y="102" textAnchor="middle" fontSize="13" fill="#fff">
                      {lang === "bm" ? "Isipadu" : "Volume"} = {model.volume}
                    </text>}
                    {model.side && <text x="118" y="169" textAnchor="middle" fontSize="14" fill="#e2e8f0">
                      {lang === "bm" ? "Sisi" : "Side"} = {model.side}
                    </text>}
                  </>
                )}
              </svg>
            </div>
          ))}
        </div>
      );
      break;
    case "unit-cube": {
      const n = visual.divisions;
      body = (
        <svg viewBox="0 0 320 235" className="w-full" aria-hidden="true">
          <polygon
            points="78,76 173,76 173,171 78,171"
            fill="#8b5cf6"
            fillOpacity=".35"
            stroke="#c4b5fd"
          />
          <polygon
            points="78,76 126,37 221,37 173,76"
            fill="#7dd3fc"
            fillOpacity=".25"
            stroke="#7dd3fc"
          />
          <polygon
            points="173,76 221,37 221,132 173,171"
            fill="#fbbf24"
            fillOpacity=".25"
            stroke="#fcd34d"
          />
          {Array.from({ length: n - 1 }, (_, i) => {
            const t = (i + 1) / n;
            return (
              <g key={i} stroke="rgba(255,255,255,.6)">
                <line x1={78 + 95 * t} y1="76" x2={78 + 95 * t} y2="171" />
                <line x1="78" y1={76 + 95 * t} x2="173" y2={76 + 95 * t} />
                <line x1={78 + 95 * t} y1="76" x2={126 + 95 * t} y2="37" />
                <line
                  x1={78 + 48 * t}
                  y1={76 - 39 * t}
                  x2={173 + 48 * t}
                  y2={76 - 39 * t}
                />
                <line
                  x1={173 + 48 * t}
                  y1={76 - 39 * t}
                  x2={173 + 48 * t}
                  y2={171 - 39 * t}
                />
                <line x1="173" y1={76 + 95 * t} x2="221" y2={37 + 95 * t} />
              </g>
            );
          })}
          <text
            x="125"
            y="191"
            fill="#fcd34d"
            fontSize="19"
            textAnchor="middle"
          >
            {visual.edge}
          </text>
          <text
            x="160"
            y="221"
            fill="#cbd5e1"
            fontSize="13"
            textAnchor="middle"
          >
            {visual.volume} {lang === "bm" ? "kubus unit" : "unit cubes"}
          </text>
        </svg>
      );
      break;
    }
    case "fraction-area": {
      const n = visual.divisions;
      const cell = 144 / n;
      body = (
        <svg viewBox="0 0 320 218" className="w-full" aria-hidden="true">
          {Array.from({ length: n * n }, (_, i) => {
            const row = Math.floor(i / n),
              col = i % n;
            return (
              <rect
                key={i}
                x={100 + col * cell}
                y={25 + row * cell}
                width={cell}
                height={cell}
                fill={
                  row < visual.shadedRows && col < visual.shadedColumns
                    ? "#a78bfa"
                    : "#1e293b"
                }
                stroke="#64748b"
              />
            );
          })}
          <path
            d={`M 100 17 h ${cell * visual.shadedColumns}`}
            stroke="#fcd34d"
            strokeWidth="2"
          />
          <path
            d={`M 91 25 v ${cell * visual.shadedRows}`}
            stroke="#fcd34d"
            strokeWidth="2"
          />
          <text
            x={100 + (cell * visual.shadedColumns) / 2}
            y="12"
            textAnchor="middle"
            fill="#fcd34d"
            fontSize="12"
          >
            {visual.side}
          </text>
          <text
            x="65"
            y={29 + (cell * visual.shadedRows) / 2}
            textAnchor="middle"
            fill="#fcd34d"
            fontSize="12"
          >
            {visual.side}
          </text>
          <text
            x="172"
            y="193"
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="12"
          >
            {lang === "bm" ? "Segi empat sama unit" : "Unit square"}
          </text>
        </svg>
      );
      break;
    }
  }
  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathIndicesVisual(visual, lang)}
      className="mx-auto w-full max-w-[360px] rounded-2xl border border-violet-400/20 bg-slate-950/40 p-3 sm:p-4"
    >
      <figcaption className="mb-2 text-center text-xs font-semibold text-slate-400">
        {expression(visual.title[lang])}
      </figcaption>
      {body}
    </figure>
  );
}
