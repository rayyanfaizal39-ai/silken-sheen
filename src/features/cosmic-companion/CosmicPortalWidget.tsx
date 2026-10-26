import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import type { NovaCard } from "@/features/nova-cards/model";
import { loadOwnerNova } from "@/features/nova-cards/local-session";
import { companionEntry } from "./entry";
import type { JourneyStage } from "./journey";
import { resolvePortalDisplay, type PortalDisplay } from "./portal-display";
import { useCompanionEntry } from "./use-companion-entry";
import "./cosmic-portal-widget.css";

type Layout = "hero" | "banner";

/**
 * Dashboard Cosmic Companion surface.
 * Pre-discovery: static portal / egg artwork + journey CTA.
 * After permanent portrait choice: the student's real signed artwork (never a placeholder).
 * Optional `preview` is for local review fixtures only — never treat it as a saved owner card.
 */
export function CosmicPortalWidget({
  layout = "hero",
  className = "",
  preview,
}: {
  layout?: Layout;
  className?: string;
  preview?: JourneyStage;
}) {
  const { user } = useAuth();
  const { ready, entry, stage, problem, retry } = useCompanionEntry(preview);
  const [card, setCard] = useState<NovaCard | null>(null);
  const [cardReady, setCardReady] = useState(!user?.id);
  const [artBroken, setArtBroken] = useState(false);

  useEffect(() => {
    setArtBroken(false);
    if (preview) {
      // Review fixtures: no owner fetch. Selected preview intentionally omits a portrait URL
      // so layout can be checked without presenting fictional art as a saved card.
      setCard(null);
      setCardReady(true);
      return;
    }
    if (!user?.id) {
      setCard(null);
      setCardReady(true);
      return;
    }
    // Owner card needed for selected portrait URL and for artOptions (choice-ready).
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
  }, [user?.id, stage]);

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

  if (layout === "banner") {
    return (
      <PortalBanner
        className={className}
        display={display}
        linkEntry={linkEntry}
        artBroken={artBroken}
        onArtError={() => setArtBroken(true)}
        onRetry={retry}
      />
    );
  }

  return (
    <article
      className={`cosmic-portal-widget ${className}`.trim()}
      data-bg={display.background}
      data-state={display.kind}
      aria-busy={display.kind === "loading" || undefined}
      aria-label="Cosmic Companion"
    >
      <div className="cosmic-portal-widget__body">
        <p className="cosmic-portal-widget__label">{display.label}</p>

        {display.kind === "loading" ? (
          <>
            <div className="cosmic-portal-widget__skeleton" aria-hidden="true" />
            <div className="cosmic-portal-widget__skeleton" aria-hidden="true" />
            <span className="sr-only">Loading your Cosmic Companion</span>
          </>
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
            ) : null}

            <h2 className="cosmic-portal-widget__headline">{display.headline}</h2>

            {display.kind === "selected" && display.portrait ? (
              <div className="cosmic-portal-widget__meta">
                <span className="cosmic-portal-widget__rarity">{display.portrait.rarity}</span>
                <span className="cosmic-portal-widget__stage">{display.support}</span>
              </div>
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

function PortalBanner({
  className,
  display,
  linkEntry,
  artBroken,
  onArtError,
  onRetry,
}: {
  className: string;
  display: PortalDisplay;
  linkEntry: NonNullable<ReturnType<typeof useCompanionEntry>["entry"]>;
  artBroken: boolean;
  onArtError: () => void;
  onRetry: () => void;
}) {
  return (
    <section
      className={`cosmic-portal-banner ${className}`.trim()}
      data-bg={display.background}
      data-state={display.kind}
      aria-label="Cosmic Companion"
    >
      <div className="cosmic-portal-banner__inner">
        <div className="cosmic-portal-banner__copy">
          <p className="cosmic-portal-widget__label">{display.label}</p>
          <h2 className="cosmic-portal-widget__headline" style={{ maxWidth: "22rem" }}>
            {display.kind === "loading" ? "Your Cosmic Companion" : display.headline}
          </h2>
          <p className="cosmic-portal-widget__support" style={{ maxWidth: "24rem" }}>
            {display.kind === "selected"
              ? `${display.portrait?.rarity ?? ""} · Stage 1 · Origin`
              : display.support}
          </p>
        </div>
        {display.portrait && !artBroken ? (
          <img
            className="cosmic-portal-banner__thumb"
            src={display.portrait.artworkUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onError={onArtError}
          />
        ) : null}
        {display.kind === "error" ? (
          <button
            type="button"
            className="cosmic-portal-widget__cta cosmic-portal-widget__cta--button"
            onClick={onRetry}
          >
            Retry
          </button>
        ) : display.cta ? (
          <PortalCta entry={linkEntry} label={display.cta} />
        ) : null}
      </div>
    </section>
  );
}
