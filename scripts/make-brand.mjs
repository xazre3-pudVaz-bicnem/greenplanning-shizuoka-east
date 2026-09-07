/**
 * public/logo.jpg（本部ブランドロゴ：犬のイラスト＋Green Planning）から、
 * サイトで使うロゴ画像・ファビコン・アプリアイコン・OG画像を作ります。
 *
 *   node scripts/make-brand.mjs
 *
 * - public/brand/logo.png       … 白背景を透過にしたロゴ（ヘッダー・フッター用・幅1000pxに拡大）
 * - public/brand/logo-mark.png  … 犬のイラストだけを切り出したマーク（透過）
 * - src/app/icon.png / apple-icon.png / public/icon-192.png / icon-512.png … マークを白地に置いたアイコン
 * - public/og.jpg               … 施工写真の下に白い帯を付け、ロゴを載せたOG画像（1200×630）
 *
 * 元のロゴは JPEG（透過なし）なので、ほぼ白（各チャンネル 236 以上）の画素を透明にしています。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const BRAND = path.join(PUBLIC, 'brand');
const APP = path.join(ROOT, 'src', 'app');
const SRC = path.join(PUBLIC, 'logo.jpg');

/** 白に近い画素を透明にする（JPEGのにじみは、白との距離で滑らかに落とす） */
async function knockoutWhite(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const min = Math.min(r, g, b);
    // 236 以上は完全に透明、200〜236 はなだらかに
    let alpha = 255;
    if (min >= 236) alpha = 0;
    else if (min >= 200) alpha = Math.round(((236 - min) / 36) * 255);
    out[i + 3] = alpha;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

/** 透過画像の不透明部分の範囲 */
async function bbox(pngBuffer) {
  const { data, info } = await sharp(pngBuffer).raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * 4 + 3] > 40) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

async function main() {
  fs.mkdirSync(BRAND, { recursive: true });

  // 元のロゴ（500×150）を2倍に拡大してから透過処理（拡大は lanczos。小さな元画像なので輪郭は少し柔らかくなる）
  const up = await sharp(SRC).resize({ width: 1000, kernel: 'lanczos3' }).toBuffer();
  const logoPng = await (await knockoutWhite(up)).toBuffer();
  const logoBox = await bbox(logoPng);
  const logoTrim = await sharp(logoPng)
    .extract({ left: Math.max(0, logoBox.left - 4), top: Math.max(0, logoBox.top - 4), width: Math.min(1000 - Math.max(0, logoBox.left - 4), logoBox.width + 8), height: Math.min(300 - Math.max(0, logoBox.top - 4), logoBox.height + 8) })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(BRAND, 'logo.png'), logoTrim);
  const lm = await sharp(logoTrim).metadata();
  console.log(`✓ brand/logo.png ${lm.width}x${lm.height}`);

  // 犬のイラストだけ（元画像の左側 x < 130 相当 → 拡大後 260px）
  const markRegion = await sharp(logoPng).extract({ left: 0, top: 0, width: 270, height: 300 }).png().toBuffer();
  const mb = await bbox(markRegion);
  const mark = await sharp(markRegion).extract({ left: mb.left, top: mb.top, width: mb.width, height: mb.height }).png().toBuffer();
  fs.writeFileSync(path.join(BRAND, 'logo-mark.png'), mark);
  const mm = await sharp(mark).metadata();
  console.log(`✓ brand/logo-mark.png ${mm.width}x${mm.height}`);

  // アイコン：白地（角丸）にマークを中央配置
  const icon = async (size, file, radius) => {
    const pad = Math.round(size * 0.12);
    const inner = size - pad * 2;
    const scaled = await sharp(mark).resize({ width: inner, height: inner, fit: 'inside' }).png().toBuffer();
    const sm = await sharp(scaled).metadata();
    const bg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#ffffff"/></svg>`,
    );
    await sharp(bg)
      .composite([{ input: scaled, left: Math.round((size - sm.width) / 2), top: Math.round((size - sm.height) / 2) }])
      .png()
      .toFile(file);
    console.log(`✓ ${path.relative(ROOT, file)} ${size}x${size}`);
  };
  await icon(512, path.join(APP, 'icon.png'), 0);
  await icon(180, path.join(APP, 'apple-icon.png'), 0);
  await icon(512, path.join(PUBLIC, 'icon-512.png'), 0);
  await icon(192, path.join(PUBLIC, 'icon-192.png'), 0);

  // OG画像：写真（1200×520）＋白い帯（110px）にロゴ
  const photo = path.join(PUBLIC, 'photos', 'garden-house.jpg');
  if (fs.existsSync(photo)) {
    const top = await sharp(photo).resize(1200, 520, { fit: 'cover', position: 'south' }).toBuffer();
    const logoSmall = await sharp(logoTrim).resize({ height: 72, fit: 'inside' }).png().toBuffer();
    const ls = await sharp(logoSmall).metadata();
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
      .composite([
        { input: top, left: 0, top: 0 },
        { input: logoSmall, left: 48, top: 520 + Math.round((110 - ls.height) / 2) },
      ])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(PUBLIC, 'og.jpg'));
    console.log('✓ og.jpg 1200x630（写真＋ロゴ）');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
