import Image from 'next/image';

/**
 * ロゴ。本部ブランドのロゴ（犬のイラスト＋Green Planning）に、「静岡EAST」の店舗名を添える。
 * 画像は public/brand/logo.png（scripts/make-brand.mjs で public/logo.jpg から生成・白を透過）。
 * 白〜生成りの背景で使う想定（濃い緑の上では犬の白い部分が透けるので使わない）。
 *
 * - header … 横並び（ロゴ｜静岡EAST）
 * - footer … 縦積み（ロゴの下に静岡EAST）。フッターの狭い列でも折り返さない
 */
export default function Logo({ size = 'header' }: { size?: 'header' | 'footer' }) {
  const stack = size === 'footer';
  const h = stack ? 60 : 40;
  const w = Math.round((h * 999) / 300);

  const image = (
    <Image
      src="/brand/logo.png"
      alt="グリーンプランニング"
      width={w}
      height={h}
      quality={78}
      className="shrink-0"
      style={{ width: w, height: h }}
    />
  );

  if (stack) {
    return (
      <span className="inline-flex flex-col items-start gap-2.5">
        {image}
        <span className="leading-none">
          <span className="block text-[0.58rem] tracking-[0.16em] text-hai">静岡県東部・中部・伊豆</span>
          <span className="display mt-1 block text-[1.05rem] tracking-[0.08em] text-fukami">静岡EAST</span>
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      {image}
      <span className="whitespace-nowrap border-l border-sen pl-2.5 leading-none sm:pl-3">
        <span className="block text-[0.52rem] tracking-[0.16em] text-hai sm:text-[0.56rem]">静岡県東部・中部・伊豆</span>
        <span className="display mt-1 block text-[0.96rem] tracking-[0.08em] text-fukami sm:text-[1.02rem]">静岡EAST</span>
      </span>
    </span>
  );
}
