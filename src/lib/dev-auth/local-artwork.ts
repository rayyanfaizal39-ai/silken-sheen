import { companionSvg } from "@/features/nova-cards/artwork";
import { svgUrl } from "@/features/nova-cards/codes";
import type { NovaTraits } from "@/features/nova-cards/model";

/**
 * Free stand-ins for the paid artwork generator. Used only by the localhost dev bypass.
 * Phoenix and the blue water fox use the illustrations already in the repo. Every other
 * species and element pair uses the existing portrait drawing, coloured by element.
 */
const ILLUSTRATION: Record<string, string> = {
  "Phoenix|Fire": "/nova/creatures/phoenix.svg",
  "Phoenix|Starlight": "/nova/creatures/phoenix.svg",
  "Magical Fox|Water": "/nova/creatures/fox.svg",
};

const ELEMENT_COLOURS: Record<string, string> = {
  Fire: "Obsidian Black / Violet",
  Water: "Sapphire Blue / Gold",
  Starlight: "Pearl / Rose",
  Wind: "Emerald Green / Silver",
};

export function devCompanionArtworkUrl(
  species: string,
  element: string,
  variant: "a" | "b",
): string {
  const illustration = ILLUSTRATION[`${species}|${element}`];
  if (illustration) return illustration;
  const traits: NovaTraits = {
    personality: "Explorer",
    creature: species,
    element,
    appearance: "Soft and fluffy",
    colours: ELEMENT_COLOURS[element] ?? ELEMENT_COLOURS.Fire,
    ability: "Light the way",
    habitat: "Crystal forest",
    behaviour: "Gentle and patient",
    eyes: "Golden Starlight Eyes",
    marking: "A glowing forehead star",
    approach: "Try a new path",
    bond: "Explore together",
  };
  return svgUrl(companionSvg(traits, variant, 1));
}
