import { type ReactNode } from "react";
import { MathIndexText } from "./MathIndexText";
import {
  describeMathStandardFormVisual,
  placeValueCells,
  type MathStandardFormVisual as VisualData,
} from "@/features/quiz/visuals/mathStandardFormVisual";
import {
  textFor,
  type MathVisualLang,
} from "@/features/quiz/visuals/mathQuestionVisual";

const COLORS = ["#c4b5fd", "#7dd3fc", "#fcd34d"];
const Schematic = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 320 220"
    className="mx-auto w-full max-w-[300px]"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const Label = ({
  x,
  y,
  children,
  color = COLORS[0],
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
}) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fill={color}
    fontSize="16"
    fontWeight="600"
  >
    {children}
  </text>
);

export function MathStandardFormVisual({
  visual,
  lang,
}: {
  visual: VisualData;
  lang: MathVisualLang;
}) {
  const bm = lang === "bm";
  const math = (text: string) => <MathIndexText text={text} lang={lang} />;
  const term = (data: { coefficient: string; exponent: string }) => (
    <div className="flex flex-wrap items-center justify-center gap-2 text-xl font-semibold">
      <span className="rounded-lg bg-violet-400/15 px-2.5 py-2 text-violet-200">
        {data.coefficient}
      </span>
      <span className="text-sm text-slate-400">×</span>
      <span className="rounded-lg bg-amber-400/10 px-2.5 py-2 text-amber-200">
        {math(`10^(${data.exponent})`)}
      </span>
    </div>
  );
  let body;
  switch (visual.kind) {
    case "place-value": {
      const cells = placeValueCells(visual.value);
      body = (
        <>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: cells
                .map((c) => (c.digit === "." ? "0.4fr" : "1fr"))
                .join(" "),
            }}
          >
            {cells.map((cell, i) => (
              <div key={i} className="min-w-0 text-center">
                <div
                  className={
                    cell.digit === "."
                      ? "py-2 text-xl font-semibold text-slate-300"
                      : "rounded-lg border border-violet-300/20 bg-violet-400/10 py-2 text-xl font-semibold text-violet-100"
                  }
                >
                  {cell.digit}
                </div>
                {cell.exponent !== undefined && (
                  <div className="mt-1 text-xs text-slate-400">
                    {math(`10^(${cell.exponent})`)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            {bm ? "Nilai tempat" : "Place value"}
          </p>
          {visual.task && (
            <p className="mt-3 text-center text-sm text-amber-200">
              {math(visual.task[lang])}
            </p>
          )}
        </>
      );
      break;
    }
    case "standard-form-parts":
      body = term(visual);
      break;
    case "standard-form-operation":
      body = (
        <div className="space-y-2">
          {term(visual.terms[0])}
          <div className="text-center text-xl text-slate-300">
            {visual.operation}
          </div>
          {term(visual.terms[1])}
          <div className="pt-1 text-center text-lg text-slate-400">= ?</div>
        </div>
      );
      break;
    case "right-triangle":
      body = (
        <>
          <Schematic>
            <path
              d="M 90 24 V 184 H 210 Z"
              fill="#8b5cf6"
              fillOpacity=".12"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <path d="M 90 24 V 184" stroke={COLORS[0]} strokeWidth="3" />
            <path d="M 90 184 H 210" stroke={COLORS[1]} strokeWidth="3" />
            <path
              d="M 90 168 H 106 V 184"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <Label x={90} y={16}>
              P
            </Label>
            <Label x={75} y={204}>
              Q
            </Label>
            <Label x={225} y={196}>
              R
            </Label>
            <Label x={60} y={108}>
              PQ
            </Label>
            <Label x={151} y={205} color={COLORS[1]}>
              QR
            </Label>
            {visual.pr && (
              <Label x={177} y={96} color={COLORS[2]}>
                PR
              </Label>
            )}
          </Schematic>
          <dl className="flex flex-wrap justify-center gap-2 text-sm">
            {[
              ["PQ", visual.pq],
              ["QR", visual.qr],
              ...(visual.pr ? [["PR", visual.pr]] : []),
            ].map(([label, value], i) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 px-2 py-1.5"
                style={{ color: COLORS[i] }}
              >
                <dt className="inline">{label} = </dt>
                <dd className="inline">{math(value)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            {bm
              ? "Sudut tegak di Q · Rajah tidak mengikut skala"
              : "Right angle at Q · Diagram not to scale"}
          </p>
        </>
      );
      break;
    case "measurement-model": {
      let drawing;
      switch (visual.shape) {
        case "cuboid":
          drawing = (
            <>
              <polygon
                points="60,85 214,85 214,163 60,163"
                fill="#8b5cf6"
                fillOpacity=".15"
                stroke={COLORS[0]}
              />
              <polygon
                points="60,85 106,48 260,48 214,85"
                fill="#38bdf8"
                fillOpacity=".15"
                stroke={COLORS[1]}
              />
              <polygon
                points="214,85 260,48 260,126 214,163"
                fill="#fbbf24"
                fillOpacity=".1"
                stroke={COLORS[2]}
              />
              <path
                d="M 60 178 H 214 M 60 172 V 184 M 214 172 V 184"
                stroke={COLORS[0]}
              />
              <path d="M 219 175 L 271 133" stroke={COLORS[1]} />
              <path
                d="M 281 48 V 126 M 276 48 H 286 M 276 126 H 286"
                stroke={COLORS[2]}
              />
              <Label x={137} y={199}>
                {visual.dimensions[0].symbol}
              </Label>
              <Label x={257} y={179} color={COLORS[1]}>
                {visual.dimensions[1].symbol}
              </Label>
              <Label x={300} y={93} color={COLORS[2]}>
                {visual.dimensions[2].symbol}
              </Label>
            </>
          );
          break;
        case "sphere":
          drawing = (
            <>
              <circle
                cx="160"
                cy="102"
                r="76"
                fill="#38bdf8"
                fillOpacity=".12"
                stroke={COLORS[1]}
                strokeWidth="2"
              />
              <ellipse
                cx="160"
                cy="102"
                rx="76"
                ry="22"
                fill="none"
                stroke={COLORS[1]}
                strokeOpacity=".4"
              />
              <ellipse
                cx="160"
                cy="102"
                rx="30"
                ry="76"
                fill="none"
                stroke={COLORS[1]}
                strokeOpacity=".4"
              />
              <path
                d="M 84 102 H 236 M 92 97 L 84 102 L 92 107 M 228 97 L 236 102 L 228 107"
                fill="none"
                stroke={COLORS[0]}
                strokeWidth="2"
              />
              <circle cx="160" cy="102" r="3" fill="#e2e8f0" />
              <Label x={160} y={91}>
                {visual.dimensions[0].symbol}
              </Label>
            </>
          );
          break;
        case "rectangle": {
          const aspect = visual.aspect ?? 1;
          const width = Math.min(150, 150 * aspect),
            height = width / aspect,
            left = 160 - width / 2;
          drawing = (
            <>
              <rect
                x={left}
                y="24"
                width={width}
                height={height}
                rx="3"
                fill="#8b5cf6"
                fillOpacity=".12"
                stroke={COLORS[0]}
                strokeWidth="2"
              />
              <path d={`M ${left - 12} 24 v ${height}`} stroke={COLORS[0]} />
              <path
                d={`M ${left} ${height + 38} h ${width}`}
                stroke={COLORS[1]}
              />
              <Label x={left - 25} y={height / 2 + 30}>
                {visual.dimensions[0].symbol}
              </Label>
              <Label x={160} y={height + 58} color={COLORS[1]}>
                {visual.dimensions[1].symbol}
              </Label>
            </>
          );
          break;
        }
        case "paper-stack":
          drawing = (
            <>
              {Array.from({ length: 6 }, (_, i) => (
                <polygon
                  key={i}
                  points={`70,${92 + i * 9} 126,${54 + i * 9} 250,${54 + i * 9} 194,${92 + i * 9}`}
                  fill="#1e293b"
                  stroke={COLORS[1]}
                  strokeWidth="1.5"
                />
              )).reverse()}
              <path
                d="M 60 92 V 101 M 55 92 H 65 M 55 101 H 65"
                stroke={COLORS[0]}
                strokeWidth="2"
              />
              <Label x={42} y={102}>
                {visual.dimensions[0].symbol}
              </Label>
            </>
          );
          break;
      }
      body = (
        <>
          <Schematic>{drawing}</Schematic>
          <dl className="space-y-2 text-sm">
            {visual.dimensions.map((d, i) => (
              <div
                key={d.symbol}
                className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 rounded-lg border border-white/10 px-2.5 py-2"
              >
                <dt className="text-xs text-slate-400">
                  {d.label[lang]} ({d.symbol})
                </dt>
                <dd
                  className="font-semibold"
                  style={{ color: COLORS[i % COLORS.length] }}
                >
                  {math(d.value)}
                </dd>
              </div>
            ))}
          </dl>
          {visual.givens?.map((text, i) => (
            <p key={i} className="mt-2 text-center text-xs text-slate-300">
              {math(textFor(text, lang))}
            </p>
          ))}
          <p className="mt-3 text-center text-sm font-semibold text-amber-200">
            {math(visual.task[lang])}
          </p>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            {bm ? "Rajah tidak mengikut skala" : "Diagram not to scale"}
          </p>
        </>
      );
      break;
    }
    case "distance-comparison": {
      const max = Math.max(...visual.entries.map((e) => e.value));
      body = (
        <div className="space-y-4">
          <p className="text-center text-xs text-slate-400">
            {bm ? "Jarak dari Matahari" : "Distance from the Sun"}
          </p>
          {visual.entries.map((e, i) => (
            <div key={i}>
              <div className="mb-1.5 flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm">
                <span className="text-slate-300">{e.planet[lang]}</span>
                <span style={{ color: COLORS[i % COLORS.length] }}>
                  {math(e.distance)}
                </span>
              </div>
              <svg viewBox="0 0 280 16" className="w-full" aria-hidden="true">
                <rect
                  x="0"
                  y="2"
                  width="280"
                  height="12"
                  rx="3"
                  fill="rgba(255,255,255,.06)"
                />
                <rect
                  x="0"
                  y="2"
                  width={(280 * e.value) / max}
                  height="12"
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity=".65"
                />
              </svg>
            </div>
          ))}
          <p className="text-center text-[10px] text-slate-400">
            {bm
              ? "Palang menggunakan skala jarak yang sama"
              : "Bars use the same distance scale"}
          </p>
        </div>
      );
      break;
    }
    case "storage-capacity":
      body = (
        <>
          <div className="grid grid-cols-2 gap-3 text-center">
            {[
              { label: bm ? "Jumlah data" : "Total data", value: visual.total },
              {
                label: bm ? "Setiap pemacu" : "Per drive",
                value: visual.perDrive,
              },
            ].map((d, i) => (
              <div
                key={i}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-2"
              >
                <svg
                  viewBox="0 0 100 70"
                  className="mx-auto w-full max-w-[100px]"
                  aria-hidden="true"
                >
                  {i === 0 ? (
                    <g fill="none" stroke={COLORS[0]} strokeWidth="2">
                      <ellipse cx="50" cy="15" rx="28" ry="9" />
                      <path d="M 22 15 V 49 C 22 61 78 61 78 49 V 15 M 22 32 C 22 44 78 44 78 32" />
                    </g>
                  ) : (
                    <g fill="none" stroke={COLORS[1]} strokeWidth="2">
                      <rect x="35" y="9" width="30" height="17" rx="2" />
                      <rect x="28" y="26" width="44" height="35" rx="8" />
                      <path d="M 43 15 V 21 M 57 15 V 21" />
                    </g>
                  )}
                </svg>
                <p className="text-xs text-slate-400">{d.label}</p>
                <p
                  className="mt-1 text-lg font-semibold"
                  style={{ color: COLORS[i] }}
                >
                  {d.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-300">
            {visual.conversion}
          </p>
          <p className="mt-3 text-center text-sm font-semibold text-amber-200">
            {bm ? "Bilangan pemacu = ?" : "Number of drives = ?"}
          </p>
        </>
      );
      break;
  }
  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathStandardFormVisual(visual, lang)}
      className="mx-auto w-full max-w-[360px] rounded-2xl border border-violet-400/20 bg-slate-950/40 p-3 sm:p-4"
    >
      <figcaption className="mb-3 text-center text-xs font-semibold text-slate-400">
        {visual.title[lang]}
      </figcaption>
      <div aria-hidden="true">{body}</div>
    </figure>
  );
}
