/**
 * assets/originals にある元写真（本部公式サイト掲載素材・静岡EASTの施工写真）を、
 * 内容がわかるファイル名に変えつつ最適化して public/photos へ書き出します。
 *
 *   node scripts/prepare-images.mjs
 *
 * 写真の内容は1枚ずつ目で確認したうえで割り当てています。
 * 新しい写真を追加するときは MAP に1行足し、src/data/photos.ts に実寸と alt を追加してください。
 *
 * 使用素材の出典（2026年9月確認）:
 *   - greenplanning.jp/area/shizuoka-east/ に掲載の写真（施工写真・代表写真・商品写真）
 *   - greenplanning.jp/works/garden/7280/（静岡EASTの施工事例）
 *   - greenplanning.jp（ブランド共通の施工写真・商品写真）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const PHOTOS = path.join(PUBLIC, 'photos');
const ORIGINALS = path.join(ROOT, 'assets', 'originals');

/** 元ファイル名 → 出力ファイル名（public/photos 配下） */
const MAP = {
  // 静岡EAST（一次情報）
  'shizuoka-east20260822-5.jpg': 'work-tagata-approach.jpg',
  'shizuoka-east20260822-6.jpg': 'work-tagata-after.jpg',
  'shizuoka-east20260822-7.jpg': 'work-tagata-before.jpg',
  'shizuoka-east_img1.jpg': 'east-work-in-progress.jpg',
  'shizuoka-east_img2.jpg': 'east-work-after.jpg',
  'shizuoka-east_staff.jpg': 'representative-takahashi.jpg',
  // ブランド共通の施工写真
  'image_garden2026.jpg': 'garden-house.jpg',
  'image_apartment2026.jpg': 'mansion-garden.jpg',
  'image_balcony2026.jpg': 'balcony-terrace.jpg',
  'image_dogrun.jpg': 'dogrun-poodles.jpg',
  'image_golf2026-1.jpg': 'golf-putting-green.jpg',
  'image_parking.jpg': 'parking-stripes.jpg',
  'image_entrance.jpg': 'entrance-approach.jpg',
  'bg_security.jpg': 'garden-flowerbed-wide.jpg',
  'lineup_head.jpg': 'turf-rolls-wide.jpg',
  'amazingturf.jpg': 'turf-hand-touch.jpg',
  // Before / After
  'ex01_before.jpg': 'ba-house-before.jpg',
  'ex01_after.jpg': 'ba-house-after.jpg',
  'ex02_before.jpg': 'ba-mansion-before.jpg',
  'ex02_after.jpg': 'ba-mansion-after.jpg',
  'ex03_before.jpg': 'ba-rooftop-before.jpg',
  'ex03_after.jpg': 'ba-rooftop-after.jpg',
  'bfaf_garden1.jpg': 'ba-weeds-before.jpg',
  'bfaf_garden2.jpg': 'ba-weeds-after.jpg',
  'bfaf_terrace1.jpg': 'ba-terrace-before.jpg',
  'bfaf_terrace2.jpg': 'ba-terrace-after.jpg',
  // 商品
  'Amazing.jpg': 'product-amazing-turf.jpg',
  'AmazingLite.jpg': 'product-amazing-turf-lite.jpg',
  'typeR.jpg': 'product-island-grass-r.jpg',
  'typeC.jpg': 'product-island-grass-c.jpg',
  'typeG.jpg': 'product-island-grass-g.jpg',
  'GolfTurf.jpg': 'product-golf-green.jpg',
  'Geofill.jpg': 'product-geofill.jpg',
  // 工場
  'products01.jpg': 'factory-tufting.jpg',
  'products02.jpg': 'factory-backing.jpg',
  'products03.jpg': 'factory-yarn.jpg',
};

/** OG画像に使う写真 */
const OG_SOURCE = 'garden-house.jpg';

async function convert(from, outName) {
  const out = path.join(PHOTOS, outName);
  const img = sharp(from).rotate();
  const pipeline = img.resize({ width: 1920, withoutEnlargement: true });
  await pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(out);
  const info = await sharp(out).metadata();
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  return { name: outName, width: info.width, height: info.height, kb };
}

async function main() {
  fs.mkdirSync(PHOTOS, { recursive: true });

  const done = [];
  for (const [srcName, outName] of Object.entries(MAP)) {
    const from = path.join(ORIGINALS, srcName);
    if (!fs.existsSync(from)) {
      console.warn(`! 元ファイルが見つかりません: ${srcName}`);
      continue;
    }
    const info = await convert(from, outName);
    console.log(`✓ photos/${info.name}  ${info.width}x${info.height}  ${info.kb}KB`);
    done.push(info);
  }

  // OGP画像 1200x630
  const ogSrc = path.join(PHOTOS, OG_SOURCE);
  if (fs.existsSync(ogSrc)) {
    await sharp(ogSrc)
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(PUBLIC, 'og.jpg'));
    console.log('✓ og.jpg 1200x630');
  }

  console.log('\n--- 実寸（src/data/photos.ts 用） ---');
  for (const d of done) console.log(`${d.name}: ${d.width}x${d.height}`);
  console.log(`\n完了: ${done.length} 枚`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
