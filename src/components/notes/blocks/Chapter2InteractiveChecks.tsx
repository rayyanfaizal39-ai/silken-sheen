import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { MatchingPairs } from "./MatchingPairs";
import {
  chapter2InteractionCoverage,
  getChapter2InteractionData,
  type Chapter2InteractionKind,
  type LocalizedCategoryItem,
} from "@/content/form1/science/chapter-2/chapter2-interactives";
import type { Chapter2Lang } from "@/content/form1/science/chapter-2/chapter2-canonical";

const COPY = {
  en: {
    check: "Check",
    reset: "Reset",
    correct: "Correct. Continue learning.",
    tryAgain: "Not yet. Use the feedback and try again.",
    choose: "Choose a category for each item.",
    selectAll: "Select all four requirements, then check.",
    moveUp: "Move up",
    moveDown: "Move down",
    orderCorrect: "Both organisation pathways are in the correct order.",
    orderWrong: "One or both pathways need another look.",
  },
  bm: {
    check: "Semak",
    reset: "Set semula",
    correct: "Betul. Teruskan pembelajaran.",
    tryAgain: "Belum tepat. Gunakan maklum balas dan cuba lagi.",
    choose: "Pilih satu kategori bagi setiap item.",
    selectAll: "Pilih keempat-empat keperluan, kemudian semak.",
    moveUp: "Alih ke atas",
    moveDown: "Alih ke bawah",
    orderCorrect: "Kedua-dua laluan organisasi berada dalam urutan yang betul.",
    orderWrong: "Satu atau kedua-dua laluan perlu disemak semula.",
  },
} as const;

const TITLES: Record<Chapter2InteractionKind, { en: string; bm: string }> = {
  "cell-organelle": {
    en: "Identify cell structures and functions",
    bm: "Kenal pasti struktur dan fungsi sel",
  },
  "cell-sort": {
    en: "Sort animal, shared and plant features",
    bm: "Kelaskan ciri haiwan, kedua-dua dan tumbuhan",
  },
  "organism-sort": {
    en: "Classify unicellular and multicellular organisms",
    bm: "Kelaskan organisma unisel dan multisel",
  },
  "specialised-cell": {
    en: "Match specialised cells to their adaptations",
    bm: "Padankan sel khusus dengan penyesuaiannya",
  },
  "organisation-order": {
    en: "Order animal and plant organisation",
    bm: "Susun organisasi haiwan dan tumbuhan",
  },
  "respiration-equation": { en: "Check the respiration equation", bm: "Semak persamaan respirasi" },
  "photosynthesis-requirements": {
    en: "Check the requirements for photosynthesis",
    bm: "Semak keperluan fotosintesis",
  },
  "starch-test": { en: "Check the starch-test evidence", bm: "Semak bukti ujian kanji" },
  "process-sort": {
    en: "Sort respiration and photosynthesis",
    bm: "Kelaskan respirasi dan fotosintesis",
  },
  "complementary-process": {
    en: "Connect the complementary processes",
    bm: "Hubungkan proses yang saling melengkapi",
  },
};

function InteractionShell({
  kind,
  lang,
  children,
}: {
  kind: Chapter2InteractionKind;
  lang: Chapter2Lang;
  children: ReactNode;
}) {
  return (
    <section
      className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4 sm:p-5"
      aria-label={TITLES[kind][lang]}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-display text-sm font-bold text-foreground">{TITLES[kind][lang]}</h4>
        <span className="rounded-full border border-primary/30 bg-background/50 px-2.5 py-1 text-[11px] font-semibold text-primary">
          SP {chapter2InteractionCoverage[kind].join(", ")}
        </span>
      </div>
      {children}
    </section>
  );
}

function Result({ value, lang }: { value: boolean | null; lang: Chapter2Lang }) {
  if (value === null) return <span />;
  return (
    <p
      className={`flex items-start gap-1.5 text-xs font-medium ${value ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}
      aria-live="polite"
    >
      {value ? (
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}
      {value ? COPY[lang].correct : COPY[lang].tryAgain}
    </p>
  );
}

function ChoiceCheck({
  prompt,
  options,
  answerIndex,
  lang,
}: {
  prompt: string;
  options: string[];
  answerIndex: number;
  lang: Chapter2Lang;
}) {
  const [answer, setAnswer] = useState<number | null>(null);
  const correct = answer === null ? null : answer === answerIndex;
  return (
    <div>
      <p className="mb-3 text-[13px] font-semibold leading-relaxed text-foreground">{prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => setAnswer(index)}
            aria-pressed={answer === index}
            className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${answer === index ? (correct ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200" : "border-red-500 bg-red-500/15 text-red-800 dark:text-red-200") : "border-border bg-card/70 text-foreground hover:border-primary/50"}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-11">
        <Result value={correct} lang={lang} />
      </div>
    </div>
  );
}

function CategorySort({
  items,
  categories,
  lang,
}: {
  items: LocalizedCategoryItem[];
  categories: Array<{ id: string; label: string }>;
  lang: Chapter2Lang;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const complete = items.every((item) => answers[item.id]);
  const correct = checked ? items.every((item) => answers[item.id] === item.category) : null;
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{COPY[lang].choose}</p>
      <div className="space-y-2">
        {items.map((item) => {
          const wrong = checked && answers[item.id] !== item.category;
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-3 ${wrong ? "border-red-500/60 bg-red-500/10" : "border-border bg-card/70"}`}
            >
              <p className="mb-2 text-[13px] font-medium text-foreground">{item.label}</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={item.label}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setAnswers((current) => ({ ...current, [item.id]: category.id }));
                      setChecked(false);
                    }}
                    aria-pressed={answers[item.id] === category.id}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${answers[item.id] === category.id ? "border-primary bg-primary/15 text-primary" : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <Result value={correct} lang={lang} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setChecked(false);
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {COPY[lang].reset}
          </button>
          <button
            type="button"
            disabled={!complete}
            onClick={() => setChecked(true)}
            className="min-h-11 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {COPY[lang].check}
          </button>
        </div>
      </div>
    </div>
  );
}

function MultiSelectCheck({
  options,
  answerIndexes,
  lang,
}: {
  options: string[];
  answerIndexes: number[];
  lang: Chapter2Lang;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const correct = checked
    ? selected.length === answerIndexes.length &&
      answerIndexes.every((index) => selected.includes(index))
    : null;
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{COPY[lang].selectAll}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            aria-pressed={selected.includes(index)}
            onClick={() => {
              setSelected((current) =>
                current.includes(index)
                  ? current.filter((value) => value !== index)
                  : [...current, index],
              );
              setChecked(false);
            }}
            className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected.includes(index) ? "border-primary bg-primary/15 text-primary" : "border-border bg-card/70 text-foreground hover:border-primary/50"}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-3 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <Result value={correct} lang={lang} />
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={() => setChecked(true)}
          className="min-h-11 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {COPY[lang].check}
        </button>
      </div>
    </div>
  );
}

interface OrderItem {
  id: string;
  label: string;
  order: number;
}

function OrderColumn({
  title,
  source,
  lang,
  onResult,
}: {
  title: string;
  source: OrderItem[];
  lang: Chapter2Lang;
  onResult: (correct: boolean | null) => void;
}) {
  const initial = useMemo(() => [source[1], source[0], source[3], source[2], source[4]], [source]);
  const [items, setItems] = useState(initial);
  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    onResult(null);
  }
  return (
    <div>
      <h5 className="mb-2 text-xs font-bold text-foreground">{title}</h5>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card/70 p-2"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 text-[13px] font-medium text-foreground">
              {item.label}
            </span>
            <button
              type="button"
              disabled={index === 0}
              onClick={() => move(index, -1)}
              aria-label={`${COPY[lang].moveUp}: ${item.label}`}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-primary disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={index === items.length - 1}
              onClick={() => move(index, 1)}
              aria-label={`${COPY[lang].moveDown}: ${item.label}`}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-primary disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onResult(items.every((item, index) => item.order === index))}
        className="mt-3 min-h-11 w-full rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {COPY[lang].check} — {title}
      </button>
    </div>
  );
}

function OrganisationOrder({
  lang,
  sequences,
}: {
  lang: Chapter2Lang;
  sequences: Array<{ id: string; title: string; items: OrderItem[] }>;
}) {
  const [results, setResults] = useState<Record<string, boolean | null>>({
    animal: null,
    plant: null,
  });
  const combined =
    results.animal === null || results.plant === null ? null : results.animal && results.plant;
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {sequences.map((sequence) => (
          <OrderColumn
            key={sequence.id}
            title={sequence.title}
            source={sequence.items}
            lang={lang}
            onResult={(correct) =>
              setResults((current) => ({ ...current, [sequence.id]: correct }))
            }
          />
        ))}
      </div>
      <p
        className={`mt-3 min-h-5 text-xs font-medium ${combined === true ? "text-emerald-700 dark:text-emerald-300" : combined === false ? "text-red-700 dark:text-red-300" : "text-muted-foreground"}`}
        aria-live="polite"
      >
        {combined === true
          ? COPY[lang].orderCorrect
          : combined === false
            ? COPY[lang].orderWrong
            : ""}
      </p>
    </div>
  );
}

export function Chapter2InteractiveCheck({
  kind,
  lang,
}: {
  kind: Chapter2InteractionKind;
  lang: Chapter2Lang;
}) {
  const data = getChapter2InteractionData(lang);
  const instruction =
    lang === "bm"
      ? "Pilih satu item di sebelah kiri, kemudian padankan dengan fungsinya."
      : "Choose an item on the left, then match it to its function.";

  if (kind === "cell-organelle")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <MatchingPairs
          pairs={data.organellePairs}
          instruction={instruction}
          resetLabel={COPY[lang].reset}
        />
      </InteractionShell>
    );
  if (kind === "cell-sort")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <CategorySort
          items={data.cellSortItems}
          categories={
            lang === "bm"
              ? [
                  { id: "animal", label: "Sel haiwan" },
                  { id: "both", label: "Kedua-dua" },
                  { id: "plant", label: "Sel tumbuhan" },
                ]
              : [
                  { id: "animal", label: "Animal cell" },
                  { id: "both", label: "Both" },
                  { id: "plant", label: "Plant cell" },
                ]
          }
          lang={lang}
        />
      </InteractionShell>
    );
  if (kind === "organism-sort")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <CategorySort
          items={data.organismSortItems}
          categories={
            lang === "bm"
              ? [
                  { id: "unicellular", label: "Unisel" },
                  { id: "multicellular", label: "Multisel" },
                ]
              : [
                  { id: "unicellular", label: "Unicellular" },
                  { id: "multicellular", label: "Multicellular" },
                ]
          }
          lang={lang}
        />
      </InteractionShell>
    );
  if (kind === "specialised-cell")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <MatchingPairs
          pairs={data.specialisedPairs}
          instruction={instruction}
          resetLabel={COPY[lang].reset}
        />
      </InteractionShell>
    );
  if (kind === "organisation-order")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <OrganisationOrder lang={lang} sequences={data.organisationSequences} />
      </InteractionShell>
    );
  if (kind === "respiration-equation")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <ChoiceCheck
          prompt={
            lang === "bm"
              ? "Persamaan perkataan yang manakah betul?"
              : "Which word equation is correct?"
          }
          options={data.respirationEquation.options}
          answerIndex={data.respirationEquation.answerIndex}
          lang={lang}
        />
      </InteractionShell>
    );
  if (kind === "photosynthesis-requirements")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <MultiSelectCheck
          options={data.photosynthesisRequirements.options}
          answerIndexes={data.photosynthesisRequirements.answerIndexes}
          lang={lang}
        />
      </InteractionShell>
    );
  if (kind === "starch-test")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <div className="space-y-5">
          {data.starchChecks.map((check) => (
            <ChoiceCheck
              key={check.id}
              prompt={check.prompt}
              options={check.options}
              answerIndex={check.answerIndex}
              lang={lang}
            />
          ))}
        </div>
      </InteractionShell>
    );
  if (kind === "process-sort")
    return (
      <InteractionShell kind={kind} lang={lang}>
        <CategorySort
          items={data.processSortItems}
          categories={
            lang === "bm"
              ? [
                  { id: "respiration", label: "Respirasi sel" },
                  { id: "photosynthesis", label: "Fotosintesis" },
                ]
              : [
                  { id: "respiration", label: "Cell respiration" },
                  { id: "photosynthesis", label: "Photosynthesis" },
                ]
          }
          lang={lang}
        />
      </InteractionShell>
    );
  return (
    <InteractionShell kind={kind} lang={lang}>
      <CategorySort
        items={data.complementaryItems}
        categories={
          lang === "bm"
            ? [
                { id: "to-photosynthesis", label: "Digunakan dalam fotosintesis" },
                { id: "to-respiration", label: "Digunakan dalam respirasi" },
              ]
            : [
                { id: "to-photosynthesis", label: "Used in photosynthesis" },
                { id: "to-respiration", label: "Used in respiration" },
              ]
        }
        lang={lang}
      />
    </InteractionShell>
  );
}
