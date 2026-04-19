/**
 * One-off script to generate maskable PWA icons (requires `sharp` as devDependency).
 * Run: node scripts/generate-pwa-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "icons");

const { default: sharp } = await import("sharp");

fs.mkdirSync(outDir, { recursive: true });

const background = { r: 23, g: 23, b: 23 };

for (const size of [192, 512]) {
  const buffer = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...background, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const file = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(file, buffer);
  console.log("Wrote", path.relative(root, file));
}
