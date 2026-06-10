import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const appDir = resolve(root, 'src', 'app');

// ── favicon.ico: render source SVG at 32×32, then wrap in ICO ──────────────
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#1a1a2e"/>
  <rect fill="#f5f0e8" x="12" y="14" width="11" height="36" rx="2"/>
  <rect fill="#f5f0e8" x="26.5" y="14" width="11" height="36" rx="2"/>
  <rect fill="#f5f0e8" x="41" y="14" width="11" height="36" rx="2"/>
  <rect fill="#1a1a2e" x="20" y="14" width="7" height="22" rx="1.5"/>
  <rect fill="#1a1a2e" x="34.5" y="14" width="7" height="22" rx="1.5"/>
</svg>`;

const faviconPng = await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toBuffer();

const icoBuffer = await toIco([faviconPng]);
writeFileSync(resolve(appDir, 'favicon.ico'), icoBuffer);
console.log('✓ favicon.ico (32×32)');

// ── apple-icon.png: 180×180, solid bg, no rounding, 10% padding ─────────────
// Scale factor: 144/64 = 2.25, offset 18px (10% of 180) on each side
const appleIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#1a1a2e"/>
  <g transform="translate(18,18) scale(2.25)">
    <rect fill="#f5f0e8" x="12" y="14" width="11" height="36" rx="2"/>
    <rect fill="#f5f0e8" x="26.5" y="14" width="11" height="36" rx="2"/>
    <rect fill="#f5f0e8" x="41" y="14" width="11" height="36" rx="2"/>
    <rect fill="#1a1a2e" x="20" y="14" width="7" height="22" rx="1.5"/>
    <rect fill="#1a1a2e" x="34.5" y="14" width="7" height="22" rx="1.5"/>
  </g>
</svg>`;

await sharp(Buffer.from(appleIconSvg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(resolve(appDir, 'apple-icon.png'));
console.log('✓ apple-icon.png (180×180)');
