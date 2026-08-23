import { useMemo, useState } from "react";
import type { DigestiveSystemBlock } from "@/content/form2/science/interactive-types";

/**
 * A schematic (not anatomical) diagram of the human digestive system: the
 * alimentary canal drawn as one connected vertical chain, with the three
 * accessory digestive organs (liver, gall bladder, pancreas — the gall
 * bladder is a storage organ, not a gland) branching off the duodenum,
 * because they feed into the tract rather than being part of it.
 *
 * Tapping any organ reveals its one-line note. All labels come from `block`
 * so the same component serves BM and DLP content without any text baked
 * into an image.
 */
export function DigestiveSystemDiagram({ block }: { block: DigestiveSystemBlock }) {
  const [active, setActive] = useState<string | null>(null);
  const tract = useMemo(() => block.organs.filter((o) => o.kind === "tract"), [block.organs]);
  const accessory = useMemo(
    () => block.organs.filter((o) => o.kind === "accessory"),
    [block.organs],
  );

  const ROW = 52;
  const TRACT_X = 80;
  const ACCESSORY_X = 196;
  const width = 260;
  const height = tract.length * ROW + 20;

  const tractPos = (index: number) => ({ x: TRACT_X, y: 26 + index * ROW });

  // Anchor each accessory organ's branch to the tract node it connects to,
  // stacked to the side around that same row.
  const accessoryPos = (organIndex: number) => {
    const anchorId = accessory[organIndex]?.connectsTo;
    const anchorIndex = Math.max(
      0,
      tract.findIndex((o) => o.id === anchorId),
    );
    const anchorY = 26 + anchorIndex * ROW;
    const offset = (organIndex - (accessory.length - 1) / 2) * 34;
    return { x: ACCESSORY_X, y: anchorY + offset };
  };

  const selectedOrgan = block.organs.find((o) => o.id === active) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
      <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto h-auto w-full min-w-[260px] max-w-[320px]"
          role="img"
          aria-label={block.title}
        >
          {tract.slice(1).map((organ, i) => {
            const a = tractPos(i);
            const b = tractPos(i + 1);
            return (
              <line
                key={`tract-line-${organ.id}`}
                x1={a.x}
                y1={a.y + 12}
                x2={b.x}
                y2={b.y - 12}
                className="stroke-primary/50"
                strokeWidth="2"
              />
            );
          })}

          {accessory.map((organ, i) => {
            const anchorIndex = Math.max(
              0,
              tract.findIndex((o) => o.id === organ.connectsTo),
            );
            const anchor = tractPos(anchorIndex);
            const pos = accessoryPos(i);
            return (
              <line
                key={`accessory-line-${organ.id}`}
                x1={anchor.x + 12}
                y1={anchor.y}
                x2={pos.x - 30}
                y2={pos.y}
                className="stroke-accent/60"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            );
          })}

          {tract.map((organ, i) => {
            const { x, y } = tractPos(i);
            const selected = active === organ.id;
            return (
              <g
                key={organ.id}
                onClick={() => setActive((v) => (v === organ.id ? null : organ.id))}
                className="cursor-pointer"
              >
                <circle
                  cx={x}
                  cy={y}
                  r="11"
                  className={
                    selected ? "fill-primary stroke-primary" : "fill-card stroke-primary/60"
                  }
                  strokeWidth="1.5"
                />
                <text
                  x={x + 20}
                  y={y + 3.5}
                  fontSize="10"
                  fontWeight="600"
                  className={selected ? "fill-primary" : "fill-foreground"}
                >
                  {organ.label}
                </text>
              </g>
            );
          })}

          {accessory.map((organ, i) => {
            const { x, y } = accessoryPos(i);
            const selected = active === organ.id;
            return (
              <g
                key={organ.id}
                onClick={() => setActive((v) => (v === organ.id ? null : organ.id))}
                className="cursor-pointer"
              >
                <rect
                  x={x - 28}
                  y={y - 11}
                  width="56"
                  height="22"
                  rx="6"
                  className={selected ? "fill-accent stroke-accent" : "fill-card stroke-accent/60"}
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y + 3.5}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  className={selected ? "fill-accent-foreground" : "fill-foreground"}
                >
                  {organ.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10.5px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span
            className="h-2.5 w-2.5 rounded-full border border-primary/60 bg-card"
            aria-hidden="true"
          />
          {block.tractLabel}
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="h-2.5 w-3.5 rounded-[3px] border border-accent/60 bg-card"
            aria-hidden="true"
          />
          {block.accessoryLabel}
        </span>
      </div>

      {selectedOrgan?.note && (
        <div className="mt-3 rounded-lg border border-border bg-card/60 p-2.5 text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">{selectedOrgan.label}. </span>
          {selectedOrgan.note}
        </div>
      )}
    </div>
  );
}
