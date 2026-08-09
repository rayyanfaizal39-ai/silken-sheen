// Import an approved Malaysian school directory from CSV or JSON.
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run schools:import -- path/to/schools.csv
//   npm run schools:import -- path/to/schools.csv --dry-run
//   npm run schools:import -- path/to/schools.csv --dry-run --check-database
//
// Accepted English/Malay headers:
// school_code/kod_sekolah, school_name/nama_sekolah,
// school_type/jenis_sekolah, state/negeri, district/daerah,
// postcode/poskod, active/aktif.

import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const sourceArg = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const dryRun = process.argv.includes("--dry-run");
const checkDatabase = process.argv.includes("--check-database");

if (!sourceArg) {
  throw new Error("Provide the approved school CSV or JSON file path.");
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function normalizeHeader(value) {
  return String(value)
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function csvToObjects(source) {
  const [headerRow, ...rows] = parseCsv(source);
  if (!headerRow) return [];
  const headers = headerRow.map(normalizeHeader);
  return rows.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

function pick(row, aliases) {
  for (const alias of aliases) {
    const value = row[alias];
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return null;
}

function normalizeRecord(row, rowNumber) {
  const schoolCode = pick(row, ["school_code", "kod_sekolah"])?.toUpperCase() ?? null;
  const schoolName = pick(row, ["school_name", "nama_sekolah"]);
  const state = pick(row, ["state", "negeri"]);
  const district = pick(row, ["district", "daerah"]);
  const postcode = pick(row, ["postcode", "poskod"]);
  const activeValue = pick(row, ["active", "aktif"]);

  if (!schoolCode) throw new Error(`Row ${rowNumber}: school code is required.`);
  if (!schoolName) throw new Error(`Row ${rowNumber}: school name is required.`);
  if (!state) throw new Error(`Row ${rowNumber}: state is required.`);
  if (postcode && !/^\d{5}$/.test(postcode)) {
    throw new Error(`Row ${rowNumber}: postcode must contain five digits.`);
  }
  if (
    activeValue &&
    !["0", "1", "false", "true", "no", "yes", "tidak"].includes(activeValue.toLowerCase())
  ) {
    throw new Error(`Row ${rowNumber}: active must be a supported boolean value.`);
  }

  return {
    school_code: schoolCode,
    school_name: schoolName,
    school_type: pick(row, ["school_type", "jenis_sekolah"]),
    state,
    district,
    postcode,
    active: activeValue ? !["0", "false", "no", "tidak"].includes(activeValue.toLowerCase()) : true,
  };
}

const sourcePath = resolve(sourceArg);
const source = await readFile(sourcePath, "utf8");
const extension = extname(sourcePath).toLowerCase();
const rawRows = extension === ".json" ? JSON.parse(source) : csvToObjects(source);

if (!Array.isArray(rawRows)) throw new Error("The source must contain an array of school rows.");

const missingRequiredValues = rawRows.filter(
  (row) =>
    !pick(row, ["school_code", "kod_sekolah"]) ||
    !pick(row, ["school_name", "nama_sekolah"]) ||
    !pick(row, ["state", "negeri"]),
).length;
const invalidPostcodes = rawRows.filter((row) => {
  const postcode = pick(row, ["postcode", "poskod"]);
  return Boolean(postcode && !/^\d{5}$/.test(postcode));
}).length;
const invalidActiveValues = rawRows.filter((row) => {
  const active = pick(row, ["active", "aktif"]);
  return Boolean(
    active && !["0", "1", "false", "true", "no", "yes", "tidak"].includes(active.toLowerCase()),
  );
}).length;

const schools = [];
const rejectedRows = [];
for (const [index, row] of rawRows.entries()) {
  try {
    schools.push(normalizeRecord(row, index + 2));
  } catch (error) {
    rejectedRows.push(error instanceof Error ? error.message : `Row ${index + 2}: invalid row.`);
  }
}

const codes = new Set();
const duplicateCodes = new Set();
for (const school of schools) {
  if (school.school_code && codes.has(school.school_code)) {
    duplicateCodes.add(school.school_code);
  }
  if (school.school_code) codes.add(school.school_code);
}

function printValidationSummary(existingCodes = null) {
  const wouldUpdate = existingCodes
    ? schools.filter((school) => existingCodes.has(school.school_code)).length
    : null;
  const wouldInsert = wouldUpdate === null ? null : schools.length - wouldUpdate;

  console.info(`[schools:import] source: ${sourcePath}`);
  console.info(`[schools:import] total rows read: ${rawRows.length}`);
  console.info(`[schools:import] valid rows: ${schools.length}`);
  console.info(`[schools:import] rejected rows: ${rejectedRows.length}`);
  console.info(`[schools:import] duplicate school codes: ${duplicateCodes.size}`);
  console.info("[schools:import] malformed UUIDs: 0 (UUIDs are generated by PostgreSQL)");
  console.info(`[schools:import] missing required values: ${missingRequiredValues}`);
  console.info(`[schools:import] invalid postcode values: ${invalidPostcodes}`);
  console.info(`[schools:import] invalid active values: ${invalidActiveValues}`);
  console.info("[schools:import] invalid states/types: not checked against an allowlist");
  console.info(`[schools:import] upsert candidates: ${schools.length}`);
  console.info(
    `[schools:import] would insert: ${wouldInsert === null ? "database check not requested" : wouldInsert}`,
  );
  console.info(
    `[schools:import] would update: ${wouldUpdate === null ? "database check not requested" : wouldUpdate}`,
  );
}

if (rejectedRows.length || duplicateCodes.size) {
  printValidationSummary();
  for (const message of rejectedRows.slice(0, 20)) console.error(`[schools:import] ${message}`);
  for (const code of duplicateCodes)
    console.error(`[schools:import] duplicate school code: ${code}`);
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if ((!dryRun || checkDatabase) && (!supabaseUrl || !serviceRoleKey)) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required unless --dry-run is used without --check-database.",
  );
}

const supabase =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

async function fetchExistingSchoolCodes() {
  if (!supabase) return null;
  const existingCodes = new Set();
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("schools")
      .select("school_code")
      .order("school_code")
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`School schema preflight failed: ${error.message}`);
    for (const row of data ?? []) {
      if (row.school_code) existingCodes.add(row.school_code);
    }
    if (!data || data.length < pageSize) break;
  }
  return existingCodes;
}

const existingCodes = !dryRun || checkDatabase ? await fetchExistingSchoolCodes() : null;
printValidationSummary(existingCodes);

if (dryRun) process.exit(0);
if (!supabase) throw new Error("Supabase client is unavailable.");

const batchSize = 500;
for (let offset = 0; offset < schools.length; offset += batchSize) {
  const batch = schools.slice(offset, offset + batchSize);
  const { error } = await supabase.from("schools").upsert(batch, { onConflict: "school_code" });
  if (error) throw error;
  console.info(
    `[schools:import] imported ${Math.min(offset + batch.length, schools.length)}/${schools.length}`,
  );
}

const updatedCount = existingCodes
  ? schools.filter((school) => existingCodes.has(school.school_code)).length
  : 0;
console.info(
  `[schools:import] complete: ${schools.length} schools upserted (${schools.length - updatedCount} inserted, ${updatedCount} updated).`,
);
