import { normalizeSubjectParam } from "@/lib/study-routing";

export type SubjectWorldArtwork = {
  canonicalId: string;
  src: string;
  alt: string;
  accent: string;
  objectPosition: string;
  mobileObjectPosition: string;
};

const SUBJECT_WORLD_ARTWORK: Record<string, SubjectWorldArtwork> = {
  science: {
    canonicalId: "science",
    src: "/world/science-world.webp",
    alt: "Science learning world",
    accent: "#38bdf8",
    objectPosition: "8% 48%",
    mobileObjectPosition: "12% 52%",
  },
  math: {
    canonicalId: "math",
    src: "/world/mathematics-world.webp",
    alt: "Mathematics learning world",
    accent: "#fbbf24",
    objectPosition: "12% 52%",
    mobileObjectPosition: "15% 54%",
  },
  geography: {
    canonicalId: "geography",
    src: "/world/geography-world.webp",
    alt: "Geography learning world",
    accent: "#34d399",
    objectPosition: "6% 48%",
    mobileObjectPosition: "10% 51%",
  },
  sejarah: {
    canonicalId: "sejarah",
    src: "/world/sejarah-world.webp",
    alt: "Sejarah learning world",
    accent: "#fb923c",
    objectPosition: "8% 50%",
    mobileObjectPosition: "12% 52%",
  },
  english: {
    canonicalId: "english",
    src: "/world/english-world.webp",
    alt: "English learning world",
    accent: "#a78bfa",
    objectPosition: "10% 52%",
    mobileObjectPosition: "14% 54%",
  },
  bm: {
    canonicalId: "bm",
    src: "/world/bahasa-melayu-world.webp",
    alt: "Bahasa Melayu learning world",
    accent: "#f472b6",
    objectPosition: "8% 51%",
    mobileObjectPosition: "12% 53%",
  },
};

export const SUBJECT_WORLD_FALLBACK_ACCENT = "#a78bfa";

export function getSubjectWorldArtwork(subject: unknown): SubjectWorldArtwork | null {
  const canonicalId = normalizeSubjectParam(subject);
  return canonicalId ? (SUBJECT_WORLD_ARTWORK[canonicalId] ?? null) : null;
}
