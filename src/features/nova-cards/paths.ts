const CARDS_PRODUCTION_URL = "https://cards.myacademy.my";
const MAIN_PRODUCTION_URL = "https://www.myacademy.my";

export const isStandaloneCardsApp = import.meta.env.VITE_CARDS_STANDALONE === "true";

export const cardsSiteUrl = (import.meta.env.VITE_CARDS_SITE_URL || CARDS_PRODUCTION_URL).replace(
  /\/$/,
  "",
);

/**
 * Main AcadeMY origin used by the standalone app for login, upgrade and return links.
 * Previews may point it at a Main preview; anything unsafe falls back to production.
 */
export function resolveMainSiteUrl(value = import.meta.env.VITE_MAIN_SITE_URL) {
  if (!value) return MAIN_PRODUCTION_URL;
  try {
    const url = new URL(value);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.username || url.password) return MAIN_PRODUCTION_URL;
    if (url.protocol !== "https:" && !(local && url.protocol === "http:"))
      return MAIN_PRODUCTION_URL;
    return url.origin;
  } catch {
    return MAIN_PRODUCTION_URL;
  }
}

const mainSiteUrl = resolveMainSiteUrl();

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
export const academyHomeHref = isStandaloneCardsApp ? `${mainSiteUrl}/home` : "/dashboard";

export const upgradeHref = isStandaloneCardsApp ? `${mainSiteUrl}/upgrade` : "/upgrade";

export function signInHref(destination = cardsPaths.home) {
  if (!isStandaloneCardsApp) {
    return `/login?next=${encodeURIComponent(destination)}`;
  }
  const returnTo = new URL(destination, `${cardsSiteUrl}/`).href;
  return `${mainSiteUrl}/login?next=${encodeURIComponent(returnTo)}`;
}
