import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

/**
 * 本文中の [表示テキスト](/パス) だけをリンクに変える、ごく小さな変換。
 * データ側（data/services.ts など）に内部リンクを書けるようにするためのものです。
 * HTMLは通しません（テキストとリンクだけ）。
 */
export default function RichText({ text, className = '' }: { text: string; className?: string }) {
  const nodes: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    const href = m[2];
    if (href.startsWith('http')) {
      nodes.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="py-1 text-fukami underline underline-offset-4">
          {m[1]}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={key++} href={href} className="py-1 text-fukami underline underline-offset-4 decoration-1 hover:decoration-2">
          {m[1]}
        </Link>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);

  return <p className={className}>{nodes}</p>;
}
