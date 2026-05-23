import { BookOpen, Zap, Layers, Trophy, Search, Sparkles } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Smart Summary Notes", desc: "Bite-sized, highlighted notes by subject, form, and chapter.", color: "from-sky-500 to-blue-600" },
  { icon: Zap, title: "Interactive Quizzes", desc: "Multiple-choice with instant scoring and fun animations.", color: "from-amber-500 to-yellow-500" },
  { icon: Layers, title: "Swipeable Flashcards", desc: "Flip, swipe, favorite — perfect for smart revision.", color: "from-purple-500 to-pink-500" },
  { icon: Trophy, title: "XP & Streaks", desc: "Earn XP, build streaks, unlock badges. Stay motivated.", color: "from-emerald-500 to-teal-500" },
  { icon: Search, title: "Search & Filter", desc: "Find anything by chapter, keyword, subject, or form.", color: "from-rose-500 to-orange-500" },
  { icon: Sparkles, title: "AI-Powered", desc: "Personalized study suggestions made for KSSM.", color: "from-indigo-500 to-purple-600" },
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Everything you need to <span className="gradient-text">level up</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Built to make studying addictive in the best way possible.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group glass rounded-2xl p-6 hover:-translate-y-1 hover:bg-white/[0.08] transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
