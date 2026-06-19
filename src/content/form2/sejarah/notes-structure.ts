import type { ScienceNotesSection, ScienceNotesSubsection, StructuredNotes } from "@/data/types";

const SUBTOPIC_TITLE = /^\d+\.\d+\s/;

function categoryCards(section: ScienceNotesSection): ScienceNotesSubsection[] {
  const cards: ScienceNotesSubsection[] = [];

  if (section.content) {
    cards.push({ title: section.title, content: section.content });
  }

  for (const subsection of section.subsections ?? []) {
    cards.push({
      ...subsection,
      title: subsection.title ? `${section.title}: ${subsection.title}` : section.title,
    });
  }

  return cards;
}

/**
 * Keeps note content intact while exposing only the KSSM hierarchy in the
 * section navigation: Bab Overview -> numbered subtopic -> category cards.
 */
export function organizeSejarahF2Notes(notes: StructuredNotes): StructuredNotes {
  const sourceSections = notes.sections.map((section) => ({
    ...section,
    subsections: section.subsections?.map((subsection) => ({ ...subsection })),
  }));
  let overview = sourceSections.find((section) => section.title === "Bab Overview");
  const remainingSections = sourceSections.filter((section) => section !== overview);

  if (!overview) {
    const overviewSubsections: ScienceNotesSubsection[] = [];
    for (const section of remainingSections) {
      const retained: ScienceNotesSubsection[] = [];
      for (const subsection of section.subsections ?? []) {
        if (subsection.title === "Kepentingan Bab Ini") overviewSubsections.push(subsection);
        else retained.push(subsection);
      }
      section.subsections = retained;
    }
    overview = { title: "Bab Overview", subsections: overviewSubsections };
  }

  const organizedSections: ScienceNotesSection[] = [overview];
  let activeSubtopic: ScienceNotesSection | undefined;

  for (const section of remainingSections) {
    if (SUBTOPIC_TITLE.test(section.title)) {
      activeSubtopic = {
        ...section,
        subsections: [...(section.subsections ?? [])],
      };
      organizedSections.push(activeSubtopic);
      continue;
    }

    if (!activeSubtopic) {
      organizedSections.push(section);
      continue;
    }

    activeSubtopic.subsections = [...(activeSubtopic.subsections ?? []), ...categoryCards(section)];
  }

  return { ...notes, sections: organizedSections };
}
