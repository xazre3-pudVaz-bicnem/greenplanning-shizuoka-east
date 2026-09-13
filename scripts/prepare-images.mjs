/**
 * 本部から提供された画像（assets/provided）を、サイトで配信できる形にします。
 *
 *   node scripts/prepare-images.mjs
 *
 * 使ってよい画像は、チェックリスト「画像」のとおり次の2つだけです。
 *   - 本部が使用可として提供・指定した画像（assets/provided）
 *   - 静岡EASTで撮影し、使用許諾を得た写真
 * 本部公式サイト・他サイトから保存した画像は使いません。
 *
 * - 写真は JPEG を再圧縮するだけで、切り抜きや色の加工はしません
 * - ロゴとアイコンは本部指定のものなので、1バイトも変えずにコピーします
 *   （チェックリスト「ブランド名・ロゴの使用」：独自にロゴを変更しない）
 *
 * 受け取ったときのファイル名と中身が一致していなかったため、中身に合わせて名前を付け直しています。
 * 対応表は assets/provided/README.md にあります（公開リポジトリには載せていません）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets', 'provided');
const PHOTOS = path.join(ROOT, 'public', 'photos');
const BRAND = path.join(ROOT, 'public', 'brand');
const APP = path.join(ROOT, 'src', 'app');

/**
 * 再圧縮して public/photos へ出す写真。
 * 使う写真だけを出します（公開リポジトリに、使っていない提供画像を置かないため）。
 * src/data/photos.ts に写真を足したら、ここにも足してください。
 *
 * assets/provided にあるほかの提供画像:
 *   scene-entrance / scene-dogrun / scene-golf / scene-mansion / scene-balcony / scene-rooftop / scene-parking
 *   product-*（7点・本部サイトの商品画像と同じもの） / factory-*（3点・本部サイトの工場画像と同じもの）
 */
const PHOTO_FILES = ['scene-garden.jpg'];

/** そのままコピーするもの（本部指定のロゴ・アイコン） */
const COPY_AS_IS = [
  ['logo-shizuoka-east.jpg', path.join(BRAND, 'logo-shizuoka-east.jpg')],
  ['icon-dog-face.png', path.join(APP, 'icon.png')],
  ['icon-dog-face.png', path.join(APP, 'apple-icon.png')],
];

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`提供画像のフォルダがありません: ${path.relative(ROOT, SRC)}`);
    process.exit(1);
  }
  fs.mkdirSync(PHOTOS, { recursive: true });
  fs.mkdirSync(BRAND, { recursive: true });

  console.log('--- 写真（再圧縮のみ） ---');
  for (const name of PHOTO_FILES) {
    const from = path.join(SRC, name);
    if (!fs.existsSync(from)) {
      console.warn(`! 見つかりません: ${name}`);
      continue;
    }
    const to = path.join(PHOTOS, name);
    await sharp(from).rotate().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(to);
    const m = await sharp(to).metadata();
    console.log(`✓ photos/${name}  ${m.width}x${m.height}  ${Math.round(fs.statSync(to).size / 1024)}KB`);
  }

  console.log('--- ロゴ・アイコン（無加工でコピー） ---');
  for (const [name, to] of COPY_AS_IS) {
    fs.copyFileSync(path.join(SRC, name), to);
    const m = await sharp(to).metadata();
    console.log(`✓ ${path.relative(ROOT, to)}  ${m.width}x${m.height}  ${m.format}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
