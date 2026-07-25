import { useCallback, useEffect, useRef, type MouseEventHandler, type RefObject } from "react";

const PAGINATION_LABEL =
  /^(?:next(?: section)?|previous(?: section)?|back|seterusnya|seksyen seterusnya|sebelumnya|kembali)(?:\s*:.*)?$/i;

export function isNotesPaginationLabel(label: string) {
  const normalized = label
    .replace(/[←→‹›]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return PAGINATION_LABEL.test(normalized);
}

function isPaginationControl(control: HTMLElement) {
  if (control.dataset.notesPaginationControl === "true") return true;

  const label = `${control.getAttribute("aria-label") ?? ""} ${control.textContent ?? ""}`;
  if (isNotesPaginationLabel(label)) return true;

  const strip = control.parentElement;
  return (
    control.tagName === "BUTTON" &&
    !!strip?.classList.contains("overflow-x-auto") &&
    strip.querySelectorAll(":scope > button").length > 1 &&
    !!control.closest("section[id]")
  );
}

function findScrollableAncestor(target: HTMLElement) {
  let parent = target.parentElement;

  while (parent && parent !== document.body && parent !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll|overlay)/.test(overflowY) && parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

function stickyOffset(container: HTMLElement | null) {
  const containerTop = container?.getBoundingClientRect().top ?? 0;
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("header, nav, [data-sticky]"),
  )
    .map((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return { position: style.position, rect };
    })
    .filter(
      ({ position, rect }) =>
        (position === "sticky" || position === "fixed") &&
        rect.height > 0 &&
        rect.width > 0 &&
        rect.bottom > containerTop,
    )
    .sort((a, b) => a.rect.top - b.rect.top);

  let offset = 0;
  for (const { rect } of candidates) {
    const relativeTop = rect.top - containerTop;
    const relativeBottom = rect.bottom - containerTop;
    if (relativeTop <= offset + 8 && relativeBottom > offset) {
      offset = relativeBottom;
    }
  }

  return Math.max(0, offset);
}

function firstVisiblePageHeading(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>("h1, h2, h3")).find((heading) => {
    const rect = heading.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

function scrollToTarget(target: HTMLElement) {
  const container = findScrollableAncestor(target);
  const offset = stickyOffset(container) + 16;
  const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  const targetRect = target.getBoundingClientRect();

  if (container) {
    const containerRect = container.getBoundingClientRect();
    container.scrollTo({
      top: Math.max(0, container.scrollTop + targetRect.top - containerRect.top - offset),
      behavior,
    });
    return;
  }

  window.scrollTo({
    top: Math.max(0, window.scrollY + targetRect.top - offset),
    behavior,
  });
}

export function useNotesPaginationScroll(): {
  notePageTopRef: RefObject<HTMLDivElement | null>;
  onPaginationClickCapture: MouseEventHandler<HTMLDivElement>;
} {
  const notePageTopRef = useRef<HTMLDivElement>(null);
  const firstFrame = useRef<number | null>(null);
  const secondFrame = useRef<number | null>(null);

  const cancelPendingScroll = useCallback(() => {
    if (firstFrame.current !== null) window.cancelAnimationFrame(firstFrame.current);
    if (secondFrame.current !== null) window.cancelAnimationFrame(secondFrame.current);
    firstFrame.current = null;
    secondFrame.current = null;
  }, []);

  useEffect(() => cancelPendingScroll, [cancelPendingScroll]);

  const onPaginationClickCapture = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      const eventTarget = event.target;
      if (!(eventTarget instanceof Element)) return;

      const control = eventTarget.closest<HTMLElement>("button, a");
      if (
        !control ||
        control.matches(":disabled") ||
        control.getAttribute("aria-disabled") === "true" ||
        !isPaginationControl(control)
      ) {
        return;
      }

      const pageRoot = control.closest<HTMLElement>("section[id]");
      cancelPendingScroll();

      firstFrame.current = window.requestAnimationFrame(() => {
        secondFrame.current = window.requestAnimationFrame(() => {
          const target = (pageRoot && firstVisiblePageHeading(pageRoot)) ?? notePageTopRef.current;
          if (target) scrollToTarget(target);
          firstFrame.current = null;
          secondFrame.current = null;
        });
      });
    },
    [cancelPendingScroll],
  );

  return { notePageTopRef, onPaginationClickCapture };
}
