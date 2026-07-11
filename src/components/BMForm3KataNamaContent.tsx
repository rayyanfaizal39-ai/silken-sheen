import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, Sparkles } from "lucide-react";
import {
  GoldenStandardHero,
  MissionSectionStatic,
  CollapsibleFolder,
  CorrectWrongExample,
  NumberedStep,
  FinalChecklist,
} from "@/components/exam-skill/MissionLearning";
import {
  KATA_NAMA_MISI,
  KATA_NAMA_PENGENALAN,
  KATA_NAMA_KONSEP_UTAMA,
  KATA_NAMA_JENIS,
  KATA_NAMA_CONTOH_AYAT,
  KATA_NAMA_KESALAHAN_LAZIM,
  KATA_NAMA_TIP_UASA,
  KATA_NAMA_TEKNIK_MENJAWAB,
  KATA_NAMA_NOTA_KILAT,
  KATA_NAMA_FAKTA_PENTING,
  KATA_NAMA_CHECKLIST,
  KATA_NAMA_MOTIVASI,
} from "@/data/bm-form3-kata-nama";

const ACCENT = "#60A5FA"; // Kata Nama uses the same blue as the Sistem Bahasa hub

// Renders "**word**" segments as bold, matching the request to highlight
// Kata Nama inside example sentences without touching any shared component.
function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-white">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function CalloutBox({
  icon,
  title,
  color = ACCENT,
  children,
}: {
  icon: string;
  title: string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: `${color}30`, background: `${color}0a` }}>
      <p className="mb-2 flex items-center gap-2 text-[9px] font-black tracking-wide" style={{ color }}>
        <span>{icon}</span> {title}
      </p>
      <div className="text-sm leading-relaxed text-white/75">{children}</div>
    </div>
  );
}

export function BMForm3KataNamaContent({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext?: () => void;
}) {
  const [checked, setChecked] = useState<boolean[]>(Array(KATA_NAMA_CHECKLIST.length).fill(false));
  const toggleChecked = (index: number) =>
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-[11px] font-bold text-white/40 transition-colors hover:text-white/70"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Kembali ke Sistem Bahasa
      </button>

      <div className="space-y-6">
        {/* 🚀 Mission Brief */}
        <GoldenStandardHero
          eyebrow="🚀 Misi Hari Ini"
          title="Kata Nama"
          description={KATA_NAMA_MISI}
          tags={[
            { label: "Kertas 1 · Bahagian A & B", color: ACCENT },
            { label: "Sistem Bahasa", color: ACCENT },
          ]}
        />

        {/* 📖 Pengenalan */}
        <MissionSectionStatic title="📖 Pengenalan" color={ACCENT}>
          <CalloutBox icon="📖" title="Bayangkan Begini" color={ACCENT}>
            {KATA_NAMA_PENGENALAN}
          </CalloutBox>
        </MissionSectionStatic>

        {/* ⭐ Konsep Utama */}
        <MissionSectionStatic title="⭐ Konsep Utama" color="#FBBF24">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <p className="mb-2 flex items-center gap-2 text-[9px] font-black tracking-wide text-yellow-400">
              <Sparkles className="h-3.5 w-3.5" /> Kenapa Kata Nama Dibahagikan Kepada Subtopik?
            </p>
            <p className="text-sm leading-relaxed text-white/75">{KATA_NAMA_KONSEP_UTAMA}</p>
          </div>
        </MissionSectionStatic>

        {/* 📚 Jenis-Jenis Kata Nama */}
        <MissionSectionStatic title="📚 Jenis-Jenis Kata Nama" color={ACCENT}>
          <div className="space-y-3">
            {KATA_NAMA_JENIS.map((jenis, index) => (
              <CollapsibleFolder
                key={jenis.id}
                title={`${index + 1}. ${jenis.nama}`}
                description={jenis.definisi}
                accent={ACCENT}
              >
                <CalloutBox icon="📝" title="Definisi" color={ACCENT}>
                  {jenis.definisi}
                </CalloutBox>
                <CalloutBox icon="🔎" title="Cara Mengenal Pasti" color="#34D399">
                  {jenis.caraMengenalPasti}
                </CalloutBox>
                <CalloutBox icon="📐" title="Formula Ingatan" color="#C084FC">
                  {jenis.formula}
                </CalloutBox>
                <CalloutBox icon="⚖️" title="Perbezaan" color="#FB923C">
                  {jenis.perbezaan}
                </CalloutBox>
                <div>
                  <p className="mb-2 text-[9px] font-black tracking-wide text-white/40">CONTOH BETUL</p>
                  <div className="flex flex-wrap gap-1.5">
                    {jenis.contohBetul.map((c) => (
                      <span
                        key={c}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <CorrectWrongExample wrong={jenis.contohSalah} right={jenis.contohBetul.join(", ")} />
                <CalloutBox icon="🎯" title="Tips UASA" color="#FBBF24">
                  {jenis.tipsUASA}
                </CalloutBox>
              </CollapsibleFolder>
            ))}
          </div>
        </MissionSectionStatic>

        {/* 💡 Contoh Ayat */}
        <MissionSectionStatic title="💡 Contoh Ayat" color="#34D399">
          <ol className="space-y-2.5">
            {KATA_NAMA_CONTOH_AYAT.map((ayat, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[10px] font-black text-white/50">
                  {i + 1}
                </span>
                <BoldText text={ayat} />
              </li>
            ))}
          </ol>
        </MissionSectionStatic>

        {/* ⚠ Kesalahan Lazim */}
        <MissionSectionStatic title="⚠ Kesalahan Lazim" color="#FB7185">
          <div className="space-y-4">
            {KATA_NAMA_KESALAHAN_LAZIM.map((k) => (
              <div key={k.label} className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                <p className="mb-2 text-xs font-black tracking-wide text-rose-300">{k.label}</p>
                <p className="mb-1 flex items-start gap-2 text-sm text-white/75">
                  <span>❌</span> {k.salah}
                </p>
                <p className="mb-1 flex items-start gap-2 text-sm text-white/75">
                  <span>✅</span> {k.betul}
                </p>
                <p className="flex items-start gap-2 text-xs text-white/50">
                  <span>💡</span> {k.penjelasan}
                </p>
              </div>
            ))}
          </div>
        </MissionSectionStatic>

        {/* 🎯 Tip UASA */}
        <MissionSectionStatic title="🎯 Tip UASA" color="#FBBF24">
          <div className="space-y-4">
            <CalloutBox icon="📍" title="Di Mana Ia Muncul" color="#FBBF24">
              <ul className="space-y-1.5">
                {KATA_NAMA_TIP_UASA.dimanaMuncul.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-yellow-400">•</span> {t}
                  </li>
                ))}
              </ul>
            </CalloutBox>
            <CalloutBox icon="⚠️" title="Perangkap Lazim" color="#FB7185">
              <ul className="space-y-1.5">
                {KATA_NAMA_TIP_UASA.perangkapLazim.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-rose-400">•</span> {t}
                  </li>
                ))}
              </ul>
            </CalloutBox>
            <CalloutBox icon="👨‍⚖️" title="Jangkaan Pemeriksa & Cara Skor" color="#C084FC">
              <ul className="space-y-1.5">
                {KATA_NAMA_TIP_UASA.jangkaanPemeriksa.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-purple-400">•</span> {t}
                  </li>
                ))}
              </ul>
            </CalloutBox>
          </div>
        </MissionSectionStatic>

        {/* 🧠 Teknik Menjawab */}
        <MissionSectionStatic title="🧠 Teknik Menjawab" color={ACCENT}>
          <div className="space-y-2">
            {KATA_NAMA_TEKNIK_MENJAWAB.map((step, i) => (
              <NumberedStep key={step.title} index={i} text={`${step.title}: ${step.detail}`} color={ACCENT} />
            ))}
          </div>
        </MissionSectionStatic>

        {/* ⚡ Nota Kilat */}
        <MissionSectionStatic title="⚡ Nota Kilat" color="#34D399">
          <div className="grid gap-2 sm:grid-cols-2">
            {KATA_NAMA_NOTA_KILAT.map((n) => (
              <div
                key={n.label}
                className="flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm"
                style={{ borderColor: `${n.color}30`, background: `${n.color}0a` }}
              >
                <span>{n.emoji}</span>
                <span className="text-white/75">
                  <strong className="text-white">{n.label}:</strong> {n.text}
                </span>
              </div>
            ))}
          </div>
        </MissionSectionStatic>

        {/* 📌 Fakta Penting */}
        <MissionSectionStatic title="📌 Fakta Penting" color="#FBBF24">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <ul className="space-y-2">
              {KATA_NAMA_FAKTA_PENTING.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-0.5 text-yellow-400">★</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </MissionSectionStatic>

        {/* ✅ Semak Penguasaan */}
        <MissionSectionStatic title="✅ Semak Penguasaan" color="#34D399">
          <FinalChecklist items={KATA_NAMA_CHECKLIST} checked={checked} onToggle={toggleChecked} />
        </MissionSectionStatic>

        {/* 🎓 Sebelum Tamat */}
        <div
          className="rounded-2xl border p-5 text-center"
          style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}0a` }}
        >
          <p className="text-2xl">🎓</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-white/80">{KATA_NAMA_MOTIVASI}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.09]"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Sistem Bahasa
          </button>
          {onNext && (
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)` }}
            >
              Seterusnya <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
