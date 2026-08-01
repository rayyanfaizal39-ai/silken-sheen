import { useState } from "react";

type BloodGroup = "A" | "B" | "AB" | "O";

const GROUPS: BloodGroup[] = ["A", "B", "AB", "O"];

const ANTIGENS: Record<BloodGroup, string[]> = {
  A: ["A"],
  B: ["B"],
  AB: ["A", "B"],
  O: [],
};

const ANTIBODIES: Record<BloodGroup, string[]> = {
  A: ["Anti-B"],
  B: ["Anti-A"],
  AB: [],
  O: ["Anti-A", "Anti-B"],
};

function checkCompatible(donor: BloodGroup, recipient: BloodGroup) {
  const donorAntigens = ANTIGENS[donor];
  const recipientAntibodies = ANTIBODIES[recipient];
  return !donorAntigens.some((antigen) => recipientAntibodies.includes(`Anti-${antigen}`));
}

export function BloodTypeChecker({ lang }: { lang: "en" | "bm" }) {
  const bm = lang === "bm";
  const [donor, setDonor] = useState<BloodGroup>("O");
  const [recipient, setRecipient] = useState<BloodGroup>("AB");

  const compatible = checkCompatible(donor, recipient);
  const recipientAntibodies = ANTIBODIES[recipient];

  const message = compatible
    ? bm
      ? `✓ Serasi — Jenis ${donor} boleh menderma dengan selamat kepada Jenis ${recipient}.`
      : `✓ Compatible — Type ${donor} can safely donate to Type ${recipient}.`
    : bm
      ? `✗ TIDAK serasi — ${recipientAntibodies.join(" & ")} pada Jenis ${recipient} akan menyerang antigen Jenis ${donor}, menyebabkan darah menggumpal.`
      : `✗ NOT compatible — Type ${recipient}'s ${recipientAntibodies.join(" & ")} would attack Type ${donor}'s antigens, causing coagulation.`;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {bm ? "Penderma" : "Donor"}
          </label>
          <select
            value={donor}
            onChange={(e) => setDonor(e.target.value as BloodGroup)}
            className="min-h-11 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {bm ? "Penerima" : "Recipient"}
          </label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value as BloodGroup)}
            className="min-h-11 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        aria-live="polite"
        className={`mt-3 rounded-xl border px-4 py-3 text-[13.5px] font-semibold leading-relaxed ${
          compatible
            ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
            : "border-red-400 bg-red-500/15 text-red-200"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
