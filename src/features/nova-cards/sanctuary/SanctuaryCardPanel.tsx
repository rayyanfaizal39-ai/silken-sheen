import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import { NovaCard } from "../NovaCard";
import { cardUrl, type NovaCard as Card } from "../model";
import { soundscape } from "./audio";
import { academyHomeHref, cardsPaths } from "../paths";
import "./awakening-chamber.css";
import "./companion-profile.css";

/**
 * My Cosmic Companion: the profile a student returns to after their permanent choice. Every
 * value comes from the saved card; the system stores no separate companion name or story, so
 * the companion is named by its creature and described by its saved traits.
 */
export function SanctuaryCardPanel({ card, origin }: { card: Card; origin: string }) {
  const t = card.traits;
  const traits: [string, string][] = [
    ["Silhouette", t.appearance],
    ["Colours", t.colours],
    ["Eyes", t.eyes],
    ["Signature detail", t.marking],
    ["Habitat", t.habitat],
    ["Magical gift", t.ability],
    ["Temperament", t.behaviour],
    ["Challenge approach", t.approach],
    ["Bond", t.bond],
  ];
  return (
    <section className="sanctuary-my-nova ccprof" aria-labelledby="ccprof-title">
      <div className="cca-garden" aria-hidden="true">
        <CompanionGarden />
      </div>

      <div className="sanctuary-card-wrap ccprof-card">
        <NovaCard
          card={card}
          url={cardUrl(card.publicId, origin)}
          appearance="sanctuary"
          onFlip={() => soundscape.playChime()}
        />
      </div>

      <div className="cca-panel ccprof-panel">
        <p className="cca-crest">
          <span aria-hidden="true">✦</span> My Cosmic Companion <span aria-hidden="true">✦</span>
        </p>
        <h1 id="ccprof-title" tabIndex={-1}>
          Your <span>{t.creature}</span>
        </h1>
        <p className="ccprof-owner">
          Bonded with <b>{card.username}</b> · Card No. {card.serial} · Permanent
        </p>

        <dl className="ccprof-key">
          <div>
            <dt>Personality</dt>
            <dd>{t.personality}</dd>
          </div>
          <div>
            <dt>Element</dt>
            <dd>{t.element}</dd>
          </div>
        </dl>

        <article className="ccprof-about" aria-labelledby="ccprof-about-title">
          <h2 id="ccprof-about-title">About your companion</h2>
          <p>
            “A {t.behaviour.toLowerCase()} companion from {t.habitat.toLowerCase()}, with{" "}
            {t.eyes.toLowerCase()}. Their magical gift: {t.ability}. {t.bond}.”
          </p>
        </article>

        <section aria-labelledby="ccprof-traits-title">
          <h2 id="ccprof-traits-title" className="ccprof-subhead">
            Unique traits
          </h2>
          <dl className="ccprof-traits">
            {traits.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="ccprof-actions">
          <a className="cca-continue" href={academyHomeHref}>
            <span>Continue learning</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="ccprof-link" href={cardsPaths.home}>
            Collection & sharing settings ↗
          </a>
        </div>
      </div>
    </section>
  );
}
