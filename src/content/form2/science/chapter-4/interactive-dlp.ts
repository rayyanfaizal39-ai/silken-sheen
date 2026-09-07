import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch4-kesihatan-manusia.png";
import transmissionRoutesImg from "@/assets/notes/form2-science/chapter-4/chapter4_infectious_disease_transmission.webp";
import vectorPathogenDiseaseImg from "@/assets/notes/form2-science/chapter-4/chapter4_vector_pathogen_disease.webp";
import bodyDefenceImg from "@/assets/notes/form2-science/chapter-4/chapter4_three_lines_body_defence.webp";

export const scienceF2C4InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 4,
  blogHighlight: {
    title: "Science Blog — The Zika Virus",
    body: "Zika is spread mainly by the Aedes mosquito. Clearing stagnant water breaks the vector's breeding cycle and cuts transmission before anyone falls ill.",
    imagePath: chapterImage,
  },
  keywords: [
    "Pathogen",
    "Vector",
    "Infectious disease",
    "Non-infectious disease",
    "Phagocytosis",
    "Antigen",
    "Antibody",
    "Immunity",
    "Antiserum",
    "Immunisation",
  ],
  sections: [
    // ───────────────────────────────────────────── 1. Infectious / non-infectious
    {
      number: "4.1",
      title: "Infectious and Non-Infectious Diseases",
      intro:
        "A disease is an abnormal condition of body or mind that causes discomfort, difficulty to function or stress to an individual.",
      comparison: {
        title: "Two groups of disease",
        columns: [
          {
            title: "🦠 Infectious disease",
            body: "",
            facts: [
              {
                label: "Definition",
                value: "A disease that **can be transmitted** from one individual to another.",
              },
              {
                label: "Cause",
                value: "Caused by infection of pathogens directly, or through mediums and vectors.",
              },
              {
                label: "Examples",
                value: [
                  "Tuberculosis",
                  "Flu",
                  "Ringworm",
                  "Tinea",
                  "Leptospirosis",
                  "Dengue fever",
                  "Malaria fever",
                  "Zika fever",
                ],
              },
            ],
          },
          {
            title: "🧬 Non-infectious disease",
            body: "",
            facts: [
              {
                label: "Definition",
                value: "A disease that **cannot be transmitted** from one individual to another.",
              },
              {
                label: "Cause",
                value: "Caused by genetic factors or lifestyle.",
              },
              {
                label: "Examples",
                value: ["Cancer", "Hypertension", "Diabetes", "Asthma", "Cardiovascular disease"],
              },
            ],
          },
        ],
      },
      cards: [
        {
          title: "What is a pathogen?",
          body: "A pathogen is an organism that causes disease. Examples: **all viruses, some bacteria, protozoa, fungi and worms**.",
        },
        {
          title: "Not every microorganism is harmful",
          body: "Some bacteria in the large intestine act on food residue and produce **vitamin K and vitamin B12**, which are absorbed by the body.",
        },
      ],
      checks: [
        {
          question: "Why is dengue an infectious disease while diabetes is not?",
          hint: "Dengue is caused by a pathogen that can be passed to others; diabetes comes from genetic or lifestyle factors and does not spread.",
        },
        {
          question: "Give one example of a disease caused by a fungus.",
          hint: "Ringworm or tinea — both spread by contact.",
        },
      ],
    },

    // ───────────────────────────────────────────── 2. Transmission — image first
    {
      number: "4.1",
      title: "How Infectious Diseases Spread",
      intro:
        "Pathogens move from one host to another along four main routes. Tap each route to see how it spreads, example diseases and how to prevent it.",
      conceptSelector: {
        instruction: "Tap a route to see how it spreads.",
        prompt: "Tap any route above to see how it spreads.",
        image: {
          src: transmissionRoutesImg,
          alt: "Four routes by which infectious diseases spread: through the air, through water, through contact and through vectors.",
          size: "wide",
          aspect: "4 / 3",
          legendLabel: "The four routes of transmission",
          annotationMode: "regions",
          caption: "Each route is already named on the artwork. Tap one to see how it spreads.",
        },
        concepts: [
          {
            id: "air",
            label: "Airborne diseases",
            note: "Transmitted in two ways: droplet transmission and dust transmission.",
            x: 26,
            y: 28,
            w: 44,
            h: 40,
            facts: [
              {
                label: "Examples",
                value: ["Tuberculosis", "Flu", "SARS", "Influenza A (H1N1)", "Chicken pox"],
              },
              {
                label: "Prevention",
                value: [
                  "Cover the mouth and nose when sneezing, coughing or yawning",
                  "Do not spit everywhere",
                  "Avoid crowded places",
                  "Keep living spaces well lit — ultraviolet rays can kill some airborne microorganisms",
                ],
              },
            ],
          },
          {
            id: "water",
            label: "Waterborne diseases",
            note: "Common in areas with inadequate water supply and poor sanitation — faecal pathogens pollute the water, and a person is infected by drinking it.",
            x: 74,
            y: 28,
            w: 44,
            h: 40,
            facts: [
              { label: "Examples", value: ["Cholera", "Typhoid", "Amoebic dysentery"] },
              {
                label: "Prevention",
                value: [
                  "Add chlorine into swimming pools and water supply systems",
                  "Build toilets with good sanitation",
                  "Boil drinking water properly",
                  "Wash hands with soap after using the toilet",
                ],
              },
            ],
          },
          {
            id: "contact",
            label: "Diseases spread through contact",
            note: "Happens when touching infected skin, or wearing the clothes of an infected person.",
            x: 26,
            y: 71,
            w: 44,
            h: 40,
            facts: [
              {
                label: "Examples",
                value: [
                  "Ringworm and tinea (caused by fungi)",
                  "Syphilis and gonorrhoea (sexual intercourse)",
                  "HIV/AIDS (sexual intercourse, blood, shared needles)",
                ],
              },
              {
                label: "Prevention",
                value: ["Keep clean", "Never share clothing or personal items"],
              },
            ],
          },
          {
            id: "vector",
            label: "Vector-borne diseases",
            note: "Some pathogens are transmitted from one host to a new host through animals — these animals are called vectors.",
            x: 74,
            y: 71,
            w: 44,
            h: 40,
            facts: [
              {
                label: "Examples",
                value: ["Leptospirosis", "Dengue fever", "Malaria", "Zika", "Chikungunya"],
              },
              {
                label: "Prevention",
                value: [
                  "Destroy vector breeding sites",
                  "Use mosquito nets or repellent",
                  "Wear clothing that covers the skin",
                ],
              },
            ],
          },
        ],
      },
      checks: [
        {
          question: "State three ways infectious diseases are spread.",
          hint: "Any three of: air, water, contact and vectors.",
        },
        {
          question: "Why can floods spread infectious diseases?",
          hint: "Floodwater mixes contaminated water and sewage with clean supplies, so waterborne pathogens spread easily.",
        },
      ],
    },

    // ───────────────────────────────────────────── 3. Vector-borne diseases
    {
      number: "4.1",
      title: "Vector-Borne Diseases",
      intro:
        "Separate these three terms by asking: what CAUSES the disease, what CARRIES that cause, and what CONDITION results?",
      cards: [
        {
          title: "🦠 Pathogen",
          body: "Organism that causes disease. Examples: dengue virus, the bacterium Salmonella typhi.",
        },
        {
          title: "🐀 Vector",
          body: "Animal that transfers a pathogen from one host to another. Examples: Aedes mosquito, Anopheles mosquito, rat, cockroach, fly.",
        },
        {
          title: "🤒 Disease",
          body: "The condition resulting from infection. Examples: dengue fever, malaria, leptospirosis.",
        },
      ],
      diseaseReferenceTable: {
        title: "Disease, Symptoms, Pathogen, Vector and Way of Infection",
        diseaseLabel: "Disease",
        symptomsLabel: "Symptoms",
        pathogenLabel: "Pathogen",
        vectorLabel: "Vector",
        wayOfInfectionLabel: "Way of Infection",
        rows: [
          {
            id: "malaria",
            icon: "🦟",
            disease: "Malaria",
            symptoms: ["Shivering", "Fever", "Sweating"],
            pathogen: "Plasmodium malariae",
            vector: "Female Anopheles mosquito",
            wayOfInfection: "Mosquito bite",
          },
          {
            id: "cholera",
            icon: "🪰",
            disease: "Cholera",
            symptoms: ["Diarrhoea", "Vomiting"],
            pathogen: "Vibrio cholerae bacteria",
            vector: "Fly",
            wayOfInfection: "Contaminated food and water",
          },
          {
            id: "dengue",
            icon: "🦟",
            disease: "Dengue",
            symptoms: ["Joint pain", "Fever", "Headache", "Watery eyes"],
            pathogen: "Dengue virus",
            vector: "Aedes mosquito",
            wayOfInfection: "Mosquito bite",
          },
          {
            id: "zika",
            icon: "🦟",
            disease: "Zika",
            symptoms: ["Fever", "Rashes", "Joint pain", "Conjunctivitis"],
            pathogen: "Zika virus",
            vector: "Aedes mosquito",
            wayOfInfection: "Mosquito bite",
          },
          {
            id: "typhoid",
            icon: "🪳",
            disease: "Typhoid",
            symptoms: ["Fever", "Intestinal bleeding", "Red rashes"],
            pathogen: "Salmonella typhi bacteria",
            vector: "Cockroach, fly, rat",
            wayOfInfection: "Contaminated food and water",
          },
          {
            id: "leptospirosis",
            icon: "🐀",
            disease: "Leptospirosis",
            symptoms: ["Fever", "Headache", "Muscle pain"],
            pathogen: "Leptospira sp. bacteria",
            vector: "Rat",
            wayOfInfection: "Contaminated soil, food and water",
          },
        ],
      },
      images: [
        {
          src: vectorPathogenDiseaseImg,
          alt: "Three chains showing a vector carrying a pathogen that causes a disease: Aedes mosquito to dengue virus to dengue; rat to Leptospira bacteria to leptospirosis; housefly or cockroach to Salmonella typhi to typhoid.",
          size: "wide",
          aspect: "4 / 3",
          legendLabel: "Vector, pathogen and disease",
          annotationMode: "regions",
          caption:
            "Read each row left to right. The vector only carries; the pathogen is what causes the disease.",
          annotations: [
            {
              id: "vector",
              label: "Vector",
              note: "The animal that carries the pathogen to a new host — the Aedes mosquito, the rat, the housefly or the cockroach. It does not cause the disease itself.",
              x: 19,
              y: 55,
              w: 24,
              h: 78,
            },
            {
              id: "pathogen",
              label: "Pathogen",
              note: "The disease-causing microorganism the vector carries — dengue virus, Leptospira bacteria, Salmonella typhi.",
              x: 49,
              y: 55,
              w: 22,
              h: 78,
            },
            {
              id: "disease",
              label: "Disease",
              note: "The condition that results once the pathogen infects the body — dengue fever, leptospirosis, typhoid.",
              x: 80,
              y: 55,
              w: 24,
              h: 78,
            },
          ],
        },
      ],
      causeEffect: {
        title: "How Do Vectors Spread Diseases?",
        instruction: "Mosquitoes and flies are important vectors that spread infectious diseases.",
        items: [
          {
            icon: "🦟",
            title: "Mosquito",
            chain: [
              "A mosquito already carrying pathogens bites an uninfected person",
              "Saliva (and the pathogen) enters during blood feeding",
              "Infection spreads; another mosquito may transmit it onward",
            ],
          },
          {
            icon: "🪰",
            title: "Fly",
            chain: [
              "A fly lands on dirt/waste and pathogens attach to its legs and body",
              "The fly transfers pathogens onto food",
              "The pathogen enters a person who eats the contaminated food",
            ],
          },
        ],
      },
      checks: [
        {
          question: "What is the difference between a pathogen and a vector?",
          hint: "A pathogen is the organism that causes the disease; a vector is the animal that carries that pathogen from one host to another.",
        },
        {
          question: "Name another disease spread by the same vector as dengue fever.",
          hint: "Zika or Chikungunya — both are also carried by the Aedes mosquito.",
        },
      ],
    },

    // ───────────────────────────────────────────── 4. Prevention
    {
      number: "4.1",
      title: "Preventing the Spread of Infectious Diseases",
      intro: "Prevention of infectious diseases works at three stages.",
      sequence: {
        title: "The three stages of prevention",
        instruction: "Follow the order from before infection through to controlling spread.",
        steps: [
          {
            title: "Primary Stage",
            body: "",
            facts: [
              {
                label: "Improving health",
                value: ["Personal and family hygiene", "Clean living environment and sanitation"],
              },
              {
                label: "Strengthening body defence",
                value: [
                  "Vaccination / immunisation for babies, children, pregnant women, food premises operators, hajj pilgrims and travellers",
                ],
              },
            ],
          },
          {
            title: "Secondary Stage",
            body: "",
            facts: [
              {
                label: "What it does",
                value: [
                  "Frequent health check-ups",
                  "Healthy lifestyle",
                  "Active and passive case detection",
                  "Early treatment",
                  "Isolating infected patients",
                ],
              },
            ],
          },
          {
            title: "Tertiary Stage",
            body: "",
            facts: [
              {
                label: "Controlling vector populations",
                value: ["Destroy breeding/hiding places", "Fogging", "Enforcement"],
              },
              {
                label: "Protecting hosts",
                value: ["Mosquito nets / coils", "Suitable protective clothing"],
              },
            ],
          },
        ],
      },
      checks: [
        {
          question: "At which stage of prevention is fogging to kill mosquitoes carried out?",
          hint: "The tertiary stage — together with destroying breeding sites and protecting the host.",
        },
        {
          question: "Why are haj pilgrims and food premises handlers encouraged to be immunised?",
          hint: "They face a higher risk of infection or could pass pathogens to many people, so their body resistance needs raising in advance.",
        },
      ],
    },

    // ───────────────────────────────────────────── 5. Body Defence
    {
      number: "4.2",
      title: "Body Defence",
      intro:
        "Pathogens enter the body through the respiratory system, digestive system, excretory system and skin. Our body has three lines of defence to destroy pathogens before and after they enter the body.",
      cards: [
        {
          title: "Non-Specific Defence",
          body: "**Attacks any pathogen**, whatever its type.",
          facts: [{ label: "Lines", value: "First and second lines of defence" }],
        },
        {
          title: "Specific Defence",
          body: "**Attacks one particular pathogen**, using a matching antibody.",
          facts: [{ label: "Line", value: "Third line of defence" }],
        },
        {
          title: "Antigen",
          body: "A foreign substance that comes from outside the body and **induces the production of antibodies**. Examples: pathogens, toxin molecules, blood cells from other blood groups.",
        },
        {
          title: "Antibody",
          body: "A protein produced by white blood cells into the bloodstream in **response to an antigen**.",
        },
        {
          title: "Immunity",
          body: "The ability of the body's system to **resist pathogens before it is infected**.",
        },
      ],
      defenceLines: {
        image: {
          src: bodyDefenceImg,
          alt: "The three lines of body defence: skin and mucous membrane, phagocytosis by a white blood cell, and antibodies produced by lymphocytes.",
          size: "wide",
          aspect: "4 / 3",
          annotationMode: "regions",
          legendLabel: "The three lines of defence",
          points: [
            { id: "pertama", x: 19, y: 48, w: 32, h: 78 },
            { id: "kedua", x: 51, y: 48, w: 30, h: 78 },
            { id: "ketiga", x: 82, y: 48, w: 30, h: 78 },
          ],
        },
        title: "Tap each line to see how it works",
        instruction: "Tap any line of defence to see what it does.",
        pathogenLabel: "Pathogen",
        nonSpecificLabel: "Non-specific defence",
        specificLabel: "Specific defence",
        hint: "Tap any line of defence to see what it does.",
        lines: [
          {
            id: "pertama",
            name: "First Line",
            parts: "Skin and mucous membrane",
            group: "non-specific",
            note: "Prevents pathogens from entering the body.",
            facts: [
              {
                label: "Skin",
                value: [
                  "Tough layer, difficult for microorganisms to penetrate",
                  "Microorganisms enter through wounds/injuries",
                  "Sweat and sebum contain chemicals that kill microorganisms",
                ],
              },
              {
                label: "Mucous Membrane",
                value: [
                  "Lines the digestive and respiratory tracts",
                  "Nasal hairs filter microorganisms",
                  "Mucus traps microorganisms",
                  "Earwax, tears and vaginal secretions act as antiseptics",
                ],
              },
            ],
          },
          {
            id: "kedua",
            name: "Second Line",
            parts: "Phagocytosis by white blood cells",
            group: "non-specific",
            note: "Fights pathogens through phagocytosis.",
            facts: [
              {
                label: "How it works",
                value: [
                  "White blood cells engulf pathogens",
                  "Pathogens are digested using enzymes",
                ],
              },
            ],
          },
          {
            id: "ketiga",
            name: "Third Line",
            parts: "Antibody production by the immune system",
            group: "specific",
            note: "Specific defence using antibodies.",
            facts: [
              {
                label: "How it works",
                value: [
                  "White blood cells produce antibodies in response to antigens",
                  "Antibodies attach to pathogens",
                  "Prevent pathogens entering host cells",
                  "Cause pathogens to clump together",
                ],
              },
            ],
          },
        ],
      },
      checks: [
        {
          question: "If someone has a cut on their skin, which defence is affected?",
          hint: "The first line — microorganisms can only get through the skin where there is a wound or injury.",
        },
        {
          question: "What is the main difference between an antigen and an antibody?",
          hint: "An antigen is the foreign substance that stimulates; an antibody is the protein white blood cells produce in response.",
        },
      ],
    },

    // ───────────────────────────────────────────── 6. Immunisation
    {
      number: "4.2",
      title: "Importance of Immunisation",
      intro:
        "Immunisation is an effort to stimulate the body's defence against infections in babies, children and adults by injecting vaccines.",
      cards: [
        {
          title: "What is in a vaccine?",
          body: "A vaccine contains antigens obtained from a part or the whole structure of a virus/bacterium that has been **weakened or killed**.",
        },
        {
          title: "How does a vaccine work?",
          body: "Antigens in the vaccine **stimulate the body's immune system**, forming immunity against certain infections — without causing the actual disease.",
        },
        {
          title: "Why several different vaccines?",
          body: "A baby needs to be injected with several types of vaccines according to the Malaysian vaccination schedule.",
        },
        {
          title: "Are vaccines safe?",
          body: "Yes. Vaccines used by the Ministry of Health Malaysia have been evaluated according to international standards, including for babies and children.",
        },
      ],
      accordions: [
        {
          title: "💉 Vaccination schedule in Malaysia (selected vaccines)",
          body: "",
          facts: [
            { label: "BCG", value: "Protection against Tuberculosis." },
            {
              label: "DTaP",
              value: "Combination of Diphtheria, Tetanus and Pertussis (whooping cough).",
            },
            { label: "Hib", value: "Haemophilus influenzae type B." },
            { label: "IPV", value: "Inactivated Polio Vaccine — protects against Polio." },
            { label: "MMR", value: "Combination of Measles, Mumps and Rubella." },
            { label: "HPV", value: "Given only to girls aged 13." },
            { label: "Hepatitis B", value: "Given starting at birth, in multiple doses." },
          ],
        },
        {
          title: "🔁 Why are booster doses needed?",
          body: "Some vaccines are given more than once. Repeated exposure to the same antigen produces **a higher and faster antibody response**, so protection becomes stronger and lasts longer.",
        },
      ],
      causeEffect: {
        title: "Why immunisation matters to society, not just the individual",
        instruction: "Follow the chain of effects from one immunised child.",
        items: [
          {
            icon: "🛡️",
            title: "Immunisation is widespread among the population",
            chain: [
              "Fewer people can be infected",
              "Diseases such as leprosy, whooping cough and tuberculosis stay better controlled",
            ],
            note: "Immunisation helps **CONTROL the recurrence of disease** and reduces the risk of spreading it to others.",
          },
        ],
      },
      checks: [
        {
          question: "What does a vaccine contain?",
          hint: "Antigens from a virus or bacterium that has been weakened or killed.",
        },
        {
          question: "Explain why immunisation is given to babies and children.",
          hint: "To build active resistance to particular diseases early, before they are exposed to those pathogens.",
        },
      ],
    },

    // ───────────────────────────────────────────── 7. Active and passive immunity
    {
      number: "4.2",
      title: "Active and Passive Immunity",
      intro:
        "Two questions decide the type of immunity: does the body make its own antibodies, and how were those antibodies acquired?",
      cards: [
        {
          title: "🛡️ Active Immunity",
          body: "The body produces **its own antibodies**.",
        },
        {
          title: "💉 Passive Immunity",
          body: "The body receives **antibodies from an outside source**.",
        },
      ],
      immunityMatrix: {
        title: "The four types of immunity",
        instruction: "Tap any box to see the details of that type of immunity.",
        activeLabel: "Active",
        passiveLabel: "Passive",
        naturalLabel: "Natural",
        artificialLabel: "Artificial",
        hint: "Tap any box to see the details of that type of immunity.",
        cells: [
          {
            id: "aktif-semula-jadi",
            row: "active",
            column: "natural",
            name: "Natural Active Immunity",
            source: "After recovering from an infection",
            duration: "Long-lasting",
            note: "Occurs when a person recovers from an infection — antibodies build up during the infection and last long after.",
            graphNote:
              "Antibody level rises slowly after the first infection, then rises higher and faster after a second infection by the same pathogen.",
          },
          {
            id: "aktif-buatan",
            row: "active",
            column: "artificial",
            name: "Artificial Active Immunity",
            source: "Through a vaccine injection",
            duration: "Long-lasting",
            note: "Occurs when a vaccine containing a dead/weakened pathogen is injected; the immune system responds by producing its own antibodies.",
            graphNote:
              "Antibody level rises after the first vaccine dose, then rises higher and faster after a booster dose.",
          },
          {
            id: "pasif-semula-jadi",
            row: "passive",
            column: "natural",
            name: "Natural Passive Immunity",
            source: "Antibodies from the mother, via placenta/breast milk",
            duration: "Temporary and short-lived",
            note: "Baby receives antibodies from breast milk or from the mother's blood across the placenta. Lasts only the first few months after birth.",
            graphNote:
              "Antibody level is highest at birth, then falls gradually over the following months.",
          },
          {
            id: "pasif-buatan",
            row: "passive",
            column: "artificial",
            name: "Artificial Passive Immunity",
            source: "An antiserum injection",
            duration: "Fast-acting but temporary",
            note: "An antiserum (a clear liquid containing antibodies) is injected into the patient's body; it fights pathogens without interrupting the patient's own immune system.",
            graphNote:
              "Antibody level is high right after the injection, then falls because the body does not replace these antibodies.",
          },
        ],
      },
      checks: [
        {
          question: "Why is passive immunity always temporary?",
          hint: "The body does not make those antibodies itself — the antibodies received from outside are eventually broken down and not replaced.",
        },
        {
          question: "Which immunity acts fastest, and why?",
          hint: "Artificial passive immunity — ready-made antibodies are injected directly, so no time is needed for the body to produce them.",
        },
      ],
    },

    // ───────────────────────────────────────────── 8. Strong immune system
    {
      number: "4.2",
      title: "Maintaining a Strong Immune System",
      intro:
        "The immune system becomes weak when there is an imbalance in the body or too much toxin exposure.",
      cards: [
        {
          title: "🥗 Nutrition",
          body: "Eat balanced meals including local vegetables and fruit. **Avoid taking sugar in excess**, since it weakens the immune system.",
        },
        {
          title: "🏃 Physical activity",
          body: "Exercising and inhaling fresh air strengthen the immune system.",
        },
        {
          title: "🌿 Lifestyle",
          body: "Get enough rest and sleep, do not smoke and avoid cigarette smoke, and go for periodic health checks.",
        },
      ],
      comparison: {
        title: "What weakens it and what strengthens it",
        columns: [
          {
            title: "Causes of a weakened immune system",
            body: "Exposure to polluted air; exposure to pesticides; **stress**; excessive intake of sugar; smoking.",
          },
          {
            title: "Practices that strengthen the immune system",
            body: "**Getting enough sleep and rest**; exercising and inhaling fresh air; not smoking and avoiding cigarette smoke; periodic health examinations.",
          },
        ],
      },
      accordions: [
        {
          title: "⭐ Enrichment — allergies",
          body: "An allergy is the response of the body's immune system to an allergen — a substance that is usually harmless to most people. Examples of allergens: mites, animal hair, dust, pollen, spores, food (seafood, milk, eggs), animal stings and some medicines.",
        },
      ],
      checks: [
        {
          question: "Suggest two practices that weaken a person's immune system.",
          hint: "Any two of: exposure to polluted air or pesticides, stress, and taking sugar in excess.",
        },
        {
          question: "How does enough sleep help the immune system?",
          hint: "Enough rest lets the body recover and keeps the immune system in a strong condition.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can tell infectious and non-infectious diseases apart and give examples.",
    "I can explain how infectious diseases are spread.",
    "I can tell a vector apart from a pathogen and the disease that results.",
    "I can compare the three stages of disease prevention.",
    "I can tell non-specific and specific defence apart.",
    "I can define antigen, antibody and immunity.",
    "I can explain the three lines of body defence.",
    "I can justify the importance of immunisation.",
    "I can tell active and passive immunity apart.",
    "I can explain the four types of immunity.",
    "I can justify practices towards a strong immune system.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Antibiotics can cure influenza.",
      answer: false,
      explanation: "Influenza is caused by a virus; antibiotics target bacteria.",
    },
    {
      type: "multiple-choice",
      question: "At which stage of prevention is vector population control carried out?",
      options: ["Primary stage", "Secondary stage", "Tertiary stage", "Before immunisation"],
      answerIndex: 2,
      explanation:
        "The tertiary stage covers vector population control and host protection such as using mosquito nets.",
    },
    {
      type: "multiple-choice",
      question: "The body's second line of defence works through what?",
      options: [
        "Antibody production",
        "Phagocytosis by white blood cells",
        "Skin and mucous membrane",
        "An antiserum injection",
      ],
      answerIndex: 1,
      explanation:
        "White blood cells engulf and digest pathogens using enzymes — this process is called phagocytosis.",
    },
  ],
};
