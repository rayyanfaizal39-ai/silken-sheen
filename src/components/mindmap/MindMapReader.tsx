import { forwardRef, useEffect, useRef } from "react";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MindNode } from "./tree";
import type { MindMapStrings } from "./theme";

// Contextual reading view for the selected topic. It opens on demand, never
// as a permanent drawer, and the camera keeps the selected card clear of it.

export type ReaderCrumb = { id: string; label: string };

export const MindMapReader = forwardRef<
  HTMLDivElement,
  {
    node: MindNode;
    accent: string;
    crumbs: ReaderCrumb[];
    position: { index: number; total: number };
    variant: "side" | "sheet";
    strings: MindMapStrings;
    canPrevious: boolean;
    canNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSelect: (id: string) => void;
    onClose: () => void;
  }
>(function MindMapReader(
  {
    node,
    accent,
    crumbs,
    position,
    variant,
    strings,
    canPrevious,
    canNext,
    onPrevious,
    onNext,
    onSelect,
    onClose,
  },
  ref,
) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const summary = node.summary?.trim();

  // Each topic starts reading from the top.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [node.id]);

  const frame =
    variant === "side"
      ? "absolute right-4 top-4 max-h-[calc(100%-var(--mm-dock-h)-2.75rem)] w-[min(420px,38vw)] rounded-3xl"
      : "absolute inset-x-2 bottom-[calc(var(--mm-dock-h)+0.75rem)] max-h-[52%] rounded-3xl";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby="mm-reader-title"
      className={`${frame} z-30 flex flex-col overflow-hidden border border-white/10 bg-[#0A1230]/96 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl`}
      onPointerDown={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
    >
      <div
        className="h-1 w-full flex-none"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        aria-hidden="true"
      />
      <div className="flex flex-none items-center justify-between gap-2 px-5 pb-2 pt-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E9B949]/85">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          {strings.position(position.index, position.total)}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={strings.closeReader}
          className="mm-control -mr-2 h-11 w-11 border-transparent bg-transparent"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-sm">
            {crumbs.map((crumb, index) => (
              <span key={crumb.id} className="inline-flex min-w-0 items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true" />
                )}
                <button
                  type="button"
                  onClick={() => onSelect(crumb.id)}
                  className="max-w-[16rem] truncate rounded-md px-1 py-0.5 text-left font-medium text-[#9FB0D6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                >
                  {crumb.label}
                </button>
              </span>
            ))}
          </nav>
        )}
        <h2
          id="mm-reader-title"
          className="break-words font-display text-[22px] font-bold leading-[1.3] text-white sm:text-2xl"
        >
          {node.label}
        </h2>
        {summary && (
          <p className="mt-3 whitespace-pre-line break-words text-base leading-7 text-[#C9D3EA] sm:text-[17px]">
            {summary}
          </p>
        )}

        {node.children?.length ? (
          <div className="mt-6">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
              {strings.inThisTopic}
            </p>
            <ul className="space-y-2">
              {node.children.map((child) => (
                <li key={child.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(child.id)}
                    className="group flex min-h-12 w-full items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-cyan-300/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    <span
                      className="mt-2 h-2 w-2 flex-none rounded-full"
                      style={{ background: accent }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block break-words text-base font-semibold leading-6 text-white/90">
                        {child.label}
                      </span>
                      {child.children?.length ? (
                        <span className="mt-0.5 block text-sm text-white/45">
                          {strings.subtopics(child.children.length)}
                        </span>
                      ) : null}
                    </span>
                    <ChevronRight
                      className="mt-1 h-4 w-4 flex-none text-white/35 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex flex-none items-center justify-between gap-2 border-t border-white/[0.07] px-3 py-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className="mm-control border-transparent bg-transparent px-3 text-sm font-semibold"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {strings.previous}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="mm-control border-transparent bg-transparent px-3 text-sm font-semibold"
        >
          {strings.next}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});
