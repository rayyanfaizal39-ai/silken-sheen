import type { HearingRangeBlock } from "@/content/form2/science/interactive-types";

/**
 * Hearing ranges for humans and animals, on a logarithmic frequency axis.
 *
 * Every bar's start and end are computed from the entry's own `minHz`/`maxHz`
 * through `xForHz`. Nothing is nudged to make the chart look tidier, because the
 * whole value of the figure is that a learner can read a real range off it — an
 * elephant's 16 Hz really does start below the human 20 Hz, and a bat's 110 000 Hz
 * really does run far past the human ceiling.
 *
 * A log axis is used because the values span four decades; on a linear axis every
 * range below about 2 000 Hz would collapse into the same pixel.
 */

const WIDTH = 320;
const ROW_H = 22;
const TOP = 34;
const GUTTER = 74;
const PLOT_X = GUTTER;
const PLOT_W = WIDTH - GUTTER - 14;

/** Axis bounds, chosen to contain every source value with a little air. */
export const F_MIN = 10;
export const F_MAX = 200_000;

export function xForHz(hz: number) {
  const clamped = Math.min(Math.max(hz, F_MIN), F_MAX);
  const t =
    (Math.log10(clamped) - Math.log10(F_MIN)) / (Math.log10(F_MAX) - Math.log10(F_MIN));
  return PLOT_X + t * PLOT_W;
}

const TICKS = [10, 100, 1_000, 10_000, 100_000];

function tickLabel(hz: number) {
  return hz >= 1000 ? `${hz / 1000}k` : String(hz);
}

export function HearingRangeChart({ block }: { block: HearingRangeBlock; lang?: string }) {
  const height = TOP + block.entries.length * ROW_H + 30;
  const ultrasoundX = xForHz(20_000);

  return (
    <div className="rounded-2xl border border-border bg-secondary/25 p-3.5">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          className="mx-auto h-auto w-full min-w-[290px] max-w-[440px]"
          role="img"
          aria-label={block.entries
            .map((e) => `${e.label}: ${e.minHz}–${e.maxHz} Hz`)
            .join("; ")}
        >
          {/* Everything to the right of 20 000 Hz is ultrasound. */}
          <rect
            x={ultrasoundX}
            y={TOP - 12}
            width={PLOT_X + PLOT_W - ultrasoundX}
            height={block.entries.length * ROW_H + 12}
            className="fill-accent/10"
          />
          <line
            x1={ultrasoundX}
            y1={TOP - 12}
            x2={ultrasoundX}
            y2={TOP + block.entries.length * ROW_H}
            className="stroke-accent/70"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x={Math.min(ultrasoundX + 4, WIDTH - 6)}
            y={TOP - 17}
            className="fill-accent"
            fontSize="9"
            fontWeight="700"
            textAnchor="start"
          >
            {block.ultrasoundLabel}
          </text>

          {block.entries.map((e, i) => {
            const y = TOP + i * ROW_H;
            const x1 = xForHz(e.minHz);
            const x2 = xForHz(e.maxHz);
            return (
              <g key={e.id}>
                <text
                  x={GUTTER - 6}
                  y={y + 9}
                  textAnchor="end"
                  className="fill-foreground"
                  fontSize="9.5"
                  fontWeight={e.human ? 700 : 500}
                >
                  {e.label}
                </text>
                <rect
                  x={x1}
                  y={y}
                  width={Math.max(2, x2 - x1)}
                  height="11"
                  rx="5.5"
                  className={e.human ? "fill-primary" : "fill-primary/45"}
                />
                <title>{`${e.label}: ${e.minHz}–${e.maxHz} Hz`}</title>
              </g>
            );
          })}

          {/* Log axis. */}
          <line
            x1={PLOT_X}
            y1={TOP + block.entries.length * ROW_H + 4}
            x2={PLOT_X + PLOT_W}
            y2={TOP + block.entries.length * ROW_H + 4}
            className="stroke-border"
            strokeWidth="1.5"
          />
          {TICKS.map((t) => (
            <g key={t}>
              <line
                x1={xForHz(t)}
                y1={TOP + block.entries.length * ROW_H + 4}
                x2={xForHz(t)}
                y2={TOP + block.entries.length * ROW_H + 9}
                className="stroke-border"
                strokeWidth="1.5"
              />
              <text
                x={xForHz(t)}
                y={TOP + block.entries.length * ROW_H + 21}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="8.5"
              >
                {tickLabel(t)}
              </text>
            </g>
          ))}
          <text
            x={PLOT_X + PLOT_W}
            y={TOP - 17}
            textAnchor="end"
            className="fill-muted-foreground"
            fontSize="8.5"
          >
            Hz
          </text>
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
