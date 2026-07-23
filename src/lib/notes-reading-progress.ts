import { supabase } from "@/lib/supabase";

export const NOTES_PROGRESS_VARIANT_DEFAULT = "default";
export const NOTES_COMPLETE_THRESHOLD = 97;

export type NotesProgressScope = {
  subject: string;
  form: string;
  variant?: string;
};

export type NotesProgressMap = Record<string, number>;
export type NotesSectionProgressMap = Record<string, number>;

export type PendingNotesProgress = {
  userId: string;
  scope: NotesProgressScope;
  chapter: string;
  progressPercent: number;
  sectionProgress: NotesSectionProgressMap;
  updatedAt: number;
};

const PENDING_NOTES_PROGRESS_PREFIX = "academy:notes-progress-pending:v1";
const pendingFlushes = new Map<string, Promise<void>>();

type NotesProgressRow = {
  chapter: string;
  progress_percent: number;
};

export function normalizeNotesVariant(variant?: string | null) {
  return variant?.trim().toLowerCase() || NOTES_PROGRESS_VARIANT_DEFAULT;
}

export function notesProgressIdentityKey(
  userId: string,
  scope: NotesProgressScope,
  chapter: string,
) {
  return [userId, scope.subject, scope.form, chapter, normalizeNotesVariant(scope.variant)].join(
    ":",
  );
}

function pendingStorage(storage?: Storage) {
  if (storage) return storage;
  return typeof window !== "undefined" ? window.localStorage : null;
}

function pendingStorageKey(userId: string) {
  return `${PENDING_NOTES_PROGRESS_PREFIX}:${userId}`;
}

function readPendingEntries(userId: string, storage?: Storage) {
  const target = pendingStorage(storage);
  if (!target) return {} as Record<string, PendingNotesProgress>;
  try {
    const value = JSON.parse(target.getItem(pendingStorageKey(userId)) ?? "{}");
    return value && typeof value === "object"
      ? (value as Record<string, PendingNotesProgress>)
      : {};
  } catch {
    return {};
  }
}

function writePendingEntries(
  userId: string,
  entries: Record<string, PendingNotesProgress>,
  storage?: Storage,
) {
  const target = pendingStorage(storage);
  if (!target) return;
  try {
    if (Object.keys(entries).length === 0) target.removeItem(pendingStorageKey(userId));
    else target.setItem(pendingStorageKey(userId), JSON.stringify(entries));
  } catch {
    // Storage can be unavailable in privacy modes. Supabase writes still proceed.
  }
}

export function enqueuePendingNotesProgress(
  entry: Omit<PendingNotesProgress, "updatedAt">,
  storage?: Storage,
) {
  const entries = readPendingEntries(entry.userId, storage);
  const identity = notesProgressIdentityKey(entry.userId, entry.scope, entry.chapter);
  const previous = entries[identity];
  const next: PendingNotesProgress = {
    ...entry,
    progressPercent: maxNotesProgress(previous?.progressPercent ?? 0, entry.progressPercent),
    sectionProgress: mergeSectionProgress(previous?.sectionProgress ?? {}, entry.sectionProgress),
    updatedAt: Date.now(),
  };
  entries[identity] = next;
  writePendingEntries(entry.userId, entries, storage);
  return next;
}

export function getPendingNotesProgressForScope(
  userId: string,
  scope: NotesProgressScope,
  storage?: Storage,
) {
  return Object.values(readPendingEntries(userId, storage)).filter(
    (entry) =>
      entry.scope.subject === scope.subject &&
      entry.scope.form === scope.form &&
      normalizeNotesVariant(entry.scope.variant) === normalizeNotesVariant(scope.variant),
  );
}

export function clampNotesProgress(value: number) {
  if (!Number.isFinite(value)) return 0;
  const rounded = Math.round(value);
  return rounded >= NOTES_COMPLETE_THRESHOLD ? 100 : Math.max(0, Math.min(100, rounded));
}

export function maxNotesProgress(current: number, incoming: number) {
  return Math.max(clampNotesProgress(current), clampNotesProgress(incoming));
}

export function selectNotesAwareProgress(
  resourceType: string,
  notesPercent: number | undefined,
  activity?: { read?: boolean; quiz?: boolean; cards?: boolean },
) {
  if (resourceType === "notes") return notesPercent ?? 0;
  if (!activity) return 0;
  const completed = Number(!!activity.read) + Number(!!activity.quiz) + Number(!!activity.cards);
  return Math.round((completed / 3) * 100);
}

export function calculateNotesProgress({
  contentTop,
  contentHeight,
  viewportBottom,
}: {
  contentTop: number;
  contentHeight: number;
  viewportBottom: number;
}) {
  if (contentHeight <= 0) return 0;
  return clampNotesProgress(((viewportBottom - contentTop) / contentHeight) * 100);
}

export function mergeSectionProgress(
  current: NotesSectionProgressMap,
  incoming: NotesSectionProgressMap,
) {
  const merged = { ...current };
  for (const [sectionId, progress] of Object.entries(incoming)) {
    merged[sectionId] = maxNotesProgress(merged[sectionId] ?? 0, progress);
  }
  return merged;
}

export function calculateCombinedSectionProgress(
  sectionProgress: NotesSectionProgressMap,
  sections: Array<{ id: string; weight?: number }>,
) {
  const meaningful = sections.filter((section) => (section.weight ?? 1) > 0);
  const totalWeight = meaningful.reduce((sum, section) => sum + (section.weight ?? 1), 0);
  if (totalWeight <= 0) return 0;
  const completedWeight = meaningful.reduce(
    (sum, section) =>
      sum + (clampNotesProgress(sectionProgress[section.id] ?? 0) / 100) * (section.weight ?? 1),
    0,
  );
  const combined = (completedWeight / totalWeight) * 100;
  const allComplete = meaningful.every(
    (section) => clampNotesProgress(sectionProgress[section.id] ?? 0) === 100,
  );
  return allComplete ? 100 : Math.min(96, Math.round(combined));
}

export async function fetchNotesProgress(userId: string, scope: NotesProgressScope) {
  const { data, error } = await supabase
    .from("notes_reading_progress")
    .select("chapter, progress_percent")
    .eq("user_id", userId)
    .eq("subject", scope.subject)
    .eq("form", scope.form)
    .eq("variant", normalizeNotesVariant(scope.variant));

  if (error) throw error;
  return ((data ?? []) as NotesProgressRow[]).reduce<NotesProgressMap>((result, row) => {
    result[row.chapter] = clampNotesProgress(row.progress_percent);
    return result;
  }, {});
}

export async function saveNotesProgress(
  userId: string,
  scope: NotesProgressScope,
  chapter: string,
  progressPercent: number,
  sectionProgress?: NotesSectionProgressMap,
) {
  const progress = clampNotesProgress(progressPercent);
  const { error } = await supabase.from("notes_reading_progress").upsert(
    {
      user_id: userId,
      subject: scope.subject,
      form: scope.form,
      chapter,
      variant: normalizeNotesVariant(scope.variant),
      progress_percent: progress,
      ...(sectionProgress ? { section_progress: sectionProgress } : {}),
      completed: progress === 100,
      last_read_at: new Date().toISOString(),
    },
    { onConflict: "user_id,subject,form,chapter,variant" },
  );
  if (error) throw error;
}

export async function fetchChapterSectionProgress(
  userId: string,
  scope: NotesProgressScope,
  chapter: string,
) {
  const { data, error } = await supabase
    .from("notes_reading_progress")
    .select("section_progress")
    .eq("user_id", userId)
    .eq("subject", scope.subject)
    .eq("form", scope.form)
    .eq("chapter", chapter)
    .eq("variant", normalizeNotesVariant(scope.variant))
    .maybeSingle();
  if (error) throw error;
  const value = data?.section_progress;
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as NotesSectionProgressMap)
    : {};
}

export function flushPendingNotesProgress(
  userId: string,
  storage?: Storage,
  writer: typeof saveNotesProgress = saveNotesProgress,
) {
  const entries = readPendingEntries(userId, storage);
  const operations = Object.keys(entries).map((identity) => {
    const active = pendingFlushes.get(identity);
    if (active) return active;
    const operation = (async () => {
      while (true) {
        const latestEntries = readPendingEntries(userId, storage);
        const snapshot = latestEntries[identity];
        if (!snapshot) return;
        await writer(
          snapshot.userId,
          snapshot.scope,
          snapshot.chapter,
          snapshot.progressPercent,
          snapshot.sectionProgress,
        );
        const afterSave = readPendingEntries(userId, storage);
        const current = afterSave[identity];
        if (!current) return;
        if (current.updatedAt === snapshot.updatedAt) {
          delete afterSave[identity];
          writePendingEntries(userId, afterSave, storage);
          return;
        }
      }
    })().finally(() => pendingFlushes.delete(identity));
    pendingFlushes.set(identity, operation);
    return operation;
  });
  return Promise.allSettled(operations).then((results) => {
    const rejected = results.find((result) => result.status === "rejected");
    if (rejected?.status === "rejected") throw rejected.reason;
  });
}
