import { useEffect, useState, useCallback } from "react";

export type ScienceLang = "bm" | "dlp";

const KEY = "science-lang";

function read(): ScienceLang | null {
  if (typeof window === "undefined") return null;
  const v = window.sessionStorage.getItem(KEY);
  return v === "bm" || v === "dlp" ? v : null;
}

export function useScienceLang() {
  const [lang, setLangState] = useState<ScienceLang | null>(null);

  useEffect(() => {
    setLangState(read());
  }, []);

  const setLang = useCallback((next: ScienceLang | null) => {
    if (typeof window !== "undefined") {
      if (next) window.sessionStorage.setItem(KEY, next);
      else window.sessionStorage.removeItem(KEY);
    }
    setLangState(next);
  }, []);

  return { lang, setLang };
}
