import { NovaCard } from "../NovaCard";
import { cardUrl, STAGES, type NovaCard as Card } from "../model";
import { soundscape } from "./audio";
import { academyHomeHref, cardsPaths } from "../paths";
export function SanctuaryCardPanel({
  card,
  origin,
}: {
  card: Card;
  origin: string;
}) {
  const stage = 1;
  return (
    <section className="sanctuary-my-nova">
      <h1 tabIndex={-1}>My Nova</h1>
      <p className="sanctuary-eyebrow">ONE COMPANION. YOUR JOURNEY.</p>
      <div className="sanctuary-card-wrap">
        <NovaCard
          card={card}
          url={cardUrl(card.publicId, origin)}
          appearance="sanctuary"
          onFlip={() => soundscape.playChime()}
        />
      </div>
      <article className="sanctuary-description">
        <h2>
          Meet your {card.traits.creature} {card.traits.element === "Water" ? "💧" : "✦"}
        </h2>
        <p>
          “A {card.traits.behaviour.toLowerCase()} companion from{" "}
          {card.traits.habitat.toLowerCase()}, with {card.traits.eyes.toLowerCase()}. Their magical
          gift: {card.traits.ability}. {card.traits.bond}.”
        </p>
        <dl>
          <div>
            <dt>Element</dt>
            <dd>{card.traits.element}</dd>
          </div>
          <div>
            <dt>Personality</dt>
            <dd>{card.traits.personality}</dd>
          </div>
          <div>
            <dt>Card status</dt>
            <dd>Permanent</dd>
          </div>
          <div>
            <dt>Next evolution</dt>
            <dd>Coming in a later phase</dd>
          </div>
        </dl>
      </article>
      <section className="sanctuary-evolution" aria-label="Evolution path">
        <div>
          <h2>Evolution Path</h2>
          <span>Stage {stage} of 5</span>
        </div>
        <ol>
          {STAGES.map((s, i) => (
            <li key={s.name} aria-current={i + 1 === stage ? "step" : undefined}>
              <b>{i + 1 < stage ? "✓" : i + 1}</b>
              <span>{s.name}</span>
              <small>{i === 0 ? "Phase 1" : "Coming later"}</small>
            </li>
          ))}
        </ol>
        <div className="sanctuary-study-link">
          <span>Evolution is not enabled in Phase 1</span>
          <a href={academyHomeHref}>Continue your journey ↗</a>
        </div>
      </section>
      <a className="sanctuary-collection-link" href={cardsPaths.home}>
        Collection & sharing settings ↗
      </a>
    </section>
  );
}
