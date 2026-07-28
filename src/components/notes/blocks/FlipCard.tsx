import { useState } from "react";
import type { FlipCardItem } from "@/content/form2/science/chapter-1/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";

export function FlipCardGrid({
  items,
  onFlip,
}: {
  items: FlipCardItem[];
  onFlip?: (id: string) => void;
}) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    onFlip?.(id);
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      {items.map((item) => {
        const isFlipped = !!flipped[item.id];
        const imageUrl = item.imagePath ? getNotesImageUrl(item.imagePath) : "";
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggle(item.id)}
            className="group h-[150px] text-left [perspective:1000px]"
            aria-pressed={isFlipped}
          >
            <div
              className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
              style={{ transform: isFlipped ? "rotateY(180deg)" : undefined }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-secondary/40 [backface-visibility:hidden]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.label}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">{item.icon}</div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 pb-2.5 pt-6 text-center">
                  <span className="font-display text-[13px] font-semibold text-white">{item.label}</span>
                </div>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/35 to-accent/25 p-3.5 text-center text-xs leading-relaxed text-white [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              >
                {item.fact}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
