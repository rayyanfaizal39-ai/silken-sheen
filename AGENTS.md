# AcadeMY repository instructions

## Learner-facing curriculum content

The following curriculum rules apply whenever working on learner-facing curriculum content in this repository.

ACADEMY SCIENCE NOTES IMPLEMENTATION RULE — STRICT SOURCE-ONLY MODE

Your role is NOT to rewrite, improve, reinterpret, summarise, market, or creatively rename the supplied Science notes.

Your role is ONLY to implement the supplied notes accurately into the existing AcadeMY Notes UI.

SOURCE OF TRUTH:
The supplied chapter notes/textbook-derived source is authoritative for learner-facing content.

==================================================
1. DO NOT INVENT CONTENT
==================================================

Do NOT invent:

- chapter titles
- section titles
- subsection titles
- slogans
- subtitles
- motivational sentences
- creative labels
- metaphors
- storytelling headings
- gamified academic terminology
- scientific terminology
- definitions
- examples
- facts
- explanations

If text already exists in the source, USE IT.

Do not replace textbook headings with more "engaging" alternatives.

For example:

KEEP:
"8.1 Sejarah Penemuan Keradioaktifan"

DO NOT invent:
"Tiga penemuan membuka dunia atom"

KEEP:
"8.4 Kegunaan Sinaran Radioaktif"

DO NOT invent:
"Satu fenomena, enam bidang"

KEEP:
"8.3 Sinaran Mengion dan Sinaran Tidak Mengion"

DO NOT rename or reinterpret it.

==================================================
2. TEXTBOOK TERMINOLOGY IS PRIMARY
==================================================

For BM:

Use the exact KSSM textbook terminology supplied in the notes.

Do not replace textbook terminology with:
- more conversational terms
- more modern terms
- synonyms
- shorter terms
- creative terms

If a common term is genuinely useful, it may appear in brackets AFTER the textbook term.

Example:

Stanum (timah)

NOT:

Timah (stanum)

==================================================
3. HEADINGS MUST COME FROM SOURCE
==================================================

Every learner-facing:

- chapter heading
- section heading
- subsection heading

must come directly from the supplied source whenever such a heading exists.

Do NOT generate a replacement heading.

If the source contains:

## 8.1 Sejarah Penemuan Keradioaktifan

the UI must show:

8.1 Sejarah Penemuan Keradioaktifan

Do not create an extra heading above or below it.

==================================================
4. DO NOT ADD FILLER UNDER HEADINGS
==================================================

Do not automatically add introductory copy underneath a section heading.

Avoid text such as:

"Jom kita terokai..."
"Ketahui bagaimana..."
"Lihat dunia..."
"Masuki modul..."
"Enam bidang, satu fenomena..."
"Perhatikan bukti..."
"Bina kefahaman..."

Unless this exact text exists in the approved source, DO NOT ADD IT.

Preferred structure:

SECTION HEADING
↓
SOURCE CONTENT
↓
VISUAL / INTERACTION WHERE USEFUL

==================================================
5. DO NOT PARAPHRASE DEFINITIONS UNNECESSARILY
==================================================

If the supplied source already provides a clear textbook definition, preserve it.

You may adjust punctuation or line breaks for UI readability.

Do NOT change the scientific meaning.

Do NOT rewrite it merely to sound more "natural" or "engaging".

==================================================
6. VISUAL DESIGN MAY BE CREATIVE — CONTENT MAY NOT
==================================================

You ARE allowed to improve:

- card layout
- spacing
- typography
- responsive design
- icons
- diagrams
- tabs
- timelines
- comparison tables
- hover states
- animations
- visual hierarchy

But the TEXT and SCIENTIFIC CONTENT must remain source-controlled.

Creativity belongs in presentation, not curriculum wording.

==================================================
7. IF SOURCE CONTENT CONFLICTS
==================================================

If two parts of the supplied source contradict each other:

DO NOT choose one yourself.

DO NOT silently "fix" it using general knowledge.

Instead report:

SOURCE CONFLICT FOUND:
- statement A
- statement B
- file/section where each appears

Then stop editing that specific fact until instructed.

==================================================
8. IF SOMETHING IS MISSING
==================================================

If the source does not contain enough information for a section:

DO NOT hallucinate missing content.

Report:

SOURCE GAP:
[describe what is missing]

Do not fill it with your own knowledge unless explicitly instructed.

==================================================
9. BM / DLP
==================================================

Use the supplied BM and DLP source material.

Do not freely translate scientific terminology when approved DLP wording already exists.

Ensure both languages represent the same approved concepts.

==================================================
10. IMPLEMENTATION PRINCIPLE
==================================================

Think of this task as:

TRANSCRIBE + STRUCTURE + PRESENT

NOT:

WRITE + REINTERPRET + IMPROVE

The desired workflow is:

approved notes
→ extract exact content
→ arrange into suitable AcadeMY components
→ add scientifically faithful visuals
→ render

NOT:

approved notes
→ rewrite
→ summarise
→ rename
→ embellish
→ render

==================================================
11. BEFORE FINISHING
==================================================

Compare the learner-facing page against the supplied source.

Report any text you added that did NOT originate from the source.

Ideally:

UNSOURCED LEARNER-FACING CONTENT ADDED: NONE

If there is any, list it explicitly.

Do not deploy, commit or push unless instructed.
