import { Beaker, ChevronDown, TriangleAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LocalizedChapter2PracticalArea } from "@/content/form1/science/chapter-2/chapter2-activities";
import type { Chapter2Lang } from "@/content/form1/science/chapter-2/chapter2-canonical";

export function Chapter2PracticalPrompt({
  area,
  lang,
}: {
  area: LocalizedChapter2PracticalArea;
  lang: Chapter2Lang;
}) {
  return (
    <section
      className="rounded-2xl border border-orange-400/35 bg-orange-400/5 p-4 sm:p-5"
      aria-labelledby={`${area.id}-title`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-bold text-cyan-800 dark:text-cyan-200">
          <Beaker className="h-3.5 w-3.5" aria-hidden="true" />
          {lang === "bm" ? "AMALI FIZIKAL" : "PHYSICAL PRACTICAL"}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-800 dark:text-orange-200">
          <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
          {lang === "bm" ? "Bimbingan guru/makmal" : "Teacher/lab guided"}
        </span>
        <span className="text-[11px] font-semibold text-muted-foreground">SP {area.standard}</span>
      </div>

      <h4 id={`${area.id}-title`} className="font-display mt-3 text-sm font-bold text-foreground">
        {area.title}
      </h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{area.purpose}</p>
      <p className="mt-3 rounded-xl border border-orange-400/30 bg-orange-400/10 p-3 text-xs font-medium leading-relaxed text-orange-900 dark:text-orange-200">
        {area.practicalNotice}
      </p>

      {area.steps && (
        <details className="group mt-3 rounded-xl border border-border bg-card/70">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {lang === "bm" ? "Tunjukkan arahan amali ringkas" : "Show concise practical prompt"}
            <ChevronDown
              className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-border p-3">
            <ol className="space-y-2">
              {area.steps.map((step, index) => (
                <li key={step} className="flex gap-2 text-xs leading-relaxed text-foreground/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {area.evidence && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {lang === "bm" ? "Bukti fizikal:" : "Physical evidence:"}
                </span>{" "}
                {area.evidence}
              </p>
            )}
          </div>
        </details>
      )}

      {area.investigations && (
        <Tabs defaultValue={area.investigations[0].id} className="mt-4">
          <TabsList className="h-auto max-w-full flex-wrap justify-start gap-1">
            {area.investigations.map((investigation) => (
              <TabsTrigger key={investigation.id} value={investigation.id} className="min-h-11">
                {investigation.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {area.investigations.map((investigation) => (
            <TabsContent
              key={investigation.id}
              value={investigation.id}
              className="rounded-xl border border-border bg-card/70 p-4"
            >
              <dl className="space-y-3 text-xs leading-relaxed">
                <div>
                  <dt className="font-bold text-foreground">
                    {lang === "bm" ? "Soalan" : "Question"}
                  </dt>
                  <dd className="text-muted-foreground">{investigation.question}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">
                    {lang === "bm" ? "Persediaan ringkas" : "Compact setup"}
                  </dt>
                  <dd className="text-muted-foreground">{investigation.setup}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">
                    {lang === "bm" ? "Pemboleh ubah" : "Variables"}
                  </dt>
                  <dd className="text-muted-foreground">{investigation.variables}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">
                    {lang === "bm" ? "Perhatikan dan buat inferens" : "Observe and infer"}
                  </dt>
                  <dd className="text-muted-foreground">{investigation.observeInfer}</dd>
                </div>
                {investigation.safety && (
                  <div className="rounded-lg border border-orange-400/30 bg-orange-400/10 p-2">
                    <dt className="font-bold text-orange-900 dark:text-orange-200">
                      {lang === "bm" ? "Keselamatan" : "Safety"}
                    </dt>
                    <dd className="text-orange-900/90 dark:text-orange-100">
                      {investigation.safety}
                    </dd>
                  </div>
                )}
              </dl>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </section>
  );
}
