import { useState } from "react";
import { ChevronDown, Trophy } from "lucide-react";
import {
  AYAT_LEMAH_CEMERLANG_PLUS,
  KOSA_KATA_MENARIK_LENGKAP,
  FRASA_MENARIK_KATEGORI,
  PENANDA_WACANA_CEMERLANG,
  PERIBAHASA_MARKAH_TINGGI,
  KESALAHAN_LAZIM_KARANGAN_PLUS,
  FORMULA_KARANGAN_PENDEK_CEMERLANG,
  FORMULA_KARANGAN_PANJANG_CEMERLANG,
  CABARAN_TINGKATKAN_KARANGAN,
  PETUA_PEMERIKSA_UASA,
  RAHSIA_KARANGAN_CEMERLANG,
} from "@/data/bm-essay-improvement-plus";
import { IMBAK_STEPS, IMBAK_WORKED_EXAMPLE } from "@/data/bm-karangan-panjang-hub";

// This component only ADDS new sections below the existing "Kemahiran Tingkatkan
// Karangan" content. It does not alter EssayImprovementDetail's existing JSX.

function CollapsibleGroup({
  title,
  icon,
  color,
  countLabel,
  children,
}: {
  title: string;
  icon: string;
  color: string;
  countLabel?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: `${color}30`, background: `linear-gradient(135deg, ${color}10 0%, rgba(255,255,255,0.02) 70%)` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="flex items-center gap-2.5 text-sm font-bold text-white">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base" style={{ background: `${color}22` }}>
            {icon}
          </span>
          {title}
          {countLabel && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-black" style={{ background: `${color}22`, color }}>
              {countLabel}
            </span>
          )}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <div className="animate-fade-up border-t border-white/5 px-4 pb-4 pt-3.5">{children}</div>}
    </div>
  );
}

function MiniCard({ title, text, color }: { title: string; text: string; color: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: `${color}30`, background: `${color}0a` }}>
      <p className="text-[10px] font-black uppercase tracking-wide" style={{ color }}>
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
    </div>
  );
}

function RevealAnswer({ label = "Tekan untuk lihat contoh jawapan", children }: { label?: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow((s) => !s)}
        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-white/50 transition-colors hover:bg-white/10"
      >
        {show ? "Sembunyikan jawapan" : label}
      </button>
      {show && <div className="animate-fade-up mt-2">{children}</div>}
    </div>
  );
}

// ─── 1. Ayat Lemah → Ayat Cemerlang ─────────────────────────────────────────

function AyatLemahCemerlangSection({ color }: { color: string }) {
  return (
    <CollapsibleGroup title="Ayat Lemah → Ayat Cemerlang" icon="✨" color={color} countLabel={`${AYAT_LEMAH_CEMERLANG_PLUS.length} contoh`}>
      <div className="mb-3 grid gap-2 sm:grid-cols-2">
        <MiniCard title="Upgrade ayat biasa" text="Tukar kata umum kepada kata kerja, kata adjektif dan frasa yang lebih matang." color={color} />
        <MiniCard title="Upgrade pendahuluan" text="Mulakan dengan latar semasa, isu dan gambaran umum agar pembuka karangan lebih berkesan." color={color} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {AYAT_LEMAH_CEMERLANG_PLUS.map((item, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-white/10">
            <div className="border-b border-white/10 bg-rose-500/10 p-3">
              <p className="mb-1 text-[9px] font-black tracking-wide text-rose-400">❌ Ayat Lemah</p>
              <p className="text-sm text-white/65">{item.lemah}</p>
            </div>
            <div className="bg-emerald-500/10 p-3">
              <p className="mb-1 text-[9px] font-black tracking-wide text-emerald-400">✅ Ayat Cemerlang</p>
              <p className="text-sm text-white/80">{item.cemerlang}</p>
            </div>
            <div className="border-t border-white/5 bg-black/20 p-2.5">
              <p className="text-[10px] italic text-white/40">Teknik: {item.teknik}</p>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 2. Kosa Kata Biasa → Menarik ────────────────────────────────────────────

function KosaKataMenarikSection({ color }: { color: string }) {
  return (
    <CollapsibleGroup title="Kosa Kata Biasa → Kosa Kata Menarik" icon="🔤" color={color} countLabel={`${KOSA_KATA_MENARIK_LENGKAP.length} pasangan`}>
      <div className="mb-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <MiniCard title="Masalah → Polemik" text="Gunakan kata yang lebih formal untuk menunjukkan isu yang kompleks." color={color} />
        <MiniCard title="Sangat penting → Signifikan" text="Kata ini sesuai untuk karangan fakta dan perbincangan." color={color} />
        <MiniCard title="Contoh → Tamsilnya" text="Sesuai untuk membawa contoh yang lebih akademik." color={color} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {KOSA_KATA_MENARIK_LENGKAP.map((k, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <span className="text-sm text-white/40 line-through">{k.biasa}</span>
            <span className="text-white/20">→</span>
            <span className="text-sm font-semibold" style={{ color }}>{k.menarik}</span>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 3. Frasa Menarik Untuk Karangan ─────────────────────────────────────────

function FrasaMenarikSection() {
  return (
    <CollapsibleGroup title="Frasa Menarik Untuk Karangan" icon="💎" color="#C084FC" countLabel={`${FRASA_MENARIK_KATEGORI.length} kategori`}>
      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs leading-relaxed text-white/55">
        Frasa yang baik membantu ayat menjadi lebih hidup, lebih matang dan lebih meyakinkan. Pilih frasa yang sesuai dengan tema, bukan sekadar frasa yang bunyinya indah.
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {FRASA_MENARIK_KATEGORI.map((kat) => (
          <div key={kat.kategori} className="rounded-xl border p-3.5" style={{ borderColor: `${kat.color}30`, background: `${kat.color}0a` }}>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">{kat.icon}</span>
              <span className="text-sm font-bold text-white">{kat.kategori}</span>
            </div>
            <ul className="space-y-1">
              {kat.frasa.map((f) => (
                <li key={f} className="flex items-start gap-1.5 text-xs leading-relaxed text-white/65">
                  <span className="mt-0.5" style={{ color: kat.color }}>•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 4. Penanda Wacana Pilihan Pelajar Cemerlang ─────────────────────────────

function PenandaWacanaCemerlangSection() {
  return (
    <CollapsibleGroup title="Penanda Wacana Pilihan Pelajar Cemerlang" icon="🔗" color="#60A5FA" countLabel={`${PENANDA_WACANA_CEMERLANG.length} kategori`}>
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Disusun berdasarkan nota Penanda Wacana Lengkap yang sedia ada — dipilih khusus untuk pelajar yang menyasarkan markah cemerlang.
      </p>
      <div className="mb-3 grid gap-2 sm:grid-cols-2">
        <MiniCard title="Upgrade penanda wacana" text="Gunakan variasi seperti selain itu, di samping itu, justeru dan natijahnya." color="#60A5FA" />
        <MiniCard title="Sambung perenggan" text="Penanda wacana yang tepat menjadikan idea bergerak lancar antara satu perenggan dengan perenggan yang lain." color="#60A5FA" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PENANDA_WACANA_CEMERLANG.map((kat) => (
          <div key={kat.kategori} className="rounded-xl border p-3.5" style={{ borderColor: `${kat.color}30`, background: `${kat.color}0a` }}>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">{kat.icon}</span>
              <span className="text-sm font-bold text-white">{kat.kategori}</span>
            </div>
            <div className="space-y-2">
              {kat.items.map((it) => (
                <div key={it.frasa} className="rounded-lg border border-white/5 bg-black/20 p-2.5">
                  <span
                    className="mb-1 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-black"
                    style={{ background: `${kat.color}25`, color: kat.color }}
                  >
                    {it.frasa}
                  </span>
                  <p className="text-xs italic leading-relaxed text-white/60">&ldquo;{it.contohPenggunaan}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 5. Peribahasa Untuk Markah Tinggi ───────────────────────────────────────

function PeribahasaMarkahTinggiSection() {
  return (
    <CollapsibleGroup title="Peribahasa Untuk Markah Tinggi" icon="🏆" color="#FBBF24" countLabel={`${PERIBAHASA_MARKAH_TINGGI.length} tema`}>
      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs leading-relaxed text-white/55">
        Peribahasa paling selamat ialah yang benar-benar sesuai dengan tema dan diikat pada ayat penegas di penutup.
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PERIBAHASA_MARKAH_TINGGI.map((tema) => (
          <div key={tema.tema} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">{tema.icon}</span>
              <span className="text-sm font-bold text-white">{tema.tema}</span>
            </div>
            <div className="space-y-2.5">
              {tema.items.map((it) => (
                <div key={it.peribahasa} className="rounded-lg border border-white/5 bg-black/20 p-2.5">
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <p className="text-sm font-black italic text-white">{it.peribahasa}</p>
                    {it.wajibHafal && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-[9px] font-black text-yellow-300">
                        ⭐ WAJIB HAFAL
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-xs leading-relaxed text-white/55">{it.maksud}</p>
                  <p className="text-xs italic leading-relaxed text-white/45">&ldquo;{it.contohAyat}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 6. Teknik IMBAK ──────────────────────────────────────────────────────────

function TeknikImbakSection({ color }: { color: string }) {
  const rows: { code: string; text: string }[] = [
    { code: "I", text: IMBAK_WORKED_EXAMPLE.i },
    { code: "M", text: IMBAK_WORKED_EXAMPLE.m },
    { code: "B", text: IMBAK_WORKED_EXAMPLE.b },
    { code: "A", text: IMBAK_WORKED_EXAMPLE.a },
    { code: "K", text: IMBAK_WORKED_EXAMPLE.k },
  ];
  return (
    <CollapsibleGroup title="Teknik IMBAK" icon="🧩" color="#34D399">
      <p className="mb-3 text-xs leading-relaxed text-white/45">
        Formula IMBAK membantu setiap perenggan isi berkembang dengan lengkap dan meyakinkan.
      </p>
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <MiniCard title="Isi" text="Nyatakan idea utama yang terus menjawab kehendak soalan." color={color} />
        <MiniCard title="Mengapa" text="Berikan sebab yang logik mengapa isi itu penting." color={color} />
        <MiniCard title="Bagaimana" text="Tunjukkan cara atau contoh yang membuat isi itu hidup." color={color} />
        <MiniCard title="Akibat" text="Terangkan kesan supaya huraian terasa matang." color={color} />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {IMBAK_STEPS.map((s) => (
          <div key={s.code} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-base font-black" style={{ color }}>{s.code}</p>
            <p className="text-[11px] font-bold text-white/85">{s.label}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-white/45">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Contoh Lengkap</p>
      <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
        <div className="space-y-2">
          {rows.map((r) => (
            <p key={r.code} className="text-sm leading-relaxed text-white/80">
              <span className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black" style={{ background: `${color}25`, color }}>
                {r.code}
              </span>
              {r.text}
            </p>
          ))}
        </div>
      </div>
    </CollapsibleGroup>
  );
}

// ─── 7. Kesalahan Lazim Dalam Karangan ───────────────────────────────────────

function KesalahanLazimPlusSection() {
  return (
    <CollapsibleGroup title="Kesalahan Lazim Dalam Karangan" icon="⚠️" color="#FB7185" countLabel={`${KESALAHAN_LAZIM_KARANGAN_PLUS.length} kesalahan`}>
      <div className="mb-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs leading-relaxed text-white/60">
        Kesalahan yang paling mahal ialah ayat tergantung, isi berulang dan huraian yang terlalu pendek. Karangan Form 2 perlu lebih lengkap daripada Form 1.
      </div>
      <div className="space-y-3">
        {KESALAHAN_LAZIM_KARANGAN_PLUS.map((k) => (
          <div key={k.label} className="overflow-hidden rounded-xl border border-white/10">
            <div className="border-b border-white/10 bg-rose-500/10 px-3.5 py-2.5">
              <p className="text-sm font-bold text-rose-200">❌ {k.label}</p>
              <p className="mt-1 text-xs italic text-white/55">{k.contohSalah}</p>
            </div>
            <div className="space-y-2 px-3.5 py-2.5">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                <p className="mb-1 text-[9px] font-black uppercase tracking-wide text-emerald-400">✅ Pembetulan</p>
                <p className="text-xs leading-relaxed text-emerald-100/80">{k.contohBetul}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-white/45">{k.nota}</p>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 8. Formula Karangan Cemerlang ───────────────────────────────────────────

function FormulaKaranganCemerlangSection({ color }: { color: string }) {
  return (
    <CollapsibleGroup title="Formula Karangan Cemerlang" icon="🧮" color={color}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Karangan Pendek</p>
          <p className="mb-3 text-sm font-black text-white">P + IHK + IHK + IHK + KH</p>
          <div className="flex flex-col items-center gap-1">
            {FORMULA_KARANGAN_PENDEK_CEMERLANG.map((step, i) => (
              <div key={i} className="flex w-full flex-col items-center">
                <div className="w-full rounded-xl border px-3 py-2 text-center text-xs font-bold text-white" style={{ borderColor: `${color}35`, background: "rgba(255,255,255,0.04)" }}>
                  <span style={{ color }}>{step.kod}</span> — {step.maksud}
                </div>
                {i < FORMULA_KARANGAN_PENDEK_CEMERLANG.length - 1 && <span className="my-0.5 text-xs text-white/25">↓</span>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Karangan Panjang</p>
          <div className="flex flex-col items-center gap-1">
            {FORMULA_KARANGAN_PANJANG_CEMERLANG.map((step, i) => (
              <div key={i} className="flex w-full flex-col items-center">
                <div className="w-full rounded-xl border px-3 py-2 text-center text-xs font-bold text-white" style={{ borderColor: `${color}35`, background: "rgba(255,255,255,0.04)" }}>
                  {step}
                </div>
                {i < FORMULA_KARANGAN_PANJANG_CEMERLANG.length - 1 && <span className="my-0.5 text-xs text-white/25">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <MiniCard title="Upgrade huraian" text="Setiap isi mesti diterangkan dengan sebab, cara dan kesan." color={color} />
        <MiniCard title="Kata hikmat" text="Selitkan kata hikmat yang sesuai untuk menambah kematangan ayat." color={color} />
        <MiniCard title="Ayat gramatis" text="Gunakan struktur ayat yang tepat, pelbagai dan kemas." color={color} />
        <MiniCard title="Markah tinggi" text="Pemeriksa lebih mudah memberi markah baik jika jawapan tersusun dan padat." color={color} />
      </div>
    </CollapsibleGroup>
  );
}

// ─── 9. Cabaran Tingkatkan Karangan ──────────────────────────────────────────

function CabaranTingkatkanKaranganSection({ color }: { color: string }) {
  return (
    <CollapsibleGroup title="Cabaran Tingkatkan Karangan" icon="🎮" color="#A78BFA" countLabel={`${CABARAN_TINGKATKAN_KARANGAN.length} tahap`}>
      <div className="space-y-4">
        {CABARAN_TINGKATKAN_KARANGAN.map((lvl) => (
          <div key={lvl.level} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
                {lvl.level}
              </span>
              <p className="text-sm font-bold text-white">{lvl.tajuk}</p>
            </div>
            <p className="mb-3 text-xs text-white/45">{lvl.arahan}</p>
            <div className="space-y-2.5">
              {lvl.items.map((it, i) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-2.5">
                  <p className="mb-2 text-xs leading-relaxed text-white/70">{it.soalan}</p>
                  <RevealAnswer>
                    <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs leading-relaxed text-emerald-100/80">
                      {it.jawapanContoh}
                    </p>
                  </RevealAnswer>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleGroup>
  );
}

// ─── 10. Petua Pemeriksa UASA ─────────────────────────────────────────────────

function PetuaPemeriksaSection({ color }: { color: string }) {
  return (
    <CollapsibleGroup title="Petua Pemeriksa UASA" icon="🎯" color={color}>
      <div className="space-y-2 mb-4">
        {PETUA_PEMERIKSA_UASA.map((tip, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/5 p-2.5">
            <span className="mt-0.5 shrink-0 text-emerald-400">✅</span>
            <p className="text-xs leading-relaxed text-white/70">{tip}</p>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-500/15 to-emerald-500/15 p-4">
        <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
        <div>
          <p className="mb-0.5 text-[10px] font-black uppercase tracking-wide text-yellow-300">🏆 Rahsia Karangan Cemerlang</p>
          <p className="text-xs leading-relaxed text-white/80">{RAHSIA_KARANGAN_CEMERLANG}</p>
        </div>
      </div>
    </CollapsibleGroup>
  );
}

// ─── Main export — ADDED sections only ───────────────────────────────────────

export function EssayImprovementPlusSections({ color }: { color: string }) {
  return (
    <div className="space-y-4">
      <AyatLemahCemerlangSection color={color} />
      <KosaKataMenarikSection color={color} />
      <FrasaMenarikSection />
      <PenandaWacanaCemerlangSection />
      <PeribahasaMarkahTinggiSection />
      <TeknikImbakSection color={color} />
      <KesalahanLazimPlusSection />
      <FormulaKaranganCemerlangSection color={color} />
      <CabaranTingkatkanKaranganSection color={color} />
      <PetuaPemeriksaSection color={color} />
    </div>
  );
}
