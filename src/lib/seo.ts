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
  /** Optional JSON-LD objects rendered as <script type="application/ld+json"> in <head>. */
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

  const result: {
    meta: Array<Record<string, string>>;
    links: Array<Record<string, string>>;
    scripts?: Array<{ type: string; children: string }>;
  } = {
    meta,
    links: [{ rel: "canonical", href: url }],
  };

  if (jsonLd && jsonLd.length > 0) {
    result.scripts = jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    }));
  }

  return result;
}

/** Build a schema.org BreadcrumbList from ordered {name, path} crumbs. */
export function breadcrumbJsonLd(
  crumbs: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Build a schema.org Course for a KSSM subject/resource page. */
export function courseJsonLd(input: {
  name: string;
  description: string;
  path: string;
  subjectName?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    inLanguage: ["en", "ms"],
    educationalLevel: "Secondary (KSSM Form 1-3)",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    ...(input.subjectName ? { about: input.subjectName } : {}),
  };
}

