import { LearningArena } from "@/components/learning/LearningArena";
import { MindMap, type MindMapPalette, type MindNode } from "@/components/MindMap";
import type { MindMapHeader } from "./MindMapTopBar";
import type { MindMapLocale } from "./theme";

/**
 * Dedicated fullscreen Mind Map screen, the counterpart of the Quiz and
 * Flashcard arenas: it covers the app sidebar, header and footer without
 * browser fullscreen, and gives the canvas the whole viewport.
 */
export function MindMapExplorer({
  data,
  title,
  subjectId,
  palette,
  locale,
  header,
}: {
  data: MindNode;
  title: string;
  subjectId?: string | null;
  palette?: MindMapPalette;
  locale?: MindMapLocale;
  header: MindMapHeader;
}) {
  return (
    <LearningArena
      subjectId={subjectId}
      label={title}
      layout="fill"
      atmosphere="none"
      className="mind-map-arena"
    >
      <MindMap data={data} height="100%" palette={palette} locale={locale} header={header} />
    </LearningArena>
  );
}
