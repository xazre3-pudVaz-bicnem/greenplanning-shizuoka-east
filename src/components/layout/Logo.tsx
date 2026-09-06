import { shop } from '@/data/shop';

/**
 * ロゴ。芝の葉のマークと文字。画像を使わずSVG＋テキストで描く（軽く、拡大しても崩れない）。
 */
export default function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const text = tone === 'dark' ? 'text-white' : 'text-sumi';
  const sub = tone === 'dark' ? 'text-shiba-2' : 'text-fukami';
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden>
        <rect width="40" height="40" rx="8" className="fill-fukami" />
        <g fill="none" stroke="#e9f3e6" strokeWidth="2.4" strokeLinecap="round">
          <path d="M20 32V12" />
          <path d="M20 25c-3-1.5-6-4.5-7-9" />
          <path d="M20 25c3-1.5 6-4.5 7-9" />
          <path d="M20 31c-4-1.5-8-4.5-9.5-8.5" />
          <path d="M20 31c4-1.5 8-4.5 9.5-8.5" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[0.58rem] tracking-[0.2em] ${sub}`}>人工芝専門店</span>
        <span className={`display mt-1 text-[0.98rem] tracking-[0.04em] sm:text-[1.05rem] ${text}`}>
          {shop.brand}
          <span className="ml-1 text-[0.82em] tracking-[0.08em]">静岡EAST</span>
        </span>
      </span>
    </span>
  );
}
