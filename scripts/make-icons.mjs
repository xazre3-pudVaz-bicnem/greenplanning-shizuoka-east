/**
 * ファビコン／アプリアイコンを作ります。
 *
 *   node scripts/make-icons.mjs
 *
 * 図案は「芝の葉」。白地に深い緑。文字は使いません
 * （環境によって日本語フォントが無く、ラスタライズに失敗するため）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP = path.join(ROOT, 'src', 'app');
const PUBLIC = path.join(ROOT, 'public');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#1f5a34"/>
  <!-- 芝の葉 -->
  <g fill="none" stroke="#e9f3e6" stroke-width="30" stroke-linecap="round">
    <path d="M256 424 C 256 330, 256 250, 256 150"/>
    <path d="M256 320 C 220 300, 180 260, 168 190"/>
    <path d="M256 320 C 292 300, 332 260, 344 190"/>
    <path d="M256 400 C 210 380, 160 340, 140 290"/>
    <path d="M256 400 C 302 380, 352 340, 372 290"/>
  </g>
  <rect x="120" y="412" width="272" height="30" rx="15" fill="#8fc98a"/>
</svg>`;

async function main() {
  const buf = Buffer.from(svg);
  const out = [
    { file: path.join(APP, 'icon.png'), size: 512 },
    { file: path.join(APP, 'apple-icon.png'), size: 180 },
    { file: path.join(PUBLIC, 'icon-512.png'), size: 512 },
    { file: path.join(PUBLIC, 'icon-192.png'), size: 192 },
  ];

  for (const o of out) {
    fs.mkdirSync(path.dirname(o.file), { recursive: true });
    await sharp(buf, { density: 384 }).resize(o.size, o.size).png().toFile(o.file);
    console.log(`✓ ${path.relative(ROOT, o.file)} ${o.size}x${o.size}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
