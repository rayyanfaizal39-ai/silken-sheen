import { Link } from "@tanstack/react-router";
import { Sparkles, Brain, Zap, Trophy, ArrowRight, BookOpen, Target, Flame } from "lucide-react";
import { subjects } from "@/data/content";

export function Hero() {
  return (
    <section className="relative pt-16 pb-32 px-4 sm:px-8 overflow-hidden">
      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/30 via-accent/20 to-transparent blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="text-center lg:text-left animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
            <Sparkles className="w-3.5 h-3.5 text-nova-yellow" />
            AI-powered for KSSM • Form 1–3
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Study Smarter,
            <br />
            <span className="gradient-text">Not Harder.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Kuasai setiap subjek KSSM dengan kuiz, kad imbasan, dan nota berkuasa AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              to="/quizzes"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold glow-blue hover:scale-105 transition-transform"
            >
              Mula Belajar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-strong text-foreground font-semibold hover:bg-white/10 transition-colors"
            >
              Jelajah Subjek
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
            <Stat icon={<BookOpen className="w-4 h-4 text-nova-blue" />} value="6" label="Subjects" />
            <Stat icon={<Target className="w-4 h-4 text-accent" />} value="500+" label="Questions" />
            <Stat icon={<Flame className="w-4 h-4 text-nova-yellow" />} value="Daily" label="Challenges" />
          </div>
        </div>

        {/* Right floating cards */}
        <div className="relative h-[520px] hidden lg:block">
          <FloatingCard
            className="absolute top-4 left-8 w-64 animate-float"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-accent" />
              <span className="text-xs font-semibold text-muted-foreground">FLASHCARD</span>
            </div>
            <p className="font-display text-lg font-semibold">What is Ohm's Law?</p>
            <p className="text-sm text-muted-foreground mt-2">Tap to flip →</p>
          </FloatingCard>

          <FloatingCard
            className="absolute top-32 right-0 w-72 animate-float-slow"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-nova-yellow" />
              <span className="text-xs font-semibold text-muted-foreground">QUIZ • EASY</span>
            </div>
            <p className="font-display text-base font-semibold">3/4 + 1/4 = ?</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {["1", "1/2", "3/8", "2"].map((o, i) => (
                <div
                  key={i}
                  className={`text-xs px-3 py-2 rounded-lg ${
                    i === 0 ? "bg-primary/30 border border-primary/50 text-foreground" : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  {o}
                </div>
              ))}
            </div>
          </FloatingCard>

          <FloatingCard
            className="absolute bottom-12 left-0 w-72 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-nova-yellow" />
                <span className="text-xs font-semibold text-muted-foreground">PROGRESS</span>
              </div>
              <span className="text-xs text-accent font-bold">+50 XP</span>
            </div>
            <p className="text-sm font-medium">Mathematics — Form 2</p>
            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>75% complete</span>
              <span>🔥 5-day streak</span>
            </div>
          </FloatingCard>

          <FloatingCard
            className="absolute bottom-4 right-8 w-56 animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-sm font-semibold">Quiz Master</p>
                <p className="text-xs text-muted-foreground">Unlocked!</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>

      {/* subject strip */}
      <div className="max-w-7xl mx-auto mt-20">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          All KSSM subjects covered
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {subjects.map((s) => (
            <Link
              key={s.id}
              to="/subjects"
              className="px-4 py-2 rounded-full glass text-sm hover:scale-105 transition-transform"
            >
              <span className="mr-2">{s.emoji}</span>
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-bold text-foreground">{value}</span>
      <span>{label}</span>
    </div>
  );
}

function FloatingCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`glass-strong rounded-2xl p-5 shadow-2xl ${className}`} style={style}>
      {children}
    </div>
  );
}
