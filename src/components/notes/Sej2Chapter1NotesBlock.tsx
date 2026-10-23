import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch1Content } from "@/content/form2/sejarah/chapter-1/sej2ch1-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { ScholarCards } from "./blocks/ScholarCards";
import { KingdomStageCards } from "./blocks/KingdomStageCards";
import { EraComparisonColumns } from "./blocks/EraComparisonColumns";
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

function figure(id: string, src: string, alt: string, caption: string) {
  return (
    <figure id={id} className="space-y-1.5">
      <img src={src} alt={alt} loading="lazy" className="notes-figure-img w-full rounded-2xl border border-border" />
      <figcaption className="text-center text-[11px] italic leading-snug text-muted-foreground">{caption}</figcaption>
    </figure>
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

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 1.1", title: "Konsep Alam Melayu — Geografi", sub: "Sempadan Alam Melayu ditakrifkan berbeza mengikut sarjana, tetapi hampir semua bersetuju ia meliputi Asia Tenggara." },
  { eyebrow: "◆ 1.1", title: "Konsep Alam Melayu — Bahasa dan Budaya", sub: "Bahasa serumpun dan budaya yang dikongsi membuktikan identiti bersama Alam Melayu." },
  { eyebrow: "◆ 1.2", title: "Kewujudan Kerajaan di Alam Melayu", sub: "Kerajaan awal bermula sebagai petempatan kecil di lembah sungai, seawal abad pertama." },
  { eyebrow: "◆ 1.3", title: "Kerajaan Alam Melayu yang Masyhur", sub: "Setiap kerajaan mempunyai pengasas, zaman kemasyhuran dan faktor kelemahan." },
  { eyebrow: "◆ 1.4", title: "Kerajaan Alam Melayu dan Kerajaan Luar yang Sezaman", sub: "Alam Melayu bukan sekadar wujud — setanding dengan empayar besar dunia pada zaman yang sama." },
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
        <h2 className="font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        {chrome.sub && <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.sundaShelfLink}</p>
            <ScholarCards
              scholars={content.concept.geographyViews.map((v) => ({
                field: v.role,
                name: v.scholar,
                contribution: `${v.view} (${v.source})`,
              }))}
            />
            {figure("geografi-tokoh", v3Tokoh, "Perbandingan pandangan lima tokoh tentang kawasan Alam Melayu (bahagian 1: tiga tokoh)", "Rajah perbandingan (ilustrasi) berdasarkan buku teks hlm. 4-5 (bahagian 1/2).")}
            {figure("geografi-tokoh-2", v3TokohB, "Perbandingan pandangan lima tokoh tentang kawasan Alam Melayu (bahagian 2: dua tokoh dan rumusan)", "Rajah perbandingan (ilustrasi) berdasarkan buku teks hlm. 5 (bahagian 2/2).")}
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.concept.geographyConsensus}</p>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.language.familyName}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.language.scholarView}</p>
            {content.concept.language.spread && (
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.language.spread}</p>
            )}
            <DataTable
              headers={["Perkataan", ...languageHeaders]}
              rows={content.concept.language.comparisonTable.map((c) => [
                c.word,
                ...c.translations.map((t) => t.term),
              ])}
            />
            <ChipRow heading="🎭 Budaya Serumpun" items={content.concept.culture.sharedElements} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.culture.scholarView}</p>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.kingdomEmergence.intro}</p>
            {figure("kewujudan-peta", v1Lokasi, "Peta konseptual lokasi tujuh kerajaan awal Alam Melayu", "Peta lokasi berdasarkan buku teks hlm. 8 (pusat kerajaan: hlm. 9-13); kedudukan titik anggaran. Peta asas: Natural Earth (domain awam).")}
            {figure("kewujudan-garis-masa", v2GarisMasa, "Garis masa kemunculan kerajaan Alam Melayu", "Garis masa konseptual berdasarkan buku teks hlm. 2-3 dan 8.")}
            <DataTable
              headers={["Kerajaan", "Lokasi", "Era", "Ibu Negeri"]}
              rows={content.kingdomEmergence.kingdoms.map((k) => [k.name, k.location, k.era, k.capital])}
            />
            {content.evidence && content.evidence.length > 0 && (
              <>
                <h4 className="font-display text-sm font-bold text-foreground">🔎 Bukti Kewujudan Kerajaan</h4>
                <DataTable
                  headers={["Penemuan", "Lokasi", "Rujukan"]}
                  rows={content.evidence.map((e) => [e.find, e.place, e.page])}
                />
                {figure("bukti-kewujudan", v9Bukti, "Peta konseptual lokasi bukti kewujudan kerajaan Alam Melayu", "Peta berdasarkan buku teks hlm. 13 dan 17; menunjukkan lokasi anggaran sahaja. Gambar penemuan asal terdapat dalam buku teks. Peta asas: Natural Earth (domain awam).")}
              </>
            )}
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            {figure("masyhur-angkor-thom", angkorThom, "Ilustrasi Angkor Thom", "Ilustrasi (bukan gambar sebenar). Angkor Thom ialah ibu kota kerajaan Angkor yang dibina oleh Jayavarman VII (buku teks hlm. 10-11).")}
            <KingdomStageCards kingdoms={content.famousKingdoms} />
            {content.kingdomNotes && content.kingdomNotes.length > 0 && (
              <FactGrid heading="📝 Catatan" facts={content.kingdomNotes} />
            )}
            {figure("masyhur-garis-masa", v4Kemasyhuran, "Garis masa kemasyhuran dan kemerosotan kerajaan Alam Melayu (bahagian 1: 192 M hingga 1294)", "Garis masa konseptual berdasarkan buku teks hlm. 9-13; jarak antara tarikh tidak berskala (bahagian 1/2).")}
            {figure("masyhur-garis-masa-2", v4KemasyhuranB, "Garis masa kemasyhuran dan kemerosotan kerajaan Alam Melayu (bahagian 2: 1369 hingga 1594)", "Garis masa konseptual berdasarkan buku teks hlm. 9-13; jarak antara tarikh tidak berskala (bahagian 2/2).")}
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.contemporaryKingdoms.intro}</p>
            {figure("sezaman-abad", v6Sezaman, "Kerajaan Alam Melayu dan kerajaan luar yang sezaman mengikut abad", "Rajah perbandingan (ilustrasi) berdasarkan buku teks hlm. 14-15.")}
            <EraComparisonColumns eras={content.contemporaryKingdoms.eras} />
            <div className="grid gap-3 sm:grid-cols-3">
              {content.contemporaryKingdoms.relations.map((r) => (
                <div key={r.type} className="rounded-xl border border-border bg-secondary/40 p-3.5">
                  <p className="text-[12.5px] font-semibold text-foreground">{r.type}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{r.description}</p>
                </div>
              ))}
            </div>
            {figure("perdagangan-peta", v5Perdagangan, "Peta konseptual jalan perdagangan Alam Melayu dengan kerajaan luar", "Peta berdasarkan buku teks hlm. 16 (PDF hlm. 26); laluan dipermudah dan kedudukan anggaran. Peta asas: Natural Earth (domain awam).")}
            {content.contemporaryKingdoms.tradePorts && (
              <DataTable
                headers={["Kawasan (berdasarkan lokasi pada peta)", "Pelabuhan (peta jalan perdagangan, hlm. 16)"]}
                rows={[
                  ["Alam Melayu", content.contemporaryKingdoms.tradePorts.malayWorld.join(", ")],
                  ["India", content.contemporaryKingdoms.tradePorts.india.join(", ")],
                  ["China", content.contemporaryKingdoms.tradePorts.china.join(", ")],
                  ["Asia Barat dan Rom", content.contemporaryKingdoms.tradePorts.westAsiaAndRome.join(", ")],
                ]}
              />
            )}
            {content.contemporaryKingdoms.religionSpread && figure("agama-penyebaran", v8Agama, "Cara penyebaran agama Hindu, Buddha dan Islam ke Alam Melayu", "Rajah perbandingan (ilustrasi) berdasarkan buku teks hlm. 17.")}
            {content.contemporaryKingdoms.religionSpread && (
              <DataTable
                headers={["Agama", "Cara Penyebaran"]}
                rows={content.contemporaryKingdoms.religionSpread.map((r) => [r.religion, r.means])}
              />
            )}
            {content.contemporaryKingdoms.religionImpact && (
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {content.contemporaryKingdoms.religionImpact}
              </p>
            )}
            {content.contemporaryKingdoms.diplomaticMissions && (
              <>
                {figure("diplomatik-utusan", v7Utusan, "Rajah utusan kerajaan Alam Melayu ke China", "Rajah konseptual (ilustrasi) berdasarkan buku teks hlm. 18.")}
                {figure("diplomatik-utusan-2", v7UtusanB, "Rajah utusan kerajaan Alam Melayu ke India", "Rajah konseptual (ilustrasi) berdasarkan buku teks hlm. 19.")}
                <h4 className="font-display text-sm font-bold text-foreground">🤝 Hubungan Diplomatik dengan China</h4>
                <DataTable
                  headers={["Kerajaan", "Utusan Dihantar", "Tujuan"]}
                  rows={content.contemporaryKingdoms.diplomaticMissions.china.map((m) => [m.kingdom, m.century, m.purpose])}
                />
                <h4 className="font-display text-sm font-bold text-foreground">🤝 Hubungan Diplomatik dengan India</h4>
                <DataTable
                  headers={["Kerajaan", "Utusan Dihantar", "Tujuan"]}
                  rows={content.contemporaryKingdoms.diplomaticMissions.india.map((m) => [m.kingdom, m.century, m.purpose])}
                />
              </>
            )}
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
