import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import {
  CANDIDATE_LABEL,
  NOT_AVAILABLE,
  candidateTitle,
  listValues,
  type CompanionCandidate,
} from "../companion-candidates";
import { academyHomeHref } from "../paths";
import { CandidateArt, CandidateCard } from "./CandidateCard";
import "./awakening-chamber.css";
import "./companion-comparison.css";
import "./companion-profile.css";

const rise = (step: number) => ({ "--ccprof-n": step }) as CSSProperties;

/**
 * My Cosmic Companion, drawn entirely from the one candidate the student confirmed: the same
 * object that was shown on the comparison screen, so name, element, artwork placeholder and
 * description can never come from the other candidate or from unrelated demo traits.
 */
export function CandidateProfile({
  companion,
  username,
  fictional,
  collectionHref,
  publicId,
}: {
  companion: CompanionCandidate;
  username: string;
  fictional: boolean;
  /** Real cards: where the student manages sharing, the QR code and export. */
  collectionHref?: string;
  /** Permanent card id used to refresh signed portrait URLs. */
  publicId?: string | null;
}) {
  const name = candidateTitle(companion);
  const [portrait, setPortrait] = useState(companion);
  const [viewing, setViewing] = useState(false);
  useEffect(() => {
    setPortrait(companion);
  }, [companion]);
  const applyArtwork = (url: string) => setPortrait((current) => ({ ...current, artworkUrl: url }));
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!viewing) return;
    const modal = dialog.current;
    const trigger = opener.current;
    if (modal && !modal.open) modal.showModal();
    return () => {
      modal?.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [viewing]);

  const facts: [string, string | undefined][] = [
    ["Personality", portrait.personality],
    ["Element", portrait.element],
    ["Strengths", listValues(portrait.strengths)],
  ];
  // Shown only when the candidate actually carries them.
  if (portrait.learningStyle) facts.push(["Learning style", portrait.learningStyle]);

  return (
    <>
      <section
        className="sanctuary-my-nova ccprof ccprof--candidate"
        aria-labelledby="ccprof-title"
      >
        <div className="cca-garden" aria-hidden="true">
          <CompanionGarden />
        </div>

        <div className="ccprof-showcase" data-tone={companion.id}>
          <div className="ccprof-sparkles" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
          <div className="sanctuary-card-wrap ccprof-card ccprof-card--candidate">
            <CandidateCard
              c={portrait}
              picked
              publicId={fictional ? null : publicId}
              onArtworkUrl={applyArtwork}
              exploreLabel="View Full Card"
              onExplore={(trigger) => {
                opener.current = trigger;
                setViewing(true);
              }}
            />
          </div>
          {portrait.uniqueQuality && <p className="ccprof-tagline">“{portrait.uniqueQuality}”</p>}
        </div>

        <div className="ccprof-column">
          <div className="cca-panel ccprof-panel ccprof-rise" style={rise(0)}>
            <p className="cca-crest">
              <span aria-hidden="true">✦</span> My Cosmic Companion{" "}
              <span aria-hidden="true">✦</span>
            </p>
            {fictional && <p className="occ-tag">Fictional preview · not a saved companion</p>}
            <h1 id="ccprof-title" tabIndex={-1}>
              Your <span>{name}</span>
            </h1>
            <p className="ccprof-intro">
              {name} is your permanent Cosmic Companion, bonded with <b>{username}</b>.{" "}
              <span className="ccprof-species">
                {portrait.species ?? "Species revealed with artwork"}
              </span>
            </p>

            <dl className="ccprof-key ccprof-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value ?? NOT_AVAILABLE}</dd>
                </div>
              ))}
            </dl>

            {((portrait.qualities?.length ?? 0) > 0 || (portrait.abilities?.length ?? 0) > 0) && (
              <div className="ccprof-traitgroups">
                {portrait.qualities && portrait.qualities.length > 0 && (
                  <div>
                    <h2 className="ccprof-subhead">Unique traits</h2>
                    <ul className="ccprof-chips">
                      {portrait.qualities.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {portrait.abilities && portrait.abilities.length > 0 && (
                  <div>
                    <h2 className="ccprof-subhead">Abilities</h2>
                    <ul className="ccprof-chips ccprof-chips--gold">
                      {portrait.abilities.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <section
            className="cca-panel ccprof-panel ccprof-rise ccprof-match"
            style={rise(1)}
            aria-labelledby="ccprof-match-title"
          >
            <h2 id="ccprof-match-title">Why You and {name} Match</h2>
            <p>
              {companion.reason ??
                `The reasons you and ${name} were matched will appear here once companion matching is available.`}
            </p>
            {companion.reasons && companion.reasons.length > 0 && (
              <ul className="ccprof-reasons">
                {companion.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
          </section>

          <section
            className="cca-panel ccprof-panel ccprof-rise ccprof-story"
            style={rise(2)}
            aria-labelledby="ccprof-story-title"
          >
            <h2 id="ccprof-story-title">The Story of {name}</h2>
            <p>
              {companion.story ??
                companion.description ??
                `${name}’s story hasn’t been written yet.`}
            </p>
          </section>

          <div className="ccprof-actions ccprof-rise" style={rise(3)}>
            <a className="cca-continue" href={academyHomeHref}>
              <span>Continue learning</span>
              <span aria-hidden="true">↗</span>
            </a>
            {collectionHref && (
              <a className="ccprof-link" href={collectionHref}>
                Collection, sharing &amp; QR ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {viewing && (
        <dialog
          ref={dialog}
          className="sanctuary-dialog occ-detail ccprof-full"
          data-tone={companion.id}
          aria-labelledby="ccprof-full-title"
          onCancel={(event) => {
            event.preventDefault();
            setViewing(false);
          }}
        >
          <div className="occ-detail__art">
            <CandidateArt
              c={portrait}
              publicId={fictional ? null : publicId}
              onArtworkUrl={applyArtwork}
            />
          </div>
          <div className="occ-detail__body">
            <p className="occ-card__label">{CANDIDATE_LABEL[portrait.id]} · Permanent</p>
            <h2 id="ccprof-full-title">{name}</h2>
            <p className="occ-species">{portrait.species ?? "Species revealed with artwork"}</p>
            <p>{portrait.description ?? NOT_AVAILABLE}</p>
            <dl>
              <div>
                <dt>Personality</dt>
                <dd>{portrait.personality ?? NOT_AVAILABLE}</dd>
              </div>
              <div>
                <dt>Element</dt>
                <dd>{portrait.element ?? NOT_AVAILABLE}</dd>
              </div>
              <div>
                <dt>Qualities</dt>
                <dd>{listValues(portrait.qualities) ?? NOT_AVAILABLE}</dd>
              </div>
              <div>
                <dt>Abilities</dt>
                <dd>{listValues(portrait.abilities) ?? NOT_AVAILABLE}</dd>
              </div>
            </dl>
            <div className="sanctuary-dialog-actions">
              <button type="button" autoFocus onClick={() => setViewing(false)}>
                ← Back to my companion
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
