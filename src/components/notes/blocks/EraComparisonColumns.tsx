import { bgPanel, hexToRgba, neon } from "./neon-tokens";

export interface EraComparisonItem {
  century: string;
  malayKingdoms: string[];
  foreignKingdoms: string[];
}

function ChipGroup({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="mb-2.5 last:mb-0">
      <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-wide" style={{ color }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full px-2.5 py-1 text-[10.5px] font-medium"
            style={{ background: hexToRgba(color, 0.15), color }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function EraComparisonColumns({ eras }: { eras: EraComparisonItem[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {eras.map((era) => (
        <div key={era.century} className="min-w-[220px] flex-1 rounded-2xl p-4" style={{ background: bgPanel }}>
          <h5 className="font-display mb-2.5 text-center text-[13px] font-bold" style={{ color: neon.amber }}>
            {era.century}
          </h5>
          <ChipGroup label="Alam Melayu" items={era.malayKingdoms} color={neon.green} />
          <ChipGroup label="Kerajaan Luar" items={era.foreignKingdoms} color={neon.red} />
        </div>
      ))}
    </div>
  );
}
