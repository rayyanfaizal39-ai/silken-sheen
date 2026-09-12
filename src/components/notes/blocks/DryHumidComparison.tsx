import type { DryHumidComparisonBlock } from "@/content/form2/science/interactive-types";

/**
 * A small, static, two-panel visual for one concept the chapter's shared
 * daily-life photograph never actually depicted: why small electrostatic
 * shocks happen more in dry weather than humid weather.
 *
 * Deterministic SVG rather than a photograph — two rubbed fabrics with a
 * spark in dry air, the same two fabrics with moisture droplets and no spark
 * in humid air. Not interactive: it is a one-glance aid beside the
 * explanation, not a concept that needs exploring.
 */
function Droplet({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x},${y - 7} C${x + 5},${y - 1} ${x + 5},${y + 4} ${x},${y + 6} C${x - 5},${y + 4} ${x - 5},${y - 1} ${x},${y - 7} Z`}
      className="fill-sky-400"
    />
  );
}

export function DryHumidComparison({ block }: { block: DryHumidComparisonBlock }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <h4 className="font-display text-[13px] font-bold text-foreground">{block.title}</h4>

      <div className="mt-2.5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 p-2">
          <svg
            viewBox="0 0 120 90"
            className="mx-auto h-auto w-full max-w-[160px]"
            role="img"
            aria-label={block.dryLabel}
          >
            {/* two fabrics being rubbed, no moisture in the air */}
            <rect
              x={16}
              y={30}
              width={34}
              height={44}
              rx={4}
              className="fill-amber-300/30 stroke-amber-400"
              strokeWidth="2"
            />
            <rect
              x={70}
              y={30}
              width={34}
              height={44}
              rx={4}
              className="fill-amber-300/30 stroke-amber-400"
              strokeWidth="2"
            />
            {/* the spark jumping the gap */}
            <path
              d="M58,44 L66,50 L60,54 L68,62"
              fill="none"
              className="stroke-amber-400"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={60} y={20} textAnchor="middle" fontSize="16" className="fill-amber-400">
              ⚡
            </text>
          </svg>
          <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-wide text-amber-400">
            {block.dryLabel}
          </p>
          <p className="mt-0.5 text-center text-[11.5px] leading-snug text-muted-foreground">
            {block.dryCaption}
          </p>
        </div>

        <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 p-2">
          <svg
            viewBox="0 0 120 90"
            className="mx-auto h-auto w-full max-w-[160px]"
            role="img"
            aria-label={block.humidLabel}
          >
            {/* the same two fabrics, moisture in the air, no spark */}
            <rect
              x={16}
              y={30}
              width={34}
              height={44}
              rx={4}
              className="fill-sky-300/20 stroke-sky-400/70"
              strokeWidth="2"
            />
            <rect
              x={70}
              y={30}
              width={34}
              height={44}
              rx={4}
              className="fill-sky-300/20 stroke-sky-400/70"
              strokeWidth="2"
            />
            <Droplet x={60} y={18} />
            <Droplet x={44} y={12} />
            <Droplet x={76} y={12} />
            <Droplet x={60} y={48} />
          </svg>
          <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-wide text-sky-400">
            {block.humidLabel}
          </p>
          <p className="mt-0.5 text-center text-[11.5px] leading-snug text-muted-foreground">
            {block.humidCaption}
          </p>
        </div>
      </div>

      <p className="mt-2.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground">
        {block.note}
      </p>
    </div>
  );
}
