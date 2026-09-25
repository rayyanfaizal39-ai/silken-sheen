import { useState } from "react";
import type {
  PollutionActivity,
  PollutionLesson,
} from "@/content/form1/science/chapter-7/bab7-content";

const line = "#7dd3fc",
  rose = "#fda4af",
  green = "#6ee7b7";
const button =
  "min-h-11 rounded-lg border border-sky-300/25 px-3 py-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300";
function Arrow() {
  return (
    <span aria-hidden="true" className="text-2xl text-sky-300">
      →
    </span>
  );
}

/** Geometry only. Text and all causal relationships belong to the canonical source. */
export function PollutionSymbol({ kind }: { kind: string }) {
  return (
    <svg
      data-pollution-symbol={kind}
      viewBox="0 0 160 100"
      aria-hidden="true"
      className="h-24 w-40 max-w-full"
      fill="none"
      stroke={line}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "source-0" && (
        <>
          <path d="M15 85V48L40 60V48L64 60V30H79V85ZM64 30V20H79V30M26 70H36M46 70H56" />
          <path d="M72 12Q92 0 109 15M87 23Q110 9 128 25" stroke="#94a3b8" />
          <path d="M98 80V65L111 52H134L145 66V80Z" />
          <circle cx="108" cy="82" r="7" />
          <circle cx="138" cy="82" r="7" />
        </>
      )}
      {kind === "source-1" && (
        <>
          <path
            d="M50 83C17 58 57 43 50 14C91 46 99 61 80 83ZM56 82C42 63 67 53 65 43C87 66 83 78 73 84"
            stroke="#fbbf24"
          />
          <path d="M102 82V43M83 43L103 15L123 43ZM18 91H133" />
        </>
      )}
      {kind === "source-2" && (
        <>
          <path d="M30 88V12H135M30 20L99 12M113 12V47L103 57H122M18 88H50M68 88V57H93V88M111 88V70H138V88" />
          {[50, 65, 84, 98, 124].map((x, i) => (
            <circle key={x} cx={x} cy={32 + (i % 2) * 10} r="2" fill="#cbd5e1" stroke="none" />
          ))}
        </>
      )}
      {kind === "source-3" && (
        <>
          <path d="M20 85Q44 44 34 25H66Q58 52 82 85ZM80 85Q104 44 94 25H126Q118 52 143 85ZM14 86H149" />
          <path d="M35 14Q50 4 65 14M94 14Q110 4 126 14" />
        </>
      )}
      {kind === "source-4" && (
        <>
          <path
            d="M15 88Q70 52 145 88M29 87V53M29 69Q12 69 16 54Q31 51 29 69M29 63Q44 62 43 47Q28 47 29 63M66 85V60M99 85V61"
            stroke={green}
          />
          <path d="M105 14H134V24H117V36H101V24H90V14ZM101 36H124V61H101Z" />
          {[76, 65, 52].map((x, i) => (
            <path key={x} d={`M${x} ${23 + i * 5}l-4 2`} stroke={rose} />
          ))}
        </>
      )}
      {kind === "source-5" && (
        <>
          <rect x="14" y="12" width="55" height="78" rx="5" />
          <path d="M14 43H69M59 25V34M59 56V67" />
          <rect x="86" y="13" width="60" height="25" rx="4" />
          <path d="M94 29H138M100 48V58M116 48V58M132 48V58" />
          <rect x="101" y="72" width="28" height="18" rx="3" />
          <path d="M108 72V64H121V72" />
        </>
      )}
      {kind === "haze" && (
        <>
          <path d="M13 86V53H38V86M53 86V30H83V86M98 86V45H142V86" />
          {[25, 45, 65].map((y) => (
            <path
              key={y}
              d={`M5 ${y}Q40 ${y - 12} 80 ${y}T155 ${y}`}
              stroke="#94a3b8"
              strokeWidth="8"
              opacity=".75"
            />
          ))}
        </>
      )}
      {kind === "greenhouse" && (
        <>
          <circle cx="71" cy="55" r="31" fill="#164e63" />
          <path d="M43 38L65 42L73 60L61 79M92 36L76 48L96 69" stroke={green} />
          <circle cx="71" cy="55" r="41" stroke="#fbbf24" />
          <path d="M129 75V32Q135 20 141 32V75A12 12 0 1 1 129 75Z" stroke={rose} />
          <path d="M135 78V46" stroke={rose} strokeWidth="5" />
        </>
      )}
      {kind === "ozone" && (
        <>
          <circle cx="80" cy="62" r="29" fill="#164e63" />
          <path d="M55 47L77 51L81 76M99 46L88 57L103 73" stroke={green} />
          <path d="M34 65A46 46 0 0 1 126 65" stroke="#c4b5fd" strokeWidth="7" />
          <path
            d="M43 65A37 37 0 0 1 117 65"
            stroke="#c4b5fd"
            strokeWidth="2"
            strokeDasharray="5 7"
          />
        </>
      )}
      {kind === "acid" && (
        <>
          <path d="M24 36Q10 17 35 16Q47 -1 69 16Q91 5 102 24Q127 18 135 36Z" fill="#334155" />
          {[35, 60, 85, 110, 130].map((x) => (
            <path key={x} d={`M${x} 47l-5 13`} stroke={rose} />
          ))}
          <path d="M13 91V71H37V91M52 92V72L66 84L75 72V92M92 90Q103 73 113 90M119 80Q132 89 148 80" />
        </>
      )}
      {kind === "plants" && (
        <>
          <circle cx="27" cy="19" r="12" stroke="#fbbf24" />
          <path d="M31 39L44 51M48 23L62 27" stroke="#fbbf24" />
          <path d="M20 54Q70 29 143 49" stroke="#94a3b8" strokeWidth="11" />
          <path d="M67 62L70 70M93 61L95 68" stroke="#fbbf24" strokeDasharray="2 4" />
          <path
            d="M86 95V76Q64 57 57 75Q60 88 86 86M86 81Q104 59 118 72Q119 85 86 89"
            stroke={green}
          />
        </>
      )}
      {kind === "iron" && (
        <>
          <path d="M34 20H126V34H91V74H126V88H34V74H69V34H34Z" fill="#334155" />
          <path
            d="M43 28L53 31M75 47L83 53M78 59L84 65M101 80L112 83"
            stroke="#fb923c"
            strokeWidth="6"
          />
        </>
      )}
      {kind === "soil" && (
        <>
          <path d="M14 61Q77 49 146 61V89H14Z" fill="#47362c" stroke="#c4a484" />
          <path
            d="M21 75H45M57 81H83M101 72H138M82 55V30Q70 18 56 27M82 39Q101 21 112 34"
            stroke={green}
          />
          <path d="M33 17L29 29M122 12L118 24" stroke={rose} />
        </>
      )}
      {kind === "water" && (
        <>
          <path d="M12 40Q30 30 49 40T87 40T125 40T148 40V88H12Z" fill="#164e63" />
          <path d="M48 64Q67 42 94 64Q68 85 48 64L33 52V76Z" />
          <circle cx="82" cy="60" r="2" fill={line} />
          <path d="M39 10L34 23M85 8L80 21M127 11L122 24" stroke={rose} />
        </>
      )}
      {kind === "health" && (
        <>
          <path
            d="M74 12V44L65 50M85 12V44L95 50M65 36C32 27 20 68 35 83Q64 92 67 62ZM95 36C126 27 141 68 127 83Q97 92 93 62Z"
            stroke={rose}
          />
        </>
      )}
      {kind === "buildings" && (
        <>
          <path d="M15 89V38L54 13L94 38V89ZM31 88V52H47V88M64 88V52H80V88M106 90V21H143V90M117 33H130M117 49H130" />
          <path d="M56 24L50 40L59 51L51 60M137 70L126 80" stroke={rose} />
        </>
      )}
      {kind === "climate" && (
        <>
          <circle cx="80" cy="52" r="34" fill="#164e63" />
          <path d="M50 30L70 40L65 54L88 65L84 84M108 35L87 45L108 60" stroke={green} />
        </>
      )}
      {kind === "law" && (
        <>
          <path d="M80 13V83M45 85H115M28 28H132M43 28L24 61H62ZM117 28L98 61H136Z" />
        </>
      )}
      {kind === "education" && (
        <>
          <path d="M80 88V26Q43 8 17 22V79Q48 69 80 88ZM80 26Q116 8 143 22V79Q112 69 80 88M29 36L65 43M29 50L65 57M95 43L132 36M95 57L132 50" />
        </>
      )}
      {kind === "technology" && (
        <>
          <path d="M16 88V45L50 60V36H67V88H16M50 36V21H67V36" />
          <path d="M50 26H67M50 31H67" stroke={green} strokeWidth="4" />
          <path d="M82 81V67L96 54H130L146 67V81Z" />
          <circle cx="96" cy="83" r="7" />
          <circle cx="133" cy="83" r="7" />
          <path d="M116 56L106 70H120L112 79" stroke={green} />
        </>
      )}
    </svg>
  );
}
function Activity({ source, number }: { source: PollutionActivity; number: string }) {
  return (
    <section data-pollution-activity={number} className="border-l-2 border-amber-300/60 pl-5">
      <h3 className="text-xl font-bold text-amber-200">{source.title}</h3>
      <p className="mt-2 text-slate-200">{source.aim}</p>
      {source.context && <p className="mt-2 font-semibold text-amber-100">{source.context}</p>}
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
        {source.instructions.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}
function Practice({ source: p }: { source: PollutionLesson }) {
  const [matches, setMatches] = useState<string[]>(["", "", ""]);
  const [choices, setChoices] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  return (
    <section data-practice="7.3" className="border-t border-sky-300/20 pt-6">
      <h3 className="text-xl font-bold">{p.practice.title}</h3>
      <ol className="mt-4 list-decimal space-y-5 pl-5">
        {p.practice.questions.map((question, i) => (
          <li key={question} data-practice-question={i + 1} className="pl-1 leading-6">
            <p>{question}</p>
            {i === 4 && (
              <div className="mt-3 grid gap-3">
                {p.practice.matches.map((m, j) => (
                  <label
                    key={m.pollutant}
                    className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]"
                  >
                    <span>{m.pollutant}</span>
                    <Arrow />
                    <select
                      aria-label={m.pollutant}
                      value={matches[j]}
                      onChange={(e) => {
                        setMatches(matches.map((v, k) => (k === j ? e.target.value : v)));
                        setChecked(false);
                      }}
                      className="min-h-11 rounded-lg border border-sky-300/25 bg-slate-900 px-3"
                    >
                      <option value="">{p.labels.choose}</option>
                      {[...p.practice.matches].reverse().map((a) => (
                        <option key={a.effect}>{a.effect}</option>
                      ))}
                    </select>
                    {checked && (
                      <span
                        data-match-feedback={j}
                        className="text-sm text-amber-200 sm:col-span-3"
                      >
                        {matches[j] === m.effect ? p.labels.correct : p.labels.retry}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
            {i === 5 && (
              <div className="mt-3 space-y-2">
                {p.practice.choices.map((c, j) => (
                  <div key={c.text}>
                    <label className="flex min-h-11 items-center gap-3">
                      <input
                        type="checkbox"
                        checked={choices.includes(j)}
                        onChange={() => {
                          setChoices(
                            choices.includes(j) ? choices.filter((k) => k !== j) : [...choices, j],
                          );
                          setChecked(false);
                        }}
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>{c.text}</span>
                    </label>
                    {checked && (
                      <p data-choice-feedback={j} className="text-sm text-amber-200">
                        {choices.includes(j) === c.correct ? p.labels.correct : p.labels.retry}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
      <button className={`${button} mt-5 bg-sky-300/10`} onClick={() => setChecked(true)}>
        {p.labels.check}
      </button>
      <div aria-live="polite" className="sr-only">
        {checked
          ? p.practice.matches.every((m, i) => matches[i] === m.effect) &&
            p.practice.choices.every((c, i) => choices.includes(i) === c.correct)
            ? p.labels.correct
            : p.labels.retry
          : ""}
      </div>
    </section>
  );
}
export function Chapter7AirPollution({ source: p }: { source: PollutionLesson }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="space-y-9 text-sm leading-6 sm:text-base" data-pollution-lesson>
      <div>
        <p data-pollution-definition className="max-w-4xl text-slate-200">
          {p.definition}
        </p>
        <p className="mt-2 text-slate-300">{p.sourceStatement}</p>
      </div>
      <section data-source-map>
        <div className="mb-3 grid grid-cols-2 gap-5 font-bold text-sky-200">
          <h3>{p.labels.sources}</h3>
          <h3>{p.labels.pollutants}</h3>
        </div>
        <div className="divide-y divide-sky-300/15 border-y border-sky-300/15">
          {p.sources.map((s, i) => (
            <div
              key={s.id}
              data-source-link={i}
              className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-3 sm:gap-5 ${selected === i ? "bg-sky-300/[.07]" : ""}`}
            >
              <button
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={`${button} flex h-full flex-col items-start border-transparent`}
              >
                <PollutionSymbol kind={`source-${i}`} />
                <span>{s.from}</span>
              </button>
              <Arrow />
              <ul className="space-y-1 text-sm text-rose-100">
                {s.pollutants.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          data-selected-source
          className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-slate-900 px-4 py-2"
        >
          <PollutionSymbol kind={`source-${selected}`} />
          <span className="flex-1 text-sky-100">{p.sources[selected].from}</span>
          <Arrow />
          <span className="flex-1 text-rose-100">{p.sources[selected].pollutants.join(" · ")}</span>
        </div>
      </section>
      <Activity source={p.activity75} number="7.5" />
      <section data-pollution-pathways>
        <h3 className="text-xl font-bold">{p.labels.effects}</h3>
        <div
          data-source-effect-control
          className="my-5 grid gap-2 border-y border-sky-300/20 py-4 sm:grid-cols-4"
        >
          {[
            p.sources[0].origins[1],
            p.pathways[0].pollutant,
            p.pathways[0].effect,
            p.controls[2].items[2],
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-xs font-bold text-sky-300">
                  {[p.labels.sources, p.labels.pollutants, p.labels.effect, p.labels.control][i]}
                </p>
                <p className="mt-1">{s}</p>
              </div>
              {i < 3 && (
                <span aria-hidden="true" className="text-sky-300">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.pathways.map((path, i) => (
            <figure
              key={path.id}
              data-effect-path={path.id}
              className="flex flex-col items-center border-b border-white/10 pb-4 text-center"
            >
              <p className="min-h-12 text-sm text-rose-100">{path.pollutant}</p>
              <span aria-hidden="true" className="text-sky-300">
                ↓
              </span>
              <PollutionSymbol kind={path.id} />
              <figcaption className="font-bold text-sky-100">{path.effect}</figcaption>
              <p className="mt-2 text-sm text-slate-300">{p.effects[3].items[i]}</p>
            </figure>
          ))}
        </div>
        <div
          data-acid-rain
          className="mt-6 rounded-xl border border-rose-300/20 bg-rose-300/[.04] p-4"
        >
          <p className="text-center font-bold text-rose-200">
            {p.pathways[3].pollutant} → {p.pathways[3].effect}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              p.effects[1].items[1],
              p.effects[1].items[2],
              p.effects[2].items[0],
              p.effects[2].items[1],
            ].map((s, i) => (
              <div key={s} data-acid-effect={i} className="flex items-center gap-3">
                <span aria-hidden="true" className="text-rose-300">
                  ↳
                </span>
                <div className="w-20 shrink-0">
                  <PollutionSymbol kind={["buildings", "iron", "soil", "water"][i]} />
                </div>
                <p className="text-sm">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <figure
          data-photosynthesis-path
          className="mt-5 flex flex-col items-center gap-3 sm:flex-row"
        >
          <PollutionSymbol kind="plants" />
          <figcaption className="flex flex-1 flex-wrap items-center gap-3">
            {p.photosynthesis.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span>{s}</span>
                {i < 2 && <Arrow />}
              </span>
            ))}
          </figcaption>
        </figure>
      </section>
      <section data-effect-groups className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {p.effects.map((e) => (
          <div
            key={e.category}
            data-effect-group={e.category}
            className="border-t border-white/15 pt-3"
          >
            <div className="flex items-center gap-3">
              <PollutionSymbol kind={e.category} />
              <h4 className="text-lg font-bold text-sky-100">{e.heading}</h4>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {e.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section data-control-pillars>
        <h3 className="text-xl font-bold">{p.labels.controls}</h3>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {p.controls.map((c, i) => (
            <div
              key={c.heading}
              data-control-pillar={i}
              className="border-t-4 border-emerald-300/50 pt-3"
            >
              <PollutionSymbol kind={["law", "education", "technology"][i]} />
              <h4 className="mb-3 font-bold text-emerald-200">{c.heading}</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                {c.items.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span aria-hidden="true" className="text-emerald-300">
                      ✓
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Activity source={p.activity76} number="7.6" />
      <section data-api-scale>
        <h3 className="text-xl font-bold">{p.api.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{p.api.guidance}</p>
        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/15 sm:grid-cols-5">
          {p.api.bands.map((band, i) => (
            <div
              key={band.range}
              data-api-band={band.severity}
              className="flex items-center justify-between gap-4 bg-slate-900 px-3 py-4 sm:block"
              style={{
                borderTop: `5px solid ${["#6ee7b7", "#7dd3fc", "#fcd34d", "#fb923c", "#fda4af"][i]}`,
              }}
            >
              <p className="font-mono text-lg font-bold">{band.range}</p>
              <p className="text-sm">{band.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Practice source={p} />
    </div>
  );
}
