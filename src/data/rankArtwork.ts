import spaceCadet from "@/assets/ranks/space_cadet-removebg-preview.png";
import planetVoyager from "@/assets/ranks/planet_voyager-removebg-preview.png";
import starCaptain from "@/assets/ranks/star_captain-removebg-preview.png";
import galaxyGuardian from "@/assets/ranks/galaxy_guardian-removebg-preview.png";
import celestialMaster from "@/assets/ranks/celestial_master-removebg-preview.png";
import cosmicLegend from "@/assets/ranks/cosmic_legend-removebg-preview.png";

/** Rank artwork keyed by SpaceRank id — used wherever a rank icon is shown instead of an emoji. */
export const rankArtwork: Record<string, string> = {
  cadet: spaceCadet,
  "planet-voyager": planetVoyager,
  "star-captain": starCaptain,
  "galaxy-guardian": galaxyGuardian,
  "celestial-master": celestialMaster,
  "cosmic-legend": cosmicLegend,
};

/**
 * Per-rank image scale, to compensate for inconsistent transparent padding
 * across the source PNGs (e.g. the Space Cadet artwork has more empty
 * margin than the other ranks, making it look smaller in the same frame).
 */
export const rankImageScale: Record<string, number> = {
  cadet: 1.3,
};
