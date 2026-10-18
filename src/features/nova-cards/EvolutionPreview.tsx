import { useState } from "react";
import { companionPreviewSvg } from "./artwork";
import { svgUrl } from "./codes";
import { DEMO_CARDS, type NovaCard } from "./model";

type PreviewView = "both" | "origin" | "awakened";
const VIEWS: { id: PreviewView; label: string }[] = [
  { id: "both", label: "Compare both" },
  { id: "origin", label: "Stage 1 — Origin" },
  { id: "awakened", label: "Stage 2 — Awakened" },
];

function CompanionComparison({ card }: { card: NovaCard }) {
  const [view, setView] = useState<PreviewView>("both");
  const phoenix = card.traits.creature === "Phoenix";
  return (
    <section
      className={`nova-evolution-study ${phoenix ? "is-phoenix" : "is-fox"}`}
      aria-labelledby={`${card.publicId}-study`}
    >
      <div className="nova-study-heading">
        <div>
          <p className="nova-eyebrow">
            {card.traits.element} · {card.traits.personality} · {card.traits.colours}
          </p>
          <h2 id={`${card.publicId}-study`}>
            {card.username}'s <em>{card.traits.creature}</em>
          </h2>
        </div>
        <span className="nova-study-number">{phoenix ? "01" : "02"} / EVOLUTION STUDY</span>
      </div>
      <div
        className="nova-preview-controls"
        role="group"
        aria-label={`${card.username}'s comparison view`}
      >
        {VIEWS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={view === option.id}
            onClick={() => setView(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={`nova-comparison-pair ${view === "both" ? "" : "is-single"}`}>
        {([1, 2] as const)
          .filter((stage) => view === "both" || (view === "origin" ? stage === 1 : stage === 2))
          .map((stage) => (
            <figure
              key={stage}
              className={`nova-preview-portrait ${stage === 2 ? "is-awakened" : "is-origin"}`}
            >
              <figcaption className="nova-preview-caption">
                <img src="/branding/academy-icon.png" alt="AcadeMY" width="28" height="28" />
                <span>
                  <small>STAGE {stage.toString().padStart(2, "0")}</small>
                  <strong>{stage === 1 ? "Origin" : "Awakened"}</strong>
                </span>
                <span className="nova-preview-type">
                  {stage === 1 ? "THE ORIGINAL" : "VISUAL PREVIEW"}
                </span>
              </figcaption>
              <img
                className="nova-preview-art"
                src={svgUrl(companionPreviewSvg(card.traits, card.variant, stage))}
                alt={`${card.username}'s ${card.traits.creature}, Stage ${stage} — ${stage === 1 ? "Origin, the original adorable companion" : phoenix ? "Awakened, with layered wings, flowing tail feathers and gentle violet flames" : "Awakened, with three fluffy tails, detailed ears and water ribbons"}`}
                width="600"
                height="640"
              />
              <div className="nova-preview-description">
                <p>
                  {stage === 1
                    ? "Where the journey begins."
                    : "A familiar spirit, growing in confidence."}
                </p>
                <small>
                  {stage === 1
                    ? "Original face, eyes and colours."
                    : phoenix
                      ? "Layered flight feathers · flowing plumes · flame pendant"
                      : "Three fluffy tails · celestial ear details · water pendant"}
                </small>
              </div>
            </figure>
          ))}
      </div>
      <p className="nova-study-footnote">
        <span>✦ SAME COMPANION. A NEW SILHOUETTE.</span>
        {phoenix
          ? "Violet plumage, cosmic eyes and a gentle expression carry forward."
          : "Sapphire fur, golden eyes and a gentle expression carry forward."}
      </p>
    </section>
  );
}

export function EvolutionPreview() {
  return (
    <div className="nova-evolution-gallery">
      {DEMO_CARDS.map((card) => (
        <CompanionComparison key={card.publicId} card={card} />
      ))}
    </div>
  );
}
