const CARDS_PRODUCTION_URL = "https://cards.myacademy.my";
const MAIN_PRODUCTION_URL = "https://www.myacademy.my";

export const isStandaloneCardsApp = import.meta.env.VITE_CARDS_STANDALONE === "true";

export const cardsSiteUrl = (
  import.meta.env.VITE_CARDS_SITE_URL || CARDS_PRODUCTION_URL
).replace(/\/$/, "");

export const cardsPaths = {
  home: isStandaloneCardsApp ? "/" : "/nova",
  studio: isStandaloneCardsApp ? "/studio" : "/nova/studio",
  demo: isStandaloneCardsApp ? "/demo" : "/nova/demo",
  publicCard: (id: string) => `/card/c/${encodeURIComponent(id)}`,
};

/**
 * Main's /home route already sends Form 4–5 students to Senior and keeps
 * Form 1–3 students in Junior, so Cards never needs to duplicate that policy.
 */
export const academyHomeHref = isStandaloneCardsApp
  ? `${MAIN_PRODUCTION_URL}/home`
  : "/dashboard";

export const upgradeHref = isStandaloneCardsApp
  ? `${MAIN_PRODUCTION_URL}/upgrade`
  : "/upgrade";

export function signInHref(destination = cardsPaths.home) {
  if (!isStandaloneCardsApp) {
    return `/login?next=${encodeURIComponent(destination)}`;
  }
  const returnTo = new URL(destination, `${cardsSiteUrl}/`).href;
  return `${MAIN_PRODUCTION_URL}/login?next=${encodeURIComponent(returnTo)}`;
}
