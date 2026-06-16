#!/usr/bin/env node
// Re-applies the @tanstack/start-server-core patch after every npm install.
//
// WHY: @tanstack/start-server-core@1.169+ uses dynamic '#' package-subpath imports
// (#tanstack-router-entry, #tanstack-start-entry) inside createStartHandler.js, but
// those keys are absent from the package's own package.json "imports" map. esbuild
// (used by Vite's optimizeDeps) enforces strict resolution and errors out. Adding the
// keys + creating stub files lets esbuild satisfy the scan; at runtime the TanStack
// Start Vite plugin alias takes over instead of the stubs.

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pkgPath = join(root, 'node_modules/@tanstack/start-server-core/package.json');

if (!existsSync(pkgPath)) {
  console.log('[postinstall] @tanstack/start-server-core not found, skipping patch.');
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

if (!pkg.imports) pkg.imports = {};

const already =
  pkg.imports['#tanstack-router-entry'] && pkg.imports['#tanstack-start-entry'];

if (!already) {
  pkg.imports['#tanstack-router-entry'] = { default: './user-router-entry.js' };
  pkg.imports['#tanstack-start-entry'] = { default: './user-start-entry.js' };
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('[postinstall] Patched @tanstack/start-server-core/package.json');
} else {
  console.log('[postinstall] @tanstack/start-server-core already patched, skipping.');
}

const stubs = {
  'user-router-entry.js': `// Stub resolved by @tanstack/start-server-core package imports patch.
// At dev-server runtime the Vite plugin alias overrides this with src/router.tsx.
export const getRouter = () => { throw new Error("user-router-entry stub – Vite alias should have intercepted this"); };
`,
  'user-start-entry.js': `// Stub resolved by @tanstack/start-server-core package imports patch.
// At dev-server runtime the Vite plugin alias overrides this with src/start.ts.
export const startInstance = null;
`,
  'user-manifest-entry.js': `// Stub for tanstack-start-manifest:v – only reached during esbuild scan.
export const tsrStartManifest = () => ({ routes: {} });
`,
};

const stubDir = join(root, 'node_modules/@tanstack/start-server-core');
for (const [name, content] of Object.entries(stubs)) {
  const filePath = join(stubDir, name);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, content);
    console.log(`[postinstall] Created stub: ${name}`);
  }
}
