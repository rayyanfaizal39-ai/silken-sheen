import { useEffect, useState } from "react";
import { NovaCard } from "./NovaCard";
import { companionSvg } from "./artwork";
import { svgUrl } from "./codes";
import {
  cardUrl,
  DEMO_CARDS,
  evolution,
  QUESTIONS,
  STAGES,
  traitsFromAnswers,
  type NovaCard as Card,
} from "./model";
import { createCard, getMyCard, getNovaEntitlement, setSharing, type NovaEntitlement } from "./server";
import { NovaTeaser } from "./NovaTeaser";

export function NovaStudio() {
  const [card, setCard] = useState<Card | null>(null);
  const [entitlement, setEntitlement] = useState<NovaEntitlement | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [username, setUsername] = useState("");
  const [variant, setVariant] = useState<"a" | "b" | null>(null);
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

  async function save() {
    if (!variant) return;
    setBusy(true);
    setNotice("");
    try {
      setCard(await createCard({ data: { username, answers, variant } }));
      setNotice("Your permanent Nova card is ready. It starts private.");
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

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
              <p>A connection error does not mean your subscription has expired. Please sign in or try again.</p>
              <a href="/login?next=/nova">Sign in</a>{" · "}<a href="/nova">Retry</a>
            </div>
          ) : !entitlement.active ? (
            <NovaTeaser card={card} status={entitlement.status} />
          ) : card ? (
            <NovaCard card={card} url={cardUrl(card.publicId, origin)} />
          ) : (
            <div className="nova-creation-panel">
              <p className="nova-eyebrow">CREATE YOUR NOVA · SAMPLE ARTWORK</p>
              {answers.length < 12 ? (
                <>
                  <p className="nova-question-count">QUESTION {answers.length + 1} OF 12</p>
                  <progress value={answers.length} max={12} aria-label="Questions answered" />
                  <h2>{QUESTIONS[answers.length].label}</h2>
                  <div className="nova-options">
                    {QUESTIONS[answers.length].options.map((option, i) => (
                      <button key={`${option}-${i}`} onClick={() => setAnswers((a) => [...a, i])}>
                        {option}
                        <span>↗</span>
                      </button>
                    ))}
                  </div>
                  {answers.length > 0 && (
                    <button onClick={() => setAnswers((a) => a.slice(0, -1))}>
                      ← Previous question
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h2>Which one feels like your Nova?</h2>
                  <p>
                    Both are Stage 1 sample designs. Your creature, colours and traits stay with
                    your chosen identity. No AI credits are used.
                  </p>
                  <div className="nova-design-options">
                    {(["a", "b"] as const).map((v) => (
                      <button
                        key={v}
                        className={variant === v ? "selected" : ""}
                        aria-pressed={variant === v}
                        onClick={() => setVariant(v)}
                      >
                        <img
                          src={svgUrl(companionSvg(traitsFromAnswers(answers), v))}
                          alt={`Stage 1 design ${v.toUpperCase()}, ${v === "a" ? "round silhouette" : "slender silhouette with longer crest or ears"}`}
                          width="600"
                          height="640"
                        />
                        Design {v.toUpperCase()} {variant === v ? "✓" : ""}
                      </button>
                    ))}
                  </div>
                  <label className="nova-username">
                    Public display username
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      maxLength={24}
                      pattern="[A-Za-z0-9_]{2,24}"
                      placeholder="e.g. MoonExplorer"
                      autoComplete="off"
                    />
                    <small>
                      2–24 letters, numbers or underscores. Choose a nickname you are comfortable
                      sharing.
                    </small>
                  </label>
                  <button
                    className="nova-primary"
                    disabled={busy || !variant || !/^[A-Za-z0-9_]{2,24}$/.test(username)}
                    onClick={() => void save()}
                  >
                    {busy ? "Saving…" : "Choose my permanent companion"}
                  </button>
                  <button
                    onClick={() => {
                      setAnswers([]);
                      setVariant(null);
                    }}
                  >
                    Start questions again
                  </button>
                </>
              )}
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
        <span>FICTIONAL TEST COLLECTION</span>
        <a href="/nova">Create your Nova ↗</a>
      </header>
      <section className="nova-gallery-heading">
        <p className="nova-eyebrow">MEET THE FIRST ORIGINS</p>
        <h1>
          Two companions.
          <br />
          <em>Two different worlds.</em>
        </h1>
        <p>Fictional demonstration cards. Stage 1 sample artwork. No real student data.</p>
      </section>
      <div className="nova-gallery">
        {DEMO_CARDS.map((c) => (
          <NovaCard key={c.publicId} card={c} url={cardUrl(c.publicId, origin)} />
        ))}
      </div>
    </main>
  );
}
