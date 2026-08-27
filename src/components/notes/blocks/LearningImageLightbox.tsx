import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

/**
 * Full-view overlay for an instructional image.
 *
 * Notes keep artwork compact so a lesson reads as one flow; this is the escape
 * hatch for the detail a student occasionally needs to inspect. Built on the
 * Radix dialog already in the dependency tree — no gallery library — so focus
 * handling, Escape, scroll locking and the accessible title come for free.
 */
export function LearningImageLightbox({
  open,
  onOpenChange,
  src,
  alt,
  title,
  closeLabel,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  src: string;
  alt: string;
  title: string;
  closeLabel: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-3 focus:outline-none sm:p-6"
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>

          <img
            src={src}
            alt={alt}
            className="max-h-[calc(100vh-5rem)] max-w-full rounded-xl object-contain shadow-2xl"
          />

          <Dialog.Close
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-900/80 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            {closeLabel}
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
