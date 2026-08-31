import type { StarSizeCompareBlock } from "@/content/form2/science/interactive-types";

/**
 * The three star-size categories the source names, drawn at relative sizes.
 *
 * `relative` is a drawing ratio chosen to make the ordering legible, not a
 * measured astronomical value — the source gives no figures, only the ordering
 * super raksasa > raksasa > kerdil, so that ordering is all this figure claims.
 * Circle radii are derived from `relative`, which means a category cannot be
 * drawn out of order without changing the data.
 */

const WIDTH = 320;
const HEIGHT = 150;
const BASE_Y = 108;

export function StarSizeCompare({ block }: { block: StarSizeCompareBlock; lang?: string }) {
  const max = Math.max(...block.sizes.map((s) => s.relative));
  const maxR = 44;

  let cursor = 18;
  const laid = block.sizes.map((s) => {
    const r = Math.max(7, (s.relative / max) * maxR);
    const cx = cursor + r;
    cursor = cx + r + 26;
    return { ...s, r, cx };
  });

  return (
    <div className="rounded-2xl border border-border bg-secondary/25 p-3.5">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto h-auto w-full min-w-[280px] max-w-[420px]"
          role="img"
          aria-label={block.sizes.map((s) => s.label).join(" > ")}
        >
          {laid.map((s) => (
            <g key={s.id}>
              <circle
                cx={s.cx}
                cy={BASE_Y - s.r}
                r={s.r}
                className="fill-primary/35 stroke-primary"
                strokeWidth="1.5"
              />
              <text
                x={s.cx}
                y={BASE_Y + 16}
                textAnchor="middle"
                className="fill-foreground"
                fontSize="9.5"
                fontWeight="700"
              >
                {s.label}
              </text>
              <title>{`${s.label} — ${s.note}`}</title>
            </g>
          ))}
          <text
            x={WIDTH / 2}
            y={HEIGHT - 6}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="8"
            fontStyle="italic"
          >
            {block.caption}
          </text>
        </svg>
      </div>

      <ul className="mt-2 space-y-1">
        {block.sizes.map((s) => (
          <li
            key={s.id}
            className="rounded-lg border border-border bg-background/45 px-2.5 py-1.5 text-[12.5px] leading-relaxed text-foreground/90"
          >
            <b className="font-display">{s.label}</b> — {s.note}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
