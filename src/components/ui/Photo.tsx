import Image from 'next/image';
import type { Photo as PhotoData } from '@/data/photos';

type Props = {
  photo: PhotoData;
  /** 親要素いっぱいに敷く。親に relative と高さが必要 */
  fill?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** object-position。主題が寄っている写真で使う */
  position?: string;
  /** next.config.ts の images.qualities にある値だけ（62 / 70 / 78） */
  quality?: 62 | 70 | 78;
  /** altを差し替えたいとき（同じ写真を別の文脈で使う場合） */
  alt?: string;
};

/**
 * next/image の薄いラッパー。
 * fill のときは親に relative と高さが要る。ここで絶対配置のクラスは渡さない
 * （渡すと親の高さが 0 のときに画像が消えるため）。
 */
export default function Photo({
  photo,
  fill = false,
  sizes,
  priority = false,
  className = '',
  position,
  quality = 78,
  alt,
}: Props) {
  const common = {
    src: photo.src,
    sizes,
    priority,
    quality,
    style: position ? { objectPosition: position } : undefined,
  };
  const altText = alt ?? photo.alt;

  if (fill) {
    return <Image {...common} alt={altText} fill className={`object-cover ${className}`} />;
  }

  return (
    <Image
      {...common}
      alt={altText}
      width={photo.width}
      height={photo.height}
      className={className}
    />
  );
}
