import type { ParticleStateSource } from "./Chapter5ParticleStates";

export function ApplicationDiagram({ id, label }: { id: string; label: string }) {
  return (
    <svg
      data-application={id}
      viewBox="0 0 280 150"
      role="img"
      aria-label={label}
      className="mx-auto w-full max-w-xs"
    >
      <desc>{label}</desc>
      {id === "ice-cream" && (
        <g>
          <path d="M15 45 H91 L82 105 H24 Z" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
          <path d="M25 53 Q53 44 83 53" stroke="#fbbf24" fill="none" />
          <path
            d="M115 75 H161 l-9 -8 M161 75 l-9 8"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="3"
          />
          <path d="M189 72 H250 L220 133Z" fill="#b59368" stroke="#e1c9a7" />
          <path
            d="M183 72 Q183 43 199 40 Q210 13 225 38 Q252 32 258 72Z"
            fill="#fef3c7"
            stroke="#fbbf24"
            strokeWidth="2"
          />
        </g>
      )}
      {id === "dry-ice" && (
        <g>
          <path d="M38 46 H238 V128 H38Z" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
          <rect x="49" y="70" width="40" height="44" rx="4" fill="#cbd5e1" stroke="#f8fafc" />
          <rect x="97" y="85" width="32" height="30" rx="3" fill="#cbd5e1" stroke="#f8fafc" />
          <path d="M162 64 H209 L185 116Z" fill="#b59368" />
          <path d="M156 64 Q155 32 184 32 Q211 30 216 64Z" fill="#fef3c7" stroke="#fbbf24" />
          <path d="M41 42 L22 20 H219 L239 42" fill="none" stroke="#94a3b8" strokeWidth="5" />
        </g>
      )}
      {id === "mothballs" && (
        <g>
          <circle cx="48" cy="85" r="28" fill="#e2e8f0" stroke="#fff" />
          <path d="M94 85 H156 l-9 -8 M156 85 l-9 8" fill="none" stroke="#fbbf24" strokeWidth="3" />
          <circle cx="197" cy="85" r="13" fill="#e2e8f0" stroke="#fff" />
          {[
            [185, 37],
            [230, 58],
            [231, 111],
            [165, 120],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" fill="#7dd3fc" />
          ))}
        </g>
      )}
      {id === "dew" && (
        <g>
          <path
            d="M43 122 Q62 47 234 54 Q192 143 43 122Z"
            fill="#065f46"
            stroke="#6ee7b7"
            strokeWidth="2"
          />
          <path d="M43 122 L220 64" stroke="#6ee7b7" />
          {[
            [107, 83],
            [159, 73],
            [180, 99],
          ].map(([x, y]) => (
            <path key={x} d={`M${x} ${y - 10} q-14 18 0 20 q14 -2 0 -20Z`} fill="#7dd3fc" />
          ))}
          {[
            [90, 28],
            [155, 19],
            [212, 32],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" fill="#7dd3fc" />
          ))}
          <path d="M142 28 V51 l-5 -6 M142 51 l5 -6" fill="none" stroke="#7dd3fc" strokeWidth="2" />
        </g>
      )}
      {id === "clothes" && (
        <g>
          <path d="M12 41 H265" stroke="#94a3b8" strokeWidth="3" />
          <path d="M40 43 H108 V125 H40Z" fill="#0284c7" stroke="#7dd3fc" />
          <path d="M172 43 H240 V125 H172Z" fill="#64748b" stroke="#cbd5e1" />
          <path
            d="M118 85 H157 l-7 -6 M157 85 l-7 6"
            stroke="#fbbf24"
            strokeWidth="2"
            fill="none"
          />
          {[47, 77, 105].map((x, i) => (
            <circle key={x} cx={x} cy={18 + (i % 2) * 7} r="4" fill="#7dd3fc" />
          ))}
          <path
            d="M50 36 V48 M97 36 V48 M182 36 V48 M229 36 V48"
            stroke="#b59368"
            strokeWidth="5"
          />
        </g>
      )}
    </svg>
  );
}

export function Chapter5Applications({ source }: { source: ParticleStateSource }) {
  const l = source.pass3Presentation;
  return (
    <>
      <section data-pass3="applications" className="space-y-6">
        <h3 className="text-2xl font-black">{l.examples}</h3>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {source.everydayExamples.map((e) => (
            <figure key={e.id} className="border-t border-white/10 pt-3">
              <ApplicationDiagram id={e.id} label={e.process} />
              <figcaption>
                <p className="font-black text-sky-100">{e.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{e.process}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <aside data-activity="5.7" className="border-l-2 border-emerald-300 pl-4">
          <h4 className="font-bold">{source.applicationActivity.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{source.applicationActivity.task}</p>
          <p className="mt-2 text-sm text-sky-100">
            {[...new Set(source.changesOfState.map((c) => c.name))].join(" · ")}
          </p>
        </aside>
      </section>
      <section data-pass3="recall" className="space-y-4">
        <h3 className="text-2xl font-black">{l.recall}</h3>
        {source.activeRecall.map((q) => (
          <details key={q.question} className="border-b border-white/15 pb-4">
            <summary className="cursor-pointer py-2 font-bold text-sky-100 focus-visible:outline focus-visible:outline-sky-300">
              {q.question}
            </summary>
            <p className="mt-2 text-sm leading-7 text-slate-300">{q.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
