# Chapter 5 Pass 2 source audit

Scope: Section 5.2 particle models, kinetic theory and diffusion only. Pass 1 and the existing state-change/conservation content remain unchanged.

## Sources

- BM Form 1 Science textbook, printed pages 147–150, local `T1 BT SN- SAINS.pdf` (PDF pages 156–159, zero-based).
- DLP Form 1 Science textbook, corresponding state-property table and Figure 5.12, school-library copy: https://fliphtml5.com/bjsfz/tpck/Science_Form_1/
- Existing canonical `chapter5-content.ts` and the supplied Pass 2 implementation brief.

## Authorized source corrections

- Gas mass: `No fixed mass` / `Tiada jisim tetap`, matching the textbook table.
- The user explicitly chose Figure 5.12 when asked about conflicting diffusion observations. Liquid now turns blue after two hours; bromine fills both gas jars after 15 minutes. The obsolete canonical liquid 15-minute outcome and gas “in seconds” outcome are replaced in both languages.
- The procedure on printed page 149 instructs observation after 15 minutes. Figure 5.12 on page 150 gives the two-hour liquid result. These distinct source timings are recorded here; the displayed comparison follows Figure 5.12 as instructed.

## Apparatus and presentation

- Solid: inverted test tube, gel and copper(II) sulphate crystals, with a stopper beneath; before/after blue diffusion cue.
- Liquid: upright test tube as in Figure 5.12, with water and crystals before, blue water after. The procedure's measuring cylinder is not substituted into the comparison figure.
- Gas: two stacked gas jars, air above and bromine below, initially divided by a lid; after removal, the mixture occupies both jars.
- Diffusion rates, solid observation, state properties other than gas mass, and kinetic-theory facts remain canonical.
- Components hold coordinates and presentation keys only. Labels and facts are supplied by the shared canonical content module. The same SVG geometry renders in BM and DLP.
- Particle arrangement/movement, heating/cooling speed cues and diffusion are schematic. The model/not-to-scale qualification was explicitly supplied in the user brief. No exact diffusion rate or particle scale is inferred from arrow lengths.

## Preservation and wording

Pass 1 canonical content and Pass 3 canonical content are protected by baseline hashes. Before/after server-render comparisons also confirmed unchanged Pass 1 and Pass 3 HTML in both languages.

New presentation wording uses the supplied brief or textbook terms, including before/after, apparatus labels, property labels, the model qualification and the rate relationship. No additional scientific mechanism or explanation was introduced.

UNSOURCED LEARNER-FACING CONTENT ADDED: NONE.

The diffusion source discrepancy is resolved for this implementation by the user's explicit choice of the comparison figure. No remaining source conflict blocks Pass 2.
