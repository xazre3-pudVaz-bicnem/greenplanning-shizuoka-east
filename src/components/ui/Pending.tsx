import { allowIndexing } from '@/lib/site';

/**
 * 静岡EASTに確認・作成してもらう必要がある箇所の目印。
 *
 * AIや制作側が文章を補って埋めないこと（本部チェックリスト「AIを使った文章作成」「掲載内容」）。
 * 静岡EASTが書いた文章・確認した事実が届いたら、この目印ごと置き換えます。
 *
 * 目印が1つでも残ったまま公開ビルドをすると、ビルドが失敗します。
 */
export default function Pending({ children, block = false }: { children: React.ReactNode; block?: boolean }) {
  if (allowIndexing) {
    throw new Error(`「要確認」の項目が残っているため公開できません: ${typeof children === 'string' ? children : ''}`);
  }
  const Tag = block ? 'p' : 'span';
  return (
    <Tag className={`pending ${block ? 'block' : 'inline'}`}>
      <span className="pending-label">要確認</span>
      {children}
    </Tag>
  );
}
