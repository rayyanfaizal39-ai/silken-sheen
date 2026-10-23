import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CompanionCraftQueue, type CraftQueueApi } from "@/components/admin/CompanionCraftQueue";
import { isDevAuthBypassEnabled } from "@/lib/dev-auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  attachCraftPortrait,
  getCraftQueue,
  publishCraftPortrait,
} from "@/features/nova-cards/craft.server";

export const Route = createFileRoute("/admin/companion-craft")({
  component: CompanionCraftPage,
});

const serverApi: CraftQueueApi = {
  queue: () => getCraftQueue(),
  attach: async (cardId, dataUrl, fileName) => {
    await attachCraftPortrait({ data: { cardId, dataUrl, fileName } });
    const items = await getCraftQueue();
    const item = items.find((entry) => entry.cardId === cardId);
    if (!item) throw new Error("That student is no longer in the queue.");
    return item;
  },
  approve: async (cardId) => {
    const items = await getCraftQueue();
    const current = items.find((entry) => entry.cardId === cardId);
    if (!current?.artworkId) throw new Error("Upload a portrait before approving it.");
    await publishCraftPortrait({ data: { artworkId: current.artworkId } });
    const next = await getCraftQueue();
    const item = next.find((entry) => entry.cardId === cardId);
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
