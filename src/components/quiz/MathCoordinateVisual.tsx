import { useId } from "react";
import {
  clipCoordinateLine,
  coordinateTransform,
  describeMathCoordinateVisual,
  type MathCoordinateVisual as Visual,
  type Coordinate,
} from "@/features/quiz/visuals/mathCoordinateVisual";
import {
  textFor,
  type MathVisualLang,
} from "@/features/quiz/visuals/mathQuestionVisual";

/** An equal-unit coordinate grid. Only supplied geometry is marked, never solutions. */
export function MathCoordinateVisual({
  visual,
  lang,
}: {
  visual: Visual;
  lang: MathVisualLang;
}) {
  const clipId = useId().replace(/:/g, "");
  const [xmin, xmax, ymin, ymax] = visual.domain;
  const { scale, point } = coordinateTransform(visual.domain);
  const [left, bottom] = point([xmin, ymin]);
  const [right, top] = point([xmax, ymax]);
  const xAxis = Math.max(ymin, Math.min(ymax, 0));
  const yAxis = Math.max(xmin, Math.min(xmax, 0));
  const ticks = (lo: number, hi: number) =>
    Array.from(
      {
        length: Math.floor(hi / visual.step) - Math.ceil(lo / visual.step) + 1,
      },
      (_, i) => (Math.ceil(lo / visual.step) + i) * visual.step,
    );
  const line = (
    p: Coordinate,
    q: Coordinate,
    stroke: string,
    dashed = false,
  ) => {
    const [x1, y1] = point(p),
      [x2, y2] = point(q);
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
    );
  };
  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathCoordinateVisual(visual, lang)}
      className="mx-auto w-full max-w-[360px] rounded-xl border border-white/10 bg-slate-950/40 p-3"
    >
      <figcaption className="mb-2 text-center text-sm font-semibold text-amber-200">
        {visual.title[lang]}
      </figcaption>
      <svg viewBox="0 0 300 300" className="block w-full" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <rect x={left} y={top} width={right - left} height={bottom - top} />
          </clipPath>
        </defs>
        <g stroke="#64748b" strokeOpacity={0.3}>
          {ticks(xmin, xmax).map((x) => (
            <line
              key={`gx${x}`}
              x1={point([x, ymin])[0]}
              x2={point([x, ymax])[0]}
              y1={top}
              y2={bottom}
            />
          ))}
          {ticks(ymin, ymax).map((y) => (
            <line
              key={`gy${y}`}
              x1={left}
              x2={right}
              y1={point([xmin, y])[1]}
              y2={point([xmax, y])[1]}
            />
          ))}
        </g>
        {line([xmin, xAxis], [xmax, xAxis], "#94a3b8")}
        {line([yAxis, ymin], [yAxis, ymax], "#94a3b8")}
        <g fill="#94a3b8" fontSize={11} textAnchor="middle">
          {ticks(xmin, xmax)
            .filter((x) => x !== 0)
            .map((x) => (
              <text
                key={`x${x}`}
                x={point([x, xAxis])[0]}
                y={point([x, xAxis])[1] + 14}
              >
                {x}
              </text>
            ))}
          {ticks(ymin, ymax)
            .filter((y) => y !== 0)
            .map((y) => (
              <text
                key={`y${y}`}
                x={point([yAxis, y])[0] - 8}
                y={point([yAxis, y])[1] + 3}
                textAnchor="end"
              >
                {y}
              </text>
            ))}
          <text
            x={point([yAxis, xAxis])[0] - 8}
            y={point([yAxis, xAxis])[1] + 14}
          >
            0
          </text>
          <text x={right + 13} y={point([xmax, xAxis])[1] + 4}>
            x
          </text>
          <text x={point([yAxis, ymax])[0] + 2} y={top - 12}>
            y
          </text>
        </g>
        <g clipPath={`url(#${clipId})`}>
          {visual.paths?.map((p, i) => (
            <path
              key={`p${i}`}
              d={
                p.points
                  .map((xy, j) => `${j ? "L" : "M"}${point(xy).join(",")}`)
                  .join(" ") + (p.closed ? " Z" : "")
              }
              stroke="#fbbf24"
              strokeWidth={2}
              fill={p.closed ? "#fbbf2410" : "none"}
              strokeDasharray={p.dashed ? "5 4" : undefined}
            />
          ))}
          {visual.circles?.map((c, i) => (
            <circle
              key={`c${i}`}
              cx={point(c.centre)[0]}
              cy={point(c.centre)[1]}
              r={c.radius * scale}
              stroke="#a78bfa"
              strokeWidth={2}
              fill="none"
              strokeDasharray={c.dashed ? "5 4" : undefined}
            />
          ))}
          {visual.lines?.map((l, i) => {
            const endpoints = clipCoordinateLine(l, visual.domain);
            return endpoints ? (
              <g key={`l${i}`}>
                {line(
                  endpoints[0],
                  endpoints[1],
                  i % 2 ? "#60a5fa" : "#fbbf24",
                  l.dashed,
                )}
              </g>
            ) : null;
          })}
        </g>
        {visual.points?.map((p, i) => {
          const [x, y] = point(p.at),
            [dx, dy] = p.offset || [8, -8];
          return (
            <g key={`dot${i}`}>
              <circle cx={x} cy={y} r={3} fill="#f8fafc" />
              <text
                x={x + dx}
                y={y + dy}
                fill="#f8fafc"
                fontSize={12}
                fontWeight={600}
                textAnchor={dx < 0 ? "end" : "start"}
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
      {visual.lines?.some((l) => l.label) && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-xs text-slate-300">
          {visual.lines
            .filter((l) => l.label)
            .map((l, i) => (
              <span
                key={i}
                className={i % 2 ? "text-blue-300" : "text-amber-200"}
              >
                {textFor(l.label!, lang)}
              </span>
            ))}
        </div>
      )}
      <p className="mt-2 text-center text-xs text-slate-400">
        {lang === "bm"
          ? "Skala unit sama pada kedua-dua paksi"
          : "Equal unit scales on both axes"}
      </p>
    </figure>
  );
}
