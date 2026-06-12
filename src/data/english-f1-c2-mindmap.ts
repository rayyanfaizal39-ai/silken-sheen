import type { MindNode } from "@/components/MindMap";

export const englishF1C2MindMap: MindNode = {
  id: "root",
  label: "Vocabulary — Word Explorer",
  children: [
    {
      id: "synonyms",
      label: "Synonyms",
      children: [
        { id: "syn-def", label: "Words with SIMILAR meanings" },
        {
          id: "syn-pairs",
          label: "Key Pairs",
          children: [
            { id: "s1", label: "big = large = enormous" },
            { id: "s2", label: "happy = joyful = ecstatic" },
            { id: "s3", label: "smart = clever = brilliant" },
            { id: "s4", label: "fast = quick = rapid" },
            { id: "s5", label: "scared = afraid = terrified" },
          ],
        },
        { id: "syn-tip", label: "Use synonyms to avoid repetition in essays" },
      ],
    },
    {
      id: "antonyms",
      label: "Antonyms",
      children: [
        { id: "ant-def", label: "Words with OPPOSITE meanings" },
        {
          id: "ant-pairs",
          label: "Key Pairs",
          children: [
            { id: "a1", label: "hot ≠ cold" },
            { id: "a2", label: "brave ≠ cowardly" },
            { id: "a3", label: "generous ≠ selfish" },
            { id: "a4", label: "clean ≠ dirty" },
            { id: "a5", label: "success ≠ failure" },
          ],
        },
        { id: "ant-tip", label: "Learn 1 word = learn 2 (word + antonym)" },
      ],
    },
    {
      id: "idioms",
      label: "Idioms",
      children: [
        { id: "id-def", label: "Phrases with HIDDEN meanings" },
        {
          id: "id-examples",
          label: "Top Idioms",
          children: [
            { id: "i1", label: "piece of cake = very easy" },
            { id: "i2", label: "break a leg = good luck" },
            { id: "i3", label: "under the weather = feeling sick" },
            { id: "i4", label: "hit the books = study hard" },
            { id: "i5", label: "burn midnight oil = work/study late" },
            { id: "i6", label: "spill the beans = reveal a secret" },
          ],
        },
        { id: "id-tip", label: "ONE correct idiom in essay = higher marks" },
      ],
    },
    {
      id: "phrasal",
      label: "Phrasal Verbs",
      children: [
        { id: "pv-def", label: "Verb + particle = NEW meaning" },
        {
          id: "pv-list",
          label: "Essential Phrasal Verbs",
          children: [
            { id: "pv1", label: "give up = stop trying / quit" },
            { id: "pv2", label: "look after = take care of" },
            { id: "pv3", label: "turn on/off = switch on/off" },
            { id: "pv4", label: "find out = discover" },
            { id: "pv5", label: "grow up = become adult" },
            { id: "pv6", label: "run out of = have no more" },
          ],
        },
      ],
    },
    {
      id: "kssm-vocab",
      label: "KSSM Vocabulary",
      children: [
        {
          id: "kv-character",
          label: "Character Words",
          children: [
            { id: "kv1", label: "generous, humble, brave" },
            { id: "kv2", label: "confident, responsible, honest" },
            { id: "kv3", label: "patient, ambitious" },
          ],
        },
        {
          id: "kv-environment",
          label: "Environment & Society",
          children: [
            { id: "ke1", label: "peaceful, community, unity" },
            { id: "ke2", label: "polluted, preserve, diversity" },
          ],
        },
      ],
    },
    {
      id: "word-formation",
      label: "Word Formation",
      children: [
        {
          id: "prefixes",
          label: "Prefixes (Start)",
          children: [
            { id: "pr1", label: "un- = not (unhappy)" },
            { id: "pr2", label: "re- = again (rewrite)" },
            { id: "pr3", label: "dis- = not (dishonest)" },
            { id: "pr4", label: "mis- = wrongly (misspell)" },
          ],
        },
        {
          id: "suffixes",
          label: "Suffixes (End)",
          children: [
            { id: "sf1", label: "-ful = full of (beautiful)" },
            { id: "sf2", label: "-less = without (careless)" },
            { id: "sf3", label: "-ness = state of (kindness)" },
            { id: "sf4", label: "-tion = act of (education)" },
            { id: "sf5", label: "-ly = adverb (quickly)" },
          ],
        },
      ],
    },
    {
      id: "context-clues",
      label: "Context Clues",
      children: [
        { id: "cc1", label: "Look at surrounding words" },
        { id: "cc2", label: "Find contrast words (but, however)" },
        { id: "cc3", label: "Find synonym clues nearby" },
        { id: "cc4", label: "Replace the word — does it make sense?" },
      ],
    },
  ],
};
