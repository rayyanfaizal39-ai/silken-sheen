import { useRef, useState } from "react";
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
import { AnnotatedImage } from "@/components/notes/blocks/AnnotatedImage";
import { DichotomousStarMap } from "@/components/notes/blocks/DichotomousStarMap";
import { SelfReflectionChecklist } from "@/components/notes/blocks/SelfReflectionChecklist";
import type {
  SciF2C1Content,
  MiniQuizItem,
} from "@/content/form2/science/chapter-1/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";
import type { AnnotatedImageBlock } from "@/content/form2/science/interactive-types";
import { useProgress } from "@/hooks/use-progress";
import { ScienceSectionedNotesShell, type ScienceNotesSection } from "./ScienceSectionedNotesShell";

type Lang = "en" | "bm";

const COPY: Record<
  Lang,
  {
    section11: string;
    section12: string;
    managementSection: string;
    animalSection: string;
    plantSection: string;
    sectionLabels: string[];
    biodiversityIntro: string;
    habitatsIntro: string;
    importanceIntro: string;
    keepingAliveIntro: string;
    legalHead: string;
    legalBody: string;
    habitatHead: string;
    habitatBody: string;
    recoveryHead: string;
    recoveryBody: string;
    humanImpactHead: string;
    humanImpactIntro: string;
    speciesHead: string;
    speciesCautionLabel: string;
    glossaryHead: string;
    glossaryHint: string;
    checkYourself: string;
    revealHint: string;
    whySortHead: string;
    whySortBody: string;
    animalTreeHead: string;
    animalTreeIntro: string;
    plantTreeHead: string;
    plantTreeIntro: string;
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
    managementSection: "Effective Biodiversity Management",
    animalSection: "1.2 Classification of Organisms — Animals",
    plantSection: "1.2 Classification of Organisms — Plants",
    sectionLabels: ["Biodiversity", "Management", "Animals", "Plants", "Dichotomous key"],
    biodiversityIntro:
      "Biodiversity is the variety of organisms on Earth — microorganisms, animals and plants — and it exists because habitats and climates differ so much, from deserts to polar regions to soil to the sea. Organisms living in different habitats have evolved different characteristics that let them survive and thrive there independently. Biodiversity also includes genetic diversity: the variation within a single species, caused by differences in the genes of individual organisms. Malaysia's hot, humid equatorial climate makes it an especially rich habitat for life, which is why it is recognised as one of the world's 12 megabiodiversity countries.",
    habitatsIntro:
      "Tap a habitat below to see how its climate shapes the organisms that live there.",
    importanceIntro: "Six reasons biodiversity underpins everyday life — tap each to expand.",
    keepingAliveIntro:
      "Deforestation for timber and development puts biodiversity at risk. Malaysia manages this through law, protected space, and active breeding programmes.",
    legalHead: "⚖️ Legal protection",
    legalBody:
      "The Wildlife Protection Act 1972 bans the killing or trade of endemic and endangered species.",
    habitatHead: "🏞️ Protected habitats",
    habitatBody:
      "National parks, marine parks, forest reserves and wildlife sanctuaries give species room to live undisturbed.",
    recoveryHead: "🐢 Active recovery",
    recoveryBody:
      "Seedling nurseries and turtle hatcheries actively rebuild populations that have been pushed toward extinction.",
    humanImpactHead: "⚠️ What human activity does to biodiversity",
    humanImpactIntro: "Each activity sets off a chain of consequences — follow the arrows.",
    speciesHead: "🔎 Endemic vs threatened — two different ideas",
    speciesCautionLabel: "Watch out:",
    glossaryHead: "🔑 Key terms",
    glossaryHint: "Tap any term to read its meaning.",
    checkYourself: "Check yourself",
    revealHint: "Reveal hint",
    whySortHead: "Why sort living things at all?",
    whySortBody:
      "You just met dozens of organisms in the habitats above — classification is how biologists make sense of that variety. Animals and plants are sorted into smaller and smaller groups based on traits they share and traits that set them apart, so an unfamiliar organism can be identified quickly and consistently. Animals split first into invertebrates (no backbone) and vertebrates (with a backbone), and vertebrates split further into fish, amphibians, reptiles, birds and mammals. Plants split first into non-flowering and flowering plants, and flowering plants split further into monocotyledons and dicotyledons.",
    animalTreeHead: "Animal Kingdom — build the tree yourself",
    animalTreeIntro: "Start at the top and choose a branch to explore each group.",
    plantTreeHead: "Plant Kingdom",
    plantTreeIntro:
      "Plants are classified as non-flowering or flowering. Non-flowering plants reproduce with spores or cones and include mosses (non-vascular, no internal tubes to carry water), ferns and conifers (both vascular, with true roots, stems and leaves). Flowering plants produce flowers that develop into fruit containing seeds, and each seed's cotyledon count tells you which group it belongs to: one cotyledon means monocotyledon (fibrous roots, parallel leaf veins, e.g. paddy and maize), two cotyledons means dicotyledon (a tap root, net-like leaf veins, e.g. tomato and durian).",
    starMapHead: "⭐ Use a dichotomous key — Star Map",
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
    managementSection: "Pengurusan Biodiversiti yang Berkesan",
    animalSection: "1.2 Klasifikasi Organisma — Haiwan",
    plantSection: "1.2 Klasifikasi Organisma — Tumbuhan",
    sectionLabels: ["Biodiversiti", "Pengurusan", "Haiwan", "Tumbuhan", "Kekunci dikotomi"],
    biodiversityIntro:
      "Biodiversiti ialah kepelbagaian organisma di Bumi — mikroorganisma, haiwan dan tumbuhan — dan ia wujud kerana habitat serta iklim yang jauh berbeza, daripada gurun, kawasan kutub, tanah hinggalah laut. Organisma yang hidup dalam habitat berlainan mempunyai ciri-ciri berbeza yang membolehkan mereka menyesuaikan diri dan terus hidup secara berdikari di situ. Biodiversiti turut merangkumi kepelbagaian genetik: variasi dalam sesuatu spesies yang sama, disebabkan oleh perbezaan pada gen setiap organisma. Iklim khatulistiwa Malaysia yang panas dan lembap menjadikannya habitat yang sangat kaya dengan hidupan, itulah sebabnya Malaysia diiktiraf sebagai salah satu daripada 12 negara megabiodiversiti di dunia.",
    habitatsIntro:
      "Ketik satu habitat di bawah untuk melihat cara iklimnya membentuk organisma yang hidup di situ.",
    importanceIntro: "Enam sebab biodiversiti menyokong kehidupan harian — ketik untuk kembangkan.",
    keepingAliveIntro:
      "Penebangan hutan untuk balak dan pembangunan meletakkan biodiversiti dalam risiko. Malaysia menguruskannya melalui undang-undang, kawasan perlindungan, dan program pembiakan aktif.",
    legalHead: "⚖️ Perlindungan undang-undang",
    legalBody:
      "Akta Perlindungan Hidupan Liar 1972 mengharamkan pembunuhan atau perdagangan spesies endemik dan terancam.",
    habitatHead: "🏞️ Habitat terlindung",
    habitatBody:
      "Taman negara, taman laut, hutan simpan dan suaka hidupan liar memberi ruang kepada spesies untuk hidup tanpa gangguan.",
    recoveryHead: "🐢 Pemulihan aktif",
    recoveryBody:
      "Tapak semaian anak benih dan tempat penetasan telur penyu aktif membina semula populasi yang terancam kepupusan.",
    humanImpactHead: "⚠️ Kesan aktiviti manusia terhadap biodiversiti",
    humanImpactIntro: "Setiap aktiviti mencetuskan rantaian kesan — ikut anak panah.",
    speciesHead: "🔎 Endemik lwn. terancam — dua idea yang berbeza",
    speciesCautionLabel: "Awas:",
    glossaryHead: "🔑 Kata kunci",
    glossaryHint: "Ketik mana-mana istilah untuk membaca maksudnya.",
    checkYourself: "Semak diri",
    revealHint: "Dedahkan panduan",
    whySortHead: "Mengapa perlu mengelaskan hidupan?",
    whySortBody:
      "Anda baru sahaja bertemu berpuluh-puluh organisma dalam habitat di atas — klasifikasi ialah cara ahli biologi memahami kepelbagaian itu. Haiwan dan tumbuhan dikumpulkan kepada set yang lebih kecil berdasarkan ciri yang dikongsi dan ciri yang membezakan, supaya organisma yang tidak dikenali dapat dikenal pasti dengan cepat dan konsisten. Haiwan mula-mula dibahagikan kepada invertebrata (tiada tulang belakang) dan vertebrata (ada tulang belakang), dan vertebrata dibahagikan lagi kepada ikan, amfibia, reptilia, burung dan mamalia. Tumbuhan pula mula-mula dibahagikan kepada tumbuhan tidak berbunga dan tumbuhan berbunga, dan tumbuhan berbunga dibahagikan lagi kepada monokotiledon dan dikotiledon.",
    animalTreeHead: "Kerajaan Haiwan — bina pokok anda sendiri",
    animalTreeIntro: "Mula dari atas dan pilih cabang untuk meneroka setiap kumpulan.",
    plantTreeHead: "Kerajaan Tumbuhan",
    plantTreeIntro:
      "Tumbuhan diklasifikasikan sebagai tidak berbunga atau berbunga. Tumbuhan tidak berbunga membiak melalui spora atau kon, termasuk lumut (tidak berpembuluh, tiada saluran dalaman untuk mengangkut air) serta paku pakis dan konifer (kedua-duanya berpembuluh, mempunyai akar, batang dan daun yang sebenar). Tumbuhan berbunga menghasilkan bunga yang berkembang menjadi buah berisi biji benih, dan bilangan kotiledon pada biji benih menentukan kumpulannya: satu kotiledon bermaksud monokotiledon (akar serabut, daun berurat selari, contoh padi dan jagung), dua kotiledon bermaksud dikotiledon (akar tunjang, daun berurat jaring, contoh tomato dan durian).",
    starMapHead: "⭐ Guna kekunci dikotomi — Peta Bintang",
    starMapIntro:
      "Kekunci dikotomi mengelaskan organisma melalui satu siri kuplet — setiap kuplet menawarkan dua ciri berpasangan. Pilih ciri yang betul pada setiap langkah untuk mengecilkan langit kepada satu organisma sahaja.",
    chapterMapHead: "Peta Bab",
    reflectionHead: "Refleksi Kendiri",
    quizHead: "Kuiz Pantas",
    markRead: "📘 Tandakan Bab 1 Selesai",
    markedRead: "Selesai ditanda ✓",
  },
};

function KeywordGlossary({
  items,
  head,
  hint,
}: {
  items: { term: string; definition: string }[];
  head: string;
  hint: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : items[openIndex];

  return (
    <div className="science-knowledge-chips">
      <h4 className="font-display mb-1 text-sm font-bold text-foreground">{head}</h4>
      <p className="mb-2.5 text-[11.5px] text-muted-foreground">{hint}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <button
            key={item.term}
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              openIndex === i
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border bg-secondary/40 text-foreground hover:border-primary/50"
            }`}
          >
            {item.term}
          </button>
        ))}
      </div>
      {open && (
        <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5">
          <p className="font-display text-[13px] font-bold text-foreground">{open.term}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
            {open.definition}
          </p>
        </div>
      )}
    </div>
  );
}

function MiniQuizCard({
  item,
  lang,
  onCorrect,
}: {
  item: MiniQuizItem;
  lang: Lang;
  onCorrect: () => void;
}) {
  const [answered, setAnswered] = useState<number | boolean | null>(null);

  function answer(value: number | boolean, correct: boolean) {
    if (answered !== null) return;
    setAnswered(value);
    if (correct) onCorrect();
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

function Figure({ block, lang }: { block?: AnnotatedImageBlock; lang: Lang }) {
  if (!block) return null;
  const copy =
    lang === "bm"
      ? {
          enlarge: "Besarkan",
          close: "Tutup",
          hint: "Ketik mana-mana label pada rajah untuk melihat penerangannya.",
        }
      : {
          enlarge: "Enlarge",
          close: "Close",
          hint: "Tap any label on the diagram to see what it does.",
        };
  return (
    <AnnotatedImage
      src={block.src}
      alt={block.alt}
      size={block.size}
      aspect={block.aspect}
      caption={block.caption}
      legendLabel={block.legendLabel}
      annotationMode={block.annotationMode ?? "labels"}
      annotations={block.annotations}
      imageKey={block.imageKey}
      enlargeLabel={copy.enlarge}
      closeLabel={copy.close}
      hintLabel={copy.hint}
    />
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
  const rewarded = useRef(new Set<string>());
  const [starMapDone, setStarMapDone] = useState(false);
  const blogImageUrl = getNotesImageUrl(content.blogHighlight.imagePath);

  function awardOnce(key: string, amount: number) {
    if (rewarded.current.has(key)) return;
    rewarded.current.add(key);
    addXp(amount, "science");
  }

  function handleStarMapIdentify() {
    if (starMapDone) return;
    setStarMapDone(true);
    awardOnce("star-map", 10);
  }

  function handleReflectionComplete() {
    awardOnce("reflection", 10);
  }

  const sections: ScienceNotesSection[] = [
    {
      key: "biodiversity",
      eyebrow: "1.1",
      label: t.sectionLabels[0],
      title: t.section11,
      description: t.biodiversityIntro,
      content: (
        <div className="flex flex-col gap-5">
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
        </div>
      ),
    },
    {
      key: "management",
      eyebrow: "1.1",
      label: t.sectionLabels[1],
      title: t.managementSection,
      description: t.keepingAliveIntro,
      content: (
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="font-display mb-1 text-sm font-bold text-foreground">
              {t.humanImpactHead}
            </h4>
            <p className="mb-2.5 text-[12.5px] text-muted-foreground">{t.humanImpactIntro}</p>
            <div className="flex flex-col gap-2.5">
              {content.humanImpact.map((impact) => (
                <div
                  key={impact.activity}
                  className="rounded-xl border border-border bg-secondary/30 p-3"
                >
                  <p className="font-display text-[12.5px] font-bold text-foreground">
                    {impact.icon} {impact.activity}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    {impact.chain.map((step, i) => (
                      <span key={step} className="flex items-center gap-1.5">
                        {i > 0 && (
                          <span className="text-primary" aria-hidden="true">
                            →
                          </span>
                        )}
                        <span className="text-[11.5px] leading-snug text-muted-foreground">
                          {step}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="legal">
              <AccordionTrigger>{t.legalHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">
                {t.legalBody}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="habitat">
              <AccordionTrigger>{t.habitatHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">
                {t.habitatBody}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="recovery">
              <AccordionTrigger>{t.recoveryHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">
                {t.recoveryBody}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Tabs defaultValue={content.conservationMethods[0]?.id}>
            <TabsList>
              {content.conservationMethods.map((method) => (
                <TabsTrigger key={method.id} value={method.id}>
                  {method.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {content.conservationMethods.map((method) => (
              <TabsContent
                key={method.id}
                value={method.id}
                className="text-[13.5px] text-muted-foreground"
              >
                {method.description}
              </TabsContent>
            ))}
          </Tabs>
          <div>
            <h4 className="font-display mb-2 text-sm font-bold text-foreground">{t.speciesHead}</h4>
            <Tabs defaultValue={content.speciesConcepts[0]?.id}>
              <TabsList>
                {content.speciesConcepts.map((concept) => (
                  <TabsTrigger key={concept.id} value={concept.id}>
                    {concept.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {content.speciesConcepts.map((concept) => (
                <TabsContent key={concept.id} value={concept.id}>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {concept.definition}
                  </p>
                  <div className="mt-2.5">
                    <ChipRow items={concept.examples} tone="green" />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="mt-3 rounded-xl border border-nova-yellow/30 bg-nova-yellow/10 p-3">
              <p className="text-[12px] leading-relaxed text-nova-yellow">
                <b>{t.speciesCautionLabel}</b> {content.speciesCaution}
              </p>
            </div>
          </div>
          <CheckYourself
            heading={`${t.checkYourself} — 1.1`}
            items={content.checkYourself11}
            revealLabel={t.revealHint}
          />
        </div>
      ),
    },
    {
      key: "animals",
      eyebrow: "1.2",
      label: t.sectionLabels[2],
      title: t.animalSection,
      content: (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {t.whySortHead}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.whySortBody}</p>
          </div>
          <Figure block={content.classificationImages?.animalOverview} lang={lang} />
          <div>
            <h3 className="font-display mb-1 text-base font-bold text-foreground">
              {t.animalTreeHead}
            </h3>
            <p className="mb-3 text-[13px] text-muted-foreground">{t.animalTreeIntro}</p>
            <ClassificationTree rootLabel="🐾" branches={content.animalBranches} />
          </div>
          <Figure block={content.classificationImages?.vertebrateGroups} lang={lang} />
          <Figure block={content.classificationImages?.invertebrateGroups} lang={lang} />
        </div>
      ),
    },
    {
      key: "plants",
      eyebrow: "1.2",
      label: t.sectionLabels[3],
      title: t.plantSection,
      content: (
        <div>
          <h3 className="font-display mb-1 text-base font-bold text-foreground">
            {t.plantTreeHead}
          </h3>
          <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
            {t.plantTreeIntro}
          </p>
          <div className="mb-4">
            <Figure block={content.classificationImages?.plantGroups} lang={lang} />
          </div>
          <ClassificationTree
            branches={content.plantBranches}
            compareColumns={content.cotyledonCompare}
          />
        </div>
      ),
    },
    {
      key: "dichotomous-key",
      eyebrow: "1.2",
      label: t.sectionLabels[4],
      title: t.starMapHead,
      description: t.starMapIntro,
      content: (
        <div className="flex flex-col gap-5">
          <Figure block={content.classificationImages?.keyOrganismSet} lang={lang} />
          <DichotomousStarMap
            organisms={content.dichotomousOrganisms}
            root={content.dichotomousKey}
            onIdentify={handleStarMapIdentify}
          />
          <CheckYourself
            heading={`${t.checkYourself} — 1.2`}
            items={content.checkYourself12}
            revealLabel={t.revealHint}
          />
          <div>
            <h2 className="font-display mb-3 text-xl font-bold text-foreground">
              {t.reflectionHead}
            </h2>
            <SelfReflectionChecklist
              items={content.reflectionItems}
              storageKey={storageKey ? `${storageKey}:sci-f2-c1-reflection` : undefined}
              onAllComplete={handleReflectionComplete}
            />
          </div>
          <div>
            <h2 className="font-display mb-3 text-xl font-bold text-foreground">{t.quizHead}</h2>
            <div className="flex flex-col gap-3.5">
              {content.miniQuiz.map((item, i) => (
                <MiniQuizCard
                  key={i}
                  item={item}
                  lang={lang}
                  onCorrect={() => awardOnce(`mini-quiz-${i}`, 15)}
                />
              ))}
            </div>
          </div>
          {onMarkRead && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isRead
                    ? "cursor-default bg-emerald-500/20 text-emerald-200"
                    : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                }`}
              >
                {isRead ? t.markedRead : t.markRead}
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <ScienceSectionedNotesShell
      id={id}
      lang={lang}
      storageKey={storageKey}
      intro={
        <div className="mb-6 flex flex-col gap-5">
          <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-4">
            {blogImageUrl && (
              <img
                src={blogImageUrl}
                alt={content.blogHighlight.title}
                className="h-[90px] w-[120px] shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
            )}
            <div className="min-w-0">
              <h3 className="font-display mb-1 text-sm font-bold text-primary">
                {content.blogHighlight.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {content.blogHighlight.body}
              </p>
            </div>
          </div>
          <KeywordGlossary items={content.keywords} head={t.glossaryHead} hint={t.glossaryHint} />
        </div>
      }
      sections={sections}
    />
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
            <AccordionContent className="text-[13px] text-muted-foreground">
              {item.hint}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
