/**
 * サイトで使う写真を、配信できる形にして public/ へ出します。
 *
 *   node scripts/prepare-images.mjs
 *
 * 使ってよい画像は、チェックリスト「画像」のとおり次の2つだけです。
 *   - assets/provided … 本部が使用可として提供・指定した画像（本部の了承済み）
 *   - assets/own      … 静岡EASTで撮影し、使用許諾を得た写真（オーナー様から受領）
 * 本部公式サイト・他サイトから保存した画像は使いません。
 * assets/ は公開リポジトリに載せない（.gitignore 済み）。元の画像を public/ に直接置かないこと。
 *
 * - 写真はリサイズと JPEG の再圧縮だけで、切り抜きや色の加工はしません（位置情報などのメタデータは落ちます）
 * - ロゴとアイコンは本部指定のものなので、1バイトも変えずにコピーします
 *   （チェックリスト「ブランド名・ロゴの使用」：独自にロゴを変更しない）
 *
 * 本部提供の画像は受け取ったときのファイル名と中身が一致していなかったため、中身に合わせて名前を付け直しています。
 * 対応表は assets/provided/README.md にあります。
 *
 * src/data/photos.ts に写真を足したら、ここにも足してください。
 * 使っていない画像は出しません（公開リポジトリに不要な画像を置かないため）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const PHOTOS = path.join(ROOT, 'public', 'photos');
const BRAND = path.join(ROOT, 'public', 'brand');
const APP = path.join(ROOT, 'src', 'app');

/**
 * [元画像（assets/ からの相対パス）, 出力先（public/photos/ からの相対パス）, 長辺の上限]
 *
 * assets/provided にある、まだ使っていない提供画像:
 *   scene-mansion（建物と塀のあいだの細長いスペース）
 *   factory-*（3点・本部サイトの工場画像と同じもの）
 */
const PHOTO_FILES = [
  ['provided/scene-garden.jpg', 'scene-garden.jpg', 800],
  ['provided/scene-dogrun.jpg', 'scene-dogrun.jpg', 800],
  ['provided/scene-golf.jpg', 'scene-golf.jpg', 800],
  ['provided/scene-balcony.jpg', 'scene-balcony.jpg', 800],
  ['provided/scene-rooftop.jpg', 'scene-rooftop.jpg', 800],
  ['provided/scene-entrance.jpg', 'scene-entrance.jpg', 800],
  ['provided/scene-parking.jpg', 'scene-parking.jpg', 800],
  ['provided/product-amazing-turf.jpg', 'product-amazing-turf.jpg', 800],
  ['provided/product-amazing-turf-lite.jpg', 'product-amazing-turf-lite.jpg', 800],
  ['provided/product-island-grass-r.jpg', 'product-island-grass-r.jpg', 800],
  ['provided/product-island-grass-c.jpg', 'product-island-grass-c.jpg', 800],
  ['provided/product-island-grass-g.jpg', 'product-island-grass-g.jpg', 800],
  ['provided/product-golf-green.jpg', 'product-golf-green.jpg', 800],
  ['provided/product-geofill.jpg', 'product-geofill.jpg', 800],
  ['own/representative.jpg', 'representative.jpg', 800],
  ['own/works/kannami-garden-before.jpg', 'works/kannami-garden-before.jpg', 1200],
  ['own/works/kannami-garden-after.jpg', 'works/kannami-garden-after.jpg', 1200],
];

/** そのままコピーするもの（本部指定のロゴ・アイコン） */
const COPY_AS_IS = [
  ['provided/logo-shizuoka-east.jpg', path.join(BRAND, 'logo-shizuoka-east.jpg')],
  ['provided/icon-dog-face.png', path.join(APP, 'icon.png')],
  ['provided/icon-dog-face.png', path.join(APP, 'apple-icon.png')],
];

async function main() {
  if (!fs.existsSync(ASSETS)) {
    console.error(`画像のフォルダがありません: ${path.relative(ROOT, ASSETS)}`);
    process.exit(1);
  }
  fs.mkdirSync(BRAND, { recursive: true });

  console.log('--- 写真（リサイズ・再圧縮のみ） ---');
  for (const [from, to, maxEdge] of PHOTO_FILES) {
    const src = path.join(ASSETS, from);
    if (!fs.existsSync(src)) {
      console.warn(`! 見つかりません: ${from}`);
      continue;
    }
    const dest = path.join(PHOTOS, to);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    await sharp(src)
      .rotate()
      .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(dest);
    const m = await sharp(dest).metadata();
    console.log(`✓ photos/${to}  ${m.width}x${m.height}  ${Math.round(fs.statSync(dest).size / 1024)}KB`);
  }

  console.log('--- ロゴ・アイコン（無加工でコピー） ---');
  for (const [from, dest] of COPY_AS_IS) {
    fs.copyFileSync(path.join(ASSETS, from), dest);
    const m = await sharp(dest).metadata();
    console.log(`✓ ${path.relative(ROOT, dest)}  ${m.width}x${m.height}  ${m.format}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
