import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Avatar } from "@/components/Avatar";
import { loadoutRarity } from "@/data/avatar";
import { getTitle } from "@/data/collection";
import type { AvatarConfig } from "@/hooks/use-progress";

interface ExplorerChamberProps {
  config: AvatarConfig;
  titleId?: string;
  size?: number;
  /** Chess rank glow color passed from parent (e.g. getRank(xp).glowColor).
   *  Drives the pedestal glow — purple for Queen, dark for Pawn. */
  rankGlowColor?: string;
  rankName?: string;
}

/**
 * Pop Mart display chamber. The character floats above a glowing rank pedestal;
 * orbit rings are tinted by loadout rarity; the base glow colour signals chess rank.
 */
export function ExplorerChamber({ config, titleId, size = 200, rankGlowColor, rankName }: ExplorerChamberProps) {
  const rarity = loadoutRarity(config);
  const title = getTitle(titleId);

  const loadoutKey = `${config.suit}|${config.helmet}|${config.visor}|${config.pet}`;
  const [flash, setFlash] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 720);
    return () => window.clearTimeout(t);
  }, [loadoutKey]);

  // The pedestal glow uses rank color when provided, falling back to rarity color
  const pedestalColor = rankGlowColor ?? rarity.glow;

  const stageStyle = {
    width: size * 1.5,
    height: size * 1.5,
    "--rar-color": `${rarity.color}66`,
    "--rar-glow": rarity.glow,
  } as CSSProperties;

  return (
    <div className="explorer-chamber flex flex-col items-center">
      <div className="chamber-stage" style={stageStyle}>
        {/* Ambient rarity glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle at 50% 46%, ${rarity.glow}, transparent 62%)`,
          }}
        />

        {/* Orbit rings (rarity-tinted) */}
        <div className="chamber-ring chamber-ring-outer" />
        <div className="chamber-ring chamber-ring-inner" />

        {/* Rank pedestal glow — colour signals chess rank (purple = Queen, dark = Pawn) */}
        <div
          className="pointer-events-none absolute left-1/2 top-[72%] h-[18%] w-[72%] -translate-x-1/2"
          style={{
            background: `radial-gradient(ellipse at center, ${pedestalColor}, transparent 70%)`,
            boxShadow: `0 0 48px ${pedestalColor}`,
            transform: "translateX(-50%) rotateX(64deg)",
            borderRadius: "50%",
          }}
        />

        {/* Avatar with inline rank glow ring */}
        <div
          className="chamber-avatar-float absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          style={{ filter: `drop-shadow(0 10px 24px ${rarity.glow})` }}
        >
          <div
            className={flash ? "animate-equip-flash rounded-full" : "rounded-full"}
            style={{ ["--rar-glow" as string]: rarity.glow }}
          >
            <Avatar config={config} size={size} glow={false} rankGlow={rankGlowColor} />
          </div>
        </div>
      </div>

      {/* Title + rank + rarity */}
      <div className="-mt-2 flex flex-col items-center gap-1.5">
        <span
          className="rounded-full border px-4 py-1.5 font-display text-sm font-black"
          style={{
            borderColor: `${title.color}55`,
            background: `${title.color}1a`,
            color: title.color,
          }}
        >
          {title.name}
        </span>
        {rankName && (
          <span
            className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em]"
            style={{ color: rankGlowColor ?? rarity.color }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{
                background: rankGlowColor ?? rarity.color,
                boxShadow: `0 0 10px ${rankGlowColor ?? rarity.glow}`,
              }}
            />
            {rankName}
          </span>
        )}
        <span
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: rarity.color }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: rarity.color, boxShadow: `0 0 8px ${rarity.glow}` }}
          />
          {rarity.label} loadout
        </span>
      </div>
    </div>
  );
}
