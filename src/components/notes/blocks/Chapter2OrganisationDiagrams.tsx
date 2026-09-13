import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { SurfaceCell } from "./Chapter2SpecialisedDiagrams";

function Stomach() {
  return (
    <g data-stomach>
      <path
        d="M111 24 H136 L140 68 C181 41 217 92 202 138 C189 181 148 191 114 162 Q77 139 72 182 L49 179 Q52 112 97 128 Q121 144 129 120 Q138 99 117 81Z"
        fill="#881337"
        stroke="#fda4af"
        strokeWidth="4"
      />
      <path
        d="M153 79 Q186 70 187 106 M154 103 Q183 96 179 126 M133 140 Q152 158 173 135"
        fill="none"
        stroke="#fb7185"
        strokeWidth="3"
      />
    </g>
  );
}
function DigestiveTract() {
  return (
    <g data-digestive-tract>
      <path d="M135 17 V68" stroke="#fda4af" strokeWidth="8" fill="none" />
      <g transform="translate(79 53) scale(.45)">
        <Stomach />
      </g>
      <path
        d="M131 131 Q107 132 107 149 V190 Q107 199 123 199 H166 Q181 199 181 184 V150 Q181 137 170 139"
        fill="none"
        stroke="#fda4af"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M106 133 Q105 147 120 145 Q165 139 165 151 Q166 159 120 157 Q113 167 165 168 Q177 179 120 181 Q117 189 145 190 V220"
        fill="none"
        stroke="#fb7185"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}
function AnimalOutline() {
  return (
    <g data-whole-animal fill="#1e293b" stroke="#a5b4fc" strokeWidth="3">
      <circle cx="140" cy="31" r="22" />
      <path d="M118 61 Q140 53 162 61 L190 118 L181 135 L162 101 L160 143 L169 213 H145 L140 156 L135 213 H111 L120 143 L118 101 L99 135 L90 118Z" />
    </g>
  );
}
function Leaf() {
  return (
    <g data-leaf>
      <path
        d="M44 185 Q28 51 229 31 Q244 180 44 185Z"
        fill="#064e3b"
        stroke="#6ee7b7"
        strokeWidth="4"
      />
      <path
        d="M33 205 L219 41 M77 166 L69 106 M110 138 L112 76 M142 110 L157 62 M80 163 L135 165 M116 134 L176 129 M152 103 L207 86"
        stroke="#6ee7b7"
        strokeWidth="3"
        fill="none"
      />
    </g>
  );
}
function Plant({ transport = false }: { transport?: boolean }) {
  return (
    <g data-whole-plant>
      <path
        d="M138 173 V35 M140 172 L113 204 M140 174 L168 210 M140 183 L139 222 M116 201 L95 212 M166 207 L190 215"
        fill="none"
        stroke="#6ee7b7"
        strokeWidth="7"
      />
      <g fill="#064e3b" stroke="#6ee7b7" strokeWidth="3">
        <path d="M139 111 Q68 132 36 75 Q102 61 139 111Z" />
        <path d="M139 81 Q181 26 238 44 Q216 107 139 81Z" />
        <path d="M139 143 Q186 98 237 134 Q203 173 139 143Z" />
      </g>
      {transport && (
        <g data-transport-pathways fill="none" stroke="#67e8f9" strokeWidth="3">
          <path d="M139 220 V39 M139 112 L47 80 M139 81 L225 49 M139 142 L224 135 M139 179 L100 213 M139 179 L181 214" />
          <path d="M133 66 L139 57 L145 66 M133 162 L139 153 L145 162" />
        </g>
      )}
    </g>
  );
}

// Positional geometry for the existing canonical chains, never alternative factual sequences.
export function OrganisationShape({ plant, level }: { plant: boolean; level: number }) {
  if (level === 0)
    return (
      <g transform="translate(100 44) scale(2)">
        <SurfaceCell plant={plant} />
      </g>
    );
  if (level === 1)
    return (
      <g>
        {[0, 1].flatMap((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <SurfaceCell key={`${row}-${col}`} x={40 + col * 40} y={55 + row * 58} plant={plant} />
          )),
        )}
        <rect
          data-previous-level
          x="77"
          y="52"
          width="46"
          height="64"
          rx="5"
          fill="none"
          stroke="#fde68a"
          strokeWidth="2"
          strokeDasharray="5 3"
        />
      </g>
    );
  if (level === 2)
    return (
      <>
        {plant ? <Leaf /> : <Stomach />}
        <rect
          data-previous-level
          x={plant ? 90 : 158}
          y={plant ? 90 : 133}
          width="32"
          height="24"
          fill="none"
          stroke="#fde68a"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      </>
    );
  if (level === 3) return plant ? <Plant transport /> : <DigestiveTract />;
  return plant ? (
    <Plant />
  ) : (
    <>
      <AnimalOutline />
      <g transform="translate(88 60) scale(.37)">
        <DigestiveTract />
      </g>
    </>
  );
}

export function Chapter2OrganisationDiagrams({ content }: { content: Chapter2Content }) {
  return (
    <div data-organisation-zoom className="mt-5 space-y-8">
      {(["animal", "plant"] as const).map((group) => (
        <section key={group} data-organisation-chain={group}>
          <h4 className="font-bold text-cyan-100">
            {group === "animal"
              ? content.organisationExamples.animalTitle
              : content.organisationExamples.plantTitle}
          </h4>
          <ol className="mt-4 grid gap-6 xl:grid-cols-5 xl:gap-4">
            {content.organisationExamples[group].map((name, index) => (
              <li
                key={`${group}-${index}`}
                data-organisation-level={index}
                className="relative min-w-0 border-l-2 border-cyan-300/30 pl-4 xl:border-l-0 xl:border-t-2 xl:pl-0 xl:pt-4"
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 left-1/2 text-xl text-cyan-200 xl:-left-3 xl:-top-4"
                  >
                    <span className="xl:hidden">↓</span>
                    <span className="hidden xl:inline">→</span>
                  </span>
                )}
                <p className="font-bold text-emerald-200">
                  {index + 1}. {content.organisationHierarchy[index]?.level}
                </p>
                <svg
                  data-organisation-diagram={`${group}-${index}`}
                  viewBox="0 0 280 230"
                  role="img"
                  aria-label={name}
                  className="mx-auto my-3 w-full max-w-xs"
                >
                  <title>{name}</title>
                  <OrganisationShape plant={group === "plant"} level={index} />
                </svg>
                <p className="font-bold text-white" data-organisation-name>
                  {name}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.organisationHierarchy[index]?.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
