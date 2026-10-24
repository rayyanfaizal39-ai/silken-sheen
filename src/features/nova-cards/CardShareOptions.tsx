import { useState } from "react";
import type { NovaCard } from "./model";
import { toPublicSnapshot } from "./public-card";
import { shareCaption, whatsAppShareUrl } from "./share-out";
import { downloadStoryCard, shareStoryFile, storyCardBlob } from "./story-image";

/**
 * WhatsApp link, the device share sheet, a Stories download, and caption copy.
 * Instagram and TikTok are not posted to from here. Rendered only while sharing is on.
 */
export function CardShareOptions({
  card,
  url,
  onNotice,
}: {
  card: NovaCard;
  url: string;
  onNotice?: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  if (!card.sharing) return null;
  const fields = toPublicSnapshot(card);
  const caption = shareCaption(fields, url);

  function tell(message: string) {
    onNotice?.(message);
  }

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(caption);
      tell("Caption copied.");
    } catch {
      tell("Select the caption and copy it.");
    }
  }

  async function download() {
    setBusy(true);
    try {
      const blob = await storyCardBlob(card);
      downloadStoryCard(blob, card.publicId);
      tell("Story image downloaded. It is 1080 by 1920.");
    } catch (error) {
      tell((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function openShareSheet(network: "Instagram" | "TikTok") {
    setBusy(true);
    try {
      const blob = await storyCardBlob(card);
      try {
        const result = await shareStoryFile(blob, caption);
        if (result === "shared") {
          tell(
            `The share sheet opened with the story image. Paste the caption in ${network} if the app asks for one.`,
          );
          return;
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
      downloadStoryCard(blob, card.publicId);
      tell(
        `${network} has no web share link on this device. The story image was downloaded. Copy the caption, then post it yourself.`,
      );
    } catch (error) {
      tell((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="nova-share-options" data-nova-share-options>
      <a
        className="nova-share-link"
        href={whatsAppShareUrl(caption)}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <button type="button" disabled={busy} onClick={() => void openShareSheet("Instagram")}>
        Instagram
      </button>
      <button type="button" disabled={busy} onClick={() => void openShareSheet("TikTok")}>
        TikTok
      </button>
      <button type="button" disabled={busy} onClick={() => void download()}>
        Download card image
      </button>
      <button type="button" disabled={busy} onClick={() => void copyCaption()}>
        Copy caption
      </button>
    </div>
  );
}
