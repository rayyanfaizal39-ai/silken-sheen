import { ArrowDown } from "lucide-react";
import type {
  BranchFlowBlock,
  BranchFlowNode,
  LessonFlowPart,
} from "@/content/form2/science/interactive-types";
import { AnnotatedImage } from "./AnnotatedImage";
import { AsteroidBeltFigure } from "./AsteroidBeltFigure";
import { Chapter13SpotlightFigure } from "./Chapter13SpotlightFigure";
import { CometOrbitFigure } from "./CometOrbitFigure";
import { CometOriginFigure } from "./CometOriginFigure";
import { CrossingOrbitsFigure } from "./CrossingOrbitsFigure";
import { MeteorShowerFigure } from "./MeteorShowerFigure";
import { ObjectComparisonTable } from "./ObjectComparisonTable";
import { ProcessFlow } from "./ProcessFlow";
import { ScienceEmphasis, ScienceQuickExplanation, ScienceRemember } from "./ScienceEmphasis";
import { figureCopy } from "./figure-copy";

type Lang = "bm" | "en";

/**
 * Renders a section's `lessonFlow` strictly in authored order.
 *
 * The order IS the lesson — definition, characteristics, the main visual,
 * movement, effects — so nothing here reorders, groups or hides a part. Each
 * part is tagged with `data-lesson-part` so tests can assert that order in the
 * rendered page, not only in the data.
 */
export function LessonFlow({ parts, lang }: { parts: LessonFlowPart[]; lang: Lang }) {
  return (
    <div className="flex min-w-0 flex-col gap-7" data-lesson-flow="">
      {parts.map((part, i) => (
        <div key={`${part.kind}-${i}`} className="min-w-0" data-lesson-part={part.kind}>
          <LessonPart part={part} lang={lang} />
        </div>
      ))}
    </div>
  );
}

function PartTitle({ children }: { children: string }) {
  return (
    <h3 className="font-display mb-2.5 text-base font-bold text-foreground sm:text-[17px]">
      {children}
    </h3>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[13px] leading-snug text-foreground/90">
      <span
        aria-hidden="true"
        className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
      />
      <span>
        <ScienceEmphasis text={text} />
      </span>
    </li>
  );
}

function LessonPart({ part, lang }: { part: LessonFlowPart; lang: Lang }) {
  const copy = figureCopy(lang);

  switch (part.kind) {
    case "heading":
      // A new sub-lesson inside the object's lesson (e.g. collisions), so it
      // gets a rule above it rather than reading as one more card.
      return (
        <div className="border-t border-border/70 pt-6">
          <h3 className="font-display text-lg font-bold text-foreground">{part.title}</h3>
          {part.body && (
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
              <ScienceEmphasis text={part.body} />
            </p>
          )}
        </div>
      );

    case "points":
      return (
        <div className="rounded-2xl border border-border bg-card/55 p-4 sm:p-5">
          <PartTitle>{part.title}</PartTitle>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {part.items.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </ul>
        </div>
      );

    case "callout":
      return part.tone === "remember" ? (
        <ScienceRemember lang={lang} text={part.body} />
      ) : (
        <ScienceQuickExplanation lang={lang} text={part.body} />
      );

    case "figure":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <Chapter13SpotlightFigure block={part} lang={lang} />
        </>
      );

    case "branchFlow":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <BranchFlow block={part} />
        </>
      );

    case "meteorShower":
      // A separate mini-concept: its own dashed frame, so it never reads as the
      // next step of the journey drawn directly above it.
      return (
        <div
          className="rounded-2xl border border-dashed border-primary/45 bg-card/40 p-4"
          data-meteor-shower=""
        >
          <PartTitle>{part.title}</PartTitle>
          <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">
            <ScienceEmphasis text={part.body} />
          </p>
          <MeteorShowerFigure block={part} />
          <p className="mt-3 text-[12.5px] font-semibold leading-relaxed text-foreground">
            {part.note}
          </p>
        </div>
      );

    case "blog":
      return (
        <article
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/12 via-accent/8 to-transparent p-4 sm:p-5"
          data-science-blog=""
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-accent ring-1 ring-inset ring-accent/25">
            <span aria-hidden="true">📰</span>
            {part.badge}
          </span>
          <h3 className="font-display mt-2 text-lg font-bold text-foreground">{part.title}</h3>
          <div className="mt-3">
            <AnnotatedImage
              src={part.src}
              alt={part.alt}
              size="wide"
              aspect="2 / 1"
              annotations={[]}
              enlargeLabel={copy.enlarge}
              closeLabel={copy.close}
            />
          </div>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {part.points.map((point) => (
              <Bullet key={point} text={point} />
            ))}
          </ul>
        </article>
      );

    case "asteroidBelt":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <AsteroidBeltFigure block={part} lang={lang} />
        </>
      );

    case "crossingOrbits":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <CrossingOrbitsFigure block={part} lang={lang} />
        </>
      );

    case "cometOrigin":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">
            <ScienceEmphasis text={part.intro} />
          </p>
          <CometOriginFigure block={part} lang={lang} />
        </>
      );

    case "cometOrbit":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <CometOrbitFigure block={part} lang={lang} />
        </>
      );

    case "contextCards":
      return (
        <>
          {part.title && <PartTitle>{part.title}</PartTitle>}
          <div className="grid gap-3 sm:grid-cols-2">
            {part.cards.map((card) => (
              <article
                key={card.id}
                className="min-w-0 rounded-2xl border border-border bg-card/55 p-4"
              >
                <h4 className="font-display text-[15px] font-bold text-foreground">
                  {card.icon && (
                    <span aria-hidden="true" className="mr-1.5">
                      {card.icon}
                    </span>
                  )}
                  {card.title}
                </h4>
                {card.body && (
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    <ScienceEmphasis text={card.body} />
                  </p>
                )}
                {card.points && card.points.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {card.points.map((point) => (
                      <Bullet key={point} text={point} />
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </>
      );

    case "processFlow":
      return (
        <>
          <PartTitle>{part.title}</PartTitle>
          <ProcessFlow block={part} lang={lang} />
        </>
      );

    case "comparisonTable":
      return <ObjectComparisonTable block={part} />;
  }
}

function FlowBox({ node }: { node: BranchFlowNode }) {
  return (
    <div className="w-full rounded-xl border-2 border-primary/55 bg-primary/10 px-3 py-2 text-center">
      <p className="font-display text-[14px] font-bold text-foreground">{node.label}</p>
      <p className="text-[11.5px] leading-snug text-muted-foreground">{node.where}</p>
    </div>
  );
}

/**
 * meteoroid → meteor → (burns up | meteorite): a chain that forks exactly once.
 *
 * Stacked the same way at every width, so the fork is never flattened into a
 * row that could be misread as a four-step sequence.
 */
function BranchFlow({ block }: { block: BranchFlowBlock }) {
  return (
    <div className="rounded-2xl border border-border bg-card/55 p-4" data-branch-flow="">
      <ol className="mx-auto flex max-w-sm flex-col items-center">
        {block.nodes.map((node, i) => (
          <li key={node.label} className="flex w-full flex-col items-center" data-branch-node="">
            <FlowBox node={node} />
            {i < block.nodes.length - 1 && (
              <ArrowDown aria-hidden="true" className="my-1 h-5 w-5 text-primary" />
            )}
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="mx-auto grid max-w-lg grid-cols-2 gap-10 py-1">
        <div className="flex justify-end pr-2">
          <ArrowDown className="h-6 w-6 rotate-45 text-primary" />
        </div>
        <div className="flex justify-start pl-2">
          <ArrowDown className="h-6 w-6 -rotate-45 text-primary" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-lg grid-cols-2 gap-10">
        {block.endings.map((ending) => (
          <div
            key={ending.id}
            className="flex min-w-0 flex-col items-center"
            data-branch-ending={ending.id}
          >
            <div
              className={`w-full rounded-xl border-2 border-dashed px-2.5 py-2 text-center ${
                ending.result
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : "border-orange-400/60 bg-orange-400/10"
              }`}
            >
              <p className="text-[13px] font-bold text-foreground">{ending.label}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                {ending.note}
              </p>
            </div>
            {ending.result && (
              <>
                <ArrowDown aria-hidden="true" className="my-1 h-5 w-5 text-emerald-500" />
                <FlowBox node={ending.result} />
              </>
            )}
          </div>
        ))}
        <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-primary/40 bg-background px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-primary">
          {block.orLabel}
        </span>
      </div>
    </div>
  );
}
