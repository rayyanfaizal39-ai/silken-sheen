import { useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  formatSchoolLocation,
  normalizeSchoolSearchQuery,
  SCHOOL_SEARCH_DEBOUNCE_MS,
  SCHOOL_SEARCH_MIN_CHARACTERS,
  searchSchools,
  type SchoolSearchResult,
} from "@/lib/schools";

interface SchoolComboboxProps {
  value: SchoolSearchResult | null;
  onChange: (school: SchoolSearchResult | null) => void;
  invalid?: boolean;
}

export function SchoolCombobox({ value, onChange, invalid = false }: SchoolComboboxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SchoolSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalized = normalizeSchoolSearchQuery(query);
    if (!normalized || value) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError(null);
      void searchSchools(normalized, controller.signal)
        .then(setResults)
        .catch((cause: unknown) => {
          if (controller.signal.aborted) return;
          console.error("[Onboarding] School search failed", cause);
          setResults([]);
          setError("School search is unavailable. Please try again.");
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, SCHOOL_SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, value]);

  if (value) {
    return (
      <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">{value.schoolName}</p>
            <p className="mt-1 text-sm text-white/60">{formatSchoolLocation(value)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setQuery("");
            }}
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-white/65 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label={`Change school from ${value.schoolName}`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  const normalizedQuery = normalizeSchoolSearchQuery(query);
  const charactersNeeded = Math.max(SCHOOL_SEARCH_MIN_CHARACTERS - query.trim().length, 0);

  return (
    <Command
      shouldFilter={false}
      loop
      className={`overflow-visible rounded-xl border bg-white/[0.05] text-white ${
        invalid ? "border-red-400/60" : "border-white/10"
      }`}
    >
      <div>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search your school..."
          aria-label="Search verified Malaysian schools"
          aria-invalid={invalid}
          className="h-12 border-0 text-base text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400"
        />
      </div>

      <CommandList
        className="max-h-72 border-t border-white/10 bg-[#111827]"
        aria-label="School search results"
      >
        {!normalizedQuery && (
          <p className="px-4 py-4 text-sm text-white/50">
            Type {charactersNeeded} more character{charactersNeeded === 1 ? "" : "s"} to search.
          </p>
        )}

        {normalizedQuery && loading && (
          <div className="flex items-center gap-2 px-4 py-4 text-sm text-white/60" role="status">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Searching verified schools…
          </div>
        )}

        {normalizedQuery && !loading && error && (
          <p className="px-4 py-4 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        {normalizedQuery && !loading && !error && results.length === 0 && (
          <CommandEmpty className="px-4 py-5 text-sm text-white/55">
            No verified schools found.
          </CommandEmpty>
        )}

        {!loading &&
          !error &&
          results.map((school) => (
            <CommandItem
              key={school.id}
              value={school.id}
              onSelect={() => {
                onChange(school);
                setQuery("");
              }}
              className="min-h-14 cursor-pointer items-start rounded-none border-b border-white/[0.06] px-4 py-3 text-white last:border-0 data-[selected=true]:bg-violet-500/20 data-[selected=true]:text-white"
            >
              <span className="min-w-0">
                <span className="block font-semibold leading-5">{school.schoolName}</span>
                <span className="mt-1 block text-sm leading-5 text-white/55">
                  {formatSchoolLocation(school)}
                </span>
              </span>
            </CommandItem>
          ))}
      </CommandList>
    </Command>
  );
}
