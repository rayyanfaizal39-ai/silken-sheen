import {
  PARENT_EMAIL_CONSENT_EN,
  PARENT_EMAIL_CONSENT_MS,
} from "@/features/parent-report/parentEmailCopy";

export function ParentEmailConsent({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-white">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#34D399]"
      />
      <span>
        <span className="block">{PARENT_EMAIL_CONSENT_EN}</span>
        <span lang="ms" className="mt-1 block text-white/60">
          {PARENT_EMAIL_CONSENT_MS}
        </span>
      </span>
    </label>
  );
}
