type StoredActivity = {
  subjectId?: unknown;
  chapterKey?: unknown;
  form?: unknown;
};

type StoredProgress = {
  favorites: string[];
  cardMastery?: Record<string, unknown>;
  lastVisited?: StoredActivity;
  recentActivity?: StoredActivity[];
};

type PendingNotesEntry = {
  scope?: { subject?: unknown; form?: unknown };
  chapter?: unknown;
};

const REMOVED_CARD_ID = /^geo-f3-c12-f\d+$/;
const PENDING_NOTES_PREFIX = "academy:notes-progress-pending:v1";

function isRemovedActivity(activity: StoredActivity | undefined) {
  return (
    activity?.subjectId === "geography" &&
    activity.form === "Form 3" &&
    activity.chapterKey === "Chapter 12"
  );
}

/** Removes only identifiers that unambiguously belong to the retired chapter. */
export function sanitizeRemovedGeographyF3Progress<T extends StoredProgress>(progress: T): T {
  const favorites = progress.favorites.filter((id) => !REMOVED_CARD_ID.test(id));
  const cardMastery = Object.fromEntries(
    Object.entries(progress.cardMastery ?? {}).filter(([id]) => !REMOVED_CARD_ID.test(id)),
  );
  const recentActivity = progress.recentActivity?.filter((item) => !isRemovedActivity(item));
  const lastVisited = isRemovedActivity(progress.lastVisited) ? undefined : progress.lastVisited;

  const changed =
    favorites.length !== progress.favorites.length ||
    Object.keys(cardMastery).length !== Object.keys(progress.cardMastery ?? {}).length ||
    recentActivity?.length !== progress.recentActivity?.length ||
    lastVisited !== progress.lastVisited;

  if (!changed) return progress;
  return {
    ...progress,
    favorites,
    cardMastery,
    lastVisited,
    recentActivity,
  };
}

/** Prevents an old offline notes write from recreating the removed progress row. */
export function removePendingGeographyF3Progress(storage: Storage, userId?: string | null) {
  if (!userId) return;
  const key = `${PENDING_NOTES_PREFIX}:${userId}`;
  try {
    const parsed = JSON.parse(storage.getItem(key) ?? "{}");
    if (!parsed || typeof parsed !== "object") return;

    const entries = Object.entries(parsed as Record<string, PendingNotesEntry>);
    const remaining = entries.filter(
      ([, entry]) =>
        !(
          entry.scope?.subject === "geography" &&
          entry.scope.form === "Form 3" &&
          entry.chapter === "Chapter 12"
        ),
    );
    if (remaining.length === entries.length) return;
    if (remaining.length === 0) storage.removeItem(key);
    else storage.setItem(key, JSON.stringify(Object.fromEntries(remaining)));
  } catch {
    // Malformed or unavailable storage is handled by the existing progress fallback.
  }
}
