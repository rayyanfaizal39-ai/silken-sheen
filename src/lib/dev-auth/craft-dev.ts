import type { CraftQueueApi } from "@/features/nova-cards/craft-queue";
import { devAttachCraftOptions, devCraftBrief, devCraftQueue, devResetCraftArt } from "./store";

/** Browser-only craft queue. Loaded only while the localhost dev bypass is on. */
export const devCraftApi: CraftQueueApi = {
  queue: () => Promise.resolve(devCraftQueue()),
  attachOptions: (publicId, options) => {
    const ordered = [...options].sort((a, b) => a.option - b.option);
    return Promise.resolve(
      devAttachCraftOptions(publicId, [
        { option: 1, dataUrl: ordered[0].dataUrl },
        { option: 2, dataUrl: ordered[1].dataUrl },
      ]),
    );
  },
  resetChoice: (publicId) => Promise.resolve(devResetCraftArt(publicId)),
  brief: (publicId) => Promise.resolve(devCraftBrief(publicId)),
};
