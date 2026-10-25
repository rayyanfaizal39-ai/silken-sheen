const PRODUCTION_CARDS_URL = "https://cards.myacademy.my";

export function isCardsIntegrationEnabled(value = import.meta.env.VITE_CARDS_INTEGRATION_ENABLED) {
  return value === "true";
}

export function resolveCardsSiteUrl(value = import.meta.env.VITE_CARDS_SITE_URL) {
  if (!value) return PRODUCTION_CARDS_URL;
  try {
    const url = new URL(value);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (
      url.username ||
      url.password ||
      (url.protocol !== "https:" && !(local && url.protocol === "http:"))
    ) {
      return PRODUCTION_CARDS_URL;
    }
    return url.origin;
  } catch {
    return PRODUCTION_CARDS_URL;
  }
}

export const cardsIntegrationEnabled = isCardsIntegrationEnabled();
export const cardsSiteUrl = resolveCardsSiteUrl();
export const cardsStudioUrl = new URL("/studio", cardsSiteUrl).href;
