import type { VideoBlock as VideoBlockData } from "@/content/types";

export function VideoBlock({ video, id }: { video: VideoBlockData; id?: string }) {
  const src = `https://www.youtube.com/embed/${video.youtubeId}?cc_load_policy=1${
    video.captionLang ? `&cc_lang_pref=${video.captionLang}` : ""
  }&rel=0&modestbranding=1`;
  return (
    <div id={id} className="mb-8 animate-fade-up scroll-mt-24">
      <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
        <span className="gradient-text">Video Pembelajaran</span> 🎬
      </h2>
      <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={src}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      {video.hint && (
        <p className="mt-3 text-sm text-muted-foreground text-center">{video.hint}</p>
      )}
    </div>
  );
}
