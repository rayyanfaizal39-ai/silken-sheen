import { useEffect, useState } from "react";
import { GitFork, Network } from "lucide-react";
import { MindMap, type MindNode } from "@/components/MindMap";

function readStoredOpen(key: string) {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(key) === "open";
}

function storeOpenState(key: string, open: boolean) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key, open ? "open" : "closed");
}

export function MindMapBlock({
  data,
  title,
  id,
  storageKey,
}: {
  data: MindNode;
  title: string;
  id?: string;
  storageKey?: string;
}) {
  const stateKey = storageKey ?? `notes:mind-map:${id ?? title}`;
  const [isOpen, setIsOpen] = useState(() => readStoredOpen(stateKey));

  // Re-sync when navigating between chapters: this component may not remount,
  // so the lazy initial state above would otherwise carry over the previous
  // chapter's open/closed state.
  useEffect(() => {
    setIsOpen(readStoredOpen(stateKey));
  }, [stateKey]);

  function openMindMap() {
    setIsOpen(true);
    storeOpenState(stateKey, true);
  }

  if (!isOpen) {
    return (
      <div id={id} className="mb-5 animate-fade-up scroll-mt-24 sm:mb-6">
        <button
          type="button"
          onClick={openMindMap}
          className="academy-surface group w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/70 p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#101827]/84 hover:shadow-[0_24px_80px_rgba(14,165,233,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_34px_rgba(34,211,238,0.16)] transition-transform duration-300 group-hover:scale-105">
                <Network className="h-6 w-6 text-cyan-200" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200/60">
                  Visual learning
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-white">
                  Interactive Mind Map
                </h2>
                <p className="mt-1 text-sm leading-6 text-white/55">
                  Visualise this chapter with an interactive mind map.
                </p>
              </div>
            </div>
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(14,165,233,0.22)] transition-transform duration-300 group-hover:scale-105">
              <GitFork className="h-4 w-4" />
              Open Mind Map
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div id={id} className="mb-8 animate-fade-up scroll-mt-24">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="font-display text-2xl font-bold">
          Interactive <span className="gradient-text">Mind Maps</span>
        </h2>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs font-bold text-[#94A3B8]">
          Visual learning made easy
        </span>
      </div>
      <div className="academy-surface rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-muted-foreground">
            Tap a node to expand • Pinch or scroll to zoom • Drag to pan • Use Prev/Next to step through
          </p>
        </div>
        <MindMap data={data} height={640} />
      </div>
    </div>
  );
}
