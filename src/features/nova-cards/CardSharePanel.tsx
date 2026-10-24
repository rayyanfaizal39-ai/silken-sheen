import { useEffect, useState } from "react";
import { CardShareOptions } from "./CardShareOptions";
import { loadOwnerNova, republishOwnedDevCard, updateCardSharing } from "./local-session";
import { type NovaCard } from "./model";
import { publicCardLink, publicCardOrigin } from "./public-card";
import "./nova-cards.css";

/** Owner controls on the My Companion tab. Sharing stays off until they turn it on. */
export function CardSharePanel({ publicId }: { publicId: string }) {
  const [card, setCard] = useState<NovaCard | null>(null);
  const [origin, setOrigin] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setOrigin(publicCardOrigin());
    let active = true;
    loadOwnerNova()
      .then(async ([value]) => {
        if (!active || !value || value.publicId !== publicId) return;
        setCard(value);
        if (value.sharing) await republishOwnedDevCard(value);
      })
      .catch(() => {
        if (active) setNotice("Sharing controls could not be loaded.");
      });
    return () => {
      active = false;
    };
  }, [publicId]);

  async function toggle(enabled: boolean) {
    setBusy(true);
    setNotice("");
    try {
      const next = await updateCardSharing(enabled);
      setCard(next);
      setNotice(enabled ? "Sharing is on." : "Sharing is off.");
    } catch (error) {
      setNotice((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    if (!card?.sharing) return;
    const url = publicCardLink(card.publicId, origin);
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Link copied.");
    } catch {
      setNotice("Select the link and copy it.");
    }
  }

  async function share() {
    if (!card?.sharing) return;
    const url = publicCardLink(card.publicId, origin);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${card.username}'s companion`,
          url,
        });
      } else await copyLink();
    } catch (error) {
      if ((error as Error).name !== "AbortError") setNotice("Select the link and copy it.");
    }
  }

  if (!card) return null;
  const url = publicCardLink(card.publicId, origin || publicCardOrigin());
  return (
    <section className="nova-share-panel" data-nova-share-panel aria-label="Share this card">
      <h2>Share your card</h2>
      {card.sharing ? (
        <p>Anyone with the link can open this card.</p>
      ) : (
        <p>Private · only opens after sharing is enabled</p>
      )}
      {card.sharing ? (
        <p className="nova-share-url">
          <a href={url}>{url}</a>
        </p>
      ) : null}
      <div className="nova-share-actions">
        {card.sharing ? (
          <button type="button" disabled={busy} onClick={() => void toggle(false)}>
            Turn sharing off
          </button>
        ) : (
          <button type="button" disabled={busy} onClick={() => void toggle(true)}>
            Enable sharing
          </button>
        )}
        {card.sharing ? (
          <>
            <button type="button" disabled={busy} onClick={() => void copyLink()}>
              Copy link
            </button>
            <button type="button" disabled={busy} onClick={() => void share()}>
              Share
            </button>
          </>
        ) : null}
      </div>
      {card.sharing ? <CardShareOptions card={card} url={url} onNotice={setNotice} /> : null}
      <p className="nova-notice" role="status">
        {notice}
      </p>
    </section>
  );
}
