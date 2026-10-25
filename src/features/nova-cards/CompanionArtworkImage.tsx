import { useEffect, useRef, useState } from "react";

type Status = "empty" | "loading" | "ready" | "failed";

/**
 * Loads a companion portrait with a stable placeholder. Never swaps in a fictional demo image.
 * When a signed URL expires or fails, asks the parent for a fresh URL once, then offers Retry.
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

  useEffect(() => {
    refreshUsed.current = false;
    requestId.current += 1;
    setDisplaySrc(src ?? null);
    setStatus(src ? "loading" : "empty");
    setRetrying(false);
  }, [src]);

  async function refresh(force = false) {
    if (!onRefresh) return null;
    if (!force && refreshUsed.current) return null;
    refreshUsed.current = true;
    const id = ++requestId.current;
    setRetrying(true);
    setStatus("loading");
    try {
      const next = await onRefresh();
      if (id !== requestId.current) return next ?? null;
      if (next) {
        setDisplaySrc(next);
        setStatus("loading");
        return next;
      }
      setStatus("failed");
      return null;
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
              disabled={retrying || !onRefresh}
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
        className={className}
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        hidden={status !== "ready"}
        onLoad={() => setStatus("ready")}
        onError={() => {
          void (async () => {
            const next = await refresh();
            if (!next) setStatus("failed");
          })();
        }}
      />
    </div>
  );
}
