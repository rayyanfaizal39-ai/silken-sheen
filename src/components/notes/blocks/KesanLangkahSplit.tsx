import { bgPanel, chipGlow, neon } from "./neon-tokens";

export interface SplitItem {
  title: string;
  details: string[];
}

// Icon lookup by keyword match against the item title — mirrors the fixed icon set used per-row in
// design-reference/geo-signature-visuals-ch12.html's .icon-card list (no icon field exists in content).
const ICON_RULES: Array<[string, string]> = [
  ["Bekalan Air Bersih", "🚱"],
  ["Tanih", "🏜️"],
  ["Flora", "🐟"],
  ["Manusia", "🏥"],
  ["Tadahan Hujan", "🌳"],
  ["Undang-undang", "⚖️"],
  ["Kumbahan", "🔧"],
  ["Bawah Tanah", "🕳️"],
  ["Kesedaran", "📢"],
];

function iconFor(title: string, fallback: string): string {
  const rule = ICON_RULES.find(([kw]) => title.includes(kw));
  return rule ? rule[1] : fallback;
}

function IconCard({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div
      className="mb-2.5 flex items-center gap-2.5 rounded-xl p-3"
      style={{ background: bgPanel, boxShadow: chipGlow(color, 10, 0.15) }}
    >
      <span className="shrink-0 text-xl leading-none">{icon}</span>
      <span className="text-[11.5px] font-semibold text-foreground">{text}</span>
    </div>
  );
}

export function KesanLangkahSplit({
  leftHeading,
  leftItems,
  rightHeading,
  rightItems,
}: {
  leftHeading: string;
  leftItems: SplitItem[];
  rightHeading: string;
  rightItems: SplitItem[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 className="font-display mb-2.5 text-sm font-bold" style={{ color: neon.red }}>
          {leftHeading}
        </h4>
        <div>
          {leftItems.map((item) => (
            <IconCard key={item.title} icon={iconFor(item.title, "⚠️")} text={item.title} color={neon.red} />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display mb-2.5 text-sm font-bold" style={{ color: neon.green }}>
          {rightHeading}
        </h4>
        <div>
          {rightItems.map((item) => (
            <IconCard key={item.title} icon={iconFor(item.title, "✅")} text={item.title} color={neon.green} />
          ))}
        </div>
      </div>
    </div>
  );
}
