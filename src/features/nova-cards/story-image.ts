import type { NovaCard } from "./model";
import {
  isSafeArtworkUrl,
  storyCardSvg,
  toPublicSnapshot,
  type PublicCardFields,
} from "./public-card";

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("The story image could not be prepared."));
    reader.readAsDataURL(blob);
  });
}

async function artworkDataUrl(url: string | null): Promise<string | null> {
  if (!url || !isSafeArtworkUrl(url)) return null;
  if (url.startsWith("data:image/")) return url;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const type = response.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) return null;
    return blobToDataUrl(await response.blob());
  } catch {
    return null;
  }
}

/** 1080×1920 PNG of the safe public fields, for an Instagram or TikTok story. */
export async function storyCardBlob(card: NovaCard): Promise<Blob> {
  const fields = toPublicSnapshot(card);
  const artwork = await artworkDataUrl(fields.artworkUrl);
  const drawn: PublicCardFields = { ...fields, artworkUrl: artwork };
  const svg = storyCardSvg(drawn, artwork);
  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("The story image could not be drawn."));
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot draw the story image.");
  context.drawImage(image, 0, 0, 1080, 1920);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("The story image could not be saved."))),
      "image/png",
    );
  });
}

export function downloadStoryCard(blob: Blob) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = "academy-companion.png";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

/**
 * Open the device share sheet with the story image. The student chooses
 * Instagram, TikTok, or another app there. This does not call an Instagram or
 * TikTok API and does not sign anyone in. Desktop browsers usually cannot
 * share a file, and this returns "unavailable" so the caller can download it.
 */
export async function shareStoryFile(
  blob: Blob,
  caption: string,
): Promise<"shared" | "unavailable"> {
  const file = new File([blob], "academy-nova-card.png", { type: "image/png" });
  if (typeof navigator.share !== "function" || typeof navigator.canShare !== "function") {
    return "unavailable";
  }
  const withCaption = { files: [file], text: caption, title: "AcadeMY Nova companion" };
  const imageOnly = { files: [file], title: "AcadeMY Nova companion" };
  const payload = navigator.canShare(withCaption)
    ? withCaption
    : navigator.canShare(imageOnly)
      ? imageOnly
      : null;
  if (!payload) return "unavailable";
  await navigator.share(payload);
  return "shared";
}
