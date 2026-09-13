import { shop } from '@/data/shop';
import { allowIndexing } from '@/lib/site';

/**
 * 公開の条件がそろっていないのに公開しようとしたら、ビルドを止めます。
 *
 * 本部チェックリスト「公開・大幅変更」により、公開前に本部の確認・承認が必要です。
 * 環境変数を1つ変えただけで公開されてしまう事故を防ぐため、承認の記録とパートナー区分の確定を必須にしています。
 * 画面に残った「要確認」の項目は components/ui/Pending.tsx が同じように止めます。
 */
export function assertPublishable() {
  if (!allowIndexing) return;

  const problems: string[] = [];
  if (!process.env.HQ_APPROVAL_NOTE?.trim()) {
    problems.push('HQ_APPROVAL_NOTE（本部の確認・承認の記録）が設定されていません');
  }
  if (!shop.partnerCategory) {
    problems.push('shop.partnerCategory（本部指定のパートナー区分）が未確定です');
  }

  if (problems.length > 0) {
    throw new Error(`公開の条件がそろっていません。\n- ${problems.join('\n- ')}`);
  }
}
