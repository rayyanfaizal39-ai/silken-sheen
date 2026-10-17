import { NovaCard } from "../NovaCard";
import { cardUrl, STAGES, type NovaCard as Card } from "../model";
import type { StudioState } from "../studio-model";
import { soundscape } from "./audio";
export function SanctuaryCardPanel({
  card,
  origin,
  state,
  busy,
  onEvolve,
}: {
  card: Card;
  origin: string;
  state?: StudioState;
  busy?: boolean;
  onEvolve?: (stage: number) => Promise<boolean>;
}) {
  const stage = Math.max(1, Math.min(5, card.stage ?? 1)),
    next = STAGES[stage];
  const job = state?.evolutions.find((e) => e.stage === stage + 1);
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
            <dt>{card.demo ? "Sample" : "Verified"} XP</dt>
            <dd>{card.xp.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Next evolution</dt>
            <dd>{next ? `${next.name} · ${next.xp.toLocaleString()} XP` : "Legendary"}</dd>
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
              <small>{s.xp.toLocaleString()} XP</small>
            </li>
          ))}
        </ol>
        {next && card.xp >= next.xp && state?.active && state.enabled && onEvolve && (
          <button
            className="sanctuary-primary"
            disabled={busy || !!job}
            onClick={() => void onEvolve(stage + 1)}
          >
            {job ? `${next.name} · ${job.status}` : `Evolve my Nova to ${next.name}`}
          </button>
        )}
        <div className="sanctuary-study-link">
          <span>Grow through learning</span>
          <a href="/dashboard">Continue your journey ↗</a>
        </div>
      </section>
      <a className="sanctuary-collection-link" href="/nova">
        Collection & sharing settings ↗
      </a>
    </section>
  );
}
