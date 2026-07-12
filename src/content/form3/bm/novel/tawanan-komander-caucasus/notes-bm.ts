import { TAWANAN_ANALYSIS } from "@/data/bm-form3-tawanan-content";
import { getBMForm3NovelWork } from "@/data/bm-form3-novel-structure";

const tawananNovel = getBMForm3NovelWork("tawanan-komander-caucasus");

export const tawananKomanderCaucasusNovelNotesBM = tawananNovel
  ? {
      ...tawananNovel,
      analysis: TAWANAN_ANALYSIS,
    }
  : undefined;
