import { mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";
import { companionSvg } from "../src/features/nova-cards/artwork";
import { DEMO_CARDS } from "../src/features/nova-cards/model";

const logo = `data:image/png;base64,${readFileSync("public/branding/academy-icon.png").toString("base64")}`;
const cards = DEMO_CARDS.map(
  (card, i) =>
    `<g transform="translate(${680 + i * 205} ${65 + i * 45}) rotate(${i === 0 ? -7 : 8} 130 220)"><rect width="260" height="440" rx="18" fill="#0c192d" stroke="#d9b976" stroke-width="2"/><image href="${logo}" x="16" y="16" width="28" height="28"/><text x="55" y="35" font-family="sans-serif" font-size="10" fill="#e3cc9e">NOVA COMPANION</text><svg x="10" y="55" width="240" height="280" viewBox="0 0 600 640">${companionSvg(
      card.traits,
      card.variant,
    )
      .replace(/^.*?<svg[^>]*>/s, "")
      .replace(
        /<\/svg>$/,
        "",
      )}</svg><text x="18" y="365" font-family="Georgia" font-size="25" fill="#fff0cd">${card.traits.creature}</text><text x="18" y="393" font-family="sans-serif" font-size="11" fill="#dfc288">${card.traits.element} · Explorer · Stage 1</text><text x="18" y="420" font-family="sans-serif" font-size="8" fill="#a5abc0">FICTIONAL DEMONSTRATION CARD</text></g>`,
).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="bg"><stop stop-color="#272044"/><stop offset="1" stop-color="#050c19"/></radialGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><image href="${logo}" x="65" y="70" width="52" height="52"/><text x="135" y="104" fill="#f4e8cc" font-family="sans-serif" font-size="27">AcadeMY</text><text x="65" y="206" fill="#d9b976" font-family="sans-serif" font-size="13" letter-spacing="4">THE NOVA COMPANION COLLECTION</text><g fill="#f8efd9" font-family="Georgia" font-size="68"><text x="60" y="303">Your journey.</text><text x="60" y="385" fill="#dfbf7e" font-style="italic">Your companion.</text></g><text x="65" y="456" fill="#aab3c9" font-family="sans-serif" font-size="18">One identity. Nine stages. A lifetime of growth.</text><text x="65" y="553" fill="#99886b" font-family="sans-serif" font-size="12" letter-spacing="3">FICTIONAL STAGE 1 SAMPLE COLLECTION</text>${cards}</svg>`;
mkdirSync("public/nova-cards", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("public/nova-cards/preview.png");
console.log("Wrote public/nova-cards/preview.png (1200×630)");
