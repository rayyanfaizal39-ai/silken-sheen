import { useState } from "react";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BM_FORM2_KOMSAS_CATEGORIES,
  BM_FORM2_KOMSAS_WORKS,
  type Form2KomsasWork,
} from "@/data/bm-form2-komsas-structure";

const ACCENT = "#C084FC";

const COMMON_SECTIONS = [
  "Mission Brief",
  "Maksud / Sinopsis",
  "Tema",
  "Persoalan",
] as const;

const STORY_SECTIONS = [
  "Watak & Perwatakan",
  "Plot",
  "Teknik Plot",
  "Latar",
] as const;

const END_SECTIONS = [
  "Gaya Bahasa",
  "Nilai Murni",
  "Pengajaran",
  "Kosa Kata",
  "Cikgu AcadeMY",
] as const;

function sectionsFor(work: Form2KomsasWork) {
  const sections: string[] = [...COMMON_SECTIONS];
  if (work.kind === "story" || work.kind === "novel") sections.push(...STORY_SECTIONS);
  sections.push("Gaya Bahasa");
  if (work.kind === "poem" || work.kind === "sajak") sections.push("Unsur Bunyi");
  if (work.kind === "sajak") sections.push("Bentuk");
  sections.push(...END_SECTIONS.slice(1));
  return sections;
}

function WorkCard({ work, onSelect }: { work: Form2KomsasWork; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex min-h-28 w-full items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.05]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ACCENT}18`, color: ACCENT }}>
        <BookOpen className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-sm font-bold leading-5 text-white/85">{work.title}</span>
        <span className="mt-1 block text-xs text-white/35">{work.category}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function WorkStructure({ work, onBack }: { work: Form2KomsasWork; onBack: () => void }) {
  return (
    <div>
      <button type="button" onClick={onBack} className="mb-5 flex min-h-10 items-center gap-2 text-sm font-semibold text-white/45 transition-colors hover:text-white/75">
        <ArrowLeft className="h-4 w-4" /> Kembali ke KOMSAS
      </button>

      <div className="mb-6 rounded-2xl border p-5" style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}0c` }}>
        <p className="text-[10px] font-black uppercase tracking-wide" style={{ color: ACCENT }}>{work.category}</p>
        <h2 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">{work.title}</h2>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {sectionsFor(work).map((section, index) => (
          <AccordionItem key={section} value={`${work.id}-${index}`} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
            <AccordionTrigger className="min-h-16 px-4 py-4 text-left hover:no-underline sm:px-5">
              <span className="font-display text-sm font-bold text-white/80">{section}</span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5" />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function BMForm2KomsasStructure() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = BM_FORM2_KOMSAS_WORKS.find((work) => work.id === selectedId);
  if (selected) return <WorkStructure work={selected} onBack={() => setSelectedId(null)} />;

  return (
    <div>
      {BM_FORM2_KOMSAS_CATEGORIES.map((category) => {
        const works = BM_FORM2_KOMSAS_WORKS.filter((work) => work.category === category);
        return (
          <section key={category} className="mb-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-[11px] font-black uppercase tracking-wide" style={{ color: ACCENT }}>{category}</h2>
              <span className="text-[10px] font-bold text-white/30">{works.length}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((work) => <WorkCard key={work.id} work={work} onSelect={() => setSelectedId(work.id)} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
