import { companionSvg } from "./artwork";
import { svgUrl } from "./codes";
import { STAGES, cardFace, xml, type NovaCard } from "./model";

async function embed(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Artwork download failed. Please retry.");
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/** Portrait picture for save and WhatsApp. No QR, barcode, serial, public id or URL. */
export function cardPictureSvg(card: NovaCard, artwork: string, logo: string): string {
  const stage = Math.max(1, Math.min(STAGES.length, card.stage ?? 1));
  const face = cardFace(card);
  const demo = card.demo ? "FICTIONAL DEMO" : "ORIGIN";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1800" viewBox="0 0 600 900"><rect width="600" height="900" rx="30" fill="#071326"/><rect x="10" y="10" width="580" height="880" rx="22" fill="none" stroke="#d9bb77" stroke-width="3"/><image href="${xml(logo)}" x="30" y="30" width="44" height="44"/><g fill="#f2d49b" font-family="Georgia"><text x="90" y="58" font-size="23">NOVA COMPANION</text><text x="555" y="58" text-anchor="end" font-size="14">${xml(card.rarity)}</text></g><image href="${xml(artwork)}" x="25" y="90" width="550" height="480" preserveAspectRatio="xMidYMid slice"/><g fill="#fff3dc" font-family="Georgia"><text x="30" y="605" font-size="34" ${card.username.length > 14 ? 'textLength="530" lengthAdjust="spacingAndGlyphs"' : ""}>${xml(card.username)}'s ${xml(face.name)}</text><text x="30" y="639" font-size="20">${xml(face.species)} · ${xml(face.eyebrow)}</text><text x="30" y="673" font-size="17">${xml(demo)} · Permanent companion</text><text x="30" y="710" font-size="16">${xml(face.details[0])}</text><text x="30" y="742" font-size="16">${xml(face.details[1])}</text><text x="30" y="774" font-size="16">${xml(face.details[2])}</text></g></svg>`;
}

export async function cardPictureBlob(card: NovaCard): Promise<Blob> {
  const stage = Math.max(1, Math.min(STAGES.length, card.stage ?? 1));
  const face = cardFace(card);
  const [logo, artwork] = await Promise.all([
    embed("/branding/academy-icon.png"),
    card.artworkUrl
      ? embed(card.artworkUrl)
      : Promise.resolve(svgUrl(companionSvg(face.fallbackTraits, card.variant, stage))),
  ]);
  const svg = cardPictureSvg(card, artwork, logo);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Card image could not be rendered."));
    img.src = svgUrl(svg);
  });
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image downloads are not supported in this browser.");
  context.drawImage(img, 0, 0);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Image download failed."))),
      "image/png",
    ),
  );
}

export function downloadPicture(blob: Blob) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = "academy-companion.png";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

export async function downloadCard(card: NovaCard) {
  downloadPicture(await cardPictureBlob(card));
}
