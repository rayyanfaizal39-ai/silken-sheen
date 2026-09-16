import { useId, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import type {
  Ch12SpotlightFigureBlock,
  PlanetSphere,
  PlanetSpheresBlock,
} from "@/content/form2/science/interactive-types";
import type { ImageAnnotation } from "./AnnotatedImage";
import { InteractiveFigureCard, conceptButtonClass } from "./InteractiveFigureCard";
import { PlanetSphereList } from "./PlanetSphereList";
import { CH12_FIGURE_GEOMETRY } from "./ch12-approved-figure-geometry";

/** How many profile facts the planet sheet previews before handing over to the card. */
const PREVIEW_FACTS = 3;

/**
 * One approved Chapter 12 figure — the solar system overview, the eight-planet
 * sheet, or the characteristics of Earth — taught as selectable regions.
 *
 * Built on `InteractiveFigureCard` in `spotlight` mode like the Chapter 9 and
 * 13 figures, with one addition those do not need: every region is also a
 * control ON the artwork (`spotlightHotspots`). Hover or focus previews a
 * region with a dashed outline and its name; a tap or click selects it, which
 * keeps it bright with a glow while the rest dims slightly and fills the
 * explanation panel below. The buttons under the picture are the same
 * selection, so a region too small to tap on a phone is still one 44px button
 * away.
 *
 * Content supplies every word; `ch12-approved-figure-geometry.ts` supplies
 * every coordinate. BM and DLP therefore share the artwork, the regions and
 * the behaviour, and differ only in text.
 */
export function Chapter12SpotlightFigure({
  block,
  lang,
  planets,
  onOpenPlanet,
}: {
  block: Ch12SpotlightFigureBlock;
  lang?: string;
  /** `eight-planets` only — the section's planet profiles, which are its regions. */
  planets?: PlanetSphere[];
  /** `eight-planets` only — opens the matching profile card. */
  onOpenPlanet?: (id: string) => void;
}) {
  const geometry = CH12_FIGURE_GEOMETRY[block.figure];
  const concepts: ImageAnnotation[] =
    block.figure === "eight-planets"
      ? (planets ?? []).map((planet) => ({
          id: planet.id,
          label: planet.name,
          facts: planet.facts.slice(0, PREVIEW_FACTS),
        }))
      : (block.concepts ?? []).map((concept) => ({
          id: concept.id,
          label: concept.label,
          note: concept.note,
          icon: concept.icon,
        }));
  const caption = [block.scaleNote, block.caption].filter(Boolean).join(" · ") || undefined;

  return (
    <div data-ch12-figure={block.figure}>
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        prompt={block.prompt}
        // Nothing selected on arrival: each of these is an orientation picture,
        // so the learner sees the whole thing at full brightness first.
        concepts={concepts.map((concept) => ({
          ...concept,
          spotlightShapes: geometry.regions[concept.id],
          ...geometry.hitAreas[concept.id],
        }))}
        controlsClassName={
          block.figure === "earth-characteristics"
            ? "mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3"
            : undefined
        }
        panelAction={
          onOpenPlanet && block.openProfileLabel
            ? (concept) => (
                <button
                  type="button"
                  onClick={() => onOpenPlanet(concept.id)}
                  aria-label={`${block.openProfileLabel} — ${concept.label}`}
                  className={conceptButtonClass(false, "mt-2")}
                >
                  {block.openProfileLabel}
                  <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )
            : undefined
        }
        image={{
          src: block.src,
          alt: block.alt,
          aspect: geometry.aspect,
          size: "wide",
          caption,
          annotationMode: "spotlight",
          spotlightDimOpacity: geometry.dim,
          spotlightCaptionEdge: "auto",
          spotlightHotspots: true,
          // Each figure leads its section, and the notes shell renders one
          // section at a time, so it is always above the fold when mounted.
          priority: true,
        }}
      />
    </div>
  );
}

/**
 * The "Planets in the Solar System" section: the planet sheet first, so the
 * learner recognises all eight, then the existing profile cards. Choosing a
 * planet on the sheet previews three of its profile facts; "open full profile"
 * opens that planet's own card and moves focus to it. The facts are read from
 * the same `PlanetSphere` records the cards render, never copied.
 */
export function Chapter12PlanetExplorer({
  figure,
  planets,
  lang,
}: {
  figure: Ch12SpotlightFigureBlock;
  planets: PlanetSpheresBlock;
  lang?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const cardIdPrefix = `ch12-planet-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const openPlanet = (id: string) => {
    setOpenId(id);
    const card = document.getElementById(`${cardIdPrefix}-${id}`);
    if (!card) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    card.focus({ preventScroll: true });
  };

  return (
    <div className="flex flex-col gap-5">
      <Chapter12SpotlightFigure
        block={figure}
        lang={lang}
        planets={planets.planets}
        onOpenPlanet={openPlanet}
      />
      <div>
        <h3 className="font-display mb-2 text-base font-bold text-foreground">{planets.title}</h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{planets.instruction}</p>
        <PlanetSphereList
          planets={planets.planets}
          openId={openId}
          onOpenChange={setOpenId}
          cardIdPrefix={cardIdPrefix}
        />
      </div>
    </div>
  );
}
