import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Star } from "lucide-react";
import type { EnglishChapterData, EnglishCard, EnglishCardType, VocabWord } from "@/data/english-types";

// ─── Card type config ───────────────────────────────────────────────────────
const CARD_CONFIG: Record<
  EnglishCardType,
  { icon: string; label: string; border: string; bg: string; accent: string; labelBg: string }
> = {
  goal: {
    icon: "🎯", label: "Learning Goal",
    border: "border-violet-500/40", bg: "bg-violet-500/10",
    accent: "text-violet-300", labelBg: "bg-violet-500/20",
  },
  story: {
    icon: "📖", label: "Story",
    border: "border-amber-500/40", bg: "bg-amber-500/10",
    accent: "text-amber-300", labelBg: "bg-amber-500/20",
  },
  concept: {
    icon: "💡", label: "Key Concept",
    border: "border-blue-500/40", bg: "bg-blue-500/10",
    accent: "text-blue-300", labelBg: "bg-blue-500/20",
  },
  "grammar-rule": {
    icon: "⚡", label: "Grammar Rule",
    border: "border-indigo-500/40", bg: "bg-indigo-500/10",
    accent: "text-indigo-300", labelBg: "bg-indigo-500/20",
  },
  "real-world": {
    icon: "🌍", label: "Real World",
    border: "border-emerald-500/40", bg: "bg-emerald-500/10",
    accent: "text-emerald-300", labelBg: "bg-emerald-500/20",
  },
  mistake: {
    icon: "⚠️", label: "Common Mistake",
    border: "border-red-500/40", bg: "bg-red-500/8",
    accent: "text-red-300", labelBg: "bg-red-500/20",
  },
  "memory-trick": {
    icon: "🧠", label: "Memory Trick",
    border: "border-purple-500/40", bg: "bg-purple-500/10",
    accent: "text-purple-300", labelBg: "bg-purple-500/20",
  },
  challenge: {
    icon: "🏆", label: "Challenge",
    border: "border-yellow-500/40", bg: "bg-yellow-500/10",
    accent: "text-yellow-300", labelBg: "bg-yellow-500/20",
  },
  vocab: {
    icon: "🔤", label: "Vocabulary",
    border: "border-teal-500/40", bg: "bg-teal-500/10",
    accent: "text-teal-300", labelBg: "bg-teal-500/20",
  },
  "exam-tip": {
    icon: "✏️", label: "Exam Tip",
    border: "border-orange-500/40", bg: "bg-orange-500/10",
    accent: "text-orange-300", labelBg: "bg-orange-500/20",
  },
  "did-you-know": {
    icon: "🤔", label: "Did You Know?",
    border: "border-sky-500/40", bg: "bg-sky-500/10",
    accent: "text-sky-300", labelBg: "bg-sky-500/20",
  },
  table: {
    icon: "📊", label: "Reference Table",
    border: "border-slate-500/40", bg: "bg-slate-500/10",
    accent: "text-slate-300", labelBg: "bg-slate-500/20",
  },
};

const THEME_GRADIENT: Record<string, string> = {
  grammar:    "from-violet-600 to-indigo-600",
  vocabulary: "from-teal-600 to-cyan-600",
  reading:    "from-sky-600 to-blue-600",
  writing:    "from-purple-600 to-violet-600",
};

const THEME_GLOW: Record<string, string> = {
  grammar:    "shadow-[0_0_60px_rgba(139,92,246,0.25)]",
  vocabulary: "shadow-[0_0_60px_rgba(20,184,166,0.25)]",
  reading:    "shadow-[0_0_60px_rgba(56,189,248,0.25)]",
  writing:    "shadow-[0_0_60px_rgba(168,85,247,0.25)]",
};

// ─── Card sub-renderers ──────────────────────────────────────────────────────

function MistakeCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-3 ${cfg.accent}`}>{card.title}</p>
      {card.body && <p className="text-sm text-white/70 mb-3">{card.body}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {card.wrong && (
          <div className="rounded-xl bg-red-500/15 border border-red-500/30 p-3">
            <p className="text-xs font-bold text-red-400 mb-1">✗ Wrong</p>
            <p className="text-sm text-red-200 italic">{card.wrong}</p>
          </div>
        )}
        {card.right && (
          <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3">
            <p className="text-xs font-bold text-emerald-400 mb-1">✓ Correct</p>
            <p className="text-sm text-emerald-200 italic">{card.right}</p>
          </div>
        )}
      </div>
      {card.items && card.items.length > 0 && (
        <ul className="mt-3 space-y-1">
          {card.items.map((item, i) => (
            <li key={i} className="text-sm text-white/70 flex gap-2">
              <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 translate-y-1" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GrammarRuleCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-3 ${cfg.accent}`}>{card.title}</p>
      {card.body && <p className="text-sm text-white/70 mb-3">{card.body}</p>}
      {card.formula && (
        <div className="rounded-xl bg-indigo-950/60 border border-indigo-500/30 p-4 my-3 text-center">
          <p className="font-mono font-bold text-indigo-200 text-sm sm:text-base leading-relaxed">
            {card.formula}
          </p>
        </div>
      )}
      {card.items && card.items.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {card.items.map((item, i) => (
            <li key={i} className="text-sm text-white/75 flex gap-2 items-start">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function VocabCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-3 ${cfg.accent}`}>{card.title}</p>
      {card.body && <p className="text-sm text-white/70 mb-3">{card.body}</p>}
      {card.words && card.words.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {card.words.map((w, i) => (
            <div key={i} className="rounded-xl bg-teal-950/40 border border-teal-500/20 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-teal-200 text-sm">{w.word}</span>
                <span className="text-xs text-teal-500 italic">{w.partOfSpeech}</span>
              </div>
              <p className="text-xs text-white/65 mb-1">{w.meaning}</p>
              <p className="text-xs text-teal-300/70 italic">"{w.example}"</p>
            </div>
          ))}
        </div>
      )}
      {card.items && card.items.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {card.items.map((item, i) => (
            <li key={i} className="text-sm text-white/75 flex gap-2 items-start">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TableCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  if (!card.table) return null;
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-3 ${cfg.accent}`}>{card.title}</p>
      {card.body && <p className="text-sm text-white/70 mb-3">{card.body}</p>}
      <div className="overflow-x-auto rounded-xl border border-white/10 mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {card.table.headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-bold text-white/80 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {card.table.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-white/70 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChallengeCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  return (
    <div className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-5 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-yellow-500/10 blur-2xl" />
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-2 ${cfg.accent}`}>{card.title}</p>
      {card.body && <p className="text-sm text-white/80 leading-relaxed">{card.body}</p>}
      {card.items && card.items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {card.items.map((item, i) => (
            <li key={i} className="text-sm text-white/75 flex gap-2 items-start">
              <span className="shrink-0 text-yellow-400 font-bold">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-yellow-400/70 italic">→ Try it in your notebook first!</p>
    </div>
  );
}

function StoryCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5 relative overflow-hidden`}>
      <div className="absolute -top-4 -right-4 text-6xl opacity-10 select-none">📖</div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-2 ${cfg.accent}`}>{card.title}</p>
      {card.body && (
        <p className="text-sm text-amber-100/80 italic leading-relaxed border-l-2 border-amber-500/40 pl-3">
          {card.body}
        </p>
      )}
      {card.items && card.items.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {card.items.map((item, i) => (
            <li key={i} className="text-sm text-white/75 flex gap-2 items-start">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GenericCard({ card, cfg }: { card: EnglishCard; cfg: typeof CARD_CONFIG[EnglishCardType] }) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className={`font-bold text-base mb-2 ${cfg.accent}`}>{card.title}</p>
      {card.body && <p className="text-sm text-white/75 leading-relaxed">{card.body}</p>}
      {card.formula && (
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 my-3 text-center">
          <p className="font-mono font-semibold text-white/90 text-sm">{card.formula}</p>
        </div>
      )}
      {card.items && card.items.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {card.items.map((item, i) => (
            <li key={i} className="text-sm text-white/75 flex gap-2 items-start">
              <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${cfg.accent.replace("text-", "bg-")}`} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EnglishCardRenderer({ card }: { card: EnglishCard }) {
  const cfg = CARD_CONFIG[card.type];
  if (card.type === "mistake") return <MistakeCard card={card} cfg={cfg} />;
  if (card.type === "grammar-rule") return <GrammarRuleCard card={card} cfg={cfg} />;
  if (card.type === "vocab") return <VocabCard card={card} cfg={cfg} />;
  if (card.type === "table") return <TableCard card={card} cfg={cfg} />;
  if (card.type === "challenge") return <ChallengeCard card={card} cfg={cfg} />;
  if (card.type === "story") return <StoryCard card={card} cfg={cfg} />;
  return <GenericCard card={card} cfg={cfg} />;
}

// ─── Word Vault ──────────────────────────────────────────────────────────────

function WordVault({ words }: { words: VocabWord[] }) {
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const toggle = (word: string) =>
    setCollected((prev) => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      return next;
    });

  return (
    <div className="rounded-[2rem] border border-teal-500/20 bg-teal-950/30 p-6 mb-6 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔤</span>
        <div>
          <h3 className="font-bold text-lg text-teal-200">Word Vault</h3>
          <p className="text-xs text-teal-400/70">Tap a word to collect it — {collected.size}/{words.length} collected</p>
        </div>
        <div className="ml-auto text-right">
          <div className="flex gap-1 justify-end mb-1">
            {words.slice(0, Math.min(words.length, 8)).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i < collected.size ? "bg-teal-400" : "bg-teal-800"}`}
              />
            ))}
          </div>
          <p className="text-xs text-teal-500">
            {collected.size === words.length && words.length > 0 ? "🏅 All collected!" : `${Math.round((collected.size / Math.max(words.length, 1)) * 100)}%`}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {words.map((w) => {
          const isCollected = collected.has(w.word);
          return (
            <button
              key={w.word}
              type="button"
              onClick={() => toggle(w.word)}
              title={`${w.meaning} — "${w.example}"`}
              className={`group relative px-3 py-2 rounded-xl border text-left transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                isCollected
                  ? "border-teal-400/60 bg-teal-500/20 text-teal-100"
                  : "border-teal-700/40 bg-teal-950/40 text-teal-300/70 hover:border-teal-500/50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isCollected && <span className="text-teal-400 text-xs">✓</span>}
                <span className="text-sm font-semibold">{w.word}</span>
                <span className="text-xs text-teal-500/70 italic">{w.partOfSpeech}</span>
              </div>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-0 mb-2 z-10 hidden group-hover:block min-w-[180px] max-w-[240px]">
                <div className="rounded-xl bg-[#0B1220] border border-teal-500/30 p-3 shadow-2xl">
                  <p className="text-xs text-teal-300 font-semibold mb-1">{w.word}</p>
                  <p className="text-xs text-white/70 mb-1">{w.meaning}</p>
                  <p className="text-xs text-teal-400/70 italic">"{w.example}"</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Exam Facts ──────────────────────────────────────────────────────────────

function ExamFacts({ facts }: { facts: string[] }) {
  return (
    <div className="rounded-[2rem] border border-orange-500/20 bg-orange-950/20 p-6 mb-6 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">✏️</span>
        <h3 className="font-bold text-lg text-orange-200">Exam Quick-Fire Facts</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {facts.map((fact, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-orange-950/30 border border-orange-500/15 p-3">
            <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500/30 text-orange-300 text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-white/75 leading-snug">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function EnglishSectionBlock({
  section,
  index,
}: {
  section: { title: string; emoji: string; cards: EnglishCard[] };
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden mb-4 animate-fade-up">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-xl">{section.emoji}</span>
        <span className="font-bold text-white/90 flex-1">{section.title}</span>
        <span className="text-white/40 shrink-0">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {section.cards.map((card, ci) => (
            <div
              key={ci}
              className={
                // Wide cards: mistake (needs both columns), table, vocab with many words, challenge
                card.type === "mistake" || card.type === "table" || card.type === "challenge" ||
                (card.type === "vocab" && (card.words?.length ?? 0) > 2)
                  ? "lg:col-span-2"
                  : ""
              }
            >
              <EnglishCardRenderer card={card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Chapter Hero ─────────────────────────────────────────────────────────────

function ChapterHero({ data }: { data: EnglishChapterData }) {
  const gradient = THEME_GRADIENT[data.theme] ?? THEME_GRADIENT.grammar;
  const glow = THEME_GLOW[data.theme] ?? THEME_GLOW.grammar;
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} p-7 mb-6 ${glow} animate-fade-up`}>
      <div className="absolute -top-8 -right-8 text-[9rem] opacity-10 select-none pointer-events-none leading-none">
        {data.heroEmoji}
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">{data.heroEmoji}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
              English Form 1
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              {data.chapterTitle}
            </h2>
          </div>
        </div>
        <p className="text-white/80 text-sm sm:text-base italic mb-5">{data.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {data.learningGoals.map((goal, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
            >
              <Star className="w-3 h-3 shrink-0" />
              {goal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function EnglishNotesBlock({
  id,
  data,
}: {
  id?: string;
  data: EnglishChapterData;
}) {
  return (
    <div id={id} className="mx-auto mb-8 w-full max-w-5xl scroll-mt-24">
      <ChapterHero data={data} />
      <WordVault words={data.wordVault} />
      <div className="mb-2 flex items-center gap-2 px-1">
        <BookOpen className="w-4 h-4 text-violet-400" />
        <h3 className="font-bold text-white/70 text-sm uppercase tracking-wide">Study Sections</h3>
      </div>
      {data.sections.map((section, i) => (
        <EnglishSectionBlock key={i} section={section} index={i} />
      ))}
      {data.examFacts.length > 0 && <ExamFacts facts={data.examFacts} />}
    </div>
  );
}
