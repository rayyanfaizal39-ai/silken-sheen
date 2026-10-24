import type { PublicCardFields } from "./public-card";

/**
 * AcadeMY accounts named in share captions.
 * Caption text only. These strings are not connected to an Instagram or
 * TikTok API, developer app, or OAuth sign-in. This app does not post to
 * either network.
 */
export const ACADEMY_SOCIAL_HANDLES = {
  instagram: "@academykssm",
  tiktok: "@myacademymalaysia",
} as const;

/** Public profile pages for the handles above. Caption text, not share targets. */
export const ACADEMY_SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/academykssm/",
  tiktok: "https://www.tiktok.com/@myacademymalaysia",
} as const;

/** Caption for WhatsApp, Instagram, and TikTok. Safe name fields, the card URL, and the AcadeMY tags. */
export function shareCaption(
  fields: Pick<PublicCardFields, "displayName" | "companionName">,
  url: string,
): string {
  return [
    `${fields.displayName}'s ${fields.companionName} on AcadeMY`,
    url,
    `${ACADEMY_SOCIAL_HANDLES.instagram} ${ACADEMY_SOCIAL_LINKS.instagram}`,
    `${ACADEMY_SOCIAL_HANDLES.tiktok} ${ACADEMY_SOCIAL_LINKS.tiktok}`,
    "#AcadeMY #NovaCompanion",
  ].join("\n");
}

/** WhatsApp has a web share URL. Instagram and TikTok do not, and this app does not post to them. */
export function whatsAppShareUrl(caption: string): string {
  return `https://wa.me/?text=${encodeURIComponent(caption)}`;
}
