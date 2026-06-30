import {
  BookOpen,
  CheckCircle2,
  Heart,
  ListChecks,
  MapPin,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PELANDUK_MENGAJAR_MEMERANG as note } from "@/data/bm-form2-pelanduk-mengajar-memerang";

const colors = ["#FB7185", "#FBBF24", "#34D399", "#60A5FA", "#C084FC"];
const Section = ({
  title,
  eyebrow,
  children,
  color = "#C084FC",
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  color?: string;
}) => (
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
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <article
    className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.05] ${className}`}
  >
    {children}
  </article>
);
const Ref = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 text-[10px] font-bold text-purple-200/55">{children}</p>
);

export function BMForm2PelandukContent() {
  return (
    <div>
      <Section
        title="Keadilan dicari, kebenaran diteliti"
        eyebrow="Fokus Pembelajaran"
        color="#60A5FA"
      >
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5">
          <p className="text-sm leading-7 text-white/65">{note.focus}</p>
        </div>
      </Section>
      <Section title="Sinopsis" eyebrow="Ringkasan Cerita" color="#A78BFA">
        <div className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.07] p-5 space-y-3">
          {note.synopsis.map((x) => (
            <p key={x} className="text-sm leading-7 text-white/70">
              {x}
            </p>
          ))}
        </div>
      </Section>
      <Section title="Tema" eyebrow="Idea Utama" color="#F472B6">
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5">
          <h3 className="font-display text-lg font-bold text-white">{note.theme.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">{note.theme.example}</p>
          <Ref>{note.theme.reference}</Ref>
        </div>
      </Section>
      <Section title="Persoalan" eyebrow="Kupas Karya" color="#60A5FA">
        <div className="grid gap-3 sm:grid-cols-2">
          {note.issues.map((x, i) => (
            <Card key={x.title}>
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{x.title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{x.example}</p>
              <Ref>{x.reference}</Ref>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Watak & Perwatakan" eyebrow="Kenali Watak" color="#FBBF24">
        <div className="space-y-5">
          {note.characters.map((c) => (
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
                  <Card key={t.title}>
                    <h4 className="font-bold text-amber-200">{t.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-white/65">{t.example}</p>
                    <Ref>{t.reference}</Ref>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Binaan Plot" eyebrow="Jalan Cerita" color="#34D399">
        <div className="relative space-y-3 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-emerald-300/20">
          {note.plot.map((x, i) => (
            <div key={x.title} className="relative flex gap-4">
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-[#07140f]">
                {i + 1}
              </span>
              <Card className="flex-1">
                <h3 className="font-bold text-white">{x.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{x.text}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Teknik Plot" eyebrow="Cara Penceritaan" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-3">
          {note.techniques.map((x) => (
            <Card key={x.title}>
              <h3 className="font-bold text-cyan-200">{x.title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/60">{x.example}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Latar" eyebrow="Dunia Cerita" color="#A78BFA">
        <div className="space-y-5">
          {["Latar Tempat", "Latar Masa", "Latar Masyarakat"].map((group) => (
            <div key={group}>
              <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
                <MapPin className="h-4 w-4 text-purple-300" />
                {group}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {note.settings
                  .filter((x) => x.group === group)
                  .map((x) => (
                    <Card key={x.title}>
                      <h4 className="font-bold text-purple-200">{x.title}</h4>
                      <p className="mt-2 text-xs leading-5 text-white/60">{x.example}</p>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Nilai Murni & Pengajaran" eyebrow="Bina Peribadi" color="#FB7185">
        <div className="grid gap-3 sm:grid-cols-2">
          {note.values.map((x, i) => (
            <Card key={x.title}>
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4" style={{ color: colors[i] }} />
                <h3 className="font-bold text-white">{x.title}</h3>
              </div>
              <p className="text-sm leading-6 text-white/65">{x.lesson}</p>
              <div className="mt-3 rounded-xl bg-black/15 p-3 text-xs leading-5 text-white/70">
                <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-white/35">
                  Contoh daripada buku teks
                </p>
                {x.example}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
