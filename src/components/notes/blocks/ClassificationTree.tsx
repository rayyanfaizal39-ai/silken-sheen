import { useState } from "react";
import type { ClassificationBranch, CompareColumn } from "@/content/form2/science/chapter-1/interactive-types";

function VertebrateGroupTabs({ groups }: { groups: NonNullable<ClassificationBranch["vertebrateGroups"]> }) {
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <button
            key={g.name}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              i === active
                ? "border-transparent bg-gradient-to-r from-primary to-accent text-white"
                : "border-border bg-secondary/40 text-muted-foreground"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {group.traits.map((trait) => (
          <li key={trait} className="flex items-start gap-2 text-[13px] leading-snug text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{trait}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {group.examples.map((ex) => (
          <span
            key={ex}
            className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11.5px] text-foreground"
          >
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}

function BranchDetail({ branch }: { branch: ClassificationBranch }) {
  return (
    <div className="mt-3 rounded-xl border border-border bg-secondary/30 p-3.5 text-left">
      {branch.detail && (
        <p className="text-[13px] leading-relaxed text-muted-foreground">{branch.detail}</p>
      )}
      {branch.chips && (
        <div className="flex flex-wrap gap-1.5">
          {branch.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11.5px] text-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
      {branch.chipGroups?.map((group) => (
        <div key={group.label} className="mt-2.5 first:mt-0">
          <p className="mb-1.5 text-[11px] font-semibold text-muted-foreground">{group.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {group.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11.5px] text-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ))}
      {branch.vertebrateGroups && <VertebrateGroupTabs groups={branch.vertebrateGroups} />}
    </div>
  );
}

export function ClassificationTree({
  rootLabel,
  branches,
  compareColumns,
  onSelect,
}: {
  rootLabel?: string;
  branches: ClassificationBranch[];
  compareColumns?: CompareColumn[];
  onSelect?: (branchId: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      {rootLabel && (
        <div className="mb-4 flex justify-center">
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/25 to-accent/15 px-6 py-3 text-center font-display text-sm font-bold text-foreground">
            {rootLabel}
          </div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {branches.map((branch) => {
          const isSelected = selectedId === branch.id;
          return (
            <div key={branch.id} className="text-center">
              <button
                type="button"
                onClick={() => {
                  const next = isSelected ? null : branch.id;
                  setSelectedId(next);
                  if (next) onSelect?.(branch.id);
                }}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border bg-secondary/40 text-muted-foreground"
                }`}
              >
                {branch.label}
              </button>
              {isSelected && <BranchDetail branch={branch} />}
            </div>
          );
        })}
      </div>

      {compareColumns && (
        <div className="mt-5 grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
          {compareColumns.map((col, i) => (
            <div
              key={col.label}
              className={`p-4 ${i === 0 ? "bg-primary/10" : "bg-accent/10"} ${
                i > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
              }`}
            >
              <h4 className="font-display mb-2.5 text-sm font-bold text-foreground">
                {col.icon} {col.label}
              </h4>
              <dl className="text-[12.5px] text-muted-foreground">
                {col.rows.map((row) => (
                  <div key={row.term} className="mt-2 first:mt-0">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                      {row.term}
                    </dt>
                    <dd className="mt-0.5 text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
