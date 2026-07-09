import { createFileRoute } from "@tanstack/react-router";
import { CommandCenterHome } from "@/components/CommandCenterHome";
import { seoMeta } from "@/lib/seo";

// Temporarily renders the same SSR-safe Landing page as /landing instead of
// HomeDashboard. HomeDashboard pulls in the content registry + tracker stats
// (@/content/registry, @/lib/tracker) through several of its child
// components, and even after moving those to client-only dynamic imports
// elsewhere, "/" specifically was still tripping Cloudflare's Worker
// resource-limit error (1102) on cold start. Landing is already proven safe
// here (see /landing route, confirmed working SSR with full metadata) and
// has no dependency on that content data. HomeDashboard itself is untouched —
// only this route's `component` changed, so nothing about the dashboard,
// auth, or Supabase logic is affected. Revert this to restore HomeDashboard
// on "/" once the underlying weight is fully resolved.
export const Route = createFileRoute("/")({
  head: () => seoMeta({
    title: "Malaysia's Interstellar Learning Platform — KSSM Form 1-3",
    description:
      "AI-powered KSSM learning platform for Malaysian Form 1-3 students. Notes, flashcards, quizzes, mind maps and Cikgu AI tutor — free to start.",
    path: "/",
    keywords: [
      "Malaysia learning platform", "KSSM notes", "KSSM quiz", "KSSM flashcards",
      "SPM preparation", "PT3 preparation", "Cikgu AI", "AI tutor Malaysia",
      "student learning platform Malaysia",
    ],
  }),
  component: Index,
});

function Index() {
  return <CommandCenterHome />;
}
