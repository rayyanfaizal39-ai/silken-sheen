import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  X,
  Send,
  Trash2,
  ChevronDown,
  BookOpen,
  Target,
  BarChart3,
  Copy,
  RefreshCw,
  GraduationCap,
  Lightbulb,
  Zap,
} from "lucide-react";
import { cikguChat } from "@/lib/cikgu-chat.functions";
import { useCikgu } from "@/context/cikgu-context";
import { useProgress } from "@/hooks/use-progress";

// ─── Types ────────────────────────────────────────────────────────────────────

type Msg = {
  role: "user" | "assistant";
  content: string;
  ts: number;
  isAutoSent?: boolean;
};

type QuickTab = "chat" | "exam-coach" | "insights";

// ─── Subject suggestions ──────────────────────────────────────────────────────

const SUBJECT_SUGGESTIONS: Record<string, { label: string; q: string }[]> = {
  science: [
    { label: "Apa itu fotosintesis? 🌿", q: "Terangkan proses fotosintesis dengan mudah." },
    { label: "Bezakan sel haiwan & tumbuhan 🔬", q: "Apakah perbezaan antara sel haiwan dan sel tumbuhan?" },
    { label: "Apa itu jirim? ⚗️", q: "Terangkan apa itu jirim dan keadaan-keadaannya." },
  ],
  math: [
    { label: "Cara selesaikan persamaan 📐", q: "Tunjukkan cara selesaikan persamaan linear langkah demi langkah." },
    { label: "Terangkan faktor & gandaan 🔢", q: "Terangkan faktor dan gandaan dengan contoh." },
    { label: "Apa itu nombor nisbah? 💡", q: "Terangkan apa itu nombor nisbah dengan contoh mudah." },
  ],
  sejarah: [
    { label: "Apa itu Zaman Prasejarah? 🏛️", q: "Terangkan Zaman Prasejarah dalam Sejarah Form 1." },
    { label: "Tamadun awal dunia 🌍", q: "Terangkan tamadun-tamadun awal dunia yang penting." },
    { label: "Bezakan sumber primer & sekunder 📜", q: "Apakah perbezaan sumber primer dan sekunder dalam Sejarah?" },
  ],
  geografi: [
    { label: "Apa itu latitud & longitud? 🗺️", q: "Terangkan latitud dan longitud dengan cara mudah." },
    { label: "Jenis-jenis iklim 🌤️", q: "Terangkan jenis-jenis iklim utama di dunia." },
    { label: "Apa itu skala peta? 📏", q: "Terangkan skala peta dan cara menggunakannya." },
  ],
  english: [
    { label: "Grammar tips 📝", q: "Give me simple tips to improve my English grammar." },
    { label: "Improve essay writing ✍️", q: "How can I write a better essay in English?" },
    { label: "Vocabulary tricks 💬", q: "How can I remember new English vocabulary better?" },
  ],
  bm: [
    { label: "Tips karangan BM ✍️", q: "Berikan tips menulis karangan Bahasa Malaysia yang baik." },
    { label: "Jenis-jenis ayat 📖", q: "Terangkan jenis-jenis ayat dalam Bahasa Malaysia." },
    { label: "Cara guna tanda baca 📌", q: "Terangkan cara menggunakan tanda baca dengan betul." },
  ],
  general: [
    { label: "Tips belajar berkesan 📚", q: "Bagi saya tips belajar dengan lebih berkesan." },
    { label: "Cara ingat benda susah 🧠", q: "Bagaimana cara saya ingat benda yang susah?" },
    { label: "Tips persediaan peperiksaan 🎯", q: "Bagi tips untuk persediaan peperiksaan yang baik." },
  ],
};

function getSubjectFromPath(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p.includes("science") || p.includes("sains")) return "science";
  if (p.includes("math")) return "math";
  if (p.includes("sejarah")) return "sejarah";
  if (p.includes("geografi") || p.includes("geography")) return "geografi";
  if (p.includes("english")) return "english";
  if (p.includes("bm") || p.includes("bahasa")) return "bm";
  return "general";
}

const SUBJECT_LABELS: Record<string, string> = {
  science: "Sains",
  math: "Matematik",
  sejarah: "Sejarah",
  geografi: "Geografi",
  english: "English",
  bm: "Bahasa Malaysia",
};

const MODE_LABELS: Record<string, { icon: string; label: string; color: string }> = {
  "quiz-explain": { icon: "🔍", label: "Quiz Helper", color: "#F59E0B" },
  chapter:        { icon: "📖", label: "Chapter Tutor", color: "#34D399" },
  "math-step":    { icon: "📐", label: "Math Tutor", color: "#60A5FA" },
  "exam-coach":   { icon: "🎯", label: "Exam Coach", color: "#A78BFA" },
  flashcard:      { icon: "🃏", label: "Flashcard Tutor", color: "#F472B6" },
  general:        { icon: "💬", label: "Study Help", color: "#94A3B8" },
};

// ─── Progress summary builder ─────────────────────────────────────────────────

function buildProgressSummary(progress: ReturnType<typeof useProgress>["progress"]): string {
  const activityEntries = Object.entries(progress.chapterActivity);
  const completed = activityEntries.filter(
    ([, a]) => a.read && a.quiz && a.cards
  );
  const inProgress = activityEntries.filter(
    ([, a]) => (a.read || a.quiz || a.cards) && !(a.read && a.quiz && a.cards)
  );
  const notStarted = activityEntries.filter(
    ([, a]) => !a.read && !a.quiz && !a.cards
  );

  const masteredCards = Object.values(progress.cardMastery ?? {}).filter(
    (r) => r.reps >= 3
  ).length;

  let summary = `XP: ${progress.xp} | Streak: ${progress.streak} hari | Kuiz: ${progress.quizzesTaken} | Kad dikuasai: ${masteredCards}`;

  if (completed.length > 0) {
    summary += `\n\nBab selesai (${completed.length}): ${completed.map(([k]) => k).join(", ")}`;
  }
  if (inProgress.length > 0) {
    summary += `\n\nBab sedang belajar (${inProgress.length}):`;
    for (const [key, a] of inProgress) {
      const done = [a.read && "nota", a.quiz && "kuiz", a.cards && "kad"]
        .filter(Boolean)
        .join(", ");
      const miss = [!a.read && "nota", !a.quiz && "kuiz", !a.cards && "kad"]
        .filter(Boolean)
        .join(", ");
      summary += `\n- ${key}: selesai(${done || "-"}) belum(${miss || "-"})`;
    }
  }
  if (notStarted.length > 0) {
    summary += `\n\nBelum bermula: ${notStarted.map(([k]) => k).slice(0, 8).join(", ")}${notStarted.length > 8 ? ` +${notStarted.length - 8} lagi` : ""}`;
  }
  if (activityEntries.length === 0) {
    summary += "\n\nBelum ada aktiviti belajar direkodkan.";
  }
  if (progress.badges.length > 0) {
    summary += `\n\nBadges: ${progress.badges.join(", ")}`;
  }

  return summary;
}

// ─── Message renderer ─────────────────────────────────────────────────────────

function CikguMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1 text-sm leading-6">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Numbered step: "1. " "2. " etc.
        const stepMatch = /^(\d+)\.\s+(.+)$/.exec(trimmed);
        if (stepMatch) {
          return (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6366F1]/20 text-[10px] font-bold text-[#A5B4FC]">
                {stepMatch[1]}
              </span>
              <span className="text-slate-200">{stepMatch[2]}</span>
            </div>
          );
        }

        // Bullet point: starts with → or -
        if (/^(→|-)\s+/.test(trimmed)) {
          const text = trimmed.replace(/^(→|-)\s+/, "");
          return (
            <div key={i} className="flex gap-2 items-start pl-1">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]" />
              <span className="text-slate-200">{text}</span>
            </div>
          );
        }

        // Section header: ends with :
        if (/^[A-Z\s]+:$/.test(trimmed) || /^[A-Z ]+\s\d+:$/.test(trimmed)) {
          return (
            <p key={i} className="font-bold text-[#A5B4FC] text-xs uppercase tracking-wide mt-2">
              {trimmed}
            </p>
          );
        }

        return <p key={i} className="text-slate-200">{trimmed}</p>;
      })}
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex gap-1 py-0.5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Insights tab content ─────────────────────────────────────────────────────

function InsightsTab({
  progress,
  onAskCoach,
}: {
  progress: ReturnType<typeof useProgress>["progress"];
  onAskCoach: () => void;
}) {
  const activityEntries = Object.entries(progress.chapterActivity);
  const completed = activityEntries.filter(([, a]) => a.read && a.quiz && a.cards);
  const weak = activityEntries
    .filter(([, a]) => (a.read || a.quiz || a.cards) && !(a.read && a.quiz && a.cards))
    .slice(0, 5);
  const totalXp = progress.xp;
  const masteredCards = Object.values(progress.cardMastery ?? {}).filter((r) => r.reps >= 3).length;
  const hasActivity = activityEntries.length > 0;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "XP", value: totalXp.toLocaleString(), icon: "⚡", color: "#FBBF24" },
          { label: "Streak", value: `${progress.streak}d`, icon: "🔥", color: "#F97316" },
          { label: "Kuiz", value: progress.quizzesTaken, icon: "🎯", color: "#A78BFA" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-3 text-center"
          >
            <div className="text-lg">{s.icon}</div>
            <div className="font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      {!hasActivity ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-5 text-center">
          <div className="text-3xl mb-2">📚</div>
          <p className="text-sm font-semibold text-white">Mulakan perjalanan belajar!</p>
          <p className="text-xs text-white/40 mt-1">Buka mana-mana bab untuk mula menjejaki kemajuan kamu.</p>
        </div>
      ) : (
        <>
          {/* Completed */}
          {completed.length > 0 && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-3">
              <p className="text-xs font-bold text-emerald-400 mb-2">🏆 Bab Selesai ({completed.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {completed.slice(0, 6).map(([k]) => (
                  <span key={k} className="rounded-lg bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                    {k.split(":").pop()?.trim() ?? k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Weak areas */}
          {weak.length > 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-3">
              <p className="text-xs font-bold text-amber-400 mb-2">⚠️ Perlu Siapkan</p>
              <div className="space-y-1.5">
                {weak.map(([key, a]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-[10px] text-white/60 min-w-0 flex-1 truncate">
                      {key.split(":").pop()?.trim() ?? key}
                    </span>
                    <div className="flex gap-1 shrink-0">
                      {[["N", a.read], ["Q", a.quiz], ["K", a.cards]].map(([lbl, done]) => (
                        <span
                          key={String(lbl)}
                          className={`text-[9px] font-bold rounded px-1 py-0.5 ${
                            done
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/[0.06] text-white/30"
                          }`}
                        >
                          {String(lbl)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mastered cards */}
          {masteredCards > 0 && (
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/8 p-3">
              <p className="text-xs font-bold text-purple-300">🧠 {masteredCards} kad dikuasai dengan spaced repetition</p>
            </div>
          )}
        </>
      )}

      {/* Exam Coach CTA */}
      <button
        onClick={onAskCoach}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-4 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-white">Jana Plan Ulangkaji</p>
            <p className="text-[11px] text-white/60">Cikgu AI akan analisis kemajuan kamu</p>
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CikguAI() {
  const { isOpen, config, pendingMessage, openCikgu, closeCikgu, clearPendingMessage } = useCikgu();
  const { progress } = useProgress();
  const chat = useServerFn(cikguChat);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<QuickTab>("chat");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sentPendingRef = useRef(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const urlSubject = getSubjectFromPath(pathname);

  // Context from CikguContext or fallback to URL detection
  const activeSubjectId = config?.subjectId ?? urlSubject;
  const activeSubjectName = config?.subjectName ?? SUBJECT_LABELS[urlSubject] ?? "Pelajaran";
  const activeMode = config?.mode ?? "general";
  const modeInfo = MODE_LABELS[activeMode] ?? MODE_LABELS.general;

  const suggestions =
    SUBJECT_SUGGESTIONS[activeSubjectId] ?? SUBJECT_SUGGESTIONS.general;

  // Scroll to bottom whenever messages or loading changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // First-visit tooltip
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("cikgu-ai-tip-v2");
    if (!seen) {
      const t = setTimeout(() => setShowTip(true), 2000);
      const t2 = setTimeout(() => {
        setShowTip(false);
        localStorage.setItem("cikgu-ai-tip-v2", "1");
      }, 9000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0 && !pendingMessage) {
      const greeting =
        "Hai! Saya Cikgu AI 👨‍🚀 Boleh tanya saya apa sahaja tentang pelajaran. Nak faham sesuatu konsep, atau perlukan bantuan? Jom belajar sama-sama! 🌟";
      setMessages([{ role: "assistant", content: greeting, ts: Date.now() }]);
    }
  }, [isOpen, messages.length, pendingMessage]);

  // Auto-send pending message (e.g. from quiz wrong-answer trigger)
  useEffect(() => {
    if (!isOpen || !pendingMessage || sentPendingRef.current) return;
    sentPendingRef.current = true;
    // Small delay so the panel is visible first
    const t = setTimeout(() => {
      void send(pendingMessage, true);
      clearPendingMessage();
    }, 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pendingMessage]);

  // Reset sent-pending flag when panel closes
  useEffect(() => {
    if (!isOpen) sentPendingRef.current = false;
  }, [isOpen]);

  const send = useCallback(
    async (text?: string, auto?: boolean) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;

      const userMsg: Msg = {
        role: "user",
        content: content.slice(0, 500),
        ts: Date.now(),
        isAutoSent: auto,
      };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);
      setActiveTab("chat");

      try {
        const res = await chat({
          data: {
            messages: next.map(({ role, content: c }) => ({ role, content: c })),
            mode: config?.mode,
            subjectId: config?.subjectId ?? activeSubjectId,
            subjectName: config?.subjectName ?? activeSubjectName,
            chapterKey: config?.chapterKey,
            chapterTitle: config?.chapterTitle,
            lang: config?.lang,
            quizContext: config?.quizContext,
          },
        });
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.reply, ts: Date.now() },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Maaf, ada masalah teknikal. Cuba lagi sekejap ya! 🙏", ts: Date.now() },
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 60);
      }
    },
    [input, loading, messages, chat, config, activeSubjectId, activeSubjectName]
  );

  const askExamCoach = useCallback(() => {
    const summary = buildProgressSummary(progress);
    const q = `Tolong analisis kemajuan belajar saya dan bagi saya pelan ulangkaji yang berkesan.`;
    void chat({
      data: {
        messages: [{ role: "user", content: q }],
        mode: "exam-coach",
        progressSummary: summary,
      },
    }).then((res) => {
      setMessages([
        { role: "user", content: q, ts: Date.now() },
        { role: "assistant", content: res.reply, ts: Date.now() },
      ]);
      setActiveTab("chat");
    });
    setLoading(true);
    setActiveTab("chat");
  }, [progress, chat]);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  const clearChat = () => {
    setMessages([]);
    sentPendingRef.current = false;
  };

  const copyMsg = async (idx: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1400);
    } catch {}
  };

  const fmtTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const openWithTip = () => {
    setShowTip(false);
    if (typeof window !== "undefined") localStorage.setItem("cikgu-ai-tip-v2", "1");
    openCikgu();
  };

  return (
    <>
      {/* ── Floating button ─────────────────────────────────────────────────── */}
      {!isOpen && (
        <div className="mobile-ai-control fixed z-[70] flex flex-col items-end gap-2.5 md:bottom-7 md:right-6">
          {showTip && (
            <div
              className="max-w-[200px] rounded-2xl border border-white/10 bg-[#080E1C]/90 px-4 py-2.5 text-sm font-medium text-white shadow-2xl backdrop-blur-xl animate-fade-up"
              style={{ boxShadow: "0 8px 32px rgba(99,102,241,0.3)" }}
            >
              Ada soalan? Tanya Cikgu AI! 👨‍🚀
            </div>
          )}
          <button
            onClick={openWithTip}
            aria-label="Buka Cikgu AI"
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl text-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-[#8B5CF6]" style={{ animationDuration: "3s" }} />
            <span className="relative z-10">👨‍🚀</span>
          </button>
          <span className="text-[10px] font-bold text-white/40 tracking-wide">Cikgu AI</span>
        </div>
      )}

      {/* ── Chat panel ──────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed z-[70] flex flex-col overflow-hidden rounded-3xl border border-white/[0.09] shadow-2xl backdrop-blur-2xl animate-slide-up"
          style={{
            bottom: "1.5rem",
            right: "1.5rem",
            width: "min(420px, calc(100vw - 2rem))",
            height: "min(640px, calc(100dvh - 5rem))",
            background: "linear-gradient(180deg, #0B1220 0%, #080E1C 100%)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="shrink-0 px-4 py-3 border-b border-white/[0.07]"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xl"
                  style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                >
                  👨‍🚀
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-white">Cikgu AI</span>
                    {/* Mode badge */}
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                      style={{ background: `${modeInfo.color}20`, color: modeInfo.color }}
                    >
                      {modeInfo.icon} {modeInfo.label}
                    </span>
                  </div>
                  {/* Context line */}
                  {(config?.subjectName || config?.chapterTitle) ? (
                    <p className="text-[10px] text-white/40 leading-tight">
                      {[config.subjectName, config.chapterTitle].filter(Boolean).join(" → ")}
                    </p>
                  ) : (
                    <p className="text-[10px] text-white/40 leading-tight">
                      Tanya apa sahaja tentang pelajaran
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white/30 transition-colors hover:bg-white/[0.08] hover:text-white/70"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={closeCikgu}
                  aria-label="Tutup"
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white/30 transition-colors hover:bg-white/[0.08] hover:text-white/70"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ── Tab switcher ── */}
            <div className="mt-3 flex gap-1 rounded-xl bg-white/[0.05] p-1">
              {(
                [
                  { id: "chat",       icon: <GraduationCap className="h-3.5 w-3.5" />, label: "Chat" },
                  { id: "exam-coach", icon: <Target className="h-3.5 w-3.5" />,        label: "Pelan Belajar" },
                  { id: "insights",   icon: <BarChart3 className="h-3.5 w-3.5" />,     label: "Kemajuan" },
                ] as { id: QuickTab; icon: React.ReactNode; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#6366F1] text-white shadow-sm"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Tab: Insights ── */}
          {activeTab === "insights" && (
            <InsightsTab
              progress={progress}
              onAskCoach={askExamCoach}
            />
          )}

          {/* ── Tab: Exam Coach (quick-start) ── */}
          {activeTab === "exam-coach" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <p className="font-bold text-white text-sm">Pelan Ulangkaji Peribadi</p>
                <p className="text-xs text-white/40 mt-1 leading-5">
                  Cikgu AI akan analisis kemajuan kamu dan bina pelan ulangkaji mengikut kelemahan kamu.
                </p>
              </div>

              {[
                {
                  icon: "📅",
                  title: "Plan Harian",
                  desc: "Apa yang patut saya belajar hari ini?",
                  q: "Berikan saya plan ulangkaji untuk hari ini berdasarkan kemajuan saya.",
                },
                {
                  icon: "📊",
                  title: "Analisis Kelemahan",
                  desc: "Topik mana yang saya perlu fokus?",
                  q: "Analisis kelemahan saya dan cadangkan topik yang perlu saya fokus.",
                },
                {
                  icon: "🏆",
                  title: "Strategi Peperiksaan",
                  desc: "Macam mana nak dapat markah tinggi?",
                  q: "Berikan saya strategi untuk mendapat markah tinggi dalam peperiksaan.",
                },
                {
                  icon: "📆",
                  title: "Plan Mingguan",
                  desc: "Rancang jadual belajar seminggu",
                  q: "Bina jadual belajar mingguan yang realistik untuk saya.",
                },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    const summary = buildProgressSummary(progress);
                    const fullQ = `${item.q}\n\n[Data kemajuan saya: ${summary}]`;
                    void send(fullQ);
                  }}
                  className="w-full flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-3.5 text-left transition-all hover:bg-white/[0.08] hover:border-[#6366F1]/30 active:scale-[0.99]"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-[11px] text-white/40">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Tab: Chat ── */}
          {activeTab === "chat" && (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 animate-fade-up ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-sm"
                        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
                      >
                        👨‍🚀
                      </div>
                    )}

                    <div className={`max-w-[78%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                      {/* Bubble */}
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 ${
                          m.role === "user"
                            ? "rounded-br-sm text-white"
                            : "rounded-bl-sm border border-white/[0.07] bg-white/[0.04]"
                        }`}
                        style={
                          m.role === "user"
                            ? { background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }
                            : undefined
                        }
                      >
                        {m.role === "assistant" ? (
                          <CikguMessage content={m.content} />
                        ) : (
                          <p className="text-sm leading-6">{m.content}</p>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-1 px-1">
                        {m.role === "assistant" && (
                          <>
                            <span className="text-[10px] font-semibold" style={{ color: modeInfo.color }}>
                              Cikgu AI
                            </span>
                            <button
                              onClick={() => void copyMsg(i, m.content)}
                              className="flex items-center gap-0.5 text-[10px] text-white/30 hover:text-white/60 transition-colors"
                            >
                              <Copy className="h-2.5 w-2.5" />
                              {copiedIdx === i ? "Copied!" : "Copy"}
                            </button>
                          </>
                        )}
                        <span className="text-[10px] text-white/25">{fmtTime(m.ts)}</span>
                      </div>
                    </div>

                    {m.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-sm">
                        👤
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex gap-2 justify-start animate-fade-up">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-sm"
                      style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
                    >
                      👨‍🚀
                    </div>
                    <div className="rounded-2xl rounded-bl-sm border border-white/[0.07] bg-white/[0.04] px-4 py-3">
                      <TypingDots />
                    </div>
                  </div>
                )}

                {/* Suggestions (shown when few messages) */}
                {messages.length <= 1 && !loading && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-1">
                      Soalan cadangan
                    </p>
                    {suggestions.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => void send(s.q)}
                        className="w-full flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-left text-sm text-white/60 transition-all hover:bg-white/[0.08] hover:text-white hover:border-[#6366F1]/30 active:scale-[0.99]"
                      >
                        <Lightbulb className="h-3.5 w-3.5 shrink-0 text-[#FBBF24]" />
                        {s.label}
                      </button>
                    ))}

                    {/* Quick actions */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => void send("Tolong bagi saya soalan latihan ringkas tentang topik yang sedang saya belajar.")}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] py-2 text-[11px] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Test Me
                      </button>
                      <button
                        onClick={() => {
                          void send("Boleh bagi tips ringkas untuk ingat konsep-konsep penting?");
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] py-2 text-[11px] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white"
                      >
                        <Zap className="h-3 w-3" />
                        Tips Cepat
                      </button>
                      <button
                        onClick={() => setActiveTab("exam-coach")}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] py-2 text-[11px] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white"
                      >
                        <BookOpen className="h-3 w-3" />
                        Plan Exam
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Input area ── */}
              <div className="shrink-0 border-t border-white/[0.07] p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, 500))}
                    onKeyDown={onKeyDown}
                    placeholder="Tanya Cikgu AI..."
                    rows={1}
                    maxLength={500}
                    className="flex-1 resize-none rounded-2xl border border-white/[0.08] bg-white/[0.05] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#6366F1]/50 focus:outline-none max-h-28"
                    style={{ scrollbarWidth: "none" }}
                  />
                  <button
                    onClick={() => void send()}
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                    style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
                    aria-label="Hantar"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <span className="text-[9px] text-white/20">
                    Enter to send · Shift+Enter for new line
                  </span>
                  <span className="text-[9px] text-white/20">{input.length}/500</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Minimise chevron when open on mobile */}
      {isOpen && (
        <button
          onClick={closeCikgu}
          className="fixed bottom-[calc(min(640px,calc(100dvh-5rem))+2rem)] right-6 z-[71] hidden h-6 w-6 items-center justify-center rounded-full bg-white/10 md:flex"
          aria-label="Minimise"
        >
          <ChevronDown className="h-4 w-4 text-white/50" />
        </button>
      )}
    </>
  );
}
