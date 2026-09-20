import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { gzipSync } from "node:zlib";
import ts from "typescript";
const assets = resolve("dist/client/assets");
const files = readdirSync(assets).filter((f) => f.endsWith(".js"));
const route = files.find(
  (f) =>
    /^notes-/.test(f) && readFileSync(resolve(assets, f), "utf8").includes("Loading chapter notes"),
);
const entry = readFileSync("dist/client/index.html", "utf8").match(
  /src="\/assets\/(index-[^"]+\.js)"/,
)?.[1];
const seen = new Set();
const dynamic = new Set();
function walk(file) {
  if (seen.has(file)) return;
  seen.add(file);
  const text = readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  for (const s of ast.statements) {
    if (
      (ts.isImportDeclaration(s) || ts.isExportDeclaration(s)) &&
      s.moduleSpecifier &&
      ts.isStringLiteral(s.moduleSpecifier) &&
      s.moduleSpecifier.text.startsWith(".")
    )
      walk(resolve(dirname(file), s.moduleSpecifier.text));
  }
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      ts.isStringLiteral(node.arguments[0])
    )
      dynamic.add(node.arguments[0].text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
if (!route || !entry) throw Error("Missing route or app entry");
walk(resolve(assets, route));
walk(resolve(assets, entry));
const forbidden = [...seen]
  .map((p) => basename(p))
  .filter((f) =>
    /ScienceF\dChapter\d|MathF\dChapter\d|SejarahF\dChapter\d|GeoF\dChapter\d|ScienceF3InteractiveNotesBlock|Chapter4(Flower|Seed|Pregnancy|Infertility)|^registry-/.test(
      f,
    ),
  );
if (forbidden.length) throw Error("Eager chapter chunks: " + forbidden.join(", "));
const c4 = [...dynamic].find((f) => f.includes("ScienceF1Chapter4VisualNotesBlock"));
if (!c4) throw Error("Missing Chapter 4 dynamic import");
const source = readFileSync(resolve(assets, route));
console.log(
  JSON.stringify(
    {
      route,
      bytes: source.length,
      gzipBytes: gzipSync(source).length,
      appAndNotesStaticChunks: seen.size,
      eagerChapterChunks: forbidden,
      chapter4DynamicChunk: c4,
    },
    null,
    2,
  ),
);
