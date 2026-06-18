import type { MindNode } from "@/components/MindMap";

export const englishF1C1MindMap: MindNode = {
  id: "root",
  label: "Grammar — Word Wizardry",
  children: [
    {
      id: "nouns",
      label: "Nouns",
      children: [
        {
          id: "nouns-def",
          label: "Naming words",
          children: [
            { id: "n1", label: "Person: teacher, Ali" },
            { id: "n2", label: "Place: school, Malaysia" },
            { id: "n3", label: "Thing: pencil, phone" },
            { id: "n4", label: "Idea: happiness, bravery" },
          ],
        },
        {
          id: "nouns-types",
          label: "4 Types",
          children: [
            { id: "n-common", label: "Common — general (boy, city)" },
            { id: "n-proper", label: "Proper — specific, CAPITALISED (Ali, KL)" },
            { id: "n-collective", label: "Collective — group (team, class, family)" },
            { id: "n-abstract", label: "Abstract — cannot touch (love, freedom)" },
          ],
        },
      ],
    },
    {
      id: "pronouns",
      label: "Pronouns",
      children: [
        {
          id: "pro-subject",
          label: "Subject Pronouns",
          children: [
            { id: "ps1", label: "I, You, He, She, It" },
            { id: "ps2", label: "We, They" },
          ],
        },
        {
          id: "pro-object",
          label: "Object Pronouns",
          children: [
            { id: "po1", label: "me, you, him, her, it" },
            { id: "po2", label: "us, them" },
          ],
        },
        { id: "pro-rule", label: "Replace nouns to avoid repetition" },
      ],
    },
    {
      id: "verbs",
      label: "Verbs",
      children: [
        {
          id: "verb-action",
          label: "Action Verbs",
          children: [
            { id: "va1", label: "run, jump, eat, study" },
            { id: "va2", label: "cook, write, sing, play" },
          ],
        },
        {
          id: "verb-state",
          label: "State Verbs",
          children: [
            { id: "vs1", label: "is, are, was, were" },
            { id: "vs2", label: "seem, feel, have, become" },
          ],
        },
        {
          id: "tenses",
          label: "3 Tenses",
          children: [
            { id: "t-present", label: "Simple Present — She walks daily" },
            { id: "t-past", label: "Simple Past — They visited KL" },
            { id: "t-future", label: "Simple Future — I will study" },
          ],
        },
        { id: "sva", label: "He/She/It + verb-s (He eats)" },
      ],
    },
    {
      id: "adjectives",
      label: "Adjectives",
      children: [
        { id: "adj-def", label: "Describe nouns" },
        {
          id: "adj-types",
          label: "Types",
          children: [
            { id: "adj1", label: "Size: big, small, tall" },
            { id: "adj2", label: "Colour: golden, dark, bright" },
            { id: "adj3", label: "Feeling: beautiful, delicious" },
            { id: "adj4", label: "Number: three, many, few" },
          ],
        },
      ],
    },
    {
      id: "adverbs",
      label: "Adverbs",
      children: [
        { id: "adv-def", label: "Describe verbs, adjectives, adverbs" },
        {
          id: "adv-types",
          label: "Types",
          children: [
            { id: "adv1", label: "Manner: quickly, carefully" },
            { id: "adv2", label: "Time: now, yesterday, soon" },
            { id: "adv3", label: "Place: here, nearby, outside" },
            { id: "adv4", label: "Frequency: always, never, often" },
          ],
        },
        { id: "adv-form", label: "Many adjectives + '-ly' = adverb" },
        { id: "adv-tip", label: "good (adj) → well (adv)" },
      ],
    },
    {
      id: "prepositions",
      label: "Prepositions",
      children: [
        { id: "prep-place", label: "Place: in, on, under, beside, between" },
        { id: "prep-time", label: "Time: at, on, in, before, after" },
        { id: "prep-dir", label: "Direction: to, towards, through" },
        {
          id: "prep-rule",
          label: "at/on/in Rule",
          children: [
            { id: "pr1", label: "AT — specific time (at 8am)" },
            { id: "pr2", label: "ON — day/date (on Monday)" },
            { id: "pr3", label: "IN — month/year (in January)" },
          ],
        },
      ],
    },
    {
      id: "conjunctions",
      label: "Conjunctions",
      children: [
        {
          id: "coord",
          label: "Coordinating — FANBOYS",
          children: [
            { id: "cj1", label: "For, And, Nor, But" },
            { id: "cj2", label: "Or, Yet, So" },
          ],
        },
        {
          id: "subord",
          label: "Subordinating",
          children: [
            { id: "sj1", label: "because, although, if" },
            { id: "sj2", label: "when, before, after" },
          ],
        },
      ],
    },
    {
      id: "sentence",
      label: "Sentence Structure",
      children: [
        { id: "svs", label: "Subject + Verb + Object" },
        {
          id: "types",
          label: "4 Types",
          children: [
            { id: "st1", label: "Statement — Malaysia is beautiful." },
            { id: "st2", label: "Question — Are you ready?" },
            { id: "st3", label: "Command — Open your books." },
            { id: "st4", label: "Exclamation — What a great day!" },
          ],
        },
        { id: "mistakes", label: "Avoid fragments & run-ons" },
      ],
    },
  ],
};
