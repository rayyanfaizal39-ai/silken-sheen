import type { ChapterContent } from "./types";
import { getChapterFeatures } from "./types";
import { scienceF3ChapterContent } from "@/content/form3/science/registration";
import type { MindNode } from "@/components/MindMap";
import { englishF1C1Notes } from "@/content/form1/english/chapter-1/notes";
import { englishF1C2Notes } from "@/content/form1/english/chapter-2/notes";
import { englishF1Paper1MindMap, englishF1Paper2MindMap } from "@/content/form1/english/mindmaps";
import { englishF2C1Notes } from "@/content/form2/english/chapter-1/notes";
import { englishF2C2Notes } from "@/content/form2/english/chapter-2/notes";
import { englishF2Paper1MindMap, englishF2Paper2MindMap } from "@/content/form2/english/mindmaps";
import { englishF3C1Notes } from "@/content/form3/english/chapter-1/notes";
import { englishF3C2Notes } from "@/content/form3/english/chapter-2/notes";
import { englishF3Paper1MindMap, englishF3Paper2MindMap } from "@/content/form3/english/mindmaps";
import { getEnglishQuizSetF3 } from "@/data/english-f3-quiz-sets";
import { ENGLISH_FLASHCARD_DECK_CARDS_F3 } from "@/data/english-f3-flashcard-decks";
import { ENGLISH_QUIZ_QUESTIONS_F2 } from "@/data/english-f2-quiz-sets";
import { ENGLISH_FLASHCARD_DECK_CARDS_F2 } from "@/data/english-f2-flashcard-decks";
import {
  flashcards as allFlashcards,
  quizzes as allQuizzes,
  notes as allNotes,
  scienceF1C2NotesBM,
  scienceF1C2NotesDLP,
  scienceF1C3NotesBM,
  scienceF1C3NotesDLP,
  scienceF1C4NotesBM,
  scienceF1C4NotesDLP,
  scienceF1C5NotesBM,
  scienceF1C5NotesDLP,
  scienceF1C6NotesBM,
  scienceF1C6NotesDLP,
  scienceF1C7NotesBM,
  scienceF1C7NotesDLP,
  scienceF1C8NotesBM,
  scienceF1C8NotesDLP,
  scienceF1C9NotesBM,
  scienceF1C9NotesDLP,
  sejarahChapterFromId,
} from "@/data/content";
import { getSejarahF1Subtopics } from "@/data/sejarah-f1-subtopics";
import { getEducationalVideo } from "@/data/educationalVideos";
import { getGeographyF1Subtopics } from "@/data/geography-f1-subtopics";
import { bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { chapter8Content } from "@/content/form1/science/chapter-8/chapter8-content";
import { chapter9Content } from "@/content/form1/science/chapter-9/chapter9-content";
import { mathF1C1NotesBM } from "@/content/form1/math/chapter-1/notes-bm";
import { mathF1C1NotesDLP } from "@/content/form1/math/chapter-1/notes-dlp";
import { mathF1C2NotesBM } from "@/content/form1/math/chapter-2/notes-bm";
import { mathF1C2NotesDLP } from "@/content/form1/math/chapter-2/notes-dlp";
import { mathF1C3NotesBM } from "@/content/form1/math/chapter-3/notes-bm";
import { mathF1C3NotesDLP } from "@/content/form1/math/chapter-3/notes-dlp";
import { mathF1C4NotesBM } from "@/content/form1/math/chapter-4/notes-bm";
import { mathF1C4NotesDLP } from "@/content/form1/math/chapter-4/notes-dlp";
import { mathF1C5NotesBM } from "@/content/form1/math/chapter-5/notes-bm";
import { mathF1C5NotesDLP } from "@/content/form1/math/chapter-5/notes-dlp";
import { mathF1C6NotesBM } from "@/content/form1/math/chapter-6/notes-bm";
import { mathF1C6NotesDLP } from "@/content/form1/math/chapter-6/notes-dlp";
import { mathF1C7NotesBM } from "@/content/form1/math/chapter-7/notes-bm";
import { mathF1C7NotesDLP } from "@/content/form1/math/chapter-7/notes-dlp";
import { mathF1C8NotesBM } from "@/content/form1/math/chapter-8/notes-bm";
import { mathF1C8NotesDLP } from "@/content/form1/math/chapter-8/notes-dlp";
import { mathF1C9NotesBM } from "@/content/form1/math/chapter-9/notes-bm";
import { mathF1C9NotesDLP } from "@/content/form1/math/chapter-9/notes-dlp";
import { mathF1C10NotesBM } from "@/content/form1/math/chapter-10/notes-bm";
import { mathF1C10NotesDLP } from "@/content/form1/math/chapter-10/notes-dlp";
import { mathF1C11NotesBM } from "@/content/form1/math/chapter-11/notes-bm";
import { mathF1C11NotesDLP } from "@/content/form1/math/chapter-11/notes-dlp";
import { mathF1C12NotesBM } from "@/content/form1/math/chapter-12/notes-bm";
import { mathF1C12NotesDLP } from "@/content/form1/math/chapter-12/notes-dlp";
import { mathF1C13NotesBM } from "@/content/form1/math/chapter-13/notes-bm";
import { mathF1C13NotesDLP } from "@/content/form1/math/chapter-13/notes-dlp";
import { sej2Ch1Content } from "@/content/form2/sejarah/chapter-1/sej2ch1-content";
import { sej2Ch2Content } from "@/content/form2/sejarah/chapter-2/sej2ch2-content";
import { sej2Ch3Content } from "@/content/form2/sejarah/chapter-3/sej2ch3-content";
import { sej2Ch4Content } from "@/content/form2/sejarah/chapter-4/sej2ch4-content";
import { sejarahF2C5Notes } from "@/content/form2/sejarah/chapter-5/notes";
import { sejarahF2C6Notes } from "@/content/form2/sejarah/chapter-6/notes";
import { sejarahF2C7Notes } from "@/content/form2/sejarah/chapter-7/notes";
import { sejarahF2C8Notes } from "@/content/form2/sejarah/chapter-8/notes";
import { sejarahF2C9Notes } from "@/content/form2/sejarah/chapter-9/notes";
import { sejarahF2C10Notes } from "@/content/form2/sejarah/chapter-10/notes";
import { sejarahF2C1MindMap } from "@/content/form2/sejarah/chapter-1/mindmap";
import { sejarahF2C2MindMap } from "@/content/form2/sejarah/chapter-2/mindmap";
import { sejarahF2C3MindMap } from "@/content/form2/sejarah/chapter-3/mindmap";
import { sejarahF2C4MindMap } from "@/content/form2/sejarah/chapter-4/mindmap";
import { sejarahF2C5MindMap } from "@/content/form2/sejarah/chapter-5/mindmap";
import { sejarahF2C6MindMap } from "@/content/form2/sejarah/chapter-6/mindmap";
import { organizeSejarahF2Notes } from "@/content/form2/sejarah/notes-structure";

// Geografi F1 mind maps
import { sejarahF3C1Notes } from "@/content/form3/sejarah/chapter-1/notes";
import { sejarahF3C1MindMap } from "@/content/form3/sejarah/chapter-1/mindmap";
import { sejarahF3C2Notes } from "@/content/form3/sejarah/chapter-2/notes";
import { sejarahF3C2MindMap } from "@/content/form3/sejarah/chapter-2/mindmap";
import { sejarahF3C3Notes } from "@/content/form3/sejarah/chapter-3/notes";
import { sejarahF3C3MindMap } from "@/content/form3/sejarah/chapter-3/mindmap";
import { sejarahF3C4Notes } from "@/content/form3/sejarah/chapter-4/notes";
import { sejarahF3C4MindMap } from "@/content/form3/sejarah/chapter-4/mindmap";
import { sejarahF3C5Notes } from "@/content/form3/sejarah/chapter-5/notes";
import { sejarahF3C5MindMap } from "@/content/form3/sejarah/chapter-5/mindmap";
import { sejarahF3C6Notes } from "@/content/form3/sejarah/chapter-6/notes";
import { sejarahF3C6MindMap } from "@/content/form3/sejarah/chapter-6/mindmap";
import { sejarahF3C7Notes } from "@/content/form3/sejarah/chapter-7/notes";
import { sejarahF3C7MindMap } from "@/content/form3/sejarah/chapter-7/mindmap";
import { sejarahF3C8Notes } from "@/content/form3/sejarah/chapter-8/notes";
import { sejarahF3C8MindMap } from "@/content/form3/sejarah/chapter-8/mindmap";
import { geoF1C1MindMap } from "@/content/form1/geography/chapter-1/mindmap";
import { geo1Content } from "@/content/form1/geography/chapter-1/geo1-content";
import { sej1Content } from "@/content/form1/sejarah/chapter-1/sej1-content";
import { sej2Content } from "@/content/form1/sejarah/chapter-2/sej2-content";
import { sej3Content } from "@/content/form1/sejarah/chapter-3/sej3-content";
import { sej4Content } from "@/content/form1/sejarah/chapter-4/sej4-content";
import { sej5Content } from "@/content/form1/sejarah/chapter-5/sej5-content";
import { sej6Content } from "@/content/form1/sejarah/chapter-6/sej6-content";
import { sej7Content } from "@/content/form1/sejarah/chapter-7/sej7-content";
import { sej8Content } from "@/content/form1/sejarah/chapter-8/sej8-content";
import { geo2Content } from "@/content/form1/geography/chapter-2/geo2-content";
import { geo3Content } from "@/content/form1/geography/chapter-3/geo3-content";
import { geo4Content } from "@/content/form1/geography/chapter-4/geo4-content";
import { geo5Content } from "@/content/form1/geography/chapter-5/geo5-content";
import { geo6Content } from "@/content/form1/geography/chapter-6/geo6-content";
import { geo7Content } from "@/content/form1/geography/chapter-7/geo7-content";
import { geo8Content } from "@/content/form1/geography/chapter-8/geo8-content";
import { geo9Content } from "@/content/form1/geography/chapter-9/geo9-content";
import { geo10Content } from "@/content/form1/geography/chapter-10/geo10-content";
import { geo11Content } from "@/content/form1/geography/chapter-11/geo11-content";
import { geo12Content } from "@/content/form1/geography/chapter-12/geo12-content";
import { geo13Content } from "@/content/form1/geography/chapter-13/geo13-content";
import { geoF1C2MindMap } from "@/content/form1/geography/chapter-2/mindmap";
import { geoF1C3MindMap } from "@/content/form1/geography/chapter-3/mindmap";
import { geoF1C4MindMap } from "@/content/form1/geography/chapter-4/mindmap";
import { geoF1C5MindMap } from "@/content/form1/geography/chapter-5/mindmap";
import { geoF1C6MindMap } from "@/content/form1/geography/chapter-6/mindmap";
import { geoF1C7MindMap } from "@/content/form1/geography/chapter-7/mindmap";
import { geoF1C8MindMap } from "@/content/form1/geography/chapter-8/mindmap";
import { geoF1C9MindMap } from "@/content/form1/geography/chapter-9/mindmap";
import { geoF1C10MindMap } from "@/content/form1/geography/chapter-10/mindmap";
import { geoF1C11MindMap } from "@/content/form1/geography/chapter-11/mindmap";
import { geoF1C12MindMap } from "@/content/form1/geography/chapter-12/mindmap";
import { geoF1C13MindMap } from "@/content/form1/geography/chapter-13/mindmap";

// Geografi F2
import { geoF2C1MindMap } from "@/content/form2/geography/chapter-1/mindmap";
import { geographyF2C1Notes } from "@/content/form2/geography/chapter-1/notes";
import { geoF2C2MindMap } from "@/content/form2/geography/chapter-2/mindmap";
import { geographyF2C2Notes } from "@/content/form2/geography/chapter-2/notes";
import { geoF2C3MindMap } from "@/content/form2/geography/chapter-3/mindmap";
import { geographyF2C3Notes } from "@/content/form2/geography/chapter-3/notes";
import { geoF2C4MindMap } from "@/content/form2/geography/chapter-4/mindmap";
import { geographyF2C4Notes } from "@/content/form2/geography/chapter-4/notes";
import { geoF2C5MindMap } from "@/content/form2/geography/chapter-5/mindmap";
import { geographyF2C5Notes } from "@/content/form2/geography/chapter-5/notes";
import { geoF2C6MindMap } from "@/content/form2/geography/chapter-6/mindmap";
import { geographyF2C6Notes } from "@/content/form2/geography/chapter-6/notes";
import { geoF2C7MindMap } from "@/content/form2/geography/chapter-7/mindmap";
import { geographyF2C7Notes } from "@/content/form2/geography/chapter-7/notes";
import { geoF2C8MindMap } from "@/content/form2/geography/chapter-8/mindmap";
import { geographyF2C8Notes } from "@/content/form2/geography/chapter-8/notes";
import { geoF2C9MindMap } from "@/content/form2/geography/chapter-9/mindmap";
import { geographyF2C9Notes } from "@/content/form2/geography/chapter-9/notes";
import { geoF2C10MindMap } from "@/content/form2/geography/chapter-10/mindmap";
import { geographyF2C10Notes } from "@/content/form2/geography/chapter-10/notes";
import { geographyF3C1Notes } from "@/content/form3/geography/chapter-1/notes";
import { geographyF3C2Notes } from "@/content/form3/geography/chapter-2/notes";
import { geographyF3C3Notes } from "@/content/form3/geography/chapter-3/notes";
import { geographyF3C4Notes } from "@/content/form3/geography/chapter-4/notes";
import { geographyF3C5Notes } from "@/content/form3/geography/chapter-5/notes";
import { geographyF3C6Notes } from "@/content/form3/geography/chapter-6/notes";
import { geographyF3C7Notes } from "@/content/form3/geography/chapter-7/notes";
import { geographyF3C8Notes } from "@/content/form3/geography/chapter-8/notes";
import { geographyF3C9Notes } from "@/content/form3/geography/chapter-9/notes";
import { geographyF3C10Notes } from "@/content/form3/geography/chapter-10/notes";
import { geographyF3C11Notes } from "@/content/form3/geography/chapter-11/notes";
import { geographyF3C12Notes } from "@/content/form3/geography/chapter-12/notes";
import { geoF3C1MindMap } from "@/content/form3/geography/chapter-1/mindmap";
import { geoF3C2MindMap } from "@/content/form3/geography/chapter-2/mindmap";
import { geoF3C3MindMap } from "@/content/form3/geography/chapter-3/mindmap";
import { geoF3C4MindMap } from "@/content/form3/geography/chapter-4/mindmap";
import { geoF3C5MindMap } from "@/content/form3/geography/chapter-5/mindmap";
import { geoF3C6MindMap } from "@/content/form3/geography/chapter-6/mindmap";
import { geoF3C7MindMap } from "@/content/form3/geography/chapter-7/mindmap";
import { geoF3C8MindMap } from "@/content/form3/geography/chapter-8/mindmap";
import { geoF3C9MindMap } from "@/content/form3/geography/chapter-9/mindmap";
import { geoF3C10MindMap } from "@/content/form3/geography/chapter-10/mindmap";
import { geoF3C11MindMap } from "@/content/form3/geography/chapter-11/mindmap";
import { geoF3C12MindMap } from "@/content/form3/geography/chapter-12/mindmap";

// Mind maps
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanAirBatuMindMap } from "@/content/form1/sejarah/chapter-2/mindmap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
import { mengenaliTamadunMindMap } from "@/content/form1/sejarah/chapter-4/mindmap";
import { tamadunAwalDuniaMindMap } from "@/content/form1/sejarah/chapter-5/mindmap";
import { peningkatanTamadunYunaniRomMindMap } from "@/content/form1/sejarah/chapter-6/mindmap";
import { tamadunIndiaChinaMindMap } from "@/content/form1/sejarah/chapter-7/mindmap";
import { tamadunIslamSumbanganMindMap } from "@/content/form1/sejarah/chapter-8/mindmap";
import { scienceF1C1MindMapBM } from "@/content/form1/science/chapter-1/mindmap-bm";
import { scienceF1C1MindMapDLP } from "@/content/form1/science/chapter-1/mindmap-dlp";
import { scienceF1C2MindMapBM } from "@/content/form1/science/chapter-2/mindmap-bm";
import { scienceF1C2MindMapDLP } from "@/content/form1/science/chapter-2/mindmap-dlp";
import { scienceF1C3MindMapBM } from "@/content/form1/science/chapter-3/mindmap-bm";
import { scienceF1C3MindMapDLP } from "@/content/form1/science/chapter-3/mindmap-dlp";
import { scienceF1C4MindMapBM } from "@/content/form1/science/chapter-4/mindmap-bm";
import { scienceF1C4MindMapDLP } from "@/content/form1/science/chapter-4/mindmap-dlp";
import { scienceF1C5MindMapBM } from "@/content/form1/science/chapter-5/mindmap-bm";
import { scienceF1C5MindMapDLP } from "@/content/form1/science/chapter-5/mindmap-dlp";
import { scienceF1C6MindMapBM } from "@/content/form1/science/chapter-6/mindmap-bm";
import { scienceF1C6MindMapDLP } from "@/content/form1/science/chapter-6/mindmap-dlp";
import { scienceF1C7MindMapBM } from "@/content/form1/science/chapter-7/mindmap-bm";
import { scienceF1C7MindMapDLP } from "@/content/form1/science/chapter-7/mindmap-dlp";
import { scienceF1C8MindMapBM } from "@/content/form1/science/chapter-8/mindmap-bm";
import { scienceF1C8MindMapDLP } from "@/content/form1/science/chapter-8/mindmap-dlp";
import { scienceF1C9MindMapBM } from "@/content/form1/science/chapter-9/mindmap-bm";
import { scienceF1C9MindMapDLP } from "@/content/form1/science/chapter-9/mindmap-dlp";

// Mathematics F1 mind maps (BM)
import { mathF1C1MindMapBM } from "@/content/form1/math/chapter-1/mindmap-bm";
import { mathF1C2MindMapBM } from "@/content/form1/math/chapter-2/mindmap-bm";
import { mathF1C3MindMapBM } from "@/content/form1/math/chapter-3/mindmap-bm";
import { mathF1C4MindMapBM } from "@/content/form1/math/chapter-4/mindmap-bm";
import { mathF1C5MindMapBM } from "@/content/form1/math/chapter-5/mindmap-bm";
import { mathF1C6MindMapBM } from "@/content/form1/math/chapter-6/mindmap-bm";
import { mathF1C7MindMapBM } from "@/content/form1/math/chapter-7/mindmap-bm";
import { mathF1C8MindMapBM } from "@/content/form1/math/chapter-8/mindmap-bm";
import { mathF1C9MindMapBM } from "@/content/form1/math/chapter-9/mindmap-bm";
import { mathF1C10MindMapBM } from "@/content/form1/math/chapter-10/mindmap-bm";
import { mathF1C11MindMapBM } from "@/content/form1/math/chapter-11/mindmap-bm";
import { mathF1C12MindMapBM } from "@/content/form1/math/chapter-12/mindmap-bm";
import { mathF1C13MindMapBM } from "@/content/form1/math/chapter-13/mindmap-bm";

// Sains F2 Bab 1 (Biodiversiti / Biodiversity)
import { scienceF2C1NotesBM } from "@/content/form2/science/chapter-1/notes-bm";
import { scienceF2C1NotesDLP } from "@/content/form2/science/chapter-1/notes-dlp";
import { scienceF2C1MindMapBM } from "@/content/form2/science/chapter-1/mindmap-bm";
import { scienceF2C1MindMapDLP } from "@/content/form2/science/chapter-1/mindmap-dlp";
import { scienceF2C1QuizzesBM } from "@/content/form2/science/chapter-1/quizzes-bm";
import { scienceF2C1QuizzesDLP } from "@/content/form2/science/chapter-1/quizzes-dlp";
import { scienceF2C1FlashcardsBM } from "@/content/form2/science/chapter-1/flashcards-bm";
import { scienceF2C1FlashcardsDLP } from "@/content/form2/science/chapter-1/flashcards-dlp";

// Sains F2 Bab 2 (Ekosistem / Ecosystem)
import { scienceF2C2NotesBM } from "@/content/form2/science/chapter-2/notes-bm";
import { scienceF2C2NotesDLP } from "@/content/form2/science/chapter-2/notes-dlp";
import { scienceF2C2MindMapBM } from "@/content/form2/science/chapter-2/mindmap-bm";
import { scienceF2C2MindMapDLP } from "@/content/form2/science/chapter-2/mindmap-dlp";
import { scienceF2C2QuizzesBM } from "@/content/form2/science/chapter-2/quizzes-bm";
import { scienceF2C2QuizzesDLP } from "@/content/form2/science/chapter-2/quizzes-dlp";
import { scienceF2C2FlashcardsBM } from "@/content/form2/science/chapter-2/flashcards-bm";
import { scienceF2C2FlashcardsDLP } from "@/content/form2/science/chapter-2/flashcards-dlp";

// Sains F2 Bab 3 (Nutrisi / Nutrition)
import { scienceF2C3NotesBM } from "@/content/form2/science/chapter-3/notes-bm";
import { scienceF2C3NotesDLP } from "@/content/form2/science/chapter-3/notes-dlp";
import { scienceF2C3MindMapBM } from "@/content/form2/science/chapter-3/mindmap-bm";
import { scienceF2C3MindMapDLP } from "@/content/form2/science/chapter-3/mindmap-dlp";
import { scienceF2C3QuizzesBM } from "@/content/form2/science/chapter-3/quizzes-bm";
import { scienceF2C3QuizzesDLP } from "@/content/form2/science/chapter-3/quizzes-dlp";
import { scienceF2C3FlashcardsBM } from "@/content/form2/science/chapter-3/flashcards-bm";
import { scienceF2C3FlashcardsDLP } from "@/content/form2/science/chapter-3/flashcards-dlp";
import { scienceF2C4NotesBM } from "@/content/form2/science/chapter-4/notes-bm";
import { scienceF2C4NotesDLP } from "@/content/form2/science/chapter-4/notes-dlp";
import { scienceF2C4MindMapBM } from "@/content/form2/science/chapter-4/mindmap-bm";
import { scienceF2C4MindMapDLP } from "@/content/form2/science/chapter-4/mindmap-dlp";
import { scienceF2C4QuizzesBM } from "@/content/form2/science/chapter-4/quizzes-bm";
import { scienceF2C4QuizzesDLP } from "@/content/form2/science/chapter-4/quizzes-dlp";
import { scienceF2C4FlashcardsBM } from "@/content/form2/science/chapter-4/flashcards-bm";
import { scienceF2C4FlashcardsDLP } from "@/content/form2/science/chapter-4/flashcards-dlp";
import { scienceF2C5NotesBM } from "@/content/form2/science/chapter-5/notes-bm";
import { scienceF2C5NotesDLP } from "@/content/form2/science/chapter-5/notes-dlp";
import { scienceF2C5MindMapBM } from "@/content/form2/science/chapter-5/mindmap-bm";
import { scienceF2C5MindMapDLP } from "@/content/form2/science/chapter-5/mindmap-dlp";
import { scienceF2C5QuizzesBM } from "@/content/form2/science/chapter-5/quizzes-bm";
import { scienceF2C5QuizzesDLP } from "@/content/form2/science/chapter-5/quizzes-dlp";
import { scienceF2C5FlashcardsBM } from "@/content/form2/science/chapter-5/flashcards-bm";
import { scienceF2C5FlashcardsDLP } from "@/content/form2/science/chapter-5/flashcards-dlp";
import { scienceF2C6NotesBM } from "@/content/form2/science/chapter-6/notes-bm";
import { scienceF2C6NotesDLP } from "@/content/form2/science/chapter-6/notes-dlp";
import { scienceF2C6MindMapBM } from "@/content/form2/science/chapter-6/mindmap-bm";
import { scienceF2C6MindMapDLP } from "@/content/form2/science/chapter-6/mindmap-dlp";
import { scienceF2C6QuizzesBM } from "@/content/form2/science/chapter-6/quizzes-bm";
import { scienceF2C6QuizzesDLP } from "@/content/form2/science/chapter-6/quizzes-dlp";
import { scienceF2C6FlashcardsBM } from "@/content/form2/science/chapter-6/flashcards-bm";
import { scienceF2C6FlashcardsDLP } from "@/content/form2/science/chapter-6/flashcards-dlp";
import { scienceF2C7NotesBM } from "@/content/form2/science/chapter-7/notes-bm";
import { scienceF2C7NotesDLP } from "@/content/form2/science/chapter-7/notes-dlp";
import { scienceF2C7MindMapBM } from "@/content/form2/science/chapter-7/mindmap-bm";
import { scienceF2C7MindMapDLP } from "@/content/form2/science/chapter-7/mindmap-dlp";
import { scienceF2C7QuizzesBM } from "@/content/form2/science/chapter-7/quizzes-bm";
import { scienceF2C7QuizzesDLP } from "@/content/form2/science/chapter-7/quizzes-dlp";
import { scienceF2C7FlashcardsBM } from "@/content/form2/science/chapter-7/flashcards-bm";
import { scienceF2C7FlashcardsDLP } from "@/content/form2/science/chapter-7/flashcards-dlp";
import { scienceF2C8NotesBM } from "@/content/form2/science/chapter-8/notes-bm";
import { scienceF2C8NotesDLP } from "@/content/form2/science/chapter-8/notes-dlp";
import { scienceF2C8MindMapBM } from "@/content/form2/science/chapter-8/mindmap-bm";
import { scienceF2C8MindMapDLP } from "@/content/form2/science/chapter-8/mindmap-dlp";
import { scienceF2C8QuizzesBM } from "@/content/form2/science/chapter-8/quizzes-bm";
import { scienceF2C8QuizzesDLP } from "@/content/form2/science/chapter-8/quizzes-dlp";
import { scienceF2C8FlashcardsBM } from "@/content/form2/science/chapter-8/flashcards-bm";
import { scienceF2C8FlashcardsDLP } from "@/content/form2/science/chapter-8/flashcards-dlp";
import { scienceF2C9NotesBM } from "@/content/form2/science/chapter-9/notes-bm";
import { scienceF2C9NotesDLP } from "@/content/form2/science/chapter-9/notes-dlp";
import { scienceF2C9MindMapBM } from "@/content/form2/science/chapter-9/mindmap-bm";
import { scienceF2C9MindMapDLP } from "@/content/form2/science/chapter-9/mindmap-dlp";
import { scienceF2C9QuizzesBM } from "@/content/form2/science/chapter-9/quizzes-bm";
import { scienceF2C9QuizzesDLP } from "@/content/form2/science/chapter-9/quizzes-dlp";
import { scienceF2C9FlashcardsBM } from "@/content/form2/science/chapter-9/flashcards-bm";
import { scienceF2C9FlashcardsDLP } from "@/content/form2/science/chapter-9/flashcards-dlp";
import { scienceF2C10NotesBM } from "@/content/form2/science/chapter-10/notes-bm";
import { scienceF2C10NotesDLP } from "@/content/form2/science/chapter-10/notes-dlp";
import { scienceF2C10MindMapBM } from "@/content/form2/science/chapter-10/mindmap-bm";
import { scienceF2C10MindMapDLP } from "@/content/form2/science/chapter-10/mindmap-dlp";
import { scienceF2C10QuizzesBM } from "@/content/form2/science/chapter-10/quizzes-bm";
import { scienceF2C10QuizzesDLP } from "@/content/form2/science/chapter-10/quizzes-dlp";
import { scienceF2C10FlashcardsBM } from "@/content/form2/science/chapter-10/flashcards-bm";
import { scienceF2C10FlashcardsDLP } from "@/content/form2/science/chapter-10/flashcards-dlp";
import { scienceF2C11NotesBM } from "@/content/form2/science/chapter-11/notes-bm";
import { scienceF2C11NotesDLP } from "@/content/form2/science/chapter-11/notes-dlp";
import { scienceF2C11MindMapBM } from "@/content/form2/science/chapter-11/mindmap-bm";
import { scienceF2C11MindMapDLP } from "@/content/form2/science/chapter-11/mindmap-dlp";
import { scienceF2C11QuizzesBM } from "@/content/form2/science/chapter-11/quizzes-bm";
import { scienceF2C11QuizzesDLP } from "@/content/form2/science/chapter-11/quizzes-dlp";
import { scienceF2C11FlashcardsBM } from "@/content/form2/science/chapter-11/flashcards-bm";
import { scienceF2C11FlashcardsDLP } from "@/content/form2/science/chapter-11/flashcards-dlp";
import { scienceF2C12NotesBM } from "@/content/form2/science/chapter-12/notes-bm";
import { scienceF2C12NotesDLP } from "@/content/form2/science/chapter-12/notes-dlp";
import { scienceF2C12MindMapBM } from "@/content/form2/science/chapter-12/mindmap-bm";
import { scienceF2C12MindMapDLP } from "@/content/form2/science/chapter-12/mindmap-dlp";
import { scienceF2C12QuizzesBM } from "@/content/form2/science/chapter-12/quizzes-bm";
import { scienceF2C12QuizzesDLP } from "@/content/form2/science/chapter-12/quizzes-dlp";
import { scienceF2C12FlashcardsBM } from "@/content/form2/science/chapter-12/flashcards-bm";
import { scienceF2C12FlashcardsDLP } from "@/content/form2/science/chapter-12/flashcards-dlp";
import { scienceF2C13NotesBM } from "@/content/form2/science/chapter-13/notes-bm";
import { scienceF2C13NotesDLP } from "@/content/form2/science/chapter-13/notes-dlp";
import { scienceF2C13MindMapBM } from "@/content/form2/science/chapter-13/mindmap-bm";
import { scienceF2C13MindMapDLP } from "@/content/form2/science/chapter-13/mindmap-dlp";
import { scienceF2C13QuizzesBM } from "@/content/form2/science/chapter-13/quizzes-bm";
import { scienceF2C13QuizzesDLP } from "@/content/form2/science/chapter-13/quizzes-dlp";
import { scienceF2C13FlashcardsBM } from "@/content/form2/science/chapter-13/flashcards-bm";
import { scienceF2C13FlashcardsDLP } from "@/content/form2/science/chapter-13/flashcards-dlp";

// Mathematics F1 mind maps (DLP)
import { mathF1C1MindMapDLP } from "@/content/form1/math/chapter-1/mindmap-dlp";
import { mathF1C2MindMapDLP } from "@/content/form1/math/chapter-2/mindmap-dlp";
import { mathF1C3MindMapDLP } from "@/content/form1/math/chapter-3/mindmap-dlp";
import { mathF1C4MindMapDLP } from "@/content/form1/math/chapter-4/mindmap-dlp";
import { mathF1C5MindMapDLP } from "@/content/form1/math/chapter-5/mindmap-dlp";
import { mathF1C6MindMapDLP } from "@/content/form1/math/chapter-6/mindmap-dlp";
import { mathF1C7MindMapDLP } from "@/content/form1/math/chapter-7/mindmap-dlp";
import { mathF1C8MindMapDLP } from "@/content/form1/math/chapter-8/mindmap-dlp";
import { mathF1C9MindMapDLP } from "@/content/form1/math/chapter-9/mindmap-dlp";
import { mathF1C10MindMapDLP } from "@/content/form1/math/chapter-10/mindmap-dlp";
import { mathF1C11MindMapDLP } from "@/content/form1/math/chapter-11/mindmap-dlp";
import { mathF1C12MindMapDLP } from "@/content/form1/math/chapter-12/mindmap-dlp";
import { mathF1C13MindMapDLP } from "@/content/form1/math/chapter-13/mindmap-dlp";

// Mathematics Form 2 notes and mind maps
import { mathF2C1NotesBM } from "@/content/form2/math/chapter-1/notes-bm";
import { mathF2C1NotesDLP } from "@/content/form2/math/chapter-1/notes-dlp";
import { mathF2C1MindMapBM } from "@/content/form2/math/chapter-1/mindmap-bm";
import { mathF2C1MindMapDLP } from "@/content/form2/math/chapter-1/mindmap-dlp";
import { mathF2C1QuizzesBM } from "@/content/form2/math/chapter-1/quizzes-bm";
import { mathF2C1QuizzesDLP } from "@/content/form2/math/chapter-1/quizzes-dlp";
import { mathF2C1FlashcardsBM } from "@/content/form2/math/chapter-1/flashcards-bm";
import { mathF2C1FlashcardsDLP } from "@/content/form2/math/chapter-1/flashcards-dlp";
import { mathF2C2NotesBM } from "@/content/form2/math/chapter-2/notes-bm";
import { mathF2C2NotesDLP } from "@/content/form2/math/chapter-2/notes-dlp";
import { mathF2C2MindMapBM } from "@/content/form2/math/chapter-2/mindmap-bm";
import { mathF2C2MindMapDLP } from "@/content/form2/math/chapter-2/mindmap-dlp";
import { mathF2C3NotesBM } from "@/content/form2/math/chapter-3/notes-bm";
import { mathF2C3NotesDLP } from "@/content/form2/math/chapter-3/notes-dlp";
import { mathF2C3MindMapBM } from "@/content/form2/math/chapter-3/mindmap-bm";
import { mathF2C3MindMapDLP } from "@/content/form2/math/chapter-3/mindmap-dlp";
import { mathF2C4NotesBM } from "@/content/form2/math/chapter-4/notes-bm";
import { mathF2C4NotesDLP } from "@/content/form2/math/chapter-4/notes-dlp";
import { mathF2C4MindMapBM } from "@/content/form2/math/chapter-4/mindmap-bm";
import { mathF2C4MindMapDLP } from "@/content/form2/math/chapter-4/mindmap-dlp";
import { mathF2C5NotesBM } from "@/content/form2/math/chapter-5/notes-bm";
import { mathF2C5NotesDLP } from "@/content/form2/math/chapter-5/notes-dlp";
import { mathF2C5MindMapBM } from "@/content/form2/math/chapter-5/mindmap-bm";
import { mathF2C5MindMapDLP } from "@/content/form2/math/chapter-5/mindmap-dlp";
import { mathF2C6NotesBM } from "@/content/form2/math/chapter-6/notes-bm";
import { mathF2C6NotesDLP } from "@/content/form2/math/chapter-6/notes-dlp";
import { mathF2C6MindMapBM } from "@/content/form2/math/chapter-6/mindmap-bm";
import { mathF2C6MindMapDLP } from "@/content/form2/math/chapter-6/mindmap-dlp";
import { mathF2C7NotesBM } from "@/content/form2/math/chapter-7/notes-bm";
import { mathF2C7NotesDLP } from "@/content/form2/math/chapter-7/notes-dlp";
import { mathF2C7MindMapBM } from "@/content/form2/math/chapter-7/mindmap-bm";
import { mathF2C7MindMapDLP } from "@/content/form2/math/chapter-7/mindmap-dlp";
import { mathF2C8NotesBM } from "@/content/form2/math/chapter-8/notes-bm";
import { mathF2C8NotesDLP } from "@/content/form2/math/chapter-8/notes-dlp";
import { mathF2C8MindMapBM } from "@/content/form2/math/chapter-8/mindmap-bm";
import { mathF2C8MindMapDLP } from "@/content/form2/math/chapter-8/mindmap-dlp";
import { mathF2C9NotesBM } from "@/content/form2/math/chapter-9/notes-bm";
import { mathF2C9NotesDLP } from "@/content/form2/math/chapter-9/notes-dlp";
import { mathF2C9MindMapBM } from "@/content/form2/math/chapter-9/mindmap-bm";
import { mathF2C9MindMapDLP } from "@/content/form2/math/chapter-9/mindmap-dlp";
import { mathF2C10NotesBM } from "@/content/form2/math/chapter-10/notes-bm";
import { mathF2C10NotesDLP } from "@/content/form2/math/chapter-10/notes-dlp";
import { mathF2C10MindMapBM } from "@/content/form2/math/chapter-10/mindmap-bm";
import { mathF2C10MindMapDLP } from "@/content/form2/math/chapter-10/mindmap-dlp";
import { mathF2C11NotesBM } from "@/content/form2/math/chapter-11/notes-bm";
import { mathF2C11NotesDLP } from "@/content/form2/math/chapter-11/notes-dlp";
import { mathF2C11MindMapBM } from "@/content/form2/math/chapter-11/mindmap-bm";
import { mathF2C11MindMapDLP } from "@/content/form2/math/chapter-11/mindmap-dlp";


import { mathF2C2QuizzesBM } from "@/content/form2/math/chapter-2/quizzes-bm";
import { mathF2C2QuizzesDLP } from "@/content/form2/math/chapter-2/quizzes-dlp";
import { mathF2C2FlashcardsBM } from "@/content/form2/math/chapter-2/flashcards-bm";
import { mathF2C2FlashcardsDLP } from "@/content/form2/math/chapter-2/flashcards-dlp";
import { mathF2C3QuizzesBM } from "@/content/form2/math/chapter-3/quizzes-bm";
import { mathF2C3QuizzesDLP } from "@/content/form2/math/chapter-3/quizzes-dlp";
import { mathF2C3FlashcardsBM } from "@/content/form2/math/chapter-3/flashcards-bm";
import { mathF2C3FlashcardsDLP } from "@/content/form2/math/chapter-3/flashcards-dlp";
import { mathF2C4QuizzesBM } from "@/content/form2/math/chapter-4/quizzes-bm";
import { mathF2C4QuizzesDLP } from "@/content/form2/math/chapter-4/quizzes-dlp";
import { mathF2C4FlashcardsBM } from "@/content/form2/math/chapter-4/flashcards-bm";
import { mathF2C4FlashcardsDLP } from "@/content/form2/math/chapter-4/flashcards-dlp";
import { mathF2C5QuizzesBM } from "@/content/form2/math/chapter-5/quizzes-bm";
import { mathF2C5QuizzesDLP } from "@/content/form2/math/chapter-5/quizzes-dlp";
import { mathF2C5FlashcardsBM } from "@/content/form2/math/chapter-5/flashcards-bm";
import { mathF2C5FlashcardsDLP } from "@/content/form2/math/chapter-5/flashcards-dlp";
import { mathF2C6QuizzesBM } from "@/content/form2/math/chapter-6/quizzes-bm";
import { mathF2C6QuizzesDLP } from "@/content/form2/math/chapter-6/quizzes-dlp";
import { mathF2C6FlashcardsBM } from "@/content/form2/math/chapter-6/flashcards-bm";
import { mathF2C6FlashcardsDLP } from "@/content/form2/math/chapter-6/flashcards-dlp";
import { mathF2C7QuizzesBM } from "@/content/form2/math/chapter-7/quizzes-bm";
import { mathF2C7QuizzesDLP } from "@/content/form2/math/chapter-7/quizzes-dlp";
import { mathF2C7FlashcardsBM } from "@/content/form2/math/chapter-7/flashcards-bm";
import { mathF2C7FlashcardsDLP } from "@/content/form2/math/chapter-7/flashcards-dlp";
import { mathF2C8QuizzesBM } from "@/content/form2/math/chapter-8/quizzes-bm";
import { mathF2C8QuizzesDLP } from "@/content/form2/math/chapter-8/quizzes-dlp";
import { mathF2C8FlashcardsBM } from "@/content/form2/math/chapter-8/flashcards-bm";
import { mathF2C8FlashcardsDLP } from "@/content/form2/math/chapter-8/flashcards-dlp";
import { mathF2C9QuizzesBM } from "@/content/form2/math/chapter-9/quizzes-bm";
import { mathF2C9QuizzesDLP } from "@/content/form2/math/chapter-9/quizzes-dlp";
import { mathF2C9FlashcardsBM } from "@/content/form2/math/chapter-9/flashcards-bm";
import { mathF2C9FlashcardsDLP } from "@/content/form2/math/chapter-9/flashcards-dlp";
import { mathF2C10QuizzesBM } from "@/content/form2/math/chapter-10/quizzes-bm";
import { mathF2C10QuizzesDLP } from "@/content/form2/math/chapter-10/quizzes-dlp";
import { mathF2C10FlashcardsBM } from "@/content/form2/math/chapter-10/flashcards-bm";
import { mathF2C10FlashcardsDLP } from "@/content/form2/math/chapter-10/flashcards-dlp";
import { mathF2C11QuizzesBM } from "@/content/form2/math/chapter-11/quizzes-bm";
import { mathF2C11QuizzesDLP } from "@/content/form2/math/chapter-11/quizzes-dlp";
import { mathF2C11FlashcardsBM } from "@/content/form2/math/chapter-11/flashcards-bm";
import { mathF2C11FlashcardsDLP } from "@/content/form2/math/chapter-11/flashcards-dlp";
import { mathF2C12QuizzesBM } from "@/content/form2/math/chapter-12/quizzes-bm";
import { mathF2C12QuizzesDLP } from "@/content/form2/math/chapter-12/quizzes-dlp";
import { mathF2C12FlashcardsBM } from "@/content/form2/math/chapter-12/flashcards-bm";
import { mathF2C12FlashcardsDLP } from "@/content/form2/math/chapter-12/flashcards-dlp";
import { mathF2C12NotesBM } from "@/content/form2/math/chapter-12/notes-bm";
import { mathF2C12NotesDLP } from "@/content/form2/math/chapter-12/notes-dlp";
import { mathF2C12MindMapBM } from "@/content/form2/math/chapter-12/mindmap-bm";
import { mathF2C12MindMapDLP } from "@/content/form2/math/chapter-12/mindmap-dlp";
import { mathF2C13QuizzesBM } from "@/content/form2/math/chapter-13/quizzes-bm";
import { mathF2C13QuizzesDLP } from "@/content/form2/math/chapter-13/quizzes-dlp";
import { mathF2C13FlashcardsBM } from "@/content/form2/math/chapter-13/flashcards-bm";
import { mathF2C13FlashcardsDLP } from "@/content/form2/math/chapter-13/flashcards-dlp";
import { mathF2C13NotesBM } from "@/content/form2/math/chapter-13/notes-bm";
import { mathF2C13NotesDLP } from "@/content/form2/math/chapter-13/notes-dlp";
import { mathF2C13MindMapBM } from "@/content/form2/math/chapter-13/mindmap-bm";
import { mathF2C13MindMapDLP } from "@/content/form2/math/chapter-13/mindmap-dlp";

// Mathematics Form 3
import { mathF3C1NotesBM } from "@/content/form3/math/chapter-1/notes-bm";
import { mathF3C1NotesDLP } from "@/content/form3/math/chapter-1/notes-dlp";
import { mathF3C1MindMapBM } from "@/content/form3/math/chapter-1/mindmap-bm";
import { mathF3C1MindMapDLP } from "@/content/form3/math/chapter-1/mindmap-dlp";
import { mathF3C1QuizzesBM } from "@/content/form3/math/chapter-1/quizzes-bm";
import { mathF3C1QuizzesDLP } from "@/content/form3/math/chapter-1/quizzes-dlp";
import { mathF3C1FlashcardsBM } from "@/content/form3/math/chapter-1/flashcards-bm";
import { mathF3C1FlashcardsDLP } from "@/content/form3/math/chapter-1/flashcards-dlp";
import { mathF3C2NotesBM } from "@/content/form3/math/chapter-2/notes-bm";
import { mathF3C2NotesDLP } from "@/content/form3/math/chapter-2/notes-dlp";
import { mathF3C2MindMapBM } from "@/content/form3/math/chapter-2/mindmap-bm";
import { mathF3C2MindMapDLP } from "@/content/form3/math/chapter-2/mindmap-dlp";
import { mathF3C2QuizzesBM } from "@/content/form3/math/chapter-2/quizzes-bm";
import { mathF3C2QuizzesDLP } from "@/content/form3/math/chapter-2/quizzes-dlp";
import { mathF3C2FlashcardsBM } from "@/content/form3/math/chapter-2/flashcards-bm";
import { mathF3C2FlashcardsDLP } from "@/content/form3/math/chapter-2/flashcards-dlp";
import { mathF3C3NotesBM } from "@/content/form3/math/chapter-3/notes-bm";
import { mathF3C3NotesDLP } from "@/content/form3/math/chapter-3/notes-dlp";
import { mathF3C3MindMapBM } from "@/content/form3/math/chapter-3/mindmap-bm";
import { mathF3C3MindMapDLP } from "@/content/form3/math/chapter-3/mindmap-dlp";
import { mathF3C3QuizzesBM } from "@/content/form3/math/chapter-3/quizzes-bm";
import { mathF3C3QuizzesDLP } from "@/content/form3/math/chapter-3/quizzes-dlp";
import { mathF3C3FlashcardsBM } from "@/content/form3/math/chapter-3/flashcards-bm";
import { mathF3C3FlashcardsDLP } from "@/content/form3/math/chapter-3/flashcards-dlp";
import { mathF3C4NotesBM } from "@/content/form3/math/chapter-4/notes-bm";
import { mathF3C4NotesDLP } from "@/content/form3/math/chapter-4/notes-dlp";
import { mathF3C4MindMapBM } from "@/content/form3/math/chapter-4/mindmap-bm";
import { mathF3C4MindMapDLP } from "@/content/form3/math/chapter-4/mindmap-dlp";
import { mathF3C4QuizzesBM } from "@/content/form3/math/chapter-4/quizzes-bm";
import { mathF3C4QuizzesDLP } from "@/content/form3/math/chapter-4/quizzes-dlp";
import { mathF3C4FlashcardsBM } from "@/content/form3/math/chapter-4/flashcards-bm";
import { mathF3C4FlashcardsDLP } from "@/content/form3/math/chapter-4/flashcards-dlp";
import { mathF3C5NotesBM } from "@/content/form3/math/chapter-5/notes-bm";
import { mathF3C5NotesDLP } from "@/content/form3/math/chapter-5/notes-dlp";
import { mathF3C5MindMapBM } from "@/content/form3/math/chapter-5/mindmap-bm";
import { mathF3C5MindMapDLP } from "@/content/form3/math/chapter-5/mindmap-dlp";
import { mathF3C5QuizzesBM } from "@/content/form3/math/chapter-5/quizzes-bm";
import { mathF3C5QuizzesDLP } from "@/content/form3/math/chapter-5/quizzes-dlp";
import { mathF3C5FlashcardsBM } from "@/content/form3/math/chapter-5/flashcards-bm";
import { mathF3C5FlashcardsDLP } from "@/content/form3/math/chapter-5/flashcards-dlp";
import { mathF3C6NotesBM } from "@/content/form3/math/chapter-6/notes-bm";
import { mathF3C6NotesDLP } from "@/content/form3/math/chapter-6/notes-dlp";
import { mathF3C6MindMapBM } from "@/content/form3/math/chapter-6/mindmap-bm";
import { mathF3C6MindMapDLP } from "@/content/form3/math/chapter-6/mindmap-dlp";
import { mathF3C6QuizzesBM } from "@/content/form3/math/chapter-6/quizzes-bm";
import { mathF3C6QuizzesDLP } from "@/content/form3/math/chapter-6/quizzes-dlp";
import { mathF3C6FlashcardsBM } from "@/content/form3/math/chapter-6/flashcards-bm";
import { mathF3C6FlashcardsDLP } from "@/content/form3/math/chapter-6/flashcards-dlp";
import { mathF3C7NotesBM } from "@/content/form3/math/chapter-7/notes-bm";
import { mathF3C7NotesDLP } from "@/content/form3/math/chapter-7/notes-dlp";
import { mathF3C7MindMapBM } from "@/content/form3/math/chapter-7/mindmap-bm";
import { mathF3C7MindMapDLP } from "@/content/form3/math/chapter-7/mindmap-dlp";
import { mathF3C7QuizzesBM } from "@/content/form3/math/chapter-7/quizzes-bm";
import { mathF3C7QuizzesDLP } from "@/content/form3/math/chapter-7/quizzes-dlp";
import { mathF3C7FlashcardsBM } from "@/content/form3/math/chapter-7/flashcards-bm";
import { mathF3C7FlashcardsDLP } from "@/content/form3/math/chapter-7/flashcards-dlp";
import { mathF3C8NotesBM } from "@/content/form3/math/chapter-8/notes-bm";
import { mathF3C8NotesDLP } from "@/content/form3/math/chapter-8/notes-dlp";
import { mathF3C8MindMapBM } from "@/content/form3/math/chapter-8/mindmap-bm";
import { mathF3C8MindMapDLP } from "@/content/form3/math/chapter-8/mindmap-dlp";
import { mathF3C8QuizzesBM } from "@/content/form3/math/chapter-8/quizzes-bm";
import { mathF3C8QuizzesDLP } from "@/content/form3/math/chapter-8/quizzes-dlp";
import { mathF3C8FlashcardsBM } from "@/content/form3/math/chapter-8/flashcards-bm";
import { mathF3C8FlashcardsDLP } from "@/content/form3/math/chapter-8/flashcards-dlp";
import { mathF3C9NotesBM } from "@/content/form3/math/chapter-9/notes-bm";
import { mathF3C9NotesDLP } from "@/content/form3/math/chapter-9/notes-dlp";
import { mathF3C9MindMapBM } from "@/content/form3/math/chapter-9/mindmap-bm";
import { mathF3C9MindMapDLP } from "@/content/form3/math/chapter-9/mindmap-dlp";
import { mathF3C9QuizzesBM } from "@/content/form3/math/chapter-9/quizzes-bm";
import { mathF3C9QuizzesDLP } from "@/content/form3/math/chapter-9/quizzes-dlp";
import { mathF3C9FlashcardsBM } from "@/content/form3/math/chapter-9/flashcards-bm";
import { mathF3C9FlashcardsDLP } from "@/content/form3/math/chapter-9/flashcards-dlp";


function englishFlashcardsFor(chapterKey: string, form: "Form 1" | "Form 2" = "Form 1") {
  return allFlashcards.filter((f) => f.subjectId === "english" && f.chapter === chapterKey && f.form === form);
}

function englishFlashcardsForF2(chapterKey: string) {
  if (chapterKey === "Chapter 1") return ENGLISH_FLASHCARD_DECK_CARDS_F2["f2-grammar-language"];
  if (chapterKey === "Chapter 2") return ENGLISH_FLASHCARD_DECK_CARDS_F2["f2-writing-techniques"];
  return [];
}

function englishFlashcardsForF3(chapterKey: string) {
  if (chapterKey === "Chapter 1") return ENGLISH_FLASHCARD_DECK_CARDS_F3["f3-paper-1"];
  if (chapterKey === "Chapter 2") return ENGLISH_FLASHCARD_DECK_CARDS_F3["f3-paper-2"];
  return [];
}

function bmFlashcardsFor(chapterKey: string, form: "Form 1" | "Form 2" = "Form 1") {
  return allFlashcards.filter((f) => f.subjectId === "bm" && f.chapter === chapterKey && f.form === form);
}
function englishQuizzesFor(chapterKey: string, form: "Form 1" | "Form 2" = "Form 1") {
  return allQuizzes.filter((q) => q.subjectId === "english" && q.chapter === chapterKey && q.form === form);
}

function englishQuizzesForF2(chapterKey: string) {
  if (chapterKey === "Chapter 1") return ENGLISH_QUIZ_QUESTIONS_F2["objective-a"];
  if (chapterKey === "Chapter 2") return ENGLISH_QUIZ_QUESTIONS_F2["objective-b"];
  return [];
}

function sejarahFlashcardsFor(chapterNum: number) {
  return allFlashcards.filter(
    (f) => f.subjectId === "sejarah" && sejarahChapterFromId(f.id) === chapterNum,
  );
}
function sejarahQuizzesFor(chapterNum: number) {
  return allQuizzes.filter(
    (q) => q.subjectId === "sejarah" && sejarahChapterFromId(q.id) === chapterNum,
  );
}

function sejarah(
  num: number,
  title: string,
  mindMapData: MindNode,
  mindMapTitle: string,
): ChapterContent {
  const chapterKey = `Chapter ${num}`;
  const id = `sejarah-f1-c${num}`;
  const video = getEducationalVideo(id);
  return {
    id,
    subjectId: "sejarah",
    form: "Form 1",
    chapterKey,
    title,
    ...(video ? { video } : {}),
    mindMap: { data: mindMapData, title: mindMapTitle },
    flashcards: sejarahFlashcardsFor(num),
    quiz: sejarahQuizzesFor(num),
    subtopics: getSejarahF1Subtopics(chapterKey),
  };
}

const GEOGRAPHY_F1_CHAPTER_TITLES: Record<number, string> = {
  1: "Arah",
  2: "Kedudukan",
  3: "Peta Lakar",
  4: "Lakaran Peta Malaysia",
  5: "Bumi",
  6: "Bentuk Muka Bumi",
  7: "Saliran",
  8: "Penduduk di Malaysia",
  9: "Petempatan di Malaysia",
  10: "Bentuk Muka Bumi dan Saliran di Asia Tenggara",
  11: "Penduduk dan Petempatan di Asia Tenggara",
  12: "Sumber Air",
  13: "Sisa Domestik",
};

function geographyFlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter((f) => f.subjectId === "geography" && f.chapter === chapterKey);
}

function geographyQuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter((q) => q.subjectId === "geography" && q.chapter === chapterKey);
}

function geographyF2FlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter(
    (f) => f.subjectId === "geography" && f.form === "Form 2" && f.chapter === chapterKey,
  );
}

function geographyF2QuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter(
    (q) => q.subjectId === "geography" && q.form === "Form 2" && q.chapter === chapterKey,
  );
}

function geographyF3FlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter(
    (f) => f.subjectId === "geography" && f.form === "Form 3" && f.chapter === chapterKey,
  );
}

function geographyF3QuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter(
    (q) => q.subjectId === "geography" && q.form === "Form 3" && q.chapter === chapterKey,
  );
}

function sejarahF2FlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter(
    (f) => f.subjectId === "sejarah" && f.form === "Form 2" && f.chapter === chapterKey,
  );
}

function sejarahF2QuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter(
    (q) => q.subjectId === "sejarah" && q.form === "Form 2" && q.chapter === chapterKey,
  );
}

function sejarahF3FlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter(
    (f) => f.subjectId === "sejarah" && f.form === "Form 3" && f.chapter === chapterKey,
  );
}

function sejarahF3QuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter(
    (q) => q.subjectId === "sejarah" && q.form === "Form 3" && q.chapter === chapterKey,
  );
}

function geography(
  chapterNum: number,
  mindMapData?: MindNode,
  mindMapTitle?: string,
): ChapterContent {
  const chapterKey = `Chapter ${chapterNum}`;
  const id = `geography-f1-c${chapterNum}`;
  const video = getEducationalVideo(id);
  return {
    id,
    subjectId: "geography",
    form: "Form 1",
    chapterKey,
    title: GEOGRAPHY_F1_CHAPTER_TITLES[chapterNum],
    ...(video ? { video } : {}),
    ...(mindMapData && mindMapTitle ? { mindMap: { data: mindMapData, title: mindMapTitle } } : {}),
    flashcards: geographyFlashcardsFor(chapterNum),
    quiz: geographyQuizzesFor(chapterNum),
    subtopics: getGeographyF1Subtopics(chapterKey),
  };
}
export const chapters: ChapterContent[] = [
  ...scienceF3ChapterContent,
  // Sejarah Form 1
  { ...sejarah(1, "Mengenali Sejarah", mengenaliSejarahMindMap, "Mengenali Sejarah"), sejChapter1Data: sej1Content },
  { ...sejarah(2, "Zaman Air Batu", zamanAirBatuMindMap, "Zaman Air Batu"), sejChapter2Data: sej2Content },
  { ...sejarah(3, "Zaman Prasejarah", zamanPrasejarahMindMap, "Zaman Prasejarah"), sejChapter3Data: sej3Content },
  { ...sejarah(4, "Mengenali Tamadun", mengenaliTamadunMindMap, "Mengenali Tamadun"), sejChapter4Data: sej4Content },
  { ...sejarah(5, "Tamadun Awal Dunia", tamadunAwalDuniaMindMap, "Tamadun Awal Dunia"), sejChapter5Data: sej5Content },
  {
    ...sejarah(
      6,
      "Tamadun Yunani dan Rom",
      peningkatanTamadunYunaniRomMindMap,
      "Peningkatan Tamadun Yunani dan Rom",
    ),
    sejChapter6Data: sej6Content,
  },
  {
    ...sejarah(
      7,
      "Tamadun India dan China",
      tamadunIndiaChinaMindMap,
      "Tamadun India dan China",
    ),
    sejChapter7Data: sej7Content,
  },
  {
    ...sejarah(
      8,
      "Tamadun Islam",
      tamadunIslamSumbanganMindMap,
      "Tamadun Islam dan Sumbangannya",
    ),
    sejChapter8Data: sej8Content,
  },

  // Sejarah Form 2
  {
    id: "sejarah-f2-c1",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Kerajaan Alam Melayu",
    sej2Chapter1Data: sej2Ch1Content,
    mindMap: { data: sejarahF2C1MindMap, title: "Kerajaan Alam Melayu yang Masyhur" },
    flashcards: sejarahF2FlashcardsFor(1),
    quiz: sejarahF2QuizzesFor(1),
  },
  {
    id: "sejarah-f2-c2",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Sistem Pemerintahan dan Kegiatan Ekonomi",
    sej2Chapter2Data: sej2Ch2Content,
    mindMap: {
      data: sejarahF2C2MindMap,
      title: "Sistem Pemerintahan dan Ekonomi Kerajaan Alam Melayu",
    },
    flashcards: sejarahF2FlashcardsFor(2),
    quiz: sejarahF2QuizzesFor(2),
  },
  {
    id: "sejarah-f2-c3",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Sosiobudaya Masyarakat Kerajaan Alam Melayu",
    sej2Chapter3Data: sej2Ch3Content,
    mindMap: { data: sejarahF2C3MindMap, title: "Sosiobudaya Kerajaan Alam Melayu" },
    flashcards: sejarahF2FlashcardsFor(3),
    quiz: sejarahF2QuizzesFor(3),
  },
  {
    id: "sejarah-f2-c4",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Agama, Kepercayaan dan Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
    sej2Chapter4Data: sej2Ch4Content,
    mindMap: {
      data: sejarahF2C4MindMap,
      title: "Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
    },
    flashcards: sejarahF2FlashcardsFor(4),
    quiz: sejarahF2QuizzesFor(4),
  },
  {
    id: "sejarah-f2-c5",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Kesultanan Melayu Melaka",
    notes: sejarahF2C5Notes,
    mindMap: { data: sejarahF2C5MindMap, title: "Kesultanan Melayu Melaka" },
    flashcards: sejarahF2FlashcardsFor(5),
    quiz: sejarahF2QuizzesFor(5),
  },
  {
    id: "sejarah-f2-c6",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Kesultanan Johor Riau",
    notes: sejarahF2C6Notes,
    mindMap: { data: sejarahF2C6MindMap, title: "Kesultanan Johor Riau" },
    flashcards: sejarahF2FlashcardsFor(6),
    quiz: sejarahF2QuizzesFor(6),
  },
  {
    id: "sejarah-f2-c7",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Kesultanan Melayu Pahang, Perak, Terengganu dan Selangor",
    notes: sejarahF2C7Notes,
    flashcards: sejarahF2FlashcardsFor(7),
    quiz: sejarahF2QuizzesFor(7),
  },
  {
    id: "sejarah-f2-c8",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    notes: sejarahF2C8Notes,
    flashcards: sejarahF2FlashcardsFor(8),
    quiz: sejarahF2QuizzesFor(8),
  },
  {
    id: "sejarah-f2-c9",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Warisan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    notes: sejarahF2C9Notes,
    flashcards: sejarahF2FlashcardsFor(9),
    quiz: sejarahF2QuizzesFor(9),
  },
  {
    id: "sejarah-f2-c10",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Sarawak dan Sabah",
    notes: sejarahF2C10Notes,
    flashcards: sejarahF2FlashcardsFor(10),
    quiz: sejarahF2QuizzesFor(10),
  },

  // Sejarah Form 3
  {
    id: "sejarah-f3-c1",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 1",
    title: "Kedatangan Kuasa Barat",
    notes: sejarahF3C1Notes,
    mindMap: { data: sejarahF3C1MindMap, title: "Kedatangan Kuasa Barat" },
    flashcards: sejarahF3FlashcardsFor(1),
    quiz: sejarahF3QuizzesFor(1),
  },
  {
    id: "sejarah-f3-c2",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 2",
    title: "Pentadbiran Negeri-negeri Selat",
    notes: sejarahF3C2Notes,
    mindMap: { data: sejarahF3C2MindMap, title: "Pentadbiran Negeri-negeri Selat" },
    flashcards: sejarahF3FlashcardsFor(2),
    quiz: sejarahF3QuizzesFor(2),
  },
  {
    id: "sejarah-f3-c3",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 3",
    title: "Pentadbiran Negeri-negeri Melayu Bersekutu",
    notes: sejarahF3C3Notes,
    mindMap: { data: sejarahF3C3MindMap, title: "Pentadbiran Negeri-negeri Melayu Bersekutu" },
    flashcards: sejarahF3FlashcardsFor(3),
    quiz: sejarahF3QuizzesFor(3),
  },
  {
    id: "sejarah-f3-c4",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 4",
    title: "Pentadbiran Negeri-negeri Melayu Tidak Bersekutu",
    notes: sejarahF3C4Notes,
    mindMap: { data: sejarahF3C4MindMap, title: "Pentadbiran Negeri-negeri Melayu Tidak Bersekutu" },
    flashcards: sejarahF3FlashcardsFor(4),
    quiz: sejarahF3QuizzesFor(4),
  },
  {
    id: "sejarah-f3-c5",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 5",
    title: "Pentadbiran Barat di Sarawak dan Sabah",
    notes: sejarahF3C5Notes,
    mindMap: { data: sejarahF3C5MindMap, title: "Pentadbiran Barat di Sarawak dan Sabah" },
    flashcards: sejarahF3FlashcardsFor(5),
    quiz: sejarahF3QuizzesFor(5),
  },
  {
    id: "sejarah-f3-c6",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 6",
    title: "Kesan Pentadbiran Barat terhadap Ekonomi dan Sosial",
    notes: sejarahF3C6Notes,
    mindMap: { data: sejarahF3C6MindMap, title: "Kesan Pentadbiran Barat terhadap Ekonomi dan Sosial" },
    flashcards: sejarahF3FlashcardsFor(6),
    quiz: sejarahF3QuizzesFor(6),
  },
  {
    id: "sejarah-f3-c7",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 7",
    title: "Penentangan Masyarakat Tempatan",
    notes: sejarahF3C7Notes,
    mindMap: { data: sejarahF3C7MindMap, title: "Penentangan Masyarakat Tempatan" },
    flashcards: sejarahF3FlashcardsFor(7),
    quiz: sejarahF3QuizzesFor(7),
  },
  {
    id: "sejarah-f3-c8",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter 8",
    title: "Kebijaksanaan Raja dan Pembesar Melayu Menangani Cabaran Barat",
    notes: sejarahF3C8Notes,
    mindMap: { data: sejarahF3C8MindMap, title: "Kebijaksanaan Raja dan Pembesar Melayu Menangani Cabaran Barat" },
    flashcards: sejarahF3FlashcardsFor(8),
    quiz: sejarahF3QuizzesFor(8),
  },

  // Geography Form 1
  { ...geography(1, geoF1C1MindMap, "Arah"), geoChapter1Data: geo1Content },
  { ...geography(2, geoF1C2MindMap, "Kedudukan"), geoChapter2Data: geo2Content },
  { ...geography(3, geoF1C3MindMap, "Peta Lakar"), geoChapter3Data: geo3Content },
  { ...geography(4, geoF1C4MindMap, "Lakaran Peta Malaysia"), geoChapter4Data: geo4Content },
  { ...geography(5, geoF1C5MindMap, "Bumi"), geoChapter5Data: geo5Content },
  { ...geography(6, geoF1C6MindMap, "Bentuk Muka Bumi"), geoChapter6Data: geo6Content },
  { ...geography(7, geoF1C7MindMap, "Saliran"), geoChapter7Data: geo7Content },
  { ...geography(8, geoF1C8MindMap, "Penduduk di Malaysia"), geoChapter8Data: geo8Content },
  { ...geography(9, geoF1C9MindMap, "Petempatan di Malaysia"), geoChapter9Data: geo9Content },
  { ...geography(10, geoF1C10MindMap, "Bentuk Muka Bumi dan Saliran di Asia Tenggara"), geoChapter10Data: geo10Content },
  { ...geography(11, geoF1C11MindMap, "Penduduk dan Petempatan di Asia Tenggara"), geoChapter11Data: geo11Content },
  { ...geography(12, geoF1C12MindMap, "Sumber Air"), geoChapter12Data: geo12Content },
  { ...geography(13, geoF1C13MindMap, "Sisa Domestik"), geoChapter13Data: geo13Content },

  // Geography Form 2
  {
    id: "geography-f2-c1",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Skala dan Jarak",
    notes: geographyF2C1Notes,
    mindMap: { data: geoF2C1MindMap, title: "Skala dan Jarak" },
    flashcards: geographyF2FlashcardsFor(1),
    quiz: geographyF2QuizzesFor(1),
  },
  {
    id: "geography-f2-c2",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Peta Topografi",
    notes: geographyF2C2Notes,
    mindMap: { data: geoF2C2MindMap, title: "Peta Topografi" },
    flashcards: geographyF2FlashcardsFor(2),
    quiz: geographyF2QuizzesFor(2),
  },
  {
    id: "geography-f2-c3",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Pengaruh Pergerakan Bumi terhadap Cuaca dan Iklim",
    notes: geographyF2C3Notes,
    mindMap: { data: geoF2C3MindMap, title: "Pengaruh Pergerakan Bumi terhadap Cuaca dan Iklim" },
    flashcards: geographyF2FlashcardsFor(3),
    quiz: geographyF2QuizzesFor(3),
  },
  {
    id: "geography-f2-c4",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Cuaca dan Iklim di Malaysia",
    notes: geographyF2C4Notes,
    mindMap: { data: geoF2C4MindMap, title: "Cuaca dan Iklim di Malaysia" },
    flashcards: geographyF2FlashcardsFor(4),
    quiz: geographyF2QuizzesFor(4),
  },
  {
    id: "geography-f2-c5",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Pengangkutan di Malaysia",
    notes: geographyF2C5Notes,
    mindMap: { data: geoF2C5MindMap, title: "Pengangkutan di Malaysia" },
    flashcards: geographyF2FlashcardsFor(5),
    quiz: geographyF2QuizzesFor(5),
  },
  {
    id: "geography-f2-c6",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Telekomunikasi di Malaysia",
    notes: geographyF2C6Notes,
    mindMap: { data: geoF2C6MindMap, title: "Telekomunikasi di Malaysia" },
    flashcards: geographyF2FlashcardsFor(6),
    quiz: geographyF2QuizzesFor(6),
  },
  {
    id: "geography-f2-c7",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Kepelbagaian Iklim dan Pengaruhnya terhadap Kegiatan Manusia di Asia",
    notes: geographyF2C7Notes,
    mindMap: { data: geoF2C7MindMap, title: "Kepelbagaian Iklim di Asia" },
    flashcards: geographyF2FlashcardsFor(7),
    quiz: geographyF2QuizzesFor(7),
  },
  {
    id: "geography-f2-c8",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Jenis dan Kemajuan Pengangkutan di Asia",
    notes: geographyF2C8Notes,
    mindMap: { data: geoF2C8MindMap, title: "Jenis dan Kemajuan Pengangkutan di Asia" },
    flashcards: geographyF2FlashcardsFor(8),
    quiz: geographyF2QuizzesFor(8),
  },
  {
    id: "geography-f2-c9",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Pemanasan Global",
    notes: geographyF2C9Notes,
    mindMap: { data: geoF2C9MindMap, title: "Pemanasan Global" },
    flashcards: geographyF2FlashcardsFor(9),
    quiz: geographyF2QuizzesFor(9),
  },
  {
    id: "geography-f2-c10",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Teknologi Hijau",
    notes: geographyF2C10Notes,
    mindMap: { data: geoF2C10MindMap, title: "Teknologi Hijau" },
    flashcards: geographyF2FlashcardsFor(10),
    quiz: geographyF2QuizzesFor(10),
  },

  // Geography Form 3
  {
    id: "geography-f3-c1",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 1",
    title: "Jadual dan Graf",
    notes: geographyF3C1Notes,
    mindMap: { data: geoF3C1MindMap, title: "Jadual dan Graf" },
    flashcards: geographyF3FlashcardsFor(1),
    quiz: geographyF3QuizzesFor(1),
  },
  {
    id: "geography-f3-c2",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 2",
    title: "Carta Pai",
    notes: geographyF3C2Notes,
    mindMap: { data: geoF3C2MindMap, title: "Carta Pai" },
    flashcards: geographyF3FlashcardsFor(2),
    quiz: geographyF3QuizzesFor(2),
  },
  {
    id: "geography-f3-c3",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 3",
    title: "Pengaruh Persekitaran Fizikal terhadap Kepelbagaian Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar",
    notes: geographyF3C3Notes,
    mindMap: { data: geoF3C3MindMap, title: "Pengaruh Persekitaran Fizikal terhadap Kepelbagaian Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar" },
    flashcards: geographyF3FlashcardsFor(3),
    quiz: geographyF3QuizzesFor(3),
  },
  {
    id: "geography-f3-c4",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 4",
    title: "Tumbuh-tumbuhan Semula Jadi di Malaysia",
    notes: geographyF3C4Notes,
    mindMap: { data: geoF3C4MindMap, title: "Tumbuh-tumbuhan Semula Jadi di Malaysia" },
    flashcards: geographyF3FlashcardsFor(4),
    quiz: geographyF3QuizzesFor(4),
  },
  {
    id: "geography-f3-c5",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 5",
    title: "Hidupan Liar di Malaysia",
    notes: geographyF3C5Notes,
    mindMap: { data: geoF3C5MindMap, title: "Hidupan Liar di Malaysia" },
    flashcards: geographyF3FlashcardsFor(5),
    quiz: geographyF3QuizzesFor(5),
  },
  {
    id: "geography-f3-c6",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 6",
    title: "Sumber Semula Jadi di Malaysia",
    notes: geographyF3C6Notes,
    mindMap: { data: geoF3C6MindMap, title: "Sumber Semula Jadi di Malaysia" },
    flashcards: geographyF3FlashcardsFor(6),
    quiz: geographyF3QuizzesFor(6),
  },
  {
    id: "geography-f3-c7",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 7",
    title: "Kegiatan Ekonomi di Malaysia",
    notes: geographyF3C7Notes,
    mindMap: { data: geoF3C7MindMap, title: "Kegiatan Ekonomi di Malaysia" },
    flashcards: geographyF3FlashcardsFor(7),
    quiz: geographyF3QuizzesFor(7),
  },
  {
    id: "geography-f3-c8",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 8",
    title: "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
    notes: geographyF3C8Notes,
    mindMap: { data: geoF3C8MindMap, title: "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia" },
    flashcards: geographyF3FlashcardsFor(8),
    quiz: geographyF3QuizzesFor(8),
  },
  {
    id: "geography-f3-c9",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 9",
    title: "Sumber Semula Jadi Utama dan Kerjasama Ekonomi di Dunia",
    notes: geographyF3C9Notes,
    mindMap: { data: geoF3C9MindMap, title: "Sumber Semula Jadi Utama dan Kerjasama Ekonomi di Dunia" },
    flashcards: geographyF3FlashcardsFor(9),
    quiz: geographyF3QuizzesFor(9),
  },
  {
    id: "geography-f3-c10",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 10",
    title: "Sumber Hutan",
    notes: geographyF3C10Notes,
    mindMap: { data: geoF3C10MindMap, title: "Sumber Hutan" },
    flashcards: geographyF3FlashcardsFor(10),
    quiz: geographyF3QuizzesFor(10),
  },
  {
    id: "geography-f3-c11",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 11",
    title: "Kitar Semula",
    notes: geographyF3C11Notes,
    mindMap: { data: geoF3C11MindMap, title: "Kitar Semula" },
    flashcards: geographyF3FlashcardsFor(11),
    quiz: geographyF3QuizzesFor(11),
  },
  {
    id: "geography-f3-c12",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter 12",
    title: "Panduan Kerja Lapangan",
    notes: geographyF3C12Notes,
    mindMap: { data: geoF3C12MindMap, title: "Panduan Kerja Lapangan" },
    flashcards: geographyF3FlashcardsFor(12),
    quiz: geographyF3QuizzesFor(12),
  },

  // Mathematics Form 1
  {
    id: "math-f1-c1-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Nombor Nisbah",
    lang: "bm",
    mindMap: { data: mathF1C1MindMapBM, title: "Nombor Nisbah" },
    notes: mathF1C1NotesBM,
  },
  {
    id: "math-f1-c1-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Rational Numbers",
    lang: "dlp",
    mindMap: { data: mathF1C1MindMapDLP, title: "Rational Numbers" },
    notes: mathF1C1NotesDLP,
  },
  {
    id: "math-f1-c2-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Faktor dan Gandaan",
    lang: "bm",
    mindMap: { data: mathF1C2MindMapBM, title: "Faktor dan Gandaan" },
    notes: mathF1C2NotesBM,
  },
  {
    id: "math-f1-c2-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Factors and Multiples",
    lang: "dlp",
    mindMap: { data: mathF1C2MindMapDLP, title: "Factors and Multiples" },
    notes: mathF1C2NotesDLP,
  },
  {
    id: "math-f1-c3-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga",
    lang: "bm",
    mindMap: { data: mathF1C3MindMapBM, title: "Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga & Punca Kuasa Tiga" },
    notes: mathF1C3NotesBM,
  },
  {
    id: "math-f1-c3-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Squares, Square Roots, Cubes and Cube Roots",
    lang: "dlp",
    mindMap: { data: mathF1C3MindMapDLP, title: "Squares, Square Roots, Cubes and Cube Roots" },
    notes: mathF1C3NotesDLP,
  },
  {
    id: "math-f1-c4-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Nisbah, Kadar dan Kadaran",
    lang: "bm",
    mindMap: { data: mathF1C4MindMapBM, title: "Nisbah, Kadar dan Kadaran" },
    notes: mathF1C4NotesBM,
  },
  {
    id: "math-f1-c4-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Ratio, Rate and Proportion",
    lang: "dlp",
    mindMap: { data: mathF1C4MindMapDLP, title: "Ratio, Rate and Proportion" },
    notes: mathF1C4NotesDLP,
  },
  {
    id: "math-f1-c5-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Ungkapan Algebra",
    lang: "bm",
    mindMap: { data: mathF1C5MindMapBM, title: "Ungkapan Algebra" },
    notes: mathF1C5NotesBM,
  },
  {
    id: "math-f1-c5-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Algebraic Expressions",
    lang: "dlp",
    mindMap: { data: mathF1C5MindMapDLP, title: "Algebraic Expressions" },
    notes: mathF1C5NotesDLP,
  },
  {
    id: "math-f1-c6-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Persamaan Linear",
    lang: "bm",
    mindMap: { data: mathF1C6MindMapBM, title: "Persamaan Linear" },
    notes: mathF1C6NotesBM,
  },
  {
    id: "math-f1-c6-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Linear Equations",
    lang: "dlp",
    mindMap: { data: mathF1C6MindMapDLP, title: "Linear Equations" },
    notes: mathF1C6NotesDLP,
  },
  {
    id: "math-f1-c7-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Ketaksamaan Linear",
    lang: "bm",
    mindMap: { data: mathF1C7MindMapBM, title: "Ketaksamaan Linear" },
    notes: mathF1C7NotesBM,
  },
  {
    id: "math-f1-c7-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Linear Inequalities",
    lang: "dlp",
    mindMap: { data: mathF1C7MindMapDLP, title: "Linear Inequalities" },
    notes: mathF1C7NotesDLP,
  },
  {
    id: "math-f1-c8-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Garis dan Sudut",
    lang: "bm",
    mindMap: { data: mathF1C8MindMapBM, title: "Garis dan Sudut" },
    notes: mathF1C8NotesBM,
  },
  {
    id: "math-f1-c8-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Lines and Angles",
    lang: "dlp",
    mindMap: { data: mathF1C8MindMapDLP, title: "Lines and Angles" },
    notes: mathF1C8NotesDLP,
  },
  {
    id: "math-f1-c9-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Poligon Asas",
    lang: "bm",
    mindMap: { data: mathF1C9MindMapBM, title: "Poligon Asas" },
    notes: mathF1C9NotesBM,
  },
  {
    id: "math-f1-c9-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Basic Polygons",
    lang: "dlp",
    mindMap: { data: mathF1C9MindMapDLP, title: "Basic Polygons" },
    notes: mathF1C9NotesDLP,
  },
  {
    id: "math-f1-c10-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 10",
    title: "Perimeter dan Luas",
    lang: "bm",
    mindMap: { data: mathF1C10MindMapBM, title: "Perimeter dan Luas" },
    notes: mathF1C10NotesBM,
  },
  {
    id: "math-f1-c10-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 10",
    title: "Perimeter and Area",
    lang: "dlp",
    mindMap: { data: mathF1C10MindMapDLP, title: "Perimeter and Area" },
    notes: mathF1C10NotesDLP,
  },
  {
    id: "math-f1-c11-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 11",
    title: "Pengenalan Set",
    lang: "bm",
    mindMap: { data: mathF1C11MindMapBM, title: "Pengenalan Set" },
    notes: mathF1C11NotesBM,
  },
  {
    id: "math-f1-c11-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 11",
    title: "Introduction to Sets",
    lang: "dlp",
    mindMap: { data: mathF1C11MindMapDLP, title: "Introduction to Sets" },
    notes: mathF1C11NotesDLP,
  },
  {
    id: "math-f1-c12-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 12",
    title: "Pengendalian Data",
    lang: "bm",
    mindMap: { data: mathF1C12MindMapBM, title: "Pengendalian Data" },
    notes: mathF1C12NotesBM,
  },
  {
    id: "math-f1-c12-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 12",
    title: "Data Handling",
    lang: "dlp",
    mindMap: { data: mathF1C12MindMapDLP, title: "Data Handling" },
    notes: mathF1C12NotesDLP,
  },
  {
    id: "math-f1-c13-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 13",
    title: "Teorem Pythagoras",
    lang: "bm",
    mindMap: { data: mathF1C13MindMapBM, title: "Teorem Pythagoras" },
    notes: mathF1C13NotesBM,
  },
  {
    id: "math-f1-c13-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 13",
    title: "Pythagoras' Theorem",
    lang: "dlp",
    mindMap: { data: mathF1C13MindMapDLP, title: "Pythagoras' Theorem" },
    notes: mathF1C13NotesDLP,
  },

  // Mathematics Form 2
  {
    id: "math-f2-c1-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Corak dan Jujukan",
    lang: "bm",
    mindMap: { data: mathF2C1MindMapBM, title: "Corak dan Jujukan" },
    notes: mathF2C1NotesBM,
    flashcards: mathF2C1FlashcardsBM,
    quiz: mathF2C1QuizzesBM,
  },
  {
    id: "math-f2-c1-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Patterns and Sequences",
    lang: "dlp",
    mindMap: { data: mathF2C1MindMapDLP, title: "Patterns and Sequences" },
    notes: mathF2C1NotesDLP,
    flashcards: mathF2C1FlashcardsDLP,
    quiz: mathF2C1QuizzesDLP,
  },
  {
    id: "math-f2-c2-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Pemfaktoran dan Pecahan Algebra",
    lang: "bm",
    mindMap: { data: mathF2C2MindMapBM, title: "Pemfaktoran dan Pecahan Algebra" },
    notes: mathF2C2NotesBM,
    flashcards: mathF2C2FlashcardsBM,
    quiz: mathF2C2QuizzesBM,
  },
  {
    id: "math-f2-c2-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Factorisation and Algebraic Fractions",
    lang: "dlp",
    mindMap: { data: mathF2C2MindMapDLP, title: "Factorisation and Algebraic Fractions" },
    notes: mathF2C2NotesDLP,
    flashcards: mathF2C2FlashcardsDLP,
    quiz: mathF2C2QuizzesDLP,
  },
  {
    id: "math-f2-c3-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Rumus Algebra",
    lang: "bm",
    mindMap: { data: mathF2C3MindMapBM, title: "Rumus Algebra" },
    notes: mathF2C3NotesBM,
    flashcards: mathF2C3FlashcardsBM,
    quiz: mathF2C3QuizzesBM,
  },
  {
    id: "math-f2-c3-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Algebraic Formulae",
    lang: "dlp",
    mindMap: { data: mathF2C3MindMapDLP, title: "Algebraic Formulae" },
    notes: mathF2C3NotesDLP,
    flashcards: mathF2C3FlashcardsDLP,
    quiz: mathF2C3QuizzesDLP,
  },
  {
    id: "math-f2-c4-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Poligon",
    lang: "bm",
    mindMap: { data: mathF2C4MindMapBM, title: "Poligon" },
    notes: mathF2C4NotesBM,
    flashcards: mathF2C4FlashcardsBM,
    quiz: mathF2C4QuizzesBM,
  },
  {
    id: "math-f2-c4-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Polygons",
    lang: "dlp",
    mindMap: { data: mathF2C4MindMapDLP, title: "Polygons" },
    notes: mathF2C4NotesDLP,
    flashcards: mathF2C4FlashcardsDLP,
    quiz: mathF2C4QuizzesDLP,
  },
  {
    id: "math-f2-c5-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Bulatan",
    lang: "bm",
    mindMap: { data: mathF2C5MindMapBM, title: "Bulatan" },
    notes: mathF2C5NotesBM,
    flashcards: mathF2C5FlashcardsBM,
    quiz: mathF2C5QuizzesBM,
  },
  {
    id: "math-f2-c5-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Circles",
    lang: "dlp",
    mindMap: { data: mathF2C5MindMapDLP, title: "Circles" },
    notes: mathF2C5NotesDLP,
    flashcards: mathF2C5FlashcardsDLP,
    quiz: mathF2C5QuizzesDLP,
  },
  {
    id: "math-f2-c6-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Bentuk Geometri Tiga Dimensi",
    lang: "bm",
    mindMap: { data: mathF2C6MindMapBM, title: "Bentuk Geometri Tiga Dimensi" },
    notes: mathF2C6NotesBM,
    flashcards: mathF2C6FlashcardsBM,
    quiz: mathF2C6QuizzesBM,
  },
  {
    id: "math-f2-c6-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Three-Dimensional Geometrical Shapes",
    lang: "dlp",
    mindMap: { data: mathF2C6MindMapDLP, title: "Three-Dimensional Geometrical Shapes" },
    notes: mathF2C6NotesDLP,
    flashcards: mathF2C6FlashcardsDLP,
    quiz: mathF2C6QuizzesDLP,
  },
  {
    id: "math-f2-c7-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Koordinat",
    lang: "bm",
    mindMap: { data: mathF2C7MindMapBM, title: "Koordinat" },
    notes: mathF2C7NotesBM,
    flashcards: mathF2C7FlashcardsBM,
    quiz: mathF2C7QuizzesBM,
  },
  {
    id: "math-f2-c7-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Coordinates",
    lang: "dlp",
    mindMap: { data: mathF2C7MindMapDLP, title: "Coordinates" },
    notes: mathF2C7NotesDLP,
    flashcards: mathF2C7FlashcardsDLP,
    quiz: mathF2C7QuizzesDLP,
  },
  {
    id: "math-f2-c8-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Graf Fungsi",
    lang: "bm",
    mindMap: { data: mathF2C8MindMapBM, title: "Graf Fungsi" },
    notes: mathF2C8NotesBM,
    flashcards: mathF2C8FlashcardsBM,
    quiz: mathF2C8QuizzesBM,
  },
  {
    id: "math-f2-c8-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Graphs of Functions",
    lang: "dlp",
    mindMap: { data: mathF2C8MindMapDLP, title: "Graphs of Functions" },
    notes: mathF2C8NotesDLP,
    flashcards: mathF2C8FlashcardsDLP,
    quiz: mathF2C8QuizzesDLP,
  },
  {
    id: "math-f2-c9-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Laju dan Pecutan",
    lang: "bm",
    mindMap: { data: mathF2C9MindMapBM, title: "Laju dan Pecutan" },
    notes: mathF2C9NotesBM,
    flashcards: mathF2C9FlashcardsBM,
    quiz: mathF2C9QuizzesBM,
  },
  {
    id: "math-f2-c9-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Speed and Acceleration",
    lang: "dlp",
    mindMap: { data: mathF2C9MindMapDLP, title: "Speed and Acceleration" },
    notes: mathF2C9NotesDLP,
    flashcards: mathF2C9FlashcardsDLP,
    quiz: mathF2C9QuizzesDLP,
  },
  {
    id: "math-f2-c10-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Kecerunan Garis Lurus",
    lang: "bm",
    mindMap: { data: mathF2C10MindMapBM, title: "Kecerunan Garis Lurus" },
    notes: mathF2C10NotesBM,
    flashcards: mathF2C10FlashcardsBM,
    quiz: mathF2C10QuizzesBM,
  },
  {
    id: "math-f2-c10-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Gradient of a Straight Line",
    lang: "dlp",
    mindMap: { data: mathF2C10MindMapDLP, title: "Gradient of a Straight Line" },
    notes: mathF2C10NotesDLP,
    flashcards: mathF2C10FlashcardsDLP,
    quiz: mathF2C10QuizzesDLP,
  },
  {
    id: "math-f2-c11-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 11",
    title: "Transformasi Isometri",
    lang: "bm",
    mindMap: { data: mathF2C11MindMapBM, title: "Transformasi Isometri" },
    notes: mathF2C11NotesBM,
    flashcards: mathF2C11FlashcardsBM,
    quiz: mathF2C11QuizzesBM,
  },
  {
    id: "math-f2-c11-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 11",
    title: "Isometric Transformations",
    lang: "dlp",
    mindMap: { data: mathF2C11MindMapDLP, title: "Isometric Transformations" },
    notes: mathF2C11NotesDLP,
    flashcards: mathF2C11FlashcardsDLP,
    quiz: mathF2C11QuizzesDLP,
  },
  {
    id: "math-f2-c12-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 12",
    title: "Sukatan Kecenderungan Memusat",
    lang: "bm",
    mindMap: { data: mathF2C12MindMapBM, title: "Sukatan Kecenderungan Memusat" },
    notes: mathF2C12NotesBM,
    flashcards: mathF2C12FlashcardsBM,
    quiz: mathF2C12QuizzesBM,
  },
  {
    id: "math-f2-c12-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 12",
    title: "Measures of Central Tendencies",
    lang: "dlp",
    mindMap: { data: mathF2C12MindMapDLP, title: "Measures of Central Tendencies" },
    notes: mathF2C12NotesDLP,
    flashcards: mathF2C12FlashcardsDLP,
    quiz: mathF2C12QuizzesDLP,
  },
  {
    id: "math-f2-c13-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 13",
    title: "Kebarangkalian Mudah",
    lang: "bm",
    mindMap: { data: mathF2C13MindMapBM, title: "Kebarangkalian Mudah" },
    notes: mathF2C13NotesBM,
    flashcards: mathF2C13FlashcardsBM,
    quiz: mathF2C13QuizzesBM,
  },
  {
    id: "math-f2-c13-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter 13",
    title: "Simple Probability",
    lang: "dlp",
    mindMap: { data: mathF2C13MindMapDLP, title: "Simple Probability" },
    notes: mathF2C13NotesDLP,
    flashcards: mathF2C13FlashcardsDLP,
    quiz: mathF2C13QuizzesDLP,
  },

  // Mathematics Form 3
  {
    id: "math-f3-c1-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 1",
    title: "Indeks",
    lang: "bm",
    mindMap: { data: mathF3C1MindMapBM, title: "Indeks" },
    notes: mathF3C1NotesBM,
    flashcards: mathF3C1FlashcardsBM,
    quiz: mathF3C1QuizzesBM,
  },
  {
    id: "math-f3-c1-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 1",
    title: "Index",
    lang: "dlp",
    mindMap: { data: mathF3C1MindMapDLP, title: "Index" },
    notes: mathF3C1NotesDLP,
    flashcards: mathF3C1FlashcardsDLP,
    quiz: mathF3C1QuizzesDLP,
  },
  {
    id: "math-f3-c2-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 2",
    title: "Bentuk Piawai",
    lang: "bm",
    mindMap: { data: mathF3C2MindMapBM, title: "Bentuk Piawai" },
    notes: mathF3C2NotesBM,
    flashcards: mathF3C2FlashcardsBM,
    quiz: mathF3C2QuizzesBM,
  },
  {
    id: "math-f3-c2-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 2",
    title: "Standard Form",
    lang: "dlp",
    mindMap: { data: mathF3C2MindMapDLP, title: "Standard Form" },
    notes: mathF3C2NotesDLP,
    flashcards: mathF3C2FlashcardsDLP,
    quiz: mathF3C2QuizzesDLP,
  },
  {
    id: "math-f3-c3-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 3",
    title: "Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang",
    lang: "bm",
    mindMap: { data: mathF3C3MindMapBM, title: "Simpanan, Pelaburan, Kredit dan Hutang" },
    notes: mathF3C3NotesBM,
    flashcards: mathF3C3FlashcardsBM,
    quiz: mathF3C3QuizzesBM,
  },
  {
    id: "math-f3-c3-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 3",
    title: "Consumer Mathematics: Savings and Investment, Credit and Debt",
    lang: "dlp",
    mindMap: { data: mathF3C3MindMapDLP, title: "Savings, Investment, Credit and Debt" },
    notes: mathF3C3NotesDLP,
    flashcards: mathF3C3FlashcardsDLP,
    quiz: mathF3C3QuizzesDLP,
  },
  {
    id: "math-f3-c4-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 4",
    title: "Lukisan Berskala",
    lang: "bm",
    mindMap: { data: mathF3C4MindMapBM, title: "Lukisan Berskala" },
    notes: mathF3C4NotesBM,
    flashcards: mathF3C4FlashcardsBM,
    quiz: mathF3C4QuizzesBM,
  },
  {
    id: "math-f3-c4-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 4",
    title: "Scale Drawings",
    lang: "dlp",
    mindMap: { data: mathF3C4MindMapDLP, title: "Scale Drawings" },
    notes: mathF3C4NotesDLP,
    flashcards: mathF3C4FlashcardsDLP,
    quiz: mathF3C4QuizzesDLP,
  },
  {
    id: "math-f3-c5-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 5",
    title: "Nisbah Trigonometri",
    lang: "bm",
    mindMap: { data: mathF3C5MindMapBM, title: "Nisbah Trigonometri" },
    notes: mathF3C5NotesBM,
    flashcards: mathF3C5FlashcardsBM,
    quiz: mathF3C5QuizzesBM,
  },
  {
    id: "math-f3-c5-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 5",
    title: "Trigonometric Ratios",
    lang: "dlp",
    mindMap: { data: mathF3C5MindMapDLP, title: "Trigonometric Ratios" },
    notes: mathF3C5NotesDLP,
    flashcards: mathF3C5FlashcardsDLP,
    quiz: mathF3C5QuizzesDLP,
  },
  {
    id: "math-f3-c6-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 6",
    title: "Sudut dan Tangen bagi Bulatan",
    lang: "bm",
    mindMap: { data: mathF3C6MindMapBM, title: "Sudut dan Tangen bagi Bulatan" },
    notes: mathF3C6NotesBM,
    flashcards: mathF3C6FlashcardsBM,
    quiz: mathF3C6QuizzesBM,
  },
  {
    id: "math-f3-c6-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 6",
    title: "Angles and Tangents of Circles",
    lang: "dlp",
    mindMap: { data: mathF3C6MindMapDLP, title: "Angles and Tangents of Circles" },
    notes: mathF3C6NotesDLP,
    flashcards: mathF3C6FlashcardsDLP,
    quiz: mathF3C6QuizzesDLP,
  },
  {
    id: "math-f3-c7-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 7",
    title: "Pelan dan Dongakan",
    lang: "bm",
    mindMap: { data: mathF3C7MindMapBM, title: "Pelan dan Dongakan" },
    notes: mathF3C7NotesBM,
    flashcards: mathF3C7FlashcardsBM,
    quiz: mathF3C7QuizzesBM,
  },
  {
    id: "math-f3-c7-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 7",
    title: "Plan and Elevation",
    lang: "dlp",
    mindMap: { data: mathF3C7MindMapDLP, title: "Plan and Elevation" },
    notes: mathF3C7NotesDLP,
    flashcards: mathF3C7FlashcardsDLP,
    quiz: mathF3C7QuizzesDLP,
  },
  {
    id: "math-f3-c8-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 8",
    title: "Lokus dalam Dua Dimensi",
    lang: "bm",
    mindMap: { data: mathF3C8MindMapBM, title: "Lokus dalam Dua Dimensi" },
    notes: mathF3C8NotesBM,
    flashcards: mathF3C8FlashcardsBM,
    quiz: mathF3C8QuizzesBM,
  },
  {
    id: "math-f3-c8-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 8",
    title: "Locus in Two Dimensions",
    lang: "dlp",
    mindMap: { data: mathF3C8MindMapDLP, title: "Locus in Two Dimensions" },
    notes: mathF3C8NotesDLP,
    flashcards: mathF3C8FlashcardsDLP,
    quiz: mathF3C8QuizzesDLP,
  },
  {
    id: "math-f3-c9-bm",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 9",
    title: "Garis Lurus",
    lang: "bm",
    mindMap: { data: mathF3C9MindMapBM, title: "Garis Lurus" },
    notes: mathF3C9NotesBM,
    flashcards: mathF3C9FlashcardsBM,
    quiz: mathF3C9QuizzesBM,
  },
  {
    id: "math-f3-c9-dlp",
    subjectId: "math",
    form: "Form 3",
    chapterKey: "Chapter 9",
    title: "Straight Lines",
    lang: "dlp",
    mindMap: { data: mathF3C9MindMapDLP, title: "Straight Lines" },
    notes: mathF3C9NotesDLP,
    flashcards: mathF3C9FlashcardsDLP,
    quiz: mathF3C9QuizzesDLP,
  },

  // Science Form 1 (bilingual)
  {
    id: "science-f1-c1-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Pengenalan kepada Penyiasatan Saintifik",
    lang: "bm",
    video: getEducationalVideo("science-f1-c1"),
    mindMap: { data: scienceF1C1MindMapBM, title: "Pengenalan kepada Penyiasatan Saintifik" },
    chapter1Data: chapter1Content,
  },
  {
    id: "science-f1-c1-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Introduction to Scientific Investigation",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c1"),
    mindMap: { data: scienceF1C1MindMapDLP, title: "Introduction to Scientific Investigation" },
    chapter1Data: chapter1Content,
  },
  {
    id: "science-f1-c2-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Sel sebagai Unit Asas Kehidupan",
    lang: "bm",
    video: getEducationalVideo("science-f1-c2"),
    mindMap: { data: scienceF1C2MindMapBM, title: "Sel sebagai Unit Asas Hidupan" },
    notes: scienceF1C2NotesBM,
    chapter2Data: chapter2Content,
  },
  {
    id: "science-f1-c2-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Cell as the Basic Unit of Life",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c2"),
    mindMap: { data: scienceF1C2MindMapDLP, title: "Cells as the Basic Unit of Life" },
    notes: scienceF1C2NotesDLP,
    chapter2Data: chapter2Content,
  },
  {
    id: "science-f1-c3-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Koordinasi dan Tindak Balas",
    lang: "bm",
    video: getEducationalVideo("science-f1-c3"),
    mindMap: { data: scienceF1C3MindMapBM, title: "Homeostasis dalam Benda Hidup" },
    notes: scienceF1C3NotesBM,
    chapter3Data: chapter3Content,
  },
  {
    id: "science-f1-c3-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Coordination and Response",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c3"),
    mindMap: { data: scienceF1C3MindMapDLP, title: "Homeostasis" },
    notes: scienceF1C3NotesDLP,
    chapter3Data: chapter3Content,
  },
  {
    id: "science-f1-c4-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Pembiakan",
    lang: "bm",
    video: getEducationalVideo("science-f1-c4"),
    mindMap: { data: scienceF1C4MindMapBM, title: "Pembiakan" },
    notes: scienceF1C4NotesBM,
    chapter4Data: chapter4Content,
  },
  {
    id: "science-f1-c4-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Reproduction",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c4"),
    mindMap: { data: scienceF1C4MindMapDLP, title: "Reproduction" },
    notes: scienceF1C4NotesDLP,
    chapter4Data: chapter4Content,
  },
  {
    id: "science-f1-c5-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Jirim",
    lang: "bm",
    video: getEducationalVideo("science-f1-c5"),
    mindMap: { data: scienceF1C5MindMapBM, title: "Jirim" },
    notes: scienceF1C5NotesBM,
    chapter5Data: chapter5Content,
  },
  {
    id: "science-f1-c5-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Matter",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c5"),
    mindMap: { data: scienceF1C5MindMapDLP, title: "Matter" },
    notes: scienceF1C5NotesDLP,
    chapter5Data: chapter5Content,
  },
  {
    id: "science-f1-c6-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Jadual Berkala",
    lang: "bm",
    video: getEducationalVideo("science-f1-c6"),
    mindMap: { data: scienceF1C6MindMapBM, title: "Bab 6: Jadual Berkala" },
    notes: scienceF1C6NotesBM,
    chapter6Data: chapter6Content,
  },
  {
    id: "science-f1-c6-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Periodic Table",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c6"),
    mindMap: { data: scienceF1C6MindMapDLP, title: "Periodic Table" },
    notes: scienceF1C6NotesDLP,
    chapter6Data: chapter6Content,
  },
  {
    id: "science-f1-c7-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Udara",
    lang: "bm",
    video: getEducationalVideo("science-f1-c7"),
    mindMap: { data: scienceF1C7MindMapBM, title: "Bab 7: Udara" },
    notes: scienceF1C7NotesBM,
    bab7Data: bab7Content,
  },
  {
    id: "science-f1-c7-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Air",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c7"),
    mindMap: { data: scienceF1C7MindMapDLP, title: "Air (Chapter 7)" },
    notes: scienceF1C7NotesDLP,
    bab7Data: bab7Content,
  },
  {
    id: "science-f1-c8-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Cahaya dan Optik",
    lang: "bm",
    video: getEducationalVideo("science-f1-c8"),
    mindMap: { data: scienceF1C8MindMapBM, title: "Sains Tingkatan 1 : Bab 8 Cahaya dan Optik" },
    notes: scienceF1C8NotesBM,
    chapter8Data: chapter8Content,
  },
  {
    id: "science-f1-c8-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Light and Optics",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c8"),
    mindMap: { data: scienceF1C8MindMapDLP, title: "Light and Optics" },
    notes: scienceF1C8NotesDLP,
    chapter8Data: chapter8Content,
  },
  {
    id: "science-f1-c9-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Bumi",
    lang: "bm",
    video: getEducationalVideo("science-f1-c9"),
    mindMap: { data: scienceF1C9MindMapBM, title: "Bumi (Earth)" },
    notes: scienceF1C9NotesBM,
    chapter9Data: chapter9Content,
  },
  {
    id: "science-f1-c9-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Earth",
    lang: "dlp",
    video: getEducationalVideo("science-f1-c9"),
    mindMap: { data: scienceF1C9MindMapDLP, title: "Chapter 9: Earth" },
    notes: scienceF1C9NotesDLP,
    chapter9Data: chapter9Content,
  },

  // English Form 1 — Chapter 1 = Paper 1 (Reading & Language Awareness),
  // Chapter 2 = Paper 2 (Writing). Each chapter's mindMap is a single combined
  // tree (see form1/english/mindmaps/paper1.ts, paper2.ts) rather than
  // separate per-topic chapter cards, so English keeps exactly its existing
  // 2-chapter structure.
  {
    id: "english-f1-c1",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Paper 1 - Reading & Language Awareness",
    englishData: englishF1C1Notes,
    flashcards: englishFlashcardsFor("Chapter 1"),
    quiz: englishQuizzesFor("Chapter 1"),
    mindMap: { data: englishF1Paper1MindMap, title: "Paper 1 - Reading & Language Awareness" },
  },
  {
    id: "english-f1-c2",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Paper 2 - Writing",
    englishData: englishF1C2Notes,
    flashcards: englishFlashcardsFor("Chapter 2"),
    quiz: englishQuizzesFor("Chapter 2"),
    mindMap: { data: englishF1Paper2MindMap, title: "Paper 2 - Writing" },
  },

  // English Form 2 — same structure as Form 1. No Form 2-specific
  // flashcards/quiz data exists yet, so englishFlashcardsFor/englishQuizzesFor
  // correctly return an empty array rather than fabricated content.
  {
    id: "english-f2-c1",
    subjectId: "english",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Paper 1 - Reading & Language Awareness",
    englishData: englishF2C1Notes,
    flashcards: englishFlashcardsForF2("Chapter 1"),
    quiz: englishQuizzesForF2("Chapter 1"),
    mindMap: { data: englishF2Paper1MindMap, title: "Paper 1 - Reading & Language Awareness" },
  },
  {
    id: "english-f2-c2",
    subjectId: "english",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Paper 2 - Writing",
    englishData: englishF2C2Notes,
    flashcards: englishFlashcardsForF2("Chapter 2"),
    quiz: englishQuizzesForF2("Chapter 2"),
    mindMap: { data: englishF2Paper2MindMap, title: "Paper 2 - Writing" },
  },

  // English Form 3 — UASA mastery-level paper 1 notes, same 2-chapter structure.
  {
    id: "english-f3-c1",
    subjectId: "english",
    form: "Form 3",
    chapterKey: "Chapter 1",
    title: "Paper 1 - Reading & Language Awareness",
    englishData: englishF3C1Notes,
    flashcards: englishFlashcardsForF3("Chapter 1"),
    quiz: getEnglishQuizSetF3("uasa-set-1"),
    mindMap: { data: englishF3Paper1MindMap, title: "Paper 1 - Reading & Language Awareness" },
  },
  {
    id: "english-f3-c2",
    subjectId: "english",
    form: "Form 3",
    chapterKey: "Chapter 2",
    title: "Paper 2 - Writing",
    englishData: englishF3C2Notes,
    flashcards: englishFlashcardsForF3("Chapter 2"),
    mindMap: { data: englishF3Paper2MindMap, title: "Paper 2 - Writing" },
  },

  // Bahasa Melayu Form 1 — Flashcards-only decks (no notes/quiz/mindmap registered here)
  {
    id: "bm-f1-karangan-pendek",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Karangan Pendek",
    title: "Karangan Pendek",
    flashcards: bmFlashcardsFor("Karangan Pendek"),
  },
  {
    id: "bm-f1-karangan-panjang",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Karangan Panjang",
    title: "Karangan Panjang",
    flashcards: bmFlashcardsFor("Karangan Panjang"),
  },
  {
    id: "bm-f1-penanda-wacana",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Penanda Wacana",
    title: "Penanda Wacana",
    flashcards: bmFlashcardsFor("Penanda Wacana"),
  },
  {
    id: "bm-f1-peribahasa",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Peribahasa",
    title: "Peribahasa Wajib Hafal",
    flashcards: bmFlashcardsFor("Peribahasa"),
  },
  {
    id: "bm-f1-komsas",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "KOMSAS",
    title: "KOMSAS",
    flashcards: bmFlashcardsFor("KOMSAS"),
  },
  {
    id: "bm-f1-kosa-kata",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Kosa Kata Menarik",
    title: "Kosa Kata Menarik",
    flashcards: bmFlashcardsFor("Kosa Kata Menarik"),
  },
  {
    id: "bm-f1-frasa-menarik",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Frasa Menarik",
    title: "Frasa Menarik",
    flashcards: bmFlashcardsFor("Frasa Menarik"),
  },
  {
    id: "bm-f1-tingkatkan-karangan",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Tingkatkan Karangan",
    title: "Kemahiran Tingkatkan Karangan",
    flashcards: bmFlashcardsFor("Tingkatkan Karangan"),
  },

  // Bahasa Melayu Form 2 — same structure as Form 1 (flashcards-only skill
  // decks), scaffolding only: every deck's data file
  // (src/data/bm-flashcards-*-f2.ts) is intentionally empty pending real
  // Form 2 KSSM content — never fabricated. Chapters render, show an empty
  // deck, and are ready for content to be dropped in later.
  {
    id: "bm-f2-karangan-pendek",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Karangan Pendek",
    title: "Karangan Pendek",
    flashcards: bmFlashcardsFor("Karangan Pendek", "Form 2"),
  },
  {
    id: "bm-f2-karangan-panjang",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Karangan Panjang",
    title: "Karangan Panjang",
    flashcards: bmFlashcardsFor("Karangan Panjang", "Form 2"),
  },
  {
    id: "bm-f2-penanda-wacana",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Penanda Wacana",
    title: "Penanda Wacana",
    flashcards: bmFlashcardsFor("Penanda Wacana", "Form 2"),
  },
  {
    id: "bm-f2-peribahasa",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Peribahasa",
    title: "Peribahasa Wajib Hafal",
    flashcards: bmFlashcardsFor("Peribahasa", "Form 2"),
  },
  {
    id: "bm-f2-komsas",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "KOMSAS",
    title: "KOMSAS",
    flashcards: bmFlashcardsFor("KOMSAS", "Form 2"),
  },
  {
    id: "bm-f2-kosa-kata",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Kosa Kata Menarik",
    title: "Kosa Kata Menarik",
    flashcards: bmFlashcardsFor("Kosa Kata Menarik", "Form 2"),
  },
  {
    id: "bm-f2-frasa-menarik",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Frasa Menarik",
    title: "Frasa Menarik",
    flashcards: bmFlashcardsFor("Frasa Menarik", "Form 2"),
  },
  {
    id: "bm-f2-tingkatkan-karangan",
    subjectId: "bm",
    form: "Form 2",
    chapterKey: "Tingkatkan Karangan",
    title: "Kemahiran Tingkatkan Karangan",
    flashcards: bmFlashcardsFor("Tingkatkan Karangan", "Form 2"),
  },

  // Science Form 2 — Chapter 1 (Biodiversiti / Biodiversity), fully populated
  {
    id: "science-f2-c1-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Bab 1: Biodiversiti",
    lang: "bm",
    mindMap: { data: scienceF2C1MindMapBM, title: "Biodiversiti" },
    notes: scienceF2C1NotesBM,
    flashcards: scienceF2C1FlashcardsBM,
    quiz: scienceF2C1QuizzesBM,
  },
  {
    id: "science-f2-c1-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Chapter 1: Biodiversity",
    lang: "dlp",
    mindMap: { data: scienceF2C1MindMapDLP, title: "Biodiversity" },
    notes: scienceF2C1NotesDLP,
    flashcards: scienceF2C1FlashcardsDLP,
    quiz: scienceF2C1QuizzesDLP,
  },

  // Science Form 2 — Chapter 2 (Ekosistem / Ecosystem), fully populated
  {
    id: "science-f2-c2-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Bab 2: Ekosistem",
    lang: "bm",
    mindMap: { data: scienceF2C2MindMapBM, title: "Ekosistem" },
    notes: scienceF2C2NotesBM,
    flashcards: scienceF2C2FlashcardsBM,
    quiz: scienceF2C2QuizzesBM,
  },
  {
    id: "science-f2-c2-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Chapter 2: Ecosystem",
    lang: "dlp",
    mindMap: { data: scienceF2C2MindMapDLP, title: "Ecosystem" },
    notes: scienceF2C2NotesDLP,
    flashcards: scienceF2C2FlashcardsDLP,
    quiz: scienceF2C2QuizzesDLP,
  },

  // Science Form 2 — Chapter 3 (Nutrisi / Nutrition), fully populated
  {
    id: "science-f2-c3-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Bab 3: Nutrisi",
    lang: "bm",
    mindMap: { data: scienceF2C3MindMapBM, title: "Nutrisi" },
    notes: scienceF2C3NotesBM,
    flashcards: scienceF2C3FlashcardsBM,
    quiz: scienceF2C3QuizzesBM,
  },
  {
    id: "science-f2-c3-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Chapter 3: Nutrition",
    lang: "dlp",
    mindMap: { data: scienceF2C3MindMapDLP, title: "Nutrition" },
    notes: scienceF2C3NotesDLP,
    flashcards: scienceF2C3FlashcardsDLP,
    quiz: scienceF2C3QuizzesDLP,
  },

  // Science Form 2 — Chapter 4 (Kesihatan Manusia / Human Health), fully populated
  {
    id: "science-f2-c4-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Bab 4: Kesihatan Manusia",
    lang: "bm",
    mindMap: { data: scienceF2C4MindMapBM, title: "Kesihatan Manusia" },
    notes: scienceF2C4NotesBM,
    flashcards: scienceF2C4FlashcardsBM,
    quiz: scienceF2C4QuizzesBM,
  },
  {
    id: "science-f2-c4-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Chapter 4: Human Health",
    lang: "dlp",
    mindMap: { data: scienceF2C4MindMapDLP, title: "Human Health" },
    notes: scienceF2C4NotesDLP,
    flashcards: scienceF2C4FlashcardsDLP,
    quiz: scienceF2C4QuizzesDLP,
  },

  // Science Form 2 — Chapter 5 (Air dan Larutan / Water and Solution), fully populated
  {
    id: "science-f2-c5-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Bab 5: Air dan Larutan",
    lang: "bm",
    mindMap: { data: scienceF2C5MindMapBM, title: "Air dan Larutan" },
    notes: scienceF2C5NotesBM,
    flashcards: scienceF2C5FlashcardsBM,
    quiz: scienceF2C5QuizzesBM,
  },
  {
    id: "science-f2-c5-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Chapter 5: Water and Solution",
    lang: "dlp",
    mindMap: { data: scienceF2C5MindMapDLP, title: "Water and Solution" },
    notes: scienceF2C5NotesDLP,
    flashcards: scienceF2C5FlashcardsDLP,
    quiz: scienceF2C5QuizzesDLP,
  },

  // Science Form 2 — Chapter 6 (Asid dan Alkali / Acid and Alkali), FULLY POPULATED
  {
    id: "science-f2-c6-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Bab 6: Asid dan Alkali",
    lang: "bm",
    mindMap: { data: scienceF2C6MindMapBM, title: "Asid dan Alkali" },
    notes: scienceF2C6NotesBM,
    flashcards: scienceF2C6FlashcardsBM,
    quiz: scienceF2C6QuizzesBM,
  },
  {
    id: "science-f2-c6-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Chapter 6: Acid and Alkali",
    lang: "dlp",
    mindMap: { data: scienceF2C6MindMapDLP, title: "Acid and Alkali" },
    notes: scienceF2C6NotesDLP,
    flashcards: scienceF2C6FlashcardsDLP,
    quiz: scienceF2C6QuizzesDLP,
  },

  // Science Form 2 — Chapter 7 (Elektrik dan Kemagnetan / Electricity and Magnetism), FULLY POPULATED
  {
    id: "science-f2-c7-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Bab 7: Elektrik dan Kemagnetan",
    lang: "bm",
    mindMap: { data: scienceF2C7MindMapBM, title: "Elektrik dan Kemagnetan" },
    notes: scienceF2C7NotesBM,
    flashcards: scienceF2C7FlashcardsBM,
    quiz: scienceF2C7QuizzesBM,
  },
  {
    id: "science-f2-c7-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Chapter 7: Electricity and Magnetism",
    lang: "dlp",
    mindMap: { data: scienceF2C7MindMapDLP, title: "Electricity and Magnetism" },
    notes: scienceF2C7NotesDLP,
    flashcards: scienceF2C7FlashcardsDLP,
    quiz: scienceF2C7QuizzesDLP,
  },

  // Science Form 2 — Chapter 8 (Daya dan Gerakan / Force and Motion), FULLY POPULATED
  {
    id: "science-f2-c8-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Bab 8: Daya dan Gerakan",
    lang: "bm",
    mindMap: { data: scienceF2C8MindMapBM, title: "Daya dan Gerakan" },
    notes: scienceF2C8NotesBM,
    flashcards: scienceF2C8FlashcardsBM,
    quiz: scienceF2C8QuizzesBM,
  },
  {
    id: "science-f2-c8-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Chapter 8: Force and Motion",
    lang: "dlp",
    mindMap: { data: scienceF2C8MindMapDLP, title: "Force and Motion" },
    notes: scienceF2C8NotesDLP,
    flashcards: scienceF2C8FlashcardsDLP,
    quiz: scienceF2C8QuizzesDLP,
  },

  // Science Form 2 — Chapter 9 (Haba / Heat), FULLY POPULATED
  {
    id: "science-f2-c9-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Bab 9: Haba",
    lang: "bm",
    mindMap: { data: scienceF2C9MindMapBM, title: "Haba" },
    notes: scienceF2C9NotesBM,
    flashcards: scienceF2C9FlashcardsBM,
    quiz: scienceF2C9QuizzesBM,
  },
  {
    id: "science-f2-c9-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Chapter 9: Heat",
    lang: "dlp",
    mindMap: { data: scienceF2C9MindMapDLP, title: "Heat" },
    notes: scienceF2C9NotesDLP,
    flashcards: scienceF2C9FlashcardsDLP,
    quiz: scienceF2C9QuizzesDLP,
  },

  // Science Form 2 — Chapter 10 (Gelombang Bunyi / Sound Waves), FULLY POPULATED
  {
    id: "science-f2-c10-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Bab 10: Gelombang Bunyi",
    lang: "bm",
    mindMap: { data: scienceF2C10MindMapBM, title: "Gelombang Bunyi" },
    notes: scienceF2C10NotesBM,
    flashcards: scienceF2C10FlashcardsBM,
    quiz: scienceF2C10QuizzesBM,
  },
  {
    id: "science-f2-c10-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Chapter 10: Sound Waves",
    lang: "dlp",
    mindMap: { data: scienceF2C10MindMapDLP, title: "Sound Waves" },
    notes: scienceF2C10NotesDLP,
    flashcards: scienceF2C10FlashcardsDLP,
    quiz: scienceF2C10QuizzesDLP,
  },

  // Science Form 2 — Chapter 11 (Bintang dan Galaksi dalam Alam Semesta / Stars and Galaxies in the Universe), FULLY POPULATED
  {
    id: "science-f2-c11-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 11",
    title: "Bab 11: Bintang dan Galaksi dalam Alam Semesta",
    lang: "bm",
    mindMap: { data: scienceF2C11MindMapBM, title: "Bintang dan Galaksi dalam Alam Semesta" },
    notes: scienceF2C11NotesBM,
    flashcards: scienceF2C11FlashcardsBM,
    quiz: scienceF2C11QuizzesBM,
  },
  {
    id: "science-f2-c11-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 11",
    title: "Chapter 11: Stars and Galaxies in the Universe",
    lang: "dlp",
    mindMap: { data: scienceF2C11MindMapDLP, title: "Stars and Galaxies in the Universe" },
    notes: scienceF2C11NotesDLP,
    flashcards: scienceF2C11FlashcardsDLP,
    quiz: scienceF2C11QuizzesDLP,
  },

  // Science Form 2 — Chapter 12 (Sistem Suria / Solar System), FULLY POPULATED
  {
    id: "science-f2-c12-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 12",
    title: "Bab 12: Sistem Suria",
    lang: "bm",
    mindMap: { data: scienceF2C12MindMapBM, title: "Sistem Suria" },
    notes: scienceF2C12NotesBM,
    flashcards: scienceF2C12FlashcardsBM,
    quiz: scienceF2C12QuizzesBM,
  },
  {
    id: "science-f2-c12-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 12",
    title: "Chapter 12: Solar System",
    lang: "dlp",
    mindMap: { data: scienceF2C12MindMapDLP, title: "Solar System" },
    notes: scienceF2C12NotesDLP,
    flashcards: scienceF2C12FlashcardsDLP,
    quiz: scienceF2C12QuizzesDLP,
  },

  // Science Form 2 — Chapter 13 (Meteoroid, Asteroid, Komet / Meteoroid, Asteroid, Comet), FULLY POPULATED
  {
    id: "science-f2-c13-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 13",
    title: "Bab 13: Meteoroid, Asteroid, Komet",
    lang: "bm",
    mindMap: { data: scienceF2C13MindMapBM, title: "Meteoroid, Asteroid, Komet" },
    notes: scienceF2C13NotesBM,
    flashcards: scienceF2C13FlashcardsBM,
    quiz: scienceF2C13QuizzesBM,
  },
  {
    id: "science-f2-c13-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 13",
    title: "Chapter 13: Meteoroid, Asteroid, Comet",
    lang: "dlp",
    mindMap: { data: scienceF2C13MindMapDLP, title: "Meteoroid, Asteroid, Comet" },
    notes: scienceF2C13NotesDLP,
    flashcards: scienceF2C13FlashcardsDLP,
    quiz: scienceF2C13QuizzesDLP,
  },
];

export function getChapter(
  subjectId: string,
  chapterKey: string,
  lang?: "bm" | "dlp",
  form: ChapterContent["form"] = "Form 1",
): ChapterContent | undefined {
  const chapter = chapters.find(
    (c) =>
      c.subjectId === subjectId &&
      c.form === form &&
      c.chapterKey === chapterKey &&
      (lang ? c.lang === lang : !c.lang || c.lang === lang),
  );
  if (chapter?.subjectId === "sejarah" && chapter.form === "Form 2" && chapter.notes) {
    return { ...chapter, notes: organizeSejarahF2Notes(chapter.notes) };
  }
  return chapter;
}

/** All chapter content rows for a given subject (used to surface "available" flags). */
export function getChaptersForSubject(
  subjectId: string,
  lang?: "bm" | "dlp",
  form?: ChapterContent["form"] | "All",
): ChapterContent[] {
  return chapters.filter(
    (c) =>
      c.subjectId === subjectId &&
      (form && form !== "All" ? c.form === form : true) &&
      (lang ? !c.lang || c.lang === lang : true),
  );
}

export type RegisteredSubjectChapter = {
  key: string;
  label: string;
  available: boolean;
  selectable: boolean;
  subtopics?: string[];
  isNew?: boolean;
};

export type ResourceType = "notes" | "quiz" | "flashcards" | "mindMap";

function chapterNumberFromKey(chapterKey: string) {
  const match = chapterKey.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
}

// Most subjects' flashcards/quizzes are authored as Flashcard[]/QuizQuestion[]
// and mirrored onto the chapter row above, so chapter.flashcards/chapter.quiz is
// a reliable "does content exist" signal. Math Form 1 is the one exception: its
// flashcards/quizzes were authored as standalone category/objective banks inside
// the flashcards/quizzes routes (MATH_FLASHCARD_BANKS / MATH_QUIZ_BANKS, keyed by
// the same "Chapter N" chapterKey) and were never mirrored onto these rows. Without
// Science Form 1 quizzes use the same route-level storage pattern. Without this
// registration, readiness checks report that content as missing even though
// learners can open it, leaving the form/chapter marked "Coming Soon" and
// disabled. Register externally-stored content here rather than special-casing
// a subject in the UI layer.
const EXTERNALLY_STORED_RESOURCES: Partial<
  Record<ResourceType, Array<{ subjectId: string; form: ChapterContent["form"]; chapterKeys: string[] }>>
> = {
  flashcards: [
    {
      subjectId: "math",
      form: "Form 1",
      chapterKeys: Array.from({ length: 13 }, (_, i) => `Chapter ${i + 1}`),
    },
    {
      subjectId: "science",
      form: "Form 1",
      chapterKeys: ["Chapter 1"],
    },
  ],
  quiz: [
    {
      subjectId: "math",
      form: "Form 1",
      chapterKeys: Array.from({ length: 13 }, (_, i) => `Chapter ${i + 1}`),
    },
    {
      subjectId: "science",
      form: "Form 1",
      chapterKeys: Array.from({ length: 9 }, (_, i) => `Chapter ${i + 1}`),
    },
  ],
};

function hasExternallyStoredResource(chapter: ChapterContent, resourceType: ResourceType) {
  return Boolean(
    EXTERNALLY_STORED_RESOURCES[resourceType]?.some(
      (entry) =>
        entry.subjectId === chapter.subjectId &&
        entry.form === chapter.form &&
        entry.chapterKeys.includes(chapter.chapterKey),
    ),
  );
}

function chapterHasResourceContent(chapter: ChapterContent, resourceType: ResourceType) {
  if (resourceType === "notes") {
    if (getChapterFeatures(chapter).notes) return true;
    if (chapter.subjectId === "science" && chapter.form === "Form 1" && chapter.chapterKey === "Chapter 1") {
      return allNotes.some(
        (note) =>
          note.subjectId === "science" &&
          note.form === "Form 1" &&
          note.chapter === "Chapter 1" &&
          (!chapter.lang || !note.lang || note.lang === chapter.lang),
      );
    }
    return false;
  }
  if (resourceType === "quiz") {
    return Boolean(chapter.quiz?.length) || hasExternallyStoredResource(chapter, "quiz");
  }
  if (resourceType === "flashcards") {
    return Boolean(chapter.flashcards?.length) || hasExternallyStoredResource(chapter, "flashcards");
  }
  return Boolean(chapter.mindMap);
}

function chapterHasContent(chapter: ChapterContent) {
  const features = getChapterFeatures(chapter);
  return Boolean(
    features.notes ||
      features.mindMap ||
      features.video ||
      features.flashcards ||
      features.quiz,
  );
}

function chapterLabel(chapter: ChapterContent, lang?: "bm" | "dlp") {
  const chapterNumber = chapterNumberFromKey(chapter.chapterKey);
  if (!Number.isFinite(chapterNumber) || chapterNumber === Number.MAX_SAFE_INTEGER) {
    return chapter.title;
  }
  const prefix = lang === "bm" ? "Bab" : "Chapter";
  return `${prefix} ${chapterNumber}: ${chapter.title}`;
}

export function hasResourceContent(
  subjectId: string,
  form: ChapterContent["form"] | "All",
  chapterKey: string,
  resourceType: ResourceType,
  lang?: "bm" | "dlp",
) {
  return getChaptersForSubject(subjectId, lang, form).some(
    (chapter) =>
      chapter.chapterKey === chapterKey && chapterHasResourceContent(chapter, resourceType),
  );
}

export function hasFormResourceContent(
  subjectId: string,
  form: ChapterContent["form"] | "All",
  resourceType: ResourceType,
  lang?: "bm" | "dlp",
) {
  return getChaptersForSubject(subjectId, lang, form).some((chapter) =>
    chapterHasResourceContent(chapter, resourceType),
  );
}

export function getRegisteredSubjectChapters(
  subjectId: string,
  lang?: "bm" | "dlp",
  form: ChapterContent["form"] | "All" = "Form 1",
): RegisteredSubjectChapter[] {
  const rows = getChaptersForSubject(subjectId, lang, form);
  const byChapter = new Map<string, ChapterContent[]>();

  for (const row of rows) {
    const group = byChapter.get(row.chapterKey) ?? [];
    group.push(row);
    byChapter.set(row.chapterKey, group);
  }

  return Array.from(byChapter.entries())
    .sort(([a], [b]) => chapterNumberFromKey(a) - chapterNumberFromKey(b))
    .map(([key, group]) => {
      const preferred = (lang ? group.find((chapter) => chapter.lang === lang) : undefined) ?? group[0];
      const available = group.some(chapterHasContent);
      return {
        key,
        label: chapterLabel(preferred, lang),
        available,
        selectable: available,
        subtopics: preferred.subtopics?.map((subtopic) => subtopic.title),
      };
    });
}

// ─── Per-form content stats ──────────────────────────────────────────────────
// Bilingual subjects (science/math) register a separate bm + dlp row per
// chapter; pass lang="bm" when counting chapters so each chapter is counted
// once instead of twice. This mirrors the convention already used by
// ChapterPicker's chapterCountFor().
const BILINGUAL_SUBJECTS = new Set(["science", "math"]);

export function getFormChapterCount(subjectId: string, form: ChapterContent["form"]): number {
  const lang = BILINGUAL_SUBJECTS.has(subjectId) ? "bm" : undefined;
  return getRegisteredSubjectChapters(subjectId, lang, form).length;
}

export type FormStat = {
  form: ChapterContent["form"];
  chapterCount: number;
  notesReady: boolean;
  notesChapters: number;
  mindMapReady: boolean;
  mindMapChapters: number;
  flashcardsReady: boolean;
  // Sums of chapter.flashcards/chapter.quiz across the registry. Accurate for
  // every subject except Math Form 1, whose flashcards/quizzes live outside
  // this registry (see EXTERNALLY_STORED_RESOURCES above) — *Ready reflects
  // real availability there even though the raw count cannot. Callers that
  // need an exact Math Form 1 number must supply it themselves from the data
  // they already hold (see flashcards.tsx/quizzes.tsx).
  flashcardCount: number;
  quizReady: boolean;
  quizCount: number;
};

const ALL_FORMS: ChapterContent["form"][] = ["Form 1", "Form 2", "Form 3"];

export function getSubjectFormStats(subjectId: string): FormStat[] {
  const lang = BILINGUAL_SUBJECTS.has(subjectId) ? "bm" : undefined;

  return ALL_FORMS.map((form) => {
    const registeredChapters = getRegisteredSubjectChapters(subjectId, lang, form);
    const rawChapters = getChaptersForSubject(subjectId, undefined, form);

    return {
      form,
      chapterCount: registeredChapters.length,
      notesReady: hasFormResourceContent(subjectId, form, "notes", lang),
      notesChapters: registeredChapters.filter((c) =>
        hasResourceContent(subjectId, form, c.key, "notes", lang),
      ).length,
      mindMapReady: hasFormResourceContent(subjectId, form, "mindMap", lang),
      mindMapChapters: registeredChapters.filter((c) =>
        hasResourceContent(subjectId, form, c.key, "mindMap", lang),
      ).length,
      flashcardsReady: hasFormResourceContent(subjectId, form, "flashcards", lang),
      flashcardCount: rawChapters.reduce((sum, c) => sum + (c.flashcards?.length ?? 0), 0),
      quizReady: hasFormResourceContent(subjectId, form, "quiz", lang),
      quizCount: rawChapters.reduce((sum, c) => sum + (c.quiz?.length ?? 0), 0),
    };
  });
}
