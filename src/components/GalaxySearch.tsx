import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Brain,
  Clapperboard,
  FileText,
  Layers,
  Map,
  Network,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  buildStudySearchIndex,
  highlightParts,
  searchStudyIndex,
  STUDY_SEARCH_SUGGESTIONS,
  type StudyResourceType,
} from "@/lib/study-search";

const TYPE_STYLES: Record<
  StudyResourceType,
  { Icon: typeof Search; color: string; label: string }
> = {
  Subject: { Icon: Sparkles, color: "#A78BFA", label: "Subject" },
  Form: { Icon: Layers, color: "#38BDF8", label: "Form" },
  Chapter: { Icon: BookOpen, color: "#60A5FA", label: "Chapter" },
  Subtopic: { Icon: Map, color: "#34D399", label: "Subtopic" },
  Notes: { Icon: FileText, color: "#38BDF8", label: "Notes" },
  Quiz: { Icon: Brain, color: "#FBBF24", label: "Quiz" },
  Flashcards: { Icon: Layers, color: "#C084FC", label: "Flashcards" },
  Mindmap: { Icon: Network, color: "#22D3EE", label: "Mindmap" },
  Video: { Icon: Clapperboard, color: "#FB7185", label: "Video" },
};

export function GalaxySearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const index = useMemo(() => buildStudySearchIndex(), []);
  const results = useMemo(() => searchStudyIndex(index, query, 14), [index, query]);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onOpenSearch() {
      setOpen(true);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("academy:open-search", onOpenSearch);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("academy:open-search", onOpenSearch);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full max-w-2xl">
      <label className="relative block">
        <span className="sr-only">Search AcadeMy</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/36" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search notes, quizzes, chapters..."
          className="h-11 w-full rounded-2xl border border-white/[0.09] bg-white/[0.055] pl-10 pr-10 text-sm font-semibold text-white placeholder:text-white/34 shadow-[0_16px_48px_rgba(2,6,23,0.22)] outline-none backdrop-blur-2xl transition-all focus:border-cyan-300/35 focus:bg-white/[0.075] focus:shadow-[0_18px_58px_rgba(34,211,238,0.12)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(true);
            }}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-xl text-white/42 transition-colors hover:bg-white/[0.08] hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </label>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-[90] overflow-hidden rounded-[1.5rem] border border-white/[0.10] bg-[#081020]/96 shadow-[0_28px_90px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
          <div className="border-b border-white/[0.06] bg-white/[0.035] px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200/60">
              Galaxy Search
            </p>
            {!hasQuery && (
              <p className="mt-1 text-xs text-white/42">
                Try searching: {STUDY_SEARCH_SUGGESTIONS.join(", ")}
              </p>
            )}
          </div>

          {!hasQuery ? (
            <div className="flex flex-wrap gap-2 p-4">
              {STUDY_SEARCH_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    setOpen(true);
                  }}
                  className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-white/62 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="p-5 text-sm font-semibold text-white/58">
              No results found. Try another keyword or subject.
            </div>
          ) : (
            <div className="max-h-[min(70vh,520px)] overflow-y-auto p-2">
              {results.map((result) => (
                <SearchResultLink
                  key={result.id}
                  query={query}
                  result={result}
                  onOpen={() => setOpen(false)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchResultLink({
  result,
  query,
  onOpen,
}: {
  result: ReturnType<typeof searchStudyIndex>[number];
  query: string;
  onOpen: () => void;
}) {
  const style = TYPE_STYLES[result.type];
  const Icon = style.Icon;

  return (
    <a
      href={result.href}
      onClick={onOpen}
      className="group flex gap-3 rounded-[1.2rem] px-3 py-3 transition-colors hover:bg-white/[0.06]"
    >
      <span
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05]"
        style={{ color: style.color, boxShadow: `0 0 18px ${style.color}22` }}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-black text-white">
            <HighlightedText text={result.title} query={query} />
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide"
            style={{ color: style.color, background: `${style.color}18` }}
          >
            {style.label}
          </span>
        </span>
        <span className="mt-1 block text-xs font-semibold text-white/44">
          {result.subject} • {result.form}
          {result.chapter ? ` • ${result.chapter}` : ""}
        </span>
        {result.preview && (
          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/56">
            <HighlightedText text={result.preview} query={query} />
          </span>
        )}
      </span>
    </a>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightParts(text, query).map((part, index) =>
        part.match ? (
          <mark
            key={`${part.text}-${index}`}
            className="rounded bg-cyan-300/18 px-0.5 text-cyan-100"
          >
            {part.text}
          </mark>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </>
  );
}
