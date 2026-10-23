import type { CraftQueueApi } from "@/features/nova-cards/craft-queue";
import { devApproveCraftPortrait, devAttachCraftPortrait, devCraftQueue } from "./store";

/** Browser-only craft queue. Loaded only while the localhost dev bypass is on. */
export const devCraftApi: CraftQueueApi = {
  queue: () => Promise.resolve(devCraftQueue()),
  attach: (cardId, dataUrl, fileName) =>
    Promise.resolve(devAttachCraftPortrait(cardId, dataUrl, fileName)),
  approve: (cardId) => Promise.resolve(devApproveCraftPortrait(cardId)),
};
