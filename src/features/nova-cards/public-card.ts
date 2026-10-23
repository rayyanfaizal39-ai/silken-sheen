import { hostnameOf, isLocalDevHost } from "@/lib/dev-auth/gate";
import { SITE_URL } from "@/lib/seo";
import { cardFace, cardUrl, xml, type NovaCard, type PublicCompanion } from "./model";

/** Portrait preview used for link unfurls. Safe fields only. */
export const PUBLIC_PREVIEW_WIDTH = 900;
export const PUBLIC_PREVIEW_HEIGHT = 1400;

const RARITY_STARS: Record<string, number> = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
};

export interface PublicCardFields {
  publicId: string;
  displayName: string;
  companionName: string;
  title: string;
  traits: string[];
  rarity: string;
  stars: number;
  aura: string;
  serial: string;
  artworkUrl: string | null;
  crafting: boolean;
}

export function rarityStars(rarity: string): number {
  return RARITY_STARS[rarity] ?? 2;
}

export function isSafeArtworkUrl(value: string): boolean {
  if (
    value.startsWith("data:image/png;base64,") ||
    value.startsWith("data:image/jpeg;base64,") ||
    value.startsWith("data:image/webp;base64,")
  ) {
    return value.length <= 1_500_000;
  }
  try {
    const url = new URL(value);
    if (url.username || url.password) return false;
    if (url.protocol === "https:") return true;
    return url.protocol === "http:" && isLocalDevHost(url.hostname);
  } catch {
    return false;
  }
}

function publicTraits(card: NovaCard): string[] {
  const companionTraits = card.companion?.traits?.filter((trait) => trait.trim()) ?? [];
  if (companionTraits.length > 0) return companionTraits;
  if (!card.traits) return [];
  return [
    card.traits.personality,
    card.traits.creature,
    card.traits.element,
    card.traits.ability,
  ].filter((trait) => trait.trim());
}

/** Fields a stranger may see. Quiz answers, email, school, age and form never leave this function. */
export function toPublicSnapshot(card: NovaCard): PublicCardFields {
  const face = cardFace(card);
  const element = card.companion?.element || card.traits?.element || "";
  const artwork =
    card.artworkUrl && !card.crafting && isSafeArtworkUrl(card.artworkUrl) ? card.artworkUrl : null;
  return {
    publicId: card.publicId,
    displayName: card.username,
    companionName: face.name,
    title: card.companion?.tagline || face.species,
    traits: publicTraits(card),
    rarity: card.rarity,
    stars: rarityStars(card.rarity),
    aura: element ? `${element} aura` : "",
    serial: card.serial,
    artworkUrl: artwork,
    crafting: Boolean(card.crafting) && !artwork,
  };
}

export function publicCardDescription(fields: PublicCardFields): string {
  return [
    fields.companionName,
    fields.title,
    fields.traits.join(", "),
    fields.rarity,
    `${fields.stars} ${fields.stars === 1 ? "star" : "stars"}`,
    fields.aura,
    `Serial ${fields.serial}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** Payload the dev server may store. Extra student fields are dropped before it is sent. */
export function devSharePayload(card: NovaCard) {
  const companion: PublicCompanion | null = card.companion
    ? {
        archetypeId: card.companion.archetypeId,
        name: card.companion.name,
        species: card.companion.species,
        element: card.companion.element,
        personality: card.companion.personality,
        tagline: card.companion.tagline,
        description: card.companion.description,
        traits: [...card.companion.traits],
        abilities: [...card.companion.abilities],
      }
    : null;
  return {
    publicId: card.publicId,
    serial: card.serial,
    username: card.username,
    traits: card.traits,
    companion,
    variant: card.variant,
    rarity: card.rarity,
    stage: card.stage ?? 1,
    sharing: card.sharing,
    crafting: Boolean(card.crafting),
    artworkUrl: card.crafting ? null : (card.artworkUrl ?? null),
  };
}

/** Browser origin on localhost. The public site everywhere else. */
export function publicCardOrigin(): string {
  if (typeof window !== "undefined" && isLocalDevHost(window.location.hostname)) {
    return window.location.origin;
  }
  return SITE_URL;
}

/** Request host from the server. Localhost keeps this dev server; other hosts use the public site. */
export function originFromHost(hostHeader: string | null | undefined): string {
  if (!hostHeader || !isLocalDevHost(hostnameOf(hostHeader))) return SITE_URL;
  return `http://${hostHeader}`;
}

export function publicPreviewUrl(publicId: string, origin = publicCardOrigin()): string {
  return `${origin}/card/c/${encodeURIComponent(publicId)}/preview.png`;
}

export function publicCardLink(publicId: string, origin: string): string {
  return cardUrl(publicId, origin);
}

function stars(count: number): string {
  return "★".repeat(Math.max(0, Math.min(4, count)));
}

/** Portrait card drawing. Text is escaped. Artwork is included only when the caller already checked it. */
export function publicPreviewSvg(
  fields: PublicCardFields,
  artworkHref: string | null = fields.artworkUrl,
): string {
  const art =
    artworkHref && isSafeArtworkUrl(artworkHref)
      ? `<image href="${xml(artworkHref)}" x="150" y="250" width="600" height="560" preserveAspectRatio="xMidYMid slice"/>`
      : `<text x="450" y="520" text-anchor="middle" fill="#f6ca78" font-family="DejaVu Sans, sans-serif" font-size="28">${xml(
          fields.crafting ? "Your companion is being crafted" : fields.companionName,
        )}</text>
         <text x="450" y="568" text-anchor="middle" fill="#d7deee" font-family="DejaVu Sans, sans-serif" font-size="22">${xml(
           fields.crafting ? `${fields.companionName}` : fields.title,
         )}</text>`;
  const traitLine = fields.traits.slice(0, 6).join(" · ");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PUBLIC_PREVIEW_WIDTH}" height="${PUBLIC_PREVIEW_HEIGHT}" viewBox="0 0 ${PUBLIC_PREVIEW_WIDTH} ${PUBLIC_PREVIEW_HEIGHT}">
  <rect width="${PUBLIC_PREVIEW_WIDTH}" height="${PUBLIC_PREVIEW_HEIGHT}" fill="#070b16"/>
  <rect x="48" y="48" width="804" height="1304" rx="36" fill="#12182b" stroke="#dfbf7e" stroke-width="3"/>
  <text x="96" y="130" fill="#f6ca78" font-family="DejaVu Sans, sans-serif" font-size="28">AcadeMY</text>
  <text x="804" y="130" text-anchor="end" fill="#f4efe4" font-family="DejaVu Sans, sans-serif" font-size="24">${xml(fields.rarity)}</text>
  <rect x="120" y="180" width="660" height="680" rx="28" fill="#1b2338" stroke="#dfbf7e" stroke-opacity="0.35"/>
  ${art}
  <text x="96" y="940" fill="#f4efe4" font-family="DejaVu Sans, sans-serif" font-size="40">${xml(fields.displayName)}</text>
  <text x="96" y="996" fill="#f6ca78" font-family="DejaVu Sans, sans-serif" font-size="32">${xml(fields.companionName)}</text>
  <text x="96" y="1044" fill="#d7deee" font-family="DejaVu Sans, sans-serif" font-size="24">${xml(fields.title)}</text>
  <text x="96" y="1110" fill="#d7deee" font-family="DejaVu Sans, sans-serif" font-size="22">${xml(traitLine)}</text>
  <text x="96" y="1180" fill="#f6ca78" font-family="DejaVu Sans, sans-serif" font-size="36">${xml(stars(fields.stars))}</text>
  <text x="96" y="1236" fill="#d7deee" font-family="DejaVu Sans, sans-serif" font-size="24">${xml(fields.aura)}</text>
  <text x="96" y="1300" fill="#f4efe4" font-family="DejaVu Sans, sans-serif" font-size="28">${xml(fields.serial)}</text>
</svg>`;
}
