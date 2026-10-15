// Requires rsvg-convert (librsvg). Run with: node scripts/generate-favicon.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const publicDir = new URL('../public/', import.meta.url);
const source = fileURLToPath(new URL('favicon.svg', publicDir));
const render = size => execFileSync('rsvg-convert', ['-w', String(size), '-h', String(size), source]);
const sizes = [16, 32, 48];
const images = sizes.map(render);
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((png, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i];
  header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
writeFileSync(new URL('favicon.ico', publicDir), Buffer.concat([header, ...images]));
writeFileSync(new URL('apple-touch-icon.png', publicDir), render(180));
