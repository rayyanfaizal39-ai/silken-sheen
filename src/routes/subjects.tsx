import { createFileRoute } from "@tanstack/react-router";
import { subjects } from "@/data/content";
import { useState } from "react";
import { Search, Globe } from "lucide-react";
import { SubjectPlanetLink, type SubjectPlanetId, AcademyPageShell } from "@/components/AcademyPage";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — AcadeMY" },
      {
        name: "description",
        content: "All KSSM subjects for Form 1, 2, and 3 Malaysian secondary students.",
      },
      { property: "og:title", content: "Subjects — AcadeMY" },
      {
        property: "og:description",
        content: "Explore Bahasa Melayu, English, Math, Science, Sejarah and Geography.",
      },
    ],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const [q, setQ] = useState("");

  const filtered = subjects.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AcademyPageShell>
      {/* ── Immersive world-select header ── */}
      <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-7 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-10">
        {/* Background constellation dots */}
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:36px_36px]" />
        {/* Ambient orbs */}
        <div className="absolute left-[10%] top-[20%] h-48 w-48 rounded-full bg-[#6366F1]/10 blur-3xl" />
        <div className="absolute right-[8%] bottom-[10%] h-64 w-64 rounded-full bg-[#8B5CF6]/08 blur-3xl" />

        <div className="relative">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#94A3B8]">
            <Globe className="h-3.5 w-3.5 text-[#8B5CF6]" />
            Choose Your World
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Every Subject Is{" "}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
              Its Own Universe
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#94A3B8]">
            Step into Mathematics Galaxy, Science Laboratory Planet, or the Time Traveller Realm. Each world has its own atmosphere — pick one and begin.
          </p>

          {/* Search */}
          <div className="mt-7 max-w-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search worlds…"
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:border-white/[0.16] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subject world cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s, i) => (
          <div
            key={s.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <SubjectPlanetLink subjectId={s.id as SubjectPlanetId} to="/notes" />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-[#94A3B8]">No worlds match "{q}". Try a different search.</p>
        </div>
      )}
    </AcademyPageShell>
  );
}
