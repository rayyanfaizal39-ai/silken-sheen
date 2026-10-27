import { useState } from "react";
import type { NovaCard } from "./model";
import { cardFace } from "./model";
import { cardPictureBlob, downloadPicture } from "./download";
import { shareStoryFile } from "./story-image";

/**
 * Picture-only save and WhatsApp share. No QR, barcode, private id or card URL
 * is placed in the image. Rendered only while sharing is on.
 */
export function CardShareOptions({
  card,
  onNotice,
}: {
  card: NovaCard;
  url?: string;
  onNotice?: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  if (!card.sharing) return null;
  const title = `${card.username}'s ${cardFace(card).name}`;

  function tell(message: string) {
    onNotice?.(message);
  }

  async function picture() {
    if (card.demo) return cardPictureBlob(card);
    const { getPublicCard } = await import("./server");
    const fresh = await getPublicCard({ data: card.publicId });
    if (!fresh) throw new Error("This card is private or unavailable. Refresh to check access.");
    return cardPictureBlob(fresh);
  }

  async function save() {
    setBusy(true);
    try {
      downloadPicture(await picture());
      tell("Companion picture saved.");
    } catch (error) {
      tell((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function shareWhatsApp() {
    setBusy(true);
    try {
      const blob = await picture();
      try {
        const result = await shareStoryFile(blob, title);
        if (result === "shared") {
          tell("Choose WhatsApp in the share sheet to send the picture.");
          return;
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
      downloadPicture(blob);
      tell("The companion picture was saved. Attach it in WhatsApp.");
    } catch (error) {
      tell((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="nova-share-options" data-nova-share-options>
      <button type="button" disabled={busy} onClick={() => void shareWhatsApp()}>
        WhatsApp
      </button>
      <button type="button" disabled={busy} onClick={() => void save()}>
        Save picture
      </button>
    </div>
  );
}
