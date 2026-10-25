import { useEffect, useState } from "react";
import { companionSvg } from "./artwork";
import { CompanionArtworkImage } from "./CompanionArtworkImage";
import { barcodeSvg, novaSerialDigits, qrDataUrl, svgUrl } from "./codes";
import { STAGES, cardFace, type NovaCard as Card } from "./model";
import { CardShareOptions } from "./CardShareOptions";
import { downloadCard } from "./download";
import { getCardForExport, getPublicCard } from "./server";

export function NovaCard({
  card,
  url,
  appearance = "classic",
  pictureShare = false,
  onFlip,
}: {
  card: Card;
  url: string;
  appearance?: "classic" | "sanctuary";
  /** Public visitors save or WhatsApp a picture. The permanent URL stays in the address bar. */
  pictureShare?: boolean;
  onFlip?: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [qr, setQr] = useState("");
  const [notice, setNotice] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState(card.artworkUrl);
  const stage = Math.max(1, Math.min(STAGES.length, card.stage ?? 1));
  const face = cardFace(card);
  const choosing = (card.artOptions?.length ?? 0) === 2 && !artworkUrl;
  const crafting = Boolean(card.crafting) && !artworkUrl && !choosing;
  const demoFallback =
    card.demo && !artworkUrl
      ? svgUrl(companionSvg(face.fallbackTraits, card.variant, stage))
      : null;
  // Collectible identifier only — not authentication or prize entitlement.
  const serial = novaSerialDigits(card.serial);
  const barcode = svgUrl(barcodeSvg(serial));

  useEffect(() => {
    setArtworkUrl(card.artworkUrl);
  }, [card.artworkUrl, card.publicId]);

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

  async function loadFreshCard() {
    // Shared cards use the public RPC so visitors never need owner authentication.
    if (card.sharing) {
      const fresh = await getPublicCard({ data: card.publicId });
      if (!fresh) throw new Error("This card is private or unavailable. Refresh to check access.");
      return fresh;
    }
    return getCardForExport({ data: card.publicId });
  }

  async function refreshArtwork() {
    const fresh = await loadFreshCard();
    const next = fresh.artworkUrl ?? null;
    if (!next) throw new Error("This card is private or unavailable. Refresh to check access.");
    const path = next.split("?")[0];
    const busted = path === (artworkUrl ?? "").split("?")[0] ? `${path}?v=${Date.now()}` : next;
    setArtworkUrl(busted);
    return busted;
  }

  async function copyLink() {
    if (!card.sharing) return;
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Link copied.");
    } catch {
      setNotice("Select the card address below to copy it.");
    }
  }

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
      else await copyLink();
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        setNotice("Copy the card address below to share it.");
    }
  }

  return (
    <section
      className={`nova-viewer ${appearance === "sanctuary" ? `nova-viewer-sanctuary ${card.demo && artworkUrl ? "nova-design-fixture" : ""}` : ""}`}
      aria-label={`${card.username}'s Nova companion card`}
    >
      <div className="nova-perspective">
        <button
          type="button"
          className={`nova-card-object ${flipped ? "is-flipped" : ""}`}
          onClick={() => {
            setFlipped((v) => !v);
            onFlip?.();
          }}
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
              {choosing ? (
                <div className="nova-craft-wait">
                  <span aria-hidden="true">✦</span>
                  <strong>Choose your companion art</strong>
                  <p>
                    {face.name} the {face.species}
                  </p>
                </div>
              ) : crafting ? (
                <div className="nova-craft-wait">
                  <span aria-hidden="true">✦</span>
                  <strong>Your portrait is being crafted</strong>
                  <p>
                    {face.name} the {face.species}
                  </p>
                </div>
              ) : demoFallback ? (
                <img
                  className="nova-art"
                  src={demoFallback}
                  alt={`${face.alt}, stage ${stage}`}
                  width="600"
                  height="640"
                />
              ) : (
                <CompanionArtworkImage
                  src={artworkUrl}
                  alt={`${face.alt}, stage ${stage}`}
                  width={600}
                  height={640}
                  companionLabel={`${face.name} the ${face.species}`}
                  onRefresh={card.demo ? undefined : refreshArtwork}
                />
              )}
              <span className="nova-art-label">
                {card.demo ? "FICTIONAL DEMO" : "ORIGIN"}
              </span>
            </div>
            <div className="nova-card-content">
              <p className="nova-eyebrow">{face.eyebrow}</p>
              <h2>
                {card.username}
                <span>'s {face.name}</span>
              </h2>
              <div className="nova-species">
                <span>{face.species}</span>
                <b>{STAGES[stage - 1].name.toUpperCase()}</b>
              </div>
              <p className="nova-description">{face.description}</p>
              <div className="nova-card-footer">
                <span>✦ {STAGES[stage - 1].name}</span>
                <span>{serial.slice(-8)}</span>
              </div>
            </div>
            <div className="nova-hologram" aria-hidden="true" />
          </div>
          <div className="nova-face nova-back" aria-hidden={!flipped} data-nova-card-back>
            <div className="nova-back-brand">
              <img src="/branding/academy-icon.png" alt="AcadeMY" width="44" height="44" />
              <span>
                NOVA
                <br />
                <small>ONE COMPANION. YOUR JOURNEY.</small>
              </span>
            </div>
            <p className="nova-eyebrow">PERMANENT COLLECTIBLE IDENTITY</p>
            <h2>
              {card.username}'s {face.name}
            </h2>
            <p className="nova-back-copy">
              {face.details[0]}
              <br />
              {face.details[1]}
              <br />
              {face.details[2]}
            </p>
            <div className="nova-codes" data-nova-codes>
              <div className="nova-qr-box" data-nova-qr>
                {qr ? (
                  <img src={qr} alt={`QR code for ${url}`} width="200" height="200" />
                ) : (
                  <span className="nova-qr-pending">
                    <span className="nova-inline-spinner" aria-hidden="true" />
                    Preparing QR…
                  </span>
                )}
              </div>
              <p className="nova-privacy">
                {card.sharing
                  ? "Scan to meet this companion"
                  : "Private · only opens after sharing is enabled"}
              </p>
              <img
                className="nova-barcode"
                data-nova-barcode
                src={barcode}
                alt={`Code 128 barcode: ${serial}`}
                width="471"
                height="222"
                decoding="sync"
              />
              <p className="nova-serial" data-nova-serial>
                {serial}
              </p>
            </div>
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
        <span>Origin Master Card</span>
        <span>{card.demo ? "Fictional preview" : "Your permanent Cosmic Companion"}</span>
      </div>
      <div className="nova-actions">
        <button
          onClick={() => {
            setFlipped((v) => !v);
            onFlip?.();
          }}
        >
          ↻ Flip card
        </button>
        {pictureShare ? (
          card.sharing ? <CardShareOptions card={card} onNotice={setNotice} /> : null
        ) : (
          <>
            {card.sharing ? (
              <>
                <button type="button" onClick={() => void copyLink()}>
                  Copy link
                </button>
                <button type="button" onClick={() => void share()}>
                  Share
                </button>
              </>
            ) : null}
            <button
              disabled={downloading}
              onClick={async () => {
                setDownloading(true);
                try {
                  const current = await loadFreshCard();
                  await downloadCard(current);
                  if (current.artworkUrl) setArtworkUrl(current.artworkUrl);
                  setNotice("Companion picture saved.");
                } catch (e) {
                  setNotice((e as Error).message);
                } finally {
                  setDownloading(false);
                }
              }}
            >
              {downloading ? "Saving…" : "↓ Save picture"}
            </button>
          </>
        )}
      </div>
      <p className="nova-notice" role="status" aria-live="polite">
        {notice}
      </p>
      {pictureShare ? null : (
        <p className="nova-public-address">
          {card.sharing ? (
            <a href={url}>{url}</a>
          ) : (
            "Private by default. You control when your card becomes public."
          )}
        </p>
      )}
    </section>
  );
}
