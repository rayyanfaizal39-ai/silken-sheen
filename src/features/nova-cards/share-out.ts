import type { PublicCardFields } from "./public-card";

/**
 * AcadeMY accounts named in share captions.
 * PLACEHOLDER values only. Replace both with the real handles before launch.
 * Do not guess a real Instagram or TikTok account.
 *
 * These strings are caption text. They are not connected to an Instagram or
 * TikTok API, developer app, or OAuth sign-in.
 */
export const ACADEMY_SOCIAL_HANDLES = {
  /** PLACEHOLDER. Replace with the real AcadeMY Instagram handle. */
  instagram: "@ACADEMY_INSTAGRAM_HANDLE",
  /** PLACEHOLDER. Replace with the real AcadeMY TikTok handle. */
  tiktok: "@ACADEMY_TIKTOK_HANDLE",
} as const;

/** Caption for WhatsApp, Instagram, and TikTok. Safe name fields, the card URL, and the AcadeMY tags. */
export function shareCaption(
  fields: Pick<PublicCardFields, "displayName" | "companionName">,
  url: string,
): string {
  return [
    `${fields.displayName}'s ${fields.companionName} on AcadeMY`,
    url,
    `${ACADEMY_SOCIAL_HANDLES.instagram} ${ACADEMY_SOCIAL_HANDLES.tiktok}`,
    "#AcadeMY #NovaCompanion",
  ].join("\n");
}

/** WhatsApp has a web share URL. Instagram and TikTok do not, and this app does not post to them. */
export function whatsAppShareUrl(caption: string): string {
  return `https://wa.me/?text=${encodeURIComponent(caption)}`;
}
