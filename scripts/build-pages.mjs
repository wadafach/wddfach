import { cp, mkdir, rm, copyFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");
await rm(out, { recursive: true, force: true });
await mkdir(join(out, "preview-assets"), { recursive: true });
await mkdir(join(out, "brand"), { recursive: true });
await mkdir(join(out, "works", "reference"), { recursive: true });
await copyFile(join(root, "preview.html"), join(out, "index.html"));
await cp(join(root, "preview-assets"), join(out, "preview-assets"), { recursive: true });
await cp(join(root, "public", "brand"), join(out, "brand"), { recursive: true });
await cp(join(root, "public", "works"), join(out, "works"), { recursive: true });
console.log(`GitHub Pages static export ready: ${out}`);
