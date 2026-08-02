import { useCallback, useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ReliableImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  alt: string;
  /** Above-the-fold artwork: loads eagerly at high priority, never lazily. */
  priority?: boolean;
  /** Extra classes for the wrapper element (the placeholder/fallback surface). */
  wrapperClassName?: string;
};

const MAX_RETRIES = 2;

/**
 * Image wrapper that never leaves a permanently blank hole.
 *
 * - Keeps a branded papercraft placeholder visible until the bitmap decodes.
 * - Retries the SAME asset path (cache-busted) a couple of times, which covers
 *   the flaky-mobile-network and stale-service-worker cases that made hero
 *   artwork disappear until a hard refresh.
 * - Warns in dev only; production users just see the fallback surface.
 */
export function ReliableImage({
  src,
  alt,
  priority = false,
  className,
  wrapperClassName,
  style,
  onLoad,
  onError,
  ...rest
}: ReliableImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const retryTimer = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setStatus("loading");
    setAttempt(0);
  }, [src]);

  // SSR/bfcache/HTTP-cache case: the bitmap can already be complete before
  // React hydrates, so onLoad never fires. Without this the image would stay
  // behind its placeholder forever.
  useEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) setStatus("loaded");
  }, [attempt, src]);

  useEffect(
    () => () => {
      if (retryTimer.current !== null) window.clearTimeout(retryTimer.current);
    },
    [],
  );

  const handleError = useCallback<NonNullable<ImgHTMLAttributes<HTMLImageElement>["onError"]>>(
    (event) => {
      if (import.meta.env.DEV) console.error("Failed to load image:", src);
      if (attempt < MAX_RETRIES) {
        retryTimer.current = window.setTimeout(
          () => setAttempt((value) => value + 1),
          400 * (attempt + 1),
        );
        return;
      }
      setStatus("error");
      onError?.(event);
    },
    [attempt, onError, src],
  );

  // Retries bypass any poisoned HTTP/service-worker cache entry for this URL
  // while still pointing at the exact same deployed asset path.
  const resolvedSrc = attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`;

  return (
    <span
      className={cn("relative block overflow-hidden", wrapperClassName)}
      data-image-status={status}
    >
      {status !== "loaded" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 z-[1] block bg-[linear-gradient(140deg,#160b3a_0%,#1f1152_45%,#2a1668_100%)]"
          style={{ transition: "opacity 240ms ease-out" }}
        />
      ) : null}
      <img
        {...rest}
        src={resolvedSrc}
        alt={alt}
        ref={imgRef}
        className={className}
        style={style}
        loading={priority ? "eager" : (rest.loading ?? "lazy")}
        fetchPriority={priority ? "high" : rest.fetchPriority}
        decoding="async"
        onLoad={(event) => {
          setStatus("loaded");
          onLoad?.(event);
        }}
        onError={handleError}
      />
    </span>
  );
}
