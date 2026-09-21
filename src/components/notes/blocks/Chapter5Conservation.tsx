import type { ConservationExperiment } from "@/content/form1/science/chapter-5/chapter5-content";
import type { ParticleStateSource } from "./Chapter5ParticleStates";

function BeakerContents({ kind, after }: { kind: "ice" | "salt"; after: boolean }) {
  return (
    <g data-open-beaker>
      <path
        d="M98 29 V94 Q98 102 106 102 H166 Q174 102 174 94 V29"
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="2.5"
      />
      {(kind === "salt" || after) && (
        <path
          data-liquid-content
          d="M101 60 H171 V94 Q171 99 164 99 H108 Q101 99 101 94 Z"
          fill="#38bdf8"
          fillOpacity=".35"
        />
      )}
      {kind === "ice" && !after && (
        <g data-ice-cubes>
          {[
            [107, 75],
            [131, 73],
            [150, 78],
            [113, 53],
            [140, 51],
          ].map(([x, y]) => (
            <rect
              key={x}
              x={x}
              y={y}
              width="18"
              height="18"
              rx="2"
              fill="#7dd3fc"
              stroke="#e0f2fe"
              transform={`rotate(-8 ${x + 9} ${y + 9})`}
            />
          ))}
        </g>
      )}
      {kind === "salt" && (
        <g data-salt-particles={after ? "dissolved" : "undissolved"}>
          {Array.from({ length: 12 }, (_, i) => (
            <circle
              key={i}
              cx={after ? 108 + (i % 4) * 18 : 119 + (i % 4) * 9}
              cy={after ? 68 + Math.floor(i / 4) * 11 : 94 - Math.floor(i / 4) * 4}
              r="2"
              fill="#f8fafc"
            />
          ))}
        </g>
      )}
    </g>
  );
}

export function ConservationBalance({
  experiment,
  after,
}: {
  experiment: ConservationExperiment;
  after: boolean;
}) {
  const metal = experiment.id === "metal";
  return (
    <svg
      data-conservation-balance={metal ? "triple-beam" : "lever"}
      data-sample={experiment.id}
      data-stage={after ? "after" : "before"}
      viewBox="0 0 280 240"
      role="img"
      aria-label={after ? experiment.after : experiment.before}
      className="mx-auto w-full max-w-xs"
    >
      <desc>{experiment.materials}</desc>
      {metal ? (
        <g>
          <path
            d="M30 125 H152 Q146 136 136 136 H46 Q36 136 30 125"
            fill="#94a3b8"
            stroke="#e2e8f0"
          />
          <path
            d="M90 136 V198 M40 208 H253 L240 195 H55 Z"
            fill="#334155"
            stroke="#94a3b8"
            strokeWidth="3"
          />
          {[145, 158, 171].map((y, i) => (
            <g key={y}>
              <path d={`M90 ${y} H254`} stroke="#94a3b8" strokeWidth="4" />
              <rect x={150 + i * 23} y={y - 6} width="8" height="12" rx="1" fill="#fbbf24" />
            </g>
          ))}
          <path
            data-balance-pointer
            d="M254 145 V180 M248 177 H262"
            stroke="#6ee7b7"
            strokeWidth="2"
          />
          <circle
            data-metal-ball
            cx="68"
            cy={after ? 102 : 104}
            r={after ? 22 : 20}
            fill="#94a3b8"
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          <ellipse
            data-metal-ring
            cx="115"
            cy="112"
            rx="22"
            ry="8"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="4"
          />
          <path d="M130 109 L146 90 M68 82 V65 H84" stroke="#94a3b8" strokeWidth="4" />
        </g>
      ) : (
        <g>
          <BeakerContents kind={experiment.id as "ice" | "salt"} after={after} />
          <ellipse cx="136" cy="108" rx="48" ry="7" fill="#94a3b8" stroke="#e2e8f0" />
          <path
            d="M144 116 V208 M143 132 H56 M58 134 Q57 187 122 206 M48 211 H171 L178 224 H42 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="5"
          />
          <path d="M65 142 Q70 184 120 197" fill="none" stroke="#cbd5e1" strokeWidth="10" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${67 + i * 10} ${151 + i * 10} l-5 4`}
              stroke="#334155"
              strokeWidth="2"
            />
          ))}
          <path data-balance-pointer d="M135 203 L78 172" stroke="#6ee7b7" strokeWidth="3" />
          <circle cx="136" cy="204" r="8" fill="#475569" stroke="#cbd5e1" />
        </g>
      )}
    </svg>
  );
}

function ChangeAction({ experiment }: { experiment: ConservationExperiment }) {
  return (
    <div className="mx-auto max-w-60 text-center">
      <svg
        data-conservation-action={experiment.id}
        viewBox="0 0 180 140"
        role="img"
        aria-label={experiment.action}
        className="mx-auto h-28 w-40"
      >
        {experiment.id === "metal" ? (
          <g>
            <circle cx="90" cy="45" r="21" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="2" />
            <path d="M90 24 V10 H160" stroke="#94a3b8" strokeWidth="4" />
            <path d="M90 97 Q74 85 90 64 Q108 85 90 97Z" fill="#fbbf24" />
            <path d="M84 101 H96 V125 H114 V131 H66 V125 H84Z" fill="#64748b" stroke="#cbd5e1" />
          </g>
        ) : experiment.id === "salt" ? (
          <g>
            <path d="M40 25 V116 H140 V25" fill="none" stroke="#7dd3fc" strokeWidth="3" />
            <path d="M43 65 H137 V113 H43Z" fill="#38bdf8" opacity=".3" />
            <path data-glass-rod d="M103 110 L131 10" stroke="#cbd5e1" strokeWidth="5" />
            <path
              d="M61 49 Q96 25 120 50 l-14 -1 M120 50 l-2 -13"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />
          </g>
        ) : (
          <g>
            <rect x="25" y="40" width="42" height="42" rx="5" fill="#7dd3fc" stroke="#e0f2fe" />
            <path
              d="M80 65 H110 l-9 -8 M110 65 l-9 8"
              stroke="#6ee7b7"
              strokeWidth="3"
              fill="none"
            />
            <path d="M135 37 Q162 76 135 91 Q108 76 135 37Z" fill="#38bdf8" />
          </g>
        )}
      </svg>
      <p className="text-sm font-bold text-amber-100">{experiment.action}</p>
    </div>
  );
}

export function Chapter5Conservation({ source }: { source: ParticleStateSource }) {
  const l = source.pass3Presentation;
  return (
    <section data-pass3="conservation" className="space-y-8">
      <div>
        <h3 className="text-2xl font-black">{l.conservation}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{source.constantFacts[1]}</p>
      </div>
      {source.conservationExperiments.map((e) => (
        <article
          key={e.id}
          data-conservation-experiment={e.id}
          className="border-t border-white/15 pt-5"
        >
          <h4 className="text-lg font-black">{e.title}</h4>
          <p className="mt-2 text-xs leading-5 text-sky-200">{e.materials}</p>
          <div className="mt-5 grid items-center gap-4 md:grid-cols-[1fr_180px_1fr]">
            <figure>
              <p className="text-center text-sm font-bold text-slate-300">{l.before}</p>
              <ConservationBalance experiment={e} after={false} />
              <figcaption className="text-center text-sm font-bold">{e.before}</figcaption>
            </figure>
            <ChangeAction experiment={e} />
            <figure>
              <p className="text-center text-sm font-bold text-slate-300">{l.after}</p>
              <ConservationBalance experiment={e} after />
              <figcaption className="text-center text-sm font-bold">{e.after}</figcaption>
            </figure>
          </div>
          <p
            data-mass-equality
            className="mt-5 rounded-lg bg-emerald-300/10 p-3 text-center font-black text-emerald-200"
          >
            {l.sameMass}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{e.procedure}</p>
          <p className="mt-2 text-sm leading-6 text-emerald-100">{e.observation}</p>
        </article>
      ))}
      <p className="text-xs text-slate-400">{l.model}</p>
    </section>
  );
}
