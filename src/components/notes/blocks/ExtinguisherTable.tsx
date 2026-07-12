import type { ExtinguisherRow, MethodCard } from "@/content/form1/science/chapter-7/bab7-content";
import { SafetyChecklist } from "./SafetyChecklist";

const METHOD_HEAD: Record<"en" | "bm", string> = {
  en: "🧯 Remove one condition, the fire stops",
  bm: "🧯 Singkirkan satu syarat, api akan padam",
};
const EXT_HEAD: Record<"en" | "bm", string> = {
  en: "📋 Matching extinguisher to material on fire",
  bm: "📋 Memadankan alat pemadam dengan bahan terbakar",
};
const SAFETY_HEAD: Record<"en" | "bm", string> = {
  en: "✅ Fire safety at home",
  bm: "✅ Sikap berjaga-jaga di rumah",
};
const TABLE_HEADERS: Record<"en" | "bm", [string, string, string]> = {
  en: ["Material on fire", "Examples", "Suitable extinguisher"],
  bm: ["Bahan terbakar", "Contoh", "Alat pemadam sesuai"],
};

export function ExtinguisherTable({
  methods,
  extinguisherTable,
  safetyChecklist,
  lang,
}: {
  methods: MethodCard[];
  extinguisherTable: ExtinguisherRow[];
  safetyChecklist: string[];
  lang: "en" | "bm";
}) {
  const headers = TABLE_HEADERS[lang];

  return (
    <div>
      <h4 className="font-display mb-3 text-sm font-bold text-foreground">{METHOD_HEAD[lang]}</h4>
      <div className="mb-6 grid gap-3.5 sm:grid-cols-3">
        {methods.map((m) => (
          <div key={m.heading} className="rounded-xl border border-border bg-secondary/40 p-4">
            <span className="text-xl">{m.icon}</span>
            <h5 className="font-display mt-2 mb-1 text-[13px] font-bold text-foreground">{m.heading}</h5>
            <p className="text-xs leading-snug text-muted-foreground">{m.body}</p>
          </div>
        ))}
      </div>

      <h4 className="font-display mb-3 text-sm font-bold text-foreground">{EXT_HEAD[lang]}</h4>
      <div className="mb-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2.5 font-semibold text-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {extinguisherTable.map((row) => (
              <tr key={row.material} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 font-semibold text-foreground">{row.material}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.examples}</td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {row.extinguishers.map((e) => (
                      <span
                        key={e}
                        className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] text-violet-200"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SafetyChecklist heading={SAFETY_HEAD[lang]} items={safetyChecklist} />
    </div>
  );
}
