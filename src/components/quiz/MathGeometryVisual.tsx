import {
  describeMathGeometryVisual,
  type GeometryPanel,
  type MathGeometryVisual as Visual,
} from "@/features/quiz/visuals/mathGeometryVisual";
import {
  textFor,
  type MathVisualLang,
} from "@/features/quiz/visuals/mathQuestionVisual";

function PanelDrawing({
  panel: p,
  lang,
  compact,
  className,
}: {
  panel: GeometryPanel;
  lang: MathVisualLang;
  compact: boolean;
  className: string;
}) {
  const stroke = compact ? 1.5 : 2;
  const vectorEffect = compact ? "non-scaling-stroke" : undefined;
  const [width, height] = p.viewBox ?? [300, 240];
  // Compact figures draw filled regions first so lines (radii, chords) sit on
  // top of shading; the standard layout keeps its original paint order.
  const lines = (
    <>
      {p.paths?.map((path, i) => (
        <path
          key={`p${i}`}
          d={`${path.points.map(([x, y], j) => `${j ? "L" : "M"}${x},${y}`).join(" ")}${path.closed ? " Z" : ""}`}
          fill={path.fill || (compact && path.closed) ? "#fbbf2412" : "none"}
          stroke="#fbbf24"
          strokeWidth={stroke}
          strokeLinejoin="round"
          strokeDasharray={path.dashed ? "5 4" : undefined}
          vectorEffect={vectorEffect}
        />
      ))}
    </>
  );
  const regions = (
    <>
      {p.rings?.map((ring, i) => {
        const [x, y] = ring.centre;
        const loop = (r: number) =>
          `M${x - r},${y} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 Z`;
        return (
          <path key={`r${i}`} d={`${loop(ring.outer)} ${loop(ring.inner)}`} fill="#fbbf2433" fillRule="evenodd" />
        );
      })}
      {p.circles?.map((c, i) => (
        <circle
          key={`c${i}`}
          cx={c.centre[0]}
          cy={c.centre[1]}
          r={c.radius}
          fill={c.fill === "none" ? "none" : c.fill === "shade" ? "#fbbf2433" : "#fbbf2412"}
          stroke={c.tone === "accent" ? "#38bdf8" : "#fbbf24"}
          strokeWidth={stroke}
          strokeDasharray={c.dashed ? "5 4" : undefined}
          vectorEffect={vectorEffect}
        />
      ))}
    </>
  );
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {p.grid && (
        <g stroke="#64748b" strokeOpacity="0.3" strokeWidth="1">
          {Array.from({ length: p.grid.columns + 1 }, (_, i) => (
            <line
              key={`x${i}`}
              x1={p.grid!.origin[0] + i * p.grid!.step}
              x2={p.grid!.origin[0] + i * p.grid!.step}
              y1={p.grid!.origin[1]}
              y2={p.grid!.origin[1] + p.grid!.rows * p.grid!.step}
            />
          ))}
          {Array.from({ length: p.grid.rows + 1 }, (_, i) => (
            <line
              key={`y${i}`}
              x1={p.grid!.origin[0]}
              x2={p.grid!.origin[0] + p.grid!.columns * p.grid!.step}
              y1={p.grid!.origin[1] + i * p.grid!.step}
              y2={p.grid!.origin[1] + i * p.grid!.step}
            />
          ))}
        </g>
      )}
      {compact ? <>{regions}{lines}</> : <>{lines}{regions}</>}
      {p.dots?.map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r={compact ? 2.5 : 3} fill="#fbbf24" />
      ))}
      {p.arcs?.map((a, i) => {
        const point = (angle: number) => [
          a.centre[0] + a.radius * Math.cos((angle * Math.PI) / 180),
          a.centre[1] + a.radius * Math.sin((angle * Math.PI) / 180),
        ];
        const start = point(a.start),
          end = point(a.end);
        return (
          <path
            key={`a${i}`}
            d={`M${start} A${a.radius},${a.radius} 0 ${Math.abs(a.end - a.start) > 180 ? 1 : 0},${a.end > a.start ? 1 : 0} ${end}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={stroke}
            vectorEffect={vectorEffect}
          />
        );
      })}
      {p.labels.map((l, i) => (
        <text
          key={`l${i}`}
          x={l.at[0]}
          y={l.at[1]}
          textAnchor={l.anchor ?? "middle"}
          fill="#e2e8f0"
          fontSize={compact ? 13 : 14}
          fontWeight="600"
          paintOrder="stroke"
          stroke="#0b1220"
          strokeWidth={compact ? 3 : 4}
          strokeLinejoin="round"
        >
          {textFor(l.text, lang)
            .split("\n")
            .map((line, j) => (
              <tspan key={j} x={l.at[0]} dy={j ? 18 : 0}>
                {line}
              </tspan>
            ))}
        </text>
      ))}
    </svg>
  );
}

function NotToScale({ lang, className }: { lang: MathVisualLang; className: string }) {
  return (
    <p className={`${className} text-center text-xs text-slate-400`}>
      {lang === "bm" ? "Rajah tidak mengikut skala" : "Diagram not to scale"}
    </p>
  );
}

/** Static SVG geometry keeps labels legible on mobile, with no image downloads. */
export function MathGeometryVisual({
  visual,
  lang,
}: {
  visual: Visual;
  lang: MathVisualLang;
}) {
  if (visual.layout === "compact") {
    // Textbook figure: the panel title names the shape and the drawing is sized
    // to its own tight canvas (150px wide on phones, 180px from sm up), centred,
    // with no card chrome or reserved empty space around it.
    return (
      <figure
        data-math-visual={visual.kind}
        data-layout="compact"
        role="img"
        aria-label={describeMathGeometryVisual(visual, lang)}
        className="mx-auto flex w-full flex-col items-center"
      >
        {visual.panels.map((p, index) => (
          <div key={index} className="flex flex-col items-center">
            {p.title[lang] && (
              <p className="mb-1.5 text-center text-sm font-semibold text-amber-200">
                {p.title[lang]}
              </p>
            )}
            <PanelDrawing
              panel={p}
              lang={lang}
              compact
              className="block h-auto w-[150px] max-w-full sm:w-[180px]"
            />
          </div>
        ))}
        {visual.notToScale !== false && <NotToScale lang={lang} className="mt-1" />}
      </figure>
    );
  }

  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathGeometryVisual(visual, lang)}
      className="mx-auto w-full max-w-[640px]"
    >
      <figcaption className="mb-2 text-center text-sm font-semibold text-slate-300">
        {visual.title[lang]}
      </figcaption>
      <div
        className={`grid gap-3 ${visual.panels.length > 1 ? "sm:grid-cols-2" : ""}`}
      >
        {visual.panels.map((p, index) => (
          <div
            key={index}
            className={`mx-auto w-full ${visual.panels.length > 1 ? "max-w-[320px]" : "max-w-[440px]"} rounded-xl border border-white/10 bg-slate-950/40 p-2`}
          >
            <p className="text-center text-xs font-semibold text-amber-200">
              {p.title[lang]}
            </p>
            <PanelDrawing panel={p} lang={lang} compact={false} className="block w-full" />
          </div>
        ))}
      </div>
      <NotToScale lang={lang} className="mt-2" />
    </figure>
  );
}
