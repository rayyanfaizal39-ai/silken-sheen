// Shared SEO metadata builder for route `head()` functions.
//
// Centralizing this means every route gets the full set (canonical, OG,
// Twitter Card, keywords) from one call instead of each route hand-rolling
// a partial subset — which is how most routes ended up with a title and an
// og:title but no canonical, no twitter:card, and no keywords.

export const SITE_URL = "https://www.myacademy.my";
export const SITE_NAME = "AcadeMY";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SeoOptions {
  /** Page title WITHOUT the "— AcadeMY" suffix — it's appended once here. */
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/notes". Used for canonical + og:url. */
  path: string;
  keywords?: string[];
  image?: string;
  /** Defaults to "website"; use "article" for content-style pages if needed. */
  ogType?: string;
  /** Set true to suppress indexing (e.g. auth-gated or duplicate-content pages). */
  noindex?: boolean;
}

export function seoMeta({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: SeoOptions) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
  ];

  if (keywords && keywords.length > 0) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }

  meta.push(
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:locale", content: "en_MY" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  );

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
