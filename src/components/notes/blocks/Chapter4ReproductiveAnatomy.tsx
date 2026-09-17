import { useId, useState, type ReactNode } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Diagram, Cue, panel, type Lang } from "./Chapter4Pass1Shared";
const copy = {
  en: {
    male: "Male reproductive system",
    female: "Female reproductive system",
    front: "Front view",
    side: "Side view",
    bladder: "Urinary bladder (context)",
    choose: "Select a structure",
  },
  bm: {
    male: "Sistem pembiakan lelaki",
    female: "Sistem pembiakan perempuan",
    front: "Pandangan hadapan",
    side: "Pandangan sisi",
    bladder: "Pundi kencing (konteks)",
    choose: "Pilih struktur",
  },
} as const;
// Geometry indices match the existing canonical organ arrays; no names/functions are duplicated here.
function Organ({
  index,
  selected,
  children,
}: {
  index: number;
  selected: number | null;
  children: ReactNode;
}) {
  return (
    <g
      data-reproductive-organ={index}
      data-highlighted={selected === index}
      opacity={selected === null || selected === index ? 1 : 0.38}
      stroke={selected === index ? "#fef08a" : "#fbcfe8"}
      strokeWidth={selected === index ? 4 : 2.5}
    >
      {children}
    </g>
  );
}
export function ReproductiveAnatomyDiagram({
  content,
  lang,
  sex,
  selected = null,
  side = false,
}: {
  content: Chapter4Content;
  lang: Lang;
  sex: "male" | "female";
  selected?: number | null;
  side?: boolean;
}) {
  const c = copy[lang];
  const parts =
    sex === "male"
      ? content.humanReproductiveSystem.maleParts
      : content.humanReproductiveSystem.femaleParts;
  const organ = (index: number, children: ReactNode) => (
    <Organ index={index} selected={selected}>
      {children}
    </Organ>
  );
  return (
    <Diagram
      label={`${c[sex]} · ${side ? c.side : c.front}${selected === null ? "" : `: ${parts[selected].part}`}`}
      kind={`${sex}-anatomy-${side ? "side" : "front"}`}
      viewBox="0 0 360 350"
    >
      {sex === "male" ? (
        <>
          <g data-urinary-bladder="context">
            <path
              d={
                side
                  ? "M151 64 Q210 42 228 78 Q236 116 194 130 Q151 120 151 64Z"
                  : "M142 63 Q180 40 218 63 Q232 96 180 125 Q128 96 142 63Z"
              }
              fill="#164e63"
              stroke="#7dd3fc"
              strokeWidth="2"
            />
            <path d="M180 35 V50" stroke="#7dd3fc" />
            <text x="180" y="25" textAnchor="middle" fill="#bae6fd" fontSize="12">
              {c.bladder}
            </text>
          </g>
          {organ(
            4,
            <path
              d={
                side
                  ? "M155 235 Q189 221 216 243 Q233 293 188 307 Q142 303 155 235Z"
                  : "M106 235 Q127 218 153 237 Q165 292 131 307 Q94 294 106 235 M207 237 Q232 219 254 235 Q266 294 230 307 Q194 290 207 237"
              }
              fill="#512d4c"
            />,
          )}
          {organ(
            3,
            <path
              d={
                side
                  ? "M179 169 Q120 148 102 180 L86 279 Q89 299 106 298 Q121 297 123 280 L138 199 Q151 188 175 194Z"
                  : "M166 171 Q180 163 194 171 V299 Q180 320 166 299Z"
              }
              fill="#74405d"
            />,
          )}
          {organ(
            5,
            side ? (
              <ellipse cx="185" cy="270" rx="24" ry="29" fill="#f9a8d4" />
            ) : (
              <>
                <ellipse cx="130" cy="269" rx="19" ry="27" fill="#f9a8d4" />
                <ellipse cx="230" cy="269" rx="19" ry="27" fill="#f9a8d4" />
              </>
            ),
          )}
          {organ(
            2,
            <path
              d={
                side
                  ? "M176 246 C164 210 98 204 104 116 C110 60 159 59 213 77 Q238 91 213 130 L194 145"
                  : "M123 244 C101 200 99 170 104 120 Q107 87 135 98 Q153 100 154 128 L180 145 M237 244 C259 201 262 166 256 120 Q253 87 225 98 Q207 100 206 128 L180 145"
              }
              stroke="#fbbf24"
              strokeWidth={selected === 2 ? 6 : 4}
              fill="none"
            />,
          )}
          {organ(
            0,
            side ? (
              <path d="M220 118 Q238 92 252 113 Q269 123 246 132 L214 143Z" fill="#c084fc" />
            ) : (
              <>
                <ellipse
                  cx="145"
                  cy="121"
                  rx="10"
                  ry="20"
                  transform="rotate(-30 145 121)"
                  fill="#c084fc"
                />
                <ellipse
                  cx="215"
                  cy="121"
                  rx="10"
                  ry="20"
                  transform="rotate(30 215 121)"
                  fill="#c084fc"
                />
              </>
            ),
          )}
          {organ(6, <ellipse cx={side ? 194 : 180} cy="150" rx="25" ry="21" fill="#be5c88" />)}
          {organ(
            1,
            <path
              d={
                side ? "M193 123 V158 Q194 178 159 176 Q122 168 115 195 L101 286" : "M180 123 V300"
              }
              stroke="#67e8f9"
              strokeWidth={selected === 1 ? 6 : 4}
              fill="none"
            />,
          )}
          {(side
            ? [
                [305, 112, 244, 119],
                [30, 286, 103, 268],
                [30, 111, 109, 124],
                [30, 211, 119, 211],
                [299, 303, 211, 290],
                [290, 264, 198, 267],
                [305, 173, 211, 154],
              ]
            : [
                [300, 90, 221, 112],
                [300, 211, 180, 216],
                [40, 137, 104, 137],
                [300, 316, 186, 293],
                [40, 310, 110, 286],
                [300, 274, 235, 270],
                [40, 183, 159, 152],
              ]
          ).map(([x, y, tx, ty], i) => (
            <Cue key={i} x={x} y={y} to={[tx, ty]} number={i + 1} />
          ))}
        </>
      ) : (
        <>
          {organ(
            2,
            <>
              <path
                d="M142 114 Q180 90 218 114 Q225 157 198 197 L193 225 H167 L162 197 Q135 155 142 114Z"
                fill="#9f4268"
              />
              <path d="M158 122 Q180 113 202 122 L184 182 V215 H176 V182Z" fill="#401f38" />
            </>,
          )}
          {organ(
            0,
            <>
              <path
                d="M148 124 C131 80 70 85 62 131 M212 124 C229 80 290 85 298 131"
                fill="none"
                stroke="#f9a8d4"
                strokeWidth={selected === 0 ? 10 : 7}
              />
              <path
                d="M62 128 L51 141 M62 128 L60 145 M62 128 L71 141 M298 128 L289 141 M298 128 L300 145 M298 128 L310 141"
                stroke="#f9a8d4"
              />
            </>,
          )}
          {organ(
            1,
            <>
              <ellipse cx="80" cy="154" rx="22" ry="14" fill="#fbbf24" />
              <ellipse cx="280" cy="154" rx="22" ry="14" fill="#fbbf24" />
            </>,
          )}
          {organ(4, <path d="M164 238 L161 309 Q180 324 199 309 L196 238Z" fill="#824062" />)}
          {organ(
            3,
            <>
              <path d="M167 215 H193 V244 Q180 252 167 244Z" fill="#f9a8d4" />
              <path d="M180 217 V248" stroke="#401f38" strokeWidth="5" />
            </>,
          )}
          {[
            [30, 80, 92, 103],
            [30, 172, 80, 154],
            [310, 185, 204, 155],
            [40, 239, 168, 231],
            [310, 295, 193, 282],
          ].map(([x, y, tx, ty], i) => (
            <Cue key={i} x={x} y={y} to={[tx, ty]} number={i + 1} />
          ))}
        </>
      )}
    </Diagram>
  );
}
export function ReproductiveSystemPanel({
  content,
  lang,
  sex,
}: {
  content: Chapter4Content;
  lang: Lang;
  sex: "male" | "female";
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();
  const c = copy[lang];
  const parts =
    sex === "male"
      ? content.humanReproductiveSystem.maleParts
      : content.humanReproductiveSystem.femaleParts;
  return (
    <section data-anatomy-system={sex} className={panel}>
      <h3 className="text-xl font-bold text-white">{c[sex]}</h3>
      <div className={sex === "male" ? "mt-4 grid gap-4 md:grid-cols-2" : "mt-4 mx-auto max-w-xl"}>
        {(sex === "male" ? [false, true] : [false]).map((side) => (
          <figure key={String(side)}>
            <ReproductiveAnatomyDiagram
              content={content}
              lang={lang}
              sex={sex}
              side={side}
              selected={selected}
            />
            <figcaption className="text-center text-sm font-semibold text-slate-300">
              {side ? c.side : c.front}
            </figcaption>
          </figure>
        ))}
      </div>
      <div
        role="group"
        aria-label={c.choose}
        className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
      >
        {parts.map((part, index) => (
          <button
            key={part.part}
            type="button"
            aria-pressed={selected === index}
            aria-controls={id}
            onClick={() => setSelected(index)}
            className={`min-h-12 rounded-xl border p-3 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${selected === index ? "border-amber-300 bg-amber-300/10 text-amber-100" : "border-white/15 text-slate-200"}`}
          >
            <span className="mr-2 font-mono text-cyan-300">{index + 1}</span>
            {part.part}
          </button>
        ))}
      </div>
      <div
        id={id}
        aria-live="polite"
        className="mt-3 rounded-xl bg-rose-300/5 p-4 text-sm leading-6 text-slate-200"
      >
        {selected === null ? (
          c.choose
        ) : (
          <>
            <h4 className="font-bold text-rose-200">{parts[selected].part}</h4>
            <p className="mt-1">{parts[selected].function}</p>
          </>
        )}
      </div>
      {sex === "female" && (
        <div data-fertilisation-vs-development="true" className="mt-4 grid gap-3 sm:grid-cols-2">
          {[0, 2].map((index) => (
            <p
              key={index}
              className="rounded-xl border border-cyan-300/20 p-3 text-sm leading-6 text-slate-300"
            >
              <b className="block text-cyan-200">{parts[index].part}</b>
              {parts[index].function}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
