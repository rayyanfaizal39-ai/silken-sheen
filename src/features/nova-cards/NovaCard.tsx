import { useEffect, useState } from "react";
import { companionSvg } from "./artwork";
import { barcodeSvg, qrDataUrl, svgUrl } from "./codes";
import { evolution, STAGES, type NovaCard as Card } from "./model";
import { downloadCard } from "./download";

export function NovaCard({ card, url }: { card: Card; url: string }) {
  const [flipped, setFlipped] = useState(false);
  const [qr, setQr] = useState("");
  const [notice, setNotice] = useState("");
  const [downloading, setDownloading] = useState(false);
  const info = evolution(card.xp);
  const stage = Math.max(1, Math.min(STAGES.length, card.stage ?? info.stage));
  const next = STAGES[stage];
  const current = STAGES[stage - 1];
  const percent = next
    ? Math.min(100, Math.max(0, ((card.xp - current.xp) / (next.xp - current.xp)) * 100))
    : 100;
  const artwork = card.artworkUrl || svgUrl(companionSvg(card.traits, card.variant, stage));
  useEffect(() => {
    let active = true;
    setQr("");
    qrDataUrl(url)
      .then((value) => {
        if (active) setQr(value);
      })
      .catch(() => {
        if (active) setNotice("QR code could not load. Please retry.");
      });
    return () => {
      active = false;
    };
  }, [url]);

  async function share() {
    try {
      if (!card.sharing) {
        setNotice("This card is private. Enable public sharing before sending its URL.");
        return;
      }
      if (navigator.share)
        await navigator.share({
          title: `${card.username}'s Nova Companion`,
          text: "Meet my AcadeMY Nova companion.",
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        setNotice("Card link copied.");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        setNotice("Copy the card address below to share it.");
    }
  }

  return (
    <section className="nova-viewer" aria-label={`${card.username}'s Nova companion card`}>
      <div className="nova-perspective">
        <button
          type="button"
          className={`nova-card-object ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          aria-label={`${flipped ? "Show front" : "Flip to QR code and barcode"} of ${card.username}'s card`}
        >
          <div className="nova-face nova-front" aria-hidden={flipped}>
            <div className="nova-card-header">
              <img src="/branding/academy-icon.png" alt="AcadeMY" width="34" height="34" />
              <span>
                AcadeMY <b>NOVA COMPANION</b>
              </span>
              <small>{card.rarity}</small>
            </div>
            <div className="nova-art-frame">
              <img
                className="nova-art"
                src={artwork}
                alt={`${card.traits.colours} ${card.traits.creature}, ${card.traits.eyes}, stage ${stage}`}
                width="600"
                height="640"
              />
              <span className="nova-art-label">
                {card.demo ? "FICTIONAL DEMO · " : ""}STAGE {stage} / {STAGES.length}
              </span>
            </div>
            <div className="nova-card-content">
              <p className="nova-eyebrow">
                {card.traits.element} · {card.traits.personality}
              </p>
              <h2>
                {card.username}
                <span>'s Nova</span>
              </h2>
              <div className="nova-species">
                <span>{card.traits.creature}</span>
                <b>LV. {info.level.toString().padStart(2, "0")}</b>
              </div>
              <p className="nova-description">
                A {card.traits.behaviour.toLowerCase()} companion from{" "}
                {card.traits.habitat.toLowerCase()}. {card.traits.bond}.
              </p>
              <div className="nova-card-footer">
                <span>✦ {STAGES[stage - 1].name}</span>
                <span>{card.serial.slice(-8)}</span>
              </div>
            </div>
            <div className="nova-hologram" aria-hidden="true" />
          </div>
          <div className="nova-face nova-back" aria-hidden={!flipped}>
            <div className="nova-back-brand">
              <img src="/branding/academy-icon.png" alt="AcadeMY" width="44" height="44" />
              <span>
                NOVA
                <br />
                <small>ONE COMPANION. YOUR JOURNEY.</small>
              </span>
            </div>
            <p className="nova-eyebrow">PERMANENT COLLECTIBLE IDENTITY</p>
            <h2>{card.username}'s Nova</h2>
            <p className="nova-back-copy">
              {card.traits.colours}
              <br />
              {card.traits.eyes}
              <br />
              {card.traits.ability}
            </p>
            <div className="nova-qr-box">
              {qr ? (
                <img src={qr} alt={`QR code for ${url}`} width="200" height="200" />
              ) : (
                <span>Preparing QR…</span>
              )}
            </div>
            <p className="nova-privacy">
              {card.sharing
                ? "Scan to meet this companion"
                : "Private · only opens after sharing is enabled"}
            </p>
            <img
              className="nova-barcode"
              src={svgUrl(barcodeSvg(card.serial))}
              alt={`Code 128 barcode: ${card.serial}`}
              width="471"
              height="222"
            />
            <p className="nova-serial">{card.serial}</p>
            <p className="nova-back-bottom">
              {card.demo
                ? "FICTIONAL TEST CARD · NO STUDENT DATA"
                : "AcadeMY · Nova Companion Collection"}
            </p>
          </div>
        </button>
      </div>
      <p className="nova-flip-hint">
        ↻ Tap the card to {flipped ? "return" : "reveal its identity"}
      </p>
      <div className="nova-earned-xp">
        <span>
          {card.xp.toLocaleString()} {card.demo ? "sample" : "earned"} XP
        </span>
        <span>
          {!next
            ? "Final evolution"
            : card.xp >= next.xp
              ? "Next evolution ready"
              : `${next.xp.toLocaleString()} XP · next stage`}
        </span>
        <progress value={percent} max={100} aria-label="Progress to next Nova stage" />
      </div>
      <div className="nova-actions">
        <button onClick={() => setFlipped((v) => !v)}>↻ Flip card</button>
        <button onClick={() => void share()} disabled={!card.sharing}>
          ↗ Share
        </button>
        <button
          disabled={downloading}
          onClick={async () => {
            setDownloading(true);
            try {
              await downloadCard(card, url);
              setNotice("Card image downloaded.");
            } catch (e) {
              setNotice((e as Error).message);
            } finally {
              setDownloading(false);
            }
          }}
        >
          {downloading ? "Saving…" : "↓ Save image"}
        </button>
      </div>
      <p className="nova-notice" role="status" aria-live="polite">
        {notice}
      </p>
      <p className="nova-public-address">
        {card.sharing ? (
          <a href={url}>{url}</a>
        ) : (
          "Private by default. You control when your card becomes public."
        )}
      </p>
    </section>
  );
}
