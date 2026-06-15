import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CikguMode, CikguQuizContext } from "@/lib/cikgu-chat.functions";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type CikguConfig = {
  mode?: CikguMode;
  subjectId?: string;
  subjectName?: string;
  chapterKey?: string;
  chapterTitle?: string;
  lang?: "bm" | "en";
  quizContext?: CikguQuizContext;
  // When set, this message is auto-sent to the AI on open
  initialMessage?: string;
};

interface CikguContextValue {
  isOpen: boolean;
  config: CikguConfig | null;
  pendingMessage: string | null;
  openCikgu: (cfg?: CikguConfig) => void;
  closeCikgu: () => void;
  clearPendingMessage: () => void;
}

// ─── Context ────────────────────────────────────────────────────────────────────

const CikguContext = createContext<CikguContextValue>({
  isOpen: false,
  config: null,
  pendingMessage: null,
  openCikgu: () => {},
  closeCikgu: () => {},
  clearPendingMessage: () => {},
});

// ─── Provider ────────────────────────────────────────────────────────────────────

export function CikguProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<CikguConfig | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const openCikgu = useCallback((cfg?: CikguConfig) => {
    if (cfg) {
      setConfig(cfg);
      if (cfg.initialMessage) {
        setPendingMessage(cfg.initialMessage);
      }
    }
    setIsOpen(true);
  }, []);

  const closeCikgu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearPendingMessage = useCallback(() => {
    setPendingMessage(null);
  }, []);

  return (
    <CikguContext.Provider
      value={{ isOpen, config, pendingMessage, openCikgu, closeCikgu, clearPendingMessage }}
    >
      {children}
    </CikguContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────────

export function useCikgu() {
  return useContext(CikguContext);
}
