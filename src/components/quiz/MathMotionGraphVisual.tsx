import {
  describeMathMotionGraphVisual,
  MOTION_GRAPH_FRAME as F,
  motionGraphTransform,
  type MathMotionGraphVisual as Visual,
} from "@/features/quiz/visuals/mathMotionGraphVisual";
import type { MathVisualLang } from "@/features/quiz/visuals/mathQuestionVisual";

const AXIS = "#94a3b8";
const GUIDE = "rgba(148,163,184,0.45)";
const LINE = "#fbbf24";

/** Linear time axis and value axis from 0; only the supplied readings are labelled. */
export function MathMotionGraphVisual({ visual, lang }: { visual: Visual; lang: MathVisualLang }) {
  const point = motionGraphTransform(visual);
  const vertices = visual.segments.flat();
  const label = (value: number) => String(value).replace("-", "−");
  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathMotionGraphVisual(visual, lang)}
      className="mx-auto w-full max-w-[440px] rounded-xl border border-white/10 bg-slate-950/40 p-3"
    >
      <figcaption className="mb-1 text-center text-sm font-semibold text-amber-200">
        {visual.title[lang]}
      </figcaption>
      <svg viewBox="0 0 320 220" className="block w-full" aria-hidden="true">
        {visual.shade && (
          <path
            d={`${visual.shade.map((p, i) => `${i ? "L" : "M"}${point(p).join(",")}`).join(" ")} Z`}
            fill="rgba(56,189,248,0.16)"
            stroke="none"
          />
        )}
        {/* Dashed guides from each plotted vertex to whichever labelled axis value it meets. */}
        {vertices.map(([t, v], i) => {
          const [x, y] = point([t, v]);
          return (
            <g key={`g${i}`} stroke={GUIDE} strokeDasharray="3 3">
              {visual.yTicks.includes(v) && v !== 0 && t !== 0 && (
                <line x1={F.left} x2={x} y1={y} y2={y} />
              )}
              {visual.xTicks.includes(t) && t !== 0 && v !== 0 && (
                <line x1={x} x2={x} y1={y} y2={F.bottom} />
              )}
            </g>
          );
        })}
        <line
          x1={F.left}
          x2={F.right + 8}
          y1={F.bottom}
          y2={F.bottom}
          stroke={AXIS}
          strokeWidth={1.4}
        />
        <line
          x1={F.left}
          x2={F.left}
          y1={F.bottom}
          y2={F.top - 8}
          stroke={AXIS}
          strokeWidth={1.4}
        />
        <path d={`M${F.right + 12},${F.bottom} l-7,-4 v8 z`} fill={AXIS} />
        <path d={`M${F.left},${F.top - 12} l-4,7 h8 z`} fill={AXIS} />
        <g fill={AXIS} fontSize={11} textAnchor="middle">
          <text x={F.left - 7} y={F.bottom + 14}>
            0
          </text>
          {visual.xTicks
            .filter((t) => t !== 0)
            .map((t) => {
              const [x] = point([t, 0]);
              return (
                <g key={`x${t}`}>
                  <line x1={x} x2={x} y1={F.bottom} y2={F.bottom + 4} stroke={AXIS} />
                  <text x={x} y={F.bottom + 15}>
                    {label(t)}
                  </text>
                </g>
              );
            })}
          {visual.yTicks
            .filter((v) => v !== 0)
            .map((v) => {
              const [, y] = point([0, v]);
              return (
                <g key={`y${v}`}>
                  <line x1={F.left - 4} x2={F.left} y1={y} y2={y} stroke={AXIS} />
                  <text x={F.left - 7} y={y + 4} textAnchor="end">
                    {label(v)}
                  </text>
                </g>
              );
            })}
          <text x={(F.left + F.right) / 2} y={F.bottom + 34} fill="#cbd5e1">
            {visual.xLabel[lang]}
          </text>
          <text
            x={13}
            y={(F.top + F.bottom) / 2}
            fill="#cbd5e1"
            transform={`rotate(-90 13 ${(F.top + F.bottom) / 2})`}
          >
            {visual.yLabel[lang]}
          </text>
        </g>
        {visual.segments.map((segment, i) => (
          <polyline
            key={`s${i}`}
            points={segment.map((p) => point(p).join(",")).join(" ")}
            fill="none"
            stroke={LINE}
            strokeWidth={2.4}
            strokeLinejoin="round"
          />
        ))}
        {vertices.map((p, i) => {
          const [x, y] = point(p);
          return <circle key={`v${i}`} cx={x} cy={y} r={3} fill={LINE} />;
        })}
      </svg>
      <p className="mt-1 text-center text-xs text-slate-400">{visual.description[lang]}</p>
    </figure>
  );
}
