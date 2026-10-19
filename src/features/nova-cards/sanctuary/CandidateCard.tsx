import { useState } from "react";
import { Expand } from "lucide-react";
import {
  CANDIDATE_LABEL,
  NOT_AVAILABLE,
  candidateTitle,
  listValues,
  type CompanionCandidate,
} from "../companion-candidates";
import "./companion-comparison.css";

/** A soft, unidentified silhouette for companions whose artwork does not exist yet. */
function MysteryArt({ id }: { id: "a" | "b" }) {
  return (
    <svg className="occ-mystery" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={`occ-glow-${id}`} cx=".5" cy=".55" r=".55">
          <stop stopColor={id === "a" ? "#a5c8ff" : "#ffd59a"} stopOpacity=".6" />
          <stop offset=".5" stopColor={id === "a" ? "#6d5cf6" : "#d9577a"} stopOpacity=".3" />
          <stop offset="1" stopColor="#120c30" stopOpacity="0" />
        </radialGradient>
        <filter id={`occ-soft-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      <circle cx="100" cy="112" r="88" fill={`url(#occ-glow-${id})`} />
      <path
        d="M90 70c-30 2-50 30-49 60 0 13 4 25 9 34h104c6-11 8-25 5-38-4-20-15-31-28-37-10-13-24-20-41-19Z"
        fill="#140f30"
        filter={`url(#occ-soft-${id})`}
      />
      <text x="98" y="138" textAnchor="middle" className="occ-mystery__mark">
        ?
      </text>
      <ellipse cx="100" cy="176" rx="92" ry="16" fill={`url(#occ-glow-${id})`} opacity=".8" />
    </svg>
  );
}

export function CandidateArt({ c }: { c: CompanionCandidate }) {
  return (
    <div className="sanctuary-candidate-art occ-art">
      {c.artworkUrl ? (
        <img
          src={c.artworkUrl}
          alt={`${candidateTitle(c)}${c.species ? `, ${c.species}` : ""} — ${CANDIDATE_LABEL[c.id]} artwork`}
          width="1024"
          height="1536"
        />
      ) : (
        <MysteryArt id={c.id} />
      )}
    </div>
  );
}

export function CandidateCard({
  c,
  picked = false,
  onExplore,
  exploreLabel = "Explore this companion",
}: {
  c: CompanionCandidate;
  picked?: boolean;
  /** Opens a larger view of this companion; omitted where there is nothing more to show. */
  onExplore?: (trigger: HTMLButtonElement) => void;
  exploreLabel?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const name = candidateTitle(c);
  return (
    <article
      className="occ-card"
      data-tone={c.id}
      data-picked={picked}
      aria-label={`${CANDIDATE_LABEL[c.id]}: ${name}`}
    >
      <p className="occ-card__label">{CANDIDATE_LABEL[c.id]}</p>
      <button
        type="button"
        className="occ-flip"
        aria-pressed={flipped}
        aria-label={`${name} card. Showing the ${flipped ? "details" : "artwork"} side. Flip the card.`}
        onClick={() => setFlipped((side) => !side)}
      >
        <div className="occ-flip__inner" data-flipped={flipped}>
          <div className="occ-face occ-face--front">
            <CandidateArt c={c} />
            <h2>{name}</h2>
            <p className="occ-species">{c.species ?? "Species revealed with artwork"}</p>
            <span className="occ-chip occ-chip--element">{c.element ?? NOT_AVAILABLE}</span>
            {c.qualities && c.qualities.length > 0 && (
              <ul className="occ-chips" aria-label="Qualities">
                {c.qualities.slice(0, 3).map((q) => (
                  <li key={q} className="occ-chip">
                    {q}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="occ-face occ-face--back">
            <p className="occ-back__label">{CANDIDATE_LABEL[c.id]}</p>
            <h3>{name}</h3>
            <dl>
              <div>
                <dt>Personality</dt>
                <dd>{c.personality ?? NOT_AVAILABLE}</dd>
              </div>
              <div>
                <dt>Strengths</dt>
                <dd>{listValues(c.strengths) ?? NOT_AVAILABLE}</dd>
              </div>
              <div>
                <dt>Learning style</dt>
                <dd>{c.learningStyle ?? NOT_AVAILABLE}</dd>
              </div>
            </dl>
            <p className="occ-back__text">{c.description ?? NOT_AVAILABLE}</p>
          </div>
        </div>
      </button>
      <p className="occ-hint" aria-hidden="true">
        Tap the card to flip
      </p>
      {onExplore && (
        <button
          type="button"
          className="occ-explore"
          onClick={(event) => onExplore(event.currentTarget)}
        >
          <Expand size={17} aria-hidden="true" />
          {exploreLabel}
        </button>
      )}
    </article>
  );
}
