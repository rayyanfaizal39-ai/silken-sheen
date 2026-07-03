import { BookOpen, Heart, MapPin, Users } from "lucide-react";

const Placeholder = () => (
  <div className="rounded-2xl border border-dashed border-orange-300/15 bg-orange-300/[0.04] px-5 py-7 text-center">
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
  children: React.ReactNode;
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

export function BMForm2NovelPlaceholderContent() {
  return (
    <div>
      <Section title="Fokus Pembelajaran" eyebrow="Panduan Belajar" color="#60A5FA">
        <Placeholder />
      </Section>
      <Section title="Sinopsis" eyebrow="Ringkasan Novel" color="#A78BFA">
        <Placeholder />
      </Section>
      <Section title="Tema" eyebrow="Idea Utama" color="#F472B6">
        <Placeholder />
      </Section>
      <Section title="Persoalan" eyebrow="Kupas Novel" color="#60A5FA">
        <Placeholder />
      </Section>
      <Section title="Watak & Perwatakan" eyebrow="Kenali Watak" color="#FBBF24">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white/70">
          <Users className="h-4 w-4 text-amber-300" /> Watak Utama & Watak Sampingan
        </div>
        <Placeholder />
      </Section>
      <Section title="Binaan Plot" eyebrow="Jalan Cerita" color="#34D399">
        <Placeholder />
      </Section>
      <Section title="Latar" eyebrow="Dunia Novel" color="#A78BFA">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Latar Tempat", "Latar Masa", "Latar Masyarakat"].map((title) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <h3 className="mb-3 flex items-center gap-2 font-bold text-purple-200">
                <MapPin className="h-4 w-4" /> {title}
              </h3>
              <p className="text-xs text-white/35">Content coming soon.</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Nilai Murni" eyebrow="Bina Peribadi" color="#FB7185">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white/70">
          <Heart className="h-4 w-4 text-rose-300" /> Nilai dalam novel
        </div>
        <Placeholder />
      </Section>
      <Section title="Pengajaran" eyebrow="Amalkan" color="#34D399">
        <Placeholder />
      </Section>
    </div>
  );
}
