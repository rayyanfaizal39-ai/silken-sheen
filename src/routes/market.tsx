import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  Check,
  Lock,
  Brain,
  ArrowRight,
  Store,
  Shirt,
  BadgeCheck,
  Stars,
  Crown,
} from "lucide-react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { ExplorerChamber } from "@/components/ExplorerChamber";
import { UnlockCelebration, type UnlockReward } from "@/components/UnlockCelebration";
import {
  AVATAR_SLOTS,
  itemsForSlot,
  getItem,
  RARITIES,
  type AvatarItem,
  type AvatarSlot,
} from "@/data/avatar";
import { EXPLORER_TITLES, PLANET_BADGES, CONSTELLATIONS, getTitle } from "@/data/collection";
import { computeCollection } from "@/lib/collection";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Explorer Hub — AcadeMY" },
      {
        name: "description",
        content: "Customise your explorer, collect rare gear, badges, constellations and titles.",
      },
    ],
  }),
  component: MarketPage,
});

type Tab = "gear" | "titles" | "badges";

const TABS: { id: Tab; label: string; icon: typeof Shirt }[] = [
  { id: "gear", label: "Gear", icon: Shirt },
  { id: "titles", label: "Titles", icon: Crown },
  { id: "badges", label: "Badges", icon: BadgeCheck },
];

function rewardForCosmetic(item: AvatarItem, fromName?: string): UnlockReward {
  const r = RARITIES[item.rarity];
  return {
    id: item.id,
    name: item.name,
    subtitle: `${r.label} ${item.slot} unlocked`,
    color: r.color,
    glow: r.glow,
    rarityLabel: r.label,
    rarityKey: item.rarity,
    from: fromName,
  };
}

function rewardForId(id: string): UnlockReward | null {
  const badge = PLANET_BADGES.find((b) => b.id === id);
  if (badge)
    return {
      id,
      name: badge.name,
      subtitle: badge.description,
      color: badge.color,
      glow: `${badge.color}88`,
      rarityLabel: "Planet Badge",
    };
  const constel = CONSTELLATIONS.find((c) => c.id === id);
  if (constel)
    return {
      id,
      name: constel.name,
      subtitle: constel.description,
      color: constel.color,
      glow: `${constel.color}88`,
      rarityLabel: "Constellation",
    };
  const title = EXPLORER_TITLES.find((t) => t.id === id);
  if (title)
    return {
      id,
      name: title.name,
      subtitle: "New Explorer Title unlocked",
      color: title.color,
      glow: `${title.color}88`,
      rarityLabel: "Explorer Title",
    };
  return null;
}

function MarketPage() {
  const { progress, buyAvatarItem, equipAvatar, setTitle, markCollectiblesSeen } = useProgress();
  const [tab, setTab] = useState<Tab>("gear");
  const [reward, setReward] = useState<UnlockReward | null>(null);

  const avatar = progress.avatar;
  const tokens = progress.tokens ?? 0;
  const rank = getRank(progress.xp);
  const collection = useMemo(() => computeCollection(progress), [progress]);
  const unlockedKey = collection.unlockedIds.join("|");

  // Celebrate passively-earned collectibles (badges / constellations / titles).
  useEffect(() => {
    if (progress.seenCollectibles === undefined) {
      // First visit — adopt current unlocks silently so we don't spam celebrations.
      markCollectiblesSeen(collection.unlockedIds);
      return;
    }
    const seen = new Set(progress.seenCollectibles);
    const fresh = collection.unlockedIds.filter(
      (id) => !seen.has(id) && !getItem(id), // cosmetics are celebrated on purchase
    );
    if (fresh.length > 0) {
      const r = rewardForId(fresh[0]);
      if (r) setReward(r);
      markCollectiblesSeen(fresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedKey]);

  function handleGear(item: AvatarItem) {
    if (avatar.owned.includes(item.id)) {
      equipAvatar(item.slot, item.id);
      return;
    }
    if (buyAvatarItem(item.slot, item.id, item.cost)) {
      setReward(rewardForCosmetic(item));
      markCollectiblesSeen([item.id]);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">
      {reward && <UnlockCelebration reward={reward} onClose={() => setReward(null)} />}

      {/* ── Header ── */}
      <header className="relative overflow-hidden rounded-[2rem] border border-[#FBBF24]/25 bg-gradient-to-br from-[#78350F]/30 via-[#0B1220]/70 to-[#312E81]/30 p-6 backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22),transparent_60%)] blur-2xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] shadow-[0_0_28px_rgba(251,191,36,0.5)]">
              <Store className="h-7 w-7 text-[#050816]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#FCD34D]">
                Explorer Hub
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                Collect the cosmos
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2.5 self-start rounded-2xl border border-[#FBBF24]/30 bg-[#FBBF24]/10 px-4 py-3">
            <Sparkles className="h-5 w-5 text-[#FBBF24]" />
            <div>
              <p className="font-display text-xl font-extrabold tabular-nums leading-none text-white">
                {tokens.toLocaleString()}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#FCD34D]/80">
                Stardust
              </p>
            </div>
          </div>
        </div>

        {/* Collection completion */}
        <div className="relative mt-6">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wide text-white/60">
              <Stars className="h-4 w-4 text-[#A78BFA]" /> Collection complete
            </span>
            <span className="font-black tabular-nums text-white">
              {collection.completionPct}% · {collection.earnedCount}/{collection.totalCount}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#FBBF24] transition-all duration-700"
              style={{ width: `${collection.completionPct}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* ── Display chamber ── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] border border-white/[0.1] bg-gradient-to-b from-[#1E1B4B]/55 to-[#0B1220]/75 p-6 backdrop-blur-2xl">
            <ExplorerChamber config={avatar} titleId={progress.equippedTitle} size={170} rankGlowColor={rank.glowColor} rankName={rank.name} />
            <Link
              to="/quizzes"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-2.5 text-xs font-bold text-white transition-transform hover:scale-[1.02]"
            >
              <Brain className="h-4 w-4" /> Earn more Stardust
            </Link>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-white/40">
              Score <span className="font-bold text-[#FBBF24]">80%+</span> on quizzes to earn
              Stardust, badges and titles.
            </p>
          </div>
        </aside>

        {/* ── Tabs ── */}
        <div>
          <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                  aria-pressed={active}
                >
                  <Icon className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </div>

          {tab === "gear" && (
            <div className="space-y-7">
              {AVATAR_SLOTS.map(({ slot, label }) => (
                <GearSlot
                  key={slot}
                  slot={slot}
                  label={label}
                  equippedId={avatar[slot]}
                  owned={avatar.owned}
                  tokens={tokens}
                  onAction={handleGear}
                />
              ))}
            </div>
          )}

          {tab === "titles" && (
            <TitlesPanel
              equippedTitle={progress.equippedTitle}
              xp={progress.xp}
              onEquip={setTitle}
            />
          )}

          {tab === "badges" && <BadgesPanel collection={collection} />}
        </div>
      </div>
    </section>
  );
}

// ─── Gear ──────────────────────────────────────────────────────────────────────
function GearSlot({
  slot,
  label,
  equippedId,
  owned,
  tokens,
  onAction,
}: {
  slot: AvatarSlot;
  label: string;
  equippedId: string;
  owned: string[];
  tokens: number;
  onAction: (item: AvatarItem) => void;
}) {
  return (
    <section>
      <h2 className="mb-3 font-display text-lg font-bold text-white">{label}</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {itemsForSlot(slot).map((item) => {
          const r = RARITIES[item.rarity];
          const isOwned = owned.includes(item.id);
          const isEquipped = equippedId === item.id;
          const affordable = tokens >= item.cost;
          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl border p-4 transition-all"
              style={{
                borderColor: isEquipped ? "#34D39988" : `${r.color}40`,
                background: isEquipped
                  ? "rgba(52,211,153,0.08)"
                  : `linear-gradient(160deg, ${r.color}14, rgba(11,18,32,0.6))`,
              }}
            >
              {/* Rarity ribbon */}
              <span
                className="absolute right-0 top-0 rounded-bl-lg px-2 py-0.5 text-[8px] font-black uppercase tracking-widest"
                style={{ background: `${r.color}26`, color: r.color }}
              >
                {r.label}
              </span>

              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${r.color}1f`, boxShadow: `inset 0 0 12px ${r.glow}` }}
                >
                  <span
                    className="h-5 w-5 rounded-full"
                    style={{
                      background:
                        item.colors.base === "transparent"
                          ? "repeating-linear-gradient(45deg,#475569,#475569 2px,#1e293b 2px,#1e293b 4px)"
                          : `linear-gradient(135deg, ${item.colors.trim}, ${item.colors.base})`,
                    }}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{item.name}</p>
                  <p className="truncate text-[11px] text-white/45">{item.blurb}</p>
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between">
                {item.cost === 0 ? (
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white/35">
                    Starter
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-black tabular-nums text-[#FBBF24]">
                    <Sparkles className="h-3.5 w-3.5" /> {item.cost}
                  </span>
                )}

                {isEquipped ? (
                  <span className="inline-flex items-center gap-1 rounded-xl bg-[#34D399]/15 px-3 py-1.5 text-[11px] font-black text-[#34D399]">
                    <Check className="h-3.5 w-3.5" /> Equipped
                  </span>
                ) : isOwned ? (
                  <button
                    type="button"
                    onClick={() => onAction(item)}
                    className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-white/[0.12]"
                  >
                    Equip
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAction(item)}
                    disabled={!affordable}
                    className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-black transition-all ${
                      affordable
                        ? "text-[#050816] hover:scale-[1.04]"
                        : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-white/30"
                    }`}
                    style={
                      affordable
                        ? { background: `linear-gradient(90deg, ${r.color}, ${r.glow})` }
                        : undefined
                    }
                  >
                    {affordable ? (
                      <>
                        Unlock <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" /> Locked
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Titles ────────────────────────────────────────────────────────────────────
function TitlesPanel({
  equippedTitle,
  xp,
  onEquip,
}: {
  equippedTitle: string | undefined;
  xp: number;
  onEquip: (id: string) => void;
}) {
  const current = getTitle(equippedTitle).id;
  return (
    <div className="space-y-3">
      {EXPLORER_TITLES.map((t) => {
        const unlocked = xp >= t.minXp;
        const isEquipped = current === t.id;
        return (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-2xl border p-4"
            style={{
              borderColor: isEquipped ? `${t.color}66` : "rgba(255,255,255,0.08)",
              background: isEquipped ? `${t.color}12` : "rgba(11,18,32,0.6)",
            }}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${t.color}1f` }}
            >
              <Crown className="h-5 w-5" style={{ color: unlocked ? t.color : "#64748B" }} />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="font-display text-base font-bold"
                style={{ color: unlocked ? "#fff" : "rgba(255,255,255,0.5)" }}
              >
                {t.name}
              </p>
              <p className="text-[11px] text-white/45">
                {unlocked ? "Unlocked" : `Reach ${t.minXp.toLocaleString()} XP to unlock`}
              </p>
            </div>
            {isEquipped ? (
              <span
                className="inline-flex items-center gap-1 rounded-xl bg-white/[0.08] px-3 py-1.5 text-[11px] font-black"
                style={{ color: t.color }}
              >
                <Check className="h-3.5 w-3.5" /> Worn
              </span>
            ) : unlocked ? (
              <button
                type="button"
                onClick={() => onEquip(t.id)}
                className="rounded-xl px-3 py-1.5 text-[11px] font-black text-[#050816] transition-transform hover:scale-[1.04]"
                style={{ background: t.color }}
              >
                Wear
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-white/30">
                <Lock className="h-3.5 w-3.5" /> Locked
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Badges + Constellations ─────────────────────────────────────────────────────
function BadgesPanel({ collection }: { collection: ReturnType<typeof computeCollection> }) {
  return (
    <div className="space-y-7">
      <section>
        <h2 className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-white">
          <BadgeCheck className="h-5 w-5 text-[#FBBF24]" /> Planet Badges
        </h2>
        <p className="mb-3 text-sm text-white/45">Master each world by passing its quizzes.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {collection.badges.map((b) => (
            <div
              key={b.def.id}
              className="flex items-center gap-3 rounded-2xl border p-4"
              style={{
                borderColor: b.earned ? `${b.def.color}55` : "rgba(255,255,255,0.08)",
                background: b.earned ? `${b.def.color}12` : "rgba(11,18,32,0.6)",
              }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: b.earned ? b.def.color : "rgba(255,255,255,0.12)",
                  background: b.earned
                    ? `radial-gradient(circle at 40% 30%, ${b.def.color}55, transparent)`
                    : "transparent",
                  filter: b.earned ? "none" : "grayscale(1)",
                  opacity: b.earned ? 1 : 0.55,
                }}
              >
                {b.earned ? (
                  <BadgeCheck className="h-6 w-6" style={{ color: b.def.color }} />
                ) : (
                  <Lock className="h-5 w-5 text-white/40" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{b.def.name}</p>
                <p className="truncate text-[11px] text-white/45">{b.def.description}</p>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round((b.current / b.target) * 100)}%`,
                      background: b.def.color,
                    }}
                  />
                </div>
                <p className="mt-1 text-[10px] font-bold tabular-nums text-white/40">
                  {Math.min(b.current, b.target)}/{b.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Stars className="h-5 w-5 text-[#A78BFA]" /> Constellations
        </h2>
        <p className="mb-3 text-sm text-white/45">Complete an entire world to light up the sky.</p>
        <div className="space-y-3">
          {collection.constellations.map((c) => (
            <div
              key={c.def.id}
              className="rounded-2xl border p-4"
              style={{
                borderColor: c.earned ? `${c.def.color}55` : "rgba(255,255,255,0.08)",
                background: c.earned ? `${c.def.color}12` : "rgba(11,18,32,0.6)",
              }}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <Stars className="h-4 w-4" style={{ color: c.def.color }} />
                  {c.def.name}
                </p>
                <span className="text-xs font-black tabular-nums" style={{ color: c.def.color }}>
                  {c.earned ? "Complete ✦" : `${c.pct}%`}
                </span>
              </div>
              <p className="mb-2 text-[11px] text-white/45">{c.def.description}</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${c.pct}%`,
                    background: `linear-gradient(90deg, ${c.def.color}99, ${c.def.color})`,
                  }}
                />
              </div>
              <p className="mt-1 text-[10px] font-bold tabular-nums text-white/40">
                {c.completed}/{c.total} chapters
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
