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
            className="group h-[150px] w-full text-left"
            aria-pressed={isFlipped}
          >
            <div className="flashcard-scene flashcard-notes-scene">
              <div className={`flashcard-inner${isFlipped ? " is-flipped" : ""}`}>
              <div className="flashcard-face flashcard-front overflow-hidden rounded-2xl border border-border bg-secondary/40">
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
                className="flashcard-face flashcard-back flex items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/35 to-accent/25 p-3.5 text-center text-xs leading-relaxed text-white"
              >
                {item.fact}
              </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
