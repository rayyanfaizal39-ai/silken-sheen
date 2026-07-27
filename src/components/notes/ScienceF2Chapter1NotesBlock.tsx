import { useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IconCardGrid } from "@/components/notes/blocks/IconCardGrid";
import { ChipRow } from "@/components/notes/blocks/ChipRow";
import { FlipCardGrid } from "@/components/notes/blocks/FlipCard";
import { ClassificationTree } from "@/components/notes/blocks/ClassificationTree";
import { DichotomousStarMap } from "@/components/notes/blocks/DichotomousStarMap";
import { SelfReflectionChecklist } from "@/components/notes/blocks/SelfReflectionChecklist";
import type { SciF2C1Content, MiniQuizItem } from "@/content/form2/science/chapter-1/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";
import { useProgress } from "@/hooks/use-progress";

type Lang = "en" | "bm";

const COPY: Record<
  Lang,
  {
    section11: string;
    section12: string;
    habitatsIntro: string;
    importanceIntro: string;
    keepingAliveIntro: string;
    legalHead: string;
    legalBody: string;
    habitatHead: string;
    habitatBody: string;
    recoveryHead: string;
    recoveryBody: string;
    endemicIntro: string;
    checkYourself: string;
    revealHint: string;
    whySortHead: string;
    whySortBody: string;
    animalTreeHead: string;
    animalTreeIntro: string;
    plantTreeHead: string;
    starMapHead: string;
    starMapIntro: string;
    chapterMapHead: string;
    reflectionHead: string;
    quizHead: string;
    markRead: string;
    markedRead: string;
  }
> = {
  en: {
    section11: "1.1 Diversity of Organisms",
    section12: "1.2 Classification of Organisms",
    habitatsIntro: "Same planet, wildly different homes — tap a habitat to see how life adapts to it.",
    importanceIntro: "Six reasons biodiversity underpins everyday life — tap each to expand.",
    keepingAliveIntro:
      "Deforestation for timber and development puts biodiversity at risk. Malaysia manages this through law, protected space, and active breeding programmes.",
    legalHead: "⚖️ Legal protection",
    legalBody: "The Wildlife Protection Act 1972 bans the killing or trade of endemic and endangered species.",
    habitatHead: "🏞️ Protected habitats",
    habitatBody: "National parks, marine parks, forest reserves and wildlife sanctuaries give species room to live undisturbed.",
    recoveryHead: "🐢 Active recovery",
    recoveryBody: "Seedling nurseries and turtle hatcheries actively rebuild populations that have been pushed toward extinction.",
    endemicIntro: "Malaysia's endemic species — found nowhere else on Earth:",
    checkYourself: "Check yourself",
    revealHint: "Reveal hint",
    whySortHead: "Why sort living things at all?",
    whySortBody:
      "Animals and plants can be grouped into smaller and smaller sets based on shared and differing traits — this is what lets a biologist identify an unfamiliar organism quickly and consistently.",
    animalTreeHead: "Animal Kingdom — build the tree yourself",
    animalTreeIntro: "Start at the top and choose a branch to explore each group.",
    plantTreeHead: "Plant Kingdom",
    starMapHead: "⭐ Build a dichotomous key — Star Map",
    starMapIntro:
      "A dichotomous key sorts organisms with a chain of either/or questions. Answer each one to narrow the sky down to a single organism.",
    chapterMapHead: "Chapter Map",
    reflectionHead: "Self-Reflection",
    quizHead: "Quick Quiz",
    markRead: "📘 Mark Chapter 1 as Read",
    markedRead: "Marked as read ✓",
  },
  bm: {
    section11: "1.1 Kepelbagaian Organisma",
    section12: "1.2 Klasifikasi Organisma",
    habitatsIntro: "Planet yang sama, rumah yang jauh berbeza — ketik satu habitat untuk melihat cara hidupan menyesuaikan diri.",
    importanceIntro: "Enam sebab biodiversiti menyokong kehidupan harian — ketik untuk kembangkan.",
    keepingAliveIntro:
      "Penebangan hutan untuk balak dan pembangunan meletakkan biodiversiti dalam risiko. Malaysia menguruskannya melalui undang-undang, kawasan perlindungan, dan program pembiakan aktif.",
    legalHead: "⚖️ Perlindungan undang-undang",
    legalBody: "Akta Perlindungan Hidupan Liar 1972 mengharamkan pembunuhan atau perdagangan spesies endemik dan terancam.",
    habitatHead: "🏞️ Habitat terlindung",
    habitatBody: "Taman negara, taman laut, hutan simpan dan suaka hidupan liar memberi ruang kepada spesies untuk hidup tanpa gangguan.",
    recoveryHead: "🐢 Pemulihan aktif",
    recoveryBody: "Tapak semaian anak benih dan tempat penetasan telur penyu aktif membina semula populasi yang terancam kepupusan.",
    endemicIntro: "Spesies endemik Malaysia — tiada di tempat lain di dunia:",
    checkYourself: "Semak diri",
    revealHint: "Dedahkan panduan",
    whySortHead: "Mengapa perlu mengelaskan hidupan?",
    whySortBody:
      "Haiwan dan tumbuhan boleh dikumpulkan kepada set yang lebih kecil berdasarkan ciri yang dikongsi dan berbeza — ini membolehkan ahli biologi mengenal pasti organisma yang tidak dikenali dengan cepat dan konsisten.",
    animalTreeHead: "Kerajaan Haiwan — bina pokok anda sendiri",
    animalTreeIntro: "Mula dari atas dan pilih cabang untuk meneroka setiap kumpulan.",
    plantTreeHead: "Kerajaan Tumbuhan",
    starMapHead: "⭐ Bina kekunci dikotomi — Peta Bintang",
    starMapIntro:
      "Kekunci dikotomi mengelaskan organisma melalui satu siri soalan ya/tidak. Jawab setiap satu untuk mengecilkan langit kepada satu organisma sahaja.",
    chapterMapHead: "Peta Bab",
    reflectionHead: "Refleksi Kendiri",
    quizHead: "Kuiz Pantas",
    markRead: "📘 Tandakan Bab 1 Selesai",
    markedRead: "Selesai ditanda ✓",
  },
};

function MiniQuizCard({ item, lang }: { item: MiniQuizItem; lang: Lang }) {
  const [answered, setAnswered] = useState<number | boolean | null>(null);
  const { addXp } = useProgress();

  function answer(value: number | boolean, correct: boolean) {
    if (answered !== null) return;
    setAnswered(value);
    if (correct) addXp(15, "science");
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <p className="mb-3.5 text-[14.5px] font-semibold text-foreground">{item.question}</p>
      {item.type === "true-false" ? (
        <div className="flex gap-2.5">
          {[true, false].map((option) => {
            const isCorrect = option === item.answer;
            const isChosen = answered === option;
            return (
              <button
                key={String(option)}
                type="button"
                onClick={() => answer(option, isCorrect)}
                disabled={answered !== null}
                className={`flex-1 rounded-xl border p-3 text-center text-[13px] font-semibold ${
                  answered !== null && isChosen
                    ? isCorrect
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                      : "border-red-400 bg-red-500/15 text-red-300"
                    : "border-border bg-secondary/40 text-foreground"
                }`}
              >
                {option ? (lang === "bm" ? "Betul" : "True") : lang === "bm" ? "Salah" : "False"}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {item.options.map((option, i) => {
            const isCorrect = i === item.answerIndex;
            const isChosen = answered === i;
            return (
              <button
                key={option}
                type="button"
                onClick={() => answer(i, isCorrect)}
                disabled={answered !== null}
                className={`rounded-xl border p-2.5 text-left text-[13.5px] ${
                  answered !== null && isChosen
                    ? isCorrect
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                      : "border-red-400 bg-red-500/15 text-red-300"
                    : "border-border bg-secondary/40 text-foreground"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
      {answered !== null && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.explanation}</p>
      )}
    </div>
  );
}

export function ScienceF2Chapter1NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: SciF2C1Content;
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = COPY[lang];
  const { addXp } = useProgress();
  const [starMapDone, setStarMapDone] = useState(false);
  const blogImageUrl = getNotesImageUrl(content.blogHighlight.imagePath);

  function handleStarMapIdentify() {
    if (starMapDone) return;
    setStarMapDone(true);
    addXp(10, "science");
  }

  function handleReflectionComplete() {
    addXp(10, "science");
  }

  return (
    <section id={id} data-lang={lang} className="mt-8 flex flex-col gap-8 animate-fade-up">
      <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-4">
        {blogImageUrl && (
          <img
            src={blogImageUrl}
            alt={content.blogHighlight.title}
            className="h-[90px] w-[120px] shrink-0 rounded-xl object-cover"
            loading="lazy"
          />
        )}
        <div>
          <h3 className="font-display mb-1 text-sm font-bold text-primary">{content.blogHighlight.title}</h3>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{content.blogHighlight.body}</p>
        </div>
      </div>

      <ChipRow items={content.keywords.map((k) => k.term)} />

      {/* ── 1.1 Diversity of Organisms ─────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <h2 className="font-display text-xl font-bold text-foreground">{t.section11}</h2>

        <div>
          <p className="mb-3 text-[13.5px] text-muted-foreground">{t.habitatsIntro}</p>
          <FlipCardGrid items={content.habitats} />
        </div>

        <div>
          <p className="mb-3 text-[13.5px] text-muted-foreground">{t.importanceIntro}</p>
          <IconCardGrid
            items={content.importance.map((item) => ({
              icon: <span>{item.icon}</span>,
              label: item.title,
              detail: item.description,
            }))}
          />
          <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl border border-nova-yellow/30 bg-nova-yellow/10 px-3.5 py-2 text-[12.5px] text-nova-yellow">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {content.historyFact}
          </div>
        </div>

        <div>
          <p className="mb-3 text-[13.5px] text-muted-foreground">{t.keepingAliveIntro}</p>
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="legal">
              <AccordionTrigger>{t.legalHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">{t.legalBody}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="habitat">
              <AccordionTrigger>{t.habitatHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">{t.habitatBody}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="recovery">
              <AccordionTrigger>{t.recoveryHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">{t.recoveryBody}</AccordionContent>
            </AccordionItem>
          </Accordion>

          <Tabs defaultValue={content.conservationMethods[0]?.id}>
            <TabsList>
              {content.conservationMethods.map((m) => (
                <TabsTrigger key={m.id} value={m.id}>
                  {m.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {content.conservationMethods.map((m) => (
              <TabsContent key={m.id} value={m.id} className="text-[13.5px] text-muted-foreground">
                {m.description}
              </TabsContent>
            ))}
          </Tabs>

          <p className="mb-1.5 mt-4 text-xs text-muted-foreground">{t.endemicIntro}</p>
          <ChipRow items={content.endemicSpecies} tone="green" />
        </div>

        <CheckYourself
          heading={`${t.checkYourself} — 1.1`}
          items={content.checkYourself11}
          revealLabel={t.revealHint}
        />
      </div>

      {/* ── 1.2 Classification of Organisms ────────────────────────── */}
      <div className="flex flex-col gap-5">
        <h2 className="font-display text-xl font-bold text-foreground">{t.section12}</h2>

        <div>
          <h3 className="font-display mb-2 text-base font-bold text-foreground">{t.whySortHead}</h3>
          <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.whySortBody}</p>
        </div>

        <div>
          <h3 className="font-display mb-1 text-base font-bold text-foreground">{t.animalTreeHead}</h3>
          <p className="mb-3 text-[13px] text-muted-foreground">{t.animalTreeIntro}</p>
          <ClassificationTree rootLabel="🐾" branches={content.animalBranches} />
        </div>

        <div>
          <h3 className="font-display mb-3 text-base font-bold text-foreground">{t.plantTreeHead}</h3>
          <ClassificationTree branches={content.plantBranches} compareColumns={content.cotyledonCompare} />
        </div>

        <div>
          <h3 className="font-display mb-1 text-base font-bold text-foreground">{t.starMapHead}</h3>
          <p className="mb-3 text-[13px] text-muted-foreground">{t.starMapIntro}</p>
          <DichotomousStarMap
            organisms={content.dichotomousOrganisms}
            root={content.dichotomousKey}
            onIdentify={handleStarMapIdentify}
          />
        </div>

        <CheckYourself
          heading={`${t.checkYourself} — 1.2`}
          items={content.checkYourself12}
          revealLabel={t.revealHint}
        />
      </div>

      {/* ── Self-reflection ─────────────────────────────────────────── */}
      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">{t.reflectionHead}</h2>
        <SelfReflectionChecklist
          items={content.reflectionItems}
          storageKey={storageKey ? `${storageKey}:sci-f2-c1-reflection` : undefined}
          onAllComplete={handleReflectionComplete}
        />
      </div>

      {/* ── Mini quiz ───────────────────────────────────────────────── */}
      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">{t.quizHead}</h2>
        <div className="flex flex-col gap-3.5">
          {content.miniQuiz.map((item, i) => (
            <MiniQuizCard key={i} item={item} lang={lang} />
          ))}
        </div>
      </div>

      {onMarkRead && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onMarkRead}
            disabled={isRead}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
              isRead
                ? "cursor-default bg-emerald-500/20 text-emerald-200"
                : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
            }`}
          >
            {isRead ? t.markedRead : t.markRead}
          </button>
        </div>
      )}
    </section>
  );
}

function CheckYourself({
  heading,
  items,
  revealLabel,
}: {
  heading: string;
  items: { question: string; hint: string }[];
  revealLabel: string;
}) {
  return (
    <div>
      <h3 className="font-display mb-2.5 text-base font-bold text-foreground">{heading}</h3>
      <Accordion type="single" collapsible>
        {items.map((item, i) => (
          <AccordionItem key={i} value={`q-${i}`}>
            <AccordionTrigger className="text-[13.5px]">
              {i + 1}. {item.question}
              <span className="ml-auto mr-2 shrink-0 rounded-full border border-primary/40 px-2.5 py-0.5 text-[10.5px] font-normal text-primary">
                {revealLabel}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-[13px] text-muted-foreground">{item.hint}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
