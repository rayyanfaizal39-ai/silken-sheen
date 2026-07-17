import type { VideoBlock as VideoBlockData } from "@/content/types";

export function VideoBlock({ video, id }: { video: VideoBlockData; id?: string }) {
  const params = new URLSearchParams({
    cc_load_policy: "1",
    rel: "0",
    modestbranding: "1",
  });

  if (video.captionLang) params.set("cc_lang_pref", video.captionLang);
  if (video.startSeconds) params.set("start", String(video.startSeconds));

  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params.toString()}`;
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
