import {
  PARENT_EMAIL_CHECKBOX_EN,
  PARENT_EMAIL_CHECKBOX_MS,
  PARENT_EMAIL_NOTICE_EN,
  PARENT_EMAIL_NOTICE_MS,
} from "@/features/parent-report/parentEmailCopy";

export function ParentEmailConsent({
  checked,
  onCheckedChange,
  inputId,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  inputId: string;
}) {
  return (
    <div className="parent-email-consent mt-3 space-y-2 text-sm leading-relaxed text-white/60">
      <p>{PARENT_EMAIL_NOTICE_EN}</p>
      <p lang="ms">{PARENT_EMAIL_NOTICE_MS}</p>
      <label
        htmlFor={inputId}
        className="mt-1 flex items-start gap-3 text-sm font-semibold leading-snug text-white"
      >
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#8B5CF6]"
        />
        <span>
          {PARENT_EMAIL_CHECKBOX_EN}
          <span lang="ms" className="mt-1 block font-medium text-white/55">
            {PARENT_EMAIL_CHECKBOX_MS}
          </span>
        </span>
      </label>
    </div>
  );
}
