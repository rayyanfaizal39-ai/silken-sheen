import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/context/auth-context";

export function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open && user) onClose();
  }, [onClose, open, user]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      cardRef.current?.querySelector<HTMLElement>("input, button, a[href]")?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        cardRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]',
        ) ?? [],
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
    >
      <button
        type="button"
        aria-label="Close sign-in"
        onClick={onClose}
        className="absolute inset-0 bg-[#020410]/95"
      />
      <div
        ref={cardRef}
        className="relative my-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-[#080E1C] p-5 text-white shadow-[0_32px_90px_rgba(0,0,0,0.65)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
          aria-label="Close sign-in"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <AcademyLogo className="h-auto w-[156px]" />
        <h2 id="signin-modal-title" className="mt-6 font-display text-2xl font-black">
          Welcome Back to AcadeMY
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Log in to sync your progress and continue learning.
        </p>
        <div className="mt-6">
          <AuthForm mode="signin" onSuccess={onClose} onNavigateAway={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
