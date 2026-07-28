// One-off uploader for images embedded in interactive notes chapters.
// Uploads everything under scripts/assets/notes-images/** to the
// academy-notes-images bucket (see supabase/migrations/20260727120000_academy_notes_images_bucket.sql),
// preserving the folder structure as the object path.
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-notes-images.mjs
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ASSETS_ROOT = join(__dirname, "assets", "notes-images");
const BUCKET = "academy-notes-images";

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars. " +
      "Run the academy_notes_images_bucket migration first, then set these from your Supabase project settings.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

async function main() {
  const files = walk(ASSETS_ROOT);
  if (files.length === 0) {
    console.log("No files found under", ASSETS_ROOT);
    return;
  }

  for (const file of files) {
    const objectPath = relative(ASSETS_ROOT, file).split("\\").join("/");
    const contentType = CONTENT_TYPES[extname(file).toLowerCase()] ?? "application/octet-stream";
    const body = readFileSync(file);

    const { error } = await supabase.storage.from(BUCKET).upload(objectPath, body, {
      contentType,
      upsert: true,
    });

    if (error) {
      console.error(`✗ ${objectPath}:`, error.message);
    } else {
      console.log(`✓ ${objectPath}`);
    }
  }
}

main();
