import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Crosshair,
  List,
  Map as MapIcon,
  Maximize,
  Minus,
  MoreHorizontal,
  Network,
  Plus,
  RotateCcw,
} from "lucide-react";
import type { MindMapStrings } from "./theme";

export type MindMapTopicLink = { label: string; onSelect: () => void };

export type MindMapHeader = {
  chapter: string;
  subject?: string;
  subjectEmoji?: string;
  form?: string;
  category?: string;
  backLabel?: string;
  onBack: () => void;
  /** Sequential chapter/topic navigation owned by the page. */
  topicNav?: { previous?: MindMapTopicLink; next?: MindMapTopicLink };
};

export type MindMapMode = "explore" | "focus";
export type MindMapView = "map" | "outline";

type TopBarProps = {
  header: MindMapHeader;
  accent: string;
  compact: boolean;
  strings: MindMapStrings;
  mode: MindMapMode;
  view: MindMapView;
  showMinimap: boolean;
  onModeChange: (mode: MindMapMode) => void;
  onViewChange: (view: MindMapView) => void;
  onFit: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onToggleMinimap: () => void;
};

function MenuItem({
  icon,
  label,
  onSelect,
  disabled,
  pressed,
}: {
  icon: ReactNode;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onSelect}
      className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium text-white/85 hover:bg-white/[0.07] focus-visible:bg-white/[0.08] focus-visible:outline-none disabled:opacity-40"
    >
      <span className="flex h-5 w-5 items-center justify-center text-white/60" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {pressed && <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />}
    </button>
  );
}

export function MindMapTopBar({
  header,
  accent,
  compact,
  strings,
  mode,
  view,
  showMinimap,
  onModeChange,
  onViewChange,
  onFit,
  onReset,
  onZoomIn,
  onZoomOut,
  onExpandAll,
  onCollapseAll,
  onToggleMinimap,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const meta = [header.subject, header.form, header.category].filter(Boolean).join(" · ");
  const { previous, next } = header.topicNav ?? {};
  const isMap = view === "map";

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", onKey, true);
    menuRef.current?.querySelector<HTMLButtonElement>("[role=menuitem]:not(:disabled)")?.focus();
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [menuOpen]);

  const run = (action: () => void) => () => {
    setMenuOpen(false);
    action();
  };

  const modeToggle = (
    <div
      role="group"
      aria-label={`${strings.explore} / ${strings.focus}`}
      className="flex flex-none items-center rounded-2xl border border-white/10 bg-white/[0.04] p-1"
    >
      {(["explore", "focus"] as const).map((value) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            disabled={!isMap}
            onClick={() => onModeChange(value)}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 disabled:opacity-40 ${
              active
                ? "bg-[linear-gradient(135deg,#3B5BDB,#5B3FD0)] text-white shadow-[0_6px_18px_-8px_rgba(91,63,208,0.9)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            {value === "explore" ? (
              <Network className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Crosshair className="h-4 w-4" aria-hidden="true" />
            )}
            {value === "explore" ? strings.explore : strings.focus}
          </button>
        );
      })}
    </div>
  );

  return (
    <header className="relative z-40 flex-none border-b border-white/[0.06] bg-[#070D20]/94 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="flex h-[60px] items-center gap-2 pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] sm:h-16 sm:gap-3 sm:px-4">
        <button
          type="button"
          onClick={header.onBack}
          aria-label={header.backLabel ?? strings.backToChapters}
          className="mm-control flex-none px-3 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {!compact && <span>{strings.back}</span>}
        </button>

        <div className="min-w-0 flex-1">
          {meta && (
            <p className="flex min-w-0 items-center gap-1.5 truncate text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-xs">
              {header.subjectEmoji && <span aria-hidden="true">{header.subjectEmoji}</span>}
              <span className="truncate" style={{ color: accent }}>
                {header.subject}
              </span>
              {meta !== header.subject && (
                <span className="truncate">
                  {[header.form, header.category].filter(Boolean).join(" · ")}
                </span>
              )}
            </p>
          )}
          <h1 className="truncate font-display text-base font-bold leading-6 text-white sm:text-lg">
            {header.chapter}
          </h1>
        </div>

        {!compact && (previous || next) && (
          <div className="flex flex-none items-center gap-1">
            <button
              type="button"
              disabled={!previous}
              onClick={previous?.onSelect}
              aria-label={
                previous ? `${strings.previousTopic}: ${previous.label}` : strings.previousTopic
              }
              title={previous?.label}
              className="mm-control"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={!next}
              onClick={next?.onSelect}
              aria-label={next ? `${strings.nextTopic}: ${next.label}` : strings.nextTopic}
              title={next?.label}
              className="mm-control"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {compact ? (
          <>
            <button
              type="button"
              aria-pressed={mode === "focus"}
              disabled={!isMap}
              onClick={() => onModeChange(mode === "focus" ? "explore" : "focus")}
              aria-label={strings.focus}
              className="mm-control flex-none"
            >
              <Crosshair className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={!isMap}
              onClick={onFit}
              aria-label={strings.fit}
              className="mm-control flex-none"
            >
              <Maximize className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={strings.more}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="mm-control flex-none"
            >
              <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            {modeToggle}
            <div className="flex flex-none items-center gap-1.5">
              <button
                type="button"
                disabled={!isMap}
                onClick={onFit}
                className="mm-control px-3 text-sm font-semibold"
              >
                <Maximize className="h-4 w-4" aria-hidden="true" />
                <span className="hidden lg:inline">{strings.fit}</span>
                <span className="sr-only lg:hidden">{strings.fit}</span>
              </button>
              <button
                type="button"
                disabled={!isMap}
                onClick={onReset}
                className="mm-control px-3 text-sm font-semibold"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span className="hidden lg:inline">{strings.reset}</span>
                <span className="sr-only lg:hidden">{strings.reset}</span>
              </button>
              <button
                type="button"
                aria-pressed={view === "outline"}
                onClick={() => onViewChange(isMap ? "outline" : "map")}
                aria-label={isMap ? strings.outlineView : strings.mapView}
                title={isMap ? strings.outlineView : strings.mapView}
                className="mm-control"
              >
                {isMap ? (
                  <List className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <MapIcon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {compact && menuOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={strings.more}
          className="absolute right-2 top-[calc(100%+0.5rem)] w-[min(18rem,calc(100vw-1rem))] rounded-2xl border border-white/10 bg-[#0A1230]/98 p-1.5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          <MenuItem
            icon={isMap ? <List className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
            label={isMap ? strings.outlineView : strings.mapView}
            onSelect={run(() => onViewChange(isMap ? "outline" : "map"))}
          />
          <MenuItem
            icon={<RotateCcw className="h-4 w-4" />}
            label={strings.reset}
            disabled={!isMap}
            onSelect={run(onReset)}
          />
          <MenuItem
            icon={<Plus className="h-4 w-4" />}
            label={strings.zoomIn}
            disabled={!isMap}
            onSelect={run(onZoomIn)}
          />
          <MenuItem
            icon={<Minus className="h-4 w-4" />}
            label={strings.zoomOut}
            disabled={!isMap}
            onSelect={run(onZoomOut)}
          />
          <div className="my-1 h-px bg-white/[0.07]" />
          <MenuItem
            icon={<ChevronsUpDown className="h-4 w-4" />}
            label={strings.expandAll}
            onSelect={run(onExpandAll)}
          />
          <MenuItem
            icon={<ChevronsDownUp className="h-4 w-4" />}
            label={strings.collapseAll}
            onSelect={run(onCollapseAll)}
          />
          <MenuItem
            icon={<MapIcon className="h-4 w-4" />}
            label={showMinimap ? strings.hideMinimap : strings.showMinimap}
            pressed={showMinimap}
            disabled={!isMap}
            onSelect={run(onToggleMinimap)}
          />
          {(previous || next) && <div className="my-1 h-px bg-white/[0.07]" />}
          {previous && (
            <MenuItem
              icon={<ChevronLeft className="h-4 w-4" />}
              label={`${strings.previousTopic}: ${previous.label}`}
              onSelect={run(previous.onSelect)}
            />
          )}
          {next && (
            <MenuItem
              icon={<ChevronRight className="h-4 w-4" />}
              label={`${strings.nextTopic}: ${next.label}`}
              onSelect={run(next.onSelect)}
            />
          )}
        </div>
      )}
    </header>
  );
}
