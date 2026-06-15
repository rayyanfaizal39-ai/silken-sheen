import type { StructuredNotes } from "./types";

export const scienceF1C8NotesDLP: StructuredNotes = {
  quickRevision: [
    "Light is a form of energy that allows us to see objects around us.",
    "Light travels in a straight line, travels faster than sound and can travel through vacuum.",
    "A plane mirror forms an upright, virtual, laterally inverted image with the same size as the object.",
    "Reflection occurs when light bounces off a surface, and the angle of incidence equals the angle of reflection.",
    "Refraction is the bending of light when it passes between media of different densities.",
    "Dispersion separates white light into seven colours: red, orange, yellow, green, blue, indigo and violet.",
    "Optical instruments such as periscopes, kaleidoscopes and sundials use properties of light.",
  ],
  sections: [
    {
      title: "8.1 Introduction to Light",
      subsections: [
        {
          title: "Definition of Light",
          content: "Light is a form of energy that allows us to see objects around us.",
        },
        {
          title: "Properties of Light",
          bulletPoints: [
            "Travels in a straight line.",
            "Travels faster than sound.",
            "Speed of light = 3.0 x 10^8 m/s.",
            "Can travel through vacuum.",
          ],
        },
        {
          title: "Formation of Shadows",
          bulletPoints: [
            "Shadows are formed when light is blocked by opaque objects.",
            "Shadow length changes according to the position of the Sun.",
            "The shortest shadow occurs at noon.",
          ],
        },
      ],
    },
    {
      title: "8.2 Mirrors and Images",
      subsections: [
        {
          title: "Types of Images",
          table: {
            headers: ["Type of Image", "Characteristics", "Example"],
            rows: [
              ["Real image", "Can be formed on a screen", "Projector image"],
              ["Virtual image", "Cannot be formed on a screen", "Image seen in a mirror"],
            ],
          },
        },
        {
          title: "Plane Mirror",
          bulletPoints: [
            "Image is upright.",
            "Image is virtual.",
            "Image is laterally inverted.",
            "Image has the same size as the object.",
            "Image distance equals object distance.",
            "Used in dance studios, elevators and dressing mirrors.",
          ],
        },
        {
          title: "Concave Mirror",
          bulletPoints: [
            "Magnifies images.",
            "Makes objects appear larger.",
            "Used as dentist mirrors and makeup mirrors.",
          ],
        },
        {
          title: "Convex Mirror",
          bulletPoints: [
            "Has a wider field of view.",
            "Used as road safety mirrors, supermarket security mirrors and bicycle mirrors.",
          ],
        },
      ],
    },
    {
      title: "8.3 Reflection of Light",
      subsections: [
        {
          title: "Definition",
          content: "Reflection occurs when light bounces off a surface.",
        },
        {
          title: "Laws of Reflection",
          bulletPoints: [
            "Incident ray, reflected ray and normal lie on the same plane.",
            "Angle of incidence equals angle of reflection.",
          ],
          formula: "i = r",
        },
        {
          title: "Applications",
          bulletPoints: ["Reflective road signs", "Reflective safety jackets"],
        },
      ],
    },
    {
      title: "8.4 Refraction of Light",
      subsections: [
        {
          title: "Definition",
          content:
            "Refraction is the bending of light when it passes between media of different densities.",
        },
        {
          title: "Principles of Refraction",
          table: {
            headers: ["Situation", "Effect"],
            rows: [
              ["Less dense to more dense", "Light bends towards the normal"],
              ["More dense to less dense", "Light bends away from the normal"],
              ["Along the normal", "No refraction occurs"],
            ],
          },
        },
        {
          title: "Effects of Refraction",
          bulletPoints: [
            "Swimming pools appear shallower.",
            "A pencil appears bent in water.",
            "Fish appear closer to the surface.",
          ],
        },
      ],
    },
    {
      title: "8.5 Dispersion of Light",
      subsections: [
        {
          title: "Definition",
          content: "Dispersion is the separation of white light into seven colours using a prism.",
        },
        {
          title: "Spectrum Colours",
          bulletPoints: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"],
        },
        {
          title: "Characteristics",
          bulletPoints: [
            "Red light refracts the least.",
            "Violet light refracts the most.",
          ],
        },
        {
          title: "Rainbow Formation",
          content:
            "Rainbows form when sunlight is refracted and dispersed by water droplets.",
        },
      ],
    },
    {
      title: "8.6 Scattering of Light",
      subsections: [
        {
          title: "Definition",
          content:
            "Scattering occurs when light is reflected in many directions by particles in the atmosphere.",
        },
        {
          title: "Midday Sky",
          bulletPoints: [
            "Blue light is scattered the most.",
            "The sky appears blue.",
          ],
        },
        {
          title: "Sunset Sky",
          bulletPoints: [
            "Blue light is scattered away.",
            "Red and orange light reach our eyes.",
            "The sky appears reddish-orange.",
          ],
        },
      ],
    },
    {
      title: "8.7 Addition and Subtraction of Light",
      subsections: [
        {
          title: "Addition of Light",
          table: {
            headers: ["Light Combination", "Result"],
            rows: [
              ["Red + Blue", "Magenta"],
              ["Red + Green", "Yellow"],
              ["Blue + Green", "Cyan"],
              ["Red + Green + Blue", "White"],
            ],
          },
        },
        {
          title: "Subtraction of Light",
          table: {
            headers: ["Object", "Effect"],
            rows: [
              ["White object", "Reflects all colours"],
              ["Black object", "Absorbs all colours"],
              ["Primary colour object", "Reflects its own colour"],
              ["Secondary colour object", "Reflects its own colour and component colours"],
            ],
          },
        },
        {
          title: "Colour Filters",
          table: {
            headers: ["Filter", "Effect"],
            rows: [
              ["Primary filter", "Allows only its own colour to pass through"],
              ["Secondary filter", "Allows its own colour and component colours to pass through"],
            ],
          },
        },
      ],
    },
    {
      title: "8.8 Optical Instruments",
      subsections: [
        {
          title: "Periscope",
          bulletPoints: [
            "Uses two plane mirrors.",
            "Mirrors are positioned at 45 degrees.",
            "Used in submarines.",
          ],
        },
        {
          title: "Kaleidoscope",
          bulletPoints: [
            "Uses multiple reflections.",
            "Produces colourful patterns.",
          ],
        },
        {
          title: "Sundial",
          bulletPoints: [
            "Uses shadow formation.",
            "Estimates time based on shadow position.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Light is a form of energy and travels in a straight line.",
    "A real image can be formed on a screen, but a virtual image cannot.",
    "A plane mirror produces an upright, virtual and laterally inverted image.",
    "In reflection, angle of incidence equals angle of reflection.",
    "Light bends towards the normal when it travels from a less dense medium to a more dense medium.",
    "White light disperses into seven colours through a prism.",
    "Blue light is scattered the most, making the midday sky appear blue.",
  ],
  keyTerms: [
    "Light",
    "Shadow",
    "Opaque object",
    "Real image",
    "Virtual image",
    "Plane mirror",
    "Concave mirror",
    "Convex mirror",
    "Reflection",
    "Refraction",
    "Dispersion",
    "Spectrum",
    "Scattering",
    "Primary colours",
    "Secondary colours",
    "Colour filter",
    "Periscope",
    "Kaleidoscope",
    "Sundial",
  ],
  chapterSummary:
    "Chapter 8 explains the properties of light, formation of shadows, mirrors and images, reflection, refraction, dispersion, scattering, addition and subtraction of light, colour filters and optical instruments.",
};
