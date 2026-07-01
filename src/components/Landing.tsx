import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Check,
  Rocket,
  GraduationCap,
  Languages,
  Bot,
  Trophy,
  NotebookPen,
  Layers,
  BrainCircuit,
  ClipboardCheck,
  Compass,
  Flame,
  Target,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { useSignInModal } from "@/context/sign-in-modal";
import { useAuth } from "@/context/auth-context";
import { SiteFooter } from "@/components/SiteFooter";
import { CinematicStars } from "@/components/landing/CinematicStars";
import { WatchIntroVideo } from "@/components/landing/WatchIntroVideo";
import starCaptain from "@/assets/hero-astronaut.png.asset.json";
import parentsDashboard from "@/assets/parents-dashboard.jpg.asset.json";
import cikguAiImage from "@/assets/cikgu-ai.png.asset.json";
import academyCore from "@/assets/academy-astronaut-core.png.asset.json";
import toolNotes from "@/assets/tool-notes.png";
import toolFlashcards from "@/assets/tool-flashcards.png";
import toolQuizzes from "@/assets/tool-quizzes.png";
import toolMindmaps from "@/assets/tool-mindmaps.png";
import toolMissions from "@/assets/tool-missions.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------------- Shared bits ---------------- */

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

function SecondaryCta({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-semibold ring-1 ring-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}

/* ---------------- Top nav ---------------- */

function LandingNav() {
  const { open } = useSignInModal();
  const { user } = useAuth();
  const links = [
    { to: "/subjects", label: "Subjects" },
    { to: "/notes", label: "Cikgu AI" },
    { to: "#parents", label: "Parents", anchor: true },
    { to: "#pricing", label: "Pricing", anchor: true },
  ];
  return (
    <header className="absolute top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-white">Acade</span>
            <span
              className="text-nova-yellow"
              style={{
                textShadow:
                  "0 0 12px rgba(250,204,21,0.7), 0 0 24px rgba(250,204,21,0.4)",
              }}
            >
              MY
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 backdrop-blur">
          {links.map((l) =>
            l.anchor ? (
              <a
                key={l.to}
                href={l.to}
                className="px-4 py-1.5 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-1.5 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {user ? (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-full bg-white text-[#0b0a1f] text-sm font-semibold hover:scale-[1.03] transition-transform"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => open()}
            className="px-4 py-2 rounded-full bg-white text-[#0b0a1f] text-sm font-semibold hover:scale-[1.03] transition-transform"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const { open } = useSignInModal();
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const xpBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = heroCardRef.current;
    const img = heroImgRef.current;
    const glow = glowRef.current;
    const badge = badgeRef.current;
    const xp = xpBarRef.current;
    if (!card || !img) return;

    const ctx = gsap.context(() => {
      // Entrance — card fades in
      gsap.from(card, {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
      });

      // Astronaut zoom-in from tiny to full size
      gsap.from(img, {
        scale: 0.15,
        opacity: 0,
        duration: 1.6,
        ease: "power4.out",
        delay: 0.2,
      });

      if (badge) {
        gsap.from(badge, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(2)",
        });
      }
      if (xp) {
        gsap.from(xp, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          delay: 0.9,
          ease: "power2.out",
        });
      }

      // Continuous float — more dramatic
      gsap.to(img, {
        y: -40,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(img, {
        rotation: 2.5,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 60%",
      });

      // Glow breathing
      if (glow) {
        gsap.to(glow, {
          opacity: 1,
          scale: 1.08,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Mouse parallax
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(img, {
          x: x * 24,
          rotateY: x * 6,
          rotateX: -y * 6,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(img, {
          x: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* glow blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(168,85,247,0.35), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.25), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <SectionLabel>KSSM-aligned · Form 1–3</SectionLabel>
          <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40 hover:text-white/70 cursor-pointer transition-colors bg-transparent border-0 p-0"
              >
                Form 4–5 (Coming Soon)
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#0b0a1f] border-white/10 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-semibold">
                  Form 4 &amp; 5 — Coming Soon
                </DialogTitle>
                <DialogDescription className="text-white/60 text-sm">
                  We are expanding AcadeMY to cover upper secondary KSSM
                  subjects.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-white/70">
                <p>Planned subjects include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sains / Science (BM &amp; DLP)</li>
                  <li>Sejarah</li>
                  <li>Geografi</li>
                  <li>Matematik / Mathematics</li>
                  <li>Bahasa Melayu &amp; English</li>
                </ul>
                <p className="pt-2">
                  Target release:{" "}
                  <span className="text-white font-medium">Q4 2025</span>
                </p>
                <p className="text-xs text-white/40">
                  Sign up and we will notify you the moment Form 4–5 goes live.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.02] tracking-tight text-white">
            Malaysia's
            <br />
            <span className="bg-gradient-to-r from-white via-[#c9b8ff] to-accent bg-clip-text text-transparent">
              Interstellar
            </span>
            <br />
            Learning Platform
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
            Notes, flashcards, quizzes and mind maps in BM &amp; DLP — powered
            by your own AI cikgu. Level up like a game, master KSSM like a pro.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryCta onClick={() => open()}>
              Start your mission
            </PrimaryCta>
            <SecondaryCta to="/subjects">Explore subjects</SecondaryCta>
            <WatchIntroVideo />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> KSSM aligned
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-sky-400" /> BM &amp; DLP
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-nova-yellow" /> Free to start
            </div>
          </div>
        </div>

        {/* Cinematic floating astronaut — blended into background */}
        <div className="relative group [perspective:1400px]">
          {/* atmospheric glow behind */}
          <div
            ref={glowRef}
            aria-hidden
            className="absolute -inset-10 blur-3xl opacity-90 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 55% at 50% 55%, rgba(255,140,60,0.45), transparent 70%), radial-gradient(45% 45% at 30% 30%, rgba(168,85,247,0.35), transparent 70%), radial-gradient(40% 40% at 75% 75%, rgba(250,204,21,0.28), transparent 70%)",
            }}
          />
          {/* soft ground haze */}
          <div
            aria-hidden
            className="absolute inset-x-[-10%] bottom-[-6%] h-40 blur-2xl opacity-70 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 100%, rgba(255,120,40,0.55), transparent 70%)",
            }}
          />

          <div
            ref={heroCardRef}
            className="relative aspect-[4/5] [transform-style:preserve-3d]"
          >
            <img
              ref={heroImgRef}
              src={starCaptain.url}
              alt="AcadeMY astronaut floating on an alien world"
              className="absolute inset-0 w-full h-full object-contain object-center will-change-transform drop-shadow-[0_40px_60px_rgba(255,110,40,0.35)]"
              draggable={false}
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 78% at 50% 48%, #000 55%, rgba(0,0,0,0.85) 70%, transparent 92%)",
                maskImage:
                  "radial-gradient(ellipse 70% 78% at 50% 48%, #000 55%, rgba(0,0,0,0.85) 70%, transparent 92%)",
              }}
            />

            {/* Level badge */}
            <div
              ref={badgeRef}
              className="absolute top-6 left-2 flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md ring-1 ring-nova-yellow/40 px-3 py-1.5"
            >
              <span className="grid place-items-center w-6 h-6 rounded-full bg-nova-yellow text-[#1a0f2e] text-[11px] font-black shadow-[0_0_18px_rgba(250,204,21,0.6)]">
                18
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-nova-yellow">
                Star Captain
              </span>
            </div>

            {/* XP bar */}
            <div className="absolute inset-x-0 bottom-2 px-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/70">
                <span>Nova · Lvl 18</span>
                <span className="text-nova-yellow">12,480 XP</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  ref={xpBarRef}
                  className="h-full rounded-full bg-gradient-to-r from-nova-yellow via-amber-300 to-nova-yellow shadow-[0_0_14px_rgba(250,204,21,0.7)]"
                  style={{ width: "72%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why AcadeMY ---------------- */

const WHY = [
  {
    icon: GraduationCap,
    title: "KSSM Aligned",
    body: "Every note, quiz and mind map maps directly to the latest DSKP syllabus.",
  },
  {
    icon: Languages,
    title: "BM & DLP",
    body: "Toggle Bahasa Melayu or DLP per topic — same quality, your language.",
  },
  {
    icon: Bot,
    title: "AI Cikgu",
    body: "Stuck on a concept? Ask Cikgu AI for a friendly, on-topic explanation.",
  },
  {
    icon: Trophy,
    title: "Gamified XP",
    body: "Earn XP, evolve your companion, climb ranks — studying that actually sticks.",
  },
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
            A study platform that feels like a game, with content teachers
            actually trust.
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
              <div className="font-display text-lg font-semibold text-white">
                {w.title}
              </div>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Powerful Learning Tools (orbiting planets) ---------------- */

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
    // Rotate the whole orbit ring
    const orbitTween = gsap.to(orbit, {
      rotation: 360,
      duration: 40,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });
    // Counter-rotate each planet so icons stay upright + add float
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
    // Pause/resume orbit rotation on hover
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

        {/* Orbit stage */}
        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[720px]">
          {/* Orbit rings */}
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

          {/* Center: AcadeMY astronaut core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-3xl opacity-70 animate-pulse"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.55), rgba(139,92,246,0.25) 55%, transparent 75%)",
                }}
              />
              <img
                src={academyCore.url}
                alt="AcadeMY astronaut core"
                loading="lazy"
                width={320}
                height={320}
                className="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.55)]"
              />
            </div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              AcadeMY Core
            </div>
          </div>


          {/* Rotating orbit with planets */}
          <div ref={orbitRef} className="absolute inset-0">
            {TOOLS.map((t, i) => {
              const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
              const radiusPct = 42; // % of half-container
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
                    <div className="relative mt-2 text-sm md:text-base font-bold text-white">
                      {t.label}
                    </div>
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


/* ---------------- Cikgu AI ---------------- */

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
        {/* Cikgu AI character */}
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
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.55)] animate-[float_6s_ease-in-out_infinite]"
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
            A patient, on-syllabus AI tutor that lives inside every note,
            flashcard and quiz.
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
      <div className="mt-2 text-2xl font-bold text-white tabular-nums">
        {value}
      </div>
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
          XP, streaks and mastery in one cockpit — designed to keep students
          coming back daily.
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
            <StatCell
              icon={Flame}
              label="Streak"
              value="12 days"
              tint="text-orange-400"
            />
            <StatCell
              icon={Target}
              label="XP this week"
              value="1,840"
              tint="text-primary"
            />
            <StatCell
              icon={TrendingUp}
              label="Mastery"
              value="78%"
              tint="text-emerald-400"
            />
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
  {
    title: "Weekly progress digest",
    body: "Email summary every Sunday — XP, mastery and trouble spots.",
  },
  {
    title: "See what they're studying",
    body: "Live view of subjects, chapters and time on task.",
  },
];

function ParentsSection() {
  return (
    <section id="parents" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="font-display text-5xl md:text-7xl font-bold text-nova-yellow"
            style={{
              fontFamily: "'Instrument Serif', serif",
              textShadow:
                "0 0 30px rgba(250,204,21,0.35), 0 0 60px rgba(250,204,21,0.18)",
            }}
          >
            Parents
          </div>
          <p className="mt-3 text-white/65 max-w-md">
            Stay in the loop without becoming the homework police.
          </p>
          <ul className="mt-8 space-y-5">
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
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/10">
          <img
            src={parentsDashboard.url}
            alt="Parent watching their child's learning dashboard among the clouds"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,22,0.85) 0%, rgba(5,8,22,0.1) 45%, rgba(5,8,22,0) 70%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-nova-yellow/90">
              Parent dashboard
            </div>
            <div className="mt-1 font-semibold text-white text-lg">
              Confidence, at a glance.
            </div>
          </div>
        </div>
      </div>

      {/* Analytics band */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-10">
        <div className="rounded-3xl p-5 md:p-7 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 ring-1 ring-white/10 backdrop-blur">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCell
              icon={LineChart}
              label="Weekly XP"
              value="3,210"
              tint="text-primary"
            />
            <StatCell
              icon={Compass}
              label="Subjects active"
              value="4"
              tint="text-sky-400"
            />
            <StatCell
              icon={Flame}
              label="Best streak"
              value="21 days"
              tint="text-orange-400"
            />
            <StatCell
              icon={Trophy}
              label="Badges"
              value="14"
              tint="text-nova-yellow"
            />
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
    features: [
      "All Form 1 subjects",
      "Notes, flashcards & quizzes",
      "Basic AI cikgu",
      "Progress tracking",
    ],
  },
  {
    name: "Cadet",
    price: "RM28",
    period: "/month",
    cta: "Go Cadet",
    highlighted: true,
    badge: "Most popular",
    features: [
      "All Form 1–3 subjects",
      "Unlimited AI cikgu",
      "Mind maps & mock tests",
      "Parent dashboard",
      "Priority support",
    ],
  },
  {
    name: "Captain",
    price: "RM68",
    period: "/month",
    cta: "Go Captain",
    highlighted: false,
    features: [
      "Everything in Cadet",
      "1-on-1 study coach",
      "Personalised study plan",
      "Early access to new content",
    ],
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
        <p className="mt-4 text-white/60">
          Cancel anytime. Built for Malaysian families.
        </p>

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
              <div className="text-sm uppercase tracking-[0.18em] text-white/50">
                {p.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-white">
                  {p.price}
                </span>
                <span className="text-sm text-white/50">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-white/75"
                  >
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
          <PrimaryCta onClick={() => open()}>
            Launch AcadeMY
          </PrimaryCta>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

export function Landing() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* starfield base */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(900px 500px at -10% 30%, rgba(59,130,246,0.12), transparent 60%), #050816",
        }}
      />
      <CinematicStars />
      <LandingNav />
      <Hero />
      <WhyAcademy />
      <LearningTools />
      <CikguSection />
      <ProgressPreview />
      <ParentsSection />
      <PricingSection />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}
