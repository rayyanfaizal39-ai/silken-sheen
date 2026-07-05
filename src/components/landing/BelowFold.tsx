import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Check,
  GraduationCap,
  Languages,
  Bot,
  Trophy,
  Compass,
  Flame,
  Target,
  TrendingUp,
  LineChart,
} from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useSignInModal } from "@/context/sign-in-modal";
import { SiteFooter } from "@/components/SiteFooter";
import parentsDashboard from "@/assets/parents-dashboard.png.asset.json";
import cikguAiImage from "@/assets/academy-robot.webp.asset.json";
import heroIntro from "@/assets/hero-intro.mp4.asset.json";
import toolNotes from "@/assets/tool-notes.png";
import toolFlashcards from "@/assets/tool-flashcards.png";
import toolQuizzes from "@/assets/tool-quizzes.png";
import toolMindmaps from "@/assets/tool-mindmaps.png";
import toolMissions from "@/assets/tool-missions.png";

/* ---------------- Shared helpers (local copy) ---------------- */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90 bg-primary/10 ring-1 ring-primary/30">
      <Sparkles className="w-3 h-3" />
      {children}
    </span>
  );
}

function PrimaryCta({
  to,
  onClick,
  children,
}: {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const cls =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)] hover:scale-[1.03] transition-transform";
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

/* ---------------- Center Intro Video ---------------- */

function CenterIntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative w-56 h-56 md:w-80 md:h-80">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.55), rgba(139,92,246,0.25) 55%, transparent 75%)",
        }}
      />
      <div className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-white/15 shadow-[0_20px_60px_rgba(59,130,246,0.45)] bg-black">
        <video
          ref={videoRef}
          src={heroIntro.url}
          className="w-full h-full object-cover"
          playsInline
          preload="none"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play intro video"
            className="absolute inset-0 flex items-center justify-center group focus:outline-none"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
            />
            <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 shadow-[0_10px_40px_rgba(59,130,246,0.6)] transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-11 md:h-11 text-slate-900 translate-x-[2px]" fill="currentColor" aria-hidden>
                <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.8-6.86a1 1 0 000-1.69L9.54 4.29A1 1 0 008 5.14z" />
              </svg>
            </span>
          </button>
        )}
        {playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Pause intro video"
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center ring-1 ring-white/20 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Why AcadeMY ---------------- */

const WHY = [
  { icon: GraduationCap, title: "KSSM Aligned", body: "Every note, quiz and mind map maps directly to the latest DSKP syllabus." },
  { icon: Languages, title: "BM & DLP", body: "Toggle Bahasa Melayu or DLP per topic — same quality, your language." },
  { icon: Bot, title: "Your Intelligent Companion", body: "Your intelligent learning companion—explaining, guiding, and motivating you every step of your journey." },
  { icon: Trophy, title: "Gamified XP", body: "Earn XP, evolve your companion, climb ranks — studying that actually sticks." },
];

function WhyAcademy() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Why AcadeMY?</SectionLabel>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Built for Malaysian students
          </h2>
          <p className="mt-4 text-white/60">
            A study platform that feels like a game, with content teachers actually trust.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="group relative rounded-2xl p-6 bg-white/[0.03] ring-1 ring-white/10 hover:ring-primary/40 hover:bg-white/[0.05] transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 ring-1 ring-white/10 flex items-center justify-center mb-4">
                <w.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-display text-lg font-semibold text-white">{w.title}</div>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Learning Tools (orbit) ---------------- */

const TOOLS = [
  { img: toolNotes, label: "Notes", desc: "Study with clear notes", to: "/notes", glow: "rgba(251,146,60,0.55)" },
  { img: toolFlashcards, label: "Flashcards", desc: "Memorize & recall", to: "/flashcards", glow: "rgba(96,165,250,0.55)" },
  { img: toolQuizzes, label: "Quizzes", desc: "Test your knowledge", to: "/quizzes", glow: "rgba(52,211,153,0.55)" },
  { img: toolMindmaps, label: "Mind Maps", desc: "Visualize concepts", to: "/mindmaps", glow: "rgba(168,85,247,0.55)" },
  { img: toolMissions, label: "Missions", desc: "Earn rewards", to: "/dashboard", glow: "rgba(248,113,113,0.55)" },
] as const;

function LearningTools() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const planetRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const orbitTween = gsap.to(orbit, {
      rotation: 360,
      duration: 40,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });
    const counterTweens = planetRefs.current.map((el, i) => {
      if (!el) return null;
      const t = gsap.to(el, {
        rotation: -360,
        duration: 40,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(el, {
        y: "+=10",
        duration: 2.2 + (i % 3) * 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.15,
      });
      return t;
    });
    return () => {
      orbitTween.kill();
      counterTweens.forEach((t) => t?.kill());
    };
  }, []);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const tweens = gsap.getTweensOf(orbit);
    tweens.forEach((t) => (hovered !== null ? t.pause() : t.resume()));
    planetRefs.current.forEach((el) => {
      if (!el) return;
      gsap.getTweensOf(el).forEach((t) => {
        if ((t.vars as { rotation?: number }).rotation === -360) {
          hovered !== null ? t.pause() : t.resume();
        }
      });
    });
  }, [hovered]);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 50%, rgba(124,58,237,0.22), transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <SectionLabel>Your Learning Universe</SectionLabel>
        <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
          What would you like to do today?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-white/60">
          Choose your mission — five worlds orbit around your journey.
        </p>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[720px]">
          <div aria-hidden className="absolute inset-0 rounded-full border border-white/10" />
          <div aria-hidden className="absolute inset-[8%] rounded-full border border-white/5" />
          <div
            aria-hidden
            className="absolute inset-[18%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.35), rgba(139,92,246,0.05) 60%, transparent 70%)",
            }}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <CenterIntroVideo />
          </div>

          <div ref={orbitRef} className="absolute inset-0">
            {TOOLS.map((t, i) => {
              const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
              const radiusPct = 42;
              const x = 50 + Math.cos(angle) * radiusPct;
              const y = 50 + Math.sin(angle) * radiusPct;
              return (
                <div
                  key={t.label}
                  ref={(el) => { planetRefs.current[i] = el; }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <Link
                    to={t.to}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative flex flex-col items-center"
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-6 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ background: `radial-gradient(closest-side, ${t.glow}, transparent 70%)` }}
                    />
                    <img
                      src={t.img}
                      alt={t.label}
                      loading="lazy"
                      width={160}
                      height={160}
                      className="relative w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="relative mt-2 text-sm md:text-base font-bold text-white">{t.label}</div>
                    <div className="relative text-[11px] text-white/60">{t.desc}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cikgu ---------------- */

const CIKGU = [
  "Explains concepts in simple language",
  "Gives instant feedback on answers",
  "Adapts to your learning style",
  "Available 24/7 across all devices",
];

function CikguSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
        <style>{`
          @keyframes cikguOrbit {
            0%   { transform: translate(0, 0) rotate(0deg); }
            25%  { transform: translate(28px, -22px) rotate(4deg); }
            50%  { transform: translate(0, -40px) rotate(0deg); }
            75%  { transform: translate(-28px, -22px) rotate(-4deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
        `}</style>
        <div className="relative aspect-square max-w-[460px] mx-auto w-full">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(168,85,247,0.55), transparent 70%)",
            }}
          />
          <div className="absolute inset-6 rounded-full ring-2 ring-primary/30 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-12 rounded-full ring-1 ring-accent/25 animate-[spin_45s_linear_infinite_reverse]" />
          <div className="relative h-full w-full flex items-center justify-center">
            <img
              src={cikguAiImage.url}
              alt="Cikgu AI — your friendly study companion"
              className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.55)]"
              style={{ animation: "cikguOrbit 8s ease-in-out infinite" }}
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <SectionLabel>Meet your companion</SectionLabel>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Cikgu AI
          </h2>
          <p className="mt-4 text-white/65 max-w-md">
            A patient, on-syllabus AI tutor that lives inside every note, flashcard and quiz.
          </p>
          <ul className="mt-6 space-y-3">
            {CIKGU.map((c) => (
              <li key={c} className="flex items-start gap-3 text-white/80">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 ring-1 ring-primary/40 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </span>
                <span className="text-sm">{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryCta to="/notes">Try Cikgu AI</PrimaryCta>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Progress preview ---------------- */

function StatCell({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <div className="rounded-2xl p-4 bg-white/[0.03] ring-1 ring-white/10">
      <div className="flex items-center gap-2 text-xs text-white/60">
        <Icon className={`w-4 h-4 ${tint}`} />
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-white tabular-nums">{value}</div>
    </div>
  );
}

function ProgressPreview() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
        <SectionLabel>Track Your Progress</SectionLabel>
        <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
          See yourself level up
        </h2>
        <p className="mt-4 text-white/60 max-w-xl mx-auto">
          XP, streaks and mastery in one cockpit — designed to keep students coming back daily.
        </p>

        <div className="mt-10 rounded-3xl p-6 md:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] ring-1 ring-white/10 backdrop-blur text-left">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Mission cockpit</div>
                <div className="text-xs text-white/50">Form 2 · Science</div>
              </div>
            </div>
            <div className="text-xs text-white/50">Last 7 days</div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <StatCell icon={Flame} label="Streak" value="12 days" tint="text-orange-400" />
            <StatCell icon={Target} label="XP this week" value="1,840" tint="text-primary" />
            <StatCell icon={TrendingUp} label="Mastery" value="78%" tint="text-emerald-400" />
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 bg-white/[0.03] ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>Chapter 3 · Cells</span>
                <span>82%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[82%] bg-gradient-to-r from-primary to-accent" />
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-white/[0.03] ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>Chapter 4 · Coordination</span>
                <span>46%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[46%] bg-gradient-to-r from-emerald-400 to-teal-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Parents ---------------- */

const PARENT_FEATURES = [
  { title: "Weekly progress digest", body: "Email summary every Sunday — XP, mastery and trouble spots." },
  { title: "See what they're studying", body: "Live view of subjects, chapters and time on task." },
];

function ParentsSection() {
  return (
    <section id="parents" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="font-display text-5xl md:text-7xl font-bold text-nova-yellow"
            style={{
              fontFamily: "'Instrument Serif', serif",
              textShadow:
                "0 0 30px rgba(250,204,21,0.35), 0 0 60px rgba(250,204,21,0.18)",
            }}
          >
            Parents <span className="text-white/90">Dashboard</span>
          </div>
          <p className="mt-3 text-white/65">
            Stay in the loop without becoming the homework police.
          </p>
        </div>

        <div className="relative w-full rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
          <img
            src={parentsDashboard.url}
            alt="Parent dashboard preview showing student progress, subject performance and recent activity"
            className="w-full h-auto object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
          <ul className="space-y-5">
            {PARENT_FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="mt-1 w-6 h-6 rounded-full bg-nova-yellow/15 ring-1 ring-nova-yellow/40 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-nova-yellow" />
                </span>
                <div>
                  <div className="text-white font-semibold">{f.title}</div>
                  <div className="text-sm text-white/60 mt-0.5">{f.body}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-3xl p-5 md:p-7 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 ring-1 ring-white/10 backdrop-blur">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCell icon={LineChart} label="Weekly XP" value="3,210" tint="text-primary" />
              <StatCell icon={Compass} label="Subjects active" value="4" tint="text-sky-400" />
              <StatCell icon={Flame} label="Best streak" value="21 days" tint="text-orange-400" />
              <StatCell icon={Trophy} label="Badges" value="14" tint="text-nova-yellow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

const PLANS = [
  {
    name: "Free",
    price: "RM0",
    period: "forever",
    cta: "Start free",
    highlighted: false,
    features: ["All Form 1 subjects", "Notes, flashcards & quizzes", "Basic AI cikgu", "Progress tracking"],
  },
  {
    name: "Cadet",
    price: "RM28",
    period: "/month",
    cta: "Go Cadet",
    highlighted: true,
    badge: "Most popular",
    features: ["All Form 1–3 subjects", "Unlimited AI cikgu", "Mind maps & mock tests", "Parent dashboard", "Priority support"],
  },
  {
    name: "Captain",
    price: "RM68",
    period: "/month",
    cta: "Go Captain",
    highlighted: false,
    features: ["Everything in Cadet", "1-on-1 study coach", "Personalised study plan", "Early access to new content"],
  },
];

function PricingSection() {
  const { open } = useSignInModal();
  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
        <SectionLabel>Choose Your Mission Plan</SectionLabel>
        <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
          Simple, student-friendly pricing
        </h2>
        <p className="mt-4 text-white/60">Cancel anytime. Built for Malaysian families.</p>

        <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-7 ring-1 backdrop-blur ${
                p.highlighted
                  ? "bg-gradient-to-b from-primary/20 to-accent/10 ring-primary/50 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.5)]"
                  : "bg-white/[0.03] ring-white/10"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[11px] font-semibold uppercase tracking-wider">
                  {p.badge}
                </div>
              )}
              <div className="text-sm uppercase tracking-[0.18em] text-white/50">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-white">{p.price}</span>
                <span className="text-sm text-white/50">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                    <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => open()}
                className={`mt-7 w-full px-4 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  p.highlighted
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-white/10 text-white ring-1 ring-white/15"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  const { open } = useSignInModal();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 50%, rgba(168,85,247,0.3), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
          Ready to launch your mission?
        </h2>
        <p className="mt-5 text-white/65 max-w-xl mx-auto">
          Free to start. No card needed. Your AI cikgu is ready when you are.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => open()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-nova-yellow text-[#1a0f2e] text-base font-bold shadow-[0_12px_40px_-8px_rgba(250,204,21,0.8)] hover:scale-[1.05] transition-transform"
          >
            Launch AcadeMY
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Aggregate ---------------- */

export default function BelowFold() {
  return (
    <>
      <WhyAcademy />
      <LearningTools />
      <CikguSection />
      <ProgressPreview />
      <ParentsSection />
      <PricingSection />
      <FinalCta />
      <SiteFooter />
    </>
  );
}
