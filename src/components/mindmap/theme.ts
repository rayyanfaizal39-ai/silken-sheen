// Visual tokens for the mind map explorer: AcadeMY's deep navy canvas,
// purple main topic, royal-blue-led branch colours, cyan interaction
// highlights and restrained gold accents.

export const MIND_MAP_COLORS = {
  canvas: "#060B1A",
  rootFrom: "#7346E8",
  rootTo: "#4A1F9C",
  rootBorder: "rgba(196,181,253,0.55)",
  branchSurfaceFrom: "#142251",
  branchSurfaceTo: "#0F1A40",
  detailSurface: "#0D1631",
  detailBorder: "rgba(148,163,184,0.18)",
  headingText: "#F3F6FF",
  detailText: "#E3E9F8",
  summaryText: "#AEBAD6",
  highlight: "#67E8F9",
  gold: "#E9B949",
} as const;

/**
 * Branch accents, assigned by first-level branch order. Muted enough to sit
 * on navy without glowing; the first branch is royal blue.
 */
export const BRANCH_COLORS = [
  "#5B8DEF", // royal blue
  "#4CC3DA", // soft cyan
  "#A48BF0", // violet
  "#E2B24A", // gold
  "#3EBE9E", // teal
  "#E58A6B", // coral
  "#7FA2F7", // periwinkle
  "#C68AE6", // orchid
] as const;

export function branchColor(branchIndex: number) {
  if (branchIndex < 0) return MIND_MAP_COLORS.rootFrom;
  return BRANCH_COLORS[branchIndex % BRANCH_COLORS.length];
}

export type MindMapLocale = "en" | "ms";

export const MIND_MAP_STRINGS = {
  en: {
    back: "Back",
    backToChapters: "Back to chapters",
    explore: "Explore",
    focus: "Focus",
    fit: "Fit map",
    reset: "Reset view",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    minimap: "Minimap",
    showMinimap: "Show minimap",
    hideMinimap: "Hide minimap",
    previous: "Previous",
    next: "Next",
    previousNode: "Go to previous topic",
    nextNode: "Go to next topic",
    read: "Read",
    openReader: "Open reading view",
    closeReader: "Close reading view",
    more: "More options",
    map: "Map",
    outline: "Outline",
    mapView: "Map view",
    outlineView: "Outline view",
    previousTopic: "Previous chapter",
    nextTopic: "Next chapter",
    focusOn: "Focus",
    exitFocus: "Show full map",
    subtopics: (n: number) => `${n} subtopic${n === 1 ? "" : "s"}`,
    position: (i: number, n: number) => `${i} of ${n}`,
    mainTopic: "Main topic",
    inThisTopic: "In this topic",
    empty: "Mind map content isn't available for this chapter yet.",
    canvasLabel: (label: string) => `Mind map: ${label}`,
    outlineLabel: (label: string) => `Mind map outline: ${label}`,
    hint: "Tap a topic to open it · drag to move · pinch or scroll to zoom",
  },
  ms: {
    back: "Kembali",
    backToChapters: "Kembali ke topik",
    explore: "Jelajah",
    focus: "Fokus",
    fit: "Muat peta",
    reset: "Set semula",
    zoomIn: "Zum masuk",
    zoomOut: "Zum keluar",
    expandAll: "Buka semua",
    collapseAll: "Tutup semua",
    minimap: "Peta kecil",
    showMinimap: "Tunjuk peta kecil",
    hideMinimap: "Sembunyi peta kecil",
    previous: "Sebelum",
    next: "Seterusnya",
    previousNode: "Pergi ke topik sebelumnya",
    nextNode: "Pergi ke topik seterusnya",
    read: "Baca",
    openReader: "Buka paparan bacaan",
    closeReader: "Tutup paparan bacaan",
    more: "Pilihan lain",
    map: "Peta",
    outline: "Senarai",
    mapView: "Paparan peta",
    outlineView: "Paparan senarai",
    previousTopic: "Topik sebelumnya",
    nextTopic: "Topik seterusnya",
    focusOn: "Fokus",
    exitFocus: "Tunjuk peta penuh",
    subtopics: (n: number) => `${n} subtopik`,
    position: (i: number, n: number) => `${i} daripada ${n}`,
    mainTopic: "Topik utama",
    inThisTopic: "Dalam topik ini",
    empty: "Kandungan peta minda untuk topik ini belum tersedia.",
    canvasLabel: (label: string) => `Peta minda: ${label}`,
    outlineLabel: (label: string) => `Peta minda ${label}`,
    hint: "Ketik topik untuk membuka · seret untuk gerak · cubit atau tatal untuk zum",
  },
} as const;

export type MindMapStrings = (typeof MIND_MAP_STRINGS)[MindMapLocale];
