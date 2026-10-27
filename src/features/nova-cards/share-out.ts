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

/** Caption for a picture share. Names only — no card URL, serial or public id. */
export function shareCaption(
  fields: Pick<PublicCardFields, "displayName" | "companionName">,
): string {
  return `${fields.displayName}'s ${fields.companionName}`;
}
