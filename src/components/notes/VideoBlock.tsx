import { useEffect, useRef } from "react";

import type { VideoBlock as VideoBlockData } from "@/content/types";
import { useBackgroundMusic } from "@/hooks/use-background-music";

export function VideoBlock({ video, id }: { video: VideoBlockData; id?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoPlayingRef = useRef(false);
  const { pauseForMedia, resumeAfterMedia } = useBackgroundMusic();
  const params = new URLSearchParams({
    cc_load_policy: "1",
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
  });

  if (video.captionLang) params.set("cc_lang_pref", video.captionLang);
  if (video.startSeconds) params.set("start", String(video.startSeconds));

  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params.toString()}`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendCommand = (message: object) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify(message),
        "https://www.youtube-nocookie.com",
      );
    };
    const registerPlayerEvents = () => {
      sendCommand({ event: "listening", id: video.youtubeId });
      sendCommand({ event: "command", func: "addEventListener", args: ["onStateChange"] });
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube-nocookie.com") return;
      if (event.source !== iframe.contentWindow) return;

      let payload: { event?: string; info?: number };
      try {
        payload = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (payload?.event !== "onStateChange") return;

      if (payload.info === 1 && !videoPlayingRef.current) {
        videoPlayingRef.current = true;
        pauseForMedia();
      } else if (
        (payload.info === 0 || payload.info === 2 || payload.info === 5) &&
        videoPlayingRef.current
      ) {
        videoPlayingRef.current = false;
        void resumeAfterMedia();
      }
    };

    iframe.addEventListener("load", registerPlayerEvents);
    window.addEventListener("message", onMessage);
    registerPlayerEvents();
    return () => {
      iframe.removeEventListener("load", registerPlayerEvents);
      window.removeEventListener("message", onMessage);
      if (videoPlayingRef.current) {
        videoPlayingRef.current = false;
        void resumeAfterMedia();
      }
    };
  }, [pauseForMedia, resumeAfterMedia, video.youtubeId]);

  return (
    <div id={id} className="mb-8 animate-fade-up scroll-mt-24">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold">
          Educational <span className="gradient-text">Videos</span>
        </h2>
        <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#94A3B8] sm:inline-flex">
          Watch and Learn
        </span>
      </div>
      <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
        <div className="relative aspect-video">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full rounded-[1.5rem]"
            src={src}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      {video.hint && <p className="mt-3 text-sm text-muted-foreground text-center">{video.hint}</p>}
    </div>
  );
}
