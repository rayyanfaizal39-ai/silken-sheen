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
import { InteractiveFigureCard } from "@/components/notes/blocks/InteractiveFigureCard";
import { figureCopy } from "@/components/notes/blocks/figure-copy";
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
import {
  ScienceEmphasis,
  ScienceRemember,
  ScienceQuickExplanation,
} from "@/components/notes/blocks/ScienceEmphasis";

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
    whatIsBiodiversityHead: string;
    biodiversityDefinition: string;
    megabiodiversityHead: string;
    /** 💡 Quick Explanation — the textbook's own "Did you know" aside about Malaysia's megabiodiversity status. */
    megabiodiversityQuickExplanation: string;
    whyBiodiversityHead: string;
    whyBiodiversityBody: string;
    habitatsIntro: string;
    importanceHead: string;
    importanceIntro: string;
    keepingAliveIntro: string;
    legalHead: string;
    legalBody: string;
    /** 🧠 Remember — the textbook's core rule on legal protection for endemic/threatened species. */
    actRemember: string;
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
    thermoHead: string;
    poikilothermDef: string;
    homeothermDef: string;
    animalTreeHead: string;
    animalTreeIntro: string;
    plantTreeHead: string;
    plantTreeIntro: string;
    vascularHead: string;
    nonVascularDef: string;
    vascularDef: string;
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
    managementSection: "Methods to Preserve and Conserve Biodiversity",
    animalSection: "1.2 Classification of Organisms — Animals",
    plantSection: "1.2 Classification of Organisms — Plants",
    sectionLabels: ["Biodiversity", "Management", "Animals", "Plants", "Dichotomous key"],
    biodiversityIntro:
      "Biodiversity is the variety of living things on Earth. Here's what it means, where Malaysia fits in, and why it matters.",
    whatIsBiodiversityHead: "What is Biodiversity?",
    biodiversityDefinition:
      "The diversity of organisms, whether microorganisms, animals or plants, is known as biodiversity.",
    megabiodiversityHead: "Malaysia: A Megabiodiversity Country",
    megabiodiversityQuickExplanation:
      "Malaysia is one of the **12 megabiodiversity countries** in the world — its hot, humid equatorial climate makes it an especially suitable habitat for many kinds of organisms.",
    whyBiodiversityHead: "Why Biodiversity Exists",
    whyBiodiversityBody:
      "Biodiversity exists because habitats and climates differ so much — from deserts to polar regions to soil to the sea. Organisms in each habitat have evolved different characteristics that let them survive there.",
    habitatsIntro:
      "Tap a habitat below to see how its climate shapes the organisms that live there.",
    importanceHead: "Importance of Biodiversity",
    importanceIntro: "Six reasons biodiversity underpins everyday life — tap each to expand.",
    keepingAliveIntro:
      "Deforestation for timber and development puts biodiversity at risk. Malaysia manages this through law, protected space, and active breeding programmes.",
    legalHead: "⚖️ Legal protection",
    legalBody:
      "The Wildlife Protection Act 1972 bans the killing or trade of endemic and endangered species.",
    actRemember:
      "The **Wildlife Protection Act 1972** bans the killing or trade of endemic and threatened species in Malaysia.",
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
    whySortHead: "Why classify living things?",
    whySortBody:
      "Organisms are classified into groups based on characteristics they share and characteristics that set them apart, so they are easier to identify and study. Organisms → Animals → Plants — animals split into invertebrates and vertebrates, and plants split into non-flowering and flowering plants.",
    thermoHead: "🌡️ Poikilotherm vs Homeotherm",
    poikilothermDef:
      "**Poikilotherm**: An organism whose body temperature changes according to the surrounding temperature.",
    homeothermDef:
      "**Homeotherm**: An animal whose body temperature remains constant and is not influenced by the surrounding temperature.",
    animalTreeHead: "Animal Kingdom — build the tree yourself",
    animalTreeIntro: "Start at the top and choose a branch to explore each group.",
    plantTreeHead: "Plant Kingdom",
    plantTreeIntro:
      "Plants are classified as non-flowering or flowering plants. Tap a branch below to explore each group.",
    vascularHead: "🌱 Vascular vs Non-vascular Plants",
    nonVascularDef: "**Non-vascular plants**: Simple and small plants without a vascular system.",
    vascularDef:
      "**Vascular plants**: Plants with a vascular system that transports water and food throughout the plant. They also have true roots, stems and leaves.",
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
    managementSection: "Kaedah Memelihara dan Memulihara Biodiversiti",
    animalSection: "1.2 Klasifikasi Organisma — Haiwan",
    plantSection: "1.2 Klasifikasi Organisma — Tumbuhan",
    sectionLabels: ["Biodiversiti", "Pengurusan", "Haiwan", "Tumbuhan", "Kekunci dikotomi"],
    biodiversityIntro:
      "Biodiversiti ialah kepelbagaian hidupan di Bumi. Berikut ialah maksudnya, kedudukan Malaysia, dan sebab ia penting.",
    whatIsBiodiversityHead: "Apakah Biodiversiti?",
    biodiversityDefinition:
      "Kepelbagaian organisma sama ada mikroorganisma, haiwan atau tumbuhan dikenali sebagai biodiversiti.",
    megabiodiversityHead: "Malaysia: Negara Mega Biodiversiti",
    megabiodiversityQuickExplanation:
      "Malaysia merupakan salah satu daripada **12 negara mega biodiversiti** di dunia — iklim khatulistiwa yang panas dan lembap menjadikannya habitat yang sangat sesuai bagi pelbagai jenis organisma.",
    whyBiodiversityHead: "Bagaimanakah Biodiversiti Wujud?",
    whyBiodiversityBody:
      "Biodiversiti wujud kerana habitat dan iklim yang jauh berbeza — daripada gurun, kawasan kutub, tanah hinggalah laut. Organisma dalam setiap habitat mempunyai ciri berbeza yang membolehkan mereka terus hidup di situ.",
    habitatsIntro:
      "Ketik satu habitat di bawah untuk melihat cara iklimnya membentuk organisma yang hidup di situ.",
    importanceHead: "Kepentingan Biodiversiti",
    importanceIntro: "Enam sebab biodiversiti menyokong kehidupan harian — ketik untuk kembangkan.",
    keepingAliveIntro:
      "Penebangan hutan untuk balak dan pembangunan meletakkan biodiversiti dalam risiko. Malaysia menguruskannya melalui undang-undang, kawasan perlindungan, dan program pembiakan aktif.",
    legalHead: "⚖️ Perlindungan undang-undang",
    legalBody:
      "Akta Perlindungan Hidupan Liar 1972 mengharamkan pembunuhan atau perdagangan spesies endemik dan terancam.",
    actRemember:
      "**Akta Perlindungan Hidupan Liar 1972** mengharamkan pembunuhan atau perdagangan spesies endemik dan terancam di Malaysia.",
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
      "Organisma dikelaskan kepada kumpulan berdasarkan ciri yang dikongsi dan ciri yang membezakan, supaya lebih mudah dikenal pasti dan dikaji. Organisma → Haiwan → Tumbuhan — haiwan dibahagikan kepada invertebrata dan vertebrata, manakala tumbuhan dibahagikan kepada tumbuhan tidak berbunga dan tumbuhan berbunga.",
    thermoHead: "🌡️ Poikiloterma lwn Homoioterma",
    poikilothermDef:
      "**Poikiloterma**: Organisma yang mempunyai suhu badan yang berubah-ubah mengikut suhu persekitaran.",
    homeothermDef:
      "**Homoioterma**: Haiwan yang mempunyai suhu badan yang malar dan bebas daripada pengaruh suhu persekitaran.",
    animalTreeHead: "Kerajaan Haiwan — bina pokok anda sendiri",
    animalTreeIntro: "Mula dari atas dan pilih cabang untuk meneroka setiap kumpulan.",
    plantTreeHead: "Kerajaan Tumbuhan",
    plantTreeIntro:
      "Tumbuhan diklasifikasikan sebagai tidak berbunga atau berbunga. Ketik cabang di bawah untuk meneroka setiap kumpulan.",
    vascularHead: "🌱 Tumbuhan Vaskular lwn Tidak Vaskular",
    nonVascularDef:
      "**Tumbuhan tidak vaskular**: Tumbuhan ringkas dan kecil yang tidak mempunyai sistem vaskular (tidak berpembuluh).",
    vascularDef:
      "**Tumbuhan vaskular**: Tumbuhan yang mempunyai sistem vaskular (berpembuluh) untuk mengangkut air dan makanan ke seluruh tumbuhan. Tumbuhan ini juga mempunyai akar, batang dan daun sebenar.",
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

/** A compact "Science Info" callout pairing two contrasting definitions — e.g. poikilotherm vs
 *  homeotherm, or vascular vs non-vascular — so a term is explained before it's used elsewhere. */
function ScienceInfoPair({
  head,
  first,
  second,
}: {
  head: string;
  first: string;
  second: string;
}) {
  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 p-3.5">
      <p className="font-display mb-2 text-[13px] font-bold text-foreground">{head}</p>
      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
        <ScienceEmphasis text={first} />
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
        <ScienceEmphasis text={second} />
      </p>
    </div>
  );
}

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
            <ScienceEmphasis text={open.definition} />
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
  const copy = figureCopy(lang);
  const image = {
    src: block.src,
    alt: block.alt,
    size: block.size,
    aspect: block.aspect,
    caption: block.caption,
    legendLabel: block.legendLabel,
    annotationMode: block.annotationMode ?? ("labels" as const),
    imageKey: block.imageKey,
  };

  // A figure whose labels explain something is interactive, and says so. One
  // with nothing to reveal stays a plain bounded image with its enlarge control.
  const interactive = block.annotations.some((annotation) => annotation.note);
  if (!interactive) {
    return (
      <AnnotatedImage
        {...image}
        annotations={block.annotations}
        enlargeLabel={copy.enlarge}
        closeLabel={copy.close}
        hintLabel={copy.prompt}
      />
    );
  }

  return (
    <InteractiveFigureCard
      lang={lang}
      concepts={block.annotations}
      showControls={false}
      image={image}
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
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {t.whatIsBiodiversityHead}
            </h3>
            <ScienceRemember lang={lang} text={t.biodiversityDefinition} />
          </div>
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {t.megabiodiversityHead}
            </h3>
            <ScienceQuickExplanation lang={lang} text={t.megabiodiversityQuickExplanation} />
          </div>
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {t.whyBiodiversityHead}
            </h3>
            <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">
              {t.whyBiodiversityBody}
            </p>
            <p className="mb-3 text-[13px] text-muted-foreground">{t.habitatsIntro}</p>
            <FlipCardGrid items={content.habitats} />
          </div>
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-foreground">
              {t.importanceHead}
            </h3>
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
                <ScienceEmphasis text={t.legalBody} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="habitat">
              <AccordionTrigger>{t.habitatHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">
                <ScienceEmphasis text={t.habitatBody} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="recovery">
              <AccordionTrigger>{t.recoveryHead}</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">
                <ScienceEmphasis text={t.recoveryBody} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ScienceRemember lang={lang} text={t.actRemember} />
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
                <ScienceEmphasis text={method.description} />
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
                    <ScienceEmphasis text={concept.definition} />
                  </p>
                  <div className="mt-2.5">
                    <ChipRow items={concept.examples} tone="green" />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="mt-3 rounded-xl border border-nova-yellow/30 bg-nova-yellow/10 p-3">
              <p className="text-[12px] leading-relaxed text-nova-yellow">
                <b>{t.speciesCautionLabel}</b> <ScienceEmphasis text={content.speciesCaution} />
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <ScienceEmphasis text={t.whySortBody} />
            </p>
          </div>
          <Figure block={content.classificationImages?.animalOverview} lang={lang} />
          <ScienceInfoPair
            head={t.thermoHead}
            first={t.poikilothermDef}
            second={t.homeothermDef}
          />
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
            <ScienceEmphasis text={t.plantTreeIntro} />
          </p>
          <div className="mb-4">
            <Figure block={content.classificationImages?.plantGroups} lang={lang} />
          </div>
          <div className="mb-4">
            <ScienceInfoPair head={t.vascularHead} first={t.nonVascularDef} second={t.vascularDef} />
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
