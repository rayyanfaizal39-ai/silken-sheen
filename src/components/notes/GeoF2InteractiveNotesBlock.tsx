import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ChipRow } from "@/components/notes/blocks/ChipRow";
import { SelfReflectionChecklist } from "@/components/notes/blocks/SelfReflectionChecklist";
import { GeoInteractiveSectionBody } from "@/components/notes/blocks/GeoInteractiveSectionBody";
import type { GeoF2InteractiveContent, GeoMiniQuizItem } from "@/content/form2/geography/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";
import { useProgress } from "@/hooks/use-progress";

function MiniQuiz({ item }: { item: GeoMiniQuizItem }) {
  const [answer, setAnswer] = useState<number | boolean | null>(null);
  const { addXp } = useProgress();
  const correct =
    answer !== null &&
    (item.type === "true-false" ? answer === item.answer : answer === item.answerIndex);

  function respond(value: number | boolean) {
    if (answer !== null) return;
    setAnswer(value);
    const isCorrect = item.type === "true-false" ? value === item.answer : value === item.answerIndex;
    if (isCorrect) addXp(15, "geography");
  }

  const options = item.type === "true-false" ? ["Betul", "Salah"] : item.options;

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold leading-relaxed text-foreground">{item.question}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => {
          const value = item.type === "true-false" ? index === 0 : index;
          const chosen = answer === value;
          return (
            <button
              key={String(option)}
              type="button"
              disabled={answer !== null}
              onClick={() => respond(value)}
              className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                chosen
                  ? correct
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                    : "border-red-400 bg-red-500/15 text-red-200"
                  : "border-border bg-secondary/40 text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground" aria-live="polite">
          {item.explanation}
        </p>
      )}
    </div>
  );
}

export function GeoF2InteractiveNotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: GeoF2InteractiveContent;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const { addXp } = useProgress();
  const rewarded = useRef(new Set<string>());
  const imageUrl = getNotesImageUrl(content.blogHighlight.imagePath);
  const awardOnce = (key: string, amount: number) => {
    if (rewarded.current.has(key)) return;
    rewarded.current.add(key);
    addXp(amount, "geography");
  };

  return (
    <section id={id} className="mt-8 flex min-w-0 flex-col gap-9 animate-fade-up">
      <div className="grid gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-4 sm:grid-cols-[140px_1fr] sm:items-center">
        {imageUrl && <img src={imageUrl} alt={content.blogHighlight.title} className="h-36 w-full rounded-xl object-cover sm:h-24" loading="lazy" />}
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold text-primary">{content.blogHighlight.title}</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{content.blogHighlight.body}</p>
        </div>
      </div>
      <ChipRow items={content.keywords} />

      {content.sections.map((section) => (
        <div key={section.number} className="flex min-w-0 flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-lg border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{section.number}</span>
            <h2 className="font-display text-xl font-bold leading-tight text-foreground">{section.title}</h2>
          </div>
          <GeoInteractiveSectionBody section={section} awardOnce={awardOnce} />
        </div>
      ))}

      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">Refleksi Kendiri</h2>
        <SelfReflectionChecklist items={content.reflectionItems} storageKey={storageKey ? `${storageKey}:geo-f2-c${content.chapter}-reflection` : undefined} onAllComplete={() => awardOnce("reflection", 10)} />
      </div>
      <div>
        <h2 className="font-display mb-3 text-xl font-bold text-foreground">Kuiz Pantas</h2>
        <div className="flex flex-col gap-3">{content.miniQuiz.map((item, i) => <MiniQuiz key={i} item={item} />)}</div>
      </div>
      {onMarkRead && (
        <div className="flex justify-center">
          <button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isRead ? "bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105 active:scale-[0.98]"}`}>
            <CheckCircle2 className="h-4 w-4" /> {isRead ? "Selesai ditanda" : `Tandakan Bab ${content.chapter} Selesai`}
          </button>
        </div>
      )}
    </section>
  );
}
