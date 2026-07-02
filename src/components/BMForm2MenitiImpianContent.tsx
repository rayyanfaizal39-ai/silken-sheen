import { useState, type ReactNode } from "react";
import { BookOpen, CheckCircle2, ChevronDown, Heart, MapPin, Tag, Users } from "lucide-react";
import { MENITI_IMPIAN as note } from "@/data/bm-form2-meniti-impian";

const Card = ({ children }: { children: ReactNode }) => (
  <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.05]">
    {children}
  </article>
);

const Placeholder = () => (
  <div className="rounded-xl border border-dashed border-orange-300/15 bg-orange-300/[0.04] px-4 py-5 text-center">
    <p className="text-sm font-semibold text-white/45">Content coming soon.</p>
    <p className="mt-1 text-xs text-white/25">This section will be updated.</p>
  </div>
);

function Section({
  title,
  eyebrow,
  color = "#FB923C",
  children,
}: {
  title: string;
  eyebrow: string;
  color?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-white/[0.06] py-7 last:border-0">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${color}16`, color }}
        >
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>
            {eyebrow}
          </p>
          <h2 className="font-display text-lg font-bold text-white">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function CollapsibleCard({
  title,
  color = "#FB923C",
  children,
}: {
  title: string;
  color?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="text-sm font-bold text-white">{title}</span>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-300"
          style={{ color, transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] p-4">{children}</div>
        </div>
      </div>
    </article>
  );
}

const quickTimeline = [
  "👦 Zahar gagal ke Tingkatan Enam",
  "🪚 Membantu Pak Yusuf",
  "🏫 Belajar di IKM",
  "💔 Dihina Suhaili",
  "🏆 Cemerlang di IKM",
  "🏭 Latihan Praktikal",
  "🪑 Membuka Bengkel Perabot Meniti Impian",
];

const keywords = [
  "Zahar",
  "IKM",
  "Pertukangan Perabot",
  "Berdikari",
  "MARA",
  "Gigih",
  "Pengorbanan",
  "Keluarga",
];

export function BMForm2MenitiImpianContent() {
  return (
    <div>
      <Section title="Impian dibina dengan usaha" eyebrow="Fokus Pembelajaran" color="#60A5FA">
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 text-sm leading-7 text-white/65">
          {note.focus}
        </div>
      </Section>

      <Section title="Maklumat Novel" eyebrow="Kenali Karya" color="#FB923C">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Tajuk Novel", "Meniti Impian"],
            ["Penulis", "Content coming soon."],
            ["Komponen", "Novel"],
            ["Tingkatan", "Tingkatan 2"],
            ["Watak Utama", "Zahar"],
          ].map(([label, value]) => (
            <Card key={label}>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/35">
                {label}
              </p>
              <p className="mt-2 text-sm font-bold leading-5 text-white/80">{value}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Sinopsis" eyebrow="Ringkasan Novel" color="#A78BFA">
        <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.05] p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              ["Zahar", "#60A5FA"],
              ["Pak Yusuf", "#FBBF24"],
              ["Suhaili", "#34D399"],
              ["Norimi", "#FB923C"],
            ].map(([name, color]) => (
              <span
                key={name}
                className="rounded-full border px-2.5 py-1 text-[10px] font-black"
                style={{ borderColor: `${color}40`, background: `${color}16`, color }}
              >
                {name}
              </span>
            ))}
          </div>
          <Placeholder />
        </div>
      </Section>

      <Section title="Tema" eyebrow="Idea Utama" color="#F472B6">
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5">
          <p className="font-display text-lg font-bold leading-7 text-white">{note.theme}</p>
        </div>
      </Section>

      <Section title="Persoalan" eyebrow="Kupas Novel" color="#60A5FA">
        <div className="space-y-3">
          {note.issues.map((item) => (
            <CollapsibleCard key={item.title} title={item.title} color="#60A5FA">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/35">
                Contoh daripada novel
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.example}</p>
            </CollapsibleCard>
          ))}
        </div>
      </Section>

      <Section title="Watak & Perwatakan" eyebrow="Kenali Watak" color="#FBBF24">
        {(["Watak Utama", "Watak Sampingan"] as const).map((group) => (
          <div key={group} className="mb-5 last:mb-0">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Users className="h-4 w-4 text-amber-300" />
              {group === "Watak Utama" ? "⭐ Watak Utama" : "⭐⭐ Watak Sampingan"}
            </h3>
            <div className="space-y-3">
              {note.characters
                .filter((character) => character.group === group)
                .map((character) => (
                  <CollapsibleCard key={character.name} title={character.name} color="#FBBF24">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {character.traits.map((trait) => (
                        <div key={trait.title} className="rounded-xl bg-amber-300/[0.06] p-3">
                          <p className="text-sm font-bold text-amber-200">{trait.title}</p>
                          <p className="mt-1 text-xs leading-5 text-white/60">{trait.example}</p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleCard>
                ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Binaan Plot" eyebrow="Jalan Cerita" color="#34D399">
        <div className="relative space-y-3 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-emerald-300/20">
          {note.plot.map((item, index) => (
            <div key={item.title} className="relative flex gap-4">
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-[#07140f]">
                {index + 1}
              </span>
              <div className="flex-1">
                <Card>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Latar" eyebrow="Dunia Novel" color="#A78BFA">
        <div className="space-y-3">
          {["Latar Tempat", "Latar Masa", "Latar Masyarakat"].map((group) => {
            const entries = note.settings.filter((item) => item.group === group);
            return (
              <CollapsibleCard key={group} title={group} color="#A78BFA">
                {entries.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {entries.map((item) => (
                      <div key={item.title} className="rounded-xl bg-purple-300/[0.06] p-3">
                        <h4 className="flex items-center gap-2 font-bold text-purple-200">
                          <MapPin className="h-4 w-4" /> {item.title}
                        </h4>
                        <p className="mt-2 text-xs leading-5 text-white/60">{item.example}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Placeholder />
                )}
              </CollapsibleCard>
            );
          })}
        </div>
      </Section>

      <Section title="Konflik" eyebrow="Cabaran Watak" color="#FB7185">
        <div className="space-y-3">
          <CollapsibleCard title="Konflik dengan Suhaili" color="#FB7185">
            <p className="text-sm leading-6 text-white/65">
              Suhaili memandang rendah lulusan IKM dan Zahar berasa terhina.
            </p>
          </CollapsibleCard>
          <CollapsibleCard title="Konflik diri" color="#FB7185">
            <p className="text-sm leading-6 text-white/65">
              Penghinaan Suhaili membakar semangat Zahar untuk berjaya.
            </p>
          </CollapsibleCard>
          <CollapsibleCard title="Konflik ekonomi" color="#FB7185">
            <p className="text-sm leading-6 text-white/65">
              Zahar membantu ibunya dan sanggup melupakan hasrat belajar di sekolah swasta demi
              meringankan beban keluarga.
            </p>
          </CollapsibleCard>
        </div>
      </Section>

      <Section title="Teknik Plot" eyebrow="Cara Penceritaan" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-2">
          {["Pemerian", "Dialog", "Imbas Kembali", "Suspens"].map((technique) => (
            <Card key={technique}>
              <h3 className="mb-3 font-bold text-cyan-200">{technique}</h3>
              <Placeholder />
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Gaya Bahasa" eyebrow="Bahasa Novel" color="#FBBF24">
        <div className="grid gap-3 sm:grid-cols-2">
          {["Sinkope", "Inversi", "Personifikasi", "Hiperbola"].map((style) => (
            <Card key={style}>
              <h3 className="font-bold text-amber-200">{style}</h3>
              <div className="mt-3 grid gap-2">
                <Placeholder />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Nilai Murni" eyebrow="Bina Peribadi" color="#FB7185">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {note.values.map((item, index) => (
            <Card key={item.title}>
              <div className="mb-3 flex items-center gap-2">
                <Heart
                  className="h-4 w-4"
                  style={{ color: ["#FB7185", "#FBBF24", "#34D399"][index] }}
                />
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-6 text-white/65">{item.example}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Pengajaran" eyebrow="Amalkan" color="#34D399">
        <div className="grid gap-3 sm:grid-cols-2">
          {note.lessons.map((lesson) => (
            <Card key={lesson}>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm font-semibold leading-6 text-white/75">{lesson}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Ringkasan Pantas" eyebrow="30 Saat" color="#60A5FA">
        <div className="mx-auto max-w-xl space-y-2">
          {quickTimeline.map((item, index) => (
            <div key={item}>
              <div className="rounded-2xl border border-sky-300/10 bg-sky-300/[0.05] px-4 py-3 text-center text-sm font-semibold text-white/75">
                {item}
              </div>
              {index < quickTimeline.length - 1 && (
                <div className="py-1 text-center text-sky-300/45">↓</div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Kata Kunci Novel" eyebrow="Ulang Kaji Pantas" color="#FB923C">
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-1.5 rounded-full border border-orange-300/20 bg-orange-300/[0.08] px-3 py-1.5 text-xs font-bold text-orange-200"
            >
              <Tag className="h-3.5 w-3.5" /> {keyword}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
