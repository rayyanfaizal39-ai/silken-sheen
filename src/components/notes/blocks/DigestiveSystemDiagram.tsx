import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DigestiveSystemBlock } from "@/content/form2/science/interactive-types";
import { InteractiveBadge, conceptButtonClass } from "./InteractiveFigureCard";
import { AnnotatedImage, type ImageAnnotation } from "./AnnotatedImage";

/**
 * A schematic (not anatomical) diagram of the human digestive system: the
 * alimentary canal drawn as one connected vertical chain, with the accessory
 * digestive organs (liver, gall bladder, pancreas, salivary glands — the gall
 * bladder is a storage organ, not a gland) branching off the tract organ they
 * feed into, because they are not themselves part of the tract.
 *
 * Tapping any organ reveals its one-line note. All labels come from `block`
 * so the same component serves BM and DLP content without any text baked
 * into an image.
 *
 * `block.journey` adds a row of stage buttons under the diagram, ordered
 * mouth → anus. Picking a stage sets the SAME active-organ state a tap on the
 * diagram itself would — one highlight, one explanation, not a second,
 * disconnected "follow the food" stepper duplicating the same facts.
 */
export function DigestiveSystemDiagram({
  block,
  enlargeLabel,
  closeLabel,
  hintLabel,
  lang,
}: {
  block: DigestiveSystemBlock;
  enlargeLabel?: string;
  closeLabel?: string;
  hintLabel?: string;
  lang?: string;
}) {
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
  const journeyOrgans = (block.journey ?? [])
    .map((id) => block.organs.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));
  const hasJourney = journeyOrgans.length > 0;

  const journeyHeading = (block.journeyTitle || block.journeyInstruction) && (
    <div>
      {block.journeyTitle && (
        <h4 className="font-display text-[13px] font-bold text-foreground">{block.journeyTitle}</h4>
      )}
      {block.journeyInstruction && (
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          {block.journeyInstruction}
        </p>
      )}
    </div>
  );

  // Phones get the familiar horizontally-scrolling chip row — there is no room
  // for a vertical list beside the diagram, so the stages scroll instead of
  // wrapping onto extra lines that would push the diagram out of view.
  const journeyRowMobile = journeyOrgans.length > 0 && (
    <div
      role="group"
      aria-label={block.journeyTitle ?? block.title}
      className="flex gap-1.5 overflow-x-auto pb-1 sm:hidden"
    >
      {journeyOrgans.map((organ) => {
        const isActive = active === organ.id;
        return (
          <button
            key={organ.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => setActive(isActive ? null : organ.id)}
            className={conceptButtonClass(isActive, "flex-none")}
          >
            {organ.label}
          </button>
        );
      })}
    </div>
  );

  // From `sm` up, the stages sit beside the diagram as a vertical pathway —
  // full-width rows joined by a small chevron, so the mouth-to-anus sequence
  // reads at a glance without resorting to numbered buttons.
  const journeyListDesktop = journeyOrgans.length > 0 && (
    <div
      role="group"
      aria-label={block.journeyTitle ?? block.title}
      className="hidden flex-col sm:flex"
    >
      {journeyOrgans.map((organ, i) => {
        const isActive = active === organ.id;
        return (
          <div key={organ.id} className="flex flex-col">
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : organ.id)}
              className={`flex min-h-10 w-full items-center rounded-xl border-2 px-3 py-2 text-left text-[13px] font-semibold leading-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {organ.label}
            </button>
            {i < journeyOrgans.length - 1 && (
              <div aria-hidden="true" className="flex justify-center py-0.5">
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // When an anatomical illustration is supplied it replaces the schematic
  // drawing entirely — the organ list below stays exactly as authored, so no
  // teaching text is lost and the two never appear together.
  if (block.image) {
    const isSpotlight = block.image.annotationMode === "spotlight";
    const annotations: ImageAnnotation[] = [
      ...block.image.points.flatMap((point) => {
        const organ = block.organs.find((o) => o.id === point.id);
        return organ
          ? [
              {
                id: organ.id,
                label: organ.label,
                note: organ.note,
                x: point.x,
                y: point.y,
                spotlightShapes: point.spotlightShapes,
                spotlightCaption: point.spotlightCaption,
                spotlightTint: point.spotlightTint,
                spotlightGroupHalo: point.spotlightGroupHalo,
                spotlightPulseGroups: point.spotlightPulseGroups,
              },
            ]
          : [];
      }),
      ...(block.image.extra ?? []),
    ];
    const explanationPanel = isSpotlight && (
      <div
        aria-live="polite"
        className={`min-h-[3rem] rounded-xl border px-3 py-2.5 transition-colors ${
          selectedOrgan ? "border-primary/35 bg-primary/8" : "border-border bg-secondary/30"
        }`}
      >
        {selectedOrgan ? (
          <>
            <p className="font-display text-[13px] font-bold text-primary">{selectedOrgan.label}</p>
            {selectedOrgan.points && selectedOrgan.points.length > 0 ? (
              <ul className="mt-1 flex flex-col gap-1">
                {selectedOrgan.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-[12.5px] leading-relaxed text-foreground"
                  >
                    <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              selectedOrgan.note && (
                <p className="mt-1 text-[12.5px] leading-relaxed text-foreground">
                  {selectedOrgan.note}
                </p>
              )
            )}
          </>
        ) : (
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">{hintLabel}</p>
        )}
      </div>
    );

    // The diagram and its controls sit in one grid so the organ a student just
    // picked never scrolls out of view: on a phone the single column stacks
    // diagram → stages → explanation (no explanation panel wedged between the
    // picture and the buttons), and from `sm` up they sit side by side, image
    // left, stages + explanation right, so both are visible at once.
    return (
      <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
        <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-3" />
        {/* min-w-0 on both grid items is load-bearing: without it, the
            horizontally-scrolling mobile stage row's full (unscrolled)
            content width becomes the grid track's min-content size, which
            blows out the whole card instead of scrolling inside it. */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-[1fr_1.15fr] sm:items-start">
          <AnnotatedImage
            className="min-w-0"
            src={block.image.src}
            alt={block.image.alt}
            size={block.image.size ?? "portrait"}
            aspect={block.image.aspect ?? "3 / 4"}
            caption={block.image.caption}
            legendLabel={block.image.legendLabel ?? block.title}
            annotationMode={block.image.annotationMode ?? "callouts"}
            annotations={annotations}
            active={active}
            onActiveChange={setActive}
            hidePanel={isSpotlight}
            // The journey controls beside/below it are the one control system
            // for this diagram — a second, separately-numbered legend of the
            // same organs would be exactly the redundant "two navigation
            // systems" a human audit flagged, so it only shows when there is
            // no journey row to replace it.
            hideLegend={isSpotlight && hasJourney}
            enlargeLabel={enlargeLabel}
            closeLabel={closeLabel}
            hintLabel={hintLabel}
          />
          <div className="flex min-w-0 flex-col gap-3">
            {journeyHeading}
            {journeyRowMobile}
            {journeyListDesktop}
            {explanationPanel}
          </div>
        </div>
      </div>
    );
  }

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
      {(journeyHeading || journeyRowMobile || journeyListDesktop) && (
        <div className="mt-3 flex flex-col gap-3">
          {journeyHeading}
          {journeyRowMobile}
          {journeyListDesktop}
        </div>
      )}
    </div>
  );
}
