import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch1Content } from "@/content/form2/sejarah/chapter-1/sej2ch1-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { KingdomStageCards } from "./blocks/KingdomStageCards";
import { bgPanel } from "./blocks/neon-tokens";
import angkorThom from "@/assets/form2-content/angkor-thom.png";
import v1Lokasi from "@/assets/form2-content/sej2-bab1/v1-lokasi-kerajaan-awal.svg";
import v2GarisMasa from "@/assets/form2-content/sej2-bab1/v2-garis-masa-kemunculan.svg";
import v3Tokoh from "@/assets/form2-content/sej2-bab1/v3-pandangan-lima-tokoh.svg";
import v3TokohB from "@/assets/form2-content/sej2-bab1/v3-pandangan-lima-tokoh-b.svg";
import v4Kemasyhuran from "@/assets/form2-content/sej2-bab1/v4-garis-masa-kemasyhuran-kemerosotan.svg";
import v4KemasyhuranB from "@/assets/form2-content/sej2-bab1/v4-garis-masa-kemasyhuran-kemerosotan-b.svg";
import v5Perdagangan from "@/assets/form2-content/sej2-bab1/v5-jalan-perdagangan.svg";
import v6Sezaman from "@/assets/form2-content/sej2-bab1/v6-kerajaan-sezaman.svg";
import v7Utusan from "@/assets/form2-content/sej2-bab1/v7-utusan-china-india.svg";
import v7UtusanB from "@/assets/form2-content/sej2-bab1/v7-utusan-china-india-b.svg";
import v8Agama from "@/assets/form2-content/sej2-bab1/v8-penyebaran-agama.svg";
import v9Bukti from "@/assets/form2-content/sej2-bab1/v9-bukti-kewujudan.svg";
import v1Desktop from "@/assets/form2-content/sej2-bab1/v1-lokasi-kerajaan-awal-desktop.svg";
import v2Desktop from "@/assets/form2-content/sej2-bab1/v2-garis-masa-kemunculan-desktop.svg";
import v3Desktop from "@/assets/form2-content/sej2-bab1/v3-pandangan-lima-tokoh-desktop.svg";
import v4Desktop from "@/assets/form2-content/sej2-bab1/v4-garis-masa-kemasyhuran-kemerosotan-desktop.svg";
import v5Desktop from "@/assets/form2-content/sej2-bab1/v5-jalan-perdagangan-desktop.svg";
import v6Desktop from "@/assets/form2-content/sej2-bab1/v6-kerajaan-sezaman-desktop.svg";
import v7Desktop from "@/assets/form2-content/sej2-bab1/v7-utusan-china-india-desktop.svg";
import v8Desktop from "@/assets/form2-content/sej2-bab1/v8-penyebaran-agama-desktop.svg";
import v9Desktop from "@/assets/form2-content/sej2-bab1/v9-bukti-kewujudan-desktop.svg";

const P = "text-[13.5px] leading-relaxed text-muted-foreground";
const H3 = "font-display text-[15px] font-bold text-foreground";

// Named scholar view: "Name · role" then the view, one compact block per scholar.
function ScholarList({ items }: { items: Array<{ scholar: string; role: string; view: string }> }) {
  return (
    <ul className="space-y-2.5">
      {items.map((s) => (
        <li key={s.scholar} className="border-l-2 border-primary/40 pl-3">
          <p className="text-[12.5px] font-semibold text-foreground">
            {s.scholar} <span className="font-normal text-muted-foreground">· {s.role}</span>
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{s.view}</p>
        </li>
      ))}
    </ul>
  );
}

const FIG_IMG = "notes-figure-img w-full rounded-2xl border border-border";

// `desktop` (optional): a landscape version shown from `sm` up; the tall
// version stays for phones. The wrappers carry the visibility classes because
// `.notes-figure-img` sets its own `display`.
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

// Phones get the tall split parts; from `sm` up a single merged landscape figure.
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

const ORBIT_LABELS = [
  "Konsep: Geografi",
  "Konsep: Bahasa & Budaya",
  "Kewujudan Kerajaan",
  "Kerajaan Masyhur",
  "Sezaman Dunia",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string }> = [
  { eyebrow: "◆ 1.1", title: "Konsep Alam Melayu — Geografi" },
  { eyebrow: "◆ 1.1", title: "Konsep Alam Melayu — Bahasa dan Budaya" },
  { eyebrow: "◆ 1.2", title: "Kewujudan Kerajaan di Alam Melayu" },
  { eyebrow: "◆ 1.3", title: "Kerajaan Alam Melayu yang Masyhur" },
  { eyebrow: "◆ 1.4", title: "Kerajaan Alam Melayu dan Kerajaan Luar yang Sezaman" },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej2Chapter1NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch1Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c1-section` : undefined;
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

  const geoSources = content.concept.geographyViews
    .filter((v) => v.source)
    .map((v) => `${v.scholar}, ${v.source}`)
    .join("; ");
  const [trade, religion, diplomacy] = content.contemporaryKingdoms.relations;

  const languageHeaders = content.concept.language.comparisonTable[0]?.translations.map((t) => t.language) ?? [];

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
            <p className={P}>{content.concept.intro}</p>
            {splitFigure(
              [
                ["geografi-tokoh", v3Tokoh, "Pandangan tokoh tentang kawasan Alam Melayu (bahagian 1: tiga tokoh)", "Ilustrasi berdasarkan buku teks hlm. 4–5 (1/2)."],
                ["geografi-tokoh-2", v3TokohB, "Pandangan tokoh tentang kawasan Alam Melayu (bahagian 2: dua tokoh)", `Ilustrasi berdasarkan buku teks hlm. 5 (2/2). Sumber petikan: ${geoSources}.`],
              ],
              ["geografi-tokoh-desktop", v3Desktop, "Pandangan lima tokoh tentang kawasan Alam Melayu", `Ilustrasi berdasarkan buku teks hlm. 4–5. Sumber petikan: ${geoSources}.`],
            )}
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[13px] font-semibold text-foreground">Rumusan</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{content.concept.geographyConsensus}</p>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-5">
            <h3 className={H3}>Bahasa</h3>
            <p className={P}>{content.concept.language.intro}</p>
            <ScholarList items={content.concept.language.scholars} />
            <DataTable
              headers={["Perkataan", ...languageHeaders]}
              rows={content.concept.language.comparisonTable.map((c) => [
                c.word,
                ...c.translations.map((t) => t.term),
              ])}
            />
            <p className={P}>{content.concept.language.conclusion}</p>
            <h3 className={`${H3} pt-2`}>Budaya</h3>
            <p className={P}>{content.concept.culture.intro}</p>
            <ChipRow items={content.concept.culture.sharedElements} />
            <ScholarList items={[content.concept.culture.scholar]} />
            <p className={P}>{content.concept.culture.conclusion}</p>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-5">
            <p className={P}>{content.kingdomEmergence.intro}</p>
            <DataTable
              headers={["Kerajaan", "Lokasi"]}
              rows={content.kingdomEmergence.kingdoms.map((k) => [k.name.replace(/^Kerajaan /, ""), k.location])}
            />
            {figure("kewujudan-peta", v1Lokasi, "Peta lokasi tujuh kerajaan awal Alam Melayu", "Ilustrasi berdasarkan buku teks hlm. 8. Kedudukan titik anggaran, tidak berskala. Peta asas: Natural Earth (domain awam).", v1Desktop)}
            {figure("kewujudan-garis-masa", v2GarisMasa, "Garis masa kemunculan kerajaan Alam Melayu", "Ilustrasi berdasarkan buku teks hlm. 2–3 dan 8.", v2Desktop)}
            <p className={P}>{content.kingdomEmergence.significance}</p>
            {content.evidence && content.evidence.length > 0 &&
              figure("bukti-kewujudan", v9Bukti, "Peta lokasi bukti kewujudan kerajaan Alam Melayu", "Ilustrasi berdasarkan buku teks hlm. 13 dan 17; gambar penemuan asal terdapat dalam buku teks. Lokasi anggaran. Peta asas: Natural Earth (domain awam).", v9Desktop)}
          </div>
        )}

        {current === 3 && (
          <div className="space-y-5">
            <p className={P}>Kemasyhuran kerajaan Alam Melayu dapat dilihat dalam aspek pemerintahan, ekonomi, agama dan kemunculan pelabuhan.</p>
            <KingdomStageCards kingdoms={content.famousKingdoms} />
            {figure("masyhur-angkor-thom", angkorThom, "Ilustrasi Angkor Thom", "Ilustrasi (bukan gambar sebenar) Angkor Thom, ibu kota kerajaan Angkor (buku teks hlm. 10–11).")}
            {splitFigure(
              [
                ["masyhur-garis-masa", v4Kemasyhuran, "Garis masa kemasyhuran dan kemerosotan kerajaan Alam Melayu (bahagian 1: 192 M hingga 1294)", "Ilustrasi berdasarkan buku teks hlm. 9–13; jarak tarikh tidak berskala (1/2)."],
                ["masyhur-garis-masa-2", v4KemasyhuranB, "Garis masa kemasyhuran dan kemerosotan kerajaan Alam Melayu (bahagian 2: 1369 hingga 1594)", "Ilustrasi berdasarkan buku teks hlm. 9–13; jarak tarikh tidak berskala (2/2)."],
              ],
              ["masyhur-garis-masa-desktop", v4Desktop, "Garis masa kemasyhuran dan kemerosotan kerajaan Alam Melayu (192 M hingga 1594)", "Ilustrasi berdasarkan buku teks hlm. 9–13; jarak tarikh tidak berskala."],
            )}
          </div>
        )}

        {current === 4 && (
          <div className="space-y-5">
            <p className={P}>{content.contemporaryKingdoms.intro}</p>
            {figure("sezaman-abad", v6Sezaman, "Kerajaan Alam Melayu dan kerajaan luar yang sezaman mengikut abad", "Ilustrasi berdasarkan buku teks hlm. 14–15.", v6Desktop)}

            <h3 className={`${H3} pt-2`}>{trade.type}</h3>
            <p className={P}>{trade.description}</p>
            {figure("perdagangan-peta", v5Perdagangan, "Peta jalan perdagangan Alam Melayu dengan kerajaan luar", "Ilustrasi berdasarkan peta buku teks hlm. 16. Laluan dipermudah; kedudukan anggaran, tidak berskala. Peta asas: Natural Earth (domain awam).", v5Desktop)}
            {trade.closing && <p className={P}>{trade.closing}</p>}

            <h3 className={`${H3} pt-2`}>{religion.type}</h3>
            <p className={P}>{religion.description}</p>
            {content.contemporaryKingdoms.religionSpread && figure("agama-penyebaran", v8Agama, "Cara penyebaran agama Hindu, Buddha dan Islam ke Alam Melayu", "Ilustrasi berdasarkan buku teks hlm. 17.", v8Desktop)}
            {content.contemporaryKingdoms.religionImpact && <p className={P}>{content.contemporaryKingdoms.religionImpact}</p>}

            <h3 className={`${H3} pt-2`}>{diplomacy.type}</h3>
            <p className={P}>{diplomacy.description}</p>
            {content.contemporaryKingdoms.diplomaticMissions &&
              splitFigure(
                [
                  ["diplomatik-utusan", v7Utusan, "Utusan kerajaan Alam Melayu ke China", "Ilustrasi berdasarkan buku teks hlm. 18."],
                  ["diplomatik-utusan-2", v7UtusanB, "Utusan kerajaan Alam Melayu ke India", "Ilustrasi berdasarkan buku teks hlm. 19."],
                ],
                ["diplomatik-utusan-desktop", v7Desktop, "Utusan kerajaan Alam Melayu ke China dan India", "Ilustrasi berdasarkan buku teks hlm. 18–19. Tanda — : tiada utusan dinyatakan."],
              )}
            {diplomacy.closing && <p className={P}>{diplomacy.closing}</p>}
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            {content.didYouKnow && content.didYouKnow.length > 0 && (
              <FactGrid heading="💡 Tahukah Anda?" facts={content.didYouKnow} />
            )}
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
            {content.kbatPrompts && content.kbatPrompts.length > 0 && (
              <FactGrid heading="🧠 Soalan KBAT (berdasarkan buku teks)" facts={content.kbatPrompts} />
            )}
            {content.values && content.values.length > 0 && (
              <FactGrid heading="🌱 Nilai, Patriotisme dan Iktibar" facts={content.values} />
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 1 Selesai"}
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
