import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CompanionCraftQueue, type CraftQueueApi } from "@/components/admin/CompanionCraftQueue";
import { isDevAuthBypassEnabled } from "@/lib/dev-auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  attachCraftOptions,
  getCraftQueue,
  resetCraftChoice,
} from "@/features/nova-cards/craft.server";

export const Route = createFileRoute("/admin/companion-craft")({
  component: CompanionCraftPage,
});

const serverApi: CraftQueueApi = {
  queue: () => getCraftQueue(),
  attachOptions: async (publicId, options) => {
    await attachCraftOptions({ data: { publicId, options } });
    const items = await getCraftQueue();
    const item = items.find((entry) => entry.publicId === publicId);
    if (!item) throw new Error("That student is no longer in the queue.");
    return item;
  },
  resetChoice: async (publicId) => {
    await resetCraftChoice({ data: { publicId } });
    const items = await getCraftQueue();
    const item = items.find((entry) => entry.publicId === publicId);
    if (!item) throw new Error("That student is no longer in the queue.");
    return item;
  },
};

function CompanionCraftPage() {
  const [api, setApi] = useState<CraftQueueApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (
      import.meta.env.DEV &&
      isDevAuthBypassEnabled(window.location.hostname, isSupabaseConfigured)
    ) {
      void import("@/lib/dev-auth/craft-dev").then((mod) => {
        if (!cancelled) setApi(mod.devCraftApi);
      });
    } else if (!cancelled) {
      setApi(serverApi);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  if (!api) {
    return (
      <div className="admin-content">
        <p role="status">Opening the companion craft queue…</p>
      </div>
    );
  }
  return <CompanionCraftQueue api={api} />;
}
