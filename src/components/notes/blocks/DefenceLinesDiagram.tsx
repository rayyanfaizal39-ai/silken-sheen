import { useState } from "react";
import type { DefenceLinesBlock } from "@/content/form2/science/interactive-types";
import type { ImageAnnotation } from "./AnnotatedImage";
import {
  InteractiveBadge,
  InteractiveFigureCard,
  mergeConcepts,
} from "./InteractiveFigureCard";

/**
 * The body's three lines of defence, drawn as a pathogen meeting each barrier
 * in turn.
 *
 * The grouping matters as much as the order: the first two lines act on any
 * pathogen (non-specific), while the third targets one particular antigen
 * (specific). That split is drawn explicitly because it is what students are
 * asked to compare, and it was the piece missing from the earlier notes.
 */
export function DefenceLinesDiagram({
  block,
  lang,
}: {
  block: DefenceLinesBlock;
  lang?: string;
}) {
  // Approved artwork replaces the drawn card row. The non-specific / specific
  // grouping the cards carried is kept as a labelled fact on each concept, so
  // the comparison students are asked to make survives the swap.
  if (block.image) {
    const concepts: ImageAnnotation[] = block.lines.map((line) => {
      const point = block.image!.points.find((p) => p.id === line.id);
      return {
        id: line.id,
        label: line.name,
        note: line.note,
        x: point?.x,
        y: point?.y,
        w: point?.w,
        h: point?.h,
        facts: [
          {
            label:
              line.group === "non-specific" ? block.nonSpecificLabel : block.specificLabel,
            value: line.parts,
          },
        ],
      };
    });
    const withExtras = mergeConcepts(concepts, block.image.extra);
    return (
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        prompt={block.hint}
        concepts={withExtras}
        image={{
          src: block.image.src,
          alt: block.image.alt,
          size: block.image.size ?? "wide",
          aspect: block.image.aspect ?? "4 / 3",
          caption: block.image.caption,
          legendLabel: block.image.legendLabel ?? block.title,
          annotationMode: block.image.annotationMode ?? "regions",
          imageKey: block.image.imageKey,
        }}
      />
    );
  }

  const [active, setActive] = useState<string | null>(null);
  const activeLine = block.lines.find((l) => l.id === active) ?? null;

  const nonSpecific = block.lines.filter((l) => l.group === "non-specific");
  const specific = block.lines.filter((l) => l.group === "specific");

  const renderLine = (line: (typeof block.lines)[number], index: number) => {
    const isActive = active === line.id;
    return (
      <button
        key={line.id}
        type="button"
        aria-pressed={isActive}
        onClick={() => setActive(isActive ? null : line.id)}
        onMouseEnter={() => setActive(line.id)}
        onFocus={() => setActive(line.id)}
        className={`flex min-h-11 min-w-0 flex-1 cursor-pointer flex-col items-start gap-1 rounded-xl border-2 p-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isActive
            ? "border-primary bg-primary/15 shadow-md"
            : "border-primary/40 bg-card hover:-translate-y-px hover:border-primary hover:bg-primary/10 hover:shadow-md"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold tabular-nums text-muted-foreground"
          >
            {index + 1}
          </span>
          <span className="font-display text-[12.5px] font-bold text-foreground">{line.name}</span>
        </span>
        <span className="text-[11.5px] leading-snug text-muted-foreground">{line.parts}</span>
      </button>
    );
  };

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-2 py-1 text-[11.5px] font-semibold text-rose-200">
          {block.pathogenLabel}
        </span>
        <span aria-hidden="true" className="text-base leading-none text-primary">
          →
        </span>
      </div>

      <section aria-label={block.nonSpecificLabel} className="mb-2 flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80">
          {block.nonSpecificLabel}
        </h4>
        <div className="flex flex-col gap-1.5 sm:flex-row">
          {nonSpecific.map((line, i) => renderLine(line, i))}
        </div>
      </section>

      <section aria-label={block.specificLabel} className="flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80">
          {block.specificLabel}
        </h4>
        <div className="flex flex-col gap-1.5 sm:flex-row">
          {specific.map((line, i) => renderLine(line, nonSpecific.length + i))}
        </div>
      </section>

      <p
        aria-live="polite"
        className={`mt-2.5 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeLine
            ? "border-primary/25 bg-primary/8 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeLine ? (
          <>
            <b className="text-primary">{activeLine.name}</b> — {activeLine.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
