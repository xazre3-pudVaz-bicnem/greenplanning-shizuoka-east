import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** ミリ秒 */
  delay?: number;
  /** 'up' = 下から浮かぶ / 'clip' = 写真が下から開く / 'line' = 文字が現れる */
  variant?: 'up' | 'clip' | 'line';
  as?: 'div' | 'section' | 'figure' | 'article' | 'li' | 'header' | 'p' | 'span';
};

const variantClass = {
  up: 'reveal',
  clip: 'reveal-clip',
  line: 'reveal-line',
} as const;

/**
 * スクロールで一度だけ現れる要素の「印」。
 *
 * これはサーバーコンポーネントで、data-visible="false" を付けた要素を出すだけです。
 * 実際に観測して data-visible を "true" に切り替えるのは、layout.tsx に1つだけ置いた
 * RevealObserver（クライアント）です。
 *
 * こうしている理由: Reveal 自体をクライアントコンポーネントにすると、包んだ中身がすべて
 * RSC ペイロードとして HTML に二重に埋め込まれ、ページの HTML が2倍以上に膨らみます
 * （実測でトップページ 306KB）。印だけをサーバーで出せば、その重複がなくなります。
 *
 * 隠すスタイルは html.js が付いているときだけ効くので（globals.css）、
 * JSが無効な環境でも本文は最初から見えています。
 */
export default function Reveal({ children, className = '', delay = 0, variant = 'up', as = 'div' }: Props) {
  const Tag = as;
  return (
    <Tag
      className={`${variantClass[variant]} ${className}`}
      data-visible="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
