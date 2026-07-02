## Install skills

Install the 4 skills from your uploads and pull in an animation skill since none was uploaded.

### Skills to install

1. **emil-design-eng** — Emil Kowalski's design engineering philosophy (from `SKILL.md`, 679 lines)
2. **ui-ux-pro-max** — UI/UX design intelligence, 50+ styles, 161 palettes, 57 font pairs, etc. (from `SKILL-5.md`, 659 lines)
3. **sidebar-generator** — Sidebar design guidance (from `SKILL-2.md`)
4. **homepage-generator** — Homepage structure & conversion (from `SKILL-3.md`; `SKILL-4.md` is a duplicate, ignored)
5. **animation-principles** — Fetch the universal animation skill (Disney's 12 principles applied to web motion) from the `animation-principles-main` reference already in context, since no animation SKILL.md was uploaded

### Steps

1. Create `.agents/skills/{name}/SKILL.md` for each of the 5 skills by copying the uploaded MD content verbatim (only ignore the duplicate `SKILL-4.md`).
2. For `animation-principles`, author a compact SKILL.md that encodes the 12 principles + web application guidance (from the CLAUDE.md reference).
3. Call `skills--apply_draft` on each of the 5 skill directories to activate them.

### Notes

- No project source code will be changed — this only adds skill files under `.agents/skills/`.
- Once applied, the skills auto-load when their descriptions match future requests (e.g. UI polish → emil-design-eng, palette/style choices → ui-ux-pro-max, motion work → animation-principles).
- If you'd rather I use a different, richer animation SKILL.md, paste it after approval and I'll swap it in.
