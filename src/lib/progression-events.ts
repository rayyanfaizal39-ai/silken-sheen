import { getRank } from "@/data/rankAssets";
import type { CompanionId, CompanionStageId } from "@/hooks/use-progress";

export interface RankUpProgressionEvent {
  type: "rank-up";
  id: string;
  fromRank: string;
  toRank: string;
  previousXp: number;
  currentXp: number;
  xpGained: number;
  timestamp: number;
}

export interface XpGainProgressionEvent {
  type: "xp-gain";
  id: string;
  previousXp: number;
  currentXp: number;
  xpGained: number;
  timestamp: number;
}

/** Reserved by the shared progression channel for the later dedicated celebration. */
export interface CompanionLevelUpProgressionEvent {
  type: "companion-level-up";
  id: string;
  companionId: CompanionId;
  fromStage: CompanionStageId;
  toStage: CompanionStageId;
  timestamp: number;
}

export type ProgressionEvent =
  | RankUpProgressionEvent
  | XpGainProgressionEvent
  | CompanionLevelUpProgressionEvent;

export interface JourneyUnlockEvent {
  eventId: string;
  rankId: string;
  currentXp: number;
}

const RANK_ACKNOWLEDGEMENTS_KEY = "academy-rank-up-acknowledgements-v1";
const PENDING_JOURNEY_UNLOCK_KEY = "academy-pending-journey-unlock-v1";
const MAX_ACKNOWLEDGEMENTS = 12;

let latestEvent: ProgressionEvent | null = null;
const deliveredEventIds = new Set<string>();
const progressionListeners = new Set<(event: ProgressionEvent) => void>();
const journeyListeners = new Set<(event: JourneyUnlockEvent) => void>();

/**
 * Creates one canonical event from an XP transition. Rank ups deliberately
 * replace the small XP event so the same award never produces two overlays.
 */
export function createXpProgressionEvent(
  previousXp: number,
  currentXp: number,
  timestamp = Date.now(),
): RankUpProgressionEvent | XpGainProgressionEvent | null {
  if (!Number.isFinite(previousXp) || !Number.isFinite(currentXp) || currentXp <= previousXp) {
    return null;
  }

  const fromRank = getRank(previousXp);
  const toRank = getRank(currentXp);
  const xpGained = currentXp - previousXp;

  if (fromRank.id !== toRank.id) {
    return {
      type: "rank-up",
      id: `rank:${previousXp}:${currentXp}:${fromRank.id}:${toRank.id}`,
      fromRank: fromRank.id,
      toRank: toRank.id,
      previousXp,
      currentXp,
      xpGained,
      timestamp,
    };
  }

  return {
    type: "xp-gain",
    id: `xp:${previousXp}:${currentXp}`,
    previousXp,
    currentXp,
    xpGained,
    timestamp,
  };
}

export function publishProgressionEvent(event: ProgressionEvent | null): void {
  if (!event || deliveredEventIds.has(event.id)) return;
  if (event.type === "rank-up" && wasRankUpAcknowledged(event.id)) return;

  deliveredEventIds.add(event.id);
  latestEvent = event;
  progressionListeners.forEach((listener) => listener(event));
}

export function subscribeToProgressionEvents(
  listener: (event: ProgressionEvent) => void,
): () => void {
  progressionListeners.add(listener);
  const pending = latestEvent;
  if (pending && !(pending.type === "rank-up" && wasRankUpAcknowledged(pending.id))) {
    queueMicrotask(() => {
      if (progressionListeners.has(listener)) listener(pending);
    });
  }
  return () => progressionListeners.delete(listener);
}

export function clearPublishedProgressionEvent(eventId: string): void {
  if (latestEvent?.id === eventId) latestEvent = null;
}

function readAcknowledgements(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(sessionStorage.getItem(RANK_ACKNOWLEDGEMENTS_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function wasRankUpAcknowledged(eventId: string): boolean {
  return readAcknowledgements().includes(eventId);
}

export function acknowledgeRankUp(eventId: string): void {
  clearPublishedProgressionEvent(eventId);
  if (typeof window === "undefined") return;
  const next = [eventId, ...readAcknowledgements().filter((id) => id !== eventId)].slice(
    0,
    MAX_ACKNOWLEDGEMENTS,
  );
  try {
    sessionStorage.setItem(RANK_ACKNOWLEDGEMENTS_KEY, JSON.stringify(next));
  } catch {
    // Session persistence is a duplicate-prevention enhancement, not a blocker.
  }
}

export function queueJourneyUnlock(event: JourneyUnlockEvent): void {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(PENDING_JOURNEY_UNLOCK_KEY, JSON.stringify(event));
    } catch {
      // The live in-memory handoff still works when session storage is unavailable.
    }
  }
  journeyListeners.forEach((listener) => listener(event));
}

export function subscribeToJourneyUnlocks(
  listener: (event: JourneyUnlockEvent) => void,
): () => void {
  journeyListeners.add(listener);
  const pending = readPendingJourneyUnlock();
  if (pending) {
    queueMicrotask(() => {
      if (journeyListeners.has(listener)) listener(pending);
    });
  }
  return () => journeyListeners.delete(listener);
}

export function completeJourneyUnlock(eventId: string): void {
  if (typeof window === "undefined") return;
  const pending = readPendingJourneyUnlock();
  if (pending?.eventId !== eventId) return;
  try {
    sessionStorage.removeItem(PENDING_JOURNEY_UNLOCK_KEY);
  } catch {
    // A failed cleanup can only repeat the short path animation in this session.
  }
}

function readPendingJourneyUnlock(): JourneyUnlockEvent | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(PENDING_JOURNEY_UNLOCK_KEY) ?? "null",
    ) as Partial<JourneyUnlockEvent> | null;
    return parsed &&
      typeof parsed.eventId === "string" &&
      typeof parsed.rankId === "string" &&
      typeof parsed.currentXp === "number"
      ? { eventId: parsed.eventId, rankId: parsed.rankId, currentXp: parsed.currentXp }
      : null;
  } catch {
    return null;
  }
}
