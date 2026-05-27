import { ArrowLeft } from "lucide-react";
import type { ScienceLang } from "@/hooks/use-science-lang";

export function ScienceLanguagePicker({
  onSelect,
  onBack,
}: {
  onSelect: (lang: ScienceLang) => void;
  onBack: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> All subjects
        </button>
        <span className="text-sm font-semibold text-muted-foreground">🔬 Science</span>
      </div>

      <div className="text-center mb-10">
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          Pilih <span className="gradient-text">Bahasa Pembelajaran</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Choose your preferred language</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* BM Card */}
        <button
          onClick={() => onSelect("bm")}
          className="group relative text-left glass-strong rounded-2xl p-7 overflow-hidden border-2 border-transparent hover:border-[#8B5CF6] hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(139,92,246,0.45)] transition-all duration-300"
        >
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-25 blur-3xl group-hover:opacity-50 transition-opacity"
            style={{ background: "#8B5CF6" }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🇲🇾</div>
              <span
                className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider text-white"
                style={{ background: "#8B5CF6" }}
              >
                BM
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold">Sains</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Belajar Sains dalam Bahasa Malaysia
            </p>
            <div
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold group-hover:translate-x-1 transition-transform"
              style={{ color: "#8B5CF6" }}
            >
              Mula belajar →
            </div>
          </div>
        </button>

        {/* DLP Card */}
        <button
          onClick={() => onSelect("dlp")}
          className="group relative text-left glass-strong rounded-2xl p-7 overflow-hidden border-2 border-transparent hover:border-[#3B82F6] hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(59,130,246,0.45)] transition-all duration-300"
        >
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-25 blur-3xl group-hover:opacity-50 transition-opacity"
            style={{ background: "#3B82F6" }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🌐</div>
              <span
                className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider text-white animate-pulse shadow-[0_0_16px_rgba(59,130,246,0.7)]"
                style={{ background: "#3B82F6" }}
              >
                DLP
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold">Science</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn Science in English (DLP)
            </p>
            <div
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold group-hover:translate-x-1 transition-transform"
              style={{ color: "#3B82F6" }}
            >
              Start learning →
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export function ScienceLangBar({
  lang,
  onChange,
}: {
  lang: "bm" | "dlp";
  onChange: () => void;
}) {
  const color = lang === "bm" ? "#8B5CF6" : "#3B82F6";
  return (
    <div className="flex items-center justify-end gap-2 mb-4">
      <span
        className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider text-white"
        style={{ background: color, boxShadow: `0 0 12px ${color}80` }}
      >
        {lang.toUpperCase()}
      </span>
      <button
        onClick={onChange}
        className="px-3 py-1.5 rounded-full glass text-xs font-semibold hover:bg-white/10 transition"
      >
        Tukar Bahasa / Change Language
      </button>
    </div>
  );
}
