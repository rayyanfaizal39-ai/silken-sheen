import { useId, useState } from "react";
import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";

// Geometry follows the existing bodySystems array, whose order differs from the
// canonical name list. No curriculum names, organs or functions are stored here.
const SYSTEM_ORDER = [6, 3, 1, 0, 8, 10, 2, 7, 4, 9, 5];
const BODY =
  "M180 27 C155 27 147 46 150 69 Q152 89 165 99 L165 116 Q141 117 121 127 Q108 135 101 159 L65 281 Q61 297 70 310 L82 324 Q92 325 95 315 L95 290 L121 207 L122 284 Q118 310 127 337 L117 541 L107 570 Q105 581 120 583 L142 583 Q150 582 152 570 L179 366 L181 366 L208 570 Q210 582 218 583 L240 583 Q255 581 253 570 L243 541 L233 337 Q242 310 238 284 L239 207 L265 290 L265 315 Q268 325 278 324 L290 310 Q299 297 295 281 L259 159 Q252 135 239 127 Q219 117 195 116 L195 99 Q208 89 210 69 C213 46 205 27 180 27Z";
const COLORS = [
  "#c4b5fd",
  "#fde68a",
  "#86efac",
  "#fdba74",
  "#fda4af",
  "#fcd34d",
  "#fde047",
  "#fb7185",
  "#67e8f9",
  "#c4b5fd",
  "#f0abfc",
];
// Numbered organ anchors match the comma-separated source terms in each entry.
const ANCHORS: number[][][] = [
  [
    [239, 275],
    [209, 173],
    [205, 247],
  ],
  [
    [180, 61],
    [213, 450],
  ],
  [[180, 215]],
  [
    [180, 87],
    [180, 147],
    [207, 220],
    [176, 274],
    [216, 294],
  ],
  [[220, 169]],
  [[239, 275]],
  [
    [180, 60],
    [180, 188],
    [107, 217],
  ],
  [
    [193, 180],
    [226, 253],
  ],
  [
    [180, 76],
    [208, 174],
  ],
  [
    [180, 59],
    [180, 113],
    [204, 231],
    [187, 252],
    [56, 347],
    [296, 363],
  ],
  [
    [56, 347],
    [296, 363],
    [296, 340],
  ],
];

function Brain() {
  return (
    <g data-brain>
      <path
        d="M180 42 C168 32 153 45 158 55 C149 63 157 80 171 77 Q180 82 180 73 Q180 82 189 77 C203 80 211 63 202 55 C207 45 192 32 180 42Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M180 43 V73 M165 47 Q176 51 166 59 Q157 63 169 70 M195 47 Q184 51 194 59 Q203 63 191 70"
        stroke="#334155"
        strokeWidth="1.5"
        fill="none"
      />
    </g>
  );
}
function Lungs() {
  return (
    <g data-lungs fill="currentColor" stroke="currentColor" strokeWidth="2">
      <path d="M170 142 Q150 132 140 155 L135 198 Q147 212 170 196Z" />
      <path d="M190 142 Q210 132 220 155 L225 198 Q213 212 190 196Z" />
    </g>
  );
}
function Kidneys() {
  return (
    <g data-kidneys fill="currentColor">
      <path d="M156 234 C137 225 140 264 153 266 Q168 268 164 257 Q153 251 164 244 Q167 236 156 234Z" />
      <path d="M204 234 C223 225 220 264 207 266 Q192 268 196 257 Q207 251 196 244 Q193 236 204 234Z" />
    </g>
  );
}
function LimbPaths() {
  return (
    <path d="M163 138 L130 159 L107 225 L80 298 M197 138 L230 159 L253 225 L280 298 M170 309 L150 405 L131 565 M190 309 L210 405 L229 565" />
  );
}
function ReproductiveInsets({ endocrine = false }: { endocrine?: boolean }) {
  return (
    <g data-reproductive-insets stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M165 317 L92 330 M195 317 L267 330" strokeDasharray="4 4" />
      <rect x="22" y="321" width="70" height="70" rx="14" fill="#0f172a" />
      <rect x="267" y="321" width="70" height="70" rx="14" fill="#0f172a" />
      <g data-ovaries fill="currentColor">
        <ellipse cx="43" cy="347" rx="7" ry="10" />
        <ellipse cx="70" cy="347" rx="7" ry="10" />
      </g>
      <g data-testes fill="currentColor">
        <ellipse cx="288" cy="364" rx="7" ry="10" />
        <ellipse cx="306" cy="364" rx="7" ry="10" />
      </g>
      {!endocrine && (
        <path data-penis d="M294 332 Q298 327 302 332 V349 Q298 357 294 349Z" fill="currentColor" />
      )}
    </g>
  );
}

function SystemStructures({ index }: { index: number }) {
  switch (index) {
    case 6:
      return (
        <g data-anatomy="nervous">
          <Brain />
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            <path data-spinal-cord d="M180 77 V314" strokeWidth="6" />
            <g data-peripheral-nerves strokeWidth="2">
              <LimbPaths />
              {[145, 168, 193, 218, 243, 270, 292].map((y) => (
                <path key={y} d={`M180 ${y} L148 ${y + 12} M180 ${y} L212 ${y + 12}`} />
              ))}
              <path d="M130 159 L146 186 M107 225 L121 238 M253 225 L239 238 M230 159 L214 186 M150 405 L160 429 M210 405 L200 429 M80 298 L75 315 M80 298 L86 316 M280 298 L275 316 M280 298 L286 315 M131 565 L122 575 M229 565 L238 575" />
            </g>
          </g>
        </g>
      );
    case 3:
      return (
        <g data-anatomy="digestive" stroke="currentColor" strokeLinecap="round">
          <path data-mouth d="M170 87 H190" strokeWidth="5" />
          <path data-oesophagus d="M180 90 V199 Q180 212 192 213" strokeWidth="6" fill="none" />
          <path
            data-stomach
            d="M192 208 C202 196 223 205 220 227 Q214 251 193 241 Q181 235 169 249 L162 244 Q172 221 190 229 Q200 226 192 208Z"
            fill="currentColor"
          />
          <path
            data-large-intestine
            d="M155 248 Q141 248 141 263 V303 Q141 314 156 314 H209 Q219 314 219 302 V262 Q219 248 208 249"
            fill="none"
            strokeWidth="9"
          />
          <path
            data-small-intestine
            d="M165 246 Q152 256 168 262 H199 Q212 268 197 272 H162 Q152 280 169 284 H199 Q211 292 195 296 H164 Q155 301 181 305 V335"
            fill="none"
            strokeWidth="5"
          />
        </g>
      );
    case 1:
      return (
        <g
          data-anatomy="skeletal"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <g data-skull>
            <path
              d="M160 48 Q180 33 200 48 L201 69 L193 78 V88 H167 V78 L159 69Z"
              fill="currentColor"
            />
            <ellipse cx="169" cy="60" rx="5" ry="7" fill="#0f172a" stroke="none" />
            <ellipse cx="191" cy="60" rx="5" ry="7" fill="#0f172a" stroke="none" />
          </g>
          <path d="M180 91 V307 M180 132 Q149 121 130 142 M180 132 Q211 121 230 142" />
          <g data-ribcage strokeWidth="3">
            {[146, 158, 170, 182, 194, 206].map((y) => (
              <path
                key={y}
                d={`M180 ${y} Q133 ${y - 12} 143 ${y + 8} Q156 ${y + 20} 178 ${y + 8} M180 ${y} Q227 ${y - 12} 217 ${y + 8} Q204 ${y + 20} 182 ${y + 8}`}
              />
            ))}
          </g>
          <LimbPaths />
          <path d="M153 299 Q135 291 141 319 L163 339 L180 320 L197 339 L219 319 Q225 291 207 299Z M102 222 L76 294 M258 222 L284 294 M147 411 L128 558 M213 411 L232 558" />
        </g>
      );
    case 0:
      return (
        <g data-anatomy="excretory">
          <path
            data-skin
            d={BODY}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="5 4"
          />
          <g opacity=".75">
            <Lungs />
          </g>
          <Kidneys />
        </g>
      );
    case 8:
      return (
        <g data-anatomy="respiratory">
          <path
            data-nose
            d="M180 65 L176 78 H184"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M180 78 V137 M180 127 L163 151 M180 127 L197 151"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          />
          <Lungs />
          <path
            d="M162 150 V187 M162 161 L148 173 M162 173 L171 184 M198 150 V187 M198 161 L212 173 M198 173 L189 184"
            stroke="#0f172a"
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    case 10:
      return (
        <g data-anatomy="reproductive">
          <ellipse cx="180" cy="316" rx="29" ry="21" fill="currentColor" opacity=".15" />
          <ReproductiveInsets />
        </g>
      );
    case 2:
      return (
        <g data-anatomy="lymphatic">
          <g data-lymph-pathways fill="none" stroke="currentColor" strokeWidth="2.5">
            <LimbPaths />
            <path d="M180 117 V316 M152 143 L180 160 L208 143 M145 196 L180 215 L215 196 M150 262 L180 284 L210 262" />
          </g>
          <g fill="currentColor">
            {[
              [163, 119],
              [197, 119],
              [130, 159],
              [230, 159],
              [145, 196],
              [215, 196],
              [180, 215],
              [150, 262],
              [210, 262],
              [170, 309],
              [190, 309],
              [150, 405],
              [210, 405],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
            ))}
          </g>
        </g>
      );
    case 7:
      return (
        <g data-anatomy="circulatory">
          <g data-blood-vessels fill="none" strokeLinecap="round">
            <g stroke="currentColor" strokeWidth="4">
              <LimbPaths />
              <path d="M180 54 V154 M180 199 V309 M163 138 L169 90 M197 138 L191 90 M180 219 L148 242 M180 219 L212 242" />
            </g>
            <path
              d="M187 56 V152 M188 202 V304 L216 403 L237 564 M172 202 V304 L144 403 L124 564 M158 144 L124 166 L100 231 L74 298 M203 144 L236 166 L260 231 L286 298"
              stroke="#60a5fa"
              strokeWidth="2.5"
            />
          </g>
          <path
            data-heart
            d="M180 166 Q187 151 196 164 Q211 157 212 174 Q213 192 191 201 Q171 186 171 174 Q170 165 180 166Z"
            fill="currentColor"
            stroke="#fecdd3"
            strokeWidth="2"
          />
        </g>
      );
    case 4:
      return (
        <g data-anatomy="muscular" fill="currentColor" stroke="#0f172a" strokeWidth="2">
          <path d="M175 134 Q149 127 132 148 L139 177 Q160 187 176 168Z M185 134 Q211 127 228 148 L221 177 Q200 187 184 168Z" />
          <path d="M127 158 L105 216 Q103 230 112 227 L139 174Z M233 158 L255 216 Q257 230 248 227 L221 174Z M104 235 L80 299 L89 303 L117 231Z M256 235 L280 299 L271 303 L243 231Z M159 314 L135 404 Q139 420 150 410 L178 335Z M201 314 L225 404 Q221 420 210 410 L182 335Z M136 425 L126 545 L136 558 L151 423Z M224 425 L234 545 L224 558 L209 423Z" />
          {[187, 213, 239, 265].map((y) => (
            <g key={y}>
              <rect x="157" y={y} width="20" height="22" rx="6" />
              <rect x="183" y={y} width="20" height="22" rx="6" />
            </g>
          ))}
          <path d="M138 190 L152 215 V282 L133 270Z M222 190 L208 215 V282 L227 270Z" />
        </g>
      );
    case 9:
      return (
        <g data-anatomy="endocrine" fill="currentColor">
          <circle data-pituitary cx="180" cy="59" r="5" />
          <path
            data-thyroid
            d="M178 106 Q163 99 165 112 Q165 125 178 118 H182 Q195 125 195 112 Q197 99 182 106Z"
          />
          <g data-adrenals>
            <path d="M143 232 L156 220 L167 232Z M193 232 L204 220 L217 232Z" />
          </g>
          <path data-pancreas d="M151 251 Q179 239 210 248 Q211 260 183 260 L152 263Z" />
          <ReproductiveInsets endocrine />
        </g>
      );
    case 5:
      return (
        <g data-anatomy="integumentary">
          <path
            data-skin
            d={BODY}
            fill="currentColor"
            fillOpacity=".2"
            stroke="currentColor"
            strokeWidth="5"
          />
          <path
            d="M150 52 Q154 21 180 23 Q206 21 210 52 Q193 35 180 39 Q167 35 150 52"
            fill="currentColor"
          />
          <g fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".65">
            <path d="M122 166 L108 214 M238 166 L252 214 M135 359 L131 411 M225 359 L229 411" />
          </g>
        </g>
      );
    default:
      return null;
  }
}

export function BodySystemAnatomy({ content, index }: { content: Chapter2Content; index: number }) {
  const system = content.bodySystems[index];
  const titleId = useId();
  const organTerms = system.organs.split(",").map((term) => term.trim());
  return (
    <svg
      data-body-system-diagram={index}
      viewBox="0 0 360 610"
      role="img"
      aria-labelledby={titleId}
      className="mx-auto block w-full max-w-[360px]"
      style={{ color: COLORS[index] }}
    >
      <title id={titleId}>{`${system.name}: ${system.organs}`}</title>
      <path data-body-outline d={BODY} fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <SystemStructures index={index} />
      <g data-organ-markers fill="#0f172a" stroke="currentColor" strokeWidth="2">
        {organTerms.map((_term, i) => {
          const [x, y] = ANCHORS[index][i];
          const markerX =
            x === 56
              ? 10
              : x === 296
                ? 349
                : x < 180 || (x === 180 && i % 2 === 0)
                  ? x - 32
                  : x + 32;
          const markerY = index === 10 && i === 2 ? y - 6 : y;
          return (
            <g key={i} aria-hidden="true">
              <line x1={x} y1={y} x2={markerX} y2={markerY} strokeWidth="1.5" />
              <circle cx={markerX} cy={markerY} r="10" />
              <text
                x={markerX}
                y={markerY + 4}
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                fontSize="12"
                fontWeight="700"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function BodySystemsVisual({
  content,
  lang,
}: {
  content: Chapter2Content;
  lang: "en" | "bm";
}) {
  const [index, setIndex] = useState(SYSTEM_ORDER[0]);
  const system = content.bodySystems[index];
  const detailId = useId();
  return (
    <div data-body-systems className="mt-4 min-w-0">
      <div
        role="group"
        aria-label={lang === "en" ? "System" : "Sistem"}
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4"
      >
        {SYSTEM_ORDER.map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={index === i}
            aria-controls={detailId}
            onClick={() => setIndex(i)}
            className={`min-h-14 cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-bold transition-colors duration-150 active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${index === i ? "border-cyan-200 bg-cyan-300/15 text-white" : "border-white/15 bg-white/5 text-slate-200 hover:border-cyan-200/60 hover:bg-white/10"}`}
          >
            {content.bodySystems[i].name}
          </button>
        ))}
      </div>
      <div
        id={detailId}
        className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 sm:p-6"
      >
        <h4 data-system-name className="text-xl font-black text-white" aria-live="polite">
          {system.name}
        </h4>
        <div className="mt-4 grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <BodySystemAnatomy content={content} index={index} />
          <div aria-live="polite" aria-atomic="true" className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                {lang === "en" ? "Organs" : "Organ"}
              </p>
              <ol data-system-organs className="mt-3 space-y-2">
                {system.organs.split(",").map((term, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-100">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
                      style={{ color: COLORS[index], borderColor: COLORS[index] }}
                    >
                      {i + 1}
                    </span>
                    {term.trim()}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                {lang === "en" ? "Function" : "Fungsi"}
              </p>
              <p data-system-function className="mt-2 text-sm leading-6 text-slate-100">
                {system.function}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
