import {
  describeMathGeometryVisual,
  type MathGeometryVisual as Visual,
} from "@/features/quiz/visuals/mathGeometryVisual";
import {
  textFor,
  type MathVisualLang,
} from "@/features/quiz/visuals/mathQuestionVisual";

/** Static SVG geometry keeps labels legible on mobile, with no image downloads. */
export function MathGeometryVisual({
  visual,
  lang,
}: {
  visual: Visual;
  lang: MathVisualLang;
}) {
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
            className="mx-auto w-full max-w-[320px] rounded-xl border border-white/10 bg-slate-950/40 p-2"
          >
            <p className="text-center text-xs font-semibold text-amber-200">
              {p.title[lang]}
            </p>
            <svg
              viewBox="0 0 300 240"
              className="block w-full"
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
              {p.paths?.map((path, i) => (
                <path
                  key={`p${i}`}
                  d={`${path.points.map(([x, y], j) => `${j ? "L" : "M"}${x},${y}`).join(" ")}${path.closed ? " Z" : ""}`}
                  fill={path.fill ? "#fbbf2412" : "none"}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeDasharray={path.dashed ? "5 4" : undefined}
                />
              ))}
              {p.circles?.map((c, i) => (
                <circle
                  key={`c${i}`}
                  cx={c.centre[0]}
                  cy={c.centre[1]}
                  r={c.radius}
                  fill="#fbbf2412"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
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
                    strokeWidth="2"
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
                  fontSize="14"
                  fontWeight="600"
                  paintOrder="stroke"
                  stroke="#0b1220"
                  strokeWidth="4"
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
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-slate-400">
        {lang === "bm" ? "Rajah tidak mengikut skala" : "Diagram not to scale"}
      </p>
    </figure>
  );
}
