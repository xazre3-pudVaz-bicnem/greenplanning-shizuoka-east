import Link from 'next/link';
import Photo from './Photo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

/**
 * 「監修：グリーンプランニング静岡EAST」の表示。
 * 誰が書いている情報かを、ページの中で明確にするためのもの（E-E-A-T / AIO）。
 */
export default function Supervisor({ className = '' }: { className?: string }) {
  return (
    <aside className={`hairline flex items-center gap-4 bg-kinari p-4 sm:gap-5 sm:p-5 ${className}`} aria-label="この記事の監修">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16">
        <Photo photo={photos.representative} fill sizes="64px" quality={62} position="50% 25%" />
      </div>
      <div className="text-[0.82rem] leading-[1.8] text-sumi-2">
        <p className="text-[0.7rem] tracking-[0.14em] text-hai">監修</p>
        <p className="display text-[0.95rem] text-sumi">
          {shop.shortName} 代表 {shop.representative}
        </p>
        <p>
          静岡県東部・中部・伊豆で人工芝の施工と提案を行う専門店。商品仕様・保証・参考価格は
          <a href={shop.hq.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            本部公式サイト
          </a>
          の掲載内容に基づいています。
          <Link href="/about" className="ml-1 underline underline-offset-4">
            代表について
          </Link>
        </p>
      </div>
    </aside>
  );
}
