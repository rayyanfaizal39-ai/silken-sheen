const superscriptCharacters = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
  "+": "⁺",
  "-": "⁻",
  n: "ⁿ",
};

const subscriptCharacters = {
  0: "₀",
  1: "₁",
  2: "₂",
  3: "₃",
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉",
  "+": "₊",
  "-": "₋",
};

const namedEntities = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function convertScript(value, characters, fallbackPrefix) {
  const converted = [...value].map((character) => characters[character]).join("");
  return converted.length === value.length ? converted : `${fallbackPrefix}(${value})`;
}

function decodeHtmlEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (entity, code) => {
    const normalized = code.toLowerCase();
    if (normalized.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    }
    if (normalized.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    }
    return namedEntities[normalized] ?? entity;
  });
}

export function toPlainStudentText(value) {
  let text = decodeHtmlEntities(String(value ?? "").replace(/\u00a0/g, " "));
  text = text.replace(/\\{2,}(?=[A-Za-z])/g, "\\");

  // JSON can interpret an incorrectly escaped `\text` or `\times` as a tab.
  text = text
    .replace(/\text\s*\{([^{}]*)\}/gi, "$1")
    .replace(/\times/gi, " × ")
    .replace(/\rightarrow\b/gi, " → ")
    .replace(/\r(?:mathrm|m)\s*\{([^{}]*)\}/gi, "$1")
    .replace(/\right\b/gi, "")
    .replace(/\r/g, " ")
    .replace(/\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/gi, "$1/$2")
    .replace(/\x08(?:egin|old)\s*\{([^{}]*)\}/gi, "$1")
    .replace(/\t+/g, " ");

  for (let pass = 0; pass < 4; pass += 1) {
    text = text
      .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/gi, "$1/$2")
      .replace(/\\sqrt\s*\{([^{}]*)\}/gi, "√($1)")
      .replace(/\\(?:text|textbf|mathrm|mathbf|operatorname|rm)\s*\{([^{}]*)\}/gi, "$1");
  }

  text = text
    .replace(/\bext\s*\{([^{}]*)\}/gi, "$1")
    .replace(/\brac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/gi, "$1/$2")
    .replace(/\bightarrow\b/gi, " → ")
    .replace(/\bimes\b/gi, " × ")
    .replace(/\\times/gi, " × ")
    .replace(/\\cdot/gi, " · ")
    .replace(/\\(?:degree|circ)/gi, "°")
    .replace(/\^°/g, "°")
    .replace(/\\rightarrow\b/gi, " → ")
    .replace(/\\leftarrow\b/gi, " ← ")
    .replace(/\\leftrightarrow\b/gi, " ↔ ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\alpha/gi, "α")
    .replace(/\\beta/gi, "β")
    .replace(/\\gamma/gi, "γ")
    .replace(/\\mu/gi, "μ")
    .replace(/\\(?:left|right)\b/gi, "")
    .replace(/\\(?:quad|qquad)\b/gi, " ")
    .replace(/\\[,;:!]/g, " ")
    .replace(/\\\s+/g, " ")
    .replace(/\\(?:begin|end)\s*\{[^{}]*\}/gi, " ")
    .replace(/\^\{([^{}]+)\}/g, (_, script) => convertScript(script, superscriptCharacters, "^"))
    .replace(/_\{([^{}]+)\}/g, (_, script) => convertScript(script, subscriptCharacters, "_"))
    .replace(/\^([+\-\d])/g, (_, script) => convertScript(script, superscriptCharacters, "^"))
    .replace(/_([+\-\d])/g, (_, script) => convertScript(script, subscriptCharacters, "_"))
    .replace(/\\%/g, "%")
    .replace(/\\([#$%&_{}])/g, "$1")
    .replace(/\\[nrt]/g, " ")
    .replace(/\\\//g, "/")
    .replace(/\\>/g, ">")
    .replace(/\\\\/g, " ")
    .replace(/\$/g, "")
    .replace(/\*\*/g, "")
    .replace(/(^|\s)#{1,6}\s+/gm, "$1")
    .replace(/`+/g, "")
    .replace(/\*/g, "")
    .replace(/\r?\n/g, " ")
    .replace(/[ \f\v]+/g, " ")
    .replace(/(?<=\d),\s+(?=\d{3}\b)/g, ",")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();

  return text;
}

export function assertPlainStudentText(value, label) {
  const text = String(value ?? "");
  const forbidden =
    /\$|\\[a-z]+|\b(?:ightarrow|imes)\b|\b(?:ext|rac)\s*\{|&(?:amp|lt|gt|nbsp|quot|apos|#\d+|#x[\da-f]+);|\*\*|`|[\t\r\n]/i;
  if (forbidden.test(text)) {
    throw new Error(`${label}: exposed markup or escape sequence remains: ${text}`);
  }
}
