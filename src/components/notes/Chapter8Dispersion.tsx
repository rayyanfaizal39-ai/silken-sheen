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
export function PrismDiagram() {
  return (
    <svg
      data-optics-visual="prism"
      viewBox="0 0 460 285"
      className="mx-auto w-full max-w-2xl"
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
      <LightArrow from={[40, 187]} to={[185, 115.5]} kind="white-entry" />
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
    </svg>
  );
}
function RainbowDiagram() {
  return (
    <svg
      data-optics-visual="rainbow"
      viewBox="0 0 460 175"
      className="mx-auto w-full max-w-2xl"
      aria-hidden="true"
    >
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
export function Chapter8Dispersion({ source: s }: { source: DispersionLesson }) {
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
    </div>
  );
}
