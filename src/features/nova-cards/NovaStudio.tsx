import { useEffect, useState } from "react";
import { NovaCard } from "./NovaCard";
import { EvolutionPreview } from "./EvolutionPreview";
import { cardUrl, DEMO_CARDS, type NovaCard as Card } from "./model";
import { LiveCraftArtChoice } from "./CraftArtChoice";
import { loadOwnerNova, republishOwnedDevCard, updateCardSharing } from "./local-session";
import type { NovaEntitlement } from "./server";
import { NovaTeaser } from "./NovaTeaser";
import { academyHomeHref, cardsPaths, signInHref } from "./paths";
import { publicCardOrigin } from "./public-card";
import { novaAccessCopy, novaAccessProblem, type NovaAccessProblem } from "./access";

export function NovaStudio() {
  const [card, setCard] = useState<Card | null>(null);
  const [entitlement, setEntitlement] = useState<NovaEntitlement | null>(null);
  const [notice, setNotice] = useState("");
  const [problem, setProblem] = useState<NovaAccessProblem>("unavailable");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sharingBusy, setSharingBusy] = useState(false);
  const [origin, setOrigin] = useState(publicCardOrigin());
  useEffect(() => {
    setOrigin(publicCardOrigin());
    let active = true;
    loadOwnerNova()
      .then(([c, access]) => {
        if (active) {
          setCard(c);
          setEntitlement(access);
          if (c?.sharing) void republishOwnedDevCard(c);
        }
      })
      .catch((e) => {
        if (active) setProblem(novaAccessProblem(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const access = novaAccessCopy(problem);
  const permanentUrl = card ? cardUrl(card.publicId, origin) : "";

  async function copyPermanentUrl() {
    if (!permanentUrl) return;
    try {
      await navigator.clipboard.writeText(permanentUrl);
      setNotice(
        card?.sharing
          ? "Permanent card URL copied. Anyone with the link can open it while sharing is on."
          : "Permanent card URL copied. Other people can open it only after you enable public sharing.",
      );
    } catch {
      setNotice("Select the permanent card URL below to copy it.");
    }
  }

  return (
    <main className="nova-page">
      <header className="nova-topbar">
        <a href={academyHomeHref} className="nova-home">
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY
        </a>
        <span>ACADEMY CARDS · VOL. 01</span>
        <span>Origin companion</span>
      </header>
      <div className="nova-studio-layout">
        <section className="nova-intro">
          <p className="nova-eyebrow">A LITTLE MAGIC. YOUR COMPANION.</p>
          <h1>
            Your journey.
            <br />
            <em>Your companion.</em>
          </h1>
          <p className="nova-lead">
            One Nova, uniquely yours. One companion, and a portrait crafted for that companion.
          </p>
          <div className="nova-feature-list">
            <span>
              01 <b>Discover your companion</b>
              <small>Twelve questions. One companion. One lifelong bond.</small>
            </span>
            <span>
              02 <b>Keep your portrait</b>
              <small>One companion. One permanent Origin card.</small>
            </span>
            <span>
              03 <b>Share it when you choose</b>
              <small>A permanent card, scannable identity, and privacy you control.</small>
            </span>
          </div>
          {card && entitlement && (
            <>
              <div className="nova-owner-panel">
                <h2>Your card settings</h2>
                <p>
                  Your public username is <strong>{card.username}</strong>.{" "}
                  {card.sharing
                    ? "Anyone with the link can view this card."
                    : "Only you can view this card."}
                </p>
                <label className="nova-share-toggle">
                  <input
                    type="checkbox"
                    checked={card.sharing}
                    disabled={sharingBusy || refreshing}
                    onChange={async (e) => {
                      const enabled = e.target.checked;
                      setSharingBusy(true);
                      try {
                        setCard(await updateCardSharing(enabled));
                        setNotice(
                          enabled
                            ? "Public sharing enabled. Your username, traits, artwork and codes are visible to anyone with the link."
                            : "Card is now private. New public requests are blocked.",
                        );
                      } catch (e) {
                        setNotice((e as Error).message);
                      } finally {
                        setSharingBusy(false);
                      }
                    }}
                  />{" "}
                  Enable public sharing
                </label>
                <button
                  type="button"
                  disabled={refreshing || sharingBusy}
                  aria-busy={refreshing}
                  onClick={async () => {
                    setRefreshing(true);
                    try {
                      const [next] = await loadOwnerNova();
                      setCard(next);
                      setNotice("Card refreshed.");
                    } catch (e) {
                      setNotice((e as Error).message);
                    } finally {
                      setRefreshing(false);
                    }
                  }}
                >
                  {refreshing ? (
                    <>
                      <span className="nova-inline-spinner" aria-hidden="true" />
                      Refreshing…
                    </>
                  ) : (
                    "Refresh card"
                  )}
                </button>
                <section
                  className="nova-share-panel nova-permanent-url"
                  aria-label="Permanent Card URL"
                  data-permanent-card-url
                >
                  <h2>Permanent Card URL</h2>
                  <p>
                    This address never changes. Other people can open it only when you enable public
                    sharing above. With sharing off, visitors will not see your card.
                  </p>
                  <p className="nova-share-url">
                    {card.sharing ? (
                      <a href={permanentUrl}>{permanentUrl}</a>
                    ) : (
                      <span>{permanentUrl}</span>
                    )}
                  </p>
                  <div className="nova-share-actions">
                    <button type="button" onClick={() => void copyPermanentUrl()}>
                      Copy URL
                    </button>
                  </div>
                  <p className="nova-permanent-url-hint">
                    {card.sharing
                      ? "Public sharing is on. Anyone with this link can view your card."
                      : "Public sharing is off. Keep the link for yourself, or turn sharing on when you are ready."}
                  </p>
                </section>
              </div>
              <div className="nova-stage-list" aria-label="Origin companion">
                <span className="current">
                  Origin <small>Your permanent card</small>
                </span>
              </div>
            </>
          )}
          <p className="nova-notice" role="status" aria-live="polite">
            {notice}
          </p>
        </section>
        <section className="nova-studio-content">
          {loading ? (
            <p role="status">Checking your Nova and subscription…</p>
          ) : !entitlement ? (
            <div className="nova-creation-panel" role="alert" data-access-problem={problem}>
              <h2>{access.title}</h2>
              <p>{access.body}</p>
              {access.signIn ? (
                <a href={signInHref(cardsPaths.home)}>Sign in</a>
              ) : (
                <a href={cardsPaths.home}>Retry</a>
              )}
              {" · "}
              <a href={cardsPaths.home}>Cosmic Companion</a>
            </div>
          ) : !entitlement.active && !card ? (
            <NovaTeaser
              card={card}
              status={entitlement.status}
              onMakePrivate={async () => {
                try {
                  setCard(await updateCardSharing(false));
                  setNotice("Your public card is now private.");
                } catch {
                  setNotice("Could not change sharing. Please retry.");
                }
              }}
            />
          ) : card && (card.traits || card.companion) ? (
            // An owned card stays viewable whatever the subscription status.
            // Refresh never hides this card — only the Refresh button shows progress.
            <>
              <NovaCard card={card} url={permanentUrl} />
              {refreshing ? (
                <p className="nova-refresh-status" role="status" aria-live="polite">
                  <span className="nova-inline-spinner" aria-hidden="true" />
                  Refreshing…
                </p>
              ) : null}
              <LiveCraftArtChoice onChanged={setCard} />
            </>
          ) : card ? (
            <div className="nova-creation-panel">
              <p className="nova-eyebrow">COSMIC COMPANION</p>
              <h2>Your portrait is being crafted</h2>
              <p>Your companion is saved. The card portrait appears here once you choose it.</p>
              <a href={cardsPaths.studio}>Open your Cosmic Companion Studio ↗</a>
            </div>
          ) : (
            <div className="nova-creation-panel">
              <p className="nova-eyebrow">NOVA STUDIO</p>
              <h2>Discover your lifelong companion</h2>
              <p>
                Answer twelve questions in your dedicated Studio. Your choices save as you go, ready
                for your two Origin artworks.
              </p>
              <a className="nova-primary" href={cardsPaths.studio}>
                Open Nova Studio ↗
              </a>
            </div>
          )}
        </section>
      </div>
      <footer className="nova-page-footer">
        AcadeMY Cards · NOVA COMPANION COLLECTION{" "}
        <span>Sample artwork · Built for your learning journey</span>
      </footer>
    </main>
  );
}

export function NovaDemoGallery() {
  const [origin, setOrigin] = useState(publicCardOrigin());
  useEffect(() => setOrigin(publicCardOrigin()), []);
  return (
    <main className="nova-page">
      <header className="nova-topbar">
        <a className="nova-home" href={cardsPaths.home}>
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY
        </a>
        <span>ACADEMY CARDS · EVOLUTION STUDY</span>
        <a href={cardsPaths.studio}>Open Nova Studio ↗</a>
      </header>
      <section className="nova-gallery-heading">
        <p className="nova-eyebrow">RAYYAN & MIA · STAGE 2 VISUAL PREVIEW</p>
        <h1>
          From Origin
          <br />
          <em>to Awakened.</em>
        </h1>
        <p>
          Two familiar companions, a little more grown. Compare their original designs with a new
          Stage 2 interpretation.
        </p>
        <p className="nova-experiment-note">
          Fictional visual experiment · no student progress or card identities are changed.
        </p>
      </section>
      <EvolutionPreview />
      <details className="nova-original-cards">
        <summary>
          Original demo cards <span>Flip, scan, share and download ↗</span>
        </summary>
        <div className="nova-gallery">
          {DEMO_CARDS.map((c) => (
            <NovaCard key={c.publicId} card={c} url={cardUrl(c.publicId, origin)} />
          ))}
        </div>
      </details>
    </main>
  );
}
