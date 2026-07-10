import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Calculator,
  Atom,
  Scroll,
  Globe2,
  Languages,
  Brain,
  MessageCircle,
  Trophy,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";
import { CinematicStars } from "@/components/landing/CinematicStars";
import { OrbitalBackdrop } from "@/components/home/OrbitalBackdrop";
import floatingAstronaut from "@/assets/hero landing/floating A.png";
import cikguAiRobot from "@/assets/cikgu-ai-robot.png";
import cikguBackground from "@/assets/backgroundcikgu.png";

const SUBJECTS = [
  { id: "bahasa-melayu", title: "Bahasa Melayu", subtitle: "Tatabahasa & karangan", chapters: 24, icon: Languages, thumb: "radial-gradient(circle at 30% 30%,#ff5c8a,#7a1d4a 55%,#12061a)" },
  { id: "english", title: "English", subtitle: "Grammar, essays & literature", chapters: 22, icon: BookOpen, thumb: "radial-gradient(circle at 35% 45%,#34e0c0,#1a6a5a 55%,#06140f)" },
  { id: "mathematics", title: "Mathematics", subtitle: "Algebra, geometry & statistics", chapters: 39, icon: Calculator, thumb: "radial-gradient(circle at 30% 30%,#7c5cff,#3a1d7a 55%,#0a0b1e)" },
  { id: "science", title: "Science", subtitle: "Bio, chemistry & physics", chapters: 26, icon: Atom, thumb: "radial-gradient(circle at 70% 40%,#22d3ee,#1a6a8f 50%,#08131e)" },
  { id: "sejarah", title: "Sejarah", subtitle: "Malaysia & world history", chapters: 30, icon: Scroll, thumb: "radial-gradient(circle at 60% 30%,#f5c518,#8a5a10 55%,#1a1204)" },
  { id: "geography", title: "Geography", subtitle: "Physical & human geography", chapters: 20, icon: Globe2, thumb: "radial-gradient(circle at 35% 45%,#a78bff,#4a2d9a 55%,#0c0a24)" },
];

export function CommandCenterHome() {
  return (
    <div className="relative text-slate-100">
      <OrbitalBackdrop />
      <CinematicStars />

      {/* Motto strip */}
      <div className="relative border-b border-white/[0.06] bg-[#05060f]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300/90">
          <Sparkles className="h-3 w-3" />
          <span>AcadeMY — Built for the Next Generation of Learners</span>
          <Sparkles className="h-3 w-3" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8 space-y-24 py-14 md:py-20">
        <FloatingAstronaut />
        <MissionIntro />
        <FeatureBanner />
        <SubjectsGrid />
        <CikguHelp />
        <SocialProof />
        <NewsletterCTA />
      </div>
    </div>
  );
}

/* ---------------- Floating astronaut ---------------- */

function FloatingAstronaut() {
  return (
    <div className="relative flex justify-center">
      <img
        src={floatingAstronaut}
        alt="AcadeMY astronaut floating in space"
        className="w-40 sm:w-52 md:w-64 drop-shadow-[0_20px_60px_rgba(124,92,255,.45)]"
        style={{ animation: "cc-astro-float 6s ease-in-out infinite" }}
      />
      <style>{`@keyframes cc-astro-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}`}</style>
    </div>
  );
}

/* ---------------- Mission intro ---------------- */

function MissionIntro() {
  return (
    <section className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
        Our mission
      </p>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
        Learning that feels like a mission worth taking.
      </h2>
      <div
        className="mx-auto mt-5 h-1.5 w-32 rounded-full"
        style={{ background: "linear-gradient(90deg,#f5c518,#ff5c8a)" }}
      />
      <p className="mt-6 text-lg leading-relaxed text-slate-400">
        We built AcadeMY for Malaysian students who deserve more than PDFs and dull slides.
        Every chapter is aligned to KSSM, every tool is designed for focus, and every captain
        gets an AI companion that actually explains things.
      </p>
    </section>
  );
}

/* ---------------- Feature banner ---------------- */

function FeatureBanner() {
  const features = [
    { icon: Brain, title: "AcadeMY Brain", body: "Your AI learning engine that understands your progress, detects learning gaps, and guides you to the next mission." },
    { icon: MessageCircle, title: "Cikgu AI", body: "Your intelligent learning companion—explaining concepts, guiding your learning, and motivating you every step of the way." },
    { icon: Trophy, title: "Missions & XP", body: "Quizzes, flashcards and daily challenges turn revision into a game you actually want to open." },
  ];
  return (
    <section
      className="relative overflow-hidden rounded-[26px] border border-white/[0.06] p-6 md:p-10"
      style={{
        background:
          "radial-gradient(80% 120% at 15% 0%,rgba(124,92,255,.35),transparent 55%),radial-gradient(80% 120% at 85% 100%,rgba(34,211,238,.28),transparent 55%),linear-gradient(120deg,#161a3d,#0e1030)",
      }}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:border-violet-400/60 hover:bg-violet-500/[0.08]"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-amber-300"
              style={{
                background:
                  "linear-gradient(160deg,rgba(245,197,24,.16),rgba(124,92,255,.16))",
              }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Subjects grid ---------------- */

function SubjectsGrid() {
  return (
    <section>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Mission board
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
          Pick your next mission
        </h2>
        <div
          className="mx-auto mt-5 h-1.5 w-32 rounded-full"
          style={{ background: "linear-gradient(90deg,#f5c518,#ff5c8a)" }}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.id}
              to="/subjects"
              className="group block rounded-2xl"
            >
              <div className="relative h-56 overflow-hidden rounded-2xl border border-white/[0.08]">
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]"
                  style={{ background: s.thumb }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060f]/70" />
                <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                  {s.chapters} chapters
                </span>
                <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white backdrop-blur">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="px-1 pt-5">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-amber-300 transition-transform group-hover:translate-x-1">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          to="/subjects"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 hover:border-violet-400/60 hover:bg-violet-500/10 transition-colors"
        >
          See all subjects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Cikgu Help ---------------- */

function CikguHelp() {
  return (
    <section className="grid items-center gap-12 lg:grid-cols-2">
      <div
        className="relative h-[380px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-cover bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%,rgba(124,92,255,.5),transparent 55%),radial-gradient(circle at 75% 70%,rgba(34,211,238,.4),transparent 55%),linear-gradient(rgba(12,13,36,.55),rgba(12,13,36,.55)),url(${cikguBackground})`,
        }}
      >
        <img
          src={cikguAiRobot}
          alt="Cikgu AI — your friendly study companion"
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.55)]"
          style={{ animation: "cc-float 6s ease-in-out infinite" }}
        />
        <style>{`@keyframes cc-float{50%{transform:translate(-50%,-64%)}}`}</style>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
          Meet Cikgu AI
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
          Your Personal Learning Companion.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-400">
          From difficult concepts to exam preparation, Cikgu AI is here to explain, guide, and
          inspire. Ask questions in Bahasa Melayu or English and receive clear, KSSM-aligned
          answers that help you understand—not just memorize.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/subjects"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#20180a]"
            style={{
              background: "linear-gradient(180deg,#f5c518,#e5b300)",
              boxShadow: "0 12px 40px rgba(245,197,24,.35)",
            }}
          >
            Try Cikgu now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Social proof ---------------- */

function SocialProof() {
  const items = [
    { icon: Users, value: "12,000+", label: "Malaysian students learning" },
    { icon: Trophy, value: "94%", label: "Report better exam confidence" },
    { icon: ShieldCheck, value: "KSSM aligned", label: "Form 1 – 3 syllabus" },
    { icon: Star, value: "4.9 / 5", label: "Average parent rating" },
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------------- Newsletter ---------------- */

function NewsletterCTA() {
  return (
    <section
      className="mx-auto max-w-3xl rounded-[26px] border border-white/[0.08] p-10 text-center md:p-14"
      style={{ background: "linear-gradient(120deg,#141637,#0c0d24)" }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
        Stay in orbit
      </p>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
        Weekly mission briefings for parents & captains.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
        Get the AcadeMY newsletter — study tips, weekly progress digests, and the freshest KSSM
        content, sent to your inbox. No spam, unsubscribe anytime.
      </p>
      <form
        className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-[#20180a]"
          style={{
            background: "linear-gradient(180deg,#f5c518,#e5b300)",
            boxShadow: "0 12px 40px rgba(245,197,24,.35)",
          }}
        >
          Join the mission
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
