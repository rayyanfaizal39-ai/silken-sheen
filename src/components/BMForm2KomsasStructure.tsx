import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  Lightbulb,
  ListChecks,
  Music2,
  Palette,
  Quote,
  ShieldAlert,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  GraduationCap,
  Landmark,
  MapPin,
  Scale,
} from "lucide-react";
import {
  BM_FORM2_KOMSAS_CATEGORIES,
  BM_FORM2_KOMSAS_WORKS,
  BM_FORM2_NOVEL_WORKS,
  type Form2KomsasWork,
} from "@/data/bm-form2-komsas-structure";
import { PANTUN_ALAM_REMAJA } from "@/data/bm-form2-pantun-alam-remaja";
import { PANTUN_KIASAN } from "@/data/bm-form2-pantun-kiasan";
import { PANTUN_BUDI } from "@/data/bm-form2-pantun-budi";
import { PANTUN_NASIHAT } from "@/data/bm-form2-pantun-nasihat";
import { PANTUN_KASIH_SAYANG } from "@/data/bm-form2-pantun-kasih-sayang";
import { SYAIR_NASIHAT } from "@/data/bm-form2-syair-nasihat";
import { DALAM_PERSEKITARAN_KATA_KATA } from "@/data/bm-form2-dalam-persekitaran-kata-kata";
import { ROTI } from "@/data/bm-form2-roti";
import { KUCARI_DAMAI_DI_SINI } from "@/data/bm-form2-kucari-damai-di-sini";
import { PADA_SEKUNTUM_MAWAR } from "@/data/bm-form2-pada-sekuntum-mawar";
import { PELANDUK_MENGAJAR_MEMERANG } from "@/data/bm-form2-pelanduk-mengajar-memerang";
import { BMForm2PelandukContent } from "@/components/BMForm2PelandukContent";
import { BANJIR_DI_MATA_EMAK } from "@/data/bm-form2-banjir-di-mata-emak";
import { BMForm2BanjirContent } from "@/components/BMForm2BanjirContent";
import { TALIA_DAN_RAKSASA_QADQAD } from "@/data/bm-form2-talia-dan-raksasa-qadqad";
import { BMForm2TaliaContent } from "@/components/BMForm2TaliaContent";
import { MENUAI_EMAS } from "@/data/bm-form2-menuai-emas";
import { BMForm2MenuaiEmasContent } from "@/components/BMForm2MenuaiEmasContent";
import { MAHKAMAH } from "@/data/bm-form2-mahkamah";
import { BMForm2MahkamahContent } from "@/components/BMForm2MahkamahContent";
import { BMForm2MenitiImpianContent } from "@/components/BMForm2MenitiImpianContent";
import { BMForm2JejakMonpusContent } from "@/components/BMForm2JejakMonpusContent";
import { BMForm2DarahTitikContent } from "@/components/BMForm2DarahTitikContent";
import { BMForm2JalanKePuncakContent } from "@/components/BMForm2JalanKePuncakContent";
import { BMForm2NovelPlaceholderContent } from "@/components/BMForm2NovelPlaceholderContent";
import { BMForm3PuisiContent } from "@/components/BMForm3PuisiContent";
import { BMForm3ProsaContent } from "@/components/BMForm3ProsaContent";
import { SELOKA_SANTAP_ISTIADAT } from "@/data/bm-form3-seloka-santap-istiadat";
import { KIJANG_YANG_LELAH } from "@/data/bm-form3-kijang-yang-lelah";
import { PESAN_IBU_BERIBU_RIBU } from "@/data/bm-form3-pesan-ibu-beribu-ribu";
import { SENJA_DI_PALANG_BESI } from "@/data/bm-form3-senja-di-palang-besi";
import { BINTANG } from "@/data/bm-form3-bintang";
import { LEGASI_TAPAI_UBI } from "@/data/bm-form3-legasi-tapai-ubi";
import { SEKEPING_TANAH } from "@/data/bm-form3-sekeping-tanah";
import { BAWOD } from "@/data/bm-form3-bawod";
import { TENANG_TENANG_AIR_DI_TASIK } from "@/data/bm-form3-tenang-tenang-air-di-tasik";

const ACCENT = "#C084FC";
const FOCUS_ITEMS = [
  "Maksud setiap rangkap",
  "Tema",
  "Persoalan",
  "Gaya bahasa",
  "Nilai murni",
  "Pengajaran",
  "Persediaan UASA",
];
const RANGKAP_TAGS = [
  "Kepulangan ibu",
  "Hilang kerisauan",
  "Kegembiraan",
  "Adik-beradik",
  "Ibu dan bapa",
  "Pemberian hadiah",
  "Anak kecil",
];
const RANGKAP_VALUES = [
  "Kasih sayang",
  "Rasa selamat",
  "Kasih sayang",
  "Hubungan erat",
  "Kasih sayang",
  "Baik hati",
  "Hormat",
];
const VALUE_COLORS = ["#FB7185", "#FBBF24", "#34D399", "#60A5FA"];
const NOVEL_ZONES: Record<string, string> = {
  "meniti-impian": "Selangor · Kuala Lumpur · Putrajaya · Negeri Sembilan",
  "darah-titik-di-semantan": "Johor · Sabah · Sarawak · Labuan",
  "jejak-monpus": "Melaka · Pahang · Terengganu · Kelantan",
  "jalan-ke-puncak": "Perlis · Kedah · Pulau Pinang · Perak",
};
const LANGUAGE_ICONS = ["🌿", "💬", "↔", "🎵", "🔁", "✨"];

function WorkCard({
  work,
  index,
  onSelect,
  color = ACCENT,
}: {
  work: Form2KomsasWork;
  index: number;
  onSelect: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-left transition-all hover:border-white/[0.14] hover:bg-white/[0.06]"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white/60"
        style={{ background: `${color}15` }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="mb-1 block text-[9px] font-black tracking-wide"
          style={{ color, opacity: 0.7 }}
        >
          {work.category}
        </span>
        <span className="block truncate text-sm font-semibold text-white">{work.title}</span>
        {work.kind === "novel" && NOVEL_ZONES[work.id] && (
          <span className="mt-2 flex items-start gap-1.5 rounded-lg border border-sky-300/15 bg-sky-300/[0.06] px-2.5 py-2 text-[10px] leading-4 text-sky-100/70">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-sky-300" />
            <span>
              <strong className="text-sky-200">Zon:</strong> {NOVEL_ZONES[work.id]}
            </span>
          </span>
        )}
      </span>
      <ArrowRight
        className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60"
        style={{ color }}
      />
    </button>
  );
}

export function Pill({ children, color = ACCENT }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black"
      style={{ borderColor: `${color}35`, background: `${color}14`, color }}
    >
      {children}
    </span>
  );
}

function WorkHero({
  work,
  formLabel = "Tingkatan 2",
  genreLabel,
  description,
  metadata,
  attribution,
}: {
  work: Form2KomsasWork;
  formLabel?: string;
  genreLabel?: string;
  description?: string;
  metadata?: string[];
  attribution?: string;
}) {
  const isAlamRemaja = work.id === "pantun-alam-remaja";
  const isKiasan = work.id === "pantun-kiasan";
  const isBudi = work.id === "pantun-budi";
  const isNasihat = work.id === "pantun-nasihat";
  const isKasihSayang = work.id === "pantun-kasih-sayang";
  const isSyairNasihat = work.id === "syair-nasihat-penghujung-thamarat-al-muhimmah";
  const isDalamPersekitaran = work.id === "dalam-persekitaran-kata-kata";
  const isRoti = work.id === "roti";
  const isKucariDamai = work.id === "kucari-damai-di-sini";
  const isPadaSekuntumMawar = work.id === "pada-sekuntum-mawar";
  const isPelanduk = work.id === "pelanduk-mengajar-memerang";
  const isBanjir = work.id === "banjir-di-mata-emak";
  const isTalia = work.id === "talia-dan-raksasa-qadqad";
  const isMenuaiEmas = work.id === "menuai-emas";
  const isMahkamah = work.id === "mahkamah";
  const populated =
    isAlamRemaja ||
    isKiasan ||
    isBudi ||
    isNasihat ||
    isKasihSayang ||
    isSyairNasihat ||
    isDalamPersekitaran ||
    isRoti ||
    isKucariDamai ||
    isPadaSekuntumMawar ||
    isPelanduk ||
    isBanjir ||
    isTalia ||
    isMenuaiEmas ||
    isMahkamah;
  const introduction = isKasihSayang
    ? "Pantun yang menggambarkan perasaan cinta dan kasih sayang yang mendalam terhadap seseorang."
    : isKiasan
      ? "Pantun yang menyindir pelbagai ragam manusia melalui bahasa kiasan serta mengajak pembaca menilai sikap dalam kehidupan."
      : isNasihat
        ? "Pantun yang menyampaikan nasihat sebagai panduan dalam menjalani kehidupan seharian."
        : isBudi
          ? "Pantun yang menonjolkan kepentingan budi bahasa, mengenang jasa dan kebijaksanaan dalam kehidupan."
          : isSyairNasihat
            ? "Syair nasihat tentang ilmu, agama, amanah dan kebijaksanaan dalam menjalankan pemerintahan."
            : isDalamPersekitaran
              ? "Sajak tentang bahasa sebagai anugerah Tuhan yang menghubungkan manusia dengan ilmu, kehidupan dan alam sekitar."
              : isRoti
                ? "Sajak tentang kesyukuran atas rezeki serta keinsafan terhadap kesengsaraan manusia yang kurang bernasib baik."
                : isKucariDamai
                  ? "Sajak tentang kedamaian, kemakmuran dan semangat cinta akan tanah air yang merdeka."
                  : isPadaSekuntumMawar
                    ? "Sajak tentang nasihat seorang ibu agar anak gadis menjaga maruah diri, akhlak dan keimanan."
                    : isPelanduk
                      ? "Prosa tradisional tentang kebijaksanaan dan keadilan dalam menyelesaikan masalah rakyat."
                      : isBanjir
                        ? "Cerpen tentang ketabahan seorang ibu menghadapi dugaan serta kasih sayang dan keprihatinan sesama manusia."
                        : isTalia
                          ? "Cerpen tentang kebaikan yang dibalas dengan kebaikan serta perjuangan mempertahankan keluarga dan alam."
                          : isMenuaiEmas
                            ? "Cerpen tentang kegigihan dan ketabahan seorang belia membangunkan pertanian moden hingga berjaya."
                            : isMahkamah
                              ? "Drama tentang keadilan, pembelaan dan pertimbangan bukti dalam perbicaraan mahkamah."
                              : "Sebuah pantun tentang kegembiraan anak-anak menyambut kepulangan ibu bapa serta kasih sayang yang menyatukan keluarga.";
  return (
    <section className="relative mb-7 overflow-hidden rounded-2xl border border-purple-300/15 bg-[#111226] p-5 sm:p-7">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.16),transparent_65%)]" />
      <div className="relative max-w-2xl">
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill>{genreLabel ?? work.category}</Pill>
          <Pill color="#FBBF24">
            <Trophy className="h-3 w-3" /> Fokus UASA
          </Pill>
        </div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/35">
          Bahasa Melayu · {formLabel}
        </p>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">{work.title}</h1>
        {attribution && (
          <p className="mt-2 text-xs font-semibold text-purple-200/70">{attribution}</p>
        )}
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{description}</p>
        )}
        {populated && (
          <>
            <p className="mt-2 text-xs font-semibold text-purple-200/70">
              {isKasihSayang
                ? `Penyelenggara: ${PANTUN_KASIH_SAYANG.editor}`
                : isKiasan
                  ? `Penyelenggara: ${PANTUN_KIASAN.editor}`
                  : isNasihat
                    ? `Penyelenggara: ${PANTUN_NASIHAT.editor}`
                    : isSyairNasihat
                      ? `Penyelenggara: ${SYAIR_NASIHAT.editor}`
                      : isDalamPersekitaran
                        ? `Pengarang: ${DALAM_PERSEKITARAN_KATA_KATA.editor}`
                        : isRoti
                          ? `Pengarang: ${ROTI.editor}`
                          : isKucariDamai
                            ? `Pengarang: ${KUCARI_DAMAI_DI_SINI.editor}`
                            : isPadaSekuntumMawar
                              ? `Pengarang: ${PADA_SEKUNTUM_MAWAR.editor}`
                              : isPelanduk
                                ? `Penyelenggara: ${PELANDUK_MENGAJAR_MEMERANG.editor}`
                                : isBanjir
                                  ? `Pengarang: ${BANJIR_DI_MATA_EMAK.editor}`
                                  : isTalia
                                    ? `Pengarang: ${TALIA_DAN_RAKSASA_QADQAD.editor}`
                                    : isMenuaiEmas
                                      ? `Pengarang: ${MENUAI_EMAS.editor}`
                                      : isMahkamah
                                        ? `Pengarang: ${MAHKAMAH.editor}`
                                        : isBudi
                                          ? `Penyelenggara: ${PANTUN_BUDI.editor}`
                                          : "Pengarang tidak diketahui"}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{introduction}</p>
          </>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {metadata?.map((item) => (
            <Pill key={item} color="#60A5FA">
              {item}
            </Pill>
          ))}
          {populated && (
            <>
              <Pill color="#60A5FA">
                <BookOpen className="h-3 w-3" /> Puisi tradisional
              </Pill>
              {!isBudi && !isNasihat && (
                <>
                  <Pill color="#34D399">
                    <Clock3 className="h-3 w-3" /> {isKiasan ? "25 minit" : "12 minit"}
                  </Pill>
                  <Pill color="#FB7185">
                    <Star className="h-3 w-3" /> {isKiasan ? "Sederhana" : "Mudah"}
                  </Pill>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function PantunKiasanContent() {
  const note = PANTUN_KIASAN;
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle
            icon={<Target className="h-5 w-5" />}
            eyebrow="Misi Pembelajaran"
            title="Baca kiasan, fahami sindiran"
            color="#60A5FA"
          />
          <p className="mb-4 max-w-2xl text-sm leading-7 text-white/65">{note.introduction}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "17 maksud rangkap",
              "Tema dan persoalan",
              "Gaya bahasa",
              "Unsur bunyi dan nada",
              "Nilai dan pengajaran",
              "Kosa kata",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Fahami Kiasan"
          title="Maksud Mengikut Rangkap"
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {note.meanings.map((meaning, index) => (
            <article
              key={meaning}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.055]"
            >
              <div className="mb-3 flex items-center justify-between">
                <Pill>Rangkap {index + 1}</Pill>
                <Quote className="h-4 w-4 text-white/20" />
              </div>
              <p className="text-sm leading-6 text-white/70">{meaning}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold text-white">{note.theme.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{note.theme.explanation}</p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.issues.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {index + 1}
                </span>
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-6 text-white/60">{item.explanation}</p>
              <div className="mt-3">
                <Pill color="#60A5FA">{item.reference}</Pill>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Bahasa Berkias"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.language.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">{LANGUAGE_ICONS[index]}</span>
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/50">{item.definition}</p>
              <div className="mt-3 space-y-2">
                {item.examples.map((example) => (
                  <p
                    key={example}
                    className="rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs italic leading-5 text-amber-100/80"
                  >
                    "{example}"
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Unsur Bunyi"
          color="#22D3EE"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.sound.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"
            >
              <Pill color="#22D3EE">{item.title}</Pill>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.definition}</p>
              <p className="mt-2 text-sm font-semibold italic leading-6 text-white/80">
                "{item.example}"
              </p>
              <p className="mt-2 text-[10px] font-bold text-cyan-200/55">{item.reference}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Suasana Karya"
          title="Nada"
          color="#FB7185"
        />
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-5">
          <Pill color="#FB7185">{note.tone.title}</Pill>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/75">
            {note.tone.explanation}
          </p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai Murni"
          color="#FB7185"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border bg-white/[0.03] p-4"
              style={{ borderColor: `${VALUE_COLORS[index]}25` }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4" style={{ color: VALUE_COLORS[index] }} />
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-6 text-white/60">{item.meaning}</p>
              <div className="mt-3 rounded-xl bg-black/15 p-3 text-xs leading-5 text-white/70">
                {item.example}
              </div>
              <div className="mt-3">
                <Pill color={VALUE_COLORS[index]}>{item.reference}</Pill>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          eyebrow="Amalkan"
          title="Pengajaran"
          color="#34D399"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.lessons.map((item) => (
            <article
              key={item.title}
              className="flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/55">{item.explanation}</p>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Kamus Mini"
          title="Kosa Kata"
          color="#C084FC"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {note.vocabulary.map((item) => (
            <article
              key={item.word}
              className="rounded-2xl border border-purple-300/10 bg-purple-300/[0.05] p-4"
            >
              <h3 className="font-display text-base font-bold text-purple-200">{item.word}</h3>
              <p className="mt-2 text-xs leading-5 text-white/55">{item.meaning}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-[#151327]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <SectionTitle
              icon={<Lightbulb className="h-5 w-5" />}
              eyebrow="Ulang Kaji Bersama"
              title="Cikgu AcadeMY"
              color="#C084FC"
            />
            <p className="text-sm leading-7 text-white/65">
              Cari ragam manusia dalam setiap rangkap, kemudian padankan sikap itu dengan persoalan,
              nilai dan pengajaran yang sesuai.
            </p>
          </div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            <TeacherTip icon={<Star className="h-4 w-4" />} title="Paling Penting" color="#FBBF24">
              Ingat tema ragam manusia, nada sinis dan empat nilai utama.
            </TeacherTip>
            <TeacherTip icon={<Target className="h-4 w-4" />} title="Soalan UASA" color="#34D399">
              Kenal pasti kehendak soalan sebelum memilih tema, persoalan atau pengajaran.
            </TeacherTip>
            <TeacherTip
              icon={<BookOpen className="h-4 w-4" />}
              title="Tip Menghafal"
              color="#60A5FA"
            >
              Kelompokkan rangkap mengikut sikap manusia supaya maksud lebih mudah diingat.
            </TeacherTip>
            <TeacherTip
              icon={<ShieldAlert className="h-4 w-4" />}
              title="Kesalahan Lazim"
              color="#FB7185"
            >
              Jangan salin maksud rangkap apabila soalan meminta pengajaran.
            </TeacherTip>
            <TeacherTip
              icon={<CheckCircle2 className="h-4 w-4" />}
              title="Cara Menjawab"
              color="#C084FC"
            >
              Tulis isi dengan tepat dan sokong menggunakan rangkap atau contoh yang berkaitan.
            </TeacherTip>
          </div>
        </div>
      </StudySection>
    </div>
  );
}

function PantunBudiContent() {
  const note = PANTUN_BUDI;
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle
            icon={<Target className="h-5 w-5" />}
            eyebrow="Misi Pembelajaran"
            title="Budi dikenang, ilmu dikuasai"
            color="#60A5FA"
          />
          <p className="mb-4 max-w-2xl text-sm leading-7 text-white/65">{note.mission}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Budi bahasa",
              "Mengenang jasa",
              "Tema dan persoalan",
              "Nilai murni",
              "Pengajaran",
              "Persediaan UASA",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Lihat dan Fahami"
          title="Pantun dalam Ilustrasi"
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {note.illustrations.map((explanation, index) => (
            <article
              key={explanation}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.055]"
            >
              <div className="mb-3 flex items-center justify-between">
                <Pill>Rangkap {index + 1}</Pill>
                <Quote className="h-4 w-4 text-white/20" />
              </div>
              <p className="text-sm leading-6 text-white/75">{explanation}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold text-white">{note.theme.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">{note.theme.example}</p>
          <div className="mt-3">
            <Pill color="#F472B6">{note.theme.reference}</Pill>
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.issues.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{item.example}</p>
              <div className="mt-3">
                <Pill color="#60A5FA">{item.reference}</Pill>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Unsur Bunyi"
          color="#22D3EE"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.sound.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"
            >
              <Pill color="#22D3EE">{item.title}</Pill>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.detail}</p>
              <p className="mt-2 text-sm font-semibold italic leading-6 text-white/80">
                "{item.example}"
              </p>
              <p className="mt-2 text-[10px] font-bold text-cyan-200/55">{item.reference}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Suasana Karya"
          title="Nada"
          color="#FB7185"
        />
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-5">
          <Pill color="#FB7185">{note.tone.title}</Pill>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/75">
            {note.tone.explanation}
          </p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Bahasa Berirama"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.language.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <h3 className="mb-3 font-bold text-white">{item.title}</h3>
              <div className="space-y-2">
                {item.examples.map((example) => (
                  <p
                    key={example}
                    className="rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs italic leading-5 text-amber-100/80"
                  >
                    "{example}"
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai Murni"
          color="#FB7185"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((item, index) => {
            const color = VALUE_COLORS[index % VALUE_COLORS.length];
            return (
              <article
                key={item.title}
                className="rounded-2xl border bg-white/[0.03] p-4"
                style={{ borderColor: `${color}25` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" style={{ color }} />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-sm leading-6 text-white/65">{item.example}</p>
                <div className="mt-3">
                  <Pill color={color}>{item.reference}</Pill>
                </div>
              </article>
            );
          })}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          eyebrow="Amalkan"
          title="Pengajaran"
          color="#34D399"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((item) => (
            <article
              key={item.title}
              className="flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/60">{item.lesson}</p>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Kamus Mini"
          title="Kosa Kata"
          color="#C084FC"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {note.vocabulary.map((item) => (
            <article
              key={item.word}
              className="rounded-2xl border border-purple-300/10 bg-purple-300/[0.05] p-4"
            >
              <h3 className="font-display text-base font-bold text-purple-200">{item.word}</h3>
              <p className="mt-2 text-xs leading-5 text-white/55">{item.meaning}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-[#151327]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <SectionTitle
              icon={<Lightbulb className="h-5 w-5" />}
              eyebrow="Ulang Kaji Bersama"
              title="Cikgu AcadeMY"
              color="#C084FC"
            />
            <p className="text-sm leading-7 text-white/65">
              Gunakan kata kunci dan struktur jawapan yang tepat untuk mengulang kaji dengan lebih
              teratur.
            </p>
          </div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            <TeacherTip
              icon={<Star className="h-4 w-4" />}
              title="Apa yang penting?"
              color="#FBBF24"
            >
              Asingkan tema, persoalan, nilai murni dan pengajaran dalam empat kumpulan nota.
            </TeacherTip>
            <TeacherTip icon={<Target className="h-4 w-4" />} title="Fokus UASA" color="#34D399">
              Baca kata tugas soalan dan pilih kategori jawapan sebelum menulis.
            </TeacherTip>
            <TeacherTip
              icon={<BookOpen className="h-4 w-4" />}
              title="Tip Menghafal"
              color="#60A5FA"
            >
              Gunakan kad imbas: istilah di hadapan, penerangan dan contoh di belakang.
            </TeacherTip>
            <TeacherTip
              icon={<ShieldAlert className="h-4 w-4" />}
              title="Kesalahan Lazim"
              color="#FB7185"
            >
              Jangan campurkan label nilai murni dengan ayat pengajaran.
            </TeacherTip>
            <TeacherTip
              icon={<CheckCircle2 className="h-4 w-4" />}
              title="Cara Menjawab"
              color="#C084FC"
            >
              Mulakan dengan isi yang diminta, kemudian sertakan contoh atau rujukan rangkap yang
              sepadan.
            </TeacherTip>
          </div>
        </div>
      </StudySection>
    </div>
  );
}

function AdvicePoemContent({
  note,
  illustrationTitle,
  focusTitle,
  focusItems,
  showVocabulary = true,
}: {
  note:
    | typeof PANTUN_NASIHAT
    | typeof SYAIR_NASIHAT
    | typeof DALAM_PERSEKITARAN_KATA_KATA
    | typeof ROTI
    | typeof KUCARI_DAMAI_DI_SINI
    | typeof PADA_SEKUNTUM_MAWAR;
  illustrationTitle: string;
  focusTitle: string;
  focusItems: readonly string[];
  showVocabulary?: boolean;
}) {
  const illustrationIcons = [
    <Lightbulb className="h-6 w-6" />,
    <ShieldAlert className="h-6 w-6" />,
    <Heart className="h-6 w-6" />,
    <Quote className="h-6 w-6" />,
    <Users className="h-6 w-6" />,
    <Star className="h-6 w-6" />,
    <Target className="h-6 w-6" />,
    <GraduationCap className="h-6 w-6" />,
    <Scale className="h-6 w-6" />,
    <Landmark className="h-6 w-6" />,
    <BookOpen className="h-6 w-6" />,
    <CheckCircle2 className="h-6 w-6" />,
    <Users className="h-6 w-6" />,
    <Quote className="h-6 w-6" />,
    <Heart className="h-6 w-6" />,
    <Sparkles className="h-6 w-6" />,
    <ListChecks className="h-6 w-6" />,
    <Music2 className="h-6 w-6" />,
    <Trophy className="h-6 w-6" />,
  ];

  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle
            icon={<Target className="h-5 w-5" />}
            eyebrow="Fokus Pembelajaran"
            title={focusTitle}
            color="#60A5FA"
          />
          <p className="mb-4 max-w-2xl text-sm leading-7 text-white/65">{note.focus}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {focusItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Lihat dan Fahami"
          title={illustrationTitle}
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {note.illustrations.map((explanation, index) => (
            <article
              key={explanation}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] transition-all hover:-translate-y-0.5 hover:border-purple-300/20 hover:bg-white/[0.055]"
            >
              <div className="flex min-h-28 items-center justify-center border-b border-white/[0.06] bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.14),transparent_65%)] text-purple-300 transition-transform duration-300 group-hover:scale-105">
                {illustrationIcons[index]}
              </div>
              <div className="p-4">
                <Pill>Rangkap {index + 1}</Pill>
                <p className="mt-3 text-sm leading-6 text-white/75">{explanation}</p>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold text-white">{note.theme.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">{note.theme.example}</p>
          <div className="mt-3">
            <Pill color="#F472B6">{note.theme.reference}</Pill>
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.issues.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{item.example}</p>
              <div className="mt-3">
                <Pill color="#60A5FA">{item.reference}</Pill>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Unsur Bunyi"
          color="#22D3EE"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.sound.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"
            >
              <Pill color="#22D3EE">{item.title}</Pill>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.detail}</p>
              <p className="mt-2 text-sm font-semibold italic leading-6 text-white/80">
                "{item.example}"
              </p>
              <p className="mt-2 text-[10px] font-bold text-cyan-200/55">{item.reference}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Suasana Karya"
          title="Nada"
          color="#FB7185"
        />
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-5">
          <Pill color="#FB7185">{note.tone.title}</Pill>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/75">
            {note.tone.explanation}
          </p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Bahasa Berirama"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.language.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <h3 className="mb-3 font-bold text-white">{item.title}</h3>
              <div className="space-y-2">
                {item.examples.map((example) => (
                  <p
                    key={example}
                    className="rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs italic leading-5 text-amber-100/80"
                  >
                    "{example}"
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      {"form" in note && (
        <StudySection>
          <SectionTitle
            icon={<ListChecks className="h-5 w-5" />}
            eyebrow="Kenali Struktur"
            title="Bentuk"
            color="#34D399"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {note.form.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4 transition-colors hover:bg-emerald-300/[0.07]"
              >
                <Pill color="#34D399">{item.title}</Pill>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/75">{item.detail}</p>
              </article>
            ))}
          </div>
        </StudySection>
      )}

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai Murni & Pengajaran"
          color="#FB7185"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((item, index) => {
            const color = VALUE_COLORS[index % VALUE_COLORS.length];
            return (
              <article
                key={item.title}
                className="rounded-2xl border bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                style={{ borderColor: `${color}25` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" style={{ color }} />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35">
                      Pengajaran
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{item.lesson}</p>
                  </div>
                  <div className="rounded-xl bg-black/15 p-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35">
                      Contoh daripada buku teks
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/70">{item.example}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Pill color={color}>{item.reference}</Pill>
                </div>
              </article>
            );
          })}
        </div>
      </StudySection>

      {showVocabulary && (
        <StudySection>
          <SectionTitle
            icon={<BookOpen className="h-5 w-5" />}
            eyebrow="Kamus Mini"
            title="Kosa Kata"
            color="#C084FC"
          />
          {note.vocabulary.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {note.vocabulary.map((item) => (
                <article
                  key={item.word}
                  className="rounded-2xl border border-purple-300/10 bg-purple-300/[0.05] p-4 transition-all hover:-translate-y-0.5 hover:border-purple-300/20"
                >
                  <h3 className="font-display text-base font-bold text-purple-200">{item.word}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/55">{item.meaning}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-purple-300/10 bg-purple-300/[0.05] p-4 text-sm leading-6 text-white/55">
              Tiada entri kosa kata dipaparkan pada halaman rujukan yang dilampirkan.
            </div>
          )}
        </StudySection>
      )}
    </div>
  );
}

function PantunKasihSayangContent() {
  const note = PANTUN_KASIH_SAYANG;
  const illustrationIcons = [
    <Heart className={"h-7 w-7"} />,
    <Users className={"h-7 w-7"} />,
    <Sparkles className={"h-7 w-7"} />,
    <Quote className={"h-7 w-7"} />,
    <Star className={"h-7 w-7"} />,
  ];
  const focusItems = [
    "Ilustrasi lima rangkap",
    "Tema dan persoalan",
    "Unsur bunyi",
    "Nada romantik",
    "Gaya bahasa",
    "Nilai, pengajaran dan kosa kata",
  ];

  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle
            icon={<Target className="h-5 w-5" />}
            eyebrow="Fokus Pembelajaran"
            title="Kasih difahami, mesej dikuasai"
            color="#60A5FA"
          />
          <p className="mb-4 max-w-2xl text-sm leading-7 text-white/65">{note.focus}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {focusItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Lihat dan Fahami"
          title="Pantun dalam Ilustrasi"
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {note.illustrations.map((explanation, index) => (
            <article
              key={explanation}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] transition-all hover:-translate-y-0.5 hover:border-purple-300/20 hover:bg-white/[0.055]"
            >
              <div className="flex min-h-28 items-center justify-center border-b border-white/[0.06] bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.14),transparent_65%)] text-purple-300">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {illustrationIcons[index]}
                </span>
              </div>
              <div className="p-4">
                <Pill>Rangkap {index + 1}</Pill>
                <p className="mt-3 text-sm leading-6 text-white/75">{explanation}</p>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold leading-7 text-white">
            {note.theme.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">{note.theme.example}</p>
          <div className="mt-3">
            <Pill color="#F472B6">{note.theme.reference}</Pill>
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.issues.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{item.example}</p>
              <div className="mt-3">
                <Pill color="#60A5FA">{item.reference}</Pill>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Unsur Bunyi"
          color="#22D3EE"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.sound.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"
            >
              <Pill color="#22D3EE">{item.title}</Pill>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.detail}</p>
              <p className="mt-2 text-sm font-semibold italic leading-6 text-white/80">
                "{item.example}"
              </p>
              <p className="mt-2 text-[10px] font-bold text-cyan-200/55">{item.reference}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Suasana Karya"
          title="Nada"
          color="#FB7185"
        />
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-5">
          <Pill color="#FB7185">{note.tone.title}</Pill>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/75">
            {note.tone.explanation}
          </p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Bahasa Berirama"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.language.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
            >
              <h3 className="mb-3 font-bold text-white">{item.title}</h3>
              <div className="space-y-2">
                {item.examples.map((example) => (
                  <p
                    key={example}
                    className="rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs italic leading-5 text-amber-100/80"
                  >
                    "{example}"
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai Murni & Pengajaran"
          color="#FB7185"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((item, index) => {
            const color = VALUE_COLORS[index % VALUE_COLORS.length];
            return (
              <article
                key={item.title}
                className="rounded-2xl border bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                style={{ borderColor: `${color}25` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" style={{ color }} />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35">
                      Pengajaran
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{item.lesson}</p>
                  </div>
                  <div className="rounded-xl bg-black/15 p-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35">
                      Contoh daripada buku teks
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/70">{item.example}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Pill color={color}>{item.reference}</Pill>
                </div>
              </article>
            );
          })}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Kamus Mini"
          title="Kosa Kata"
          color="#C084FC"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {note.vocabulary.map((item) => (
            <article
              key={item.word}
              className="rounded-2xl border border-purple-300/10 bg-purple-300/[0.05] p-4 transition-all hover:-translate-y-0.5 hover:border-purple-300/20"
            >
              <h3 className="font-display text-base font-bold text-purple-200">{item.word}</h3>
              <p className="mt-2 text-xs leading-5 text-white/55">{item.meaning}</p>
            </article>
          ))}
        </div>
      </StudySection>
    </div>
  );
}

export function SectionTitle({
  icon,
  eyebrow,
  title,
  color,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  color: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${color}16`, color }}
      >
        {icon}
      </span>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>
          {eyebrow}
        </p>
        <h2 className="font-display text-lg font-bold text-white">{title}</h2>
      </div>
    </div>
  );
}

export function StudySection({ children }: { children: ReactNode }) {
  return <section className="py-7 first:pt-0">{children}</section>;
}

function PantunAlamRemajaContent() {
  const note = PANTUN_ALAM_REMAJA;
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle
            icon={<Target className="h-5 w-5" />}
            eyebrow="Fokus Pembelajaran"
            title="Hari ini anda akan menguasai"
            color="#60A5FA"
          />
          <p className="mb-4 max-w-2xl text-sm leading-6 text-white/60">{note.mission}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Fahami Cerita"
          title="Maksud Setiap Rangkap"
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {note.meanings.map((meaning, index) => (
            <article
              key={meaning}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.055]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <Pill>Rangkap {index + 1}</Pill>
                <Quote className="h-4 w-4 text-white/20" />
              </div>
              <p className="text-sm leading-6 text-white/75">{meaning}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill color="#60A5FA">{RANGKAP_TAGS[index]}</Pill>
                <Pill color="#FB7185">
                  <Heart className="h-3 w-3" /> {RANGKAP_VALUES[index]}
                </Pill>
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <p className="mt-4 font-display text-lg font-bold leading-7 text-white">{note.theme}</p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.issues.map((item, index) => (
            <article
              key={item}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                {index + 1}
              </div>
              <p className="text-sm font-semibold leading-6 text-white/75">{item}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kenali Bentuk"
          title="Bentuk dan Ciri-ciri Pantun"
          color="#34D399"
        />
        <div className="flex flex-wrap gap-2">
          {note.form.map((item) => (
            <Pill key={item} color="#34D399">
              <CheckCircle2 className="h-3 w-3" />
              {item}
            </Pill>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Bahasa Berirama"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {note.language.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">{LANGUAGE_ICONS[index]}</span>
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/50">{item.definition}</p>
              <div className="mt-3 rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs leading-5 text-amber-100/80">
                <strong>Contoh:</strong> {item.example}
              </div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Unsur Bunyi"
          color="#22D3EE"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.sound.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"
            >
              <Pill color="#22D3EE">{item.title}</Pill>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.definition}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/80">{item.example}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai Murni"
          color="#FB7185"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border bg-white/[0.03] p-4"
              style={{ borderColor: `${VALUE_COLORS[index]}25` }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4" style={{ color: VALUE_COLORS[index] }} />
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-6 text-white/60">{item.explanation}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          eyebrow="Amalkan"
          title="Pengajaran"
          color="#34D399"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {note.lessons.map((item) => (
            <article
              key={item}
              className="flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-sm font-semibold leading-6 text-white/75">
                Kita hendaklah {item.charAt(0).toLowerCase() + item.slice(1)}
              </p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-[#151327]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <SectionTitle
              icon={<Lightbulb className="h-5 w-5" />}
              eyebrow="Bersama Guru"
              title="Cikgu AcadeMY Terangkan"
              color="#C084FC"
            />
            <p className="text-sm leading-7 text-white/65">{note.teacher}</p>
          </div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
            <TeacherTip
              icon={<Lightbulb className="h-4 w-4" />}
              title="Tahukah Anda?"
              color="#FBBF24"
            >
              Dua baris awal pantun ialah pembayang, manakala dua baris akhir membawa maksud.
            </TeacherTip>
            <TeacherTip
              icon={<Target className="h-4 w-4" />}
              title="Tip Menjawab UASA"
              color="#34D399"
            >
              Nyatakan isi, kemudian kaitkan jawapan dengan kepulangan ibu bapa dan kegembiraan
              anak-anak.
            </TeacherTip>
            <TeacherTip
              icon={<ShieldAlert className="h-4 w-4" />}
              title="Kesilapan Lazim"
              color="#FB7185"
            >
              Jangan kelirukan tema dengan persoalan. Tema ialah gagasan utama seluruh pantun.
            </TeacherTip>
          </div>
        </div>
      </StudySection>
    </div>
  );
}

function TeacherTip({
  icon,
  title,
  color,
  children,
}: {
  icon: ReactNode;
  title: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#111022] p-5">
      <div className="mb-2 flex items-center gap-2 text-xs font-black" style={{ color }}>
        {icon}
        {title}
      </div>
      <p className="text-xs leading-5 text-white/55">{children}</p>
    </div>
  );
}

export function BMForm2KomsasWorkStructure({ work }: { work: Form2KomsasWork }) {
  const [open, setOpen] = useState(false);
  const folderColor = work.kind === "novel" ? "#FB923C" : ACCENT;
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-20 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${folderColor}18`, color: folderColor }}
          >
            <BookOpen className="h-5 w-5" />
          </span>
          <span>
            <span
              className="block text-[9px] font-black uppercase tracking-widest"
              style={{ color: `${folderColor}A6` }}
            >
              Folder Pembelajaran
            </span>
            <span className="mt-1 block font-display text-base font-bold text-white sm:text-lg">
              {work.title}
            </span>
            {work.kind === "novel" && NOVEL_ZONES[work.id] && (
              <span className="mt-2 flex max-w-xl items-start gap-1.5 rounded-lg border border-sky-300/15 bg-sky-300/[0.06] px-2.5 py-2 text-[10px] leading-4 text-sky-100/70">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-sky-300" />
                <span>
                  <strong className="text-sky-200">Zon:</strong> {NOVEL_ZONES[work.id]}
                </span>
              </span>
            )}
          </span>
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 transition-transform duration-300"
          style={{ color: folderColor, transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          {work.id === "pantun-budi" ||
          work.id === "pantun-nasihat" ||
          work.id === "pantun-kasih-sayang" ||
          work.id === "syair-nasihat-penghujung-thamarat-al-muhimmah" ||
          work.id === "dalam-persekitaran-kata-kata" ||
          work.id === "roti" ||
          work.id === "kucari-damai-di-sini" ||
          work.id === "pada-sekuntum-mawar" ||
          work.id === "pelanduk-mengajar-memerang" ||
          work.id === "banjir-di-mata-emak" ||
          work.id === "talia-dan-raksasa-qadqad" ||
          work.id === "menuai-emas" ||
          work.id === "mahkamah" ||
          work.id === "meniti-impian" ||
          work.id === "darah-titik-di-semantan" ||
          work.id === "jejak-monpus" ||
          work.id === "jalan-ke-puncak" ? (
            open ? (
              <div className="border-t border-white/[0.07] p-3 sm:p-5">
                {work.id !== "meniti-impian" &&
                  work.id !== "jejak-monpus" &&
                  work.id !== "darah-titik-di-semantan" &&
                  work.id !== "jalan-ke-puncak" && <WorkHero work={work} />}
                {work.id === "jalan-ke-puncak" ? (
                  <BMForm2JalanKePuncakContent />
                ) : work.id === "darah-titik-di-semantan" ? (
                  <BMForm2DarahTitikContent />
                ) : work.id === "jejak-monpus" ? (
                  <BMForm2JejakMonpusContent />
                ) : work.id === "meniti-impian" ? (
                  <BMForm2MenitiImpianContent />
                ) : work.id === "mahkamah" ? (
                  <BMForm2MahkamahContent />
                ) : work.id === "menuai-emas" ? (
                  <BMForm2MenuaiEmasContent />
                ) : work.id === "talia-dan-raksasa-qadqad" ? (
                  <BMForm2TaliaContent />
                ) : work.id === "banjir-di-mata-emak" ? (
                  <BMForm2BanjirContent />
                ) : work.id === "pelanduk-mengajar-memerang" ? (
                  <BMForm2PelandukContent />
                ) : work.id === "pantun-kasih-sayang" ? (
                  <PantunKasihSayangContent />
                ) : work.id === "pantun-budi" ? (
                  <PantunBudiContent />
                ) : work.id === "pantun-nasihat" ? (
                  <AdvicePoemContent
                    note={PANTUN_NASIHAT}
                    illustrationTitle="Pantun dalam Ilustrasi"
                    focusTitle="Nasihat difahami, kehidupan dipandu"
                    focusItems={[
                      "Panduan kehidupan",
                      "Keharmonian rumah tangga",
                      "Budi bahasa",
                      "Ketabahan",
                      "Kebijaksanaan",
                      "Kosa kata",
                    ]}
                  />
                ) : work.id === "syair-nasihat-penghujung-thamarat-al-muhimmah" ? (
                  <AdvicePoemContent
                    note={SYAIR_NASIHAT}
                    illustrationTitle="Syair dalam Ilustrasi"
                    focusTitle="Ilmu memandu kepimpinan"
                    focusItems={[
                      "18 rangkap",
                      "Tema dan persoalan",
                      "Unsur bunyi",
                      "Nada dan gaya bahasa",
                      "Nilai dan pengajaran",
                      "Kosa kata",
                    ]}
                  />
                ) : work.id === "dalam-persekitaran-kata-kata" ? (
                  <AdvicePoemContent
                    note={DALAM_PERSEKITARAN_KATA_KATA}
                    illustrationTitle="Sajak dalam Ilustrasi"
                    focusTitle="Bahasa membuka makna kehidupan"
                    focusItems={[
                      "5 rangkap",
                      "Tema dan persoalan",
                      "Unsur bunyi",
                      "Nada dan gaya bahasa",
                      "Nilai dan pengajaran",
                      "Kosa kata",
                    ]}
                  />
                ) : work.id === "roti" ? (
                  <AdvicePoemContent
                    note={ROTI}
                    illustrationTitle="Sajak dalam Ilustrasi"
                    focusTitle="Rezeki disyukuri, insan diinsafi"
                    focusItems={[
                      "5 rangkap",
                      "Tema dan persoalan",
                      "Unsur bunyi",
                      "Nada dan gaya bahasa",
                      "Bentuk",
                      "Nilai dan pengajaran",
                    ]}
                    showVocabulary={false}
                  />
                ) : work.id === "kucari-damai-di-sini" ? (
                  <AdvicePoemContent
                    note={KUCARI_DAMAI_DI_SINI}
                    illustrationTitle="Sajak dalam Ilustrasi"
                    focusTitle="Damai dipelihara, negara dicintai"
                    focusItems={[
                      "3 rangkap",
                      "Tema dan persoalan",
                      "Unsur bunyi",
                      "Nada dan gaya bahasa",
                      "Bentuk",
                      "Nilai dan pengajaran",
                    ]}
                    showVocabulary={false}
                  />
                ) : (
                  <AdvicePoemContent
                    note={PADA_SEKUNTUM_MAWAR}
                    illustrationTitle="Sajak dalam Ilustrasi"
                    focusTitle="Maruah dijaga, iman diperkukuh"
                    focusItems={[
                      "3 rangkap",
                      "Tema dan persoalan",
                      "Unsur bunyi",
                      "Nada dan gaya bahasa",
                      "Bentuk",
                      "Nilai dan pengajaran",
                    ]}
                    showVocabulary={false}
                  />
                )}
              </div>
            ) : null
          ) : (
            <div className="border-t border-white/[0.07] p-3 sm:p-5">
              <WorkHero work={work} />
              {work.id === "pantun-alam-remaja" && <PantunAlamRemajaContent />}
              {work.id === "pantun-kiasan" && <PantunKiasanContent />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const SYAIR_BURUNG_NURI_RANGKAP = [
  "Penyair memulakan warkah dengan perasaan rendah diri. Dia bimbang buah fikirannya yang kurang sempurna akan dianggap salah.",
  "Seseorang akan dipandang hina jika tidak berakal waras, tidak bersopan santun, berakhlak rendah dan hidup dalam kemiskinan.",
  "Penyair memohon maaf jika warkahnya kurang menarik kerana ditulis ketika hatinya kecewa.",
  "Penyair menekankan kepentingan menjaga adab, khususnya kepada pasangan yang bercinta agar hubungan tidak berakhir dengan kekecewaan.",
  "Penyair menceritakan nasib malang yang berulang sehingga menyebabkan dirinya terus bersedih dan boleh memudaratkan diri.",
  "Kehidupan penyair terumbang-ambing tanpa arah sehingga dirinya tidak terurus dan melupakan makan serta minum.",
  "Penyair sedar bahawa kekecewaan berpanjangan tidak memberikan manfaat dan hanya menghancurkan kehidupan.",
  "Penyair sedar bahawa kekecewaan melampau boleh menghilangkan kewarasan sehingga dia merasakan mati lebih baik daripada terus menderita.",
];

const SYAIR_BURUNG_NURI_ISSUES = [
  [
    "Kepentingan ilmu pengetahuan dan akhlak mulia",
    "Keperibadian seseorang dinilai melalui kebijaksanaan, kesopanan dan akhlaknya.",
  ],
  [
    "Kekecewaan yang boleh merosakkan kehidupan",
    "Emosi yang tidak dikawal boleh menyebabkan kehidupan seseorang terbiar dan hancur.",
  ],
  [
    "Kebijaksanaan mengawal diri ketika bercinta",
    "Pasangan yang bercinta perlu menjaga adab dan meluahkan perasaan melalui saluran yang betul.",
  ],
  [
    "Rasional dalam berfikir dan bertindak",
    "Kewarasan akal penting supaya seseorang tidak bertindak mengikut emosi dan kata hati.",
  ],
] as const;

export function InfoCards({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([title, detail]) => (
        <article key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{detail}</p>
        </article>
      ))}
    </div>
  );
}

function SyairBurungNuriContent() {
  const focus = [
    "Memahami maksud tersurat dan tersirat setiap rangkap.",
    "Mengenal pasti tema dan persoalan.",
    "Menganalisis bentuk, gaya bahasa dan keindahan bunyi.",
    "Menghayati nilai dan pengajaran.",
    "Menjawab soalan UASA berkaitan syair.",
  ];
  const facts = [
    ["Rangkap", "8"],
    ["Baris setiap rangkap", "4"],
    ["Fungsi baris", "Semua baris ialah maksud"],
    ["Kata sebaris", "3 hingga 6 patah kata"],
    ["Suku kata sebaris", "10 hingga 13"],
    ["Rima akhir", "a-a-a-a"],
    ["Bentuk", "Terikat"],
  ] as const;
  const language = [
    ["Inversi", "Pembalikan susunan kata.", "“Dituliskan sahifah supaya nyata”"],
    ["Simile", "Perbandingan menggunakan kata bandingan.", "“Laksana cermin jatuh ke batu”"],
    ["Sinkope", "Penyingkatan kata.", "“Sajak dan nazam banyak tak kena”"],
    ["Repetisi", "Pengulangan perkataan.", "“Hanyutlah badan ke sana ke mari”"],
  ] as const;
  const values = [
    ["Kesedaran", "Penyair sedar akan kesan buruk apabila terlalu menurut perasaan kecewa."],
    ["Merendah diri", "Penyair tidak meninggikan diri ketika menulis warkah."],
    ["Rasional", "Seseorang perlu menggunakan akal yang waras sebelum bertindak."],
    ["Hemah tinggi", "Adab dan sopan santun perlu diutamakan dalam kehidupan."],
  ] as const;
  const lessons = [
    "Kita hendaklah merendah diri dalam pergaulan.",
    "Kita hendaklah insaf akan kesalahan yang dilakukan.",
    "Kita janganlah terlalu mementingkan percintaan sehingga menjejaskan kehidupan.",
    "Kita tidak boleh berputus asa apabila ditimpa nasib malang.",
    "Kita janganlah bertindak mengikut kata hati sehingga membawa kemudaratan.",
  ];
  const objectiveQuestions = [
    {
      question: "Apakah maksud rangkap pertama Syair Burung Nuri?",
      options: [
        "Penyair bangga dengan penulisan warkahnya.",
        "Penyair merasa rendah diri semasa menulis warkah.",
        "Penyair marah kepada orang yang menghinanya.",
        "Penyair ingin memuji kehebatan dirinya.",
      ],
      answer: "Penyair merasa rendah diri semasa menulis warkah.",
    },
    {
      question: "Berdasarkan syair, apakah ciri-ciri individu yang dianggap hina?",
      options: [
        "Individu yang tidak berharta.",
        "Individu yang tidak berakal dan kurang sopan.",
        "Individu yang gagal dalam percintaan.",
        "Individu yang tidak pandai menulis syair.",
      ],
      answer: "Individu yang tidak berakal dan kurang sopan.",
    },
    {
      question: "Pilih contoh gaya bahasa simile yang tepat.",
      options: [
        "Dituliskan sahifah supaya nyata.",
        "Hanyutlah badan ke sana ke mari.",
        "Laksana cermin jatuh ke batu.",
        "Sajak dan nazam banyak tak kena.",
      ],
      answer: "Laksana cermin jatuh ke batu.",
    },
    {
      question: "Antara berikut, yang manakah merupakan ciri bentuk syair ini?",
      options: [
        "Berbentuk bebas.",
        "Mempunyai rima akhir a-b-a-b.",
        "Terdiri daripada lapan rangkap.",
        "Setiap rangkap mempunyai dua baris.",
      ],
      answer: "Terdiri daripada lapan rangkap.",
    },
    {
      question: "Apakah pengajaran yang ingin disampaikan oleh penyair dalam rangkap terakhir?",
      options: [
        "Kita perlulah rajin bekerja.",
        "Kita mestilah berani menghadapi musuh.",
        "Kita janganlah bertindak mengikut kata hati.",
        "Kita hendaklah sentiasa gembira.",
      ],
      answer: "Kita janganlah bertindak mengikut kata hati.",
    },
  ];
  const subjectiveQuestions = [
    {
      question: 'Nyatakan maksud baris "Sajak dan nazam banyak tak kena" mengikut konteks syair.',
      answer:
        "Maksudnya ialah hasil penulisan atau buah fikiran penyair dianggap kurang menarik atau kurang sempurna.",
    },
    {
      question: "Apakah kesan sekiranya seseorang terlalu menuruti perasaan kecewa?",
      answer:
        "Kehidupan seseorang boleh menjadi hancur, tidak terurus, dan menyebabkan fikiran menjadi tidak waras.",
    },
    {
      question: "Berikan satu contoh gaya bahasa inversi yang terdapat dalam syair.",
      answer: "Dituliskan sahifah supaya nyata.",
    },
    {
      question: "Apakah nilai yang ditekankan oleh penyair dalam rangkap ketujuh?",
      answer:
        "Nilai kesedaran, iaitu sedar bahawa tidak ada gunanya hidup dalam kekecewaan yang melampau.",
    },
    {
      question: "Berapakah bilangan suku kata yang terdapat dalam sebaris syair ini?",
      answer: "Antara sepuluh hingga tiga belas suku kata sebaris.",
    },
  ];
  const kbatQuestions = [
    {
      question: "Mengapakah kita perlu mempunyai akal fikiran yang waras sebelum melakukan sesuatu tindakan?",
      answer:
        "Supaya kita dapat membuat keputusan yang bijak, mengelakkan berlakunya kesilapan yang boleh merugikan diri sendiri, dan memastikan tindakan kita tidak menyinggung perasaan orang lain.",
    },
    {
      question:
        "Pada pendapat anda, bagaimanakah cara terbaik untuk meluahkan perasaan kecewa selain menulis surat atau warkah?",
      answer:
        "Berbincang dengan ibu bapa atau guru kaunseling, melakukan aktiviti riadah untuk mengalihkan perhatian, atau berdoa kepada Tuhan untuk mendapatkan ketenangan jiwa.",
    },
    {
      question: "Sejauh manakah adab mencerminkan peribadi seseorang murid di sekolah?",
      answer:
        "Adab yang baik seperti menghormati guru dan rakan menunjukkan murid tersebut mempunyai disiplin diri yang tinggi dan mendapat didikan yang sempurna, sekali gus membantu mereka menjadi insan yang berjaya.",
    },
  ];
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <SectionTitle
          icon={<Target className="h-5 w-5" />}
          eyebrow="Fokus Pembelajaran"
          title="Fokus Pembelajaran"
          color="#60A5FA"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {focus.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-xl bg-sky-300/[0.06] px-4 py-3 text-sm text-white/70"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Kenali Karya"
          title="Pengenalan"
          color="#A78BFA"
        />
        <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.06] p-5 text-sm leading-7 text-white/70">
          Syair Burung Nuri ialah puisi tradisional dalam Antologi Bintang Hati. Syair ini berbentuk
          warkah yang meluahkan perasaan penyair tentang adab, ilmu dan cabaran emosi dalam
          kehidupan.
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Quote className="h-5 w-5" />}
          eyebrow="Maksud Keseluruhan"
          title="Maksud Keseluruhan"
          color="#FBBF24"
        />
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5 sm:p-6">
          <p className="text-sm leading-7 text-white/70">
            Syair ini menceritakan rintihan seorang penyair yang berasa rendah diri dan serba
            kekurangan. Penyair menekankan kepentingan akal budi dan adab serta mengingatkan bahawa
            kekecewaan dalam percintaan boleh menghancurkan kehidupan sekiranya tidak dikawal dengan
            fikiran yang waras.
          </p>
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Rangkap"
          title="Maksud Setiap Rangkap"
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {SYAIR_BURUNG_NURI_RANGKAP.map((detail, index) => (
            <article
              key={detail}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-400/10 text-xs font-black text-purple-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-white">Rangkap {index + 1}</h3>
              </div>
              <p className="text-sm leading-6 text-white/65">{detail}</p>
            </article>
          ))}
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold text-white">
            Adab dalam kehidupan seseorang
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Penyair menekankan kepentingan menjaga tingkah laku, akal budi dan kewarasan emosi
            ketika menghadapi cabaran hidup.
          </p>
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Lightbulb className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {SYAIR_BURUNG_NURI_ISSUES.map(([title, detail], index) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{detail}</p>
            </article>
          ))}
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Binaan Karya"
          title="Bentuk dan Ciri-ciri"
          color="#34D399"
        />
        <InfoCards items={facts} />
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Seni Bahasa"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {language.map(([title, detail, evidence]) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/55">{detail}</p>
              <p className="mt-3 rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-sm italic text-amber-100/80">
                {evidence}
              </p>
            </article>
          ))}
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Keindahan Bunyi"
          color="#22D3EE"
        />
        <InfoCards
          items={[
            ["Asonansi", "Pengulangan bunyi vokal “a”. Bukti: “Bermula warkah surat rencana”"],
            [
              "Aliterasi",
              "Pengulangan bunyi konsonan “t”. Bukti: “Gundahlah fikir tiada tertentu”",
            ],
          ]}
        />
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Suara Penyair"
          title="Nada"
          color="#A78BFA"
        />
        <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.06] p-5">
          <h3 className="font-bold text-white">Nada Melankolik</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Nada ini lahir daripada luahan kesedihan, nasib malang dan kekecewaan penyair.
          </p>
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai"
          color="#FB7185"
        />
        <InfoCards items={values} />
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<GraduationCap className="h-5 w-5" />}
          eyebrow="Amalkan"
          title="Pengajaran"
          color="#34D399"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {lessons.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-xs font-black text-emerald-300">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-white/65">{item}</p>
            </div>
          ))}
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Target className="h-5 w-5" />}
          eyebrow="Fokus Peperiksaan"
          title="Fokus UASA"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <h3 className="font-bold text-white">Bentuk soalan</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Objektif Aneka Pilihan
              <br />
              Pemahaman Petikan
              <br />
              Respons Terhad
            </p>
          </article>
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <h3 className="font-bold text-white">Aspek popular</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Maksud rangkap · Tema · Persoalan · Gaya bahasa · Nilai · Pengajaran · Bentuk syair
            </p>
          </article>
          <article className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
            <h3 className="font-bold text-amber-200">Perangkap biasa</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Nilai ditulis sebagai satu kata atau frasa, manakala pengajaran ditulis sebagai ayat
              arahan.
            </p>
            <p className="mt-3 text-xs text-white/70">
              <strong>Nilai:</strong> Rasional
              <br />
              <strong>Pengajaran:</strong> Kita hendaklah berfikir secara rasional sebelum
              bertindak.
            </p>
          </article>
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Uji Penguasaan"
          title="Contoh Soalan UASA"
          color="#C084FC"
        />
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan Objektif</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {objectiveQuestions.map((q, index) => (
                <ObjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  options={q.options}
                  answer={q.answer}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan Subjektif</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {subjectiveQuestions.map((q, index) => (
                <SubjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  answer={q.answer}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan KBAT</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {kbatQuestions.map((q, index) => (
                <SubjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  answer={q.answer}
                  answerLabel="Jawapan (Cadangan)"
                  badgeColor="indigo"
                />
              ))}
            </div>
          </div>
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Ulang Kaji Pantas"
          title="Nota Kilat"
          color="#60A5FA"
        />
        <InfoCards
          items={[
            ["Jenis", "Syair"],
            ["Rangkap", "8"],
            ["Baris", "4 setiap rangkap"],
            ["Rima", "a-a-a-a"],
            ["Tema", "Adab dalam kehidupan"],
            ["Inti pati", "Jangan biarkan kekecewaan menguasai akal. Utamakan adab dan kewarasan."],
          ]}
        />
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<Landmark className="h-5 w-5" />}
          eyebrow="Wajib Ingat"
          title="Fakta Penting"
          color="#FBBF24"
        />
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
          <ul className="space-y-2">
            {[
              "Syair mempunyai 8 rangkap.",
              "Setiap rangkap mempunyai 4 baris.",
              "Semua baris ialah maksud.",
              "Rima akhir ialah a-a-a-a.",
              "Setiap baris mempunyai 10 hingga 13 suku kata.",
              "Syair berbentuk terikat.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </StudySection>
      <StudySection>
        <SectionTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          eyebrow="Semak Kemajuan"
          title="Semak Penguasaan"
          color="#34D399"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Saya memahami maksud syair.",
            "Saya mengetahui tema.",
            "Saya boleh menghuraikan persoalan.",
            "Saya boleh mengenal pasti gaya bahasa.",
            "Saya memahami nilai dan pengajaran.",
            "Saya boleh menjawab soalan UASA.",
          ].map((item) => (
            <label
              key={item}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/65"
            >
              <input type="checkbox" className="h-4 w-4 accent-emerald-400" />
              {item}
            </label>
          ))}
        </div>
      </StudySection>
    </div>
  );
}

export function ObjectiveQuestion({
  index,
  question,
  options,
  answer,
}: {
  index: number;
  question: string;
  options: readonly string[];
  answer: string;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-xs font-black text-sky-300">
          {index}
        </span>
        <p className="text-sm font-semibold leading-6 text-white/80">{question}</p>
      </div>
      <div className="ml-10 grid gap-2 sm:grid-cols-2">
        {options.map((option, i) => (
          <div
            key={option}
            className={`rounded-xl px-3 py-2 text-xs leading-5 ${
              option === answer
                ? "border border-emerald-300/30 bg-emerald-300/10 font-semibold text-emerald-200"
                : "border border-white/[0.06] bg-white/[0.02] text-white/55"
            }`}
          >
            {String.fromCharCode(65 + i)}. {option}
          </div>
        ))}
      </div>
    </article>
  );
}

export function SubjectiveQuestion({
  index,
  question,
  answer,
  answerLabel = "Jawapan",
  badgeColor = "purple",
}: {
  index: number;
  question: string;
  answer: string;
  answerLabel?: string;
  badgeColor?: "purple" | "indigo";
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-start gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
            badgeColor === "indigo"
              ? "bg-indigo-400/10 text-indigo-300"
              : "bg-purple-400/10 text-purple-300"
          }`}
        >
          {index}
        </span>
        <p className="text-sm font-semibold leading-6 text-white/80">{question}</p>
      </div>
      <div className="ml-10 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2.5 text-xs leading-5 text-emerald-100/80">
        <strong className="text-emerald-300">{answerLabel}: </strong>
        {answer}
      </div>
    </article>
  );
}

const BAHAGIA_SESUDAH_DERITA_SYNOPSIS = [
  "Sepasang suami isteri yang miskin dan berpakaian carik masuk ke negeri Anta Beranta untuk meminta sedekah, tetapi mereka dilempar batu dan kayu oleh orang ramai atas arahan Betara Angkasa Indera Dewa sehingga tubuh mereka bengkak-bengkak dan berdarah. Mereka melarikan diri ke hutan dan menemui sebiji ketupat basi serta buku tebu di tempat pembuangan sampah.",
  "Si isteri hamil tiga bulan dan mengidam buah mangga serta buah nangka daripada taman Maharaja Indera Dewa. Maharaja yang berhati mulia itu memberikan buah-buahan tersebut kepada mereka.",
  "Pada malam empat belas haribulan, lahirlah seorang bayi lelaki bernama Marakarma. Semasa menggali tanah untuk mendirikan tiang pondok, Si Miskin menjumpai tajau berisi emas. Dia menyeru kuasa anaknya, dan sekiranya benar anaknya itu anak dewa, dibinakanlah sebuah negeri lengkap bernama Puspa Sari.",
  "Si Miskin menjadi Maharaja Indera Angkasa dan isterinya menjadi Tuan Puteri Ratna Dewi. Mereka hidup bahagia dan dikurniakan anak kedua, seorang puteri bernama Tuan Puteri Nila Kesuma.",
];

const BAHAGIA_SESUDAH_DERITA_ISSUES = [
  [
    "Kecekalan hati menghadapi cabaran hidup",
    "Pasangan miskin ini tetap bersama walaupun hidup melarat dan diseksa.",
  ],
  [
    "Sikap memandang hina terhadap orang miskin",
    "Orang ramai di negeri Anta Beranta melempar batu dan kayu kepada pasangan yang berpakaian carik.",
  ],
  [
    "Kasih sayang seorang suami terhadap isteri",
    "Si suami sanggup menghadap raja demi memenuhi keinginan isterinya yang mengidam.",
  ],
  [
    "Kesetiaan isteri terhadap suami",
    "Tuan Puteri Ratna Dewi tetap setia mendampingi suaminya ketika mereka susah di hutan.",
  ],
  [
    "Sikap belas kasihan terhadap golongan miskin",
    "Maharaja Indera Dewa dan para peniaga memberi bantuan kepada Si Miskin.",
  ],
] as const;

const BAHAGIA_SESUDAH_DERITA_CHARACTERS = [
  {
    group: "Watak Utama",
    name: "Maharaja Indera Angkasa (Si Miskin)",
    traits: [
      {
        title: "Tabah",
        example: "Seorang yang sangat tabah mengharungi cabaran hidup dalam kemiskinan.",
      },
      { title: "Kasih sayang", example: "Seorang yang sangat sayang akan isterinya." },
      { title: "Bijaksana", example: "Merupakan seorang yang bijak." },
    ],
  },
  {
    group: "Watak Utama",
    name: "Tuan Puteri Ratna Dewi",
    traits: [
      { title: "Tabah dan setia", example: "Seorang yang tabah dan setia kepada suaminya." },
      {
        title: "Mementingkan diri",
        example:
          "Digambarkan sebagai seorang yang mementingkan diri sendiri (ketika mengidam).",
      },
    ],
  },
  {
    group: "Watak Sampingan",
    name: "Maharaja Indera Dewa",
    traits: [
      {
        title: "Berhati mulia",
        example: "Seorang pemerintah yang berhati mulia dan belas kasihan.",
      },
    ],
  },
  {
    group: "Watak Sampingan",
    name: "Betara Angkasa Indera Dewa",
    traits: [
      {
        title: "Tidak berperikemanusiaan",
        example:
          "Seorang yang tidak berperikemanusiaan kerana mengarahkan pengusiran pasangan miskin.",
      },
    ],
  },
];

const BAHAGIA_SESUDAH_DERITA_PLOT = [
  {
    title: "Permulaan",
    text: "Pasangan suami isteri yang miskin mencari rezeki dengan meminta sedekah di negeri Anta Beranta.",
  },
  {
    title: "Perkembangan",
    text: "Mereka diusir dari istana oleh Betara Angkasa Indera Dewa, dilempar batu, melarikan diri ke hutan, dan tinggal di kawasan pembuangan sampah sambil makan ketupat basi.",
  },
  {
    title: "Klimaks",
    text: "Maharaja Indera Dewa memberikan buah mangga dan nangka. Si Miskin menjumpai tajau berisi emas. Marakarma lahir dan si ayah menyeru kuasa anaknya untuk membina kota lengkap. Si Miskin menjadi raja bergelar Maharaja Indera Angkasa.",
  },
  {
    title: "Peleraian",
    text: "Kehidupan mereka amat bahagia, lahir puteri Nila Kesuma, dan majlis keraian diadakan selama empat puluh hari empat puluh malam.",
  },
];

function BahagiaSesudahDeritaContent() {
  const focus = [
    "Memahami jalan cerita sepasang suami isteri yang menempuh kesengsaraan sebelum mengecap kebahagiaan.",
    "Mengenal pasti Tema ketabahan dan Persoalan kemanusiaan dalam sastera klasik.",
    "Menganalisis Watak, Latar, dan Teknik Plot yang digunakan dalam prosa tradisional.",
    "Menghayati Nilai murni dan Pengajaran sebagai panduan hidup dan persediaan UASA.",
  ];
  const techniques = [
    ["Dialog", "Perbualan antara watak-watak dalam cerita."],
    ["Imbas Kembali", "Mengenangkan peristiwa yang telah berlaku."],
    ["Monolog", "Watak bercakap sendiri."],
    ["Pemerian", "Pengarang memerihalkan situasi atau keadaan fizikal watak."],
  ] as const;
  const settingsTempat = [
    ["Negeri Anta Beranta", "Tempat awal pasangan miskin meminta sedekah."],
    ["Hutan", "Tempat mereka melarikan diri dan tinggal."],
    ["Tempat pembuangan sampah", "Tempat mereka menemui makanan."],
    ["Taman Maharaja Indera Dewa", "Tempat terdapatnya buah mangga dan nangka."],
    ["Puspa Sari", "Negeri baharu yang dibina melalui kuasa sakti."],
  ] as const;
  const settingsMasa = [
    ["Waktu siang, petang dan malam", "Peristiwa berlaku sepanjang pelbagai waktu dalam sehari."],
    ["Tiga bulan", "Tempoh kehamilan isteri Si Miskin."],
    ["Malam empat belas haribulan", "Waktu kelahiran Marakarma."],
    [
      "Empat puluh hari empat puluh malam",
      "Tempoh majlis keraian kelahiran puteri.",
    ],
  ] as const;
  const settingsMasyarakat = [
    "Masyarakat yang memandang hina terhadap orang miskin.",
    "Masyarakat yang mengamalkan sikap kasih sayang dan belas kasihan.",
    "Masyarakat yang setia terhadap pasangan.",
    "Masyarakat yang percaya akan kuasa sakti.",
    "Masyarakat yang suka berhibur.",
  ];
  const language = [
    ["Bahasa Arab", "Contohnya, masyhur, Allah Taala, Wallahualam."],
    ["Bahasa Istana", "Contohnya, baginda, titah, kakanda, patik, berputeralah."],
    ["Bahasa Klasik", "Contohnya, hatta, cetera, adapun."],
    ["Simile", "“...rupa kainnya carik-carik berjurai-jurai seperti ubur-uburlah rupanya.”"],
    [
      "Repetisi",
      "“Maka ada yang memberi buah, ada yang memberi juadah; ada yang memberi nasi...”",
    ],
  ] as const;
  const values = [
    ["Kasih sayang", "Kesanggupan suami mencari ubat dan buah untuk isteri."],
    ["Kegigihan", "Usaha mencari rezeki walaupun dihina."],
    ["Ketabahan", "Cekal menempuh penderitaan hidup dalam kemiskinan."],
    ["Belas kasihan", "Bantuan yang diberikan oleh peniaga dan raja."],
    ["Ketaatan", "Isteri yang patuh kepada suami."],
  ] as const;
  const lessons = [
    "Kita perlulah gigih berusaha untuk mencapai sesuatu impian.",
    "Kita hendaklah mengamalkan sikap belas kasihan terhadap orang lain, terutamanya golongan miskin.",
    "Kita mestilah sayang-menyayangi antara ahli keluarga.",
    "Kita janganlah memandang hina terhadap orang lain hanya kerana rupa atau status ekonomi mereka.",
    "Isteri hendaklah taat kepada suami.",
  ];
  const objectiveQuestions = [
    {
      question: "Mengapakah Si Miskin dan isterinya dilempar dengan kayu dan batu?",
      options: [
        "Kerana mereka mencuri makanan di pasar.",
        "Kerana mereka memakai pakaian yang carik.",
        "Kerana mereka memasuki taman rahsia raja.",
        "Kerana mereka enggan bekerja.",
      ],
      answer: "Kerana mereka memakai pakaian yang carik.",
    },
    {
      question: "Apakah yang ditemui oleh pasangan itu di tempat pembuangan sampah?",
      options: [
        "Tajau berisi emas.",
        "Sebiji ketupat basi dan buku tebu.",
        "Pakaian baharu yang indah.",
        "Buah mangga dan nangka.",
      ],
      answer: "Sebiji ketupat basi dan buku tebu.",
    },
    {
      question: "Siapakah yang mengarahkan orang ramai mengusir pasangan miskin itu?",
      options: [
        "Maharaja Indera Dewa.",
        "Maharaja Indera Angkasa.",
        "Betara Angkasa Indera Dewa.",
        "Saudagar Anta Beranta.",
      ],
      answer: "Betara Angkasa Indera Dewa.",
    },
    {
      question: "Apakah nama negeri yang dibina melalui seruan kuasa anak dewa?",
      options: ["Anta Beranta.", "Keinderaan.", "Puspa Sari.", "Sungai Pencala."],
      answer: "Puspa Sari.",
    },
    {
      question: "Apakah nilai yang ditunjukkan oleh peniaga buah-buahan terhadap Si Miskin?",
      options: ["Keberanian.", "Kejujuran.", "Belas kasihan.", "Ketaatan."],
      answer: "Belas kasihan.",
    },
  ];
  const subjectiveQuestions = [
    {
      question: "Nyatakan dua perwatakan Si Miskin berdasarkan teks tersebut.",
      answer:
        "Seorang yang tabah mengharungi cabaran hidup dan seorang yang sangat sayang akan isterinya.",
    },
    {
      question:
        "Apakah yang dilakukan oleh Si Miskin apabila isterinya mengidam buah mangga di taman raja?",
      answer:
        "Si Miskin telah pergi menghadap Maharaja Indera Dewa untuk memohon sebiji buah mangga tersebut.",
    },
    {
      question: "Jelaskan latar masyarakat yang terdapat dalam prosa tradisional ini.",
      answer:
        "Masyarakat yang memandang hina terhadap orang miskin dan masyarakat yang percaya akan kuasa sakti.",
    },
    {
      question: "Berikan contoh gaya bahasa Simile yang digunakan oleh pengarang.",
      answer: "“...rupa kainnya carik-carik berjurai-jurai seperti ubur-uburlah rupanya.”",
    },
    {
      question: "Apakah kesudahan nasib pasangan miskin tersebut?",
      answer:
        "Mereka hidup bahagia menjadi raja dan permaisuri di negeri Puspa Sari serta dikurniakan dua orang cahaya mata.",
    },
  ];

  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <SectionTitle
          icon={<Target className="h-5 w-5" />}
          eyebrow="Fokus Pembelajaran"
          title="Misi Pembelajaran"
          color="#60A5FA"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {focus.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-xl bg-sky-300/[0.06] px-4 py-3 text-sm text-white/70"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Kenali Karya"
          title="Pengenalan"
          color="#A78BFA"
        />
        <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.06] p-5 text-sm leading-7 text-white/70">
          Prosa tradisional ini mengisahkan tentang kecekalan hati sepasang suami isteri yang hidup
          dalam kemiskinan yang melampau di sebuah negeri bernama Anta Beranta. Mereka dihina dan
          diseksa oleh masyarakat, namun takdir akhirnya mengubah nasib mereka menjadi raja dan
          permaisuri yang mulia setelah kelahiran cahaya mata mereka.
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Quote className="h-5 w-5" />}
          eyebrow="Ringkasan Karya"
          title="Sinopsis"
          color="#FBBF24"
        />
        <div className="space-y-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5 sm:p-6">
          {BAHAGIA_SESUDAH_DERITA_SYNOPSIS.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-white/70">
              {paragraph}
            </p>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Star className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold text-white">
            Ketabahan hidup sepasang suami isteri yang miskin tinggal di negeri Anta Beranta
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Mereka cekal mengharungi penderitaan, dihina masyarakat, dan kesusahan mencari rezeki
            sebelum akhirnya mencapai kebahagiaan.
          </p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Lightbulb className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {BAHAGIA_SESUDAH_DERITA_ISSUES.map(([title, detail], index) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{detail}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Users className="h-5 w-5" />}
          eyebrow="Kenali Watak"
          title="Watak dan Perwatakan"
          color="#FBBF24"
        />
        <div className="space-y-5">
          {BAHAGIA_SESUDAH_DERITA_CHARACTERS.map((c) => (
            <div key={c.name}>
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-300" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-300/60">
                    {c.group}
                  </p>
                  <h3 className="font-bold text-white">{c.name}</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {c.traits.map((t) => (
                  <article
                    key={t.title}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <h4 className="font-bold text-amber-200">{t.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-white/65">{t.example}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Jalan Cerita"
          title="Plot (Binaan Plot)"
          color="#34D399"
        />
        <div className="relative space-y-3 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-emerald-300/20">
          {BAHAGIA_SESUDAH_DERITA_PLOT.map((x, i) => (
            <div key={x.title} className="relative flex gap-4">
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-[#07140f]">
                {i + 1}
              </span>
              <article className="flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <h3 className="font-bold text-white">{x.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{x.text}</p>
              </article>
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Binaan Cerita"
          title="Teknik Plot"
          color="#22D3EE"
        />
        <InfoCards items={techniques} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<MapPin className="h-5 w-5" />}
          eyebrow="Dunia Karya"
          title="Latar"
          color="#A78BFA"
        />
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
              <MapPin className="h-4 w-4 text-purple-300" />
              Latar Tempat
            </h3>
            <InfoCards items={settingsTempat} />
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
              <MapPin className="h-4 w-4 text-purple-300" />
              Latar Masa
            </h3>
            <InfoCards items={settingsMasa} />
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
              <MapPin className="h-4 w-4 text-purple-300" />
              Latar Masyarakat
            </h3>
            <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.05] p-5">
              <ul className="space-y-2">
                {settingsMasyarakat.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Seni Bahasa"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <InfoCards items={language} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai"
          color="#FB7185"
        />
        <InfoCards items={values} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<GraduationCap className="h-5 w-5" />}
          eyebrow="Amalkan"
          title="Pengajaran"
          color="#34D399"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {lessons.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-xs font-black text-emerald-300">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-white/65">{item}</p>
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Target className="h-5 w-5" />}
          eyebrow="Strategi Peperiksaan"
          title="Tip UASA"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <h3 className="font-bold text-white">Bentuk Soalan</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Kerap keluar dalam Bahagian B (Pemahaman Petikan) yang menguji pemahaman maksud kata
              klasik atau istana.
            </p>
          </article>
          <article className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
            <h3 className="font-bold text-amber-200">Perangkap</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Murid sering keliru antara dua raja (Indera Dewa yang baik dan Betara Angkasa Indera
              Dewa yang zalim).
            </p>
          </article>
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <h3 className="font-bold text-white">Kunci Markah</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Hafal maksud istilah klasik seperti tajau (tempayan) dan hatta (maka/lalu) untuk
              soalan kosa kata.
            </p>
          </article>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Uji Penguasaan"
          title="Contoh Soalan UASA"
          color="#C084FC"
        />
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan Objektif (OAP)</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {objectiveQuestions.map((q, index) => (
                <ObjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  options={q.options}
                  answer={q.answer}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan Subjektif (SRT)</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {subjectiveQuestions.map((q, index) => (
                <SubjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  answer={q.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Ulang Kaji Pantas"
          title="Nota Kilat"
          color="#60A5FA"
        />
        <InfoCards
          items={[
            ["Watak Utama", "Si Miskin & Isteri (Raja disumpah)."],
            ["Tempat", "Anta Beranta (Duka) -> Puspa Sari (Bahagia)."],
            ["Punca Bahagia", "Kelahiran Marakarma & penemuan emas."],
            ["Mesej", "Jangan hina orang miskin, hargai kasih sayang."],
          ]}
        />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Landmark className="h-5 w-5" />}
          eyebrow="Wajib Ingat"
          title="Fakta Penting"
          color="#FBBF24"
        />
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
          <ul className="space-y-2">
            {[
              "WAJIB INGAT: Si Miskin asalnya raja keinderaan yang disumpah oleh Betara Guru.",
              "Isteri mengidam buah mangga dan buah nangka dari taman raja.",
              "Anak lelaki bernama Marakarma, anak perempuan bernama Nila Kesuma.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          eyebrow="Semak Kemajuan"
          title="Checklist Penguasaan"
          color="#34D399"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Saya memahami sinopsis cerita.",
            "Saya boleh membezakan watak raja yang baik dan raja yang zalim.",
            "Saya tahu maksud bahasa klasik dan istana yang digunakan.",
            "Saya boleh menghuraikan nilai dan pengajaran dalam teks.",
          ].map((item) => (
            <label
              key={item}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/65"
            >
              <input type="checkbox" className="h-4 w-4 accent-emerald-400" />
              {item}
            </label>
          ))}
        </div>
      </StudySection>
    </div>
  );
}

const POETRY_PLACEHOLDER_SECTIONS = [
  ["Misi Pembelajaran", "Fokus Pembelajaran", Target],
  ["Pengenalan", "Kenali Karya", BookOpen],
  ["Maksud Keseluruhan", "Fahami Karya", Quote],
  ["Maksud Setiap Rangkap", "Kupas Rangkap", ListChecks],
  ["Tema", "Idea Utama", Star],
  ["Persoalan", "Kupas Karya", Lightbulb],
  ["Bentuk dan Ciri-ciri", "Binaan Karya", Palette],
  ["Gaya Bahasa", "Seni Bahasa", Sparkles],
  ["Keindahan Bunyi", "Unsur Bunyi", Music2],
  ["Nada", "Suara Penyajak", Music2],
  ["Nilai", "Bina Peribadi", Heart],
  ["Pengajaran", "Amalkan", GraduationCap],
  ["Tip UASA", "Strategi Peperiksaan", Target],
  ["Latihan UASA", "Uji Penguasaan", ListChecks],
  ["Nota Kilat", "Ulang Kaji Pantas", Sparkles],
  ["Fakta Penting", "Wajib Ingat", Landmark],
  ["Checklist Penguasaan", "Semak Kemajuan", CheckCircle2],
] as const;

const STORY_PLACEHOLDER_SECTIONS = [
  ["Misi Pembelajaran", "Fokus Pembelajaran", Target],
  ["Pengenalan", "Kenali Karya", BookOpen],
  ["Sinopsis", "Ringkasan Karya", Quote],
  ["Tema", "Idea Utama", Star],
  ["Persoalan", "Kupas Karya", Lightbulb],
  ["Watak dan Perwatakan", "Kenali Watak", Users],
  ["Plot", "Jalan Cerita", ListChecks],
  ["Teknik Plot", "Binaan Cerita", Sparkles],
  ["Latar", "Dunia Karya", MapPin],
  ["Gaya Bahasa", "Seni Bahasa", Palette],
  ["Nilai", "Bina Peribadi", Heart],
  ["Pengajaran", "Amalkan", GraduationCap],
  ["Tip UASA", "Strategi Peperiksaan", Target],
  ["Latihan UASA", "Uji Penguasaan", ListChecks],
  ["Nota Kilat", "Ulang Kaji Pantas", Sparkles],
  ["Fakta Penting", "Wajib Ingat", Landmark],
  ["Checklist Penguasaan", "Semak Kemajuan", CheckCircle2],
] as const;

function KomsasComingSoon() {
  return (
    <div className="rounded-2xl border border-dashed border-purple-300/15 bg-purple-300/[0.04] px-5 py-7 text-center">
      <p className="text-sm font-semibold text-white/45">Coming Soon</p>
      <p className="mt-1 text-xs text-white/25">Kandungan bahagian ini akan ditambah kemudian.</p>
    </div>
  );
}

function PlaceholderWorkContent({ work }: { work: Form2KomsasWork }) {
  const sections =
    work.kind === "poem" || work.kind === "sajak"
      ? POETRY_PLACEHOLDER_SECTIONS
      : STORY_PLACEHOLDER_SECTIONS;
  return (
    <div className="divide-y divide-white/[0.06]">
      {sections.map(([title, eyebrow, Icon], index) => (
        <StudySection key={title}>
          <SectionTitle
            icon={<Icon className="h-5 w-5" />}
            eyebrow={eyebrow}
            title={title}
            color={VALUE_COLORS[index % VALUE_COLORS.length]}
          />
          {title === "Latihan UASA" ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {(work.kind === "poem" || work.kind === "sajak"
                ? ["Objektif (OAP)", "Subjektif (SRT)", "KBAT"]
                : ["Objektif", "Subjektif", "KBAT"]
              ).map((label) => (
                <div key={label}>
                  <p className="mb-2 text-xs font-bold text-white/60">{label}</p>
                  <KomsasComingSoon />
                </div>
              ))}
            </div>
          ) : (
            <KomsasComingSoon />
          )}
        </StudySection>
      ))}
    </div>
  );
}

const FORM3_WORK_META: Record<
  string,
  { genreLabel: string; description: string; attribution: string; metadata: string[] }
> = {
  "syair-burung-nuri": {
    genreLabel: "Puisi Tradisional · Syair",
    description:
      "Syair tentang adab, akal budi dan kesan buruk apabila seseorang membiarkan kekecewaan menguasai kehidupan.",
    attribution: "Antologi Bintang Hati",
    metadata: ["8 rangkap", "4 baris setiap rangkap", "Rima akhir a-a-a-a", "Bentuk terikat"],
  },
  "seloka-santap-istiadat": {
    genreLabel: "Puisi Tradisional · Seloka",
    description:
      "Seloka tentang tatacara makan dan minum yang beradat dalam majlis kebesaran, berdasarkan didikan generasi terdahulu.",
    attribution: "Za'ba",
    metadata: ["5 rangkap", "Bilangan baris tidak tetap", "Bentuk bebas"],
  },
  "kijang-yang-lelah": {
    genreLabel: "Sajak",
    description: "Sajak tentang kijang tua yang tabah mengharungi keperitan hidup di usia tua.",
    attribution: "Wan Marzuki Wan Ramli",
    metadata: ["4 rangkap", "Bentuk bebas", "Nada melankolik"],
  },
  "pesan-ibu-beribu-ribu": {
    genreLabel: "Sajak",
    description:
      "Sajak tentang seorang ibu yang tidak pernah jemu memberikan nasihat demi keselamatan dan kejayaan anaknya.",
    attribution: "Rahman Shaari",
    metadata: ["5 rangkap", "Bentuk bebas", "Nada melankolik"],
  },
  "senja-di-palang-besi": {
    genreLabel: "Sajak",
    description:
      "Sajak tentang kesengsaraan dan kesunyian seorang banduan yang hidup di dalam sel penjara.",
    attribution: "Pena Alam",
    metadata: ["3 rangkap", "Bentuk bebas", "Nada melankolik"],
  },
  bintang: {
    genreLabel: "Sajak",
    description:
      "Sajak tentang kasih sayang seorang anak yang menjadi cahaya kebahagiaan bagi ibu bapanya.",
    attribution: "Siti Zaleha M. Hashim",
    metadata: ["2 rangkap", "Bentuk bebas", "Nada romantis"],
  },
  "legasi-tapai-ubi": {
    genreLabel: "Cerpen",
    description:
      "Cerpen tentang kesungguhan seorang anak peniaga tapai ubi membuktikan khasiat makanan tradisional melalui sains.",
    attribution: "Ghazali Lateh",
    metadata: ["Cerpen", "Watak utama: Dr. Parjo"],
  },
  "sekeping-tanah": {
    genreLabel: "Cerpen",
    description:
      "Cerpen tentang konflik adik-beradik dalam menguruskan sebidang tanah pusaka keluarga di bandar.",
    attribution: "A. Rahman C.M.",
    metadata: ["Cerpen", "Watak utama: Hisyam bin Sulaiman"],
  },
  bawod: {
    genreLabel: "Cerpen",
    description:
      "Cerpen tentang hubungan akrab antara seorang murid sekolah dengan kerbau dan kambing peliharaannya.",
    attribution: "Janathan Kandok",
    metadata: ["Cerpen", "Watak utama: Beluntung"],
  },
  "tenang-tenang-air-di-tasik": {
    genreLabel: "Drama",
    description:
      "Drama tentang ekspedisi berkayak golongan kelainan upaya (OKU) dan sebuah rahsia keluarga yang besar.",
    attribution: "Norhashimah Hashim",
    metadata: ["Drama", "Latar: Permai Resort"],
  },
  "bahagia-sesudah-derita": {
    genreLabel: "Prosa Tradisional",
    description:
      "Kisah ini diambil daripada Hikayat Si Miskin yang menceritakan tentang sepasang suami isteri (raja yang disumpah) yang hidup melarat namun akhirnya kembali bahagia selepas kelahiran anak mereka, Marakarma.",
    attribution: "Hikayat Si Miskin",
    metadata: ["Prosa tradisional", "Hikayat Si Miskin"],
  },
};

function getFormThreeWorkContent(workId: string): ReactNode | null {
  switch (workId) {
    case "syair-burung-nuri":
      return <SyairBurungNuriContent />;
    case "seloka-santap-istiadat":
      return <BMForm3PuisiContent data={SELOKA_SANTAP_ISTIADAT} />;
    case "kijang-yang-lelah":
      return <BMForm3PuisiContent data={KIJANG_YANG_LELAH} />;
    case "pesan-ibu-beribu-ribu":
      return <BMForm3PuisiContent data={PESAN_IBU_BERIBU_RIBU} />;
    case "senja-di-palang-besi":
      return <BMForm3PuisiContent data={SENJA_DI_PALANG_BESI} />;
    case "bintang":
      return <BMForm3PuisiContent data={BINTANG} />;
    case "legasi-tapai-ubi":
      return <BMForm3ProsaContent data={LEGASI_TAPAI_UBI} />;
    case "sekeping-tanah":
      return <BMForm3ProsaContent data={SEKEPING_TANAH} />;
    case "bawod":
      return <BMForm3ProsaContent data={BAWOD} />;
    case "tenang-tenang-air-di-tasik":
      return <BMForm3ProsaContent data={TENANG_TENANG_AIR_DI_TASIK} />;
    case "bahagia-sesudah-derita":
      return <BahagiaSesudahDeritaContent />;
    default:
      return null;
  }
}

export function BMKomsasPlaceholderWorkStructure({
  work,
  formLabel,
  onBackToCategory,
  backLabel = "Kembali ke KOMSAS",
  onPrevious,
  previousLabel,
  onNext,
  nextLabel,
}: {
  work: Form2KomsasWork;
  formLabel: string;
  onBackToCategory?: () => void;
  backLabel?: string;
  onPrevious?: () => void;
  previousLabel?: string;
  onNext?: () => void;
  nextLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const meta = FORM3_WORK_META[work.id];
  const realContent = getFormThreeWorkContent(work.id);
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-20 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${ACCENT}18`, color: ACCENT }}
          >
            <BookOpen className="h-5 w-5" />
          </span>
          <span>
            <span
              className="block text-[9px] font-black uppercase tracking-widest"
              style={{ color: `${ACCENT}A6` }}
            >
              Folder Pembelajaran
            </span>
            <span className="mt-1 block font-display text-base font-bold text-white sm:text-lg">
              {work.title}
            </span>
          </span>
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 transition-transform duration-300"
          style={{ color: ACCENT, transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          {open && (
            <div className="border-t border-white/[0.07] p-3 sm:p-5">
              <WorkHero
                work={work}
                formLabel={formLabel}
                genreLabel={meta?.genreLabel}
                description={meta?.description}
                attribution={meta?.attribution}
                metadata={meta?.metadata}
              />
              {realContent ?? <PlaceholderWorkContent work={work} />}
              {realContent && (onBackToCategory || onPrevious || onNext) && (
                <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  {onPrevious ? (
                    <button
                      type="button"
                      onClick={onPrevious}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.09] sm:flex-1"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {previousLabel ? `Sebelumnya: ${previousLabel}` : "Sebelumnya"}
                    </button>
                  ) : (
                    <span className="hidden sm:block sm:flex-1" />
                  )}
                  {onBackToCategory && (
                    <button
                      type="button"
                      onClick={onBackToCategory}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.09]"
                    >
                      {backLabel}
                    </button>
                  )}
                  {onNext ? (
                    <button
                      type="button"
                      onClick={onNext}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-purple-400 sm:flex-1"
                    >
                      {nextLabel ? `Seterusnya: ${nextLabel}` : "Seterusnya"}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="hidden sm:block sm:flex-1" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function BMKomsasStructure({
  categories,
  works,
  onSelectWork,
}: {
  categories: readonly string[];
  works: Form2KomsasWork[];
  onSelectWork: (workId: string) => void;
}) {
  return (
    <div>
      {categories.map((category) => {
        const categoryWorks = works.filter((work) => work.category === category);
        return (
          <section key={category} className="mb-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2
                className="text-[11px] font-black uppercase tracking-wide"
                style={{ color: ACCENT }}
              >
                {category}
              </h2>
              <span className="text-[10px] font-bold text-white/30">{categoryWorks.length}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {categoryWorks.map((work, index) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  index={index + 1}
                  onSelect={() => onSelectWork(work.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function BMForm2KomsasStructure({
  onSelectWork,
}: {
  onSelectWork: (workId: string) => void;
}) {
  return (
    <BMKomsasStructure
      categories={BM_FORM2_KOMSAS_CATEGORIES}
      works={BM_FORM2_KOMSAS_WORKS}
      onSelectWork={onSelectWork}
    />
  );
}

export function BMForm2NovelStructure({
  onSelectWork,
}: {
  onSelectWork: (workId: string) => void;
}) {
  const color = "#FB923C";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {BM_FORM2_NOVEL_WORKS.map((work, index) => (
        <WorkCard
          key={work.id}
          work={work}
          index={index + 1}
          color={color}
          onSelect={() => onSelectWork(work.id)}
        />
      ))}
    </div>
  );
}
