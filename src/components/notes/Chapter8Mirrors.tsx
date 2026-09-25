import { useState, type ReactNode } from "react";
import type {
  Chapter8Content,
  MirrorActivity,
} from "@/content/form1/science/chapter-8/chapter8-content";
type Mirrors = Chapter8Content["mirrors"];
const cyan = "#7dd3fc",
  violet = "#c4b5fd",
  amber = "#fcd34d";
const button =
  "min-h-11 rounded-lg border px-4 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300";
function Drawing({
  children,
  viewBox = "0 0 400 220",
  name,
}: {
  children: ReactNode;
  viewBox?: string;
  name: string;
}) {
  return (
    <svg
      data-mirror-diagram={name}
      viewBox={viewBox}
      aria-hidden="true"
      className="mx-auto w-full max-w-xl"
      fill="none"
      stroke={cyan}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
function Candle({
  x,
  y,
  scale = 1,
  ghost = false,
}: {
  x: number;
  y: number;
  scale?: number;
  ghost?: boolean;
}) {
  return (
    <g
      data-candle={ghost ? "image" : "object"}
      transform={`translate(${x} ${y}) scale(${scale})`}
      opacity={ghost ? 0.5 : 1}
    >
      <rect
        x="-8"
        y="-40"
        width="16"
        height="40"
        rx="2"
        fill={ghost ? violet : "#f8fafc"}
        stroke={ghost ? violet : "#cbd5e1"}
      />
      <path d="M0 -41V-46" stroke={amber} />
      <path d="M0 -47C-18 -54 4 -62 0 -74C16 -60 13 -51 0 -47Z" fill={amber} stroke={amber} />
    </g>
  );
}
function Person({
  x,
  y,
  flip = false,
  scale = 1,
  ghost = false,
}: {
  x: number;
  y: number;
  flip?: boolean;
  scale?: number;
  ghost?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
      opacity={ghost ? 0.4 : 1}
      stroke={ghost ? violet : cyan}
    >
      <circle cx="0" cy="-55" r="14" fill="#334155" />
      <path d="M0 -41V0M0 -30L-24 -12M0 -30L24 -48M0 0L-20 34M0 0L18 34" strokeWidth="7" />
      <circle cx="7" cy="-58" r="2" fill="white" stroke="none" />
    </g>
  );
}
export function MirrorProfile({ kind }: { kind: number }) {
  const d = ["M80 20V140", "M60 20Q120 80 60 140", "M100 20Q40 80 100 140"][kind];
  return (
    <Drawing viewBox="0 0 160 160" name={`profile-${kind}`}>
      <path d={d} transform="translate(8 0)" stroke="#64748b" strokeWidth="12" />
      <path data-reflecting-surface d={d} stroke={cyan} strokeWidth="5" />
    </Drawing>
  );
}
export function ImageApparatus({ virtual = false }: { virtual?: boolean }) {
  return (
    <Drawing name={virtual ? "virtual-apparatus" : "real-apparatus"}>
      {virtual ? (
        <>
          <path data-plane-mirror d="M200 20V190" strokeWidth="7" />
          <Person x={100} y={120} />
          <Person x={300} y={120} flip ghost />
          <path d="M210 20V190" stroke="#475569" strokeDasharray="5 8" />
          <rect
            data-blank-screen
            x="310"
            y="171"
            width="56"
            height="35"
            fill="white"
            stroke="#cbd5e1"
          />
          <path d="M326 180L350 199M350 180L326 199" stroke="#fda4af" />
        </>
      ) : (
        <>
          <path d="M15 195H388" stroke="#475569" />
          <Candle x={45} y={180} />
          <path data-black-card d="M165 35L192 22V178L165 191Z" fill="#020617" stroke="#94a3b8" />
          <circle data-pinhole cx="178" cy="110" r="4" fill="white" stroke="none" />
          <path data-pin d="M125 38L158 57" stroke="#e2e8f0" />
          <circle cx="122" cy="36" r="5" fill={violet} />
          <path data-white-screen d="M315 25L378 47V195L315 175Z" fill="#f8fafc" stroke="#cbd5e1" />
          <g transform="translate(346 96) rotate(180)">
            <Candle x={0} y={0} scale={0.65} />
          </g>
          <path d="M80 206H137M216 206H288" stroke={amber} />
          <path d="M130 201L137 206L130 211M281 201L288 206L281 211" stroke={amber} />
        </>
      )}
    </Drawing>
  );
}
export function PlaneDistance() {
  return (
    <Drawing name="plane-distance" viewBox="0 0 400 250">
      <g data-graph-paper stroke="#1e3a5f" strokeWidth="1">
        {Array.from({ length: 19 }, (_, i) => (
          <path key={i} d={`M${20 + i * 20} 40V220`} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M20 ${40 + i * 20}H380`} />
        ))}
      </g>
      <path data-plane-mirror d="M200 20V220" strokeWidth="6" />
      <Candle x={120} y={160} />
      <Candle x={280} y={160} ghost />
      <g stroke={amber}>
        <path data-object-distance d="M120 195H200" />
        <path data-image-distance d="M200 195H280" />
        <path d="M125 190L120 195L125 200M195 190L200 195L195 200M205 190L200 195L205 200M275 190L280 195L275 200" />
      </g>
      <g fill={amber} stroke="none" fontSize="16" textAnchor="middle">
        <text x="160" y="185">
          d
        </text>
        <text x="240" y="185">
          d
        </text>
      </g>
    </Drawing>
  );
}
export function MirrorComparison({ kind }: { kind: number }) {
  return (
    <Drawing name={`comparison-${kind}`}>
      <g data-graph-paper stroke="#1e3a5f" strokeWidth="1">
        {Array.from({ length: 20 }, (_, i) => (
          <path key={i} d={`M${i * 20} 180V210M0 ${180 + i * 2}H400`} />
        ))}
      </g>
      <Candle x={105} y={180} />
      <Candle x={295} y={180} scale={[1, 1.45, 0.6][kind]} ghost />
      <path d="M185 116H215M207 108L215 116L207 124" stroke={amber} />
    </Drawing>
  );
}
export function PeriscopeDiagram({ stage = 3, wall = false }: { stage?: number; wall?: boolean }) {
  return (
    <Drawing name={wall ? "wall-periscope" : "periscope"} viewBox="0 0 400 280">
      {wall && <path data-wall d="M40 135H123V260H40Z" fill="#334155" stroke="#64748b" />}
      <path data-box d="M120 30H211V235H299M120 80H150V185H299" stroke="#64748b" strokeWidth="6" />
      <path data-periscope-mirror="upper" d="M155 30L205 80" strokeWidth="7" />
      <path data-periscope-mirror="lower" d="M155 180L205 230" strokeWidth="7" />
      <g stroke={amber} strokeWidth="4">
        <path data-light-leg="incident" d="M46 55H180" opacity={stage >= 1 ? 1 : 0.15} />
        <path data-light-leg="between-mirrors" d="M180 55V205" opacity={stage >= 2 ? 1 : 0.15} />
        <path data-light-leg="to-eye" d="M180 205H309" opacity={stage >= 3 ? 1 : 0.15} />
        <path d="M112 49L123 55L112 61" opacity={stage >= 1 ? 1 : 0.15} />
        <path d="M174 121L180 132L186 121" opacity={stage >= 2 ? 1 : 0.15} />
        <path d="M246 199L257 205L246 211" opacity={stage >= 3 ? 1 : 0.15} />
      </g>
      <path data-eye d="M315 205Q335 181 357 205Q336 228 315 205Z" />
      <circle cx="337" cy="205" r="7" fill={cyan} />
      <path d="M18 64L33 37L46 64ZM21 64H49L43 76H27Z" fill="#334155" />
      <path d="M8 87Q29 77 51 87T91 87" />
      <g fill={violet} stroke="none" fontSize="14">
        <text x="215" y="51">
          45°
        </text>
        <text x="109" y="224">
          45°
        </text>
      </g>
    </Drawing>
  );
}
export function KaleidoscopeDiagram({ rotation = 0 }: { rotation?: number }) {
  return (
    <Drawing name="kaleidoscope" viewBox="0 0 480 230">
      <circle cx="115" cy="118" r="96" stroke="#475569" />
      <g data-three-mirrors strokeWidth="6">
        <path d="M115 28L37 164" />
        <path d="M37 164H193" />
        <path d="M193 164L115 28" />
      </g>
      <g data-actual-beads transform={`rotate(${rotation} 115 118)`}>
        <circle cx="104" cy="100" r="8" fill="#fda4af" stroke="none" />
        <circle cx="128" cy="123" r="7" fill={amber} stroke="none" />
        <path d="M86 136L98 128L102 142Z" fill="#6ee7b7" stroke="none" />
      </g>
      <path d="M220 118H249M241 110L249 118L241 126" stroke={amber} />
      <circle cx="365" cy="118" r="94" stroke={violet} />
      <g data-reflected-pattern transform={`rotate(${rotation} 365 118)`}>
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} data-reflected-set transform={`rotate(${i * 60} 365 118)`}>
            <circle cx="358" cy="67" r="8" fill="#fda4af" stroke="none" />
            <circle cx="383" cy="76" r="7" fill={amber} stroke="none" />
            <path d="M362 35L372 43L358 48Z" fill="#6ee7b7" stroke="none" />
          </g>
        ))}
      </g>
    </Drawing>
  );
}
export function ApplicationDiagram({ kind }: { kind: number }) {
  return (
    <Drawing name={`application-${kind}`}>
      {kind === 0 ? (
        <>
          <Person x={105} y={135} />
          <path d="M200 22V197" strokeWidth="6" />
          <Person x={295} y={135} flip ghost />
        </>
      ) : kind === 1 ? (
        <>
          <path
            d="M55 87Q38 44 68 47Q82 55 96 47Q131 40 115 89L104 151Q98 162 85 108Q75 151 65 157Z"
            fill="#e2e8f0"
          />
          <circle cx="282" cy="93" r="73" strokeWidth="6" />
          <path d="M255 188L261 163" strokeWidth="9" />
          <g transform="translate(150 -4) scale(1.35)">
            <path
              d="M55 87Q38 44 68 47Q82 55 96 47Q131 40 115 89L104 140Q98 146 85 108Q75 140 65 140Z"
              fill="#c4b5fd"
              stroke={violet}
            />
          </g>
        </>
      ) : (
        <>
          <path
            data-wide-view
            d="M185 141L23 31H376L215 141"
            fill="#7dd3fc"
            fillOpacity=".07"
            strokeDasharray="6 6"
          />
          {[50, 180, 310].map((x) => (
            <g key={x} transform={`translate(${x} 26)`}>
              <rect width="34" height="40" rx="3" fill="#334155" />
              <path d="M8 10H26M8 21H26" />
            </g>
          ))}
          <ellipse cx="200" cy="149" rx="83" ry="49" fill="#164e63" strokeWidth="5" />
          {[154, 190, 226].map((x) => (
            <rect key={x} x={x} y="134" width="21" height="30" rx="2" fill={violet} stroke="none" />
          ))}
          <path d="M200 198V215" strokeWidth="7" />
        </>
      )}
    </Drawing>
  );
}
export function LifeDiagram({ kind }: { kind: number }) {
  if (kind === 1) return <PeriscopeDiagram wall />;
  return (
    <Drawing name={`life-${kind}`}>
      {kind === 0 ? (
        <>
          <circle cx="93" cy="167" r="38" />
          <circle cx="246" cy="167" r="38" />
          <path d="M93 167L146 98L180 167H93M180 167L221 89L246 167M131 98H158M205 89H234M219 88V56L259 37" />
          <ellipse cx="274" cy="31" rx="25" ry="16" fill="#164e63" />
          <path d="M263 33H283M275 23V34" stroke={violet} />
          <path d="M22 125H61M50 119L61 125L50 131" stroke={amber} />
        </>
      ) : (
        <>
          <path d="M22 181H159V45H370M22 215H193V80H370" stroke="#64748b" strokeWidth="8" />
          <rect x="216" y="99" width="132" height="90" fill="#334155" stroke="#64748b" />
          <ellipse cx="184" cy="46" rx="32" ry="23" fill="#164e63" strokeWidth="5" />
          <path d="M183 69V111" />
          <Person x={102} y={164} scale={0.5} />
          <Person x={312} y={57} scale={0.4} />
          <path d="M177 38L169 54M185 43L198 39" stroke={violet} />
        </>
      )}
    </Drawing>
  );
}
function Activity({
  source: a,
  labels: l,
  children,
}: {
  source: MirrorActivity;
  labels: MirrorLessonLabels;
  children?: ReactNode;
}) {
  return (
    <section
      data-mirror-activity={a.title.slice(-3)}
      className="space-y-4 border-t border-white/15 pt-5"
    >
      <h3 className="text-xl font-bold text-violet-200">{a.title}</h3>
      <p>{a.aim}</p>
      {children}
      {a.materials.length > 0 && (
        <div>
          <h4 className="font-semibold text-sky-200">{l.materials}</h4>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-300">
            {a.materials.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      <details className="rounded-xl border border-white/10 p-3">
        <summary className="min-h-9 cursor-pointer font-semibold">{l.instructions}</summary>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
          {a.instructions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        {a.questions.length > 0 && (
          <>
            <h4 className="mt-4 font-bold">{l.questions}</h4>
            <ol className="list-decimal space-y-2 pl-5 text-sm">
              {a.questions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </>
        )}
      </details>
    </section>
  );
}
type MirrorLessonLabels = Mirrors["lesson"]["labels"];
export function Chapter8Mirrors({ source: m }: { source: Mirrors }) {
  const l = m.lesson;
  const [mirror, setMirror] = useState(0);
  const [stage, setStage] = useState(3);
  const [rotation, setRotation] = useState(0);
  return (
    <div data-mirrors-lesson className="space-y-9 text-sm leading-6 sm:text-base">
      <section data-image-comparison className="grid gap-6 lg:grid-cols-2">
        {[false, true].map((v) => (
          <figure key={String(v)}>
            <h3 className="font-bold text-xl text-violet-200">
              {v ? l.labels.virtual : l.labels.real}
            </h3>
            <ImageApparatus virtual={v} />
            <figcaption>
              <p>{v ? m.realVsVirtual.virtual : m.realVsVirtual.real}</p>
              <p className="mt-2 text-sm text-slate-300">
                {v
                  ? l.planeVirtual
                  : [l.labels.candle, l.labels.blackCard, l.labels.pinhole, l.labels.screen].join(
                      " → ",
                    )}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
      <Activity source={l.activity81} labels={l.labels}>
        <div className="grid gap-3 sm:grid-cols-2">
          <p className="text-sm text-sky-200">
            {l.labels.pin} → {l.labels.pinhole} → {l.labels.screen}
          </p>
          <p className="text-sm text-violet-200">
            {m.mirrorTypes[0].name} → {l.labels.virtual}
          </p>
        </div>
      </Activity>
      <section>
        <h3 className="text-xl font-bold">{l.labels.shapes}</h3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {m.mirrorTypes.map((t, i) => (
            <figure key={t.name} className="text-center">
              <div className="mx-auto max-w-36">
                <MirrorProfile kind={i} />
              </div>
              <figcaption className="mt-2 font-bold text-sky-200">{t.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-sky-300">{l.labels.reflectingSurface}</p>
      </section>
      <Activity source={l.activity82} labels={l.labels}>
        <div data-mirror-selector className="flex flex-wrap gap-2">
          {m.mirrorTypes.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setMirror(i)}
              aria-pressed={mirror === i}
              className={`${button} ${mirror === i ? "border-sky-300 bg-sky-300/15" : "border-white/15"}`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div data-mirror-comparison className="grid items-center gap-3 sm:grid-cols-[120px_1fr]">
          <div className="mx-auto w-24">
            <MirrorProfile kind={mirror} />
          </div>
          <div>
            <MirrorComparison kind={mirror} />
            <div className="grid grid-cols-2 text-center text-sm">
              <span>{l.labels.object}</span>
              <span>
                {l.labels.image}: {l.sizes[mirror]}
              </span>
            </div>
          </div>
        </div>
      </Activity>
      <figure data-equal-distance className="rounded-2xl bg-sky-300/[.04] p-4">
        <h3 className="text-center font-bold text-sky-200">{l.labels.distance}</h3>
        <PlaneDistance />
        <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 text-center text-sm">
          <span>{l.labels.object}</span>
          <span>{m.mirrorTypes[0].name}</span>
          <span>{l.labels.virtual}</span>
        </div>
        <figcaption className="mt-4">
          <p className="text-center text-sm text-slate-400">{l.labels.graph}</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-violet-200">
            {m.planeMirrorCharacteristics.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </figcaption>
      </figure>
      <section data-mirror-applications>
        <h3 className="text-xl font-bold">{l.labels.applications}</h3>
        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          {m.mirrorTypes.map((t, i) => (
            <div key={t.name} className="border-t border-violet-300/30 pt-3">
              <h4 className="font-bold text-violet-200">{t.name}</h4>
              <ApplicationDiagram kind={i} />
              <p className="text-center font-semibold text-sky-200">{l.sizes[i]}</p>
              <span aria-hidden="true" className="block text-center text-amber-300">
                ↓
              </span>
              <ul className="space-y-2 text-sm text-slate-300">
                {t.uses.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Activity source={l.activity83} labels={l.labels} />
      <section data-periscope>
        <h3 className="text-xl font-bold text-violet-200">{m.opticalInstruments[0].name}</h3>
        <div className="grid items-center gap-5 md:grid-cols-2">
          <PeriscopeDiagram stage={stage} />
          <div>
            <p>{m.opticalInstruments[0].howItWorks}</p>
            <p className="mt-3 text-sm font-semibold text-amber-200">{l.labels.periscopePath}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  aria-label={`${l.labels.periscopePath}: ${n}`}
                  aria-pressed={stage === n}
                  onClick={() => setStage(n)}
                  className={`${button} ${stage === n ? "border-amber-300" : "border-white/15"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Activity source={l.activity84} labels={l.labels}>
          <p data-knife-warning className="border-l-2 border-amber-300 pl-3 text-amber-200">
            {l.knifeWarning}
          </p>
          <div className="text-sm text-slate-300">
            {l.periscopeMeasurements.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </Activity>
      </section>
      <section data-kaleidoscope>
        <h3 className="text-xl font-bold text-violet-200">{m.opticalInstruments[1].name}</h3>
        <KaleidoscopeDiagram rotation={rotation} />
        <div className="grid grid-cols-2 gap-4 text-center text-sm text-sky-200">
          <span>
            {l.activity85.materials[1]} · {l.labels.beads}
          </span>
          <span>{l.labels.reflections}</span>
        </div>
        <p className="my-4">{m.opticalInstruments[1].howItWorks}</p>
        <button
          className={`${button} border-violet-300/40`}
          onClick={() => setRotation((rotation + 20) % 360)}
        >
          {l.labels.rotate}
        </button>
        <div className="mt-5">
          <Activity source={l.activity85} labels={l.labels} />
        </div>
      </section>
      <section data-science-in-life>
        <h3 className="text-xl font-bold">{l.labels.scienceInLife}</h3>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {l.life.map((s, i) => (
            <div key={s.problem} data-life-problem={i} className="border-t border-white/15 pt-4">
              <h4 className="font-bold text-amber-200">
                {l.labels.problem} {i + 1}
              </h4>
              <LifeDiagram kind={i} />
              <p>{s.problem}</p>
              <details className="mt-3 rounded-xl border border-sky-300/20 p-3">
                <summary className="min-h-9 cursor-pointer font-semibold text-sky-200">
                  {l.labels.solution}
                </summary>
                <p>{s.solution}</p>
                <p className="mt-2 text-sm text-violet-200">
                  {l.labels.reason}: {s.reason}
                </p>
              </details>
            </div>
          ))}
        </div>
      </section>
      <section data-practice="8.1" className="border-t border-white/15 pt-5">
        <h3 className="text-xl font-bold">{l.practice.title}</h3>
        <ol className="mt-4 list-decimal space-y-4 pl-5">
          {l.practice.questions.map((s, i) => (
            <li key={s}>
              {s}
              {i === 0 && (
                <Drawing name="practice-mirror">
                  <Person x={90} y={130} scale={1.15} />
                  <path d="M226 15Q180 110 226 205" strokeWidth="6" />
                  <Person x={293} y={140} scale={0.7} ghost />
                </Drawing>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
