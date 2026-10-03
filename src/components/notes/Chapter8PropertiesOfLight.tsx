import { useState } from "react";
import type { PropertiesOfLightLesson } from "@/content/form1/science/chapter-8/chapter8-content";

const puppetShape =
  "M0 -43Q-14 -50 -13 -35L-22 -28L-10 -25L-7 -13L-17 9L-6 19L-16 48H-3L4 22L14 49H25L15 8L9 -8L28 4L37 -17L31 -21L24 -4L10 -25Q12 -42 0 -43Z";

function UmbrellaShadowDiagram() {
  return (
    <svg data-light-diagram="shadow" viewBox="0 0 400 240" aria-hidden="true" className="w-full">
      <path data-source d="M90 14H310" stroke="#fbbf24" strokeWidth="5" />
      <path d="M38 220H362" stroke="#64748b" strokeWidth="2" />
      <path data-blocked-region d="M100 130H300V218H100Z" fill="#020617" />
      <ellipse
        data-shadow
        cx="200"
        cy="218"
        rx="100"
        ry="11"
        fill="#020617"
        stroke="#a78bfa"
        strokeWidth="2"
      />
      {[120, 160, 200, 240, 280].map((x) => {
        const t = (x - 100) / 200;
        // Intersect each parallel incident ray with the opaque quadratic canopy.
        const y = 130 - 280 * t + 280 * t * t;
        return (
          <g key={x}>
            <path
              data-straight-ray
              data-blocked-ray
              d={`M${x} 25L${x} ${y}`}
              stroke="#fbbf24"
              strokeWidth="3"
            />
            <path
              data-ray-arrow
              d={`M${x - 4} ${y - 22}L${x} ${y - 15}L${x + 4} ${y - 22}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />
          </g>
        );
      })}
      <path
        data-umbrella-handle
        d="M200 125V192Q200 207 185 207Q173 207 173 196"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="5"
      />
      <path
        data-opaque-object
        data-umbrella
        d="M100 130Q200 -10 300 130Q275 112 250 130Q225 112 200 130Q175 112 150 130Q125 112 100 130Z"
        fill="#7c3aed"
        stroke="#c4b5fd"
        strokeWidth="2"
      />
      <path
        d="M200 60Q170 78 150 130M200 60V130M200 60Q230 78 250 130"
        fill="none"
        stroke="#c4b5fd"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ShadowDiagram({ puppet = false }: { puppet?: boolean }) {
  if (!puppet) return <UmbrellaShadowDiagram />;
  return (
    <svg data-light-diagram="puppet" viewBox="0 0 400 240" aria-hidden="true" className="w-full">
      <path d="M46 120L356 31V209Z" fill="#fbbf24" opacity=".10" />
      {[31, 209].map((y) => (
        <path
          key={y}
          data-straight-ray
          d={`M46 120L352 ${y}`}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
        />
      ))}
      <path data-blocked-ray d="M46 120H177" stroke="#fbbf24" strokeWidth="3" />
      <path d="M118 115L129 120L118 125" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <path data-source d="M12 108H35L47 101V139L35 132H12Z" fill="#94a3b8" stroke="#cbd5e1" />

      <rect data-screen x="298" y="22" width="96" height="196" rx="3" fill="#e2e8f0" />
      <path
        data-opaque-object
        d={puppetShape}
        transform="translate(183 120) scale(.8)"
        fill="#94a3b8"
      />
      <path d="M184 153V210" stroke="#94a3b8" strokeWidth="3" />
      <path data-shadow d={puppetShape} transform="translate(335 120) scale(1.5)" fill="#0f172a" />

      <path d="M12 222H377" stroke="#475569" />
    </svg>
  );
}

export function SundialDiagram({ position = 0 }: { position?: number }) {
  const source = [
    { x: 60, y: 46 },
    { x: 200, y: 20 },
    { x: 340, y: 46 },
  ][position];
  const end = { x: 200 + ((200 - source.x) * 75) / (115 - source.y), y: 190 };
  return (
    <svg
      data-light-diagram="sundial"
      data-position={position}
      viewBox="0 0 400 230"
      aria-hidden="true"
      className="w-full"
    >
      <ellipse cx="200" cy="190" rx="175" ry="30" fill="#1e293b" stroke="#64748b" />
      <path
        data-dial-shadow
        d={`M200 190L${end.x} ${end.y}L${end.x + 7} 197L200 197Z`}
        fill="#020617"
        stroke="#a78bfa"
      />
      <path data-pointer d="M200 115V190" stroke="#e2e8f0" strokeWidth="8" />
      <path
        data-dial-ray
        d={`M${source.x} ${source.y}L${end.x} ${end.y}`}
        stroke="#fbbf24"
        strokeWidth="2"
      />
      <circle cx={source.x} cy={source.y} r="14" fill="#fbbf24" />
      {[60, 95, 130, 165, 235, 270, 305, 340].map((x) => (
        <path key={x} d={`M${x} 190v8`} stroke="#94a3b8" />
      ))}
    </svg>
  );
}

export function Chapter8PropertiesOfLight({ source: s }: { source: PropertiesOfLightLesson }) {
  const [position, setPosition] = useState(0);
  return (
    <div data-properties-lesson className="space-y-9 text-sm leading-6 sm:text-base">
      <figure
        data-opaque-lesson
        className="rounded-2xl border border-amber-300/20 bg-slate-950/40 p-4 sm:p-6"
      >
        <figcaption className="text-lg font-bold text-amber-200">{s.labels.object}</figcaption>
        <p data-opaque-definition className="mt-3 font-semibold text-white">
          {s.opaqueObject.definition}
        </p>
        <div className="mx-auto mt-5 max-w-2xl">
          <p className="text-center font-semibold text-amber-200">
            {s.labels.source}: {s.labels.sun}
          </p>
          <ShadowDiagram />
        </div>
        <div
          data-shadow-labels
          className="grid gap-2 text-center text-sm font-semibold sm:grid-cols-3"
        >
          <span className="text-violet-200">{s.opaqueObject.umbrella}</span>
          <span className="text-amber-200">{s.opaqueObject.blockedLight}</span>
          <span className="text-violet-200">{s.labels.shadow}</span>
        </div>
        <p className="mt-5 font-semibold text-amber-200">{s.facts[1]}</p>
        <ol data-shadow-chain className="mt-5 grid gap-3 sm:grid-cols-2">
          {s.opaqueObject.chain.map((step, i) => (
            <li key={step} className="flex items-start gap-3 border-l-2 border-amber-300/30 pl-3">
              <span aria-hidden="true" className="text-amber-200">
                {i + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </figure>
      <div data-light-speed className="border-l-2 border-amber-300 pl-5">
        <p className="text-2xl font-bold text-amber-200">{s.labels.speed}</p>
        <p className="mt-2 max-w-3xl text-slate-300">{s.facts[0]}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <figure data-sundial>
          <figcaption className="text-lg font-bold text-white">{s.sundial.title}</figcaption>
          <SundialDiagram position={position} />
          <div className="flex flex-wrap items-center gap-2" data-sundial-controls>
            <span className="mr-1 text-slate-300">{s.labels.position}</span>
            {[0, 1, 2].map((p) => (
              <button
                key={p}
                type="button"
                aria-label={`${s.labels.position} ${p + 1}`}
                aria-pressed={p === position}
                onClick={() => setPosition(p)}
                className={`min-h-11 min-w-11 rounded-lg border font-bold ${position === p ? "border-amber-300 bg-amber-300/15 text-amber-200" : "border-white/20 text-slate-300"}`}
              >
                {p + 1}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {s.labels.sun} → {s.labels.pointer} → {s.labels.shadow}
          </p>
          <p className="mt-3 text-slate-300">{s.sundial.explanation}</p>
          <p className="mt-3 text-slate-300">{s.shadowChange}</p>
        </figure>
        <figure data-wayang>
          <figcaption className="text-lg font-bold text-white">{s.wayangKulit.title}</figcaption>
          <ShadowDiagram puppet />
          <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold text-amber-200">
            <span>{s.labels.source}</span>
            <span>→</span>
            <span>{s.labels.puppet}</span>
            <span>→</span>
            <span>{s.labels.screen}</span>
            <span>→</span>
            <span>{s.labels.shadow}</span>
          </div>
          <p className="mt-3 text-slate-300">{s.wayangKulit.explanation}</p>
        </figure>
      </div>
      <p className="border-t border-white/10 pt-5 text-slate-300">{s.rainbow}</p>
    </div>
  );
}
