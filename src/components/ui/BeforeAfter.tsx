'use client';

import { useId, useState } from 'react';
import Photo from './Photo';
import type { Photo as PhotoData } from '@/data/photos';

type Props = {
  before: PhotoData;
  after: PhotoData;
  sizes: string;
  /** 枠の縦横比（Tailwindの aspect クラス） */
  aspectClass?: string;
  className?: string;
  /** 見出しに使う短い説明（スライダーのラベル） */
  label?: string;
  /** ページの最初の大きな画像（LCP）になるときに true。遅延読み込みをやめて先読みする */
  priority?: boolean;
};

/**
 * 施工前後を左右にスライドして見比べる。
 * range input を透明で重ねているので、マウス・タッチ・キーボードのどれでも動かせます。
 * JSが無ければ「施工後」がそのまま表示されます。
 */
export default function BeforeAfter({
  before,
  after,
  sizes,
  aspectClass = 'aspect-[4/3]',
  className = '',
  label = '施工前と施工後の比較',
  priority = false,
}: Props) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className={`relative select-none overflow-hidden bg-kinari ${aspectClass} ${className}`}>
      {/* 施工後（下） */}
      <Photo photo={after} fill sizes={sizes} quality={78} priority={priority} />
      {/* 施工前（上・左側だけ見せる） */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
        <Photo photo={before} fill sizes={sizes} quality={78} priority={priority} />
      </div>

      {/* 境界線とつまみ */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/90" style={{ left: `${pos}%` }} aria-hidden>
        <span className="ba-handle absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-fukami">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5" />
            <path d="m15 7 5 5-5 5" />
          </svg>
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 bg-sumi/70 px-2.5 py-1 text-[0.7rem] tracking-[0.12em] text-white">
        施工前
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-fukami/85 px-2.5 py-1 text-[0.7rem] tracking-[0.12em] text-white">
        施工後
      </span>

      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={`施工前 ${pos}%`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
