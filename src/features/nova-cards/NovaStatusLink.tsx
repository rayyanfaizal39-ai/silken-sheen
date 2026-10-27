import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { loadNovaDashboardStatus } from "./local-session";
import { ARRIVED } from "./studio-model";
import { cardsIntegrationEnabled } from "@/lib/cards-integration";
export function NovaStatusLink() {
  const { user } = useAuth();
  const userId = user?.id;
  const [text, setText] = useState("Discover your companion in Nova Studio.");
  useEffect(() => {
    setText("Discover your companion in Nova Studio.");
    if (!userId) return;
    let active = true;
    const update = () =>
      loadNovaDashboardStatus()
        .then((s) => {
          if (active)
            setText(
              s.ready && !s.selected
                ? ARRIVED
                : s.failed
                  ? "Your Nova is taking a little longer. Check its status."
                  : s.pending
                    ? "Your Nova is awakening. Check its arrival."
                    : s.selected
                      ? "Your permanent Nova is saved. Visit your collection."
                      : "Discover your companion in Nova Studio.",
            );
        })
        .catch(() => {});
    void update();
    const onFocus = () => void update();
    window.addEventListener("focus", onFocus);
    return () => {
      active = false;
      window.removeEventListener("focus", onFocus);
    };
  }, [userId]);
  return (
    <a
      // With AcadeMY Cards enabled the portal is the single entrance to the Studio.
      href={cardsIntegrationEnabled ? "/companion" : "/nova/studio"}
      className="mb-4 flex items-center gap-4 rounded-2xl border border-violet-300/25 bg-[#10132b] p-4 text-white"
    >
      <img src="/branding/academy-icon.png" alt="AcadeMY" width="36" height="36" loading="lazy" />
      <span className="flex-1">
        <small className="block text-xs tracking-widest text-[#e8cd8f]">NOVA STUDIO</small>
        <span role="status">{text}</span>
      </span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
