import type { ReactNode } from "react";
import { novaCardSerial, novaSerialBody } from "./codes";
import { STAGES, cardFace, type NovaCard } from "./model";
import "./nova-cards.css";

/**
 * Official Cosmic Companion collectible-card front face.
 * The full viewer and compact owner previews share this renderer so identity,
 * rarity, stage, artwork framing, and collectible details cannot drift apart.
 */
export function NovaCardFrontFace({
  card,
  artwork,
  ariaHidden,
  className = "",
}: {
  card: NovaCard;
  artwork: ReactNode;
  ariaHidden?: boolean;
  className?: string;
}) {
  const stage = Math.max(1, Math.min(STAGES.length, card.stage ?? 1));
  const face = cardFace(card);
  const serial = novaCardSerial(card.serial);

  return (
    <div
      className={`nova-face nova-front ${className}`.trim()}
      aria-hidden={ariaHidden}
      data-nova-card-front
    >
      <div className="nova-card-header">
        <img src="/branding/academy-icon.png" alt="AcadeMY" width="34" height="34" />
        <span>
          AcadeMY <b>NOVA COMPANION</b>
        </span>
        <small>{card.rarity}</small>
      </div>
      <div className="nova-art-frame">
        {artwork}
        <span className="nova-art-label">{card.demo ? "FICTIONAL DEMO" : "ORIGIN"}</span>
      </div>
      <div className="nova-card-content">
        <p className="nova-eyebrow">{face.eyebrow}</p>
        <h2>
          {card.username}
          <span>'s {face.name}</span>
        </h2>
        <div className="nova-species">
          <span>{face.species}</span>
          <b>{STAGES[stage - 1].name.toUpperCase()}</b>
        </div>
        <p className="nova-description">{face.description}</p>
        <div className="nova-card-footer">
          <span>✦ {STAGES[stage - 1].name}</span>
          <span>{novaSerialBody(serial)}</span>
        </div>
      </div>
      <div className="nova-hologram" aria-hidden="true" />
    </div>
  );
}
