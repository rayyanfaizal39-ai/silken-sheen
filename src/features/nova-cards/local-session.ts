import { isDevAuthBypassEnabled } from "@/lib/dev-auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { NovaCard } from "./model";
import type { NovaEntitlement } from "./entitlement";
import { getMyCard, getNovaEntitlement, getPublicCard, setSharing } from "./server";
import {
  chooseStudioOrigin,
  getNovaDashboardStatus,
  getStudioState,
  saveStudioDraft,
  submitStudioOrigin,
} from "./studio.server";
import type { StudioApi } from "./StudioPage";

function devBypassActive() {
  return (
    import.meta.env.DEV &&
    isDevAuthBypassEnabled(
      typeof window === "undefined" ? "" : window.location.hostname,
      isSupabaseConfigured,
    )
  );
}

export const studioApi: StudioApi = {
  load: () =>
    import.meta.env.DEV && devBypassActive()
      ? import("@/lib/dev-auth/store").then((store) => store.devLoadStudio())
      : getStudioState(),
  save: (draft) =>
    import.meta.env.DEV && devBypassActive()
      ? import("@/lib/dev-auth/store").then((store) => store.devSaveStudio(draft))
      : saveStudioDraft({ data: draft }),
  submit: () =>
    import.meta.env.DEV && devBypassActive()
      ? import("@/lib/dev-auth/store").then((store) => store.devSubmitStudio())
      : submitStudioOrigin(),
  choose: (candidate) =>
    import.meta.env.DEV && devBypassActive()
      ? import("@/lib/dev-auth/store").then((store) => store.devChooseStudio(candidate))
      : chooseStudioOrigin({ data: candidate }),
};

export function loadNovaDashboardStatus() {
  if (import.meta.env.DEV && devBypassActive()) {
    return import("@/lib/dev-auth/store").then((store) => store.devDashboardStatus());
  }
  return getNovaDashboardStatus();
}

export function loadOwnerNova(): Promise<[NovaCard | null, NovaEntitlement]> {
  if (import.meta.env.DEV && devBypassActive()) {
    return import("@/lib/dev-auth/store").then((store) => {
      const { card, entitlement } = store.devOwnerNova();
      return [card, entitlement];
    });
  }
  return Promise.all([getMyCard(), getNovaEntitlement()]);
}

export function updateCardSharing(enabled: boolean): Promise<NovaCard> {
  if (import.meta.env.DEV && devBypassActive()) {
    return import("@/lib/dev-auth/store").then((store) => store.devSetSharing(enabled));
  }
  return setSharing({ data: enabled });
}

export function loadOwnedOrPublicCard(publicId: string): Promise<NovaCard | null> {
  if (import.meta.env.DEV && devBypassActive()) {
    return import("@/lib/dev-auth/store").then((store) => {
      const local = store.readDevPublicCard(publicId);
      return local ?? getPublicCard({ data: publicId });
    });
  }
  return getPublicCard({ data: publicId });
}
