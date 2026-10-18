import { useEffect, useState } from "react";
import { NovaCard } from "./NovaCard";
import { EvolutionPreview } from "./EvolutionPreview";
import { cardUrl, DEMO_CARDS, evolution, STAGES, type NovaCard as Card } from "./model";
import { getMyCard, getNovaEntitlement, setSharing, type NovaEntitlement } from "./server";
import { NovaTeaser } from "./NovaTeaser";

export function NovaStudio() {
  const [card, setCard] = useState<Card | null>(null);
  const [entitlement, setEntitlement] = useState<NovaEntitlement | null>(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(true);
  const [origin, setOrigin] = useState("https://www.myacademy.my");
  useEffect(() => {
    setOrigin(window.location.origin);
    let active = true;
    Promise.all([getMyCard(), getNovaEntitlement()])
      .then(([c, access]) => {
        if (active) {
          setCard(c);
          setEntitlement(access);
        }
      })
      .catch((e) => {
        if (active) setNotice(e.message);
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="nova-page">
      <header className="nova-topbar">
        <a href="/dashboard" className="nova-home">
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY
        </a>
        <span>NOVA COLLECTION · VOL. 01</span>
        <a href="/nova/demo">Explore demos ↗</a>
      </header>
      <div className="nova-studio-layout">
        <section className="nova-intro">
          <p className="nova-eyebrow">A LITTLE MAGIC. A LIFETIME OF GROWTH.</p>
          <h1>
            Your journey.
            <br />
            <em>Your companion.</em>
          </h1>
          <p className="nova-lead">
            One Nova, uniquely yours. A collectible identity that grows with every verified XP
            milestone.
          </p>
          <div className="nova-feature-list">
            <span>
              01 <b>Discover your companion</b>
              <small>Twelve questions. Two original designs. One lifelong bond.</small>
            </span>
            <span>
              02 <b>Grow through five stages</b>
              <small>Your earned XP shapes the journey. Your identity stays yours.</small>
            </span>
            <span>
              03 <b>Keep it. Share it.</b>
              <small>A permanent card, scannable identity, and privacy you control.</small>
            </span>
          </div>
          {card && entitlement?.active && (
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
                    disabled={busy}
                    onChange={async (e) => {
                      const enabled = e.target.checked;
                      setBusy(true);
                      try {
                        setCard(await setSharing({ data: enabled }));
                        setNotice(
                          enabled
                            ? "Public sharing enabled. Your username, traits, artwork, XP and codes are visible to anyone with the link."
                            : "Card is now private. New public requests are blocked.",
                        );
                      } catch (e) {
                        setNotice((e as Error).message);
                      } finally {
                        setBusy(false);
                      }
                    }}
                  />{" "}
                  Enable public sharing
                </label>
                <button
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      setCard(await getMyCard());
                    } catch (e) {
                      setNotice((e as Error).message);
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Refresh earned XP
                </button>
              </div>
              <div className="nova-stage-list" aria-label="Five evolution stages">
                {STAGES.map((s, i) => (
                  <span
                    key={s.name}
                    className={i + 1 === (card.stage ?? evolution(card.xp).stage) ? "current" : ""}
                  >
                    {i + 1}. {s.name} <small>{s.xp.toLocaleString()} XP</small>
                  </span>
                ))}
              </div>
            </>
          )}
          <p className="nova-notice" role="status">
            {notice}
          </p>
        </section>
        <section className="nova-studio-content">
          {busy ? (
            <p role="status">Checking your Nova and subscription…</p>
          ) : !entitlement ? (
            <div className="nova-creation-panel" role="alert">
              <h2>We couldn't verify your Nova access</h2>
              <p>
                A connection error does not mean your subscription has expired. Please sign in or
                try again.
              </p>
              <a href="/login?next=/nova">Sign in</a>
              {" · "}
              <a href="/nova">Retry</a>
            </div>
          ) : !entitlement.active ? (
            <NovaTeaser
              card={card}
              status={entitlement.status}
              onMakePrivate={async () => {
                try {
                  setCard(await setSharing({ data: false }));
                  setNotice("Your public card is now private.");
                } catch {
                  setNotice("Could not change sharing. Please retry.");
                }
              }}
            />
          ) : card ? (
            <NovaCard card={card} url={cardUrl(card.publicId, origin)} />
          ) : (
            <div className="nova-creation-panel">
              <p className="nova-eyebrow">NOVA STUDIO</p>
              <h2>Discover your lifelong companion</h2>
              <p>
                Answer twelve questions in your dedicated Studio. Your choices save as you go, ready
                for your two Origin artworks.
              </p>
              <a className="nova-primary" href="/nova/studio">
                Open Nova Studio ↗
              </a>
            </div>
          )}
        </section>
      </div>
      <footer className="nova-page-footer">
        AcadeMY NOVA COMPANION COLLECTION{" "}
        <span>Sample artwork · Built for your learning journey</span>
      </footer>
    </main>
  );
}

export function NovaDemoGallery() {
  const [origin, setOrigin] = useState("https://www.myacademy.my");
  useEffect(() => setOrigin(window.location.origin), []);
  return (
    <main className="nova-page">
      <header className="nova-topbar">
        <a className="nova-home" href="/nova">
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
          AcadeMY
        </a>
        <span>NOVA · EVOLUTION STUDY</span>
        <a href="/nova/studio">Open Nova Studio ↗</a>
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
