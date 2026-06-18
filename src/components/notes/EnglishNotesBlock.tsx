import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, FileText, Star } from "lucide-react";
import type {
  EnglishChapterData,
  EnglishCard,
  EnglishCardType,
  VocabWord,
} from "@/data/english-types";

// ─── Card type config ───────────────────────────────────────────────────────
const CARD_CONFIG: Record<
  EnglishCardType,
  { icon: string; label: string; border: string; bg: string; accent: string; labelBg: string }
> = {
  goal: {
    icon: "🎯",
    label: "Learning Goal",
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    accent: "text-violet-300",
    labelBg: "bg-violet-500/20",
  },
  story: {
    icon: "📖",
    label: "Story",
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    accent: "text-amber-300",
    labelBg: "bg-amber-500/20",
  },
  concept: {
    icon: "💡",
    label: "Key Concept",
    border: "border-blue-500/40",
    bg: "bg-blue-500/10",
    accent: "text-blue-300",
    labelBg: "bg-blue-500/20",
  },
  "grammar-rule": {
    icon: "⚡",
    label: "Grammar Rule",
    border: "border-indigo-500/40",
    bg: "bg-indigo-500/10",
    accent: "text-indigo-300",
    labelBg: "bg-indigo-500/20",
  },
  "real-world": {
    icon: "🌍",
    label: "Real World",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    accent: "text-emerald-300",
    labelBg: "bg-emerald-500/20",
  },
  mistake: {
    icon: "⚠️",
    label: "Common Mistake",
    border: "border-red-500/40",
    bg: "bg-red-500/8",
    accent: "text-red-300",
    labelBg: "bg-red-500/20",
  },
  "memory-trick": {
    icon: "🧠",
    label: "Memory Trick",
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    accent: "text-purple-300",
    labelBg: "bg-purple-500/20",
  },
  challenge: {
    icon: "🏆",
    label: "Challenge",
    border: "border-yellow-500/40",
    bg: "bg-yellow-500/10",
    accent: "text-yellow-300",
    labelBg: "bg-yellow-500/20",
  },
  vocab: {
    icon: "🔤",
    label: "Vocabulary",
    border: "border-teal-500/40",
    bg: "bg-teal-500/10",
    accent: "text-teal-300",
    labelBg: "bg-teal-500/20",
  },
  "exam-tip": {
    icon: "✏️",
    label: "Exam Tip",
    border: "border-orange-500/40",
    bg: "bg-orange-500/10",
    accent: "text-orange-300",
    labelBg: "bg-orange-500/20",
  },
  "did-you-know": {
    icon: "🤔",
    label: "Did You Know?",
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    accent: "text-sky-300",
    labelBg: "bg-sky-500/20",
  },
  table: {
    icon: "📊",
    label: "Reference Table",
    border: "border-slate-500/40",
    bg: "bg-slate-500/10",
    accent: "text-slate-300",
    labelBg: "bg-slate-500/20",
  },
};

const THEME_GRADIENT: Record<string, string> = {
  grammar: "from-violet-600 to-indigo-600",
  vocabulary: "from-teal-600 to-cyan-600",
  reading: "from-sky-600 to-blue-600",
  writing: "from-purple-600 to-violet-600",
};

const THEME_GLOW: Record<string, string> = {
  grammar: "shadow-[0_0_60px_rgba(139,92,246,0.25)]",
  vocabulary: "shadow-[0_0_60px_rgba(20,184,166,0.25)]",
  reading: "shadow-[0_0_60px_rgba(56,189,248,0.25)]",
  writing: "shadow-[0_0_60px_rgba(168,85,247,0.25)]",
};

// ─── Card sub-renderers ──────────────────────────────────────────────────────

function MistakeCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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

function GrammarRuleCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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

function VocabCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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

function TableCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  if (!card.table) return null;
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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
                <th
                  key={i}
                  className="px-4 py-2.5 text-left font-bold text-white/80 whitespace-nowrap"
                >
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

function ChallengeCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  return (
    <div className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-5 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-yellow-500/10 blur-2xl" />
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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

function StoryCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  if (card.title === "UASA Reference Examples" && card.body) {
    return <ReferenceExamplesCard card={card} cfg={cfg} />;
  }

  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5 relative overflow-hidden`}>
      <div className="absolute -top-4 -right-4 text-6xl opacity-10 select-none">📖</div>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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

type ReferenceSection = {
  label: string;
  icon: string;
  content: string;
  tone: "passage" | "question" | "options" | "answer" | "explanation" | "keywords" | "tip";
};

const EXAMPLE_STARTERS = new Set([
  "MESSAGE",
  "NOTICE",
  "ADVERTISEMENT",
  "POSTER",
  "BANNER",
  "SIGN",
  "LABEL",
  "PREPOSITIONS",
  "PRONOUNS",
  "ARTICLES",
  "TENSES",
  "SUBJECT-VERB AGREEMENT",
  "CONJUNCTIONS",
  "VOCABULARY USAGE",
  "WORD FORMS",
  "READING PASSAGE",
  "PASSAGE",
  "FULL PASSAGE",
]);

const REFERENCE_LABELS: Array<{
  match: RegExp;
  label: string;
  icon: string;
  tone: ReferenceSection["tone"];
}> = [
  {
    match: /^(READING PASSAGE|FULL PASSAGE|PASSAGE|ORIGINAL SENTENCE)\b:?/i,
    label: "Passage",
    icon: "📖",
    tone: "passage",
  },
  {
    match: /^(QUESTION(?:\s+\d+)?|Question(?:\s+\d+)?)\b:?/i,
    label: "Question",
    icon: "❓",
    tone: "question",
  },
  { match: /^OPTIONS\b:?/i, label: "Options", icon: "📝", tone: "options" },
  {
    match: /^(CORRECT ANSWER|ANSWER|CORRECT)\b:?/i,
    label: "Correct Answer",
    icon: "✅",
    tone: "answer",
  },
  { match: /^(EXPLANATION)\b:?/i, label: "Explanation", icon: "💡", tone: "explanation" },
  {
    match: /^(KEYWORDS|COMPLETED ANSWERS AND KEYWORDS|INCORRECT WORD|INCORRECT)\b:?/i,
    label: "Keywords",
    icon: "🔑",
    tone: "keywords",
  },
  { match: /^(EXAM TIP)\b:?/i, label: "Exam Tip", icon: "🎯", tone: "tip" },
  { match: /^TABLE\b:?/i, label: "Table", icon: "📝", tone: "options" },
];

function splitReferenceExamples(body: string) {
  const chunks: string[][] = [];
  let current: string[] = [];

  body.split("\n").forEach((line) => {
    const trimmed = line.trim();
    const startsExample = EXAMPLE_STARTERS.has(trimmed) && current.some((item) => item.trim());
    if (startsExample) {
      chunks.push(current);
      current = [line];
      return;
    }
    current.push(line);
  });

  if (current.some((line) => line.trim())) chunks.push(current);
  return chunks.map((lines) => lines.join("\n").trim());
}

function labelForLine(line: string) {
  return REFERENCE_LABELS.find(({ match }) => match.test(line.trim()));
}

function stripLabel(line: string, label: ReturnType<typeof labelForLine>) {
  if (!label) return line.trim();
  return line.trim().replace(label.match, "").trim();
}

function parseReferenceExample(chunk: string) {
  const lines = chunk.split("\n");
  const first = lines[0]?.trim() ?? "Reference Example";
  const hasHeading = EXAMPLE_STARTERS.has(first);
  const heading = hasHeading ? first : "Reference Example";
  const bodyLines = hasHeading ? lines.slice(1) : lines;
  const sections: ReferenceSection[] = [];
  let current: ReferenceSection | null = null;

  const pushCurrent = () => {
    if (current && current.content.trim()) {
      sections.push({ ...current, content: current.content.trim() });
    }
  };

  bodyLines.forEach((line) => {
    const label = labelForLine(line);
    if (label) {
      pushCurrent();
      current = {
        label: label.label,
        icon: label.icon,
        tone: label.tone,
        content: stripLabel(line, label),
      };
      return;
    }

    if (!current) {
      current = {
        label: "Passage",
        icon: "📖",
        tone: "passage",
        content: line,
      };
      return;
    }

    current.content += `${current.content ? "\n" : ""}${line}`;
  });

  pushCurrent();
  return { heading, sections };
}

function toneClasses(tone: ReferenceSection["tone"]) {
  const classes: Record<ReferenceSection["tone"], string> = {
    passage: "border-sky-400/25 bg-sky-500/[0.08] text-sky-50",
    question: "border-violet-400/25 bg-violet-500/[0.08] text-violet-50",
    options: "border-white/10 bg-white/[0.05] text-white/80",
    answer: "border-emerald-400/35 bg-emerald-500/[0.12] text-emerald-100",
    explanation: "border-amber-400/30 bg-amber-500/[0.10] text-amber-50",
    keywords: "border-yellow-400/35 bg-yellow-500/[0.12] text-yellow-100",
    tip: "border-orange-400/30 bg-orange-500/[0.10] text-orange-50",
  };
  return classes[tone];
}

function formatReferenceContent(section: ReferenceSection) {
  const lines = section.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (section.tone === "keywords") {
    const items = lines.flatMap((line) =>
      line.includes(",")
        ? line
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [line],
    );
    return (
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-7">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      {lines.map((line, i) => (
        <p key={i} className="whitespace-pre-wrap text-sm leading-7">
          {line}
        </p>
      ))}
    </div>
  );
}

function ReferenceExamplesCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  const examples = splitReferenceExamples(card.body ?? "").map(parseReferenceExample);
  const [active, setActive] = useState(0);
  const activeExample = examples[active];

  return (
    <div
      className={`rounded-2xl border ${cfg.border} bg-amber-950/20 p-5 relative overflow-hidden`}
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${cfg.labelBg} ${cfg.accent}`}
          >
            📚 {card.title}
          </span>
          <p className="mt-2 text-sm text-amber-100/70">
            Open one example at a time for quick revision.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, i) => (
            <button
              key={`${example.heading}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                active === i
                  ? "border-amber-300/60 bg-amber-300/20 text-amber-100"
                  : "border-white/10 bg-white/[0.04] text-white/45 hover:text-white/75"
              }`}
            >
              Reference Example {i + 1}
            </button>
          ))}
        </div>
      </div>

      {activeExample && (
        <div className="relative rounded-2xl border border-amber-300/20 bg-[#090E1A]/72 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-300/70">
                Reference Example {active + 1}
              </p>
              <h4 className="mt-1 text-lg font-bold text-white">{activeExample.heading}</h4>
            </div>
            <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-bold text-amber-200">
              {active + 1}/{examples.length}
            </span>
          </div>

          <div className="space-y-3">
            {activeExample.sections.map((section, i) => (
              <div
                key={`${section.label}-${i}`}
                className={`rounded-2xl border p-4 ${toneClasses(section.tone)}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">{section.icon}</span>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em]">
                    {section.label}
                  </p>
                </div>
                {formatReferenceContent(section)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GenericCard({
  card,
  cfg,
}: {
  card: EnglishCard;
  cfg: (typeof CARD_CONFIG)[EnglishCardType];
}) {
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cfg.labelBg} ${cfg.accent}`}
        >
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
              <span
                className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${cfg.accent.replace("text-", "bg-")}`}
              />
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
      if (next.has(word)) {
        next.delete(word);
      } else {
        next.add(word);
      }
      return next;
    });

  return (
    <div className="rounded-[2rem] border border-teal-500/20 bg-teal-950/30 p-6 mb-6 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔤</span>
        <div>
          <h3 className="font-bold text-lg text-teal-200">Word Vault</h3>
          <p className="text-xs text-teal-400/70">
            Tap a word to collect it — {collected.size}/{words.length} collected
          </p>
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
            {collected.size === words.length && words.length > 0
              ? "🏅 All collected!"
              : `${Math.round((collected.size / Math.max(words.length, 1)) * 100)}%`}
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
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-orange-950/30 border border-orange-500/15 p-3"
          >
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
  const sectionId = section.title.startsWith("Part ")
    ? `english-paper-1-part-${index + 1}`
    : undefined;
  return (
    <div
      id={sectionId}
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden mb-4 animate-fade-up"
    >
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
                card.type === "mistake" ||
                card.type === "table" ||
                card.type === "challenge" ||
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
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} p-7 mb-6 ${glow} animate-fade-up`}
    >
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

const PAPER_1_PARTS = [
  {
    icon: "📩",
    part: "Part 1",
    title: "Short Texts & Visual Materials",
    topics: "Messages, notices, advertisements, posters, banners, signs, labels",
    skills: "Purpose, main idea, identifying information",
  },
  {
    icon: "✏️",
    part: "Part 2",
    title: "Grammar & Error Correction",
    topics: "Prepositions, pronouns, articles, tenses, agreement, conjunctions, vocabulary",
    skills: "Spotting errors, correcting words, grammar usage",
  },
  {
    icon: "📋",
    part: "Part 3",
    title: "Information Transfer",
    topics: "Causes, effects, solutions, table completion, information extraction",
    skills: "Finding keywords, scanning, no more than three words",
  },
  {
    icon: "📖",
    part: "Part 4",
    title: "Reading Comprehension",
    topics: "True or False, multiple choice, short answers, main ideas, supporting details",
    skills: "Skimming, scanning, understanding context",
  },
  {
    icon: "🧩",
    part: "Part 5",
    title: "Gapped Text",
    topics: "Missing sentences, sequence, context clues, reference words",
    skills: "Logical flow, sentence matching, understanding relationships",
  },
] as const;

function Paper1Overview({ sections }: { sections: EnglishChapterData["sections"] }) {
  return (
    <div className="mb-6 rounded-[2rem] border border-sky-400/20 bg-sky-950/20 p-5 animate-fade-up">
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-300/70">
          Paper 1 Exam Flow
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-white">The 5 UASA Parts</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {PAPER_1_PARTS.map((part, i) => (
          <a
            key={part.part}
            href={`#english-paper-1-part-${i + 1}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:-translate-y-1 hover:border-sky-300/35 hover:bg-sky-400/[0.08]"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-2xl">{part.icon}</span>
              <span className="rounded-full bg-sky-400/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-sky-200">
                {part.part}
              </span>
            </div>
            <h4 className="text-sm font-bold leading-snug text-white">{part.title}</h4>
            <p className="mt-2 text-xs leading-5 text-white/45">{part.topics}</p>
            <div className="mt-3 rounded-xl border border-sky-300/15 bg-sky-300/[0.06] px-3 py-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-200/70">
                Skills
              </p>
              <p className="mt-1 text-xs leading-5 text-sky-50/70">{part.skills}</p>
            </div>
            <p className="mt-3 text-[11px] font-bold text-sky-300/80">
              Open {sections[i]?.title ?? part.part}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

const PAPER_2_GROUPS = {
  A: {
    icon: "✉️",
    label: "Bahagian A",
    title: "Short Writing Tasks",
    description: "Email Writing and Message Writing",
    sectionIndexes: [0, 1],
    topics: ["Email Writing", "Message Writing"],
  },
  B: {
    icon: "📝",
    label: "Bahagian B",
    title: "Extended Writing Tasks",
    description: "Essay Writing and Guided Writing",
    sectionIndexes: [2, 3],
    topics: ["Essay Writing", "Guided Writing"],
  },
} as const;

type Paper2GroupKey = keyof typeof PAPER_2_GROUPS;

function Paper2Overview({
  activeGroup,
  onSelect,
}: {
  activeGroup: Paper2GroupKey;
  onSelect: (group: Paper2GroupKey) => void;
}) {
  return (
    <div className="mb-6 rounded-[2rem] border border-purple-400/20 bg-purple-950/20 p-5 animate-fade-up">
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-purple-300/70">
          Paper 2 Exam Flow
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-white">
          Choose Your Writing Section
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(PAPER_2_GROUPS) as Paper2GroupKey[]).map((key) => {
          const group = PAPER_2_GROUPS[key];
          const isActive = activeGroup === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`group rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 ${
                isActive
                  ? "border-purple-300/60 bg-purple-400/[0.14] shadow-[0_18px_50px_rgba(168,85,247,0.18)]"
                  : "border-white/10 bg-white/[0.04] hover:border-purple-300/35 hover:bg-purple-400/[0.08]"
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-3xl">{group.icon}</span>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                    isActive ? "bg-purple-200 text-purple-950" : "bg-purple-400/15 text-purple-200"
                  }`}
                >
                  {group.label}
                </span>
              </div>
              <h4 className="font-display text-xl font-bold text-white">{group.title}</h4>
              <p className="mt-2 text-sm leading-6 text-white/55">{group.description}</p>
              <div className="mt-4 grid gap-2">
                {group.topics.map((topic) => (
                  <div
                    key={topic}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-white/75"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Paper2StudySections({ sections }: { sections: EnglishChapterData["sections"] }) {
  const [activeGroup, setActiveGroup] = useState<Paper2GroupKey>("A");
  const group = PAPER_2_GROUPS[activeGroup];
  const cohesiveDevicesBank = sections.find((section) => section.title === "Cohesive Devices Bank");
  const visibleSections = group.sectionIndexes
    .map((sectionIndex) => ({ section: sections[sectionIndex], sectionIndex }))
    .filter((item) => !!item.section);

  return (
    <>
      <Paper2Overview activeGroup={activeGroup} onSelect={setActiveGroup} />
      <div className="mb-4 rounded-2xl border border-purple-300/20 bg-purple-400/[0.08] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{group.icon}</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-purple-200/70">
              {group.label}
            </p>
            <h3 className="font-display text-lg font-bold text-white">{group.title}</h3>
          </div>
        </div>
      </div>
      {visibleSections.map(({ section, sectionIndex }) => (
        <EnglishSectionBlock key={section.title} section={section} index={sectionIndex} />
      ))}
      {cohesiveDevicesBank && (
        <EnglishSectionBlock
          key={`${activeGroup}-${cohesiveDevicesBank.title}`}
          section={cohesiveDevicesBank}
          index={sections.indexOf(cohesiveDevicesBank)}
        />
      )}
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function EnglishNotesBlock({
  id,
  data,
  storageKey,
}: {
  id?: string;
  data: EnglishChapterData;
  storageKey?: string;
}) {
  const stateKey = storageKey ?? `notes:english-study-notes:${id ?? data.chapterTitle}`;
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(stateKey) === "open";
  });

  function openNotes() {
    setIsOpen(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(stateKey, "open");
    }
  }

  if (!isOpen) {
    return (
      <div id={id} className="mx-auto mb-6 w-full max-w-5xl scroll-mt-24 animate-fade-up">
        <button
          type="button"
          onClick={openNotes}
          className="group w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/70 p-5 text-left shadow-[0_20px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-[#101827]/84 hover:shadow-[0_24px_80px_rgba(168,85,247,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
        >
          <div className="mb-5 h-1 w-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-transparent" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 shadow-[0_0_34px_rgba(168,85,247,0.16)] transition-transform duration-300 group-hover:scale-105">
                <FileText className="h-6 w-6 text-violet-200" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/40">
                  {data.sections.length} section{data.sections.length !== 1 ? "s" : ""}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-white">Study Notes</h2>
                <p className="mt-1 text-sm leading-6 text-white/55">
                  Structured notes organised by topic.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(168,85,247,0.22)] transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="h-4 w-4" />
              Open Notes
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div id={id} className="mx-auto mb-8 w-full max-w-5xl scroll-mt-24">
      <ChapterHero data={data} />
      <WordVault words={data.wordVault} />
      {data.chapterTitle === "Paper 1 - Reading & Language Awareness" && (
        <Paper1Overview sections={data.sections} />
      )}
      <div className="mb-2 flex items-center gap-2 px-1">
        <BookOpen className="w-4 h-4 text-violet-400" />
        <h3 className="font-bold text-white/70 text-sm uppercase tracking-wide">Study Sections</h3>
      </div>
      {data.chapterTitle === "Paper 2 - Writing" ? (
        <Paper2StudySections sections={data.sections} />
      ) : (
        data.sections.map((section, i) => (
          <EnglishSectionBlock key={i} section={section} index={i} />
        ))
      )}
      {data.examFacts.length > 0 && <ExamFacts facts={data.examFacts} />}
    </div>
  );
}
