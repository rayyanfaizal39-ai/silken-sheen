import { useState } from "react";
import type { SistemBahasaTopic } from "@/data/bm-k1-sistem-bahasa";

interface Props {
  topic: SistemBahasaTopic;
  onBack: () => void;
}

// ── Small reusable pieces ────────────────────────────────────

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: color + "22", color }}
    >
      {label}
    </span>
  );
}

function CalloutBox({
  icon,
  title,
  children,
  color = "#60A5FA",
}: {
  icon: string;
  title?: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="rounded-xl p-4 mb-3 border"
      style={{ background: color + "12", borderColor: color + "44" }}
    >
      {title && (
        <div className="font-bold mb-1 flex items-center gap-2" style={{ color }}>
          <span>{icon}</span> {title}
        </div>
      )}
      {!title && <span className="mr-2">{icon}</span>}
      <div className="text-sm text-white/80 leading-relaxed">{children}</div>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  /** @deprecated All sections start collapsed by design to reduce cognitive load. */
  defaultOpen?: boolean;
  accent?: string;
}) {
  // All sections start collapsed by design — students expand only what they want to study.
  void defaultOpen;
  const [open, setOpen] = useState(false);
  const accentColor = accent ?? "#A78BFA";
  return (
    <div
      className="group rounded-2xl mb-3 overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5"
      style={{
        boxShadow: open
          ? `0 12px 32px -16px ${accentColor}55, 0 2px 8px rgba(0,0,0,0.25)`
          : "0 4px 14px -8px rgba(0,0,0,0.35)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white/[0.04]"
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm tracking-tight" style={{ color: accentColor }}>
          {title}
        </span>
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-transform duration-300"
          style={{
            background: accentColor + "22",
            color: accentColor,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function LearningFolder({
  title,
  description,
  accent,
  children,
  defaultOpen = false,
}: {
  title: string;
  description: string;
  accent: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className="mb-4 overflow-hidden rounded-3xl border bg-white/[0.025]"
      style={{ borderColor: open ? accent + "55" : "rgba(255,255,255,0.1)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04]"
        aria-expanded={open}
      >
        <span className="min-w-0">
          <span className="block font-bold text-white">{title}</span>
          <span className="mt-1 block text-xs leading-5 text-white/45">{description}</span>
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition-transform duration-300"
          style={{ background: accent + "20", color: accent, transform: open ? "rotate(180deg)" : undefined }}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.07] px-3 pb-1 pt-3 sm:px-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

// ── Section components ───────────────────────────────────────

function HeroSection({ topic }: { topic: SistemBahasaTopic }) {
  const difficultyColor =
    topic.difficulty === "Asas" ? "#34D399" : topic.difficulty === "Sederhana" ? "#F59E0B" : "#EF4444";
  return (
    <div
      className="rounded-2xl p-6 mb-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${topic.warna}22 0%, #0f0f2e 100%)`,
        border: `1.5px solid ${topic.warna}44`,
      }}
    >
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge label={topic.difficulty} color={difficultyColor} />
        <Badge label={`⏱ ${topic.masaBelajar}`} color={topic.warna} />
        <Badge label="Sistem Bahasa" color="#A78BFA" />
      </div>
      <h1 className="text-2xl font-black text-white mb-1">{topic.tajuk}</h1>
      <p className="text-white/60 text-sm">{topic.subtitle}</p>
    </div>
  );
}

function PengenalanSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="📖 Pengenalan" defaultOpen accent={topic.warna}>
      <p className="text-white/80 text-sm leading-relaxed">{topic.pengenalan}</p>
    </Accordion>
  );
}

function DefinisiSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="📚 Definisi & Ciri-Ciri" defaultOpen accent={topic.warna}>
      <CalloutBox icon="📝" title="Definisi" color={topic.warna}>
        {topic.definisi.teks}
      </CalloutBox>
      <div className="mb-3">
        <div className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">Ciri-ciri utama</div>
        <ul className="space-y-1">
          {topic.definisi.ciri.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/75">
              <span style={{ color: topic.warna }}>✦</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <CalloutBox icon="💡" title="Ringkasan Mudah" color="#F59E0B">
        {topic.definisi.ringkasan}
      </CalloutBox>
    </Accordion>
  );
}

function CikguTerangSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="🧑‍🏫 Cikgu AcadeMy Terangkan" accent={topic.warna}>
      <p className="text-white/70 text-sm mb-4 italic">{topic.cikguTerang.intro}</p>
      <div className="space-y-3 mb-4">
        {topic.cikguTerang.langkah.map((l, i) => (
          <div key={i} className="rounded-xl p-3 border border-white/10 bg-white/5">
            <div className="font-bold text-sm mb-1" style={{ color: topic.warna }}>
              {l.tajuk}
            </div>
            <p className="text-white/75 text-sm mb-2">{l.teks}</p>
            <div
              className="text-xs rounded-lg px-3 py-2 font-mono"
              style={{ background: topic.warna + "18", color: topic.warna }}
            >
              {l.contoh}
            </div>
          </div>
        ))}
      </div>
      <CalloutBox icon="⭐" title="Petua Peperiksaan" color="#10B981">
        {topic.cikguTerang.petua}
      </CalloutBox>
    </Accordion>
  );
}

function JenisSection({ topic }: { topic: SistemBahasaTopic }) {
  const [activeTab, setActiveTab] = useState(0);
  const jenis = topic.jenis;
  return (
    <Accordion title="🗂️ Jenis-Jenis" accent={topic.warna}>
      {/* Tab bar */}
      <div className="flex gap-2 flex-wrap mb-4">
        {jenis.map((j, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={
              activeTab === i
                ? { background: topic.warna, color: "#000" }
                : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
            }
          >
            {j.nama.split(" ").slice(-1)[0]}
          </button>
        ))}
      </div>
      {/* Tab content */}
      {jenis[activeTab] && (
        <div>
          <div className="font-bold text-white mb-1">{jenis[activeTab].nama}</div>
          <p className="text-white/70 text-sm mb-3">{jenis[activeTab].definisi}</p>
          {jenis[activeTab].formula && (
            <div
              className="rounded-lg px-3 py-2 font-mono text-sm mb-3"
              style={{ background: topic.warna + "18", color: topic.warna }}
            >
              📐 {jenis[activeTab].formula}
            </div>
          )}
          <div className="mb-3">
            <div className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">Contoh Kata</div>
            <div className="flex flex-wrap gap-2">
              {jenis[activeTab].contoh.map((c, ci) => (
                <span
                  key={ci}
                  className="px-2 py-1 rounded-lg text-xs font-medium"
                  style={{ background: topic.warna + "22", color: topic.warna }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">Contoh Ayat</div>
            <ul className="space-y-1.5">
              {jenis[activeTab].contohAyat.map((a, ai) => (
                <li key={ai} className="text-sm text-white/75 border-l-2 pl-3" style={{ borderColor: topic.warna + "55" }}>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Accordion>
  );
}

function ContohHarianSection({ topic }: { topic: SistemBahasaTopic }) {
  const [tab, setTab] = useState<"harian" | "sekolah" | "peperiksaan">("harian");
  const tabs = [
    { key: "harian" as const, label: "🏠 Harian" },
    { key: "sekolah" as const, label: "🏫 Sekolah" },
    { key: "peperiksaan" as const, label: "📝 Peperiksaan" },
  ];
  return (
    <Accordion title="🌍 Contoh Kehidupan Harian" accent={topic.warna}>
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={
              tab === t.key
                ? { background: topic.warna, color: "#000" }
                : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {topic.contohHarian[tab].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
            <span style={{ color: topic.warna, minWidth: "1.1rem" }}>{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

function TipsUASASection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="🎯 Tips UASA" accent="#F59E0B">
      <CalloutBox icon="🔥" title="Soalan Kerap Keluar" color="#F59E0B">
        <ul className="space-y-1 mt-1">
          {topic.tipsUASA.kerap.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">•</span> {t}
            </li>
          ))}
        </ul>
      </CalloutBox>
      <CalloutBox icon="👨‍⚖️" title="Apa Pemeriksa Cari" color="#A78BFA">
        <ul className="space-y-1 mt-1">
          {topic.tipsUASA.pemeriksa.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span> {t}
            </li>
          ))}
        </ul>
      </CalloutBox>
      <CalloutBox icon="📋" title="Format Jawapan" color="#34D399">
        <ul className="space-y-1 mt-1">
          {topic.tipsUASA.format.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span> {t}
            </li>
          ))}
        </ul>
      </CalloutBox>
    </Accordion>
  );
}

function KesalahanSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="⚠️ Kesalahan Lazim" accent="#EF4444">
      <div className="space-y-4">
        {topic.kesalahan.map((k, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-white/10">
            <div className="bg-red-500/15 border-b border-white/10 px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-400 text-lg">❌</span>
                <span className="font-semibold text-red-300 text-sm">Salah</span>
              </div>
              <p className="text-sm text-white/80 italic">"{k.salah}"</p>
              <p className="text-xs text-red-300 mt-1">{k.sebabSalah}</p>
            </div>
            <div className="bg-green-500/10 px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-400 text-lg">✅</span>
                <span className="font-semibold text-green-300 text-sm">Betul</span>
              </div>
              <p className="text-sm text-white/80 italic">"{k.betul}"</p>
              <p className="text-xs text-green-300 mt-1">{k.sebabBetul}</p>
            </div>
          </div>
        ))}
      </div>
    </Accordion>
  );
}

function WajibHafalSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="⭐ Wajib Hafal" accent="#FBBF24">
      <CalloutBox icon="💡" title="Ringkasan Mudah" color={topic.warna}>
        {topic.definisi.ringkasan}
      </CalloutBox>
      {topic.caraMudahIngat.akronim && (
        <div
          className="rounded-xl p-4 mb-3 text-center"
          style={{ background: topic.warna + "18", border: `1px solid ${topic.warna}44` }}
        >
          <div className="text-2xl font-black mb-1" style={{ color: topic.warna }}>
            {topic.caraMudahIngat.akronim.kata}
          </div>
          <div className="text-sm text-white/70">{topic.caraMudahIngat.akronim.makna}</div>
        </div>
      )}
      {topic.caraMudahIngat.petua[0] && (
        <CalloutBox icon="★" title="Petua Paling Penting" color="#10B981">
          {topic.caraMudahIngat.petua[0]}
        </CalloutBox>
      )}
    </Accordion>
  );
}

function CaraMudahSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="🧠 Cara Mudah Ingat" accent="#10B981">
      {topic.caraMudahIngat.akronim && (
        <div
          className="rounded-xl p-4 mb-4 text-center"
          style={{ background: topic.warna + "18", border: `1px solid ${topic.warna}44` }}
        >
          <div className="text-3xl font-black mb-1" style={{ color: topic.warna }}>
            {topic.caraMudahIngat.akronim.kata}
          </div>
          <div className="text-sm text-white/70">{topic.caraMudahIngat.akronim.makna}</div>
        </div>
      )}
      <div className="mb-3">
        <div className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">🎨 Visual Memory</div>
        <ul className="space-y-2">
          {topic.caraMudahIngat.visualMemory.map((v, i) => (
            <li key={i} className="text-sm text-white/75 flex items-start gap-2">
              <span style={{ color: topic.warna }}>▸</span> {v}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">💡 Petua</div>
        <ul className="space-y-2">
          {topic.caraMudahIngat.petua.map((p, i) => (
            <li key={i} className="text-sm text-white/75 flex items-start gap-2">
              <span className="text-yellow-400">★</span> {p}
            </li>
          ))}
        </ul>
      </div>
    </Accordion>
  );
}

function KBATSection({ topic }: { topic: SistemBahasaTopic }) {
  const [showAnswer, setShowAnswer] = useState<number[]>([]);
  const toggle = (i: number) =>
    setShowAnswer((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  return (
    <Accordion title="🔥 KBAT Practice" accent="#F97316">
      <div className="space-y-4">
        {topic.kbat.map((q, i) => (
          <div key={i} className="rounded-xl border border-orange-500/30 overflow-hidden">
            <div className="bg-orange-500/10 px-4 py-3">
              <div className="text-xs text-orange-300 font-semibold uppercase mb-1">Situasi {i + 1}</div>
              <p className="text-sm text-white/80 italic mb-3">"{q.situasi}"</p>
              <div className="text-xs text-orange-300 font-semibold uppercase mb-1">Soalan</div>
              <p className="text-sm text-white/90 font-medium">{q.soalan}</p>
            </div>
            <div className="px-4 py-3">
              <button
                onClick={() => toggle(i)}
                className="w-full rounded-lg py-2 text-sm font-semibold transition-all"
                style={
                  showAnswer.includes(i)
                    ? { background: "#F97316", color: "#000" }
                    : { background: "rgba(249,115,22,0.15)", color: "#F97316" }
                }
              >
                {showAnswer.includes(i) ? "▲ Sembunyikan Jawapan" : "▼ Tunjukkan Jawapan Model"}
              </button>
              {showAnswer.includes(i) && (
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg p-3 bg-green-500/10 border border-green-500/30">
                    <div className="text-xs text-green-400 font-semibold mb-1">✅ Jawapan Model</div>
                    <p className="text-sm text-white/85">{q.jawapanModel}</p>
                  </div>
                  <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30">
                    <div className="text-xs text-blue-400 font-semibold mb-1">📖 Penjelasan</div>
                    <p className="text-sm text-white/75">{q.penjelasan}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Accordion>
  );
}

function MiniKuizSection({ topic }: { topic: SistemBahasaTopic }) {
  const [selected, setSelected] = useState<(number | null)[]>(Array(topic.kuiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? selected.filter((s, i) => s === topic.kuiz[i].answer).length : 0;

  const choose = (qi: number, oi: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  };

  const reset = () => {
    setSelected(Array(topic.kuiz.length).fill(null));
    setSubmitted(false);
  };

  return (
    <Accordion title="🧩 Mini Kuiz (10 Soalan)" accent="#8B5CF6">
      {submitted && (
        <div
          className="rounded-xl p-4 mb-4 text-center"
          style={{
            background: score >= 7 ? "#10B98122" : score >= 5 ? "#F59E0B22" : "#EF444422",
            border: `1px solid ${score >= 7 ? "#10B981" : score >= 5 ? "#F59E0B" : "#EF4444"}44`,
          }}
        >
          <div
            className="text-4xl font-black mb-1"
            style={{ color: score >= 7 ? "#10B981" : score >= 5 ? "#F59E0B" : "#EF4444" }}
          >
            {score}/{topic.kuiz.length}
          </div>
          <div className="text-white/70 text-sm">
            {score === 10
              ? "🏆 Sempurna! Kamu dah kuasai topik ini!"
              : score >= 7
              ? "🎉 Hebat! Kamu hampir kuasai topik ini."
              : score >= 5
              ? "👍 OK! Ulang kaji sekali lagi ya."
              : "💪 Jangan putus asa! Cuba lagi!"}
          </div>
        </div>
      )}
      <div className="space-y-5">
        {topic.kuiz.map((q, qi) => {
          const ans = selected[qi];
          const correct = q.answer;
          const isCorrect = ans === correct;
          return (
            <div key={qi}>
              <div className="text-sm font-semibold text-white mb-2">
                <span className="text-purple-400 mr-1">{qi + 1}.</span> {q.q}
              </div>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  let bg = "rgba(255,255,255,0.05)";
                  let border = "rgba(255,255,255,0.1)";
                  let textColor = "rgba(255,255,255,0.7)";
                  if (submitted) {
                    if (oi === correct) {
                      bg = "rgba(16,185,129,0.15)";
                      border = "#10B981";
                      textColor = "#10B981";
                    } else if (oi === ans && !isCorrect) {
                      bg = "rgba(239,68,68,0.15)";
                      border = "#EF4444";
                      textColor = "#EF4444";
                    }
                  } else if (ans === oi) {
                    bg = "#8B5CF622";
                    border = "#8B5CF6";
                    textColor = "#C4B5FD";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => choose(qi, oi)}
                      className="w-full text-left rounded-xl px-3 py-2.5 text-sm transition-all border"
                      style={{ background: bg, borderColor: border, color: textColor }}
                    >
                      <span className="font-bold mr-2">{["A", "B", "C", "D"][oi]}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-2 text-xs px-3 py-2 rounded-lg bg-white/5 text-white/60">
                  💡 {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 mt-5">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={selected.includes(null)}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
            style={{ background: "#8B5CF6", color: "#fff" }}
          >
            Semak Jawapan
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition-all"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            Cuba Lagi
          </button>
        )}
      </div>
    </Accordion>
  );
}

function ExamBoosterSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="🚀 Fokus UASA + Rumusan" accent="#F472B6">
      <CalloutBox icon="📌" title="Rumusan Utama" color={topic.warna}>
        <ul className="space-y-1.5 mt-1">
          {topic.examBooster.rumusan.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span style={{ color: topic.warna, minWidth: "1rem" }}>✦</span> {r}
            </li>
          ))}
        </ul>
      </CalloutBox>
      <CalloutBox icon="⚡" title="Petua Saat Akhir" color="#F472B6">
        <ul className="space-y-1.5 mt-1">
          {topic.examBooster.lastMinuteTips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-pink-400 min-w-[1rem]">→</span> {t}
            </li>
          ))}
        </ul>
      </CalloutBox>
    </Accordion>
  );
}

function RingkasanSatuMinitSection({ topic }: { topic: SistemBahasaTopic }) {
  return (
    <Accordion title="📝 Ringkasan 1 Minit" accent="#34D399">
      <p className="text-white/80 text-sm leading-relaxed mb-3">{topic.definisi.ringkasan}</p>
      <ul className="space-y-1.5">
        {topic.examBooster.rumusan.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/75">
            <span style={{ color: topic.warna }}>✦</span> {r}
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

// ── Main export ──────────────────────────────────────────────

export function SistemBahasaTopicDetail({ topic, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0f0f2e] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          ←
        </button>
        <div>
          <div className="text-xs text-white/50">Sistem Bahasa</div>
          <div className="text-sm font-bold text-white">{topic.tajuk}</div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <HeroSection topic={topic} />
        <LearningFolder
          title="📖 Kenali Topik"
          description="Pengenalan, definisi dan jenis-jenis"
          accent={topic.warna}
          defaultOpen
        >
          <PengenalanSection topic={topic} />
          <DefinisiSection topic={topic} />
          <JenisSection topic={topic} />
        </LearningFolder>
        <LearningFolder
          title="💡 Faham & Gunakan"
          description="Penerangan mudah, contoh dan teknik ingatan"
          accent="#10B981"
        >
          <CikguTerangSection topic={topic} />
          <ContohHarianSection topic={topic} />
          <CaraMudahSection topic={topic} />
        </LearningFolder>
        <LearningFolder
          title="🎯 Penguasaan UASA"
          description="Fokus peperiksaan, kesalahan, hafalan dan latihan"
          accent="#F59E0B"
        >
          <TipsUASASection topic={topic} />
          <KesalahanSection topic={topic} />
          <WajibHafalSection topic={topic} />
          <KBATSection topic={topic} />
          <MiniKuizSection topic={topic} />
        </LearningFolder>
        <LearningFolder
          title="⚡ Ulang Kaji Pantas"
          description="Fokus akhir dan ringkasan satu minit"
          accent="#F472B6"
        >
          <ExamBoosterSection topic={topic} />
          <RingkasanSatuMinitSection topic={topic} />
        </LearningFolder>
      </div>
    </div>
  );
}
