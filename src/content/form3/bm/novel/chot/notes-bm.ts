import { CHOT_ANALYSIS } from "@/data/bm-form3-chot-content";
import { getBMForm3NovelWork } from "@/data/bm-form3-novel-structure";

const chotNovel = getBMForm3NovelWork("chot");

export const chotNovelNotesBM = chotNovel
  ? {
      ...chotNovel,
      analysis: CHOT_ANALYSIS,
    }
  : undefined;
