import Image from 'next/image';
import { shop } from '@/data/shop';

/**
 * 本部から指定された静岡EAST専用ロゴ（public/brand/logo-shizuoka-east.jpg・600×150）。
 *
 * 本部チェックリスト「ブランド名・ロゴの使用」：指定されたロゴを指定どおりに使い、独自に変更しない。
 * そのため、切り抜き・透過・色の変更・文字の追加・他の画像との合成はしません。
 * 画像の再圧縮もしないように unoptimized で元ファイルをそのまま配信します。
 * 縦横比を保ったまま大きさだけを変えています。
 */
const RATIO = 600 / 150;

export default function Logo({ height = 40, priority = false }: { height?: number; priority?: boolean }) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src="/brand/logo-shizuoka-east.jpg"
      alt={shop.name}
      width={600}
      height={150}
      unoptimized
      priority={priority}
      className="block shrink-0"
      style={{ width, height }}
    />
  );
}
