import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ZoneExplorerZone = {
  name: string;
  facts: { label: string; value: string }[];
  examples: string[];
  activities: string[];
};

export type ZoneExplorerBlock = {
  title: string;
  instruction: string;
  examplesLabel?: string;
  activitiesLabel?: string;
  zones: ZoneExplorerZone[];
};

/**
 * Generic "compare N categories" explorer: a tab per category, each showing a facts
 * block, a chip row of examples, and an activities/notes list. Built for Geografi's
 * climate-zone comparison but deliberately not climate-specific — any future content
 * that needs to let a student flip between several regions/categories can reuse this.
 */
export function ZoneExplorer({ block }: { block: ZoneExplorerBlock }) {
  return (
    <Tabs defaultValue="zone-0">
      <TabsList className="h-auto max-w-full flex-wrap justify-start">
        {block.zones.map((zone, i) => (
          <TabsTrigger key={zone.name} value={`zone-${i}`}>
            {zone.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {block.zones.map((zone, i) => (
        <TabsContent key={zone.name} value={`zone-${i}`} className="space-y-3.5">
          <div className="grid gap-2 sm:grid-cols-3">
            {zone.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-secondary/40 p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</div>
                <div className="mt-0.5 text-[13px] font-semibold text-foreground">{f.value}</div>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              {block.examplesLabel ?? "Negara contoh"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {zone.examples.map((c) => (
                <span key={c} className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-foreground">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              {block.activitiesLabel ?? "Kegiatan ekonomi"}
            </p>
            <ul className="space-y-1">
              {zone.activities.map((a) => (
                <li key={a} className="text-[13px] leading-relaxed text-muted-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
