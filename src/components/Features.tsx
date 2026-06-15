import { Link } from "@tanstack/react-router";
import { BookOpen, Brain, ChevronRight, Flame, Layers, MessageCircle, PenLine, Sparkles, Target, Trophy, Zap } from "lucide-react";

const worlds = [
  {
    icon: BookOpen,
    title: "Glowing Notes Library",
    desc: "Chapter notes, mind maps, videos, and quick revision cards that feel like opening a digital study book.",
    to: "/notes" as const,
    color: "from-sky-400 to-blue-600",
  },
  {
    icon: Target,
    title: "Quiz Bubble Arena",
    desc: "Answer shuffled questions, earn XP, build streaks, and get instant feedback without losing the fun.",
    to: "/quizzes" as const,
    color: "from-amber-300 to-orange-500",
  },
  {
    icon: Layers,
    title: "Orbiting Flashcards",
    desc: "Flip, swipe, favorite, and review weak concepts until each topic starts to stick.",
    to: "/flashcards" as const,
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: MessageCircle,
    title: "Friendly AI Tutor",
    desc: "Ask for simple explanations, hints, examples, or summaries whenever a topic gets blurry.",
    to: "/subjects" as const,
    color: "from-cyan-300 to-emerald-400",
  },
];

const path = [
  { icon: PenLine, label: "Read Notes", detail: "Build the idea" },
  { icon: Zap, label: "Take Quiz", detail: "Test recall" },
  { icon: Brain, label: "Ask AI", detail: "Clear doubts" },
  { icon: Trophy, label: "Earn XP", detail: "Keep streaks" },
];

export function Features() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-20 -z-10 h-96 bg-[radial-gradient(circle_at_50%_50%,oklch(0.65_0.26_295_/_0.16),transparent_65%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-nova-yellow">
            Study worlds
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Everything feels like a <span className="study-gradient-text">learning adventure</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            AcadeMY keeps KSSM revision energetic: focused enough for serious studying, animated enough to make another chapter feel doable.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {worlds.map((world, index) => {
            const Icon = world.icon;
            return (
              <Link
                key={world.title}
                to={world.to}
                className="group study-world-card rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-white/[0.09]">
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${world.color} opacity-25 blur-2xl transition-opacity group-hover:opacity-45`} />
                  <div className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${world.color} text-white shadow-xl transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative font-display text-xl font-bold text-white">{world.title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-muted-foreground">{world.desc}</p>
                  <div className="relative mt-6 inline-flex items-center gap-1 text-sm font-bold text-nova-yellow">
                    Enter world
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-slate-200">
                <Flame className="h-3.5 w-3.5 text-nova-yellow" />
                Daily study quest
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                One chapter. Four tiny wins. Real momentum.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                The homepage guides students toward the actual app loop: learn the idea, test it, ask for help, and keep the streak alive.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {path.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="study-path-step relative rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-black text-muted-foreground">0{index + 1}</span>
                      <Sparkles className="h-4 w-4 text-nova-yellow" />
                    </div>
                    <Icon className="h-7 w-7 text-accent" />
                    <p className="mt-3 font-display text-lg font-bold text-white">{step.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
