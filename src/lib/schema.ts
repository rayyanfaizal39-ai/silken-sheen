// JSON-LD structured data builders. Plain data objects — rendered via the
// <JsonLd> component (src/components/seo/JsonLd.tsx) as a
// <script type="application/ld+json"> wherever they're used. Google reads
// JSON-LD from anywhere in the document, not just <head>, so these are
// rendered inline in each route's JSX rather than fighting the router's
// head()-scripts plumbing.

import { SITE_URL, SITE_NAME } from "./seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/branding/academy-icon-512.png`,
    sameAs: [] as string[],
  };
}

export function educationalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "AcadeMY is a KSSM-aligned learning platform for Malaysian Form 1–3 students, offering notes, quizzes, flashcards, mind maps, and an AI tutor (Cikgu AI) in Bahasa Melayu and English/DLP.",
    areaServed: {
      "@type": "Country",
      name: "Malaysia",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/subjects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface CourseInfo {
  name: string;
  description: string;
  path: string;
}

export function courseSchema({ name, description, path }: CourseInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    url: `${SITE_URL}${path}`,
    inLanguage: ["ms", "en"],
    educationalLevel: "Form 1-3 (KSSM)",
  };
}
