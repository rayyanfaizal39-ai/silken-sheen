import type { ViskingExperimentBlock } from "@/content/form2/science/interactive-types";
import { InteractiveBadge } from "./InteractiveFigureCard";
import { AnnotatedImage, type ImageAnnotation } from "./AnnotatedImage";

/**
 * Diagram for Eksperimen 3.1 (Visking-tubing absorption model): two boiling
 * tubes, each holding a tied Visking-tubing bag, both standing in distilled
 * water. The iodine/Benedict's tests in the real procedure are run on the
 * *surrounding water*, not on the tubing's contents — that is the detail an
 * earlier NotebookLM-sourced summary got backwards, so the diagram marks the
 * test location explicitly rather than leaving it to be inferred.
 */
export function ViskingExperimentDiagram({
  block,
  enlargeLabel,
  closeLabel,
  hintLabel,
  lang,
}: {
  block: ViskingExperimentBlock;
  enlargeLabel?: string;
  closeLabel?: string;
  hintLabel?: string;
  lang?: string;
}) {
  const image = block.image;
  const imageAnnotations: ImageAnnotation[] = image
    ? [
        ...image.points.flatMap((point) => {
          const tube = block.tubes.find((t) => t.id === point.id);
          return tube
            ? [{ id: tube.id, label: tube.contents, note: tube.label, x: point.x, y: point.y }]
            : [];
        }),
        ...(image.extra ?? []),
      ]
    : [];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-3" />

      {image ? (
        <AnnotatedImage
          src={image.src}
          alt={image.alt}
          size={image.size ?? "compact"}
          aspect={image.aspect ?? "3 / 2"}
          caption={image.caption}
          legendLabel={image.legendLabel ?? block.title}
          annotationMode={image.annotationMode ?? "labels"}
          annotations={imageAnnotations}
          enlargeLabel={enlargeLabel}
          closeLabel={closeLabel}
          hintLabel={hintLabel}
        />
      ) : (
      <div className="grid grid-cols-2 gap-4">
        {block.tubes.map((tube) => (
          <div key={tube.id} className="flex flex-col items-center">
            <svg
              viewBox="0 0 90 130"
              className="h-auto w-full max-w-[130px]"
              role="img"
              aria-label={tube.label}
            >
              {/* Beaker / boiling tube outline */}
              <path
                d="M14,10 L14,104 Q14,118 28,118 L62,118 Q76,118 76,104 L76,10"
                fill="none"
                className="stroke-border"
                strokeWidth="2.5"
              />
              {/* Distilled water fill */}
              <path
                d="M16,50 L16,103 Q16,116 28,116 L62,116 Q74,116 74,103 L74,50 Z"
                className="fill-primary/12"
              />
              {/* Visking-tubing bag, tied at both ends */}
              <rect
                x="30"
                y="58"
                width="30"
                height="46"
                rx="14"
                className="fill-accent/30 stroke-accent"
                strokeWidth="1.5"
              />
              <line x1="34" y1="60" x2="56" y2="60" className="stroke-accent" strokeWidth="2" />
              <line x1="34" y1="102" x2="56" y2="102" className="stroke-accent" strokeWidth="2" />
              <text
                x="45"
                y="85"
                textAnchor="middle"
                fontSize="7.5"
                className="fill-foreground"
                fontWeight="600"
              >
                {tube.contents}
              </text>
              {/* Surrounding-water test marker */}
              <circle cx="20" cy="92" r="3" className="fill-primary" />
            </svg>
            <p className="mt-1 text-center text-[11.5px] font-semibold text-foreground">
              {tube.label}
            </p>
          </div>
        ))}
      </div>
      )}

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-primary">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
        {block.testLabel}
      </div>
      <p className="mt-1 text-center text-[11px] text-muted-foreground">{block.surroundLabel}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-2.5 text-[11.5px] leading-relaxed text-emerald-200">
          {block.resultCorrect}
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
          {block.resultIncorrect}
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{block.note}</p>
    </div>
  );
}
