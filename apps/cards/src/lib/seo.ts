export const SITE_URL = (
  import.meta.env.VITE_CARDS_SITE_URL || "https://cards.myacademy.my"
).replace(/\/$/, "");
export const SITE_NAME = "AcadeMY Cards";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/nova-cards/preview.png`;

export interface SeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Array<Record<string, unknown>>;
}

export function seoMeta({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
}: SeoOptions) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    ...(keywords?.length ? [{ name: "keywords", content: keywords.join(", ") }] : []),
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
  ];
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    ...(jsonLd?.length
      ? {
          scripts: jsonLd.map((data) => ({
            type: "application/ld+json",
            children: JSON.stringify(data),
          })),
        }
      : {}),
  };
}
