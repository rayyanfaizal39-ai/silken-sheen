import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import type { NovaCard } from "@/features/nova-cards/model";
import { loadOwnerNova } from "@/features/nova-cards/local-session";
import { CosmicEggMark, CosmicPortalMark } from "./CosmicMarks";
import { companionEntry } from "./entry";
import type { JourneyStage } from "./journey";
import { resolvePortalDisplay } from "./portal-display";
import { useCompanionEntry } from "./use-companion-entry";
import "./cosmic-portal-widget.css";

/**
 * Compact Cosmic Companion dashboard widget.
 * Pre-discovery: small portal/egg SVG mark + journey CTA.
 * After permanent portrait choice: the student's real signed artwork (static, no flip).
 * Optional `preview` is DEVELOPMENT/review only — never a saved owner card.
 */
export function CosmicPortalWidget({
  className = "",
  preview,
}: {
  className?: string;
  preview?: JourneyStage;
}) {
  const { user } = useAuth();
  const { ready, entry, stage, problem, retry } = useCompanionEntry(preview);
  const [card, setCard] = useState<NovaCard | null>(null);
  const [cardReady, setCardReady] = useState(!user?.id || Boolean(preview));
  const [artBroken, setArtBroken] = useState(false);

  useEffect(() => {
    setArtBroken(false);
    if (preview) {
      setCard(null);
      setCardReady(true);
      return;
    }
    if (!user?.id) {
      setCard(null);
      setCardReady(true);
      return;
    }
    if (stage !== "selected" && stage !== "waiting" && stage !== "ready") {
      setCard(null);
      setCardReady(true);
      return;
    }
    let active = true;
    setCardReady(false);
    void loadOwnerNova()
      .then(([ownerCard]) => {
        if (!active) return;
        setCard(ownerCard);
        setCardReady(true);
      })
      .catch(() => {
        if (!active) return;
        setCard(null);
        setCardReady(true);
      });
    return () => {
      active = false;
    };
  }, [user?.id, stage, preview]);

  const display = resolvePortalDisplay({
    ready: ready && cardReady,
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

  const traitLine = display.portrait
    ? [display.portrait.species, display.portrait.element, display.portrait.personality]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <article
      className={`cosmic-portal-widget ${className}`.trim()}
      data-mark={display.mark}
      data-state={display.kind}
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
              <div className="cosmic-portal-widget__portrait">
                <img
                  src={display.portrait.artworkUrl}
                  alt={`${display.portrait.companionName}, permanent Cosmic Companion portrait`}
                  loading="eager"
                  decoding="async"
                  onError={() => setArtBroken(true)}
                />
              </div>
            ) : display.mark === "egg" ? (
              <div className="cosmic-portal-widget__mark">
                <CosmicEggMark />
              </div>
            ) : display.mark === "portal" ? (
              <div className="cosmic-portal-widget__mark">
                <CosmicPortalMark />
              </div>
            ) : null}

            <div className="cosmic-portal-widget__copy">
              <p className="cosmic-portal-widget__label">{display.label}</p>
              <h2 className="cosmic-portal-widget__headline">{display.headline}</h2>

              {display.kind === "selected" && display.portrait ? (
                <>
                  <div className="cosmic-portal-widget__meta">
                    <span className="cosmic-portal-widget__rarity">{display.portrait.rarity}</span>
                    <span className="cosmic-portal-widget__stage">{display.support}</span>
                  </div>
                  {traitLine ? <p className="cosmic-portal-widget__traits">{traitLine}</p> : null}
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
                  onClick={() => {
                    setArtBroken(false);
                    retry();
                  }}
                >
                  Retry
                </button>
              ) : display.cta ? (
                <PortalCta entry={linkEntry} label={display.cta} />
              ) : null}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function PortalCta({
  entry,
  label,
}: {
  entry: NonNullable<ReturnType<typeof useCompanionEntry>["entry"]>;
  label: string;
}) {
  if (entry.kind === "upgrade") {
    return (
      <Link to={entry.to} search={entry.search} className="cosmic-portal-widget__cta">
        {label}
      </Link>
    );
  }
  if (entry.kind === "card") {
    return (
      <Link to={entry.to} className="cosmic-portal-widget__cta">
        {label}
      </Link>
    );
  }
  return (
    <Link to={entry.to} search={entry.search} className="cosmic-portal-widget__cta">
      {label}
    </Link>
  );
}
