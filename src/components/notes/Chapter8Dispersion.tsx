import { useState } from "react";
import type { DispersionLesson } from "@/content/form1/science/chapter-8/chapter8-content";

// Display colours and coordinates only. All lesson wording comes from the source prop.
const spectrumPaint = ["#f87171", "#fb923c", "#fde047", "#4ade80", "#38bdf8", "#818cf8", "#c084fc"];
export function LightArrow({
  from,
  to,
  color = "#f8fafc",
  kind,
}: {
  from: number[];
  to: number[];
  color?: string;
  kind: string;
}) {
  const dx = to[0] - from[0],
    dy = to[1] - from[1],
    length = Math.hypot(dx, dy);
  const x = from[0] + dx * 0.65,
    y = from[1] + dy * 0.65;
  return (
    <g data-light-ray={kind}>
      <path
        d={`M${from[0]} ${from[1]}L${to[0]} ${to[1]}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      <polygon
        points={`${x},${y} ${x - (dx / length) * 9 - (dy / length) * 3},${y - (dy / length) * 9 + (dx / length) * 3} ${x - (dx / length) * 9 + (dy / length) * 3},${y - (dy / length) * 9 - (dx / length) * 3}`}
        fill={color}
      />
    </g>
  );
}
export function DiagramKey({ items }: { items: string[] }) {
  return (
    <ol className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-200 sm:grid-cols-3">
      {items.map((item, i) => (
        <li key={`${i}-${item}`}>
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-500 text-xs font-bold">
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}
export function Pin({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="11" fill="#0f172a" stroke="#94a3b8" />
      <text textAnchor="middle" y="4" fontSize="12" fill="#fff">
        {n}
      </text>
    </g>
  );
}
export function PrismDiagram({ apparatus = false }: { apparatus?: boolean }) {
  return (
    <svg
      data-optics-visual={apparatus ? "prism-apparatus" : "prism"}
      viewBox="0 0 460 285"
      className="w-full"
      aria-hidden="true"
    >
      <path
        data-prism=""
        d="M230 30L130 220H330Z"
        fill="#67e8f91a"
        stroke="#67e8f9"
        strokeWidth="2"
      />
      <rect data-white-screen="" x="428" y="116" width="20" height="148" rx="2" fill="#f8fafc" />
      {apparatus && (
        <g data-ray-box="" transform="translate(45 184) rotate(-30)">
          <rect x="-32" y="-18" width="48" height="36" rx="3" fill="#475569" stroke="#cbd5e1" />
          <path d="M16 -5V5" stroke="#fff" strokeWidth="4" />
        </g>
      )}
      <LightArrow
        from={[apparatus ? 59 : 40, apparatus ? 176 : 187]}
        to={[185, 115.5]}
        kind="white-entry"
      />
      <path data-normal="entry" d="M130 86.55L230 139.18" stroke="#94a3b8" strokeDasharray="5 5" />
      <path
        data-normal="exit"
        d="M234.69 140.83L318.69 96.62"
        stroke="#94a3b8"
        strokeDasharray="5 5"
      />
      {spectrumPaint.map((color, i) => {
        // Intersection of each internal ray with the same right face (y = 1.9x - 407).
        const slope = 0.035 + i * 0.016;
        const x = (522.5 - 185 * slope) / (1.9 - slope),
          y = 115.5 + (x - 185) * slope;
        const end = 139 + i * 18;
        return (
          <g key={color} data-spectrum-ray={i}>
            <path data-internal-ray="" d={`M185 115.5L${x} ${y}`} stroke={color} strokeWidth="2" />
            <LightArrow from={[x, y]} to={[428, end]} color={color} kind="spectrum-exit" />
            <path d={`M428 ${end}H448`} stroke={color} strokeWidth="6" />
          </g>
        );
      })}
      <Pin x={80} y={135} n={1} />
      <Pin x={229} y={190} n={2} />
      <Pin x={439} y={98} n={3} />
      <Pin x={135} y={73} n={4} />
      {apparatus && <Pin x={35} y={226} n={5} />}
    </svg>
  );
}
function RainbowDiagram() {
  return (
    <svg data-optics-visual="rainbow" viewBox="0 0 460 175" className="w-full" aria-hidden="true">
      <circle cx="42" cy="80" r="25" fill="#fbbf24" />
      <LightArrow from={[74, 80]} to={[139, 80]} kind="sunlight" />
      <path
        data-water-droplet=""
        d="M173 35Q130 85 147 104Q173 132 199 104Q216 85 173 35Z"
        fill="#38bdf833"
        stroke="#7dd3fc"
        strokeWidth="2"
      />
      {spectrumPaint.map((c, i) => (
        <LightArrow
          key={c}
          from={[210, 80]}
          to={[278, 48 + i * 11]}
          color={c}
          kind="dispersed-colour"
        />
      ))}
      {spectrumPaint.map((c, i) => (
        <path
          key={c}
          d={`M${316 + i * 5} 113A${57 - i * 5} ${57 - i * 5} 0 0 1 ${430 - i * 5} 113`}
          fill="none"
          stroke={c}
          strokeWidth="5"
        />
      ))}
      <Pin x={42} y={139} n={1} />
      <Pin x={173} y={147} n={2} />
      <Pin x={263} y={139} n={3} />
      <Pin x={373} y={139} n={4} />
    </svg>
  );
}
function BasinDiagram() {
  return (
    <svg
      data-optics-visual="rainbow-apparatus"
      viewBox="0 0 460 295"
      className="w-full"
      aria-hidden="true"
    >
      <path
        data-basin=""
        d="M90 140L108 260H365L390 140"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="3"
      />
      <path data-water="" d="M101 200H378L365 260H108Z" fill="#38bdf82b" stroke="#7dd3fc" />
      <path data-inclined-mirror="" d="M250 244L377 188.12" stroke="#e2e8f0" strokeWidth="7" />
      <path data-tape="" d="M366 182L390 196" stroke="#fbbf24" strokeWidth="9" />
      <g data-torch="" transform="translate(92 74) rotate(31)">
        <rect width="68" height="27" rx="5" fill="#475569" stroke="#e2e8f0" />
        <ellipse
          data-black-card=""
          cx="72"
          cy="14"
          rx="6"
          ry="25"
          fill="#020617"
          stroke="#94a3b8"
        />
        <ellipse data-card-hole="" cx="72" cy="14" rx="2" ry="3" fill="#f8fafc" />
      </g>
      <LightArrow from={[145, 123]} to={[300, 222]} kind="torch-to-mirror" />
      <path data-white-paper="" d="M271 39L420 63L401 89L252 65Z" fill="#f8fafc" />
      {spectrumPaint.map((c, i) => (
        <LightArrow
          key={c}
          from={[300, 222]}
          to={[277 + i * 17, 66 + i * 2]}
          color={c}
          kind="mirror-to-paper"
        />
      ))}
      <Pin x={92} y={279} n={1} />
      <Pin x={195} y={240} n={2} />
      <Pin x={341} y={213} n={3} />
      <Pin x={82} y={56} n={4} />
      <Pin x={169} y={103} n={5} />
      <Pin x={368} y={39} n={6} />
      <Pin x={405} y={186} n={7} />
    </svg>
  );
}
export function Chapter8Dispersion({ source: s }: { source: DispersionLesson }) {
  const [part, setPart] = useState(0);
  const l = s.labels;
  const prismKey = [l.white, l.prism, l.screen, l.normal];
  return (
    <div data-dispersion-lesson="" className="space-y-8 text-sm leading-6 text-slate-200">
      <p>{s.definition}</p>
      <figure className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-4 sm:p-6">
        <PrismDiagram />
        <figcaption>
          <DiagramKey items={prismKey} />
          <h3 className="mt-5 font-bold text-white">{l.spectrum}</h3>
          <ol className="mt-2 flex flex-wrap gap-3">
            {s.spectrumOrder.map((c, i) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: spectrumPaint[i] }} />
                {c}
              </li>
            ))}
          </ol>
        </figcaption>
      </figure>
      <ol className="space-y-3 border-l-2 border-cyan-400 pl-5">
        {s.prismBehaviour.map((p, i) => (
          <li key={p}>
            <strong className="mr-2 text-cyan-300">{i + 1}.</strong>
            {p}
          </li>
        ))}
      </ol>
      <p className="border-l-2 border-violet-400 pl-5" data-speed-comparison="">
        {s.speedFact}
      </p>
      <section>
        <h3 className="text-xl font-bold text-white">{l.rainbow}</h3>
        <figure>
          <RainbowDiagram />
          <figcaption>
            <DiagramKey items={[l.sun, l.droplet, l.spectrum, l.rainbow]} />
            <p className="mt-4">{s.rainbowFormation}</p>
          </figcaption>
        </figure>
      </section>
      <p className="border-l-2 border-amber-300 pl-5" data-prism-inquiry="">
        {s.inquiry}
      </p>
      <section data-activity="8.7" className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-bold text-white">{s.activity.title}</h3>
        <p className="mt-2">{s.activity.aim}</p>
        <p className="mt-3">
          <strong>{l.apparatus}: </strong>
          {s.activity.apparatus.join(", ")}
        </p>
        <div className="my-4 flex flex-wrap gap-2">
          {s.activity.parts.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={part === i}
              onClick={() => setPart(i)}
              className={`rounded-lg border px-4 py-3 text-left font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${part === i ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-slate-600"}`}
            >
              {p.id} · {p.title}
            </button>
          ))}
        </div>
        <figure
          data-activity-part={part === 0 ? "A" : "B"}
          className="rounded-xl bg-slate-950/40 p-4"
        >
          {part === 0 ? <PrismDiagram apparatus /> : <BasinDiagram />}
          <figcaption>
            <DiagramKey
              items={
                part === 0
                  ? [...prismKey, l.rayBox]
                  : [l.basin, l.water, l.mirror, l.torch, l.card, l.paper, l.tape]
              }
            />
          </figcaption>
        </figure>
        <h4 className="mt-4 font-bold">{l.instructions}</h4>
        <ol className="mt-2 list-decimal space-y-2 pl-6" data-procedure="8.7">
          {s.activity.parts[part].steps.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>
      <section data-practice="8.5" className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-bold text-white">{s.practice.title}</h3>
        <PrismDiagram />
        <ol className="list-decimal space-y-3 pl-6">
          {s.practice.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
