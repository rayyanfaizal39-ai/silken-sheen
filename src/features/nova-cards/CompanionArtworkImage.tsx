import { useEffect, useRef, useState } from "react";

type Status = "empty" | "loading" | "ready" | "failed";

const LOAD_WATCHDOG_MS = 15_000;

function imageIsDecoded(img: HTMLImageElement | null): boolean {
  return Boolean(img && img.complete && img.naturalWidth > 0);
}

function imageFailedDecode(img: HTMLImageElement | null): boolean {
  return Boolean(img && img.complete && img.naturalWidth === 0);
}

/**
 * Loads a companion portrait with a stable placeholder. Never swaps in a fictional demo image.
 * When a portrait URL expires or fails, asks the parent for a fresh address once, then offers Retry.
 *
 * Cached / already-complete images must be detected via `img.complete` — React's `onLoad` does not
 * fire if the browser finished decoding before the handler attached (common on public `/art` URLs).
 */
export function CompanionArtworkImage({
  src,
  alt,
  width,
  height,
  className = "nova-art",
  companionLabel,
  onRefresh,
}: {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  companionLabel?: string;
  onRefresh?: () => Promise<string | null | undefined>;
}) {
  const [displaySrc, setDisplaySrc] = useState(src ?? null);
  const [status, setStatus] = useState<Status>(src ? "loading" : "empty");
  const [retrying, setRetrying] = useState(false);
  const refreshUsed = useRef(false);
  const requestId = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    refreshUsed.current = false;
    requestId.current += 1;
    setDisplaySrc(src ?? null);
    setStatus(src ? "loading" : "empty");
    setRetrying(false);
  }, [src]);

  // Sync status when the browser already has the bytes (cache / fast same-origin /art).
  // `onLoad` is skipped when decode finished before the handler attached.
  useEffect(() => {
    if (!displaySrc) return;
    let cancelled = false;
    const sync = () => {
      if (cancelled) return;
      const img = imgRef.current;
      if (imageIsDecoded(img)) setStatus("ready");
      else if (imageFailedDecode(img)) setStatus("failed");
    };
    sync();
    const raf = window.requestAnimationFrame(sync);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [displaySrc]);

  // Never leave visitors on an infinite "Loading portrait…" spinner.
  useEffect(() => {
    if (status !== "loading" || !displaySrc) return;
    const timer = window.setTimeout(() => {
      const img = imgRef.current;
      if (imageIsDecoded(img)) {
        setStatus("ready");
        return;
      }
      setStatus("failed");
    }, LOAD_WATCHDOG_MS);
    return () => window.clearTimeout(timer);
  }, [status, displaySrc]);

  async function refresh(force = false) {
    if (!force && refreshUsed.current) return null;
    refreshUsed.current = true;
    const id = ++requestId.current;
    setRetrying(true);
    setStatus("loading");
    try {
      if (onRefresh) {
        const next = await onRefresh();
        if (id !== requestId.current) return next ?? null;
        if (next) {
          setDisplaySrc(next);
          setStatus("loading");
          return next;
        }
        setStatus("failed");
        return null;
      }
      // Same-origin public /art: force a reload when no parent refresh hook exists.
      const current = displaySrc;
      if (!current) {
        setStatus("failed");
        return null;
      }
      const separator = current.includes("?") ? "&" : "?";
      const next = `${current.split("?")[0]}${separator}retry=${Date.now()}`;
      if (id !== requestId.current) return null;
      setDisplaySrc(next);
      setStatus("loading");
      return next;
    } catch {
      if (id === requestId.current) setStatus("failed");
      return null;
    } finally {
      if (id === requestId.current) setRetrying(false);
    }
  }

  if (!displaySrc) {
    return (
      <div className="nova-art-placeholder" role="status" data-artwork-status="empty">
        <span aria-hidden="true">✦</span>
        <strong>{companionLabel ? `${companionLabel}` : "Portrait"}</strong>
        <p>Your portrait will appear here</p>
      </div>
    );
  }

  return (
    <div className="nova-art-slot" data-artwork-status={status}>
      {status !== "ready" ? (
        <div className="nova-art-placeholder" role="status" aria-live="polite">
          <span aria-hidden="true">✦</span>
          <strong>{status === "failed" ? "Portrait could not load" : "Loading portrait…"}</strong>
          <p>{companionLabel ?? "Your Cosmic Companion"}</p>
          {status === "failed" ? (
            <button
              type="button"
              className="nova-art-retry"
              disabled={retrying}
              onClick={() => {
                refreshUsed.current = false;
                void refresh(true);
              }}
            >
              {retrying ? "Retrying…" : "Retry"}
            </button>
          ) : null}
        </div>
      ) : null}
      <img
        ref={imgRef}
        className={className}
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        hidden={status !== "ready"}
        onLoad={(event) => {
          if (event.currentTarget.naturalWidth > 0) setStatus("ready");
          else setStatus("failed");
        }}
        onError={() => {
          void (async () => {
            if (onRefresh) {
              const next = await refresh();
              if (!next) setStatus("failed");
              return;
            }
            // Public /art has no signed-URL refresh — surface Retry instead of spinning forever.
            setStatus("failed");
          })();
        }}
      />
    </div>
  );
}
