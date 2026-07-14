import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({ label, caption }: { label: string; caption?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-6 py-14 text-center">
      <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
      <p className="font-display text-sm font-semibold text-muted-foreground">{label}</p>
      {caption && <p className="max-w-xs text-xs leading-relaxed text-muted-foreground/70">{caption}</p>}
    </div>
  );
}
