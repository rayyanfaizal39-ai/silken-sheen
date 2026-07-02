import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Brain,
  Globe2,
  Target,
  BookOpen,
  MessageCircle,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Circle,
  Send,
  Rocket,
  Landmark,
  FlaskConical,
  Sigma,
  Telescope,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getRank, type SpaceRank } from "@/hooks/use-progress";
import {
  AMAZING_FACTS,
  CHALLENGE_QUESTION,
  MISSION_PROGRESS,
  CHAT_DEMO,
  DISCOVERY_TOPICS,
  DISCOVERY_CONTENT,
} from "./cikguMockData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useReadAloud, type ReadAloudChunk } from "@/hooks/use-read-aloud";

type View = "home" | "fact" | "challenge" | "mission" | "chat" | "discovery" | "knowledge";

interface KnowledgeCard {
  id: string;
  title: string;
  category: string | null;
  content: string;
  reflection: string | null;
  subject: string | null;
  form: string | null;
  chapter: string | null;
  reading_time: number | null;
}

const DISCOVERY_ICON = {
  rocket: Rocket,
  castle: Landmark,
  flask: FlaskConical,
  globe: Globe2,
  sigma: Sigma,
};

interface CikguAIPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rankImage: string;
  rank: SpaceRank;
  studentName?: string;
}

export function CikguAIPanel({ open, onOpenChange, rankImage, rank }: CikguAIPanelProps) {
  const [view, setView] = useState<View>("home");
  const [factIndex, setFactIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [discoveryTopic, setDiscoveryTopic] = useState<string>("space");
  const [voiceOn, setVoiceOn] = useState(true);
  const readAloud = useReadAloud();

  const speak = useCallback(
    (lines: (string | null | undefined)[]) => {
      if (!voiceOn || !readAloud.supported) return;
      const chunks: ReadAloudChunk[] = lines
        .filter((line): line is string => !!line)
        .map((text, i) => ({ id: `cikgu-${i}`, text }));
      readAloud.play(chunks, "en");
    },
    [voiceOn, readAloud],
  );

  const toggleVoice = () => {
    setVoiceOn((was) => {
      if (was) readAloud.stop();
      return !was;
    });
  };

  const goHome = () => setView("home");

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      readAloud.stop();
      setView("home");
      setSelectedChoice(null);
    }
  };

  // Cikgu "speaks" its own dialogue as the student moves through the panel —
  // a short acknowledgment plus the view's content, like a voice assistant.
  // Manual browser TTS only (no paid voice API), and only ever triggered by
  // the student's own navigation, never on a timer.
  useEffect(() => {
    if (!open) return;
    if (view === "home") {
      speak([
        "Welcome back, Commander!",
        "I'm Cikgu AI. I'm here to make learning more exciting.",
        "What would you like to explore today?",
      ]);
    } else if (view === "fact") {
      const fact = AMAZING_FACTS[factIndex];
      speak(["Here's something amazing!", fact.title, fact.body]);
    } else if (view === "challenge") {
      speak(["On it.", CHALLENGE_QUESTION.question]);
    } else if (view === "mission") {
      const m = MISSION_PROGRESS;
      speak(["Let's check your mission progress.", `${m.subject}, ${m.form}, ${m.chapter}.`]);
    } else if (view === "chat") {
      speak(["Sure, let's chat.", "Full conversations are coming soon — here's a preview."]);
    } else if (view === "discovery") {
      const content = DISCOVERY_CONTENT[discoveryTopic] ?? DISCOVERY_CONTENT.space;
      speak(["Great choice!", content.title, content.body]);
    }
    // "knowledge" is intentionally not spoken here — KnowledgeView owns its
    // own speech once the (async) card actually loads, so the student never
    // hears a placeholder line get cut off mid-sentence by the real content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, factIndex, discoveryTopic, open]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "w-full sm:max-w-full p-0 border-l border-white/10 overflow-hidden",
          "sm:w-[440px] sm:rounded-l-3xl",
          "flex flex-col",
        )}
        style={{
          background:
            "linear-gradient(165deg, rgba(20,16,42,0.96) 0%, rgba(30,20,60,0.96) 45%, rgba(15,23,55,0.97) 100%)",
          backdropFilter: "blur(28px)",
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto px-5 pb-8 pt-6 sm:px-6">
          <Header rank={rank} voiceOn={voiceOn} voiceSupported={readAloud.supported} onToggleVoice={toggleVoice} />

          {view === "home" && (
            <HomeView
              rankImage={rankImage}
              rank={rank}
              onSelect={(v) => {
                setSelectedChoice(null);
                setView(v);
              }}
              discoveryTopic={discoveryTopic}
              onDiscoveryPick={(id) => {
                setDiscoveryTopic(id);
                setView("discovery");
              }}
            />
          )}

          {view === "fact" && (
            <FactView
              fact={AMAZING_FACTS[factIndex]}
              onAnother={() => setFactIndex((i) => (i + 1) % AMAZING_FACTS.length)}
              onBack={goHome}
            />
          )}

          {view === "challenge" && (
            <ChallengeView
              selected={selectedChoice}
              onSelect={setSelectedChoice}
              onBack={goHome}
            />
          )}

          {view === "mission" && <MissionView onBack={goHome} />}

          {view === "chat" && <ChatView onBack={goHome} />}

          {view === "discovery" && (
            <DiscoveryView topicId={discoveryTopic} onBack={goHome} />
          )}

          {view === "knowledge" && <KnowledgeView onBack={goHome} speak={speak} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Header({
  rank,
  voiceOn,
  voiceSupported,
  onToggleVoice,
}: {
  rank: SpaceRank;
  voiceOn: boolean;
  voiceSupported: boolean;
  onToggleVoice: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-[#A78BFA]" aria-hidden />
          <span className="text-base font-bold text-white">Cikgu AI</span>
          <span className="relative flex h-2 w-2" aria-label="Online">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
        </div>
        <p className="mt-0.5 text-xs text-white/55">Personal Learning Companion</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {voiceSupported && (
          <button
            type="button"
            onClick={onToggleVoice}
            aria-label={voiceOn ? "Mute Cikgu AI's voice" : "Unmute Cikgu AI's voice"}
            aria-pressed={voiceOn}
            title={voiceOn ? "Voice on" : "Voice off"}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors",
              voiceOn
                ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-[#C4B5FD]"
                : "border-white/10 bg-white/[0.04] text-white/40",
            )}
          >
            {voiceOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        )}
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80"
          style={{ background: `${rank.color}26`, border: `1px solid ${rank.color}55` }}
        >
          {rank.name}
        </span>
      </div>
    </div>
  );
}

function HomeView({
  rankImage,
  rank,
  onSelect,
  discoveryTopic,
  onDiscoveryPick,
}: {
  rankImage: string;
  rank: SpaceRank;
  onSelect: (v: View) => void;
  discoveryTopic: string;
  onDiscoveryPick: (id: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: rank.glowColor }}
        />
        <img
          src={rankImage}
          alt={rank.name}
          draggable={false}
          className="relative z-10 h-28 w-auto object-contain cikgu-float"
        />
      </div>

      <div className="glass-strong mb-5 rounded-2xl border border-white/10 p-4 text-center">
        <p className="text-sm font-bold text-white">Welcome back, Commander!</p>
        <p className="mt-1.5 text-xs leading-relaxed text-white/65">
          I'm Cikgu AI. I'm here to make learning more exciting. What would you like to explore
          today?
        </p>
      </div>

      <div className="grid gap-2.5">
        <ActionCard
          icon={Brain}
          label="Explain Today's Lesson"
          onClick={() => onSelect("mission")}
        />
        <ActionCard
          icon={Globe2}
          label="Tell Me Something Amazing"
          onClick={() => onSelect("fact")}
        />
        <ActionCard icon={Target} label="Challenge Me" onClick={() => onSelect("challenge")} />
        <ActionCard
          icon={BookOpen}
          label="Continue My Mission"
          onClick={() => onSelect("mission")}
        />
        <ActionCard icon={MessageCircle} label="Ask Me Anything" onClick={() => onSelect("chat")} />
        <ActionCard icon={Telescope} label="Mission Intel" onClick={() => onSelect("knowledge")} />
      </div>

      <p className="mb-2.5 mt-6 text-xs font-semibold uppercase tracking-wider text-white/45">
        Today's Discovery
      </p>
      <div className="-mx-1 flex gap-2.5 overflow-x-auto pb-1 pl-1 pr-1">
        {DISCOVERY_TOPICS.map((topic) => {
          const Icon = DISCOVERY_ICON[topic.icon];
          const active = topic.id === discoveryTopic;
          return (
            <button
              key={topic.id}
              onClick={() => onDiscoveryPick(topic.id)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200",
                "hover:-translate-y-0.5 hover:bg-white/10 active:scale-95",
                active && "border-[#8B5CF6]/50 bg-[#8B5CF6]/15",
              )}
            >
              <Icon className="h-5 w-5 text-[#C4B5FD]" aria-hidden />
              <span className="text-[11px] font-medium text-white/80">{topic.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Brain;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-[#8B5CF6]/40 hover:bg-white/[0.08] active:scale-[0.98]",
      )}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #2563EB 100%)" }}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden />
      </span>
      <span className="text-sm font-semibold text-white">{label}</span>
    </button>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="mb-4 flex items-center gap-1 text-xs font-medium text-white/60 transition-colors hover:text-white"
    >
      <ChevronLeft className="h-4 w-4" aria-hidden />
      Back
    </button>
  );
}

function FactView({
  fact,
  onAnother,
  onBack,
}: {
  fact: { title: string; body: string };
  onAnother: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <BackButton onBack={onBack} />
      <div className="glass-strong rounded-2xl border border-white/10 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-[#C4B5FD]" aria-hidden />
          <span className="text-sm font-bold text-white">Did You Know?</span>
        </div>
        <p className="text-sm font-semibold text-white">{fact.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/65">{fact.body}</p>
      </div>
      <button
        onClick={onAnother}
        className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8B5CF6]/25 active:scale-[0.98]"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        Another Fact
      </button>
    </div>
  );
}

function ChallengeView({
  selected,
  onSelect,
  onBack,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <BackButton onBack={onBack} />
      <div className="glass-strong rounded-2xl border border-white/10 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-[#C4B5FD]" aria-hidden />
          <p className="text-sm font-bold text-white">{CHALLENGE_QUESTION.question}</p>
        </div>
        <div className="grid gap-2">
          {CHALLENGE_QUESTION.options.map((option, i) => {
            const isChosen = selected === i;
            const isCorrect = i === CHALLENGE_QUESTION.correctIndex;
            return (
              <button
                key={option}
                onClick={() => onSelect(i)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm font-medium text-white/85 transition-all duration-200",
                  "hover:border-[#8B5CF6]/40 hover:bg-white/[0.08] active:scale-[0.98]",
                  isChosen && isCorrect && "border-emerald-400/60 bg-emerald-400/15 text-white",
                  isChosen && !isCorrect && "border-rose-400/60 bg-rose-400/15 text-white",
                )}
              >
                {isChosen ? (
                  <CheckCircle2
                    className={cn("h-4 w-4", isCorrect ? "text-emerald-400" : "text-rose-400")}
                    aria-hidden
                  />
                ) : (
                  <Circle className="h-4 w-4 text-white/30" aria-hidden />
                )}
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MissionView({ onBack }: { onBack: () => void }) {
  const m = MISSION_PROGRESS;
  return (
    <div className="flex flex-1 flex-col">
      <BackButton onBack={onBack} />
      <div className="glass-strong rounded-2xl border border-white/10 p-5">
        <div className="mb-1 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#C4B5FD]" aria-hidden />
          <p className="text-sm font-bold text-white">{m.subject}</p>
        </div>
        <p className="mb-4 text-xs text-white/55">
          {m.form} &middot; {m.chapter}
        </p>
        <div className="space-y-2">
          <MissionRow label="Notes" done={m.notesDone} />
          <MissionRow label="Quiz" done={m.quizDone} />
          <MissionRow label="Flashcards" done={m.flashcardsDone} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button className="rounded-2xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-3 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#8B5CF6]/25 active:scale-[0.98]">
          Continue Quiz
        </button>
        <button className="rounded-2xl border border-[#2563EB]/40 bg-[#2563EB]/15 px-3 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#2563EB]/25 active:scale-[0.98]">
          Continue Flashcards
        </button>
      </div>
    </div>
  );
}

function MissionRow({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3.5 py-2.5">
      <span className="text-sm text-white/80">{label}</span>
      <span
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold",
          done ? "text-emerald-400" : "text-amber-300",
        )}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <Circle className="h-3.5 w-3.5" aria-hidden />}
        {done ? "Done" : "Pending"}
      </span>
    </div>
  );
}

function ChatView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <BackButton onBack={onBack} />
      <div className="flex-1 space-y-3 overflow-y-auto">
        {CHAT_DEMO.map((msg, i) => (
          <div
            key={i}
            className={cn("flex", msg.from === "student" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                msg.from === "student"
                  ? "bg-[#2563EB]/30 text-white"
                  : "glass-strong border border-white/10 text-white/90",
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <input
          disabled
          placeholder="AI coming soon"
          className="flex-1 bg-transparent text-sm text-white/40 placeholder:text-white/40 focus:outline-none"
        />
        <Send className="h-4 w-4 text-white/30" aria-hidden />
      </div>
    </div>
  );
}

function DiscoveryView({ topicId, onBack }: { topicId: string; onBack: () => void }) {
  const content = useMemo(
    () => DISCOVERY_CONTENT[topicId] ?? DISCOVERY_CONTENT.space,
    [topicId],
  );
  return (
    <div className="flex flex-1 flex-col">
      <BackButton onBack={onBack} />
      <div className="glass-strong rounded-2xl border border-white/10 p-5">
        <p className="text-sm font-bold text-white">{content.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/65">{content.body}</p>
      </div>
    </div>
  );
}

function KnowledgeView({
  onBack,
  speak,
}: {
  onBack: () => void;
  speak: (lines: (string | null | undefined)[]) => void;
}) {
  const [card, setCard] = useState<KnowledgeCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const fetchCard = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setEmpty(true);
      speak(["Mission intel isn't ready yet. Check back after your next mission."]);
      return;
    }
    setLoading(true);
    setEmpty(false);
    try {
      const { data, error } = await supabase
        .from("knowledge_engine")
        .select("id, title, category, content, reflection, subject, form, chapter, reading_time")
        .eq("published", true);

      if (error || !data || data.length === 0) {
        setCard(null);
        setEmpty(true);
        speak(["Mission intel isn't ready yet. Check back after your next mission."]);
      } else {
        const pick = data[Math.floor(Math.random() * data.length)] as KnowledgeCard;
        setCard(pick);
        speak(["Here's your mission intel.", pick.title, pick.content]);
      }
    } catch {
      setCard(null);
      setEmpty(true);
      speak(["Mission intel isn't ready yet. Check back after your next mission."]);
    } finally {
      setLoading(false);
    }
  }, [speak]);

  useEffect(() => {
    fetchCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <BackButton onBack={onBack} />

      {loading && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
          <span className="relative flex h-8 w-8">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-50" />
            <span className="relative inline-flex h-8 w-8 rounded-full bg-[#8B5CF6]/30" />
          </span>
          <p className="text-sm text-white/60">Cikgu AI is thinking…</p>
        </div>
      )}

      {!loading && empty && (
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <Telescope className="mb-3 h-8 w-8 text-white/20" aria-hidden />
          <p className="text-sm font-semibold text-white/60">Mission Intel coming soon.</p>
          <p className="mt-1 text-xs text-white/35">Check back after your next mission.</p>
        </div>
      )}

      {!loading && card && (
        <>
          <div className="glass-strong rounded-2xl border border-white/10 p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {card.subject && (
                <span className="rounded-full bg-[#8B5CF6]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#C4B5FD]">
                  {card.subject}
                </span>
              )}
              {card.form && (
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
                  {card.form}
                </span>
              )}
              {card.category && (
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
                  {card.category}
                </span>
              )}
              {card.reading_time && (
                <span className="ml-auto text-[10px] text-white/40">{card.reading_time} min read</span>
              )}
            </div>

            <p className="text-sm font-bold text-white">{card.title}</p>
            {card.chapter && (
              <p className="mt-0.5 text-xs text-white/45">{card.chapter}</p>
            )}
            <p className="mt-3 text-xs leading-relaxed text-white/70">{card.content}</p>

            {card.reflection && (
              <div className="mt-4 rounded-xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C4B5FD]">
                  Reflect
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{card.reflection}</p>
              </div>
            )}
          </div>

          <button
            onClick={fetchCard}
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8B5CF6]/25 active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Next Discovery
          </button>
        </>
      )}
    </div>
  );
}
