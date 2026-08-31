import type { EchoDiagramBlock } from "@/content/form2/science/interactive-types";
import { figureCopy } from "./figure-copy";

/**
 * Echo — the outgoing sound and the sound that comes back.
 *
 * The whole point of the figure is that both legs are visible: sound leaves the
 * person, meets a hard surface, and returns to the same person a moment later.
 * A single arrow would show reflection without showing that the listener hears
 * it again, which is the part the definition turns on.
 *
 * The chapter does not teach angle of incidence = angle of reflection, so the
 * two legs are drawn as a there-and-back path against a flat wall rather than as
 * an angled ray pair that would imply a law the source never states.
 */

const WIDTH = 320;
const HEIGHT = 160;

const PERSON_X = 52;
const WALL_X = 268;
const OUT_Y = 62;
const BACK_Y = 104;
const GROUND_Y = 138;

export function EchoDiagram({ block, lang }: { block: EchoDiagramBlock; lang?: string }) {
  const copy = figureCopy(lang);

  return (
    <div className="rounded-2xl border border-border bg-secondary/25 p-3.5">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto h-auto w-full min-w-[280px] max-w-[420px]"
          role="img"
          aria-label={`${block.sourceLabel} → ${block.surfaceLabel} → ${block.sourceLabel}`}
        >
          <defs>
            <marker id="echo-out" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="fill-primary" />
            </marker>
            <marker id="echo-back" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="fill-accent" />
            </marker>
          </defs>

          <line
            x1="8"
            y1={GROUND_Y}
            x2={WIDTH - 8}
            y2={GROUND_Y}
            className="stroke-border"
            strokeWidth="2"
          />

          {/* Listener, who is also the source. */}
          <circle cx={PERSON_X} cy={GROUND_Y - 32} r="9" className="fill-primary/80" />
          <line
            x1={PERSON_X}
            y1={GROUND_Y - 23}
            x2={PERSON_X}
            y2={GROUND_Y - 4}
            className="stroke-primary/80"
            strokeWidth="3"
          />
          <text
            x={PERSON_X}
            y={GROUND_Y + 14}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="10"
            fontWeight="700"
          >
            {block.sourceLabel}
          </text>

          {/* Hard reflecting surface. */}
          <rect
            x={WALL_X}
            y="34"
            width="16"
            height={GROUND_Y - 34}
            className="fill-muted-foreground/35 stroke-muted-foreground/70"
            strokeWidth="1.5"
          />
          <text
            x={WALL_X + 8}
            y="26"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="10"
            fontWeight="700"
          >
            {block.surfaceLabel}
          </text>

          {/* Outgoing leg: person -> wall. */}
          <line
            x1={PERSON_X + 16}
            y1={OUT_Y}
            x2={WALL_X - 6}
            y2={OUT_Y}
            className="stroke-primary"
            strokeWidth="2.5"
            markerEnd="url(#echo-out)"
          />
          <text x={(PERSON_X + WALL_X) / 2} y={OUT_Y - 7} textAnchor="middle" className="fill-primary" fontSize="9.5" fontWeight="600">
            {block.outgoingLabel}
          </text>

          {/* Returning leg: wall -> person. */}
          <line
            x1={WALL_X - 6}
            y1={BACK_Y}
            x2={PERSON_X + 16}
            y2={BACK_Y}
            className="stroke-accent"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            markerEnd="url(#echo-back)"
          />
          <text x={(PERSON_X + WALL_X) / 2} y={BACK_Y + 15} textAnchor="middle" className="fill-accent" fontSize="9.5" fontWeight="600">
            {block.reflectedLabel}
          </text>
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>

      <div className="mt-2.5 flex flex-wrap gap-1.5" aria-label={copy.controlsLabel}>
        {block.places.map((p) => (
          <span
            key={p}
            className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-[12px] text-foreground/85"
          >
            {p}
          </span>
        ))}
      </div>

      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
