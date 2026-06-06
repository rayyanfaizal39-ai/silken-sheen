import { createFileRoute } from "@tanstack/react-router";
import { subjects, forms } from "@/data/content";
import { useState } from "react";
import { Search } from "lucide-react";
import { SubjectPlanetLink, type SubjectPlanetId } from "@/components/AcademyPage";

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
  const [form, setForm] = useState<string>("All");

  const filtered = subjects.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">
          Explore <span className="gradient-text">Subjects</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Pick a subject and start your journey.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search subjects…"
            className="w-full pl-11 pr-4 py-3 rounded-full glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {["All", ...forms].map((f) => (
            <button
              key={f}
              onClick={() => setForm(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                form === f
                  ? "bg-gradient-to-r from-primary to-accent text-white"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <SubjectPlanetLink key={s.id} subjectId={s.id as SubjectPlanetId} to="/notes" />
        ))}
      </div>
    </section>
  );
}
