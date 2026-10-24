import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch2Content } from "@/content/form2/sejarah/chapter-2/sej2ch2-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { bgPanel } from "./blocks/neon-tokens";
import v1Wilayah from "@/assets/form2-content/sej2-bab2/v1-pentadbiran-wilayah.svg";
import v1WilayahB from "@/assets/form2-content/sej2-bab2/v1-pentadbiran-wilayah-b.svg";
import v1Desktop from "@/assets/form2-content/sej2-bab2/v1-pentadbiran-wilayah-desktop.svg";
import v2Pertanian from "@/assets/form2-content/sej2-bab2/v2-kawasan-pertanian.svg";
import v2Desktop from "@/assets/form2-content/sej2-bab2/v2-kawasan-pertanian-desktop.svg";
import v3Pelabuhan from "@/assets/form2-content/sej2-bab2/v3-pelabuhan.svg";
import v3Desktop from "@/assets/form2-content/sej2-bab2/v3-pelabuhan-desktop.svg";
import v4Pedagang from "@/assets/form2-content/sej2-bab2/v4-pedagang-luar.svg";
import v4Desktop from "@/assets/form2-content/sej2-bab2/v4-pedagang-luar-desktop.svg";
import v5Hasil from "@/assets/form2-content/sej2-bab2/v5-hasil-hutan-laut-galian.svg";
import v5Desktop from "@/assets/form2-content/sej2-bab2/v5-hasil-hutan-laut-galian-desktop.svg";

const P = "text-[13.5px] leading-relaxed text-muted-foreground";
const H3 = "font-display text-[15px] font-bold text-foreground";
const FIG_IMG = "notes-figure-img w-full rounded-2xl border border-border";
const NE = "Peta asas: Natural Earth (domain awam).";

// Same figure pattern as Bab 1: tall version on phones, landscape version from `sm` up, one caption.
function figure(id: string, src: string, alt: string, caption: string, desktop?: string) {
  return (
    <figure id={id} className="space-y-1.5">
      {desktop ? (
        <>
          <div className="sm:hidden">
            <img src={src} alt={alt} loading="lazy" className={FIG_IMG} />
          </div>
          <div className="hidden sm:block">
            <img src={desktop} alt={alt} loading="lazy" className={`${FIG_IMG} notes-figure-img--wide`} />
          </div>
        </>
      ) : (
        <img src={src} alt={alt} loading="lazy" className={FIG_IMG} />
      )}
      <figcaption className="text-center text-[11px] italic leading-snug text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function splitFigure(
  parts: Array<[id: string, src: string, alt: string, caption: string]>,
  desktop: [id: string, src: string, alt: string, caption: string],
) {
  return (
    <>
      <div className="space-y-6 sm:hidden">{parts.map((p) => <div key={p[0]}>{figure(...p)}</div>)}</div>
      <div className="hidden sm:block">
        <figure id={desktop[0]} className="space-y-1.5">
          <img src={desktop[1]} alt={desktop[2]} loading="lazy" className={`${FIG_IMG} notes-figure-img--wide`} />
          <figcaption className="text-center text-[11px] italic leading-snug text-muted-foreground">{desktop[3]}</figcaption>
        </figure>
      </div>
    </>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

const ORBIT_LABELS = [
  "Pemerintahan",
  "Pertanian",
  "Perdagangan",
  "Hasil & Galian",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string }> = [
  { eyebrow: "◆ 2.1", title: "Sistem Pemerintahan" },
  { eyebrow: "◆ 2.2", title: "Kegiatan Ekonomi — Pertanian" },
  { eyebrow: "◆ 2.2", title: "Kegiatan Ekonomi — Perdagangan" },
  { eyebrow: "◆ 2.2", title: "Hasil Hutan dan Laut, Perlombongan dan Pembuatan" },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const short = (k: string) => k.replace(/^Kerajaan\s+/, "");

export function Sej2Chapter2NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch2Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c2-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, TOTAL - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[current];
  const isLast = current === TOTAL - 1;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }

  const g = content.governance;
  const e = content.economy;
  const mainKingdoms = g.byKingdom.filter((k) => k.royalTitles.length > 0);

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">👑</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{content.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{content.hook.body}</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {ORBIT_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setCurrent(i)}
            className="flex shrink-0 flex-col items-center gap-1.5 px-1"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                i < current
                  ? "border-transparent bg-gradient-to-br from-primary to-accent text-white"
                  : i === current
                    ? "border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`max-w-[68px] text-center text-[10px] leading-tight ${
                i === current ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{chrome.eyebrow}</p>
        <h2 className="font-display mb-5 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>

        {current === 0 && (
          <div className="space-y-5">
            <p className={P}>{g.intro}</p>
            <h3 className={`${H3} pt-1`}>Raja dan pemerintahan pusat</h3>
            <DataTable
              headers={["Kerajaan", "Gelaran raja", "Raja dibantu oleh"]}
              rows={mainKingdoms.map((k) => [short(k.kingdom), k.royalTitles.join("; "), k.centralAdmin])}
            />
            {g.majapahitWomen && <Note>{g.majapahitWomen}</Note>}
            <h3 className={`${H3} pt-2`}>Pemerintahan wilayah</h3>
            {splitFigure(
              [
                ["wilayah-1", v1Wilayah, "Pentadbiran wilayah Funan, Champa dan Srivijaya", "Rajah berdasarkan buku teks hlm. 26 (1/2)."],
                ["wilayah-2", v1WilayahB, "Pentadbiran wilayah Angkor dan Majapahit", "Rajah berdasarkan buku teks hlm. 27 (2/2)."],
              ],
              ["wilayah-desktop", v1Desktop, "Pentadbiran wilayah Funan, Champa, Srivijaya, Angkor dan Majapahit", "Rajah berdasarkan buku teks hlm. 26–27."],
            )}
            {g.smallKingdoms && (
              <>
                <h3 className={`${H3} pt-2`}>Kedah Tua dan Gangga Nagara</h3>
                <p className={P}>{g.smallKingdoms}</p>
              </>
            )}
            {g.closing && <p className={P}>{g.closing}</p>}
          </div>
        )}

        {current === 1 && (
          <div className="space-y-5">
            <p className={P}>{e.intro}</p>
            {e.agricultureIntro && <p className={P}>{e.agricultureIntro}</p>}
            {figure("pertanian-peta", v2Pertanian, "Peta kawasan padi dan rempah kerajaan Alam Melayu", `Ilustrasi berdasarkan buku teks hlm. 28–29. Kedudukan anggaran. ${NE}`, v2Desktop)}
            <DataTable
              headers={["Kerajaan", "Penanaman padi"]}
              rows={e.riceCultivation.map((r) => [r.kingdom, r.details])}
            />
            {e.spiceNote && <p className={P}>{e.spiceNote}</p>}
            {e.otherFarming && <p className={P}>{e.otherFarming}</p>}
          </div>
        )}

        {current === 2 && (
          <div className="space-y-5">
            {e.tradeIntro && <p className={P}>{e.tradeIntro}</p>}
            {figure("pelabuhan-peta", v3Pelabuhan, "Peta pelabuhan tujuh kerajaan Alam Melayu", `Ilustrasi berdasarkan buku teks hlm. 30–31. Kedudukan anggaran; Sri Banoy, Maliti dan Pangkalan tidak ditanda. ${NE}`, v3Desktop)}
            <DataTable
              headers={["Kerajaan", "Barang didagangkan"]}
              rows={e.tradePorts.map((t) => [short(t.kingdom), t.goods.join(", ")])}
            />
            {e.tradeOfficial && <Note>{e.tradeOfficial}</Note>}
            <h3 className={`${H3} pt-2`}>Pedagang luar</h3>
            {e.foreignTradersIntro && <p className={P}>{e.foreignTradersIntro}</p>}
            {figure("pedagang-luar", v4Pedagang, "Barangan yang dibawa dan dicari oleh pedagang China, India, Arab dan Parsi", "Rajah berdasarkan buku teks hlm. 31.", v4Desktop)}
            {e.silkNote && <p className={P}>{e.silkNote}</p>}
            {e.tradeClosing && <p className={P}>{e.tradeClosing}</p>}
          </div>
        )}

        {current === 3 && (
          <div className="space-y-5">
            <h3 className={H3}>Hasil hutan dan laut</h3>
            {e.forestSeaIntro && <p className={P}>{e.forestSeaIntro}</p>}
            {figure("hasil-peta", v5Hasil, "Peta sumber hasil hutan, hasil laut dan galian kerajaan Alam Melayu", `Ilustrasi berdasarkan buku teks hlm. 32–33. Kedudukan anggaran. ${NE}`, v5Desktop)}
            <DataTable
              headers={["Hasil", "Kegunaan"]}
              rows={e.forestSeaProducts.map((p) => [p.product, p.use])}
            />
            {e.forestSeaDemand && <p className={P}>{e.forestSeaDemand}</p>}
            <h3 className={`${H3} pt-2`}>Perlombongan dan pembuatan</h3>
            {e.miningIntro && <p className={P}>{e.miningIntro}</p>}
            <DataTable
              headers={["Kerajaan", "Pembuatan"]}
              rows={e.manufacturing.map((m) => [m.kingdom, m.products.join(", ")])}
            />
            {e.economyClosing && <p className={P}>{e.economyClosing}</p>}
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            {content.citizenship && content.citizenship.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-display text-sm font-bold text-foreground">🇲🇾 Elemen Kewarganegaraan dan Nilai Sivik</h4>
                {content.citizenship.map((c) => (
                  <div key={c.standard} className="rounded-xl border border-border bg-secondary/40 p-3.5">
                    <p className="text-[12.5px] font-semibold text-foreground">{c.title}</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4">
                      {c.points.map((pt) => (
                        <li key={pt} className="text-[12px] leading-relaxed text-muted-foreground">{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">⭐ Rumusan Bab</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.chapterSummary}</p>
            </div>
            {onMarkRead && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    isRead
                      ? "cursor-default bg-emerald-500/20 text-emerald-200"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                  }`}
                >
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 2 Selesai"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Kembali
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Seksyen seterusnya <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
