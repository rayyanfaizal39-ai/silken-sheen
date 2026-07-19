import type { MindNode } from "@/components/MindMap";
import type {
  Form,
  ScienceChapter2Notes,
  Flashcard,
  QuizQuestion,
} from "@/data/content";
import type { Subtopic } from "@/data/sejarah-f1-subtopics";
import type { EnglishChapterData } from "@/data/english-types";
import type { Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import type { Chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import type { Chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import type { Chapter8Content } from "@/content/form1/science/chapter-8/chapter8-content";
import type { Chapter9Content } from "@/content/form1/science/chapter-9/chapter9-content";
import type { Geo1Content } from "@/content/form1/geography/chapter-1/geo1-content";
import type { Geo2Content } from "@/content/form1/geography/chapter-2/geo2-content";
import type { Geo3Content } from "@/content/form1/geography/chapter-3/geo3-content";
import type { Geo4Content } from "@/content/form1/geography/chapter-4/geo4-content";
import type { Geo5Content } from "@/content/form1/geography/chapter-5/geo5-content";
import type { Geo6Content } from "@/content/form1/geography/chapter-6/geo6-content";
import type { Geo7Content } from "@/content/form1/geography/chapter-7/geo7-content";
import type { Geo8Content } from "@/content/form1/geography/chapter-8/geo8-content";
import type { Geo9Content } from "@/content/form1/geography/chapter-9/geo9-content";
import type { Geo10Content } from "@/content/form1/geography/chapter-10/geo10-content";
import type { Geo11Content } from "@/content/form1/geography/chapter-11/geo11-content";
import type { Geo12Content } from "@/content/form1/geography/chapter-12/geo12-content";
import type { Geo13Content } from "@/content/form1/geography/chapter-13/geo13-content";
import type { Sej1Content } from "@/content/form1/sejarah/chapter-1/sej1-content";
import type { Sej2Content } from "@/content/form1/sejarah/chapter-2/sej2-content";
import type { Sej3Content } from "@/content/form1/sejarah/chapter-3/sej3-content";
import type { Sej4Content } from "@/content/form1/sejarah/chapter-4/sej4-content";
import type { Sej5Content } from "@/content/form1/sejarah/chapter-5/sej5-content";
import type { Sej6Content } from "@/content/form1/sejarah/chapter-6/sej6-content";
import type { Sej7Content } from "@/content/form1/sejarah/chapter-7/sej7-content";
import type { Sej8Content } from "@/content/form1/sejarah/chapter-8/sej8-content";
import type { Sej2Ch1Content } from "@/content/form2/sejarah/chapter-1/sej2ch1-content";
import type { Sej2Ch2Content } from "@/content/form2/sejarah/chapter-2/sej2ch2-content";
import type { Sej2Ch3Content } from "@/content/form2/sejarah/chapter-3/sej2ch3-content";
import type { Sej2Ch4Content } from "@/content/form2/sejarah/chapter-4/sej2ch4-content";
import type { Sej2Ch5Content } from "@/content/form2/sejarah/chapter-5/sej2ch5-content";
import type { Sej2Ch6Content } from "@/content/form2/sejarah/chapter-6/sej2ch6-content";
import type { Sej2Ch7Content } from "@/content/form2/sejarah/chapter-7/sej2ch7-content";
import type { Sej2Ch8Content } from "@/content/form2/sejarah/chapter-8/sej2ch8-content";
import type { Sej2Ch9Content } from "@/content/form2/sejarah/chapter-9/sej2ch9-content";
import type { Sej2Ch10Content } from "@/content/form2/sejarah/chapter-10/sej2ch10-content";
import type { Sej3Ch1Content } from "@/content/form3/sejarah/chapter-1/sej3ch1-content";
import type { Sej3Ch2Content } from "@/content/form3/sejarah/chapter-2/sej3ch2-content";
import type { Sej3Ch3Content } from "@/content/form3/sejarah/chapter-3/sej3ch3-content";
import type { Sej3Ch4Content } from "@/content/form3/sejarah/chapter-4/sej3ch4-content";

/**
 * Generic structured notes shape. Reuses ScienceChapter2Notes
 * (quickRevision / sections / keyExamFacts) since it's already general-purpose.
 */
export type StructuredNotes = ScienceChapter2Notes;

export type VideoBlock = {
  youtubeId: string;
  title: string;
  /** Optional offset, in seconds, at which playback should begin. */
  startSeconds?: number;
  /** Caption language hint for the YouTube player (e.g. "ms", "en"). */
  captionLang?: string;
  /** Short caption shown beneath the player. */
  hint?: string;
};

/**
 * A single chapter's content. Drop one of these into the registry and
 * the notes/flashcards/quizzes pages will pick it up automatically.
 */
export type ChapterContent = {
  id: string; // e.g. "sejarah-f1-c1", "science-f1-c2-bm"
  subjectId: string; // matches subjects[].id
  form: Form;
  chapterKey: string; // e.g. "Chapter 1", matches getSubjectChapters().key
  /** Display title (used in headings & feature bar). */
  title: string;
  /** Optional Science language scope. */
  lang?: "bm" | "dlp";
  video?: VideoBlock;
  mindMap?: { data: MindNode; title: string };
  notes?: StructuredNotes;
  /** English-specific learning experience — replaces generic StructuredNotes for English chapters. */
  englishData?: EnglishChapterData;
  /** Bab 7 (Udara/Air) chunked, bilingual learning experience — replaces generic StructuredNotes when present. */
  bab7Data?: { en: Bab7Content; bm: Bab7Content };
  /** Bab 1 (Pengenalan kepada Penyiasatan Saintifik) chunked, bilingual learning experience. */
  chapter1Data?: { en: Chapter1Content; bm: Chapter1Content };
  /** Bab 2 (Sel Sebagai Unit Asas Hidupan/Cell as the Basic Unit of Life) chunked, bilingual learning experience. */
  chapter2Data?: { en: Chapter2Content; bm: Chapter2Content };
  /** Bab 3 (Koordinasi dan Gerak Balas/Coordination and Response) chunked, bilingual learning experience. */
  chapter3Data?: { en: Chapter3Content; bm: Chapter3Content };
  /** Bab 4 (Pembiakan/Reproduction) chunked, bilingual learning experience. */
  chapter4Data?: { en: Chapter4Content; bm: Chapter4Content };
  /** Bab 5 (Jirim/Matter) chunked, bilingual learning experience. */
  chapter5Data?: { en: Chapter5Content; bm: Chapter5Content };
  /** Bab 6 (Jadual Berkala/Periodic Table) chunked, bilingual learning experience. */
  chapter6Data?: { en: Chapter6Content; bm: Chapter6Content };
  /** Bab 8 (Cahaya dan Optik/Light and Optics) chunked, bilingual learning experience. */
  chapter8Data?: { en: Chapter8Content; bm: Chapter8Content };
  /** Bab 9 (Bumi/Earth) chunked, bilingual learning experience. */
  chapter9Data?: { en: Chapter9Content; bm: Chapter9Content };
  /** Geography Bab 1 (Arah/Direction) chunked learning experience. BM-only — Geography has no DLP/English textbook. */
  geoChapter1Data?: Geo1Content;
  /** Geography Bab 2 (Kedudukan/Position) chunked learning experience. BM-only. */
  geoChapter2Data?: Geo2Content;
  /** Geography Bab 3 (Peta Lakar/Sketch Maps) chunked learning experience. BM-only. */
  geoChapter3Data?: Geo3Content;
  /** Geography Bab 4 (Lakaran Peta Malaysia) chunked learning experience. BM-only. */
  geoChapter4Data?: Geo4Content;
  /** Geography Bab 5 (Bumi/Earth) chunked learning experience. BM-only. */
  geoChapter5Data?: Geo5Content;
  /** Geography Bab 6 (Bentuk Muka Bumi/Landforms) chunked learning experience. BM-only. */
  geoChapter6Data?: Geo6Content;
  /** Geography Bab 7 (Saliran/Drainage) chunked learning experience. BM-only. */
  geoChapter7Data?: Geo7Content;
  /** Geography Bab 8 (Penduduk di Malaysia/Population) chunked learning experience. BM-only. */
  geoChapter8Data?: Geo8Content;
  /** Geography Bab 9 (Petempatan di Malaysia/Settlement) chunked learning experience. BM-only. */
  geoChapter9Data?: Geo9Content;
  /** Geography Bab 10 (Bentuk Muka Bumi dan Saliran di Asia Tenggara) chunked learning experience. BM-only. */
  geoChapter10Data?: Geo10Content;
  /** Geography Bab 11 (Penduduk dan Petempatan di Asia Tenggara) chunked learning experience. BM-only. */
  geoChapter11Data?: Geo11Content;
  /** Geography Bab 12 (Sumber Air/Water Resources) chunked learning experience. BM-only. */
  geoChapter12Data?: Geo12Content;
  /** Geography Bab 13 (Sisa Domestik/Domestic Waste) chunked learning experience. BM-only. */
  geoChapter13Data?: Geo13Content;
  /** Sejarah Bab 1 (Mengenali Sejarah) chunked learning experience. BM-only. */
  sejChapter1Data?: Sej1Content;
  /** Sejarah Bab 2 (Zaman Air Batu) chunked learning experience. BM-only. */
  sejChapter2Data?: Sej2Content;
  /** Sejarah Bab 3 (Zaman Prasejarah) chunked learning experience. BM-only. */
  sejChapter3Data?: Sej3Content;
  /** Sejarah Bab 4 (Mengenali Tamadun) chunked learning experience. BM-only. */
  sejChapter4Data?: Sej4Content;
  /** Sejarah Bab 5 (Tamadun Awal Dunia) chunked learning experience. BM-only. */
  sejChapter5Data?: Sej5Content;
  /** Sejarah Bab 6 (Peningkatan Tamadun Yunani dan Rom) chunked learning experience. BM-only. */
  sejChapter6Data?: Sej6Content;
  /** Sejarah Bab 7 (Peningkatan Tamadun India dan China) chunked learning experience. BM-only. */
  sejChapter7Data?: Sej7Content;
  /** Sejarah Bab 8 (Tamadun Islam dan Sumbangannya) chunked learning experience. BM-only. */
  sejChapter8Data?: Sej8Content;
  /** Sejarah Form 2 Bab 1 (Kerajaan Alam Melayu) chunked learning experience. BM-only. */
  sej2Chapter1Data?: Sej2Ch1Content;
  /** Sejarah Form 2 Bab 2 (Sistem Pemerintahan dan Kegiatan Ekonomi) chunked learning experience. BM-only. */
  sej2Chapter2Data?: Sej2Ch2Content;
  /** Sejarah Form 2 Bab 3 (Sosiobudaya Masyarakat Kerajaan Alam Melayu) chunked learning experience. BM-only. */
  sej2Chapter3Data?: Sej2Ch3Content;
  /** Sejarah Form 2 Bab 4 (Agama, Kepercayaan dan Keunikan Warisan) chunked learning experience. BM-only. */
  sej2Chapter4Data?: Sej2Ch4Content;
  /** Sejarah Form 2 Bab 5 (Kesultanan Melayu Melaka) chunked learning experience. BM-only. */
  sej2Chapter5Data?: Sej2Ch5Content;
  /** Sejarah Form 2 Bab 6 (Kesultanan Johor Riau) chunked learning experience. BM-only. */
  sej2Chapter6Data?: Sej2Ch6Content;
  /** Sejarah Form 2 Bab 7 (Kesultanan Melayu Pahang, Perak, Terengganu dan Selangor) chunked learning experience. BM-only. */
  sej2Chapter7Data?: Sej2Ch7Content;
  /** Sejarah Form 2 Bab 8 (Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis) chunked learning experience. BM-only. */
  sej2Chapter8Data?: Sej2Ch8Content;
  /** Sejarah Form 2 Bab 9 (Warisan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis) chunked learning experience. BM-only. */
  sej2Chapter9Data?: Sej2Ch9Content;
  /** Sejarah Form 2 Bab 10 (Sarawak dan Sabah) chunked learning experience. BM-only. */
  sej2Chapter10Data?: Sej2Ch10Content;
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
  subtopics?: Subtopic[];
  sej2Chapter10Data?: Sej2Ch10Content;
  sej3Chapter1Data?: Sej3Ch1Content;
  sej3Chapter2Data?: Sej3Ch2Content;
  sej3Chapter3Data?: Sej3Ch3Content;
  sej3Chapter4Data?: Sej3Ch4Content;
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
  subtopics?: Subtopic[];
};

export type ChapterFeatureKey =
  | "notes"
  | "flashcards"
  | "quiz"
  | "mindMap"
  | "video";

export function getChapterFeatures(c: ChapterContent | undefined): Record<ChapterFeatureKey, boolean> {
  return {
    notes:
      !!c?.notes ||
      !!c?.englishData ||
      !!c?.bab7Data ||
      !!c?.chapter1Data ||
      !!c?.chapter2Data ||
      !!c?.chapter3Data ||
      !!c?.chapter4Data ||
      !!c?.chapter5Data ||
      !!c?.chapter6Data ||
      !!c?.chapter8Data ||
      !!c?.chapter9Data ||
      !!c?.geoChapter1Data ||
      !!c?.geoChapter2Data ||
      !!c?.geoChapter3Data ||
      !!c?.geoChapter4Data ||
      !!c?.geoChapter5Data ||
      !!c?.geoChapter6Data ||
      !!c?.geoChapter7Data ||
      !!c?.geoChapter8Data ||
      !!c?.geoChapter9Data ||
      !!c?.geoChapter10Data ||
      !!c?.geoChapter11Data ||
      !!c?.geoChapter12Data ||
      !!c?.geoChapter13Data ||
      !!c?.sejChapter1Data ||
      !!c?.sejChapter2Data ||
      !!c?.sejChapter3Data ||
      !!c?.sejChapter4Data ||
      !!c?.sejChapter5Data ||
      !!c?.sejChapter6Data ||
      !!c?.sejChapter7Data ||
      !!c?.sejChapter8Data ||
      !!c?.sej2Chapter1Data ||
      !!c?.sej2Chapter2Data ||
      !!c?.sej2Chapter3Data ||
      !!c?.sej2Chapter4Data ||
      !!c?.sej2Chapter5Data ||
      !!c?.sej2Chapter6Data ||
      !!c?.sej2Chapter7Data ||
      !!c?.sej2Chapter8Data ||
      !!c?.sej2Chapter9Data ||
      !!c?.sej2Chapter10Data ||
      !!c?.subtopics?.length,
    flashcards: !!c?.flashcards?.length,
    quiz: !!c?.quiz?.length,
    mindMap: !!c?.mindMap,
    video: !!c?.video,
  };
}
