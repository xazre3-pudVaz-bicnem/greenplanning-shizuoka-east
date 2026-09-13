import { shop } from '@/data/shop';
import { regions } from '@/data/areas';
import Pending from './Pending';
import { ExternalIcon } from './icons';

/**
 * 店舗情報の表。NAPは data/shop.ts から。
 *
 * - compact … トップ・お問い合わせで使う短い表
 * - 通常   … 会社概要（/about）。本部との関係性とパートナー区分を明記し、
 *            本部公式サイトへのリンクはこの表の1か所だけに置く（本部チェックリスト「本部公式へのリンク」）
 */
export default function ShopInfoTable({ compact = false }: { compact?: boolean }) {
  const partner = shop.partnerCategory ?? <Pending>本部指定のパートナー区分の正式な表記</Pending>;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: '店舗名', value: shop.name },
    { label: 'パートナー区分', value: partner },
    { label: '代表', value: shop.representative },
    { label: '所在地', value: shop.address.full },
    {
      label: '電話',
      value: (
        <a href={shop.telHref} className="num inline-block py-1 underline underline-offset-4">
          {shop.tel}
        </a>
      ),
    },
    {
      label: 'メール',
      value: (
        <a href={`mailto:${shop.email}`} className="inline-block break-all py-1 underline underline-offset-4">
          {shop.email}
        </a>
      ),
    },
    { label: '受付時間', value: shop.hours.label },
    {
      label: 'Instagram',
      value: (
        <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="inline-block py-1 underline underline-offset-4">
          {shop.instagramHandle}
        </a>
      ),
    },
  ];

  if (!compact) {
    rows.push(
      {
        label: '事業内容',
        value: (
          <>
            {shop.business.join('・')}
            <span className="mt-2 block">
              <Pending>事業内容の項目が実際の業務と合っているか</Pending>
            </span>
          </>
        ),
      },
      {
        label: '担当エリア',
        value: (
          <span className="block space-y-1">
            <span className="block">{shop.areaLabel}</span>
            {regions.map((r) => (
              <span key={r.key} className="block text-[0.86rem]">
                <span className="text-hai">{r.label}：</span>
                {r.municipalities.join('・')}
              </span>
            ))}
          </span>
        ),
      },
      {
        label: '本部との関係',
        value: (
          <span>
            <a href={shop.hq.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1 underline underline-offset-4">
              {shop.hq.name}
              <ExternalIcon className="text-[0.85em]" />
            </a>
            の{shop.partnerCategory ?? 'パートナー'}です。本部の直営店ではありません。
          </span>
        ),
      },
    );
  }

  return (
    <div className="table-scroll">
      <table className="spec-table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td className="text-sumi-2">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
