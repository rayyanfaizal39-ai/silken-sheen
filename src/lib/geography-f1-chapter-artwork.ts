const geographyF1ChapterArtworkModules = import.meta.glob<{ default: string }>(
  "/src/assets/geography/form1/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

export const GEOGRAPHY_F1_CHAPTER_ARTWORK: Record<string, string> = (() => {
  const artwork: Record<string, string> = {};

  for (const [path, module] of Object.entries(geographyF1ChapterArtworkModules)) {
    const filename = path.split("/").pop() ?? "";
    const chapterNumber = filename.match(/^ch(\d{1,2})-/i)?.[1];
    if (chapterNumber) artwork[`Chapter ${chapterNumber}`] = module.default;
  }

  return artwork;
})();

export function getGeographyF1ChapterArtwork(chapterKey: string) {
  return GEOGRAPHY_F1_CHAPTER_ARTWORK[chapterKey] ?? null;
}
