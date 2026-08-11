import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { CreditCard, ShieldCheck, X } from "lucide-react";
import type { AuthUser } from "@/context/auth-context";
import type { ExplorerProfile } from "@/lib/explorer-profile";

interface ProfileSummaryDialogProps {
  open: boolean;
  user: AuthUser;
  profile: ExplorerProfile | null;
  onClose: () => void;
}

export function ProfileSummaryDialog({ open, user, profile, onClose }: ProfileSummaryDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  if (!open) return null;

  const displayName = profile?.displayName || user.name || "Student Explorer";

  return (
    <div
      className="fixed inset-0 z-[110] grid place-items-center bg-[#02040D]/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-summary-title"
        className="w-full max-w-sm rounded-[1.75rem] border border-violet-300/20 bg-[#0B1025] p-5 text-white shadow-[0_26px_90px_rgba(0,0,0,0.6)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="h-12 w-12 shrink-0 rounded-2xl object-cover ring-1 ring-violet-300/25"
              />
            ) : (
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-base font-black">
                {displayName[0]?.toUpperCase() ?? "E"}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-300/70">
                Explorer Profile
              </p>
              <h2
                id="profile-summary-title"
                className="mt-1 truncate font-display text-xl font-bold"
              >
                {displayName}
              </h2>
              <p className="mt-0.5 truncate text-xs text-white/45">{user.email}</p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close profile summary"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Level
            </span>
            <strong className="mt-1 block text-sm">{profile?.formLevel ?? "Not set"}</strong>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Age
            </span>
            <strong className="mt-1 block text-sm">{profile?.age ?? "Not set"}</strong>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-2 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-3 text-sm text-emerald-100/80">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          {profile?.schoolId ? "Verified school connected" : "Explorer profile"}
        </div>

        <Link
          to="/account/billing"
          onClick={onClose}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-violet-300/15 bg-violet-500/10 px-4 text-sm font-bold text-violet-100 transition-colors hover:bg-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          <CreditCard className="h-4 w-4" aria-hidden="true" />
          Account &amp; Billing
        </Link>
      </section>
    </div>
  );
}
