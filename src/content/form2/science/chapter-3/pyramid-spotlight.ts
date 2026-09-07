/**
 * Hotspot polygons for `science-f2-ch3-food-pyramid.webp`, in 0–100
 * percentages of the artwork's width/height (aspect "3 / 2", 1536×1024
 * source). Six regions, matching the four visible tiers — the middle two
 * tiers split left/right down the pyramid's vertical centre line.
 *
 * Tier order top to bottom in the artwork: apex (fat/oil/sugar/salt), then
 * protein + dairy, then vegetables + fruits, then the grains base — protein
 * sits directly under the apex, and vegetables/fruits sit directly above the
 * base (verified against the rendered artwork; an earlier pass had these two
 * middle tiers' hotspots swapped).
 *
 * Coordinates were measured directly off the source pixels (not eyeballed):
 * for every row, the leftmost/rightmost non-background pixel was found, then
 * the fill colour just inside each edge was sampled to locate the exact rows
 * where one tier's colour band ends and the next begins. That gave, in
 * source pixels (1536×1024):
 *   apex point   ( 767.5,   18)
 *   tier 1/2     ( 579–952.5,  284)   — apex / protein+dairy boundary
 *   tier 2/3     ( 414.5–1116.5, 534) — protein+dairy / veg+fruit boundary
 *   tier 3/base  ( 274–1253.5,  748) — veg+fruit / grains boundary
 *   base         ( 155–1372,   960)
 * divided by (1536, 1024) and rounded to one decimal place. The vertical
 * split for the two two-group tiers sits at the pyramid's own centre, x = 50.
 */
export const PYRAMID_HOTSPOTS = {
  apex: "50,1.8 37.7,27.7 62,27.7",
  protein: "37.7,27.7 50,27.7 50,52.1 27,52.1",
  dairy: "50,27.7 62,27.7 72.7,52.1 50,52.1",
  vegetables: "27,52.1 50,52.1 50,73 17.8,73",
  fruits: "50,52.1 72.7,52.1 81.6,73 50,73",
  grains: "17.8,73 81.6,73 89.3,93.75 10.1,93.75",
} as const;
