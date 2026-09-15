import Image from 'next/image';
import type { PhotoData } from '@/data/photos';
import { allowIndexing } from '@/lib/site';

/**
 * 写真（親要素に relative と大きさを持たせて、fill で敷き詰める）。
 *
 * Basic認証がかかっているあいだは、画像最適化（/_next/image）が元画像を取得できないため、
 * scripts/prepare-images.mjs で圧縮済みのファイルをそのまま配信します。
 * 本部の承認を得て公開（allowIndexing）したあとは、AVIF/WebP・画面幅に合わせたサイズで配信されます。
 */
export default function Photo({
  photo,
  sizes,
  priority = false,
  className = '',
}: {
  photo: PhotoData;
  /** 表示幅の目安（例: "(min-width: 1024px) 40vw, 100vw"） */
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      quality={78}
      priority={priority}
      unoptimized={!allowIndexing}
      className={`object-cover ${className}`}
    />
  );
}
