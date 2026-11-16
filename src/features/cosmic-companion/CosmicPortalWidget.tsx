import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/context/auth-context";
import type { NovaCard } from "@/features/nova-cards/model";
import { loadOwnerNova } from "@/features/nova-cards/local-session";
import { NovaCardFrontFace } from "@/features/nova-cards/NovaCardFrontFace";
// Approved artwork as transparent cutouts: the baked navy backdrop is removed, so glow,
// stars and orbit rings sit directly on the card surface.
import cosmicEggArt from "@/assets/cosmic-companion/academy-cosmic-egg-v2-cutout.webp";
import cosmicPortalArt from "@/assets/cosmic-companion/academy-cosmic-portal-v1-cutout.webp";
import { CosmicDualFrameMark } from "./CosmicMarks";
import { companionEntry } from "./entry";
import type { JourneyStage } from "./journey";
import { resolvePortalDisplay, type PortalDisplay, type PortalDisplayKind } from "./portal-display";
import { useCompanionEntry } from "./use-companion-entry";
import "./cosmic-portal-widget.css";

/**
 * Compact Cosmic Companion dashboard widget.
 * Pre-discovery: approved portal/egg illustrations (or dual SVG mark) + journey CTA.
 * After permanent portrait choice: the student's real signed artwork (static, no flip).
 * Optional `preview` is DEVELOPMENT/review only — never a saved owner card.
 */
export function CosmicPortalWidget({
  className = "",
  preview,
  variant = "hero",
}: {
  className?: string;
  preview?: JourneyStage;
  variant?: "hero" | "summary";
}) {
  const { user } = useAuth();
  const { ready, entry, stage, problem, retry } = useCompanionEntry(preview);
  const [cardState, setCardState] = useState<{
    ownerId: string | null;
    card: NovaCard | null;
  }>({ ownerId: null, card: null });
  const [cardReady, setCardReady] = useState(!user?.id || Boolean(preview));
  const [artBroken, setArtBroken] = useState(false);
  const [cardAttempt, setCardAttempt] = useState(0);
  const artRefreshUsed = useRef(false);

  const card = cardState.ownerId === user?.id ? cardState.card : null;
  const needsOwnerCard = stage === "selected" || stage === "waiting" || stage === "ready";
  const ownerCardReady =
    !needsOwnerCard ||
    Boolean(preview) ||
    !user?.id ||
    (cardReady && cardState.ownerId === user.id);

  useEffect(() => {
    artRefreshUsed.current = false;
  }, [user?.id, stage, preview]);

  useEffect(() => {
    setArtBroken(false);
    if (preview) {
      setCardState({ ownerId: null, card: null });
      setCardReady(true);
      return;
    }
    if (!user?.id) {
      setCardState({ ownerId: null, card: null });
      setCardReady(true);
      return;
    }
    if (stage !== "selected" && stage !== "waiting" && stage !== "ready") {
      setCardState({ ownerId: null, card: null });
      setCardReady(true);
      return;
    }
    let active = true;
    const ownerId = user.id;
    setCardReady(false);
    void loadOwnerNova()
      .then(([ownerCard]) => {
        if (!active) return;
        setCardState({ ownerId, card: ownerCard });
        setArtBroken(stage === "selected" && !ownerCard?.artworkUrl);
        setCardReady(true);
      })
      .catch(() => {
        if (!active) return;
        setCardState({ ownerId, card: null });
        setArtBroken(stage === "selected");
        setCardReady(true);
      });
    return () => {
      active = false;
    };
  }, [user?.id, stage, preview, cardAttempt]);

  const display = resolvePortalDisplay({
    ready: ready && ownerCardReady,
    stage,
    problem: Boolean(problem),
    card,
  });

  const linkEntry =
    entry ??
    companionEntry({
      entitled: false,
      stage: stage === "selected" ? "selected" : "new",
    });

  const companionType = display.portrait
    ? [display.portrait.element, display.portrait.species].filter(Boolean).join(" ")
    : "";
  const traitLine = display.portrait
    ? [companionType, display.portrait.personality].filter(Boolean).join(" · ")
    : "";
  const elementToken = display.portrait?.element?.trim().toLowerCase();
  const rarityToken = display.portrait?.rarity?.trim().toLowerCase();

  const retryAll = () => {
    setArtBroken(false);
    setCardAttempt((current) => current + 1);
    retry();
  };

  const handleArtworkError = () => {
    if (!artRefreshUsed.current) {
      artRefreshUsed.current = true;
      setCardReady(false);
      setCardAttempt((current) => current + 1);
      return;
    }
    setArtBroken(true);
  };

  if (variant === "summary") {
    return (
      <CosmicCompanionSummary
        className={className}
        card={card}
        display={display}
        entry={linkEntry}
        traitLine={traitLine}
        elementToken={elementToken}
        rarityToken={rarityToken}
        artBroken={artBroken}
        onArtworkLoad={() => {
          artRefreshUsed.current = false;
          setArtBroken(false);
        }}
        onArtworkError={handleArtworkError}
        onRetry={retryAll}
      />
    );
  }

  return (
    <article
      className={`cosmic-portal-widget ${className}`.trim()}
      data-mark={display.mark}
      data-state={display.kind}
      data-element={elementToken}
      data-rarity={rarityToken}
      aria-busy={display.kind === "loading" || undefined}
      aria-label="Cosmic Companion"
    >
      <div className="cosmic-portal-widget__body">
        {display.kind === "loading" ? (
          <div className="cosmic-portal-widget__copy">
            <p className="cosmic-portal-widget__label">{display.label}</p>
            <div className="cosmic-portal-widget__skeleton" aria-hidden="true" />
            <div className="cosmic-portal-widget__skeleton" aria-hidden="true" />
            <span className="sr-only">Loading your Cosmic Companion</span>
          </div>
        ) : (
          <>
            {display.kind === "selected" && display.portrait && !artBroken ? (
              <div className="cosmic-portal-widget__art">
                <div className="cosmic-portal-widget__portrait">
                  <img
                    src={display.portrait.artworkUrl}
                    alt={`${display.portrait.companionName}, permanent Cosmic Companion portrait`}
                    loading="eager"
                    decoding="async"
                    onLoad={() => {
                      artRefreshUsed.current = false;
                      setArtBroken(false);
                    }}
                    onError={handleArtworkError}
                  />
                </div>
              </div>
            ) : display.mark === "egg" || display.mark === "portal" ? (
              <div className="cosmic-portal-widget__art">
                <img
                  className="cosmic-portal-widget__illustration"
                  src={display.mark === "egg" ? cosmicEggArt : cosmicPortalArt}
                  alt=""
                  width={960}
                  height={display.mark === "egg" ? 670 : 675}
                  decoding="async"
                />
              </div>
            ) : display.mark === "dual" ? (
              <div className="cosmic-portal-widget__art">
                <div className="cosmic-portal-widget__mark">
                  <CosmicDualFrameMark />
                </div>
              </div>
            ) : null}

            <div className="cosmic-portal-widget__copy">
              <p className="cosmic-portal-widget__label">{display.label}</p>
              <h2 className="cosmic-portal-widget__headline">
                <PortalHeadline kind={display.kind} text={display.headline} />
              </h2>

              {display.kind === "selected" && display.portrait ? (
                <>
                  {traitLine ? <p className="cosmic-portal-widget__traits">{traitLine}</p> : null}
                  <div className="cosmic-portal-widget__meta">
                    <span className="cosmic-portal-widget__stage">{display.support}</span>
                    <span className="cosmic-portal-widget__rarity">{display.portrait.rarity}</span>
                  </div>
                </>
              ) : (
                <p className="cosmic-portal-widget__support">
                  {artBroken && display.kind === "selected"
                    ? "Portrait could not load. Open your card or retry."
                    : display.support}
                </p>
              )}

              {display.kind === "error" || (artBroken && display.kind === "selected") ? (
                <button
                  type="button"
                  className="cosmic-portal-widget__cta cosmic-portal-widget__cta--button"
                  onClick={retryAll}
                >
                  Retry
                </button>
              ) : display.cta ? (
                <PortalCta
                  entry={linkEntry}
                  label={display.cta}
                  ghost={display.kind === "waiting"}
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function CosmicCompanionSummary({
  className,
  card,
  display,
  entry,
  traitLine,
  elementToken,
  rarityToken,
  artBroken,
  onArtworkLoad,
  onArtworkError,
  onRetry,
}: {
  className: string;
  card: NovaCard | null;
  display: PortalDisplay;
  entry: NonNullable<ReturnType<typeof useCompanionEntry>["entry"]>;
  traitLine: string;
  elementToken?: string;
  rarityToken?: string;
  artBroken: boolean;
  onArtworkLoad: () => void;
  onArtworkError: () => void;
  onRetry: () => void;
}) {
  const artworkUnavailable = artBroken && display.kind === "selected";
  const neutralArtwork =
    display.kind === "loading" || display.kind === "error" || artworkUnavailable;

  return (
    <article
      className={`home-skeleton__card home-progress-summary home-progress-summary--companion cosmic-companion-preview ${className}`.trim()}
      data-mark={display.mark}
      data-state={display.kind}
      data-element={elementToken}
      data-rarity={rarityToken}
      aria-busy={display.kind === "loading" || undefined}
      aria-label="Cosmic Companion"
    >
      <div className="home-progress-summary__art home-progress-summary__companion-art cosmic-companion-preview__frame">
        {neutralArtwork ? (
          <div
            className={`cosmic-companion-preview__placeholder${
              display.kind === "loading" ? " shimmer" : ""
            }`}
            aria-hidden="true"
          >
            <Sparkles />
          </div>
        ) : display.kind === "selected" && display.portrait && card?.artworkUrl ? (
          <PortalArtworkLink
            entry={entry}
            label={`Open ${display.portrait.companionName}'s collectible card`}
          >
            <div className="cosmic-companion-preview__mini-card" aria-hidden="true">
              <NovaCardFrontFace
                card={card}
                ariaHidden
                className="cosmic-companion-preview__card-face"
                artwork={
                  <img
                    className="nova-art"
                    src={display.portrait.artworkUrl}
                    alt=""
                    loading="eager"
                    decoding="async"
                    onLoad={onArtworkLoad}
                    onError={onArtworkError}
                  />
                }
              />
            </div>
          </PortalArtworkLink>
        ) : display.mark === "egg" || display.mark === "portal" ? (
          <img
            className="cosmic-companion-preview__illustration"
            src={display.mark === "egg" ? cosmicEggArt : cosmicPortalArt}
            alt=""
            width={960}
            height={display.mark === "egg" ? 670 : 675}
            decoding="async"
          />
        ) : display.mark === "dual" ? (
          <div className="cosmic-companion-preview__dual" aria-hidden="true">
            <CosmicDualFrameMark />
          </div>
        ) : (
          <div className="cosmic-companion-preview__placeholder" aria-hidden="true">
            <Sparkles />
          </div>
        )}
      </div>

      <div className="home-progress-summary__body">
        <p className="home-skeleton__section-label">{display.label}</p>
        {display.kind === "loading" ? (
          <>
            <span className="shimmer cosmic-companion-preview__skeleton-line" />
            <span className="shimmer cosmic-companion-preview__skeleton-line cosmic-companion-preview__skeleton-line--short" />
            <span className="sr-only">Loading your Cosmic Companion</span>
          </>
        ) : (
          <>
            <h2>{display.headline}</h2>
            {display.kind === "selected" && display.portrait && !artworkUnavailable ? (
              <>
                {traitLine ? (
                  <p className="home-progress-summary__companion-meta">{traitLine}</p>
                ) : null}
                <div className="cosmic-companion-preview__badges" aria-label="Companion details">
                  <span className="cosmic-companion-preview__badge cosmic-companion-preview__badge--stage">
                    {display.portrait.stageName}
                  </span>
                  <span className="cosmic-companion-preview__badge cosmic-companion-preview__badge--rarity">
                    {display.portrait.rarity}
                  </span>
                </div>
              </>
            ) : (
              <p className="home-progress-summary__message">
                {artworkUnavailable
                  ? "Portrait could not load. Open your card or retry."
                  : display.support}
              </p>
            )}

            <div className="cosmic-companion-preview__actions">
              {display.kind === "error" || artworkUnavailable ? (
                <button
                  type="button"
                  className="home-skeleton__secondary-button cosmic-companion-preview__retry"
                  onClick={onRetry}
                >
                  Retry
                </button>
              ) : null}
              {display.kind === "error" ? (
                <Link className="home-skeleton__secondary-button" to="/companion/portal">
                  Open Companion <ArrowRight aria-hidden="true" />
                </Link>
              ) : artworkUnavailable ? (
                <PortalCta
                  entry={entry}
                  label={display.cta}
                  className="home-skeleton__secondary-button"
                />
              ) : display.cta ? (
                <PortalCta
                  entry={entry}
                  label={display.cta}
                  className="home-skeleton__secondary-button"
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function PortalArtworkLink({
  entry,
  label,
  children,
}: {
  entry: NonNullable<ReturnType<typeof useCompanionEntry>["entry"]>;
  label: string;
  children: ReactNode;
}) {
  const props = {
    className: "cosmic-companion-preview__card-link",
    "aria-label": label,
  };

  if (entry.kind === "upgrade") {
    return (
      <Link to={entry.to} search={entry.search} {...props}>
        {children}
      </Link>
    );
  }
  if (entry.kind === "card") {
    return (
      <Link to={entry.to} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <Link to={entry.to} search={entry.search} {...props}>
      {children}
    </Link>
  );
}

function PortalHeadline({ kind, text }: { kind: PortalDisplayKind; text: string }) {
  if (kind === "waiting" && text === "Your Companion Is Being Crafted") {
    return (
      <>
        Your Companion{" "}
        <span className="cosmic-portal-widget__headline-accent">Is Being Crafted</span>
      </>
    );
  }
  if (kind === "new" && text === "Discover My Companion") {
    return (
      <>
        Discover My <span className="cosmic-portal-widget__headline-accent">Companion</span>
      </>
    );
  }
  if (kind === "ready" && text === "Your Portraits Are Ready") {
    return (
      <>
        Your Portraits <span className="cosmic-portal-widget__headline-accent">Are Ready</span>
      </>
    );
  }
  return text;
}

function PortalCta({
  entry,
  label,
  ghost = false,
  className: providedClassName,
}: {
  entry: NonNullable<ReturnType<typeof useCompanionEntry>["entry"]>;
  label: string;
  ghost?: boolean;
  className?: string;
}) {
  const className =
    providedClassName ??
    (ghost
      ? "cosmic-portal-widget__cta cosmic-portal-widget__cta--ghost"
      : "cosmic-portal-widget__cta");
  const icon = ghost ? (
    <Clock className="cosmic-portal-widget__cta-arrow" aria-hidden="true" />
  ) : (
    <ArrowRight className="cosmic-portal-widget__cta-arrow" aria-hidden="true" />
  );

  if (entry.kind === "upgrade") {
    return (
      <Link to={entry.to} search={entry.search} className={className}>
        {ghost ? icon : null}
        {label}
        {ghost ? null : icon}
      </Link>
    );
  }
  if (entry.kind === "card") {
    return (
      <Link to={entry.to} className={className}>
        {ghost ? icon : null}
        {label}
        {ghost ? null : icon}
      </Link>
    );
  }
  return (
    <Link to={entry.to} search={entry.search} className={className}>
      {ghost ? icon : null}
      {label}
      {ghost ? null : icon}
    </Link>
  );
}
