import {
  PARENT_EMAIL_NOTICE_EN,
  PARENT_EMAIL_NOTICE_MS,
} from "@/features/parent-report/parentEmailCopy";

export function ParentEmailNotice() {
  return (
    <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/60">
      <p>{PARENT_EMAIL_NOTICE_EN}</p>
      <p lang="ms">{PARENT_EMAIL_NOTICE_MS}</p>
    </div>
  );
}
