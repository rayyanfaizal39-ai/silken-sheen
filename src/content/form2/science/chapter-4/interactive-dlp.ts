import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch4-kesihatan-manusia.png";

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
    // ───────────────────────────────────────────── Disease types
    {
      number: "4.1",
      title: "Infectious and Non-Infectious Diseases",
      intro:
        "A disease is an abnormal condition of the body or mind that causes discomfort, difficulty functioning or stress to a person. Diseases fall into two broad groups according to one simple question: can it pass to another person?",
      comparison: {
        title: "Two groups of disease",
        columns: [
          {
            title: "Infectious disease",
            body: "Can pass from one individual to another. Caused by infection with a pathogen, either directly or through a medium and a vector. Examples: tuberculosis, the common cold, ringworm, tinea versicolor, leptospirosis, dengue fever, malaria and Zika.",
          },
          {
            title: "Non-infectious disease",
            body: "Does not pass from one individual to another. Caused by genetic factors or lifestyle. Examples: cancer, hypertension, diabetes, asthma and cardiovascular disease.",
          },
        ],
      },
      cards: [
        {
          title: "What is a pathogen?",
          body: "A pathogen is an organism that causes disease — all viruses, some bacteria, protozoa, fungi and worms.",
        },
        {
          title: "Not every microorganism is harmful",
          body: "Some bacteria in the large intestine act on food remains and produce vitamin K and vitamin B12, which the body can use.",
        },
      ],
      checks: [
        {
          question: "Why is dengue an infectious disease while diabetes is not?",
          hint: "Dengue is caused by a pathogen that can be passed to others; diabetes comes from genetic or lifestyle factors and does not spread.",
        },
        {
          question: "Give one example of a disease caused by a fungus.",
          hint: "Ringworm or tinea versicolor — both spread by contact.",
        },
      ],
    },

    // ───────────────────────────────────────────── Transmission
    {
      number: "4.1",
      title: "How Infectious Diseases Spread",
      intro:
        "Pathogens move from one host to another along four main routes: air, water, contact and vectors. Tap each route to see example diseases and how to prevent them.",
      accordions: [
        {
          title: "💨 Through the air",
          body: "Pathogens are carried by droplets of saliva or by dust. There are two forms of airborne infection: droplet infection and dust infection. Example diseases: tuberculosis, the common cold, SARS, Influenza A (H1N1) and chickenpox. Prevention: cover the mouth and nose when sneezing, coughing or yawning; do not spit in public places; avoid crowded places; keep living spaces well lit, since ultraviolet rays can kill some airborne microorganisms.",
        },
        {
          title: "💧 Through water",
          body: "Common where there is no treated water supply and no proper sanitation. Faeces containing pathogens can contaminate a river, and a person becomes infected by drinking the contaminated water. Example diseases: cholera, typhoid fever and amoebic dysentery. Prevention: boil drinking water thoroughly, add chlorine to water supplies and swimming pools, build toilets with proper sanitation, and wash hands with soap after using the toilet.",
        },
        {
          title: "🤝 Through contact",
          body: "Happens when infected skin is touched or a patient's clothing is worn. Example diseases: ringworm and tinea versicolor — both caused by fungi. Syphilis and gonorrhoea spread through sexual contact because their pathogens are present in semen and vaginal fluid. HIV, which causes AIDS, can spread through sexual contact, blood and shared needles. Prevention: keep clean and never share clothing or personal items.",
        },
        {
          title: "🦟 Through vectors",
          body: "Some pathogens use animals to move from one host to a new host. Example diseases: leptospirosis, dengue fever, malaria, Zika and Chikungunya. Prevention: destroy vector breeding sites, use mosquito nets or repellent, and wear clothing that covers the skin.",
        },
      ],
      cards: [
        {
          title: "How mosquitoes spread disease",
          body: "A mosquito carrying a pathogen in its salivary glands bites an uninfected person. Its saliva is released while feeding to stop the blood clotting, and the pathogen enters with it. Another mosquito biting an infected person then carries the infection on to the next victim.",
        },
        {
          title: "How houseflies spread disease",
          body: "A housefly landing on waste picks up pathogens on its legs and body. It then transfers those pathogens onto food, and the pathogens enter the body of whoever eats the contaminated food.",
        },
      ],
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

    // ───────────────────────────────────────────── Pathogen / vector / disease
    {
      number: "4.1",
      title: "Pathogens, Vectors and Diseases",
      intro:
        "These three terms are easily confused. Separate them by asking: what CAUSES the disease, what CARRIES that cause, and what CONDITION results?",
      cards: [
        {
          title: "🦠 Pathogen",
          body: "An organism that causes disease — a virus, bacterium, protozoan, fungus or worm. Examples: dengue virus, the bacterium Salmonella typhi.",
        },
        {
          title: "🐀 Vector",
          body: "An animal that carries a pathogen from one host to a new host. The vector itself does not cause the disease. Examples: Aedes mosquito, cockroach, housefly, rat.",
        },
        {
          title: "🤒 Disease",
          body: "The condition that results once a pathogen infects the body. Examples: dengue fever, typhoid, malaria, leptospirosis.",
        },
      ],
      matcher: {
        title: "Match each vector with the pathogen it carries",
        instruction:
          "Every pair here is VECTOR → PATHOGEN. Notice that a vector carries a pathogen, not the disease itself.",
        pairs: [
          { id: "lipas", label: "Cockroach", match: "Salmonella typhi" },
          { id: "lalat", label: "Housefly", match: "Salmonella typhi" },
          { id: "aedes-denggi", label: "Aedes mosquito", match: "Dengue virus" },
          { id: "aedes-zika", label: "Aedes mosquito (Zika)", match: "Zika virus" },
          { id: "anopheles", label: "Anopheles mosquito", match: "Plasmodium malariae" },
          { id: "tikus", label: "Rat", match: "Leptospira sp. bacteria" },
        ],
      },
      comparison: {
        title: "From pathogen to disease",
        columns: [
          {
            title: "Pathogen → disease",
            body: "Plasmodium malariae → malaria. Dengue virus → dengue fever. Salmonella typhi → typhoid. Leptospira sp. → leptospirosis. Vibrio cholerae → cholera.",
          },
          {
            title: "Symptoms commonly seen",
            body: "Malaria: chills, fever and sweating. Dengue: joint pain, fever, headache and watery eyes. Zika: fever, rash, joint pain and conjunctivitis. Typhoid: fever, intestinal bleeding and a red rash.",
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

    // ───────────────────────────────────────────── Prevention
    {
      number: "4.1",
      title: "Preventing Disease Transmission",
      intro:
        "Preventing infectious disease works at three levels. Each level acts at a different point in the course of a disease.",
      sequence: {
        title: "The three levels of prevention",
        instruction: "Follow the order from before infection through to controlling spread.",
        steps: [
          {
            title: "Primary level",
            body: "Acts BEFORE disease occurs. Raises the level of health through personal, family and household cleanliness and proper sanitation. Raises the body's resistance through vaccination or immunisation of babies, children, pregnant women, food premises handlers, haj pilgrims and travellers.",
          },
          {
            title: "Secondary level",
            body: "Detects and acts EARLY. Periodic health checks and a healthy lifestyle such as breathing clean air and eating balanced meals. Breaks the chain of transmission through active and passive case detection — giving patients early treatment and isolating them from others.",
          },
          {
            title: "Tertiary level",
            body: "Controls spread that is already happening. Controls the vector population by destroying breeding and sheltering sites, spraying to kill vectors, and enforcing the law by fining operators of unclean food premises. Protects the host by using mosquito nets or repellent and wearing thick clothing.",
          },
        ],
      },
      cards: [
        {
          title: "⚠️ A common mix-up",
          body: "Vector control such as fogging and destroying breeding sites belongs to the TERTIARY level, not the primary level. The primary level focuses on cleanliness and immunisation before any infection happens.",
        },
      ],
      checks: [
        {
          question: "At which level of prevention is fogging to kill mosquitoes carried out?",
          hint: "The tertiary level — together with destroying breeding sites and protecting the host.",
        },
        {
          question: "Why are haj pilgrims and food premises handlers encouraged to be immunised?",
          hint: "They face a higher risk of infection or could pass pathogens to many people, so their body resistance needs raising in advance.",
        },
      ],
    },

    // ───────────────────────────────────────────── Body defence
    {
      number: "4.2",
      title: "The Three Lines of Body Defence",
      intro:
        "Pathogens enter the body through the respiratory system, the digestive system, the excretory system and the skin. The body blocks them with three lines of defence that act one after another.",
      defenceLines: {
        title: "Follow a pathogen through each line",
        instruction:
          "The first two lines attack any pathogen at all. The third targets one particular antigen only.",
        pathogenLabel: "Pathogen",
        nonSpecificLabel: "Non-specific defence",
        specificLabel: "Specific defence",
        hint: "Tap any line of defence to see what it does.",
        lines: [
          {
            id: "pertama",
            name: "First line of defence",
            parts: "Skin and mucous membrane",
            group: "non-specific",
            note: "Stops pathogens entering the body. The skin is a tough layer that is hard to penetrate; the sweat and sebum it secretes contain chemicals that destroy microorganisms. The mucous membrane lines the digestive and respiratory tracts — nose hairs filter microorganisms and mucus traps them. Ear wax, tears and vaginal secretions also act as antiseptics.",
          },
          {
            id: "kedua",
            name: "Second line of defence",
            parts: "White blood cells — phagocytosis",
            group: "non-specific",
            note: "Pathogens that get past the first line enter the blood system. There, white blood cells act by phagocytosis, engulfing and digesting the pathogen using enzymes.",
          },
          {
            id: "ketiga",
            name: "Third line of defence",
            parts: "The immune system — antibody production",
            group: "specific",
            note: "Pathogens that get past the second line meet the body's immune system. White blood cells produce antibodies specific to that pathogen's antigen. The antibodies attach to the pathogen so it cannot enter host cells, and cause the pathogens to clump together so they are destroyed more easily.",
          },
        ],
      },
      cards: [
        {
          title: "Non-specific versus specific",
          body: "Non-specific defence (the first and second lines) attacks pathogens generally, whatever their type. Specific defence (the third line) attacks one particular pathogen using the matching antibody.",
        },
      ],
      checks: [
        {
          question: "If someone has a cut on their skin, which defence is affected?",
          hint: "The first line of defence — microorganisms can only get through the skin where there is a wound or injury.",
        },
        {
          question: "What is similar and what is different about specific and non-specific defence?",
          hint: "Both work to prevent infection. Specific defence attacks a particular pathogen; non-specific defence attacks pathogens generally.",
        },
      ],
    },

    // ───────────────────────────────────────────── Antigen / antibody / immunity
    {
      number: "4.2",
      title: "Antigen, Antibody and Immunity",
      intro:
        "These three terms work together in the third line of defence. Learn what each one means before looking at how they connect.",
      cards: [
        {
          title: "Antigen",
          body: "A foreign body or substance not belonging to the body itself that stimulates the production of antibodies. Antigens are found on pathogens, on toxin molecules and on blood cells from a different blood group.",
        },
        {
          title: "Antibody",
          body: "A protein produced by white blood cells into the bloodstream in response to an antigen.",
        },
        {
          title: "Immunity",
          body: "The ability of the body's system to fight a pathogen before the body becomes infected by that pathogen.",
        },
      ],
      causeEffect: {
        title: "How the three connect",
        instruction: "Read from left to right.",
        items: [
          {
            icon: "🦠",
            title: "An antigen enters the body",
            chain: [
              "The antigen on the pathogen is detected",
              "White blood cells are stimulated",
              "Specific antibodies are produced",
            ],
            note: "The antibody produced matches that antigen and no other.",
          },
          {
            icon: "🛡️",
            title: "Antibodies act on the pathogen",
            chain: [
              "Antibodies attach to the pathogen",
              "The pathogen cannot enter host cells",
              "Pathogens clump together and are destroyed more easily",
            ],
            note: "This is immunity — the body's ability to fight that pathogen.",
          },
        ],
      },
      checks: [
        {
          question: "What is the main difference between an antigen and an antibody?",
          hint: "An antigen is the foreign substance that stimulates; an antibody is the protein white blood cells produce in response.",
        },
        {
          question: "Where can antigens be found?",
          hint: "On pathogens, on toxin molecules and on blood cells from a different blood group.",
        },
      ],
    },

    // ───────────────────────────────────────────── Immunisation
    {
      number: "4.2",
      title: "Immunisation",
      intro:
        "Immunisation is an effort to give babies, children and adults active resistance to particular diseases by introducing a vaccine.",
      cards: [
        {
          title: "What is in a vaccine?",
          body: "A vaccine contains antigens obtained from part or all of the structure of a virus or bacterium that has been weakened or killed.",
        },
        {
          title: "How does a vaccine work?",
          body: "The antigen in the vaccine stimulates the body's immune system to build immunity against that particular infection — without causing the disease itself.",
        },
        {
          title: "Why several different vaccines?",
          body: "Each vaccine builds immunity against a different disease, so a baby receives several different vaccines according to a schedule.",
        },
        {
          title: "Are vaccines safe?",
          body: "Yes. Vaccines used by the Ministry of Health Malaysia are assessed against international standards before use.",
        },
      ],
      accordions: [
        {
          title: "💉 Examples from the Malaysian immunisation schedule",
          body: "BCG protects against tuberculosis. Hepatitis B is given in three doses. DTaP combines diphtheria, tetanus and pertussis. Polio (IPV) protects against polio. MMR protects against measles, mumps and rubella. HPV is given to girls aged 13. You do not need to memorise the whole schedule — understand that each vaccine is timed by age so protection is built before the risk of infection rises.",
        },
        {
          title: "🔁 Why are booster doses needed?",
          body: "Some vaccines are given more than once. Repeated exposure to the same antigen produces a higher and faster antibody response, so protection becomes stronger and lasts longer.",
        },
      ],
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

    // ───────────────────────────────────────────── Active / passive
    {
      number: "4.2",
      title: "Active and Passive Immunity",
      intro:
        "Active immunity means the body produces its own antibodies when stimulated by an antigen. Passive immunity means the body receives antibodies from an outside source. Both can be acquired naturally or artificially.",
      immunityMatrix: {
        title: "The four types of immunity",
        instruction:
          "Two questions decide the type: does the body make its own antibodies, and how were those antibodies acquired?",
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
            name: "Natural active immunity",
            source: "After recovering from a disease",
            duration: "Long-lasting",
            note: "Formed after a person recovers from an attack of the disease. The body produces its own antibodies, and the immunity lasts long after the infection.",
          },
          {
            id: "aktif-buatan",
            row: "active",
            column: "artificial",
            name: "Artificial active immunity",
            source: "Through a vaccine injection",
            duration: "Long-lasting",
            note: "Formed when a vaccine containing dead or weakened pathogens is introduced into the body and the immune system responds by producing antibodies. The immunity is long-lasting.",
          },
          {
            id: "pasif-semula-jadi",
            row: "passive",
            column: "natural",
            name: "Natural passive immunity",
            source: "Antibodies from the mother",
            duration: "Temporary and short",
            note: "Formed when a child receives antibodies from breast milk or from the mother's blood across the placenta. The immunity is temporary and short, lasting the first few months after birth.",
          },
          {
            id: "pasif-buatan",
            row: "passive",
            column: "artificial",
            name: "Artificial passive immunity",
            source: "Through an antiserum injection",
            duration: "Immediate but temporary",
            note: "Formed when an antiserum is injected into a patient. The antiserum fights the disease pathogen without disturbing the patient's own immune system. The immunity is immediate and temporary.",
          },
        ],
      },
      cards: [
        {
          title: "What is an antiserum?",
          body: "An antiserum is the clear liquid part of blood containing antibodies that prevent disease. It is injected straight into a patient so ready-made antibodies can act immediately.",
        },
      ],
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

    // ───────────────────────────────────────────── Response graph
    {
      number: "4.2",
      title: "Primary and Secondary Immune Response",
      intro:
        "When the body meets the same antigen a second time, its response is completely different from the first. This is why repeated immunisation strengthens protection.",
      immuneResponseGraph: {
        title: "Antibody concentration after a first and a second exposure",
        instruction:
          "Look at how high and how fast each curve rises. Tap a label below the graph for an explanation.",
        xAxisLabel: "Time (weeks)",
        yAxisLabel: "Antibody concentration in blood (%)",
        immuneLevelLabel: "Immunity level",
        hint: "Tap any label to see what that part of the graph means.",
        items: [
          {
            id: "first",
            label: "First exposure",
            note: "The first time the antigen enters the body. The body needs time to recognise it and start producing antibodies.",
          },
          {
            id: "primary",
            label: "Primary response",
            note: "The first-time response — slow and low. The antibodies produced do not reach the immunity level, so a person can still fall ill.",
          },
          {
            id: "second",
            label: "Second exposure",
            note: "The SAME antigen enters the body again, either through re-infection or through a further vaccine dose.",
          },
          {
            id: "secondary",
            label: "Secondary response",
            note: "The second-time response — far faster and much higher. Antibodies rise above the immunity level, so immunity is achieved and the body is protected.",
          },
        ],
      },
      cards: [
        {
          title: "Why this matters",
          body: "This pattern explains why some vaccines need more than one dose: each extra dose repeats the exposure to the same antigen and lifts protection to a higher level.",
        },
      ],
      checks: [
        {
          question:
            "A graph shows antibody concentration rising sharply after a second exposure. What does it represent?",
          hint: "The secondary response — a faster, stronger reaction to the same antigen.",
        },
        {
          question: "Why can a person still fall ill after a first exposure?",
          hint: "The primary response is slow and low; antibodies do not reach the immunity level in time.",
        },
      ],
    },

    // ───────────────────────────────────────────── Strong immunity
    {
      number: "4.2",
      title: "Maintaining a Strong Immune System",
      intro:
        "When there is an imbalance in the body or too many toxins, the immune system becomes weak. Daily habits in the three areas below decide whether your immunity is strengthened or weakened.",
      cards: [
        {
          title: "🥗 Nutrition",
          body: "Eat balanced meals including local vegetables and fruit. Avoid taking sugar in excess, since it weakens the immune system.",
        },
        {
          title: "🏃 Physical activity",
          body: "Exercising outdoors and breathing fresh air strengthen the immune system. Regular physical activity helps the body work better.",
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
            body: "Exposure to air pollution; exposure to pesticides; emotional stress; taking sugar in excess.",
          },
          {
            title: "Practices that strengthen the immune system",
            body: "Getting enough rest and sleep; not smoking and avoiding cigarette smoke; exercising outdoors and breathing fresh air; going for periodic health checks.",
          },
        ],
      },
      accordions: [
        {
          title: "⭐ Enrichment — allergies",
          body: "An allergy is a reaction of the body's immune system to an allergen in the environment that is normally harmless to someone without that allergy. Examples of allergens: dust mites, animal fur, dust, pollen, spores, foods such as seafood, milk and eggs, animal stings and certain medicines.",
        },
      ],
      checks: [
        {
          question: "Suggest two practices that weaken a person's immune system.",
          hint: "Any two of: exposure to air pollution or pesticides, emotional stress, and taking sugar in excess.",
        },
        {
          question: "How does enough sleep help the immune system?",
          hint: "Enough rest lets the body recover and keeps the immune system in a strong condition.",
        },
      ],
    },

    // ───────────────────────────────────────────── Social impact
    {
      number: "4.2",
      title: "Health, Immunisation and Society",
      intro:
        "One person's health is not a purely private matter. A person's level of health and immunisation has knock-on effects for the family, society, the economy and the country.",
      causeEffect: {
        title: "The chain of effects",
        instruction: "Follow each chain from its cause through to its effect on the country.",
        items: [
          {
            icon: "🛡️",
            title: "Controlled recurrence of disease",
            chain: [
              "Immunisation is widespread among the population",
              "Fewer people can be infected",
              "Diseases such as leprosy, whooping cough and tuberculosis stay better controlled",
            ],
            note: "Immunisation helps CONTROL the recurrence of disease and reduces the risk of spread.",
          },
          {
            icon: "💰",
            title: "Healthcare costs",
            chain: [
              "Fewer cases of infection",
              "Less need for treatment and hospital admission",
              "Healthcare costs for families and the country do not climb",
            ],
          },
          {
            icon: "🏭",
            title: "Work quality and the workforce",
            chain: [
              "Workers fall ill less often",
              "Fewer working days are lost",
              "Productivity and quality of work are protected",
            ],
            note: "A prolonged outbreak can affect the workforce and lead to worker migration issues.",
          },
          {
            icon: "📋",
            title: "Insurance and quality of life",
            chain: [
              "Lower health risk",
              "Medical and insurance spending stays more manageable",
              "Families enjoy a better quality of life",
            ],
          },
        ],
      },
      cards: [
        {
          title: "📊 Try it yourself",
          body: "Collect statistics on infectious diseases in Malaysia from the Ministry of Health portal. Discuss which diseases are most common, their causes and how they are handled, then suggest steps to address them.",
        },
      ],
      checks: [
        {
          question:
            "How does immunising one child benefit society, not just that child?",
          hint: "A protected child is not easily infected and does not pass the pathogen on, so spread within the community stays better controlled.",
        },
        {
          question: "State two economic effects of an outbreak of infectious disease.",
          hint: "Healthcare costs rise and quality of work suffers as workers fall ill.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can tell infectious and non-infectious diseases apart and give examples.",
    "I can explain the four ways infectious diseases spread.",
    "I can tell a pathogen, a vector and a disease apart.",
    "I can describe the three levels of disease prevention.",
    "I can describe the three lines of body defence and tell specific from non-specific defence.",
    "I can define antigen, antibody and immunity.",
    "I can explain why immunisation matters and what a vaccine contains.",
    "I can tell active and passive immunity apart.",
    "I can read a primary and secondary immune response graph.",
    "I can link individual health to the family, society, the economy and the country.",
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
      question: "At which level of prevention is vector population control carried out?",
      options: ["Primary level", "Secondary level", "Tertiary level", "Before immunisation"],
      answerIndex: 2,
      explanation:
        "The tertiary level covers vector population control and host protection such as using mosquito nets.",
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
