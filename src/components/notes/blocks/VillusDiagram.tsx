import type { VillusDiagramBlock } from "@/content/form2/science/interactive-types";
import { InteractiveBadge } from "./InteractiveFigureCard";
import { AnnotatedImage, type ImageAnnotation } from "./AnnotatedImage";

/**
 * Cross-section of one villus: the blood-capillary route (glucose, amino
 * acids) and the lacteal/lymph route (fatty acids + glycerol) each get their
 * own arrow out of the finger-shaped projection, matching Rajah 3.16. Small
 * enough to sit under a single villus card, not a full-page figure.
 */
export function VillusDiagram({
  block,
  enlargeLabel,
  closeLabel,
  hintLabel,
  lang,
}: {
  block: VillusDiagramBlock;
  enlargeLabel?: string;
  closeLabel?: string;
  hintLabel?: string;
  lang?: string;
}) {
  const image = block.image;
  const imageAnnotations: ImageAnnotation[] = image
    ? [
        ...image.points.flatMap((point) => {
          const pathway = block.pathways.find((pw) => pw.id === point.id);
          return pathway
            ? [
                {
                  id: pathway.id,
                  label: pathway.label,
                  note: `${pathway.cargo} → ${pathway.destination}`,
                  x: point.x,
                  y: point.y,
                },
              ]
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
          aspect={image.aspect ?? "4 / 3"}
          caption={image.caption}
          legendLabel={image.legendLabel ?? block.title}
          annotationMode={image.annotationMode ?? "callouts"}
          annotations={imageAnnotations}
          enlargeLabel={enlargeLabel}
          closeLabel={closeLabel}
          hintLabel={hintLabel}
        />
      ) : (
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 260 150"
          className="mx-auto h-auto w-full min-w-[260px] max-w-[340px]"
          role="img"
          aria-label={block.title}
        >
          {/* Villus finger projection */}
          <path
            d="M100,140 L100,50 Q100,20 130,20 Q160,20 160,50 L160,140 Z"
            className="fill-card stroke-primary/60"
            strokeWidth="2"
          />
          {/* Capillary (blood) route */}
          <path
            d="M118,130 L118,45"
            className="stroke-red-400"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M118,45 L70,30"
            className="stroke-red-400"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            markerEnd="url(#villus-arrow-red)"
          />
          {/* Lacteal (lymph) route */}
          <path
            d="M142,130 L142,45"
            className="stroke-amber-300"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M142,45 L190,30"
            className="stroke-amber-300"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            markerEnd="url(#villus-arrow-amber)"
          />

          <defs>
            <marker
              id="villus-arrow-red"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" className="fill-red-400" />
            </marker>
            <marker
              id="villus-arrow-amber"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" className="fill-amber-300" />
            </marker>
          </defs>

          <text
            x="130"
            y="145"
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            className="fill-muted-foreground"
          >
            {block.lumenLabel}
          </text>
          <text x="130" y="70" textAnchor="middle" fontSize="8" className="fill-muted-foreground">
            {block.wallLabel}
          </text>

          {block.pathways.map((pathway, i) => (
            <text
              key={pathway.id}
              x={i === 0 ? 30 : 230}
              y={24}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              className={i === 0 ? "fill-red-300" : "fill-amber-200"}
            >
              {pathway.destination}
            </text>
          ))}
        </svg>
      </div>
      )}

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {block.pathways.map((pathway) => (
          <div
            key={pathway.id}
            className="rounded-lg border border-border bg-card/60 p-2.5 text-[11.5px] leading-relaxed"
          >
            <p className="font-semibold text-foreground">{pathway.label}</p>
            <p className="mt-0.5 text-muted-foreground">
              {pathway.cargo} → {pathway.destination}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
