import { useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  Lightbulb,
  MessageCircle,
  Star,
  Target,
  XCircle,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BM_FORM2_GRAMMAR_TOPICS,
  type GrammarQuiz,
  type GrammarTopic,
} from "@/data/bm-form2-sistem-bahasa";

function SectionTitle({ icon, children, color }: { icon: React.ReactNode; children: React.ReactNode; color: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span style={{ color }}>{icon}</span>
      <h3 className="font-display text-sm font-bold text-white">{children}</h3>
    </div>
  );
}

function InfoBox({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: `${color}30`, background: `${color}0c` }}>
      {children}
    </div>
  );
}

function TypeCards({ topic, color }: { topic: GrammarTopic; color: string }) {
  return (
    <div>
      <SectionTitle icon={<BookOpen className="h-4 w-4" />} color={color}>📖 Jenis</SectionTitle>
      <Accordion type="single" collapsible className="space-y-2">
        {topic.types.map((type, index) => (
          <AccordionItem
            key={type.name}
            value={`${topic.id}-type-${index}`}
            className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/10"
          >
            <AccordionTrigger className="min-h-12 px-4 py-3 text-left hover:no-underline">
              <span className="font-semibold text-white/85">{type.name}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <TypeDetail label="Definisi" text={type.definition} color={color} />
                <TypeDetail label="Cara penggunaan" text={type.usage} color="#60A5FA" />
                <TypeDetail label="Contoh" text={type.examples.join(" · ")} color="#34D399" />
                <TypeDetail label="Nota penting" text={type.note} color="#FBBF24" />
                <div className="sm:col-span-2">
                  <TypeDetail label="Kesalahan lazim" text={type.mistake} color="#FB7185" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function TypeDetail({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
      <p className="mb-1 text-[10px] font-black tracking-wide" style={{ color }}>{label}</p>
      <p className="text-xs leading-5 text-white/65">{text}</p>
    </div>
  );
}

function QuizQuestion({ quiz, number, color }: { quiz: GrammarQuiz; number: number; color: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
      <p className="mb-3 text-sm font-semibold leading-6 text-white/85">{number}. {quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((option, index) => {
          const correct = index === quiz.answer;
          const chosen = selected === index;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(index)}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-xs transition-colors"
              style={answered && correct
                ? { borderColor: "#34D39970", background: "#34D39914", color: "#A7F3D0" }
                : answered && chosen
                  ? { borderColor: "#FB718570", background: "#FB718514", color: "#FECDD3" }
                  : { borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", color: "rgba(255,255,255,0.65)" }}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                style={{ background: `${color}18`, color }}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className="mt-3 flex items-start gap-2 rounded-xl border p-3"
          style={selected === quiz.answer
            ? { borderColor: "#34D39935", background: "#34D3990c" }
            : { borderColor: "#FB718535", background: "#FB71850c" }}
          role="status"
        >
          {selected === quiz.answer
            ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />}
          <p className="text-xs leading-5 text-white/65">
            <span className="font-bold text-white">Jawapan: {String.fromCharCode(65 + quiz.answer)}.</span>{" "}
            {quiz.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function TopicContent({ topic, color }: { topic: GrammarTopic; color: string }) {
  return (
    <div className="space-y-5">
      <InfoBox color={color}>
        <SectionTitle icon={<Target className="h-4 w-4" />} color={color}>🎯 Apa itu?</SectionTitle>
        <p className="text-sm leading-6 text-white/75">{topic.what}</p>
      </InfoBox>

      <TypeCards topic={topic} color={color} />

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoBox color="#A78BFA">
          <SectionTitle icon={<Lightbulb className="h-4 w-4" />} color="#C4B5FD">💡 Cara Ingat</SectionTitle>
          <p className="text-sm leading-6 text-white/70">{topic.memory}</p>
        </InfoBox>
        <InfoBox color="#34D399">
          <SectionTitle icon={<BookOpen className="h-4 w-4" />} color="#6EE7B7">📝 Contoh</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {topic.examples.slice(0, 5).map((example) => (
              <span key={example} className="rounded-lg border border-emerald-400/15 bg-emerald-400/8 px-2.5 py-1.5 text-xs text-emerald-100/80">{example}</span>
            ))}
          </div>
        </InfoBox>
      </div>

      <InfoBox color="#FB7185">
        <SectionTitle icon={<AlertTriangle className="h-4 w-4" />} color="#FDA4AF">⚠ Kesalahan Lazim</SectionTitle>
        <div className="space-y-2">
          {topic.mistakes.map((mistake) => (
            <div key={mistake.wrong} className="rounded-xl border border-rose-400/10 bg-black/10 p-3">
              <p className="text-sm font-semibold text-rose-200">{mistake.wrong}</p>
              <p className="mt-1 text-xs leading-5 text-white/55">Mengapa: {mistake.why}</p>
            </div>
          ))}
        </div>
      </InfoBox>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoBox color="#FBBF24">
          <SectionTitle icon={<Target className="h-4 w-4" />} color="#FDE68A">🎯 Tip UASA</SectionTitle>
          <p className="text-sm leading-6 text-white/70">{topic.uasaTip}</p>
        </InfoBox>
        <InfoBox color="#F472B6">
          <SectionTitle icon={<MessageCircle className="h-4 w-4" />} color="#F9A8D4">🤖 Cikgu AI</SectionTitle>
          <p className="text-sm leading-6 text-white/70">{topic.cikgu}</p>
        </InfoBox>
      </div>

      <div>
        <SectionTitle icon={<Brain className="h-4 w-4" />} color="#C084FC">🧠 Mini Quiz</SectionTitle>
        <div className="space-y-3">
          {topic.quiz.map((quiz, index) => (
            <QuizQuestion key={quiz.question} quiz={quiz} number={index + 1} color={color} />
          ))}
        </div>
      </div>

      <InfoBox color="#FBBF24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionTitle icon={<Star className="h-4 w-4" />} color="#FDE68A">⭐ UASA Focus</SectionTitle>
          <div className="flex" aria-label={`${topic.focus.stars} daripada 5 bintang`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="h-4 w-4" fill={index < topic.focus.stars ? "#FBBF24" : "transparent"} color={index < topic.focus.stars ? "#FBBF24" : "#ffffff30"} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Objektif", topic.focus.objektif],
            ["Sistem Bahasa", topic.focus.sistemBahasa],
            ["Penulisan", topic.focus.penulisan],
          ].map(([label, active]) => (
            <div key={String(label)} className="rounded-xl border border-white/[0.07] bg-black/10 p-3 text-center">
              <p className="text-base font-black" style={{ color: active ? "#34D399" : "rgba(255,255,255,0.25)" }}>{active ? "✓" : "–"}</p>
              <p className="mt-1 text-[10px] font-semibold text-white/50">{String(label)}</p>
            </div>
          ))}
        </div>
      </InfoBox>
    </div>
  );
}

const TOPIC_COLORS = ["#60A5FA", "#34D399", "#F472B6", "#A78BFA", "#22D3EE", "#FB923C", "#818CF8", "#C084FC", "#FBBF24", "#E879F9", "#FB7185"];

export function BMForm2SistemBahasaLibrary() {
  return (
    <div>
      <div className="mb-5 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
          <div>
            <h3 className="font-display font-bold text-white">📚 Sistem Bahasa</h3>
            <p className="mt-1 text-sm leading-6 text-white/55">Pilih satu topik. Hanya satu folder dibuka pada satu masa supaya ulang kaji kekal fokus.</p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {BM_FORM2_GRAMMAR_TOPICS.map((topic, index) => {
          const color = TOPIC_COLORS[index % TOPIC_COLORS.length];
          return (
            <AccordionItem
              key={topic.id}
              value={topic.id}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors data-[state=open]:border-white/[0.16]"
            >
              <AccordionTrigger className="min-h-14 px-5 py-4 text-left hover:no-underline">
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black" style={{ background: `${color}20`, color }}>{index + 1}</span>
                  <span className="font-display font-bold text-white/90">{topic.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5 sm:px-5">
                <TopicContent topic={topic} color={color} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/35">
        <Zap className="h-3.5 w-3.5" />
        Pilih mana-mana topik untuk belajar mengikut keperluan anda.
      </div>
    </div>
  );
}
