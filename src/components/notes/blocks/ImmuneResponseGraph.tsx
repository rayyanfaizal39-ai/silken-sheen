import { useState } from "react";
import type { ImmuneResponseGraphBlock } from "@/content/form2/science/interactive-types";

/**
 * Antibody concentration after a first and a second exposure to the same
 * antigen.
 *
 * Drawn as SVG rather than a picture so both language streams share one
 * component, every label stays selectable, and the curves keep their shape at
 * any width. The teaching point is the contrast: the first exposure produces a
 * slow, low response that may not reach the protective level, while the second
 * produces a fast, much higher one.
 */
export function ImmuneResponseGraph({ block }: { block: ImmuneResponseGraphBlock }) {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = block.items.find((i) => i.id === active) ?? null;

  // viewBox space: 0..320 wide, 0..170 tall, axes inset from the edges.
  const X0 = 34;
  const X1 = 310;
  const Y0 = 140; // baseline
  const Y1 = 16; // top

  const immuneLevelY = 74;
  const firstExposureX = 74;
  const secondExposureX = 176;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 170"
          className="mx-auto h-auto w-full min-w-[300px] max-w-[460px]"
          role="img"
          aria-label={block.title}
        >
          {/* protective level */}
          <line
            x1={X0}
            y1={immuneLevelY}
            x2={X1}
            y2={immuneLevelY}
            className="stroke-emerald-400/70"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={X1}
            y={immuneLevelY - 4}
            textAnchor="end"
            fontSize="7.5"
            className="fill-emerald-300"
          >
            {block.immuneLevelLabel}
          </text>

          {/* axes */}
          <line x1={X0} y1={Y1} x2={X0} y2={Y0} className="stroke-border" strokeWidth="1.5" />
          <line x1={X0} y1={Y0} x2={X1} y2={Y0} className="stroke-border" strokeWidth="1.5" />

          {/* primary response: slow rise, stays under the protective level */}
          <path
            d={`M${firstExposureX},${Y0} C 92,${Y0} 100,96 112,92 C 124,88 136,110 150,${Y0}`}
            fill="none"
            className={active === "primary" ? "stroke-sky-300" : "stroke-sky-400/80"}
            strokeWidth={active === "primary" ? 3 : 2}
            strokeLinecap="round"
          />
          {/* secondary response: faster, far higher */}
          <path
            d={`M${secondExposureX},${Y0} C 188,${Y0} 194,40 208,28 C 224,16 244,44 262,${Y0}`}
            fill="none"
            className={active === "secondary" ? "stroke-violet-300" : "stroke-violet-400/80"}
            strokeWidth={active === "secondary" ? 3 : 2}
            strokeLinecap="round"
          />

          {/* exposure markers */}
          {[
            { id: "first", x: firstExposureX },
            { id: "second", x: secondExposureX },
          ].map((mark) => (
            <line
              key={mark.id}
              x1={mark.x}
              y1={Y0}
              x2={mark.x}
              y2={Y1 + 6}
              className={active === mark.id ? "stroke-primary" : "stroke-white/30"}
              strokeWidth={active === mark.id ? 1.6 : 1}
              strokeDasharray="3 3"
            />
          ))}

          {/* axis titles */}
          <text
            x={-Y0 / 2 - 24}
            y={11}
            transform="rotate(-90)"
            textAnchor="middle"
            fontSize="8"
            className="fill-muted-foreground"
          >
            {block.yAxisLabel}
          </text>
          <text
            x={(X0 + X1) / 2}
            y={Y0 + 22}
            textAnchor="middle"
            fontSize="8"
            className="fill-muted-foreground"
          >
            {block.xAxisLabel}
          </text>
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {block.items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : item.id)}
              onMouseEnter={() => setActive(item.id)}
              onFocus={() => setActive(item.id)}
              className={`min-h-11 cursor-pointer rounded-full border-2 px-3 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/55 text-muted-foreground hover:border-primary"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeItem
            ? "border-primary/25 bg-primary/8 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeItem ? (
          <>
            <b className="text-primary">{activeItem.label}</b> — {activeItem.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
