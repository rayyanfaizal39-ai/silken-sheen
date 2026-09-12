import { useState } from "react";
import type { ElectroscopeBlock } from "@/content/form2/science/interactive-types";
import {
  conceptButtonClass,
  InteractiveBadge,
  InteractiveFigureCard,
} from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import {
  ELECTROSCOPE_ART_ASPECT,
  ELECTROSCOPE_DIM_OPACITY,
  ELECTROSCOPE_PANELS,
} from "./ch7-approved-figure-geometry";

/**
 * The electroscope's gold leaf, staged through the three states a learner
 * must connect: neutral and closed, a positively charged rod touching the
 * metal cap so electrons leave the electroscope, then the leaf diverged
 * because like charges on the conducting stem and the leaf repel each other.
 *
 * Two surfaces, never both at once. With approved artwork (`block.image`) the
 * photograph is the figure and each stage lights up its own panel while the
 * other two dim — the same three stages taught once, on the real thing.
 * Without it the schematic below draws the leaf itself, and the divergence is
 * the one thing that visibly moves. Showing both would teach the same three
 * states twice in two different pictures, which is exactly what this pass set
 * out to avoid.
 */
const LEAF_ANGLE: Record<string, number> = {
  uncharged: 2,
  charged: 2,
  diverged: 26,
};

export function ElectroscopeDiagram({ block, lang }: { block: ElectroscopeBlock; lang?: string }) {
  if (block.image) return <ElectroscopePhotograph block={block} lang={lang} />;
  return <ElectroscopeSchematic block={block} lang={lang} />;
}

/**
 * The approved triptych. Stage ids carry the panel geometry (shared by BM and
 * DLP, so one file and one set of hotspots serve both), and the card supplies
 * the badge, the touch-sized keyboard-reachable controls and the one
 * explanation panel every Science figure shares.
 */
function ElectroscopePhotograph({ block, lang }: { block: ElectroscopeBlock; lang?: string }) {
  const image = block.image!;
  return (
    <InteractiveFigureCard
      lang={lang}
      instruction={block.instruction}
      prompt={block.prompt}
      // Opening on the neutral electroscope: the three panels are a sequence,
      // so an unselected figure reads as broken rather than as an invitation.
      initialActive={block.stages[0]?.id ?? null}
      concepts={block.stages.map((stage) => ({
        id: stage.id,
        label: stage.label,
        note: stage.note,
        spotlightCaption: stage.spotlightCaption,
        spotlightShapes: ELECTROSCOPE_PANELS[stage.id],
      }))}
      image={{
        src: image.src,
        alt: image.alt,
        aspect: image.aspect ?? ELECTROSCOPE_ART_ASPECT,
        size: image.size ?? "panel",
        caption: image.caption,
        legendLabel: image.legendLabel,
        annotationMode: "spotlight",
        // Peer panels: the two that are not selected must stay readable, since
        // comparing them with the selected one is half the teaching.
        spotlightDimOpacity: ELECTROSCOPE_DIM_OPACITY,
        // Adjacent panels, so "the open space below" is the next panel, not
        // empty background — the caption is pinned inside its own panel.
        spotlightCaptionEdge: "top",
        priority: true,
      }}
    />
  );
}

function ElectroscopeSchematic({ block, lang }: { block: ElectroscopeBlock; lang?: string }) {
  const [active, setActive] = useState(block.stages[0]?.id ?? "");
  const copy = figureCopy(lang);
  const stage = block.stages.find((s) => s.id === active) ?? block.stages[0];
  if (!stage) return null;

  const charged = stage.id !== "uncharged";
  const angle = LEAF_ANGLE[stage.id] ?? 2;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div
        className="mb-2.5 flex flex-wrap justify-center gap-1.5"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {block.stages.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === active}
            onClick={() => setActive(s.id)}
            className={conceptButtonClass(s.id === active)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 140 170"
        className="mx-auto h-auto w-full max-w-[190px]"
        role="img"
        aria-label={stage.label}
      >
        {/* the metal cap and rod */}
        <circle
          cx={70}
          cy={16}
          r="12"
          fill="none"
          className="stroke-foreground"
          strokeWidth="2.5"
        />
        <line x1={70} y1={28} x2={70} y2={70} className="stroke-foreground" strokeWidth="3" />
        {/* the metal plate the rod ends in, inside the jar */}
        <line x1={54} y1={70} x2={86} y2={70} className="stroke-foreground" strokeWidth="3" />

        {/* the glass jar, drawn last on the outside so the leaves read as inside it */}
        <path
          d="M30,64 L30,158 L110,158 L110,64"
          fill="none"
          className="stroke-border"
          strokeWidth="2"
          strokeDasharray="1 0"
        />

        {/* the two gold leaves, hinged at the plate; both swing outward equally */}
        <line
          x1={70}
          y1={70}
          x2={70 - 5 - angle * 1.1}
          y2={70 + 62}
          className={charged ? "stroke-amber-400" : "stroke-amber-400/60"}
          strokeWidth={charged && stage.id === "diverged" ? 4 : 3}
          strokeLinecap="round"
        />
        <line
          x1={70}
          y1={70}
          x2={70 + 5 + angle * 1.1}
          y2={70 + 62}
          className={charged ? "stroke-amber-400" : "stroke-amber-400/60"}
          strokeWidth={charged && stage.id === "diverged" ? 4 : 3}
          strokeLinecap="round"
        />

        {/* charge marks on the cap and plate once charge has been introduced */}
        {charged && (
          <>
            {[-8, 0, 8].map((dx) => (
              <text
                key={`cap-${dx}`}
                x={70 + dx}
                y={19}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                className="fill-primary"
              >
                −
              </text>
            ))}
            {[-24, -8, 8, 24].map((dx) => (
              <text
                key={`plate-${dx}`}
                x={70 + dx}
                y={67}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                className="fill-primary"
              >
                −
              </text>
            ))}
          </>
        )}
      </svg>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        <b className="text-primary">{stage.label}</b> — {stage.note}
      </p>
    </div>
  );
}
