import type { MindNode } from "@/components/MindMap";

export const scienceF2C12MindMapDLP: MindNode = {
  id: "root",
  label: "Solar System",
  children: [
    {
      id: "c1",
      label: "12.1 Solar System",
      children: [
        {
          id: "c1-1",
          label: "Introduction",
          children: [
            { id: "c1-1-1", label: "Eight planets orbit the Sun, including Earth" },
            { id: "c1-1-2", label: "2006: Pluto no longer recognised as a planet — now a dwarf planet" },
          ],
        },
        {
          id: "c1-2",
          label: "Important Concepts — Distance Units",
          children: [
            {
              id: "c1-2-1",
              label: "Astronomical Unit (A.U.)",
              children: [
                { id: "c1-2-1-1", label: "Average distance between Earth and the Sun" },
                { id: "c1-2-1-2", label: "≈ 150 million km" },
                { id: "c1-2-1-3", label: "1 A.U. = 1.5 × 10⁸ km" },
              ],
            },
            {
              id: "c1-2-2",
              label: "Light Years (ly)",
              children: [
                { id: "c1-2-2-1", label: "Distance travelled by light in one year" },
                { id: "c1-2-2-2", label: "Speed of light = 300,000 km per second" },
                { id: "c1-2-2-3", label: "1 light year = 9.5 × 10¹² km" },
              ],
            },
            {
              id: "c1-2-3",
              label: "Unit Conversion Formulas",
              children: [
                { id: "c1-2-3-1", label: "Distance (A.U.) = Distance (km) ÷ (1.5 × 10⁸ km)" },
                { id: "c1-2-3-2", label: "Distance (ly) = Distance (km) ÷ (9.5 × 10¹² km)" },
              ],
            },
            {
              id: "c1-2-4",
              label: "Example Calculation — Earth",
              children: [
                { id: "c1-2-4-1", label: "Distance Earth-Sun = 1.5 × 10⁸ km" },
                { id: "c1-2-4-2", label: "In A.U. = (1.5 × 10⁸)/(1.5 × 10⁸) = 1.0 A.U." },
                { id: "c1-2-4-3", label: "In ly = (1.5 × 10⁸)/(9.5 × 10¹²) = 1.58 × 10⁻⁵ ly" },
              ],
            },
            {
              id: "c1-2-5",
              label: "Example Calculation — Saturn",
              children: [
                { id: "c1-2-5-1", label: "Distance of Saturn = 1.43 × 10⁹ km" },
                { id: "c1-2-5-2", label: "In A.U. = (1.43 × 10⁹)/(1.5 × 10⁸) = 9.5 A.U." },
                { id: "c1-2-5-3", label: "In ly = (1.43 × 10⁹)/(9.5 × 10¹²) = 1.51 × 10⁻⁴ ly" },
              ],
            },
          ],
        },
        {
          id: "c1-3",
          label: "Eight Planets (in order from the Sun)",
          children: [
            {
              id: "c1-3-1",
              label: "1. Mercury",
              children: [
                { id: "c1-3-1-1", label: "Closest planet to the Sun (~57.9 million km)" },
                { id: "c1-3-1-2", label: "Smallest planet in the solar system" },
                { id: "c1-3-1-3", label: "No atmosphere → sky appears dark in outer space" },
                { id: "c1-3-1-4", label: "Sun-facing side >427°C; dark side can drop to −173°C" },
                { id: "c1-3-1-5", label: "Takes 88 days to orbit the Sun (fastest)" },
                { id: "c1-3-1-6", label: "Lower gravity than Earth (lower mass)" },
              ],
            },
            {
              id: "c1-3-2",
              label: "2. Venus",
              children: [
                { id: "c1-3-2-1", label: "Second closest planet to the Sun (~108.2 million km)" },
                { id: "c1-3-2-2", label: "Known as the \"greenhouse\" planet — high carbon dioxide content" },
                { id: "c1-3-2-3", label: "Rotates east to west (opposite of Earth) — Sun rises in the west" },
                { id: "c1-3-2-4", label: "Temperature reaches up to 460°C / up to 462°C (greenhouse effect)" },
                { id: "c1-3-2-5", label: "Gravity almost same as Earth (similar mass)" },
              ],
            },
            {
              id: "c1-3-3",
              label: "3. Earth",
              children: [
                { id: "c1-3-3-1", label: "Distance from the Sun ~149.6 million km" },
                { id: "c1-3-3-2", label: "Only place in the universe inhabited by living things" },
                { id: "c1-3-3-3", label: "Atmosphere protects against solar wind, UV rays & radiation" },
                { id: "c1-3-3-4", label: "71% surface water, 29% land" },
                { id: "c1-3-3-5", label: "Gravity = 9.8 m s⁻² (reference standard)" },
                { id: "c1-3-3-6", label: "1 moon (natural satellite): the Moon" },
              ],
            },
            {
              id: "c1-3-4",
              label: "4. Mars",
              children: [
                { id: "c1-3-4-1", label: "Distance from the Sun ~227.9 million km" },
                { id: "c1-3-4-2", label: "Known as the \"Red Planet\"" },
                { id: "c1-3-4-3", label: "Two moons: Phobos and Demos" },
                { id: "c1-3-4-4", label: "Surface area = 25% of Earth; mass = 10% of Earth" },
                { id: "c1-3-4-5", label: "Surface pressure extremely low (<1/100 of Earth's pressure)" },
                { id: "c1-3-4-6", label: "Temperature fluctuates between −143°C to 35°C" },
                { id: "c1-3-4-7", label: "Lower gravity than Earth (lower mass)" },
              ],
            },
            {
              id: "c1-3-5",
              label: "5. Jupiter",
              children: [
                { id: "c1-3-5-1", label: "Distance from the Sun ~778.3 million km" },
                { id: "c1-3-5-2", label: "Largest planet in the solar system" },
                { id: "c1-3-5-3", label: "Mass almost 320 times that of Earth" },
                { id: "c1-3-5-4", label: "Called \"protector of the Earth\" — strong gravity deflects huge objects" },
                { id: "c1-3-5-5", label: "67 moons; Europa believed to have seawater beneath icy surface — possible life" },
                { id: "c1-3-5-6", label: "Much higher gravity than Earth (extremely high mass despite low density)" },
                { id: "c1-3-5-7", label: "Surface covered in gas, receives little sunlight, very low surface temperature" },
              ],
            },
            {
              id: "c1-3-6",
              label: "6. Saturn",
              children: [
                { id: "c1-3-6-1", label: "Distance from the Sun ~1,427 million km" },
                { id: "c1-3-6-2", label: "Second largest planet; classified as a \"giant gas\" planet" },
                { id: "c1-3-6-3", label: "Ring system mostly comprising ice" },
                { id: "c1-3-6-4", label: "62 moons; Titan (biggest moon) is bigger than Mercury" },
                { id: "c1-3-6-5", label: "Gravity not as high as Earth's despite high mass (low density)" },
              ],
            },
            {
              id: "c1-3-7",
              label: "7. Uranus",
              children: [
                { id: "c1-3-7-1", label: "Distance from the Sun ~2,871 million km" },
                { id: "c1-3-7-2", label: "Third biggest planet; known as a \"giant gas\" planet" },
                { id: "c1-3-7-3", label: "Ring system similar to Saturn's but thinner and darker" },
                { id: "c1-3-7-4", label: "Axis of rotation tilted, almost parallel to orbit — rotates on its side" },
                { id: "c1-3-7-5", label: "Takes 84 years to orbit the Sun" },
                { id: "c1-3-7-6", label: "Gravity not as high as Earth's despite high mass (low density)" },
              ],
            },
            {
              id: "c1-3-8",
              label: "8. Neptune",
              children: [
                { id: "c1-3-8-1", label: "Distance from the Sun ~4,497 million km" },
                { id: "c1-3-8-2", label: "Eighth planet; also classified as a \"giant gas\" planet" },
                { id: "c1-3-8-3", label: "Takes almost 165 years (164.8 years) to orbit the Sun — longest" },
                { id: "c1-3-8-4", label: "Gravity not as high as Earth's despite high mass (low density)" },
              ],
            },
          ],
        },
        {
          id: "c1-4",
          label: "Relationships & Patterns Between Planets",
          children: [
            {
              id: "c1-4-1",
              label: "Temperature vs the Sun",
              children: [
                { id: "c1-4-1-1", label: "Theory: closer to Sun = hotter, but reality is more complex" },
                { id: "c1-4-1-2", label: "No atmosphere (Mercury): sunlit side extremely hot, dark side extremely cold" },
                { id: "c1-4-1-3", label: "Greenhouse effect (Venus, Earth): atmosphere traps heat" },
                { id: "c1-4-1-4", label: "Mars: low pressure → minimal effect on surface temperature" },
                { id: "c1-4-1-5", label: "Giant gas planets (Jupiter, Saturn, Uranus, Neptune): gas surfaces, very low temperature" },
              ],
            },
            {
              id: "c1-4-2",
              label: "Density vs Gravitational Pull",
              children: [
                { id: "c1-4-2-1", label: "Gravity depends on a planet's mass and density" },
                { id: "c1-4-2-2", label: "Earth's gravity = 9.8 m s⁻² (reference)" },
                { id: "c1-4-2-3", label: "Mercury & Mars: lower gravity (lower mass)" },
                { id: "c1-4-2-4", label: "Venus: gravity almost same as Earth (similar mass)" },
                { id: "c1-4-2-5", label: "Jupiter: much higher gravity (extremely high mass despite low density)" },
                { id: "c1-4-2-6", label: "Saturn, Uranus, Neptune: gravity not as high as Earth's (low density despite high mass)" },
              ],
            },
            {
              id: "c1-4-3",
              label: "Distance, Time & Orbit Speed",
              children: [
                { id: "c1-4-3-1", label: "Further from the Sun, the longer the orbit time" },
                { id: "c1-4-3-2", label: "Mercury (closest): 88 days to orbit" },
                { id: "c1-4-3-3", label: "Neptune (furthest): 164.8 years to orbit" },
              ],
            },
            {
              id: "c1-4-4",
              label: "Rotational Direction of Planets",
              children: [
                { id: "c1-4-4-1", label: "All planets rotate west to east" },
                { id: "c1-4-4-2", label: "EXCEPT Venus (east to west)" },
                { id: "c1-4-4-3", label: "EXCEPT Uranus (rotates on its side)" },
              ],
            },
          ],
        },
        {
          id: "c1-5",
          label: "Natural Satellites",
          children: [
            { id: "c1-5-1", label: "Objects that move around planets on their own orbit" },
            { id: "c1-5-2", label: "The Moon = the only natural satellite of the Earth" },
            { id: "c1-5-3", label: "Rotation and orbit time of the Moon almost the same (~27 days)" },
            { id: "c1-5-4", label: "Result: the same surface of the Moon always faces the Earth" },
            { id: "c1-5-5", label: "Earth: 1 moon; Jupiter: 67 moons; Saturn: 62 moons" },
            { id: "c1-5-6", label: "Europa (Jupiter's moon): believed to have seawater beneath ice — possible life" },
          ],
        },
        {
          id: "c1-6",
          label: "Earth as a Planet for Living Things",
          children: [
            { id: "c1-6-1", label: "Plenty of water for all living processes" },
            { id: "c1-6-2", label: "High oxygen content for respiratory process" },
            { id: "c1-6-3", label: "Gravity that keeps objects from floating" },
            { id: "c1-6-4", label: "Sunlight for photosynthesis" },
            { id: "c1-6-5", label: "Suitable temperature range (not too hot or too cold)" },
            { id: "c1-6-6", label: "Atmosphere blocks harmful ultraviolet rays" },
          ],
        },
        {
          id: "c1-7",
          label: "Hypothetical Situation — If Earth's Rotation Slows Down/Stops",
          children: [
            { id: "c1-7-1", label: "Longer day/night duration in different parts of the Earth" },
            { id: "c1-7-2", label: "More desert areas in parts facing the Sun" },
            { id: "c1-7-3", label: "Change in high and low tides" },
            { id: "c1-7-4", label: "Temperature drops in areas that do not receive sunlight" },
          ],
        },
        {
          id: "c1-8",
          label: "Ecological Footprint",
          children: [
            { id: "c1-8-1", label: "Measure of water/land's ability to provide humans' basic needs" },
            { id: "c1-8-2", label: "Includes Earth's ability to absorb waste & regenerate resources" },
            {
              id: "c1-8-3",
              label: "Measured across 6 areas",
              children: [
                { id: "c1-8-3-1", label: "Carbon dioxide waste treatment areas" },
                { id: "c1-8-3-2", label: "Construction areas" },
                { id: "c1-8-3-3", label: "Forests" },
                { id: "c1-8-3-4", label: "Agricultural areas" },
                { id: "c1-8-3-5", label: "Farming areas" },
                { id: "c1-8-3-6", label: "Fishing areas" },
              ],
            },
            { id: "c1-8-4", label: "If footprint exceeds Earth's ability to renew → Earth depleted of resources" },
          ],
        },
        {
          id: "c1-9",
          label: "Keywords",
          children: [
            { id: "c1-9-1", label: "Solar system" },
            { id: "c1-9-2", label: "Astronomical unit (A.U.)" },
            { id: "c1-9-3", label: "Light years" },
            { id: "c1-9-4", label: "Planets" },
            { id: "c1-9-5", label: "Natural satellite" },
            { id: "c1-9-6", label: "Ecological footprint" },
          ],
        },
        {
          id: "c1-10",
          label: "Subtopic Summary",
          children: [
            { id: "c1-10-1", label: "Eight planets orbit the Sun at distances measured in A.U. and ly" },
            { id: "c1-10-2", label: "Each planet unique: distance, temperature, density, gravity, orbit time" },
            { id: "c1-10-3", label: "Earth most suitable for life: water, oxygen, moderate temperature, protective atmosphere" },
            { id: "c1-10-4", label: "Ecological footprint measures sustainability of humans' use of Earth's resources" },
          ],
        },
      ],
    },
  ],
};
