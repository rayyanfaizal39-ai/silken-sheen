import { useEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { capturePartnerReference, withoutPartnerReference } from "@/lib/partner-attribution";

/**
 * Privately remembers a partner link's first-touch code and removes it from
 * the address bar. Renders nothing and calls no server: attribution happens
 * only at checkout, for the authenticated purchaser.
 */
export function PartnerReferenceCapture() {
  const router = useRouter();
  const href = useRouterState({ select: (state) => state.location.href });

  useEffect(() => {
    try {
      capturePartnerReference(window.location.href, window.localStorage);
    } catch {
      /* Browsers may block storage; checkout still reads ?ref= directly. */
      return;
    }
    const clean = withoutPartnerReference(window.location.href);
    if (clean) router.history.replace(clean);
  }, [href, router]);

  return null;
}
