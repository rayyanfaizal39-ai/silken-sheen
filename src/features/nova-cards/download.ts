import { companionSvg } from "./artwork";
import { barcodeSvg, qrDataUrl, svgUrl } from "./codes";
import { evolution, STAGES, xml, type NovaCard } from "./model";

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

export async function downloadCard(card: NovaCard, url: string) {
  const info = evolution(card.xp);
  const stage = Math.max(1, Math.min(STAGES.length, card.stage ?? info.stage));
  const [logo, qr, artwork] = await Promise.all([
    embed("/branding/academy-icon.png"),
    qrDataUrl(url),
    card.artworkUrl
      ? embed(card.artworkUrl)
      : Promise.resolve(svgUrl(companionSvg(card.traits, card.variant, stage))),
  ]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1800" viewBox="0 0 600 900"><rect width="600" height="900" rx="30" fill="#071326"/><rect x="10" y="10" width="580" height="880" rx="22" fill="none" stroke="#d9bb77" stroke-width="3"/><image href="${xml(logo)}" x="30" y="30" width="44" height="44"/><g fill="#f2d49b" font-family="Georgia"><text x="90" y="58" font-size="23">NOVA COMPANION</text><text x="555" y="58" text-anchor="end" font-size="14">${xml(card.rarity)}</text></g><image href="${xml(artwork)}" x="25" y="90" width="550" height="480" preserveAspectRatio="xMidYMid slice"/><g fill="#fff3dc" font-family="Georgia"><text x="30" y="605" font-size="34" ${card.username.length > 14 ? 'textLength="530" lengthAdjust="spacingAndGlyphs"' : ""}>${xml(card.username)}'s Nova</text><text x="30" y="639" font-size="20">${xml(card.traits.creature)} · ${xml(card.traits.element)} · ${xml(card.traits.personality)}</text><text x="30" y="673" font-size="17">Stage ${stage} / ${STAGES.length} · ${xml(STAGES[stage - 1].name)} · Level ${info.level}</text><text x="30" y="702" font-size="16">${xml(card.traits.colours)}</text><text x="30" y="731" font-size="15">${card.demo ? "FICTIONAL DEMO · " : ""}${card.sharing ? "Public card" : "Private card · enable sharing to open QR"}</text></g><image href="${xml(svgUrl(barcodeSvg(card.serial)))}" x="30" y="755" width="375" height="74"/><text x="218" y="852" text-anchor="middle" font-family="monospace" font-size="17" fill="#f2d49b">${card.serial}</text><image href="${xml(qr)}" x="438" y="755" width="130" height="130"/></svg>`;
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
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Image download failed."))),
      "image/png",
    ),
  );
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = `nova-${card.publicId}.png`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
