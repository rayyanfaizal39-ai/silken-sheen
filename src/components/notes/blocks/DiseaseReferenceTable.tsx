import type { DiseaseReferenceTableBlock } from "@/content/form2/science/interactive-types";

/**
 * The chapter's own disease reference table (KSSM Table 4.2): disease,
 * symptoms, pathogen, vector and way of infection, read across one row.
 *
 * From `sm` up this is a real `<table>`. On a phone five columns would either
 * force horizontal scrolling or shrink past reading size, so each row becomes
 * one stacked card instead — same content, same order, symptoms still a real
 * bullet list rather than one comma-run sentence.
 */
export function DiseaseReferenceTable({ block }: { block: DiseaseReferenceTableBlock }) {
  return (
    <div className="min-w-0">
      {/* Phone: one card per disease. */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {block.rows.map((row) => (
          <li key={row.id} className="rounded-2xl border border-border bg-card/55 p-4">
            <p className="text-[13px] font-bold text-foreground">
              {row.icon && <span className="mr-1">{row.icon}</span>}
              {row.disease}
            </p>
            <dl className="mt-2 flex flex-col gap-1.5">
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.symptomsLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  <ul className="list-disc space-y-0.5 pl-4">
                    {row.symptoms.map((symptom) => (
                      <li key={symptom}>{symptom}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.pathogenLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  {row.pathogen}
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.vectorLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  {row.vector}
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.wayOfInfectionLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  {row.wayOfInfection}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Tablet and up: the real table. */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-secondary/40">
              <th
                scope="col"
                className="w-[13%] border-b border-border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.diseaseLabel}
              </th>
              <th
                scope="col"
                className="w-[27%] border-b border-border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.symptomsLabel}
              </th>
              <th
                scope="col"
                className="w-[20%] border-b border-border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.pathogenLabel}
              </th>
              <th
                scope="col"
                className="w-[18%] border-b border-border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.vectorLabel}
              </th>
              <th
                scope="col"
                className="border-b border-border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.wayOfInfectionLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? "bg-card/40" : undefined}>
                <th
                  scope="row"
                  className="border-b border-border/70 px-3 py-3 align-top text-[12px] font-bold text-foreground"
                >
                  {row.icon && <span className="mr-1">{row.icon}</span>}
                  {row.disease}
                </th>
                <td className="border-b border-border/70 px-3 py-3 align-top text-[11.5px] leading-snug text-muted-foreground">
                  <ul className="list-disc space-y-0.5 pl-4">
                    {row.symptoms.map((symptom) => (
                      <li key={symptom}>{symptom}</li>
                    ))}
                  </ul>
                </td>
                <td className="border-b border-border/70 px-3 py-3 align-top text-[11.5px] leading-snug text-muted-foreground">
                  {row.pathogen}
                </td>
                <td className="border-b border-border/70 px-3 py-3 align-top text-[11.5px] leading-snug text-muted-foreground">
                  {row.vector}
                </td>
                <td className="border-b border-border/70 px-3 py-3 align-top text-[11.5px] leading-snug text-muted-foreground">
                  {row.wayOfInfection}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
