import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useAuth } from "@/context/auth-context";
import {
  calculateNotesProgress,
  calculateCombinedSectionProgress,
  enqueuePendingNotesProgress,
  fetchChapterSectionProgress,
  fetchNotesProgress,
  flushPendingNotesProgress,
  getPendingNotesProgressForScope,
  maxNotesProgress,
  mergeSectionProgress,
  type NotesProgressMap,
  type NotesProgressScope,
  type NotesSectionProgressMap,
} from "@/lib/notes-reading-progress";

type TrackedSection = {
  id: string;
  weight: number;
  element: HTMLElement | null;
  readable: boolean;
};

function discoverTrackedSections(root: HTMLElement): TrackedSection[] {
  const explicit = Array.from(
    root.querySelectorAll<HTMLElement>("[data-notes-section-id], [id^='english-section-']"),
  );
  const manifestOwner = root.querySelector<HTMLElement>("[data-notes-section-manifest]");
  if (manifestOwner?.dataset.notesSectionManifest) {
    try {
      const manifest = JSON.parse(manifestOwner.dataset.notesSectionManifest) as Array<{
        id: string;
        weight: number;
      }>;
      if (manifest.length > 0) {
        return manifest.map((section) => {
          const element = explicit.find(
            (candidate) => (candidate.dataset.notesSectionId ?? candidate.id) === section.id,
          );
          return {
            ...section,
            element: element ?? null,
            readable: !!element && element.dataset.state !== "closed",
          };
        });
      }
    } catch {
      // Invalid metadata falls through to the safe DOM-based strategies below.
    }
  }
  if (explicit.length > 0) {
    return explicit.map((element) => ({
      id: element.dataset.notesSectionId ?? element.id,
      weight: Math.max(1, Number(element.dataset.notesSectionWeight) || element.scrollHeight),
      element,
      readable: element.dataset.state !== "closed",
    }));
  }

  const tabGroups = Array.from(root.querySelectorAll<HTMLElement>("div"))
    .map((element) => ({
      element,
      buttons: Array.from(element.children).filter(
        (child): child is HTMLButtonElement => child instanceof HTMLButtonElement,
      ),
    }))
    .filter((group) => group.buttons.length >= 2)
    .sort((a, b) => b.buttons.length - a.buttons.length);
  const tabs = tabGroups[0];
  if (tabs) {
    const activeIndex = Math.max(
      0,
      tabs.buttons.findIndex(
        (button) =>
          button.getAttribute("aria-selected") === "true" ||
          button.querySelector(".border-primary, [aria-current='true']") !== null,
      ),
    );
    const activeContent = tabs.element.nextElementSibling;
    return tabs.buttons.map((_, index) => ({
      id: `section-${index}`,
      weight: 1,
      element: index === activeIndex && activeContent instanceof HTMLElement ? activeContent : null,
      readable: index === activeIndex,
    }));
  }

  const chapterContent = root.querySelector<HTMLElement>("section") ?? root;
  return [
    {
      id: "chapter-content",
      weight: Math.max(1, chapterContent.scrollHeight),
      element: chapterContent,
      readable: true,
    },
  ];
}

export function useNotesProgressScope(scope: NotesProgressScope | null) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? null;
  const scopeKey =
    userId && scope
      ? `${userId}:${scope.subject}:${scope.form}:${scope.variant ?? "default"}`
      : "signed-out";
  const [progressState, setProgressState] = useState<{
    scopeKey: string;
    progress: NotesProgressMap;
  }>({ scopeKey, progress: {} });
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    setProgressState({ scopeKey, progress: {} });
    if (authLoading || !userId || !scope) {
      setLoading(false);
      return;
    }
    setLoading(true);
    void fetchNotesProgress(userId, scope)
      .then((rows) => {
        const merged = { ...rows };
        for (const pending of getPendingNotesProgressForScope(userId, scope)) {
          merged[pending.chapter] = maxNotesProgress(
            merged[pending.chapter] ?? 0,
            pending.progressPercent,
          );
        }
        if (requestId.current === id) setProgressState({ scopeKey, progress: merged });
        void flushPendingNotesProgress(userId).catch((error: unknown) =>
          console.error("[Notes progress] Pending retry failed", error),
        );
      })
      .catch((error: unknown) => {
        console.error("[Notes progress] Load failed", error);
        const pendingOnly = getPendingNotesProgressForScope(userId, scope).reduce<NotesProgressMap>(
          (result, entry) => {
            result[entry.chapter] = maxNotesProgress(
              result[entry.chapter] ?? 0,
              entry.progressPercent,
            );
            return result;
          },
          {},
        );
        if (requestId.current === id) {
          setProgressState({ scopeKey, progress: pendingOnly });
        }
      })
      .finally(() => {
        if (requestId.current === id) setLoading(false);
      });
  }, [authLoading, scope, scopeKey, userId]);

  useEffect(() => {
    if (!userId) return;
    const retry = () => {
      void flushPendingNotesProgress(userId).catch((error: unknown) =>
        console.error("[Notes progress] Online retry failed", error),
      );
    };
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [userId]);

  const progress = progressState.scopeKey === scopeKey ? progressState.progress : {};

  const recordProgress = useCallback(
    (chapter: string, incoming: number, replaceLegacy = false) => {
      let next = 0;
      setProgressState((current) => {
        const currentProgress = current.scopeKey === scopeKey ? current.progress : {};
        next = replaceLegacy ? incoming : maxNotesProgress(currentProgress[chapter] ?? 0, incoming);
        return next === currentProgress[chapter]
          ? current
          : { scopeKey, progress: { ...currentProgress, [chapter]: next } };
      });
      return next;
    },
    [scopeKey],
  );

  return { progress, loading: authLoading || loading, userId, recordProgress };
}

export function useNotesReadingTracker({
  contentRef,
  scope,
  chapter,
  userId,
  initialProgress,
  onProgress,
}: {
  contentRef: RefObject<HTMLElement | null>;
  scope: NotesProgressScope | null;
  chapter: string | null;
  userId: string | null;
  initialProgress: number;
  onProgress: (chapter: string, progress: number, replaceLegacy?: boolean) => number;
}) {
  const [visibleProgress, setVisibleProgress] = useState(initialProgress);
  const maximum = useRef(initialProgress);
  const persisted = useRef(initialProgress);
  const sectionProgress = useRef<NotesSectionProgressMap>({});
  const sectionsLoaded = useRef(false);
  const sectionMigrationPending = useRef(false);
  const hasReadingInteraction = useRef(false);
  const lastQueuedSignature = useRef("");
  const debounceTimer = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const initialProgressRef = useRef(initialProgress);
  initialProgressRef.current = initialProgress;
  const identityKey = `${userId ?? "anonymous"}:${scope?.subject ?? ""}:${scope?.form ?? ""}:${scope?.variant ?? ""}:${chapter ?? ""}`;

  useEffect(() => {
    maximum.current = initialProgressRef.current;
    persisted.current = initialProgressRef.current;
    setVisibleProgress(initialProgressRef.current);
    sectionProgress.current = {};
    sectionMigrationPending.current = false;
    hasReadingInteraction.current = false;
    lastQueuedSignature.current = "";
    sectionsLoaded.current = !userId || !scope || !chapter;
    if (userId && scope && chapter) {
      void fetchChapterSectionProgress(userId, scope, chapter)
        .then((saved) => {
          const pending = getPendingNotesProgressForScope(userId, scope).find(
            (entry) => entry.chapter === chapter,
          );
          sectionProgress.current = mergeSectionProgress(
            mergeSectionProgress(sectionProgress.current, saved),
            pending?.sectionProgress ?? {},
          );
          if (Object.keys(saved).length === 0 && initialProgressRef.current > 0) {
            maximum.current = 0;
            persisted.current = 0;
            sectionMigrationPending.current = true;
            setVisibleProgress(0);
          }
          sectionsLoaded.current = true;
          lastQueuedSignature.current = JSON.stringify({
            progress: maximum.current,
            sections: sectionProgress.current,
          });
          window.dispatchEvent(new Event("notes-progress-measure"));
        })
        .catch((error: unknown) => {
          const pending = getPendingNotesProgressForScope(userId, scope).find(
            (entry) => entry.chapter === chapter,
          );
          sectionProgress.current = mergeSectionProgress(
            sectionProgress.current,
            pending?.sectionProgress ?? {},
          );
          sectionsLoaded.current = true;
          console.error("[Notes progress] Section load failed", error);
        });
    }
  }, [chapter, identityKey, scope, userId]);

  useEffect(() => {
    if (initialProgress <= maximum.current) return;
    maximum.current = initialProgress;
    persisted.current = Math.max(persisted.current, initialProgress);
    setVisibleProgress(initialProgress);
  }, [initialProgress]);

  useEffect(() => {
    if (!scope || !chapter) return;

    const queueLatest = () => {
      if (!userId || !sectionsLoaded.current) return;
      const signature = JSON.stringify({
        progress: maximum.current,
        sections: sectionProgress.current,
      });
      if (signature === lastQueuedSignature.current) return;
      enqueuePendingNotesProgress({
        userId,
        scope,
        chapter,
        progressPercent: maximum.current,
        sectionProgress: sectionProgress.current,
      });
      lastQueuedSignature.current = signature;
    };

    const persist = (force = false) => {
      if (!userId || !sectionsLoaded.current) return;
      queueLatest();
      if (
        !force &&
        !sectionMigrationPending.current &&
        maximum.current < 100 &&
        maximum.current - persisted.current < 2
      )
        return;
      if (
        !force &&
        !sectionMigrationPending.current &&
        maximum.current <= persisted.current &&
        persisted.current !== initialProgressRef.current
      )
        return;
      if (debounceTimer.current !== null) {
        window.clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
      const saving = maximum.current;
      void flushPendingNotesProgress(userId)
        .then(() => {
          persisted.current = Math.max(persisted.current, saving);
          sectionMigrationPending.current = false;
        })
        .catch((error: unknown) => console.error("[Notes progress] Save queued", error));
    };

    const schedulePersist = () => {
      if (!userId) return;
      if (debounceTimer.current !== null) window.clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(persist, 1200);
    };

    const measure = () => {
      animationFrame.current = null;
      if (!hasReadingInteraction.current) return;
      const element = contentRef.current;
      if (!element || !sectionsLoaded.current) return;
      const sections = discoverTrackedSections(element);
      const incoming: NotesSectionProgressMap = {};
      for (const section of sections) {
        if (!section.element || !section.readable) continue;
        const rect = section.element.getBoundingClientRect();
        incoming[section.id] = calculateNotesProgress({
          contentTop: window.scrollY + rect.top,
          contentHeight: section.element.scrollHeight,
          viewportBottom: window.scrollY + window.innerHeight,
        });
      }
      const beforeSections = JSON.stringify(sectionProgress.current);
      sectionProgress.current = mergeSectionProgress(sectionProgress.current, incoming);
      const sectionsChanged = JSON.stringify(sectionProgress.current) !== beforeSections;
      const combined = calculateCombinedSectionProgress(sectionProgress.current, sections);
      const next = Math.max(maximum.current, combined);
      if (next !== maximum.current) {
        maximum.current = next;
        setVisibleProgress(next);
        onProgress(chapter, next, sectionMigrationPending.current);
      }
      if (sectionsChanged) {
        queueLatest();
        schedulePersist();
      }
    };

    const onScroll = () => {
      if (animationFrame.current === null)
        animationFrame.current = window.requestAnimationFrame(measure);
    };
    const onReadingIntent = () => {
      hasReadingInteraction.current = true;
      onScroll();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") persist(true);
    };

    const root = contentRef.current;
    const mutationObserver = root ? new MutationObserver(onScroll) : null;
    mutationObserver?.observe(root!, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state", "aria-selected", "class"],
    });
    const onContentClick = () => {
      measure();
      persist(true);
      hasReadingInteraction.current = false;
    };
    root?.addEventListener("click", onContentClick, true);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onReadingIntent, { passive: true });
    window.addEventListener("touchmove", onReadingIntent, { passive: true });
    window.addEventListener("pointerdown", onReadingIntent, { passive: true });
    window.addEventListener("keydown", onReadingIntent);
    window.addEventListener("resize", onScroll);
    const flushBeforeLeave = () => persist(true);
    window.addEventListener("pagehide", flushBeforeLeave);
    window.addEventListener("beforeunload", flushBeforeLeave);
    window.addEventListener("notes-progress-measure", onScroll);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onReadingIntent);
      window.removeEventListener("touchmove", onReadingIntent);
      window.removeEventListener("pointerdown", onReadingIntent);
      window.removeEventListener("keydown", onReadingIntent);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pagehide", flushBeforeLeave);
      window.removeEventListener("beforeunload", flushBeforeLeave);
      window.removeEventListener("notes-progress-measure", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      mutationObserver?.disconnect();
      root?.removeEventListener("click", onContentClick, true);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
      if (debounceTimer.current !== null) window.clearTimeout(debounceTimer.current);
      persist(true);
    };
  }, [chapter, contentRef, onProgress, scope, userId]);

  return visibleProgress;
}
