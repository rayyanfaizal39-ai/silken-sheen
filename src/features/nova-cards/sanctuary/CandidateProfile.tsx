import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import {
  NOT_AVAILABLE,
  candidateTitle,
  listValues,
  type CompanionCandidate,
} from "../companion-candidates";
import { DEMO_CARDS, cardUrl, type NovaCard as Card } from "../model";
import { NovaCard } from "../NovaCard";
import { academyHomeHref } from "../paths";
import { CandidateCard } from "./CandidateCard";
import "./awakening-chamber.css";
import "./companion-comparison.css";
import "./companion-profile.css";

/** Stable fictional serials for a preview that is not one of the two demo cards. */
const PREVIEW_SERIAL = { a: "C00000000001", b: "C00000000002" } as const;

function previewFlipCard(
  companion: CompanionCandidate,
  username: string,
  publicId: string | null,
): Card {
  const demo = publicId ? DEMO_CARDS.find((card) => card.publicId === publicId) : undefined;
  return {
    publicId: publicId ?? `preview-${companion.id}`,
    serial: demo?.serial ?? PREVIEW_SERIAL[companion.id],
    username,
    traits: null,
    companion: {
      archetypeId: companion.id,
      name: candidateTitle(companion),
      species: companion.species ?? "",
      element: companion.element ?? "",
      personality: companion.personality ?? "",
      tagline: companion.uniqueQuality ?? "",
      description: companion.description ?? "",
      traits: companion.qualities ?? [],
      abilities: companion.abilities ?? [],
    },
    variant: companion.id,
    rarity: "Common",
    stage: 1,
    sharing: false,
    demo: true,
    artworkUrl: companion.artworkUrl ?? null,
  };
}

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
  publicId = null,
  collectionHref,
}: {
  companion: CompanionCandidate;
  username: string;
  fictional: boolean;
  /** Demo or saved public id. Fictional previews use it only to pick a stable serial. */
  publicId?: string | null;
  /** Real cards: where the student manages sharing, the QR code and export. */
  collectionHref?: string;
}) {
  const name = candidateTitle(companion);
  const [viewing, setViewing] = useState(false);
  const [savedCard, setSavedCard] = useState<Card | null>(null);
  const [cardError, setCardError] = useState("");
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
  useEffect(() => {
    if (!viewing || fictional) return;
    let active = true;
    setSavedCard(null);
    setCardError("");
    import("../server")
      .then(({ getMyCard }) => getMyCard())
      .then((card) => {
        if (!active) return;
        if (!card) setCardError("Your card is not available yet.");
        else setSavedCard(card);
      })
      .catch((error: unknown) => {
        if (active) setCardError(error instanceof Error ? error.message : "Your card could not be opened.");
      });
    return () => {
      active = false;
    };
  }, [viewing, fictional]);

  const facts: [string, string | undefined][] = [
    ["Personality", companion.personality],
    ["Element", companion.element],
    ["Strengths", listValues(companion.strengths)],
  ];
  // Shown only when the candidate actually carries them.
  if (companion.learningStyle) facts.push(["Learning style", companion.learningStyle]);

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
              c={companion}
              picked
              exploreLabel="View Full Card"
              onExplore={(trigger) => {
                opener.current = trigger;
                setViewing(true);
              }}
            />
          </div>
          {companion.uniqueQuality && <p className="ccprof-tagline">“{companion.uniqueQuality}”</p>}
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
                {companion.species ?? "Species revealed with artwork"}
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

            {((companion.qualities?.length ?? 0) > 0 || (companion.abilities?.length ?? 0) > 0) && (
              <div className="ccprof-traitgroups">
                {companion.qualities && companion.qualities.length > 0 && (
                  <div>
                    <h2 className="ccprof-subhead">Unique traits</h2>
                    <ul className="ccprof-chips">
                      {companion.qualities.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {companion.abilities && companion.abilities.length > 0 && (
                  <div>
                    <h2 className="ccprof-subhead">Abilities</h2>
                    <ul className="ccprof-chips ccprof-chips--gold">
                      {companion.abilities.map((a) => (
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
          className="sanctuary-dialog ccprof-flip"
          aria-labelledby="ccprof-full-title"
          onCancel={(event) => {
            event.preventDefault();
            setViewing(false);
          }}
        >
          <h2 id="ccprof-full-title" className="ccprof-flip-title">
            {name}
          </h2>
          {fictional ? (
            <NovaCard
              card={previewFlipCard(companion, username, publicId)}
              url={cardUrl(
                publicId ?? `preview-${companion.id}`,
                typeof window === "undefined" ? "https://cards.myacademy.my" : window.location.origin,
              )}
              appearance="classic"
            />
          ) : savedCard ? (
            <NovaCard
              card={savedCard}
              url={cardUrl(
                savedCard.publicId,
                typeof window === "undefined" ? "https://cards.myacademy.my" : window.location.origin,
              )}
              appearance="classic"
            />
          ) : (
            <p role="status">{cardError || "Opening your card…"}</p>
          )}
          <div className="sanctuary-dialog-actions">
            <button type="button" autoFocus onClick={() => setViewing(false)}>
              Close
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
